import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, fonts, spacing } from "../theme";

/**
 * ScreenHeader
 * - variant="overlay": floats over a full-bleed image (back + title on scrim).
 * - variant="solid":   sits on the cream page background.
 */
export function ScreenHeader({
  title,
  variant = "solid",
}: {
  title?: string;
  variant?: "overlay" | "solid";
}) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const overlay = variant === "overlay";

  return (
    <View
      pointerEvents="box-none"
      style={[
        styles.header,
        overlay
          ? [styles.overlay, { paddingTop: insets.top + 6 }]
          : { paddingTop: insets.top + 6 },
      ]}
    >
      <Pressable
        accessibilityLabel="Back"
        onPress={() => router.back()}
        style={({ pressed }) => [
          overlay ? styles.backOverlay : styles.backSolid,
          pressed && { opacity: 0.7 },
        ]}
        hitSlop={8}
      >
        <ArrowLeft color={overlay ? colors.white : colors.primary} size={20} />
      </Pressable>
      {title ? (
        <Text
          style={[styles.title, overlay ? styles.titleOverlay : styles.titleSolid]}
          numberOfLines={1}
        >
          {title}
        </Text>
      ) : (
        <View style={{ flex: 1 }} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  backSolid: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.card,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  backOverlay: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(99,9,17,0.55)",
  },
  title: {
    fontFamily: fonts.serifBold,
    fontSize: 20,
    flex: 1,
  },
  titleSolid: { color: colors.text },
  titleOverlay: { color: colors.white },
});
