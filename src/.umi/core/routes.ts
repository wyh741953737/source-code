// @ts-nocheck
import React from 'react';
import { ApplyPluginsType } from 'D:/project/cj/global-warehouse/node_modules/umi/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/",
    "component": require('@/layouts/index.jsx').default,
    "routes": [
      {
        "path": "/demo1",
        "exact": true,
        "component": require('@/pages/demo1/index.tsx').default
      },
      {
        "path": "/demo2",
        "exact": true,
        "component": require('@/pages/demo2/index.tsx').default
      },
      {
        "path": "/demo3",
        "exact": true,
        "component": require('@/pages/demo3/index.tsx').default
      },
      {
        "path": "/homePage",
        "exact": true,
        "component": require('@/pages/homePage/index.tsx').default
      },
      {
        "path": "/hotCategories",
        "exact": true,
        "component": require('@/pages/hotCategories/index.tsx').default
      },
      {
        "path": "/hotCategories/web",
        "exact": true,
        "component": require('@/pages/hotCategories/web.tsx').default
      },
      {
        "path": "/",
        "exact": true,
        "component": require('@/pages/index.tsx').default
      },
      {
        "path": "/StationSearchPage",
        "exact": true,
        "component": require('@/pages/StationSearchPage/index.tsx').default
      }
    ]
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
