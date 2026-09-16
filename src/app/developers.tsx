import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Clipboard,
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import {
  ArrowLeft,
  Code,
  ExternalLink,
  Globe,
  Mail,
  Server,
  Sparkles,
} from "lucide-react-native";

// Developers screen — port of the web app's /developers page.
// Dark premium theme with gold accents; copy email / Gmail / GitHub / portfolio.
const C = {
  bg: "#050505",
  card: "#111111",
  text: "#F5E6CA",
  body: "#A1A1AA",
  muted: "#71717A",
  gold: "#C9A84C",
  border: "rgba(255,255,255,0.05)",
};

const developers = [
  {
    name: "MD Suweb Reza",
    role: "AI Systems Engineer & Full Stack Developer",
    icon: Code,
    avatar: "https://avatars.githubusercontent.com/u/45898572?v=4",
    bio: "Building high-performance AI platforms and automated workflows for fast-paced startups. Specialized in architecting scalable, event-driven cloud infrastructure and seamless API integrations.",
    skills: ["Next.js", "Node.js", "AWS", "Python", "GenAI"],
    stats: [
      { label: "Experience", value: "8+ yrs" },
      { label: "Projects", value: "15+" },
      { label: "Clients", value: "5+ Countries" },
    ],
    email: "swebreza@gmail.com",
    github: "https://github.com/swebreza",
    portfolio: "https://mdsuwebreza.vercel.app",
  },
  {
    name: "Md Samim Reza",
    role: "Associate Software Engineer",
    icon: Server,
    avatar: "https://avatars.githubusercontent.com/u/147176589?v=4",
    bio: "Building clean, reliable features across the stack with a focus on responsive, premium user interfaces. Skilled at turning complex requirements into polished product experiences, paired with solid Spring Boot backends.",
    skills: ["React", "Tailwind CSS", "Spring Boot", "TypeScript", "PostgreSQL"],
    stats: [
      { label: "Experience", value: "3+ yrs" },
      { label: "Projects", value: "8+" },
      { label: "Focus", value: "Enterprise" },
    ],
    email: "samimrrza1@gmail.com",
    github: "https://github.com/mdsamimrrza",
    portfolio: "https://rezaportfolio.vercel.app",
  },
];

const GMAIL_INQUIRY =
  "https://mail.google.com/mail/?view=cm&fs=1&to={EMAIL}&su=Web Development Inquiry - via Vishal Tailors&body=Hi,%0A%0AI saw your excellent work on the New Vishal Tailors website and I would like to discuss a potential project with you.%0A%0A";

const open = (url: string) => Linking.openURL(url).catch(() => {});

