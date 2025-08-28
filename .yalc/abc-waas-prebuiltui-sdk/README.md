# ABC WaaS Prebuilt UI SDK

[![npm version](https://badge.fury.io/js/abc-waas-prebuiltui-sdk.svg)](https://badge.fury.io/js/abc-waas-prebuiltui-sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

ABC WaaS SDK를 위한 미리 만들어진 UI 컴포넌트 라이브러리입니다. `abc-waas-core-sdk`의 모든 기능을 포함하며, 별도로 `abc-waas-core-sdk`를 설치할 필요가 없습니다.

## 📋 목차

- [설치](#설치)
- [빠른 시작](#빠른-시작)
- [사용법](#사용법)
- [API Reference](#api-reference)
- [환경 변수 설정](#환경-변수-설정)
- [지원하는 소셜 서비스](#지원하는-소셜-서비스)
- [아키텍처](#아키텍처)
- [개발 가이드](#개발-가이드)
- [라이선스](#라이선스)

## 🚀 설치

```bash
npm install abc-waas-prebuiltui-sdk
```

또는

```bash
yarn add abc-waas-prebuiltui-sdk
```

## ⚡ 빠른 시작

### 1. 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음 환경 변수를 설정하세요:

```env
# ABC WaaS 설정
REACT_APP_API_WAAS_MYABCWALLET_URI=https://api.abcwallet.com
REACT_APP_MW_MYABCWALLET_URI=https://myabcwallet.com
REACT_APP_CLIENT_ID=your_client_id
REACT_APP_CLIENT_SECRET=your_client_secret

# OAuth2 Provider 설정
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
REACT_APP_GOOGLE_REDIRECT_URI=http://localhost:3000/auth/signin?provider=google

REACT_APP_APPLE_CLIENT_ID=your_apple_client_id
REACT_APP_APPLE_REDIRECT_URI=your_apple_redirect_uri

REACT_APP_NAVER_CLIENT_ID=your_naver_client_id
REACT_APP_NAVER_REDIRECT_URI=http://localhost:3000

REACT_APP_KAKAO_REST_API_KEY=your_kakao_rest_api_key
REACT_APP_KAKAO_REDIRECT_URI=http://localhost:3000/auth/signin?provider=kakao

REACT_APP_LINE_CLIENT_ID=your_line_client_id
REACT_APP_LINE_REDIRECT_URI=http://localhost:3000/auth/signin?provider=line
```

### 2. 기본 사용법

```tsx
import React from "react";
import { AbcWaasProvider, Login } from "abc-waas-prebuiltui-sdk";

const config = {
  API_WAAS_MYABCWALLET_URL:
    process.env.REACT_APP_API_WAAS_MYABCWALLET_URI || "",
  MW_MYABCWALLET_URL: process.env.REACT_APP_MW_MYABCWALLET_URI || "",
  CLIENT_ID: process.env.REACT_APP_CLIENT_ID || "",
  CLIENT_SECRET: process.env.REACT_APP_CLIENT_SECRET || "",
};

function App() {
  return (
    <AbcWaasProvider config={config}>
      <div>
        <h1>ABC WaaS 로그인</h1>
        <Login />
      </div>
    </AbcWaasProvider>
  );
}

export default App;
```

## 📖 사용법

### 1. Provider 설정

모든 ABC WaaS 기능을 사용하려면 `AbcWaasProvider`로 앱을 감싸야 합니다:

```tsx
import { AbcWaasProvider } from "abc-waas-prebuiltui-sdk";

const config = {
  API_WAAS_MYABCWALLET_URL: "https://api.abcwallet.com",
  MW_MYABCWALLET_URL: "https://myabcwallet.com",
  CLIENT_ID: "your_client_id",
  CLIENT_SECRET: "your_client_secret",
};

function App() {
  return (
    <AbcWaasProvider config={config}>
      <YourApp />
    </AbcWaasProvider>
  );
}
```

### 2. 로그인 컴포넌트 사용

#### 기본 사용법

```tsx
import { Login } from "abc-waas-prebuiltui-sdk";

function LoginPage() {
  return (
    <div>
      <h1>로그인</h1>
      <Login />
    </div>
  );
}
```

#### 커스텀 로그인 핸들러 사용

```tsx
import { Login, useAbcWaas } from "abc-waas-prebuiltui-sdk";

function LoginPage() {
  const { snsLoginV2 } = useAbcWaas();

  const handleSnsLogin = async (
    email: string,
    token: string,
    provider: string
  ) => {
    try {
      await snsLoginV2(email, token, provider);
      console.log("로그인 성공:", { email, provider });
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  const handleError = (error: Error) => {
    console.error("로그인 에러:", error);
  };

  return (
    <div>
      <h1>로그인</h1>
      <Login onSnsLogin={handleSnsLogin} onError={handleError} />
    </div>
  );
}
```

### 3. Core SDK 기능 직접 사용

```tsx
import { useAbcWaas } from "abc-waas-prebuiltui-sdk";

function UserInfo() {
  const {
    email,
    token,
    service,
    basicToken,
    abcAuth,
    abcWallet,
    abcUser,
    setEmail,
    setToken,
  } = useAbcWaas();

  return (
    <div>
      <h2>사용자 정보</h2>
      <p>Email: {email}</p>
      <p>Service: {service}</p>
      <p>Token: {token}</p>
      <p>Basic Token: {basicToken}</p>

      <button onClick={() => setEmail("new@example.com")}>이메일 변경</button>
    </div>
  );
}
```

### 4. 완전한 예시

```tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AbcWaasProvider, Login, useAbcWaas } from "abc-waas-prebuiltui-sdk";

const config = {
  API_WAAS_MYABCWALLET_URL:
    process.env.REACT_APP_API_WAAS_MYABCWALLET_URI || "",
  MW_MYABCWALLET_URL: process.env.REACT_APP_MW_MYABCWALLET_URI || "",
  CLIENT_ID: process.env.REACT_APP_CLIENT_ID || "",
  CLIENT_SECRET: process.env.REACT_APP_CLIENT_SECRET || "",
};

function LoginPage() {
  return (
    <div>
      <h1>로그인</h1>
      <Login />
    </div>
  );
}

function Dashboard() {
  const { email, service, token } = useAbcWaas();

  if (!email) {
    return <div>로그인이 필요합니다.</div>;
  }

  return (
    <div>
      <h1>대시보드</h1>
      <p>환영합니다, {email}님!</p>
      <p>서비스: {service}</p>
    </div>
  );
}

function App() {
  return (
    <AbcWaasProvider config={config}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </AbcWaasProvider>
  );
}

export default App;
```

## 📚 API Reference

### AbcWaasProvider

Core SDK의 Provider를 래핑하는 컴포넌트입니다.

| Prop   | Type                | Required | Description |
| ------ | ------------------- | -------- | ----------- |
| config | `AbcWaasConfigType` | ✅       | 설정 객체   |

### AbcWaasConfigType

| Property                 | Type     | Required | Description       |
| ------------------------ | -------- | -------- | ----------------- |
| API_WAAS_MYABCWALLET_URL | `string` | ✅       | API 서버 URL      |
| MW_MYABCWALLET_URL       | `string` | ✅       | MW 서버 URL       |
| CLIENT_ID                | `string` | ✅       | 클라이언트 ID     |
| CLIENT_SECRET            | `string` | ✅       | 클라이언트 시크릿 |

### Login

소셜 로그인 UI 컴포넌트입니다.

| Prop       | Type                                                                | Required | Description      |
| ---------- | ------------------------------------------------------------------- | -------- | ---------------- |
| onSnsLogin | `(email: string, token: string, provider: string) => Promise<void>` | ❌       | 로그인 성공 콜백 |
| onError    | `(error: Error) => void`                                            | ❌       | 에러 처리 콜백   |

### useAbcWaas

Core SDK의 모든 기능에 접근할 수 있는 훅입니다.

```typescript
const {
  // 상태
  email: string | null,
  token: string | null,
  service: string | null,
  basicToken: string | null,
  abcAuth: any,
  abcWallet: any,
  abcUser: any,
  secureChannel: any,

  // 설정
  config: AbcWaasConfigType,

  // Setter 함수들
  setEmail: (email: string | null) => void,
  setToken: (token: string | null) => void,
  setService: (service: string | null) => void,
  setBasicToken: (basicToken: string | null) => void,
  setAbcAuth: (abcAuth: any) => void,
  setAbcWallet: (abcWallet: any) => void,
  setAbcUser: (abcUser: any) => void,
  setSecureChannel: (secureChannel: any) => void,

  // 로그인 함수
  snsLoginV2: (email: string, token: string, provider: string) => Promise<void>,
} = useAbcWaas();
```

## 🔧 환경 변수 설정

### 필수 환경 변수

| 변수명                               | 설명                       | 예시                        |
| ------------------------------------ | -------------------------- | --------------------------- |
| `REACT_APP_API_WAAS_MYABCWALLET_URI` | ABC WaaS API 서버 URL      | `https://api.abcwallet.com` |
| `REACT_APP_MW_MYABCWALLET_URI`       | ABC WaaS MW 서버 URL       | `https://myabcwallet.com`   |
| `REACT_APP_CLIENT_ID`                | ABC WaaS 클라이언트 ID     | `your_client_id`            |
| `REACT_APP_CLIENT_SECRET`            | ABC WaaS 클라이언트 시크릿 | `your_client_secret`        |

### OAuth2 Provider 환경 변수

#### Google

```env
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
REACT_APP_GOOGLE_REDIRECT_URI=http://localhost:3000/auth/signin?provider=google
```

#### Apple

```env
REACT_APP_APPLE_CLIENT_ID=your_apple_client_id
REACT_APP_APPLE_REDIRECT_URI=your_apple_redirect_uri
```

#### Naver

```env
REACT_APP_NAVER_CLIENT_ID=your_naver_client_id
REACT_APP_NAVER_REDIRECT_URI=http://localhost:3000
```

#### Kakao

```env
REACT_APP_KAKAO_REST_API_KEY=your_kakao_rest_api_key
REACT_APP_KAKAO_REDIRECT_URI=http://localhost:3000/auth/signin?provider=kakao
```

#### LINE

```env
REACT_APP_LINE_CLIENT_ID=your_line_client_id
REACT_APP_LINE_REDIRECT_URI=http://localhost:3000/auth/signin?provider=line
```

## 🌐 지원하는 소셜 서비스

| 서비스     | OAuth 버전 | 지원 기능      | 아이콘 |
| ---------- | ---------- | -------------- | ------ |
| **Google** | OAuth 2.0  | 이메일, 프로필 | ✅     |
| **Apple**  | OAuth 2.0  | 이메일, 이름   | ✅     |
| **Naver**  | OAuth 2.0  | 이메일, 프로필 | ✅     |
| **Kakao**  | OAuth 2.0  | 이메일, 프로필 | ✅     |
| **LINE**   | OAuth 2.0  | 이메일, 프로필 | ✅     |

## 🏗️ 아키텍처

```
abc-waas-prebuiltui-sdk/
├── src/
│   ├── index.ts                 # 메인 진입점
│   ├── components/
│   │   └── Login.tsx            # 소셜 로그인 UI 컴포넌트
│   ├── utilities/
│   │   ├── google.ts            # Google OAuth 유틸리티
│   │   ├── apple.ts             # Apple OAuth 유틸리티
│   │   ├── naver.ts             # Naver OAuth 유틸리티
│   │   ├── kakao.ts             # Kakao OAuth 유틸리티
│   │   └── line.ts              # LINE OAuth 유틸리티
│   ├── assets/
│   │   ├── icons/
│   │   │   └── providers/       # 소셜 서비스 아이콘들
│   │   └── animations/
│   │       └── common/          # 로딩 애니메이션
│   └── types/
│       └── svg.d.ts             # SVG 타입 정의
├── dist/                        # 빌드 결과물
├── package.json                 # 프로젝트 설정
├── tsup.config.ts              # 빌드 설정
└── tsconfig.json               # TypeScript 설정
```

### 의존성 구조

```
abc-waas-prebuiltui-sdk
├── AbcWaasProvider (Core SDK Provider 래핑)
├── Login (소셜 로그인 UI 컴포넌트)
├── useAbcWaas (Core SDK 훅 재export)
└── AbcWaasConfigType (설정 타입)
```

## 🛠️ 개발 가이드

### 개발 환경 설정

```bash
# 저장소 클론
git clone <repository-url>
cd abc-waas-prebuiltui-sdk

# 의존성 설치
npm install

# 개발 모드 (파일 감시)
npm run dev

# 빌드
npm run build
```

### 빌드 설정

이 프로젝트는 `tsup`을 사용하여 빌드됩니다:

- **ESM & CJS**: 최대 호환성을 위해 두 가지 모듈 형식 모두 지원
- **TypeScript**: 완전한 타입 정의 포함
- **Tree Shaking**: 사용되지 않는 코드 제거
- **SVG 처리**: SVG 파일을 data URL로 변환
- **정적 파일**: assets 폴더의 파일들을 dist로 복사

### 개발 시 주의사항

1. **환경 변수**: 모든 OAuth2 Provider 설정이 필요합니다
2. **타입 안전성**: TypeScript를 사용하여 타입 안전성 보장
3. **번들 크기**: React는 external로 설정하여 번들 크기 최적화
4. **호환성**: React 18+ 지원

### 테스트

```bash
# 빌드 테스트
npm run build

# 타입 체크
npx tsc --noEmit
```

## 📦 배포

```bash
# 빌드
npm run build

# npm 배포
npm publish
```

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 📞 지원

- **이메일**: dev.pyoungwoo@gmail.com
- **GitHub Issues**: [이슈 등록](https://github.com/your-repo/issues)

## 🔄 변경 로그

### v0.1.1

- Core SDK Provider 래핑 구조로 변경
- 불필요한 상태 동기화 로직 제거
- 성능 최적화

### v0.1.0

- 초기 릴리즈
- 기본 소셜 로그인 기능 구현
- 5개 소셜 서비스 지원 (Google, Apple, Naver, Kakao, LINE)

---

**ABC WaaS Prebuilt UI SDK** - ABC WaaS를 위한 완벽한 소셜 로그인 솔루션 🚀
