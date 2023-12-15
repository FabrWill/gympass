import HttWrapper from "./http.wrapper";

export default abstract class Repository {
  protected http: HttWrapper;

  public url!: string;

  constructor(customPath?: string) {
    this.http = new HttWrapper(customPath);
  }

  protected isOK(status: number): boolean {
    return status >= 200 && status < 300;
  }
}
