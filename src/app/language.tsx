import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { Check, Globe, X } from "lucide-react-native";
import { useLanguage, Language } from "../i18n/LanguageContext";
import { colors, fonts, radius, spacing } from "../theme";

const LANGUAGES: { key: Language; label: string; sub: string; flag: string }[] = [
  { key: "en", label: "English", sub: "EN", flag: "🇬🇧" },
  { key: "hi", label: "हिन्दी", sub: "HI", flag: "🇮🇳" },
  { key: "ne", label: "नेपाली", sub: "NE", flag: "🇳🇵" },
];

export default function LanguageScreen() {
  const { t, language, setLanguage } = useLanguage();
  const router = useRouter();
  const close = () => router.back();

  const pick = (key: Language) => {
    setLanguage(key);
    setTimeout(close, 150);
  };

  return (
    <View style={styles.backdrop}>
      <StatusBar style="light" />
      {/* Tap outside to dismiss */}
      <Pressable style={StyleSheet.absoluteFill} onPress={close} />

      {/* Centered popup card */}
      <View style={styles.dialog}>
        <View style={styles.headRow}>
          <View style={styles.globeBadge}>
            <Globe color={colors.primary} size={20} strokeWidth={1.7} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{t("select_language")}</Text>
            <Text style={styles.subtitle}>{t("choose_language")}</Text>
          </View>
          <Pressable onPress={close} hitSlop={10} style={styles.closeBtn}>
            <X color={colors.mutedText} size={20} />
          </Pressable>
        </View>

        {LANGUAGES.map((l) => {
          const active = language === l.key;
          return (
            <Pressable
              key={l.key}
              onPress={() => pick(l.key)}
              style={({ pressed }) => [
                styles.row,
                active && styles.rowActive,
                pressed && { opacity: 0.85 },
              ]}
            >
              <Text style={styles.flag}>{l.flag}</Text>
              <Text style={[styles.label, active && styles.labelActive]}>{l.label}</Text>
              <View style={[styles.radio, active && styles.radioActive]}>
                {active ? <Check color={colors.white} size={14} /> : null}
              </View>
            </Pressable>
          );
        })}

        <Text style={styles.note}>{t("hours_note")}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(42,42,42,0.6)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.xl,
  },
  dialog: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    gap: spacing.xs,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 12,
  },
  headRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  globeBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F1E5D9",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: fonts.serifBold,
    fontSize: 22,
    color: colors.primary,
  },
  subtitle: {
    fontFamily: fonts.outfit,
    fontSize: 13,
    color: colors.mutedText,
    marginTop: 2,
  },
  closeBtn: { width: 38, height: 38, alignItems: "center", justifyContent: "center" },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingVertical: 14,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    marginBottom: spacing.xs,
  },
  rowActive: { borderColor: colors.primary, backgroundColor: "#FDF6F3" },
  flag: { fontSize: 22 },
  label: {
    flex: 1,
    fontFamily: fonts.outfitSemiBold,
    fontSize: 16,
    color: colors.mutedText,
  },
  labelActive: { color: colors.primary },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.6,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  radioActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  note: {
    fontFamily: fonts.outfit,
    fontSize: 11,
    color: colors.mutedText,
    textAlign: "center",
    marginTop: spacing.xs,
  },
});
