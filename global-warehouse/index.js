/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// 关闭所有警告
console.disableYellowBox = true;

// 设置为app环境
window.appEnv = true;

AppRegistry.registerComponent(appName, () => App);
