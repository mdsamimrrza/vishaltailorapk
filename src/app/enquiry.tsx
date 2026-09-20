import React, { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { ArrowLeft, Calendar, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, Search } from "lucide-react-native";
import { useLanguage } from "../i18n/LanguageContext";
import { colors, fonts, radius, spacing } from "../theme";
import { AppButton } from "../components/ui";
import { sendEnquiry } from "../services/enquiryApi";
import { BUSINESS } from "../constants/business";
import { openWhatsApp } from "../utils/links";

// 13. ENQUIRY FORM — Page-13 spec: header (back + search), title section,
// Full Name / WhatsApp (with country-code prefix) / Garment Type dropdown /
// Occasion dropdown / Required By date / Fabric Preference / Notes textarea,
// and the maroon submit button.
const GARMENT_TYPES = [
  "Coat-Pant",
  "Casual Suit",
  "Shirt & Pant",
  "Kurta-Pajama",
  "Sherwani",
  "Bandhgala",
  "Other",
];
const OCCASIONS = ["Wedding", "Formal/Office", "Festival", "Casual", "Other"];
const PHONE_PREFIX = "+977";

type Status = "idle" | "loading" | "success" | "error";

export default function EnquiryScreen() {
  const { t } = useLanguage();
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [garmentType, setGarmentType] = useState("");
  const [occasion, setOccasion] = useState("");
  const [requiredBy, setRequiredBy] = useState("");
  const [fabricPreference, setFabricPreference] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [calOpen, setCalOpen] = useState(false);
  // Month shown in the calendar panel (first of month).
  const [viewMonth, setViewMonth] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  const minDate = useMemo(() => {
    // Earliest "Required By" is tomorrow (same-day is never allowed).
    // After the 5 PM cut-off, tomorrow is off the table too, so the
    // earliest rolls to the day after - and so on for later orders.
    const d = new Date();
    d.setDate(d.getDate() + (d.getHours() >= 17 ? 2 : 1));
    return d.toISOString().slice(0, 10);
  }, []);

  const validate = () => {
    const e: Record<string, string> = {};
    if (fullName.trim().length < 2) e.fullName = t("err_required");
    const digits = whatsappNumber.replace(/[^\d]/g, "");
    if (digits.length < 7 || digits.length > 13) e.whatsappNumber = t("err_required");
    if (!garmentType) e.garmentType = t("err_required");
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async () => {
    if (!validate()) return;
    setStatus("loading");
    const result = await sendEnquiry({
      fullName: fullName.trim(),
      whatsappNumber: `${PHONE_PREFIX} ${whatsappNumber.trim()}`,
      garmentType,
      occasion: occasion || undefined,
      requiredBy: requiredBy || undefined,
      fabricPreference: fabricPreference || undefined,
      notes: notes.trim() || undefined,
    });
    setStatus(result.ok ? "success" : "error");
  };

  if (status === "success") {
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar style="dark" />
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
        <View style={styles.success}>
          <CheckCircle2 color={colors.goldDeep} size={48} strokeWidth={1.4} />
          <Text style={styles.successTitle}>{t("success_title")}</Text>
          <View style={styles.successRule} />
          <Text style={styles.successMsg}>{t("success_msg")}</Text>
          <AppButton
            label={t("contact_whatsapp")}
            onPress={() => openWhatsApp(BUSINESS.whatsappNumber)}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
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
            <Text style={styles.title}>{t("enquiry_form_title")}</Text>
            <Text style={styles.subtitle}>{t("enquiry_form_subtitle")}</Text>
          </View>

          <View style={styles.body}>
            <Field label={t("form_full_name")} required error={errors.fullName}>
              <TextInput
                style={styles.input}
                value={fullName}
                onChangeText={setFullName}
                placeholder="Enter your name"
                placeholderTextColor="#A9A49B"
              />
            </Field>

            <Field label={t("form_whatsapp")} required error={errors.whatsappNumber}>
              <View style={[styles.phoneWrap, errors.whatsappNumber && styles.inputError]}>
                <Text style={styles.phonePrefix}>{PHONE_PREFIX}</Text>
                <TextInput
                  style={styles.phoneInput}
                  value={whatsappNumber}
                  onChangeText={(v) => setWhatsappNumber(v.replace(/[^\d\s]/g, ""))}
                  placeholder="Enter your number"
                  placeholderTextColor="#A9A49B"
                  keyboardType="phone-pad"
                />
              </View>
            </Field>

            <Field label={t("form_garment_type")} required error={errors.garmentType}>
              <Dropdown
                placeholder={t("form_ph_garment")}
                value={garmentType}
                options={GARMENT_TYPES}
                onSelect={(v) => {
                  setGarmentType(v);
                  setErrors((e) => {
                    const { garmentType: _, ...rest } = e;
                    return rest;
                  });
                }}
                hasError={Boolean(errors.garmentType)}
              />
            </Field>

            <Field label={t("form_occasion")}>
              <Dropdown
                placeholder={t("form_ph_occasion")}
                value={occasion}
                options={OCCASIONS}
                onSelect={setOccasion}
              />
            </Field>

            <Field label={t("form_required_by")} error={errors.requiredBy}>
              <Pressable
                onPress={() => setCalOpen((o) => !o)}
                style={[styles.inputWrap, errors.requiredBy && styles.inputError]}
              >
                <TextInput
                  style={styles.inputInWrap}
                  value={requiredBy}
                  editable={false}
                  placeholder={`${t("select")} (min ${minDate})`}
                  placeholderTextColor="#A9A49B"
                />
                <Calendar
                  color={calOpen ? colors.primary : colors.mutedText}
                  size={19}
                />
              </Pressable>
              {calOpen ? (
                <MiniCalendar
                  viewMonth={viewMonth}
                  onViewMonthChange={setViewMonth}
                  minDate={minDate}
                  selected={requiredBy}
                  onSelect={(iso) => {
                    setRequiredBy(iso);
                    setCalOpen(false);
                    setErrors((e) => {
                      const { requiredBy: _, ...rest } = e;
                      return rest;
                    });
                  }}
                />
              ) : null}
            </Field>

            <Field label={t("form_fabric_pref")}>
              <View style={styles.inputWrap}>
                <Search color={colors.mutedText} size={17} />
                <TextInput
                  style={styles.inputInWrap}
                  value={fabricPreference}
                  onChangeText={setFabricPreference}
                  placeholder="e.g. Cotton, Silk, Linen"
                  placeholderTextColor="#A9A49B"
                />
              </View>
            </Field>

            <Field label={t("form_notes")}>
              <TextInput
                style={[styles.input, styles.notes]}
                value={notes}
                onChangeText={(v) => setNotes(v.slice(0, 300))}
                multiline
                placeholder="Tell us more about your requirement…"
                placeholderTextColor="#A9A49B"
              />
            </Field>

            {status === "error" ? <Text style={styles.errorMsg}>{t("error_msg")}</Text> : null}

            <AppButton
              label={status === "loading" ? t("sending") : t("send_enquiry")}
              loading={status === "loading"}
              onPress={submit}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>
        {label}
        {required ? <Text style={styles.required}> *</Text> : null}
      </Text>
      {children}
      {error ? <Text style={styles.fieldError}>{error}</Text> : null}
    </View>
  );
}

// Inline dropdown that pushes content down while open (safe in a ScrollView
// on both platforms, no native picker dependency).
function Dropdown({
  placeholder,
  value,
  options,
  onSelect,
  hasError,
}: {
  placeholder: string;
  value: string;
  options: string[];
  onSelect: (v: string) => void;
  hasError?: boolean;
}) {
  const [open, setOpen] = useState(false);
  return (
    <View>
      <Pressable
        onPress={() => setOpen((o) => !o)}
        style={[styles.dropdown, hasError && styles.inputError]}
      >
        <Text style={[styles.dropdownText, !value && styles.dropdownPlaceholder]}>
          {value || placeholder}
        </Text>
        <ChevronDown
          color={colors.mutedText}
          size={19}
          style={open ? { transform: [{ rotate: "180deg" }] } : undefined}
        />
      </Pressable>
      {open ? (
        <View style={styles.dropdownMenu}>
          {options.map((o) => (
            <Pressable
              key={o}
              onPress={() => {
                onSelect(o);
                setOpen(false);
              }}
              style={({ pressed }) => [
                styles.dropdownItem,
                o === value && styles.dropdownItemActive,
                pressed && { backgroundColor: colors.mutedSurface },
              ]}
            >
              <Text
                style={[
                  styles.dropdownItemText,
                  o === value && styles.dropdownItemTextActive,
                ]}
              >
                {o}
              </Text>
            </Pressable>
          ))}
        </View>
      ) : null}
    </View>
  );
}

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const isoOf = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

// Dependency-free month grid; dates before minDate are disabled.
function MiniCalendar({
  viewMonth,
  onViewMonthChange,
  minDate,
  selected,
  onSelect,
}: {
  viewMonth: Date;
  onViewMonthChange: (d: Date) => void;
  minDate: string;
  selected: string;
  onSelect: (iso: string) => void;
}) {
  const year = viewMonth.getFullYear();
  const month = viewMonth.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstWeekday = new Date(year, month, 1).getDay();
  const cells: (Date | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1)),
  ];

  const move = (delta: number) => onViewMonthChange(new Date(year, month + delta, 1));

  return (
    <View style={styles.cal}>
      <View style={styles.calHead}>
        <Pressable onPress={() => move(-1)} hitSlop={8} style={styles.calNav}>
          <ChevronLeft color={colors.text} size={18} />
        </Pressable>
        <Text style={styles.calMonth}>
          {MONTH_NAMES[month]} {year}
        </Text>
        <Pressable onPress={() => move(1)} hitSlop={8} style={styles.calNav}>
          <ChevronRight color={colors.text} size={18} />
        </Pressable>
      </View>
      <View style={styles.calGrid}>
        {WEEKDAYS.map((w, i) => (
          <Text key={`w${i}`} style={styles.calWeekday}>
            {w}
          </Text>
        ))}
        {cells.map((d, i) => {
          if (!d) return <View key={`e${i}`} style={styles.calCell} />;
          const iso = isoOf(d);
          const disabled = iso < minDate;
          const active = iso === selected;
          return (
            <Pressable
              key={iso}
              disabled={disabled}
              onPress={() => onSelect(iso)}
              style={styles.calCell}
            >
              <View style={[styles.calDayWrap, active && styles.calDayWrapActive]}>
                <Text
                  style={[
                    styles.calDay,
                    disabled && styles.calDayDisabled,
                    active && styles.calDayActive,
                  ]}
                >
                  {d.getDate()}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
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
  titleSection: {
    paddingHorizontal: spacing.md + 4,
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
  },
  title: {
    fontFamily: fonts.serifBold,
    fontSize: 26,
    color: colors.primary,
  },
  subtitle: {
    fontFamily: fonts.outfit,
    fontSize: 13,
    color: colors.mutedText,
    marginTop: 4,
  },

  content: { paddingBottom: spacing.xxl },
  body: { paddingHorizontal: spacing.md, gap: spacing.lg },

  field: { gap: 7 },
  label: {
    fontFamily: fonts.outfitSemiBold,
    fontSize: 13,
    color: colors.text,
  },
  required: { color: colors.primary, fontWeight: "700" },

  input: {
    height: 50,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: 14,
    fontFamily: fonts.outfit,
    fontSize: 14.5,
    color: colors.text,
  },
  inputError: { borderColor: colors.error },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    height: 50,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: 14,
  },
  inputInWrap: {
    flex: 1,
    fontFamily: fonts.outfit,
    fontSize: 14.5,
    color: colors.text,
    padding: 0,
  },
  notes: {
    height: 100,
    paddingTop: 12,
    textAlignVertical: "top",
  },

  phoneWrap: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    overflow: "hidden",
  },
  phonePrefix: {
    width: 58,
    textAlign: "center",
    fontFamily: fonts.outfitSemiBold,
    fontSize: 14.5,
    color: colors.text,
    borderRightWidth: 1,
    borderRightColor: colors.border,
    paddingVertical: 14,
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: 14,
    fontFamily: fonts.outfit,
    fontSize: 14.5,
    color: colors.text,
  },

  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: 14,
  },
  dropdownText: {
    fontFamily: fonts.outfit,
    fontSize: 14.5,
    color: colors.text,
    flex: 1,
  },
  dropdownPlaceholder: { color: "#A9A49B" },
  dropdownMenu: {
    marginTop: 6,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    overflow: "hidden",
  },
  dropdownItem: { paddingHorizontal: 14, paddingVertical: 12 },
  dropdownItemActive: { backgroundColor: "#FDF6F3" },
  dropdownItemText: { fontFamily: fonts.outfit, fontSize: 14, color: colors.text },
  dropdownItemTextActive: { fontFamily: fonts.outfitSemiBold, color: colors.primary },

  fieldError: { fontFamily: fonts.outfit, fontSize: 12, color: colors.error },

  cal: {
    marginTop: 6,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    padding: 10,
  },
  calHead: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  calNav: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  calMonth: {
    fontFamily: fonts.outfitSemiBold,
    fontSize: 14,
    color: colors.text,
  },
  calGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  calWeekday: {
    width: `${100 / 7}%` as any,
    textAlign: "center",
    fontFamily: fonts.outfitSemiBold,
    fontSize: 11,
    color: colors.mutedText,
    paddingVertical: 4,
  },
  calCell: {
    width: `${100 / 7}%` as any,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 3,
  },
  calDayWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  calDayWrapActive: { backgroundColor: colors.primary },
  calDay: {
    fontFamily: fonts.outfit,
    fontSize: 13,
    color: colors.text,
  },
  calDayDisabled: { color: "#C9C3B8" },
  calDayActive: {
    fontFamily: fonts.outfitSemiBold,
    color: colors.white,
  },
  errorMsg: {
    fontFamily: fonts.outfitSemiBold,
    fontSize: 13,
    color: colors.error,
    textAlign: "center",
  },

  success: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.md,
    padding: spacing.xl,
  },
  successTitle: {
    fontFamily: fonts.serifBold,
    fontSize: 30,
    color: colors.primary,
    textAlign: "center",
  },
  successRule: { width: 40, height: 2, backgroundColor: colors.gold },
  successMsg: {
    fontFamily: fonts.outfit,
    fontSize: 15,
    color: colors.mutedText,
    textAlign: "center",
    lineHeight: 23,
    marginBottom: spacing.sm,
  },
});
