import { KeycloakInstance } from "keycloak-js";
export interface IJwt {
  jti: string;
  azp: string;
  preferred_username: string;
  typ: string;
}

export interface ICommonCommand {
  //유저 리스트 불러오기
  getUserList(token?: string): Promise<any>;
}
