import React from 'react';
import Head from "next/head";
import {UserProvider} from '@auth0/nextjs-auth0/client';

import {NextUIProvider} from "@nextui-org/react";

import Layout from '../components/Layout';
// add bootstrap css
import 'bootstrap/dist/css/bootstrap.css'
import '@fortawesome/fontawesome-svg-core/styles.css';
import initFontAwesome from '../utils/initFontAwesome';
import '../styles/globals.css';

initFontAwesome();

export default function App({Component, pageProps}) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Fire Fly</title>
            </Head>
            <UserProvider>
                <NextUIProvider>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </NextUIProvider>
            </UserProvider>
        </>
    );
}
