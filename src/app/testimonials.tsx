import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { ArrowLeft, Search } from "lucide-react-native";
import { useLanguage } from "../i18n/LanguageContext";
import { colors, fonts, radius, spacing } from "../theme";
import { Stars, AvatarInitial } from "../components/bits";
import { testimonials } from "../data/testimonials";

// 10. TESTIMONIALS — Page-10 spec: header (back + search), "Our Customers
// Speak" title, and soft-white review cards (avatar, name, gold stars, quote).
export default function TestimonialsScreen() {
  const { t, language } = useLanguage();
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
          <Text style={styles.title}>{t("testi_speak")}</Text>
          <Text style={styles.subtitle}>{t("testi_hear")}</Text>
        </View>

        {testimonials.map((tm) => (
          <View key={tm.id} style={styles.card}>
            <View style={styles.head}>
              <AvatarInitial name={tm.name} size={38} />
              <View style={{ flex: 1 }}>
                <Text style={styles.author}>{tm.name}</Text>
                <View style={{ marginTop: 2, alignItems: "flex-start" }}>
                  <Stars rating={tm.rating} size={13} />
                </View>
              </View>
            </View>
            <Text style={styles.text}>“{tm.text[language as "en"]}”</Text>
            <Text style={styles.meta}>
              {tm.garmentOrdered[language as "en"]} · {tm.date}
            </Text>
          </View>
        ))}
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

  card: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.md,
    marginHorizontal: spacing.md,
    marginBottom: 12,
    gap: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  head: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  author: { fontFamily: fonts.serifSemiBold, fontSize: 15, color: colors.text },
  text: {
    fontFamily: fonts.outfit,
    fontSize: 13.5,
    lineHeight: 21,
    color: colors.mutedText,
  },
  meta: {
    fontFamily: fonts.outfit,
    fontSize: 11,
    letterSpacing: 0.4,
    color: colors.goldDeep,
  },
});
