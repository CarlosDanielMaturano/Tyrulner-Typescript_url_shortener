import 'reflect-metadata';
import defineRoute from './DefineRoute';

function Post(path: string = '') {
  return (target: any, propertyKey: string): void => {
    return defineRoute(target, propertyKey, path, 'post');
  };
}

export default Post;
