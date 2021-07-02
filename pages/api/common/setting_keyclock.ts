import { KeycloakInstance } from "keycloak-js";
import { AppContextType } from "next/dist/next-server/lib/utils";
import { getCookie, parseCookies } from "./cookies";

const Keycloak = typeof window !== "undefined" ? require("keycloak-js") : null;

let keyClockConfig: Keycloak.KeycloakConfig = {
  realm: "frontend",
  url: "http://localhost:8080/auth",
  clientId: "arin-client",
};

export const keycloak: KeycloakInstance =
  Keycloak !== null ? Keycloak(keyClockConfig) : null;

export const checkIfUserAuthenticated = ({ ctx: { req } }: AppContextType) => {
  const isServer = Boolean(req);

  if (isServer) {
    const cookies = parseCookies(req);
    return { isServer, isAuthenticated: cookies.isAuthenticated };
  }

  return { isServer, isAuthenticated: getCookie("isAuthenticated") };
};
