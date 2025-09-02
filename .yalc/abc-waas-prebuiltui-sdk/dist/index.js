'use strict';

var abcWaasCoreSdk = require('abc-waas-core-sdk');
var react = require('react');
var jose = require('jose');
var jsxRuntime = require('react/jsx-runtime');

var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));

// src/assets/icons/providers/icon_google.svg
var icon_google_default = 'data:image/svg+xml,<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">%0A<path d="M20.64 12.2062C20.64 11.5687 20.5837 10.9537 20.475 10.365H12V13.8487H16.845C16.6312 14.97 15.9937 15.9187 15.0375 16.5562V18.825H17.9587C19.6575 17.2537 20.64 14.9437 20.64 12.2062Z" fill="%234285F4"/>%0A<path d="M12.0001 20.9999C14.4301 20.9999 16.4663 20.1974 17.9551 18.8249L15.0338 16.5599C14.2313 17.0999 13.2076 17.4262 12.0001 17.4262C9.66011 17.4262 7.67261 15.8474 6.96011 13.7212H3.96387V16.0462C5.44511 18.9787 8.48261 20.9999 12.0001 20.9999Z" fill="%2334A853"/>%0A<path d="M6.95999 13.7101C6.77999 13.1701 6.67499 12.5963 6.67499 12.0001C6.67499 11.4038 6.77999 10.8301 6.95999 10.2901V7.96509H3.96375C3.3525 9.17634 3 10.5451 3 12.0001C3 13.4551 3.3525 14.8238 3.96375 16.0351L6.29624 14.2201C6.29624 14.2163 6.95999 13.7101 6.95999 13.7101Z" fill="%23FBBC05"/>%0A<path d="M12.0001 6.58499C13.3238 6.58499 14.5051 7.04249 15.4463 7.92749L18.0226 5.35125C16.4588 3.8925 14.4301 3 12.0001 3C8.48261 3 5.44511 5.02125 3.96387 7.96499L6.96011 10.29C7.67261 8.16374 9.66011 6.58499 12.0001 6.58499Z" fill="%23EA4335"/>%0A</svg>%0A';

// src/assets/icons/providers/icon_apple.svg
var icon_apple_default = 'data:image/svg+xml,<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">%0A<path d="M19.6209 8.818C19.5049 8.908 17.4569 10.062 17.4569 12.628C17.4569 15.596 20.0629 16.646 20.1409 16.672C20.1289 16.736 19.7269 18.11 18.7669 19.51C17.9109 20.742 17.0169 21.972 15.6569 21.972C14.2969 21.972 13.9469 21.182 12.3769 21.182C10.8469 21.182 10.3029 21.998 9.05889 21.998C7.81489 21.998 6.94689 20.858 5.94889 19.458C4.79289 17.814 3.85889 15.26 3.85889 12.836C3.85889 8.948 6.38689 6.886 8.87489 6.886C10.1969 6.886 11.2989 7.754 12.1289 7.754C12.9189 7.754 14.1509 6.834 15.6549 6.834C16.2249 6.834 18.2729 6.886 19.6209 8.818ZM14.9409 5.188C15.5629 4.45 16.0029 3.426 16.0029 2.402C16.0029 2.26 15.9909 2.116 15.9649 2C14.9529 2.038 13.7489 2.674 13.0229 3.516C12.4529 4.164 11.9209 5.188 11.9209 6.226C11.9209 6.382 11.9469 6.538 11.9589 6.588C12.0229 6.6 12.1269 6.614 12.2309 6.614C13.1389 6.614 14.2809 6.006 14.9409 5.188Z" fill="black"/>%0A</svg>%0A';

// src/assets/icons/providers/icon_kakao.svg
var icon_kakao_default = 'data:image/svg+xml,<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">%0A<path fill-rule="evenodd" clip-rule="evenodd" d="M11.7714 3C6.60457 3 2 6.57486 2 10.9846C2 13.7263 3.78114 16.1446 6.49314 17.5823L5.352 21.7709C5.25086 22.1417 5.67257 22.4366 5.996 22.2217L10.9983 18.9046C11.42 18.9451 11.8491 18.9691 11.7714 18.9691C17.9663 18.9691 22.0571 15.3937 22.0571 10.9846C22.0571 6.57486 17.9663 3 11.7714 3Z" fill="black" fill-opacity="0.902"/>%0A</svg>%0A';

