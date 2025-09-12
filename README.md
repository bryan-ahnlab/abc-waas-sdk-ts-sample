# ABC WaaS SDK TypeScript 샘플 프로젝트

이 프로젝트는 ABC WaaS SDK를 사용하여 다양한 인증 방식을 구현한 TypeScript React 샘플 애플리케이션입니다.

## 🎯 프로젝트 개요

ABC WaaS SDK를 활용하여 다음 네 가지 인증 방식을 구현한 샘플 프로젝트입니다:

1. **Pre-built UI SDK** - ABC WaaS Pre-built UI SDK 사용 (현재 활성화)
2. **ABC WaaS 인증** - ABC Wallet 기반 인증 (주석 처리됨)
3. **OAuth 2.0 인증** - 표준 OAuth 2.0 프로토콜 (주석 처리됨)
4. **SDK 인증** - ABC WaaS SDK 직접 사용 (주석 처리됨)

## 🛠 기술 스택

- **Frontend**: React 19.1.0, TypeScript 4.9.5
- **Routing**: React Router DOM 6.30.1
- **Authentication**:
  - `abc-waas-prebuiltui-sdk` 0.2.23 (현재 활성화)
  - `abc-waas-core-sdk` (주석 처리됨)
- **JWT 처리**: jose 6.0.12
- **Build Tool**: Create React App 5.0.1
- **Package Manager**: npm
- **개발 도구**: yalc (로컬 패키지 테스트용)

## 🚀 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env` 파일을 프로젝트 루트에 생성하고 다음 변수들을 설정하세요:

```env
REACT_APP_API_WAAS_MYABCWALLET_URI=your_waas_api_url
REACT_APP_MW_MYABCWALLET_URI=your_mw_url
REACT_APP_CLIENT_ID=your_client_id
REACT_APP_CLIENT_SECRET=your_client_secret
```

### 3. 개발 서버 실행

