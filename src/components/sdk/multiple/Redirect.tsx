// src/components/sdk/multiple/Redirect.tsx

import { useLogin } from "abc-waas-core-sdk";

import GoogleIcon from "../../../assets/icon/provider/icon_google.svg";
import AppleIcon from "../../../assets/icon/provider/icon_apple.svg";
import KakaoIcon from "../../../assets/icon/provider/icon_kakao.svg";
import NaverIcon from "../../../assets/icon/provider/icon_naver.svg";
import LineIcon from "../../../assets/icon/provider/icon_line.svg";

type Providers = "google" | "apple" | "kakao" | "naver" | "line";

const providers: {
  type: Providers;
  label: string;
  icon: string;
  backgroundColor: string;
  textColor: string;
  hoverColor: string;
  border: string;
}[] = [
  {
    type: "google",
    label: "Google로 계속하기",
    icon: GoogleIcon,
    backgroundColor: "#ffffff",
    textColor: "#000000",
    hoverColor: "#f7f7f7",
    border: "1px solid #dadce0",
  },
  {
    type: "apple",
    label: "Apple로 계속하기",
    icon: AppleIcon,
    backgroundColor: "#ffffff",
    textColor: "#000000",
    hoverColor: "#f7f7f7",
    border: "1px solid #dadce0",
  },
  {
    type: "naver",
    label: "네이버로 계속하기",
    icon: NaverIcon,
    backgroundColor: "#ffffff",
    textColor: "#000000",
    hoverColor: "#f7f7f7",
    border: "1px solid #dadce0",
  },
  {
    type: "kakao",
    label: "카카오로 계속하기",
    icon: KakaoIcon,
    backgroundColor: "#FEE500",
    textColor: "#000000",
    hoverColor: "#ecd900",
    border: "1px solid #FEE500",
  },
  {
    type: "line",
    label: "LINE으로 계속하기",
    icon: LineIcon,
    backgroundColor: "#03C75A",
    textColor: "#ffffff",
    hoverColor: "#02b94e",
    border: "1px solid #03C75A",
  },
];

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

const titleContainerStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
} as const;

const contentContainerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
} as const;

const buttonBaseStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "12px 16px",
  fontSize: "16px",
  fontWeight: "bold",
  borderRadius: "8px",
  width: "100%",
  marginBottom: "12px",
  cursor: "pointer",
  transition: "all 0.2s ease-in-out",
  wordBreak: "break-all",
} as const;

export default function Redirect() {
  const { loading } = useLogin();

  const handleRedirect = (provider: Providers) => {
    localStorage.setItem("provider", provider);

    if (provider === "google") {
      if (
        !process.env.REACT_APP_GOOGLE_CLIENT_ID ||
        !process.env.REACT_APP_GOOGLE_REDIRECT_URI
      ) {
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
      if (
        !process.env.REACT_APP_APPLE_CLIENT_ID ||
        !process.env.REACT_APP_APPLE_REDIRECT_URI
      ) {
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
      url.searchParams.set("scope", ""); // name email
      url.searchParams.set("response_mode", "fragment"); // from_post
      url.searchParams.set("state", state);

      window.location.href = url.toString();
    } else if (provider === "naver") {
      if (
        !process.env.REACT_APP_NAVER_CLIENT_ID ||
        !process.env.REACT_APP_NAVER_REDIRECT_URI
      ) {
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
      if (
        !process.env.REACT_APP_KAKAO_REST_API_KEY ||
        !process.env.REACT_APP_KAKAO_REDIRECT_URI
      ) {
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
      if (
        !process.env.REACT_APP_LINE_CLIENT_ID ||
        !process.env.REACT_APP_LINE_REDIRECT_URI
      ) {
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

  return (
    <div style={containerStyle}>
      <div style={titleContainerStyle}>
        <h2 style={{ textAlign: "center", marginBottom: "24px" }}>
          SDK Redirect
        </h2>
      </div>

      <div style={contentContainerStyle}>
        {providers.map((item) => (
          <button
            key={item.type}
            onClick={() => handleRedirect(item.type as Providers)}
            disabled={loading}
            style={{
              ...buttonBaseStyle,
              backgroundColor: item.backgroundColor,
              color: item.textColor,
              border: item.border,
            }}
            onMouseEnter={(event) =>
              (event.currentTarget.style.backgroundColor = item.hoverColor)
            }
            onMouseLeave={(event) =>
              (event.currentTarget.style.backgroundColor = item.backgroundColor)
            }
          >
            <>
              <img
                src={item.icon}
                alt={`${item.type} icon`}
                style={{
                  width: "24px",
                  height: "24px",
                  marginRight: "12px",
                }}
              />
              {item.label}
            </>
          </button>
        ))}
      </div>
    </div>
  );
}
