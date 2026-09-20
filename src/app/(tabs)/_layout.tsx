import React from "react";
import { Tabs } from "expo-router";
import { House, LayoutGrid, Image, Info, Phone } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLanguage } from "../../i18n/LanguageContext";
import { DrawerProvider } from "../../components/AppDrawer";

// Bottom navigation per Page-3 spec: cream bar, filled maroon active icon,
// bold maroon label; inactive = dark outline. bg #FFF8ED, text #241515.
const C = {
  primary: "#680F1A",
  bg: "#FFF8ED",
  border: "#EFE7DA",
  text: "#241515",
  inactive: "#6B625E",
};

export default function TabsLayout() {
  const { t } = useLanguage();
  const insets = useSafeAreaInsets();
  return (
    <DrawerProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: C.primary,
          tabBarInactiveTintColor: C.inactive,
          tabBarStyle: {
            backgroundColor: C.bg,
            borderTopColor: C.border,
            // Include the home-indicator inset (iPhone X+) so labels never clip.
            height: 62 + insets.bottom,
            paddingBottom: 8 + insets.bottom,
            paddingTop: 6,
          },
        tabBarLabelStyle: {
          fontFamily: "Inter_600SemiBold",
          fontSize: 11,
        },
        sceneStyle: { backgroundColor: C.bg },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: t("tab_home"),
          tabBarIcon: ({ color, focused }) => (
            <House color={color} size={22} fill={focused ? color : "none"} strokeWidth={focused ? 0 : 1.8} />
          ),
        }}
      />
      <Tabs.Screen
        name="services"
        options={{
          title: t("tab_services"),
          tabBarIcon: ({ color, focused }) => (
            <LayoutGrid color={color} size={22} fill={focused ? color : "none"} strokeWidth={focused ? 0 : 1.8} />
          ),
        }}
      />
      <Tabs.Screen
        name="catalogue"
        options={{
          title: t("tab_catalogue"),
          tabBarIcon: ({ color, focused }) => (
            <Image color={color} size={22} strokeWidth={focused ? 2.2 : 1.8} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: t("tab_about"),
          tabBarIcon: ({ color, focused }) => (
            <Info color={color} size={22} fill={focused ? color : "none"} strokeWidth={focused ? 0 : 1.8} />
          ),
        }}
      />
      <Tabs.Screen
        name="contact"
        options={{
          title: t("tab_contact"),
          tabBarIcon: ({ color, focused }) => (
            <Phone color={color} size={22} strokeWidth={focused ? 2.2 : 1.8} />
          ),
        }}
      />
      {/* Detail routes live inside the tab group so the bottom bar stays
          visible (per the Page-5 spec) but must not appear as tabs. */}
      <Tabs.Screen name="service/[id]" options={{ href: null }} />
      </Tabs>
    </DrawerProvider>
  );
}
