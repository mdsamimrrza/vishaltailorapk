import React from "react";
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import {
  Camera,
  ChevronRight,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Play,
  Phone,
  Search,
} from "lucide-react-native";
import { useLanguage } from "../../i18n/LanguageContext";
import { Img } from "../../components/Img";
import { colors, fonts, radius, spacing } from "../../theme";
import ContactMap from "../../components/ContactMap";
import { AppButton } from "../../components/ui";
import { OpenBadge } from "../../components/bits";
import { BUSINESS, mapsLink } from "../../constants/business";
import { callNumber, openWhatsApp, openMaps } from "../../utils/links";
import { isOpenNow } from "../../utils/businessHours";


// 12. CONTACT US — branded maroon header, floating map card, circular
// quick actions, address + hours cards. Distinct premium layout.
export default function ContactScreen() {
  const { t } = useLanguage();
  const router = useRouter();
  const open = isOpenNow();

  const actions = [
    {
      key: "call",
      label: t("quick_call"),
      bg: colors.primary,
      icon: <Phone color="#FFFFFF" size={20} />,
      onPress: () => callNumber(BUSINESS.phones.primaryTel),
    },
    {
      key: "wa",
      label: t("quick_whatsapp"),
      bg: colors.whatsapp,
      icon: <MessageCircle color="#FFFFFF" size={20} />,
      onPress: () => openWhatsApp(BUSINESS.whatsappNumber),
    },
    {
      key: "mail",
      label: t("email_us"),
      bg: "#5B5BD6",
      icon: <Mail color="#FFFFFF" size={20} />,
      onPress: () => Linking.openURL(`mailto:${BUSINESS.email}`).catch(() => {}),
    },
    {
      key: "dir",
      label: t("get_directions"),
      bg: colors.gold,
      icon: <Navigation color="#FFFFFF" size={20} />,
      onPress: openMaps,
    },
  ];

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <StatusBar style="light" />
        {/* ============ MAROON BRAND HEADER ============ */}
        <View style={styles.heroHeader}>
          <View style={styles.heroHeadRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.heroTitle}>{t("contact_us_title")}</Text>
              <Text style={styles.heroSubtitle}>{t("contact_subtitle")}</Text>
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

        {/* ============ FLOATING MAP CARD — live map on native ============ */}
        <Pressable
          onPress={openMaps}
          style={({ pressed }) => [styles.map, pressed && { opacity: 0.94 }]}
          accessibilityLabel={t("get_directions")}
        >
          <ContactMap onPress={openMaps} />
          <View style={styles.mapPill}>
            <Navigation color="#FFFFFF" size={12} />
            <Text style={styles.mapPillText}>{t("get_directions")}</Text>
          </View>
        </Pressable>

        {/* ============ QUICK ACTIONS — circular row ============ */}
        <View style={styles.actionsRow}>
          {actions.map((a) => (
            <Pressable
              key={a.key}
              onPress={a.onPress}
              style={({ pressed }) => [styles.actionItem, pressed && { opacity: 0.75, transform: [{ scale: 0.94 }] }]}
              accessibilityLabel={a.label}
            >
              <View style={[styles.actionCircle, { backgroundColor: a.bg }]}>{a.icon}</View>
              <Text style={styles.actionLabel} numberOfLines={1} adjustsFontSizeToFit>
                {a.label}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={{ paddingHorizontal: spacing.md, gap: spacing.md }}>
          {/* ============ REACH US DIRECTLY ============ */}
          <View>
            <Text style={styles.sectionLabel}>{t("reach_direct")}</Text>
            <View style={[styles.card, { overflow: "hidden", marginTop: 8 }]}>
              <Row
                icon={<Phone color="#FFFFFF" size={15} />}
                tint={colors.primary}
                label={t("visit_phone")}
                value={BUSINESS.phones.primaryDisplay}
                onPress={() => callNumber(BUSINESS.phones.primaryTel)}
              />
              <Row
                icon={<MessageCircle color="#FFFFFF" size={15} />}
                tint={colors.whatsapp}
                label="WhatsApp"
                value={t("quick_whatsapp")}
                onPress={() => openWhatsApp(BUSINESS.whatsappNumber)}
              />
              <Row
                icon={<Mail color="#FFFFFF" size={15} />}
                tint="#5B5BD6"
                label={t("email_us")}
                value={BUSINESS.email}
                onPress={() => Linking.openURL(`mailto:${BUSINESS.email}`).catch(() => {})}
              />
              <Row
                icon={<Navigation color="#FFFFFF" size={15} />}
                tint={colors.gold}
                label={t("get_directions")}
                value="Open in Google Maps"
                onPress={openMaps}
                last
              />
            </View>
          </View>

          {/* ============ ADDRESS CARD ============ */}
          <Pressable onPress={openMaps} style={({ pressed }) => [styles.card, styles.infoCard, pressed && { opacity: 0.94 }]}>
            <View style={styles.infoPin}>
              <MapPin color={colors.primary} size={16} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.infoName}>{t("name")}</Text>
              <Text style={styles.infoAddress}>{t("address")}</Text>
            </View>
          </Pressable>

          {/* ============ WORKING HOURS ============ */}
          <View style={[styles.card, styles.hoursCard]}>
            <View style={styles.hoursPin}>
              <Clock color="#FFFFFF" size={16} />
            </View>
            <View style={{ flex: 1, gap: 5 }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm }}>
                <Text style={styles.rowLabel}>{t("visit_hours")}</Text>
                <OpenBadge open={open} label={open ? t("open_now") : t("closed_now")} />
              </View>
              <Text style={styles.hoursLine}>{t("hours_weekday")}: {t("hours_weekday_time")}</Text>
              <Text style={styles.hoursLine}>{t("hours_saturday")}: {t("hours_saturday_time")}</Text>
            </View>
          </View>

          {/* ============ FOLLOW US ============ */}
          <View>
            <Text style={styles.sectionLabel}>Follow Us</Text>
            <View style={styles.socialRow}>
              {[
                { key: "facebook", label: "Facebook", el: <Text style={styles.socialMark}>f</Text> },
                { key: "instagram", label: "Instagram", el: <Camera color={colors.primary} size={16} /> },
                { key: "youtube", label: "YouTube", el: <Play color={colors.primary} size={15} fill={colors.primary} /> },
                { key: "linkedin", label: "LinkedIn", el: <Text style={[styles.socialMark, { fontSize: 12 }]}>in</Text> },
              ].map((s) => (
                <Pressable
                  key={s.key}
                  accessibilityLabel={s.label}
                  onPress={() => Linking.openURL(BUSINESS.website).catch(() => {})}
                  style={({ pressed }) => [styles.socialBtn, pressed && { opacity: 0.7 }]}
                >
                  {s.el}
                </Pressable>
              ))}
            </View>
          </View>

          <Text style={styles.secondaryPhone}>
            {t("call_secondary")}: {BUSINESS.phones.secondaryDisplay}
          </Text>

          <AppButton label={t("book_appointment")} onPress={() => router.push("/enquiry")} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Row({
  icon,
  tint,
  label,
  value,
  onPress,
  last,
}: {
  icon: React.ReactNode;
  tint: string;
  label: string;
  value: string;
  onPress: () => void;
  last?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.row, !last && styles.rowSep, pressed && { backgroundColor: colors.mutedSurface }]}
    >
      <View style={[styles.rowIcon, { backgroundColor: tint }]}>{icon}</View>
      <View style={{ flex: 1 }}>
        <Text style={styles.rowLabel}>{label}</Text>
        <Text style={styles.rowValue} numberOfLines={1}>
          {value}
        </Text>
      </View>
      <ChevronRight color={colors.mutedText} size={16} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },

  content: {
    paddingTop: spacing.md,
    paddingBottom: spacing.xxl,
    gap: spacing.md,
    paddingHorizontal: spacing.md,
  },

  heroHeader: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md + 4,
    paddingTop: spacing.lg,
    paddingBottom: 76,
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

  map: {
    height: 150,
    marginTop: -62,
    marginHorizontal: spacing.md,
    borderRadius: radius.md,
    backgroundColor: "#EAE6DC",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#3A0A10",
    shadowOpacity: 0.18,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  },
  blockA: {
    position: "absolute",
    left: "6%",
    top: "10%",
    width: "30%",
    height: "34%",
    backgroundColor: "#F3EFE6",
    borderRadius: 4,
  },
  blockB: {
    position: "absolute",
    right: "8%",
    top: "14%",
    width: "26%",
    height: "42%",
    backgroundColor: "#E2DDCF",
    borderRadius: 4,
  },
  blockC: {
    position: "absolute",
    left: "12%",
    bottom: "10%",
    width: "38%",
    height: "26%",
    backgroundColor: "#F3EFE6",
    borderRadius: 4,
  },
  roadH: { position: "absolute", left: 0, right: 0, top: "56%", height: 9, backgroundColor: "#FFFFFF" },
  roadV: { position: "absolute", top: 0, bottom: 0, left: "58%", width: 8, backgroundColor: "#FFFFFF" },
  roadDiag: {
    position: "absolute",
    width: 220,
    height: 5,
    backgroundColor: "#F6F2E8",
    transform: [{ rotate: "-28deg" }],
    right: "-12%",
    top: "30%",
  },
  pinWrap: { alignItems: "center", justifyContent: "center", marginTop: -18 },
  pinHalo: {
    position: "absolute",
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(229,57,53,0.15)",
  },
  mapPill: {
    position: "absolute",
    bottom: 10,
    right: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  mapPillText: {
    fontFamily: fonts.outfitSemiBold,
    fontSize: 10.5,
    color: "#FFFFFF",
  },

  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: spacing.md,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  actionItem: { flex: 1, alignItems: "center", gap: 7 },
  actionCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  actionLabel: {
    fontFamily: fonts.outfitSemiBold,
    fontSize: 11,
    color: colors.text,
    textAlign: "center",
  },

  sectionLabel: {
    fontFamily: fonts.outfitBold,
    fontSize: 12,
    letterSpacing: 1.6,
    textTransform: "uppercase",
    color: "#B58A1B",
  },
  card: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingVertical: 11,
    paddingHorizontal: spacing.sm,
  },
  rowSep: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  rowIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  rowLabel: { fontFamily: fonts.outfitBold, fontSize: 13, color: colors.text },
  rowValue: { fontFamily: fonts.outfit, fontSize: 12, color: colors.mutedText, marginTop: 1 },

  socialRow: { flexDirection: "row", gap: 10, marginTop: 8 },
  socialBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#F1E5D9",
    alignItems: "center",
    justifyContent: "center",
  },
  socialMark: {
    fontFamily: fonts.serifBold,
    fontSize: 16,
    color: colors.primary,
  },

  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  infoPin: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F1E5D9",
    alignItems: "center",
    justifyContent: "center",
  },
  infoName: { fontFamily: fonts.serifSemiBold, fontSize: 15, color: colors.text },
  infoAddress: { fontFamily: fonts.outfit, fontSize: 12.5, color: colors.mutedText, marginTop: 2 },

  hoursCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.md,
  },
  hoursPin: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.primaryDeep,
    alignItems: "center",
    justifyContent: "center",
  },
  hoursLine: { fontFamily: fonts.outfit, fontSize: 12.5, color: colors.text },
  secondaryPhone: {
    fontFamily: fonts.outfit,
    fontSize: 12.5,
    color: colors.mutedText,
    textAlign: "center",
  },
});
