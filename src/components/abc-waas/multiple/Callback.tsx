// src/components/abc-waas/multiple/Callback.tsx

import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useSnsLogin } from "abc-waas-sdk";

import LoadingAnimation from "../../../assets/animation/common/animation_loading.svg";

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

  const {
    snsLoginV2,
    loading: loadingSnsLogin,
    error: errorSnsLogin,
  } = useSnsLogin();

  const handleCallback = useCallback(
    async (email: string, idToken: string, service: string) => {
      try {
        await snsLoginV2(email, idToken, service);
        navigate(RETURN_URL);
      } catch (error) {
        console.error(error);
      }
    },
    [snsLoginV2, navigate]
  );

  useEffect(() => {
    const provider = localStorage.getItem("provider");

    if (
      provider &&
      ["google", "apple", "naver", "kakao", "line"].includes(provider)
    ) {
      const urlParams = new URLSearchParams(window.location.search);

      const email = urlParams.get("email");
      const idToken = urlParams.get("id_token");
      const service = urlParams.get("service");

      if (email && idToken && service) {
        handleCallback(email, idToken, service);
      }
    }
  }, [handleCallback]);

  return (
    <div style={containerStyle}>
      <div style={titleContainerStyle}>
        <h2 style={{ textAlign: "center", marginBottom: "24px" }}>
          ABC WaaS Callback
        </h2>
      </div>

      <div style={contentContainerStyle}>
        {(loadingSnsLogin || errorSnsLogin?.message) && (
          <div style={statusBaseStyle}>
            {loadingSnsLogin && (
              <img
                src={LoadingAnimation}
                alt="loading"
                style={{ width: "24px", height: "24px" }}
              />
            )}
            {errorSnsLogin?.message && (
              <span
                style={{
                  color: "red",
                  textAlign: "center",
                  display: "block",
                  width: "100%",
                }}
              >
                {errorSnsLogin.message}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
