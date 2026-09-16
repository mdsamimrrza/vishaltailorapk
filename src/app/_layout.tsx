import React, { useCallback, useEffect } from "react";
import { BackHandler, Platform, View } from "react-native";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  useFonts as usePlayfair,
  PlayfairDisplay_400Regular_Italic,
  PlayfairDisplay_500Medium,
  PlayfairDisplay_600SemiBold,
  PlayfairDisplay_700Bold,
  PlayfairDisplay_700Bold_Italic,
} from "@expo-google-fonts/playfair-display";
import {
  useFonts as useInter,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { useFonts as useExpoFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { LanguageProvider } from "../i18n/LanguageContext";
import { colors } from "../theme";

SplashScreen.preventAutoHideAsync().catch(() => {});

// Devanagari (Nepali/Hindi) - local font
function useDevanagariFont() {
  const [loaded] = useExpoFonts({
    "tiro-400": require("../../assets/fonts/tiro-400.ttf"),
  });
  return loaded;
}

export default function RootLayout() {
  const router = useRouter();

  // Android hardware back: pop ONE screen when the stack can go back,
  // otherwise fall through to the system (exit from the root). Without
  // this, some Android builds close the app from any depth.
  useEffect(() => {
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      if (router.canDismiss()) {
        router.back();
        return true;
      }
      return false;
    });
    return () => sub.remove();
  }, [router]);

  const [playfairLoaded] = usePlayfair({
    PlayfairDisplay_500Medium,
    PlayfairDisplay_600SemiBold,
    PlayfairDisplay_700Bold,
    PlayfairDisplay_700Bold_Italic,
    PlayfairDisplay_400Regular_Italic,
  });
  const [interLoaded] = useInter({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });
  const devanagariLoaded = useDevanagariFont();

  const fontsLoaded = playfairLoaded && interLoaded && devanagariLoaded;

  const onLayoutRootView = useCallback(() => {
    if (fontsLoaded) SplashScreen.hideAsync().catch(() => {});
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <LanguageProvider>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.background },
            animation: "slide_from_right",
          }}
        >
          <Stack.Screen name="index" options={{ animation: "fade" }} />
          <Stack.Screen name="welcome" options={{ animation: "fade" }} />
          <Stack.Screen name="developers" options={{ animation: "fade" }} />
          <Stack.Screen
            name="language"
            options={{ presentation: "transparentModal", animation: "fade", headerShown: false }}
          />
          {/* Heavy screens — lazy-loaded to reduce startup bundle */}
          <Stack.Screen name="image-viewer" options={{ lazy: true, animation: "fade" }} />
          <Stack.Screen name="catalogue-full" options={{ lazy: true }} />
          <Stack.Screen name="enquiry" options={{ lazy: true }} />
          <Stack.Screen name="catalogue/[id]" options={{ lazy: true }} />
          <Stack.Screen name="service/[id]" options={{ lazy: true }} />
          <Stack.Screen name="why-choose-us" options={{ lazy: true }} />
          <Stack.Screen name="testimonials" options={{ lazy: true }} />
          <Stack.Screen name="process" options={{ lazy: true }} />
          <Stack.Screen name="faq" options={{ lazy: true }} />
        </Stack>
      </LanguageProvider>
    </View>
  );
}
