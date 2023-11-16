export default class UrlChecker {
  static checkUrl(url: string): boolean {
    return URL.canParse(url);
  }
  static async urlIsDown(url: string): Promise<void> {}
}
