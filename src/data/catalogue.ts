import { ImageSourcePropType } from "react-native";

export interface CatalogueItem {
  id: string;
  category: "coatpant" | "sherwani" | "shirt" | "suits" | "safari" | "dress";
  nameEn: string;
  nameNe: string;
  nameHi: string;
  descEn: string;
  descNe: string;
  descHi: string;
  tagsEn: string[];
  tagsNe: string[];
  tagsHi: string[];
  fitEn: string;
  fitNe: string;
  fitHi: string;
  fabricEn: string;
  fabricNe: string;
  fabricHi: string;
  colorEn: string;
  colorNe: string;
  colorHi: string;
  image: string;
}

// Lazy-load catalogue data to avoid blocking JS thread on startup (Moto G45 ANR fix)
let _catalogueItems: CatalogueItem[] | null = null;
export const getCatalogueItems = (): CatalogueItem[] => {
  if (!_catalogueItems) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    _catalogueItems = require("./catalogue.json") as CatalogueItem[];
  }
  return _catalogueItems;
};

// Full-size images are now loaded remotely (CDN) — keep only local thumbnails for lists.
// The `image` field in catalogue.json still contains the original path for CDN URL construction.
const thumbMap: Record<string, ImageSourcePropType> = {
  "/images/catalogue/cp-01.jpg": require("../../assets/images/nvt/catalogue/thumbs/cp-01.webp"),
  "/images/catalogue/cp-02.jpg": require("../../assets/images/nvt/catalogue/thumbs/cp-02.webp"),
  "/images/catalogue/cp-03.jpg": require("../../assets/images/nvt/catalogue/thumbs/cp-03.webp"),
  "/images/catalogue/cp-04.jpg": require("../../assets/images/nvt/catalogue/thumbs/cp-04.webp"),
  "/images/catalogue/cp-05.jpg": require("../../assets/images/nvt/catalogue/thumbs/cp-05.webp"),
  "/images/catalogue/cp-06.jpg": require("../../assets/images/nvt/catalogue/thumbs/cp-06.webp"),
  "/images/catalogue/cp-07.jpg": require("../../assets/images/nvt/catalogue/thumbs/cp-07.webp"),
  "/images/catalogue/cp-08.jpg": require("../../assets/images/nvt/catalogue/thumbs/cp-08.webp"),
  "/images/catalogue/cp-09.jpg": require("../../assets/images/nvt/catalogue/thumbs/cp-09.webp"),
  "/images/catalogue/cp-10.jpg": require("../../assets/images/nvt/catalogue/thumbs/cp-10.webp"),
  "/images/catalogue/cp-11.jpg": require("../../assets/images/nvt/catalogue/thumbs/cp-11.webp"),
  "/images/catalogue/coatpant.jpg": require("../../assets/images/nvt/catalogue/thumbs/coatpant.webp"),
  "/images/catalogue/sherwani.jpg": require("../../assets/images/nvt/catalogue/thumbs/sherwani.webp"),
  "/images/shirt/s1.jpeg": require("../../assets/images/nvt/shirt/thumbs/s1.webp"),
  "/images/shirt/s2.jpeg": require("../../assets/images/nvt/shirt/thumbs/s2.webp"),
  "/images/shirt/s3.jpeg": require("../../assets/images/nvt/shirt/thumbs/s3.webp"),
  "/images/shirt/s4.jpeg": require("../../assets/images/nvt/shirt/thumbs/s4.webp"),
  "/images/shirt/s5.jpeg": require("../../assets/images/nvt/shirt/thumbs/s5.webp"),
  "/images/shirt/s6.jpeg": require("../../assets/images/nvt/shirt/thumbs/s6.webp"),
  "/images/shirt/s7.jpeg": require("../../assets/images/nvt/shirt/thumbs/s7.webp"),
  "/images/shirt/s8.jpeg": require("../../assets/images/nvt/shirt/thumbs/s8.webp"),
  "/images/shirt/s9.jpeg": require("../../assets/images/nvt/shirt/thumbs/s9.webp"),
  "/images/shirt/s10.jpeg": require("../../assets/images/nvt/shirt/thumbs/s10.webp"),
  "/images/shirt/s11.jpeg": require("../../assets/images/nvt/shirt/thumbs/s11.webp"),
  "/images/suit/c1.jpeg": require("../../assets/images/nvt/suit/thumbs/c1.webp"),
  "/images/suit/c2.jpeg": require("../../assets/images/nvt/suit/thumbs/c2.webp"),
  "/images/suit/c3.jpeg": require("../../assets/images/nvt/suit/thumbs/c3.webp"),
  "/images/suit/c4.jpeg": require("../../assets/images/nvt/suit/thumbs/c4.webp"),
  "/images/suit/c5.jpeg": require("../../assets/images/nvt/suit/thumbs/c5.webp"),
  "/images/suit/c6.jpeg": require("../../assets/images/nvt/suit/thumbs/c6.webp"),
  "/images/suit/c8.jpeg": require("../../assets/images/nvt/suit/thumbs/c8.webp"),
  "/images/suit/c9.jpeg": require("../../assets/images/nvt/suit/thumbs/c9.webp"),
  "/images/suit/c10.jpeg": require("../../assets/images/nvt/suit/thumbs/c10.webp"),
  "/images/suit/c11.jpeg": require("../../assets/images/nvt/suit/thumbs/c11.webp"),
  "/images/suit/c12.jpeg": require("../../assets/images/nvt/suit/thumbs/c12.webp"),
  "/images/suit/c13.jpeg": require("../../assets/images/nvt/suit/thumbs/c13.webp"),
  "/images/suit/c14.jpeg": require("../../assets/images/nvt/suit/thumbs/c14.webp"),
  "/images/suit/c15.jpeg": require("../../assets/images/nvt/suit/thumbs/c15.webp"),
  "/images/suit/c17.jpeg": require("../../assets/images/nvt/suit/thumbs/c17.webp"),
  "/images/suit/c26.jpeg": require("../../assets/images/nvt/suit/thumbs/c26.webp"),
  "/images/safari/sh1.jpeg": require("../../assets/images/nvt/safari/thumbs/sh1.webp"),
  "/images/safari/sh2.jpeg": require("../../assets/images/nvt/safari/thumbs/sh2.webp"),
  "/images/safari/sh3.jpeg": require("../../assets/images/nvt/safari/thumbs/sh3.webp"),
  "/images/safari/sh4.jpeg": require("../../assets/images/nvt/safari/thumbs/sh4.webp"),
  "/images/safari/sh5.jpeg": require("../../assets/images/nvt/safari/thumbs/sh5.webp"),
  "/images/safari/sh6.jpeg": require("../../assets/images/nvt/safari/thumbs/sh6.webp"),
  "/images/safari/sh7.jpeg": require("../../assets/images/nvt/safari/thumbs/sh7.webp"),
  "/images/safari/sh8.jpeg": require("../../assets/images/nvt/safari/thumbs/sh8.webp"),
  "/images/safari/sh9.jpeg": require("../../assets/images/nvt/safari/thumbs/sh9.webp"),
  "/images/khandress/kh1.jpeg": require("../../assets/images/nvt/khandress/thumbs/kh1.webp"),
  "/images/khandress/kh2.jpeg": require("../../assets/images/nvt/khandress/thumbs/kh2.webp"),
  "/images/khandress/kh3.jpeg": require("../../assets/images/nvt/khandress/thumbs/kh3.webp"),
  "/images/khandress/kh4.jpeg": require("../../assets/images/nvt/khandress/thumbs/kh4.webp"),
  "/images/khandress/kh5.jpeg": require("../../assets/images/nvt/khandress/thumbs/kh5.webp"),
  "/images/khandress/kh6.jpeg": require("../../assets/images/nvt/khandress/thumbs/kh6.webp"),
  "/images/khandress/kh7.jpeg": require("../../assets/images/nvt/khandress/thumbs/kh7.webp"),
  "/images/khandress/kh8.jpeg": require("../../assets/images/nvt/khandress/thumbs/kh8.webp"),
  "/images/khandress/kh9.jpeg": require("../../assets/images/nvt/khandress/thumbs/kh9.webp"),
};

