// src/components/LoginPage.tsx

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Login as LoginComponent,
  useLogin,
  useLogout,
} from "abc-waas-prebuiltui-sdk";

export default function LoginPage() {
  const { loginInfo } = useLogin();
  const { logoutInfo, setLogoutInfo } = useLogout();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      loginInfo.status === "SUCCESS" &&
      (logoutInfo.status === "IDLE" || logoutInfo.status === "SUCCESS")
    ) {
      setLogoutInfo({
        loading: false,
        error: null,
        status: "IDLE",
      });
      console.info("Success Login, Redirect to LogoutPage");
      navigate("/logout");
    }
  }, [loginInfo, navigate, logoutInfo, setLogoutInfo]);

  return <LoginComponent />;
}
