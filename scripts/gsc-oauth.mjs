#!/usr/bin/env node
// One-time OAuth loopback flow for GSC (Desktop client). No npm deps.
// Prints an auth URL, catches the redirect on localhost, stores refresh token
// at ~/.config/bsc/gsc-token.json.
import { readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { createServer } from "node:http";

const CLIENT = `${homedir()}/.config/bsc/gsc-oauth-client.json`;
const OUT = `${homedir()}/.config/bsc/gsc-token.json`;
const SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";

const c = JSON.parse(readFileSync(CLIENT, "utf8")).installed;
const PORT = 53682;
const redirect = `http://localhost:${PORT}`;

const authUrl =
  "https://accounts.google.com/o/oauth2/v2/auth?" +
  new URLSearchParams({
    client_id: c.client_id,
    redirect_uri: redirect,
    response_type: "code",
    scope: SCOPE,
    access_type: "offline",
    prompt: "consent",
  }).toString();

console.log("AUTH_URL " + authUrl);

const server = createServer(async (req, res) => {
  const u = new URL(req.url, redirect);
  const code = u.searchParams.get("code");
  if (!code) { res.end("no code"); return; }
  const r = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: c.client_id,
      client_secret: c.client_secret,
      redirect_uri: redirect,
      grant_type: "authorization_code",
    }).toString(),
  });
  const tok = await r.json();
  if (tok.refresh_token) {
    writeFileSync(OUT, JSON.stringify({
      refresh_token: tok.refresh_token,
      client_id: c.client_id,
      client_secret: c.client_secret,
    }, null, 2));
    res.end("OK — refresh token saved. กลับไปที่ terminal ได้เลย");
    console.log("TOKEN_SAVED " + OUT);
  } else {
    res.end("error: " + JSON.stringify(tok));
    console.log("TOKEN_ERR " + JSON.stringify(tok));
  }
  setTimeout(() => server.close(() => process.exit(0)), 500);
});
server.listen(PORT, () => console.log("LISTENING " + PORT));
