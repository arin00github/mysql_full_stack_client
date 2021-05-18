import { KeycloakInstance } from "keycloak-js";

const Keycloak = typeof window !== "undefined" ? require("keycloak-js") : null;

let keyClockConfig: Keycloak.KeycloakConfig = {
  realm: "arin-world",
  url: "http://localhost:8080/auth",
  clientId: "arin-client",
};

export const keycloak: KeycloakInstance =
  Keycloak !== null ? Keycloak(keyClockConfig) : null;
