#!/usr/bin/env -S deno run --allow-write

const exportJWK = (key: CryptoKey) => crypto.subtle.exportKey("jwk", key);

// Generate JWT verification key
const jwtKey = await crypto.subtle.generateKey(
  {
    name: "HMAC",
    hash: { name: "SHA-512" },
  },
  true,
  ["sign", "verify"],
);

await Deno.mkdir("./keys", { recursive: true });

await Deno.writeTextFile(
  "./keys/jwt.json",
  JSON.stringify(await exportJWK(jwtKey), null, 2),
);
