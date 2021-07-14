import { NODE_ENV } from '@root_egg/env';
const awinTesMode = ['testnew', 'development', 'test'].includes(NODE_ENV) ? 1 : 0;
export function undeliverPendingReshipFactory(angular) {
  const app = angular.module('undeliver-pending-reship.module', []);

  //待重派
  app.controller('undeliver-pending-reship.ctrl', ['$scope', 'dsp', '$location', '$stateParams',
    function ($scope, dsp, $location, $stateParams) {
      console.log('undeliver-pending-reship.ctrl')
      console.log('isvip',localStorage.getItem('vip'))
      if (localStorage.getItem('vip') == 1) {
        $scope.isVip = true;
      } else {
        $scope.isVip = false;
      }
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
      $scope.navList = [
        { type:'1', name:'Pending Reshipment' },
        { type:'2', name:'Paid' },
        { type:'3', name:'Awaiting Self Pickup' },
        { type:'4', name:'Processed' },
        { type:'5', name:'Expired' },
      ]
      console.log('待重派')
      var pageH = $(window).height() - 171;
      var docH = $(document).height();
      var bs = new Base64();
      var userId = bs.decode(localStorage.getItem('userId') ? localStorage.getItem('userId') : '')
      console.log(userId)
      var packagetype = $stateParams.packagetype;
      console.log(packagetype)
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
      // $scope.upload=false;
      $scope.isSubscribe = false;   //如何使用How To use it
      $scope.isPay = false;         //是否支付重派费
      $scope.isInfo = false;         //传入信息是否正确
      $scope.isEdit = false;         //编辑弹窗
      $scope.isTell = false;         //已通知表格弹窗
      $scope.addItemId = '';            //编辑的ID值
      $scope.addItemIndex = '';         //编辑的index值
      $scope.cjresIndex = '';          //选中的信息数量
      $scope.Imaddress = '';                //选中当前行的地址
      $scope.Imaid = [];                //选中当前行的id
      $scope.daipai = '';                //选中当前行的id
      $scope.daiqu = '';                //选中当前行的id
      $scope.yichuli = '';                //选中当前行的id
      $scope.yizhifu = '';                //选中当前行的id
      $scope.guoqi = '';                //选中当前行的id
      //请求参数 disputeType
      $scope.leixing = 1;

      //获取列表
      $scope.totellList = [];
      $scope.ordstatus = $stateParams.problemStu || 1;

      dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0);
      $scope.pageSize = '20';
      $scope.pageNum = 1;
      $scope.pageNum1 = $scope.pageNum + 1;
      $scope.totalNum = 0;
      $scope.totalPageNum = 0;
      $scope.searchval = packagetype;
      console.log($scope.searchval)

      //获取url中的参数方法
      function getUrlParamByKey (href, key) {
        if(!href) return ''
        var vars = href.split("&");
        for (var i = 0;i < vars.length; i++) {
          var pair = vars[i].split("=");
          if(pair[0] == key) { return pair[1]; }
        }
      }
      //paypal支付
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
            window.location.href = window.location.origin + '/myCJ.html#/problem-package/'
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
          payCS.code = 35;
          payCS.type = "problemPackage";
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

      // 待重派获取数据列表ordersList
      function getList() {
        dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0);
        $scope.ordersList = [];
        $scope.totalNum = 0;     //后台返回的数据长度
        var getListData = {};

        //标题部分
        dsp.postFun('cj/orderResend/cjweb_customer_state_count', '', con1, errFun1)
        function con1(data) {
          console.log(data)
          let message = data.data.message
          let result = data.data.result
          let statusCode = data.data.statusCode
          if (statusCode == 200) {
            $scope.daipai = result[0].amount
            $scope.yizhifu = result[1].amount
            $scope.daiqu = result[2].amount
            $scope.yichuli = result[3].amount
            $scope.guoqi = result[4].amount
          }
          console.log($scope.guoqi, $scope.yizhifu, $scope.daipai, $scope.daiqu, $scope.yichuli)
        }
        function errFun1(data) {
          console.log(data)
          layer.closeAll('loading')
          dsp.closeLoadPercent($('.orders-list'))
        }
        getListData.pageNum = $scope.pageNum - 0;
        getListData.pageSize = $scope.pageSize - 0;

        //   getListData.totalPages = 1;
        //   getListData.totalCounts = 1;

        //   getstatus(getListData);
        getListData.orderNumber = $scope.searchval;
        console.log($scope.ordstatus)
        getListData.beginDate = $("#cj-stime").val();
        getListData.endDate = $("#cj-etime").val();
        if ($scope.ordstatus == 1) {
          // dsp.postFun('cj/orderResend/cjweb_query_daiChongPai', JSON.stringify(getListData), con, errFun)
          dsp.postFun('cj/orderResend/waitResend', JSON.stringify(getListData), con, errFun)
        } else if ($scope.ordstatus == 2) {
          dsp.postFun('cj/orderResend/cjweb_query_yiZhiFu', JSON.stringify(getListData), con, errFun)
        } else if ($scope.ordstatus == 3) {
          dsp.postFun('cj/orderResend/cjweb_query_daiTongZhiZiQu', JSON.stringify(getListData), con, errFun)
        } else if ($scope.ordstatus == 4) {
          dsp.postFun('cj/orderResend/cjweb_query_yiChuLi', JSON.stringify(getListData), con, errFun)
        } else if ($scope.ordstatus == 5) {
          dsp.postFun('cj/orderResend/cjweb_query_yiGuoQi', JSON.stringify(getListData), con, errFun)
        }
        function con(data) {
          console.log(data)
          let { message, result, statusCode } = data.data
          //   $scope.ordstatusNum = data.data;
          $scope.ordstatusNum = data.data;
          //   $scope.ordersList = data.data.list;
          $scope.allselectids = [];
          $scope.allselectaddress = [];
          $scope.ordersList = result.rows;
          console.log($scope.ordersList)
          if ($scope.ordersList) {
            $scope.ordersList.forEach(ele => {
              ele.deadline = timestampToTime(new Date(ele.deadline));
              ele.updatedTime = timestampToTime(new Date(ele.updatedTime));
              ele.execTime = timestampToTime(new Date(ele.execTime));
              if(ele.paymentStatus !== '0') {
                $scope.allselectids.push(ele.id + '');

              }
            })
          } else {
            layer.closeAll('loading')
            // layer.msg('No data')
          }
          //   console.log($scope.ordersList);
          //   $scope.totalNum = data.data.count;//获取总订单的条数
          $scope.totalNum = result.total;//获取总订单的条数
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
          pageFun(dsp, $scope);
          numFun()
        }
        function errFun(data) {
          console.log(data)
          layer.closeAll('loading')
          dsp.closeLoadPercent($('.orders-list'))
        }
      }

      //获取状态
      // function getstatus(getstu) {
      //     if ($scope.ordstatus==1) {
      //         getstu.status = $scope.waitingResBtn ? '1,2,4,7' : '1,2,4,6';//此处新增条件筛选
      //         getstu.responseType = $scope.waitingResBtn ? 'CJ' : '';//此处新增条件筛选
      //     } else if ($scope.ordstatus==2) {
      //         getstu.status = '3';
      //     }else if ($scope.ordstatus==3) {
      //         getstu.status = '5';
      //     } else {
      //         getstu.status = '7';
      //     }
      // }
      
      $scope.$on('pagedata-fa', function (d, data) {//分页切换数据监听
        $scope.pageNum = data.pageNum;
        $scope.pageSize = data.pageSize;
        getList();
      })
      //分页
      function pageFun(dsp, $scope) {

        console.log($scope.totalNum)
        console.log($scope.pageSize)
        if ($scope.totalNum < 1) {
          return;
        }
        $scope.$broadcast('page-data', {
          pageNum: +$scope.pageNum,
          totalNum: $scope.countPage,
          totalCounts: +$scope.totalNum,
          pageSize: $scope.pageSize+'',
          pagesizeList: ['20', '50', '100']
        });
      }
      // getList(dsp,$scope);
      $scope.changePageSize = function () {
        console.log($scope.ordstatus)
        $scope.pageNum = '0';
        getList(dsp, $scope);
        console.log($scope.ordersList);
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
          console.log($scope.ordersList);
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
          $scope.ordersList = [];
          $scope.totalNum = 0;
          dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0);
          var getListData = {};
          getListData.page = $scope.pageNum - 0;
          getListData.limit = $scope.pageSize - 0;
          // getListData.code = 'cj';
          // getstatus(getListData);

          getListData.cjorderNo = $scope.searchval;

          // if($scope.ordstatus == 1){
          //     getListData.cjorderNo = $scope.searchval;
          //   }else if($scope.ordstatus == 2){
          //     getListData.cjorderNo = $scope.searchval;
          //   }else if($scope.ordstatus == 3){
          //     getListData.localTn = $scope.searchval;
          //   }else if($scope.ordstatus == 4){
          //     getListData.storeOrderNo = $scope.searchval;
          //   }else if($scope.ordstatus == 5){
          //     getListData.storeOrderNo = $scope.searchval;
          //   }
          // getListData.orderNumber = $scope.searchval;
          getListData.beginDate = $("#cj-stime").val();
          getListData.endDate = $("#cj-etime").val();
          // dsp.postFun('app/dispute/getDispute',JSON.stringify(getListData), con, errFun)
          if ($scope.ordstatus == 1) {
           // dsp.postFun('cj/orderResend/cjweb_query_daiChongPai', JSON.stringify(getListData), con, errFun)
            dsp.postFun('cj/orderResend/waitResend', JSON.stringify(getListData), con, errFun)
          } else if ($scope.ordstatus == 2) {
            dsp.postFun('cj/orderResend/cjweb_query_yiZhiFu', JSON.stringify(getListData), con, errFun)
          } else if ($scope.ordstatus == 3) {
            dsp.postFun('cj/orderResend/cjweb_query_daiTongZhiZiQu', JSON.stringify(getListData), con, errFun)
          } else if ($scope.ordstatus == 4) {
            dsp.postFun('cj/orderResend/cjweb_query_yiChuLi', JSON.stringify(getListData), con, errFun)
          } else if ($scope.ordstatus == 5) {
            dsp.postFun('cj/orderResend/cjweb_query_yiGuoQi', JSON.stringify(getListData), con, errFun)
          }
          function con(data) {
            console.log(data)
            // $scope.ordersList = data.data.list;
            $scope.ordersList = data.data.result.rows;
            // $scope.totalNum = data.data.count;//获取总订单的条数
            $scope.totalNum = data.data.result.total;//获取总订单的条数
            console.log($scope.totalNum)
            if ($scope.totalNum > 0) {
              dsp.removeNodataPic($('.orders-list'))
              dsp.closeLoadPercent($('.orders-list'))
              $scope.countPage = Math.ceil($scope.totalNum / ($scope.pageSize - 0))
              // getList(dsp,$scope)
            } else {
              dsp.addNodataPic($('.orders-list'),$(window).height()-171,47,0,{width:'100%'})
              dsp.closeLoadPercent($('.orders-list'))
              $scope.countPage = 0;
            }
            pageFun(dsp, $scope);
          }
          function errFun(data) {
            console.log(data)
            dsp.closeLoadPercent($('.orders-list'))
          }
        } else {
          getList(dsp, $scope);
        }
      }
      $('.selJfLx').change(function () {
        var jflx = $(this).val();
        console.log(jflx)
        $scope.ordersList = [];
        $scope.totalNum = 0;
        dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0);
        var getListData = {};
        // getListData.page = $scope.pageNum-0;
        // getListData.limit = $scope.pageSize-0;
        // getListData.code = 'cj';
        getListData.pageNum = $scope.pageNum - 0;
        getListData.pageSize = $scope.pageSize - 0;
        // getstatus(getListData);
        getListData.type = jflx;
        getListData.beginDate = $("#cj-stime").val();
        getListData.endDate = $("#cj-etime").val();
        dsp.postFun('app/dispute/getDispute', JSON.stringify(getListData), con, errFun)
        function con(data) {
          console.log(data)
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
          pageFun(dsp, $scope);
        }
        function errFun(data) {
          console.log(data)
          dsp.closeLoadPercent($('.orders-list'))
        }
      })
      //给订单状态赋值的函数
      function numFun() {
        $scope.afterNum1 = $scope.ordstatusNum.yi;   //31
        $scope.afterNum2 = $scope.ordstatusNum.er;    //48
        $scope.afterNum3 = $scope.ordstatusNum.san;   //15
        $scope.afterNum4 = $scope.ordstatusNum.si;    //7
      }
      //给侧边栏添加样式
      /* var vip = localStorage.getItem('vip') == undefined ? "" : localStorage.getItem('vip');
      if (vip == '1') {//vipFlag
        $('.header-nav').addClass('vipFlag');
        $('.left-nav').addClass('vipFlag');
        $('.aftersale-right').css('background', '#F0EDE7').addClass('vip');
      } else {
        $('.header-nav').removeClass('vipFlag');
        $('.left-nav').removeClass('vipFlag');
        $('.aftersale-right').css('background', '#f2f3f5').removeClass('vip');
      }
      $('.header-nav li').eq(1).addClass('active');
      $('.left-nav li').eq(2).addClass('active');
      //$('.aftersale-leftbara').eq(2).css('background-image','linear-gradient(0deg,rgba(253, 162, 44, 1) 0%, rgba(247, 140, 41, 1) 78%, rgba(241, 118, 37, 1) 100%)');
      $('.aftersale-leftbara').click(function () {
        $('.aftersale-leftbara').css('background-image', '');
        $(this).css('background-image', 'linear-gradient(0deg,rgba(253, 162, 44, 1) 0%, rgba(247, 140, 41, 1) 78%, rgba(241, 118, 37, 1) 100%)');
      }) */
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

        $scope.Imaddress = $(this).attr('sddress').slice(4);
        if ($scope.Imaid.length == 0 || !$scope.Imaid.includes($(this).attr('id').slice(2))) {
          $scope.Imaid.push($(this).attr('id').slice(2));
          console.log($scope.ordersList)
          $scope.totellList = [];
          $scope.ordersList.forEach(ele => {
            console.log(ele)
            for (let i = 0; i < $scope.Imaid.length; i++) {
              if (ele.id == $scope.Imaid[i]) {
                $scope.totellList.push(ele)
                console.log($scope.totellList);
              }
            }
          })
        } else {
          $scope.totellList = [];
        }
        console.log($scope.totellList);
        console.log($scope.Imaddress)
        if ($scope.ordstatus == 1 || $scope.ordstatus == 3) {
          if ($scope.ordstatus == 1 && $scope.Imaddress == '') {
            layer.msg('Please enter the shipping address')
            // $scope.isEdit= true;         //编辑弹窗
          } else {
            if ($(this).attr('src') == 'static/image/direct-orders/multiple1.png') {
              $(this).attr('src', 'static/image/direct-orders/multiple2.png');
              cjresIndex++;
              $scope.cjresIndex = cjresIndex;
              // console.log($scope.cjresIndex);
              console.log($scope.Imaid);
              console.log($scope.totellList);
              // console.log(55555555);
              if (cjresIndex == $('#cj-response-table .zcheckbox').length) {
                // alert('quanbuxuanzhogn')
                $('#cj-response-table .zchecked-all').attr('src', 'static/image/direct-orders/multiple2.png');
              }
            } else {
              $(this).attr('src', 'static/image/direct-orders/multiple1.png');
              cjresIndex--;
              console.log($scope.Imaid);
              $scope.Imaid.forEach(item => {
                item = parseInt(item);
                console.log(item)
                if (item == $(this).attr('id').slice(2)) {
                  console.log($scope.Imaid.indexOf($(this).attr('id').slice(2)));
                  // $scope.Imaid .push(item)
                  $scope.Imaid.splice($scope.Imaid.indexOf($(this).attr('id').slice(2)), 1);
                  console.log($scope.Imaid);
                }
              })
              console.log($scope.Imaid);
              $scope.totellList = [];
              $scope.ordersList.forEach(ele => {
                // console.log(ele.id)
                console.log(ele)
                for (let i = 0; i < $scope.Imaid.length; i++) {
                  if (ele.id == $scope.Imaid[i]) {
                    // console.log(ele);
                    $scope.totellList.push(ele)
                    // return $scope.totellList
                    console.log($scope.totellList);
                  }
                }
              })

              if (cjresIndex != $('#cj-response-table .zcheckbox').length) {
                $('#cj-response-table .zchecked-all').attr('src', 'static/image/direct-orders/multiple1.png');
              }
            }
          }
        }
      })

      //全选
      $('#cj-response-table').on('click', '.zchecked-all', function () {
        if ($scope.ordstatus == 1) {
          $scope.ordersList.forEach(ele => {
            // $scope.allselectaddress.push(ele.address);
            if ($scope.allselectaddress.includes('')) {
              $scope.allselectaddress = [];
            } else {
              $scope.allselectaddress.push(ele.address);
              $scope.Imaddress = $scope.allselectaddress;
            }
          })

          if ($scope.Imaddress == '') {
            layer.msg('Please fill in the receiving address first.')
          } else {
            if ($(this).attr('src') == 'static/image/direct-orders/multiple1.png') {
              $(this).attr('src', 'static/image/direct-orders/multiple2.png');
              cjresIndex = $('#cj-response-table .zcheckbox').length;
              $scope.Imaid = $scope.allselectids
              console.log($scope.Imaid)
              $scope.cjresIndex = $scope.Imaid.length;
              $('#cj-response-table .zcheckbox').attr('src', 'static/image/direct-orders/multiple2.png');
            } else {
              $(this).attr('src', 'static/image/direct-orders/multiple1.png');
              cjresIndex = 0;
              $scope.Imaid = []
              $scope.cjresIndex = 0;
              $('#cj-response-table .zcheckbox').attr('src', 'static/image/direct-orders/multiple1.png');
            }
          }
        } else if ($scope.ordstatus == 3) {
          if ($(this).attr('src') == 'static/image/direct-orders/multiple1.png') {
            $(this).attr('src', 'static/image/direct-orders/multiple2.png');
            cjresIndex = $('#cj-response-table .zcheckbox').length;
            $scope.totellList = $scope.ordersList;
            $scope.Imaid = $scope.allselectids
            $scope.cjresIndex = $scope.Imaid.length;
            //    $scope.allselectaddress = $scope.
            $('#cj-response-table .zcheckbox').attr('src', 'static/image/direct-orders/multiple2.png');
          } else {
            $(this).attr('src', 'static/image/direct-orders/multiple1.png');
            cjresIndex = 0;
            $scope.Imaid = []
            $scope.cjresIndex = 0;
            $('#cj-response-table .zcheckbox').attr('src', 'static/image/direct-orders/multiple1.png');
          }
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
          console.log(youresIndex);
          console.log(youresIndex);
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

      // 支付重派费
      //选中时  地址是否为空 为空 编辑信息  不为空  提示已将数据显示 选中
      //先判断是否有选中项，有  弹出确定重派   没有  提示请先修改收货地址

      $scope.topay = function () {
        // 是否验证邮件处理
        if (dsp.isVerifyEmail()) return
        var bs = new Base64();
        if ($scope.Imaid.length == 0) {
          layer.msg('Please select the order for payment')
        }
        // console.log($scope.Imaid)
        let ids = [];
        $scope.Imaid.forEach(ele => { ids.push(parseInt(ele)) });
        if ($scope.cjresIndex > 0) {
          dsp.postFun('cj/orderResend/cjweb_payment', ids, payFun, drepayFun)
          // payFun()
          function payFun(data) {
            if (data.data.statusCode == '200') {
              let result = data.data.result;
              console.log(result.paymentId, result.fee, typeof (result.fee.toString()));

              const payOrdNum = bs.encode(data.data.result.paymentId);//订单号
              const muordMoney = bs.encode(data.data.result.fee + '');    //订单金额
              const ordquantity = bs.encode(ids.length+'')
              location.href = `myCJ.html?route=payment#/payment/${payOrdNum}/${muordMoney}/${ordquantity}/problemPackage`;     //订单号，订单金额，订单数量，订单类型
              getList(dsp, $scope);
            }
          }
          function drepayFun() {
            console.log(" err ceshi")
            layer.closeAll("loading")
          }
        } else {
          layer.msg('Please select the product for reshipment')
        }
      }






      //点击编辑信息
      $scope.ticket = function (item, index) {
        // $scope.addModefyFlag = true;
        // $scope.addItemId = item.customerId;
        $scope.addItemId = item.id;
        $scope.addItemIndex = index;
        console.log(item)
        $scope.isEdit = true;
        $scope.name = item.nameOfTheAddressee || '';
        console.log($scope.name)
        $scope.address = item.address || '';
        $scope.addCity = item.city || '';
        $scope.addProvince = item.province || '';
        // $scope.addZip = item.ZIP;
        $scope.addEmail = item.zipcode || '';
        $scope.addPhone = item.telephone || '';
        $scope.addCountry = item.country || '';
        //获取国家信息
        // $scope.couneryInfo = item.country;
        // console.log($scope.couneryInfo)
        $scope.couneryInfo = '';
        dsp.postFun('app/logistic/getcountry', null, function (data) {
          console.log(data)
          if (data.data.statusCode == 200) {
            let countryObj = JSON.parse(data.data.result);
            $scope.countryList = countryObj.countryList;
            console.log($scope.countryList)
          }
        }, function (data) {
          console.log(data)
        })
        let enName = countryEnName(item.country);
        console.log(enName)
        if (enName) {
          $scope.couneryInfo = item.country + '#' + enName;
        } else {
          $scope.couneryInfo = '';
          // $scope.initcouneryInfo = item.country;
        }
        let storeUpdata = {};
        storeUpdata.id = index;
      }


      $scope.checkPhone = function (phone) {
        phone = phone.replace(/[^\d\+\-\(\)]/g, "");
        $scope.addPhone = phone;
      }

      function countryEnName(code) {
        console.log(code)
        if ($scope.countryList) {
          let len = $scope.countryList.length;
          console.log(len)
          let enName;
          if (len > 0) {
            for (let i = 0; i < len; i++) {
              if (code == $scope.countryList[i].ID) {
                enName = $scope.countryList[i].NAME_EN;
                break;
              }
            }
          }
          return enName;
        }
      }

      //确认编辑
      $scope.sureModeFun = function () {
        console.log($scope.addItemIndex)
        // if ($scope.addCity == '' || $scope.address == '' || $scope.addProvince == '' || $scope.addCountry == '') {
        //   layer.msg('必填项不能为空')
        // }
        if(!$scope.addPhone) return layer.msg('Phone is required')
        // if(($scope.itemWlName.indexOf('DHL')!=-1||$scope.itemWlName=="China EMS"||$scope.itemWlName=="S.F China Domestic"||$scope.itemWlName=="YTO China Domestic"||$scope.itemWlName=="South Africa Special Line"||$scope.itemWlName=="CJ Normal Express")&&!$scope.addPhone){
        // 	layer.msg('Phone number is required.')
        // 	return
        // }
        dsp.load()
        var addUpdata = {};
        addUpdata.id = $scope.addItemId;
        addUpdata.nameOfTheAddressee = $scope.name;
        addUpdata.address = $scope.address;
        addUpdata.city = $scope.addCity;
        addUpdata.province = $scope.addProvince;
        addUpdata.telephone = $scope.addPhone;
        addUpdata.country = $scope.addCountry;
        addUpdata.zipcode = $scope.addEmail;
        if ($scope.couneryInfo) {
          addUpdata.country = $scope.couneryInfo.split('#')[1];
          addUpdata.countryCode = $scope.couneryInfo.split('#')[0];
        }
        console.log(addUpdata)
        console.log(addUpdata)
        dsp.postFun('cj/orderResend/cjweb_update_address', JSON.stringify(addUpdata), function (data) {
          console.log(data)
          dsp.closeLoad();
          $scope.isEdit = false;
          if (data.data.result > 0) {
            $scope.addModefyFlag = false;
            layer.msg('Modify success')
            getList(dsp, $scope);          //再查询一次
            // $scope.refershFun()
          } else {
            layer.msg('Modify failed')
          }
        }, function (data) {
          dsp.closeLoad();
          console.log(data)
        })
      }

      //已通知客户
      $scope.totell = function () {
        console.log($scope.Imaid)
        if ($scope.Imaid == 0) {
          layer.msg('Please select the order to inform')
        } else {
          $scope.isTell = true;
          layer.closeAll('loading')
        }
      }

      //确认通知
      $scope.tosureTell = function () {
        layer.closeAll('loading')
        // $scope.totellList = [];
        let ids = [];
        $scope.Imaid.forEach(ele => { ids.push(parseInt(ele)) });
        console.log(ids)
        let paygoods = {};
        paygoods.ids = ids
        console.log($scope.cjresIndex)
        if ($scope.cjresIndex > 0) {
          //  dsp.postFun('cj/orderResend/cjweb_tongZhi', JSON.stringify(paygoods), tellFun)
          dsp.postFun('cj/orderResend/cjweb_tongZhi', ids, tellFun)
          function tellFun(data) {
            console.log(data)
            console.log(data.data.message)
            if (data.data.statusCode == '200') {
              $scope.isTell = false;
              $scope.Imaid = [];

              $scope.totellList = data.data.rows;
              getList(dsp, $scope);

            }
          }
        }
      }

      //取消通知
      $scope.cancelSelfpick = function () {
        $scope.isTell = false;
        // $scope.Imaid = []
        // $scope.cjresIndex = 0;
        // $scope.totellList = [];
      }

      // Excel文件上传

      $scope.import_asset = function () {
        $("#file_asset").click();
      };
      $("#file_asset").on("change", function () {
        console.log(123)
        var formData = new FormData();
        var file = document.getElementById("file_asset").files[0];
        console.log(file);
        console.log(formData);
        if (file.name) {
          var fileName = file.name.substring(file.name.lastIndexOf(".") + 1);
          if (fileName == "xlsx" || fileName == "xls") {
            formData.append('file', file);
            dsp.upLoadImgPost('cj/orderResend/cjweb_import_address', formData, orsFun, dreFun)

            function orsFun(data) {
              console.log(data)
              console.log(data.data.message)
              if (data.data.statusCode == '200') {
                // var obj = JSON.parse(data.data.message)
                $("#file_asset").val('');
                $scope.isPay = true;
                getList(dsp, $scope);
              } else {
                layer.msg(data.data.message);
              }
            }
            function dreFun() {
              console.log(" err ceshi")
              layer.closeAll("loading")
            }
          } else {
            alert("Incorrect file format, please upload allowed file extensions like .xlsx, .xls.");
            $("#file_asset").val("");
          }
        }
      })

      //文件导出
      $scope.exportOrder = function () {
        $scope.dcordFlag = true;
      }
      $scope.goActexportOrder = function () {
        var orData = {};
        // tjFun(orData)
        // orData.data = JSON.stringify(orData.data);
        // exportList ={};
        orData.data = JSON.stringify($scope.totellList);
        layer.load(2);
        dsp.postFun('cj/orderResend/cjweb_daiChongPai_export', JSON.stringify(orData), function (data) {
          layer.closeAll('loading');
          console.log(data);
          if (data.status == 200) {
            $scope.dcordFlag = false;
            $scope.dcordCallbackFlag = true;
            // $scope.excelHref = JSON.parse(data.data).href;
            $scope.excelHref = data.data.result;
          } else {
            layer.msg('Export order error.')
          }
        })
      }


      //是否同意补发
      $scope.bfAgreeFun = function () {
        if ($scope.replacementFreight && $scope.replacementFreight > 0) {
          var itemId = bs.encode($scope.itemId);
          var yunFeiNum = bs.encode($scope.replacementFreight)
          location.href = 'myCJ.html?route=payment#/payment/' + itemId + '/' + yunFeiNum + '//dispute';
        } else {
          var bfData = {};
          bfData.id = $scope.itemId;
          dsp.postFun('app/dispute/agreeReissueOrder', JSON.stringify(bfData), function (data) {
            console.log(data)
            if (data.data.result) {
              layer.msg('Thanks, This dispute completed.')
              getList(dsp, $scope);
              $scope.closeTicket();
            } else {
              layer.msg('This operation is not supported. Please contact your agent for help.')
            }
          }, function (data) {
            console.log(data)
          })
        }
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
          $scope.messageListArr.push(listObj)
          var listArr = JSON.stringify($scope.messageListArr)
          var upData = {};
          upData.id = $scope.itemId;
          upData.responseType = 'ERP';
          upData.message = listArr;
          dsp.postFun('app/dispute/replyDispute', JSON.stringify(upData), function (data) {
            console.log(data)
            layer.closeAll('loading');
            if (data.data.result == true || data.data.result == 200) {
              $scope.closeTicket();//关闭纠纷单
              layer.msg('Reply Sucess')
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
        dsp.postFun('app/dispute/cancelDispute', JSON.stringify(upId), function (data) {
          console.log(data)
          layer.closeAll('loading')
          if (data.data.result == true) {
            layer.msg('Closed Sucess')
            getList(dsp, $scope);
            $scope.closeTicket();
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
        $scope.messageListArr.push(listObj)
        var listArr = JSON.stringify($scope.messageListArr)
        var upId = {};
        upId.id = $scope.itemId;
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
        dsp.postFun('app/dispute/orderRefund', JSON.stringify(upId), function (data) {
          console.log(data)
          layer.closeAll('loading')
          if (data.data.result == true) {
            layer.msg('Thanks, This dispute completed.')
            getList(dsp, $scope);
            $scope.closeTicket();
          } else {
            layer.msg('This operation is not supported. Please contact your agent for help.')
          }
        }, errFun)
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


      //子订单的详情
      // $('.orders-list').on('click','.zi-order-num',function () {
      //  location.href="#/order-detail";
      // })
      $scope.hrefLinkFun = function (item) {
        var id = item.id;
        var cjorderNo = item.cjorderNo;

        var istrackFlag;
        // if (item.TRACKINGNUMBER) {
        //     istrackFlag = 2;
        // } else {
        //     istrackFlag = 1;
        // }
        if (item.trackingNumber) {
          istrackFlag = 2;
        } else {
          istrackFlag = 1;
        }
        var isafter = 3;
        console.log(isafter)
        // location.href="#/order-detail/"+id+'/'+istrackFlag;
        // window.open("#/order-detail/"+id+'/'+istrackFlag+'/'+isafter)
        //直发单
        var newStr = cjorderNo.indexOf("ZF");
        if (newStr == 0) {
          // console.log("字符串是以ZF开头的！")
          window.open("#/order-detail/" + cjorderNo + '/' + istrackFlag + '/' + isafter + '/' + 'DIRECT')
        }
        if (newStr == -1) {
          // console.log("字符串不是以ZF开头的！")
          window.open("#/order-detail/" + cjorderNo + '/' + istrackFlag + '/' + isafter)
        }

        // item.impStorageFlag=='ISIMP' ? '1': item.status==12 || item.status==7 ? '0': '1') + '/1/DIRECT'
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
        // return Y+M+D+h+m+s;
        return Y + M + D;
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
