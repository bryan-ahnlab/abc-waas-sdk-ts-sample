import * as react_jsx_runtime from 'react/jsx-runtime';
import * as react from 'react';
import react__default from 'react';

interface AbcWaasConfig {
    API_WAAS_MYABCWALLET_URL: string;
    MW_MYABCWALLET_URL: string;
    CLIENT_ID: string;
    CLIENT_SECRET: string;
}

interface Props {
    config: AbcWaasConfig;
    children: react__default.ReactNode;
}
declare const AbcWaasProvider: ({ config, children }: Props) => react_jsx_runtime.JSX.Element;

interface AbcWaasContextType {
    config: AbcWaasConfig;
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

declare function useAbcWaas(): AbcWaasContextType;

declare function useSnsLogin(): {
    basicToken: string | null;
    email: string | null;
    token: string | null;
    service: string | null;
    abcAuth: any;
    abcWallet: any;
    abcUser: any;
    secureChannel: any;
    snsLoginV2: (email: string, token: string, service: string) => Promise<void>;
    loading: boolean;
    setLoading: react.Dispatch<react.SetStateAction<boolean>>;
    error: Error | null;
    setError: react.Dispatch<react.SetStateAction<Error | null>>;
};

export { type AbcWaasConfig, AbcWaasProvider, useAbcWaas, useSnsLogin };
