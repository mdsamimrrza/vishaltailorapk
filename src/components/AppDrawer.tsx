import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, Image, Linking, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  Camera,
  HelpCircle,
  House,
  Images,
  Info,
  LayoutGrid,
  Mail,
  MessageCircle,
  Phone,
  Play,
  Globe,
  Code,
  X,
} from "lucide-react-native";
import { useLanguage } from "../i18n/LanguageContext";
import { colors, fonts, spacing } from "../theme";
import { BUSINESS } from "../constants/business";

type Item = { icon: any; label: string; href: string };

// App-wide drawer access: <DrawerProvider> renders the drawer once and any
// screen can call useDrawer().open() (home + services hamburgers, etc.).
const DrawerContext = React.createContext<{ open: () => void }>({ open: () => {} });
export const useDrawer = () => React.useContext(DrawerContext);

export function DrawerProvider({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = React.useState(false);
  return (
    <DrawerContext.Provider value={{ open: () => setVisible(true) }}>
      {children}
      <AppDrawer visible={visible} onClose={() => setVisible(false)} />
    </DrawerContext.Provider>
  );
}

// 15. SIDE MENU — Page-15 spec: brand header with logo, menu list with the
// Language row highlighted, Follow Us socials, and the version/tagline footer.
export function AppDrawer({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const { language } = useLanguage();
  const router = useRouter();
  const slide = useRef(new Animated.Value(-panelW)).current;
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slide, { toValue: 0, duration: 260, useNativeDriver: true }),
        Animated.timing(fade, { toValue: 1, duration: 220, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slide, { toValue: -panelW, duration: 200, useNativeDriver: true }),
        Animated.timing(fade, { toValue: 0, duration: 180, useNativeDriver: true }),
      ]).start();
    }
  }, [visible]);

  // Exact labels from the Page-15 spec (brand voice stays English).
  const items: Item[] = [
    { icon: House, label: "Home", href: "/(tabs)/home" },
    { icon: LayoutGrid, label: "Services", href: "/(tabs)/services" },
    { icon: Images, label: "Gallery", href: "/(tabs)/catalogue" },
    { icon: Info, label: "About Us", href: "/(tabs)/about" },
    { icon: MessageCircle, label: "Testimonials", href: "/testimonials" },
    { icon: HelpCircle, label: "FAQ", href: "/faq" },
    { icon: Phone, label: "Contact Us", href: "/(tabs)/contact" },
    { icon: Mail, label: "Enquiry", href: "/enquiry" },
    { icon: Code, label: "Developers", href: "/developers" },
  ];

  // Brand marks: this lucide build ships no brand icons, so Facebook and
  // LinkedIn use letter marks and Instagram/YouTube use camera/play glyphs.
  const socials: { key: string; label: string; render: () => React.ReactNode }[] = [
    { key: "facebook", label: "Facebook", render: () => <Text style={styles.socialMark}>f</Text> },
    { key: "instagram", label: "Instagram", render: () => <Camera color={colors.primary} size={16} /> },
    { key: "youtube", label: "YouTube", render: () => <Play color={colors.primary} size={15} fill={colors.primary} /> },
    { key: "linkedin", label: "LinkedIn", render: () => <Text style={[styles.socialMark, { fontSize: 12 }]}>in</Text> },
  ];

  const go = (href: string) => {
    onClose();
    // navigate() switches to the existing tab instead of stacking a new
    // copy — keeps the back history clean (no home flashes on back).
    setTimeout(() => router.navigate(href as any), 220);
  };

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <Animated.View style={[styles.backdrop, { opacity: fade }]}>
          <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        </Animated.View>
        <Animated.View style={[styles.panel, { transform: [{ translateX: slide }] }]}>
          <SafeAreaView style={{ flex: 1 }}>
            {/* Brand header — logo centered, close pinned top-right */}
            <View style={styles.brand}>
              <Image
                source={require("../../assets/images/nvt/splash-logo.webp")}
                style={styles.logo}
                resizeMode="contain"
              />
              <Pressable onPress={onClose} hitSlop={10} style={styles.closeBtn}>
                <X color="#2C2C2C" size={22} />
              </Pressable>
            </View>
            <View style={styles.brandText}>
              <Text style={styles.brandNew}>NEW</Text>
              <Text style={styles.brandName}>VISHAL TAILORS</Text>
              <Text style={styles.brandTag}>TAILORED FOR A BETTER YOU</Text>
            </View>

            {/* Menu list */}
            <View style={styles.list}>
              {items.map((item, i) => {
                const Icon = item.icon;
                return (
                  <Pressable
                    key={item.href + i}
                    onPress={() => go(item.href)}
                    style={({ pressed }) => [styles.row, pressed && { backgroundColor: colors.mutedSurface }]}
                  >
                    <Icon color="#2C2C2C" size={19} strokeWidth={1.6} />
                    <Text style={styles.rowLabel}>{item.label}</Text>
                  </Pressable>
                );
              })}

              {/* Language — highlighted, opens the centered popup (screen 14) */}
              <Pressable
                onPress={() => go("/language")}
                style={({ pressed }) => [styles.row, styles.rowLang, pressed && { opacity: 0.8 }]}
              >
                <Globe color={colors.primary} size={19} strokeWidth={1.6} />
                <Text style={[styles.rowLabel, styles.rowLabelPrimary]}>Language</Text>
                <Text style={styles.rowLangCurrent}>
                  {language === "en" ? "English" : language === "ne" ? "नेपाली" : "हिन्दी"}
                </Text>
              </Pressable>
            </View>

            <View style={styles.divider} />

            {/* Follow us */}
            <Text style={styles.followTitle}>Follow Us</Text>
            <View style={styles.socialRow}>
              {socials.map((s) => (
                <Pressable
                  key={s.key}
                  accessibilityLabel={s.label}
                  onPress={() => Linking.openURL(BUSINESS.website).catch(() => {})}
                  style={({ pressed }) => [styles.socialBtn, pressed && { opacity: 0.75 }]}
                >
                  {s.render()}
                </Pressable>
              ))}
            </View>

            <View style={{ flex: 1 }} />

            {/* Footer: version + tagline */}
            <View style={styles.footer}>
              <Text style={styles.version}>v1.0.0</Text>
              <Text style={styles.footerTagline}>Crafting Confidence Since Generations</Text>
            </View>
          </SafeAreaView>
        </Animated.View>
      </View>
    </Modal>
  );
}

