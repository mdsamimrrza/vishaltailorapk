import { ImageSourcePropType } from "react-native";

export interface Service {
  id: string;
  titleKey: string;
  priceKey: string;
  deliveryKey: string;
  descKey: string;
  image: ImageSourcePropType;
  occasionKey: string;
}

const img = (rel: string) => {
  const map: Record<string, ImageSourcePropType> = {
    "safari-suits.jpg": require("../../assets/images/nvt/safari-suits.webp"),
    "shirts-pants.jpg": require("../../assets/images/nvt/shirts-pants.webp"),
    "kurta-pajama.jpg": require("../../assets/images/nvt/kurtapajama/k1.webp"),
    "bandi.jpg": require("../../assets/images/nvt/bandi.webp"),
    "catalogue/coatpant.jpg": require("../../assets/images/nvt/catalogue/thumbs/coatpant.webp"),
    "catalogue/sherwani.jpg": require("../../assets/images/nvt/catalogue/thumbs/sherwani.webp"),
  };
  return map[rel];
};

export const services: Service[] = [
  {
    id: "coatpant",
    titleKey: "garments_coatpant",
    priceKey: "garments_coatpant_price",
    deliveryKey: "garments_coatpant_delivery",
    descKey: "garments_coatpant_desc",
    image: img("catalogue/coatpant.jpg"),
    occasionKey: "Office, formal events",
  },
  {
    id: "safari",
    titleKey: "garments_safari",
    priceKey: "garments_safari_price",
    deliveryKey: "garments_safari_delivery",
    descKey: "garments_safari_desc",
    image: img("safari-suits.jpg"),
    occasionKey: "Daily wear, travel",
  },
  {
    id: "pants",
    titleKey: "garments_pants",
    priceKey: "garments_pants_price",
    deliveryKey: "garments_pants_delivery",
    descKey: "garments_pants_desc",
    image: img("shirts-pants.jpg"),
    occasionKey: "Office, everyday formal",
  },
  {
    id: "kurta",
    titleKey: "garments_kurta",
    priceKey: "garments_kurta_price",
    deliveryKey: "garments_kurta_delivery",
    descKey: "garments_kurta_desc",
    image: img("kurta-pajama.jpg"),
    occasionKey: "Festivals, family events",
  },
  {
    id: "sherwani",
    titleKey: "garments_sherwani",
    priceKey: "garments_sherwani_price",
    deliveryKey: "garments_sherwani_delivery",
    descKey: "garments_sherwani_desc",
    image: img("catalogue/sherwani.jpg"),
    occasionKey: "Weddings, ceremonies",
  },
  {
    id: "bandi",
    titleKey: "garments_bandi",
    priceKey: "garments_bandi_price",
    deliveryKey: "garments_bandi_delivery",
    descKey: "garments_bandi_desc",
    image: img("bandi.jpg"),
    occasionKey: "Layer over coat or kurta",
  },
];

export const serviceWhatsAppMessage = (garmentName: string) =>
  `Hi, I'm interested in a ${garmentName}. Can you share more details?`;
