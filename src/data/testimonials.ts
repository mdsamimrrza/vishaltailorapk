export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: { ne: string; hi: string; en: string };
  date: string;
  garmentOrdered: { ne: string; hi: string; en: string };
}

// Ported from the website's src/data/testimonials.ts.
export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Rameshwar Sah",
    location: "Biratnagar",
    rating: 5,
    text: {
      ne: "मेरो विवाहको शेरवानी जति सुन्दर थियो, फिट पनि त्यतिकै परफेक्ट थियो। मौलबी जीको काम साँच्चै उत्कृष्ट छ।",
      hi: "मेरी शादी की शेरवानी जितनी सुंदर थी, फिट भी उतनी ही परफेक्ट थी। मौलवी जी का काम सच में बेहतरीन है।",
      en: "My wedding sherwani was as beautiful as it was perfectly fitted. Molabi ji's work is truly excellent.",
    },
    date: "March 2025",
    garmentOrdered: { ne: "विवाह शेरवानी", hi: "वेडिंग शेरवानी", en: "Wedding Sherwani" },
  },
  {
    id: "2",
    name: "Sunita Devi",
    location: "Janakpur",
    rating: 5,
    text: {
      ne: "हाम्रो परिवारले वर्षौंदेखि यहीँबाट सिलाउँछ। एकपटक नाप लिएपछि सधैं उत्तम फिट हुन्छ।",
      hi: "हमारा परिवार वर्षों से यहीं सिलवाता है। एक बार नाप लेने के बाद हमेशा बेहतरीन फिट मिलता है।",
      en: "Our family has stitched here for years. Once they take your measurements, every garment fits beautifully.",
    },
    date: "January 2025",
    garmentOrdered: { ne: "कोट-प्यान्ट", hi: "कोट-पेंट", en: "Coat-Pant" },
  },
  {
    id: "3",
    name: "Anil Kumar",
    location: "Kathmandu",
    rating: 4,
    text: {
      ne: "सफारी सूटका लागि शहरमै यो भन्दा राम्रो ठाउँ छैन। उचित मूल्य र राजसी गुणस्तर।",
      hi: "सफारी सूट के लिए शहर में इससे बेहतर जगह नहीं है। उचित कीमत और शाही गुणवत्ता।",
      en: "There is no better place in town for a safari suit. Fair price and royal quality.",
    },
    date: "December 2024",
    garmentOrdered: { ne: "सफारी सूट", hi: "सफारी सूट", en: "Safari Suit" },
  },
];
