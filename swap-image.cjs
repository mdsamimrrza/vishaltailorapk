const fs = require("fs");
function patch(file, opts) {
  let c = fs.readFileSync(file, "utf8");
  const rel = opts.rel;
  // remove RN Image from the react-native import list
  c = c.replace(/(\n\s*)Image,\n/, "$1");
  // add Img import after theme import (or first import block end)
  if (c.includes('from "' + rel + '/components/Img"') === false) {
    c = c.replace(/(import \{ AppRefreshControl \} from "[^\n]+"\n)/, "$1import { Img } from \"" + rel + "/components/Img\";\n");
    if (!c.includes("/components/Img\"")) {
      c = c.replace(/(import \{ useLanguage \} from "[^\n]+LanguageContext";\n)/, "$1import { Img } from \"" + rel + "/components/Img\";\n");
    }
  }
  // swap JSX usages: <Image  -> <Img  ; resizeMode="cover" -> drop (Img defaults cover)
  c = c.split("<Image").join("<Img");
  c = c.replace(/\s*resizeMode="cover"/g, "");
  c = c.replace(/\s*resizeMode="contain"/g, ' contentFit="contain"');
  fs.writeFileSync(file, c);
  console.log("patched", file);
}
["src/app/(tabs)/catalogue.tsx","src/app/(tabs)/services.tsx"].forEach(f=>patch(f,{rel:"../../components"}));
["src/app/catalogue-full.tsx","src/app/catalogue.tsx"].forEach(f=>{});
["src/app/(tabs)/about.tsx","src/app/(tabs)/contact.tsx"].forEach(f=>patch(f,{rel:"../../components"}));
