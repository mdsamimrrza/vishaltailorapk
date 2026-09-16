export interface WhyCard {
  id: string;
  icon: "Scissors" | "Sparkles" | "Award" | "Clock";
  title: { en: string; ne: string; hi: string };
  desc: { en: string; ne: string; hi: string };
}

// Exact copy from the website's WhyChooseUs component.
export const whyCards: WhyCard[] = [
  {
    id: "fit",
    icon: "Scissors",
    title: {
      en: "Perfect Fit Guaranteed",
      ne: "परफेक्ट फिट ग्यारेन्टी",
      hi: "परफेक्ट फिट गारंटी",
    },
    desc: {
      en: "If the fit isn't perfect, we alter it for free. No questions asked.",
      ne: "फिट परफेक्ट नभए नि:शुल्क मिलाउँछौं। कुनै प्रश्न छैन।",
      hi: "फिट परफेक्ट न हो तो मुफ्त में ठीक करते हैं। कोई सवाल नहीं।",
    },
  },
  {
    id: "fabrics",
    icon: "Sparkles",
    title: {
      en: "50+ Premium Fabrics",
      ne: "५०+ प्रिमियम कपडा",
      hi: "50+ प्रीमियम कपड़े",
    },
    desc: {
      en: "Choose from our curated collection or bring your own fabric.",
      ne: "हाम्रो छानिएको संग्रहबाट छान्नुहोस् वा आफ्नै कपडा ल्याउनुहोस्।",
      hi: "हमारे चुनिंदा संग्रह से चुनें या अपना कपड़ा लाएँ।",
    },
  },
  {
    id: "experience",
    icon: "Award",
    title: {
      en: "30+ Years of Expertise",
      ne: "३०+ वर्षको अनुभव",
      hi: "30+ वर्षों का अनुभव",
    },
    desc: {
      en: "Every stitch by our master tailor Molabi Mansuri, trained over 3 decades.",
      ne: "३ दशकभन्दा बढी अनुभव भएका हाम्रा मास्टर दर्जी मौलबी मनसुरीको हरेक टाँक।",
      hi: "3 दशक से अधिक अनुभवी हमारे मास्टर दर्जी मौलबी मंसूरी की हर सिलाई।",
    },
  },
  {
    id: "ontime",
    icon: "Clock",
    title: {
      en: "On-Time, Every Time",
      ne: "सधैं समयमै",
      hi: "हर बार समय पर",
    },
    desc: {
      en: "We commit to delivery dates and keep that promise.",
      ne: "हामी डेलिभरी मितिमा प्रतिबद्ध छौं र त्यो वाचा पूरा गर्छौं।",
      hi: "हम डिलीवरी तिथि का वादा करते हैं और निभाते हैं।",
    },
  },
];
