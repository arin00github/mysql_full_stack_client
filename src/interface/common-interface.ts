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

  //부트캠프 리스트 불러오기
  getBootcampList(token?: string): Promise<any>;

  //리뷰리스트 불러오기
  getReviewList(token?: string): Promise<any>;

  //새 유저 추기
  addUserList(item?: any, token?: string): Promise<any>;

  //새 부트캠프 추가
  addBootCampList(item?: any, token?: string): Promise<any>;

  //새 리뷰추가
  addReviewList(item?: any, token?: string): Promise<any>;

  //유저 삭제
  deleteUserItem(token?: string): Promise<any>;

  //부트캠프 삭제
  deleteCampItem(token?: string): Promise<any>;

  //리뷰 삭제
  deleteReviewItem(token?: string): Promise<any>;
}
