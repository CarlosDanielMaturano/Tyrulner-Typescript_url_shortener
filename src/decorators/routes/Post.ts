import { RouteInterface } from '../../interfaces/RouteInterface';
import 'reflect-metadata';

function Post(path: string = '') {
  return (target: any, propertyKey: string): void => {
    if (!Reflect.getMetadata('routes', target.constructor)) {
      Reflect.defineMetadata('routes', [], target.constructor);
    }
    const routes: Array<RouteInterface> = Reflect.getMetadata(
      'routes',
      target.constructor,
    );
    routes.push({
      method: 'post',
      path: path,
      target: propertyKey,
    });
  };
}

export default Post;
