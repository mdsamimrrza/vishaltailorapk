import { ImageSourcePropType } from "react-native";

// Page-6 gallery assets (extracted from the approved spec sheet).
export interface GalleryImage {
  id: string;
  source: ImageSourcePropType;
  thumb: ImageSourcePropType;
  cats: string[];
}

export const galleryImages: GalleryImage[] = [
  { id: "g01", cats: ["suits"], source: require("../../assets/images/nvt/gallery/gallery-01.webp"), thumb: require("../../assets/images/nvt/gallery/thumbs/gallery-01.webp") },
  { id: "g02", cats: ["sherwani"], source: require("../../assets/images/nvt/gallery/gallery-02.webp"), thumb: require("../../assets/images/nvt/gallery/thumbs/gallery-02.webp") },
  { id: "g03", cats: ["fabric"], source: require("../../assets/images/nvt/gallery/gallery-03.webp"), thumb: require("../../assets/images/nvt/gallery/thumbs/gallery-03.webp") },
  { id: "g04", cats: ["collection"], source: require("../../assets/images/nvt/gallery/gallery-04.webp"), thumb: require("../../assets/images/nvt/gallery/thumbs/gallery-04.webp") },
  { id: "g05", cats: ["kurtas"], source: require("../../assets/images/nvt/gallery/gallery-05.webp"), thumb: require("../../assets/images/nvt/gallery/thumbs/gallery-05.webp") },
  { id: "g06", cats: ["fabric"], source: require("../../assets/images/nvt/gallery/gallery-06.webp"), thumb: require("../../assets/images/nvt/gallery/thumbs/gallery-06.webp") },
  { id: "g07", cats: ["suits"], source: require("../../assets/images/nvt/gallery/gallery-07.webp"), thumb: require("../../assets/images/nvt/gallery/thumbs/gallery-07.webp") },
  { id: "g08", cats: ["fabric"], source: require("../../assets/images/nvt/gallery/gallery-08.webp"), thumb: require("../../assets/images/nvt/gallery/thumbs/gallery-08.webp") },
  { id: "g09", cats: ["sherwani"], source: require("../../assets/images/nvt/gallery/gallery-09.webp"), thumb: require("../../assets/images/nvt/gallery/thumbs/gallery-09.webp") },
  { id: "g12", cats: ["sherwani"], source: require("../../assets/images/nvt/gallery/gallery-12.webp"), thumb: require("../../assets/images/nvt/gallery/thumbs/gallery-12.webp") },

  // Shirt & suit photos (added from nvt/shirt and nvt/suit)
  { id: "sh01", cats: ["shirts"], source: require("../../assets/images/nvt/shirt/s1.webp"), thumb: require("../../assets/images/nvt/shirt/thumbs/s1.webp") },
  { id: "sh02", cats: ["shirts"], source: require("../../assets/images/nvt/shirt/s2.webp"), thumb: require("../../assets/images/nvt/shirt/thumbs/s2.webp") },
  { id: "sh03", cats: ["shirts"], source: require("../../assets/images/nvt/shirt/s3.webp"), thumb: require("../../assets/images/nvt/shirt/thumbs/s3.webp") },
  { id: "sh04", cats: ["shirts"], source: require("../../assets/images/nvt/shirt/s4.webp"), thumb: require("../../assets/images/nvt/shirt/thumbs/s4.webp") },
  { id: "sh05", cats: ["shirts"], source: require("../../assets/images/nvt/shirt/s5.webp"), thumb: require("../../assets/images/nvt/shirt/thumbs/s5.webp") },
  { id: "sh06", cats: ["shirts"], source: require("../../assets/images/nvt/shirt/s6.webp"), thumb: require("../../assets/images/nvt/shirt/thumbs/s6.webp") },
  { id: "sh07", cats: ["shirts"], source: require("../../assets/images/nvt/shirt/s7.webp"), thumb: require("../../assets/images/nvt/shirt/thumbs/s7.webp") },
  { id: "sh08", cats: ["shirts"], source: require("../../assets/images/nvt/shirt/s8.webp"), thumb: require("../../assets/images/nvt/shirt/thumbs/s8.webp") },
  { id: "sh09", cats: ["shirts"], source: require("../../assets/images/nvt/shirt/s9.webp"), thumb: require("../../assets/images/nvt/shirt/thumbs/s9.webp") },
  { id: "sh10", cats: ["shirts"], source: require("../../assets/images/nvt/shirt/s10.webp"), thumb: require("../../assets/images/nvt/shirt/thumbs/s10.webp") },
  { id: "sh11", cats: ["shirts"], source: require("../../assets/images/nvt/shirt/s11.webp"), thumb: require("../../assets/images/nvt/shirt/thumbs/s11.webp") },
  { id: "su01", cats: ["suits"], source: require("../../assets/images/nvt/suit/c1.webp"), thumb: require("../../assets/images/nvt/suit/thumbs/c1.webp") },
  { id: "su02", cats: ["suits"], source: require("../../assets/images/nvt/suit/c2.webp"), thumb: require("../../assets/images/nvt/suit/thumbs/c2.webp") },
  { id: "su03", cats: ["suits"], source: require("../../assets/images/nvt/suit/c3.webp"), thumb: require("../../assets/images/nvt/suit/thumbs/c3.webp") },
  { id: "su04", cats: ["suits"], source: require("../../assets/images/nvt/suit/c4.webp"), thumb: require("../../assets/images/nvt/suit/thumbs/c4.webp") },
  { id: "su05", cats: ["suits"], source: require("../../assets/images/nvt/suit/c5.webp"), thumb: require("../../assets/images/nvt/suit/thumbs/c5.webp") },
  { id: "su06", cats: ["suits"], source: require("../../assets/images/nvt/suit/c6.webp"), thumb: require("../../assets/images/nvt/suit/thumbs/c6.webp") },
  { id: "su07", cats: ["suits"], source: require("../../assets/images/nvt/suit/c8.webp"), thumb: require("../../assets/images/nvt/suit/thumbs/c8.webp") },
  { id: "su08", cats: ["suits"], source: require("../../assets/images/nvt/suit/c9.webp"), thumb: require("../../assets/images/nvt/suit/thumbs/c9.webp") },
  { id: "su09", cats: ["suits"], source: require("../../assets/images/nvt/suit/c10.webp"), thumb: require("../../assets/images/nvt/suit/thumbs/c10.webp") },
  { id: "su10", cats: ["suits"], source: require("../../assets/images/nvt/suit/c11.webp"), thumb: require("../../assets/images/nvt/suit/thumbs/c11.webp") },
  { id: "su11", cats: ["suits"], source: require("../../assets/images/nvt/suit/c12.webp"), thumb: require("../../assets/images/nvt/suit/thumbs/c12.webp") },
  { id: "su12", cats: ["suits"], source: require("../../assets/images/nvt/suit/c13.webp"), thumb: require("../../assets/images/nvt/suit/thumbs/c13.webp") },
  { id: "su13", cats: ["suits"], source: require("../../assets/images/nvt/suit/c14.webp"), thumb: require("../../assets/images/nvt/suit/thumbs/c14.webp") },
  { id: "su14", cats: ["suits"], source: require("../../assets/images/nvt/suit/c15.webp"), thumb: require("../../assets/images/nvt/suit/thumbs/c15.webp") },
  { id: "su15", cats: ["suits"], source: require("../../assets/images/nvt/suit/c17.webp"), thumb: require("../../assets/images/nvt/suit/thumbs/c17.webp") },
  { id: "su16", cats: ["suits"], source: require("../../assets/images/nvt/suit/c26.webp"), thumb: require("../../assets/images/nvt/suit/thumbs/c26.webp") },

  // Safari suits & kha dresses
  { id: "sf01", cats: ["suits"], source: require("../../assets/images/nvt/safari/sh1.webp"), thumb: require("../../assets/images/nvt/safari/thumbs/sh1.webp") },
  { id: "sf02", cats: ["suits"], source: require("../../assets/images/nvt/safari/sh2.webp"), thumb: require("../../assets/images/nvt/safari/thumbs/sh2.webp") },
  { id: "sf03", cats: ["suits"], source: require("../../assets/images/nvt/safari/sh3.webp"), thumb: require("../../assets/images/nvt/safari/thumbs/sh3.webp") },
  { id: "sf04", cats: ["suits"], source: require("../../assets/images/nvt/safari/sh4.webp"), thumb: require("../../assets/images/nvt/safari/thumbs/sh4.webp") },
  { id: "sf05", cats: ["suits"], source: require("../../assets/images/nvt/safari/sh5.webp"), thumb: require("../../assets/images/nvt/safari/thumbs/sh5.webp") },
  { id: "sf06", cats: ["suits"], source: require("../../assets/images/nvt/safari/sh6.webp"), thumb: require("../../assets/images/nvt/safari/thumbs/sh6.webp") },
  { id: "sf07", cats: ["suits"], source: require("../../assets/images/nvt/safari/sh7.webp"), thumb: require("../../assets/images/nvt/safari/thumbs/sh7.webp") },
  { id: "sf08", cats: ["suits"], source: require("../../assets/images/nvt/safari/sh8.webp"), thumb: require("../../assets/images/nvt/safari/thumbs/sh8.webp") },
  { id: "sf09", cats: ["suits"], source: require("../../assets/images/nvt/safari/sh9.webp"), thumb: require("../../assets/images/nvt/safari/thumbs/sh9.webp") },
  { id: "kh02", cats: ["khandress"], source: require("../../assets/images/nvt/khandress/kh2.webp"), thumb: require("../../assets/images/nvt/khandress/thumbs/kh2.webp") },
  { id: "kh03", cats: ["khandress"], source: require("../../assets/images/nvt/khandress/kh3.webp"), thumb: require("../../assets/images/nvt/khandress/thumbs/kh3.webp") },
  { id: "kh04", cats: ["khandress"], source: require("../../assets/images/nvt/khandress/kh4.webp"), thumb: require("../../assets/images/nvt/khandress/thumbs/kh4.webp") },
  { id: "kh05", cats: ["khandress"], source: require("../../assets/images/nvt/khandress/kh5.webp"), thumb: require("../../assets/images/nvt/khandress/thumbs/kh5.webp") },
  { id: "kh06", cats: ["khandress"], source: require("../../assets/images/nvt/khandress/kh6.webp"), thumb: require("../../assets/images/nvt/khandress/thumbs/kh6.webp") },
  { id: "kh07", cats: ["khandress"], source: require("../../assets/images/nvt/khandress/kh7.webp"), thumb: require("../../assets/images/nvt/khandress/thumbs/kh7.webp") },
  { id: "kh08", cats: ["khandress"], source: require("../../assets/images/nvt/khandress/kh8.webp"), thumb: require("../../assets/images/nvt/khandress/thumbs/kh8.webp") },
  { id: "kh09", cats: ["khandress"], source: require("../../assets/images/nvt/khandress/kh9.webp"), thumb: require("../../assets/images/nvt/khandress/thumbs/kh9.webp") },

  // Kurta pajama
  { id: "kp01", cats: ["kurtas"], source: require("../../assets/images/nvt/kurtapajama/k1.webp"), thumb: require("../../assets/images/nvt/kurtapajama/thumbs/k1.webp") },
  { id: "kp02", cats: ["kurtas"], source: require("../../assets/images/nvt/kurtapajama/k2.webp"), thumb: require("../../assets/images/nvt/kurtapajama/thumbs/k2.webp") },
  { id: "kp03", cats: ["kurtas"], source: require("../../assets/images/nvt/kurtapajama/k3.webp"), thumb: require("../../assets/images/nvt/kurtapajama/thumbs/k3.webp") },
  { id: "kp04", cats: ["kurtas"], source: require("../../assets/images/nvt/kurtapajama/k4.webp"), thumb: require("../../assets/images/nvt/kurtapajama/thumbs/k4.webp") },
];