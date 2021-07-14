export function profileFactory(angular) {
  // 个人中心
  const app = angular.module('mycj-profile.module', ['service']);

  app.controller('mycj-profile.ctrl', ['$scope', 'dsp', '$stateParams', 'utils',
    function ($scope, dsp, $stateParams, utils) {
      $scope.$on('$destroy', function () {
        console.clear()
        localStorage.removeItem('profileType')
      })
      const that = this;
      dsp.domainData().then((res) => {
        // 请求成功的结果
        $scope.iscj = res.iscj;
        $scope.affModel = res.affModel;
      })
      var base64 = new Base64();
      var userId = base64.decode(localStorage.getItem('userId') == undefined ? "" : localStorage.getItem('userId'));
      var token = base64.decode(localStorage.getItem('token') == undefined ? "" : localStorage.getItem('token'));
      const loginName = base64.decode(localStorage.getItem('loginName') || "");
      $scope.tabList = [
        {name:'Registration Info',type:1,active:true},
        {name:'Address Management',type:2},
        {name:'Consignee Management',type:3}, 
        {name:'Subscribed Email',type:4},
        {name:'Account Security',type:5},
        {name: 'IOSS Setting', type: 6 },
      ]
      
      $('.mycj-profile-wrap').css({          //当页面加载完成后动态生成展示内容的最小高度
        'min-height': $(window).height() * 1 - 171 + 'px'
      })
      $scope.infoCallback=(data)=>{
        $scope.infoEdit = data.show;
      }
      //tab点击切换tab 注：只有在非编辑状态下才能切换 -- 全局
      function changeTabFun(type){
        if($scope.infoEdit) return;
        $scope.tabList.forEach(item=>{
          item.active=false;
        })
        $scope.tabList[type-1].active=true;
        $scope.tabType=type;
        localStorage.setItem('profileType',type);
      }
      if ($stateParams.type == 'SUBemail') {
        changeTabFun(4);
      }else if ($stateParams.type === 'address') {
        changeTabFun(2);
      }else{
        const profileType = localStorage.getItem('profileType');
        $scope.tabType= profileType ? profileType : 1;
        changeTabFun($scope.tabType)
      }
      $scope.changeTab = item=>{
        changeTabFun(item.type)
      }

    }]);

  return app;

}
