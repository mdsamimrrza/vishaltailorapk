import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { MapPin } from "lucide-react-native";

// Web fallback for the contact map — react-native-maps is native-only.
export default function ContactMapWeb() {
  return (
    <Pressable style={StyleSheet.absoluteFill}>
      <View style={styles.blockA} />
      <View style={styles.blockB} />
      <View style={styles.blockC} />
      <View style={styles.roadH} />
      <View style={styles.roadV} />
      <View style={styles.roadDiag} />
      <View style={styles.pinWrap}>
        <View style={styles.pinHalo} />
        <MapPin color="#E53935" size={32} fill="#E53935" />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  blockA: {
    position: "absolute",
    left: "6%",
    top: "10%",
    width: "30%",
    height: "34%",
    backgroundColor: "#F3EFE6",
    borderRadius: 4,
  },
  blockB: {
    position: "absolute",
    right: "8%",
    top: "14%",
    width: "26%",
    height: "42%",
    backgroundColor: "#E2DDCF",
    borderRadius: 4,
  },
  blockC: {
    position: "absolute",
    left: "12%",
    bottom: "10%",
    width: "38%",
    height: "26%",
    backgroundColor: "#F3EFE6",
    borderRadius: 4,
  },
  roadH: { position: "absolute", left: 0, right: 0, top: "56%", height: 9, backgroundColor: "#FFFFFF" },
  roadV: { position: "absolute", top: 0, bottom: 0, left: "58%", width: 8, backgroundColor: "#FFFFFF" },
  roadDiag: {
    position: "absolute",
    width: 220,
    height: 5,
    backgroundColor: "#F6F2E8",
    transform: [{ rotate: "-28deg" }],
    right: "-12%",
    top: "30%",
  },
  pinWrap: { alignItems: "center", justifyContent: "center", marginTop: -18 },
  pinHalo: {
    position: "absolute",
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(229,57,53,0.15)",
  },
});
