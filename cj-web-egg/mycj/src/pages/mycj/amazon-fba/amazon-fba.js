export function amazonFBA_factory(angular) {
  const app = angular.module('amazon-FBA.module', []);

  app.controller('amazon-FBA.ctrl', ['$scope', '$rootScope', 'dsp', function ($scope, $rootScope, dsp) {
    dsp.setRightMinHeight();
    var base64 = new Base64();
    $scope.loginName = localStorage.getItem('loginName') ? base64.decode(localStorage.getItem('loginName')) : '';

    $scope.pageNum = '1';
    $scope.pageSize = '20';
    $scope.status = '';
    $scope.orderId = "";
    $scope.searchInfo = '';

    $rootScope.$on('cj/fbaOrder/getOrderList', (_, bool) => $scope.loading = bool);

    //��ȡ�����б�
    getOrdersList();
    function getOrdersList() {
      var data = {
        "pageNum": $scope.pageNum,
        "pageSize": $scope.pageSize,
        "status": $scope.status,
        "orderId": $scope.orderId
      };
      dsp.postFun('cj/fbaOrder/getOrderList', JSON.stringify(data), function (data) {
        if (data.data.statusCode == '200') {
          var result = data.data.result;
          $scope.orderList = result.orderList;
          console.log($scope.orderList);
          if ($scope.orderList.length > 0) {
            dsp.removeNodataPic($('.dataWrap'));
          } else {
            dsp.addNodataPic($('.dataWrap'), $(window).height() - 171);
          }
        } else {
          layer.msg('Server error');
        }
      }, function () {
        dsp.closeLoadPercent($('.dataWrap'));
      });
    }

    //�����Ų�ѯ
    $scope.searchFun = function () {
      $scope.search();
    };
    $('#searchInput').keypress(function (e) {
      if (e.keyCode == 13) {
        $scope.search()
      }
    })
    $scope.search = function () {
      $scope.orderId = $scope.searchInfo;
      getOrdersList();
    };
    //������ťɾѡ
    $('.navTab').on('click', 'ul>li', function () {
      var target = $(this);
      target.addClass('act').siblings('.act').removeClass('act');
      var index = target.index();
      $('#selectState').val(index);
      if (index == '0') {
        $scope.status = '';
      } else if (index == '1') {
        $scope.status = '3';
      } else if (index == '2') {
        $scope.status = '10';
      } else if (index == '3') {
        $scope.status = '6';
      } else if (index == '4') {
        $scope.status = '12';
      } else if (index == '5') {
        $scope.status = '13';
      }
      getOrdersList();
    });
    //��ͷɾѡ
    $('#selectState').change(function () {
      var target = $(this);
      var index = target.val();
      var ele = $('.navTab').find('li').eq(index);
      ele.addClass('act').siblings('.act').removeClass('act');
      if (index == '0') {
        $scope.status = '';
      } else if (index == '1') {
        $scope.status = '3';
      } else if (index == '2') {
        $scope.status = '10';
      } else if (index == '3') {
        $scope.status = '6';
      } else if (index == '4') {
        $scope.status = '12';
      } else if (index == '5') {
        $scope.status = '13';
      }
      getOrdersList();
    });

    //ȥ���ﳵҳ��
    $scope.gotoCar = function () {
      location.href = 'myCJ.html#/goods/1';
    };
    //ȥ����
    $scope.pathType = '//fba';
    $scope.gotoPay = function (item) {
      // 是否验证邮件处理
      if (dsp.isVerifyEmail()) return
      location.href = 'myCJ.html#/payment/' + base64.encode(item.shipments_order_id) + '/' + base64.encode(item.AMOUNT + '') + $scope.pathType;
    };

    //�鿴��������{
    $scope.viewDetailFun = function (type, item) {
      //console.log(item);
      var data = {
        "orderId": item.id
      };
      dsp.load();
      dsp.postFun('cj/fbaOrder/getOrderDetail', JSON.stringify(data), function (data) {
        //console.log(data);
        dsp.closeLoad();
        if (data.data.statusCode == '200') {
          var result = data.data.result;
          result.orderID = item.id;
          result.orderType = type;
          $scope.orderDetail = result;
          $('#shouye').hide();
          $('#ddDetail').show();
          $('.iconWrap').removeClass('act').removeClass('over');
          if (type == 'Pending Payment') {
            $('.icon-1').addClass('act');
          } else if (type == 'Prepaid') {
            $('.icon-1').addClass('over').next().addClass('over');
            $('.icon-2').addClass('act');
          } else if (type == 'Delivered') {
            $('.icon-1').addClass('over').next().addClass('over');
            $('.icon-2').addClass('over').next().addClass('over');
            $('.icon-3').addClass('act');
          } else if (type == 'Dispatched') {
            $('.icon-1').addClass('over').next().addClass('over');
            $('.icon-2').addClass('over').next().addClass('over');
            $('.icon-3').addClass('over').next().addClass('over');
            $('.icon-4').addClass('act');
          } else if (type == 'Completed') {
            $('.icon-1').addClass('over').next().addClass('over');
            $('.icon-2').addClass('over').next().addClass('over');
            $('.icon-3').addClass('over').next().addClass('over');
            $('.icon-4').addClass('over').next().addClass('over');
            $('.icon-5').addClass('act');
          }
        } else {
          layer.msg('Order details query failed');
        }
      }, function () {
        dsp.closeLoad();
      });


    };
    //���ض����б�
    $scope.goBack = function () {
      $('#shouye').show();
      $('#ddDetail').hide();
    };
    $scope.classStatus = function (status) {
      if (status == '10') {
        return "Prepaid";
      } else if (status == '12') {
        return 'Dispatched'
      } else if (status == '3') {
        return 'Pending Payment'
      } else if (status == '13') {
        return 'Completed'
      } else if (status == '6') {
        return 'Delivered'
      }
    }
    $scope.classYear = function (time) {
      if (time) {
        var time = time.split(' ')[0];
        return time;
      } else {
        return '';
      }

    }
    $scope.classYear2 = function (time) {
      if (time) {
        var time = time.split(' ')[1];
        return time;
      } else {
        return '';
      }
    }

  }]);

  return app;
}
