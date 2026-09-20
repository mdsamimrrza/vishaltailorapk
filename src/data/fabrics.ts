import { ImageSourcePropType } from "react-native";

export interface Fabric {
  id: string;
  titleKey: string;
  descKey: string;
  image: ImageSourcePropType;
}

export const fabrics: Fabric[] = [
  {
    id: "suiting",
    titleKey: "fabric_silk_title",
    descKey: "fabric_silk_desc",
    image: require("../../assets/images/nvt/premium-suiting.webp") as ImageSourcePropType,
  },
  {
    id: "cotton",
    titleKey: "fabric_cotton_title",
    descKey: "fabric_cotton_desc",
    image: require("../../assets/images/nvt/shirting-cotton.webp") as ImageSourcePropType,
  },
  {
    id: "wool",
    titleKey: "fabric_wool_title",
    descKey: "fabric_wool_desc",
    image: require("../../assets/images/nvt/tools.webp") as ImageSourcePropType,
  },
];
