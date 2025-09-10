// src/components/sdk/multiple/Callback.tsx

import { useCallback, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLogin } from "abc-waas-core-sdk";
import { SignJWT } from "jose";
import { verifyAppleToken, getAppleToken } from "../../oauth2/utilities/apple";
import {
  getGoogleToken,
  getGoogleTokeninfo,
} from "../../oauth2/utilities/google";
import {
  getKakaoToken,
  verifyKakaoToken,
  getKakaoTokeninfo,
} from "../../oauth2/utilities/kakao";
import { getLineToken, getLineTokeninfo } from "../../oauth2/utilities/line";
import { getNaverToken, getNaverTokeninfo } from "../../oauth2/utilities/naver";

const RETURN_URL = "/";

const containerStyle = {
  margin: "40px",
  padding: "20px",
  borderRadius: "12px",
  border: "1px solid #dadce0",
  color: "#333",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
  whiteSpace: "pre-wrap",
  wordBreak: "break-all",
} as const;

const titleContainerStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
} as const;

const contentContainerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
} as const;

const statusBaseStyle = {
  backgroundColor: "#ffffff",
  color: "#000000",
  border: "1px solid #dadce0",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "12px 16px",
  fontSize: "16px",
  fontWeight: "bold",
  borderRadius: "8px",
  marginBottom: "12px",
  transition: "all 0.2s ease-in-out",
  wordBreak: "break-all",
  minHeight: "24px",
  lineHeight: "1.6",
  width: "100%",
  boxSizing: "border-box",
} as const;

