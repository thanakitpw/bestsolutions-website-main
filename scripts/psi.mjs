#!/usr/bin/env node
// PageSpeed Insights baseline. No npm deps.
// Usage: node scripts/psi.mjs <url> [url2 ...]   (runs mobile + desktop)
// Key: env PSI_KEY or ~/.config/bsc/psi-key.txt
import { readFileSync } from "node:fs";
import { homedir } from "node:os";

const KEY = process.env.PSI_KEY || readFileSync(`${homedir()}/.config/bsc/psi-key.txt`, "utf8").trim();
const urls = process.argv.slice(2);
if (!urls.length) { console.log("usage: psi.mjs <url> ..."); process.exit(1); }

function pct(x) { return x == null ? "—" : Math.round(x * 100); }

async function run(url, strategy) {
  const api = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?" +
    new URLSearchParams({ url, strategy, key: KEY }).toString() +
    "&category=performance&category=seo&category=accessibility&category=best-practices";
  const r = await fetch(api);
  const j = await r.json();
  if (j.error) return `${strategy}: ERR ${j.error.message}`;
  const c = j.lighthouseResult.categories;
  const a = j.lighthouseResult.audits;
  const lcp = a["largest-contentful-paint"]?.displayValue ?? "—";
  const cls = a["cumulative-layout-shift"]?.displayValue ?? "—";
  const tbt = a["total-blocking-time"]?.displayValue ?? "—";
  const fcp = a["first-contentful-paint"]?.displayValue ?? "—";
  const crux = j.loadingExperience?.metrics?.INTERACTION_TO_NEXT_PAINT?.percentile;
  return `${strategy}: Perf ${pct(c.performance.score)} SEO ${pct(c.seo.score)} A11y ${pct(c.accessibility.score)} BP ${pct(c["best-practices"].score)} | LCP ${lcp} CLS ${cls} TBT ${tbt} FCP ${fcp}${crux != null ? ` | field-INP ${crux}ms` : ""}`;
}

for (const u of urls) {
  console.log("\n# " + u);
  for (const s of ["mobile", "desktop"]) {
    try { console.log("  " + await run(u, s)); }
    catch (e) { console.log(`  ${s}: ERR ${e.message}`); }
  }
}
