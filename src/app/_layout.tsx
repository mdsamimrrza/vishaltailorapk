import React, { useCallback, useEffect } from "react";
import { BackHandler, View } from "react-native";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  useFonts as usePlayfair,
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

  // Load fonts in the background. DO NOT block rendering — on low-end
  // devices (Moto G45 5G) synchronous font loading exceeds Android's
  // 5-second ANR threshold and kills the app.
  const [playfairLoaded] = usePlayfair({
    PlayfairDisplay_500Medium,
    PlayfairDisplay_600SemiBold,
    PlayfairDisplay_700Bold,
    PlayfairDisplay_700Bold_Italic,
  });
  const [interLoaded] = useInter({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });
  const devanagariLoaded = useDevanagariFont();

  // Splash screen is now hidden by Index screen after its animation completes.
  // This prevents flash and ensures smooth transition from native splash to app.

  return (
    <View style={{ flex: 1 }}>
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
