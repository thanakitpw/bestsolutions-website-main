#!/usr/bin/env node
// GSC Search Console API client — service-account JWT, no npm deps.
// Usage:
//   node scripts/gsc.mjs sites
//   node scripts/gsc.mjs query <siteUrl> <startDate> <endDate> [dimensions]
// Key path: env GSC_SA_KEY or ~/.config/bsc/gsc-sa.json
import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import { createSign } from "node:crypto";

const TOKEN_FILE = `${homedir()}/.config/bsc/gsc-token.json`;
const KEY = process.env.GSC_SA_KEY || `${homedir()}/.config/bsc/gsc-sa.json`;

function readJson(p) { try { return JSON.parse(readFileSync(p, "utf8")); } catch { return null; } }
const oauth = readJson(TOKEN_FILE);

function b64url(buf) {
  return Buffer.from(buf).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

async function token() {
  if (oauth?.refresh_token) {
    const res = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: oauth.client_id,
        client_secret: oauth.client_secret,
        refresh_token: oauth.refresh_token,
        grant_type: "refresh_token",
      }).toString(),
    });
    const j = await res.json();
    if (!j.access_token) throw new Error("oauth refresh: " + JSON.stringify(j));
    return j.access_token;
  }
  const sa = JSON.parse(readFileSync(KEY, "utf8"));
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = b64url(JSON.stringify({
    iss: sa.client_email,
    scope: "https://www.googleapis.com/auth/webmasters.readonly",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  }));
  const signer = createSign("RSA-SHA256");
  signer.update(`${header}.${claim}`);
  const sig = b64url(signer.sign(sa.private_key));
  const jwt = `${header}.${claim}.${sig}`;
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });
  const j = await res.json();
  if (!j.access_token) throw new Error("token: " + JSON.stringify(j));
  return j.access_token;
}

async function main() {
  const [cmd, ...args] = process.argv.slice(2);
  const t = await token();
  const h = { Authorization: `Bearer ${t}`, "Content-Type": "application/json" };

  if (cmd === "sites") {
    const r = await fetch("https://www.googleapis.com/webmasters/v3/sites", { headers: h });
    console.log(JSON.stringify(await r.json(), null, 2));
    return;
  }
  if (cmd === "query") {
    const [siteUrl, startDate, endDate, dims = ""] = args;
    const body = {
      startDate, endDate,
      dimensions: dims ? dims.split(",") : ["query"],
      rowLimit: 100,
    };
    const r = await fetch(
      `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
      { method: "POST", headers: h, body: JSON.stringify(body) },
    );
    console.log(JSON.stringify(await r.json(), null, 2));
    return;
  }
  console.log("usage: gsc.mjs sites | gsc.mjs query <siteUrl> <start> <end> [dims]");
}

main().catch((e) => { console.error(e.message); process.exit(1); });
