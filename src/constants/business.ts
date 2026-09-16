// Single source of truth for all business contact information.
// Never duplicate these values in screens.
export const BUSINESS = {
  name: "New Vishal Tailors",
  website: "https://newvishaltailor.vercel.app/",

  phones: {
    primaryDisplay: "+977 980-4833357",
    primaryTel: "+9779804833357",
    secondaryDisplay: "+977 981-2097433",
    secondaryTel: "+9779812097433",
  },

  whatsappNumber: "9779804833357",
  whatsappSecondary: "9779812097433",

  email: "info@newvishaltailors.com",

  location: {
    lat: 26.730175,
    lng: 85.926883,
    mapsQuery: "Janaki+Chowk,Janakpur+Dham,Nepal",
  },

  // Enquiry API (existing backend). Override with EXPO_PUBLIC_API_URL if hosted elsewhere.
  apiBaseUrl: process.env.EXPO_PUBLIC_API_URL ?? "https://newvishaltailor.vercel.app",
} as const;

export const telLink = (tel: string) => `tel:${tel}`;

export const whatsappLink = (number: string, message?: string) =>
  `https://wa.me/${number}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

export const mapsLink = `https://maps.google.com/?q=${BUSINESS.location.mapsQuery}`;
