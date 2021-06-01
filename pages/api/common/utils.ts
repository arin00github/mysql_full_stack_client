import CryptoJS from "crypto-js";
import jwt_decode from "jwt-decode";
import { IJwt } from "../../../src/interface/common-interface";

export default class Utils {
  public static asyncTimeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  public static isIterable(obj: any): boolean {
    if (obj == null) {
      return false;
    }
    return typeof obj[Symbol.iterator] === "function";
  }
  /**
   *
   * @param params 키/값으로 이루어진 HTTP get parameter 로 전환할 객체 맵
   * @returns 생성된 값이 있을 경우 "?"으로 시작하는 get parameter 를 리턴한다.
   */

  public static makeHttpGetParameter(
    params: { key: string; value?: string }[]
  ): string {
    let paramString = "";

    params.forEach((item) => {
      paramString += `${paramString.length > 0 ? "&" : ""}${encodeURIComponent(
        item.key
      )}=${encodeURIComponent(item.value)}`;
    });

    return paramString.length > 0 ? `${paramString}` : "";
  }

  /**
   * 시간값을 받아서 시간을 반환하는 함수
   * @param num :second time
   * @returns 변환된 시간 00분 00초를 리턴한다.
   */
  public static changeSec(num: number) {
    let time;

    const hour = Math.floor(num / 3600);
    const min = Math.floor((num % 3600) / 60);
    const sec = num - hour * 3600 - min * 60;
    if (min === 0) {
      time = `${sec}초`;
    } else {
      time = `${min}분 ${sec}초`;
    }

    return time;
  }
  /**
   * keycloak 토큰을 받아서 Authorizion을 반환하는 함수
   * @param token keycloak token
   * @returns Bearer + token 을 리턴한다.
   */

  static getAuthorization(token: string | undefined) {
    return `Bearer ${token}`;
  }

  /**
   * body의 길이를 반환하는 삼수
   * @param body
   * @returns body의 길이를 구해서 number를 리턴한다.
   */

  static getBodyLength(body: any) {
    let bodyLength;
    if (body === null || body === undefined) {
      bodyLength = "";
    } else {
      bodyLength = unescape(encodeURIComponent(body)).length;
    }
    return bodyLength;
  }

  /**
   * decode jwt object를 반환하는 함수
   * @param decodeJwt decode된 jwt
   * @returns decode jwt object를 반환
   */

  static getDecodeJWT(decodeJwt: IJwt) {
    const jwt = decodeJwt;
    return jwt;
  }

  /**
   * keycloak Token 받아서 Authorizion을 반환 하는 함수
   * @param method: [GET,POST,DELETE,PUT], url: url path , body: {body} token: keycloak jWT token
   * @returns  Bearer + token 을 리턴 한다
   * 토큰 만드는데 필요한것
   * ${reqMethod}\n${reqContentType}\n${reqContentLength}\n${reqDate}\n${reqVersion}\n${reqUser}\n${reqPath}\n${reqRealm}
   */

  static getAuthToken(
    method: string,
    body: string,
    url: string,
    token: string | undefined,
    date?: string
  ): any {
    const bodyLength = this.getBodyLength(body);
    let reqDate;
    if (date) {
      reqDate = date;
    } else {
      reqDate = new Date().toUTCString();
    }
    const reqVersion = process.env.REACT_APP_X_API_VERSION;
    let reqContentType;
    if (method === "GET" || !body) {
      reqContentType = "";
    } else {
      reqContentType = process.env.REACT_APP_CONTENT_TYPE;
    }
    let deJwt: any;
    if (token != null) deJwt = jwt_decode(token);
    const reqPath = url;
    const deJWT = this.getDecodeJWT(deJwt);
    const reqRealm = deJWT.azp;
    const jwtJTI = deJWT.jti;
    const reqUser = deJWT.preferred_username;

    const stringToSign = `${method}\n${reqContentType}\n${bodyLength}\n${reqDate}\n${reqVersion}\n${reqUser}\n${reqPath}\n${reqRealm}`;
    const reqHash = CryptoJS.HmacSHA256(stringToSign, jwtJTI);
    const reqHashString = CryptoJS.enc.Base64.stringify(reqHash);
    const reqAuth = `${reqUser}:${reqHashString}`;
    return reqAuth;
  }

