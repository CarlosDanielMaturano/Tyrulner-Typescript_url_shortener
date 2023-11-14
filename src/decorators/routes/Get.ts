import 'reflect-metadata';
import defineRoute from './DefineRoute';

function Get(path: string = '') {
  return (target: any, propertyKey: string): void => {
    return defineRoute(target, propertyKey, path, 'get');
  };
}

export default Get;
