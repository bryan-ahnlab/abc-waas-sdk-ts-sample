// src/components/abc-waas/multiple/Redirect.tsx

import { useSnsLogin } from "abc-waas-sdk";

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
  const { loading: loadingSnsLogin } = useSnsLogin();

  const handleRedirect = async (provider: Providers) => {
    localStorage.setItem("provider", provider);

    let returnUrl =
      process.env.REACT_APP_REDIRECT_URI ||
      window.location.origin + window.location.pathname;

    const redirectUrl = `${
      process.env.REACT_APP_API_WAAS_MYABCWALLET_URI
    }/auth/auth-service/${provider}/login?audience=${
      process.env.REACT_APP_MW_MYABCWALLET_URI
    }&url=${encodeURIComponent(returnUrl)}`;

    window.location.href = redirectUrl;
  };

  return (
    <div style={containerStyle}>
      <div style={titleContainerStyle}>
        <h2 style={{ textAlign: "center", marginBottom: "24px" }}>
          ABC WaaS Redirect
        </h2>
      </div>

      <div style={contentContainerStyle}>
        {providers.map((item) => (
          <button
            key={item.type}
            onClick={() => handleRedirect(item.type)}
            disabled={loadingSnsLogin}
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
