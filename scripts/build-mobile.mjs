#!/usr/bin/env node
/**
 * Capacitor static output copier.
 *
 * `npm run build:static` generates the TanStack/Nitro static site in
 * `.output/public`. Capacitor reads from `dist`, so this script only mirrors
 * `.output/public` into `dist` and never touches SSR/server bundles.
 */
import { cp, rm } from "node:fs/promises";
import { existsSync, statSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const staticDir = resolve(root, ".output/public");
const capacitorDir = resolve(root, "dist");
const indexFile = resolve(staticDir, "index.html");

function fail(message) {
  console.error(`\n✖ ${message}`);
  process.exit(1);
}

if (!existsSync(staticDir) || !statSync(staticDir).isDirectory()) {
  fail("Static build output not found: .output/public. Run `npm run build:static` first.");
}

if (!existsSync(indexFile) || !statSync(indexFile).isFile()) {
  fail("Static index.html not found: .output/public/index.html.");
}

console.log("\n▶ Copying static web assets: .output/public → dist");
await rm(capacitorDir, { recursive: true, force: true });
await cp(staticDir, capacitorDir, { recursive: true });

console.log("✅ Capacitor web assets ready in dist");