export default function Callback() {
  const navigate = useNavigate();
  const location = useLocation();

  const { loginInfo } = useLogin();

  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCallback = useCallback(
    async (provider: string, data: any) => {
      try {
        setLoading(true);
        setError(null);

        if (provider === "google") {
          if (
            !process.env.REACT_APP_GOOGLE_CLIENT_ID ||
            !process.env.REACT_APP_GOOGLE_CLIENT_SECRET ||
            !process.env.REACT_APP_GOOGLE_REDIRECT_URI
          ) {
            throw new Error(
              "Google client ID, client secret or redirect URI is not set."
            );
          }

          const { code } = data;

          const getGoogleTokenData = await getGoogleToken(
            code,
            process.env.REACT_APP_GOOGLE_CLIENT_ID,
            process.env.REACT_APP_GOOGLE_CLIENT_SECRET,
            process.env.REACT_APP_GOOGLE_REDIRECT_URI
          );

          const getGoogleTokeninfoData = await getGoogleTokeninfo(
            getGoogleTokenData.id_token
          );

          navigate(
            `${RETURN_URL}?email=${getGoogleTokeninfoData.email}&id_token=${getGoogleTokenData.id_token}&provider=${provider}`
          );
        } else if (provider === "apple") {
          if (
            !process.env.REACT_APP_APPLE_CLIENT_ID ||
            !process.env.REACT_APP_APPLE_REDIRECT_URI ||
            !process.env.REACT_APP_APPLE_TEAM_ID ||
            !process.env.REACT_APP_APPLE_KEY_ID ||
            !process.env.REACT_APP_APPLE_PRIVATE_KEY
          ) {
            throw new Error(
              "Apple client ID, redirect URI, team ID, key ID or private key is not set."
            );
          }

          const { code, id_token } = data;

          await verifyAppleToken(
            id_token,
            process.env.REACT_APP_APPLE_CLIENT_ID
          );

          const APPLE_CLIENT_SECRET = await createAppleClientSecret(
            id_token,
            process.env.REACT_APP_APPLE_PRIVATE_KEY,
            process.env.REACT_APP_APPLE_TEAM_ID,
            process.env.REACT_APP_APPLE_KEY_ID
          );

          const getAppleTokenData = await getAppleToken(
            code,
            process.env.REACT_APP_APPLE_CLIENT_ID,
            APPLE_CLIENT_SECRET,
            process.env.REACT_APP_APPLE_REDIRECT_URI
          );

          const getAppleDecodedTokenData = JSON.parse(
            atob(getAppleTokenData?.id_token?.split(".")[1])
          );

          await verifyAppleToken(
            id_token,
            process.env.REACT_APP_APPLE_CLIENT_ID
          );

          navigate(
            `${RETURN_URL}?email=${getAppleDecodedTokenData.email}&id_token=${getAppleTokenData.id_token}&provider=${provider}`
          );
        } else if (provider === "naver") {
          if (
            !process.env.REACT_APP_NAVER_CLIENT_ID ||
            !process.env.REACT_APP_NAVER_CLIENT_SECRET ||
            !process.env.REACT_APP_NAVER_REDIRECT_URI
          ) {
            throw new Error(
              "Naver client ID, client secret or redirect URI is not set."
            );
          }

          const { code } = data;

          const getNaverTokenData = await getNaverToken(
            code,
            process.env.REACT_APP_NAVER_CLIENT_ID,
            process.env.REACT_APP_NAVER_CLIENT_SECRET,
            process.env.REACT_APP_NAVER_REDIRECT_URI
          );

          const getNaverTokeninfoData = await getNaverTokeninfo(
            getNaverTokenData.access_token
          );

          navigate(
            `${RETURN_URL}?email=${getNaverTokeninfoData.response.email}&id_token=${getNaverTokenData.access_token}&provider=${provider}`
          );
        } else if (provider === "kakao") {
          if (
            !process.env.REACT_APP_KAKAO_REST_API_KEY ||
            !process.env.REACT_APP_KAKAO_REDIRECT_URI
          ) {
            throw new Error("Kakao client ID or redirect URI is not set.");
          }

          const { code } = data;

          const getKakaoTokenData = await getKakaoToken(
            code,
            process.env.REACT_APP_KAKAO_REST_API_KEY,
            process.env.REACT_APP_KAKAO_REDIRECT_URI
          );

          await verifyKakaoToken(
            getKakaoTokenData.id_token,
            process.env.REACT_APP_KAKAO_REST_API_KEY
          );

          const getKakaoTokeninfoData = await getKakaoTokeninfo(
            getKakaoTokenData.access_token
          );

          navigate(
            `${RETURN_URL}?email=${getKakaoTokeninfoData.kakao_account.email}&id_token=${getKakaoTokenData.id_token}&provider=${provider}`
          );
        } else if (provider === "line") {
          if (
            !process.env.REACT_APP_LINE_CLIENT_ID ||
            !process.env.REACT_APP_LINE_CLIENT_SECRET ||
            !process.env.REACT_APP_LINE_REDIRECT_URI
          ) {
            throw new Error(
              "Line client ID, client secret or redirect URI is not set."
            );
          }

          const { code } = data;

          const getLineTokenData = await getLineToken(
            code,
            process.env.REACT_APP_LINE_CLIENT_ID,
            process.env.REACT_APP_LINE_CLIENT_SECRET,
            process.env.REACT_APP_LINE_REDIRECT_URI
          );

          const getLineTokeninfoData = await getLineTokeninfo(
            getLineTokenData.id_token,
            process.env.REACT_APP_LINE_CLIENT_ID
          );

          navigate(
            `${RETURN_URL}?email=${getLineTokeninfoData.email}&id_token=${getLineTokenData.id_token}&provider=${provider}`
          );
        } else {
          throw new Error("Invalid provider.");
        }
      } catch (error: any) {
        if (loginInfo.error) {
          setError(loginInfo.error);
        }
        if (error) {
          setError(error);
        }
      } finally {
        setLoading(false);
      }
    },
    [loginInfo, navigate]
  );

  useEffect(() => {
    const provider = localStorage.getItem("provider");

    if (provider === "google") {
      const params = new URLSearchParams(location.search);

      const code = params.get("code");

      const returnedState = params.get("state");
      const storedState = localStorage.getItem("google_oauth_state");

      const data = {
        code,
      };

      if (code && returnedState === storedState) {
        handleCallback(provider, data);
      }
    } else if (provider === "apple") {
      const hashParams = new URLSearchParams(location.hash.slice(1));

      const code = hashParams.get("code");
      const id_token = hashParams.get("id_token");

      const returnedState = hashParams.get("state");
      const storedState = localStorage.getItem("apple_oauth_state");

      const data = {
        code,
        id_token,
      };

      if (code && returnedState === storedState) {
        handleCallback(provider, data);
      }
    } else if (provider === "naver") {
      const params = new URLSearchParams(location.search);

      const code = params.get("code");

      const returnedState = params.get("state");
      const storedState = localStorage.getItem("naver_oauth_state");

      const data = {
        code,
      };

      if (code && returnedState === storedState) {
        handleCallback(provider, data);
      }
    } else if (provider === "kakao") {
      const params = new URLSearchParams(location.search);

      const code = params.get("code");

      const returnedState = params.get("state");
      const storedState = localStorage.getItem("kakao_oauth_state");

      const data = {
        code,
      };

      if (code && returnedState === storedState) {
        handleCallback(provider, data);
      }
    } else if (provider === "line") {
      const params = new URLSearchParams(location.search);

      const code = params.get("code");

      const returnedState = params.get("state");
      const storedState = localStorage.getItem("line_oauth_state");

      const data = {
        code,
      };

      if (code && returnedState === storedState) {
        handleCallback(provider, data);
      }
    }
  }, [handleCallback, location.search, location.hash]);

  async function createAppleClientSecret(
    idToken: string,
    privateKeyPem: string,
    teamId: string,
    keyId: string
  ): Promise<string> {
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

      const base64Key = privateKeyPem
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
  }

  return (
    <div style={containerStyle}>
      <div style={titleContainerStyle}>
        <h2 style={{ textAlign: "center", marginBottom: "24px" }}>
          SDK Callback
        </h2>
      </div>

      <div style={contentContainerStyle}>
        {(loading || error?.message) && (
          <div style={statusBaseStyle}>
            {loading && <span>Loading...</span>}
            {error?.message && (
              <span
                style={{
                  color: "red",
                  textAlign: "center",
                  display: "block",
                  width: "100%",
                }}
              >
                {error.message}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
