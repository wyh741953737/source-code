(function () {
    const app = angular.module('invoice', ['service', 'cjDotModule']);
    app.controller('invoiceCtrl', ['$scope','dsp','$sce','$http',function($scope,dsp,$sce,$http) {
      $scope.invoiceBillMap = null;
      $scope.orderMap = null;
      $scope.productList = [];
      $scope.id = dsp.getQueryString('id') || '';
      $scope.type = dsp.getQueryString('type') || '';
      $scope.itemNum = null;
      $scope.websiteName = 'CJ';
      let base64 =  new Base64();
      // 获取发票数据
      function getList() {
        layer.load(2);
        if ($scope.type == 'VIDEOPAY') {
          dsp.postFun('tool/invoiceBill/getInvoiceBillByVideoDownloadId', {
            'orderId': $scope.id,
            'flag': $scope.type
          }, function(res) {
            layer.closeAll('loading');
            if (res.data.statusCode == 200) {
              layer.closeAll('loading');
              document.getElementsByClassName('footer')[0].style.display = 'block'
              $scope.invoiceBillMap = res.data.result.invoiceBillMap;
              $scope.orderMap = res.data.result.orderMap;
              $scope.productList = res.data.result.productList;
              $scope.count = res.data.result.productList.length + 1;
              $scope.productList.forEach(function(o, i) {
                $scope.itemNum += Number(o.productQuantity);
              });
            } else {
              layer.msg('Invoice information failed to load');
            }
        
          }, function(res) {
            layer.closeAll('loading');
          });
        } else {
          dsp.postFun('tool/invoiceBill/getInvoiceBillByOrderId', {
            'orderId': $scope.id,
            'flag': $scope.type
          }, function(res) {
            layer.closeAll('loading');
            if (res.data.statusCode == 200) {
              layer.closeAll('loading');
              document.getElementsByClassName('footer')[0].style.display = 'block'
              $scope.invoiceBillMap = res.data.result.invoiceBillMap;
              $scope.invoiceBillMap.orderTotalPrice = Number($scope.invoiceBillMap.orderTotalPrice).toFixed(2);
              $scope.invoiceBillMap.payment = Number($scope.invoiceBillMap.payment).toFixed(2);
              $scope.orderMap = res.data.result.orderMap;
              $scope.productList = res.data.result.productList;
              $scope.count = res.data.result.productList.length + 1;
              $scope.productList.forEach(function(o, i) {
                $scope.itemNum += o.productQuantity;
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
        // console.log(htmlFile);
        // document.getElementsByClassName('footer')[0].style.display = 'block';
        layer.load(2);
        dsp.postFun('tool/invoiceBill/downloadInvoiceNew', {
          'orderId': $scope.id,
          'flag': $scope.type
        }, ({ data }) => {
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
