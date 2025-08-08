// src/components/oauth2/utilities/kakao.ts

import { createRemoteJWKSet, jwtVerify } from "jose";

export const getKakaoToken = async (
  code: string,
  clientId: string,
  redirectUri: string
) => {
  try {
    const payload = new URLSearchParams({
      code,
      client_id: clientId,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    });

    const response = await fetch("https://kauth.kakao.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: payload.toString(),
    });

    const data = await response.json();

    if (!data?.id_token) {
      throw new Error("Failed to receive id_token from Kakao.");
    }

    if (!data?.access_token) {
      throw new Error("Failed to receive access_token from Kakao.");
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const verifyKakaoToken = async (idToken: string, restApiKey: string) => {
  try {
    const KAKAO_ISS = "https://kauth.kakao.com";
    const KAKAO_JWKS_URL = `${KAKAO_ISS}/.well-known/jwks.json`;

    const kakaoJwks = createRemoteJWKSet(new URL(KAKAO_JWKS_URL));

    const { payload: data } = await jwtVerify(idToken, kakaoJwks, {
      issuer: KAKAO_ISS,
      audience: restApiKey,
    });

    const currentTimeInSeconds = Math.floor(Date.now() / 1000);

    if (!data?.email) {
      throw new Error("Failed to receive email from Kakao.");
    }

    if (!data?.iss || data?.iss !== KAKAO_ISS) {
      throw new Error("Invalid issuer from Kakao.");
    }

    if (!data?.aud || data?.aud !== restApiKey) {
      throw new Error("Invalid audience from Kakao.");
    }

    if (!data?.exp || currentTimeInSeconds >= data?.exp) {
      throw new Error("id_token is expired from Kakao.");
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getKakaoTokeninfo = async (accessToken: string) => {
  try {
    const response = await fetch("https://kapi.kakao.com/v2/user/me", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    if (!data?.kakao_account?.email) {
      throw new Error("Failed to receive email from Kakao.");
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
