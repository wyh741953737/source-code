(function (angular) {
  // 1.店铺授权模块
  var app = angular.module('myCJHome', []);
  // 2.路由规则
  // app.config(['$routeProvider',function($routeProvider){
  //   $routeProvider.when('/myCJ-home',{// #/home_page
  //     // templateUrl:'./home.html'
  //     templateUrl:'./static/html/myCJ/myCJ-home/myCJ-home.html',
  //     controller:'myCJHomeCtrl'
  //   })
  // }]);
  // 3.创建控制器
  app.controller('myCJHomeCtrl', ['$scope', '$http', '$window', function($scope, $http, $window) {


    if (!$window.localStorage.getItem('userId')) {
      layer.msg('请先登录！')
    }
    // 给侧边栏添加滚动事件
    $(document).scroll(function () {
      if ($(document).scrollTop()>=80) {
        $('.mycj-left-bar').css({
          position : 'fixed',
          top:'80px'
        });
      }
      // else{
      //   $('.mycj-left-bar').css({
      //     position : 'relative',
      //     top: '0'
      //   });
      // }
    })

    
  }])
})(angular)