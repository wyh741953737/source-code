export function orderDetailFactory(angular) {
    const app = angular.module('order-log.module', ['service']);
    // app.filter("parseHTML", function ($sce) {
    //   return function (text) {
    //     console.log(text)
    //       return $sce.trustAsHtml(text);
    //   }
    // })
    app.controller('order-log.ctrl', ['$scope', '$stateParams', '$timeout', 'dsp', '$filter','$sce',
      function ($scope, $stateParams, $timeout, dsp, $filter,$sce) {
        console.log('订单日志===========-------------')
        //获取订单id
        $scope.orderId = $stateParams.id;
        // let width = $('.log-del-cont').clientWidth()
        $('.scroll-box').css('height','270px')
        dsp.loadPercent($('.scroll-box'), $('.scroll-box').height() ,0, 0,{width:'100%'});
        // dsp.loadPercent($('.log-loadwrap'), $('.log-loadwrap').height() , 47, 0,{width:'100%'});
        // dsp.loadPercent($('.log-loadwrap'), 390 , 0, 0,{width:'100%'});
        $('.cj-nodata-pic').css('position','static')
        let params = {
          "orderId": $scope.orderId
        };
        dsp.postFun('app/order/logOrderProducts',params,res => {//获取商品
          console.log(res)
          const {statusCode,message} = res.data;
          $('.scroll-box').css('height','auto')
          dsp.closeLoadPercent($('.scroll-box'))
          if(statusCode == 200){
            $scope.proList = JSON.parse(res.data.result);
            console.log($scope.proList)
            sumFun($scope.proList)
          }else{
            layer.msg(message)
          }
        },error => {
          $('.scroll-box').css('height','auto')
          dsp.closeLoadPercent($('.scroll-box'))
        })
        // dsp.postFun('cujialog/order/querylog',params,res => {//获取日志
        //   console.log(res)
        //   const {code,message} = res.data;
        //   dsp.closeLoadPercent($('.log-loadwrap'))
        //   if(code == 200){
        //     $scope.logList = res.data.data.nodes;
        //     $scope.logList.forEach(item => {
        //       item.logMsg = $sce.trustAsHtml(item.logMsg)
        //       console.log(item.logMsg)
        //     })
        //     dsp.removeNodataPic($('.log-loadwrap'));
        //   }else{
        //     dsp.addNodataPic($('.log-loadwrap'), 390 , 0, 0,{width:'100%'});
        //     $('.cj-nodata-pic').css('position','static')
        //     layer.msg(message)
        //   }
        // },error => {
        //   dsp.closeLoadPercent($('.log-loadwrap'))
        // })
        $scope.totalObj = {
          quantity: 0,
          matchNeatQuantity: 0,
          stockoutQuantity: 0,
          pickingQuantity: 0,
          inspectionQuantity: 0,
          shipmentsQuantity: 0,
        }
        function sumFun(arr){
          console.log(arr)
          arr.forEach(item => {
            console.log(item)
            $scope.totalObj.quantity += item.quantity - 0;
            $scope.totalObj.matchNeatQuantity += item.matchNeatQuantity - 0;
            $scope.totalObj.stockoutQuantity += item.stockoutQuantity - 0;
            $scope.totalObj.pickingQuantity += item.pickingQuantity - 0;
            $scope.totalObj.inspectionQuantity += item.inspectionQuantity - 0;
            $scope.totalObj.shipmentsQuantity += item.shipmentsQuantity - 0;
          });
        }
        $scope.goBack = () => {
          if(window.history && window.history.length>1) {
            window.history.back();
          } else {
            location.href = `${location.origin}/newmycj/dropshipping/orderManage`
          }
        }
        console.log('订单日志end===========-------------')
      }]);
    return app;
  }
  