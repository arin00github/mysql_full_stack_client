import Utils from "../common/utils";
import { ICommonCommand } from "../../../src/interface/common-interface";
import { Response, ResultMessage } from "../common/result-process";
import { RestProcess } from "../common/rest-process";

export class CommonCommand implements ICommonCommand {
  private server_url = "http://localhost:4200";
  private getUserListPath = `${this.server_url}/api/users/read`;
  private getCampListPath = `${this.server_url}/api/camp/read`;
  private getReviewListPath = `${this.server_url}/api/review/read`;

  private addUserPath = `${this.server_url}/api/users/add`;
  private addCampPath = `${this.server_url}/api/camp/add`;
  private addReviewPath = `${this.server_url}/api/review/add`;

  private deleteUserPath = `${this.server_url}/api/users/delete`;
  private deleteCampPath = `${this.server_url}/api/camp/delete`;
  private deleteReviewPath = `${this.server_url}/api/review/delete`;

  async getUserList(token: string): Promise<ResultMessage<any> | undefined> {
    try {
      const urlPath = `${this.getUserListPath}`;
      const method = "GET";
      const headers = Utils.nonAuthMakeHeaders(
        method,
        urlPath,
        undefined,
        token
      );
      const rlst = await RestProcess.excuteJson<ResultMessage<any>>(
        urlPath,
        method,
        undefined,
        headers
      );
      if (rlst) {
        //console.log("api result", rlst);
        return rlst;
      }
    } catch (err) {
      console.log(`error : ${err}`);
    }

    return undefined;
  }
  async getBootcampList(
    token: string
  ): Promise<ResultMessage<any> | undefined> {
    try {
      const urlPath = `${this.getCampListPath}`;
      const method = "GET";
      const headers = Utils.nonAuthMakeHeaders(
        method,
        urlPath,
        undefined,
        token
      );
      const rlst = await RestProcess.excuteJson<ResultMessage<any>>(
        urlPath,
        method,
        undefined,
        headers
      );

      if (rlst) return rlst;
    } catch (err) {
      console.log("api error", err);
    }
  }

  async getReviewList(token: string): Promise<Response<any> | undefined> {
    try {
      const urlPath = `${this.getReviewListPath}`;
      const method = "GET";
      const headers = Utils.nonAuthMakeHeaders(
        method,
        urlPath,
        undefined,
        token
      );
      const rlst = await RestProcess.excuteJson<ResultMessage<any>>(
        urlPath,
        method,
        undefined,
        headers
      );
      if (rlst) return rlst.response;
    } catch (err) {
      console.log("api error", err);
    }
  }

  async addUserList(
    user: {
      name: string;
      email: string;
      role: string;
      active: boolean;
    },
    token: string
  ): Promise<boolean> {
    try {
      console.log("user", user);
      const urlPath = `${this.addUserPath}`;
      const method = "POST";
      const body = JSON.stringify(user);
      const headers = Utils.nonAuthMakeHeaders(method, urlPath, body, token);
      const rlst = await RestProcess.excuteJson<ResultMessage<{}>>(
        urlPath,
        method,
        body,
        headers
      );
      console.log("body", body, typeof body);
      if (rlst && rlst.code === 200) return rlst.code === 200;
    } catch (err) {
      console.log("api error", err);
    }
    return false;
  }

  async addBootCampList(
    item: any,
    token: string
  ): Promise<Response<any> | undefined> {
    try {
      const urlPath = `${this.addCampPath}`;
      const method = "POST";
      const body = JSON.stringify(item);
      const headers = Utils.nonAuthMakeHeaders(method, urlPath, body, token);
      const rlst = await RestProcess.excuteJson<ResultMessage<any>>(
        urlPath,
        method,
        body,
        headers
      );
      if (rlst) return rlst.response;
    } catch (err) {
      console.log("api error", err);
    }
  }

  async addReviewList(
    item: any,
    token: string
  ): Promise<Response<any> | undefined> {
    try {
      const urlPath = `${this.addReviewPath}`;
      const method = "POST";
      const body = JSON.stringify(item);
      const headers = Utils.nonAuthMakeHeaders(method, urlPath, body, token);
      const rlst = await RestProcess.excuteJson<ResultMessage<any>>(
        urlPath,
        method,
        body,
        headers
      );
      if (rlst) return rlst.response;
    } catch (err) {
      console.log("api error", err);
    }
  }

  async deleteUserItem(token: string): Promise<Response<any> | undefined> {
    try {
      const urlPath = `${this.deleteUserPath}`;
      const method = "DELETE";
      const headers = Utils.nonAuthMakeHeaders(
        method,
        urlPath,
        undefined,
        token
      );
      const rlst = await RestProcess.excuteJson<ResultMessage<any>>(
        urlPath,
        method,
        undefined,
        headers
      );

      if (rlst) return rlst.response;
    } catch (err) {
      console.log("api error", err);
    }
  }

  async deleteCampItem(token: string): Promise<Response<any> | undefined> {
    try {
      const urlPath = `${this.deleteCampPath}`;
      const method = "DELETE";
      const headers = Utils.nonAuthMakeHeaders(
        method,
        urlPath,
        undefined,
        token
      );
      const rlst = await RestProcess.excuteJson<ResultMessage<any>>(
        urlPath,
        method,
        undefined,
        headers
      );
      if (rlst) return rlst.response;
    } catch (err) {
      console.log("api error", err);
    }
  }

  async deleteReviewItem(token: string): Promise<Response<any> | undefined> {
    try {
      const urlPath = `${this.deleteReviewPath}`;
      const method = "DELETE";
      const headers = Utils.nonAuthMakeHeaders(
        method,
        urlPath,
        undefined,
        token
      );
      const rlst = await RestProcess.excuteJson<ResultMessage<any>>(
        urlPath,
        method,
        undefined,
        headers
      );

      if (rlst) return rlst.response;
    } catch (err) {
      console.log("api error", err);
    }
  }
}