export const catalogueThumb = (item: CatalogueItem): ImageSourcePropType =>
  thumbMap[item.image] ?? catalogueImage(item);

// Full-size images bundled locally (converted from the web repo, see scripts/convert-full-images.mjs).
const fullMap: Record<string, ImageSourcePropType> = {
  "/images/catalogue/coatpant.jpg": require("../../assets/images/nvt/full/catalogue/coatpant.webp"),
  "/images/catalogue/cp-01.jpg": require("../../assets/images/nvt/full/catalogue/cp-01.webp"),
  "/images/catalogue/cp-02.jpg": require("../../assets/images/nvt/full/catalogue/cp-02.webp"),
  "/images/catalogue/cp-03.jpg": require("../../assets/images/nvt/full/catalogue/cp-03.webp"),
  "/images/catalogue/cp-04.jpg": require("../../assets/images/nvt/full/catalogue/cp-04.webp"),
  "/images/catalogue/cp-05.jpg": require("../../assets/images/nvt/full/catalogue/cp-05.webp"),
  "/images/catalogue/cp-06.jpg": require("../../assets/images/nvt/full/catalogue/cp-06.webp"),
  "/images/catalogue/cp-07.jpg": require("../../assets/images/nvt/full/catalogue/cp-07.webp"),
  "/images/catalogue/cp-08.jpg": require("../../assets/images/nvt/full/catalogue/cp-08.webp"),
  "/images/catalogue/cp-09.jpg": require("../../assets/images/nvt/full/catalogue/cp-09.webp"),
  "/images/catalogue/cp-10.jpg": require("../../assets/images/nvt/full/catalogue/cp-10.webp"),
  "/images/catalogue/cp-11.jpg": require("../../assets/images/nvt/full/catalogue/cp-11.webp"),
  "/images/khandress/kh1.jpeg": require("../../assets/images/nvt/full/khandress/kh1.webp"),
  "/images/khandress/kh2.jpeg": require("../../assets/images/nvt/full/khandress/kh2.webp"),
  "/images/khandress/kh3.jpeg": require("../../assets/images/nvt/full/khandress/kh3.webp"),
  "/images/khandress/kh4.jpeg": require("../../assets/images/nvt/full/khandress/kh4.webp"),
  "/images/khandress/kh5.jpeg": require("../../assets/images/nvt/full/khandress/kh5.webp"),
  "/images/khandress/kh6.jpeg": require("../../assets/images/nvt/full/khandress/kh6.webp"),
  "/images/khandress/kh7.jpeg": require("../../assets/images/nvt/full/khandress/kh7.webp"),
  "/images/khandress/kh8.jpeg": require("../../assets/images/nvt/full/khandress/kh8.webp"),
  "/images/khandress/kh9.jpeg": require("../../assets/images/nvt/full/khandress/kh9.webp"),
  "/images/safari/sh1.jpeg": require("../../assets/images/nvt/full/safari/sh1.webp"),
  "/images/safari/sh2.jpeg": require("../../assets/images/nvt/full/safari/sh2.webp"),
  "/images/safari/sh3.jpeg": require("../../assets/images/nvt/full/safari/sh3.webp"),
  "/images/safari/sh4.jpeg": require("../../assets/images/nvt/full/safari/sh4.webp"),
  "/images/safari/sh5.jpeg": require("../../assets/images/nvt/full/safari/sh5.webp"),
  "/images/safari/sh6.jpeg": require("../../assets/images/nvt/full/safari/sh6.webp"),
  "/images/safari/sh7.jpeg": require("../../assets/images/nvt/full/safari/sh7.webp"),
  "/images/safari/sh8.jpeg": require("../../assets/images/nvt/full/safari/sh8.webp"),
  "/images/safari/sh9.jpeg": require("../../assets/images/nvt/full/safari/sh9.webp"),
  "/images/shirt/s1.jpeg": require("../../assets/images/nvt/full/shirt/s1.webp"),
  "/images/shirt/s10.jpeg": require("../../assets/images/nvt/full/shirt/s10.webp"),
  "/images/shirt/s11.jpeg": require("../../assets/images/nvt/full/shirt/s11.webp"),
  "/images/shirt/s2.jpeg": require("../../assets/images/nvt/full/shirt/s2.webp"),
  "/images/shirt/s3.jpeg": require("../../assets/images/nvt/full/shirt/s3.webp"),
  "/images/shirt/s4.jpeg": require("../../assets/images/nvt/full/shirt/s4.webp"),
  "/images/shirt/s5.jpeg": require("../../assets/images/nvt/full/shirt/s5.webp"),
  "/images/shirt/s6.jpeg": require("../../assets/images/nvt/full/shirt/s6.webp"),
  "/images/shirt/s7.jpeg": require("../../assets/images/nvt/full/shirt/s7.webp"),
  "/images/shirt/s8.jpeg": require("../../assets/images/nvt/full/shirt/s8.webp"),
  "/images/shirt/s9.jpeg": require("../../assets/images/nvt/full/shirt/s9.webp"),
  "/images/suit/c1.jpeg": require("../../assets/images/nvt/full/suit/c1.webp"),
  "/images/suit/c10.jpeg": require("../../assets/images/nvt/full/suit/c10.webp"),
  "/images/suit/c11.jpeg": require("../../assets/images/nvt/full/suit/c11.webp"),
  "/images/suit/c12.jpeg": require("../../assets/images/nvt/full/suit/c12.webp"),
  "/images/suit/c13.jpeg": require("../../assets/images/nvt/full/suit/c13.webp"),
  "/images/suit/c14.jpeg": require("../../assets/images/nvt/full/suit/c14.webp"),
  "/images/suit/c15.jpeg": require("../../assets/images/nvt/full/suit/c15.webp"),
  "/images/suit/c17.jpeg": require("../../assets/images/nvt/full/suit/c17.webp"),
  "/images/suit/c2.jpeg": require("../../assets/images/nvt/full/suit/c2.webp"),
  "/images/suit/c26.jpeg": require("../../assets/images/nvt/full/suit/c26.webp"),
  "/images/suit/c3.jpeg": require("../../assets/images/nvt/full/suit/c3.webp"),
  "/images/suit/c4.jpeg": require("../../assets/images/nvt/full/suit/c4.webp"),
  "/images/suit/c5.jpeg": require("../../assets/images/nvt/full/suit/c5.webp"),
  "/images/suit/c6.jpeg": require("../../assets/images/nvt/full/suit/c6.webp"),
  "/images/suit/c8.jpeg": require("../../assets/images/nvt/full/suit/c8.webp"),
  "/images/suit/c9.jpeg": require("../../assets/images/nvt/full/suit/c9.webp"),
};

