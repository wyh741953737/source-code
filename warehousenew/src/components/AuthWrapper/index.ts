import NoPermisson from '../NoPermisson';
import { hasAuth } from '@cckj/cj-authority';

const Authorized = ({ children, route }: any) => {
  // 一般路由的code必须要写，如果不需要权限就不要写code，就不会控制权限
  if (!route?.code || hasAuth(route?.code)) {
    return <div>{children}</div>;
  }
  return <NoPermisson />;
};

export default Authorized;
