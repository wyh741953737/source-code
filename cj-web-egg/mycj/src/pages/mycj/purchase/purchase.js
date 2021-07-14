import historyController from './history-ctrl';
import taobaoController from './taobao-ctrl';


export function purchaseFactory(angular) {
  const app = angular.module('purchase.module', []);

  app.controller('purchaseHistory.ctrl', ['$scope', '$rootScope', 'dsp','$sce', '$stateParams', historyController]);

  app.controller('purchaseTaobao.ctrl', ['$scope', '$rootScope', 'dsp', '$stateParams', '$state','$sce', taobaoController]);

  return app;
}
