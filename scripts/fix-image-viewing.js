// react-native-image-viewing@0.2.2 ships only ImageItem.android.js / ImageItem.ios.js
// and no default ImageItem.js, so web bundling fails. This postinstall hook restores
// the missing default from the (platform-neutral) Android implementation.
// Run automatically via the "postinstall" npm lifecycle.
const fs = require("fs");
const path = require("path");

const dir = path.join(
  __dirname,
  "..",
  "node_modules",
  "react-native-image-viewing",
  "dist",
  "components",
  "ImageItem"
);

const pairs = [
  ["ImageItem.android.js", "ImageItem.js"],
  ["ImageItem.android.d.ts", "ImageItem.d.ts"],
];

for (const [src, dest] of pairs) {
  const srcPath = path.join(dir, src);
  const destPath = path.join(dir, dest);
  if (fs.existsSync(srcPath) && !fs.existsSync(destPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`[fix-image-viewing] restored ${dest}`);
  }
}
