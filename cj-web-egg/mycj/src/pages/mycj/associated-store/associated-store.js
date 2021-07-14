import { DASHBOARD } from '@src/pages/mycj/mycj.router';


export function associatedStoreFactory(angular) {
  // 1.店铺授权模块
  const module = angular.module('associated-store.module', ['service', 'home-service']);

  module.controller('associated-store.ctrl',
    ['$scope', '$rootScope', 'dsp', '$location', '$element', '$state', function ($scope, $rootScope, dsp, $location, $element, $state) {
      dsp.domainData().then((res) => {
        // 请求成功的结果
        $scope.iscj = res.iscj;
        $scope.affModel = res.affModel;
        if ($scope.iscj == '1') {
          //cj
          $scope.websiteName = 'CJ';
        } else {
          //客户
          $('.online-wrap2>.img4').css({ top: '32px' })
          $('.online-wrap2>p.online-content').css({ height: '80px' })
          $('.online-wrap2>.img1').css({ top: '40px' })
          $('p.online-notice').css({ top: '150px' })
          $scope.websiteName = res.websiteName || 'CJ';
        }

        getLikeProNew();
      });
      dsp.setRightMinHeight();
      if (!$rootScope.userInfo.token) {
        window.location.assign('login.html')
      }
      document.querySelector(".right-content").scrollTo({
        top: 0
      })
      $scope.hasLogin = dsp.isInLoginState();
      var userId = $rootScope.userInfo.userId;
      $scope.vip = $rootScope.userInfo.vip;
      $scope.admin = $rootScope.userInfo.loginName;
      $scope.firstName = $rootScope.userInfo.firstName;
      var width = $(".block-title").width();
      $scope.pagesize = Math.floor((width - 16) / 240);
      $scope.pagesize2 = 24; // 默认先请求24条
      $scope.totalHistoryPage;
      $scope.pagenumc = null;
      $rootScope.$on('app/info/userinfo', (_, bool) => $scope.load_userinfo = bool);
      $rootScope.$on('app/info/shopview', (_, bool) => $scope.load_shiplist = bool);
      $rootScope.$on('product-api/cjProductInfo/home/recommend/queryPage', (_, bool) => {
        console.log('boolboolbool', bool);
        $scope.load_productlist2 = bool
      });
      // // 左侧栏收起、关闭
      // $rootScope.$on('leftbar-light', (_, bool) => {
      //   if (!$state.current.url.startsWith(DASHBOARD)) {
      //     return;
      //   }
      //   setProductCardHeight({ $scope, $element, end: false });
      // });
      // $rootScope.$on('leftbar-light-end', (_, bool) => {
      //   if (!$state.current.url.startsWith(DASHBOARD)) {
      //     return;
      //   }
      //   setProductCardHeight({ $scope, $element, end: true });
      //   const sum = calcPorductCardSum($element);
      //   if (sum < $scope.pagesize2) { // 多出直接截掉
      //     $scope.pagesize2 = sum;
      //     $scope.productlist2 = $scope.productlist2.slice(0, sum);
      //   } else { // 少于重新获取
      //     $scope.pagesize2 = sum;
      //     getLikeProNew();
      //   }
      // });
      
      /** Lazada授权过期弹窗 */
      $scope.showReAuthorize = false
      checkLazadaAuthorize()
      function checkLazadaAuthorize() {
        if (localStorage.getItem('vip') == 1) {
          $scope.isVip = true;
        } else {
          $scope.isVip = false;
        }
        const url = `platform-shop/authorize/shopAuthReminder`
        dsp.getFun(url, function(res) {
          const {data} = res
          if(data.code == 200) {
            if(data.data.length > 0) {
              $scope.showReAuthorize = true
              $scope.expireList = data.data
            } else {
              // $scope.showReAuthorize = true
              // $scope.expireList = [{
              //    expireTime: 10,
              //    shopId: "9adaaeb03eec4797abbb773e3b8e5194",
              //    shopName: "CuJia Trade",
              //    shopPlatform: "LAZADA"
              // }]
              return
            }
          }
        })
      }

      //获取弹窗组件关闭按钮传回的值
      $scope.$on('closeReAuthorize', (e, data) => {
        $scope.showReAuthorize = data.showReAuthorize
      })

      /** 2021-01-22 优惠券 */
      $scope.couponsCont = 0
      getCouponsCount()
      function getCouponsCount() {
        const params = { userId }
        dsp.postFun('operationCenterApi/apiCoupon/orderIsAvailable', params, ({data}) => {
          const { data: list = [], code } = data
          if(+code === 200) {
            $scope.couponsCont = list.length
          }
        })
      }

      // 获取私有库存预警
      $scope.warningCount = 0;
      getWarning()
      function getWarning() {
        dsp.getFun('early-warning-web/earlyWarning/getWarningSKUNum', (res) => {
          let { code, data } = res.data;
          if (code != 200) {
            layer.msg('Get the SKU num error');
          } else {
            if(data && data.skuNum) {
              $scope.warningCount = data.skuNum;
            }
          }
        });
      }
      
      // 跳My Inventory
      $scope.toMyInventory = function() {
        location.href = 'myCJ.html#/my-inventory'
      }

      //跳转优惠券
      $scope.jumpFun4 = () => {
        location.href = 'newmycj/marketing/coupons'
      }

      /** 2021-01-22 优惠券结束  */

      dsp.postFun('app/info/userinfo', { "data": "{'userId': '" + userId + "'}" }, clo, err)

      function con(n) {
        var obj = JSON.parse(n.data.result)
        // dsp.closeLoad();
        $scope.shoplist = obj;
        console.log($scope.shoplist);

      }

      function orderview(n) {
        var obj = JSON.parse(n.data.result)
        $scope.orderlist = obj;
      }

      function err(n) { console.log(n) }
      dsp.postFun('app/info/orderview ', { "data": "{'userId': '" + userId + "'}" }, orderview, err)
      getShopView();

      function getShopView() {
        //dsp.load();
        dsp.postFun('app/info/shopview', { "data": "{'userId': '" + userId + "'}" }, con, function (n) {
          //dsp.closeLoad();
        })
      }
      /** 待办事项 */
      $scope.UnsycedCount = 0;
      $scope.OverdueCount = 0;
      $scope.DisputeCount = 0;
      $scope.ebayTokenCount1 = 0; // token即将过期的ebay店铺
      $scope.ebayTokenCount2 = 0; // token已过期的ebay店铺
      // $scope.ebayTokenCount3 = 0; // 问题包裹
      $scope.orderShelving = 0; //搁置订单
      $scope.issueCount = 0; // 工单
      getTodoList()
      function getTodoList() {
        // layer.load(2)

        dsp.mypost('cj/account/newAccountTodo', {}).then(({ dispose, fulfillFail, observer, orderResend, retMap, orderShelving,issueCount }) => {
          $scope.UnsycedCount = fulfillFail && fulfillFail.count ? fulfillFail.count : 0;//同步失败
          $scope.OverdueCount = observer && observer.count ? observer.count : 0;//僵尸订单
          $scope.DisputeCount = dispose && dispose.count ? dispose.count : 0;//纠纷
          $scope.orderResend = orderResend && orderResend.count ? orderResend.count : 0;//问题包裹
          $scope.orderResendDaiqu = orderResend && orderResend.daiTongZhiCount ? orderResend.daiTongZhiCount : 0;//问题包裹待自取
          $scope.orderResendDaipai = orderResend && orderResend.daiZhiFuCount ? orderResend.daiZhiFuCount : 0;//问题包裹待重派
          $scope.orderShelving = orderShelving && orderShelving.count ? orderShelving.count : 0; //搁置订单
          $scope.issueCount = issueCount && issueCount.count ? issueCount.count : 0;
          // console.log(retMap)
          console.log(orderResend)
          $scope.ebayTokenCount1 = retMap && retMap.theCount ? retMap.theCount : 0;
          $scope.ebayTokenCount2 = retMap && retMap.outCount ? retMap.outCount : 0;
          // $scope.ebayTokenCount3 = retMap && retMap.outCount ? retMap.outCount : 0;
          console.log('getTodoList', $scope.UnsycedCount, $scope.OverdueCount, $scope.DisputeCount, $scope.orderResend)   // 0 1 14 0
        })
      }
      $scope.navTo = function (target) {
        if (target === 'dispute') {
          $location.path('/after-sale//');
          $location.search({ filter: 1 });
          return
        }
        if (target === 'OverdueCount') return $location.path(`todoList/1`);
        if (target === 'UnsycedCount') return $location.path(`todoList/2`);
        if (target === 'ebayauth') return $location.path('authorize/Ebay');
        if (target === 'problem') return $location.path(`problem-package/${$scope.orderResendDaipai ? 1 : 3}`);
        if (target === 'issue') return $location.path("ticketList");
      }

      //搁置状态
      $scope.WAIT_RESOLVE = ['10','69'] //待处理
      $scope.ORDER_SHIPPED = ['12'] //已发货
      $scope.WAIT_DELIVE = ['6','60','61','62','64','65','67','70','111','68'] //待发货
      $scope.ORDER_OVERED = ['13'] //已结束
      $scope.ORDER_COMPLETED = ['7','5'] //已完成
      //搁置订单
      function getShelveList(){
        dsp.postFun('cj/shelving/selectShelvingInfoList',{},function ({data}){
          $scope.shelveList = data.result;
          $scope.shelveList.map(item => {
            if ($scope.WAIT_RESOLVE.includes(item.status)) {
              item.shelveStatus = 'Pending';
              return item
            }
            if ($scope.WAIT_DELIVE.includes(item.status)) {
              item.shelveStatus = 'Processing';
              return item
            }
            if ($scope.ORDER_SHIPPED.includes(item.status)) {
              item.shelveStatus = 'Dispatched';
              return item
            }
            if ($scope.ORDER_COMPLETED.includes(item.status)) {
              item.shelveStatus = 'Completed';
              return item
            }
            if ($scope.ORDER_OVERED.includes(item.status)) {
              item.shelveStatus = 'Closed';
              return item
            }
            item.shelveStatus = '--'
          })
        });
      }
      getShelveList();
      $scope.showShelveToggle = function (bool = !$scope.shelve) {
        $scope.shelve = bool;
      };

      $scope.showShelve = function(){
        if ($scope.orderShelving === 0){
          return ;
        }
        $scope.shelve = true;
      };

      //跳转到todoList
      $scope.goTodoList = function (type) {
        location.href = `#/todoList/${type}`
      }
      /**待办事项结束 */
      function clo(n) {
        var obj = JSON.parse(n.data.result)
        console.log(obj[0]);
        $scope.isVerify = obj[0].STATUS === 3
        localStorage.setItem('emailVerifyStatus', obj[0].STATUS); // 1 邮箱已验证 3 邮箱未验证
        dsp.setCookie('emailVerifyStatus', obj[0].STATUS, 3, __root__domain);
        $scope.userID = obj[0].ID
        dsp.postFun('app/wallet/getUserSalesAmount', { 'userId': $scope.userID }, function({data}) {
          $scope.salesBalance = data.data.totalSalesAmount
        })
        $scope.userinfo = obj;
        $scope.userAvatar = obj[0].img === 'https://cc-west-usa.oss-us-west-1.aliyuncs.com/ba627238-87d7-41a9-86f1-960b4cc07ebf.png' ? '' : obj[0].img;
        $scope.WalletBalance = obj[0].balance || 0;
        // $scope.salesBa = Math.round($scope.salesBalance / 10);
        $scope.salesBa = obj[0].availableIntegral;
        $scope.moneyLeavl = obj[0].moneyLevel;
        $scope.moneyLeavl > 0 && $('.lvdj-ul>li').eq($scope.moneyLeavl-1).addClass('lv-bjli')
        $('.val-pro').css('width', $scope.moneyLeavl / 5 * 100 + '%')
        if (obj[0]) {
          // obj[0].NAME ? obj[0].NAME.slice(0, 1).toUpperCase() : obj[0].LOGIN_NAME.slice(0, 1).toUpperCase();
          $scope.imgname = obj[0].firstName ? obj[0].firstName.slice(0,1).toUpperCase() : obj[0].LOGIN_NAME.slice(0, 1).toUpperCase();
        }
      }
      
      $scope.showPrevHistory = function () {
        $scope.pagenumc--;
        if ($scope.pagenumc < 1) {
          $scope.pagenumc = $scope.totalHistoryPage;
        }
        getLikeProNew();
      }
      $scope.showNextHistory = function () {
        $scope.pagenumc++;
        if ($scope.pagenumc > $scope.totalHistoryPage) {
          $scope.pagenumc = 1;
        }
        getLikeProNew();
      }
      $scope.productlist2 = []
      $scope.clickNum = 0
      const { getInterfereProdId, getInterfereProdVersion } = window
      const getVersion = getInterfereProdVersion && getInterfereProdVersion()
      function getLikeProNew(msgLoading) {
        const interfereProdVersion = getVersion && getVersion() || undefined
        $(".PrintContent .hasListData").busyLoad("show", {
          color: '#FF7700',
          background: 'transparent'
        });
        dsp.postFun('elastic-api/recommend/search/myCj/queryPage', {
          size: $scope.pagesize2,
          page: $scope.pagenumc,
          requestSource: '0', // 请求来源  0 : web端 1 : M站/App
          categoryIdList: getInterfereProdId && getInterfereProdId(), // 干预的类目的id集合
          versionNum: interfereProdVersion, // 版本号
        }, ccn, err)
        function ccn(n) {
          if (n.data.success) {
            msgLoading && msgLoading.hide()
            if (interfereProdVersion == undefined) {
              // 没有版本号的时候，设置
              getVersion && getVersion(n.data.data.content[0] && n.data.data.content[0].versionNum)
            }
            $(".PrintContent .hasListData").busyLoad("hide");
            $scope.productlist2 = [...$scope.productlist2, ...n.data.data.content];
            $scope.pagenumc = parseInt(n.data.data.pageNumber);
            $scope.totalHistoryPage = parseInt(n.data.data.totalPages);
            $scope.$broadcast('prodCardList-data', {
              data: $scope.productlist2,
              isMore: $scope.clickNum < $scope.totalHistoryPage
            });
          }
        }
      }
      $scope.$on('prodCardList-fa', function (d, msgLoading) {
        $scope.clickNum += 1
        $scope.pagenumc += 1;
        if ($scope.clickNum >= $scope.totalHistoryPage) {
          msgLoading && msgLoading.hide()
          return;
        } else {
          if ($scope.pagenumc > $scope.totalHistoryPage) {
            $scope.pagenumc = 1;
          }
        }
        getLikeProNew(msgLoading)
      });

      var selectData = {};
      $scope.jumpFun1 = function () {
        location.href = '#/sourcing';
      }
      $scope.jumpFun2 = function () {
        location.href = '/newmycj/dropshipping/orderManage?active=2';
      }
      $scope.jumpFun3 = function () {
        location.href = '/newmycj/dropshipping/orderManage?active=3';
      }
      //关闭提示拉取订单的弹框
      $('.close-btn').click(function () {
        $('.tips-con').hide();
      })
      setTimeout(function () {
        $('.tips-con').animate({ opacity: '0' }, 2000, function () {
          $('.tips-con').hide();
        });
      }, 5000)
     
      /*通知*/
      $scope.isLookNotice = sessionStorage.getItem('isLookNotice') || '0';
      
      $scope.IKnow = function () {
        $scope.isLookNotice = true;
        sessionStorage.setItem('isLookNotice', '1');
      }
      $scope.CheckNow = function (id) {
        $scope.isLookNotice = true;
        sessionStorage.setItem('isLookNotice', '1');
        location.href = 'myCJ.html#/message-list/' + id;
      }
      /*验证邮箱*/
      $scope.handleVerify = () => {
        dsp.isVerifyEmail()
      }

      //listOrsource按钮
      $scope.listOrsourceBtn = function (item, $event) {
        $event.stopPropagation();
        if (item.ID) {
          window.open('product-detail.html?id=' + item.ID + '&list=1');
        } else if (item.id) {
          window.open('product-detail.html?id=' + item.id + '&list=1');
        }

      };

      // 基于准备好的dom，初始化echarts实例
      $scope.dayChange = function (value) {
        $scope.chartInit(value);
      }
      $scope.chartAreaShow = false;
      $scope.chartInit = function (filter) {
        const params = filter ? { days: filter } : {}
        dsp.postFun('newlogistics/logistics/statistics', JSON.stringify(params), function ({ data }) {
          let { statusCode, result } = data;
          if (statusCode == 200) {
            chartInit(result);
          }
        }, function (err) { })
      }

      function chartInit({ statistics, statusInfo }) {
        let { 'Delivered': deliveredVal, 'No Tracking Infor Found': deliveringVal } = statusInfo;
        if (!statistics || !statistics.length) return console.log('no data');
        let newStatistics = statistics.map(item => {
          let { averageDeliveryDay, logisticsName, deliveryCount, notDeliveryCount } = item;
          let deliveredRate = Math.floor(deliveryCount / (deliveryCount + notDeliveryCount) * 100) // 此处为百分比数值  缺少%
          return { averageDeliveryDay, logisticsName, deliveryCount, notDeliveryCount, deliveredRate } // averageDeliveryDay => 折线图数据 deliveryCount + notDeliveryCount => 柱状图数据  deliveredRate => 饼状图order rate数据
        })

        const color = { //颜色皮肤 会员及普通账户
          vip: { //会员账户
            colorPieArr: ['#7ED321', '#A3A0FB', '#FF8373', '#4A90E2', '#F76B1C', '#FDD3A0'],
            colorBar: {
              delivered: '#F76B1C',
              delivering: '#FEE0BB'
            },
            colorLine: '#F76B1C',
            rgbLine: ['rgba(247, 107, 28, 1)', 'rgba(247, 107, 28, 0.5)', 'rgba(247, 107, 28, 0.3)', 'rgba(247, 107, 28, 0)']
          },
          common: { //普通账户
            colorPieArr: ['#FEB35E', '#C4B098', '#759ECA', '#05A2D2', '#A4B452', '#FDD3A0'],
            colorBar: {
              delivered: '#FDA84C',
              delivering: '#F4DDAA'
            },
            colorLine: '#FDAB52',
            rgbLine: ['rgba(253, 171, 82, 1)', 'rgba(253, 171, 82, .5)', 'rgba(253, 171, 82, 0.3)', 'rgba(253, 171, 82, 0)']
          }
        };
        let role = $scope.vip === '1' ? 'vip' : 'common'; //角色设置   localStorage vip => 1 else common
        const areaStyle = { //折线阴影设置
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: color[role].rgbLine[0] // 0% 处的颜色
            }, {
              offset: 0.2,
              color: color[role].rgbLine[1] // 100% 处的颜色
            },
            {
              offset: 0.4,
              color: color[role].rgbLine[2] // 100% 处的颜色
            },
            {
              offset: 0.6,
              color: color[role].rgbLine[3] // 100% 处的颜色
            }
            ],
            global: false // 缺省为 false
          }
        };

        const pieData = { // 饼图cicle-delivery数据
          legend: [],
          series: []
        };
        const pieNewStatistics = newStatistics.slice(0, 6);
        pieData.legend = pieNewStatistics.map(({ logisticsName }) => ({ name: logisticsName, icon: 'circle' }))
        pieData.series = pieNewStatistics.map(({ logisticsName, deliveredRate }, i) => ({ name: logisticsName, value: deliveredRate, itemStyle: { color: color[role].colorPieArr[i] } }))

        if (newStatistics.length > 6) { // 饼图格式化数据 超过6种 全部计算为 others
          const otherPieNewStatistics = statistics.slice(6);
          pieData.legend.push({ name: 'Others', icon: 'circle' });
          let deliveryCountSum = 0;
          let notDeliveryCountSum = 0;
          otherPieNewStatistics.forEach(({ deliveryCount, notDeliveryCount }) => {
            deliveryCountSum += deliveryCount
            notDeliveryCountSum += notDeliveryCount;
          })
          const otherRate = Math.floor(deliveryCountSum / (deliveryCountSum + notDeliveryCountSum) * 100);
          pieData.series.push({ name: 'Others', value: otherRate, itemStyle: { color: color[role].colorPieArr[6] } })
        }


        const orderRateData = { //饼图order-rate数据
          legend: [ //说明栏
            { name: 'Delivered', icon: 'circle' },
            { name: 'No Tracking Info Found', icon: 'circle' },
          ],
          series: [
            { value: deliveredVal, name: 'Delivered', itemStyle: { color: color[role].colorPieArr[0] } }, //
            { value: deliveringVal, name: 'No Tracking Info Found', itemStyle: { color: color[role].colorPieArr[1] } },
          ]
        }

        const data = { // 柱状+折线 图 数据
          legend: ['Delivered', 'Ready for Delivery', 'Average Delivery Time'],
          series: [{
            name: 'Delivered',
            type: 'bar',
            itemStyle: { color: color[role].colorBar.delivered },
            data: []
          },
          {
            name: 'Ready for Delivery',
            type: 'bar',
            itemStyle: { color: color[role].colorBar.delivering },
            data: []
          },
          {
            name: 'Average Delivery Time',
            type: 'line',
            yAxisIndex: 1,
            lineStyle: { color: color[role].colorLine },
            areaStyle,
            data: []
          }
          ]
        };
        data.series[0].data = newStatistics.map(({ deliveryCount }) => ({ value: deliveryCount }));
        data.series[1].data = newStatistics.map(({ notDeliveryCount }) => ({ value: notDeliveryCount }));
        data.series[2].data = newStatistics.map(({ averageDeliveryDay }) => ({ value: averageDeliveryDay }));
        let xAxisData = newStatistics.map(({ logisticsName }) => ({ value: logisticsName }));
        let xAxisDataLen = xAxisData.length;
        if (xAxisDataLen < 5) { //少于5条数据 自动补足横轴补足 适应宽度
          for (let i = 0; i < 5 - xAxisDataLen; i++) {
            xAxisData.push({ value: '' })
          }
        }

        const option = { //折线图 柱状图 默认配置
          tooltip: {
            trigger: 'axis'
          },
          calculable: true,
          dataZoom: { //
            show: true,
            realtime: true, //是否实时变化
            // start: 0, //显示区域百分比
            // end: 90,
            startValue: 0,
            endValue: 6
          },
          legend: {
            data: data.legend,
            itemWidth: 24,
            itemHeight: 10,
          },
          xAxis: [{
            type: 'category',
            data: xAxisData,
          },],
          yAxis: [{
            type: 'value',
            name: 'Orders',
            min: function (value) {
              return value.min;
            },
            max: function (value) {
              return value.max + value.max * 0.05;
            },
          },
          {
            type: 'value',
            name: 'Average Delivery Time/Day(s)',
            min: function (value) {
              return value.min;
            },
            max: function (value) {
              return value.max + value.max * 0.05;
            }
          }

          ],
          series: data.series
        };
        const pieOption = { //饼状图delivery-rate默认配置
          title: {
            text: 'Successful Delivery Rate',
            x: 'left',
            padding: [0, 0, 0, 26]
          },
          legend: {
            orient: 'vertical',
            top: 76,
            left: 260,
            itemWidth: 10,
            itemHeight: 10,
            data: pieData.legend
          },
          tooltip: { //value => c
            trigger: 'item',
            formatter: "Compare with current shipping: {c}% <br/>Compare with all shipping: {d}%"
          },
          calculable: true,
          series: [{
            type: 'pie',
            radius: [40, 100], //半径 R r
            center: ['30%', '60%'],
            startAngle: 135,
            data: pieData.series,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
            },
          }]
        };
        const pieDeliveryOption = { //饼状图order-status默认配置
          title: {
            text: 'Order Status',
            x: 'left',
            padding: [0, 0, 0, 80]
          },
          legend: {
            orient: 'vertical',
            top: 76,
            left: 260,
            itemWidth: 10,
            itemHeight: 10,
            data: orderRateData.legend
          },
          tooltip: {
            trigger: 'item',
            formatter: "{b}: {c} <br/>CJ Order Rate: {d}%"
          },
          calculable: true,
          series: [{
            type: 'pie',
            radius: [40, 100], //半径 R r
            center: ['30%', '60%'],
            startAngle: 135,
            data: orderRateData.series,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
            },
          }]
        };

        // 基于准备好的dom，初始化 echarts 图表

        const myChart = echarts.init(document.getElementById('main'));
        const myPieChart = echarts.init(document.getElementById('cicle-delivery-rate'));
        const myPieDeliveryChart = echarts.init(document.getElementById('cicle-order-status'));
        // 为echarts对象加载数据
        myChart.setOption(option);
        myPieChart.setOption(pieOption);
        myPieDeliveryChart.setOption(pieDeliveryOption);
        $scope.chartAreaShow = true;
        const echartsArea = document.getElementById('echartsArea');
        const lineChart = document.getElementById('main');
        setTimeout(() => { chartAdapt() }); //线状柱形图 适应屏幕

        const debounce = function (fn, delay) { //延时函数
          let lastTime = Date.now();
          return function () {
            let currentTime = Date.now();
            if (currentTime - lastTime > delay) {
              lastTime = currentTime;
              fn()
            }
          }
        }
        window.onresize = debounce(chartAdapt, 500);

        function chartAdapt() {
          const width = echartsArea.getBoundingClientRect().width
          if (width < 1300) {
            lineChart.style.width = '700px';
            lineChart.style.height = '400px';
            myChart.resize()
          } else {
            lineChart.style.width = '900px';
            lineChart.style.height = '500px';
            myChart.resize()
          }
        }
      }
      $scope.chartInit();
      $scope.tipShow = false;

      /**
       * 11-28  用户分析
       */
      class CreateCircle {
        constructor(container, circleArr) {
          this.circleArr = circleArr;
          this.container = container;
          container.innerHTML = null;
          const rec = container.getBoundingClientRect();
          const { width } = rec;
          const w = 937, h = 278;
          this.n = width / w;
          container.style.height = this.n * h + 'px';
          this.debounceHide = debounce(this.hideTip, 0.1);
          this.delay = 0.1;//弹窗消失延迟时间
        }
        init() {
          this.circleArr.map(item => {
            return Object.assign(item, { style: this.calcuCircleStyle(item) })
          }).forEach((cricle, i) => {
            cricle.className.push(cricle.score > 0 ? 'circle-1' : 'circle-0')
            this.createCircle(cricle, i)
          })
        }
        calcuCircleStyle({ left, top, diameter }) {//计算 圆 的样式
          const n = this.n;
          left = Math.ceil(left * n) + 'px';
          top = Math.ceil(top * n) + 'px';
          const width = Math.ceil(diameter * n) + 'px';
          const height = Math.ceil(diameter * n) + 'px';
          return { left, top, width, height }
        }
        createCircle(cricle, i) {
          let { style, tag = 'div', className, title, score } = cricle;
          const dom = document.createElement(tag);
          const contentWrap = document.createElement('div');
          dom.appendChild(contentWrap)
          const titleDom = document.createElement('div');
          const scoreDom = document.createElement('div');

          score = '+' + score;
          const scoreNode = document.createTextNode(score)
          const titleNode = document.createTextNode(title)


          titleDom.appendChild(titleNode)
          scoreDom.appendChild(scoreNode)

          contentWrap.appendChild(titleDom)
          contentWrap.appendChild(scoreDom)


          //   dom.innerText = title;
          dom.data = cricle;//存储数据 desc弹框内容  url 弹框 点击跳转页面
          dom.classList.add('circle');
          this.addDomStyle(dom, style);
          this.addDomClass(dom, className);
          this.addDomClass(dom, [`circle-i${i}`]);
          this.addDomEvent(dom)
          this.addDomTip(dom)
          this.addDomClass(scoreDom, ['score']);
          this.container.appendChild(dom);
          if (!title) scoreDom.innerText = '';
        }
        addDomStyle(dom, style) {
          for (const prop in style) {
            if (style.hasOwnProperty(prop)) {
              const val = style[prop];
              dom.style[prop] = val;
            }
          }
        }
        addDomClass(dom, className) {
          typeof className === 'string' && dom.classList.add(className);
          Array.isArray(className) && dom.classList.add.apply(dom.classList, className);
        }
        addDomEvent(dom) {
          if (!dom.data.title) return;//有一个装饰的球不需要 title没有 则不绑定弹窗书剑
          dom.addEventListener('mouseenter', ev => {
            this.showTip(dom)
          })
          dom.addEventListener('mouseleave', ev => {
            this.hideTip(dom)
          })
        }
        addDomTip(dom) {//创建弹框 Tip
          const tip = document.createElement('p');
          tip.addEventListener('click', () => { this.handleTipAction(dom.data) })
          const { desc, title } = dom.data;
          // tip.innerText = desc;
          tip.innerHTML = desc;
          tip.classList.add('cp');
          const style = {
            position: 'absolute',
            display: 'none'
          }
          this.addDomClass(tip, ['tip-wrap', 'wrap-text']);
          this.addDomStyle(tip, style);
          dom.appendChild(tip);
          dom.childTip = tip;
          const domAll = document.querySelectorAll('.kanbanLink');
          for(let i = 0; i < domAll.length; i++) {
            if(domAll[i].innerText == 'Elites') {
              domAll[i].addEventListener('click', () => {
                $scope.retElitesUrl();
              })
            }
          }
        }
        showTip(dom) {
          clearTimeout(dom.timer);
          dom.childTip.style.display = 'block';
          dom.style.zIndex = 2;
          const { width } = dom.data.style;
          const { width: tipWidth, height: tipHeight } = dom.childTip.getBoundingClientRect();
          const style = {
            display: 'block',
            left: (parseInt(width) - tipWidth) / 2 + 'px',
            top: - tipHeight - Math.ceil(4 * this.n) + 'px'
          }
          this.addDomStyle(dom.childTip, style)
        }
        hideTip(dom) {
          dom.timer = setTimeout(() => {
            clearTimeout(dom.timer);
            dom.childTip.style.display = 'none';
            dom.style.zIndex = 0;
          }, this.delay * 1000)
        }
        handleTipAction({ url, fn }) {
          if (url) {
            typeof url === 'string' && this.navTo(url);
            typeof url === 'function' && this.navTo(url());
          }
          if (fn) {
            typeof fn === 'function' && fn()
          }

        }
        navTo(href) {
          if (!href) return;
          let a = document.createElement('a');
          a.href = href;
          a.setAttribute('target', '_blank')
          a.click();
          a = null;
        }
      }
      let defaultCircleArr = retDefaultCircleArr()
      function retDefaultCircleArr() {//后端决定 title desc score  顺序 对接  前端决定对应的 功能跳转页面
        const defaultCircleArr = [
          { className: [], score: 0, desc: '', title: '', diameter: 94, left: 0, top: 38 },//邮箱验证
          { className: [], score: 0, desc: '', title: '', diameter: 118, left: 51, top: 160 },//授权状态
          { className: [], score: 0, desc: '', title: '', diameter: 84, left: 152, top: 71 },//手机引导页 手机上下单并付款2
          { className: [], score: 0, desc: '', title: '', diameter: 118, left: 230, top: 160 },//运费试算
          { className: [], score: 0, desc: '', title: '', diameter: 104, left: 262, top: 15 },//web端下单并付款
          { className: [], score: 0, desc: '', title: '', diameter: 76, left: 383, top: 109 },//刊登状态
          { className: [], score: 0, desc: '', title: '', diameter: 76, left: 449, top: 217 },//关联状态
          { className: [], score: 0, desc: '', title: '', diameter: 158, left: 465, top: 46 },//搜品状态
          { className: [], score: 0, desc: '', title: '', diameter: 80, left: 645, top: 0 },//Excel订单
          { className: [], score: 0, desc: '', title: '', diameter: 96, left: 652, top: 127 },//google插件
          { className: [], score: 0, desc: '', title: '', diameter: 114, left: 767, top: 174 },//和CJ客服聊天
          { className: [], score: 0, desc: '', title: '', diameter: 106, left: 774, top: 44 },//在Elites留言
          { className: ['circle-2'], score: 0, url: '', desc: '', title: '', diameter: 32, left: 905, top: 57 }
        ]
        const circleFunc = [
          { url: '/myCJ.html#/authorize/Shopify?addstore=1' },//授权状态
          { url: '/cjAppDownload.html' },//手机引导页 手机上下单并付款2   old --->> /leaflet.html
          { url: 'https://cjdropshipping.com/article-details/75' },//关联状态 old --->> /myCJ.html#/products-connection/connected
          { url: '/myCJ.html#/myCJShippingCalculation' },//运费试算 old --->> url: () => retGoodsDetailUrl('calc')
          { url: 'https://cjdropshipping.com/article-details/53' },//邮箱验证 old --->> /myCJ.html#/profile
          { url: 'https://cjdropshipping.com/article-details/8' },//搜品状态 old --->> /myCJ.html#/sourcing
          { url: 'https://cjdropshipping.com/article-details/25', },//刊登状态 old --->> url: () => retGoodsDetailUrl('list')
          { url: 'https://chrome.google.com/webstore/detail/cjdropshipping/mbndljkgaoailfnpeodnlejigmkdpokb' },//google插件 old --->> https://play.google.com/store/apps/details?id=com.cjdropshipping.app
          { url: () => retElitesUrl() },//在Elites留言
          { url: 'https://chat.cjdropshipping.com/', fn: () => { talk() } },//和CJ客服聊天
          { url: 'https://cjdropshipping.com/article-details/162' },//Excel订单 old --->> /myCJ.html#/direct-orders
          { url: 'https://cjdropshipping.com/article-details/150' },//web端下单并付款 old --->> /myCJ.html#/direct-orders
        ]
        return defaultCircleArr;
        // return defaultCircleArr.map((item, i) => circleFunc[i] ? Object.assign(item, circleFunc[i]) : item)
        // Authorization                授权状态
        // Ordering and Paying on App   手机上下单并付款2
        // Connection                   关联状态
        // Using shipping calculator    运费试算
        // Email verification           邮箱验证
        // Sourcing                     搜品状态
        // List                         刊登状态
        // CJ google extension          google插件
        // Posting on Elite             在Elites留言
        // Talking with CJ              和CJ客服聊天
        // Ordering by Excel            Excel订单
        // Ordering on web              web端下单并付款
      }


      $scope.userAnalysisShow = false;// 控制显示 用户画像
      
      $scope.retElitesUrl = () => {
        const new_url = dsp.getElitesUrl();
        if(new_url) window.open(new_url);
      }
      function retElitesUrl() {
        // : `https://elites.cjdropshipping.com/cross?token=${token}&_t=${Date.now()}`;
        return dsp.getElitesUrl();
      }
      let goodsId = null;//跳转 商品详情页id
      function retGoodsDetailUrl(action) {
        const id = goodsId || '';
        return `/product-detail.html?id=${id}&action=${action}`;
      }
      function talk() {//生产环境 才能 启用
        window.environment === '##production##' && window.postMessage({ flag: "profile-concat" }, "*")
      }

      /** echarts 画图 */
      if (typeof echarts === 'undefined') {
        window.addEventListener('load-script', ev => {
          if (ev.detail.name === 'echarts.common.min.js') {
            getAnalysisInfo();
          }
        });
      } else {
        getAnalysisInfo();
      }

      function getAnalysisInfo() {
        // layer.load(2);
        let url = 'erp/userAttribute/getAttributeList';
        dsp.mypost(url, {}).then((res) => {
          // const { data, code } = res;
          console.log('getAnalysisInfo res---> ', res)
          let circleArr = defaultCircleArr.map((item, i) => {
            const { name_en = '', desc_en = '', id } = res[i] || {};
            return Object.assign(item, { title: name_en, desc: desc_en, id })
          })

          getScoreInfo(circleArr)

        }).catch(err => {
          console.log('getAnalysisInfo err---> ', err)
        })
      }
      function getScoreInfo(circleArr) {//获取相关分值
        // layer.load(2);
        let url = 'erp/userAttribute/getAttributeScoreByUserId';
        let cjcrx = !!document.body.dataset.cjcrx;
        dsp.mypost(url, { cjcrx }).then((res) => {
          // const { data, code } = res;
          $scope.userAnalysisShow = true;
          console.log('getScoreInfo res---> ', res)
          circleArr = circleArr.map(item => {
            let scoreInfo = res.find(scoreItem => scoreItem.attribute_id == item.id) || {};
            // console.log('scoreInfo', scoreInfo)
            return Object.assign(item, { score: scoreInfo.score || 0 })
          })
          console.log('circleArr  --->>  ', circleArr)
          $scope.circleArr = circleArr;
          const myScore = circleArr.reduce((prev, next) => prev + next.score, 0);
          $scope.fillStyle = { width: myScore + '%' }
          const coin = Math.ceil(myScore / 20) || 1;//coin数量
          $scope.coinImg = `/static/image/public-img/coin${coin}.png`;
          $scope.level = Math.floor(myScore / 10);
          $scope.isjifenDrop = $scope.level * 10 < 60
          console.log('myScore  --->>  ', myScore)
          init(circleArr)
        }).catch(err => {
          console.log('getScoreInfo err---> ', err)
          init(circleArr)
        })
      }
      function init(circleArr) {//用户分析 初始化
        const container = document.getElementById('container');
        if (!container) {
          return;
        }
        function createCircle() {
          let circle = new CreateCircle(container, circleArr)
          circle.init()
        }
        const debounceCreateCircle = debounce(createCircle, 0.1)
        debounceCreateCircle()
        window.onresize = function () {
          debounceCreateCircle()
        }
      }


      function createLevelLineDate() {//lv1 - lv10
        let arr = [];
        for (let i = 0; i < 11; i++) {
          arr.push({
            lv: `${i}`,
            score: i * 10
          })
        }
        return arr;
      }
      $scope.levelLineData = createLevelLineDate()
      function debounce(fn, delay = 1) {//防抖 fn
        let timer = null;
        return function () {
          clearTimeout(timer);
          const args = arguments;
          timer = setTimeout(() => {
            fn.apply(this, args);
          }, delay * 1000);
        }
      }
      setTimeout(() => getTrendingProducts(), 500)
      function getTrendingProducts() {//获取猜你喜欢 商品列表 用于 取第一个 商品id 作为 用户分析
        // layer.load(2);
        let url = 'cj/homePage/selectNewProductList';
        dsp.mypost(url, { timeFlag: 'Dropshipping', pageSize: 6 }).then(res => {
          console.log('getTrendingProducts res', res)
          goodsId = res[0] ? res[0].id : null;
        }).catch(err => {
          console.log('getTrendingProducts err', err)
        })
      }

      /** 2020-04-09 积分可折叠 */
      $scope.shrinkDropFn = () => { //展开收起
        $scope.isjifenDrop = !$scope.isjifenDrop
      }
    }]);

  return module;
}

// 计算商品卡片数量
function calcPorductCardSum($element) {
  const boxWidth = $element.find('#js-product-card-wrap').width();
  const prodCardWidth = 250; // 一个商品卡片宽度
  const onLineSum = Math.floor(boxWidth / prodCardWidth) // 一行排列数量
  // console.log(onLineSum * 2);

  return onLineSum * 2; // 保留两排
}

// 收起、打开左侧栏动态调整
function setProductCardHeight({ $scope, $element, end }) {
  if (end) {
    $scope.productCardStyle = {};
  } else {
    // 收起、展开过程中不要把多余的图片露出来
    const boxHeight = $element.find('#js-product-card-wrap').height();
    $scope.productCardStyle = {
      "max-height": `${boxHeight}px`,
      "overflow": "hidden",
    };
  }
}