// src/assets/icons/providers/icon_naver.svg
var icon_naver_default = 'data:image/svg+xml,<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">%0A<path d="M14.8531 12.4933L8.9129 4H4V19.8678H9.15703V11.3744L15.0871 19.8678H20V4H14.8531V12.4933Z" fill="%2303C75A"/>%0A</svg>%0A';

// src/assets/icons/providers/icon_line.svg
var icon_line_default = 'data:image/svg+xml,<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">%0A<path d="M21.9991 11.0911C21.9991 6.6297 17.5134 3 11.9995 3C6.48568 3 2 6.6297 2 11.0911C2 15.0909 5.55781 18.4402 10.3631 19.0739C10.6883 19.1439 11.1316 19.2879 11.2441 19.5654C11.3453 19.8177 11.3097 20.2121 11.2769 20.4672C11.2769 20.4672 11.1598 21.1709 11.1344 21.3205C11.0904 21.5728 10.9339 22.3064 12.0005 21.8578C13.068 21.4092 17.7589 18.4767 19.8565 16.0694C21.3055 14.4844 22 12.877 22 11.0911H21.9991ZM8.47172 13.477C8.47172 13.5826 8.38643 13.6676 8.28052 13.6676H5.47158C5.36567 13.6676 5.28038 13.5826 5.28038 13.477V13.4742V9.12582C5.28038 9.02022 5.36567 8.93518 5.47158 8.93518H6.18108C6.28605 8.93518 6.37228 9.02115 6.37228 9.12582V12.5798H8.28146C8.38643 12.5798 8.47266 12.6658 8.47266 12.7705V13.4779L8.47172 13.477ZM10.1625 13.477C10.1625 13.5816 10.0772 13.6676 9.97132 13.6676H9.26182C9.15685 13.6676 9.07062 13.5826 9.07062 13.477V9.12582C9.07062 9.02115 9.15591 8.93518 9.26182 8.93518H9.97132C10.0772 8.93518 10.1625 9.02022 10.1625 9.12582V13.477ZM14.9903 13.477C14.9903 13.5816 14.905 13.6676 14.7991 13.6676H14.0943C14.0774 13.6676 14.0605 13.6648 14.0446 13.6611C14.0446 13.6611 14.0427 13.6611 14.0418 13.6611C14.0371 13.6601 14.0334 13.6583 14.0287 13.6573C14.0268 13.6573 14.0249 13.6555 14.0231 13.6555C14.0202 13.6545 14.0165 13.6527 14.0137 13.6517C14.0109 13.6499 14.0071 13.6489 14.0043 13.6471C14.0024 13.6461 14.0006 13.6452 13.9987 13.6443C13.9949 13.6424 13.9903 13.6396 13.9865 13.6368C13.9865 13.6368 13.9846 13.6358 13.9846 13.6349C13.9659 13.6218 13.949 13.6059 13.935 13.5872L11.9358 10.8949V13.4788C11.9358 13.5835 11.8505 13.6695 11.7446 13.6695H11.0351C10.9301 13.6695 10.8439 13.5844 10.8439 13.4788V9.12769C10.8439 9.02302 10.9292 8.93705 11.0351 8.93705H11.7399C11.7399 8.93705 11.7446 8.93705 11.7465 8.93705C11.7502 8.93705 11.753 8.93705 11.7568 8.93705C11.7605 8.93705 11.7633 8.93705 11.7671 8.93798C11.7699 8.93798 11.7727 8.93798 11.7755 8.93892C11.7793 8.93892 11.783 8.94078 11.7868 8.94172C11.7887 8.94172 11.7915 8.94265 11.7933 8.94359C11.7971 8.94452 11.8008 8.94639 11.8046 8.94733C11.8065 8.94733 11.8083 8.9492 11.8111 8.9492C11.8149 8.95106 11.8186 8.952 11.8224 8.95387C11.8243 8.9548 11.8261 8.95574 11.828 8.95667C11.8318 8.95854 11.8355 8.96041 11.8383 8.96228C11.8402 8.96321 11.8421 8.96415 11.8439 8.96602C11.8477 8.96789 11.8505 8.97069 11.8543 8.97256C11.8561 8.97349 11.858 8.97536 11.8599 8.9763C11.8636 8.9791 11.8664 8.9819 11.8702 8.98471C11.8711 8.98564 11.873 8.98658 11.8739 8.98751C11.8777 8.99125 11.8814 8.99499 11.8852 8.99966C11.8852 8.99966 11.8852 8.99966 11.8861 9.00059C11.8917 9.00714 11.8964 9.01368 11.9011 9.02022L13.8975 11.7089V9.12489C13.8975 9.02022 13.9828 8.93424 14.0887 8.93424H14.7982C14.9031 8.93424 14.9894 9.01928 14.9894 9.12489V13.476L14.9903 13.477ZM18.863 9.83232C18.863 9.93792 18.7777 10.023 18.6718 10.023H16.7626V10.7575H18.6718C18.7768 10.7575 18.863 10.8435 18.863 10.9481V11.6556C18.863 11.7612 18.7777 11.8462 18.6718 11.8462H16.7626V12.5808H18.6718C18.7768 12.5808 18.863 12.6667 18.863 12.7714V13.4788C18.863 13.5844 18.7777 13.6695 18.6718 13.6695H15.8629C15.757 13.6695 15.6717 13.5844 15.6717 13.4788V13.476V9.13236V9.12769C15.6717 9.02209 15.757 8.93705 15.8629 8.93705H18.6718C18.7768 8.93705 18.863 9.02302 18.863 9.12769V9.83513V9.83232Z" fill="white"/>%0A</svg>%0A';

