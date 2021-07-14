
(function (Base64) {
  var app = angular.module('calculationNew', ['service', 'home-service', 'cjCompnentModule', 'cjDirectiveModule', 'CommonHeaderCom', 'CommonFooterCom', 'custom-filter','cjDotModule']);
  // // 创建组件模块
  angular.module('cjCompnentModule', ['utils']);
  /*新版*/
  app.controller('calculationNewController', ['$scope', '$timeout', '$window', 'dsp', '$window', '$sce', '$rootScope', '$location', '$anchorScroll', 'utils', function ($scope, $timeout, $watch, dsp, $window, $sce, $rootScope, $location, $anchorScroll, utils) {

    const matchStart = (params, data) => {
      // If there are no search terms, return all of the data
      if ($.trim(params.term) === '') {
        return data;
      }

      // Do not display the item if there is no 'text' property
      if (typeof data.text === 'undefined') {
        return null;
      }

      // `params.term` should be the term that is used for searching
      // `data.text` is the text that is displayed for the data object
      if (data.text.toLowerCase().startsWith(params.term.toLowerCase())) {
        var modifiedData = $.extend({}, data, true);
        // You can return modified objects from here
        // This includes matching the `children` how you want in nested data sets
        return modifiedData;
      }

      // Return `null` if the term should not be displayed
      return null;
    }

    $('.init_select2').select2({
      matcher: matchStart
    });
    $scope.paramsData = {// 渲染基本信息
      platFormList:[],// 平台信息
      shipmentList:[],// 发货地及区域
      destinationList:[],// 收件地及区域
      propetiesList:[],// 商品属性
      logisticsList:[]// 物流方式
    }

    var API = {
      getBaseInfo:'freight/logistics/getFreightStepOne',// 获取基本信息
      calcuFreight:'freight/logistics/getFreightNew',// 计算运费
    }

    var initBaseInfo = true // 是否第一次取基础值
    function getBaseInfo(fn){// 物流运费试算基础信息接口
      var params = {}
      if(!initBaseInfo){
        params.area = $scope.sendParams.shopType == 'Shopee' ? $scope.platformCountryItem && $scope.platformCountryItem.nameEn != 'International' ?
        $scope.platformCountryItem.code : $scope.sendParams.area : $scope.sendParams.area != '' ? $scope.sendParams.area : undefined
        params.shopType = $scope.sendParams.shopType != ''?$scope.sendParams.shopType:undefined
      }
        const msgLoading = cjMessage.loading({ isFixed: true })
      dsp.postFun(API.getBaseInfo, JSON.stringify(params), function (data) {
        msgLoading.hide();
        if(data.data.code == '200'){
          var result = data.data.data
          var _propetiesList = result.propetiesList
          for(var i=0;i<_propetiesList.length;i++){
            _propetiesList[i].checked = false
          }
          result.propetiesList = _propetiesList
          console.log(result)
          $scope.paramsData = result
          $scope.sendParams = Object.assign($scope.sendParams,{country:'',enName:''})
          initBaseInfo = false
          fn && fn(result)
        }
      },function() {
        msgLoading.hide()
    })
    }
    getBaseInfo()

    var intiSendParams = {// 试算接口参数
      shopType:'',
      country:'',// 收件地 必填
      country_region:'',
      weight:0,// 重量 必填
      zip:'',
      enName:'',
      character:'',//属性 必填
      area:'', // 发货地 必填
      area_region:'',
      length:0,
      width:0,
      height:0
    }

    function clone(item) {
      if (item instanceof Array) {
        const arr = [];
        for (let i = 0; i < item.length; i++) {
          arr[i] = clone(item[i]);
        }
        return arr;
      } else if (item instanceof Object) {
        const obj = {};
        for (let i in item) {
          obj[i] = clone(item[i]);
        }
        return obj;
      } else {
        return item;
      }
    }

    $scope.selectedAreaRegionList = [] // 对应发货国家的地区列表
    $scope.selectedCountryRegionList = [] // 对应收货国家的地区列表
    $scope.sendParams = clone(intiSendParams)
    $scope.resultList = []// 运费试算返回列表
    $scope.calcFreight = function(){// 运费试算
      updateCharacter()
      var hasEmpty = checkEmpty()
      if(hasEmpty!='') return layer.msg(hasEmpty)
      var params = clone($scope.sendParams)
      params.area = $scope.sendParams.shopType == 'Shopee' ? $scope.platformCountryItem && $scope.platformCountryItem.nameEn != 'International' ?
      $scope.platformCountryItem.code : $scope.sendParams.area : $scope.sendParams.area != '' ? $scope.sendParams.area : undefined
      params.shopType = $scope.sendParams.shopType != '' ? $scope.sendParams.shopType : undefined
      params.isOld = false // 走的新运费试算标识
      // return console.log(params)
      trackingTrigger(params)
      layer.load(2)
      dsp.postFun(API.calcuFreight,JSON.stringify(params),function(data){
        layer.closeAll('loading')
        console.log(data)
        var result = data.data
        if(result.code==null || result.code == '200'){
          $scope.resultList = result.data
        }else{
          $scope.resultList = []
          layer.msg(result.msg)
        }
      })
    }
    /** 埋点 */
    function trackingTrigger(params) {
      for (const key in params) {
        switch (key) {
          case "area":
            trackingPush('002', 'shipped_from_click', {filedName: "shippedFrom", fieldValue: params[key]})
            break
          case "character":
            trackingPush('005', 'Attribute_click', {filedName: "attribute", fieldValue: params[key]})
            break
          case "country":
            trackingPush('003', 'Destination_Country_click', {filedName: "destinationCountry", fieldValue: params[key]})
            break
          case "enName":
            trackingPush('011', 'Shipping_Metho_click', {filedName: "shippingMethod",  fieldValue: params[key]})
            break
          case "height":
            trackingPush('010', 'height_print', {filedName: "height",  fieldValue: params[key]})
            break
          case "length":
            trackingPush('008', 'length_print', {filedName: "length", fieldValue: params[key]})
            break
          case "shopType":
            trackingPush('001', 'platform_select_click', {filedName: "platformSelect", fieldValue: params[key]})
            break
          case "weight":
            trackingPush('007', 'Weight_print', {filedName: "weight", fieldValue: params[key]})
            break
          case "width":
            trackingPush('009', 'width_print', {filedName: "width", fieldValue: params[key]})
            break
          case "zip":
            trackingPush('004', 'Postcode_print', {filedName: "postcode", fieldValue: params[key]})
            break
        }
      }
    }

    function trackingPush(elementId, actionType, attr) {
      const trackingData = {
        elementId: elementId,
        actionType: actionType,
        list: [
          attr
        ]
      }
      $global_tracking.pushData(trackingData)
    }
    
    $scope.platformCountryList = [];
    function getPlatformCountry(successCallback) {
      dsp.postFun('freight/logistics/getPlatformCountry', {
        platForm: $scope.sendParams.shopType
      }, function (data) {
        // layer.closeAll('loading')
        if (data.data.code == '200') {
          successCallback(data.data.data);

        }
      })
    }

    $scope.shopTypeChange = function(){
      console.log($scope.sendParams.shopType);
      if ($scope.sendParams.shopType === 'Shopee') {
        getPlatformCountry(function (data) {
          $scope.platformCountryList = data;
          $scope.platformCountryList.push({
            code: "",
            nameCn: "国际站",
            nameEn: "International"
          })
          console.log($scope.platformCountryList);
          // if ($scope.platformCountryList.length > 0) {
          //   $scope.platformCountryItem = $scope.platformCountryList[0];
          // } else {
          //   $scope.platformCountryItem = null;
          // }
        })
      }
      getBaseInfo()
    }

    $scope.areaChange = function(){// 发货国家更改
      getBaseInfo(function(){
        $scope.sendParams.country = $scope.paramsData.destinationList[0].shortCode
        $scope.selectedCountryRegionList = $scope.paramsData.destinationList[0].regions
        var _shipmentList = $scope.paramsData.shipmentList
        for(var i=0;i<_shipmentList.length;i++){
          if($scope.sendParams.area==_shipmentList[i].shortCode){
            $scope.selectedAreaRegionList = _shipmentList[i].regions || []
            break;
          }
        }
      })
    }

    $scope.conuntryChange = function(){// 收件国家更改
      var _destinationList = $scope.paramsData.destinationList
      for(var i=0;i<_destinationList.length;i++){
        if($scope.sendParams.country==_destinationList[i].shortCode){
          $scope.selectedCountryRegionList = _destinationList[i].regions || []
          break;
        }
      }
    }

    $scope.$watch('selectedCountryRegionList',function(){
      console.log('selectedCountryRegionList',$scope.selectedCountryRegionList)
    })

    var updateCharacter = function(){// 更改character参数
      var _propetiesList = $scope.paramsData.propetiesList
      var result = ''
      for(var i=0;i<_propetiesList.length;i++){
        if(_propetiesList[i].checked==true){
          var dh = result!=''?',':''
          result+=dh+_propetiesList[i].key
        }
      }
      $scope.sendParams.character = result
    }

    var checkEmpty = function(){// 校验
      if (!$scope.sendParams.area && (!$scope.platformCountryItem || !$scope.platformCountryItem.code)) return 'Shipped From required'
      if(!$scope.sendParams.country) return 'Destination Country required'
      if(!$scope.sendParams.character) return 'Attribule required'
      if(!$scope.sendParams.weight) return 'Weight required'
      // if($scope.sendParams.country==$scope.sendParams.area){ 
      //   if($scope.selectedAreaRegionList.length<=0 || $scope.selectedCountryRegionList<=0) return 'The original area and destination should be different.'
      //   if(!$scope.sendParams.area_region) return 'area region required'
      //   if(!$scope.sendParams.country_region) return 'country region required'
      //   if($scope.sendParams.area_region == $scope.sendParams.country_region) return 'The shipping country and destinate country should be different.'
      // }
      return ''
    }

  }]);
})(Base64)
