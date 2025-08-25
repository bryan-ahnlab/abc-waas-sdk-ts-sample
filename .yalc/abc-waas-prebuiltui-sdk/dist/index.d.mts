import * as react_jsx_runtime from 'react/jsx-runtime';
import React from 'react';

interface AbcWaasConfig {
    API_WAAS_MYABCWALLET_URL: string;
    MW_MYABCWALLET_URL: string;
    CLIENT_ID: string;
    CLIENT_SECRET: string;
}

interface Props {
    config: AbcWaasConfig;
    children: React.ReactNode;
}
declare const AbcWaasProvider: ({ config, children }: Props) => react_jsx_runtime.JSX.Element;

declare function Login(): react_jsx_runtime.JSX.Element;

export { type AbcWaasConfig, AbcWaasProvider, Login };
