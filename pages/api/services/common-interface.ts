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

  //로그인 아이디의 부트캠프 리스트 찾기
  findCampList(send: { userId: number }, token?: string): Promise<any>;

  //부트캠프 리스트 불러오기
  getBootcampList(token?: string): Promise<any>;

  //리뷰리스트 불러오기
  getReviewList(token?: string): Promise<any>;

  //새 유저 추기
  addUserList(
    user: {
      name: string;
      email: string;
      role: string;
      active: boolean;
    },
    token?: string
  ): Promise<any>;

  //새 부트캠프 추가
  addBootCampList(item?: any, token?: string): Promise<any>;

  //새 리뷰추가
  addReviewList(item?: any, token?: string): Promise<any>;

  //유저 삭제
  deleteUserItem(name: string, token?: string): Promise<any>;

  //부트캠프 삭제
  deleteCampItem(token?: string): Promise<any>;

  //리뷰 삭제
  deleteReviewItem(token?: string): Promise<any>;

  //전국 지도 불러오기
  downloadGeojsonFile(token?: string): Promise<any>;

  //세부 지도 불러오기
  downloadSmGeojson(sending: { name?: string }, token?: string): Promise<any>;

  //mssql 데이터 schema 불러오기
  schemaRead(sending: { name?: string }, token?: string): Promise<any>;

  //mssql 특정 schema 특정 table  내용 불러오기
  tableInfoRead(sending: { tableName?: string }, token?: string): Promise<any>;
}
