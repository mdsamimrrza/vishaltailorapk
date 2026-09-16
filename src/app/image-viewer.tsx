import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  Pressable,
  Share,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { ArrowLeft, Heart, Share2 } from "lucide-react-native";
import { catalogueItems, catalogueImage } from "../data/catalogue";
import { services } from "../data/services";
import { galleryImages } from "../data/gallery";
import { colors, fonts } from "../theme";

// Full-screen image viewer: swipeable pager with pinch / double-tap zoom
// and a thumbnail filmstrip at the bottom (active thumb framed in gold).
// Built on gesture-handler + reanimated — react-native-image-viewing is
// not used anymore because it crashes natively on the new architecture.
const THUMB_GAP = 8;
const MAX_ZOOM = 5;

export default function ImageViewerScreen() {
  const params = useLocalSearchParams<{ id: string; title?: string; ids?: string | string[] }>();
  const router = useRouter();
  const { width: winW, height: winH } = useWindowDimensions();

  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const idsParam = Array.isArray(params.ids) ? params.ids[0] : params.ids;

  // Resolve the related set: explicit id list from the caller, otherwise
  // every image of the collection the opened picture belongs to.
  const images = useMemo(() => {
    const resolve = (rid: string) => {
      const gallery = galleryImages.find((g) => g.id === rid);
      if (gallery) return { id: gallery.id, source: gallery.source };
      const catalogue = catalogueItems.find((i) => i.id === rid);
      if (catalogue) return { id: catalogue.id, source: catalogueImage(catalogue) };
      const service = services.find((s) => s.id === rid);
      if (service?.image) return { id: service.id, source: service.image };
      return undefined;
    };

    const requested = idsParam?.split(",").map((s) => s.trim()).filter(Boolean) ?? [];
    const list = (requested.length ? requested : deriveRelatedIds(id))
      .map(resolve)
      .filter((x): x is { id: string; source: any } => Boolean(x));

    // Make sure the opened image is in the set.
    if (id && !list.some((x) => x.id === id)) {
      const self = resolve(id);
      if (self) list.unshift(self);
    }
    return list;
  }, [id, idsParam]);

  const initialIndex = Math.max(0, images.findIndex((x) => x.id === id));
  const [index, setIndex] = useState(initialIndex);
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!images.length) router.back();
  }, [images.length, router]);

  const current = images[index] ?? images[0];

  const listRef = useRef<FlatList<any>>(null);
  const goTo = useCallback((to: number) => {
    setIndex(to);
    listRef.current?.scrollToIndex({ index: to, animated: true });
  }, []);

  const onScrollEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const x = e.nativeEvent.contentOffset?.x ?? 0;
      const next = Math.min(images.length - 1, Math.max(0, Math.round(x / winW)));
      setIndex((prev) => (prev === next ? prev : next));
    },
    [images.length, winW]
  );

  const share = useCallback(() => {
    if (!current) return;
    Share.share({
      message: `New Vishal Tailors — ${current.id.toUpperCase()}\nTailored for a better you`,
    }).catch(() => {});
  }, [current]);

  if (!images.length || !current) return null;

  const counter = `${index + 1} / ${images.length}`;

  if (Platform.OS === "web") {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <SafeAreaView edges={["top"]} style={styles.webSafe}>
          <Pressable onPress={() => router.back()} hitSlop={8} style={styles.iconBtn}>
            <ArrowLeft color={colors.cream} size={24} />
          </Pressable>
          <Text style={styles.counter}>{counter}</Text>
          <View style={styles.headerRight}>
            <Pressable
              onPress={() => setLiked((s) => ({ ...s, [current.id]: !s[current.id] }))}
              hitSlop={8}
              style={styles.iconBtn}
              accessibilityLabel="Like"
            >
              <Heart
                color={colors.cream}
                size={22}
                fill={liked[current.id] ? colors.cream : "none"}
              />
            </Pressable>
            <Pressable onPress={share} hitSlop={8} style={styles.iconBtn} accessibilityLabel="Share">
              <Share2 color={colors.cream} size={22} />
            </Pressable>
          </View>
        </SafeAreaView>
        <View style={styles.webImageWrap}>
          <Image source={current.source} style={styles.webImage} resizeMode="contain" />
        </View>
        <ThumbStrip images={images} index={index} onSelect={goTo} web />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <GestureHandlerRootView style={styles.container}>
        <FlatList
          ref={listRef}
          data={images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          initialScrollIndex={initialIndex > 0 ? initialIndex : undefined}
          getItemLayout={(_, i) => ({ length: winW, offset: i * winW, index: i })}
          keyExtractor={(x) => x.id}
          onMomentumScrollEnd={onScrollEnd}
          onScrollToIndexFailed={(e) => {
            listRef.current?.scrollToOffset({ offset: e.index * winW, animated: false });
          }}
          renderItem={({ item }) => <ZoomableImage source={item.source} width={winW} height={winH} />}
        />

        {/* Header overlay — back / counter / like / share */}
        <SafeAreaView edges={["top"]} style={styles.headerOverlay}>
          <Pressable onPress={() => router.back()} hitSlop={8} style={styles.iconBtn}>
            <ArrowLeft color={colors.cream} size={24} />
          </Pressable>
          <Text style={styles.counter}>{counter}</Text>
          <View style={styles.headerRight}>
            <Pressable
              onPress={() => setLiked((s) => ({ ...s, [current.id]: !s[current.id] }))}
              hitSlop={8}
              style={styles.iconBtn}
              accessibilityLabel="Like"
            >
              <Heart
                color={colors.cream}
                size={22}
                fill={liked[current.id] ? colors.cream : "none"}
              />
            </Pressable>
            <Pressable onPress={share} hitSlop={8} style={styles.iconBtn} accessibilityLabel="Share">
              <Share2 color={colors.cream} size={22} />
            </Pressable>
          </View>
        </SafeAreaView>

        <SafeAreaView edges={["bottom"]} style={styles.stripOverlay}>
          <ThumbStrip images={images} index={index} onSelect={goTo} />
        </SafeAreaView>
      </GestureHandlerRootView>
    </View>
  );
}

