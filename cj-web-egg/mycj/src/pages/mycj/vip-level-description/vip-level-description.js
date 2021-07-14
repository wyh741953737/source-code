export function vipLevelDescFactory(angular) {
  const app = angular.module('vip-level-desc.module', ['service']);
  app.controller('vip-level-desc.ctrl', ['$scope', '$rootScope', 'dsp', '$stateParams', 'utils',
    function($scope, $rootScope, dsp, $stateParams, utils) {
      const userId = $rootScope.userInfo.userId;
  
      //获取用户信息
      function getUserInfo() {
        layer.load(2);
        dsp.postFun('app/info/userinfo', { data: JSON.stringify({ userId }) }, function(res) {
          layer.closeAll('loading');
          if (res.data.statusCode === '200') {
            $scope.userData = JSON.parse(res.data.result)[0] || {};
            $scope.userData.img = $scope.userData.img === 'https://cc-west-usa.oss-us-west-1.aliyuncs.com/ba627238-87d7-41a9-86f1-960b4cc07ebf.png' ? '' : $scope.userData.img
            console.log($scope.userData);
            $scope.userLevel = $scope.userData.vip === 1 ? 'VIP' : $scope.userData.moneyLevel;
            $scope.growthVal = $scope.userData.moneyLevelScore || 0;
            calcGrowth();
          }
        }, function(err) {
          console.log('获取数据失败！');
        });
      }
  
      getUserInfo();
  
      // 计算进度
      function calcGrowth() {
        const growthLevelData = {
          1: 501,
          2: 2001,
          3: 100001,
          4: 2000001
        };
        const growthLevelWidthData = {
          1: 70,
          2: 195,
          3: 320,
          4: 445,
          5: 570,
          'VIP': 750,
        };
        $scope.totalVal = growthLevelData[$scope.userLevel];
        $scope.growthLevelWidth = growthLevelWidthData[$scope.userLevel]
        $scope.growthRate = $scope.totalVal !== undefined ? ($scope.growthVal / $scope.totalVal) * 100 : 100;
      }
  
      // vip 权益数据
      const arr = [
        {
          name: 'Daily Sourcing',
          icon: 'pages/mycj/vip-level-description/img/icon-1.svg'
        },
        {
          name: 'Inventory Pre-Stock',
          icon: 'pages/mycj/vip-level-description/img/icon-2.svg'
        },
        {
          name: 'Order Processing Priority',
          icon: 'pages/mycj/vip-level-description/img/icon-3.svg'
        },
        {
          name: 'Optimization Proposal',
          icon: 'pages/mycj/vip-level-description/img/icon-4.svg'
        },
        {
          name: 'COD Pre-Approved',
          icon: 'pages/mycj/vip-level-description/img/icon-5.svg'
        },
        {
          name: 'Dedicated Agent',
          icon: 'pages/mycj/vip-level-description/img/icon-6.svg'
        },
        {
          name: 'Luxury Dashboard Interface',
          icon: 'pages/mycj/vip-level-description/img/icon-7.svg'
        },
        {
          name: 'CJ Gift and Limited Edition Plate',
          icon: 'pages/mycj/vip-level-description/img/icon-8.svg'
        },
        {
          name: 'Potential Business Partnership',
          icon: 'pages/mycj/vip-level-description/img/icon-9.svg'
        }
      ];
      $scope.vipEquityData = arr.slice(0, 8);
  
      // 问题数据
      $scope.faqData = [
        {
          q: '1. How can I upgrade to the next level?',
          a: 'You can increase the level when your orders amount reaches the requirement.'
        },
        {
          q: '2. I have already placed so many orders and paid so much money, why the membership level doesn’t have any change?',
          a: 'The amount of disputed orders won’t be included in the cumulative amount.'
        },
        {
          q: '3. How can I upgrade to the next level in a faster way?',
          a: 'There’s only one solution to upgrade your membership level—place more orders to increase your sales.'
        },
        {
          q: '4. Why the level of the user registered on the same date is higher than me?',
          a: 'Because the user placed orders more than you did.'
        },
        {
          q: '5. How can I benefit from upgrading my level?',
          a: 'You can get more privileges, such as using overseas warehouse with less limits, more daily sourcing requests, order processing priority, dedicated agent and so on.'
        },
        {
          q: '6. How can I enjoy VIP privileges?',
          a: 'You can upgrade your level by placing more orders. When your order amount reaches the requirement, you will become the VIP.'
        },
        {
          q: '7. How can I be your VIP?',
          a: 'You need to keep long-term cooperation with us and contact your agent for application when you have regular orders.'
        }
      ];
  
      // 权益切换
      $scope.handleTargetPage = () => {
        $scope.targetPage = !$scope.targetPage;
        $scope.vipEquityData = $scope.targetPage ? arr.slice(8, 9) : arr.slice(0, 8);
      };
  
      // 问题答案
      $scope.handleTarget = item => item.isShow = !item.isShow;
  
    }]);
  return app;
}
