import React, { useEffect, useRef } from "react";
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLanguage } from "../i18n/LanguageContext";
import { colors, fonts, spacing } from "../theme";

// Exact palette from the approved spec sheet (01/02 detailed).
const C = {
  primary: "#680F1A",
  gold: "#DAAF37",
  sub: "#555555",
  bg: "#F8F5ED",
};

// 02. WELCOME SCREEN — introduce the brand and guide user to get started.
// Hero fills the top and fades into cream only near its lower edge;
// heading → sub → dots → Get Started. Both actions go Home.
export default function WelcomeScreen() {
  const MAX_FONT_SCALE = 1;
  const { t } = useLanguage();
  const router = useRouter();
  const { width: winW, height: winH } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  // Uncropped hero: image is 1024×1536 → height = width × 1.5 (capped for wide screens).
  // 60% of the screen so the heading lands where the spec mock shows it.
  const imgH = Math.round(winW * 1.5);
  const heroH = Math.min(winH * 0.6, imgH);
  const fadeH = Math.round(heroH * 0.18); // fade only over the image's own fade zone

  // Content position is fixed per the approved layout — do not shift it.
  // The hero box alone extends down so its fade BEGINS exactly at the
  // "Perfect Fit" heading top; the text renders above the fading image.
  const topRowH = 44;
  const contentOffset = Math.max(heroH - insets.top - topRowH + 24, 0);
  const heroBoxH = heroH + 24 + fadeH;

  const content = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(content, {
      toValue: 1,
      duration: 600,
      delay: 150,
      useNativeDriver: true,
    }).start();
  }, []);

  const goHome = () => {
    // Remember the choice so Welcome never shows again on this install.
    AsyncStorage.setItem("vishal-welcome-seen", "1").catch(() => {});
    router.replace("/(tabs)/home");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Hero — premium tailoring showcase, anchored to its bottom edge so the
          baked-in fade is never cropped away on wide screens */}
      <View style={{ position: "absolute", top: 0, left: 0, right: 0, height: heroBoxH, overflow: "hidden" }}>
        <Image
          source={require("../../assets/images/nvt/page2-suit.webp")}
          style={{ position: "absolute", bottom: 0, left: 0, width: winW, height: imgH }}
          resizeMode="cover"
        />
        {/* Fade only near the hero's lower edge → seamless blend into cream */}
        <LinearGradient
          colors={["rgba(248,245,237,0)", "rgba(248,245,237,0.75)", C.bg]}
          locations={[0, 0.62, 1]}
          style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: fadeH + 1 }}
        />
      </View>

      <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
        <View style={[styles.topRow, { height: topRowH }]}>
          <Pressable onPress={goHome} hitSlop={10}>
            <Text style={styles.skip}>Skip</Text>
          </Pressable>
        </View>

        {/* Content starts right under the hero, per spec proportions */}
        <Animated.View
          style={[
            styles.content,
            {
              marginTop: contentOffset,
              opacity: content,
              transform: [{ translateY: Animated.multiply(content, 14) }],
            },
          ]}
        >
          {/* Android mis-measures custom-font text width and can wrap the
              headline while sizing it for one line, hiding the last word.
              Non-breaking spaces keep each headline on a single line. */}
          <Text maxFontSizeMultiplier={MAX_FONT_SCALE} style={styles.headline}>
            {t("hero_headline").replace(/ /g, "\u00A0")}
          </Text>
          <Text maxFontSizeMultiplier={MAX_FONT_SCALE} style={styles.headlineItalic}>
            {t("hero_headline2").replace(/ /g, "\u00A0")}
          </Text>

          {/* "Traditional | Modern | Custom" — centered group with fixed gaps,
              identical on every device per the spec mock */}
          <View style={styles.subRow}>
            {t("welcome_sub")
              .split("|")
              .map((part, i, arr) => (
                <React.Fragment key={i}>
                  <Text maxFontSizeMultiplier={MAX_FONT_SCALE} style={styles.subPart}>{part.trim()}</Text>
                  {i < arr.length - 1 ? <Text style={styles.subPipe}>|</Text> : null}
                </React.Fragment>
              ))}
          </View>

          {/* Pagination indicator — page 1 of 4 */}
          <View style={styles.dots}>
            <View style={[styles.dot, styles.dotActive]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </Animated.View>

        {/* Get Started sits right under the dots per the spec mock —
            remaining space stays below, not between them */}
        <Animated.View style={[styles.ctaWrap, { opacity: content }]}>
          <Pressable
            onPress={goHome}
            style={({ pressed }) => [styles.cta, pressed && { opacity: 0.9 }]}
          >
            <Text maxFontSizeMultiplier={MAX_FONT_SCALE} style={styles.ctaText}>{t("get_started")}</Text>
          </Pressable>
        </Animated.View>

        <View style={{ flex: 1, minHeight: 28 }} />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  safe: { flex: 1 },
  topRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: spacing.xl,
    marginTop: 14,
  },
  skip: {
    fontFamily: fonts.outfitMedium,
    fontSize: 15,
    color: "#FFFFFF",
    textShadowColor: "rgba(0,0,0,0.35)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  content: {
    alignItems: "center",
    paddingHorizontal: spacing.sm,
  },
  headline: {
    fontFamily: fonts.serifBold,
    fontSize: 28,
    lineHeight: 34,
    color: C.primary,
    textAlign: "center",
  },
  headlineItalic: {
    fontFamily: fonts.serifBoldItalic,
    fontSize: 28,
    lineHeight: 34,
    color: C.primary,
    textAlign: "center",
  },
  subRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginTop: 18,
  },
  subPart: {
    fontFamily: fonts.outfitMedium,
    fontSize: 14,
    color: C.sub,
  },
  subPipe: {
    fontFamily: fonts.outfit,
    fontSize: 14,
    color: "#C9C2B6",
  },
  dots: {
    flexDirection: "row",
    gap: 8,
    marginTop: 18,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#D9CFC2",
  },
  dotActive: { backgroundColor: C.primary },
  ctaWrap: {
    paddingHorizontal: spacing.xl,
    marginTop: 56,
    width: "100%",
  },
  cta: {
    width: "100%",
    height: 54,
    borderRadius: 27,
    backgroundColor: C.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  ctaText: {
    fontFamily: fonts.outfitSemiBold,
    fontSize: 16,
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
});
