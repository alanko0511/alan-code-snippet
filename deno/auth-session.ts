// Although there are so many Deno related stuff, I think it's easy to modify it to work with Node.js.
// The `crypto` module is from the Web Crypto API, so it's not available in Node.js.

export {
  decode as decodeBase64,
  encode as encodeBase64,
} from "https://deno.land/std@0.182.0/encoding/base64.ts";
export * as path from "https://deno.land/std@0.182.0/path/mod.ts";
export * as djwt from "https://deno.land/x/djwt@v2.8/mod.ts";

// Get Json Web Key file
const getJWK = async (filename: string) => {
  const file = await Deno.readTextFile(filename);
  const jwk = JSON.parse(file);

  return jwk;
};

type KeysType = {
  jwt: CryptoKey;
  session: CryptoKey;
};

const encryptSession = async (
  payload: Record<string, unknown>,
  keys: KeysType
) => {
  const jwt = await djwt.create(
    {
      alg: "HS512",
      typ: "JWT",
    },
    payload,
    keys.jwt
  );
  const iv = crypto.getRandomValues(new Uint8Array(16));

  const encoder = new TextEncoder();
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    keys.session,
    encoder.encode(jwt)
  );

  const encryptedBase64 = encodeBase64(encrypted);
  const ivBase64 = encodeBase64(iv);

  return `${encryptedBase64}&${ivBase64}`;
};

const decryptSession = async (session: string, keys: KeysType) => {
  const [encryptedBase64, ivBase64] = session.split("&");

  const encrypted = decodeBase64(encryptedBase64);
  const iv = decodeBase64(ivBase64);

  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    keys.session,
    encrypted
  );

  const decoder = new TextDecoder();
  const decoded = decoder.decode(decrypted);

  const payload = await djwt.verify(decoded, keys.jwt);

  return payload;
};

export interface SessionMiddlewareConfig {
  keyPaths: {
    jwt: string;
    session: string;
  };
  cookieName: string;
}

export async function sessionMiddleware(
  config: SessionMiddlewareConfig
): Promise<MiddlewareHandler> {
  const logger = getLogger();

  const JWT_KEY = await crypto.subtle.importKey(
    "jwk",
    await getJWK(config.keyPaths.jwt),
    {
      name: "HMAC",
      hash: { name: "SHA-512" },
    },
    true,
    ["sign", "verify"]
  );
  logger.debug("sessionMiddleware: JWT key imported");

  const SESSION_KEY = await crypto.subtle.importKey(
    "jwk",
    await getJWK(config.keyPaths.session),
    {
      name: "AES-GCM",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"]
  );
  logger.debug("sessionMiddleware: session key imported");

  const keys = {
    jwt: JWT_KEY,
    session: SESSION_KEY,
  };

  logger.debug("sessionMiddleware: loaded");

  // On request handler
  return async (c, next) => {
    const sessionCookie = c.req.cookie(config.cookieName);

    if (sessionCookie) {
      const sessionPayload = await decryptSession(sessionCookie, keys);
      c.set("session", sessionPayload);
    }

    await next();

    const newSessionPayload = c.get("session");
    if (newSessionPayload) {
      const newSession = await encryptSession(newSessionPayload, keys);
      c.cookie(config.cookieName, newSession);
    }
  };
}