export default function DevelopersScreen() {
  const router = useRouter();
  const [copied, setCopied] = useState<string | null>(null);
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fade, { toValue: 1, duration: 500, useNativeDriver: true }).start();
  }, [fade]);

  const copyEmail = (email: string) => {
    Clipboard.setString(email);
    setCopied(email);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Back to home */}
        <Pressable onPress={() => router.back()} style={({ pressed }) => [styles.back, pressed && { opacity: 0.6 }]} hitSlop={8}>
          <ArrowLeft size={15} color={C.gold} />
          <Text style={styles.backText}>Back to Home</Text>
        </Pressable>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.kickerRow}>
            <Sparkles size={15} color={C.gold} />
            <Text style={styles.kicker}>The Engineering Team</Text>
            <Sparkles size={15} color={C.gold} />
          </View>
          <Text style={styles.title}>
            Meet the <Text style={styles.titleGold}>Developers</Text>
          </Text>
          <Text style={styles.subtitle}>
            We are the engineering duo behind this digital experience. We specialize in building
            high-performance web applications, crafting modern UI/UX designs, and architecting
            scalable backend systems.
          </Text>
          <View style={styles.rule} />
        </View>

        {/* Developer cards */}
        {developers.map((dev) => {
          const Icon = dev.icon;
          return (
            <View key={dev.name} style={styles.card}>
              <View style={styles.avatarWrap}>
                <View style={styles.avatarRing}>
                  <Image source={{ uri: dev.avatar }} style={styles.avatar} />
                </View>
                <View style={styles.iconBadge}>
                  <Icon size={18} color={C.gold} />
                </View>
                <View style={styles.onlineDot} />
              </View>

              <Text style={styles.name}>{dev.name}</Text>
              <Text style={styles.role}>{dev.role}</Text>

              <View style={styles.skillsRow}>
                {dev.skills.map((s) => (
                  <View key={s} style={styles.skillChip}>
                    <Text style={styles.skillText}>{s}</Text>
                  </View>
                ))}
              </View>

              <Text style={styles.bio}>{dev.bio}</Text>

              <View style={styles.statsRow}>
                {dev.stats.map((s) => (
                  <View key={s.label} style={styles.stat}>
                    <Text style={styles.statValue}>{s.value}</Text>
                    <Text style={styles.statLabel}>{s.label}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.emailRow}>
                <Pressable onPress={() => copyEmail(dev.email)} style={({ pressed }) => [styles.copyBtn, pressed && { opacity: 0.85 }]}>
                  <Mail size={16} color="#1A0505" />
                  <Text style={styles.copyBtnText}>{copied === dev.email ? "Copied!" : "Copy Email"}</Text>
                </Pressable>
                <Pressable
                  onPress={() => open(GMAIL_INQUIRY.replace("{EMAIL}", dev.email))}
                  style={({ pressed }) => [styles.gmailBtn, pressed && { opacity: 0.7 }]}
                >
                  <ExternalLink size={18} color={C.gold} />
                </Pressable>
              </View>

              <View style={styles.linkRow}>
                <Pressable onPress={() => open(dev.github)} style={({ pressed }) => [styles.linkBtn, pressed && { opacity: 0.7 }]}>
                  <Globe size={14} color={C.gold} />
                  <Text style={styles.linkBtnText}>GitHub</Text>
                </Pressable>
                <Pressable onPress={() => open(dev.portfolio)} style={({ pressed }) => [styles.linkBtn, pressed && { opacity: 0.7 }]}>
                  <ExternalLink size={14} color={C.gold} />
                  <Text style={styles.linkBtnText}>Portfolio</Text>
                </Pressable>
              </View>
            </View>
          );
        })}

        {/* Footer CTA */}
        <View style={styles.footer}>
          <Text style={styles.footerTitle}>Open to freelance & consulting</Text>
          <Text style={styles.footerBody}>
            Looking for a dedicated team to build your next digital product? We are actively
            accepting new clients for custom web applications and AI integrations.
          </Text>
          <View style={styles.footerBtns}>
            {developers.map((dev) => (
              <Pressable key={dev.email} onPress={() => copyEmail(dev.email)} style={({ pressed }) => [styles.footerBtn, pressed && { opacity: 0.7 }]}>
                <Mail size={14} color={C.gold} />
                <Text style={styles.footerBtnText}>
                  {copied === dev.email ? "Copied!" : `Email ${dev.name.split(" ").slice(-1)[0]}`}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  content: { padding: 20, paddingBottom: 40 },

  back: { flexDirection: "row", alignItems: "center", gap: 6, alignSelf: "flex-start", marginBottom: 28 },
  backText: { color: "rgba(201,168,76,0.6)", fontSize: 11, fontWeight: "700", letterSpacing: 2, textTransform: "uppercase" },

  header: { alignItems: "center", marginBottom: 30 },
  kickerRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 18 },
  kicker: { color: C.gold, fontSize: 11, fontWeight: "700", letterSpacing: 4, textTransform: "uppercase" },
  title: { fontSize: 34, lineHeight: 42, fontWeight: "700", color: C.text, textAlign: "center", marginBottom: 14 },
  titleGold: { color: C.gold },
  subtitle: { color: C.body, fontSize: 14, lineHeight: 22, textAlign: "center", paddingHorizontal: 8 },
  rule: { width: 64, height: 1, backgroundColor: "rgba(201,168,76,0.3)", marginTop: 26 },

  card: {
    backgroundColor: "rgba(17,17,17,0.5)",
    borderWidth: 1,
    borderColor: C.border,
    padding: 22,
    marginBottom: 20,
    alignItems: "center",
  },
  avatarWrap: { marginBottom: 18, marginTop: 4 },
  avatarRing: {
    width: 116,
    height: 116,
    borderRadius: 58,
    padding: 3,
    borderWidth: 1,
    borderColor: "rgba(201,168,76,0.4)",
    backgroundColor: "rgba(201,168,76,0.08)",
  },
  avatar: { width: "100%", height: "100%", borderRadius: 55, backgroundColor: "#1C1C1E" },
  iconBadge: {
    position: "absolute",
    bottom: -4,
    right: -4,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
    alignItems: "center",
    justifyContent: "center",
  },
  onlineDot: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#22C55E",
  },

  name: { fontSize: 24, fontWeight: "700", color: C.text, marginBottom: 4 },
  role: {
    color: C.gold,
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 2,
    textTransform: "uppercase",
    textAlign: "center",
    marginBottom: 16,
  },
  skillsRow: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: 6, marginBottom: 16 },
  skillChip: {
    borderWidth: 1,
    borderColor: "rgba(201,168,76,0.2)",
    backgroundColor: "rgba(201,168,76,0.05)",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  skillText: { color: C.gold, fontSize: 9, fontWeight: "700", letterSpacing: 1, textTransform: "uppercase" },
  bio: { color: C.body, fontSize: 13, lineHeight: 20, textAlign: "center", marginBottom: 18 },

  statsRow: {
    flexDirection: "row",
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: "rgba(201,168,76,0.1)",
    paddingTop: 16,
    marginBottom: 18,
  },
  stat: { flex: 1, alignItems: "center" },
  statValue: { fontSize: 17, fontWeight: "700", color: C.text, marginBottom: 2 },
  statLabel: { fontSize: 9, color: C.muted, letterSpacing: 1, textTransform: "uppercase" },

  emailRow: { flexDirection: "row", width: "100%", gap: 8, marginBottom: 10 },
  copyBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: C.gold,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  copyBtnText: { color: "#1A0505", fontSize: 12, fontWeight: "700", letterSpacing: 1.5, textTransform: "uppercase" },
  gmailBtn: {
    width: 52,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(201,168,76,0.5)",
  },
  linkRow: { flexDirection: "row", width: "100%", gap: 10 },
  linkBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    borderWidth: 1,
    borderColor: "rgba(201,168,76,0.2)",
    paddingVertical: 11,
  },
  linkBtnText: { color: C.gold, fontSize: 10, fontWeight: "700", letterSpacing: 1.5, textTransform: "uppercase" },

  footer: {
    borderWidth: 1,
    borderColor: "rgba(201,168,76,0.2)",
    backgroundColor: "rgba(17,17,17,0.3)",
    padding: 26,
    alignItems: "center",
    marginTop: 8,
  },
  footerTitle: { fontSize: 20, fontWeight: "700", color: C.text, marginBottom: 10, textAlign: "center" },
  footerBody: { color: C.body, fontSize: 12.5, lineHeight: 19, textAlign: "center", marginBottom: 20 },
  footerBtns: { flexDirection: "row", flexWrap: "wrap", gap: 10, justifyContent: "center" },
  footerBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    borderWidth: 1,
    borderColor: "rgba(201,168,76,0.4)",
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  footerBtnText: { color: C.gold, fontSize: 11, fontWeight: "700", letterSpacing: 1.5, textTransform: "uppercase" },
});
