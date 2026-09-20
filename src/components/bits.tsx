import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, fonts } from "../theme";

export function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <View style={{ flexDirection: "row", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Text key={i} style={{ fontSize: size, color: i <= rating ? colors.gold : colors.border }}>
          ★
        </Text>
      ))}
    </View>
  );
}

export function AvatarInitial({ name, size = 40 }: { name: string; size?: number }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ fontFamily: fonts.serifBold, fontSize: size * 0.4, color: colors.cream }}>
        {initials}
      </Text>
    </View>
  );
}

export function OpenBadge({ open, label }: { open: boolean; label: string }) {
  return (
    <View style={styles.badge}>
      <View style={[styles.dot, { backgroundColor: open ? colors.success : colors.error }]} />
      <Text style={[styles.text, { color: open ? colors.success : colors.error }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  dot: { width: 7, height: 7, borderRadius: 4 },
  text: {
    fontFamily: fonts.outfitSemiBold,
    fontSize: 12,
  },
});
