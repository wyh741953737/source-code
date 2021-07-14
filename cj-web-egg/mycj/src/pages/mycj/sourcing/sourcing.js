export function sourcingFactory(angular) {
  const module = angular.module('sourcing.module', ['service', 'ngSanitize']);

  module.controller('sourcing.ctrl', ['$scope', '$rootScope', 'dsp', '$http', '$stateParams','$sce', '$filter',
    function ($scope, $rootScope, dsp, $http, $stateParams, $sce, $filter) {
      const {
        userId,
        vip
      } = $rootScope.userInfo;
      $scope.vip = vip;
      $scope.content = 'Are you sure to delete this sourcing permanently?';
      const now = new Date(new Date().toLocaleDateString()).getTime();  // 产品要求默认结束时间为00:00:00
      $scope.startUpdateAt = $filter('date')(null, 'yyyy-MM-dd');  
      $scope.endUpdateAt = $filter('date')(null, 'yyyy-MM-dd');
      $scope.sortType = 2; // 排序类型 （顺序 1 倒序 2）
      $scope.timeSortType = 2; // 时间类型 （更新时间 1   创建时间 2 ）
      // 工单提交
      $scope.recordData = {};
      $scope.ticketVisible = false;
      $scope.sendSourceTicket=(data)=>{
        $scope.recordData = data;
        $scope.ticketVisible = true;
      };
      $scope.cancel=()=>{
        $scope.recordData = {};
        $scope.ticketVisible = false;
      };
      // 工单详情
      $scope.listData = {};
      $scope.ticketDetailVisible = false;
  
      $scope.openDetailTicket=(data)=>{
        $scope.listData = data;
        $scope.ticketDetailVisible = true;
      };
      $scope.detailCancel=()=>{
        $scope.listData = {};
        $scope.ticketDetailVisible = false;
      };
      // 是否是vip
      $scope.isVip = () => !!vip && +vip > 0
      var winHeight = $(window).height() * 1;
      var nodataHeight = winHeight - 331
      dsp.setRightMinHeight();
      // 按enter搜索
      $(document).keyup(function (event) {
        if (event.keyCode == 13) {
          $("#searchbtn").trigger("click");
        }
      });
      // ann
      $scope.noListData = false;
      $scope.noData = false;
      $scope.hasListData = false;
      $scope.reqFlag = 1;

      function settleImg(arr) {
        for (var i = 0; i < arr.length; i++) {
          if (!$.isArray(arr[i].imageUrl) && arr[i].imageUrl) {
            arr[i].imageUrl = arr[i].imageUrl.split(",");
            for (var j = 0; j < arr[i].imageUrl.length; j++) {
              arr[i].imageUrl[j] = 'https://' + arr[i].imageUrl[j].replace('https://', '').replace('https://', '');
            }
          }

        }
      }
      // 能够展示小红点的工单类型 2为等待回复
      $scope.replyIconType = ["2"];
      
      // 提交搜品工单成功之后需要打开的弹窗 visible
      $scope.replyComfirmVisible = false;
      // 打开(关闭)弹窗
      $scope.changeReplyConfirm = (sign) =>{
        $scope.replyComfirmVisible = sign;
      };
      // 复制sku
      $scope.showCopy = false;
      $scope.handleHover = () => {
        $scope.showCopy = true;
      }
      $scope.handleHoverFalse = () => {
        $scope.showCopy = false;
      }
      $scope.handleCopy = (sku) => {
        if(sku) {
          const input = document.getElementById('copySku');
          input.setAttribute('value', sku);
          input.select();
          document.execCommand('copy');
          layer.msg('Copied Successfully');
          $scope.showCopy = false;
        }
      }

      // 设置排序
      $scope.handleTrun = (timeSortType, sortType) => {
        $scope.timeSortType = timeSortType; // 时间类型 （更新时间 1   创建时间 2 ）
        $scope.sortType = sortType; // 排序类型 （顺序 1 倒序 2）
        firstReq();
      }


      console.log($scope.sourcestatus1);
      $scope.searchname = '';
      $scope.sourcetype = '';
      $scope.pageSize = '10';
      $scope.pageNum = 1;
      $scope.sourcestatus1 = '';
      $scope.type = $stateParams.type;
      console.log($scope.type);
      if ($scope.type == 'OnSourcing') {
        $scope.sourcestatus1 = '1'
      } else if ($scope.type == 'SourcingFail') {
        $scope.sourcestatus1 = '2'
      } else if ($scope.type == 'SourcingSuccess') {
        $scope.sourcestatus1 = '3'
      } else {
        $scope.sourcestatus1 = ''
      }
      $rootScope.$on('source/sourcing/cjlist', (_, bool) => $scope.loading = bool);
      firstReq();
      //数据请求函数
      // pageSize    pageNum   status (可以为空)  customerId    productName (可以为空)
      function firstReq() {
        const start = new Date($scope.startUpdateAt).getTime();
        const end = new Date($scope.endUpdateAt).getTime();
        if(start > end) {
          // 结束时间需要大于开始时间
          layer.msg('End time cannot be earlier than start time.')
          $scope.startUpdateAt = $filter('date')(null, 'yyyy-MM-dd');  
          $scope.endUpdateAt = $filter('date')(null, 'yyyy-MM-dd');
          return false;
        } else if(start !== 0 && end - start > 3600*24*90*1000) {
          // 支持最大的时间筛选区间为3个月
          layer.msg('Time span must be within 3 months.');
          $scope.endUpdateAt = $filter('date')(null, 'yyyy-MM-dd');
          return false;
        }
        var cjList = {};
        cjList.data = {};
        cjList.data.ceustomrId = userId;
        cjList.data.pageSize = $scope.pageSize;
        cjList.data.pageNum = $scope.pageNum;
        cjList.data.status = $scope.sourcestatus1;
        cjList.data.productName = $scope.searchname;
        cjList.data.types = $scope.sourcetype;
        cjList.data.timeSortType = $scope.timeSortType;
        cjList.data.sortType = $scope.sortType;
        cjList.data.startUpdateAt = $scope.startUpdateAt ? $scope.startUpdateAt : '';
        cjList.data.endUpdateAt = $scope.endUpdateAt ? $scope.endUpdateAt : '';
        cjList.data = JSON.stringify(cjList.data);
        // console.log(cjList.data);
        $scope.listArr = [];
        dsp.postFun('source/sourcing/cjlist', JSON.stringify(cjList), cjcon, cjerro);

        function cjcon(data) {
          var data = data.data;
          if (data.statusCode != 200) {
            dsp.cjMesFun(1);
            layer.msg(data.message);
            return false;
          }
          $scope.sourceList = JSON.parse(data.result);
          $scope.listArr = $scope.sourceList.list;
          settleImg($scope.listArr);
          $scope.countNum = $scope.sourceList.count; //共有多少条搜品
          if ($scope.countNum == 0) {
            $scope.hasListData = false;
            if ($scope.reqFlag == 1) {
              $scope.noData = true;
              $scope.noListData = false;
            } else {
              $scope.noListData = true;
              dsp.addNodataPic($('.source-orders-list'), nodataHeight, 50);
              $scope.noData = false;
            }
            return;
          }
          dsp.removeNodataPic($('.source-orders-list'));
          $scope.hasListData = true;
          $scope.noListData = false;
          $scope.noData = false;
          $scope.totalCounts = Math.ceil($scope.countNum / $scope.pageSize);
          $scope.$broadcast('page-data', {
            pageNum: $scope.pageNum,
            totalNum: $scope.totalCounts,
            totalCounts: $scope.countNum,
            pageSize: $scope.pageSize
          });
        };

        function cjerro(res) {
          dsp.cjMesFun(1);
        }
      }

      $scope.$on('pagedata-fa', function (d, data) {
        console.log(data)
        $scope.pageNum = data.pageNum;
        $scope.pageSize = data.pageSize;
        firstReq();
      });


      //选择类型
      $scope.selectChangeFun = function (sourcetype) {
        $scope.sourcetype = sourcetype;
        $scope.pageNum = 1;
        console.log('类型', $scope.sourcetype);
        $scope.reqFlag = 0;
        firstReq();
      }

      //状态改变
      $scope.sourcechange = function (sourcestatus) {
        console.log('状态', $scope.sourcestatus);
        $scope.sourcestatus1 = sourcestatus;
        $scope.pageNum = 1;
        $scope.reqFlag = 0;
        firstReq();
      }
      // 搜索搜品
      $scope.searchsouce = function (searchname) {
        $scope.searchname = searchname;
        $scope.pageNum = 1;
        console.log($scope.searchname);
        $scope.reqFlag = 0;
        firstReq();
      }


      // 删除搜品
      $scope.showPopUps = false;
      let deleteId = '';
      let deleteSourcetype = '';
      $scope.deleteSourcing = function (item) {
        $scope.showPopUps = true;
        deleteId = item.ID;
        deleteSourcetype = item.sourcetype;
        $scope.cancelFun = function () {
          $('.sourcing-tankuang-modal').hide();
        }
      }
      // 获取弹窗组件关闭按钮
      $scope.$on('closePopUps', (e, data) => {
        $scope.showPopUps = data.showPopUps;
      })
      // 获取弹窗组件确定按钮
      $scope.$on('confirmPopUps', (e, data) => {
        dsp.postFun('source/sourcing/cjDeleteSource', {
          'id': deleteId,
          'sourceType': deleteSourcetype
        },
        function (res) {
          if (res.data.statusCode == 200) {
            $scope.pageNum = (($scope.countNum-1)%$scope.pageSize)==0 ? $scope.pageNum-1:$scope.pageNum;
            firstReq();
          } else {
            dsp.cjMesFun(1);
          }
        })
        $scope.showPopUps = data.showPopUps;
      })

      // 数字用千分符分隔
      $scope.numFormat = function(num){
        var res = String(num).replace(/\d+/, function(n){ // 先提取整数部分
             return n.replace(/(\d)(?=(\d{3})+$)/g,function($1){
                return $1+",";
              });
        })
        return res;
      }

      //获取用户当前搜品信息
      function getSourceData() {
        dsp.getFun('source/sourcing/daySourceCount', function (data) {
          const {
            count,
            dayNum,
            activityNum,
            activityContent
          } = data.data
          $scope.count = count;
          $scope.dayNum = dayNum;
          $scope.activityContent = activityContent;
          $scope.activityNum = activityNum;
        }, function (data) {

        });
      }

      getSourceData()

      /* 头部菜单进入埋点 */
      function trackFun() {
        dsp.postFun('pojo/home/addStatisByType', {
          entryPage: +dsp.getQueryString('track')
        }, res => {
          console.log(res.data)
        })
      }
      if (+dsp.getQueryString('track') == 5) {
        trackFun();
      }
      /** 2020-1-14 搜品聊天 */
      $scope.chatSourcingFn = item => {
        const params = {
          sourcetype: item.sourcetype,
          id: item.ID,
          token: localStorage.getItem("noEncodeToken") || ''
        }
        window.postMessage({
          flag: "SendProductDetail",
          msg: params,
          type: 'sourcing'
        }, "*")
      }

      /* 去1688/taobao/插件处理 */
      $rootScope.isSwitch = false;
      $scope.isCJPub = false;
      $scope.isInstall = false;
      var isCrx = document
        .getElementsByTagName('body')[0]
        .getAttribute('data-cjcrx');
      var isInstallCJPub = sessionStorage.getItem('isInstallCJPub');
      $scope.CJPubTitle = 'Install CJ Chrome Extension';
      $scope.CJPubtxt =
        'We found you have not installed CJ Chrome Extension, do you want to install it?';
      $scope.isCJPub = isInstallCJPub == '1' && !isCrx;
      $scope.backFlag = false;
      $scope.yaoliuFlag = true;
      $scope.taobaoFlag = true;
      $scope.goTo1688 = () => {
        $scope.addStatisFun(9);
        if (isCrx) {
          window.open('https://www.1688.com/')
        } else {
          $scope.isCJPub = true;
        }
      };
      $scope.goToTaobao = () => {
        $scope.addStatisFun(9);
        if (isCrx) {
         window.open('https://www.taobao.com/')
        } else {
          $scope.isCJPub = true;
        }
      };
      $scope.goToAliExpress = () => {
        $scope.addStatisFun(9);
        if (isCrx) {
          window.open('https://alitems.com/g/1e8d11449400282ca80416525dc3e8/');
        } else {
          $scope.isCJPub = true;
        }
      };
      $scope.goToShopify = () => {
        $scope.addStatisFun(9);
        if (isCrx) {
          window.open('https://www.shopify.com');
        } else {
          $scope.isCJPub = true;
        }
      }
      $scope.backCJ = () => {
        $scope.addStatisFun(9);
        $rootScope.isSwitch = false;
        $scope.backFlag = false;
        $scope.yaoliuFlag = true;
        $scope.taobaoFlag = true;
      };

      /* 菜单埋点 */
      $scope.addStatisFun = (type, ev) => {
        dsp.postFun('pojo/home/addStatisByType', {
          entryPage: type
        }, res => { console.log(res.data) })
      }

      $scope.Install = () => {
        $scope.isInstall = true;
        $scope.CJPubTitle = 'Refresh Page Required:';
        $scope.CJPubtxt =
          'If you had installed the extension, please click Refresh button.';
        window.open(
          'https://chrome.google.com/webstore/detail/cjdropshipping/mbndljkgaoailfnpeodnlejigmkdpokb?utm_source=chrome-ntp-icon'
        );
      };

      $scope.Cancel = () => {
        sessionStorage.removeItem('isInstallCJPub');
        $scope.isCJPub = false;
      };

      $scope.Refresh = () => {
        $scope.isCJPub = false;
        location.reload();
        sessionStorage.removeItem('isInstallCJPub');
      };
      // 刷新列表
      $scope.refresh = () =>{
        firstReq()
      }
      /* End */ 
    }
  ]);

  return module;
}