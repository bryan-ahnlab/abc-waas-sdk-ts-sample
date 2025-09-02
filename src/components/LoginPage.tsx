// src/components/LoginPage.tsx

import React, { useEffect } from "react";
import {
  Login as LoginComponent,
  useAbcWaas,
  useLogin,
} from "abc-waas-prebuiltui-sdk";

export default function LoginPage() {
  const { loading, error } = useLogin();

  useEffect(() => {
    if (loading) {
      console.log(loading);
    }
  }, [loading]);

  console.log(error);
  console.log(loading);

  return <LoginComponent />;
}
