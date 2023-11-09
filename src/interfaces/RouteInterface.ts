export interface RouteInterface {
  path: string;
  method: 'get' | 'post';
  target: any;
  middlewares?: Array<any>;
}
