import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ArrowRight, Bell, Menu, Search } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDrawer } from "../../components/AppDrawer";
import { Img } from "../../components/Img";
import { getCatalogueItems, catalogueThumb, localizedName, CatalogueItem } from "../../data/catalogue";
import { useLanguage } from "../../i18n/LanguageContext";
import { colors, fonts, spacing } from "../../theme";

// 03. HOME — native app layout: compact app bar, search, rounded hero card,
// category shortcuts and design carousels.
const C = {
  primary: "#680F1A",
  gold: "#DAAF37",
  bg: "#FFF8ED",
  text: "#241515",
  sub: "#6B625E",
  card: "#FFFFFF",
};

// Newest designs first (latest additions across the catalogue).
const NEW_IDS = ["C-16", "C-15", "C-14", "C-13", "SF-09", "SF-08", "K-09", "K-08"];

export default function HomeScreen() {
  const { t, language } = useLanguage();
  const router = useRouter();
  const { width: winW } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const { open: openDrawer } = useDrawer();
  const [refreshing, setRefreshing] = useState(false);
  const [catalogueData, setCatalogueData] = useState<CatalogueItem[]>([]);

  // Load catalogue data asynchronously to avoid blocking UI on low-end devices
  useEffect(() => {
    const items = getCatalogueItems();
    setCatalogueData(items);
  }, []);

  const fadeIn = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeIn, { toValue: 1, duration: 300, useNativeDriver: true }).start();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 900);
  };

  const heroH = Math.round(winW * 0.72);
  const newDesigns = NEW_IDS.map((id) => catalogueData.find((i) => i.id === id)).filter(
    (i): i is NonNullable<typeof i> => Boolean(i)
  );
  const shirtDesigns = catalogueData.filter((i) => i.category === "shirt");
  const coatDesigns = catalogueData.filter((i) => i.category === "suits");

  // Horizontal design carousel — same card style as New Arrivals.
  const designRow = (title: string, designs: CatalogueItem[], filter: string) => (
    <View style={styles.section}>
      <View style={styles.sectionHead}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Pressable
          onPress={() => router.push(`/catalogue-full?filter=${filter}`)}
          style={({ pressed }) => [styles.viewAll, pressed && { opacity: 0.7 }]}
        >
          <Text style={styles.viewAllText}>{t("view_all")}</Text>
          <ArrowRight color={C.primary} size={13} />
        </Pressable>
      </View>
      <FlashList
        data={designs}
        renderItem={({ item }) => (
          <Pressable
            key={item.id}
            onPress={() => router.push(`/catalogue/${item.id}`)}
            style={({ pressed }) => [
              styles.newCard,
              pressed && { opacity: 0.85, transform: [{ scale: 0.97 }] },
            ]}
          >
            <Img source={catalogueThumb(item)} style={styles.newImage} />
            <View style={styles.newBody}>
              <Text style={styles.newName} numberOfLines={1}>
                {localizedName(item, language)}
              </Text>
              <Text style={styles.newId}>{item.id}</Text>
            </View>
          </Pressable>
        )}
        estimatedItemSize={160}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={160}
        contentContainerStyle={{ gap: 12, paddingRight: spacing.md }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );

  // Hero slideshow — crossfades between the brand photos every 4s.
  const HERO_IMAGES = [
    require("../../../assets/images/nvt/page2-suit.webp"),
    require("../../../assets/images/nvt/premium-suiting.webp"),
    require("../../../assets/images/nvt/shirting-cotton.webp"),
  ];
  const [heroIdx, setHeroIdx] = useState(0);
  const heroFade = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    const t = setInterval(() => setHeroIdx((i) => (i + 1) % HERO_IMAGES.length), 4000);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    heroFade.setValue(0);
    Animated.timing(heroFade, { toValue: 1, duration: 500, useNativeDriver: true }).start();
  }, [heroIdx, heroFade]);

  // New Arrivals — gentle auto-scroll, snaps per card.
  const CARD_PITCH = 160;
  const newListRef = useRef<FlashList<CatalogueItem>>(null);
  const newArrIdx = useRef(0);
  useEffect(() => {
    const t = setInterval(() => {
      newArrIdx.current = (newArrIdx.current + 1) % newDesigns.length;
      newListRef.current?.scrollToIndex({ index: newArrIdx.current, animated: true });
    }, 3500);
    return () => clearInterval(t);
  }, [newDesigns.length]);

  const categories = [
    { label: t("gal_tab_suits"), key: "suits", image: require("../../../assets/images/nvt/suit/thumbs/c26.webp"), onPress: () => router.push("/catalogue-full?filter=suits") },
    { label: t("gal_tab_shirts"), key: "shirt", image: require("../../../assets/images/nvt/shirt/thumbs/s1.webp"), onPress: () => router.push("/catalogue-full?filter=shirt") },
    { label: t("cat_safari"), key: "safari", image: require("../../../assets/images/nvt/safari/thumbs/sh8.webp"), onPress: () => router.push("/catalogue-full?filter=safari") },
    { label: t("cat_khadress"), key: "dress", image: require("../../../assets/images/nvt/khandress/thumbs/kh2.webp"), onPress: () => router.push("/catalogue-full?filter=dress") },
    { label: t("home_svc_kurta"), key: "", image: require("../../../assets/images/nvt/kurtapajama/thumbs/k1.webp"), onPress: () => router.push("/service/kurta") },
  ];

  return (
    <Animated.View style={[styles.safe, { opacity: fadeIn }]}>
      <StatusBar style="dark" />

      {/* ============ APP BAR — menu · wordmark · bell ============ */}
      <View style={[styles.appBar, { paddingTop: insets.top + 6 }]}>
        <Pressable
          onPress={openDrawer}
          style={({ pressed }) => [styles.barBtn, pressed && { opacity: 0.6 }]}
          accessibilityLabel="Menu"
        >
          <Menu color={C.primary} size={23} strokeWidth={1.9} />
        </Pressable>
        <View style={styles.barBrand}>
          <Img
            source={require("../../../assets/images/nvt/splash-logo.webp")}
            style={styles.barMark}
            resizeMode="contain"
          />
          <View style={{ alignItems: "center" }}>
            <Text style={styles.barName}>NEW VISHAL TAILORS</Text>
            <Text style={styles.barTag}>TAILORED FOR A BETTER YOU</Text>
          </View>
        </View>
        <Pressable
          onPress={() => router.push("/enquiry")}
          style={({ pressed }) => [styles.barBtn, pressed && { opacity: 0.6 }]}
          accessibilityLabel={t("book_appointment")}
        >
          <Bell color={C.primary} size={21} strokeWidth={1.9} />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: spacing.md }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[C.primary]}
            progressBackgroundColor={C.card}
          />
        }
      >
        {/* ============ SEARCH ============ */}
        <Pressable
          onPress={() => router.push("/catalogue-full")}
          style={({ pressed }) => [styles.search, pressed && { opacity: 0.8 }]}
          accessibilityLabel={t("catalogue_search_placeholder")}
        >
          <Search color={colors.mutedText} size={17} />
          <Text style={styles.searchText} numberOfLines={1}>
            {t("catalogue_search_placeholder")}
          </Text>
        </Pressable>

        {/* ============ HERO CARD — slideshow, rounded, compact ============ */}
        <View style={[styles.heroCard, { height: heroH }]}>
          {HERO_IMAGES.map((img, i) => (
            <Animated.Image
              key={i}
              source={img}
              style={[StyleSheet.absoluteFill, { opacity: heroIdx === i ? heroFade : 0 }]}
              resizeMode="cover"
            />
          ))}
          <LinearGradient
            colors={["rgba(40,6,11,0)", "rgba(58,10,16,0.45)", "rgba(58,10,16,0.92)"]}
            locations={[0.35, 0.6, 1]}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.heroDots}>
            {HERO_IMAGES.map((_, i) => (
              <View key={i} style={[styles.heroDot, heroIdx === i && styles.heroDotActive]} />
            ))}
          </View>
          <View style={styles.heroBody}>
            <Text style={styles.h1}>{t("home_h1")}</Text>
            <Text style={[styles.h1, styles.h1gold]}>{t("home_h2")}</Text>
            <Text style={styles.h2}>{t("home_h3")}</Text>
            <Pressable
              onPress={() => router.push("/(tabs)/services")}
              style={({ pressed }) => [styles.heroBtn, pressed && { opacity: 0.88, transform: [{ scale: 0.98 }] }]}
            >
              <Text style={styles.heroBtnText}>{t("home_cta")}</Text>
              <ArrowRight color="#FFFFFF" size={17} />
            </Pressable>
          </View>
        </View>

        {/* ============ BROWSE CATEGORIES ============ */}
        <View style={styles.section}>
          <View style={styles.sectionHead}>
            <Text style={styles.sectionTitle}>{t("browse_cat")}</Text>
          </View>
          <View style={styles.catRow}>
            {categories.map((c) => (
              <Pressable
                key={c.label}
                onPress={c.onPress}
                style={({ pressed }) => [
                  styles.catItem,
                  pressed && { opacity: 0.8, transform: [{ scale: 0.95 }] },
                ]}
              >
                <View style={styles.catRing}>
                  <Img source={c.image} style={styles.catImage} />
                </View>
                <Text style={styles.catLabel} numberOfLines={1} adjustsFontSizeToFit>
                  {c.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* ============ NEW ARRIVALS ============ */}
        <View style={styles.section}>
          <View style={styles.sectionHead}>
            <Text style={styles.sectionTitle}>{t("new_arrivals")}</Text>
            <Pressable
              onPress={() => router.push("/catalogue-full")}
              style={({ pressed }) => [styles.viewAll, pressed && { opacity: 0.7 }]}
            >
              <Text style={styles.viewAllText}>{t("view_all")}</Text>
              <ArrowRight color={C.primary} size={13} />
            </Pressable>
          </View>
          <FlashList
            ref={newListRef}
            data={newDesigns}
            renderItem={({ item, index }) => (
              <Pressable
                key={item.id}
                onPress={() => router.push(`/catalogue/${item.id}`)}
                style={({ pressed }) => [styles.newCard, pressed && { opacity: 0.85, transform: [{ scale: 0.97 }] }]}
              >
                <View>
                  <Img source={catalogueThumb(item)} style={styles.newImage} />
                  {index < 3 ? (
                    <View style={styles.newBadge}>
                      <Text style={styles.newBadgeText}>NEW</Text>
                    </View>
                  ) : null}
                </View>
                <View style={styles.newBody}>
                  <Text style={styles.newName} numberOfLines={1}>
                    {localizedName(item, language)}
                  </Text>
                  <Text style={styles.newId}>{item.id}</Text>
                </View>
              </Pressable>
            )}
            estimatedItemSize={160}
            horizontal
            showsHorizontalScrollIndicator={false}
            decelerationRate="fast"
            snapToInterval={CARD_PITCH}
            contentContainerStyle={{ gap: 12, paddingRight: spacing.md }}
            keyExtractor={(item) => item.id}
          />
        </View>

        {/* ============ SHIRT DESIGNS ============ */}
        {designRow(t("cat_shirtdesigns"), shirtDesigns, "shirt")}

        {/* ============ COAT DESIGNS ============ */}
        {designRow(t("cat_coatdesigns"), coatDesigns, "suits")}
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },

  // App bar
  appBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingBottom: 6,
    backgroundColor: C.bg,
  },
  barBtn: { width: 40, height: 40, alignItems: "center", justifyContent: "center" },
  barBrand: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  barMark: { width: 30, height: 28 },
  barName: {
    fontFamily: fonts.serifBold,
    fontSize: 14,
    letterSpacing: 1.2,
    color: C.primary,
  },
  barTag: {
    fontFamily: fonts.outfitSemiBold,
    fontSize: 6.5,
    letterSpacing: 1.8,
    color: "#B58A1B",
    marginTop: 1,
  },

  // Search
  search: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    marginHorizontal: spacing.md,
    marginTop: 6,
    marginBottom: spacing.md,
    height: 46,
    paddingHorizontal: 14,
    borderRadius: 23,
    backgroundColor: C.card,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#EFE7DA",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  searchText: {
    flex: 1,
    fontFamily: fonts.outfit,
    fontSize: 13.5,
    color: colors.mutedText,
  },

  // Hero card
  heroCard: {
    marginHorizontal: spacing.md,
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: C.primary,
  },
  heroBody: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  h1: {
    fontFamily: fonts.serifBold,
    fontSize: 26,
    lineHeight: 31,
    color: "#FFFFFF",
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },
  h1gold: { color: C.gold },
  h2: {
    fontFamily: fonts.serifItalic,
    fontSize: 17,
    color: "#F5EDE4",
    marginTop: 2,
    marginBottom: 12,
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },
  heroBtn: {
    alignSelf: "flex-start",
    height: 42,
    paddingHorizontal: 20,
    borderRadius: 21,
    backgroundColor: C.primary,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "rgba(218,175,55,0.45)",
  },
  heroBtnText: {
    fontFamily: fonts.outfitSemiBold,
    fontSize: 13.5,
    color: "#FFFFFF",
  },

  // Sections
  section: { paddingTop: 22, paddingLeft: spacing.md },
  sectionHead: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 13,
    paddingRight: spacing.md,
  },
  sectionTitle: {
    fontFamily: fonts.serifBold,
    fontSize: 20,
    color: C.text,
  },
  viewAll: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    height: 28,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: C.card,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#EFE7DA",
  },
  viewAllText: {
    fontFamily: fonts.outfitSemiBold,
    fontSize: 12,
    color: C.primary,
  },

  // Category shortcuts — five across, spread equally
  catRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: spacing.md,
  },
  catItem: { flex: 1, alignItems: "center", gap: 7 },
  catRing: {
    width: 64,
    height: 64,
    borderRadius: 32,
    padding: 2.5,
    borderWidth: 1.5,
    borderColor: C.gold,
    backgroundColor: C.card,
  },
  catImage: { width: "100%", height: "100%", borderRadius: 29 },
  catLabel: {
    fontFamily: fonts.outfitSemiBold,
    fontSize: 11.5,
    color: C.text,
  },

  // Hero slideshow dots
  heroDots: {
    position: "absolute",
    top: 12,
    right: 14,
    flexDirection: "row",
    gap: 5,
  },
  heroDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.5)",
  },
  heroDotActive: { backgroundColor: C.gold, width: 14 },

  // New arrivals cards
  newCard: {
    width: 148,
    backgroundColor: C.card,
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#EFE7DA",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  newImage: { width: "100%", height: 168 },
  newBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    paddingHorizontal: 8,
    height: 20,
    borderRadius: 10,
    backgroundColor: C.gold,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  newBadgeText: {
    fontFamily: fonts.outfitBold,
    fontSize: 8.5,
    letterSpacing: 1.2,
    color: "#FFFFFF",
  },
  newBody: { padding: 10, gap: 2 },
  newName: {
    fontFamily: fonts.outfitSemiBold,
    fontSize: 12.5,
    color: C.text,
  },
  newId: {
    fontFamily: fonts.outfitBold,
    fontSize: 9.5,
    letterSpacing: 1.2,
    color: "#B58A1B",
  },

});