  /**
   * Header 를 반환 하는 함수
   * @param  method: string,
   url: string,
   body: any,
   token: string | undefined
   * @returns  headers 를 리턴 한다
   */

  public static makeHeaders(
    method: string,
    url: string,
    body: any,
    token: string | undefined
  ): any {
    const authorization = this.getAuthorization(token);
    const reqVersion = process.env.REACT_APP_X_API_VERSION
      ? process.env.REACT_APP_X_API_VERSION
      : "";
    const reqDate = new Date().toUTCString();
    let reqContentType;
    if (method === "GET" || !body) {
      reqContentType = "";
    } else {
      reqContentType = process.env.REACT_APP_CONTENT_TYPE;
    }
    const xAuthToken = this.getAuthToken(method, url, body, token);
    let deJwt: any;
    if (token !== null) deJwt = jwt_decode(token);
    const reqRealm = this.getDecodeJWT(deJwt).azp;
    const headers = {
      authorization: authorization,
      "x-auth-token": xAuthToken,
      "x-api-version": reqVersion,
      "Content-Type": reqContentType,
      "x-date": reqDate,
      "x-auth-realm": reqRealm,
    };

    return headers;
  }

  /**
   * 무인증 구간에서 Authorizion을 반환 하는 함수
   * @param method: [GET,POST,DELETE,PUT], url: url path , body: {body}
   * @returns  Bearer + token 을 리턴 한다
   * 토큰 만드는데 필요한것
   * ${reqMethod}\n${reqContentType}\n${reqContentLength}\n${reqDate}\n${reqVersion}\n${reqUser}\n${reqPath}\n${reqRealm}
   */

  static getNonAuthToken(
    method: string,
    url: string,
    body: any,
    realm: string
  ): any {
    const bodyLength = this.getBodyLength(body);
    const reqDate = new Date().toUTCString();
    const reqVersion = process.env.REACT_APP_X_API_VERSION;
    let reqContentType;
    if (method === "GET" || !body) {
      reqContentType = "";
    } else {
      reqContentType = process.env.REACT_APP_CONTENT_TYPE;
    }

    const reqPath = url;
    const reqRealm = realm;
    const stringToSign = `${method}\n${reqContentType}\n${bodyLength}\n${reqDate}\n${reqVersion}\n${reqPath}\n${reqRealm}`;
    const reqHash = CryptoJS.HmacSHA256(stringToSign, reqDate);
    const reqHashString = CryptoJS.enc.Base64.stringify(reqHash);
    const reqAuth = `${reqDate}:${reqHashString}`;
    return reqAuth;
  }

  /**
   * 무인증 처리 구간에서 Header 를 반환 하는 함수
   * @param  method: string,
   url: string,
   body: any,
   token: string | undefined
   * @returns  headers 를 리턴 한다
   */

  public static nonAuthMakeHeaders(
    method: string,
    url: string,
    body: any,
    realm: string
  ): any {
    const reqVersion = process.env.NEXT_APP_X_API_VERSION
      ? process.env.NEXT_APP_X_API_VERSION
      : "";
    const reqDate = new Date().toUTCString();
    let reqContentType;
    if (method === "GET" || !body) {
      reqContentType = "";
    } else {
      reqContentType = process.env.NEXT_APP_CONTENT_TYPE;
    }
    const xAuthToken = this.getNonAuthToken(method, url, body, realm);

    const headers = {
      "x-auth-realm": realm,
      "x-auth-token": xAuthToken,
      "x-date": reqDate,
      "x-api-version": reqVersion,
      "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
    };
    return headers;
  }
}