```bash
npm start
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 애플리케이션을 확인하세요.
Apple의 경우, ngrok 등을 통해 애플리케이션을 실행하고 콘솔에서 해당 주소를 등록하여 확인하세요.

### 4. yalc를 사용한 로컬 개발 (선택사항)

```bash
npm run start:yalc
```

## ⚙️ 환경 설정

### 필수 환경 변수

| 변수명                               | 설명                     | 필수 여부 |
| ------------------------------------ | ------------------------ | --------- |
| `REACT_APP_API_WAAS_MYABCWALLET_URI` | ABC WaaS API 엔드포인트  | ✅        |
| `REACT_APP_MW_MYABCWALLET_URI`       | MyABCWallet 미들웨어 URL | ✅        |
| `REACT_APP_CLIENT_ID`                | 클라이언트 ID            | ✅        |
| `REACT_APP_CLIENT_SECRET`            | 클라이언트 시크릿        | ✅        |

## 🔧 주요 기능

### 1. Pre-built UI SDK (현재 활성화)

- **LoginPage**: 통합 로그인 페이지
- **LogoutPage**: 로그아웃 및 사용자 정보 표시
- **자동 리다이렉트**: 로그인/로그아웃 상태에 따른 자동 페이지 이동
- **상태 관리**: useLogin, useLogout 훅을 통한 상태 관리

### 2. ABC WaaS 인증 (주석 처리됨)

- 단일 페이지 인증 (`ABCWaaSLogin`)
- 다중 페이지 인증 (`ABCWaaSRedirect` + `ABCWaaSCallback`)
- 5개 제공자 지원: Google, Apple, Kakao, Naver, LINE

### 3. OAuth 2.0 인증 (주석 처리됨)

- **지원 제공자**: Google, Apple, Kakao, Naver, LINE
- 단일/다중 페이지 지원
- 각 제공자별 유틸리티 함수 제공
- JWT 토큰 검증 (Apple, Kakao)
- 프록시를 통한 CORS 문제 해결

### 4. SDK 인증 (주석 처리됨)

- ABC WaaS SDK 직접 사용
- 로그인, 리다이렉트, 콜백 처리
- 공통 실행 컴포넌트

## 📁 프로젝트 구조

```
src/
├── components/
│   ├── LoginPage.tsx              # 메인 로그인 페이지 (Pre-built UI)
│   ├── LogoutPage.tsx             # 로그아웃 페이지 (Pre-built UI)
│   ├── abc-waas/                  # ABC WaaS 인증 컴포넌트
│   │   ├── single/                # 단일 페이지 인증
│   │   │   └── Login.tsx          # ABC WaaS 로그인 (230줄)
│   │   └── multiple/              # 다중 페이지 인증
│   │       ├── Redirect.tsx       # 리다이렉트 처리
│   │       └── Callback.tsx       # 콜백 처리
│   ├── oauth2/                    # OAuth 2.0 인증 컴포넌트
│   │   ├── single/                # 단일 페이지 인증
│   │   │   └── Login.tsx          # OAuth2 로그인
│   │   ├── multiple/              # 다중 페이지 인증
│   │   │   ├── Redirect.tsx       # 리다이렉트 처리
│   │   │   └── Callback.tsx       # 콜백 처리
│   │   └── utilities/             # OAuth 2.0 유틸리티
│   │       ├── google.ts          # Google OAuth 유틸리티 (68줄)
│   │       ├── apple.ts           # Apple OAuth 유틸리티 (134줄)
│   │       ├── kakao.ts           # Kakao OAuth 유틸리티 (102줄)
│   │       ├── naver.ts           # Naver OAuth 유틸리티 (71줄)
│   │       └── line.ts            # LINE OAuth 유틸리티 (66줄)
│   ├── sdk/                       # SDK 직접 사용 컴포넌트
│   │   ├── single/                # 단일 페이지 인증
│   │   │   └── Login.tsx          # SDK 로그인
│   │   ├── multiple/              # 다중 페이지 인증
│   │   │   ├── Redirect.tsx       # 리다이렉트 처리
│   │   │   └── Callback.tsx       # 콜백 처리
│   │   └── common/                # 공통 컴포넌트
│   │       └── Execute.tsx        # 실행 컴포넌트
│   └── common/                    # 공통 컴포넌트
│       └── Information.tsx        # 사용자 정보 표시 (70줄)
├── assets/                        # 정적 자산
│   ├── icon/                      # 아이콘
│   │   └── provider/              # 제공자 아이콘
│   │       ├── icon_google.svg    # Google 아이콘
│   │       ├── icon_apple.svg     # Apple 아이콘
│   │       ├── icon_kakao.svg     # Kakao 아이콘
│   │       ├── icon_naver.svg     # Naver 아이콘
│   │       └── icon_line.svg      # LINE 아이콘
│   └── animation/                 # 애니메이션
│       └── common/                # 공통 애니메이션
│           └── animation_loading.svg # 로딩 애니메이션
├── App.tsx                        # 메인 애플리케이션 컴포넌트 (116줄)
├── index.tsx                      # 애플리케이션 진입점 (16줄)
├── setupProxy.js                  # 개발 서버 프록시 설정 (42줄)
├── index.css                      # 전역 스타일
└── App.css                        # 앱 스타일
```

## 🔧 프록시 설정

개발 서버에서 CORS 문제를 해결하기 위해 다음 프록시가 설정되어 있습니다:

- **Naver API**: `/proxy/naver/token`, `/proxy/naver/tokeninfo`
- **Apple API**: `/proxy/apple/token`

## 📖 사용법

### 현재 활성화된 Pre-built UI 사용

```tsx
import { AbcWaasProvider } from "abc-waas-prebuiltui-sdk";
import LoginPage from "./components/LoginPage";
import LogoutPage from "./components/LogoutPage";

const config = {
  API_WAAS_MYABCWALLET_URL: process.env.REACT_APP_API_WAAS_MYABCWALLET_URI,
  MW_MYABCWALLET_URL: process.env.REACT_APP_MW_MYABCWALLET_URI,
  CLIENT_ID: process.env.REACT_APP_CLIENT_ID,
  CLIENT_SECRET: process.env.REACT_APP_CLIENT_SECRET,
};

function App() {
  return (
    <AbcWaasProvider config={config}>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
      </Routes>
    </AbcWaasProvider>
  );
}
```

### ABC WaaS Core SDK 사용 (주석 해제 필요)

```tsx
import { AbcWaasProvider } from "abc-waas-core-sdk";
import ABCWaaSLogin from "./components/abc-waas/single/Login";

