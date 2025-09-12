// src/components/Logout.tsx

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Logout as LogoutComponent,
  useLogout,
  useLogin,
} from "abc-waas-prebuiltui-sdk";
import Information from "./common/Information";

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

const logoutContainerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
} as const;

export default function LogoutPage() {
  const { logoutInfo } = useLogout();
  const { loginInfo, setLoginInfo } = useLogin();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      logoutInfo.status === "SUCCESS" &&
      (loginInfo.status === "IDLE" || loginInfo.status === "SUCCESS")
    ) {
      setLoginInfo({
        loading: false,
        error: null,
        status: "IDLE",
      });
      console.info("Success Logout, Redirect to LoginPage");
      navigate("/");
    }
  }, [logoutInfo, navigate, loginInfo, setLoginInfo]);

  return (
    <>
      <div style={containerStyle}>
        <div style={logoutContainerStyle}>
          <LogoutComponent />
        </div>
      </div>
      <Information />
    </>
  );
}
