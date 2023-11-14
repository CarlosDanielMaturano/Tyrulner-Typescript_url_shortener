import { RouteInterface } from '../../interfaces/RouteInterface';

export default function defineRoute(
  target: any,
  propertyKey: string,
  path: string,
  method: 'get' | 'post',
): void {
  if (!Reflect.getMetadata('routes', target.constructor)) {
    Reflect.defineMetadata('routes', [], target.constructor);
  }
  const routes: Array<RouteInterface> = Reflect.getMetadata(
    'routes',
    target.constructor,
  );
  routes.push({
    method,
    path: path,
    target: propertyKey,
  });
}
