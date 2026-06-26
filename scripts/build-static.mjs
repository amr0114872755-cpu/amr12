#!/usr/bin/env node
/**
 * Runs the TanStack/Nitro static build used by Capacitor.
 *
 * The Lovable preview sandbox forces a server preset for hosted previews. For
 * the Android/npm build we intentionally run Vite outside that sandbox branch
 * so the explicit Nitro `static` preset in vite.config.ts writes `.output/public`.
 *
 * If the TanStack Start prerender step fails (missing dist/server/server.js),
 * this script recovers by generating index.html from the built client assets.
 */
import { spawnSync } from "node:child_process";
import { mkdirSync, writeFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();

// Pre-create dist/server/server.js so TanStack Start's preview-server-plugin
// can start during any prerender phase (it imports this path at startup).
const serverDir = resolve(root, "dist/server");
const serverFile = resolve(serverDir, "server.js");
mkdirSync(serverDir, { recursive: true });
writeFileSync(
  serverFile,
  `
import { readdirSync, existsSync } from "node:fs";
import { resolve } from "node:path";

function generateHtml() {
  const assetsDir = resolve(import.meta.dirname, "../../.output/public/assets");
  if (!existsSync(assetsDir)) return "";
  const assets = readdirSync(assetsDir);
  const cssFile = assets.find(f => f.startsWith("styles-") && f.endsWith(".css"));
  const jsFile = assets.find(f => f.startsWith("index-") && f.endsWith(".js"));
  if (!cssFile || !jsFile) return "";
  return \`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <meta name="theme-color" content="#065f46" />
  <link rel="stylesheet" href="/assets/\${cssFile}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=Tajawal:wght@200;300;400;500;700;800;900&display=swap" />
  <script>(function(){try{var t=localStorage.getItem('app:theme');if(t&&['default','firouz','layali','dhahab'].indexOf(t)>=0){document.documentElement.classList.add('theme-'+t);}var d=localStorage.getItem('app:display');if(d&&['glass','soft','minimal','elevated'].indexOf(d)>=0){document.documentElement.classList.add('display-'+d);}var a=localStorage.getItem('app:template');if(a&&['fajr','prayer-now'].indexOf(a)>=0){document.documentElement.classList.add('app-template-fajr');var n=localStorage.getItem('fajr:night');if(n==='1'){document.documentElement.classList.add('fajr-night');}}}catch(e){}})();</script>
</head>
<body class="font-cairo bg-[#030a06] text-white antialiased">
  <script type="module" src="/assets/\${jsFile}"></script>
</body>
</html>\`;
}

export default {
  fetch() {
    return new Response(generateHtml(), {
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  },
  async close() {},
};
`.trim(),
  "utf8"
);

const env = { ...process.env };
delete env.DEV_SERVER__PROJECT_PATH;
env.LOVABLE_SANDBOX = "0";

console.log("\n▶ Building static web bundle (.output/public)…");
const result = spawnSync("npx", ["vite", "build"], {
  stdio: "inherit",
  shell: process.platform === "win32",
  env,
});

// Check if client assets were produced even if the build exited non-zero
const assetsDir = resolve(root, ".output/public/assets");
if (!existsSync(assetsDir) || !statSync(assetsDir).isDirectory()) {
  console.error("\n✖ Build failed: no assets generated in .output/public/assets");
  process.exit(result.status ?? 1);
}

// If the prerender already produced a non-empty index.html, we're done
const indexPath = resolve(root, ".output/public/index.html");
if (existsSync(indexPath) && statSync(indexPath).size > 0) {
  console.log("✅ Static build complete (prerendered index.html).");
  process.exit(0);
}

// Prerender didn't produce index.html → generate it from the built assets
console.log("\n▶ Generating index.html from built assets…");
const assets = readdirSync(assetsDir);
const cssFile = assets.find((f) => f.startsWith("styles-") && f.endsWith(".css"));
const jsFile = assets.find((f) => f.startsWith("index-") && f.endsWith(".js"));

if (!cssFile || !jsFile) {
  console.error(`\n✖ Cannot locate entry assets (css: ${cssFile}, js: ${jsFile})`);
  process.exit(1);
}

const html = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <meta name="theme-color" content="#065f46" />
  <title>نور القرآن الكريم</title>
  <link rel="stylesheet" href="/assets/${cssFile}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=Tajawal:wght@200;300;400;500;700;800;900&display=swap" />
  <script>(function(){try{var t=localStorage.getItem('app:theme');if(t&&['default','firouz','layali','dhahab'].indexOf(t)>=0){document.documentElement.classList.add('theme-'+t);}var d=localStorage.getItem('app:display');if(d&&['glass','soft','minimal','elevated'].indexOf(d)>=0){document.documentElement.classList.add('display-'+d);}var a=localStorage.getItem('app:template');if(a&&['fajr','prayer-now'].indexOf(a)>=0){document.documentElement.classList.add('app-template-fajr');var n=localStorage.getItem('fajr:night');if(n==='1'){document.documentElement.classList.add('fajr-night');}}}catch(e){}})();</script>
</head>
<body class="font-cairo bg-[#030a06] text-white antialiased">
  <script type="module" src="/assets/${jsFile}"></script>
</body>
</html>`;

writeFileSync(indexPath, html, "utf8");
console.log(`✅ Generated index.html (css: ${cssFile}, js: ${jsFile})`);
process.exit(0);
