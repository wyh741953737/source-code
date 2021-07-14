export function serviceReturnFactory(angular) {
  const app = angular.module('service-return.module', []);

  //纠纷 return
  app.controller('service-return.ctrl', ['$scope', 'dsp', '$stateParams',
    function ($scope, dsp, $stateParams) {
      console.log('售后return')
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
      var pageH = $(window).height() - 171;
      var docH = $(document).height();
      var bs = new Base64();
      var userId = bs.decode(localStorage.getItem('userId') ? localStorage.getItem('userId') : '')
      $scope.userId = userId;
      $('.aftersale-right').css({
        'min-height': $(window).height() * 1 + 'px'
      });
      //设置默认时间
      function GetDateStr(AddDayCount) {
        var dd = new Date();
        dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期 
        var y = dd.getFullYear();
        var m = dd.getMonth() + 1;//获取当前月份的日期 
        var d = dd.getDate();
        if (m < 10) {
          m = '0' + m;
        }
        if (d < 10) {
          d = '0' + d;
        }
        return y + "-" + m + "-" + d;
      }
      var aDate = GetDateStr(-45);
      var enDate = GetDateStr(0);
      $("#cj-stime").val(aDate);   //关键语句
      //$("#cj-etime").val(enDate );   //关键语句
      //给左侧的导航添加滚动事件
      $(document).scroll(function () {
        if ($(document).scrollTop() >= 0) {
          $('.left-nav').css({
            position: 'fixed',
            top: '80px'
          });
        }
        else {
          $('.left-nav').css({
            position: 'relative',
            top: '80px'
          });
        }
      })

      $scope.ordstatus = $stateParams.afterStu || 1;

      dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0);
      $scope.pageSize = '20';
      $scope.pageNum = '1';
      $scope.totalNum = 0;
      $scope.totalPageNum = 0;
      $scope.searchval = '';
      function getList(dsp, $scope) {
        dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0);
        var getListData = {};
        if ($scope.searchval) {
          getListData.ordernumber = $scope.searchval;
        }
        getListData.page = $scope.pageNum - 0;
        getListData.limit = $scope.pageSize - 0;
        getListData.start = $("#cj-stime").val();
        getListData.end = $("#cj-etime").val();
        console.log(JSON.stringify(getListData))
        dsp.postFun('app/step/returnPackageList', JSON.stringify(getListData), con, errFun)
        function con(data) {
          console.log(data)
          if (data.data.statusCode == '200') {
            var reObj = JSON.parse(data.data.result);
            console.log(reObj)
            $scope.ordersList = reObj.list;
            $scope.totalNum = reObj.count;//获取总订单的条数
            if ($scope.totalNum > 0) {
              dsp.removeNodataPic($('.orders-list'))
              dsp.closeLoadPercent($('.orders-list'))
              $scope.countPage = Math.ceil($scope.totalNum / ($scope.pageSize - 0))
            } else {
              dsp.addNodataPic($('.orders-list'),$(window).height()-171,47,0,{width:'100%'})
              dsp.closeLoadPercent($('.orders-list'))
              $scope.countPage = 0;
            }
            $scope.totalCounts = Math.ceil($scope.totalNum / $scope.pageSize);
            $scope.$broadcast('page-data', {
              pageNum: $scope.pageNum,
              totalNum: $scope.totalCounts,
              totalCounts: $scope.totalNum,
              pageSize: $scope.pageSize,
              pagesizeList: ['20','50','100']
            });
          }
        }
        function errFun(data) {
          console.log(data)
          dsp.closeLoadPercent($('.orders-list'))
        }
      }
      getList(dsp, $scope);
      $scope.$on('pagedata-fa', function (d, data) {
        console.log(data)
        $scope.pageNum = data.pageNum;
        $scope.pageSize = data.pageSize;
        getList(dsp, $scope);
      });
      function errFun(data) {
        console.log(data)
        layer.closeAll('loading')
        dsp.closeLoadPercent($('.orders-list'))
      }
      //获取纠纷的数量
      var getAftNum = {};
      getAftNum.page = $scope.pageNum - 0;
      getAftNum.limit = $scope.pageSize - 0;
      getAftNum.code = 'cj';
      getAftNum.status = '3';
      console.log($scope.ordstatus)
      getAftNum.beginDate = '';
      getAftNum.endDate = '';
      dsp.postFun('app/dispute/getDispute', JSON.stringify(getAftNum), con, errFun)
      function con(data) {
        console.log(data)
        $scope.ordstatusNum = data.data;
        $scope.afterNum1 = $scope.ordstatusNum.yi;
        $scope.afterNum2 = $scope.ordstatusNum.er;
        $scope.afterNum3 = $scope.ordstatusNum.san;
      }

      // getList(dsp,$scope);
      $scope.changePageSize = function () {
        console.log($scope.ordstatus)
        $scope.pageNum = '1';
        getList(dsp, $scope);
      }
      $scope.toSpecifiedPage = function () {
        console.log($scope.ordstatus)
        console.log($scope.ordstatus)
        var pagenum = Number($scope.pageNum)
        var totalpage = Math.ceil($scope.totalNum / $scope.pageSize);
        if (pagenum > totalpage || !pagenum || pagenum < 1) {
          $scope.pagenum = 1;
          layer.msg('Page does not exist.')
        } else {
          getList(dsp, $scope);
        }
      }
      //搜索
      $('.afterord-Search').keypress(function (e) {
        if (e.keyCode == 13) {
          $scope.search()
        }
      })

      $scope.search = function () {
        console.log($scope.searchval);
        if ($scope.searchval) {
          $scope.ordersList = [];
          dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0);
          getList(dsp, $scope);
        }
      }
      //cj开始日期搜索
      $("#cj-stime").click(function () {
        var cjendtime = $("#cj-stime").val();
        var interval = setInterval(function () {
          var endtime2 = $("#cj-stime").val();
          if (endtime2 != cjendtime) {
            $scope.ordersList = [];
            dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0);
            clearInterval(interval);
            getList(dsp, $scope);
          }
        }, 100)
      })
      //cj结束日期搜索
      $("#cj-etime").click(function () {
        var cjendtime = $("#cj-etime").val();
        var interval = setInterval(function () {
          var endtime2 = $("#cj-etime").val();
          if (endtime2 != cjendtime) {
            // alert(endtime2+'!='+cjendtime)
            $scope.ordersList = [];
            dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0);
            clearInterval(interval);
            getList(dsp, $scope);
          }
        }, 100)
      })
      //copy链接
      var setData = {};
      setData.id = userId;
      dsp.postFun('app/step/isSetAccountSeller', JSON.stringify(setData), function (data) {
        console.log(data)
        if (data.data.statusCode == 200) {
          localStorage.setItem('hasLogo', 1)
        }
      }, function (data) {
        console.log(data)
      })
      //复制条形码
      $scope.cusLinkUrl = "https://cjreturn.com/?userid=" + userId;
      // $scope.copyLinkFun = function () {
      //     var issetLogo = localStorage.getItem('hasLogo');
      //     console.log(issetLogo)
      //     if(issetLogo){
      //        $('#cus-url').val("https://cjreturn.com/?userid="+userId)
      //        var Url2=document.getElementById("cus-url");
      //        Url2.select(); // 选择对象
      //        console.log(Url2)
      //        console.log(Url2.select())
      //        var isCopy = document.execCommand("Copy"); // 执行浏览器复制命令
      //        console.log(isCopy)
      //        if(isCopy){
      //            $scope.copyLinkFlag = true;
      //        }  
      //    }else{
      //        layer.msg('Put your LOGO and Store Link on the form.')
      //        $scope.setStoreFlag = true;
      //    }
      // }
      $scope.copyLinkFun = function (item, ev) {
        var hideInpVal = $(ev.target).siblings('.shopurl-val')[0];
        hideInpVal.select(); // 选中文本
        var isCopyFlag = document.execCommand("copy"); // 执行浏览器复制命令
        if (isCopyFlag) {
          layer.msg('copy success')
        }
        console.log(hideInpVal)
      }
      //展示多个
      $scope.showShopLink = function () {
        var storeUpdata = {};
        storeUpdata.id = userId;
        dsp.postFun('app/step/getAccountShop', JSON.stringify(storeUpdata), function (data) {
          console.log(data)
          $scope.shopFlag = true;
          if (data.data.statusCode == '200') {
            var resObj = JSON.parse(data.data.result)
            console.log(resObj)
            $scope.shopList = resObj.list;
          }
        }, errFun)
      }
      //获取上传图片的index
      var itemIndex = -1;
      $('.list-con').on('click', '.upimg-inp', function () {
        itemIndex = $('.upimg-inp').index(this)
        console.log(itemIndex)
      })
      //上传图片
      // $scope.imgArr=[];
      $scope.upLoadImg4 = function (files) {
        var imgArr = [];
        layer.load(2)
        console.log(files)
        console.log(itemIndex)
        var data = new FormData();
        for (var i = 0; i < files.length; i++) {
          data.append('file', files[i]);
        }
        //以下为向后台提交图片数据
        dsp.upLoadImgPost('app/ajax/upload', data, con, err);
        function con(n) {
          // 上传图片的地址
          layer.closeAll('loading');
          console.log(n)
          if (n.data.statusCode == '200') {
            var obj = JSON.parse(n.data.result);
            console.log(obj)
            for (var j = 0; j < obj.length; j++) {
              $scope.imgArrType = [];
              var srcList = obj[j].split('.');
              var fileName = srcList[srcList.length - 1];
              console.log(fileName)
              if (fileName == 'png' || fileName == 'jpg' || fileName == 'jpeg') {
                // imgArr.push('https://'+obj[j]);
                if (itemIndex >= 0) {
                  $scope.shopList[itemIndex].logo = 'https://' + obj[j];
                  //$('.resshow-imgs').eq(itemIndex).css('width',$scope.addList[itemIndex].imgs.length*135+'px')
                }
              }
            }

          } else {
            $scope.setStoreLogo = '';
          }
          console.log($scope.shopList[itemIndex])
        };
        function err(n) {
          console.log(n)
          layer.closeAll('loading');
        };
      }

      //设置店铺
      $scope.setStoreFun = function () {
        layer.load(2)
        var storeUpdata = {};
        storeUpdata.id = userId;
        dsp.postFun('app/step/getAccountShop', JSON.stringify(storeUpdata), function (data) {
          console.log(data)
          $scope.setStoreFlag = true;
          layer.closeAll('loading')
          if (data.data.statusCode == '200') {
            var resObj = JSON.parse(data.data.result)
            localStorage.setItem('hasLogo', 1)
            console.log(resObj)
            $scope.shopList = resObj.list;
            // $scope.storeLogoImg = resObj.logo;
            // $scope.storeLink = resObj.shopurl;
            // $scope.afselStoLink = resObj.shopurl;
          }
        }, errFun)
      }
      //提交店铺logo 链接
      $scope.submitStoreInfo = function (item, index) {
        // if (!$scope.storeLogoImg&&!$scope.setStoreLogo) {
        //     layer.msg('Please upload the store logo')
        //     return;
        // }
        // if (!$scope.afselStoLink) {
        //     layer.msg('Please input the store link')
        //     return;
        // }
        if (!item.logo) {
          layer.msg('Please upload the store logo')
          return;
        }
        if (!item.shopurl) {
          layer.msg('Please upload the store logo')
          return;
        }
        var subUpdata = {};
        subUpdata.id = userId;
        subUpdata.logo = item.logo;
        subUpdata.url = item.shopurl;
        subUpdata.shopid = item.id;
        console.log(JSON.stringify(subUpdata))
        dsp.postFun('app/step/updateAccountSeller', JSON.stringify(subUpdata), function (data) {
          console.log(data)
          if (data.data.statusCode == '200') {
            layer.msg('Setting Success')
            $scope.shopList.splice(index, 1)
            // $scope.setStoreFlag = false;
            // $scope.setStoreLogo = '';
            // $scope.afselStoLink = '';
          } else {
            layer.msg('Setting Failed')
          }
        }, errFun)
      }
      //awaiting cj response添加选中非选中
      var cjresIndex = 0;
      $('#cj-response-table').on('click', '.zcheckbox', function () {
        if ($(this).attr('src') == 'static/image/direct-orders/multiple1.png') {
          $(this).attr('src', 'static/image/direct-orders/multiple2.png');
          cjresIndex++;
          if (cjresIndex == $('#cj-response-table .zcheckbox').length) {
            // alert('quanbuxuanzhogn')
            $('#cj-response-table .zchecked-all').attr('src', 'static/image/direct-orders/multiple2.png');
          }
        } else {
          $(this).attr('src', 'static/image/direct-orders/multiple1.png');
          cjresIndex--;
          if (cjresIndex != $('#cj-response-table .zcheckbox').length) {
            $('#cj-response-table .zchecked-all').attr('src', 'static/image/direct-orders/multiple1.png');
          }
        }
      })
      //全选
      $('#cj-response-table').on('click', '.zchecked-all', function () {
        if ($(this).attr('src') == 'static/image/direct-orders/multiple1.png') {
          $(this).attr('src', 'static/image/direct-orders/multiple2.png');
          cjresIndex = $('#cj-response-table .zcheckbox').length;
          $('#cj-response-table .zcheckbox').attr('src', 'static/image/direct-orders/multiple2.png');
        } else {
          $(this).attr('src', 'static/image/direct-orders/multiple1.png');
          cjresIndex = 0;
          $('#cj-response-table .zcheckbox').attr('src', 'static/image/direct-orders/multiple1.png');
        }
      })

      //显示大图
      $('.orders-table').on('mouseenter', '.af-sp-smallimg', function () {
        $(this).siblings('.af-hide-bigimg').show();
      })
      $('.orders-table').on('mouseenter', '.af-hide-bigimg', function () {
        $(this).show();
      })
      $('.orders-table').on('mouseleave', '.af-sp-smallimg', function () {
        $(this).siblings('.af-hide-bigimg').hide();
      })
      $('.orders-table').on('mouseleave', '.af-hide-bigimg', function () {
        $(this).hide();
      })
      //展示图片列表
      $scope.showitemPicFun = function (item) {
        // var imgL = item.length;
        // $('.imgshow-con').css('width', imgL * 210 + 40 + 'px');
        $scope.itempicArr = item;
        $scope.imgShowFlag = true;
      }
      // 展示大图
      $scope.showBigSingleImg = function(src){
        $scope.bigSingleImg = src
        $scope.bigSingleImgShowFlag = true  
      }
      $scope.closeBigSingleShow = function(){
        $scope.bigSingleImgShowFlag=false
      }
      // $scope.showPacPicFun = function (item) {
      //     console.log(item)
      //     $scope.pacPicArr = item.imgs;
      // }

      $scope.navList = [
        {name:'Awaiting Response',href:'#/after-sale//'},
        {name:'Completed',href:'#/after-sale/2/'},
        {name:'Closed',href:'#/after-sale/3/'}
      ]
      $scope.navList[$scope.ordstatus - 1].show=true;
      
      // 给侧边栏添加滚动事件
      $(document).scroll(function () {
        if ($(document).scrollTop() >= 80) {
          $('.left-nav').css({
            position: 'fixed',
            top: '80px'
          });
        }
        else {
          $('.left-list').css({
            position: 'relative',
            top: '0'
          });
        }
      })
      $scope.showDetailFun = function (item) {
        console.log(item)
        var returnId = item.id;
        // window.open('#/after-sale-returndetail/'+returnId)
        location.href = '#/after-sale-returndetail/' + returnId;
      }
    }]);

  return app;
}