import React from "react";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppContext, AppProps } from "next/app";
import Layout from "../src/components/Layout";

import KeycloakComponent from "../src/components/keycloakComponent";
import { wrapper } from "../redux/store";

const keycloakCfg: Keycloak.KeycloakConfig = {
  realm: "arin-world",
  url: "http://localhost:8080/auth",
  clientId: "arin-client",
};

interface InitialProps {
  cookies: unknown;
}

function MyApp({ Component, pageProps, cookies }: AppProps & InitialProps) {
  return (
    <KeycloakComponent>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </KeycloakComponent>
  );
}

export default wrapper.withRedux(MyApp);