const panelW = Math.min(300, Dimensions.get("window").width * 0.78);

const styles = StyleSheet.create({
  backdrop: { ...StyleSheet.absoluteFill, backgroundColor: "rgba(0,0,0,0.4)" },
  panel: {
    width: panelW,
    height: "100%",
    backgroundColor: "#FFFDF8",
    paddingHorizontal: spacing.lg,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: colors.border,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 16,
    shadowOffset: { width: 4, height: 0 },
    elevation: 8,
  },

  brand: {
    alignSelf: "stretch",
    alignItems: "center",
    paddingTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  logo: { width: 80, height: 60 },
  closeBtn: {
    position: "absolute",
    top: 4,
    right: -8,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  brandText: { alignItems: "center", marginBottom: spacing.md },
  brandNew: {
    fontFamily: fonts.outfitBold,
    fontSize: 10,
    letterSpacing: 5,
    color: colors.goldDeep,
  },
  brandName: {
    fontFamily: fonts.serifBold,
    fontSize: 19,
    letterSpacing: 1,
    color: colors.primary,
    marginTop: 1,
  },
  brandTag: {
    fontFamily: fonts.outfitMedium,
    fontSize: 9,
    letterSpacing: 1.6,
    textTransform: "uppercase",
    color: colors.mutedText,
    marginTop: 3,
  },

  list: { gap: 2 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingVertical: 11,
    paddingHorizontal: spacing.sm,
    borderRadius: 12,
  },
  rowLabel: {
    fontFamily: fonts.outfitMedium,
    fontSize: 15,
    color: "#2C2C2C",
    flex: 1,
  },
  rowLang: {
    backgroundColor: "#F7EDE8",
    marginTop: spacing.xs,
  },
  rowLabelPrimary: { color: colors.primary },
  rowLangCurrent: {
    fontFamily: fonts.outfit,
    fontSize: 12,
    color: colors.mutedText,
  },

  divider: {
    height: 1,
    backgroundColor: "#E8E1DA",
    marginVertical: spacing.md,
  },

  followTitle: {
    fontFamily: fonts.outfitMedium,
    fontSize: 13,
    color: colors.mutedText,
    marginBottom: spacing.sm,
  },
  socialRow: { flexDirection: "row", gap: 10 },
  socialBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F1E5D9",
    alignItems: "center",
    justifyContent: "center",
  },
  socialMark: {
    fontFamily: fonts.serifBold,
    fontSize: 16,
    color: colors.primary,
  },

  footer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingBottom: spacing.md,
  },
  version: {
    fontFamily: fonts.outfit,
    fontSize: 12,
    color: "#8A817C",
  },
  footerTagline: {
    fontFamily: fonts.serifItalic,
    fontSize: 12,
    color: colors.mutedText,
    textAlign: "right",
    flex: 1,
    marginLeft: spacing.md,
  },
});
