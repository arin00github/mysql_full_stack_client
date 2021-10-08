import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import { AppContext, AppProps } from 'next/app';
import Layout from '../src/components/Layout';

import KeycloakComponent from '../src/components/keycloakComponent';
import { wrapper } from '../redux/store';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useEffect } from 'react';
import { keycloak, checkIfUserAuthenticated } from './api/common/setting_keyclock';
import { AppContextType } from 'next/dist/next-server/lib/utils';
import { ServerProvider } from '../src/components/serverProvider';

interface InitialProps {
  cookies: unknown;
}

function MyApp({ Component, pageProps, cookies }: AppProps & InitialProps) {
  const { isServer, isAuthenticated } = pageProps;

  const dispatch = useDispatch();
  const store = useStore();
  //console.log("store", store);

  useEffect(() => {}, []);

  return (
    <ServerProvider {...{ isAuthenticated, isServer }}>
      <KeycloakComponent>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </KeycloakComponent>
    </ServerProvider>
  );
}
async function getPageProps({ Component, ctx }: AppContextType) {
  return Component.getInitialProps ? Component.getInitialProps(ctx) : {};
}

MyApp.getServerSideProps = async (appContext: AppContextType) => {
  const { isServer, isAuthenticated } = checkIfUserAuthenticated(appContext);

  return {
    pageProps: { ...getPageProps(appContext), isAuthenticated, isServer },
  };
};

export default wrapper.withRedux(MyApp);
