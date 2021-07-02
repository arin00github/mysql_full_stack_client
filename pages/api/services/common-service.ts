import { ICommonCommand } from "./common-interface";
import { CommonCommand } from "./common-command";

export class CommonService {
  private static commonInstance: ICommonCommand;

  public static get instance(): ICommonCommand {
    if (!CommonService.commonInstance) {
      CommonService.commonInstance = new CommonCommand();
    }
    return CommonService.commonInstance;
  }
}
