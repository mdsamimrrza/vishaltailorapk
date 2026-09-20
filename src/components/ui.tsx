import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { colors, fonts, radius, spacing } from "../theme";

interface ButtonProps {
  label: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: "primary" | "gold" | "secondary" | "whatsapp";
  icon?: React.ReactNode;
  style?: ViewStyle;
  small?: boolean;
}

export function AppButton({
  label,
  onPress,
  loading,
  disabled,
  variant = "primary",
  icon,
  style,
  small,
}: ButtonProps) {
  const bg = {
    primary: colors.primary,
    gold: colors.gold,
    secondary: "transparent",
    whatsapp: colors.whatsapp,
  }[variant];

  const fg =
    variant === "gold" ? colors.primaryDeep : variant === "secondary" ? colors.primary : "#FFFFFF";

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        small && styles.small,
        { backgroundColor: bg, opacity: disabled ? 0.5 : pressed ? 0.88 : 1 },
        variant === "secondary" && styles.secondaryBorder,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={fg} />
      ) : (
        <View style={styles.row}>
          {icon}
          <Text style={[styles.label, { color: fg }]} numberOfLines={1}>
            {label}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  index,
  dark,
  center,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  index?: string;
  dark?: boolean;
  center?: boolean;
}) {
  return (
    <View style={[styles.sectionHeader, center && { alignItems: "center" }]}>
      {eyebrow ? (
        <View style={[styles.eyebrowRow, center && { justifyContent: "center" }]}>
          {index ? (
            <Text style={[styles.eyebrowIndex, dark && { color: colors.gold }]}>{index}</Text>
          ) : null}
          <Text style={[styles.eyebrow, dark && { color: colors.gold }]}>{eyebrow}</Text>
          {!center && (
            <View
              style={[
                styles.eyebrowRule,
                dark && { borderColor: "rgba(218,175,55,0.35)" },
              ]}
            />
          )}
        </View>
      ) : null}
      <Text style={[styles.sectionTitle, center && { textAlign: "center" }, dark && { color: colors.cream }]}>
        {title}
      </Text>
      {subtitle ? (
        <Text style={[styles.sectionSubtitle, dark && { color: "#D9C9B4" }]}>{subtitle}</Text>
      ) : null}
    </View>
  );
}

export function Eyebrow({ children, style }: { children: string; style?: TextStyle }) {
  return <Text style={[styles.eyebrow, style]}>{children}</Text>;
}

export function Divider({ style }: { style?: ViewStyle }) {
  return <View style={[styles.divider, style]} />;
}

const styles = StyleSheet.create({
  base: {
    height: 52,
    borderRadius: radius.sm,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.lg,
  },
  small: {
    height: 44,
    paddingHorizontal: spacing.md,
  },
  secondaryBorder: {
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  label: {
    fontFamily: fonts.outfitBold,
    fontSize: 14,
    letterSpacing: 0.8,
  },
  sectionHeader: {
    gap: spacing.xxs,
    marginBottom: spacing.md,
  },
  eyebrowRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: 4,
  },
  eyebrowIndex: {
    fontFamily: fonts.serifSemiBold,
    fontSize: 14,
    color: colors.goldDeep,
  },
  eyebrow: {
    fontFamily: fonts.outfitBold,
    fontSize: 11,
    letterSpacing: 2.6,
    textTransform: "uppercase",
    color: colors.goldDeep,
  },
  eyebrowRule: {
    flex: 1,
    height: 0,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  sectionTitle: {
    fontFamily: fonts.serifBold,
    fontSize: 28,
    lineHeight: 34,
    color: colors.primary,
  },
  sectionSubtitle: {
    fontFamily: fonts.outfit,
    fontSize: 14,
    lineHeight: 20,
    color: colors.mutedText,
    marginTop: 4,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
    marginVertical: spacing.xl,
  },
});
