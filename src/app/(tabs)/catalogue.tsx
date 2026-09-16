import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  FlatList,
    Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Search, Heart } from "lucide-react-native";
import { useLanguage } from "../../i18n/LanguageContext";
import { Img } from "../../components/Img";
import { fonts, spacing } from "../../theme";
import { galleryImages, GalleryImage } from "../../data/gallery";
import { AppButton } from "../../components/ui";
import { Pager } from "../../components/Pager";

// 06. GALLERY SCREEN — Page-6 spec:
// Page Title Playfair Bold 32 #680F1A · Tab Text Inter Medium 16 #241515 ·
// Empty State Title Playfair Semibold 20 / Text Inter Regular 14 #6B625E.
const C = {
  primary: "#680F1A",
  gold: "#DAAF37",
  bg: "#FFF8ED",
  text: "#241515",
  sub: "#6B625E",
  card: "#FFFFFF",
  border: "#EFE7DA",
};

type Tab = "all" | "suits" | "sherwani" | "kurtas" | "khandress" | "shirts";

export default function GalleryScreen() {
  const { t } = useLanguage();
  const router = useRouter();
  const { width: winW } = useWindowDimensions();
  const [tab, setTab] = useState<Tab>("all");
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [page, setPage] = useState(0);
  const PER_PAGE = 12;
  const listRef = useRef<FlatList<GalleryImage>>(null);

  // Switching category tabs always starts back at page 1.
  useEffect(() => {
    setPage(0);
  }, [tab]);

  // Responsive grid: exact pixel cells (square) so portrait/landscape
  // sources render identically on every phone and tablet.
  const COL_GAP = 12;
  const cols = winW >= 768 ? 3 : 2;
  const cellW = Math.floor((winW - spacing.md * 2 - COL_GAP * (cols - 1)) / cols);

  const items = useMemo(() => {
    if (tab !== "all") return galleryImages.filter((g) => g.cats.includes(tab));
    // "All" = a balanced mix: max 3 per category, interleaved round-robin.
    const groups = ["suits", "sherwani", "kurtas", "khandress", "shirts"]
      .map((cat) => galleryImages.filter((g) => g.cats.includes(cat)).slice(0, 3))
      .filter((g) => g.length > 0);
    const mixed: GalleryImage[] = [];
    while (groups.some((g) => g.length > 0)) {
      for (const g of groups) {
        const next = g.shift();
        if (next) mixed.push(next);
      }
    }
    return mixed;
  }, [tab]);

  const pages = Math.max(1, Math.ceil(items.length / PER_PAGE));
  const safePage = Math.min(page, pages - 1);
  const pageItems = items.slice(safePage * PER_PAGE, safePage * PER_PAGE + PER_PAGE);

  const goToPage = (p: number) => {
    setPage(p);
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: "all", label: t("catalogue_all") },
    { key: "suits", label: t("gal_tab_suits") },
    { key: "sherwani", label: t("gal_tab_sherwani") },
    { key: "kurtas", label: t("gal_tab_kurtas") },
    { key: "khandress", label: t("cat_khadress") },
    { key: "shirts", label: t("gal_tab_shirts") },
  ];

  const toggleLike = (id: string) => setLiked((s) => ({ ...s, [id]: !s[id] }));

  const open = (g: GalleryImage) =>
    router.push({
      pathname: "/image-viewer",
      params: { id: g.id, ids: items.map((i) => i.id).join(",") },
    });

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <FlatList
        key={`grid-${cols}`}
        ref={listRef}
        data={pageItems}
        keyExtractor={(g) => g.id}
        numColumns={cols}
        columnWrapperStyle={[styles.column, { gap: COL_GAP }]}
        contentContainerStyle={styles.content}
        getItemLayout={(_, i) => ({ length: cellW + 12, offset: (cellW + 12) * Math.floor(i / cols), index: i })}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {/* Page title + search */}
            <View style={styles.headRow}>
              <Text style={styles.title}>{t("our_gallery")}</Text>
              <Pressable
                onPress={() => router.push("/catalogue-full")}
                style={styles.searchBtn}
                accessibilityLabel={t("catalogue_search_placeholder")}
              >
                <Search color={C.text} size={21} />
              </Pressable>
            </View>

            {/* Category tabs */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ flexGrow: 0 }}
              contentContainerStyle={styles.tabsRow}
            >
              {tabs.map((tb) => {
                const active = tab === tb.key;
                return (
                  <Pressable
                    key={tb.key}
                    onPress={() => setTab(tb.key)}
                    style={[styles.tab, active && styles.tabActive]}
                  >
                    <Text style={[styles.tabText, active && styles.tabTextActive]}>
                      {tb.label}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        }
        renderItem={({ item }) => (
          <Pressable style={[styles.cell, { width: cellW }]} onPress={() => open(item)}>
            <Img
              source={item.thumb}
              style={[styles.image, { width: cellW, height: cellW }]}
            />
            <Pressable
              onPress={() => toggleLike(item.id)}
              style={styles.likeBtn}
              accessibilityLabel="Like"
            >
              <Heart
                color="#FFFFFF"
                size={20}
                fill={liked[item.id] ? "#FFFFFF" : "none"}
                strokeWidth={2}
              />
            </Pressable>
          </Pressable>
        )}
        ListFooterComponent={
          <View>
            <Pager page={safePage} pages={pages} onChange={goToPage} />
            <View style={styles.footer}>
              <AppButton
                label={t("explore_catalogue")}
                variant="gold"
                onPress={() => router.push("/catalogue-full")}
              />
            </View>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>{t("gal_empty_title")}</Text>
            <Text style={styles.emptySub}>{t("gal_empty_sub")}</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  content: { paddingBottom: spacing.xl },
  headRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  title: {
    fontFamily: fonts.serifBold,
    fontSize: 32,
    lineHeight: 38,
    color: C.primary,
  },
  searchBtn: { width: 42, height: 42, alignItems: "center", justifyContent: "center" },

  tabsRow: { gap: 8, paddingHorizontal: spacing.md, paddingBottom: spacing.md },
  tab: {
    height: 38,
    paddingHorizontal: 16,
    borderRadius: 19,
    backgroundColor: C.card,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: C.border,
    alignItems: "center",
    justifyContent: "center",
  },
  tabActive: { backgroundColor: C.primary, borderColor: C.primary },
  tabText: {
    fontFamily: fonts.outfitMedium,
    fontSize: 14,
    color: C.text,
  },
  tabTextActive: { color: "#FFFFFF" },

  column: { justifyContent: "space-between", paddingHorizontal: spacing.md, marginBottom: 12 },
  cell: { position: "relative" },
  image: {
    borderRadius: 6,
    backgroundColor: "#EFE7DA",
  },
  likeBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "rgba(30,8,10,0.30)",
    alignItems: "center",
    justifyContent: "center",
  },

  empty: { alignItems: "center", paddingVertical: spacing.xxxl, paddingHorizontal: spacing.xl },
  emptyTitle: {
    fontFamily: fonts.serifSemiBold,
    fontSize: 20,
    color: C.text,
  },
  emptySub: {
    fontFamily: fonts.outfit,
    fontSize: 14,
    color: C.sub,
    textAlign: "center",
    marginTop: 6,
  },

  footer: { paddingHorizontal: spacing.md, paddingTop: spacing.sm },
});
