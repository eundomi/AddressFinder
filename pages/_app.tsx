import type {AppProps} from "next/app";
import {ThemeProvider} from "styled-components";
import {RecoilRoot} from "recoil";
import "antd/dist/antd.css";
import {GlobalStyle} from "../styles/global-styles";
import {theme} from "../styles/theme";
import Layout from "../components/Layout";
import Script from 'next/script'

export default function App({Component, pageProps}: AppProps) {
    return (
        <>
            <Script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></Script>
            <RecoilRoot>
                <ThemeProvider theme={theme}>
                    <Layout>
                        <GlobalStyle/>
                        <Component {...pageProps} />
                    </Layout>
                </ThemeProvider>
            </RecoilRoot>
        </>
    );
}
