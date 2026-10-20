import fs from "node:fs";
const assetFiles = [
  "media/mimo-original.png",
  "media/mimo-poses.png",
  "media/hospital-logo.png",
  "media/dr-md-taquedis-noori.png",
  "fonts/Inter.ttf",
];
const data = new Map(
  assetFiles.map((file) => [
    "/" + file,
    "data:" +
      (file.endsWith(".ttf") ? "font/ttf" : "image/png") +
      ";base64," +
      fs.readFileSync("public/" + file).toString("base64"),
  ]),
);
let css = fs.readFileSync(
  "dist/assets/" +
    fs.readdirSync("dist/assets").find((f) => f.endsWith(".css")),
  "utf8",
);
let js = fs.readFileSync("site-preview-bundle.js", "utf8");
let assignments = "window.__SITE_ASSETS__={};";
for (const [url, value] of data) {
  css = css.replaceAll(url, value);
  js = js.replaceAll(
    JSON.stringify(url),
    "window.__SITE_ASSETS__[" + JSON.stringify(url) + "]",
  );
  assignments +=
    "window.__SITE_ASSETS__[" +
    JSON.stringify(url) +
    "]=" +
    JSON.stringify(value) +
    ";";
}
const icon =
  "data:image/png;base64," +
  fs.readFileSync("public/favicon.png").toString("base64");
const escapeScript = (s) => s.replace(/<\/script/gi, "<\\/script");
const html =
  '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Glisan Akbari — Full website redesign</title><link rel="icon" href="' +
  icon +
  '"><style>' +
  css +
  '</style></head><body><div id="root"></div><script>' +
  escapeScript(assignments) +
  "</script><script>" +
  escapeScript(js) +
  "</script></body></html>";
fs.writeFileSync("website-preview.html", html);
console.log(
  "Full website preview: " +
    (Buffer.byteLength(html) / 1024 / 1024).toFixed(2) +
    " MB. All routes and artwork embedded.",
);
