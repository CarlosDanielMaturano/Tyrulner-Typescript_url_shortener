import 'reflect-metadata';
import AppRouter from '../Router';
import { RouteInterface } from '../interfaces/RouteInterface';
import Container from 'typedi';

function Controller(prefix: string): ClassDecorator {
  return (target: any) => {
    console.log(`Defining metadata prefix: ${prefix} on target `);
    Reflect.defineMetadata('prefix', prefix, target);
    if (!Reflect.getMetadata('routes', target)) {
      Reflect.defineMetadata('routes', [], target);
    }
    const routes: Array<RouteInterface> = Reflect.getMetadata('routes', target);
    const instace: any = Container.get(target);
    console.log(instace);
    routes.forEach((route: RouteInterface) => {
      console.log(route.target);
      AppRouter[route.method](
        `${prefix}${route.path}`,
        instace[route.target].bind(instace),
      );
      console.log(route);
    });
  };
}

export default Controller;
