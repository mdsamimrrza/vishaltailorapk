import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { colors, fonts } from "../theme";

// Numbered pager: ‹ Prev · Page X / Y · Next ›
// Hidden entirely when everything fits on one page.
export function Pager({
  page,
  pages,
  onChange,
}: {
  page: number;
  pages: number;
  onChange: (page: number) => void;
}) {
  if (pages <= 1) return null;

  return (
    <View style={styles.row}>
      <Pressable
        onPress={() => onChange(page - 1)}
        disabled={page === 0}
        style={({ pressed }) => [styles.btn, (page === 0 || pressed) && { opacity: 0.45 }]}
        accessibilityLabel="Previous page"
      >
        <ChevronLeft color={colors.primary} size={16} />
        <Text style={styles.btnText}>Prev</Text>
      </Pressable>

      <Text style={styles.label}>
        Page {page + 1} / {pages}
      </Text>

      <Pressable
        onPress={() => onChange(page + 1)}
        disabled={page >= pages - 1}
        style={({ pressed }) => [styles.btn, (page >= pages - 1 || pressed) && { opacity: 0.45 }]}
        accessibilityLabel="Next page"
      >
        <Text style={styles.btnText}>Next</Text>
        <ChevronRight color={colors.primary} size={16} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
    paddingVertical: 18,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    height: 36,
    paddingHorizontal: 14,
    borderRadius: 18,
    backgroundColor: colors.card,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  btnText: {
    fontFamily: fonts.outfitSemiBold,
    fontSize: 12.5,
    color: colors.primary,
  },
  label: {
    fontFamily: fonts.outfitSemiBold,
    fontSize: 12.5,
    color: colors.mutedText,
    minWidth: 90,
    textAlign: "center",
  },
});
