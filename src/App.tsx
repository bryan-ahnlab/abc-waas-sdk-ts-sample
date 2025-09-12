//src/App.tsx

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  type AbcWaasConfigType as AbcWaasCoreConfigType,
  AbcWaasProvider as AbcWaasCoreProvider,
} from "abc-waas-core-sdk";
/* ABC WaaS */
import ABCWaaSLogin from "./components/abc-waas/single/Login";
import ABCWaaSRedirect from "./components/abc-waas/multiple/Redirect";
import ABCWaaSCallback from "./components/abc-waas/multiple/Callback";
/* OAuth2 */
import OAuth2Login from "./components/oauth2/single/Login";
import OAuth2Redirect from "./components/oauth2/multiple/Redirect";
import OAuth2Callback from "./components/oauth2/multiple/Callback";
/* SDK */
import SDKLogin from "./components/sdk/single/Login";
import SDKRedirect from "./components/sdk/multiple/Redirect";
import SDKCallback from "./components/sdk/multiple/Callback";
import Execute from "./components/sdk/common/Execute";

/* Common */
import Information from "./components/common/Information";

/* Pre-built UI */
import {
  type AbcWaasConfigType as AbcWaasPrebuiltUIConfigType,
  AbcWaasProvider as AbcWaasPrebuiltUIProvider,
} from "abc-waas-prebuiltui-sdk";

import LoginPage from "./components/LoginPage";
import LogoutPage from "./components/LogoutPage";

/* ABC WaaS */
const AbcWaasCoreConfig: AbcWaasCoreConfigType = {
  API_WAAS_MYABCWALLET_URL:
    process.env.REACT_APP_API_WAAS_MYABCWALLET_URI || "",
  MW_MYABCWALLET_URL: process.env.REACT_APP_MW_MYABCWALLET_URI || "",
  CLIENT_ID: process.env.REACT_APP_CLIENT_ID || "",
  CLIENT_SECRET: process.env.REACT_APP_CLIENT_SECRET || "",
};

const AbcWaasPrebuiltUIConfig: AbcWaasPrebuiltUIConfigType = {
  API_WAAS_MYABCWALLET_URL:
    process.env.REACT_APP_API_WAAS_MYABCWALLET_URI || "",
  MW_MYABCWALLET_URL: process.env.REACT_APP_MW_MYABCWALLET_URI || "",
  CLIENT_ID: process.env.REACT_APP_CLIENT_ID || "",
  CLIENT_SECRET: process.env.REACT_APP_CLIENT_SECRET || "",
};

function App() {
  return (
    <>
      {/* ABC WaaS SDK */}
      {/* <AbcWaasCoreProvider config={AbcWaasCoreConfig}>
        <BrowserRouter> */}
      {/* ABC WaaS */}
      {/* <ABCWaaSLogin /> */}
      {/* or */}
      {/* <ABCWaaSRedirect />
        <ABCWaaSCallback /> */}
      {/*  */}
      {/* Open Authorization 2.0 */}
      {/* <OAuth2Login /> */}
      {/* or */}
      {/* <OAuth2Redirect />
        <OAuth2Callback /> */}
      {/*  */}
      {/* SDK */}
      {/* <SDKLogin /> */}
      {/* <SDKRedirect />
          <SDKCallback />
          <Execute /> */}
      {/*  */}
      {/* Common */}
      {/* <Information /> */}
      {/*  */}
      {/* </BrowserRouter>
      </AbcWaasCoreProvider> */}
      {/* ABC WaaS SDK */}
      {/* ABC WaaS Prebuilt UI SDK */}
      <BrowserRouter>
        <AbcWaasPrebuiltUIProvider config={AbcWaasPrebuiltUIConfig}>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            {/* Google */}
            {/* http://localhost:3000/auth/signin?provider=google&state=ce44ed39-0a0d-4b6b-926b-4d8181fa0afd&code=4%2F0AVMBsJiQNKlDqJxxogbadtK2tYCSqzPrKvFr6hmq16Geq8JKlcI6J3-dJAf7rinnuS9BSg&scope=email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+openid&authuser=0&prompt=consent */}
            <Route path="/auth/signin" element={<LoginPage />} />
            {/* Apple */}
            {/* https://seemingly-useful-cobra.ngrok-free.app/#state=c76d29de-02f4-45bd-9233-4e31136a3262&code=c937cf643d69448d398f60ed0e8829a91.0.puux.-g2ecqLl6WeGpSsgxNJdZw&id_token=eyJraWQiOiJFNnE4M1JCMTVuIiwiYWxnIjoiUlMyNTYifQ.eyJpc3MiOiJodHRwczovL2FwcGxlaWQuYXBwbGUuY29tIiwiYXVkIjoiaW8ubXlhYmN3YWxsZXQuc2VydmljZXMiLCJleHAiOjE3NTc2Njc0NzIsImlhdCI6MTc1NzU4MTA3Miwic3ViIjoiMDAwNDQ3LmVlY2UxZGM5MjExNTQ0MGE4MmZmY2RhOWI0Zjk1N2Q1LjEwNDMiLCJjX2hhc2giOiJpbFJnNnI1aEtPc3lHVVFhdGR2YVpnIiwiZW1haWwiOiJhcHBsZS5weW91bmd3b29AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF1dGhfdGltZSI6MTc1NzU4MTA3Miwibm9uY2Vfc3VwcG9ydGVkIjp0cnVlfQ.e9WvZOeKMXvfB9rP8Tg_kLEdbtvMD5xOgLhfx2IP3SaTnI4b98RH6__TmY4hcZ5lXP-v46CkvMTFgeNvWcC6PvvWWfCDZH-2tL0XZs5K9ppNUV95nNHsixAQMREg-5TnQt7LhrJx0H7T2wZehW4LClwEWRXYkpFUttGOv6xKUc7W99Rf_GgV5vkiC_xbpMJ-xErZfVpPTgELNZeSrpRC7ToShyEFzX5x9iJ47yeGAxNWsPBhmWANdd6zqInYspi0uJSBjlYk5meeC8Xv9NxktJJep_rDkZh-y1u8vSnZoevPlvS9CxR5nfefxSukk2fK-l56Ul9PboU3s5VEwheZYA */}
            <Route path="/" element={<LoginPage />} />
            {/* NAVER */}
            {/* http://localhost:3000/?code=gR3K2K8rxRyndc6Kb8&state=70b9079c-ff50-432f-8c45-037c311e038b */}
            <Route path="/" element={<LoginPage />} />
            {/* Kakao */}
            {/* http://localhost:3000/auth/signin?provider=kakao&code=8GbQjdz69zcs52YEXl-VKm5kR5T0laWI5NmBI9eRj6ihclZPY2bgxAAAAAQKDRmQAAABmTgJCAwe0jm_MNo9Pw&state=d3645fc2-3edf-4ee0-8655-c347069a2bad */}
            <Route path="/auth/signin" element={<LoginPage />} />
            {/* LINE */}
            {/* http://localhost:3000/auth/signin?provider=line&code=Ypgqmh0ftCPuuZujpnWc&state=ca70eddd-72df-486d-8b25-b8c93af20ab4 */}
            <Route path="/auth/signin" element={<LoginPage />} />

            {/* Information */}
            <Route path="/logout" element={<LogoutPage />} />

            {/* 404 */}
            {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
          </Routes>
        </AbcWaasPrebuiltUIProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
