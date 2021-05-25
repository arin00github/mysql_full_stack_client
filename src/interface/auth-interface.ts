import { KeycloakInstance } from "keycloak-js";

export interface IAuthInfo {
  isLogined: boolean;
  keycloak?: any | null;
  token?: any | null;
}