// One pager page: double-tap toggles 2.5x zoom, pinch zooms 1-5x with
// two-finger drag to pan; releasing at 1x snaps everything back.
function ZoomableImage({
  source,
  width,
  height,
}: {
  source: any;
  width: number;
  height: number;
}) {
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const reset = () => {
    "worklet";
    scale.value = withTiming(1);
    translateX.value = withTiming(0);
    translateY.value = withTiming(0);
    savedScale.value = 1;
  };

  const toggleZoom = () => {
    "worklet";
    if (scale.value > 1.05) {
      reset();
    } else {
      scale.value = withTiming(2.5);
      savedScale.value = 2.5;
    }
  };

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd((_, success) => {
      if (success) toggleZoom();
    });

  const pinch = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = Math.min(MAX_ZOOM, Math.max(1, savedScale.value * e.scale));
    })
    .onEnd(() => {
      if (scale.value <= 1.05) {
        reset();
      } else {
        savedScale.value = scale.value;
      }
    });

  const pan = Gesture.Pan()
    .minPointers(2)
    .onUpdate((e) => {
      if (scale.value > 1.05) {
        translateX.value = e.translationX;
        translateY.value = e.translationY;
      }
    })
    .onEnd(() => {
      if (scale.value <= 1.05) {
        translateX.value = withTiming(0);
        translateY.value = withTiming(0);
      }
    });

  const zoomStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  const gestures = Gesture.Race(doubleTap, Gesture.Simultaneous(pinch, pan));

  return (
    <GestureDetector gesture={gestures}>
      <Animated.Image
        source={source}
        style={[{ width, height }, zoomStyle]}
        resizeMode="contain"
      />
    </GestureDetector>
  );
}

// Related set when the caller doesn't pass one: the collection the image
// belongs to (gallery, catalogue or services), in data order.
function deriveRelatedIds(id?: string): string[] {
  if (!id) return [];
  if (galleryImages.some((g) => g.id === id)) return galleryImages.map((g) => g.id);
  if (catalogueItems.some((i) => i.id === id)) return catalogueItems.map((i) => i.id);
  if (services.some((s) => s.id === id && s.image)) {
    return services.filter((s) => s.image).map((s) => s.id);
  }
  return [id];
}

// Bottom filmstrip: horizontally scrollable thumbnails, the active one
// framed in gold, auto-centered on index change (matches the mockup).
function ThumbStrip({
  images,
  index,
  onSelect,
  web,
}: {
  images: { id: string; source: any }[];
  index: number;
  onSelect: (i: number) => void;
  web?: boolean;
}) {
  const listRef = useRef<FlatList<any>>(null);
  const stripWidth = useRef(0);
  const { width: winW } = useWindowDimensions();
  // Thumbnails scale with the screen: ~7 per view on phones, capped on
  // tablets/desktop so the strip stays comfortable on every device.
  const thumb = Math.round(Math.min(72, Math.max(48, winW / 7)));
  const pitch = thumb + THUMB_GAP;

  useEffect(() => {
    if (!stripWidth.current) return;
    const center = index * pitch + thumb / 2;
    listRef.current?.scrollToOffset({
      offset: Math.max(0, center - stripWidth.current / 2),
      animated: true,
    });
  }, [index, pitch, thumb]);

  return (
    <View style={web ? undefined : styles.stripWrap}>
      <FlatList
        ref={listRef}
        data={images}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(x) => x.id}
        onLayout={(e) => (stripWidth.current = e.nativeEvent.layout.width)}
        contentContainerStyle={styles.stripContent}
        getItemLayout={(_, i) => ({
          length: pitch,
          offset: i * pitch,
          index: i,
        })}
        renderItem={({ item, index: i }) => {
          const active = i === index;
          return (
            <Pressable
              onPress={() => onSelect(i)}
              style={[styles.thumb, { width: thumb, height: thumb }, active && styles.thumbActive]}
              accessibilityLabel={`Image ${i + 1}`}
            >
              <Image source={item.source} style={styles.thumbImage} resizeMode="cover" />
            </Pressable>
          );
        }}
      />
      {!web && <View style={styles.handle} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "rgba(10,4,4,0.98)" },

  headerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 4,
  },
  iconBtn: { width: 40, height: 40, alignItems: "center", justifyContent: "center" },
  counter: {
    flex: 1,
    textAlign: "center",
    fontFamily: fonts.outfitSemiBold,
    fontSize: 16,
    color: colors.cream,
  },
  headerRight: { flexDirection: "row", alignItems: "center" },

  stripOverlay: { position: "absolute", left: 0, right: 0, bottom: 0 },

  // Thumbnail filmstrip
  stripWrap: { paddingBottom: 6 },
  stripContent: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: THUMB_GAP,
    alignItems: "center",
  },
  thumb: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "rgba(248,245,237,0.35)",
    overflow: "hidden",
    backgroundColor: colors.black,
  },
  thumbActive: {
    borderColor: colors.gold,
    borderWidth: 2.5,
  },
  thumbImage: { width: "100%", height: "100%" },
  handle: {
    alignSelf: "center",
    width: 120,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(248,245,237,0.7)",
    marginTop: 2,
    marginBottom: 6,
  },

  // Web fallback
  webSafe: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  webImageWrap: { flex: 1, alignItems: "center", justifyContent: "center" },
  webImage: { flex: 1, width: "100%" },
});
