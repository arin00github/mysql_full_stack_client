export interface IUser {
  isLoggedIn: boolean;
  user: any;
  signUpdata?: any;
  loginData?: any;
  keycloakInfo?: Keycloak.KeycloakInstance | any;
}
