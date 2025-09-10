// src/components/LoginPage.tsx

import React, { useEffect } from "react";
import {
  Login as LoginComponent,
  useAbcWaas,
  useLogin,
} from "abc-waas-prebuiltui-sdk";

export default function LoginPage() {
  const { loginInfo } = useLogin();

  useEffect(() => {
    if (loginInfo.loading) {
      console.log(loginInfo.loading);
    }
  }, [loginInfo.loading]);

  console.log(loginInfo.error);
  console.log(loginInfo.loading);

  return <LoginComponent />;
}
