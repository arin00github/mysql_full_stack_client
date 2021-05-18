import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { putKeycloakTotal } from "../../redux/feature/auth";
import { keycloak } from "../utils/setting_keyclock";

export interface KeycloakProps {
  children: ReactNode;
}

export const Keycloak =
  typeof window !== "undefined" ? require("keycloak-js") : null;

export default function KeycloakComponent({ children }: KeycloakProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [keyinfo, setKeyInfo] = useState({
    keystate: null,
    authenticated: false,
  });

  const KeyclockInstance = keycloak;

  const initiateKeycloak = () => {
    if (Keycloak !== null) {
      KeyclockInstance.init({ onLoad: "login-required" })
        .then((authenticated) => {
          //console.log(authenticated);
          setKeyInfo({
            ...keyinfo,
            keystate: KeyclockInstance,
            authenticated: authenticated,
          });
          KeyclockInstance.login;
          //console.log(KeyclockInstance);
          dispatch(putKeycloakTotal(KeyclockInstance));
        })
        .catch((err) => {
          console.log(err);
          router.push({ pathname: "/404", query: { message: err } });
        });
    } else {
    }
  };

  useEffect(() => {
    initiateKeycloak();
  }, []);

  if (keyinfo.keystate) {
    if (keyinfo.authenticated) {
      return <div>{children}</div>;
    } else return <div>Unable to authenticated!!</div>;
  }

  return <div>Initialize Keyclock</div>;
}
