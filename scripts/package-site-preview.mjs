import fs from "node:fs";
const assetFiles = [
  ...fs.readdirSync("public/media/care-spaces").filter(file => file.endsWith(".webp") && (!/-(480|800)\.webp$/.test(file) || file === "dr-noori-800.webp")).map(file => "media/care-spaces/" + file),
  "media/mimo-original.png",
  "media/mimo-poses.png",
  "media/memo/memo-poses.webp",
  "media/hospital-logo.png",
  "media/dr-md-taquedis-noori.png",
  "fonts/Inter.ttf",
  ...fs.readdirSync("public/media/urology").filter((file) => file.endsWith(".svg")).map((file) => "media/urology/" + file),
  ...fs.readdirSync("public/media/neurology").filter((file) => file.endsWith(".svg")).map((file) => "media/neurology/" + file),
  ...fs.readdirSync("public/media/service-heroes").filter((file) => file.endsWith(".webp") && !/-(480|800)\.webp$/.test(file)).map((file) => "media/service-heroes/" + file),
];
const data = new Map(
  assetFiles.map((file) => [
    "/" + file,
    "data:" +
      (file.endsWith(".ttf") ? "font/ttf" : file.endsWith(".svg") ? "image/svg+xml" : file.endsWith(".webp") ? "image/webp" : "image/png") +
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
// Keep videos outside the HTML so the Finder preview streams only the selected
// service, just like the deployed site. Resolve these paths next to this file.
for (const folder of ["services", "departments", "explore-care"]) {
  for (const file of fs.readdirSync("public/media/" + folder)) {
    js = js.replaceAll(
      JSON.stringify("/media/" + folder + "/" + file),
      JSON.stringify("./public/media/" + folder + "/" + file),
    );
  }
}
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
// A focused review can open a page directly, while retaining navigation and media.
// Usage after preview bundling: node scripts/package-site-preview.mjs /services/example
const startPage = process.argv[2];
if (startPage) {
  if (!/^\/services\/[a-z0-9-]+$/.test(startPage)) throw new Error("Expected a static service path.");
  const bootstrap = '<script>const previewUrl=new URL(window.location.href);if(!previewUrl.searchParams.has("page")){previewUrl.searchParams.set("page",' + JSON.stringify(startPage) + ');window.history.replaceState(null,"",previewUrl);}</script>';
  fs.writeFileSync("kidney-stone-preview.html", html.replace('<script>', bootstrap + '<script>'));
  console.log("Focused service preview: kidney-stone-preview.html → " + startPage);
}
console.log(
  "Full website preview: " +
    (Buffer.byteLength(html) / 1024 / 1024).toFixed(2) +
    " MB. All routes and artwork embedded.",
);
