import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Search } from "lucide-react-native";
import { useLanguage } from "../i18n/LanguageContext";
import { colors, fonts, radius, spacing } from "../theme";
import { ScreenHeader } from "../components/ScreenHeader";
import { Pager } from "../components/Pager";
import { Img } from "../components/Img";
import { FlashList } from "@shopify/flash-list";
import {
  getCatalogueItems,
  catalogueThumb,
  catalogueImage,
  localizedName,
  searchCatalogue,
  CatalogueItem,
} from "../data/catalogue";

type Filter = "all" | "coatpant" | "sherwani" | "shirt" | "suits" | "safari" | "dress";

// "All" grid order: the suit-folder series (C-01…) complete first, then the
// classic CP series, then shirts, safari suits and khan dresses.
const ALL_RANKS: Filter[] = ["suits", "shirt", "safari", "dress", "sherwani"];
function orderAll(items: CatalogueItem[]): CatalogueItem[] {
  const rank = (i: CatalogueItem) => {
    if (i.id.startsWith("C-")) return 0;
    if (i.id.startsWith("CP-")) return 1;
    const gi = ALL_RANKS.indexOf(i.category as Filter);
    return gi === -1 ? 99 : 2 + gi;
  };
  return [...items].sort(
    (a, b) => rank(a) - rank(b) || a.id.localeCompare(b.id, undefined, { numeric: true })
  );
}

// Full catalogue — reachable from the Gallery tab; accepts ?filter= to open
// with a category preselected (home category shortcuts).
export default function CatalogueFullScreen() {
  const { t, language } = useLanguage();
  const router = useRouter();
  const { filter: filterParam } = useLocalSearchParams<{ filter?: string }>();
  const { width: winW } = useWindowDimensions();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>(
    (["suits", "shirt", "safari", "dress", "sherwani"].includes(String(filterParam))
      ? (filterParam as Filter)
      : "all")
  );
  const [page, setPage] = useState(0);
  const PER_PAGE = 12;
  const listRef = useRef<FlatList<CatalogueItem>>(null);

  // New search/filter always starts back at page 1.
  useEffect(() => {
    setPage(0);
  }, [query, filter]);

  // Measured card size — aspectRatio is unreliable on some RN 0.86 devices.
  const gap = spacing.sm;
  const cardW = Math.floor((winW - spacing.md * 2 - gap) / 2);
  const imgH = Math.round(cardW * 1.22);

  const items = useMemo(() => {
    const searched = searchCatalogue(getCatalogueItems(), query);
    const filtered = filter === "all" ? searched : searched.filter((i) => i.category === filter);
    // "All" shows the C-series completely, then CP, then the other categories.
    return filter === "all" ? orderAll(filtered) : filtered;
  }, [query, filter]);

  const pages = Math.max(1, Math.ceil(items.length / PER_PAGE));
  const safePage = Math.min(page, pages - 1);
  const pageItems = items.slice(safePage * PER_PAGE, safePage * PER_PAGE + PER_PAGE);

  const goToPage = (p: number) => {
    setPage(p);
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  // Chip per category actually present in the data (All first, then the rest).
  const CAT_LABELS: Record<string, string> = {
    coatpant: t("catalogue_coatpant"),
    suits: t("gal_tab_suits"),
    shirt: t("gal_tab_shirts"),
    safari: t("cat_safari"),
    dress: t("cat_khadress"),
    sherwani: t("catalogue_sherwani"),
  };
  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: t("catalogue_all") },
    ...[...new Set(getCatalogueItems().map((i) => i.category))]
      .filter((cat) => cat !== "coatpant")
      .map((cat) => ({ key: cat as Filter, label: CAT_LABELS[cat] ?? cat })),
  ];

  const renderItem = ({ item }: { item: CatalogueItem }) => (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        { width: cardW },
        pressed && { opacity: 0.92, transform: [{ scale: 0.99 }] },
      ]}
      onPress={() => router.push(`/catalogue/${item.id}`)}
    >
      <Img
        source={catalogueThumb(item)}
        style={{ width: cardW, height: imgH, resizeMode: "cover" }}
      />
      <View style={styles.body}>
        <Text style={styles.name} numberOfLines={1}>
          {localizedName(item, language)}
        </Text>
        <Text style={styles.id}>{item.id}</Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <FlashList
        ref={listRef}
        data={pageItems}
        renderItem={renderItem}
        keyExtractor={(i) => i.id}
        numColumns={2}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={280}
        ListHeaderComponent={
          <View>
            <ScreenHeader title={t("catalogue_title")} />
            <View style={{ paddingHorizontal: spacing.md }}>
              <Text style={styles.subtitle}>{t("catalogue_subtitle")}</Text>
            </View>

            {/* Search */}
            <View style={styles.searchBar}>
              <Search color={colors.mutedText} size={17} />
              <TextInput
                style={styles.searchInput}
                placeholder={t("catalogue_search_placeholder")}
                placeholderTextColor={colors.mutedText}
                value={query}
                onChangeText={setQuery}
                returnKeyType="search"
              />
            </View>

            {/* Filter chips */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.chips}
              contentContainerStyle={{ gap: spacing.xs, paddingHorizontal: spacing.md }}
            >
              {filters.map((f) => {
                const active = filter === f.key;
                return (
                  <Pressable
                    key={f.key}
                    onPress={() => setFilter(f.key)}
                    style={[styles.chip, active && styles.chipActive]}
                  >
                    <Text style={[styles.chipText, active && styles.chipTextActive]}>
                      {f.label}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>

            <Text style={styles.resultCount}>
              {items.length} {items.length === 1 ? "design" : "designs"}
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>{t("catalogue_no_results")}</Text>
          </View>
        }
        ListFooterComponent={
          <Pager page={safePage} pages={pages} onChange={goToPage} />
        }
        columnWrapperStyle={{ justifyContent: "space-between", paddingHorizontal: spacing.md }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { paddingBottom: spacing.xxl, paddingTop: 0 },
  subtitle: {
    fontFamily: fonts.outfit,
    fontSize: 13.5,
    lineHeight: 19,
    color: colors.mutedText,
    marginTop: 2,
    marginBottom: spacing.md,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    marginHorizontal: spacing.md,
    backgroundColor: colors.card,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    height: 46,
    marginBottom: spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontFamily: fonts.outfit,
    fontSize: 14,
    color: colors.text,
  },
  chips: { marginBottom: spacing.sm, flexGrow: 0 },
  chip: {
    paddingHorizontal: spacing.md,
    height: 34,
    borderRadius: radius.pill,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    backgroundColor: colors.card,
    alignItems: "center",
    justifyContent: "center",
  },
  chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: {
    fontFamily: fonts.outfitSemiBold,
    fontSize: 12,
    color: colors.mutedText,
  },
  chipTextActive: { color: colors.white },
  resultCount: {
    fontFamily: fonts.outfit,
    fontSize: 11,
    color: colors.mutedText,
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    overflow: "hidden",
    marginBottom: 2,
  },
  body: { padding: spacing.sm, gap: 1 },
  name: {
    fontFamily: fonts.outfitSemiBold,
    fontSize: 12.5,
    color: colors.text,
  },
  id: {
    fontFamily: fonts.outfitBold,
    fontSize: 10,
    letterSpacing: 1.4,
    color: colors.goldBright,
  },
  empty: { padding: spacing.xxl, alignItems: "center" },
  emptyText: {
    fontFamily: fonts.outfit,
    fontSize: 14,
    color: colors.mutedText,
    textAlign: "center",
  },
});
