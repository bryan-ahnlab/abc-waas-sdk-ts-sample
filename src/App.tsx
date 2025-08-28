//src/App.tsx

import React from "react";
import { BrowserRouter } from "react-router-dom";
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
  Login as LoginPage,
  type AbcWaasConfigType as AbcWaasPrebuiltUIConfigType,
  AbcWaasProvider as PrebuiltUIProvider,
} from "abc-waas-prebuiltui-sdk";

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
      <PrebuiltUIProvider config={AbcWaasPrebuiltUIConfig}>
        <LoginPage />
      </PrebuiltUIProvider>
      {/* ABC WaaS Prebuilt UI SDK */}
    </>
  );
}

export default App;
