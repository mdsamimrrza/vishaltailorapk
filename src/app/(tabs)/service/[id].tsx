import React, { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ArrowLeft,
  Heart,
  Share,
  Shirt,
  Ruler,
  ShieldCheck,
  Scissors,
  Layers,
  MessageCircle,
  Images,
} from "lucide-react-native";
import { useLanguage } from "../../../i18n/LanguageContext";
import { fonts, spacing } from "../../../theme";
import { ScreenHeader } from "../../../components/ScreenHeader";
import { services, serviceWhatsAppMessage } from "../../../data/services";
import { BUSINESS } from "../../../constants/business";
import { openWhatsApp, shareText } from "../../../utils/links";

// 05. SERVICE DETAIL SCREEN — palette & type from the Page-5 spec:
// Service Title Playfair Bold 28 #680F1A · Price Inter Semibold 18 ·
// Body Inter Regular 16 #241515 · Feature Text Inter Medium 16 ·
// Buttons Inter Semibold 16 #FFFFFF / #680F1A. bg #FFF8ED.
const C = {
  primary: "#680F1A",
  gold: "#DAAF37",
  bg: "#FFF8ED",
  text: "#241515",
  sub: "#6B625E",
  card: "#FFFFFF",
  featCircle: "#F7E9D3",
};

const featureIcons = [Shirt, Ruler, ShieldCheck, Scissors, Layers];

