import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLanguage } from "../i18n/LanguageContext";
import { colors, fonts, spacing } from "../theme";
import { SectionHeader, AppButton } from "../components/ui";
import { processSteps } from "../data/process";
import { useRouter } from "expo-router";

export default function ProcessScreen() {
  const { t } = useLanguage();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <SectionHeader
          index="01"
          eyebrow={t("process_eyebrow")}
          title={t("process_title")}
          subtitle={t("process_subtitle")}
        />
        {processSteps.map((step, idx) => (
          <View key={step.id} style={[styles.step, idx < processSteps.length - 1 && styles.stepSep]}>
            <Text style={styles.num}>{String(step.id).padStart(2, "0")}</Text>
            <View style={styles.stepBody}>
              <Text style={styles.title}>{t(step.titleKey)}</Text>
              <Text style={styles.desc}>{t(step.descKey)}</Text>
            </View>
          </View>
        ))}

        <View style={{ marginTop: spacing.xl }}>
          <AppButton
            label={t("book_appointment")}
            variant="gold"
            onPress={() => router.push("/enquiry")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, paddingBottom: spacing.xxl },
  step: {
    flexDirection: "row",
    gap: spacing.md,
    paddingVertical: spacing.md,
  },
  stepSep: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.hairline,
  },
  num: {
    fontFamily: fonts.serifSemiBold,
    fontSize: 26,
    lineHeight: 30,
    color: colors.goldBright,
    width: 48,
  },
  stepBody: { flex: 1, gap: 4 },
  title: {
    fontFamily: fonts.outfitSemiBold,
    fontSize: 16,
    color: colors.ink,
  },
  desc: {
    fontFamily: fonts.outfit,
    fontSize: 13.5,
    lineHeight: 20,
    color: colors.mutedText,
  },
});
