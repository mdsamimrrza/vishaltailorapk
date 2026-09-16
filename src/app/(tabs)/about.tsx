import React from "react";
import {
    Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import {
  Award,
  Check,
  ChevronRight,
  Clock,
  Crown,
  Gem,
  HeartHandshake,
  Scissors,
  Search,
  ThumbsUp,
  Users,
} from "lucide-react-native";
import { useLanguage } from "../../i18n/LanguageContext";
import { Img } from "../../components/Img";
import { colors, fonts, radius, spacing } from "../../theme";
import { AppButton, SectionHeader } from "../../components/ui";
import { fabrics } from "../../data/fabrics";
import { whyCards } from "../../data/whyChooseUs";
import { BUSINESS } from "../../constants/business";

// 08. ABOUT US — maroon brand header with floating banner card, then
// story, features, stats, values, quote, owner, why-link and fabrics cards.
export default function AboutScreen() {
  const { t, language } = useLanguage();
  const router = useRouter();
  const { width: winW } = useWindowDimensions();

  // Every photo renders at its true aspect ratio — never cropped.
  // Banner frame is sized to the card's real rendered width (capped on web).
  const bannerH = Math.round(Math.min(winW - spacing.md * 2, 560) / (1942 / 809));
  const valsW = Math.round(Math.min(winW * 0.34, 160));
  const valsH = Math.round(valsW * (1280 / 896));
  const ownerW = Math.round(Math.min(winW * 0.62, 340));
  const ownerH = Math.round(ownerW * (1517 / 1037));

  const stats = [
    { num: "30+", label: t("about_stat_years") },
    { num: "10k+", label: t("about_stat_garments") },
    { num: "5k+", label: t("about_stat_clients") },
  ];

  const features = [
    { icon: Gem, label: t("hp_quality") },
    { icon: Scissors, label: t("hp_tailoring") },
    { icon: Crown, label: t("hp_designs") },
    { icon: Users, label: t("hp_satisfaction") },
  ];

  const values = [
    t("aboutus_val_stitch"),
    t("aboutus_val_service"),
    t("aboutus_val_luxury"),
    t("aboutus_val_tradition"),
  ];

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <StatusBar style="light" />
        {/* ============ MAROON BRAND HEADER ============ */}
        <View style={styles.heroHeader}>
          <View style={styles.heroHeadRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.heroTitle}>{t("aboutus_title")}</Text>
              <Text style={styles.heroSubtitle}>{t("tailored_for")}</Text>
            </View>
            <Pressable
              onPress={() => router.push("/catalogue-full")}
              hitSlop={8}
              accessibilityLabel={t("our_gallery")}
            >
              <Search color="#FFFFFF" size={20} />
            </Pressable>
          </View>
          <View style={styles.heroRule} />
        </View>

        {/* ============ FLOATING BANNER CARD ============ */}
        <Img
          source={require("../../../assets/images/nvt/page8-banner.webp")}
          style={[styles.bannerCard, { height: bannerH }]}
        />

        <View style={{ paddingHorizontal: spacing.md, gap: spacing.xl }}>
          {/* ============ OUR STORY ============ */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>{t("our_story")}</Text>
            <Text style={styles.desc}>{t("aboutus_story")}</Text>
            <Img
              source={require("../../../assets/images/nvt/tools.webp")}
              style={styles.storyImage}
            />
          </View>

          {/* ============ FEATURE CIRCLES ============ */}
          <View style={styles.featuresRow}>
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <View key={f.label} style={styles.featureItem}>
                  <View style={styles.featureCircle}>
                    <Icon color={colors.primary} size={19} strokeWidth={1.7} />
                  </View>
                  <Text style={styles.featureLabel} numberOfLines={2}>
                    {f.label}
                  </Text>
                </View>
              );
            })}
          </View>

          {/* ============ STATS ============ */}
          <View style={styles.card}>
            <View style={styles.statsRow}>
              {stats.map((s, i) => (
                <View key={s.label} style={[styles.statCell, i > 0 && styles.statSep]}>
                  <Text style={styles.statNum}>{s.num}</Text>
                  <Text style={styles.statLabel}>{s.label}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* ============ OUR VALUES ============ */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>{t("our_values")}</Text>
            <View style={[styles.card, styles.valuesCard]}>
              <Img
                source={require("../../../assets/images/nvt/hands.webp")}
                style={[styles.valuesImage, { width: valsW, height: valsH }]}
              />
              <View style={styles.valuesList}>
                {values.map((v) => (
                  <View key={v} style={styles.valueRow}>
                    <View style={styles.valueCheck}>
                      <Check color="#FFFFFF" size={12} strokeWidth={3.2} />
                    </View>
                    <Text style={styles.valueText}>{v}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* ============ DIVIDER + QUOTE ============ */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerRule} />
            <Text style={styles.dividerDiamond}>◆</Text>
            <View style={styles.dividerRule} />
          </View>
          <Text style={styles.quote}>{t("aboutus_quote")}</Text>

          {/* ============ OWNER ============ */}
          <View style={styles.section}>
            <SectionHeader
              eyebrow={t("owner_section_eyebrow")}
              title={t("owner_section_title")}
            />
            <Img
              source={require("../../../assets/images/nvt/molbi.webp")}
              style={[styles.ownerImage, { width: ownerW, height: ownerH }]}
            />
            <Text style={styles.ownerRole}>{t("owner_section_subtitle")}</Text>
            <Text style={[styles.desc, { marginTop: spacing.sm }]}>
              {t("owner_section_desc")}
            </Text>
          </View>

          {/* ============ PILLARS ============ */}
          <View style={styles.pillarsRow}>
            {[
              {
                icon: Award,
                label:
                  language === "en"
                    ? "Quality Craftsmanship"
                    : whyCards[0].title[language as "en"],
              },
              {
                icon: HeartHandshake,
                label:
                  language === "en"
                    ? "Personalized Service"
                    : whyCards[2].title[language as "en"],
              },
              {
                icon: Clock,
                label:
                  language === "en" ? "On-Time Delivery" : whyCards[3].title[language as "en"],
              },
            ].map((p) => {
              const Icon = p.icon;
              return (
                <View key={p.label} style={styles.pillarItem}>
                  <View style={styles.pillarCircle}>
                    <Icon color={colors.primary} size={19} strokeWidth={1.7} />
                  </View>
                  <Text style={styles.pillarLabel} numberOfLines={2}>
                    {p.label}
                  </Text>
                </View>
              );
            })}
          </View>

          {/* ============ WHY CHOOSE US LINK ============ */}
          <Pressable
            onPress={() => router.push("/why-choose-us")}
            style={({ pressed }) => [styles.card, styles.whyCard, pressed && { opacity: 0.94 }]}
          >
            <View style={styles.whyIconWrap}>
              <ThumbsUp color={colors.primary} size={17} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.whyTitle}>{t("whychoose_title")}</Text>
              <Text style={styles.whySub}>{t("why_subtitle")}</Text>
            </View>
            <ChevronRight color={colors.mutedText} size={16} />
          </Pressable>

          {/* ============ FABRICS ============ */}
          <View style={styles.section}>
            <SectionHeader
              eyebrow={t("fabrics_eyebrow")}
              title={t("fabrics_title")}
              subtitle={t("fabrics_desc")}
            />
            <View style={[styles.card, { overflow: "hidden" }]}>
              {fabrics.map((f, i) => (
                <View key={f.id} style={[styles.fabricRow, i < fabrics.length - 1 && styles.rowSep]}>
                  <Img source={f.image} style={styles.fabricImage} />
                  <View style={{ flex: 1, gap: 2 }}>
                    <Text style={styles.fabricTitle}>{t(f.titleKey)}</Text>
                    <Text style={styles.fabricDesc}>{t(f.descKey)}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* ============ GOLD BANNER + LINKS ============ */}
          <View style={styles.goldBanner}>
            <Text style={styles.goldBannerText}>{t("perfect_banner")}</Text>
            <Text style={styles.goldBannerPhone}>{BUSINESS.phones.primaryDisplay}</Text>
          </View>

          <View style={{ gap: spacing.sm }}>
            <AppButton
              label={t("how_we_work")}
              variant="secondary"
              small
              onPress={() => router.push("/process")}
            />
            <AppButton
              label={t("faq_title")}
              variant="secondary"
              small
              onPress={() => router.push("/faq")}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },

  heroHeader: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md + 4,
    paddingTop: spacing.lg,
    paddingBottom: 70,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  heroHeadRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.md,
  },
  heroTitle: {
    fontFamily: fonts.serifBold,
    fontSize: 28,
    lineHeight: 34,
    color: "#FFFFFF",
  },
  heroSubtitle: {
    fontFamily: fonts.outfit,
    fontSize: 13,
    color: "#E8C964",
    marginTop: 4,
  },
  heroRule: {
    width: 46,
    height: 2,
    backgroundColor: colors.gold,
    marginTop: 14,
    borderRadius: 1,
  },

  bannerCard: {
    marginTop: -54,
    marginHorizontal: spacing.md,
    alignSelf: "center",
    width: "100%",
    maxWidth: 560,
    borderRadius: radius.md,
    backgroundColor: colors.mutedSurface,
    shadowColor: "#3A0A10",
    shadowOpacity: 0.2,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  },

  section: {},
  sectionLabel: {
    fontFamily: fonts.outfitBold,
    fontSize: 12,
    letterSpacing: 1.6,
    textTransform: "uppercase",
    color: "#B58A1B",
    marginBottom: 8,
  },
  desc: { fontFamily: fonts.outfit, fontSize: 14, lineHeight: 23, color: colors.text },
  storyImage: {
    width: "100%",
    height: 190,
    borderRadius: radius.md,
    marginTop: spacing.md,
    backgroundColor: colors.mutedSurface,
  },

  featuresRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: spacing.xs,
  },
  featureItem: { alignItems: "center", flex: 1, maxWidth: 92, gap: 7 },
  featureCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderColor: colors.gold,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  featureLabel: {
    fontFamily: fonts.outfitSemiBold,
    fontSize: 11,
    color: colors.text,
    textAlign: "center",
    lineHeight: 14,
  },

  card: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  statsRow: { flexDirection: "row", paddingVertical: 4 },
  statCell: { flex: 1, alignItems: "center", gap: 2 },
  statSep: { borderLeftWidth: StyleSheet.hairlineWidth, borderLeftColor: colors.border },
  statNum: { fontFamily: fonts.serifBold, fontSize: 22, color: colors.primary },
  statLabel: {
    fontFamily: fonts.outfit,
    fontSize: 10,
    color: colors.mutedText,
    textAlign: "center",
    paddingHorizontal: 4,
  },

  valuesCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  valuesImage: {
    borderRadius: radius.sm,
    backgroundColor: colors.mutedSurface,
  },
  valuesList: { flex: 1, gap: 10 },
  valueRow: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  valueCheck: {
    width: 21,
    height: 21,
    borderRadius: 11,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  valueText: { fontFamily: fonts.outfitMedium, fontSize: 13, color: colors.text, flex: 1 },

  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    paddingHorizontal: spacing.xl,
  },
  dividerRule: { flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: colors.gold },
  dividerDiamond: { color: colors.gold, fontSize: 12 },
  quote: {
    fontFamily: fonts.serifItalic,
    fontSize: 18,
    color: colors.primary,
    textAlign: "center",
    marginTop: spacing.sm,
    paddingHorizontal: spacing.xl,
  },

  ownerImage: {
    alignSelf: "center",
    resizeMode: "cover",
    marginTop: spacing.sm,
    marginBottom: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.mutedSurface,
  },
  ownerRole: {
    fontFamily: fonts.outfitBold,
    fontSize: 12,
    letterSpacing: 1.6,
    textTransform: "uppercase",
    color: colors.goldDeep,
  },

  pillarsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: spacing.xs,
  },
  pillarItem: { alignItems: "center", flex: 1, maxWidth: 100, gap: 7 },
  pillarCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.card,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  pillarLabel: {
    fontFamily: fonts.outfitSemiBold,
    fontSize: 11,
    color: colors.text,
    textAlign: "center",
    lineHeight: 14,
  },

  whyCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  whyIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#F1E5D9",
    alignItems: "center",
    justifyContent: "center",
  },
  whyTitle: { fontFamily: fonts.outfitBold, fontSize: 14, color: colors.text },
  whySub: { fontFamily: fonts.outfit, fontSize: 12, color: colors.mutedText, marginTop: 2 },

  fabricRow: {
    flexDirection: "row",
    gap: spacing.md,
    paddingVertical: 11,
    alignItems: "center",
  },
  rowSep: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  fabricImage: { width: 56, height: 56, borderRadius: radius.sm, resizeMode: "cover" },
  fabricTitle: { fontFamily: fonts.outfitBold, fontSize: 13.5, color: colors.text },
  fabricDesc: { fontFamily: fonts.outfit, fontSize: 12, lineHeight: 17, color: colors.mutedText },

  goldBanner: {
    backgroundColor: colors.gold,
    borderRadius: radius.md,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    alignItems: "center",
    gap: 4,
  },
  goldBannerText: {
    fontFamily: fonts.serifBold,
    fontSize: 20,
    color: colors.primaryDeep,
    textAlign: "center",
  },
  goldBannerPhone: {
    fontFamily: fonts.outfitBold,
    fontSize: 13,
    letterSpacing: 1,
    color: colors.primaryDeep,
  },
});