export default function ServiceDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useLanguage();
  const router = useRouter();
  const { width: winW } = useWindowDimensions();
  const service = services.find((s) => s.id === id);
  const [fav, setFav] = useState(false);
  const [thumbIdx, setThumbIdx] = useState(0);

  if (!service) {
    return (
      <View style={styles.safe}>
        <ScreenHeader />
        <View style={styles.missing}>
          <Text style={styles.missingText}>{t("error_desc")}</Text>
        </View>
      </View>
    );
  }

  const name = t(service.titleKey);

  // Gallery: sherwani gets the four spec views; other services use their own image.
  const thumbs =
    service.id === "sherwani"
      ? [
          service.image,
          require("../../../../assets/images/nvt/services/thumb-2.webp"),
          require("../../../../assets/images/nvt/services/thumb-3.webp"),
          require("../../../../assets/images/nvt/services/thumb-4.webp"),
        ]
      : [service.image];
  const mainImage = thumbs[Math.min(thumbIdx, thumbs.length - 1)];

  const features = [
    t("feat_fabric"),
    t("feat_design"),
    t("feat_fit"),
    t("feat_craft"),
    t("feat_styles"),
  ];

  const share = () =>
    shareText(`${name} — New Vishal Tailors\n${BUSINESS.website}`);

  const openViewer = () =>
    router.push({
      pathname: "/image-viewer",
      params: { id: service.id, title: name },
    });

  return (
    <View style={styles.safe}>
      <StatusBar style="light" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: spacing.md }}>
        {/* Main service image with floating actions */}
        <View>
          <Pressable onPress={openViewer}>
            <Image
              source={mainImage}
              style={{ width: winW, height: winW * 0.9 }}
              resizeMode="cover"
            />
          </Pressable>
          <View style={styles.topScrim}>
            <Pressable
              onPress={() => {
                // Popping lands on the initial tab (Home) because this screen
                // sits inside the tab navigator — always return to Services.
                router.replace("/(tabs)/services" as any);
              }}
              style={styles.iconBtn}
              accessibilityLabel="Back"
            >
              <ArrowLeft color="#FFFFFF" size={22} />
            </Pressable>
            <View style={{ flex: 1 }} />
            <Pressable onPress={() => setFav(!fav)} style={styles.iconBtn} accessibilityLabel="Favorite">
              <Heart color="#FFFFFF" size={21} fill={fav ? "#FFFFFF" : "none"} />
            </Pressable>
            <Pressable onPress={share} style={styles.iconBtn} accessibilityLabel={t("share")}>
              <Share color="#FFFFFF" size={21} />
            </Pressable>
          </View>
        </View>

        {/* Cream sheet — rounded top corners over the hero */}
        <View style={styles.contentSheet}>
          {/* Thumbnail strip */}
          <View style={styles.thumbStrip}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 10, paddingHorizontal: 10, paddingVertical: 10 }}
            >
              {thumbs.map((img, i) => (
                <Pressable key={i} onPress={() => setThumbIdx(i)}>
                  <Image source={img} style={[styles.thumb, i === thumbIdx && styles.thumbActive]} />
                </Pressable>
              ))}
            </ScrollView>
          </View>

          {/* Service info */}
          <View style={styles.body}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.bodyText}>{t(service.descKey)}</Text>

          {/* Feature list */}
          <View style={styles.features}>
            {features.map((f, i) => {
              const Icon = featureIcons[i % featureIcons.length];
              return (
                <View key={f} style={styles.featureRow}>
                  <View style={styles.featureCircle}>
                    <Icon color={C.primary} size={17} strokeWidth={1.7} />
                  </View>
                  <Text style={styles.featureText}>{f}</Text>
                </View>
              );
            })}
          </View>

          {/* Buttons */}
          <Pressable
            onPress={() =>
              openWhatsApp(BUSINESS.whatsappNumber, serviceWhatsAppMessage(name))
            }
            style={({ pressed }) => [styles.btnPrimary, pressed && { opacity: 0.9 }]}
          >
            <MessageCircle color="#FFFFFF" size={18} />
            <Text style={styles.btnPrimaryText}>{t("enquire_whatsapp")}</Text>
          </Pressable>
          <Pressable
            onPress={() => router.push("/(tabs)/catalogue")}
            style={({ pressed }) => [styles.btnSecondary, pressed && { opacity: 0.9 }]}
          >
            <Images color={C.primary} size={18} />
            <Text style={styles.btnSecondaryText}>{t("our_gallery")}</Text>
          </Pressable>
        </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  topScrim: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingTop: 18,
    backgroundColor: "rgba(30,8,10,0.35)",
    paddingBottom: 8,
  },
  iconBtn: { width: 44, height: 44, alignItems: "center", justifyContent: "center" },

  contentSheet: {
    marginTop: -24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: C.bg,
    paddingBottom: spacing.md,
  },
  thumbStrip: {
    alignSelf: "center",
    marginTop: spacing.xs,
    width: "88%",
    backgroundColor: C.card,
    borderRadius: 16,
    elevation: 3,
    shadowColor: "#241515",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  thumb: { width: 64, height: 64, borderRadius: 10 },
  thumbActive: { borderWidth: 2, borderColor: C.primary },

  body: { paddingHorizontal: spacing.md, paddingTop: spacing.md },
  title: {
    fontFamily: fonts.serifBold,
    fontSize: 28,
    lineHeight: 34,
    color: C.primary,
  },
  bodyText: {
    fontFamily: fonts.outfit,
    fontSize: 16,
    lineHeight: 24,
    color: C.text,
    marginTop: 10,
  },

  features: { marginTop: spacing.md, gap: 12 },
  featureRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  featureCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: C.featCircle,
    alignItems: "center",
    justifyContent: "center",
  },
  featureText: {
    fontFamily: fonts.outfitMedium,
    fontSize: 16,
    color: C.text,
  },

  btnPrimary: {
    marginTop: spacing.lg,
    height: 52,
    borderRadius: 26,
    backgroundColor: C.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
  },
  btnPrimaryText: {
    fontFamily: fonts.outfitSemiBold,
    fontSize: 16,
    color: "#FFFFFF",
  },
  btnSecondary: {
    marginTop: 10,
    height: 52,
    borderRadius: 26,
    backgroundColor: C.card,
    borderWidth: 1.5,
    borderColor: C.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
  },
  btnSecondaryText: {
    fontFamily: fonts.outfitMedium,
    fontSize: 16,
    color: C.primary,
  },

  missing: { flex: 1, alignItems: "center", justifyContent: "center" },
  missingText: { fontFamily: fonts.outfit, fontSize: 15, color: C.sub },
});
