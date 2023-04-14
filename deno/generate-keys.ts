#!/usr/bin/env -S deno run --allow-write

const exportJWK = (key: CryptoKey) => crypto.subtle.exportKey('jwk', key);

// Generate JWT verification key
const jwtKey = await crypto.subtle.generateKey(
  {
    name: 'HMAC',
    hash: { name: 'SHA-512' },
  },
  true,
  ['sign', 'verify']
);

await Deno.writeTextFile('./keys/jwt.json', JSON.stringify(await exportJWK(jwtKey), null, 2));

// Generate session key
const sessionKey = await crypto.subtle.generateKey(
  {
    name: 'AES-GCM',
    length: 256,
  },
  true,
  ['encrypt', 'decrypt']
);

await Deno.writeTextFile('./keys/session-key.json', JSON.stringify(await exportJWK(sessionKey), null, 2));
