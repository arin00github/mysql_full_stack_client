import React from "react";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppContext, AppProps } from "next/app";
import Layout from "../src/components/Layout";

import KeycloakComponent from "../src/components/keycloakComponent";
import wrapper, { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserAction } from "../redux/actions/users-action";
import { keycloak } from "../src/utils/setting_keyclock";

interface InitialProps {
  cookies: unknown;
}

function MyApp({ Component, pageProps, cookies }: AppProps & InitialProps) {
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  return (
    <KeycloakComponent>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </KeycloakComponent>
  );
}

export default wrapper.withRedux(MyApp);
