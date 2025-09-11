// src/components/LoginPage.tsx

import React, { useEffect } from "react";
import {
  Login as LoginComponent,
  Logout as LogoutComponent,
  useLogin,
  useLogout,
} from "abc-waas-prebuiltui-sdk";

export default function LoginPage() {
  const { loginInfo } = useLogin();
  const { logoutInfo } = useLogout();

  useEffect(() => {
    console.log(loginInfo);
  }, [loginInfo]);

  useEffect(() => {
    console.log(logoutInfo);
  }, [logoutInfo]);

  return (
    <>
      <LoginComponent />
      <LogoutComponent />
    </>
  );
}
