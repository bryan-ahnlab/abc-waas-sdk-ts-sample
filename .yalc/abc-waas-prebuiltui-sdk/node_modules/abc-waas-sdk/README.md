# abc-waas-sdk

## 프로젝트 개요

**abc-waas-sdk**는 ABC WaaS(Wallet-as-a-Service)를 위한 **React/Next.js SDK**입니다. 현재 버전 `0.0.31`이며, React 애플리케이션에서 라이브러리로 사용하도록 설계되었습니다.

## 주요 기능

### 🔐 **인증 시스템**

- **SNS 로그인 지원**: 소셜 네트워크 서비스 로그인 기능 구현
- **토큰 기반 인증**: 액세스 토큰, 리프레시 토큰, 기본 인증 처리
- **회원가입**: 필요시 자동 사용자 등록 플로우

### 🛡️ **보안 기능**

- **보안 채널 통신**: P-256 타원곡선 암호화를 사용한 엔드투엔드 암호화 구현
- **AES 암호화**: 안전한 데이터 전송을 위한 AES-CBC 암호화 사용
- **키 관리**: 개인키/공개키 쌍과 공유 시크릿 처리

### 💰 **지갑 통합**

- **MPC 지갑 지원**: 다자간 계산(Multi-Party Computation) 지갑과 통합
- **지갑 관리**: 지갑 정보 생성 및 관리
- **사용자 지갑 작업**: 지갑 관련 API 호출 처리

## 아키텍처

### **핵심 컴포넌트**

- **`AbcWaasProvider`**: 전역 상태를 관리하는 React Context Provider
- **`useAbcWaas`**: SDK 기능에 접근하기 위한 메인 훅
- **`useSnsLogin`**: 소셜 로그인 작업을 위한 훅
- **`useSecureChannel`**: 보안 통신을 위한 훅

### **API 구조**

- **v2 API 엔드포인트**: 인증, 회원 관리, 지갑 작업
- **보안 채널 API**: 암호화된 통신 레이어
- **TypeScript 지원**: 완전한 타입 정의 포함

### **상태 관리**

SDK는 여러 상태를 관리합니다:

- 인증 토큰 및 사용자 데이터
- 지갑 정보
- 보안 채널 설정
- 서비스별 데이터

## 기술 스택

- **TypeScript**: 완전한 타입 안전성
- **React Hooks**: 모던 React 패턴
- **암호화**: 보안 작업을 위한 `@noble/curves`와 `@noble/hashes` 사용
- **빌드 시스템**: ESM과 CommonJS 지원을 위한 `tsup`
- **Peer Dependencies**: React 18+, React Router DOM 6.4+

## 사용 패턴

SDK는 provider 패턴을 따르며, 앱을 `AbcWaasProvider`로 감싸고 `useSnsLogin` 같은 훅을 사용하여 ABC WaaS 서비스와 상호작용합니다. 보안 지갑 작업과 인증 플로우의 복잡성을 처리하면서 깔끔한 React 인터페이스를 제공하도록 설계되었습니다.

이는 ABC의 wallet-as-a-service 플랫폼을 React 애플리케이션에 통합하기 위한 프로덕션 준비가 된 SDK로, 보안과 사용자 인증에 강한 초점을 맞추고 있습니다.

<!--  -->

## Project Overview

This is a **React/Next.js SDK** for ABC WaaS (Wallet-as-a-Service) that provides authentication and wallet functionality. It's currently at version `0.0.31` and is designed to be used as a library in React applications.

## Key Features

### 🔐 **Authentication System**

- **SNS Login Support**: Implements social network service login functionality
- **Token-based Authentication**: Handles access tokens, refresh tokens, and basic authentication
- **Member Registration**: Automatic user registration flow when needed

### 🛡️ **Security Features**

- **Secure Channel Communication**: Implements end-to-end encryption using P-256 elliptic curve cryptography
- **AES Encryption**: Uses AES-CBC encryption for secure data transmission
- **Key Management**: Handles private/public key pairs and shared secrets

### 💰 **Wallet Integration**

- **MPC Wallet Support**: Integrates with Multi-Party Computation wallets
- **Wallet Management**: Create and manage wallet information
- **User Wallet Operations**: Handle wallet-related API calls

## Architecture

### **Core Components**

- **`AbcWaasProvider`**: React Context Provider that manages global state
- **`useAbcWaas`**: Main hook for accessing SDK functionality
- **`useSnsLogin`**: Hook for social login operations
- **`useSecureChannel`**: Hook for secure communication

### **API Structure**

- **v2 API Endpoints**: Authentication, member management, and wallet operations
- **Secure Channel API**: Encrypted communication layer
- **TypeScript Support**: Full type definitions included

### **State Management**

The SDK manages several pieces of state:

- Authentication tokens and user data
- Wallet information
- Secure channel configuration
- Service-specific data

## Technical Stack

- **TypeScript**: Full type safety
- **React Hooks**: Modern React patterns
- **Cryptography**: Uses `@noble/curves` and `@noble/hashes` for secure operations
- **Build System**: `tsup` for bundling with ESM and CommonJS support
- **Peer Dependencies**: React 18+, React Router DOM 6.4+

## Usage Pattern

The SDK follows a provider pattern where you wrap your app with `AbcWaasProvider` and then use hooks like `useSnsLogin` to interact with the ABC WaaS services. It's designed to handle the complexity of secure wallet operations and authentication flows while providing a clean React interface.

This appears to be a production-ready SDK for integrating ABC's wallet-as-a-service platform into React applications, with a strong focus on security and user authentication.
