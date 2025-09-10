// src/components/sdk/common/Execute.tsx

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { useLogin } from "abc-waas-core-sdk";

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
} as const;

const buttonBaseStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "12px 16px",
  fontSize: "16px",
  fontWeight: "bold",
  borderRadius: "8px",
  width: "100%",
  marginBottom: "12px",
  cursor: "pointer",
  transition: "all 0.2s ease-in-out",
  wordBreak: "break-all",
} as const;

export default function Execute() {
  const location = useLocation();

  const { loginV2, loginInfo } = useLogin();

  const [email, setEmail] = useState<string | null>(null);
  const [idToken, setIdToken] = useState<string | null>(null);
  const [provider, setProvider] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const email = params.get("email");
    const id_token = params.get("id_token");
    const provider = params.get("provider");

    setEmail(email);
    setIdToken(id_token);
    setProvider(provider);
  }, [location.search]);

  const handleLoginV2 = () => {
    if (email && idToken && provider) {
      loginV2(email, idToken, provider);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    marginBottom: "12px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "14px",
    fontFamily: "inherit",
    boxSizing: "border-box" as const,
  };

  return (
    <div style={containerStyle}>
      <div style={titleContainerStyle}>
        <h2 style={{ textAlign: "center", marginBottom: "24px" }}>SDK Login</h2>
      </div>

      <div style={contentContainerStyle}>
        <input
          type="text"
          placeholder="email"
          value={email ?? ""}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="id_token"
          value={idToken ?? ""}
          onChange={(e) => setIdToken(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="provider"
          value={provider ?? ""}
          onChange={(e) => setProvider(e.target.value)}
          style={inputStyle}
        />

        <button
          onClick={() => handleLoginV2()}
          disabled={loginInfo.loading}
          style={{
            ...buttonBaseStyle,
            backgroundColor: "#000000",
            color: "#ffffff",
            border: "1px solid #dadce0",
          }}
          onMouseEnter={(event) => {
            event.currentTarget.style.backgroundColor = "#f7f7f7";
            event.currentTarget.style.color = "#000000";
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.backgroundColor = "#000000";
            event.currentTarget.style.color = "#ffffff";
          }}
        >
          <>SNS Login V2</>
        </button>
      </div>
    </div>
  );
}
