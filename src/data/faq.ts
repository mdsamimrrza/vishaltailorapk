export interface FaqItem {
  id: string;
  q: { en: string; ne: string; hi: string };
  a: { en: string; ne: string; hi: string };
}

// Exact copy from the website's FAQ component.
export const faqItems: FaqItem[] = [
  {
    id: "1",
    q: {
      en: "How long does a suit take?",
      ne: "सुट बनाउन कति समय लाग्छ?",
      hi: "सूट बनने में कितना समय लगता है?",
    },
    a: {
      en: "A suit typically takes 10–14 days. Rush orders are available in 7 days for an additional charge.",
      ne: "सुट बनाउन सामान्यतया १०–१४ दिन लाग्छ। थप शुल्कमा ७ दिनमा तत्परता सेवा उपलब्ध छ।",
      hi: "सूट में आमतौर पर 10–14 दिन लगते हैं। अतिरिक्त शुल्क पर 7 दिनों में रश ऑर्डर उपलब्ध है।",
    },
  },
  {
    id: "2",
    q: {
      en: "Can I bring my own fabric?",
      ne: "के म आफ्नै कपडा ल्याउन सक्छु?",
      hi: "क्या मैं अपना कपड़ा ला सकता हूँ?",
    },
    a: {
      en: "Absolutely. You can bring your own fabric or choose from our 50+ premium collection in store.",
      ne: "पक्कै। तपाईं आफ्नै कपडा ल्याउन सक्नुहुन्छ वा पसलमा हाम्रो ५०+ प्रिमियम संग्रहबाट छान्न सक्नुहुन्छ।",
      hi: "बिल्कुल। आप अपना कपड़ा ला सकते हैं या दुकान पर हमारे 50+ प्रीमियम संग्रह से चुन सकते हैं।",
    },
  },
  {
    id: "3",
    q: {
      en: "Do you offer alterations for existing clothes?",
      ne: "पुराना लुगामा परिवर्तन गर्नुहुन्छ?",
      hi: "पुराने कपड़ों में बदलाव करते हैं?",
    },
    a: {
      en: "Yes. We do alterations on garments from any tailor. Bring it in for a free assessment.",
      ne: "छ। कुनै पनि दर्जीको लुगामा हामी परिवर्तन गर्छौं। नि:शुल्क मूल्यांकनका लागि ल्याउनुहोस्।",
      hi: "हाँ। किसी भी दर्जी के कपड़ों में हम बदलाव करते हैं। मुफ्त जाँच के लिए लाइए।",
    },
  },
  {
    id: "4",
    q: {
      en: "What is the payment process?",
      ne: "भुक्तानी प्रक्रिया के हो?",
      hi: "भुगतान प्रक्रिया क्या है?",
    },
    a: {
      en: "We take 50% advance at measurement and the remaining on delivery. We accept cash and mobile payment.",
      ne: "नाप लिँदा ५०% अग्रिम र डेलिभरीमा बाँकी रकम लिइन्छ। नगद र मोबाइल भुक्तानी स्वीकार गर्छौं।",
      hi: "नाप के समय 50% एडवांस और डिलीवरी पर शेष राशि लेते हैं। नकद और मोबाइल भुगतान स्वीकार है।",
    },
  },
  {
    id: "5",
    q: {
      en: "Do you deliver outside Janakpur?",
      ne: "जनकपुर बाहिर डेलिभरी गर्नुहुन्छ?",
      hi: "जनकपुर के बाहर डिलीवरी करते हैं?",
    },
    a: {
      en: "We can arrange courier delivery within Nepal. Contact us for details.",
      ne: "नेपालभित्र कुरियर डेलिभरीको व्यवस्था गर्न सक्छौं। विवरणका लागि सम्पर्क गर्नुहोस्।",
      hi: "नेपालभर कूरियर डिलीवरी की व्यवस्था कर सकते हैं। जानकारी के लिए संपर्क करें।",
    },
  },
];
