import { Linking, Share, Alert } from "react-native";
import { BUSINESS, whatsappLink, mapsLink } from "../constants/business";

export async function callNumber(tel: string) {
  try {
    await Linking.openURL(`tel:${tel}`);
  } catch {
    Alert.alert("Call", `${BUSINESS.phones.primaryDisplay}`);
  }
}

export async function openWhatsApp(number: string, message?: string) {
  const url = whatsappLink(number, message);
  try {
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      await Linking.openURL(url);
      return;
    }
  } catch {}
  // Fallback: open in browser
  try {
    await Linking.openURL(url);
  } catch {
    Alert.alert("WhatsApp", `${number}`);
  }
}

export async function openMaps() {
  const universal = `https://www.google.com/maps/search/?api=1&query=${BUSINESS.location.lat},${BUSINESS.location.lng}`;
  try {
    await Linking.openURL(universal);  } catch {
    await Linking.openURL(mapsLink).catch(() => {});
  }
}

export async function shareText(message: string) {
  try {
    await Share.share({ message });
  } catch {}
}

export async function openWebsite() {
  try {
    await Linking.openURL(BUSINESS.website);
  } catch {}
}
