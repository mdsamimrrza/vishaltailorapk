import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import { useLanguage } from "../i18n/LanguageContext";
import { colors, fonts, spacing } from "../theme";

// Exact palette from the approved spec sheet (01/02 detailed).
const C = { primary: "#680F1A", deep: "#3A0B0F", gold: "#DAAF37" };

// 01. SPLASH SCREEN — branding, elegant and premium first impression.
// Animation: fade in logo (0.5s) → progress bar (2s) → fade out (0.3s) → Welcome.
export default function Index() {
  const { t } = useLanguage();
  const router = useRouter();

  const logoOpacity = useRef(new Animated.Value(0)).current;
  const progress = useRef(new Animated.Value(0)).current;
  const screenOpacity = useRef(new Animated.Value(1)).current;
  const done = useRef(false);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(logoOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(progress, { toValue: 1, duration: 2000, useNativeDriver: false }),
      Animated.timing(screenOpacity, { toValue: 0, duration: 300, useNativeDriver: true }),
    ]).start(({ finished }) => {
      if (finished && !done.current) {
        done.current = true;
        // Hide native splash screen after React animation completes
        SplashScreen.hideAsync().catch(() => {});
        // Welcome shows only on first launch: once skipped/started, go
        // straight to Home on every later launch.
        AsyncStorage.getItem("vishal-welcome-seen")
          .then((seen) => router.replace(seen ? "/(tabs)/home" : "/welcome"))
          .catch(() => router.replace("/welcome"));
      }
    });
  }, []);

  const { width: winW } = Dimensions.get("window");
  const barW = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, winW - 2 * spacing.xxxl],
  });

  return (
    <Animated.View style={[styles.container, { opacity: screenOpacity }]}>
      <StatusBar style="light" />

      {/* 01 spec: primary maroon field, suit texture blended in subtly */}
      <Animated.Image
        source={require("../../assets/images/nvt/page1-background.webp")}
        style={styles.bg}
        resizeMode="cover"
      />
      <LinearGradient
        colors={["rgba(104,15,26,0.42)", "rgba(104,15,26,0.30)", "rgba(48,8,12,0.62)", "rgba(40,7,10,0.9)"]}
        locations={[0, 0.42, 0.68, 1]}
        style={StyleSheet.absoluteFill}
      />

      {/* Brand lockup — gold scissors mark + wordmark */}
      <Animated.View style={[styles.brand, { opacity: logoOpacity }]}>
        <View style={styles.markWrap}>
          <Animated.Image
            source={require("../../assets/images/nvt/splash-logo.webp")}
            style={styles.mark}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.nameNew}>NEW</Text>
        <Text style={styles.name}>VISHAL TAILORS</Text>
        <Text style={styles.tagline}>TAILORED FOR A BETTER YOU</Text>
      </Animated.View>

      {/* Footer: tagline, progress, loading */}
      <View style={styles.footer} pointerEvents="none">
        <Text style={styles.quote}>{t("crafting_since")}</Text>
        <View style={styles.barTrack}>
          <Animated.View style={[styles.barFill, { width: barW }]} />
        </View>
        <Text style={styles.loading}>{t("loading")}</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#680F1A" },
  bg: {
    ...StyleSheet.absoluteFill,
    width: "100%",
    height: "100%",
    opacity: 0.85,
  },

  brand: {
    position: "absolute",
    top: "17%",
    left: 0,
    right: 0,
    alignItems: "center",
  },
  markWrap: {
    width: 150,
    height: 140,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.xs,
  },
  mark: { width: 150, height: 140 },
  nameNew: {
    fontFamily: fonts.serif,
    fontSize: 20,
    letterSpacing: 9,
    color: colors.white,
    marginLeft: 8, // optically balance the wide letter-spacing
  },
  name: {
    fontFamily: fonts.serifBold,
    fontSize: 30,
    letterSpacing: 2.5,
    color: colors.white,
    marginTop: 2,
  },
  rule: {
    width: 200,
    height: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(218,175,55,0.7)",
    marginTop: 10,
  },
  tagline: {
    fontFamily: fonts.outfitSemiBold,
    fontSize: 10,
    letterSpacing: 3.4,
    color: colors.gold,
    marginTop: 12,
  },

  footer: {
    position: "absolute",
    bottom: 52,
    left: 0,
    right: 0,
    alignItems: "center",
    gap: 18,
  },
  quote: {
    fontFamily: fonts.serifItalic,
    fontSize: 18,
    color: "#F5EDE4",
    marginBottom: 6,
  },
  barTrack: {
    width: "62%",
    height: 5,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.38)",
    overflow: "hidden",
  },
  barFill: {
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.gold,
  },
  loading: {
    fontFamily: fonts.outfit,
    fontSize: 13,
    color: "rgba(255,255,255,0.92)",
    letterSpacing: 0.5,
  },
});