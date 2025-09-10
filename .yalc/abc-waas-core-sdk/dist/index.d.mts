import * as react_jsx_runtime from 'react/jsx-runtime';
import React, { ReactNode } from 'react';

interface AbcWaasConfigType {
    API_WAAS_MYABCWALLET_URL: string;
    MW_MYABCWALLET_URL: string;
    CLIENT_ID: string;
    CLIENT_SECRET: string;
}

interface Props {
    config: AbcWaasConfigType;
    children: ReactNode;
}
declare const AbcWaasProvider: ({ config, children }: Props) => react_jsx_runtime.JSX.Element;

interface AbcWaasContextType {
    config: AbcWaasConfigType;
    basicToken: string | null;
    setBasicToken: (basicToken: string | null) => void;
    email: string | null;
    setEmail: (email: string | null) => void;
    token: string | null;
    setToken: (token: string | null) => void;
    service: string | null;
    setService: (service: string | null) => void;
    abcAuth: any;
    setAbcAuth: (abcAuth: any) => void;
    abcWallet: any;
    setAbcWallet: (abcWallet: any) => void;
    abcUser: any;
    setAbcUser: (abcUser: any) => void;
    secureChannel: any;
    setSecureChannel: (secureChannel: any) => void;
}

type UseLoginStatusType = "IDLE" | "LOADING" | "SUCCESS" | "FAILURE";
type UseLogoutStatusType = "IDLE" | "LOADING" | "SUCCESS" | "FAILURE";

declare function useAbcWaas(): AbcWaasContextType;

declare function useLogin(): {
    config: AbcWaasConfigType;
    basicToken: string | null;
    email: string | null;
    token: string | null;
    service: string | null;
    abcAuth: any;
    abcWallet: any;
    abcUser: any;
    secureChannel: any;
    loginV2: (email: string, token: string, service: string) => Promise<void>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    error: Error | null;
    setError: React.Dispatch<React.SetStateAction<Error | null>>;
    status: UseLoginStatusType | null;
    setStatus: React.Dispatch<React.SetStateAction<UseLoginStatusType | null>>;
};

declare function useLogout(): {
    logoutV2: () => Promise<void>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    error: Error | null;
    setError: React.Dispatch<React.SetStateAction<Error | null>>;
    status: UseLogoutStatusType | null;
    setStatus: React.Dispatch<React.SetStateAction<UseLogoutStatusType | null>>;
};

export { type AbcWaasConfigType, type AbcWaasContextType, AbcWaasProvider, type UseLoginStatusType, type UseLogoutStatusType, useAbcWaas, useLogin, useLogout };
