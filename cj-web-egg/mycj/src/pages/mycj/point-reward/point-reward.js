export function pointRewardFactory(angular) {
  const app = angular.module('point-reward.module', []);

  app.controller('point-reward.ctrl', ['$scope', '$filter', 'dsp', '$rootScope',function ($scope, $filter, dsp, $rootScope) {
    const { vip } = $rootScope.userInfo;
    $scope.isVip = vip;

    function getList() {
      $.get('./static/js/myCJ/points-mall/service-list.json', function (data) {
        console.log(data)
        $scope.serviceList = data;
        $scope.$apply()
        getPoints()
      })
    }
    getList()

    var now = new Date().getTime();
    $scope.hangbanTime = $filter('date')(now, 'yyyy-MM-dd HH:mm:ss');

    function getPoints() {
      $.get('./static/js/myCJ/points-mall/points.json', function (data) {
        console.log(data)
        $scope.pointsJson = data;
        $scope.$apply()
        getCurrPoint()
      })
    }

    function resetServiceList() {
      $scope.serviceList.forEach(ele => {
        ele.checked = false;
        ele.variants.forEach(variantsItem => {
          variantsItem.options.forEach(optionsItem => {
            optionsItem.checked = false;
          })
        })
      })
    }

    function getCurrPoint() {
      $scope.serviceList.forEach(ele => {
        var curr = $scope.pointsJson[ele.toback]
        var point = 1;
        var checkednum = 0;
        var checkedoptions = [];
        ele.variants.forEach(ele => {
          var newArr = ele.options.filter(item => {
            return item.checked == 1
          })
          // console.log(newArr)
          if (newArr.length > 0) {
            checkedoptions.push(newArr[0])
            point = point * curr[newArr[0].value]
            checkednum++;
          } else {
            point = 0;
          }
        })
        if (checkednum == ele.variants.length) {
          ele.currPoint = point;
          ele.checked = true;
          ele.checkedoptions = checkedoptions;
        } else {
          ele.currPoint = 0;
          ele.checked = false;
        }
      })
      console.log($scope.serviceList)
    }

    $scope.checkService = function (item) {
      if (item.checked) {
        item.variants.forEach(ele => {
          ele.options.forEach(ele => {
            ele.checked = false;
          })
          ele.options[0].checked = true;
        })
        getCurrPoint()
      } else {
        item.variants.forEach(ele => {
          ele.options.forEach(ele => {
            ele.checked = false;
          })
        })
      }
    }
    $scope.checkoption = function (item, itemv, itemo) {
      itemv.options.forEach(element => {
        element.checked = 0;
      });
      itemo.checked = 1;
      getCurrPoint()
    }

    $scope.total = function () {
      var total = 0

      $scope.previewList && $scope.previewList.forEach(ele => {
        total += ele.point;
      })
      return total
    }

    function getCheckList() {
      $scope.previewList = []
      $scope.serviceList.forEach(ele => {
        // var curr = $scope.pointsJson[ele.toback]
        // var point = 1;
        if (ele.checked) {
          var checkedoptions = []
          ele.variants.forEach(elev => {
            var newArr = elev.options.filter(item => {
              return item.checked == 1
            })
            checkedoptions.push(newArr[0])
          })
          $scope.previewList.push({
            name: ele.name,
            titleen: ele.titleen,
            titlecn: ele.titlecn,
            toback: ele.toback,
            point: ele.currPoint,
            checkedoptions: checkedoptions
          })
        }
      });
      console.log($scope.previewList)
    }
    getPointAndOrder()

    // 获取积分/订单数据
    function getPointAndOrder() {
      dsp.postFun('cj/integralMall/getInitPageOrListPage', {}, function (data) {
        console.log(data);
        $scope.pointAndOrderInfo = data.data.result;
        $scope.pointAndOrderInfo && $scope.pointAndOrderInfo.flightList && $scope.pointAndOrderInfo.flightList.forEach(ele => {
          var total = 0
          ele.integralServer && ele.integralServer.forEach(ele => {
            total += ele.integral
          })
          ele.totalIntegral = total;
        })
        if ($scope.pointAndOrderInfo && $scope.pointAndOrderInfo.flightList && $scope.pointAndOrderInfo.flightList.length > 0 && $scope.pointAndOrderInfo.flightList[0].status != 4) {
          $scope.showlist = 1;
          $scope.pointAndOrderInfo.flightList[0].down = 1;
          // $scope.bookMore($scope.pointAndOrderInfo.flightList[0]);
        }
      })
    }
    //判断当前时间是否小于所选时间
    $scope.judgeDate = function (tomodifyDate) {
      return new Date().getTime() - new Date(tomodifyDate).getTime();
    }
    $scope.goReset = function () {
      resetServiceList();
    }
    $scope.submit = function () {
      getCheckList()
      if ($scope.bookMoreItem) {
        if (!$scope.hangbanTime) {
          layer.msg('Please input your flight time.');
          return;
        }
        //判断所选时间是否大于当前时间
        if ($scope.judgeDate($scope.hangbanTime) > 0) {
          layer.msg('The selected date must be greater than the date of today.');
          return;
        }
        if (!$scope.hangbanNum) {
          layer.msg('Please input your flight number.');
          return;
        }
        if ($scope.previewList.length > 0) {
          $scope.preview = true;
        } else {
          $scope.goSubmit()
        }
      } else {
        if ($scope.previewList.length == 0) {
          layer.msg('Please select the service to redeem.');
          return;
        }
        if (!$scope.hangbanTime) {
          layer.msg('Please input your flight time.');
          return;
        }
        //判断所选时间是否大于当前时间
        if ($scope.judgeDate($scope.hangbanTime) > 0) {
          layer.msg('The selected date must be greater than the date of today.');
          return;
        }

        if (!$scope.hangbanNum) {
          layer.msg('Please input your flight number.');
          return;
        }
        $scope.preview = true;
      }

    }

    $scope.goSubmit = function () {
      var submitData = {};
      submitData.flight_no = $scope.hangbanNum;
      submitData.remark = $scope.hangbanRemark;
      submitData.flight_time = $scope.hangbanTime;
      submitData.integralServiceList = [];
      $scope.previewList.forEach(ele => {
        var param = [];
        var servernames = []
        ele.checkedoptions.forEach(ele => {
          param.push(ele.value);
          servernames.push(ele.name)
        })
        submitData.integralServiceList.push({
          serverType: ele.toback,
          param: param,
          server_name_en: ele.titleen,
          server_name_cn: ele.titlecn,
          server_info: servernames.join(' / '),
          code: ele.name
        })
      })
      if ($scope.bookMoreItem) {
        submitData.batch_no = $scope.bookMoreItem.batch_no + '';
        submitData.flight_id = $scope.bookMoreItem.id + '';
      }
      layer.load(2, {shade:[0.3,'#000']})
      dsp.postFun('cj/integralMall/addService', JSON.stringify(submitData), function (data) {
        layer.closeAll('loading');
        console.log(data)
        if (data.data && data.data.statusCode == 401) {
          layer.msg('Submission failed. The available points are less than required.')
        }
        if (data.data && data.data.statusCode == 200) {
          layer.msg('Submit Success');
          getPointAndOrder()
          $scope.preview = false;
          resetServiceList()
        } else {
          layer.msg(data.data.message);
          // $scope.preview = false;
        }
      }, err)
    }

    $scope.zhedie = function (item) {
      item.down = !item.down;
    }
    $scope.bookMore = function (item) {
      $scope.bookMoreItem = item;
      $scope.hangbanTime = $filter('date')(item.flight_time.time, 'yyyy-MM-dd HH:mm:ss');
      $scope.hangbanNum = item.flight_no;
      $scope.hangbanRemark = item.remark;
      $scope.showlist = 0;
    }

    function err() {
      layer.closeAll('loading');
    }

    // { "TRAVEL": { "day4": 4, "day5": 5, "number3": 3, "day2": 2, "number4": 4, "day3": 3, "number1": 1, "number2": 2, "day1": 1, "number5": 5 }, "TRANSPORTATION": { "number3": 3000, "number4": 4000, "number1": 1000, "number2": 2000, "number5": 5000 }, "PROFESSIONALTRANSLATION": { "type5": 3000, "type4": 2000, "type3": 1000, "type2": 1000, "number3": 3, "number4": 4, "number1": 1, "number2": 2, "type1": 1000, "number5": 5 }, "HOTELACCOMMODATION": { "type5": 3000, "type4": 2000, "type3": 1000, "number3": 3, "number4": 4, "number1": 1, "number2": 2, "number5": 5, "day4": 4, "day5": 5, "day2": 2, "day3": 3, "day1": 1 }, "MEALS": { "number3": 3, "number4": 4, "number1": 1, "number2": 2, "number5": 5 }}
    // ）专车接送服务：接送次数（1次，2次，3次，5次）

    // 2）酒店住宿服务：酒店类型（三星级，四星级，五星级），房间数（1间房，2间房，3间房，4间房，5间房），入住天数（1天，2天，3天，4天，5天）

    // 3）专业翻译服务：翻译类型（中英翻译，中俄翻译，中日翻译，中韩翻译，中德翻译），翻译天数（1天，2天，3天，4天，5天）

    // 4）午晚餐服务：服务餐数（1餐次，2餐次，3餐次，4餐次，5餐次）

    // 5）旅游服务：旅游人数（1人，2人，3人，4人，5人），旅游天数（1天，2天，3天，4天，5天

  }]);

  return app;
}