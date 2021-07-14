// @ts-nocheck
import React from 'react';
import { MicroApp } from 'umi';

export function getMicroAppRouteComponent(opts: {
  appName: string;
  base: string;
  masterHistoryType: string;
  routeProps?: any;
}) {
  const { base, masterHistoryType, appName, routeProps } = opts;
  const RouteComponent = ({ match }: any) => {
    const { url } = match;

    // 默认取静态配置的 base
    let umiConfigBase = base === '/' ? '' : base;


    const runtimeMatchedBase =
      umiConfigBase + (url.endsWith('/') ? url.substr(0, url.length - 1) : url);

    const componentProps = {
      name: appName,
      base: runtimeMatchedBase,
      history: masterHistoryType,
      ...routeProps,
    };
    return React.createElement(MicroApp, componentProps);
  };

  return RouteComponent;
}
