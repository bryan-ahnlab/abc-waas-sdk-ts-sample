"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  AbcWaasProvider: () => AbcWaasProvider,
  useAbcWaas: () => useAbcWaas,
  useSnsLogin: () => useSnsLogin
});
module.exports = __toCommonJS(index_exports);

// src/context/AbcWaasProvider.tsx
var import_react2 = require("react");

// src/context/AbcWaasContext.ts
var import_react = require("react");
var AbcWaasContext = (0, import_react.createContext)(null);

// src/context/AbcWaasProvider.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var AbcWaasProvider = ({ config, children }) => {
  const [basicToken, setBasicToken] = (0, import_react2.useState)(null);
  const [email, setEmail] = (0, import_react2.useState)(null);
  const [token, setToken] = (0, import_react2.useState)(null);
  const [service, setService] = (0, import_react2.useState)(null);
  const [abcAuth, setAbcAuth] = (0, import_react2.useState)(null);
  const [abcWallet, setAbcWallet] = (0, import_react2.useState)(null);
  const [abcUser, setAbcUser] = (0, import_react2.useState)(null);
  const [secureChannel, setSecureChannel] = (0, import_react2.useState)(null);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    AbcWaasContext.Provider,
    {
      value: {
        config,
        basicToken,
        setBasicToken,
        email,
        setEmail,
        token,
        setToken,
        service,
        setService,
        abcAuth,
        setAbcAuth,
        abcWallet,
        setAbcWallet,
        abcUser,
        setAbcUser,
        secureChannel,
        setSecureChannel
      },
      children
    }
  );
};

// src/hooks/useAbcWaas.ts
var import_react3 = require("react");
function useAbcWaas() {
  const context = (0, import_react3.useContext)(AbcWaasContext);
  if (!context) {
    throw new Error("Must be used inside AbcWaasProvider");
  }
  return context;
}

// src/hooks/useSnsLogin.ts
var import_react4 = require("react");

// src/api/secureChannel.ts
var import_p256 = require("@noble/curves/p256");
var import_utils = require("@noble/hashes/utils");
var import_crypto_js = __toESM(require("crypto-js"));
var import_qs = __toESM(require("qs"));
var import_memory_cache = __toESM(require("memory-cache"));

// src/utilities/common.ts
async function safeParseJson(res, label = "API Error") {
  const text = await res.text();
  try {
    const data = JSON.parse(text);
    if (!res.ok) {
      throw new Error(`[${label}] ${JSON.stringify(data, null, 2)}`);
    }
    return data;
  } catch (err) {
    throw new Error(`[${label}] ${text}`);
  }
}

// src/api/secureChannel.ts
var AES_KEY_LENGTH = 32;
async function createSecureChannel(config) {
  try {
    const keyPair = createKeypair();
    const message = "Bryan";
    const formData = import_qs.default.stringify({
      pubkey: (0, import_utils.bytesToHex)(keyPair.publicKey),
      plain: message
    });
    const response = await fetch(
      `${config.API_WAAS_MYABCWALLET_URL}/secure/channel/create`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData
      }
    );
    if (!response.ok)
      throw new Error(`Failed to create secure channel: ${response.status}`);
    const responseData = await safeParseJson(response, "createSecureChannel");
    const serverPubkey = (0, import_utils.hexToBytes)(responseData.publickey);
    const shared = import_p256.p256.getSharedSecret(keyPair.privateKey, serverPubkey);
    const sharedX = shared.slice(1, 33);
    const secretKey = (0, import_utils.bytesToHex)(sharedX).padStart(64, "0");
    const result = {
      ChannelID: responseData.channelid,
      Encrypted: responseData.encrypted,
      ServerPublicKey: responseData.publickey,
      Message: message,
      PrivateKey: (0, import_utils.bytesToHex)(keyPair.privateKey),
      SecretKey: secretKey
    };
    import_memory_cache.default.put(
      "secureChannel",
      { data: responseData, keyPair, secretKey },
      20 * 60 * 1e3
    );
    sessionStorage.setItem("secureChannel", JSON.stringify(result));
    return result;
  } catch (error) {
    console.error("Create Secure Channel Error: ", error);
    throw error;
  }
}
function createKeypair() {
  const privateKey = import_p256.p256.utils.randomPrivateKey();
  const publicKey = import_p256.p256.getPublicKey(privateKey, false);
  return { privateKey, publicKey };
}
var randomPassword = () => {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }
  return password;
};
var encryptedPassword = (secret) => {
  const key = import_crypto_js.default.enc.Hex.parse(secret.substring(0, 32)).toString(import_crypto_js.default.enc.Hex).substring(0, 32);
  const iv = import_crypto_js.default.enc.Hex.parse(secret.substring(AES_KEY_LENGTH));
  const encrypted = import_crypto_js.default.AES.encrypt(
    randomPassword(),
    import_crypto_js.default.enc.Hex.parse(key),
    {
      iv,
      mode: import_crypto_js.default.mode.CBC,
      padding: import_crypto_js.default.pad.Pkcs7
    }
  );
  return encrypted.ciphertext.toString(import_crypto_js.default.enc.Base64);
};

// src/api/v2/auth.ts
async function postTokenLoginV2(config, basicToken, token, service) {
  return fetch(
    `${config.API_WAAS_MYABCWALLET_URL}/auth/auth-service/v2/token/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${basicToken}`
      },
      body: new URLSearchParams({
        token,
        service,
        audience: config.MW_MYABCWALLET_URL
      })
    }
  );
}

