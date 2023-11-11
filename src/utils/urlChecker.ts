export default class UrlChecker {
  static checkUrl(url: string): boolean {
    return URL.canParse(url);
  }
  static urlIsDown(url: string): void {}
}
