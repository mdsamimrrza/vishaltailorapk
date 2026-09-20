import React from "react";
import {
    Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { ArrowRight, ChevronRight, Menu, Bell } from "lucide-react-native";
import { useLanguage } from "../../i18n/LanguageContext";
import { Img } from "../../components/Img";
import { fonts, spacing } from "../../theme";
import { useDrawer } from "../../components/AppDrawer";

// 04. SERVICES SCREEN — compact list rows: photo, name, tagline, chevron.
const C = {
  primary: "#680F1A",
  bg: "#F8F5ED",
  card: "#FFFFFF",
  text: "#241515",
  sub: "#6B625E",
  gold: "#DAAF37",
};

export default function ServicesScreen() {
  const { t } = useLanguage();
  const router = useRouter();
  const { open: openDrawer } = useDrawer();
  const insets = useSafeAreaInsets();


  const rows = [
    {
      title: t("svc_suits"),
      desc: t("svc_suits_desc"),
      image: require("../../../assets/images/nvt/services/svc-suit.webp"),
      onPress: () => router.push("/service/coatpant"),
    },
    {
      title: t("svc_sherwani"),
      desc: t("svc_sherwani_desc"),
      image: require("../../../assets/images/nvt/services/svc-sherwani.webp"),
      onPress: () => router.push("/service/sherwani"),
    },
    {
      title: t("svc_kurta"),
      desc: t("svc_kurta_desc"),
      image: require("../../../assets/images/nvt/services/svc-kurta.webp"),
      onPress: () => router.push("/service/kurta"),
    },
    {
      title: t("svc_shirtpant"),
      desc: t("svc_shirtpant_desc"),
      image: require("../../../assets/images/nvt/services/svc-shirt.webp"),
      onPress: () => router.push("/service/pants"),
    },
  ];

  return (
    <View style={styles.safe}>
      <StatusBar style="dark" />

      {/* ============ APP BAR ============ */}
      <View style={[styles.appBar, { paddingTop: insets.top + 6 }]}>
        <Pressable
          onPress={openDrawer}
          style={({ pressed }) => [styles.barBtn, pressed && { opacity: 0.6 }]}
          accessibilityLabel="Menu"
        >
          <Menu color={C.primary} size={23} strokeWidth={1.9} />
        </Pressable>
        <View style={styles.barBrand}>
          <Img
            source={require("../../../assets/images/nvt/splash-logo.webp")}
            style={styles.barMark} contentFit="contain"
          />
          <View style={{ alignItems: "center" }}>
            <Text style={styles.barName}>NEW VISHAL TAILORS</Text>
            <Text style={styles.barTag}>TAILORED FOR A BETTER YOU</Text>
          </View>
        </View>
        <Pressable
          onPress={() => router.push("/enquiry")}
          style={({ pressed }) => [styles.barBtn, pressed && { opacity: 0.6 }]}
          accessibilityLabel={t("book_appointment")}
        >
          <Bell color={C.primary} size={21} strokeWidth={1.9} />
        </Pressable>
      </View>

        {/* ============ PAGE TITLE ============ */}
        <View style={styles.titleWrap}>
          <Text style={styles.pageTitle}>
            {t("svcp_h1")} {t("svcp_h2")}
          </Text>
          <Text style={styles.pageSub}>{t("svcp_sub")}</Text>
        </View>

        {/* ============ SERVICES LIST ============ */}
        <FlashList
          data={rows}
          renderItem={({ item, index }) => (
            <Pressable
              key={item.title}
              onPress={item.onPress}
              style={({ pressed }) => [
                styles.row,
                index < rows.length - 1 && styles.rowSep,
                pressed && { backgroundColor: "#F8F1E6" },
              ]}
            >
              <Img source={item.image} style={styles.rowImage} />
              <View style={{ flex: 1, gap: 2 }}>
                <Text style={styles.rowTitle}>{item.title}</Text>
                <Text style={styles.rowDesc} numberOfLines={1}>
                  {item.desc}
                </Text>
              </View>
              <View style={styles.rowArrow}>
                <ArrowRight color={C.primary} size={14} />
              </View>
            </Pressable>
          )}
          estimatedItemSize={84}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: spacing.md }}
          keyExtractor={(item) => item.title}
        />

        {/* ============ CUSTOM TAILORING ============ */}
        <Pressable
          onPress={() => router.push("/enquiry")}
          style={({ pressed }) => [styles.customCard, pressed && { opacity: 0.9, transform: [{ scale: 0.99 }] }]}
        >
          <Img
            source={require("../../../assets/images/nvt/tools.webp")}
            style={styles.customImage}
          />
          <View style={{ flex: 1, gap: 3 }}>
            <Text style={styles.customTitle}>{t("svc_custom")}</Text>
            <Text style={styles.customDesc} numberOfLines={2}>
              {t("svc_custom_desc")}
            </Text>
          </View>
          <View style={styles.customArrow}>
            <ArrowRight color="#FFFFFF" size={14} />
          </View>
        </Pressable>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: spacing.md }}>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },

  appBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingBottom: 6,
    backgroundColor: C.bg,
  },
  barBtn: { width: 40, height: 40, alignItems: "center", justifyContent: "center" },
  barBrand: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  barMark: { width: 30, height: 28 },
  barName: {
    fontFamily: fonts.serifBold,
    fontSize: 14,
    letterSpacing: 1.2,
    color: C.primary,
  },
  barTag: {
    fontFamily: fonts.outfitSemiBold,
    fontSize: 6.5,
    letterSpacing: 1.8,
    color: "#B58A1B",
    marginTop: 1,
  },

  titleWrap: {
    paddingHorizontal: spacing.md + 4,
    paddingTop: 10,
    paddingBottom: 16,
  },
  pageTitle: {
    fontFamily: fonts.serifBold,
    fontSize: 28,
    lineHeight: 34,
    color: C.primary,
  },
  pageSub: {
    fontFamily: fonts.outfit,
    fontSize: 13,
    color: C.sub,
    marginTop: 4,
  },

  listCard: {
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: "#EFE7DA",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 12,
  },
  rowSep: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#EFE7DA",
  },
  rowImage: { width: 56, height: 56, borderRadius: 12, backgroundColor: "#EFE7DA" },
  rowTitle: {
    fontFamily: fonts.outfitBold,
    fontSize: 15,
    color: C.text,
  },
  rowDesc: {
    fontFamily: fonts.outfit,
    fontSize: 12.5,
    color: C.sub,
  },
  rowArrow: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#F6ECDD",
    alignItems: "center",
    justifyContent: "center",
  },

  customCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 16,
    backgroundColor: C.primary,
    borderRadius: 16,
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  customImage: { width: 68, height: 68, borderRadius: 12 },
  customTitle: {
    fontFamily: fonts.outfitBold,
    fontSize: 15,
    color: "#FFFFFF",
  },
  customDesc: {
    fontFamily: fonts.outfit,
    fontSize: 12,
    color: "rgba(255,255,255,0.85)",
  },
  customArrow: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.18)",
    borderWidth: 1,
    borderColor: "rgba(218,175,55,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },

});