// src/assets/animations/common/animation_loading.svg
var animation_loading_default = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" width="200" height="200" style="shape-rendering: auto; display: block; background: transparent;" xmlns:xlink="http://www.w3.org/1999/xlink"><g><circle stroke-dasharray="164.93361431346415 56.97787143782138" r="35" stroke-width="12" stroke="%237c36f7" fill="none" cy="50" cx="50">%0A  <animateTransform keyTimes="0;1" values="0 50 50;360 50 50" dur="1s" repeatCount="indefinite" type="rotate" attributeName="transform"></animateTransform>%0A</circle><g></g></g><!-- [ldio] generated by https://loading.io --></svg>';

// src/utilities/google.ts
var getGoogleToken = async (code, clientId, clientSecret, redirectUri) => {
  try {
    const payload = new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code"
    });
    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: payload.toString()
    });
    const data = await response.json();
    if (!(data == null ? void 0 : data.id_token)) {
      throw new Error("Failed to receive id_token from Google.");
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
var getGoogleTokeninfo = async (idToken) => {
  try {
    const payload = new URLSearchParams({
      idToken
    });
    const response = await fetch(
      "https://www.googleapis.com/oauth2/v1/tokeninfo",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: payload.toString()
      }
    );
    const data = await response.json();
    if (!(data == null ? void 0 : data.email)) {
      throw new Error("Failed to receive email from Google.");
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// src/utilities/naver.ts
var getNaverToken = async (code, clientId, clientSecret, redirectUri) => {
  try {
    const payload = new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code"
    });
    const response = await fetch("/proxy/naver/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: payload.toString()
    });
    const data = await response.json();
    if (!(data == null ? void 0 : data.access_token)) {
      throw new Error("Failed to receive access_token from Naver.");
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
var getNaverTokeninfo = async (accessToken) => {
  var _a;
  try {
    const response = await fetch("/proxy/naver/tokeninfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${accessToken}`
      }
    });
    const data = await response.json();
    if (!(data == null ? void 0 : data.message) || (data == null ? void 0 : data.message) !== "success") {
      throw new Error("Failed to receive message from Naver.");
    }
    if (!(data == null ? void 0 : data.resultcode) || (data == null ? void 0 : data.resultcode) !== "00") {
      throw new Error("Failed to receive resultcode from Naver.");
    }
    if (!((_a = data == null ? void 0 : data.response) == null ? void 0 : _a.email)) {
      throw new Error("Failed to receive email from Naver.");
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// src/utilities/line.ts
var getLineToken = async (code, clientId, clientSecret, redirectUri) => {
  try {
    const payload = new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code"
    });
    const response = await fetch("https://api.line.me/oauth2/v2.1/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: payload.toString()
    });
    const data = await response.json();
    if (!(data == null ? void 0 : data.id_token)) {
      throw new Error("Failed to receive id_token from Line.");
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
var getLineTokeninfo = async (idToken, clientId) => {
  try {
    const payload = new URLSearchParams({
      id_token: idToken,
      client_id: clientId
    });
    const response = await fetch("https://api.line.me/oauth2/v2.1/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: payload.toString()
    });
    const data = await response.json();
    if (!(data == null ? void 0 : data.email)) {
      throw new Error("Failed to receive email from Line.");
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
var getKakaoToken = async (code, clientId, redirectUri) => {
  try {
    const payload = new URLSearchParams({
      code,
      client_id: clientId,
      redirect_uri: redirectUri,
      grant_type: "authorization_code"
    });
    const response = await fetch("https://kauth.kakao.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: payload.toString()
    });
    const data = await response.json();
    if (!(data == null ? void 0 : data.id_token)) {
      throw new Error("Failed to receive id_token from Kakao.");
    }
    if (!(data == null ? void 0 : data.access_token)) {
      throw new Error("Failed to receive access_token from Kakao.");
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
var verifyKakaoToken = async (idToken, restApiKey) => {
  try {
    const KAKAO_ISS = "https://kauth.kakao.com";
    const KAKAO_JWKS_URL = `${KAKAO_ISS}/.well-known/jwks.json`;
    const kakaoJwks = jose.createRemoteJWKSet(new URL(KAKAO_JWKS_URL));
    const { payload: data } = await jose.jwtVerify(idToken, kakaoJwks, {
      issuer: KAKAO_ISS,
      audience: restApiKey
    });
    const currentTimeInSeconds = Math.floor(Date.now() / 1e3);
    if (!(data == null ? void 0 : data.email)) {
      throw new Error("Failed to receive email from Kakao.");
    }
    if (!(data == null ? void 0 : data.iss) || (data == null ? void 0 : data.iss) !== KAKAO_ISS) {
      throw new Error("Invalid issuer from Kakao.");
    }
    if (!(data == null ? void 0 : data.aud) || (data == null ? void 0 : data.aud) !== restApiKey) {
      throw new Error("Invalid audience from Kakao.");
    }
    if (!(data == null ? void 0 : data.exp) || currentTimeInSeconds >= (data == null ? void 0 : data.exp)) {
      throw new Error("id_token is expired from Kakao.");
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
var getKakaoTokeninfo = async (accessToken) => {
  var _a;
  try {
    const response = await fetch("https://kapi.kakao.com/v2/user/me", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${accessToken}`
      }
    });
    const data = await response.json();
    if (!((_a = data == null ? void 0 : data.kakao_account) == null ? void 0 : _a.email)) {
      throw new Error("Failed to receive email from Kakao.");
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
var getAppleToken = async (code, clientId, clientSecret, redirectUri) => {
  var _a;
  try {
    const payload = new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code"
    });
    const response = await fetch("/proxy/apple/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: payload.toString()
    });
    const data = await response.json();
    if (!(data == null ? void 0 : data.id_token)) {
      throw new Error("Failed to receive id_token from Apple.");
    }
    const decodedData = JSON.parse(atob((_a = data == null ? void 0 : data.id_token) == null ? void 0 : _a.split(".")[1]));
    if (!(decodedData == null ? void 0 : decodedData.email)) {
      throw new Error("Failed to receive email from Apple.");
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
var verifyAppleToken = async (idToken, clientId) => {
  try {
    const APPLE_ISS = "https://appleid.apple.com";
    const APPLE_JWKS_URL = "https://appleid.apple.com/auth/keys";
    const appleJwks = jose.createRemoteJWKSet(new URL(APPLE_JWKS_URL));
    const { payload: data } = await jose.jwtVerify(idToken, appleJwks, {
      issuer: APPLE_ISS,
      audience: clientId
    });
    const currentTimeInSeconds = Math.floor(Date.now() / 1e3);
    if (!(data == null ? void 0 : data.email)) {
      throw new Error("Failed to receive email from Apple.");
    }
    if (!(data == null ? void 0 : data.iss) || (data == null ? void 0 : data.iss) !== APPLE_ISS) {
      throw new Error("Invalid issuer from Apple.");
    }
    if (!(data == null ? void 0 : data.aud) || (data == null ? void 0 : data.aud) !== clientId) {
      throw new Error("Invalid audience from Apple.");
    }
    if (!(data == null ? void 0 : data.exp) || currentTimeInSeconds >= (data == null ? void 0 : data.exp)) {
      throw new Error("id_token is expired from Apple.");
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
var createAppleClientSecret = async (idToken, privateKey, teamId, keyId) => {
  try {
    const alg = "ES256";
    const base64Payload = idToken.split(".")[1];
    const payloadString = atob(base64Payload);
    const payload = JSON.parse(payloadString);
    const audience = payload.aud;
    const issuer = payload.iss;
    if (!audience || !issuer) {
      throw new Error("Invalid id_token: missing aud or iss.");
    }
    const base64Key = privateKey.replace("-----BEGIN PRIVATE KEY-----", "").replace("-----END PRIVATE KEY-----", "").replace(/\s+/g, "");
    const rawKey = Uint8Array.from(atob(base64Key), (c) => c.charCodeAt(0));
    const cryptoKey = await crypto.subtle.importKey(
      "pkcs8",
      rawKey.buffer,
      { name: "ECDSA", namedCurve: "P-256" },
      false,
      ["sign"]
    );
    const jwt = await new jose.SignJWT({}).setProtectedHeader({ alg, kid: keyId }).setIssuer(teamId).setIssuedAt().setExpirationTime("1h").setAudience(issuer).setSubject(audience).sign(cryptoKey);
    return jwt;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
var providers = [
  {
    type: "google",
    label: "Google\uB85C \uACC4\uC18D\uD558\uAE30",
    icon: icon_google_default,
    backgroundColor: "#ffffff",
    textColor: "#000000",
    hoverColor: "#f7f7f7",
    border: "1px solid #dadce0"
  },
  {
    type: "apple",
    label: "Apple\uB85C \uACC4\uC18D\uD558\uAE30",
    icon: icon_apple_default,
    backgroundColor: "#ffffff",
    textColor: "#000000",
    hoverColor: "#f7f7f7",
    border: "1px solid #dadce0"
  },
  {
    type: "naver",
    label: "\uB124\uC774\uBC84\uB85C \uACC4\uC18D\uD558\uAE30",
    icon: icon_naver_default,
    backgroundColor: "#ffffff",
    textColor: "#000000",
    hoverColor: "#f7f7f7",
    border: "1px solid #dadce0"
  },
  {
    type: "kakao",
    label: "\uCE74\uCE74\uC624\uB85C \uACC4\uC18D\uD558\uAE30",
    icon: icon_kakao_default,
    backgroundColor: "#FEE500",
    textColor: "#000000",
    hoverColor: "#ecd900",
    border: "1px solid #FEE500"
  },
  {
    type: "line",
    label: "LINE\uC73C\uB85C \uACC4\uC18D\uD558\uAE30",
    icon: icon_line_default,
    backgroundColor: "#03C75A",
    textColor: "#ffffff",
    hoverColor: "#02b94e",
    border: "1px solid #03C75A"
  }
];
var metaContainerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100vh",
  backgroundColor: "#f5f5f5"
};
var containerStyle = {
  width: "100%",
  maxWidth: "360px",
  boxSizing: "border-box",
  padding: "40px 30px",
  borderRadius: "30px",
  color: "#333",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
  whiteSpace: "pre-wrap",
  wordBreak: "break-all",
  backgroundColor: "#ffffff"
};
var titleContainerStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center"
};
var contentContainerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center"
};
var buttonBaseStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "12px 16px",
  fontSize: "16px",
  borderRadius: "30px",
  width: "100%",
  marginBottom: "12px",
  cursor: "pointer",
  transition: "all 0.2s ease-in-out",
  wordBreak: "break-all",
  flexWrap: "wrap",
  gap: "12px"
};
function Login() {
  const navigate = (path) => {
    window.location.href = path;
  };
  const location = {
    search: window.location.search,
    hash: window.location.hash};
  const {
    loginV2,
    error: coreError,
    loading: coreLoading,
    setLoading: setCoreLoading,
    service: coreService
  } = abcWaasCoreSdk.useLogin();
  const [error, setError] = react.useState(null);
  const handleRedirect = (provider) => {
    localStorage.setItem("provider", provider);
    if (provider === "google") {
      if (!process.env.REACT_APP_GOOGLE_CLIENT_ID || !process.env.REACT_APP_GOOGLE_REDIRECT_URI) {
        throw new Error("Google client ID or redirect URI is not set.");
      }
      const state = crypto.randomUUID();
      localStorage.setItem("google_oauth_state", state);
      const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
      url.searchParams.set("client_id", process.env.REACT_APP_GOOGLE_CLIENT_ID);
      url.searchParams.set(
        "redirect_uri",
        process.env.REACT_APP_GOOGLE_REDIRECT_URI
      );
      url.searchParams.set("response_type", "code");
      url.searchParams.set(
        "scope",
        "https://www.googleapis.com/auth/userinfo.email"
      );
      url.searchParams.set("prompt", "consent");
      url.searchParams.set("access_type", "offline");
      url.searchParams.set("state", state);
      window.location.href = url.toString();
    } else if (provider === "apple") {
      if (!process.env.REACT_APP_APPLE_CLIENT_ID || !process.env.REACT_APP_APPLE_REDIRECT_URI) {
        throw new Error("Apple client ID or redirect URI is not set.");
      }
      const state = crypto.randomUUID();
      localStorage.setItem("apple_oauth_state", state);
      const url = new URL("https://appleid.apple.com/auth/authorize");
      url.searchParams.set("client_id", process.env.REACT_APP_APPLE_CLIENT_ID);
      url.searchParams.set(
        "redirect_uri",
        process.env.REACT_APP_APPLE_REDIRECT_URI
      );
      url.searchParams.set("response_type", "code id_token");
      url.searchParams.set("scope", "");
      url.searchParams.set("response_mode", "fragment");
      url.searchParams.set("state", state);
      window.location.href = url.toString();
    } else if (provider === "naver") {
      if (!process.env.REACT_APP_NAVER_CLIENT_ID || !process.env.REACT_APP_NAVER_REDIRECT_URI) {
        throw new Error("Naver client ID or redirect URI is not set.");
      }
      const state = crypto.randomUUID();
      localStorage.setItem("naver_oauth_state", state);
      const url = new URL("https://nid.naver.com/oauth2.0/authorize");
      url.searchParams.set("client_id", process.env.REACT_APP_NAVER_CLIENT_ID);
      url.searchParams.set(
        "redirect_uri",
        process.env.REACT_APP_NAVER_REDIRECT_URI
      );
      url.searchParams.set("response_type", "code");
      url.searchParams.set("state", state);
      window.location.href = url.toString();
    } else if (provider === "kakao") {
      if (!process.env.REACT_APP_KAKAO_REST_API_KEY || !process.env.REACT_APP_KAKAO_REDIRECT_URI) {
        throw new Error("Kakao client ID or redirect URI is not set.");
      }
      const state = crypto.randomUUID();
      localStorage.setItem("kakao_oauth_state", state);
      const url = new URL("https://kauth.kakao.com/oauth/authorize");
      url.searchParams.set(
        "client_id",
        process.env.REACT_APP_KAKAO_REST_API_KEY
      );
      url.searchParams.set(
        "redirect_uri",
        process.env.REACT_APP_KAKAO_REDIRECT_URI
      );
      url.searchParams.set("response_type", "code");
      url.searchParams.set("scope", "account_email openid");
      url.searchParams.set("state", state);
      window.location.href = url.toString();
    } else if (provider === "line") {
      if (!process.env.REACT_APP_LINE_CLIENT_ID || !process.env.REACT_APP_LINE_REDIRECT_URI) {
        throw new Error("Line client ID or redirect URI is not set.");
      }
      const state = crypto.randomUUID();
      localStorage.setItem("line_oauth_state", state);
      const url = new URL("https://access.line.me/oauth2/v2.1/authorize");
      url.searchParams.set("client_id", process.env.REACT_APP_LINE_CLIENT_ID);
      url.searchParams.set(
        "redirect_uri",
        process.env.REACT_APP_LINE_REDIRECT_URI
      );
      url.searchParams.set("response_type", "code");
      url.searchParams.set("scope", "profile openid email");
      url.searchParams.set("state", state);
      window.location.href = url.toString();
    }
  };
  const handleCallback = react.useCallback(
    async (provider, data) => {
      var _a;
      try {
        setCoreLoading(true);
        setError(null);
        if (provider === "google") {
          if (!process.env.REACT_APP_GOOGLE_CLIENT_ID || !process.env.REACT_APP_GOOGLE_CLIENT_SECRET || !process.env.REACT_APP_GOOGLE_REDIRECT_URI) {
            throw new Error(
              "Google client ID, client secret or redirect URI is not set."
            );
          }
          const { code } = data;
          const getGoogleTokenData = await getGoogleToken(
            code,
            process.env.REACT_APP_GOOGLE_CLIENT_ID,
            process.env.REACT_APP_GOOGLE_CLIENT_SECRET,
            process.env.REACT_APP_GOOGLE_REDIRECT_URI
          );
          const getGoogleTokeninfoData = await getGoogleTokeninfo(
            getGoogleTokenData.id_token
          );
          await loginV2(
            getGoogleTokeninfoData.email,
            getGoogleTokenData.id_token,
            provider
          );
        } else if (provider === "apple") {
          if (!process.env.REACT_APP_APPLE_CLIENT_ID || !process.env.REACT_APP_APPLE_REDIRECT_URI || !process.env.REACT_APP_APPLE_TEAM_ID || !process.env.REACT_APP_APPLE_KEY_ID || !process.env.REACT_APP_APPLE_PRIVATE_KEY) {
            throw new Error(
              "Apple client ID, redirect URI, team ID, key ID or private key is not set."
            );
          }
          const { code, id_token } = data;
          await verifyAppleToken(
            id_token,
            process.env.REACT_APP_APPLE_CLIENT_ID
          );
          const APPLE_CLIENT_SECRET = await createAppleClientSecret(
            id_token,
            process.env.REACT_APP_APPLE_PRIVATE_KEY,
            process.env.REACT_APP_APPLE_TEAM_ID,
            process.env.REACT_APP_APPLE_KEY_ID
          );
          const getAppleTokenData = await getAppleToken(
            code,
            process.env.REACT_APP_APPLE_CLIENT_ID,
            APPLE_CLIENT_SECRET,
            process.env.REACT_APP_APPLE_REDIRECT_URI
          );
          const getAppleDecodedTokenData = JSON.parse(
            atob((_a = getAppleTokenData == null ? void 0 : getAppleTokenData.id_token) == null ? void 0 : _a.split(".")[1])
          );
          await verifyAppleToken(
            id_token,
            process.env.REACT_APP_APPLE_CLIENT_ID
          );
          await loginV2(
            getAppleDecodedTokenData.email,
            getAppleTokenData.id_token,
            provider
          );
        } else if (provider === "naver") {
          if (!process.env.REACT_APP_NAVER_CLIENT_ID || !process.env.REACT_APP_NAVER_CLIENT_SECRET || !process.env.REACT_APP_NAVER_REDIRECT_URI) {
            throw new Error(
              "Naver client ID, client secret or redirect URI is not set."
            );
          }
          const { code } = data;
          const getNaverTokenData = await getNaverToken(
            code,
            process.env.REACT_APP_NAVER_CLIENT_ID,
            process.env.REACT_APP_NAVER_CLIENT_SECRET,
            process.env.REACT_APP_NAVER_REDIRECT_URI
          );
          const getNaverTokeninfoData = await getNaverTokeninfo(
            getNaverTokenData.access_token
          );
          await loginV2(
            getNaverTokeninfoData.response.email,
            getNaverTokenData.access_token,
            provider
          );
        } else if (provider === "kakao") {
          if (!process.env.REACT_APP_KAKAO_REST_API_KEY || !process.env.REACT_APP_KAKAO_REDIRECT_URI) {
            throw new Error("Kakao client ID or redirect URI is not set.");
          }
          const { code } = data;
          const getKakaoTokenData = await getKakaoToken(
            code,
            process.env.REACT_APP_KAKAO_REST_API_KEY,
            process.env.REACT_APP_KAKAO_REDIRECT_URI
          );
          await verifyKakaoToken(
            getKakaoTokenData.id_token,
            process.env.REACT_APP_KAKAO_REST_API_KEY
          );
          const getKakaoTokeninfoData = await getKakaoTokeninfo(
            getKakaoTokenData.access_token
          );
          await loginV2(
            getKakaoTokeninfoData.kakao_account.email,
            getKakaoTokenData.id_token,
            provider
          );
        } else if (provider === "line") {
          if (!process.env.REACT_APP_LINE_CLIENT_ID || !process.env.REACT_APP_LINE_CLIENT_SECRET || !process.env.REACT_APP_LINE_REDIRECT_URI) {
            throw new Error(
              "Line client ID, client secret or redirect URI is not set."
            );
          }
          const { code } = data;
          const getLineTokenData = await getLineToken(
            code,
            process.env.REACT_APP_LINE_CLIENT_ID,
            process.env.REACT_APP_LINE_CLIENT_SECRET,
            process.env.REACT_APP_LINE_REDIRECT_URI
          );
          const getLineTokeninfoData = await getLineTokeninfo(
            getLineTokenData.id_token,
            process.env.REACT_APP_LINE_CLIENT_ID
          );
          await loginV2(
            getLineTokeninfoData.email,
            getLineTokenData.id_token,
            provider
          );
        } else {
          throw new Error("Invalid provider.");
        }
      } catch (error2) {
        if (coreError) {
          setError(coreError);
        }
        if (error2) {
          setError(error2);
        }
      } finally {
        setCoreLoading(false);
      }
    },
    [loginV2, coreError, navigate]
  );
  react.useEffect(() => {
    const provider = localStorage.getItem("provider");
    if (provider === "google") {
      const params = new URLSearchParams(location.search);
      const code = params.get("code");
      const returnedState = params.get("state");
      const storedState = localStorage.getItem("google_oauth_state");
      const data = {
        code
      };
      if (code && returnedState === storedState) {
        handleCallback(provider, data);
      }
    } else if (provider === "apple") {
      const hashParams = new URLSearchParams(location.hash.slice(1));
      const code = hashParams.get("code");
      const id_token = hashParams.get("id_token");
      const returnedState = hashParams.get("state");
      const storedState = localStorage.getItem("apple_oauth_state");
      const data = {
        code,
        id_token
      };
      if (code && returnedState === storedState) {
        handleCallback(provider, data);
      }
    } else if (provider === "naver") {
      const params = new URLSearchParams(location.search);
      const code = params.get("code");
      const returnedState = params.get("state");
      const storedState = localStorage.getItem("naver_oauth_state");
      const data = {
        code
      };
      if (code && returnedState === storedState) {
        handleCallback(provider, data);
      }
    } else if (provider === "kakao") {
      const params = new URLSearchParams(location.search);
      const code = params.get("code");
      const returnedState = params.get("state");
      const storedState = localStorage.getItem("kakao_oauth_state");
      const data = {
        code
      };
      if (code && returnedState === storedState) {
        handleCallback(provider, data);
      }
    } else if (provider === "line") {
      const params = new URLSearchParams(location.search);
      const code = params.get("code");
      const returnedState = params.get("state");
      const storedState = localStorage.getItem("line_oauth_state");
      const data = {
        code
      };
      if (code && returnedState === storedState) {
        handleCallback(provider, data);
      }
    }
  }, [location.search, location.hash]);
  return /* @__PURE__ */ jsxRuntime.jsx("div", { style: metaContainerStyle, children: /* @__PURE__ */ jsxRuntime.jsxs("div", { style: containerStyle, children: [
    /* @__PURE__ */ jsxRuntime.jsx("div", { style: titleContainerStyle, children: /* @__PURE__ */ jsxRuntime.jsx(
      "span",
      {
        style: {
          textAlign: "center",
          marginBottom: "24px",
          fontSize: "20px",
          fontWeight: "bold",
          color: "#333333"
        },
        children: "ABC WaaS Login"
      }
    ) }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { style: contentContainerStyle, children: [
      providers.map((item) => /* @__PURE__ */ jsxRuntime.jsx(
        "button",
        {
          onClick: () => handleRedirect(item.type),
          disabled: coreLoading,
          style: __spreadProps(__spreadValues({}, buttonBaseStyle), {
            backgroundColor: item.backgroundColor,
            color: item.textColor,
            border: item.border
          }),
          onMouseEnter: (event) => event.currentTarget.style.backgroundColor = item.hoverColor,
          onMouseLeave: (event) => event.currentTarget.style.backgroundColor = item.backgroundColor,
          children: coreLoading && coreService === item.type ? /* @__PURE__ */ jsxRuntime.jsx(
            "img",
            {
              src: animation_loading_default,
              alt: "loading",
              style: { width: "24px", height: "24px" }
            }
          ) : /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              "img",
              {
                src: item.icon,
                alt: `${item.type} icon`,
                style: {
                  width: "24px",
                  height: "24px"
                }
              }
            ),
            item.label
          ] })
        },
        item.type
      )),
      /* @__PURE__ */ jsxRuntime.jsx(
        "div",
        {
          style: {
            width: "100%",
            minHeight: "31px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          },
          children: (error == null ? void 0 : error.message) && /* @__PURE__ */ jsxRuntime.jsx(
            "span",
            {
              style: {
                color: "red",
                textAlign: "center",
                display: "block",
                width: "100%",
                marginBottom: "12px"
              },
              children: error.message
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(
        "div",
        {
          style: {
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          },
          children: /* @__PURE__ */ jsxRuntime.jsx(
            "span",
            {
              style: {
                color: "#666666",
                textAlign: "center",
                display: "block",
                width: "100%",
                fontSize: "10px"
              },
              children: "\xA9 AhnLab Blockchain Company. All rights reserved."
            }
          )
        }
      )
    ] })
  ] }) });
}

Object.defineProperty(exports, "AbcWaasProvider", {
  enumerable: true,
  get: function () { return abcWaasCoreSdk.AbcWaasProvider; }
});
Object.defineProperty(exports, "useAbcWaas", {
  enumerable: true,
  get: function () { return abcWaasCoreSdk.useAbcWaas; }
});
exports.Login = Login;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map