const config = {
  API_WAAS_MYABCWALLET_URL: process.env.REACT_APP_API_WAAS_MYABCWALLET_URI,
  MW_MYABCWALLET_URL: process.env.REACT_APP_MW_MYABCWALLET_URI,
  CLIENT_ID: process.env.REACT_APP_CLIENT_ID,
  CLIENT_SECRET: process.env.REACT_APP_CLIENT_SECRET,
};

function App() {
  return (
    <AbcWaasProvider config={config}>
      <ABCWaaSLogin />
    </AbcWaasProvider>
  );
}
```

### OAuth 2.0 인증 사용 (주석 해제 필요)

```tsx
import OAuth2Login from "./components/oauth2/single/Login";

function App() {
  return <OAuth2Login />;
}
```

## 🔧 스크립트

| 명령어               | 설명                         |
| -------------------- | ---------------------------- |
| `npm start`          | 개발 서버 실행               |
| `npm run start:yalc` | yalc를 사용한 개발 서버 실행 |
| `npm run build`      | 프로덕션 빌드                |
| `npm test`           | 테스트 실행                  |
| `npm run eject`      | Create React App 설정 추출   |

## 📦 빌드

```bash
npm run build
```

프로덕션용 빌드가 `build` 폴더에 생성됩니다.

## 🔄 인증 플로우

### Pre-built UI 플로우 (현재 활성화)

1. **로그인 페이지** (`/`) 접근
2. **Pre-built UI 로그인 컴포넌트** 표시
3. **로그인 성공** 시 자동으로 `/logout` 페이지로 리다이렉트
4. **로그아웃 페이지**에서 사용자 정보 표시 및 로그아웃 버튼 제공
5. **로그아웃 성공** 시 자동으로 `/` 페이지로 리다이렉트

### 지원되는 OAuth 제공자

- **Google**: OAuth 2.0 + OpenID Connect
- **Apple**: OAuth 2.0 + JWT 검증 (jose 라이브러리 사용)
- **Kakao**: OAuth 2.0 + JWT 검증 (jose 라이브러리 사용)
- **Naver**: OAuth 2.0 (프록시 사용)
- **LINE**: OAuth 2.0 + OpenID Connect

## 🎨 UI/UX 특징

- **반응형 디자인**: 모바일 및 데스크톱 지원
- **일관된 스타일링**: Google Material Design 가이드라인 준수
- **로딩 상태**: 로그인/로그아웃 과정의 로딩 애니메이션
- **에러 처리**: 사용자 친화적인 에러 메시지
- **자동 리다이렉트**: 상태에 따른 자동 페이지 이동
- **사용자 정보 표시**: JSON 형태로 사용자 정보 표시

## 🔒 보안 고려사항

- **환경 변수**: 민감한 정보는 환경 변수로 관리
- **JWT 검증**: Apple, Kakao 토큰의 서명 검증 (jose 라이브러리)
- **프록시 사용**: CORS 문제 해결을 위한 프록시 설정
- **HTTPS**: 프로덕션 환경에서 HTTPS 사용 권장
- **토큰 관리**: 안전한 토큰 저장 및 관리

## 🔄 라우팅 구조

현재 애플리케이션의 라우팅 구조:

- `/` - 로그인 페이지 (LoginPage)
- `/auth/signin` - 로그인 페이지 (다양한 제공자 지원)
- `/logout` - 로그아웃 페이지 (LogoutPage)

## 📊 코드 통계

- **총 파일 수**: 약 20개 이상의 컴포넌트 파일
- **주요 컴포넌트**:
  - App.tsx: 116줄
  - ABC WaaS Login: 230줄
  - Apple OAuth 유틸리티: 134줄
  - Kakao OAuth 유틸리티: 102줄
  - Information 컴포넌트: 70줄

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 📞 지원

문제가 발생하거나 질문이 있으시면 이슈를 생성해 주세요.

## 🔄 버전 정보

- **현재 버전**: 0.1.0
- **ABC WaaS Pre-built UI SDK**: 0.2.23
- **React**: 19.1.0
- **TypeScript**: 4.9.5
- **Jose (JWT)**: 6.0.12
