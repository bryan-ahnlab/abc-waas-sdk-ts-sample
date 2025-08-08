// src/components/Information.tsx

import React from "react";
import { useAbcWaas } from "abc-waas-sdk";

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

const InformationBaseStyle = {
  margin: "0",
  backgroundColor: "#f7f7f7",
  padding: "16px",
  borderRadius: "8px",
  fontSize: "13px",
  lineHeight: "1.6",
  border: "1px solid #eee",
  whiteSpace: "pre-wrap",
  wordBreak: "break-all",
} as const;

export default function Information() {
  const {
    basicToken,
    email,
    token,
    service,
    abcAuth,
    abcWallet,
    abcUser,
    secureChannel,
  } = useAbcWaas();

  const data = {
    basicToken,
    email,
    token,
    service,
    abcAuth,
    abcUser,
    abcWallet,
    secureChannel,
  };

  return (
    <>
      {email && (
        <div style={containerStyle}>
          <h2 style={{ textAlign: "center", marginBottom: "24px" }}>
            ABC WaaS Information
          </h2>

          <pre style={InformationBaseStyle}>
            <code>{JSON.stringify(data, null, 2)}</code>
          </pre>
        </div>
      )}
    </>
  );
}
