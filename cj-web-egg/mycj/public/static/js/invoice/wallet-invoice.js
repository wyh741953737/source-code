(function () {
  const app = angular.module('invoice', ['service', 'utils','cjDotModule']);
  app.controller('wallerInvoiceCtrl', ['$scope', 'dsp', '$sce', '$http', 'utils', function ($scope, dsp, $sce, $http, utils) {
    const bs = new Base64();
    $scope.invoiceBillMap = null;
    $scope.orderMap = null;
    $scope.productList = [];
    $scope.startTime = bs.decode(dsp.getQueryString('startTime') || '');
    $scope.endTime = bs.decode(dsp.getQueryString('endTime') || '');
    $scope.exportType = dsp.getQueryString('exportType') || '';
    $scope.itemNum = null;
    $scope.invoiceDate = utils.parseTime(new Date());
    $scope.dueDate = utils.parseTime(new Date($scope.endTime));
  
    // 获取发票数据
    function getList() {
      layer.load(2);
      dsp.postFun('tool/invoiceBill/getOrderListInvoiceBill', {
        beginTime: $scope.startTime,
        endTime: $scope.endTime,
        flag: $scope.exportType
      }, function(res) {
        layer.closeAll('loading');
        if (res.data.statusCode == 200) {
          layer.closeAll('loading');
          document.getElementsByClassName('footer')[0].style.display = 'block'
          $scope.result=res.data.result
          $scope.invoiceBillMap = res.data.result.invoiceBillMap;
          $scope.orderList = res.data.result.orderList;
          $scope.orderList.forEach(function(o, i) {
            $scope.itemNum += Number(o.orderNumber);
          });
        }else if(res.data.statusCode == 901){//未设置发票抬头
          layer.msg('Please input the consignee information before downloading.');
          let path = location.href.replace(location.origin,'');
          setTimeout(()=>{
            sessionStorage.setItem('invoivetarget',path);
            location.href=`/myCJ.html#/profile/invoice`;
          },2000);
        } else {
          layer.msg('Invoice information failed to load');
        }
      }, function(res) {
        layer.closeAll('loading');
      });
    }
  
    getList();
  
    // 下载发票
    $scope.handleDownload = function() {
      // document.getElementsByClassName('footer')[0].style.display = 'none';
      // let htmlFile = document.getElementById('html').innerHTML;
      // const reg1 = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
      // const reg2 = /<noscript\b[^<]*(?:(?!<\/noscript>)<[^<]*)*<\/noscript>/gi;
      // const reg3 = /<link\b[^<]*(?:(?!<\/link>)<[^<]*)/gi;
      // const reg4 = /<div id="goog-gt-tt"(.*)<\/iframe>/gi;
      // htmlFile = htmlFile.replace(reg1, '')
      // .replace(reg2, '')
      // .replace(reg3, '')
      // .replace(reg4, '')
      // .replace('ng-repeat="item in productList"', '');
      // htmlFile = '<html lang="en">' + htmlFile + '</html>';
      // document.getElementsByClassName('footer')[0].style.display = 'block';
      // console.log(htmlFile);
      layer.load(2);
      dsp.postFun('tool/invoiceBill/downloadInvoiceBatchNew',$scope.result, ({ data }) => {
        layer.closeAll('loading');
        cjUtils.exportFile(data, `${$scope.invoiceBillMap.invoiceName}.pdf`);
      }, err => {
        console.log(err);
      }, {
        responseType: 'blob'
      });
    };
  }])
})()
