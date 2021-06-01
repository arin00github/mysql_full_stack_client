import Utils from "../common/utils";
import { ICommonCommand } from "../../../src/interface/common-interface";
import { Response, ResultMessage } from "../common/result-process";
import { RestProcess } from "../common/rest-process";

export class CommonCommand implements ICommonCommand {
  private getUserPath = "http://localhost:4200/api/users/add";

  async getUserList(token: string): Promise<Response<any> | undefined> {
    try {
      const urlPath = `${this.getUserPath}`;
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
      console.log(`error : ${err}`);
    }

    return undefined;
  }
}
