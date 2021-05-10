import React, { useEffect } from 'react';
import { pageLoad } from '../utils/jsTracking/index.native';
import routerJson from '../../public/lang/router.json';

let stackNavigation: any = null;
let route: any = null;

const stackNavigationComponent = (Component: any, navigationRef?: any) => (
  props: any,
) => {
  const currentPagePath =
    navigationRef && navigationRef.current
      ? navigationRef.current.getCurrentRoute().name
      : '';
  stackNavigation = props.navigation;
  useEffect(() => {
    // @ts-ignore
    const routerJsonItem = routerJson[currentPagePath];
    if (currentPagePath && routerJsonItem) {
      const { pageId } = routerJsonItem && routerJsonItem.push;

      pageLoad({
        pageId: pageId,
        eventId: `${pageId}-01`,
      });
    }
  }, [currentPagePath]);
  return <Component {...props} />;
};

export const toPage = (...arg: any) => {
  stackNavigation && stackNavigation.navigate(...arg);
};

export const pushPage = (...arg: any) => {
  stackNavigation && stackNavigation.push(...arg);
};

export const goBack = (...arg: any) => {
  stackNavigation && stackNavigation.goBack(...arg);
};

export const replacePage = (...arg: any) => {
  stackNavigation && stackNavigation.replace(...arg);
};

export const resetPage = (routeName: string) => {
  stackNavigation &&
    stackNavigation.reset({
      index: 0,
      actions: [stackNavigation.navigate({ routeName })],
    });
};

export const setParams = (...arg: any) => {
  stackNavigation && stackNavigation.setParams(...arg);
};

export const setOptions = (...arg: any) => {
  stackNavigation && stackNavigation.setOptions(...arg);
};

export const getCurrentRoute = () => route;

export default stackNavigationComponent;

export { stackNavigation };
