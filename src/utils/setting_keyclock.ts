import { KeycloakInstance } from "keycloak-js";

const Keycloak = typeof window !== "undefined" ? require("keycloak-js") : null;

let keyClockConfig: Keycloak.KeycloakConfig = {
  realm: "coffee",
  url: "http://localhost:8080/auth",
  clientId: "latte-client",
};

export const keycloak: KeycloakInstance =
  Keycloak !== null ? Keycloak(keyClockConfig) : null;
