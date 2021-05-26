import Utils from "./utils";

type ENABLE_METHOD = "GET" | "POST" | "PUT" | "DELETE";

export class RestProcess {
  public static async executeText(
    path: string,
    method?: ENABLE_METHOD,
    body?: BodyInit | undefined,
    headers?: { [id: string]: string } | undefined
  ): Promise<string> {
    Utils.asyncTimeout(0);
    const resp = await RestProcess.doFetch(path, method, body, headers);
    return resp.text();
  }

  public static async excuteJson<T>(
    path: string,
    method: ENABLE_METHOD,
    body?: BodyInit | undefined,
    headers?: { [id: string]: string } | undefined
  ): Promise<T> {
    const resp = await RestProcess.doFetch(path, method, body, headers);

    return resp.json();
  }

  private static async doFetch(
    path: string,
    method?: ENABLE_METHOD,
    body?: BodyInit | undefined,
    headers?: { [id: string]: string } | undefined
  ): Promise<Response> {
    const resp = await fetch(path, {
      method: method || "GET",
      body,
      headers,
    });
    if (resp.status !== 200) {
      if (resp.status === 401) {
        sessionStorage.clear();
        window.location.href = "/";
      }
    }
    return resp;
  }
}
