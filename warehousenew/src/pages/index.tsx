import React from 'react';
import Page from '@/components/Page';

type Routes = {
  path: string;
  exact: boolean;
  component: React.ReactNode;
  routes: Array<Routes>;
};

export default () => {
  // 生产环境不需要的路径
  // if (process.env.NODE_ENV == 'production') return null;

  // const routes = require('@@/core/routes').routes ?? [];

  // const renderRoute = (routes: Array<Routes>): any => {
  //   return routes.map((route: Routes) => {
  //     if (route?.routes && route.routes.length > 0)
  //       return renderRoute(route.routes);
  //     return (
  //       <div key={route.path}>
  //         <Link to={route.path}>{route.path}</Link>
  //         <br />
  //       </div>
  //     );
  //   });
  // };

  return (
    <Page style={{ background: 'rgba(242,247,250,1)' }}>
      <h1>请选择目录</h1>
    </Page>
  );
};
