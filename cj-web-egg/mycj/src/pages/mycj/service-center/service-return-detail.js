export function serviceReturnDetailFactory(angular) {
  const app = angular.module('service-return-detail.module', []);

  //售后return详情
  app.controller('service-return-detail.ctrl', ['$scope', 'dsp', '$stateParams',
    function ($scope, dsp, $stateParams) {
      console.log('售后详情');
      dsp.domainData().then((res) => {
        // 请求成功的结果
        console.log(res)
        $scope.iscj = res.iscj;
        if ($scope.iscj == '1') {
          //cj
          $scope.websiteName = 'CJ';
        } else {
          //客户
          $scope.websiteName = res.websiteName || 'CJ';
        }
      })
      /* var vip = localStorage.getItem('vip') == undefined ? "" : localStorage.getItem('vip');
      if (vip == '1') {//vipFlag
        $('.header-nav').addClass('vipFlag');
        $('.left-nav').addClass('vipFlag');
        $('.aftersale-right').css('background', '#F0EDE7').addClass('vip');
        $('.rede-top').css('background', '#F0EDE7');
      } else {
        $('.header-nav').removeClass('vipFlag');
        $('.left-nav').removeClass('vipFlag');
        $('.aftersale-right').css('background', '#f2f3f5').removeClass('vip');
        $('.rede-top').css('background', '#f2f3f5');
      }
      $('.header-nav li').eq(1).addClass('active');
      $('.left-nav li').eq(2).addClass('active');
      $('.backhref-div').mouseenter(function () {
        $(this).children('.backhref-img').attr('src', 'static/image/public-img/back-hover.png')
        $(this).children('.backhref-span').css('color', '#999')
      })
      $('.backhref-div').mouseleave(function () {
        $(this).children('.backhref-img').attr('src', 'static/image/public-img/back.png')
        $(this).children('.backhref-span').css('color', '#333')
      }) */
      var returnId = $stateParams.returnId || '';
      console.log(returnId)
      var getInfo = {};
      getInfo.id = returnId;
      dsp.postFun('app/step/getReturnPackageInfo', JSON.stringify(getInfo), function (data) {
        console.log(data)
        if (data.data.statusCode == '200') {
          var resObj = JSON.parse(data.data.result).info;
          $scope.ordReturnList = resObj;
          console.log(resObj)
        } else {
          dsp.cjMesFun(1);
          // window.history.back();
        }
      }, function (data) {
        console.log(data)
      })
      // console.log($scope.ordReturnList)
      //审核通过
      $scope.passCheckFun = function () {
        var checkData = {};
        checkData.id = returnId;
        checkData.type = 0;
        dsp.postFun('app/step/returnPackageExamine', JSON.stringify(checkData), function (data) {
          console.log(data)
          if (data.data.statusCode == '200') {
            layer.msg('Approve Success')
            $scope.ordReturnList.status = '2';
            console.log($scope.ordReturnList)
          } else {
            layer.msg('Approve Failed')
          }
        }, function (data) {
          console.log(data)
        })
      }
      //审核拒绝
      $scope.refuseCheckFun = function () {
        var checkData = {};
        checkData.id = returnId;
        checkData.type = 1;
        dsp.postFun('app/step/returnPackageExamine', JSON.stringify(checkData), function (data) {
          console.log(data)
          if (data.data.statusCode == '200') {
            layer.msg('Cancel Return Request Success')
            $scope.ordReturnList.status = '3';
            console.log($scope.ordReturnList)
          } else {
            layer.msg('Cancel Return Request Failed')
          }
        }, function (data) {
          console.log(data)
        })
      }
      //返回历史
      $scope.backHref = function () {
        window.history.back();
      }
    }]);


  return app;
}