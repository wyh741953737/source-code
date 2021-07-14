import { defineUserinfo, defineUtils } from './mycj-difine';

export function mycjController(mycjModule, angular) {
  mycjModule.controller('mycj.ctrl',
    ['$rootScope', '$scope', '$location', 'dsp', mycjControllerFun]);
}

function mycjControllerFun($rootScope, $scope, $location, dsp) {
  document.title = 'My CJ';
  defineUserinfo($rootScope);
  defineUtils($rootScope);
  
  if (!localStorage.getItem('loginfromerp')) {
    // 加载聊天
    dsp.addChatWindow();
    dsp.addGuidWindow();
  }
  
  // 主题色
  $scope.theme = $rootScope.userInfo.vip === '1' ? 'vip' : '';
  
  $scope.loca = $location;
  // $scope.$watch('loca.url()', function(now = '', old = '') {
  //   // 导航守卫
  //   // if (!dsp.isInLoginState()) {
  //   //   layer.msg('Your login expired, please relogin!', { time: 2000 }, function() {
  //   //     location.href = 'login.html?target=' + $rootScope.base64.encode('myCJ.html#' + now);
  //   //   });
  //   //   return;
  //   // }
  // });

}
