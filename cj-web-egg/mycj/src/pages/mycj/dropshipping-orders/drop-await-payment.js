import { ANAN_ACCOUNT } from '@src/pages/mycj/mycj.constant';

export function dropAwaitPaymentFactory(angular) {
  const app = angular.module('drop-await-payment.module', ['service']);
  // var mark1 = 0;
  app.controller('drop-await-payment.ctrl', ['$scope', 'dsp','$sce',
    function ($scope, dsp,$sce) {
      let base64 = new Base64();
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
      $scope.zdataFound = true;
      var bs = new Base64();
      let ordZeroTips = localStorage.getItem('ordZeroTips') || ''
      if(ordZeroTips){
        $scope.addCartResonFlag = true;
        $scope.addCartResonText = ordZeroTips;
        localStorage.removeItem('ordZeroTips')
      }
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

      function initIsCheckout() {
        // 判断当前是否存在ckosessionid
        $scope.ckoSessionId = base64.decode(localStorage.getItem('ckoSessionId') || '') && JSON.parse(base64.decode(localStorage.getItem('ckoSessionId') || ''))
        if($scope.ckoSessionId) {
          getList()
          getCheckoutTrade()
          return 
        }
        var href = window.location.href;
        if (href.indexOf('?') >= 0) {
          const regexp = /\?[\w\W]*\#/
          $scope.sessionId = getUrlParamByKey(href.match(regexp) && href.match(regexp)[0].slice(1,-1),'cko-payment-id') || getUrlParamByKey(href.match(regexp) && href.match(regexp)[0].slice(1,-1),'cko-session-id')
          if($scope.sessionId) {
            localStorage.setItem('ckoSessionId', base64.encode(JSON.stringify($scope.sessionId)));
            // 后端接口返回状态较慢，延迟一秒再刷新当前页面
            let timer = setTimeout(() => {
              clearTimeout(timer)
              window.location.href = window.location.origin + '/myCJ.html#/dropshipping-orders'
            }, 200)
            getList()
            return
          }
        }
      }
      initIsCheckout()

      function getElementLeft(element) {
        var actualLeft = element.offsetLeft;
        var current = element.offsetParent;

        while (current !== null) {
          actualLeft += current.offsetLeft;
          current = current.offsetParent;
        }

        return actualLeft;
      }

      function getElementTop(element) {
        var actualTop = element.offsetTop;
        var current = element.offsetParent;

        while (current !== null) {
          actualTop += current.offsetTop;
          current = current.offsetParent;
        }

        return actualTop;
      }

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
      var enDate = GetDateStr(0);
      $("#cj-stime").val(aDate);   //关键语句

      //鼠标划过事件
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
      //导出订单的提示
      $('.export-orders').click(function () {
        layer.msg('This feature will work soon.')
      })

      $scope.cjdropawaitpList = '';//存储所有的订单
      $scope.erpordTnum = '';//存储订单的条数
      $scope.pageSize = '50';
      $scope.pageNum = 1;
      getList();
      function getList() {
        $scope.cjdropawaitpList = [];
        dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0);
        var ordId = $.trim($('.ord-search-inp').val());
        var dapData = {};
        dapData.data = {};
        dapData.data.status = '3';
        dapData.data.page = $scope.pageNum;
        dapData.data.limit = $scope.pageSize;
        dapData.data.dateBegin = $('#cj-stime').val();//cj开始时间
        dapData.data.dateEnd = $('#cj-etime').val();//cj开始时间
        if (ordId.indexOf('CJ') >= 0) {
          dapData.data.numid = ordId;
        } else {
          dapData.data.orderId = ordId;
        }
        dapData.data = JSON.stringify(dapData.data);
        console.log(dapData)
        console.log(JSON.stringify(dapData))
        dsp.postFun('app/order/queryShipmentsOrder', JSON.stringify(dapData), function (data) {
          console.log(data.data)
          var cjdropawaitp = JSON.parse(data.data.result)
          $scope.erpordTnum = cjdropawaitp.countNumber;
          $scope.fulfillmentStatus = cjdropawaitp.fulfillmentStatus;
          $scope.cjdropawaitpList = cjdropawaitp.orderList;//获取所有的订单
          console.log($scope.cjdropawaitpList)
          if ($scope.erpordTnum > 0) {
            dsp.removeNodataPic($('.orders-list'))
            dsp.closeLoadPercent($('.orders-list'))
          } else {
            dsp.addNodataPic($('.orders-list'), $(window).height() - 171, 47, 0,{width:'100%'})
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
      $scope.$on('pagedata-fa', function (d, data) {
        console.log(data)
        $scope.pageNum = data.pageNum;
        $scope.pageSize = data.pageSize;
        getList();
      });
      //给订单状态赋值的函数
      function numFun() {
        $scope.awaitNum = $scope.ordstatusNum.yi;
        $scope.dropprocessNum = $scope.ordstatusNum.er;
        $scope.dropprocessedNum = $scope.ordstatusNum.san;
        $scope.completeNum = $scope.ordstatusNum.si;
        $scope.closedNum = $scope.ordstatusNum.wu;
      }
      $scope.navList = [
        {name:'Awaiting Payment',href:'#/dropshipping-orders',show:true},
        {name:'Processing',href:'#/drop-proce'},
        {name:'Processed',href:'#/drop-processed'},
        {name:'Completed',href:'#/drop-complet'},
        {name:'Closed',href:'#/drop-close'},
      ]
      var customerCjNum = localStorage.getItem('customerCjNum') || '';
      var userId = localStorage.getItem('userId') ? bs.decode(localStorage.getItem('userId')) : '';
      // 获取个人信息
      const token = localStorage.getItem('token') ? bs.decode(localStorage.getItem('token')) : "";
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
      //疫情期间使用
      let payItem,payIndex;
      $scope.countryTipFun = (item,index)=>{
        // 是否验证邮件处理
        if (dsp.isVerifyEmail()) return
        payItem = item;
        payIndex=index;
        /** 2021-02-01 pay支付抵扣中判断 */
        dsp.postFun('app/goodsInfo/checkOrderOutGoodsInfoOpt', {
          shipOrderId: item.ID
        }, ({data}) => {
          if(+data.code === 200) {
            dsp.postFun('app/dispute/getTipsListByType',{}, data =>{
              let oresult = data.data.result?JSON.parse(data.data.result):'';
              if(oresult){
                $scope.holidayTips = {
                  title:oresult.title,
                  content:$sce.trustAsHtml(oresult.content)
                }
                $scope.showCountryTip=true;
              }else{
                $scope.payFun();
              }
              
            },err=>{
    
            })
          } else {
            layer.msg(data?.message)
          }
        }, err => {})
        
      }
      // $scope.payFun = function (item, index) {
      $scope.payFun = function () {
        let item=payItem;
        console.log(payItem)
        let index = payIndex;
        let homeType = payItem.HOMETYPE;
        layer.load(2);
        $scope.noInventoryArr = [];
        $scope.itemMuId = item.ID;
        dsp.postFun('order-center/proxyOrder/payRelevant/getParentOrderInfo', {
          shipmentsId: item.ID,
          totalAmount: item.ORDERMONEY,
        }, function (data) {
          const res = data.data
        if (res.data.shipmentsId && res.data.orderCodes) {
            localStorage.removeItem('deductionOfInventory');
            localStorage.removeItem('orderNumbers');
            localStorage.removeItem('shipmentsId');
            localStorage.setItem('orderNumbers', JSON.stringify(res.data.orderCodes));
            localStorage.setItem('shipmentsId', JSON.stringify(res.data.shipmentsId));
            layer.closeAll("loading")
            location.href = '/newmycj/dropshipping/orderConfirmation';
          } else{
            layer.msg(res.message)
          }
        })
        if(homeType!='0'){
          dsp.postFun('order/order/checkInventory', {
            shipmentsOrderId: item.ID
          }, function (data) {
            $scope.showCountryTip=false; // 疫情提示弹窗隐藏
            let resData = data.data;
            if (resData.statusCode == 200) {
              $scope.noInventoryArr = resData.result;
              if ($scope.noInventoryArr.length > 0) {
                layer.closeAll("loading")
                $scope.inventotyTipFlag = true;
                if ($scope.noInventoryArr.length == item.ORDERNUMBER) {//所有子订单都没有库存
                  layer.msg('Insufficient inventory. Payment failed.')
                }
              } else {//都有库存
                $scope.muordMoney = bs.encode(item.ORDERMONEY.toString());//订单金额
                payFun2(item, index);//新版支付
                $scope.payType = 2;
              }
            } else if (data.data.statusCode == 400) {
              $scope.errorShowFlag = true;
              const temp = JSON.parse(data.data.result)
              $scope.logisticsReasonList = temp.map((item) => {
                return {
                  recordNum: item,
                  message: data.data.message
                }
              })
              layer.closeAll("loading")
            }else {
              layer.closeAll("loading")
              dsp.cjMesFun(1);
            }
          }, function (data) {
            console.log(data)
            layer.closeAll("loading")
          })
        }else{
          $scope.muordMoney = bs.encode(item.ORDERMONEY.toString());//订单金额
          payFun2(item, index);//新版支付
          $scope.payType = 2;
        }
      }
      $scope.sureDelNoinvenOrd = function () {//移除无库存的订单
        layer.load(2)
        let removeNoInvenIds = $scope.noInventoryArr.join(',')
        dsp.postFun('order/order/removeOrderInShipmentsOrder', {
          shipmentsOrderId: $scope.itemMuId,
          removeOrderIds: removeNoInvenIds
        }, function (data) {
          console.log(data)
          let resData = data.data;
          if (resData.statusCode == 200) {
            $scope.inventotyTipFlag = false;
            freshGetList()
          } else {
            layer.msg(resData.message)
          }
          layer.closeAll('loading')
        }, function (data) {
          console.log(data)
          layer.closeAll('loading')
        })
      }

      $scope.serviceGoodsModal = false;
      $scope.inventoryShortage = [];
      $scope.handleCloseServiceGoods = () => {
        $scope.serviceGoodsModal = false;
        $scope.inventoryShortage = [];
      }
      function payFun2(item, index) {
        $scope.payOrdNum = bs.encode(item.ID);
        $scope.ordquantity = bs.encode(item.ORDERNUMBER.toString());
        window.location.href = `myCJ.html?route=payment#/payment/${$scope.payOrdNum}/${$scope.muordMoney}/${$scope.ordquantity}`
      }
      function payFun1(item, index) {
      console.log(item.ORDERMONEY)
        $scope.itemIndex = index;
        $scope.itemId = item.ID;
        $scope.siyoucangku = 'init';
        var payData = {};
        payData.shipOrderId = item.ID;
        payData.money = item.ORDERMONEY;
        payData.siyoucangku = 'init';
        // cj/cjOrderPay/checkPay
        dsp.postFun('app/order/checkPay', JSON.stringify(payData), function (data) {
          console.log(data)
          layer.closeAll('loading')
          if (data.data.code == '205') {
            layer.msg(data.data.message)
            return
          }
          $scope.totalServerPrice = data.data.totalServerPrice;
          if (data.data.childOrders) {
            console.log(data.data.totalPrivace)
            $scope.totalServerPrice = 0;
            $scope.totalServerPrice = data.data.totalServerPrice;
            if ((data.data.totalPrivace - 0) + (data.data.balance - 0) >= item.ORDERMONEY) {
              $scope.balanceM = 0
              console.log('库存加余额大于订单金额')
            } else {
              $scope.balanceM = data.data.balance;
            }
            if (data.data.inventoryList && userId != '738CB2BD-0D8C-4587-9779-8CFA9F788047') {
              $scope.inventoryList = data.data.inventoryList;
            } else {
              $scope.inventoryList = [];
            }
            console.log($scope.balanceM)
            console.log($scope.inventoryList)
            if ($scope.balanceM > 0) {
              console.log($scope.balanceM)
              $scope.isDkFlag = true;
            }
            if ($scope.inventoryList.length > 0) {
              $scope.iskcFlag = true;
              console.log($scope.iskcFlag)
            }
            if ($scope.balanceM <= 0 && $scope.inventoryList.length <= 0) {
              meiXiFun()
            }
            $scope.totalPrivace = data.data.totalPrivace;
          } else {
            layer.msg('Sorry, The order related to this payment is not found, please double check and resubmit it or contact your agent.', { time: 5000 })
          }
        })
      }
      function meiXiFun() {
        $scope.siyoucangku = '美西';
        var ORDERMONEY = $scope.muordMoney;
        ORDERMONEY = bs.decode(ORDERMONEY)
        console.log(ORDERMONEY)
        var payData = {};
        payData.shipOrderId = $scope.itemId;
        payData.money = ORDERMONEY;
        payData.siyoucangku = '美西';
        // cj/cjOrderPay/checkPay
        dsp.postFun('app/order/checkPay', JSON.stringify(payData), function (data) {
          console.log(data)
          layer.closeAll('loading')
          $scope.totalServerPrice = data.data.totalServerPrice;
          if (data.data.childOrders) {
            $scope.totalServerPrice = 0;
            $scope.totalServerPrice = data.data.totalServerPrice;
            var muOrdMoney = $scope.muordMoney;
            $scope.inventoryList = data.data.inventoryList;
            muOrdMoney = bs.decode(muOrdMoney)//抵扣后的金额
            console.log($scope.inventoryList)
            console.log(data.data.totalPrivace - 0, (data.data.totalPrivace - 0) <= (muOrdMoney - 0))
            if ($scope.inventoryList && $scope.inventoryList.length > 0 && (data.data.totalPrivace - 0) <= (muOrdMoney - 0)) {
              $scope.iskcFlag = true;
            } else if (!$scope.inventoryList) {
              meiDongFun()
            } else {
              location.href = 'myCJ.html?route=payment#/payment/' + $scope.payOrdNum + '/' + $scope.muordMoney + '/' + $scope.ordquantity;
            }
            $scope.totalPrivace = data.data.totalPrivace;
          } else {
            layer.msg('Sorry, The order related to this payment is not found, please double check and resubmit it or contact your agent.', { time: 5000 })
          }
        })
      }
      function meiDongFun() {
        $scope.siyoucangku = '美东';
        var ORDERMONEY = $scope.muordMoney;
        ORDERMONEY = bs.decode(ORDERMONEY)
        console.log(ORDERMONEY)
        var payData = {};
        payData.shipOrderId = $scope.itemId;
        payData.money = ORDERMONEY;
        payData.siyoucangku = '美东';
        // cj/cjOrderPay/checkPay
        dsp.postFun('app/order/checkPay', JSON.stringify(payData), function (data) {
          console.log(data)
          layer.closeAll('loading')
          if (data.data.childOrders) {
            $scope.totalServerPrice = 0;
            $scope.totalServerPrice = data.data.totalServerPrice;
            var muOrdMoney = $scope.muordMoney;
            $scope.totalServerPrice = data.data.totalServerPrice;
            $scope.inventoryList = data.data.inventoryList;
            muOrdMoney = bs.decode(muOrdMoney)//抵扣后的金额
            console.log($scope.inventoryList)
            console.log(data.data.totalPrivace - 0, (data.data.totalPrivace - 0) <= (muOrdMoney - 0))
            if ($scope.inventoryList && $scope.inventoryList.length > 0 && (data.data.totalPrivace - 0) <= (muOrdMoney - 0)) {
              $scope.iskcFlag = true;
            } else {
              location.href = 'myCJ.html?route=payment#/payment/' + $scope.payOrdNum + '/' + $scope.muordMoney + '/' + $scope.ordquantity;
            }
            $scope.totalPrivace = data.data.totalPrivace;
          } else {
            layer.msg('Sorry, The order related to this payment is not found, please double check and resubmit it or contact your agent.', { time: 5000 })
          }
        })
      }
  
      // skip
      $scope.handleSkip = () => {
        const params = $scope.packageList.map(o => ({ cjOrderId: o.cjOrderId, cjProductId: o.cjProductId }));
        layer.load(2);
        dsp.postFun('cj/cjOrderPay/removePack', params, ({ data }) => {
          layer.closeAll('loading');
          if (data.statusCode === '200') {
            $scope.inventoryModal = false;
            freshGetList()
          }
        }, err => console.log(err));
      };
  
      //不用余额抵扣
      $scope.noDkYeFun = function () {
        $scope.isDkFlag = false;
        $scope.balanceM = 0;
        if ($scope.payType == 2) {
          location.href = 'myCJ.html?route=payment#/payment/' + $scope.payOrdNum + '/' + $scope.muordMoney + '/' + $scope.ordquantity;
        } else if ($scope.inventoryList.length < 1) {
          if ($scope.siyoucangku == 'init') {
            meiXiFun()
          } else if ($scope.siyoucangku == '美西') {
            meiDongFun()
          } else if ($scope.siyoucangku == '美东') {
            location.href = 'myCJ.html?route=payment#/payment/' + $scope.payOrdNum + '/' + $scope.muordMoney + '/' + $scope.ordquantity;
          }
        }
      }
      //余额抵扣
      $scope.deductMFun = function () {
        if ($scope.balanceM - bs.decode($scope.muordMoney) > 0) {
          // layer.msg('余额大于订单金额!!!!')
          location.href = 'myCJ.html?route=payment#/payment/' + $scope.payOrdNum + '/' + $scope.muordMoney + '/' + $scope.ordquantity;
          return
        }
        var deData = {};
        deData.shid = $scope.itemId;
        deData.money = $scope.balanceM;
        layer.load(2);
        dsp.postFun('app/finance/prepayment', JSON.stringify(deData), function (data) {
          layer.closeAll('loading')
          $scope.isDkFlag = false;
          if (data.data.result) {
            layer.msg('deduct success')
            $scope.muordMoney = bs.decode($scope.muordMoney) - $scope.balanceM;
            $scope.muordMoney = $scope.muordMoney.toFixed(2);
            $scope.muordMoney = bs.encode($scope.muordMoney.toString())
            if ($scope.payType == 2) {
              location.href = 'myCJ.html?route=payment#/payment/' + $scope.payOrdNum + '/' + $scope.muordMoney + '/' + $scope.ordquantity;
            } else if ($scope.inventoryList.length < 1) {
              if ($scope.siyoucangku == 'init') {
                meiXiFun()
              } else if ($scope.siyoucangku == '美西') {
                meiDongFun()
              } else if ($scope.siyoucangku == '美东') {
                location.href = 'myCJ.html?route=payment#/payment/' + $scope.payOrdNum + '/' + $scope.muordMoney + '/' + $scope.ordquantity;
              }
            }

            //location.href = '#/payment/'+$scope.payOrdNum+'/'+$scope.muordMoney+'/'+$scope.ordquantity;
          } else {
            layer.msg('deduct error')
          }
        })
      }
      //跳过抵库存
      $scope.skipKcFun = function () {
        $scope.iskcFlag = false;
        $scope.inventoryList = [];
        if ($scope.balanceM <= 0) {
          if ($scope.siyoucangku == 'init') {
            location.href = 'myCJ.html?route=payment#/payment/' + $scope.payOrdNum + '/' + $scope.muordMoney + '/' + $scope.ordquantity;
          } else if ($scope.siyoucangku == '美西') {
            meiDongFun()
          } else if ($scope.siyoucangku == '美东') {
            location.href = 'myCJ.html?route=payment#/payment/' + $scope.payOrdNum + '/' + $scope.muordMoney + '/' + $scope.ordquantity;
          }
          // if ($scope.siyoucangku=='美东') {
          // 	location.href = '#/payment/'+$scope.payOrdNum+'/'+$scope.muordMoney+'/'+$scope.ordquantity;
          // } else {
          // 	meiDongFun()
          // }
        } else {
          if ($scope.siyoucangku == 'init') {//如果初次跳过  默认不进行库存抵扣
            $scope.siyoucangku == '美东'
          }
        }
      }
      //取消抵库存
      $scope.cancelDkFun = function () {
        $scope.isSureDecuntFlag = false;
        $scope.inventoryList = [];
        if ($scope.balanceM <= 0) {
          if ($scope.siyoucangku == 'init') {
            location.href = 'myCJ.html?route=payment#/payment/' + $scope.payOrdNum + '/' + $scope.muordMoney + '/' + $scope.ordquantity;
          } else if ($scope.siyoucangku == '美西') {
            meiDongFun()
          } else if ($scope.siyoucangku == '美东') {
            location.href = 'myCJ.html?route=payment#/payment/' + $scope.payOrdNum + '/' + $scope.muordMoney + '/' + $scope.ordquantity;
          }
        } else {
          if ($scope.siyoucangku == 'init') {//如果初次跳过  默认不进行库存抵扣
            $scope.siyoucangku == '美东'
          }
        }
      }
      //确定抵库存
      $scope.errorShowFlag = false
      $scope.sureDecuentFun = function () {
        layer.load(2);
        var deData = {};
        deData.shipOrderId = $scope.itemId;
        deData.siyoucangku = $scope.siyoucangku;
        // cj/cjOrderPay/cjOrderDeduction
        dsp.postFun('app/goodsInfo/orderOutGoodsInfoOpt', JSON.stringify(deData), function (data) {
          console.log(data)
          layer.closeAll('loading')
          console.log(data.data.result)
          if (data.data.result == true) {
            layer.msg('Deducted Successfully', {time: 3000});
            $scope.muordMoney = bs.decode($scope.muordMoney) - $scope.totalPrivace;
            if (!$scope.totalServerPrice) {
              $scope.totalServerPrice = 0;
            } else {
              $scope.muordMoney = $scope.muordMoney + ($scope.totalServerPrice - 0)
            }
            console.log($scope.muordMoney)
            $scope.muordMoney = $scope.muordMoney.toFixed(2);
            console.log($scope.muordMoney)
            $scope.muordMoney = bs.encode($scope.muordMoney.toString())
            if ($scope.siyoucangku == 'init') {
              meiXiFun()
            } else if ($scope.siyoucangku == '美西') {
              meiDongFun()
            } else if ($scope.siyoucangku == '美东') {
              if ($scope.balanceM <= 0) {
                location.href = 'myCJ.html?route=payment#/payment/' + $scope.payOrdNum + '/' + $scope.muordMoney + '/' + $scope.ordquantity;
              }
            }
          } else {
            if(data.data.code == 400){
              $scope.errorShowFlag = true;
              $scope.logisticsReasonList = data.data.data.map((item) => {
                return {
                  recordNum: item,
                  message: data.data.message
                }
              })
            }else{
              layer.msg('Deduct error');
            }
          }
        }, function (data) {
          layer.closeAll('loading')
          console.log(data)
        })
      }
      // $scope.payFun = function (item) {
      // 	var payOrdNum = bs.encode(item.ID);
      // 	var muordMoney = bs.encode(item.ORDERMONEY.toString());
      // 	var ordquantity = bs.encode(item.ORDERNUMBER.toString());
      // 	var payData = {};
      // 	payData.shipOrderId = item.ID;
      // 	dsp.postFun('app/order/checkChildOrders',JSON.stringify(payData),function (data) {
      // 		console.log(data)
      // 		if (data.data.result) {
      // 			location.href = '#/payment/'+payOrdNum+'/'+muordMoney+'/'+ordquantity;
      // 		}else{
      // 			layer.msg('Sorry, The order related to this payment is not found, please double check and resubmit it or contact your agent.',{time:5000})
      // 		}
      // 	},function (data) {
      // 		console.log(data)
      // 	})
      // 	console.log(payOrdNum,muordMoney,ordquantity)
      // }
      //发票按钮事件
      $scope.invoiceFun = function (id) {
        console.log(id);
        dsp.isinvoiceDialog(id, '');
      }
      // 导出订单
      var daochuOrdId;
      $scope.exportOrder = function (item) {
        $scope.dcordFlag = true;
        daochuOrdId = item.ID;
      }
      $scope.goActexportOrder = function () {
        layer.load(2);
        dsp.postFun('app/client_erp/exportPaymentOrders', JSON.stringify({
          id: daochuOrdId
        }), function (data) {
          layer.closeAll('loading');
          console.log(data);
          if (data.data.statusCode == 200) {
            $scope.dcordFlag = false;
            $scope.dcordCallbackFlag = true;
            $scope.excelHref = JSON.parse(data.data.result).href;
          } else {
            layer.msg('Export order error.')
          }
        })
      }
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
      //显示隐藏高级搜索
      $('.toggle-moresearch').click(function () {
        $('.more-search').toggle(300);
        console.log(22222222)
        $('#toggle-logo').toggleClass('.glyphicon glyphicon-triangle-top');
      });

      //设置下单时间
      var orderData = new Date();
      var orderyear = orderData.getFullYear();
      var ordermonth = orderData.getMonth() + 1;
      var orderday = orderData.getDate();
      var orderhour = orderData.getHours();
      var ordermin = orderData.getMinutes();
      // var ordersecond = orderData.getSeconds();
      var $p1 = $('<p>' + orderyear + '-' + ordermonth + '-' + orderday + orderhour + ':' + ordermin + '</p>');
      // var $p2 = $('<p>'+orderhour + ':'+ordermin+'</p>');
      $('.order-time').append($p1);
      // $('.order-time').append($p2);

      //给代付款添加选中非选中事件
      var awitIndex = 0;
      $('#await-table').on('click', '.zcheckbox', function () {
        if ($(this).attr('src') == 'static/image/direct-orders/multiple1.png') {
          $(this).attr('src', 'static/image/direct-orders/multiple2.png');
          awitIndex++;
          if (awitIndex == $('#await-table .zcheckbox').length) {
            // alert('quanbuxuanzhogn')
            $('#await-table .zchecked-all').attr('src', 'static/image/direct-orders/multiple2.png');
          }
        } else {
          $(this).attr('src', 'static/image/direct-orders/multiple1.png');
          awitIndex--;
          if (awitIndex != $('#await-table .zcheckbox').length) {
            $('#await-table .zchecked-all').attr('src', 'static/image/direct-orders/multiple1.png');
          }

        }
      })
      //全选
      $('#await-table').on('click', '.zchecked-all', function () {
        if ($(this).attr('src') == 'static/image/direct-orders/multiple1.png') {
          $(this).attr('src', 'static/image/direct-orders/multiple2.png');
          awitIndex = $('#await-table .zcheckbox').length;
          $('#await-table .zcheckbox').attr('src', 'static/image/direct-orders/multiple2.png');
        } else {
          $(this).attr('src', 'static/image/direct-orders/multiple1.png');
          awitIndex = 0;
          $('#await-table .zcheckbox').attr('src', 'static/image/direct-orders/multiple1.png');
        }
      })

      var zawitIndex = 0;
      $('#zawait-tab').on('click', '.zcheckbox', function () {
        if ($(this).attr('src') == 'static/image/direct-orders/multiple1.png') {
          $(this).attr('src', 'static/image/direct-orders/multiple2.png');
          zawitIndex++;
          if (zawitIndex == $('#zawait-tab .zcheckbox').length) {
            // alert('quanbuxuanzhogn')
            $('#zawait-tab .zchecked-all').attr('src', 'static/image/direct-orders/multiple2.png');
          }
        } else {
          $(this).attr('src', 'static/image/direct-orders/multiple1.png');
          zawitIndex--;
          if (zawitIndex != $('#zawait-tab .zcheckbox').length) {
            $('#zawait-tab .zchecked-all').attr('src', 'static/image/direct-orders/multiple1.png');
          }

        }
      })
      //全选
      $('#zawait-tab').on('click', '.zchecked-all', function () {
        if ($(this).attr('src') == 'static/image/direct-orders/multiple1.png') {
          $(this).attr('src', 'static/image/direct-orders/multiple2.png');
          zawitIndex = $('#zawait-tab .zcheckbox').length;
          $('#zawait-tab .zcheckbox').attr('src', 'static/image/direct-orders/multiple2.png');
        } else {
          $(this).attr('src', 'static/image/direct-orders/multiple1.png');
          zawitIndex = 0;
          $('#zawait-tab .zcheckbox').attr('src', 'static/image/direct-orders/multiple1.png');
        }
      })



      //删除母订单
      $scope.isdelFlag = false;
      var delId = '';//存储要删除的订单id
      $scope.deletMuFun = function (item) {
        $scope.isdelFlag = true;
        delId = item.ID;
      }
      $scope.cancelDelFun = function () {
        $scope.isdelFlag = false;
        delId = '';
      }
      $scope.sureDeletMuFun = function () {
        $scope.isdelFlag = false;
        var idcs = {};
        idcs.id = delId;
        // alert(idcs.id)
        console.log(idcs)
        console.log(JSON.stringify(idcs))
        // return;
        dsp.postFun('app/order/deleteShipmentsOrder', JSON.stringify(idcs), function (data) {
          console.log(data)
          if (data.data.result == 'true') {
            $scope.pageNum = 1;
            getList()
          } else {
            layer.closeAll("loading")
            dsp.closeLoadPercent($('.orders-list'))
            layer.msg('Deleting failed. The order cannot be deleted with deducted products.')
          }
        }, function (data) {
          layer.closeAll("loading")
          dsp.closeLoadPercent($('.orders-list'))
          console.log(data)
        })
      }

      //cj开始日期搜索
      $("#cj-stime").click(function () {
        var cjendtime = $("#cj-stime").val();
        var interval = setInterval(function () {
          var endtime2 = $("#cj-stime").val();
          if (endtime2 != cjendtime) {
            $scope.ordersList = [];
            dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0)
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
            $scope.ordersList = [];
            dsp.loadPercent($('.orders-list'), $(window).height() - 171, 47, 0)
            clearInterval(interval);
            $scope.pageNum = 1;
            getList()
          }
        }, 100)
      })

      //按订单号搜索
      $('.ord-search-inp').keypress(function (Event) {
        if (Event.keyCode == 13) {
          $scope.searchOrdNumFun();
        }
      })
      $scope.searchOrdNumFun = function () {
        $scope.pageNum = 1;
        getList()
      }
      // var pageH = $(window).height()-80;
      // var docH = $(document).height();
      $('.d-direct-right').css({
        'min-height': $(window).height() * 1 - 15 + 'px'
      });

      // $('.direct-right').height()
      //子订单的详情
      $('.orders-list').on('click', '.zi-order-num', function () {
        location.href = "#/order-detail";
      })
      $scope.ziordFun = function (item) {
        var muordid = bs.encode(item.ID)
        location.href = '#/drop-home-zi/' + muordid;
      }
      /*------*/
      $scope.TrackingInfoChange = function () {
        console.log($scope.fulfillmentStatus)
        dsp.postFun('cj/fulfillmnet/updateFulfillmentStatus', { flag: $scope.fulfillmentStatus }, function (data) {
          layer.closeAll("loading")
          if (data.data.statusCode == 200) {
            if ($scope.fulfillmentStatus == '1') {
              layer.msg('Set Successfully')
            } else if ($scope.fulfillmentStatus == '0') {
              layer.msg('Set Successfully')
            }
          }
        })
      }
      $scope.showOrderDetail = false;
      $scope.goOrderDetail = function (item, index) {
        let params = {
          ...JSON.parse(sessionStorage.getItem('order_info')),
          index
        };
        params.type='4';
        sessionStorage.setItem('order_info', JSON.stringify(params));
        window.location.href = '#/order-pay';
      }

      function freshGetList() {
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
          getList();
        }
      } else {
        return layer.msg(data.msg)
      }
    }, err => {
      console.log(err);
    })
  }

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
