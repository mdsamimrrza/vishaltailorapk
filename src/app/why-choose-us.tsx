import React from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { ArrowLeft, Award, House, Ruler, Scissors, Search, Users } from "lucide-react-native";
import { useLanguage } from "../i18n/LanguageContext";
import { colors, fonts, radius, spacing } from "../theme";

// 09. WHY CHOOSE US — Page-9 spec: header (back + search), title section,
// five rounded benefit cards with circular icons, and the bottom
// "A Perfect Fit / Creates a Better You" image banner.
const features = [
  { icon: Scissors, titleKey: "wc_1_title", subKey: "wc_1_sub" },
  { icon: Award, titleKey: "wc_2_title", subKey: "wc_2_sub" },
  { icon: Ruler, titleKey: "wc_3_title", subKey: "wc_3_sub" },
  { icon: House, titleKey: "wc_4_title", subKey: "wc_4_sub" },
  { icon: Users, titleKey: "wc_5_title", subKey: "wc_5_sub" },
];

export default function WhyChooseUsScreen() {
  const { t } = useLanguage();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <StatusBar style="dark" />

      {/* Header: back + search */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={8} accessibilityLabel="Back">
          <ArrowLeft color={colors.primary} size={22} />
        </Pressable>
        <Pressable
          onPress={() => router.push("/catalogue-full")}
          hitSlop={8}
          accessibilityLabel={t("our_gallery")}
        >
          <Search color={colors.text} size={21} />
        </Pressable>
      </View>

        {/* Title */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>{t("whychoose_title")}</Text>
          <Text style={styles.subtitle}>{t("why_subtitle")}</Text>
        </View>

        {/* Benefit cards */}
        <View style={styles.cards}>
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <View key={f.titleKey} style={styles.card}>
                <View style={styles.iconCircle}>
                  <Icon color={colors.primary} size={16} strokeWidth={1.8} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>{t(f.titleKey)}</Text>
                  <Text style={styles.cardSub}>{t(f.subKey)}</Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* Perfect-fit image banner */}
        <View style={styles.banner}>
          <Image
            source={require("../../assets/images/nvt/premium-suiting.webp")}
            style={StyleSheet.absoluteFill}
            resizeMode="cover"
          />
          <View style={styles.bannerOverlay} />
          <Text style={styles.bannerMain}>{t("banner_fit")}</Text>
          <Text style={styles.bannerSub}>{t("banner_better")}</Text>
        </View>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md + 4,
    height: 56,
  },

  content: { paddingBottom: spacing.xxl },
  titleSection: {
    alignItems: "center",
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  title: {
    fontFamily: fonts.serifSemiBold,
    fontSize: 24,
    color: colors.primary,
  },
  subtitle: {
    fontFamily: fonts.outfit,
    fontSize: 12.5,
    color: colors.mutedText,
    marginTop: 4,
  },

  cards: { paddingHorizontal: spacing.md, gap: 10 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    backgroundColor: colors.card,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#F1E5D9",
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    fontFamily: fonts.serifSemiBold,
    fontSize: 15,
    color: colors.text,
  },
  cardSub: {
    fontFamily: fonts.outfit,
    fontSize: 12,
    color: colors.mutedText,
    marginTop: 2,
  },

  banner: {
    marginTop: spacing.xl,
    marginHorizontal: spacing.md,
    borderRadius: radius.md,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.xl,
  },
  bannerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(40,20,15,0.5)",
  },
  bannerMain: {
    fontFamily: fonts.serifItalic,
    fontSize: 20,
    color: colors.white,
  },
  bannerSub: {
    fontFamily: fonts.serifBold,
    fontSize: 15,
    color: colors.white,
    marginTop: 2,
  },
});
