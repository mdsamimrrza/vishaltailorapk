import { Image } from "expo-image";
import React from "react";

// App-wide image component: expo-image gives display-size decoding, disk
// caching and a quick fade-in — much faster than RN's Image in lists.
export function Img(props: React.ComponentProps<typeof Image>) {
  return <Image transition={140} contentFit="cover" cachePolicy="disk" {...props} />;
}
