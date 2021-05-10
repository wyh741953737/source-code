/**
 * @format
 */

 import { AppRegistry } from 'react-native';
 import App from './App';
 import { name as appName } from './app.json';
 
 // 关闭所有警告
 console.disableYellowBox = true;
 
 window.platform = 'App';
 
 AppRegistry.registerComponent(appName, () => App);
 