import React from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Share2, MessageCircle, Maximize2 } from "lucide-react-native";
import { useLanguage } from "../../i18n/LanguageContext";
import { colors, fonts, radius, spacing } from "../../theme";
import { AppButton } from "../../components/ui";
import { ScreenHeader } from "../../components/ScreenHeader";
import {
  catalogueItems,
  catalogueImage,
  localizedName,
  localizedDesc,
  localizedTags,
  localizedFit,
  localizedFabric,
  localizedColor,
  catalogueWhatsAppMessage,
} from "../../data/catalogue";
import { BUSINESS } from "../../constants/business";
import { openWhatsApp, shareText } from "../../utils/links";

export default function CatalogueDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t, language } = useLanguage();
  const router = useRouter();
  const item = catalogueItems.find((i) => i.id === id);

  if (!item) {
    return (
      <SafeAreaView style={styles.safe}>
        <ScreenHeader />
        <View style={styles.missing}>
          <Text style={styles.missingText}>{t("error_desc")}</Text>
        </View>
      </SafeAreaView>
    );
  }

  const name = localizedName(item, language);
  const tags = localizedTags(item, language);

  const openViewer = () =>
    router.push({
      pathname: "/image-viewer",
      params: { id: item.id, title: name, ids: catalogueItems.map((i) => i.id).join(",") },
    });

  const share = () =>
    shareText(
      `Check out this design from New Vishal Tailors:\n${name} – ${item.id}\n${BUSINESS.website}`
    );

  return (
    <View style={styles.safe}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={{ paddingBottom: spacing.xxl }} showsVerticalScrollIndicator={false}>
        {/* Hero with zoom */}
        <View>
          <Pressable onPress={openViewer}>
            <Image source={catalogueImage(item)} style={styles.image} resizeMode="cover" />
            <LinearGradient
              colors={["rgba(40,5,10,0.3)", "rgba(40,5,10,0)", "rgba(40,5,10,0.45)"]}
              locations={[0, 0.4, 1]}
              style={StyleSheet.absoluteFill}
            />
            <View style={styles.zoomHint}>
              <Maximize2 color={colors.white} size={13} />
              <Text style={styles.zoomHintText}>{t("view_full_screen")}</Text>
            </View>
          </Pressable>
          <ScreenHeader variant="overlay" />
        </View>

        <View style={[styles.body, styles.contentSheet]}>
          <View style={styles.titleRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.id}>{item.id}</Text>
              <Text style={styles.name}>{name}</Text>
            </View>
            <Pressable
              accessibilityLabel={t("share")}
              onPress={share}
              style={({ pressed }) => [styles.shareBtn, pressed && { opacity: 0.7 }]}
            >
              <Share2 color={colors.primary} size={18} />
            </Pressable>
          </View>

          <Text style={styles.desc}>{localizedDesc(item, language)}</Text>

          <View style={styles.specCard}>
            <SpecRow label={t("catalogue_fit")} value={localizedFit(item, language)} />
            <SpecRow label={t("catalogue_fabric")} value={localizedFabric(item, language)} sep />
            <SpecRow label={t("catalogue_color")} value={localizedColor(item, language)} sep />
          </View>

          <Text style={styles.tags} numberOfLines={2}>
            {tags.join("  ·  ")}
          </Text>

          <View style={styles.brandingRow}>
            <View style={styles.brandingRule} />
            <Text style={styles.branding}>{t("catalogue_signature_branding")}</Text>
            <View style={styles.brandingRule} />
          </View>

          <View style={styles.actions}>
            <AppButton
              label={t("enquire_whatsapp")}
              icon={<MessageCircle color={colors.white} size={16} />}
              onPress={() =>
                openWhatsApp(BUSINESS.whatsappNumber, catalogueWhatsAppMessage(item, name))
              }
            />
            <AppButton label={t("view_full_screen")} variant="secondary" onPress={openViewer} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function SpecRow({ label, value, sep }: { label: string; value: string; sep?: boolean }) {
  return (
    <View style={[styles.specRow, sep && styles.specSep]}>
      <Text style={styles.specLabel}>{label}</Text>
      <Text style={styles.specValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  image: { width: "100%", height: 400, backgroundColor: colors.mutedSurface },
  zoomHint: {
    position: "absolute",
    right: spacing.md,
    bottom: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(99,9,17,0.55)",
    borderRadius: radius.pill,
    paddingHorizontal: spacing.xs,
    paddingVertical: 6,
  },
  zoomHintText: {
    fontFamily: fonts.outfitSemiBold,
    fontSize: 9,
    letterSpacing: 1.4,
    textTransform: "uppercase",
    color: colors.white,
  },
  contentSheet: {
    marginTop: -24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: colors.background,
  },
  body: { padding: spacing.md, gap: spacing.md },
  titleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm,
  },
  id: {
    fontFamily: fonts.outfitBold,
    fontSize: 11,
    letterSpacing: 2,
    color: colors.goldDeep,
    marginBottom: 4,
  },
  name: {
    fontFamily: fonts.serifBold,
    fontSize: 27,
    lineHeight: 33,
    color: colors.primary,
  },
  shareBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.card,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  desc: {
    fontFamily: fonts.outfit,
    fontSize: 14.5,
    lineHeight: 22,
    color: colors.mutedText,
  },
  specCard: {
    backgroundColor: colors.card,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
  },
  specRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    gap: spacing.md,
    paddingVertical: spacing.sm,
  },
  specSep: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  specLabel: {
    fontFamily: fonts.outfitSemiBold,
    fontSize: 11,
    letterSpacing: 1.4,
    textTransform: "uppercase",
    color: colors.goldDeep,
  },
  specValue: {
    fontFamily: fonts.outfitMedium,
    fontSize: 14,
    color: colors.text,
    flex: 1,
    textAlign: "right",
  },
  tags: {
    fontFamily: fonts.outfit,
    fontSize: 12,
    letterSpacing: 0.6,
    color: colors.mutedText,
    textAlign: "center",
  },
  brandingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
  },
  brandingRule: { width: 24, height: StyleSheet.hairlineWidth, backgroundColor: colors.gold },
  branding: {
    fontFamily: fonts.serifItalic,
    fontSize: 15,
    color: colors.goldDeep,
    letterSpacing: 0.6,
  },
  actions: { gap: spacing.sm },
  missing: { flex: 1, alignItems: "center", justifyContent: "center" },
  missingText: { fontFamily: fonts.outfit, fontSize: 15, color: colors.mutedText },
});
