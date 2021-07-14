import { NODE_ENV } from '@root_egg/env';
const awinTesMode = ['testnew', 'development', 'test'].includes(NODE_ENV) ? 1 : 0;
export function dropProcessingFactory(angular) {
  const app = angular.module('drop-processing.module', ['service']);

  app.controller('drop-processing.ctrl', ['$scope', 'dsp', '$stateParams',
    function ($scope, dsp, $stateParams) {
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
      $scope.dataFound = true;

      //高级搜索
      $scope.showFilter = false;//显示隐藏filter
      $scope.filterObj = {
        storeProductName: '',
        cjProductName: '',
        buyerName: '',
        weight: '',
        sku: ''
      }
      var bs = new Base64();
      var base64 = new Base64();
      var userId = localStorage.getItem('userId') ? bs.decode(localStorage.getItem('userId')) : '';
      // 获取个人信息
      const token = localStorage.getItem('token') ? bs.decode(localStorage.getItem('token')) : "";
      var customerCjNum = localStorage.getItem('customerCjNum') || '';
      const noInvoiceArr = dsp.noInvoiceArr;
      function getUserInfo() {
        const params = {
          data: JSON.stringify({ userId, token })
        }
        dsp.postFun('app/info/userinfo', params, ({data})=> {
          const result = JSON.parse(data.result)[0]
          const cjNum = result.num;
          localStorage.setItem('customerCjNum',cjNum)
          $scope.isHideInvoiceFlag = noInvoiceArr.includes(cjNum)
        }, function (data) {
          console.log(data)
        })
      }
      if(!customerCjNum){
        getUserInfo()
      }else{
        $scope.isHideInvoiceFlag = noInvoiceArr.includes(customerCjNum)
      }
      dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0);
      //设置默认时间
      function GetDateStr(AddDayCount) {
        var dd = new Date();
        dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期 
        var y = dd.getFullYear();
        var m = dd.getMonth() + 1;//获取当前月份的日期 
        var d = dd.getDate();
        if (m < 10) {
          m = '0' + m
        }
        if (d < 10) {
          d = '0' + d
        }
        return y + "-" + m + "-" + d;
      }
      var aDate = GetDateStr(-45);
      $("#cj-stime").val(aDate);   //关键语句

      $('.orders-table').on('mouseenter', '.order-detail', function () {
        // $(this).next().show();
        $('.orders-table .order-detail').removeClass('order-detail-active');
        $(this).addClass('order-detail-active');
      })
      $('.orders-table').on('mouseleave', '.order-detail', function () {
        $(this).next().hide();
      })
      $('.orders-table').mouseleave(function () {
        $('.orders-table .order-detail').removeClass('order-detail-active');
      });
      $scope.navList = [
        {name:'Awaiting Payment',href:'#/dropshipping-orders'},
        {name:'Processing',href:'#/drop-proce',show:true},
        {name:'Processed',href:'#/drop-processed'},
        {name:'Completed',href:'#/drop-complet'},
        {name:'Closed',href:'#/drop-close'},
      ]
      //导出订单的提示
      $('.export-orders').click(function () {
        layer.msg('This feature will work soon.')
      });
      //判断数字是否存在
      $scope.classNumber = function (n) {
        if (!n) {
          return 0;
        } else {
          return n;
        }
      }

      $scope.pageNum = 1;
      $scope.pageSize = '50';
      $scope.cjdropawaitpList = '';//存储所有的订单
      $scope.erpordTnum = '';//存储订单的条数

      function getList () {
        $scope.cjdropawaitpList = [];
        dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0);
        var orData = {};
        var ordId = $.trim($('.ord-search-inp').val());
        var notMuOrdNumFlag = false;
        console.log(ordId)
        var dapData = {};
        tjFun(dapData);
        dapData.data.dateBegin = '';//cj开始时间
        dapData.data.dateEnd = '';//cj开始时间
        if (ordId.indexOf('CJ') >= 0) {
          dapData.data.numid = ordId;
          notMuOrdNumFlag = false;
        } else {
          if (ordId) {
            dapData.data.orderId = ordId;
            notMuOrdNumFlag = true;
          }
        }
        tjFun(orData)
        orData.data = JSON.stringify(orData.data)
        console.log(orData.data)
        dsp.postFun('app/order/queryShipmentsOrder', JSON.stringify(orData), function (data) {
          console.log(data.data);
          var cjdropawaitp = JSON.parse(data.data.result)
          $scope.erpordTnum = cjdropawaitp.countNumber;
          $scope.cjdropawaitpList = cjdropawaitp.orderList;//获取所有的订单
          console.log($scope.cjdropawaitpList)
          if (notMuOrdNumFlag) {
            if ($scope.erpordTnum > 0) {
              var muordid = $scope.cjdropawaitpList[0].ID;
              var ziid = ordId;
              muordid = bs.encode(muordid);
              ziid = bs.encode(ziid);
              location.href = '#/drop-proce-zi/' + muordid + '/' + ziid + '//';
            }
          }
          if ($scope.erpordTnum > 0) {
            dsp.removeNodataPic($('.orders-list'))
            dsp.closeLoadPercent($('.orders-list'))
          } else {
            dsp.addNodataPic($('.orders-list'),$(window).height()-171,47,0,{width:'100%'})
            dsp.closeLoadPercent($('.orders-list'))
          }
          $scope.ordstatusNum = cjdropawaitp.allOrderCount2;//各种状态订单的数量
          numFun();//调用给订单赋值的函数
          $scope.totalCounts = Math.ceil($scope.erpordTnum / $scope.pageSize);
          $scope.$broadcast('page-data', {
            pageNum: $scope.pageNum,
            totalNum: $scope.totalCounts,
            totalCounts: $scope.erpordTnum,
            pageSize: $scope.pageSize,
            pagesizeList: ['30','50','100']
          });
        }, function () {
          layer.closeAll("loading")
          dsp.closeLoadPercent($('.orders-list'))
          dsp.cjMesFun(1);
        })
      }
      getList()
      $scope.$on('pagedata-fa', function (d, data) {
        console.log(data)
        $scope.pageNum = data.pageNum;
        $scope.pageSize = data.pageSize;
        getList();
      });

      //获取url中的参数方法
      function getUrlParamByKey (href, key) {
        if(!href) return ''
        var vars = href.split("&");
        for (var i = 0;i < vars.length; i++) {
          var pair = vars[i].split("=");
          if(pair[0] == key) { return pair[1]; }
        }
      }

      //获取地址栏的链接
      function initIsCheckout() {
        // 判断当前是否存在ckosessionid
        $scope.ckoSessionId = bs.decode(localStorage.getItem('ckoSessionId') || '') && JSON.parse(bs.decode(localStorage.getItem('ckoSessionId') || ''))
        if($scope.ckoSessionId) {
          getList(dsp, $scope)
          getCheckoutTrade()
          return 
        }
        var href = window.location.href;
        if (href.indexOf('?') >= 0) {
          const regexp = /\?[\w\W]*\#/
          $scope.sessionId = getUrlParamByKey(href.match(regexp) && href.match(regexp)[0].slice(1,-1),'cko-payment-id') || getUrlParamByKey(href.match(regexp) && href.match(regexp)[0].slice(1,-1),'cko-session-id')
          if($scope.sessionId) {
            localStorage.setItem('ckoSessionId', bs.encode(JSON.stringify($scope.sessionId)));
            // 后端接口返回状态较慢，延迟一秒再刷新当前页面
            let timer = setTimeout(() => {
              clearTimeout(timer)
              window.location.href = window.location.origin + '/myCJ.html#/drop-proce'
            }, 200)
            getList(dsp, $scope)
            return
          }
          var hrefArr = href.split('?');
          var paydataArr = hrefArr[1].split('&')
          var lengthPay = paydataArr.length;
          if (lengthPay == 3) {
            var paymentArr = paydataArr[0].split('=');
            var tokenArr = paydataArr[1].split('=');
            var payidArr = paydataArr[2].split('=');

            var payCS = {};
            payCS.paymentId = paymentArr[1];
            payCS.token = tokenArr[1];
            payCS.payerID = payidArr[1];
            payCS.code = 1;
            payCS.awc = dsp.getCookie("awc") || '';

            console.log(payCS)
            console.log(JSON.stringify(payCS))
            var isToken = localStorage.getItem('payToken');
            console.log(isToken)
            if (isToken == tokenArr[1]) {
              return;
            } else {
              dsp.postFun('app/pay/pay', JSON.stringify(payCS), function (data) {
                console.log(data)
                if (data.data.result !== true) {
                  console.log(1111)
                  layer.msg('Payment Failed')
                } else {
                  layer.msg('Payment Succeed')
                  localStorage.setItem('payToken', tokenArr[1])
                  
                  $scope.pageNum = 1;
                  getList()

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
        }
      }
      initIsCheckout()

      //给导航按钮添加点击事件 隐藏子订单
      $('.drop-orderstatus-nav').click(function () {
        $('.dropshippingStatus-nav').show();
        // 隐藏子订单页面
        $('.processing-subOrders').hide();
      })

      // 给处理订单的按钮添加鼠标移入移出
      $('.deal-style').hover(function () {
        $(this).css('background-color', 'rgb(249, 148, 41)');
        $(this).css('color', '#fff');
      }, function () {
        $(this).css('background-color', '');
        $(this).css('color', '#f99429');
      })
      // 给导出订单的按钮添加鼠标移入移出
      $('.export-orders').hover(function () {
        $(this).css('background-color', 'rgb(11, 98, 130)');
      }, function () {
        $(this).css('background-color', 'rgb(11, 78, 103)');
      })
      //给processing下的订单添加选中非选中
      var proceIndex = 0;
      $('#proce-table').on('click', '.zcheckbox', function () {
        if ($(this).attr('src') == 'static/image/direct-orders/multiple1.png') {
          $(this).attr('src', 'static/image/direct-orders/multiple2.png');
          proceIndex++;
          if (proceIndex == $('#proce-table .zcheckbox').length) {
            // alert('quanbuxuanzhogn')
            $('#proce-table .zchecked-all').attr('src', 'static/image/direct-orders/multiple2.png');
          }
        } else {
          $(this).attr('src', 'static/image/direct-orders/multiple1.png');
          proceIndex--;
          if (proceIndex != $('#proce-table .zcheckbox').length) {
            $('#proce-table .zchecked-all').attr('src', 'static/image/direct-orders/multiple1.png');
          }

        }
      })
      //全选
      $('#proce-table').on('click', '.zchecked-all', function () {
        if ($(this).attr('src') == 'static/image/direct-orders/multiple1.png') {
          $(this).attr('src', 'static/image/direct-orders/multiple2.png');
          proceIndex = $('#proce-table .zcheckbox').length;
          $('#proce-table .zcheckbox').attr('src', 'static/image/direct-orders/multiple2.png');
        } else {
          $(this).attr('src', 'static/image/direct-orders/multiple1.png');
          proceIndex = 0;
          $('#proce-table .zcheckbox').attr('src', 'static/image/direct-orders/multiple1.png');
        }
      })

      var zproIndex = 0;
      $('#zproce-tab').on('click', '.zcheckbox', function () {
        if ($(this).attr('src') == 'static/image/direct-orders/multiple1.png') {
          $(this).attr('src', 'static/image/direct-orders/multiple2.png');
          zproIndex++;
          if (zproIndex == $('#zproce-tab .zcheckbox').length) {
            // alert('quanbuxuanzhogn')
            $('#zproce-tab .zchecked-all').attr('src', 'static/image/direct-orders/multiple2.png');
          }
        } else {
          $(this).attr('src', 'static/image/direct-orders/multiple1.png');
          zproIndex--;
          if (zproIndex != $('#zproce-tab .zcheckbox').length) {
            $('#zproce-tab .zchecked-all').attr('src', 'static/image/direct-orders/multiple1.png');
          }

        }
      })
      //全选
      $('#zproce-tab').on('click', '.zchecked-all', function () {
        if ($(this).attr('src') == 'static/image/direct-orders/multiple1.png') {
          $(this).attr('src', 'static/image/direct-orders/multiple2.png');
          zproIndex = $('#zproce-tab .zcheckbox').length;
          $('#zproce-tab .zcheckbox').attr('src', 'static/image/direct-orders/multiple2.png');
        } else {
          $(this).attr('src', 'static/image/direct-orders/multiple1.png');
          zproIndex = 0;
          $('#zproce-tab .zcheckbox').attr('src', 'static/image/direct-orders/multiple1.png');
        }
      })
      $('.d-direct-right').css({
        'min-height': $(window).height() * 1 - 15 + 'px'
      });

      
      //给订单状态赋值的函数
      function numFun() {
        $scope.awaitNum = $scope.ordstatusNum.yi;
        $scope.dropprocessNum = $scope.ordstatusNum.er;
        $scope.dropprocessedNum = $scope.ordstatusNum.san;
        $scope.completeNum = $scope.ordstatusNum.si;
        $scope.closedNum = $scope.ordstatusNum.wu;
        // $scope.dispatchNum = $scope.ordstatusNum.liu;
      }

      //订单号搜索
      $('.ord-search-inp').keypress(function (Event) {
        if (Event.keyCode == 13) {
          $scope.searchOrdNumFun();
        }
      })
      function tjFun(cs) {
        var ordId = $.trim($('.ord-search-inp').val());
        var data = {};
        cs.data = {};
        cs.data.status = '2';
        cs.data.page = $scope.pageNum - 0;
        if (ordId.indexOf('CJ') >= 0) {
          cs.data.numid = ordId;
        } else {
          cs.data.orderId = ordId;
        }
        cs.data.limit = $scope.pageSize - 0;
        cs.data.dateBegin = $('#cj-stime').val();//cj开始时间
        cs.data.dateEnd = $('#cj-etime').val();//cj开始时间
        //高级搜索
        cs.data.storeOrderDateBegin = $('#filter-startdate').val();
        cs.data.storeOrderDateEnd = $('#filter-enddate').val();
        cs.data.storeProductName = $scope.filterObj.storeProductName;
        cs.data.cjProductName = $scope.filterObj.cjProductName;
        cs.data.buyerName = $scope.filterObj.buyerName;
        cs.data.weight = $scope.filterObj.weight;
        cs.data.sku = $scope.filterObj.sku;
      }
      //按订单号搜索
      $scope.searchOrdNumFun = function () {
        $scope.pageNum = 1;
        getList()
      }
      //根据订单状态查询订单
      $scope.enterZiFun = function (item, stu) {
        var muordid = bs.encode(item.ID)
        console.log(stu)
        //将纠纷请求参数存入
        stu == 5 ? localStorage.setItem('drop-proce-isDispute', 1) : localStorage.setItem('drop-proce-isDispute', 0); 
        location.href = '#/drop-proce-zi/' + muordid + '/' + '/' + stu + '/';
      }
      //cj开始日期搜索
      $("#cj-stime").click(function () {
        var cjendtime = $("#cj-stime").val();
        var interval = setInterval(function () {
          var endtime2 = $("#cj-stime").val();
          if (endtime2 != cjendtime) {
            // alert(endtime2+'!='+cjendtime)
            $scope.cjdropawaitpList = [];
            dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0);
            clearInterval(interval);
            $scope.pageNum = 1;
            getList()
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
            $scope.cjdropawaitpList = [];
            dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0);
            clearInterval(interval);
            $scope.pageNum = 1;
            getList()
          }
        }, 100)
      })

      //点击子订单的返回按钮 隐藏子订单
      $('.back-mu-ord').click(function () {
        $('.sub-orders').hide();
        $('.dropshippingStatus-nav').show();
      })
      var aa = {};//存储 需要拼接发送的参数

      $scope.ziordFun = function (item) {
        // 隐藏二级界面
        // alert(3234)
        // $('.dropshippingStatus-nav').hide();
        console.log(item);
        var muordid = bs.encode(item.ID);
        location.href = '#/drop-proce-zi/' + muordid + '///' + $scope.filterObj.sku;
      }
      $scope.gotoNofh = function (item) {
        var muordid = bs.encode(item.ID);
        location.href = '#/drop-proce-zi/1/' + muordid + '//';
      }
      //导出订单
      $scope.dcordFlag = false;
      $scope.dcordCallbackFlag = false;//返回链接弹框
      $scope.exportOrdFun = function (item) {
        $scope.dcordFlag = true;
        $scope.itemId = item.ID;
      }
      $scope.exportSureFun = function () {
        layer.load(2);
        dsp.postFun('app/order/exportCJOrderM', {
          id: $scope.itemId,
          sku: $scope.filterObj.sku
        }, function (data) {
          layer.closeAll("loading")
          $scope.dcordFlag = false;
          console.log(data)
          if (data.data.href.indexOf('http') >= 0) {
            $scope.dcordCallbackFlag = true;
            $scope.excelHref = data.data.href;
          } else {
            layer.msg('Export order error.')
            $scope.dcordCallbackFlag = false;
          }
        }, errFun)
      }
      $scope.exportQxFun = function () {
        $scope.dcordFlag = false;
      }
      //关闭返回的链接弹框
      $scope.closeLinkFun = function () {
        $scope.dcordCallbackFlag = false;
      }
      function errFun(data) {
        console.log(data)
        layer.closeAll("loading")
        dsp.closeLoadPercent($('.orders-list'))
        dsp.cjMesFun(1);
      }
      //发票按钮事件
      $scope.invoiceFun = function (id) {
        console.log(id);
        dsp.isinvoiceDialog(id, '');
      }
      //高级搜索部分的查询
      $scope.advanceSearch = function () {
        $scope.pageNum = 1;
        getList()
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
          // window.location.href = window.location.origin + '/myCJ.html#/drop-proce';
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