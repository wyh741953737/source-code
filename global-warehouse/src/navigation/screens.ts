import HomePage from '@/pages/homePage';
import BottomTabs from './bottomTabs';
import Demo1 from '../pages/demo1';
import Demo2 from '../pages/demo2';
import Demo3 from '../pages/demo3';
import WebView from '../pages/_webview';

// 所有屏幕
export const screens = [
  // 主屏幕
  {
    name: 'BottomTabs',
    component: BottomTabs,
  },
  {
    name: '/demo1',
    component: Demo1,
  },
  {
    name: '/demo2',
    component: Demo2,
  },
  {
    name: '/demo3',
    component: Demo3,
  },
  {
    name: '/webview',
    component: WebView,
  },
];

// 主页tab屏幕
export const bottomTabScreens = [
  {
    name: '/demo1',
    component: Demo1,
    options: {
      tabBarLabel: 'Home',
    },
  },
  {
    name: '/demo2',
    component: Demo2,
    options: {
      tabBarLabel: 'Blog',
    },
  },
  {
    name: '/demo3',
    component: Demo3,
    options: {
      tabBarLabel: 'Mine',
    },
  },
  {
    name: '/homePage',
    component: HomePage,
    options: {
      tabBarLabel: 'HomePage',
    },
  },
];
