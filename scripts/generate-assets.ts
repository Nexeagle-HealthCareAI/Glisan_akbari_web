import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { HOSPITAL_NAME } from "../src/data/identity";
import { HOMEPAGE_SEO } from "../src/data/homepageSeo";
const publicDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../public",
);
async function main() {
  const logo = fs.readFileSync(path.join(publicDir, "media/hospital-logo.png"));
  const data = "data:image/png;base64," + logo.toString("base64");
  const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180"><rect width="180" height="180" rx="36" fill="#fffcf7"/><image href="${data}" x="-22" y="-22" width="224" height="224"/></svg>`;
  fs.writeFileSync(path.join(publicDir, "favicon.svg"), favicon);
  await sharp(Buffer.from(favicon))
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, "apple-touch-icon.png"));
  await sharp(Buffer.from(favicon))
    .resize(32, 32)
    .png()
    .toFile(path.join(publicDir, "favicon.png"));
  const share = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#fffcf7"/><rect x="820" width="380" height="630" fill="#e6efdf"/><circle cx="1070" cy="420" r="215" fill="#d4e1c8"/><image href="${data}" x="850" y="185" width="320" height="320"/><text x="65" y="100" font-family="sans-serif" font-size="20" fill="#68766f">GLISAN AKBARI · PURNIA</text><text x="65" y="246" font-family="sans-serif" font-size="72" fill="#173e35">Less worry.</text><text x="65" y="334" font-family="sans-serif" font-size="72" fill="#3d785e">More clarity.</text><path d="M67 355 Q300 339 503 352" stroke="#f3a278" stroke-width="13" fill="none" stroke-linecap="round"/><text x="65" y="445" font-family="sans-serif" font-size="29" fill="#173e35">Care that connects.</text><text x="65" y="547" font-family="sans-serif" font-size="21" fill="#68766f">${HOSPITAL_NAME}</text></svg>`;
  await sharp(Buffer.from(share))
    .png()
    .toFile(path.join(publicDir, "og-image.png"));
  fs.copyFileSync(path.join(publicDir, "og-image.png"), path.join(publicDir, "glisan-akbari-hospital-purnea.png"));
  fs.copyFileSync(path.join(publicDir, "og-image.png"), path.join(publicDir, HOMEPAGE_SEO.imagePath.replace(/^\//, '')));
  console.log(
    "[Assets] Supplied hospital logo applied to favicon, touch icon and social image.",
  );
}
main().catch((error) => {
  console.error(error);
  process.exit(1);
});
