// src/components/oauth2/utilities/apple.ts

import { createRemoteJWKSet, jwtVerify, SignJWT } from "jose";

export const getAppleToken = async (
  code: string,
  clientId: string,
  clientSecret: string,
  redirectUri: string
) => {
  try {
    const payload = new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    });

    /* https://appleid.apple.com/auth/token */
    const response = await fetch("/proxy/apple/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: payload.toString(),
    });

    const data = await response.json();

    if (!data?.id_token) {
      throw new Error("Failed to receive id_token from Apple.");
    }

    const decodedData = JSON.parse(atob(data?.id_token?.split(".")[1]));

    if (!decodedData?.email) {
      throw new Error("Failed to receive email from Apple.");
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const verifyAppleToken = async (idToken: string, clientId: string) => {
  try {
    const APPLE_ISS = "https://appleid.apple.com";
    const APPLE_JWKS_URL = "https://appleid.apple.com/auth/keys";

    const appleJwks = createRemoteJWKSet(new URL(APPLE_JWKS_URL));

    const { payload: data } = await jwtVerify(idToken, appleJwks, {
      issuer: APPLE_ISS,
      audience: clientId,
    });

    const currentTimeInSeconds = Math.floor(Date.now() / 1000);

    if (!data?.email) {
      throw new Error("Failed to receive email from Apple.");
    }

    if (!data?.iss || data?.iss !== APPLE_ISS) {
      throw new Error("Invalid issuer from Apple.");
    }

    if (!data?.aud || data?.aud !== clientId) {
      throw new Error("Invalid audience from Apple.");
    }

    if (!data?.exp || currentTimeInSeconds >= data?.exp) {
      throw new Error("id_token is expired from Apple.");
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createAppleClientSecret = async (
  idToken: string,
  privateKey: string,
  teamId: string,
  keyId: string
) => {
  try {
    const alg = "ES256" as const;

    const base64Payload = idToken.split(".")[1];
    const payloadString = atob(base64Payload);
    const payload = JSON.parse(payloadString);

    const audience = payload.aud;
    const issuer = payload.iss;

    if (!audience || !issuer) {
      throw new Error("Invalid id_token: missing aud or iss.");
    }

    const base64Key = privateKey
      .replace("-----BEGIN PRIVATE KEY-----", "")
      .replace("-----END PRIVATE KEY-----", "")
      .replace(/\s+/g, "");
    const rawKey = Uint8Array.from(atob(base64Key), (c) => c.charCodeAt(0));

    const cryptoKey = await crypto.subtle.importKey(
      "pkcs8",
      rawKey.buffer,
      { name: "ECDSA", namedCurve: "P-256" },
      false,
      ["sign"]
    );

    const jwt = await new SignJWT({})
      .setProtectedHeader({ alg, kid: keyId })
      .setIssuer(teamId)
      .setIssuedAt()
      .setExpirationTime("1h")
      .setAudience(issuer)
      .setSubject(audience)
      .sign(cryptoKey);

    return jwt;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
