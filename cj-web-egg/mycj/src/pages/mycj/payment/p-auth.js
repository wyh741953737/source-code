
/* 派安盈授权回调 */
export function pAuthFactory(angular) {
  console.log('auth______');
  const app = angular.module('p-auth.module', ['service']); 
  app.controller('p-auth.ctrl', ['$scope', '$stateParams', 'dsp',
    function ($scope, $stateParams, dsp) {
      console.log('派安盈授权回调')
    }
  ]);

  return app;
}
