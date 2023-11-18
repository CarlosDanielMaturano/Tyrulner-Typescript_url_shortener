export default class UrlChecker {
  static isValid(url: string): boolean {
    return URL.canParse(url);
  }
}
