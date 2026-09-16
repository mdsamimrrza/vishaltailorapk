import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { ArrowLeft, ChevronDown, ChevronUp, Search } from "lucide-react-native";
import { useLanguage } from "../i18n/LanguageContext";
import { colors, fonts, radius, spacing } from "../theme";
import { faqItems } from "../data/faq";

// 11. FAQ — Page-11 spec: header (back + search), "Frequently Asked
// Questions" title, white accordion cards with chevron indicators.
export default function FaqScreen() {
  const { t, language } = useLanguage();
  const router = useRouter();
  const [openId, setOpenId] = useState<string | null>(null);

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
          <Text style={styles.title}>{t("faq_title")}</Text>
          <Text style={styles.subtitle}>{t("faq_subtitle")}</Text>
        </View>

        {faqItems.map((item) => {
          const open = openId === item.id;
          return (
            <View key={item.id} style={styles.item}>
              <Pressable
                onPress={() => setOpenId(open ? null : item.id)}
                style={styles.qRow}
                accessibilityLabel={item.q[language as "en"]}
              >
                <Text style={styles.q}>{item.q[language as "en"]}</Text>
                {open ? (
                  <ChevronUp color={colors.mutedText} size={18} />
                ) : (
                  <ChevronDown color={colors.mutedText} size={18} />
                )}
              </Pressable>
              {open ? <Text style={styles.a}>{item.a[language as "en"]}</Text> : null}
            </View>
          );
        })}
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
    paddingHorizontal: spacing.md + 4,
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
  },
  title: {
    fontFamily: fonts.serifBold,
    fontSize: 24,
    color: colors.primary,
  },
  subtitle: {
    fontFamily: fonts.outfit,
    fontSize: 13,
    color: colors.mutedText,
    marginTop: 4,
  },

  item: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    marginHorizontal: spacing.md,
    marginBottom: spacing.sm,
    overflow: "hidden",
  },
  qRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
    minHeight: 56,
  },
  q: {
    fontFamily: fonts.serifSemiBold,
    fontSize: 15,
    color: colors.text,
    flex: 1,
    lineHeight: 21,
  },
  a: {
    fontFamily: fonts.outfit,
    fontSize: 13.5,
    color: colors.mutedText,
    lineHeight: 21,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
});
