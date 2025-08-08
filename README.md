# ABC WaaS SDK TypeScript 샘플 프로젝트

이 프로젝트는 ABC WaaS SDK를 사용하여 다양한 인증 방식을 구현한 TypeScript React 샘플 애플리케이션입니다.

## 🎯 프로젝트 개요

ABC WaaS SDK를 활용하여 다음 세 가지 인증 방식을 구현한 샘플 프로젝트입니다:

1. **ABC WaaS 인증** - ABC Wallet 기반 인증
2. **OAuth 2.0 인증** - 표준 OAuth 2.0 프로토콜
3. **SDK 인증** - ABC WaaS SDK 직접 사용

## 🛠 기술 스택

- **Frontend**: React 19.1.0, TypeScript 4.9.5
- **Routing**: React Router DOM 6.30.1
- **Authentication**: ABC WaaS SDK 0.0.31
- **Build Tool**: Create React App 5.0.1
- **Package Manager**: npm

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

## ⚙️ 환경 설정

### 필수 환경 변수

| 변수명                               | 설명                     | 필수 여부 |
| ------------------------------------ | ------------------------ | --------- |
| `REACT_APP_API_WAAS_MYABCWALLET_URI` | ABC WaaS API 엔드포인트  | ✅        |
| `REACT_APP_MW_MYABCWALLET_URI`       | MyABCWallet 미들웨어 URL | ✅        |
| `REACT_APP_CLIENT_ID`                | 클라이언트 ID            | ✅        |
| `REACT_APP_CLIENT_SECRET`            | 클라이언트 시크릿        | ✅        |

## 🔧 주요 기능

### 1. ABC WaaS 인증

- 단일 페이지 인증 (`ABCWaaSLogin`)
- 다중 페이지 인증 (`ABCWaaSRedirect` + `ABCWaaSCallback`)

### 2. OAuth 2.0 인증

- 표준 OAuth 2.0 플로우 구현
- 단일/다중 페이지 지원
- 유틸리티 함수 제공

### 3. SDK 인증

- ABC WaaS SDK 직접 사용
- 로그인, 리다이렉트, 콜백 처리
- 공통 실행 컴포넌트

## 📁 프로젝트 구조

```
src/
├── components/
│   ├── abc-waas/          # ABC WaaS 인증 컴포넌트
│   │   ├── single/        # 단일 페이지 인증
│   │   └── multiple/      # 다중 페이지 인증
│   ├── oauth2/            # OAuth 2.0 인증 컴포넌트
│   │   ├── single/        # 단일 페이지 인증
│   │   ├── multiple/      # 다중 페이지 인증
│   │   └── utilities/     # OAuth 2.0 유틸리티
│   ├── sdk/               # SDK 직접 사용 컴포넌트
│   │   ├── single/        # 단일 페이지 인증
│   │   ├── multiple/      # 다중 페이지 인증
│   │   └── common/        # 공통 컴포넌트
│   └── common/            # 공통 컴포넌트
├── App.tsx                # 메인 애플리케이션 컴포넌트
├── index.tsx              # 애플리케이션 진입점
└── setupProxy.js          # 개발 서버 프록시 설정
```

## 📖 사용법

### ABC WaaS 인증 사용

```tsx
import { AbcWaasProvider } from "abc-waas-sdk";
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

### OAuth 2.0 인증 사용

```tsx
import OAuth2Login from "./components/oauth2/single/Login";

function App() {
  return <OAuth2Login />;
}
```

### SDK 직접 사용

```tsx
import SDKLogin from "./components/sdk/single/Login";

function App() {
  return <SDKLogin />;
}
```

## 🔧 스크립트

| 명령어               | 설명                                 |
| -------------------- | ------------------------------------ |
| `npm start`          | 개발 서버 실행                       |
| `npm run start:yalc` | Yalc을 사용한 로컬 SDK 테스트        |
| `npm run build`      | 프로덕션 빌드                        |
| `npm test`           | 테스트 실행                          |
| `npm run eject`      | CRA 설정 추출 (주의: 되돌릴 수 없음) |

## 📦 빌드

```bash
npm run build
```

프로덕션용 빌드가 `build` 폴더에 생성됩니다.

## 🤝 기여하기

1. 이 저장소를 포크하세요
2. 기능 브랜치를 생성하세요 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋하세요 (`git commit -m 'Add some amazing feature'`)
4. 브랜치에 푸시하세요 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성하세요

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 📞 지원

문제가 발생하거나 질문이 있으시면 이슈를 생성해 주세요.

---

**ABC WaaS SDK TypeScript 샘플 프로젝트** - ABC WaaS 연동을 쉽게 구현할 수 있도록 도와주는 샘플 애플리케이션입니다.
