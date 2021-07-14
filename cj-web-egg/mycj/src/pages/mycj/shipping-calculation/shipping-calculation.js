export function shippingCalculationFactory(angular) {
  const app = angular.module('shipping-calculation.module', ['service']);
  //执行完毕执行
  app.directive('repeatFinish', function () {
    return {
      link: function (scope, element, attr) {
        if (scope.$last == true) {
          scope.$eval(attr.repeatFinish);
        }
      }
    }
  });
  // 1.运费试算工具
  app.controller('shipping-calculation.ctrl', ['$scope', 'dsp',
    function ($scope, dsp) {
      return location.href = '/calculation.html' // 跳转到新的运费试算
      console.log("shipping-calculation.ctrl")
      if (dsp.isPhone()) {
        var jsonArgs = dsp.href2json(window.location.href);

        jsonArgs.page = 'shipping-cost-calculation';
        dsp.skipToMobile(jsonArgs);

        return;
      }
      var upcsData = {};
      upcsData.country = "CN";
      dsp.postFun2("getNewModel.json", JSON.stringify(upcsData), function (data) {
        console.log(data);
        if (data.status == 200) {
          var obj = data.data;
          $scope.logistics = obj;
          $scope.logisticsMode = "";
        }
      }, function (data) {
        //          alert("物流信息获取失败");
      })
      console.log($(window).height() * 1)
      console.log($(window).height() * 1 - 180)
      $('.ea-right-content').css('min-height', $(window).height() * 1 - 180 + 'px')
      //根据物流方式筛选能到的国家
      $scope.isallFlag = true;
      $scope.logisticsMode1 = function (logisticsMode) {
        console.log(logisticsMode)
        console.log($scope.exportingCountry)
        if ($scope.exportingCountry == '美国' || $scope.exportingCountry == '泰国') {
          if (logisticsMode == '') {
            $scope.isallFlag = true;
          } else {
            $scope.isallFlag = false;
          }
          if ($scope.isallFlag) {
            //获取目的国家
            var usUpdata = {}
            if ($scope.exportingCountry == '美国') {
              usUpdata.country = "US";
            } else if ($scope.exportingCountry == '泰国') {
              usUpdata.country = "TH";
            }
            dsp.postFun("app/logistic/getCountryByAll", JSON.stringify(usUpdata), function (data) {
              console.log(data.data);
              if (data.status == 200) {
                var obj = JSON.parse(data.data.result);
                console.log(obj.countryList);
                $scope.nation = obj.countryList;
                if ($scope.exportingCountry == '美国') {
                  $scope.countryDestination = "US";
                } else if ($scope.exportingCountry == '泰国') {
                  $scope.countryDestination = "TH";
                }
              }
            }, function (data) {
              layer.msg("国家信息获取失败")
            })
          } else {
            var upData = {};
            upData.loginsticName = logisticsMode;
            if ($scope.exportingCountry == '美国') {
              upData.country = "US";
            } else if ($scope.exportingCountry == '泰国') {
              upData.country = "TH";
            }
            console.log(JSON.stringify(upData))
            dsp.postFun2('lc/erplogistics/getLogisticCountry', JSON.stringify(upData), function (data) {
              // console.log(data)
              console.log(data.data)
              $scope.filterCountry = data.data;
              console.log($scope.filterCountry)
              // $scope.countryDestination = "US";
              for (var i = 0; i < $scope.filterCountry.length; i++) {
                if ($scope.filterCountry[i].country == "US") {
                  $scope.countryDestination = "US";
                  break;
                } else {
                  $scope.countryDestination = $scope.filterCountry[0].country;
                }
              }
            }, function (data) {
              console.log(data)
            })
          }
        } else {
          if (logisticsMode == '') {
            $scope.isallFlag = true;
          } else {
            $scope.isallFlag = false;
          }
          if ($scope.isallFlag) {
            //获取目的国家
            dsp.postFun("app/logistic/getcountry", null, function (data) {
              console.log(data.data);
              //          console.log(data.data.result);
              if (data.status == 200) {
                var obj = JSON.parse(data.data.result);
                console.log(obj.countryList);
                $scope.nation = obj.countryList;
                // $scope.countryDestination = "US";
                if ($scope.exportingCountry == '美国') {
                  $scope.countryDestination = "US";
                } else if ($scope.exportingCountry == '泰国') {
                  $scope.countryDestination = "TH";
                }
              }
            }, function (data) {
              layer.msg("国家信息获取失败")
            })
          } else {
            var upData = {};
            upData.loginsticName = logisticsMode;
            upData.country = 'CN';
            console.log(JSON.stringify(upData))
            dsp.postFun2('lc/erplogistics/getLogisticCountry', JSON.stringify(upData), function (data) {
              // console.log(data)
              console.log(data.data)
              $scope.filterCountry = data.data;
              console.log($scope.filterCountry)
              // $scope.countryDestination = "US";
              for (var i = 0; i < $scope.filterCountry.length; i++) {
                if ($scope.filterCountry[i].country == "US") {
                  $scope.countryDestination = "US";
                  break;
                } else {
                  $scope.countryDestination = $scope.filterCountry[0].country;
                }
              }
            }, function (data) {
              console.log(data)
            })
          }
        }
      }
      //筛选国家
      $scope.exportingCountry = '中国';
      $scope.cnorusCode = 'CN';
      $scope.exportingCountry1 = function (exportingCountry) {
        $scope.isallFlag = true;
        console.log(exportingCountry)
        console.log($scope.exportingCountry)
        var upcsData = {};
        if ($scope.exportingCountry == '中国') {
          $scope.cnorusCode = 'CN';
          upcsData.country = "CN";
          dsp.postFun2("getNewModel.json", JSON.stringify(upcsData), function (data) {
            console.log(data);
            if (data.status == 200) {
              var obj = data.data;
              $scope.logistics = obj;
              $scope.logisticsMode = "";
            }
          }, function (data) {
            console.log('获取物流失败')
          })

          dsp.postFun("app/logistic/getcountry", null, function (data) {
            console.log(data.data);
            //          console.log(data.data.result);
            console.log($scope.isallFlag)
            if (data.status == 200) {
              var obj = JSON.parse(data.data.result);
              console.log(obj.countryList);
              $scope.nation = obj.countryList;
              $scope.countryDestination = "US";
            }
          }, function (data) {
            console.log("国家信息获取失败")
          })
        } else {
          if ($scope.exportingCountry == '美国') {
            $scope.cnorusCode = 'US';
            upcsData.country = "US";
          } else if ($scope.exportingCountry == '泰国') {
            $scope.cnorusCode = 'TH';
            upcsData.country = "TH";
          }
          dsp.postFun2("getNewModel.json", JSON.stringify(upcsData), function (data) {
            console.log(data);
            if (data.status == 200) {
              var obj = data.data;
              $scope.logistics = obj;
              $scope.logisticsMode = "";
            }
          }, function (data) {
            console.log('获取物流失败')
          })

          var usUpdata = {}
          // usUpdata.country = "US";
          if ($scope.exportingCountry == '美国') {
            usUpdata.country = 'US';
          } else if ($scope.exportingCountry == '泰国') {
            usUpdata.country = 'TH';
          }
          dsp.postFun("app/logistic/getCountryByAll", JSON.stringify(usUpdata), function (data) {
            console.log(data.data);
            console.log($scope.isallFlag)
            if (data.status == 200) {
              var obj = JSON.parse(data.data.result);
              console.log(obj.countryList);
              $scope.nation = obj.countryList;
              if ($scope.exportingCountry == '美国') {
                $scope.countryDestination = "US";
              } else if ($scope.exportingCountry == '泰国') {
                $scope.countryDestination = 'TH';
              }
            }
          }, function (data) {
            layer.msg("国家信息获取失败")
          })
        }
      }

      //获取目的国家
      dsp.postFun("app/logistic/getcountry", null, function (data) {
        console.log(data.data);
        if (data.status == 200) {
          var obj = JSON.parse(data.data.result);
          console.log(obj.countryList);
          $scope.nation = obj.countryList;
          $scope.countryDestination = "US";
        }
      }, function (data) {
        console.log("国家信息获取失败")
        //alert("国家信息获取失败")
      })

      $scope.countryDestination1 = function () {
        console.log($scope.countryDestination);
      }
      //获取属性的东西
      var chactBoc = [];
      $scope.getPropertyInfo = function (ev) {
        var checked = $(ev.target).prop('checked');
        if (checked == true) {
          chactBoc.push($(ev.target).val());
        }
        if (checked == false) {
          for (var i = 0; i < chactBoc.length; i++) {
            if (chactBoc[i] == $(ev.target).val()) {
              chactBoc.splice(i, 1)
            }
          }
        }
      }
      //设置input框的值
      $scope.weightNum1 = function () {
        console.log($scope.weightNum);
        if ($scope.weightNum <= 0) {
          $scope.weightNum = 0;
        }
      }

      //点击计算
      $scope.countBtn = function () {
        console.log(chactBoc.length);
        console.log($scope.weightNum)
        var chactBocloda = chactBoc.join(",");
        if (!(chactBoc.length == 0) && $scope.weightNum) {
          if ($scope.pLength || $scope.pWidth || $scope.pHeight) {
            $scope.countResult = [];
            if (!$scope.pLength || $scope.pLength < 0) {
              layer.msg('Please enter length')
              return;
            }
            if (!$scope.pWidth || $scope.pWidth < 0) {
              layer.msg('Please enter width')
              return;
            }
            if (!$scope.pHeight || $scope.pHeight < 0) {
              layer.msg('Please enter height')
              return;
            }
            dsp.loadPercent($('.table-con-box-div'), $('.table-con-box-div').height(), 0, 0)
            dsp.postFun2("lc/erplogistics/getFreight", {
              "country": $scope.countryDestination,
              "weight": $scope.weightNum,
              "enName": $scope.logisticsMode,
              "character": chactBocloda,
              "area": $scope.cnorusCode,
              "length": $scope.pLength,
              "width": $scope.pWidth,
              "height": $scope.pHeight
            }, function (data) {
              console.log(data);
              dsp.closeLoadPercent($('.table-con-box-div'))
              if (data.status == 200) {
                if (data.data.length == 1 && data.data[0].code == '401') {
                  dsp.addNodataPic($('.table-con-box-div'), $('.table-con-box-div').height(), 0, -1)
                  $scope.countResult = [];
                  //该国家无法到达或者货物受限
                  layer.msg("Weight excessed or country unreachable");
                } else {
                  dsp.removeNodataPic($('.table-con-box-div'))
                  // $scope.countResult = data.data;
                  if ($scope.exportingCountry == '中国') {
                    for (var i = 0, len = data.data.length; i < len; i++) {
                      if (data.data[i].logisticName == 'USPS+') {
                        data.data.splice(i, 1)
                        break
                      }
                    }
                    $scope.countResult = data.data;
                  } else {
                    $scope.countResult = data.data;
                  }
                }
              }
            }, function (data) {
              layer.msg("Data Analysis Failed");
              dsp.closeLoadPercent($('.table-con-box-div'))
            })
          } else {
            dsp.loadPercent($('.table-con-box-div'), $('.table-con-box-div').height(), 0, 0)
            dsp.postFun2("lc/erplogistics/getFreight", {
              "country": $scope.countryDestination,
              "weight": $scope.weightNum,
              "enName": $scope.logisticsMode,
              "character": chactBocloda,
              "area": $scope.cnorusCode
            }, function (data) {
              console.log(data);
              console.log(data.status == 200)
              if (data.status == 200) {
                console.log($scope.exportingCountry)
                if (data.data.length == 1 && data.data[0].code == '401') {
                  $scope.countResult = [];
                  dsp.addNodataPic($('.table-con-box-div'), $('.table-con-box-div').height(), 0, -1)
                  //该国家无法到达或者货物受限
                  layer.msg("Weight excessed or country unreachable");
                } else {
                  dsp.removeNodataPic($('.table-con-box-div'))
                  // $scope.countResult = data.data;
                  if ($scope.exportingCountry == '中国') {
                    for (var i = 0, len = data.data.length; i < len; i++) {
                      if (data.data[i].logisticName == 'USPS+') {
                        data.data.splice(i, 1)
                        break
                      }
                    }
                    $scope.countResult = data.data;
                  } else {
                    $scope.countResult = data.data;
                  }
                  console.log($scope.exportingCountry)
                }
              }
              dsp.closeLoadPercent($('.table-con-box-div'))
            }, function (data) {
              dsp.closeLoadPercent($('.table-con-box-div'))
              layer.msg("Data Analysis Failed");
            })
          }

        }
        else if (!$scope.weightNum && chactBoc.length == 0) {
          //请填写重量和选择属性
          layer.msg("Please select Attribute and Input weight!");
        }
        else if (!$scope.weightNum) {
          //请填写重量
          layer.msg("Please Inpute Weight");
        }
        else if (chactBoc.length == 0) {
          //请选择属性
          layer.msg("Please select products attribute");
        }

      }
      //默认展示
      $scope.usps = false;
      $scope.zgyz = false;
      $scope.yyb = true;
      $scope.aa = function () {
        $(".wllDh-logili").eq(0).addClass("activewll");
      }
      //物流方式的详细情况
      var mapObj = {};
      $scope.logisticsDetails = function (item, ev) {
        //      	console.log(item);
        $(".wllDh-logili").removeClass("activewll");
        $(ev.target).addClass("activewll");
        if (item.enName == "USPS") {
          $scope.usps = true;
          $scope.zgyz = false;
          $scope.yyb = false;
        } else if (item.enName == "China Post Registered Air Mail") {
          $scope.usps = false;
          $scope.zgyz = true;
          $scope.yyb = false;
        } else {
          $scope.usps = false;
          $scope.zgyz = false;
          $scope.yyb = true;
        }
        dsp.postFun2("getLogistic.json", { "enName": item.enName }, function (data) {
          console.log(data);
          if (data.status == 200) {
            $scope.logisticsCulars = data.data;
          }
        }, function (data) {
          //查询失败
          layer.msg("Data Analysis Failed");
        })

      }

    }]);

  return app;

}