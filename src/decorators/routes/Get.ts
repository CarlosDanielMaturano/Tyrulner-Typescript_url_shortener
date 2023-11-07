import { RouteInterface } from '../../interfaces/RouteInterface';
import 'reflect-metadata';

function Get(path: string) {
  return (target: any, propertyKey: string): void => {
    if (!Reflect.getMetadata('routes', target.constructor)) {
      Reflect.defineMetadata('routes', [], target.constructor);
    }
    const routes: Array<RouteInterface> = Reflect.getMetadata(
      'routes',
      target.constructor,
    );
    routes.push({
      method: 'get',
      path: path,
      target: propertyKey,
    });
  };
}

export default Get;