// src/api/v2/member.ts
async function postMemberJoinV2(config, basicToken, username, code, socialtype, overage = "1", agree = "1", collect = "1", thirdparty = "1", advertise = "1") {
  return fetch(
    `${config.API_WAAS_MYABCWALLET_URL}/member/user-management/v2/join`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${basicToken}`
      },
      body: new URLSearchParams({
        username,
        code,
        serviceid: config.MW_MYABCWALLET_URL,
        socialtype,
        overage,
        agree,
        collect,
        thirdparty,
        advertise
      })
    }
  );
}

// src/api/v2/wallet.ts
async function getMpcWalletsInfoV2(config, accessToken) {
  return fetch(`${config.API_WAAS_MYABCWALLET_URL}/wapi/v2/mpc/wallets/info`, {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${accessToken}`
    }
  });
}
async function postMpcWalletsV2(config, accessToken, email, channelid, devicePassword) {
  return fetch(`${config.API_WAAS_MYABCWALLET_URL}/wapi/v2/mpc/wallets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${accessToken}`,
      "Secure-Channel": channelid
    },
    body: new URLSearchParams({
      email,
      devicePassword
    })
  });
}

// src/hooks/useSnsLogin.ts
function useSnsLogin() {
  const {
    config,
    basicToken,
    email,
    token,
    service,
    abcAuth,
    abcWallet,
    abcUser,
    secureChannel,
    setEmail,
    setToken,
    setService,
    setBasicToken,
    setAbcAuth,
    setAbcWallet,
    setAbcUser,
    setSecureChannel
  } = useAbcWaas();
  const [loading, setLoading] = (0, import_react4.useState)(false);
  const [error, setError] = (0, import_react4.useState)(null);
  const snsLoginV2 = (0, import_react4.useCallback)(
    async (email2, token2, service2) => {
      try {
        setLoading(true);
        setError(null);
        setEmail(email2);
        setToken(token2);
        setService(service2);
        const secureChannel2 = await createSecureChannel(config);
        setSecureChannel(secureChannel2);
        const basicToken2 = btoa(`${config.CLIENT_ID}:${config.CLIENT_SECRET}`);
        setBasicToken(basicToken2);
        const tryLogin = await postTokenLoginV2(
          config,
          basicToken2,
          token2,
          service2
        );
        const tryLoginData = await tryLogin.json();
        let accessToken = null;
        if (tryLogin.ok) {
          accessToken = tryLoginData.access_token;
          setAbcAuth(tryLoginData);
          sessionStorage.setItem("abcAuth", JSON.stringify(tryLoginData));
        }
        if (tryLogin.status === 422 && tryLoginData.code === 618) {
          const {
            email: email3,
            sixcode,
            token: newToken
          } = JSON.parse(tryLoginData.msg);
          const joinRes = await postMemberJoinV2(
            config,
            basicToken2,
            email3,
            sixcode,
            service2
          );
          if (!(joinRes == null ? void 0 : joinRes.ok)) {
            throw new Error(JSON.stringify(joinRes));
          }
          const retryLogin = await postTokenLoginV2(
            config,
            basicToken2,
            newToken,
            service2
          );
          const retryLoginData = await safeParseJson(
            retryLogin,
            "postTokenLoginV2"
          );
          if (!retryLogin.ok) {
            throw new Error(JSON.stringify(retryLoginData));
          }
          accessToken = retryLoginData.access_token;
          setAbcAuth(retryLoginData);
          sessionStorage.setItem("abcAuth", JSON.stringify(retryLoginData));
        }
        const channelid = secureChannel2.ChannelID;
        const secretKey = secureChannel2.SecretKey;
        const devicePassword = encryptedPassword(secretKey);
        const createMpcWallets = await postMpcWalletsV2(
          config,
          accessToken,
          email2,
          channelid,
          devicePassword
        );
        const createMpcWalletsData = await safeParseJson(
          createMpcWallets,
          "postMpcWalletsV2"
        );
        if (!createMpcWallets.ok) {
          throw new Error(JSON.stringify(createMpcWalletsData));
        }
        if (createMpcWalletsData.message === "The token was expected to have 3 parts, but got 1.") {
          throw new Error(JSON.stringify(createMpcWalletsData));
        }
        setAbcWallet(createMpcWalletsData);
        sessionStorage.setItem(
          "abcWallet",
          JSON.stringify(createMpcWalletsData)
        );
        const mpcWalletsInfo = await getMpcWalletsInfoV2(config, accessToken);
        const mpcWalletsInfoData = await safeParseJson(
          mpcWalletsInfo,
          "getMpcWalletsInfoV2"
        );
        if (!mpcWalletsInfo.ok) {
          throw new Error(JSON.stringify(mpcWalletsInfoData));
        }
        if (mpcWalletsInfoData.message === "The token was expected to have 3 parts, but got 1.") {
          throw new Error(JSON.stringify(mpcWalletsInfoData));
        }
        if (mpcWalletsInfoData.message === "MPC KeyShare Recover Error") {
          throw new Error(JSON.stringify(mpcWalletsInfoData));
        }
        if (mpcWalletsInfoData.message === "KeyShare generate failed.") {
          throw new Error(JSON.stringify(mpcWalletsInfoData));
        }
        setAbcUser(mpcWalletsInfoData);
        sessionStorage.setItem("abcUser", JSON.stringify(mpcWalletsInfoData));
        return;
      } catch (error2) {
        setError(error2);
        throw error2;
      } finally {
        setLoading(false);
      }
    },
    [config]
  );
  return {
    basicToken,
    email,
    token,
    service,
    abcAuth,
    abcWallet,
    abcUser,
    secureChannel,
    snsLoginV2,
    loading,
    setLoading,
    error,
    setError
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AbcWaasProvider,
  useAbcWaas,
  useSnsLogin
});
