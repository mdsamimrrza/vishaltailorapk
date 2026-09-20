// Design system — per approved UI spec:
// Primary #800F1A · Accent Gold #DAAF37 · Background #F8F5ED · Text #2A2A2A / #6B6B6B
export const colors = {
  primary: "#800F1A",
  primaryDeep: "#630911",
  primarySoft: "#9B2430",
  gold: "#DAAF37",
  goldSoft: "#E8C964",
  goldDeep: "#B58A1B",

  background: "#F8F5ED",
  card: "#FFFFFF",
  mutedSurface: "#F1ECDF",

  text: "#2A2A2A",
  mutedText: "#6B6B6B",
  border: "#ECE6DA",
  hairline: "#ECE6DA",

  cream: "#F8F5ED",
  onPrimary: "#F8F5ED",

  whatsapp: "#25D366",
  success: "#2E7D32",
  error: "#D32F2F",

  white: "#FFFFFF",
  black: "#000000",

  // Legacy aliases (older screens still reference these)
  maroon: "#800F1A",
  maroonDeep: "#630911",
  maroonSoft: "#9B2430",
  ink: "#630911",
  goldBright: "#B58A1B",
  creamGold: "#E8C964",
};

export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
  section: 48,
  hero: 64,
};

export const radius = {
  none: 0,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 22,
  pill: 999,
};

export const fonts = {
  // Display — Playfair Display
  serif: "PlayfairDisplay_500Medium",
  serifSemiBold: "PlayfairDisplay_600SemiBold",
  serifBold: "PlayfairDisplay_700Bold",
  serifBoldItalic: "PlayfairDisplay_700Bold_Italic",
  serifItalic: "PlayfairDisplay_400Regular_Italic",
  // Body — Inter
  sans: "Inter_400Regular",
  sansMedium: "Inter_500Medium",
  sansSemiBold: "Inter_600SemiBold",
  sansBold: "Inter_700Bold",
  // Devanagari (Nepali / Hindi)
  devanagari: "tiro-400",
  // Legacy aliases (for backward compat with existing styles)
  outfit: "Inter_400Regular",
  outfitMedium: "Inter_500Medium",
  outfitSemiBold: "Inter_600SemiBold",
  outfitBold: "Inter_700Bold",
  outfitExtraBold: "Inter_700Bold",
  inter: "Inter_400Regular",
  playfair: "PlayfairDisplay_500Medium",
};

export const microLabel = {
  fontFamily: fonts.outfitSemiBold,
  fontSize: 10,
  letterSpacing: 2,
  textTransform: "uppercase" as const,
};

export const shadowSM = {
  shadowColor: "#2A2A2A",
  shadowOpacity: 0.06,
  shadowRadius: 10,
  shadowOffset: { width: 0, height: 4 },
  elevation: 2,
};

export const shadowMD = {
  shadowColor: "#2A2A2A",
  shadowOpacity: 0.1,
  shadowRadius: 20,
  shadowOffset: { width: 0, height: 8 },
  elevation: 5,
};

export const fontForLanguage = (lang: string) =>
  lang === "en" ? fonts.serifBold : fonts.devanagari;
