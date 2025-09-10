# ABC WaaS Prebuilt UI SDK

[![npm version](https://badge.fury.io/js/abc-waas-prebuiltui-sdk.svg)](https://badge.fury.io/js/abc-waas-prebuiltui-sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18+-61dafb.svg)](https://reactjs.org/)

ABC WaaS SDK를 위한 미리 만들어진 UI 컴포넌트 라이브러리입니다. `abc-waas-core-sdk`의 모든 기능을 포함하며, 별도로 `abc-waas-core-sdk`를 설치할 필요가 없습니다.

## ✨ 주요 기능

- 🔐 **5개 소셜 로그인 지원**: Google, Apple, Naver, Kakao, LINE
- 🎨 **완성된 UI 컴포넌트**: 별도 스타일링 없이 바로 사용 가능
- 📱 **반응형 디자인**: 모바일과 데스크톱 모두 지원
- 🚀 **TypeScript 지원**: 완벽한 타입 안전성
- 🔧 **간편한 설정**: 환경 변수만으로 모든 기능 사용 가능
- 📦 **번들 최적화**: Tree shaking과 코드 분할 지원
- 🌐 **크로스 브라우저 호환성**: 모든 브라우저에서 안전하게 작동
- 🔒 **보안 강화**: 암호학적으로 안전한 UUID 생성

## 📋 목차

- [설치](#설치)
- [빠른 시작](#빠른-시작)
- [사용법](#사용법)
- [API Reference](#api-reference)
- [환경 변수 설정](#환경-변수-설정)
- [지원하는 소셜 서비스](#지원하는-소셜-서비스)
- [아키텍처](#아키텍처)
- [개발 가이드](#개발-가이드)
- [문제 해결](#문제-해결)
- [라이선스](#라이선스)

## 🚀 설치

```bash
npm install abc-waas-prebuiltui-sdk
```

또는

```bash
yarn add abc-waas-prebuiltui-sdk
```

또는

```bash
pnpm add abc-waas-prebuiltui-sdk
```

## ⚡ 빠른 시작

### 1. 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음 환경 변수를 설정하세요:

```env
# ABC WaaS API (Required)
REACT_APP_API_WAAS_MYABCWALLET_URI=https://dev-api.waas.myabcwallet.com
REACT_APP_MW_MYABCWALLET_URI=https://mw.myabcwallet.com
REACT_APP_CLIENT_ID=your_client_id_here
REACT_APP_CLIENT_SECRET=your_client_secret_here

# OAuth2 Providers
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id_here
REACT_APP_GOOGLE_CLIENT_SECRET=your_google_client_secret_here
REACT_APP_GOOGLE_REDIRECT_URI=http://localhost:3000/auth/signin?provider=google

REACT_APP_APPLE_CLIENT_ID=your_apple_client_id_here
REACT_APP_APPLE_REDIRECT_URI=your_apple_redirect_uri_here
REACT_APP_APPLE_TEAM_ID=your_apple_team_id_here
REACT_APP_APPLE_KEY_ID=your_apple_key_id_here
REACT_APP_APPLE_PRIVATE_KEY=your_apple_private_key_here

REACT_APP_NAVER_CLIENT_ID=your_naver_client_id_here
REACT_APP_NAVER_CLIENT_SECRET=your_naver_client_secret_here
REACT_APP_NAVER_REDIRECT_URI=http://localhost:3000

REACT_APP_KAKAO_REST_API_KEY=your_kakao_rest_api_key_here
REACT_APP_KAKAO_REDIRECT_URI=http://localhost:3000/auth/signin?provider=kakao

REACT_APP_LINE_CLIENT_ID=your_line_client_id_here
REACT_APP_LINE_CLIENT_SECRET=your_line_client_secret_here
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
  API_WAAS_MYABCWALLET_URL: "https://dev-api.waas.myabcwallet.com",
  MW_MYABCWALLET_URL: "https://mw.myabcwallet.com",
  CLIENT_ID: "your_client_id_here",
  CLIENT_SECRET: "your_client_secret_here",
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
  const { loginV2 } = useAbcWaas();

  const handleSnsLogin = async (
    email: string,
    token: string,
    provider: string
  ) => {
    try {
      await loginV2(email, token, provider);
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
  loginV2: (email: string, token: string, provider: string) => Promise<void>,
} = useAbcWaas();
```

## 🔧 환경 변수 설정

### 필수 환경 변수

| 변수명                               | 설명                       | 예시                                   |
| ------------------------------------ | -------------------------- | -------------------------------------- |
| `REACT_APP_API_WAAS_MYABCWALLET_URI` | ABC WaaS API 서버 URL      | `https://dev-api.waas.myabcwallet.com` |
| `REACT_APP_MW_MYABCWALLET_URI`       | ABC WaaS MW 서버 URL       | `https://mw.myabcwallet.com`           |
| `REACT_APP_CLIENT_ID`                | ABC WaaS 클라이언트 ID     | `your_client_id_here`                  |
| `REACT_APP_CLIENT_SECRET`            | ABC WaaS 클라이언트 시크릿 | `your_client_secret_here`              |

### OAuth2 Provider 환경 변수

#### Google

```env
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id_here
REACT_APP_GOOGLE_CLIENT_SECRET=your_google_client_secret_here
REACT_APP_GOOGLE_REDIRECT_URI=http://localhost:3000/auth/signin?provider=google
```

#### Apple

```env
REACT_APP_APPLE_CLIENT_ID=your_apple_client_id_here
REACT_APP_APPLE_REDIRECT_URI=your_apple_redirect_uri_here
REACT_APP_APPLE_TEAM_ID=your_apple_team_id_here
REACT_APP_APPLE_KEY_ID=your_apple_key_id_here
REACT_APP_APPLE_PRIVATE_KEY=your_apple_private_key_here
```

#### Naver

```env
REACT_APP_NAVER_CLIENT_ID=your_naver_client_id_here
REACT_APP_NAVER_CLIENT_SECRET=your_naver_client_secret_here
REACT_APP_NAVER_REDIRECT_URI=http://localhost:3000
```

#### Kakao

```env
REACT_APP_KAKAO_REST_API_KEY=your_kakao_rest_api_key_here
REACT_APP_KAKAO_REDIRECT_URI=http://localhost:3000/auth/signin?provider=kakao
```

#### LINE

```env
REACT_APP_LINE_CLIENT_ID=your_line_client_id_here
REACT_APP_LINE_CLIENT_SECRET=your_line_client_secret_here
REACT_APP_LINE_REDIRECT_URI=http://localhost:3000/auth/signin?provider=line
```

## 🌐 지원하는 소셜 서비스

| 서비스     | OAuth 버전 | 지원 기능      | 아이콘 | 상태 |
| ---------- | ---------- | -------------- | ------ | ---- |
| **Google** | OAuth 2.0  | 이메일, 프로필 | ✅     | 🟢   |
| **Apple**  | OAuth 2.0  | 이메일, 이름   | ✅     | 🟢   |
| **Naver**  | OAuth 2.0  | 이메일, 프로필 | ✅     | 🟢   |
| **Kakao**  | OAuth 2.0  | 이메일, 프로필 | ✅     | 🟢   |
| **LINE**   | OAuth 2.0  | 이메일, 프로필 | ✅     | 🟢   |

## 🏗️ 아키텍처

```
abc-waas-prebuiltui-sdk/
├── src/
│   ├── index.ts                 # 메인 진입점 및 export
│   ├── components/
│   │   └── Login.tsx            # 소셜 로그인 UI 컴포넌트
│   ├── utilities/
│   │   ├── common.ts            # UUID 생성 및 공통 유틸리티
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

### 기술 스택

- **언어**: TypeScript 5.7.3
- **프레임워크**: React 18+
- **빌드 도구**: tsup
- **패키지 관리**: npm/yarn/pnpm
- **코어 SDK**: abc-waas-core-sdk
- **암호화**: jose
- **UUID 생성**: 크로스 브라우저 호환성을 위해 폴백 시스템 구현

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
5. **SVG 파일**: assets 폴더의 SVG 파일들은 자동으로 dist로 복사됩니다
6. **UUID 생성**: 크로스 브라우저 호환성을 위해 폴백 시스템 구현

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

## 🔍 문제 해결

### 일반적인 문제들

#### 1. OAuth 리다이렉트 오류

**문제**: OAuth 인증 후 리다이렉트가 제대로 작동하지 않음

**해결 방법**:

- 환경 변수의 리다이렉트 URI가 정확한지 확인
- OAuth Provider 설정에서 리다이렉트 URI가 등록되어 있는지 확인
- 브라우저 콘솔에서 에러 메시지 확인

#### 2. 타입 에러

**문제**: TypeScript 컴파일 에러

**해결 방법**:

```bash
# 타입 체크
npx tsc --noEmit

# 의존성 재설치
rm -rf node_modules package-lock.json
npm install
```

#### 3. 빌드 실패

**문제**: `npm run build` 실행 시 에러

**해결 방법**:

```bash
# 캐시 정리
npm run build -- --clean

# TypeScript 설정 확인
npx tsc --showConfig
```

#### 4. 환경 변수 인식 안됨

**문제**: 환경 변수가 제대로 로드되지 않음

**해결 방법**:

- `.env` 파일이 프로젝트 루트에 있는지 확인
- 환경 변수명이 `REACT_APP_`으로 시작하는지 확인
- 개발 서버 재시작

#### 5. 모바일 브라우저에서 crypto.randomUUID 오류

**문제**: 모바일 브라우저에서 `crypto.randomUUID is not a function` 에러 발생

**해결 방법**:

- SDK v0.2.6+ 버전 사용 (자동으로 해결됨)
- 또는 수동으로 UUID 유틸리티 함수 사용:

```typescript
import { generateUUID } from "abc-waas-prebuiltui-sdk";

// crypto.randomUUID() 대신 사용
const state = generateUUID();
```

#### 6. UUID 생성 실패

**문제**: UUID 생성이 제대로 작동하지 않음

**해결 방법**:

```typescript
import { generateUUID } from "abc-waas-prebuiltui-sdk";

// 브라우저 환경 진단
console.log("crypto 지원:", typeof crypto !== "undefined");
console.log("randomUUID 지원:", typeof crypto?.randomUUID !== "undefined");
console.log(
  "getRandomValues 지원:",
  typeof crypto?.getRandomValues !== "undefined"
);

// UUID 생성 테스트
try {
  const uuid = generateUUID();
  console.log("생성된 UUID:", uuid);
} catch (error) {
  console.error("UUID 생성 실패:", error);
}
```

### 디버깅 팁

1. **브라우저 콘솔**: OAuth 에러와 네트워크 요청 확인
2. **환경 변수**: `console.log(process.env)`로 확인
3. **네트워크 탭**: OAuth 요청/응답 확인
4. **로컬 스토리지**: OAuth state 값 확인
5. **UUID 생성**: `generateUUID()` 함수의 각 단계별 동작 확인

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### 기여 가이드라인

- 코드 스타일: Prettier + ESLint 준수
- 커밋 메시지: Conventional Commits 형식
- 테스트: 새로운 기능에 대한 테스트 코드 작성
- 문서: API 변경 시 README 업데이트

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 📞 지원

- **이메일**: dev.pyoungwoo@gmail.com
- **GitHub Issues**: [이슈 등록](https://github.com/your-repo/issues)
- **문서**: [API 문서](https://docs.example.com)

## 🔄 변경 로그

### v0.2.6 (현재)

- **모바일 브라우저 호환성 대폭 개선**: `crypto.randomUUID` 폴백 시스템 구현
- **UUID 유틸리티 추가**: `generateUUID()` 함수로 크로스 브라우저 호환성 보장
- **3단계 폴백 시스템**: crypto.randomUUID → crypto.getRandomValues → Math.random
- **에러 처리 강화**: 각 단계별 try-catch로 안정성 향상
- **TypeScript 5.7.3** 지원
- **React 18+** 호환성 개선
- **번들 최적화** 및 Tree shaking 개선
- **SVG 파일 처리** 개선

### v0.2.5

- 모바일 브라우저 호환성 개선
- UUID 유틸리티 추가

### v0.2.4

- TypeScript 5.7.3 지원
- React 18+ 호환성 개선
- 번들 최적화 및 Tree shaking 개선
- SVG 파일 처리 개선

### v0.2.2

- Core SDK 의존성 업데이트
- 성능 최적화

### v0.2.0

- 새로운 아키텍처 적용
- Core SDK Provider 래핑 구조로 변경
- 불필요한 상태 동기화 로직 제거

### v0.1.0

- 초기 릴리즈
- 기본 소셜 로그인 기능 구현
- 5개 소셜 서비스 지원 (Google, Apple, Naver, Kakao, LINE)

## 🚀 로드맵

- [ ] **v0.3.0**: 추가 소셜 로그인 Provider 지원
- [ ] **v0.4.0**: 테마 커스터마이징 기능
- [ ] **v0.5.0**: 다국어 지원
- [ ] **v1.0.0**: 안정화 및 프로덕션 준비

## 🔒 보안 및 호환성

### UUID 생성 보안 수준

| 단계      | 방법                       | 보안 수준     | 지원 브라우저                                 |
| --------- | -------------------------- | ------------- | --------------------------------------------- |
| **1단계** | `crypto.randomUUID()`      | 🔒🔒🔒 (최고) | Chrome 92+, Firefox 95+, Safari 15+, Edge 92+ |
| **2단계** | `crypto.getRandomValues()` | 🔒🔒 (높음)   | 대부분의 현대 브라우저                        |
| **3단계** | `Math.random()`            | 🔒 (낮음)     | 모든 브라우저                                 |

### 브라우저 호환성

- **데스크톱**: Chrome, Firefox, Safari, Edge (모든 버전)
- **모바일**: iOS Safari, Android Chrome, Samsung Internet
- **WebView**: Android WebView, iOS WKWebView
- **구형 브라우저**: IE 11+ (제한적 기능)

---

**ABC WaaS Prebuilt UI SDK** - ABC WaaS를 위한 완벽한 소셜 로그인 솔루션 🚀

> 💡 **팁**: 이 SDK는 `abc-waas-core-sdk`의 모든 기능을 포함하고 있어 별도 설치가 필요하지 않습니다!
>
> 🔒 **보안**: 크로스 브라우저 호환성을 위한 3단계 폴백 시스템으로 모든 환경에서 안전하게 작동합니다!