export const catalogueImage = (item: CatalogueItem): ImageSourcePropType =>
  fullMap[item.image] ?? catalogueThumb(item);

export const localizedName = (item: CatalogueItem, lang: string) =>
  lang === "ne" ? item.nameNe : lang === "hi" ? item.nameHi : item.nameEn;

export const localizedDesc = (item: CatalogueItem, lang: string) =>
  lang === "ne" ? item.descNe : lang === "hi" ? item.descHi : item.descEn;

export const localizedTags = (item: CatalogueItem, lang: string) =>
  lang === "ne" ? item.tagsNe : lang === "hi" ? item.tagsHi : item.tagsEn;

export const localizedFit = (item: CatalogueItem, lang: string) =>
  lang === "ne" ? item.fitNe : lang === "hi" ? item.fitHi : item.fitEn;

export const localizedFabric = (item: CatalogueItem, lang: string) =>
  lang === "ne" ? item.fabricNe : lang === "hi" ? item.fabricHi : item.fabricEn;

export const localizedColor = (item: CatalogueItem, lang: string) =>
  lang === "ne" ? item.colorNe : lang === "hi" ? item.colorHi : item.colorEn;

// Search across all three languages plus tags, matching the website behaviour.
export const searchCatalogue = (items: CatalogueItem[], query: string) => {
  const q = query.trim().toLowerCase();
  if (!q) return items;
  return items.filter((it) =>
    [
      it.id,
      it.nameEn,
      it.nameNe,
      it.nameHi,
      it.descEn,
      it.descNe,
      it.descHi,
      it.fitEn,
      it.fitNe,
      it.fitHi,
      it.fabricEn,
      it.fabricNe,
      it.fabricHi,
      it.colorEn,
      it.colorNe,
      it.colorHi,
      ...it.tagsEn,
      ...it.tagsNe,
      ...it.tagsHi,
    ]
      .join(" ")
      .toLowerCase()
      .includes(q)
  );
};

export const catalogueWhatsAppMessage = (item: CatalogueItem, name: string) =>
  `Hi New Vishal Tailors, I am interested in your custom catalogue design: ${name} (Design ID: ${item.id}). Could you please share more details about pricing and fabric options?`;
