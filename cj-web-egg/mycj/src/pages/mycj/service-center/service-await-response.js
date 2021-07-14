import { NODE_ENV } from '@root_egg/env';
const awinTesMode = ['testnew', 'development', 'test'].includes(NODE_ENV) ? 1 : 0;
export function serviceAwaitResponseFactory(angular) {
  const app = angular.module('service-await-response.module', []);

  app.controller('service-await-response.ctrl', ['$scope', 'dsp', '$location', '$stateParams', '$timeout', 'utils',
    function ($scope, dsp, $location, $stateParams, $timeout, utils) {
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
      console.log('售后')
      var pageH = $(window).height() - 171;
      var docH = $(document).height();
      var bs = new Base64();
      var userId = bs.decode(localStorage.getItem('userId') ? localStorage.getItem('userId') : '')
      console.log(userId)
      var jfId = $stateParams.jfId;
      console.log(jfId)
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
      // $("#y-ord-sdate").val(aDate );   //关键语句
      // $("#y-ord-edate").val(enDate );   //关键语句
      const { filter } = $location.search();
      filter || $("#cj-stime").val(aDate);   //关键语句
      //$("#cj-etime").val(enDate );   //关键语句
      // $scope.dataFound = false;
      console.log($('.deal-orders').width(), $('.orders-list').width(), $('.orders-table').width())
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
      //纠纷类型
      $scope.jiufen = ['All', 'No Tracking Information Found', 'Tracking Information Frozen', 'Tracking Information Error', 'Order Returned', 'Products Short', 'Defective Products', 'Received Incorrect Products', 'Order Not Received'];
      //订单状态
      $scope.state = ['Closed', 'Completed', 'Awaiting CJ Response', 'Awaiting Your Response'];
      //弹窗
      $scope.window = false;
      $scope.upload = false;
      //请求参数 disputeType
      $scope.leixing = 1;

      $scope.ordstatus = $stateParams.afterStu || 1;

      dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0);
      $scope.pageSize = '20';
      $scope.pageNum = '1';
      $scope.totalNum = 0;
      $scope.totalPageNum = 0;
      $scope.searchval = jfId;
      console.log($scope.searchval)
      $scope.waitingResBtn = filter ? true : false;
      $scope.filterBtnHandle = function () {
        // console.log('filterBtnHandle', !$scope.waitingResBtn)
        $scope.waitingResBtn = !$scope.waitingResBtn;
        $('#cj-response-table .zchecked-all').attr('src', 'static/image/direct-orders/multiple1.png');
        getList(dsp, $scope)
      }

      var timeTrans = function(timestamp){
        const times = timestamp / 1000;
        const nowTime =  Math.round(new Date() / 1000);
        if((nowTime - times) > 15*24*60*60) {
          return true;
        }
        return false;
      }

      $scope.isShowResolution = function(rStatus, supplierId, status, createDate) {
        if(!rStatus && supplierId) {
          if(status === '8' || timeTrans(createDate)) {
            if(status === '11') {
              return false;
            }
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      }

      //获取url中的参数方法
      function getUrlParamByKey (href, key) {
        if(!href) return ''
        var vars = href.split("&");
        for (var i = 0;i < vars.length; i++) {
          var pair = vars[i].split("=");
          if(pair[0] == key) { return pair[1]; }
        }
      }

      function initIsCheckout() {
        // 判断当前是否存在ckosessionid
        $scope.ckoSessionId = bs.decode(localStorage.getItem('ckoSessionId') || '') && JSON.parse(bs.decode(localStorage.getItem('ckoSessionId') || ''))
        if($scope.ckoSessionId) {
          getList(dsp, $scope)
          getCheckoutTrade()
          return 
        }
        var href = window.location.href;
        if (href.indexOf('?') >= 0 && !filter) { //2019-8-12 需要query传参 此处排除新增的这个条件
          const regexp = /\?[\w\W]*\#/
          $scope.sessionId = getUrlParamByKey(href.match(regexp) && href.match(regexp)[0].slice(1,-1),'cko-payment-id') || getUrlParamByKey(href.match(regexp) && href.match(regexp)[0].slice(1,-1),'cko-session-id')
          if($scope.sessionId) {
            localStorage.setItem('ckoSessionId', bs.encode(JSON.stringify($scope.sessionId)));
            // 后端接口返回状态较慢，延迟一秒再刷新当前页面
            let timer = setTimeout(() => {
              clearTimeout(timer)
              window.location.href = window.location.origin + '/myCJ.html#/after-sale//'
            }, 200)
            getList(dsp, $scope)
            return
          }
          var hrefArr = href.split('?');
          console.log(hrefArr)
          var paydataArr = hrefArr[1].split('&')
          var lengthPay = paydataArr.length;
          console.log(paydataArr)
          console.log(lengthPay)
          if (lengthPay == 3) {
            var paymentArr = paydataArr[0].split('=');
            var tokenArr = paydataArr[1].split('=');
            var payidArr = paydataArr[2].split('=');
  
            var payCS = {};
            payCS.paymentId = paymentArr[1];
            payCS.token = tokenArr[1];
            payCS.payerID = payidArr[1];
            payCS.code = 16;
            payCS.awc = dsp.getCookie("awc") || '';
  
            console.log(payCS)
            console.log(JSON.stringify(payCS))
            var isToken = localStorage.getItem('payToken');
            console.log(isToken)
            if (isToken == tokenArr[1]) {
              getList(dsp, $scope);
              return;
            } else {
              dsp.postFun('app/pay/pay', JSON.stringify(payCS), function (data) {
                console.log(data)
                if (data.data.result !== true) {
                  layer.msg('Payment Failed')
                  getList(dsp, $scope);
                } else {
                  layer.msg('Payment Succeed')
                  localStorage.setItem('payToken', tokenArr[1])
                  getList(dsp, $scope);
  
                  //awin 发送支付成功fall-back
                  let awinLocalParams = null;
                  try {
                    awinLocalParams = JSON.parse(localStorage.getItem(`_paypal_${payCS.token}`))
                    console.log(awinLocalParams)
                  } catch(err) { console.log('解析错误'); }
                  if(awinLocalParams){
                    function awinJS () {
                      let content = '<script >'+
                          ' var AWIN = {};' + 
                          '  AWIN.Tracking = {};' +
                          ' AWIN.Tracking.Sale = {};' +
                          ' AWIN.Tracking.Sale.amount =' + awinLocalParams.awinAmount + ';' +
                          ' AWIN.Tracking.Sale.orderRef ="' + awinLocalParams.awinRef+ '";' +
                          ' AWIN.Tracking.Sale.parts  ="' + "DEFAULT:" + awinLocalParams.awinAmount+ '";' +
                          'AWIN.Tracking.Sale.currency = "USD";'+
                          ' AWIN.Tracking.Sale.test = "' + awinTesMode + '";'+
                          'AWIN.Tracking.Sale.channel = "aw";'+
                          +'<\/script>'
                        $('body').append(content);
                        let osrc = 'https://www.dwin1.com/21578.js';
                        let script = document.createElement('script');
                        script.type = 'text/javascript';
                        script.src = osrc;
                        document.getElementsByTagName('body')[0].appendChild(script);
                    }
  
                    function imgHttpFun(){
                      let orderCountMoney = awinLocalParams.awinAmount.toFixed(2)
                      let BasketImage = new Image(1,1);
                      BasketImage.src = `https://www.awin1.com/sread.img?tt=ns&tv=2&merchant=21578&amount=${orderCountMoney}&ch=aw&parts=DEFAULT:${orderCountMoney}&cr=USD&ref=${awinLocalParams.awinRef}&tesmode=${awinTesMode}`;
                      localStorage.removeItem(`_paypal_${payCS.token}`)
                    }
                    let awcText = dsp.getCookie('awc')
                    let utmSource = localStorage.getItem('utmSource');
                    if(awcText && utmSource == 'awin'){//有awin的awc值 并且登录平台来源是awin
                      awinJS()
                      imgHttpFun()
                    }
                  }
                }
              }, function (data) {
                console.log(data)
              })
            }
          }
          if (lengthPay < 3) {
            layer.msg('Payment Failed')
            getList(dsp, $scope);
          }
        } else {
          getList(dsp, $scope);
        }
      }
      initIsCheckout()
      
      function getList(dsp, $scope) {
        dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0);
        $scope.ordersList = [];
        $scope.totalNum = 0;
        var getListData = {};
        getListData.page = $scope.pageNum - 0;
        getListData.limit = $scope.pageSize - 0;
        getListData.code = 'cj';
        getstatus(getListData);
        getListData.type = $('.selJfLx').val();
        getListData.orderNumber = $scope.searchval;
        console.log($scope.ordstatus)
        getListData.beginDate = $("#cj-stime").val();
        getListData.endDate = $("#cj-etime").val();

        dsp.postFun('app/dispute/getDispute', JSON.stringify(getListData), con, errFun)
        function con(data) {
          console.log(data)
          $scope.ordstatusNum = data.data;
          $scope.ordersList = data.data.list;
          $scope.totalNum = data.data.count;//获取总订单的条数
          console.log($scope.totalNum)
          if ($scope.totalNum > 0) {
            dsp.removeNodataPic($('.orders-list'))
            dsp.closeLoadPercent($('.orders-list'))
            $scope.countPage = Math.ceil($scope.totalNum / ($scope.pageSize - 0))
          } else {
            dsp.addNodataPic($('.orders-list'),$(window).height()-171,47,0,{width:'100%'})
            dsp.closeLoadPercent($('.orders-list'))
            $scope.countPage = 0;
          }
          // pageFun(dsp, $scope);
          numFun()
          $scope.totalCounts = Math.ceil($scope.totalNum / $scope.pageSize);
          $scope.$broadcast('page-data', {
            pageNum: $scope.pageNum,
            totalNum: $scope.totalCounts,
            totalCounts: $scope.totalNum,
            pageSize: $scope.pageSize,
            pagesizeList: ['20','50','100']
          });
        }
        function errFun(data) {
          console.log(data)
          layer.closeAll('loading')
          dsp.closeLoadPercent($('.orders-list'))
        }
      }
      $scope.$on('pagedata-fa', function (d, data) {
        console.log(data)
        $('#cj-response-table .zchecked-all').attr('src', 'static/image/direct-orders/multiple1.png');
        $scope.pageNum = data.pageNum;
        $scope.pageSize = data.pageSize;
        getList(dsp, $scope);
      });
      //获取状态
      function getstatus(getstu) {
        if ($scope.ordstatus == 1) {
          getstu.status = $scope.waitingResBtn ? '1,2,4,7' : '1,2,4,6,7,60,61';//此处新增条件筛选
          getstu.responseType = $scope.waitingResBtn ? 'CJ' : '';//此处新增条件筛选
        } else if ($scope.ordstatus == 2) {
          getstu.status = '3,8,11';
        } else {
          getstu.status = '5';
        }
      }
      //分页
      function pageFun(dsp, $scope) {
        console.log($scope.totalNum)
        if ($scope.totalNum < 1) {
          return;
        }
        $(".pagination-demo1").jqPaginator({
          totalCounts: $scope.totalNum,
          pageSize: $scope.pageSize * 1,
          visiblePages: 5,
          currentPage: $scope.pageNum * 1,
          activeClass: 'active',
          first: '<li class="first"><a class="prev" href="javascript:void(0);">&lt&lt;<\/a><\/li>',
          prev: '<li class="prev"><a class="prev" href="javascript:void(0);">&lt;<\/a><\/li>',
          next: '<li class="next"><a class="next" href="javascript:void(0);">&gt;<\/a><\/li>',
          last: '<li class="last"><a class="prev" href="javascript:void(0);">&gt&gt;<\/a><\/li>',
          page: '<li class="page"><a href="javascript:void(0);">{{page}}<\/a><\/li>',
          onPageChange: function (n, type) {
            if (type == 'init') {
              return;
            };
            dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0);
            $scope.ordersList = [];
            $scope.totalNum = 0;
            $scope.pageNum = n;
            var getListData = {};
            getListData.page = $scope.pageNum - 0;
            getListData.limit = $scope.pageSize - 0;
            getListData.code = 'cj';
            getstatus(getListData);
            console.log($scope.ordstatus)
            getListData.beginDate = $("#cj-stime").val();
            getListData.endDate = $("#cj-etime").val();
            dsp.postFun('app/dispute/getDispute', JSON.stringify(getListData), con, errFun)
            function con(data) {
              console.log(data)
              $scope.ordersList = data.data.list;
              console.log($scope.ordersList)
              $scope.totalNum = data.data.count;//获取总订单的条数
              if ($scope.totalNum > 0) {
                dsp.removeNodataPic($('.orders-list'))
                dsp.closeLoadPercent($('.orders-list'))
                $scope.countPage = Math.ceil($scope.totalNum / ($scope.pageSize - 0))
              } else {
                dsp.addNodataPic($('.orders-list'),$(window).height()-171,47,0,{width:'100%'})
                dsp.closeLoadPercent($('.orders-list'))
                $scope.countPage = 0;
              }
              // pageFun();
            }
            function errFun(data) {
              console.log(data)
            }
          }
        });
      }
      // getList(dsp,$scope);
      $scope.changePageSize = function () {
        console.log($scope.ordstatus)
        $scope.pageNum = '1';
        getList(dsp, $scope);
      }
      $scope.toSpecifiedPage = function () {
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
      $scope.enterSearch = e =>{
        if (e.keyCode == 13) {
          $scope.search()
        }
      }
      $scope.search = function () {
        console.log($scope.searchval);
        if ($scope.searchval) {
          $scope.pageNum = 1;
          getList(dsp, $scope);
        }
      }
      $('.selJfLx').change(function () {
        $scope.pageNum = 1;
        getList(dsp, $scope);
      })
      //给订单状态赋值的函数
      function numFun() {
        $scope.afterNum1 = $scope.ordstatusNum.yi;
        $scope.afterNum2 = $scope.ordstatusNum.er;
        $scope.afterNum3 = $scope.ordstatusNum.san;
        $scope.afterNum4 = $scope.ordstatusNum.si;
      }
      //cj开始日期搜索
      $("#cj-stime").click(function () {
        var cjendtime = $("#cj-stime").val();
        var interval = setInterval(function () {
          var endtime2 = $("#cj-stime").val();
          if (endtime2 != cjendtime) {
            // alert(endtime2+'!='+cjendtime)
            $scope.ordersList = [];
            $scope.totalNum = 0;
            dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0);
            clearInterval(interval);

            $scope.pageNum = 1;
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
            $scope.totalNum = 0;
            dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0);
            clearInterval(interval);

            $scope.pageNum = 1;
            getList(dsp, $scope);
          }
        }, 100)
      })
      $scope.navList = [
        {name:'Awaiting Response',href:'#/after-sale//'},
        {name:'Completed',href:'#/after-sale/2/'},
        {name:'Closed',href:'#/after-sale/3/'}
      ]
      $scope.navList[$scope.ordstatus - 1].show=true;
     
      $('.header-nav li').eq(1).addClass('active');
      $('.left-nav li').eq(2).addClass('active');
      //$('.aftersale-leftbara').eq(2).css('background-image','linear-gradient(0deg,rgba(253, 162, 44, 1) 0%, rgba(247, 140, 41, 1) 78%, rgba(241, 118, 37, 1) 100%)');
      $('.aftersale-leftbara').click(function () {
        $('.aftersale-leftbara').css('background-image', '');
        $(this).css('background-image', 'linear-gradient(0deg,rgba(253, 162, 44, 1) 0%, rgba(247, 140, 41, 1) 78%, rgba(241, 118, 37, 1) 100%)');
      })
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
      $('.scollBox').on('mouseenter', '.sp-smallimg', function () {
        $(this).siblings('.hide-bigimg').show();
      })
      $('.scollBox').on('mouseenter', '.hide-bigimg', function () {
        $(this).show();
      })
      $('.scollBox').on('mouseleave', '.sp-smallimg', function () {
        $(this).siblings('.hide-bigimg').hide();
      })
      $('.scollBox').on('mouseleave', '.hide-bigimg', function () {
        $(this).hide();
      })
      //awaiting your response添加选中非选中
      var youresIndex = 0;
      $('#await-your-table').on('click', '.zcheckbox', function () {
        if ($(this).attr('src') == 'static/image/direct-orders/multiple1.png') {
          $(this).attr('src', 'static/image/direct-orders/multiple2.png');
          youresIndex++;
          if (youresIndex == $('#await-your-table .zcheckbox').length) {
            // alert('quanbuxuanzhogn')
            $('#await-your-table .zchecked-all').attr('src', 'static/image/direct-orders/multiple2.png');
          }
        } else {
          $(this).attr('src', 'static/image/direct-orders/multiple1.png');
          youresIndex--;
          if (youresIndex != $('#await-your-table .zcheckbox').length) {
            $('#await-your-table .zchecked-all').attr('src', 'static/image/direct-orders/multiple1.png');
          }

        }
      })
      //全选
      $('#await-your-table').on('click', '.zchecked-all', function () {
        if ($(this).attr('src') == 'static/image/direct-orders/multiple1.png') {
          $(this).attr('src', 'static/image/direct-orders/multiple2.png');
          youresIndex = $('#await-your-table .zcheckbox').length;
          $('#await-your-table .zcheckbox').attr('src', 'static/image/direct-orders/multiple2.png');
        } else {
          $(this).attr('src', 'static/image/direct-orders/multiple1.png');
          youresIndex = 0;
          $('#await-your-table .zcheckbox').attr('src', 'static/image/direct-orders/multiple1.png');
        }
      })
      //closed添加选中非选中
      var afcloseIndex = 0;
      $('#after-closed-table').on('click', '.zcheckbox', function () {
        if ($(this).attr('src') == 'static/image/direct-orders/multiple1.png') {
          $(this).attr('src', 'static/image/direct-orders/multiple2.png');
          afcloseIndex++;
          if (afcloseIndex == $('#after-closed-table .zcheckbox').length) {
            // alert('quanbuxuanzhogn')
            $('#after-closed-table .zchecked-all').attr('src', 'static/image/direct-orders/multiple2.png');
          }
        } else {
          $(this).attr('src', 'static/image/direct-orders/multiple1.png');
          afcloseIndex--;
          if (afcloseIndex != $('#after-closed-table .zcheckbox').length) {
            $('#after-closed-table .zchecked-all').attr('src', 'static/image/direct-orders/multiple1.png');
          }

        }
      })
      //全选
      $('#after-closed-table').on('click', '.zchecked-all', function () {
        if ($(this).attr('src') == 'static/image/direct-orders/multiple1.png') {
          $(this).attr('src', 'static/image/direct-orders/multiple2.png');
          afcloseIndex = $('#after-closed-table .zcheckbox').length;
          $('#after-closed-table .zcheckbox').attr('src', 'static/image/direct-orders/multiple2.png');
        } else {
          $(this).attr('src', 'static/image/direct-orders/multiple1.png');
          afcloseIndex = 0;
          $('#after-closed-table .zcheckbox').attr('src', 'static/image/direct-orders/multiple1.png');
        }
      })
      //completed添加选中非选中
      var afcompletIndex = 0;
      $('#after-copleted-table').on('click', '.zcheckbox', function () {
        if ($(this).attr('src') == 'static/image/direct-orders/multiple1.png') {
          $(this).attr('src', 'static/image/direct-orders/multiple2.png');
          afcompletIndex++;
          if (afcompletIndex == $('#after-copleted-table .zcheckbox').length) {
            // alert('quanbuxuanzhogn')
            $('#after-copleted-table .zchecked-all').attr('src', 'static/image/direct-orders/multiple2.png');
          }
        } else {
          $(this).attr('src', 'static/image/direct-orders/multiple1.png');
          afcompletIndex--;
          if (afcompletIndex != $('#after-copleted-table .zcheckbox').length) {
            $('#after-copleted-table .zchecked-all').attr('src', 'static/image/direct-orders/multiple1.png');
          }

        }
      })
      
      //全选
      $('#after-copleted-table').on('click', '.zchecked-all', function () {
        if ($(this).attr('src') == 'static/image/direct-orders/multiple1.png') {
          $(this).attr('src', 'static/image/direct-orders/multiple2.png');
          afcompletIndex = $('#after-copleted-table .zcheckbox').length;
          $('#after-copleted-table .zcheckbox').attr('src', 'static/image/direct-orders/multiple2.png');
        } else {
          $(this).attr('src', 'static/image/direct-orders/multiple1.png');
          afcompletIndex = 0;
          $('#after-copleted-table .zcheckbox').attr('src', 'static/image/direct-orders/multiple1.png');
        }
      })

      $scope.refundTypeList = {
        "1":'Back in balance',
        "2":'Return to the original way'
      }
      
      //滑出回复
      $scope.ticket = function (item, index) {
        console.log('item', item);

        $scope.jfStatus = item.status;//订单的纠纷状态
        $scope.replacementFreight = '';
        console.log($scope.jfStatus)
        $scope.tkMoney = item.money;
        $scope.disputeOrder = item.disputeOrder;
        $scope.itemId = item.ID;
        $scope.itemIndex = index;
        $scope.messageListArr = item.message;
        $scope.supplierId = item.supplierId;
        $scope.addressInformation = item.address_information;
        $scope.trackingNumber = item.tracking_number
        $scope.status = item.status;
        var marginL = -$('.disputecenter-wrap').width() / 2;
        $('.disputecenter-wrap').stop().animate({
          left: '50%',
          marginLeft: marginL
        }, 500);
        $scope.nowType = item.type;
        $scope.tdetailDate = utils.parseTime(new Date(item.createDate.time), 'yyyy-MM-dd hh:mm:ss');
        $scope.detailData = item.message;//纠纷对话列表
        $scope.refundType = item.refund_type // 退款途径
        $scope.userName = item.userName;
        $scope.serverName = item.salesmanName;
        console.log($scope.nowType, $scope.tdetailDate, $scope.detailData)
        //获取客户业务员名字的第一个字母
        $scope.cusNameFir = $scope.userName.slice(0, 1).toUpperCase();
        $scope.salseNameFir = $scope.serverName.slice(0, 1).toUpperCase();
        // 创建视频
        videoList(dsp, item)
        console.log($scope.salseNameFir, $scope.cusNameFir)
        //是否是补发的
        $scope.disputeStatus = -1
        if (item.disputeOrder) {
          layer.load(2)
          var bfData = {};
          bfData.id = item.ID;
          bfData.type = 'cj';
          dsp.postFun('app/dispute/getOrderAddress', JSON.stringify(bfData), function (data) {
            layer.closeAll('loading')
            if (data.data.address.id) {
              $scope.hasCreat = true;//补发是否创建成功
              var resObj = data.data.address;
              $scope.productList = data.data.products;
              $scope.recoCity = resObj.city;
              $scope.recoProvin = resObj.province;
              $scope.recoCountrycode = resObj.countryCode;
              $scope.recoCustomerName = resObj.customerName;
              $scope.recoShippingAddress = resObj.shippingAddress;
              $scope.recoShippingAddress2 = resObj.shippingaddress2;
              $scope.recoZip = resObj.zip;
              $scope.logisticName = resObj.logisticName;
              $scope.replacementFreight = resObj.replacementFreight;
            } else {
              $scope.hasCreat = false;//补发是否创建成功
              layer.msg('Something wrong with the resend orders, please contact your agent.', { time: 3000 })
            }
          }, function (data) {
            layer.closeAll('loading')
          })
          let paramsStatus = {
            orderNumber: item.ID
          }
          console.log(item)
          // 以后更换列表接口
          $scope.disputeStatus = item.paymentStatus || -1
            dsp.postFun('app/pay/getPayStatus', JSON.stringify(paramsStatus), function (data) {
              $scope.disputeStatus = data.data.data.status
              $scope.disputeStatusName = data.data.data.paymentType
            }, function (data) {
              $scope.disputeStatus = -1
            })
        }
      }

      // 退款至什么平台
      $scope.refundPlatformName = function(name){
        let result = {
          'PayPal':'PayPal account',
          'stripeCharges':'bank account of payment'
        }[name]
        if(!result) result = 'wallet'
        return result
      }

      //是否同意补发
      $scope.bfAgreeFun = function () {
        if ($scope.replacementFreight && $scope.replacementFreight > 0) {
          var itemId = bs.encode($scope.itemId);
          var yunFeiNum = bs.encode($scope.replacementFreight)
          location.href = 'myCJ.html?route=payment#/payment/' + itemId + '/' + yunFeiNum + '/' + bs.encode('1') + '/dispute';
        } else {
          var bfData = {};
          bfData.id = $scope.itemId;
          layer.load(2);
          dsp.postFun('app/dispute/agreeReissueOrder', bfData, function (data) {
            console.log(data)
            if (data.data.result) {
              layer.closeAll('loading');
              layer.msg('Thanks, This dispute completed.')
              getList(dsp, $scope);
              $scope.closeTicket();
            } else {
              layer.closeAll('loading');
              layer.msg('This operation is not supported. Please contact your agent for help.')
            }
          }, function (data) {
            layer.closeAll('loading');
            console.log(data)
          })
        }

      }
      $scope.confirmReceipt = function() {
        var params = {
          id: $scope.itemId
        }
        dsp.postFun('cjSupplier/supplierDisputeInfo/confirmReceipt ', params, function (data) {
            if (data.data.code === 200) {
              layer.msg('Thanks, This dispute completed.')
              getList(dsp, $scope);
              $scope.closeTicket();
            } else {
              layer.msg('Agree Failed')
            }
          }, function (data) {
            console.log(data)
        })
      }
      // $scope.bfDisAgreeFun = function () {
      //     layer.msg('未开发,怎么做')
      // }
      // 关闭ticket
      $scope.closeTicket = function () {
        $('.disputecenter-wrap').stop().animate({
          left: '110%',
          marginLeft: 0
        }, 100)
      }
      // 请求视频地址
      function videoList(dsp, item) {
        if(!item.message) return true;
        for (let [i, list] of item.message.entries()) {
          if (list.videoUrl && list.videoUrl.length > 0) {
            for (let [j, videoList] of list.videoUrl.entries()) {
              let id = 'J_prismPlayer' + (i + 1) + '_' + (j + 1);
              let vid = videoList.vid;
              // videoPath(dsp, {id, vid});
              videoPlay({ id, vid })
            }
          }
        }
      }
      // 请求视频地址
      // function videoPath (dsp, {id, vid}) {
      //   dsp.getFun('tool/downLoad/getVideoPlayAuth?videoId='+vid ,function(data){
      //     videoPlay({id, vid, playAuth: data.data.playAuth});
      //   },function () {})
      // }
      function videoPlay({ id, vid }) {//创建纠纷时上传的视频
        cjUtils.getVideoInfo({
          eleId: id,
          videoId: vid,
          configuration: {
            width: '300px',     //视频宽度
            height: '160px',     //视频高度
          },
          hasWater: false,
          callback: player => {
            player.on('ready', () => {
              layer.closeAll('loading')
            })
          }
        })
      }

      //上传图片
      $scope.imgArr = [];
      let loadList = {
        img: ['png', 'jpg', 'jpeg', 'gif', "PNG", "JPG", "JPEG", "GIF"],
        video: ['mp4', 'avi', 'wmv', 'mpg', 'mov', 'flv', "MP4", "AVI", "WMV", "MPG", "MOV", "FLV"]
      };
      $scope.upLoadImg4 = function (files) {
        console.log(files)
        let validFileArr = [];
        if (files) {
          let fileType, fileName;
          for (let i = 0, len = files.length; i < len; i++) {
            fileName = files[i].name;
            fileType = fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length).toLowerCase();
            console.log(fileName, fileType)
            if (loadList.img.indexOf(fileType) != -1) {
              validFileArr.push(files[i])
            }
          }
          console.log(validFileArr)
        }
        if (validFileArr.length < 1 && files.length > 0) {
          layer.msg('Images format error')
          return
        }
        dsp.ossUploadFile(validFileArr, function (data) {
          console.log(data)
          if (data.code == 0) {
            layer.msg('Images Upload Failed');
            return;
          }
          if (data.code == 2) {
            layer.msg('Images Upload Incomplete');
          }
          var result = data.succssLinks;
          console.log(result)
          var filArr = [];
          for (var j = 0; j < result.length; j++) {
            var srcList = result[j].split('.');
            var fileName = srcList[srcList.length - 1].toLowerCase();
            console.log(fileName)
            if (fileName == 'png' || fileName == 'jpg' || fileName == 'jpeg' || fileName == 'gif') {
              $scope.imgArr.push(result[j]);
            }
          }
          if ($scope.imgArr && $scope.imgArr.length >= 8) {
            $scope.hideUpImgFlag = true;
          }
          $('.upload-imgsinp').val('')
          // $scope.imgArr = filArr;
          console.log($scope.imgArr)
          $scope.$apply();
        })
      }
      // 删除上传的图片
      $scope.delImg = (index, event) => {
        event.stopPropagation();
        $scope.imgArr.splice(index, 1);
        //   $scope.imgOssArr.splice(index, 1);
        if ($scope.imgArr.length < 8) {
          $scope.hideUpImgFlag = false;
        }
      };
      // 上传视频
      $scope.UploadVideoList = [];
      $scope.videoId = [];
      $scope.videoArr = [];
      $scope.upLoadImg5 = function (files) {
        let file = files[0];
        let fileName = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase();
        if (loadList.video.indexOf(fileName) == -1) {
          layer.msg('Video format error');
          return;
        }
        if ($scope.videoArr.length == 4) {
          layer.msg('Upload four video at most');
          return;
        }
        if (file.size / 1024 / 1024 > 20) {
          layer.msg('Video file size limited to 20M');
          return;
        }
        dsp.load(2);
        let uploader = cjUtils.createUploader({
          url: 'https://tools.cjdropshipping.com/tool/downLoad/token',
          type: 1,
          addFileSuccessFn: ({ uploadInfo }) => {
            console.log('视频添加成功 =>', uploadInfo)
          },
          onUploadProgress: ({ uploadInfo, totalSize, progress }) => {
            console.log('上传进度 uploadInfo =>', uploadInfo, 'toalSize =>', totalSize, 'progress =>', progress)
            let progressPercent = Math.ceil(progress * 100);
            console.log('进度 =>', progressPercent)
          },
          success: ({ uploadInfo }) => {
            console.log('上传成功 =>', uploadInfo);
            $scope.videoArr.push({ vid: uploadInfo.videoId });
            console.log($scope.videoArr)
            videoUploadPlay({ vid: uploadInfo.videoId });
            if ($scope.videoArr && $scope.videoArr.length >= 4) {
              $scope.hideUpVideoFlag = true;
            }
            $('.upload-file').val('')
          },
          error: ({ uploadInfo, code, message }) => {
            layer.closeAll("loading");
            console.log("上传失败" + uploadInfo.file.name + ",code:" + code + ", message:" + message)
          },
          onUploadEnd: ({ uploadInfo }) => {
            console.log("全部上传结束 =>", uploadInfo);
          }
        });
        /** 添加视频 **/
        uploader.addFile(file, null, null, null, '{"Vod":{}}');  //file就是视频文件
        /** 开始上传 **/
        uploader.startUpload();
      };
      // 删除上传的视频
      $scope.delVideo = (index) => {
        $scope.videoArr.splice(index, 1);
        $scope.videoOssArr.splice(index, 1);
        if ($scope.videoArr.length < 4) {
          $scope.hideUpVideoFlag = false;
        }
      };

      // 视频创建播放
      function videoUploadPlay() {
        let len = $scope.videoArr.length;
        let id = 'J_prismPlayer' + len;
        let vid = $scope.videoArr[len - 1].vid;
        $timeout(() => {
          cjUtils.getVideoInfo({
            eleId: id,
            videoId: vid,
            configuration: {
              width: '300px',     //视频宽度
              height: '160px',     //视频高度
            },
            hasWater: false,
            callback: player => {
              player.on('ready', () => {
                layer.closeAll('loading')
              })
            }
          })

        }, 10000)
      }

      //回复纠纷的按钮
      $scope.replyFun = function () {
        if ($scope.replyText) {
          layer.load(2)
          // var listArr = [];
          var listObj = {};//存储一条消息内容
          listObj.userName = '0';//客户
          listObj.image = $scope.imgArr;
          listObj.remark = $scope.replyText;
          listObj.videoUrl = $scope.videoArr;
          listObj.date = timestampToTime(new Date())
          // listArr.push(listObj);
          console.log(listObj)
          console.log(listArr)
          // 冗错
          if (!$scope.messageListArr) {
            $scope.messageListArr = [];
          }
          $scope.messageListArr.push(listObj)
          var listArr = JSON.stringify($scope.messageListArr)
          var upData = {};
          upData.id = $scope.itemId;
          if($scope.supplierId) {
            upData.responseType = "supplier"
          } else {
            upData.responseType = 'ERP';
          }
          upData.message = listArr;
          dsp.postFun('app/dispute/replyDispute', JSON.stringify(upData), function (data) {
            console.log(data)
            layer.closeAll('loading');
            if (data.data.result == true || data.data.result == 200) {
              $scope.closeTicket();//关闭纠纷单
              layer.msg('Replied Successfully')
              $scope.ordersList[$scope.itemIndex].message = $scope.messageListArr;
              $scope.replyText = '';
              $scope.imgArr = [];
              $scope.videoArr = [];
              getList(dsp, $scope);
            } else {
              // $scope.messageListArr.pop()
              layer.msg('Reply Failed')
            }
          }, errFun)
        } else {
          layer.msg('Please input some information.')
          return;
        }
      }
      //客户关闭纠纷
      $scope.closeJfFun = function () {
        $scope.closeJfFlag = true;
      }
      $scope.qxCloseFun = function () {
        $scope.closeJfFlag = false;
      }
      $scope.sureCloseFun = function () {
        $scope.closeJfFlag = false;
        layer.load(2)
        var upId = {};
        upId.id = $scope.itemId;
        if($scope.supplierId) {
          upId.supplierId = $scope.supplierId
        }
        dsp.postFun('app/dispute/cancelDispute', JSON.stringify(upId), function (data) {
          console.log(data)
          layer.closeAll('loading')
          if (data.data.result == true) {
            layer.msg('Closed Sucess')
            getList(dsp, $scope);
            $scope.closeTicket();
            let idsArr = [$scope.itemId]
            dsp.postFun('orderUsa/disputeOrder/updateOrderDispute',{
              ids:idsArr
            },function(data){

            },errFun)
          } else {
            layer.msg('This operation is not supported. Please contact your agent for help.')
          }
        }, errFun)
      }
      //客户拒绝退款 重发
      $scope.cusDisAgreeFun = function () {
        $scope.disAgreeFlag = true;
      }
      //取消拒绝
      $scope.qxjjFun = function () {
        $scope.disAgreeFlag = false;
      }
      //确定拒绝
      $scope.sureDisAgreeFun = function () {
        if (!$scope.refuseCause) {
          layer.msg('Please fill in refuse reason')
          return;
        }
        layer.load(2)
        var listObj = {};//存储一条消息内容
        listObj.userName = '0';//客户
        // listObj.image = $scope.imgArr;
        listObj.remark = $scope.refuseCause;
        listObj.date = timestampToTime(new Date())
        listObj.refuseCause = $scope.refuseCause;
        listObj.refuseMoney = $scope.tkMoney;
        // 冗错
        if (!$scope.messageListArr) {
          $scope.messageListArr = [];
        }
        $scope.messageListArr.push(listObj)
        var listArr = JSON.stringify($scope.messageListArr)
        var upId = {};
        upId.id = $scope.itemId;
        if($scope.supplierId) {
          upId.supplierId = $scope.supplierId;
        }
        // upId.refuseCause = $scope.refuseCause;
        upId.message = listArr;
        dsp.postFun('app/dispute/refuseProposal', JSON.stringify(upId), function (data) {
          console.log(data)
          layer.closeAll('loading');
          if (data.data.result == true) {
            layer.msg('Refuse Success')
            $scope.ordersList[$scope.itemIndex].message = $scope.messageListArr;
            $scope.disAgreeFlag = false;//关闭客户不同意退款弹框
            $scope.closeTicket();//关闭纠纷弹框
            getList(dsp, $scope);
          } else {
            layer.msg('This operation is not supported. Please contact your agent for help.')
          }
        }, errFun)
      }
      //客户同意退款
      $scope.cusAgreeFun = function () {
        layer.load(2)
        var upId = {};
        upId.id = $scope.itemId;
        if($scope.supplierId) {
          dsp.postFun('cjSupplier/supplierDisputeInfo/confirmReceipt', upId, function (data) {
          console.log(data)
          layer.closeAll('loading')
          if (data.data.result == true) {
            layer.msg('Thanks, This dispute completed.')
            getList(dsp, $scope);
            $scope.closeTicket();
          }
        }, errFun)
        } else {
          dsp.postFun('app/dispute/orderRefund', JSON.stringify(upId), function (data) {
            console.log(data)
            layer.closeAll('loading')
            if (data.data.result == true) {
              layer.msg('Thanks, This dispute completed.')
              getList(dsp, $scope);
              $scope.closeTicket();
            }else{
              layer.msg('This operation is not supported. Please contact your agent for help.')
            }
          }, errFun)
        }

      }
      //点击上传的图片显示大图
      $scope.viewBigImg = function (item) {
        $scope.viewImgFlag = true;
        $scope.bigImgSrc = item;
        console.log(item)
      }
      $scope.closePreImg = function () {
        $scope.viewImgFlag = false;
      }


      $scope.disputeResolution = (item, index) => {
        layer.confirm('Confirm to open dispute mediation. ', {
            title: false,
            closeBtn: 0,
            btn: ['Confirm', 'Cancel'] //按钮
        }, function (index) {
          console.log(item, '哔啵哔啵')
            layer.close(index);
            var params = {};
            params.id = item.ID;
            params.supplierId = item.supplierId;
            params.type = item.type;
            params.expectResult = item.expectResult;
            params.orderMoney = item.orderMoney;
            params.orderNumber = item.ID;
            dsp.postFun('app/cjSupplierDispute/opencjSupplierDisputeMediate', params, function (data) {
            console.log(data)
            layer.closeAll('loading')
            if (data.data.code == 200) {
              layer.msg('Submitted successfully, we will contact you within 3 jobs')
              getList(dsp, $scope);
            }else{
              layer.msg('Agree Failed')
            }
          }, errFun)
        });
      }

      $scope.showMediationDetail = (item, index) => {
        var params = {};
        params.orderId = item.ID;
        dsp.postFun('erp/CjSupplierErpDisputes/selectDisputesLog', params, function (res) {
        if(res.data.code === 200) {
          $scope.mediateList = res.data.result;
          $scope.mediateControl = true;
        }
        layer.closeAll('loading')
      }, errFun)
      }

      $scope.closeMediate = () => {
        $scope.mediateControl = false;
      }



      //子订单的详情
      // $('.orders-list').on('click','.zi-order-num',function () {
      //  location.href="#/order-detail";
      // })
      $scope.hrefLinkFun = function (item) {
        var id = item.ID;
        var istrackFlag;
        if (item.TRACKINGNUMBER) {
          istrackFlag = 2;
        } else {
          istrackFlag = 1;
        }
        var isafter = 3;
        console.log(isafter)
        // location.href="#/order-detail/"+id+'/'+istrackFlag;
        window.open("#/order-detail/" + id + '/' + istrackFlag + '/' + isafter)
      }
      function errFun(data) {
        console.log(data)
        layer.closeAll('loading');
      }
      //格式化时间
      function timestampToTime(date) {
        var Y, M, D, h, m, s
        Y = date.getFullYear() + '-';
        M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        D = date.getDate() + ' ';
        h = date.getHours() + ':';
        m = date.getMinutes() + ':';
        s = date.getSeconds();
        return Y + M + D + h + m + s;
      }

    // stripe和checkuot交易状态查询
    function stripeTradeQuery(parmas) {
      layer.load(2)
      dsp.postFun('app/pay/stripeTradeQuery', parmas, ({data}) => {
        layer.closeAll('loading')
        if(data.code == 200) {
          $scope.stripeStatus = +data.data
          if(parmas && parmas.paymentType === 'Stripe') {
            /** 1待支付 2支付中 3支付成功 4支付失败 5支付异常 6支付取消 */
            switch(+data.data) {
              case 1:  
                layer.msg('Awaiting payment confirmation. Please refresh and check it later.');
                break;
              case 2: 
                layer.msg('Awaiting payment confirmation. Please refresh and check it later.');
                break
              case 3: 
                layer.msg('Payment Successful.');
                break;
              case 4: 
                layer.msg('Payment via Stripe failed. Please try again.');
                break;
              case 5: 
                layer.msg('Payment via Stripe failed. Please try again.');
                break;
              case 6: 
                layer.msg('Payment via Stripe failed. Please try again.');
                break;
              default:  ''
            }
          }
          if(parmas && parmas.paymentType === 'Checkout') {
            /** 1待支付 2支付中 3支付成功 4支付失败 5支付异常 6支付取消 */
            switch(+data.data) {
              case 1:  
                layer.msg('Awaiting Payment.');
                break;
              case 2: 
                layer.msg('Awaiting payment confirmation. Please refresh and check it later.');
                break;
              case 3: 
                layer.msg('Payment Successful.');
                break;
              case 4: 
                layer.msg('Payment via CheckOut failed. Please try again.');
                break;
              case 5: 
                layer.msg('Payment via CheckOut failed. Please try again.');
                break;
              case 6: 
                layer.msg('Payment Cancelled.');
                break;
              default: break;
            }
            // window.location.href = window.location.origin + '/myCJ.html#/after-sale//'
            getList(dsp, $scope);
          }
        } else {
          return layer.msg(data.msg)
        }
      }, err => {
        console.log(err);
      })
    }

  // stripe交易状态查询
  function getStripeTrade() {
    const stripeObj = bs.decode(localStorage.getItem('stripeObj') || '') && JSON.parse(bs.decode(localStorage.getItem('stripeObj') || ''));
    localStorage.removeItem('stripeObj')
    if(!(stripeObj && stripeObj.orderId)) {
      return
    }
    const ordid = $stateParams.ordid;
    if(ordid !== stripeObj.showOrdId) {
      return
    }
    const parmas = {
      'orderId': stripeObj && stripeObj.orderId,
      'code': stripeObj && stripeObj.stripeCode,
      'payId': stripeObj && stripeObj.payId,
      'paymentType': stripeObj && stripeObj.paymentType,
    }
    stripeTradeQuery(parmas)
    }
    getStripeTrade()

    // checkout交易状态查询
    function getCheckoutTrade() {
      const checkoutObj = bs.decode(localStorage.getItem('checkoutObj') || '') && JSON.parse(bs.decode(localStorage.getItem('checkoutObj') || ''));
      localStorage.removeItem('checkoutObj')
      localStorage.removeItem('ckoSessionId')
      if(!(checkoutObj && checkoutObj.paymentType === 'Checkout')) {
        return
      }
      const parmas = {
        'orderId': checkoutObj && checkoutObj.orderId,
        'code': checkoutObj && checkoutObj.stripeCode,
        'paymentType': checkoutObj && checkoutObj.paymentType,
        'payId': checkoutObj && checkoutObj.payId,
        'sessionId': $scope.ckoSessionId
      }
      stripeTradeQuery(parmas)
    }

    }]);

  return app;
}