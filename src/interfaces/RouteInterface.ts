export interface RouteInterface {
  path: string;
  method: 'get' | 'post' | 'put' | 'delete';
  target: any;
  middlewares?: Array<any>;
}
