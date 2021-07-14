;
(function (angular) {
  angular.module('cjCompnentModule')
    .component('editFrame', {
      templateUrl: '/static/components/edit_frame/edit_frame.html',
      controller: ['$scope', 'dsp', 'utils', '$timeout', '$rootScope',
        function ($scope, dsp, utils, $timeout, $rootScope) {
          this.$onInit = function () {
            editFrameCtrl.call(this, $scope, dsp, utils, $timeout, $rootScope);
          }
        }],
      bindings: {
        data: '<', // 传出初始化数据
        onClose: '&', // 关闭弹窗
      },
    })
    .directive("repeatFinish", function() {
      return {
        link: function($scope, element, attr) {
          if(!$scope.$last) return
          const type = attr.repeatFinish
          if(type == "checkLogistic") {
            // 检查物流是否渲染完成
            $scope.checkship($scope.logisticList[0])
          }
        },
      };
    });

  function editFrameCtrl($scope, dsp, utils, $timeout, $rootScope) {
    let bs = new Base64();
    var _this = this;
    const userInfo = $rootScope.userInfo;
    $scope.vip = userInfo.vip;
    $scope.podProduct = JSON.parse(_this.data.podFlag);
    $scope.showPodProduct = false;
    var editor = new wangEditor('editor-edit');
    editor.config.menus = [
      // '|',     // '|' 是菜单组的分割线
      'fontsize',
      'bold',
      'italic',
      'underline',
      'alignleft',
      'aligncenter',
      'alignright',
      'forecolor',
      'link',
    ];
    let attributesList = []; // 属性集合

    editor.config.lang = wangEditor.langs['en'];
    editor.create();

    $scope.listingLoading = false;

    /* imp-review 组件参数 */
    $scope.isImport = "1"
    $scope.starPool = {
      five: false,
      four: false,
      three: false,
      two: false,
      one: false,
    }
    $scope.showReviews = false
    const API = {
      commentsUrl: "platform-product/comment/countCrawlerComment", // 查看该商品是否有评论
    }
    // 获取评价的统计接口，没有值则不展示评论
    function getCanReviews() {
      const url = API.commentsUrl
      const id = $scope.productId
      $scope.showReviews = false
      dsp.getFun(`${url}?productId=${id}`, (res) => {
        const { data } = res
        if (data.code == 200) {
          if (data.data) {
            $scope.showReviews = true
          }
        }
      }, (err) => {

      })
    }

    /* 获取评论 */
    function getComments() {
      const starList = $scope.starPool
      const paramList = []
      !starList.five || paramList.push(5)
      !starList.four || paramList.push(4)
      !starList.three || paramList.push(3)
      !starList.two || paramList.push(2)
      !starList.one || paramList.push(1)

      if ($scope.isImport === "0") {
        if (paramList.length > 0) {
          return paramList
        }
      }
      return null
    }


    /* End */

    // Lazada刊登选择属性值重复校验
    $scope.handleSizeChange = (item, name, index) => {
      if(attributesList[index]) {
        attributesList[index][name] = item[name];
      } else {
          attributesList[index] = {};
          attributesList[index][name] = item[name];
      }
      for(let i = 0; i < attributesList.length; i++) {
        if(i != index && attributesList[i] && JSON.stringify(attributesList[i]) == JSON.stringify(attributesList[index])) {
            layer.msg('Repeated attributes selected. Please try again.');
            $scope.listArr[index][name] = null;
            attributesList[index][name] = '';
            return false;
        }
          
      }
      // if (name == 'basic_size') {
      //   const list = $scope.listArr;
      //   for (let i = 0; i < list.length; i++) {
      //     if (i != index && item[name] && list[i][name] == item[name]) {
      //       layer.msg('Repeated attributes selected. Please try again.');
      //       $scope.listArr[index][name] = null;
      //       return false;
      //     }
      //   }
      // }
    }

    /* ebay站点 start */
    $scope.ebayCountryList = [] // 站点列表
    $scope.ebayCountry = "" // 选择的站点

    $scope.ebayCurrencyList = []  // ebay货币列表
    $scope.ebayCurrency = ""  // 选择的货币 

    $scope.ebayShipList = [] // ebay物流列表
    $scope.ebayShip = ""  // 选择的ebay物流 { serviceType:string, shippingDescription:string, shippingService: string}

    $scope.platform = "EBAY"
    $scope.isVip = $rootScope.userInfo.vip

    //显示Shipping Methods on eBay下拉框
    $scope.showOtherSelect = false
    /* 全局方法 */
    $scope.selectEbayCountry = selectEbayCountry

    function getEbayCountry() {
      if (!$scope.store) return
      $scope.othersParam.paypalAccount = $scope.store.email
      const shopId = $scope.store.ID
      const msgLoading = cjMessage.loading({ isFixed: true });
      dsp.getFun(`platform-shop/country/queryCountryList?platform=${$scope.platform}&shopId=${shopId}`, function (res) {
        msgLoading.hide();
        const data = res.data;
        if (data.code === 200) {
          $scope.ebayCountryList = data.data
          getEbayDefaultCountry(data.data)
        } else {
          layer.msg('The server is busy now. Please try it later. ');
        }
      }, function () {
        msgLoading.hide();
        layer.msg('The server is busy now. Please try it later. ');
      });
    }

    // 点击跳转教程
    $scope.handleUnderstand = () => {
      const tempWindow = window.open('_blank');
      tempWindow.location = '/article-details/1387383798114684928';
    }

    /* 
      获取ebay站点默认值以及默认货币列表 站点接口列表参数数据结构:
      {
        countryCode,  string 国家码
        countryName,  string 国家名称
        registeredCountry,  boolean 是否是默认值 true
        currencyList:[
          {
            currencyCode, // 货币码
            currencySymbol, // 货币符号
          }
        ]
      }
    */
    function getEbayDefaultCountry(ebayCountryList) {
      const list = ebayCountryList
      let defaultCountry = list[0].countryCode
      list.map((item) => {
        if (item.registeredCountry) {
          defaultCountry = item.countryCode
        }
      })
      $scope.ebayCountry = defaultCountry
      selectEbayCountry(defaultCountry)
    }

    /* 选择站点事件 */
    function selectEbayCountry(ebayCountry) {
      clearEbayError()
      // init
      $scope.ebayCurrencyList = []
      $scope.ebayCurrency = ""
      $scope.ebayShipList = []
      $scope.ebayShip = ""
      $scope.ebayMenus = $scope.ebayMenus.slice(0, 1);
      getEbayCurrency(ebayCountry)
      getShipLimit(ebayCountry)
      getEbayType();
    }

    /* 获取币种 */
    function getEbayCurrency(ebayCountry) {
      let list = []
      $scope.ebayCountryList.map((item) => {
        if (item.countryCode === ebayCountry) {
          list = item.currencyList
        }
      })
      $scope.ebayCurrencyList = list
      $scope.ebayCurrency = list[0].currencyCode
    }

    /* 获取ebay的物流 */
    function getShipLimit(ebayCountry) {
      if (!$scope.store) {
        return
      }
      const shopId = $scope.store.ID
      const siteCode = ebayCountry
      const msgLoading = cjMessage.loading({ isFixed: true });
      dsp.getFun(`platform-shop/logistics/queryLogisticsList?platform=${$scope.platform}&shopId=${shopId}&siteCode=${siteCode}`, function (res) {
        msgLoading.hide();
        const data = res.data;
        $scope.siteData = data.data
        if (data.code === 200) {
          $scope.ebayShipList = data.data
          handleShipList()
        } else {
          layer.msg('The server is busy now. Please try it later. ');
        }
      }, function () {
        msgLoading.hide();
        layer.msg('The server is busy now. Please try it later. ');
      });
    }

    // 处理shipList参数
    function handleShipList() {
      let newlist = $scope.ebayShipList.map((item) => {
        item.showName = `${item.serviceType}:${item.shippingService}`
        return item
      })
      $scope.ebayShipList = newlist
    }

    /** 获取ebay店铺类目 */
    function getEbayType(categoryID, i = -1) {
      const countryCode = $scope.ebayCountry || ""
      const msgLoading = cjMessage.loading({ isFixed: true });
      const url = `platform-product/category/getChildCategoryList?categoryId=${categoryID ? categoryID : '0'}&countryCode=${countryCode}&platform=${$scope.platform}`
      dsp.getFun(url, res => {
        msgLoading.hide();
        const { data } = res;
        if (data.code == "200") {
          $scope.ebayMenus[i + 1] = data.data;
        }
      }, function (err) {
        msgLoading.hide();
      }, {
        layer2: true
      });
    }

    /** 获取ebay店铺upc信息 */
    function getEbayCodeRuquire(categoryID) {
      $scope.requiredCode = {};
      $scope.requiredCodeLen = 0;
      $scope.isVariant = ''
      const msgLoading = cjMessage.loading({ isFixed: true });
      const categoryId = categoryID || ""
      const shopId = $scope.store.ID || ""
      const siteCode = $scope.ebayCountry || ""
      const url = `platform-product/category/getCategoryFeatureList?categoryId=${categoryId}&shopId=${shopId}&siteCode=${siteCode}&platform=${$scope.platform}`
      dsp.getFun(url, res => {
        msgLoading.hide();
        const { data } = res;
        //5000是请求参数错误
        if (data.code == 5000) return
        if (data.data !== null) {
          if (data.data[0].upcEnabled === 'REQUIRED') {
            $scope.requiredCode.UPC = '';
          }
          if (data.data[0].eanEnabled === 'REQUIRED') {
            $scope.requiredCode.EAN = '';
          }
          if (data.data[0].isbnEnabled === 'REQUIRED') {
            $scope.requiredCode.ISBN = '';
          }
          $scope.isVariant = data.data[0].isVariant ? data.data[0].isVariant : ''
        }
        $scope.requiredCodeLen = Object.keys($scope.requiredCode).length;
        //传入requiredCodeLenkey到othersParam初始参数
        for (let key in $scope.requiredCode) {
          $scope.othersParam[key] = ''
        }
      }, function (err) {

      });
    }
    //eBay属性
    $scope.eBayAttr = []
    $scope.variationTrue = []
    /* 多级类目获取联动 ebay */
    $scope.changeEbayCategory = (cata) => {
      clearEbayError()
      const index = +cata.dataset.index;
      const cataInfo = JSON.parse(cata.value);
      if (cataInfo.leafCategory === false) {
        $scope.ebayMenus = $scope.ebayMenus.slice(0, index + 1);
        getEbayType(cataInfo.categoryId, index);
        $scope.categoryIsLast = false;
        $scope.ebayCategoryID = undefined
      } else {
        $scope.ebayMenus = $scope.ebayMenus.slice(0, index + 1);
        $scope.ebayCategoryID = cataInfo.categoryId;
        $scope.categoryIsLast = true;
        const categoryId = cataInfo.categoryId
        const shopId = $scope.store.ID || ""
        const siteCode = $scope.ebayCountry || ""
        const url = `platform-product/category/getCategorySpecificsList?categoryId=${categoryId}&platform=${$scope.platform}&shopId=${shopId}&siteCode=${siteCode}&productId=${$scope.productId}`
        dsp.getFun(url, function (res) {
          const { data } = res
          if(data.data.length == 0) {
            $scope.isVariant = false
          }
          //判断类目是否支持变体刊登
          if(!$scope.isVariant) {
            let cateSele = document.querySelectorAll('#cateSele')
            let end = cateSele.length - 1
            for( let i = 1; i < cateSele[end].length; i++) {
                let cateValue = JSONparse(cateSele[end][i].getAttribute("value")).categoryId
                if (cateValue == categoryId) {
                    cateSele[end][i].setAttribute('disabled', 'true')
                    cateSele[end][i].setAttribute('title', 'Variants cannot be listed in this category. Please choose another category.')
                    cateSele[end].appendChild(cateSele[end][i])
                    cateSele[end].value = ""
                    return layer.msg('Variants cannot be listed in this category. Please choose another category.')
                }
            }
          }
          if(data.code === 200) {
            let dataList = data.data;
            $scope.variationTrue = []
            $scope.variationFalse = []
            if (dataList.length > 0) {
              if (dataList[0].name == 'MPN') {
                $scope.specificslist = dataList
              } else {
                for (let i = 0; i < dataList.length; i++) {
                  if (dataList[i].variationSpecifics) {
                    //ebay变体your属性
                    if ($scope.isVariant) $scope.variationTrue.push(dataList[i])
                  } else {
                    //Others选项卡下面其他属性
                    $scope.variationFalse.push(dataList[i])
                  }
                }
                $scope.specificslist = $scope.variationFalse

                for (let i = 0; i < $scope.variationTrue.length; i++) {
                  let eBayAttrObj = {
                    name: $scope.variationTrue[i].name,
                    values: []
                  }
                  $scope.eBayAttr.push(eBayAttrObj)
                }
                //ebay变体your属性名字对象集合
                $scope.variationTrueName = {}
                //需要传入varList的key
                $scope.variantsName = []
                //拿到有VOS返回值的Your属性
                $scope.isVosTure = []
                for (let i = 0; i < $scope.variationTrue.length; i++) {
                  $scope.variationTrueName[$scope.variationTrue[i].name] = i;
                  $scope.variantsName.push($scope.variationTrue[i].name)
                  if ($scope.variationTrue[i].variantSpecificsVOS.length > 0) {
                    $scope.isVosTure.push($scope.variationTrue[i])
                  }
                }
                ebayDefaultValue()
              }
              //传入$scope.specificslist属性名到othersParam初始参数
              for (let i = 0; i < $scope.specificslist.length; i++) {
                $scope.othersParam[$scope.specificslist[i].name] = ''
                $scope.validateObj[$scope.specificslist[i].name] = `Please fill in ${$scope.specificslist[i].name}`
              }
            }
          }
        })
        getEbayCodeRuquire($scope.ebayCategoryID)
      }
      $scope.ebayCategoryArrayID.splice(index, 6 - index, cataInfo.categoryId)
    }


    /* ebay站点 end */

    /* lazada全球站点选择 */
    $scope.lazadaStationList = []
    $scope.showLazadaStation = false
    $scope.publishedMethod = "ASC"

    $scope.selectPublishedMethod = () => {
      if ($scope.publishedMethod === 'GSP') {
        $scope.lazadaStationList = $scope.lazadaStationList.map((item) => {
          item.checked = true;
          return item
        })
        $scope.showLazadaStation = true
        $scope.lazadaCountry = 'my'
        getLazadaCategory(function (data) {
          assembleLazadaCate({ menus: data, type: 'init' })
        });
      } else {
        $scope.showLazadaStation = false
      }
    }


    // 初始化站点的选择信息
    function initStationState() {
      $scope.showLazadaStation = false
      $scope.publishedMethod = "ASC"
    }

    // 获取站点选择的列表
    function getLazadaStationList() {
      const url = `platform-shop/country/queryCountryList?platform=LAZADA`
      dsp.getFun(url, function (res) {
        const { data } = res
        if (data.code === 200) {
          $scope.lazadaStationList = data.data
        }
      })
    }
    getLazadaStationList()

    // 获取站点多选时的请求参数
    function getLazadaVenReq() {
      const countryList = []
      $scope.lazadaStationList.map((item) => {
        if (item.checked) {
          countryList.push(item.countryCode)
        }
      })
      return countryList.join(",")
    }

    /* lazada全球站点选择 END */

    var weights = [];
    var shipData, newLogistic, oriShipList;
    // var defaultCountry = { id: "US", name: "美国", nameEn: "United States of America (the)", phoneCode: "1" };
    // var defaultCountryChina = { id: "AF", name: "阿富汗", nameEn: "Afghanistan", phoneCode: "93" };

    // 显示弹框
    handleEditFrame.call(this, this.data); // 19-12-17 mod 笨组件模式
    function handleEditFrame(data) {

      $scope.currentModuleId = '999'
      $scope.moduleList = []
      $scope.defaultMerchName = '' // 默认模板商品名称
      $scope.defaultMerchDesc = '' // 默认模板商品详情

      $scope.tapitem = ''

      initState(); //初始化店铺数据
      // 父页面 '1'--wishlist（编辑后刊登）  '2'--waitlist（保存编辑刊登信息）
      $scope.parentPage = data.from;
      // 获取商品详情
      var url;
      if ($scope.parentPage == 'myCJ-favorites') {
        url = 'cj/locProduct/huoQuShangPinXiangQing'
      }
      $scope.productId = data.pid;
      dsp.postFun(url, {
        id: data.pid
      }, function (data) {
        let _NAMEEN = '',
          _DESCRIPTION = ''
        if ($scope.parentPage == 'myCJ-favorites') {
          let result = data.data.result
          $scope.commodityDetails = result || {};
          _NAMEEN = result.NAMEEN
          _DESCRIPTION = result.DESCRIPTION
          if ($scope.commodityDetails.PACKWEIGHT.indexOf("--")) {
            var index = $scope.commodityDetails.PACKWEIGHT.lastIndexOf("\-");
            $scope.commodityDetails.PACKWEIGHT = $scope.commodityDetails.PACKWEIGHT.substring(index + 1, $scope.commodityDetails.PACKWEIGHT.length);

          }
          $scope.commodityDetails.stanProducts.forEach((o) => {
            o.long = dsp.getStandard('long', o.STANDARD);
            o.width = dsp.getStandard('width', o.STANDARD);
            o.height = dsp.getStandard('height', o.STANDARD);
          })
        }
        // 反填信息-tax
        $scope.taxable = $scope.commodityDetails.listed_taxable == '1' ? true : false;
        // 反填信息-taps
        $scope.taps = $scope.commodityDetails.listed_tags ? $scope.commodityDetails.listed_tags : [];
        // $scope.commodityDetails = data.data.result || {};

        // 初始模板title 和 description
        $scope.defaultMerchName = _NAMEEN
        $scope.defaultMerchDesc = _DESCRIPTION


        getShopList();
        getModuleList($scope.productId);
      }, function (err) {

      }, {
        layer2: true,
        errorAlert: true,
        code200: true
      });
    }

    var lang = localStorage.getItem("language") || "en";
    if (lang != "en") {
      lang = lang.split("|")[1];
    }

    // 模板更换
    $scope.currentModuleId = '999'
    $scope.moduleList = []
    $scope.defaultMerchName = '' // 默认模板商品名称
    $scope.defaultMerchDesc = '' // 默认模板商品详情
    var getModuleList = function (id) { // 获取模板列表
      dsp.postFun('erp/loproductLanguage/getLocproductLanguage', {
        "productId": id
      }, function (res) {
        if (res.data.statusCode == '200') {
          let list = res.data.result;
          $scope.moduleList = list;

          if (lang == "en") return;
          for (let i = 0; i < list.length; i++) {
            // 
            if (lang.startsWith(list[i].language)) {
              $scope.currentModuleId = String(list[i].id);
              $scope.moduleOnchange();
              break;
            }
          }
        }
      })
    }

    $scope.moduleOnchange = function () { // module select onchange
      let moduleItem = {
        'id': '999'
      }
      $scope.moduleList.forEach(item => {
        if (item.id == $scope.currentModuleId) {
          moduleItem = item
        }
      })
      let item = {
        id: moduleItem.id,
        title: moduleItem.title,
        description: moduleItem.description
      }
      if (moduleItem.id == '999') {
        item.id = '999'
        item.title = $scope.defaultMerchName
        item.description = $scope.defaultMerchDesc
      }

      $scope.currentModuleId = String(item.id)
      $scope.commodityDetails.NAMEEN = item.title
      editor.$txt.html(item.description || "")
    }

    /**初始化店铺数据 start */
    function initState(shop) {
      // $scope.data = { current: "1" };
      // 货币初始化
      if ($scope.store && $scope.store.currencyCode) {
        $scope.CurrencyCode = $scope.store.currencyCode;
      } else {
        $scope.CurrencyCode = 'USD';
      }
      // 置空变体价格/货币符号/换算的汇率
      if ($scope.listArr) {
        $scope.listArr.forEach(e => {
          e.price = '';
          e.currencyUnit = '';
          e.rateConverted = '';
        });
      }
      // 置空批量修改价格
      $scope.bulkReviseValue = '';

      // POD商品暂时只支持刊登到shopify店铺
      if ($scope.podProduct && $scope.store && $scope.store.TYPE != 'shopify') {
        $scope.showPodProduct = true;
        $scope.store = null;
        return false;
      } else {
        $scope.showPodProduct = false;
      }

      if (/shopify/i.test(shop) || /Woocommerce/i.test(shop)) {
        $scope.categoryList = [];
        $scope.categoryType = 'select' || 'input';
        $scope.vendorType = 'select' || 'input';
      } else if (/ebay/i.test(shop)) {
        $scope.ebayMenus = [];
      } else if (/Woocommerce/i.test(shop)) {
      } else if (/api/i.test(shop)) {
      } else if (/amazon/i.test(shop)) {
      } else if (/lazada/i.test(shop)) {
        $scope.lazadaCountry = null;
        $scope.lzdCategoryId = null;
        $scope.lazadaCate = null;
        $scope.skuList = null;
        $scope.brandList = null;
        $scope.normalList = null;
      } else if (/shopee/i.test(shop)) {
        $scope.shopeCategoryId = null;
        $scope.shopeeMenus = null;
        $scope.requiredAttr = null;
        $scope.comboBoxAttr = null;
        $scope.textAttr = null;
      } else if (/(etsy|wix)/i.test(shop)) {
        // do etsy wix 初始化
      } else {
        $scope.userId = utils.getLocalInfo('userId');
        $scope.token = utils.getLocalInfo('token');
        $scope.categoryType = 'select' || 'input';
        $scope.vendorType = 'select' || 'input';
        $scope.logisticshow = false;
        $scope.commodityDetails = {};
        $scope.store = null;
        $scope.categoryList = [];
        $scope.ebayMenus = [];
      }
    }

    /** 获取已授权店铺列表 */
    function getShopList() {
      dsp.postFun('app/shop/getshop', {
        data: JSON.stringify({
          userId: $scope.userId
        }),
      }, function (data) {
        var shoplist = (utils.JSONparse(data.data.result) || {}).shoplist;

        if (!Array.isArray(shoplist)) {

          return;
        }

        // 筛选出shopify店铺（目前只支持shopify店铺）
        // 19-06-19 增加 ebay
        // 19-06-22 增加 Woocommerce
        /**店铺列表名字展示改 成店铺名+店铺类型+国家 end */
        if ($scope.parentPage == 'myCJ-favorites') {
          // 编辑后刊登支持shopify|ebay|Woocommerce|lazada|shopee
          $scope.storelist = shoplist.filter(item => {
            return /shopify|ebay|Woocommerce|lazada|shopee|wix|etsy/i.test(item.TYPE);
          });
        }
        /**店铺列表名字展示改成 店铺名+店铺类型+国家全名 start */
        $scope.storelist.forEach(e => {
          // 国家Code(大写)-物流模块传递国家需要
          e.countryCode = (e.ThemeId || e.MarketplaceUrl) ? (e.TYPE == 'shopee' ? e.ThemeId : e.TYPE == 'Lazada' ? e.MarketplaceUrl : '').toUpperCase() : '';
          // 国家全名。ThemeId是shopee的国家;MarketplaceUrl是lazada的国家
          e.countryfullName = replaceCountry(e.TYPE == 'shopee' ? e.ThemeId : e.TYPE == 'Lazada' ? e.MarketplaceUrl : '').fullName;
          // 店铺名+店铺类型+国家全名
          e.rNAME = `${e.NAME} - ${e.TYPE.replace(e.TYPE[0], e.TYPE[0].toUpperCase())} ${e.countryfullName ? '- ' + e.countryfullName : ''} ${e.TYPE == 'shopee' ? e.is_cb != 1 ? '- International' : '' : ''} ${e.TYPE == 'Lazada' && e.is_cb != 1 ? '- cross_border' : ''}`;
          // 货币代码
          e.currencyCode = replaceCountry(e.TYPE == 'shopee' ? e.ThemeId : e.TYPE == 'Lazada' ? e.MarketplaceUrl : '').currencyCode;
        });

        function replaceCountry(params) {
          let fullName = '';
          let currencyCode = '';
          if (/sg/i.test(params)) {
            fullName = 'Singapore', currencyCode = 'SGD'
          } else if (/my/i.test(params)) {
            fullName = 'Malaysia', currencyCode = 'MYR'
          } else if (/id/i.test(params)) {
            fullName = 'Indonesia', currencyCode = 'IDR'
          } else if (/th/i.test(params)) {
            fullName = 'Thailand', currencyCode = 'THB'
          } else if (/ph/i.test(params)) {
            fullName = 'Philippines', currencyCode = 'PHP'
          } else if (/vn/i.test(params)) {
            fullName = 'Vietnam', currencyCode = 'VND'
          }
          return {
            fullName,
            currencyCode
          };
        }

        // 反填信息-店铺
        if ($scope.commodityDetails.shopId) {
          for (var i = 0; i < $scope.storelist.length; i++) {
            if ($scope.storelist[i].ID === $scope.commodityDetails.shopId) {
              $scope.store = $scope.storelist[i];
              $scope.chooseStore()
              break;
            }
          }
        }
      }, function (err) {

      }, {
        code200: true,
        errorAlert: true,
        layer2: true
      });


      // 页面2
      // 初始化编辑器的内容
      editor.$txt.html($scope.commodityDetails.DESCRIPTION || '');
      // 页面3
      // 图片列表
      $scope.imglist = [];
      $scope.imgListchecked = [];
      $scope.getimgList = [];
      var imgList = typeof $scope.commodityDetails.IMG == 'string' ? $scope.commodityDetails.IMG.split(',') : $scope.commodityDetails.IMG;
      for (var i = 0; i < imgList.length; i++) {
        $scope.imglist.push({
          check: true,
          IMG: imgList[i]
        })
      }
      $scope.getimgList = $scope.imglist

      // 页面4
      // 变体数组
      $scope.stanProducts = $scope.commodityDetails.stanProducts;
      $scope.variantArr = $scope.commodityDetails.VARIANTKEYEN.split('-'); //颜色


      // 变体数组拼接
      $scope.listArr = $scope.commodityDetails.stanProducts.map(function (ele, i) {
        return {
          'id': ele.ID,
          'img': ele.IMG,
          'sku': ele.SKU,
          'variantArr': ele.VARIANTKEY.split('-'), //颜色
          'CJPrice': ele.SELLPRICE,
          'ShippingCost': '-',
          // 'DropshippingPrice': ele.SELLPRICE,
          'price': ele.customer_price ? ele.customer_price : '',
          'check': ele.is_checked == 1 ? true : false,
          'pid': ele.PID,
          'packweight': ele.PACKWEIGHT,
          'weight': ele.WEIGHT,
          'sellDiscount': ele.sellDiscount,
          'STANDARD': ele.STANDARD.replace("long=", "").replace("width=", "").replace("height=", "").split(","),
          'inventory': 0,
          'quantity': 0
        }

      })
      // layer.closeAll('loading')


      // 页面5
      // 物流方式列表
      let weight = [];

      weight = $scope.commodityDetails.stanProducts.map(function (ele, i) {
        return ele.PACKWEIGHT
      })
      // 
      weights = []
      for (var i = 0; i < weight.length; i++) {
        if (weights.indexOf(weight[i]) == -1) {
          weights.push(weight[i]);
        }
      }
      $scope.logisticList = [];
      $scope.inventory = JSON.parse($scope.commodityDetails.INVENTORCOUNTRY);
      // 准备弃用。暂存

      var inventoryObj = {} //用于保存当前区域的变体库存map
      $scope.wareListObj = {}; //用于库存map
      getAreaByPid(function (data) {
        for (var i = 0; i < data.length; i++) {
          $scope.wareListObj[data[i].countryCode] = data[i];
          $scope.seleWare = data[0]
        }
        // $scope.wareList = data;
        // $scope.seleWare = $scope.wareList[0];
        // 

        getVInvsByPidAndAreaId(function (data) {
          inventoryObj = data;

          insertInventoryToVariant(inventoryObj)
        })
        getReceiveCountries(function (data) {
          $scope.countryList = data;
          $scope.countryItem = data[0];
          if (!$scope.countryItem) {
            $scope.checkWuliu = null;
            $scope.logisticList = [];
            return;
          }
          if ($scope.commodityDetails.PRODUCTTYPE === '5') {
            getShipList(function (data) {
              // 所有物流列表
              $scope.logisticList = data;
              $scope.logisticList.sort(sortprice('price'));
            })
          } else {
            getMulShipList(function (data) {
              // 所有物流列表
              $scope.logisticList = dsp.logisticSortByPrice(data);
            })
          }
        })
      })

    }

    // 获取国家列表

    /** 获取ebay店铺类目 2019-12-13 start============================================================================== */
    $scope.ebayCategoryArrayID = [];
    $scope.specificslist = [];



    $scope.specificsItemFocus = (ev) => {

      ev.target.parentNode.lastChild.previousSibling.style = "display: block;"
    }

    $scope.specificsItemBlur = (ev) => {
      setTimeout(() => {
        ev.target.parentNode.lastChild.previousSibling.style = "display: none;"
      }, 200)

    }

    $scope.specificsItemClick = (i, index) => {

      $scope.specificslist[index] = Object.assign($scope.specificslist[index], { value: i });
    }

    $scope.vendorItemFocus = (ev) => {

      ev.target.parentNode.lastChild.previousSibling.style = "display: block;"
    }

    $scope.vendorItemBlur = (ev) => {
      setTimeout(() => {
        ev.target.parentNode.lastChild.previousSibling.style = "display: none;"
      }, 200)
    }

    $scope.vendorItemClick = (i) => {
      $scope.vendor = i;
    }

    /** 获取shopify店铺-类目 */
    function handleShopify(shopId, fn) {
      dsp.getFun('pojo/product/ShopifyProductType?shopId=' + shopId, function (data) {
        $scope.categoryList = utils.JSONparse(data.data.result) || [];

        $scope.categoryList = $scope.categoryList.map(item => {
          item.name = item.product_type; // 统一店铺名称 name 字段，方便模版取值
          return item;
        });
        fn instanceof Function && fn($scope.categoryList);
      });
      // layer.closeAll('loading');
    }

    function getShopifyVendor(shopId) {
      if (!shopId) return;
      dsp.postFun('listed_products/shopfiy/product/getShopifyVendor ', { shopId: shopId }, function (res) {
        if (res.data.code == '200') {
          $scope.vendorList = res.data.data || [];
        }
      });
    }
    $scope.waiting = false;
    $scope.refreshVendorList = function () {
      if ($scope.waiting) {
        return;
      }
      $scope.waiting = true;
      if (!$scope.store.ID) return;
      const msgLoading = cjMessage.loading({ isFixed: true });
      dsp.postFun('listed_products/shopfiy/product/refreshShopifyVendor', { shopId: $scope.store.ID }, function (res) {
        if (res.data.code == '200') {
          $scope.vendorList = res.data.data || [];
          $timeout(() => {
            $scope.waiting = false;
          }, 60000)
        };
        msgLoading.hide();
      });
    }

    /** 获取Woocommerce店铺-类目 */
    function handleWoocommerce({
      cmd = 'get',
      shopId = '',
      name = '',
      fn
    }) {
      let url, param;

      if (cmd === 'get') {
        url = `woo/wccGetCategory`;
        param = {
          shopId
        };
      } else if (cmd === 'create') { // useless
        url = `woo/wccGetCategory`; // 手动输入，创建类别
        param = {
          name,
          shopId
        };
      }
      dsp.postFun(url, param, function (res) {
        const xiao_hong_dian = String.fromCharCode(65279); // 19-10-28 bug
        res.data.result && fn instanceof Function && fn(utils.JSONparse(res.data.result.replace(xiao_hong_dian, '')) || []);

      }, function () { }, {
        layer2: true,
        errorAlert: true,
        code200: true
      });
    }

    /** 获取 lazada 类目 start========================================================================================================================================== */
    // cb跨境店铺另选国家获取类目
    $scope.selectLzdCountry = () => {

      if ($scope.lazadaCountry) {
        // $scope.lazadaCountry == 'th' && $scope.inventory && $scope.inventory.TH <= 0 
        if ($scope.lazadaCountry == 'th' && $scope.wareListObj && !$scope.wareListObj.TH) {
          // lazada泰国站点无泰国库存
          $scope.noStockLayer = 1;
          // 置空类目数据
          $scope.lazadaCate = [];
          $scope.lazadaCountry = '';
          return;
        }
        getLazadaCategory(function (data) {
          assembleLazadaCate({
            menus: data,
            type: 'init'
          })
        });
      }
    }

    // 获取lazada类目
    function getLazadaCategory(fn) {
      const lazadaCate = localStorage.getItem(`lazadaCate-${$scope.lazadaCountry}`) && JSON.parse(localStorage.getItem(`lazadaCate-${$scope.lazadaCountry}`))
      // 首先判断有没有缓存，没有缓存即时获取类目
      if (!lazadaCate) return realTimeGetCate(fn);
      // 有缓存校验缓存时间，超过两小时重新获取类目
      if ((new Date().getTime() - lazadaCate.currentTime) > 7200000) return realTimeGetCate(fn)
      // 校验缓存国家
      if (lazadaCate.country != $scope.lazadaCountry) return realTimeGetCate(fn)
      // 以上判断都不成立使用缓存类目
      getCateThreeTree(lazadaCate.data);
      if (Array.isArray(lazadaCate.data)) {
        fn instanceof Function && fn(lazadaCate.data);
      }
    }
    // 获取lazada类目 即时获取
    function realTimeGetCate(fn) {
      const msgLoading = cjMessage.loading({ isFixed: true });
      dsp.postFun(`lazada/product/getCategoryTree`, {
        shopId: $scope.store.ID,
        country: $scope.lazadaCountry
      }, function (res) {
        msgLoading.hide();
        // 
        const data = res.data;
        if (data.statusCode == 200) {
          if (data.result.categoryTree && Array.isArray(data.result.categoryTree.data) && data.result.categoryTree.data.length > 0) {
            // 
            const lazadaCate = data.result.categoryTree;

            lazadaCate.currentTime = new Date().getTime(); //记录缓存时间
            lazadaCate.country = $scope.lazadaCountry; //记录国家
            localStorage.setItem(`lazadaCate-${$scope.lazadaCountry}`, JSON.stringify(lazadaCate));
            getCateThreeTree(lazadaCate.data);
            if (lazadaCate && Array.isArray(lazadaCate.data)) {
              fn instanceof Function && fn(lazadaCate.data);
            }
          } else {
            layer.msg("Your token has expired already. Please reauthorize your store to CJ.");
          }
        } else {
          return layer.msg("Oops! Looks like we're having network difficulties.");
        }
      })
    }

    // 多级类目联动 Lazada
    $scope.changeLazadaCate = function (oSelect) {
      var index = +oSelect.dataset.index; // 记个坑，“+” 转换成数字，不然误导 splice(0, index + 1) 你懂的
      var ID = +oSelect.value;

      $scope.lazadaCate = $scope.lazadaCate.splice(0, index + 1); // 拼装多级类目前，先还原

      $scope.lazadaCate[index].category = $scope.lazadaCate[index]
        .menus.find(menu => +menu.category_id === ID);
      if (
        Array.isArray($scope.lazadaCate[index].category.children) &&
        $scope.lazadaCate[index].category.children.length
      ) {
        assembleLazadaCate({
          menus: $scope.lazadaCate[index].category.children,
          type: 'add'
        });
      } else {
        $scope.$apply();
        getLazadaBrand(); //获取品牌
        getLazadaCateInfo(ID); //获取选中类目的相应信息
      }
    }
    // 拼装多级类目 Lazada
    function assembleLazadaCate({
      category = {},
      menus = [],
      type
    }) {
      // 
      if (type === 'init') {
        $scope.lazadaCate = [{
          category,
          menus
        }];
      } else if (type === 'add') {
        setTimeout(() => {
          menus.length && $scope.lazadaCate.push({
            category,
            menus
          });
          $scope.$apply(); // 避开第一次请求装配菜单报错
        }, 500);
      }
    }

    // 获取lazada品牌
    function getLazadaBrand() {
      const brandObj = localStorage.getItem(`lazadaBrand-${$scope.lazadaCountry}`) && JSON.parse(localStorage.getItem(`lazadaBrand-${$scope.lazadaCountry}`));
      // 首先判断有没有缓存，没有缓存即时获取品牌
      if (!brandObj) return realTimeGetBrand();
      // 有缓存校验缓存时间，超过两小时重新获取品牌
      if ((new Date().getTime() - brandObj.currentTime) > 7200000) return realTimeGetBrand();
      // 校验缓存国家
      if (brandObj.country != $scope.lazadaCountry) return realTimeGetBrand();
      // 以上判断都不成立使用缓存品牌
      $scope.brandList = brandObj.data;
    }
    // 获取lazada品牌 即时获取
    function realTimeGetBrand() {
      const msgLoading = cjMessage.loading({ isFixed: true });
      dsp.postFun(`lazada/product/getBrandListByCountry`, {
        shopId: $scope.store.ID,
        country: $scope.lazadaCountry,
      }, function (res) {
        msgLoading.hide();
        // 
        const data = res.data;
        if (data.statusCode == 200 && data.result != '') {
          const brandObj = {};
          brandObj.currentTime = new Date().getTime();
          brandObj.country = $scope.lazadaCountry;
          brandObj.data = data.result;
          // 
          localStorage.setItem(`lazadaBrand-${$scope.lazadaCountry}`, JSON.stringify(brandObj));
          $scope.brandList = brandObj.data; //品牌
          // 
        }
      })
    }
    // 获取Lazada选中类目的相应信息
    function getLazadaCateInfo(ID) {
      $scope.lzdCategoryId = ID;
      const msgLoading = cjMessage.loading({ isFixed: true });
      const labelList = [];
      const old_skuList = $scope.skuList ? [...$scope.skuList] : [];
      old_skuList.map(e => labelList.push(e.name))
      dsp.postFun(`lazada/product/getCategoryInfoListById`, {
        shopId: $scope.store.ID,
        country: $scope.lazadaCountry,
        productId: $scope.commodityDetails.ID,
        categoryId: $scope.lzdCategoryId
      }, function (res) {
        msgLoading.hide();
        // 
        const data = res.data;
        if (data.statusCode == 200 && data.result != '') {
          const categoryInfoList = data.result;
          // 需要放到变体中的信息数组 attribute_type: "sku"
          $scope.skuList = categoryInfoList.filter(item => item.attribute_type === 'sku' && item.options.length > 0);
          // $scope.skuList = categoryInfoList.filter(item => item.attribute_type === 'sku' && (item.name != "SellerSku" && 
          // item.name != "price" && item.name != "package_weight" && item.name != "package_length" && item.name != "package_width" && item.name != "package_height"));

          for(let i = 0; i < $scope.listArr.length; i++) {
              labelList.map(name => {
                $scope.listArr[i][name] = null;
              })
          }
          attributesList = [];

          // 不需要放到变体中的信息数组 attribute_type: "normal"
          $scope.normalList = categoryInfoList.filter(item => item.attribute_type === 'normal' && item.options.length > 0 || item.name === 'brand');

          // options为空的数组 为空也要传直接给空
          $scope.needList = categoryInfoList.filter(item => item.options.length === 0 && item.name != 'brand');

          // 颜色数组
          // colorList = categoryInfoList.filter(item => item.name === 'color_family');




          // 

        } else {
          $scope.attrErrLayer = 1;
          $scope.attrErrMes = data.message;
        }
      })
    }
    /** 获取 lazada 类目 end========================================================================================================================================== */


    /** 获取 shopee 类目 start=============================================================================================================================*/
    function getShopeeCate(fn) {
      const shopeeCate = localStorage.getItem(`shopeeCate-${$scope.store.countryCode}`) && JSON.parse(localStorage.getItem(`shopeeCate-${$scope.store.countryCode}`));
      if (!shopeeCate) return getShopeeType(fn);
      if ((new Date().getTime() - shopeeCate.currentTime) > 2592000000) return getShopeeType(fn); // 缓存一个月
      if (shopeeCate.country != $scope.store.countryCode) return getShopeeType(fn);

      getCateThreeTree(shopeeCate.cata);
      if (Array.isArray(shopeeCate.cata)) {
        fn instanceof Function && fn(shopeeCate.cata);
      }
      $scope.shopeeLogistics = shopeeCate.logistics;
      $scope.shopeeLogisticItem = $scope.shopeeLogistics ? $scope.shopeeLogistics[0] : null;
    }

    function getShopeeType(fn) {
      const params = {
        shopId: $scope.store.ID,
        userId: $scope.userId,
        account: $scope.store.accountName,
        type: $scope.store.TYPE
      }
      const msgLoading = cjMessage.loading({ isFixed: true });
      dsp.postFun(`shopee/product/getCategories`, params, function (res) {
        msgLoading.hide();
        const data = res.data;
        if (data.statusCode == 200 && data.result != '') {
          // 
          const cataInfo = JSON.parse(data.result);

          let shopeeCate = {};
          shopeeCate.cata = cataInfo.categList; //类目
          shopeeCate.logistics = cataInfo.logistics; //物流
          shopeeCate.currentTime = new Date().getTime(); //记录缓存时间
          shopeeCate.country = $scope.store.countryCode; //记录国家
          // 
          localStorage.setItem(`shopeeCate-${$scope.store.countryCode}`, JSON.stringify(shopeeCate));
          getCateThreeTree(cataInfo.categList);
          if (cataInfo && Array.isArray(cataInfo.categList)) {
            fn instanceof Function && fn(cataInfo.categList);
          }
          $scope.shopeeLogistics = cataInfo.logistics; //shopee自己的物流
          $scope.shopeeLogisticItem = $scope.shopeeLogistics ? $scope.shopeeLogistics[0] : null;
        } else {
          return layer.msg(data.message);
        }
      })
    }

    /** 多级菜单联动 shopee */
    $scope.changeShopeeCate = function (oSelect) {
      var index = +oSelect.dataset.index; // 记个坑，“+” 转换成数字，不然误导 splice(0, index + 1) 你懂的
      var ID = +oSelect.value;

      $scope.shopeeMenus = $scope.shopeeMenus.splice(0, index + 1); // 拼装多级类目前，先还原

      $scope.shopeeMenus[index].category = $scope.shopeeMenus[index]
        .menus.find(menu => +menu.category_id === ID);
      if (
        Array.isArray($scope.shopeeMenus[index].category.children) &&
        $scope.shopeeMenus[index].category.children.length
      ) {
        assembleShopeeMenus({
          menus: $scope.shopeeMenus[index].category.children,
          type: 'add'
        });
      } else {
        $scope.$apply();
        getAttributes(ID);
      }
    }
    // 拼装多级类目 shopee
    function assembleShopeeMenus({
      category = {},
      menus = [],
      type
    }) {
      // 
      if (type === 'init') {
        $scope.shopeeMenus = [{
          category,
          menus
        }];
      } else if (type === 'add') {
        setTimeout(() => {
          menus.length && $scope.shopeeMenus.push({
            category,
            menus
          });
          $scope.$apply(); // 避开第一次请求装配菜单报错
        }, 500);
      }
    }

    function getAttributes(ID) {
      const shopId = $scope.store.ID;
      $scope.shopeCategoryId = ID;
      const msgLoading = cjMessage.loading({ isFixed: true });
      dsp.postFun(`shopee/product/getAttributes`, {
        shopId,
        categoryId: $scope.shopeCategoryId
      }, function (res) {
        msgLoading.hide();
        // 
        const data = res.data;
        // 
        if (data.result != '') {
          const obj = JSON.parse(data.result);
          // 
          if (data.statusCode == 200) {
            //过滤出is_mandatory为true的必选项
            $scope.requiredAttr = obj.attributes.filter(item => item.is_mandatory === true);
            // 

            //从必选项中过滤掉文本输入类型，用于下拉框
            $scope.comboBoxAttr = $scope.requiredAttr.filter(item => item.input_type != 'TEXT_FILED');
            //从必选项过滤出文本输入类型，用于输入框
            $scope.textAttr = $scope.requiredAttr.filter(item => item.input_type == 'TEXT_FILED');
            // 
            // 
          } else {
            $scope.requiredAttr = null;
            $scope.data = {
              current: "4"
            };
            $scope.attrErrLayer = 1;
            $scope.attrErrMes = obj.msg;
          }
        }
      })
    }
    /** 获取 shopee 类目 end=============================================================================================================================*/

    // lazada / shopee类目搜索start
    var threeCateTree = []; // 搜索类目
    function getCateThreeTree(cateData) {
      threeCateTree = [];
      for (var i = 0; i < cateData.length; i++) {
        if (cateData[i].children) {
          for (var j = 0; j < cateData[i].children.length; j++) {
            if (cateData[i].children[j].children) {
              for (var k = 0; k < cateData[i].children[j].children.length; k++) {
                threeCateTree.push({
                  name: cateData[i].children[j].children[k].name || cateData[i].children[j].children[k].category_name,
                  category_id: cateData[i].children[j].children[k].category_id,
                  cateThreeIndex: k,
                  cateTwoName: cateData[i].children[j].name || cateData[i].children[j].category_name,
                  cateTwoId: cateData[i].children[j].category_id,
                  cateTwoIndex: j,
                  cateOneName: cateData[i].name || cateData[i].category_name,
                  cateOneId: cateData[i].category_id,
                  cateOneIndex: i,
                })
              }
            }

          }
        }
      }
      // 
    }
    var serchCateTimer;
    $scope.serchCate = function () {
      serchCateTimer && clearTimeout(serchCateTimer)
      serchCateTimer = $timeout(() => {
        goSerchCate()
      }, 1000);
    }

    function goSerchCate() {
      var searcVal = $scope.serchCateVal;
      if (threeCateTree.length > 0 && searcVal) {
        var filterArr = threeCateTree.filter(function (e) {
          return e.name.toLowerCase().indexOf(searcVal.toLowerCase()) > -1
        })
        $scope.filterCate = filterArr;

      } else {
        $scope.filterCate = [];
      }
    }
    $scope.clickSearchItem = function (item, $event) {
      document.querySelector('#my-select-0').selectedIndex = item.cateOneIndex + 1;
      document.querySelector('#my-select-0').dispatchEvent(new Event('change'));
      if (item.cateTwoIndex >= 0) {
        setTimeout(() => {
          document.querySelector('#my-select-1').selectedIndex = item.cateTwoIndex + 1;
          document.querySelector('#my-select-1').dispatchEvent(new Event('change'));
          if (item.cateThreeIndex >= 0) {
            setTimeout(() => {
              document.querySelector('#my-select-2').selectedIndex = item.cateThreeIndex + 1;
              document.querySelector('#my-select-2').dispatchEvent(new Event('change'));
              $scope.filterCate = [];
              $scope.serchCateVal = '';
              $scope.$apply();
            }, 500);
          }
        }, 500);
      }
      $event.stopPropagation();
    }
    // lazada / shopee类目搜索end


    // 选择店铺
    $scope.chooseStore = function () {
      clearEbayError()
      // 初始化店铺数据
      $scope.actions.setCurrent(1)
      $scope.variationTrue = []
      initState($scope.store.TYPE);
      initStationState()
      if (/shopify/i.test($scope.store.TYPE)) {
        handleShopify($scope.store.ID, function (data) {
          $scope.categoryList = data;
          // $scope.categoryList.unshift({ name: 'Please select' });
          // $scope.category1 = $scope.categoryList[0].name;
        });
        getShopifyVendor($scope.store.ID)
        // 告诉shopify collections组件切换店铺了
        $scope.$broadcast('quick-list', {
          flag: 'chan-store',
          store: $scope.store
        });
      } else if (/ebay/i.test($scope.store.TYPE)) {
        getEbayCountry();
      } else if (/Woocommerce/i.test($scope.store.TYPE)) {
        handleWoocommerce({
          shopId: $scope.store.ID,
          fn: function (data) {
            $scope.categoryList = data;
          }
        });
        getCanReviews()
      } else if (/api/i.test($scope.store.TYPE)) {
      } else if (/amazon/i.test($scope.store.TYPE)) {
      } else if (/lazada/i.test($scope.store.TYPE)) {

        //cb代表跨境店铺,跨境店铺不属于任何国家,需要另选国家; 不是跨境店铺直接获取类目
        if ($scope.store.MarketplaceUrl != 'cb') {
          // lazada泰国站点无泰国库存
          // $scope.store.MarketplaceUrl == 'th' && $scope.inventory && $scope.inventory.TH <= 0
          if ($scope.store.MarketplaceUrl == 'th' && $scope.wareListObj && !$scope.wareListObj.TH) {
            $scope.noStockLayer = 1;
            // 置空类目数据
            $scope.lazadaCate = [];
            $scope.store = $scope.storelist[0];
            return;
          }
          $scope.lazadaCountry = $scope.store.MarketplaceUrl;
          getLazadaCategory(function (data) {
            assembleLazadaCate({
              menus: data,
              type: 'init'
            })
          });
        } else {
          $scope.contrabandShow = true; //违禁品弹窗
          return false;
        }
      } else if (/shopee/i.test($scope.store.TYPE)) {
        getShopeeCate(function (data) {
          assembleShopeeMenus({
            menus: data,
            type: 'init'
          })
        })
        // shopee泰国及印尼站点-预售默认赋值
        if ($scope.store.countryCode == 'TH') {
          // $scope.inventory && $scope.inventory.TH > 0
          if ($scope.seleWare.countryCode == 'TH' && $scope.wareListObj && $scope.wareListObj.TH) {
            $scope.isPreOrder = '0'; // 现售
          } else {
            $scope.isPreOrder = '1'; // 预售
          }
        } else if ($scope.store.countryCode == 'ID') {
          if ($scope.seleWare.countryCode == 'ID' && $scope.wareListObj && $scope.wareListObj.ID) {
            $scope.isPreOrder = '0'; // 现售
          } else {
            $scope.isPreOrder = '1'; // 预售
          }
        } else {
          $scope.isPreOrder = '1'; // 其他东南亚站点默认预售
        }
      } else if (/(etsy|wix)/i.test($scope.store.TYPE)) {
        // do etsy wix 店铺选择时
        if(rutterNotAllowThreeOption()) return
      }
      if ($scope.commodityDetails.PRODUCTTYPE === '5') {
        dsp.getSupplierReceiveCountries({ sku: $scope.commodityDetails.SKU },
          function (data) {
            fn && fn(data);
          })
      } else {
        getReceiveCountries(function (data) {
          $scope.countryList = data;
          $scope.countryItem = data[0];
          if (!$scope.countryItem) {
            $scope.checkWuliu = null;
            $scope.logisticList = [];
            return;
          }
          if ($scope.commodityDetails.PRODUCTTYPE === '5') {
            getShipList(function (data) {
              // 所有物流列表
              $scope.logisticList = data;
              $scope.logisticList.sort(sortprice('price'));
            })
          } else {
            getMulShipList(function (data) {
              // 所有物流列表
              $scope.logisticList = data;
              $scope.logisticList = dsp.logisticSortByPrice(data);
            })
          }
        })
      }
    }

    // 接收shopify collections组件传过来的collectionId
    $scope.$on('shopify-collections', function (ev, data) {
      if (data.flag == 'fresh-collection-id') {
        $scope.collectionId = data.collectionId;
      }
    })

    // 选择类目Category
    $scope.chooseCategory = function () {

    }
    // tags
    // $scope.taps = []
    $scope.handleTagsKeyup = function (e) {
      if (e.keyCode == 13) {
        if ($scope.taps.indexOf($scope.tapitem) != -1) {
          layer.msg('Weight tag is unavailable');
          return;
        } 
        $scope.addTag()
      }
    }
    $scope.addTag = function(){
      const val = $scope.tapitem
      const list = $scope.taps
      if (val) {
        if(val.length > 255) return
        if(list.length >= 7) return layer.msg('7 tags at most.')
        $scope.taps.push(val.trim())
        $scope.tapitem = '';
      }
    }
    $scope.deletetag = function (index, item) {
      $scope.taps.splice(index, 1);
    }

    // 获取价格规范
    function getPrice(value){
      const price = value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.').replace(/^[0]*/,'').replace(/^\./,'0.');
      const arr = price.split('.');
      if(arr[0] && arr[0].length > 8) arr[0] = arr[0].slice(0,8);
      if(arr[1] && arr[1].length > 2) arr[1] = arr[1].slice(0,2);
      return arr.join('.')
    }
    $scope.handleBulkPrice = function(){
      if($scope.bulkRevise == 'price') {
        $scope.bulkReviseValue = getPrice($scope.bulkReviseValue)
      }
    }

    // 图片点击
    $scope.slectedimg = function (item) {
      $scope.imgListchecked = $scope.imglist.filter(function (ele, i) {
        return ele.check == true;
      })
      if ($scope.imgListchecked.length == $scope.imglist.length) {
        $scope.getimgList = $scope.imglist
      } else {
        $scope.getimgList = $scope.imgListchecked
      }

    };

    /** 批量修改 start================================================================================================================== */
    $scope.bulkOK = (type) => {
      // 
      if (type == "price") {
        let flag = true;
        $scope.listArr.forEach((ele) => {
          if (ele.check) {
            flag = false;
            ele.price = $scope.bulkReviseValue;
            // 泰国店铺批量修改价格时显示泰铢符号
            if ($scope.CurrencyCode && $scope.CurrencyCode == 'THB' && $scope.store &&
              ($scope.store.ThemeId == 'TH' || $scope.store.MarketplaceUrl == 'th' || $scope.lazadaCountry == 'th'))
              return ele.currencyUnit = '฿';
          }
        });
        // 批量修改价格时的汇率转换
        bulkrateConvert($scope.CurrencyCode, $scope.bulkReviseValue, $scope.listArr.filter(item => item.check == true));
        if (flag) {
          layer.msg('Please select a product to list. ');
        }
      } else if (type == "weight") {
        let flag = true;
        $scope.listArr.forEach((ele) => {
          if (ele.check) {
            flag = false;
            ele.weight = $scope.bulkReviseValue;
          }
        });
        if (flag) {
          layer.msg('Please select a product to list. ');
        }
      } else if (type == "length") {
        let flag = true;
        $scope.listArr.forEach((ele) => {
          if (ele.check) {
            flag = false;
            ele.STANDARD[0] = $scope.bulkReviseValue;
          }
        });
        if (flag) {
          layer.msg('Please select a product to list. ');
        }
      } else if (type == "width") {
        let flag = true;
        $scope.listArr.forEach((ele) => {
          if (ele.check) {
            flag = false;
            ele.STANDARD[1] = $scope.bulkReviseValue;
          }
        });
        if (flag) {
          layer.msg('Please select a product to list. ');
        }
      } else if (type == "height") {
        let flag = true;
        $scope.listArr.forEach((ele) => {
          if (ele.check) {
            flag = false;
            ele.STANDARD[2] = $scope.bulkReviseValue;
          }
        });
        if (flag) {
          layer.msg('Please select a product to list. ');
        }
      } else if (type == "inventory") {
        let flag = true;
        $scope.listArr.forEach((ele) => {
          if (ele.check) {
            flag = false;
            if (Number(ele.inventory) <= Number($scope.bulkReviseValue || 0)) {
              layer.msg('The listing quantity you input has exceeded the remaining inventory, so we fill in the maximum inventory for you. ');
              ele.quantity = ele.inventory || 0;
            } else {
              ele.quantity = $scope.bulkReviseValue || 0;
            }
          }
        });
        if (flag) {
          layer.msg('Please select a product to list. ');
        }
      }
    }
    /** 批量修改 end================================================================================================================== */

    $scope.conf = [];
    $scope.changeVariant = function (el, index, itemIndex) {
      var d = el.dataset;
      $scope.listArr[d.index].variantArr[d.itemIndex] = el.value;
    }
    // 全选
    $scope.checked = [];
    $scope.checkAll = function () {
      if ($scope.check_All) {
        $scope.checked = [];
        $scope.checked = $scope.listArr.forEach((ele, i) => {
          ele.check = true;
        });

      } else {
        $scope.listArr.forEach((ele) => {
          ele.check = false;
          $scope.checked = [];
        });
      }

    };
    // 单选
    $scope.checkOne = function (item, index) {

      if (item.check) {
        var num = 0;
        for (var i = 0; i < $scope.listArr.length; i++) {
          if ($scope.listArr[i].check) {
            num++;
          }
        }
        if (num == $scope.listArr.length) {
          $scope.check_All = true;

        }
      } else {
        $scope.check_All = false;
      }

    }


    function getAreaByPid(successCallback) {
      dsp.getAreaByPid($scope.productId, function (data) {
        // data.unshift({ areaEn: "泰国仓", areaId: "50", countryCode: "TH", entityId: "", num: 888 })
        successCallback(data);
      })
    }

    function getVInvsByPidAndAreaId(successCallback) {
      dsp.getVInvsByPidAndAreaId({
        pid: $scope.productId,
        areaId: $scope.seleWare.areaId,
      }, function (data) {
        successCallback(data);
      })
    }

    function originProcess() {
      if ($scope.store && $scope.store.TYPE == 'shopee') {
        if ($scope.store.is_cb != 1) { // 国际站 取shipfrom国家
          return [$scope.seleWare.countryCode]
        } else { // 本土站
          if ($scope.isPreOrder && $scope.isPreOrder == '1') { // 预售商品 取shipfrom国家
            return [$scope.seleWare.countryCode]
          } else if ($scope.isPreOrder && $scope.isPreOrder == '0') { // 现售商品 取本土
            return [$scope.store.countryCode]
          } else {
            return [$scope.store.countryCode]
          }
        }
      } else {
        return [$scope.seleWare.countryCode];
      }
    }
    function getReceiveCountries(successCallback) {


      if ($scope.commodityDetails.PRODUCTTYPE === '5') {
        dsp.getSupplierReceiveCountries({ sku: $scope.commodityDetails.SKU },
          function (data) {
            successCallback(data);
          })
      } else {
        dsp.getReceiveCountries({
          // startCountryCodes: [$scope.seleWare.countryCode],
          startCountryCodes: originProcess(),
          platForm: $scope.store && $scope.store.TYPE ? $scope.store.TYPE : ''
        }, function (data) {
          successCallback(data);
        })
      }

    }

    function getShipList(successCallback) {
      dsp.getShipList({
        // area: $scope.seleWare && $scope.seleWare.countryCode ? $scope.seleWare.countryCode : '',
        area: (function () {
          if ($scope.store && $scope.store.TYPE == 'shopee') {
            if ($scope.store.is_cb != 1) { // 国际站 取shipfrom国家
              return $scope.seleWare && $scope.seleWare.countryCode || ''
            } else if ($scope.isPreOrder && $scope.isPreOrder == '1') { // 预售商品 取shipfrom国家
              return $scope.seleWare && $scope.seleWare.countryCode || ''
            } else if ($scope.isPreOrder && $scope.isPreOrder == '0') { // 现售商品 取本土
              return $scope.store.countryCode
            }
          } else {
            return $scope.seleWare && $scope.seleWare.countryCode || ''
          }
        }()),
        country: $scope.countryItem ? $scope.countryItem.code : '',
        weight: $scope.commodityDetails.PACKWEIGHT.trim(),
        enName: '',
        character: $scope.commodityDetails.PROPERTYKEY,
        pid: $scope.commodityDetails.ID,
        shopType: $scope.store && $scope.store.TYPE ? $scope.store.TYPE.toLowerCase() : '',
        storeCountry: $scope.store && $scope.store.countryCode ? $scope.store.countryCode : '',
        supplierId: $scope.commodityDetails.supplier_id || undefined,
        productType: $scope.commodityDetails.PRODUCTTYPE || undefined,
        sku: $scope.commodityDetails.SKU || undefined,
        successCallback: function (data) {
          successCallback(data)
        }
      })
    }

    function getMulShipList(fn) { // 这个是新的物流试算，需要传入商品的长宽高
      if (!$scope.countryItem) {
        return fn && fn(data);
      }
      const params = $scope.commodityDetails.stanProducts.map(i => {
        return {
          startCountryCode: (function () {
            if ($scope.store && $scope.store.TYPE == 'shopee') {
              if ($scope.store.is_cb != 1) { // 国际站 取shipfrom国家
                return $scope.seleWare && $scope.seleWare.countryCode || ''
              } else if ($scope.isPreOrder && $scope.isPreOrder == '1') { // 预售商品 取shipfrom国家
                return $scope.seleWare && $scope.seleWare.countryCode || ''
              } else if ($scope.isPreOrder && $scope.isPreOrder == '0') { // 现售商品 取本土
                return $scope.store.countryCode
              }
            } else {
              return $scope.seleWare && $scope.seleWare.countryCode || ''
            }
          }()),
          countryCode: $scope.countryItem ? $scope.countryItem.code : '',
          platform: $scope.store && $scope.store.TYPE ? $scope.store.TYPE.toLowerCase() : '',
          property: $scope.commodityDetails.PROPERTYKEY,
          weight: i.PACKWEIGHT,
          sku: $scope.productId,
          length: i.long,
          width: i.width,
          height: i.height,
          skus: [i.SKU]
        }
      });
      dsp.getMulShipList(
        params,
        function (data) {
          fn && fn(data);
        }
      )
    }


    function getMulShipCost(fn) {
      const params = $scope.commodityDetails.stanProducts.map(i => {
        return {
          sku: i.SKU,
          logisticsFreightRequest: {
            sku: $scope.commodityDetails.ID,
            startCountryCode: (function () {
              if ($scope.store && $scope.store.TYPE == 'shopee') {
                if ($scope.store.is_cb != 1) { // 国际站 取shipfrom国家
                  return $scope.seleWare && $scope.seleWare.countryCode || ''
                } else if ($scope.isPreOrder && $scope.isPreOrder == '1') { // 预售商品 取shipfrom国家
                  return $scope.seleWare && $scope.seleWare.countryCode || ''
                } else if ($scope.isPreOrder && $scope.isPreOrder == '0') { // 现售商品 取本土
                  return $scope.store.countryCode
                }
              } else {
                return $scope.seleWare && $scope.seleWare.countryCode || ''
              }
            }()),
            countryCode: $scope.countryItem ? $scope.countryItem.code : '',
            logisticsName: $scope.shipitem,
            property: $scope.commodityDetails.PROPERTYKEY,
            platform: $scope.store && $scope.store.TYPE ? $scope.store.TYPE.toLowerCase() : '',
            weight: i.PACKWEIGHT,
            length: i.long,
            width: i.width,
            height: i.height,
            customerCode: localStorage.getItem('userId') ? bs.decode(localStorage.getItem('userId')) : ''
          }
        }
      });
      dsp.getMulShipCost(
        params,
        function (data) {
          fn && fn(data);
        }
      )
    }


    //监听现售、预售的变化，刷新物流数据
    $scope.$watch('isPreOrder',
      function (newVal, oldVal) {

        if (oldVal) {
          getReceiveCountries(function (data) {
            $scope.countryList = data;
            $scope.countryItem = data[0];
            if (!$scope.countryItem) {
              $scope.checkWuliu = null;
              $scope.logisticList = [];
              return;
            }
            if ($scope.commodityDetails.PRODUCTTYPE === '5') {
              getShipList(function (data) {
                // 所有物流列表
                $scope.logisticList = data;
                $scope.logisticList.sort(sortprice('price'));
              })
            } else {
              getMulShipList(function (data) {
                // 所有物流列表
                $scope.logisticList = data;
                $scope.logisticList = dsp.logisticSortByPrice(data);
              })
            }
            $scope.logistics = null;
            $scope.shipitem = undefined;
            resetPriceList();
          })
        }
      })
    // 切换仓库
    $scope.chanSeleWare = function () {

      getVInvsByPidAndAreaId(function (data) {
        inventoryObj = data;

        insertInventoryToVariant(inventoryObj)
      })
      getReceiveCountries(function (data) {
        $scope.countryList = data;
        $scope.countryItem = data[0];
        if (!$scope.countryItem) {
          $scope.checkWuliu = null;
          $scope.logisticList = [];
          return;
        }
        if ($scope.commodityDetails.PRODUCTTYPE === '5') {
          getShipList(function (data) {
            // 所有物流列表
            $scope.logisticList = data;
            $scope.logisticList.sort(sortprice('price'));
          })
        } else {
          getMulShipList(function (data) {
            // 所有物流列表
            $scope.logisticList = data;
            $scope.logisticList = dsp.logisticSortByPrice(data);
          })
        }
        $scope.logistics = null;
        $scope.shipitem = undefined;
        resetPriceList();
      })
    }

    // 国家切换取物流列表
    $scope.getcountry = function (item) {
      if ($scope.commodityDetails.PRODUCTTYPE === '5') {
        getShipList(function (data) {
          // 所有物流列表
          $scope.logisticList = data;
          $scope.logisticList.sort(sortprice('price'));
        })
      } else {
        getMulShipList(function (data) {
          // 所有物流列表
          $scope.logisticList = data;
          $scope.logisticList = dsp.logisticSortByPrice(data);
        })
      }
      $scope.logistics = null;
      $scope.shipitem = undefined;
      resetPriceList();
    }

    // 点击物流方式变价
    $scope.checkship = function (item) {
      $scope.logistics = item;
      $scope.shipitem = item.logisticName;
      if ($scope.commodityDetails.PRODUCTTYPE === '5') {
        dsp.getShipList({
          // area: $scope.seleWare && $scope.seleWare.countryCode ? $scope.seleWare.countryCode : '',
          area: (function () {
            if ($scope.store && $scope.store.TYPE == 'shopee') {
              if ($scope.store.is_cb != 1) { // 国际站 取shipfrom国家
                return $scope.seleWare && $scope.seleWare.countryCode || ''
              } else if ($scope.isPreOrder && $scope.isPreOrder == '1') { // 预售商品 取shipfrom国家
                return $scope.seleWare && $scope.seleWare.countryCode || ''
              } else if ($scope.isPreOrder && $scope.isPreOrder == '0') { // 现售商品 取本土
                return $scope.store.countryCode
              }
            } else {
              return $scope.seleWare && $scope.seleWare.countryCode || ''
            }
          }()),
          country: $scope.countryItem ? $scope.countryItem.code : '',
          weight: weights.join(','),
          enName: item.logisticName,
          character: $scope.commodityDetails.PROPERTYKEY,
          pid: $scope.commodityDetails.ID,
          shopType: $scope.store && $scope.store.TYPE ? $scope.store.TYPE.toLowerCase() : '',
          storeCountry: $scope.store && $scope.store.countryCode ? $scope.store.countryCode : '',
          successCallback: function (data) {
            shipData = data;
            insertShipToVariant();
          }
        })
      } else {
        getMulShipCost((data) => {
          newLogistic = data;
          insertShipToVariant();
        })

      }

    }

    $scope.cancellist = function () {
      _this.onClose();
      $scope.check_All = false;
    }

    $scope.listitNowBefore = function () {
      $scope.listitNow();
    };

    //ebay变体列表设置默认值
    function ebayDefaultValue() {
      let list = []
      let listObj = {}
      $scope.isVosTure.forEach(itemTrue => {
        itemTrue.variantSpecificsVOS.forEach(itemVOS => {
          const { vid, optionValue } = itemVOS;
          listObj[vid] = optionValue;
        })
        list.push(listObj)
        listObj = {}
      })
      const NAME_INDEX = $scope.variationTrueName;
      let yourAttr = Array.from({ length: 5 }, () => '')
      $scope.listArr.forEach(item => {
        $scope.isVosTure.forEach((itemTrue, index) => {
          yourAttr[NAME_INDEX[itemTrue.name]] = list[index][item.id];
          itemTrue['yourAttr'] = yourAttr
          item[itemTrue.name] = list[index][item.id]
        })
      })
    }
    //Others必填项初始值定义
    $scope.warningTitle = false
    $scope.warningTitle4 = false
    $scope.warningTitle5 = false
    $scope.othersParam = {
      paypalAccount: '',
      shippingMethods: $scope.ebayShip,
    }
    function clearEbayError() {
      $scope.validateMSG = 0
      $scope.eBayAttr = []
      $scope.variationTrue = []
      for (let key in $scope.othersWarn) {
        $scope.othersWarn[key] = false;
      }
      $scope.warningTitle = false
      $scope.warningTitle4 = false
    }
    $scope.ebaySelectChange = (key) => {
      console.log($scope.othersParam);
      $scope.othersWarn[key] = false;
      let error = false;
      for (let key in $scope.othersParam) {
        if (!$scope.othersParam[key]) error = true;
      }
      $scope.warningTitle = error;
    }
    //校验Others的选项数据是否为空
    $scope.validateMSG = 0
    $scope.validateObj = {
      'paypalAccount': "PayPal Account error.",
      'shippingMethods': "Please fill in Shipping Limits.",
      'MPN': "Please fill in MPN code.",
      'UPC': "Please fill in UPC code.",
      'EAN': "Please fill in EAN code.",
      'ISBN': "Please fill in ISBN code.",
    }
    const othersValidate = () => {
      $scope.othersWarn = {};//定义Others的选项错误提示初始值
      for (let key in $scope.othersParam) {
        if (!$scope.othersParam[key]) {
          $scope.othersWarn[key] = true;
          if ($scope.validateMSG === 1) {
            for (let validateKey in $scope.validateObj) {
              if (key == validateKey) {
                layer.msg(`${$scope.validateObj[validateKey]}`)
                $scope.warningTitle = true
                return false;
              }
            }
          }
        } else {
          $scope.othersWarn[key] = false;
        }
      }
      $scope.warningTitle = false;
      return true;
    }
    //ebay刊登
    let varlist = [];
    const eBayListItNow = () => {
      for (let i = 0; i < $scope.listArr.length; i++) {
        if ($scope.listArr[i].check) {
          $scope.variants.forEach(ele => {
            varlist.push({
              "id": ele.id,
              "option1": ele[$scope.variantsName[0]],
              "option2": ele[$scope.variantsName[1]] ? ele[$scope.variantsName[1]] : null,
              "option3": ele[$scope.variantsName[2]] ? ele[$scope.variantsName[2]] : null,
              "option4": ele[$scope.variantsName[3]] ? ele[$scope.variantsName[3]] : null,
              "option5": ele[$scope.variantsName[4]] ? ele[$scope.variantsName[4]] : null,
              "price": ele.price,
              "sku": ele.sku,
              "grams": ele.weight,
              "image": ele.img,
              "quantity": ele.quantity || 0
            })
          })
          //拼接Your属性,options入参去重
          for (let j in $scope.variationTrueName) {
            if ($scope.listArr[i][j]) {
              $scope.eBayAttr[$scope.variationTrueName[j]].values.push($scope.listArr[i][j])
            }
          }
          for (let j = 0; j < $scope.eBayAttr.length; j++) {
            $scope.eBayAttr[j].values = $scope.eBayAttr[j].values.filter(function (ele, index, self) {
              return self.indexOf(ele) === index;
            })
          }
        }
        let res = {}
        let finalRes = []
        for (let i = 0; i < varlist.length; i++) {
          res[varlist[i].id] = varlist[i]
        }
        for (item in res) {
          finalRes.push(res[item])
        }
        varlist = finalRes
      }
    }
    // 刊登
    $scope.listitNow = function () {
      let imagesList = [];
      let options = [];
      $scope.validateMSG = 1
      // 获取图片列表
      $scope.getimgList.forEach(function (ele) {
        imagesList.push({
          'src': ele.IMG
        });
      });
      $scope.variants = $scope.listArr.filter(function (ele, i) {
        return ele.check == true;
      });

      //# 19-07-09 add store 和 category 必选
      if (!$scope.store || !$scope.store.ID) {
        layer.msg('Please select the store.');
        return;
      }

      if (
        /shopify/i.test($scope.store.TYPE)
        ||
        /Woocommerce/i.test($scope.store.TYPE)
      ) {
        if (!$scope.category1) {
          layer.msg('Please select the category.');
          return;
        }
      } else if ($scope.store.TYPE == 'shopee') {
        if (!$scope.shopeCategoryId) {
          return layer.msg('Please select the category.');
        }
      } else if ($scope.store.TYPE == 'Lazada') {
        if (!$scope.lazadaCountry) {
          return layer.msg('Please select the Country.');
        }
        if (!$scope.lzdCategoryId) {
          return layer.msg('Please select the category.');
        }
      } else if ($scope.store.TYPE == 'ebay') {
        if (!$scope.ebayCategoryID || !$scope.isVariant) {
          return layer.msg('Please select the category.');
        }
        if (!$scope.ebayCountry) {
          return layer.msg('Please fill in Ebay Country.');
        }
        if (!othersValidate()) {
          if ($scope.data.current !== 12) {
            $scope.actions.setCurrent(12)
          }
          return false
        } else {
          eBayListItNow()
          options = $scope.eBayAttr
        }
        if ($scope.logisticList.length > 0 && !$scope.shipitem) {
          $scope.warningTitle5 = true
          $scope.actions.setCurrent(5)
          return layer.msg('Please specify a shipping method')
        }
        if (varlist.length <= 0) {
          $scope.warningTitle4 = true
          $scope.actions.setCurrent(4)
          layer.msg('Please select a product to list.');
          return;
        }
        // Your属性校验
        let varVosLen = document.querySelectorAll('#pdlist-Table-li')
        for (let i = 0; i < $scope.listArr.length; i++) {
          if ($scope.listArr[i].check) {
            for (let j = 0; j < varVosLen[i].children.length; j++) {
              if (varVosLen[i].children[j].id) {
                if (varVosLen[i].children[j].children[0].value == '') {
                  $scope.warningTitle4 = true
                  varVosLen[i].children[j].children[0].style.borderColor = 'red'
                  return layer.msg('Please fill all Your attribute.')
                }
                else if (varVosLen[i].children[j].children[0].value == '?') {
                  $scope.warningTitle4 = true
                  varVosLen[i].children[j].children[0].style.borderColor = 'red'
                  return layer.msg('Please select all your attribute.')
                }
                else {
                  varVosLen[i].children[j].children[0].style.borderColor = '#d9d9d9'
                }
              }
            }
          }
        }
        if (!$scope.ebayCurrency) {
          return layer.msg('Please fill in Price Currency.');
        } else {
          $scope.warningTitle4 = false
        }
      } else if (/(etsy|wix)/i.test($scope.store.TYPE)) {
        // do etsy wix 点击刊登时
        if(rutterNotAllowThreeOption()) return
        if($scope.commodityDetails.NAMEEN.length > $scope.maxRutterProTitleLen) return $scope.actions.setCurrent(1)
        if($scope.taps.length <= 0) {
          $scope.actions.setCurrent(1)
          return layer.msg('Please fill in the Tags.')
        }
      }

      if ($scope.commodityDetails.NAMEEN == '') {
        layer.msg('Please enter product title.');
        return;
      }

      // 变体数组
      if ($scope.store.TYPE !== 'ebay') {
        $scope.variantArr.forEach(function (ele, i) {
          options.push({
            'name': ele == '' ? 'DEFAULT' : ele,
            "values": []
          })
        })
        $scope.variants.forEach(function (ele, i) {
          varlist.push({
            "id": ele.id,
            "option1": ele.variantArr[0],
            "option2": ele.variantArr.length >= 2 ? ele.variantArr[1] : null,
            "option3": ele.variantArr.length == 3 ? ele.variantArr[2] : null,
            "price": ele.price,
            "sku": ele.sku,
            "grams": ele.weight,
            "image": ele.img
          })

          if ($scope.store.TYPE == 'Lazada') {
            if ($scope.skuList) {
              $scope.skuList.forEach(e => {
                varlist[i][e.name] = ele[e.name]
              });
            }
            varlist[i].weight = ele.weight,
              varlist[i].length = ele.STANDARD[0],
              varlist[i].width = ele.STANDARD[1],
              varlist[i].height = ele.STANDARD[2]
          }
          for (var j = 0; j < ele.variantArr.length; j++) {
            if(options[j]){
              options[j].values.push(ele.variantArr[j]);
              options[j].values = options[j].values.filter(function (ele, index, self) {
                return self.indexOf(ele) === index;
              })
            }
          }
          let res = {}
          let finalRes = []
          for (let i = 0; i < varlist.length; i++) {
            if(!res[varlist[i].id]) res[varlist[i].id] = varlist[i];
          }
          for (item in res) {
            finalRes.push(res[item])
          }
          varlist = finalRes
        });
      }
      if (varlist.length <= 0) {
        layer.msg('Please select a product to list.');
        return;
      }
      if (imagesList.length <= 0) {
        layer.msg('Please select a product photo.');
        return;
      }

      if (varlist.length > 100) {
        layer.msg('Only available with 99 variants.');
        return;
      }

      if ($scope.taps.length > 29) {
        layer.msg('Only available with 30 tags.');
        return;
      }

      unique(varlist, 'sku')

      function unique(arr, u_key) {
        let map = new Map();
        $scope.skuFlag = true;
        arr.forEach((item, index) => {
          if (!map.has(item[u_key])) {
            map.set(item[u_key], item)
          } else {
            $scope.skuFlag = false;
          }
        })
        return [...map.values()]
      }

      if (!$scope.skuFlag) {
        console.log(varlist);
        layer.msg('SKU cannot be the same.')
        return;
      }

      for (var i = 0; i < varlist.length; i++) {
        if (!varlist[i].price) {
          layer.msg('Please input your store price.')
          return;
        }
        if (!varlist[i].sku) {
          layer.msg('Please enter SKU.')
          return;
        }
        // if($scope.store.TYPE !== 'ebay') {
        //   if ($scope.variantArr.length == 1) {
        //     if (!varlist[i].option1) {
        //       console.log('1111');
        //       layer.msg('Please enter product attribute.')
        //       return;
        //     }
  
        //   }
        //   if ($scope.variantArr.length == 2) {
        //     if (!varlist[i].option1 || !varlist[i].option2) {
        //       console.log('2222');
        //       layer.msg('Please enter product attribute.')
        //       return;
        //     }
        //   }
        //   if ($scope.variantArr.length == 3) {
        //     if (!varlist[i].option1 || !varlist[i].option2 || !varlist[i].option3) {
        //       console.log('33333');
        //       layer.msg('Please enter product attribute.')
        //       return;
        //     }
        //   }
        // }
        if ($scope.store.TYPE == 'Lazada') {
          // 判断Lazada给的变体项是否已全部选择/属性组合是否重复
          if ($scope.skuList && $scope.skuList.length > 0) {
            for (const item of $scope.skuList) {
              if (!varlist[i][item.name]) {
                return layer.msg(`Please select ${item.label}`)
              }
              let skuList = varlist.filter(_ => _[item.name])
              let regroup = []
              skuList.forEach(_ => {
                let str = ''
                $scope.skuList.forEach(item => {
                  str += _[item.name]
                });
                // 
                regroup.push(str)
              });
              // 
              if ((new Set(regroup)).size != regroup.length) {
                return layer.msg("sales properties duplicate")
              }
            }
          }
          // lazada尺寸和重量判断
          // 
          if (varlist[i].weight > 20000) {
            return layer.msg('The weight must not exceed 20 kg.');
          } else if (!varlist[i].weight) {
            return layer.msg('Please fill in the weight.');
          }
          if (!varlist[i].length || !varlist[i].width || !varlist[i].height) {
            return layer.msg('Please fill in the size.');
          }
          let sum = (+varlist[i].length) + (+varlist[i].width) + (+varlist[i].height);
          // 
          if (sum > 3000) {
            return layer.msg('The sum of length, width and height should not be more than 3000 cm.');
          }
        }
      }

      // 判断Others中的必选项有没有选值 --lazada
      if ($scope.store.TYPE == 'Lazada' && $scope.normalList && $scope.normalList.length > 0) {
        for (let i = 0; i < $scope.normalList.length; i++) {
          if (!$scope.normalList[i].key) {
            // 判断是否为brand
            if ($scope.normalList[i].name === 'brand') {
              $scope.normalList[i].key = {
                name: 'No Brand',
                name_en: "No Brand"
              }
            } else {
              $scope.data = {
                current: "6"
              };
              return layer.msg(`Please select ${$scope.normalList[i].label}`);
            }
          }
        }
      }

      // 判断Others中的必选项有没有选值 --shopee
      if ($scope.store.TYPE == 'shopee' && !!$scope.requiredAttr) {
        for (let i = 0; i < $scope.comboBoxAttr.length; i++) {
          if (!$scope.comboBoxAttr[i].value) {
            $scope.data = {
              current: "6"
            };
            return layer.msg(`Please select ${$scope.comboBoxAttr[i].attribute_name}`);
          }
        }
        for (let i = 0; i < $scope.textAttr.length; i++) {
          if (!$scope.textAttr[i].value) {
            $scope.data = {
              current: "6"
            };
            return layer.msg(`Please fill in the ${$scope.textAttr[i].attribute_name}`);
          }
        }
        if (!$scope.shopeeLogisticItem) {
          $scope.data = {
            current: "6"
          };
          return layer.msg('Please specify a shipping method');
        }
        if (!$scope.shopeeWeight) {
          $scope.data = {
            current: "6"
          };
          return layer.msg('Please fill in the weight');
        }
        if (!$scope.shopeeLength) {
          $scope.data = {
            current: "6"
          };
          return layer.msg('Please fill in the length');
        }
        if (!$scope.shopeeWidth) {
          $scope.data = {
            current: "6"
          };
          return layer.msg('Please fill in the width');
        }
        if (!$scope.shopeeHeight) {
          $scope.data = {
            current: "6"
          };
          return layer.msg('Please fill in the height');
        }
        if ($scope.shopeeLogisticItem && $scope.shopeeLogisticItem.fee_type === 'SIZE_SELECTION' && !$scope.logisticsSize) {
          $scope.data = {
            current: "6"
          };
          return layer.msg('Please specify a logistics size')
        }
        if ($scope.shopeeLogisticItem && $scope.shopeeLogisticItem.fee_type === 'CUSTOM_PRICE' && !$scope.logisticsShipingfee) {
          $scope.data = {
            current: "6"
          };
          return layer.msg('Please fill in the shipping fee');
        }
      }

      // shopee站点预售-提示
      if ($scope.store.TYPE == 'shopee' && $scope.store.countryCode) {
        if ($scope.store.countryCode == 'TH' || $scope.store.countryCode == 'ID') {
          // shopee泰国及印尼站点选择预售-提示
          if ($scope.isPreOrder == '1') {
            $scope.yushouLayer = 1;
          } else {
            // shopee泰国及印尼站点选择现售-直接提交
            let listData = getListData();
            sendListPost(listData);
          }
        } else {
          // 非shopee泰国及印尼站点默认预售-提示
          $scope.yushouLayer = 1;
        }
      } else {
        let listData = getListData();
        sendListPost(listData);
      }

      // 物流

      function getListData() {
        let listData = [];
        listData = {
          "title": $scope.commodityDetails.NAMEEN,
          "tags": $scope.taps,
          "body_html": editor.$txt.html(),
          "shopId": $scope.store.ID,
          "pid": $scope.commodityDetails.ID,
          "images": imagesList,
          'logistics': $scope.shipitem || '',
          "variants": varlist,
          "options": options,
        }

        const {
          TYPE,
          MarketplaceUrl,
        } = $scope.store

        if (/etsy|wix/i.test(TYPE)) {
          // do etsy wix 获取请求参数
          const images = [] 
          for(let i = 0; i < imagesList.length; i++) {
              const src = imagesList[i].src || ''
              if(i < 5) {
                  images.push({ isCheck: true, url: src })
              }
          }
          
          const variants = []
          for(let i=0; i < varlist.length; i++) {
              const variant = varlist[i]
              const oldVariant = $scope.listArr.find(_ => _.id === variant.id || _.ID === variant.ID || _.id === variant.ID || _.ID === variant.id)
              let variantKey = []
              if(variant.option1) variantKey.push(variant.option1)
              if(variant.option2) variantKey.push(variant.option2)
              if(variant.option3) variantKey.push(variant.option3)
              const options = []
              for(let i=0; i < variantKey.length; i++) {
                  options.push({
                      optionName: $scope.variantArr[i],
                      optionValue: variantKey[i]
                  })
              }

              variants.push({
                  image: variant.IMG || variant.img || variant.image,
                  inventoryCount: variant.inventory || 0,
                  sku: variant.SKU || variant.sku,
                  weight: oldVariant.WEIGHT || oldVariant.weight,
                  options,
                  price: variant.sellPrice || variant.price,
                  variantId: variant.id || variant.ID,
                  // variantTitle: '', // 后端自己查
              })
          }

          const { ID:productId, DESCRIPTION: productDescription, BIGIMG: bigImg, NAMEEN: productTitle, PRODUCTTYPE:productType } = $scope.commodityDetails
          listData = {
            shopId: $scope.store.ID,
            images,
            bigImg,
            logisticsWay: $scope.shipitem || '',
            productDescription,
            productId,
            productOptionName: $scope.variantArr.join('-'),
            productTitle,
            productType,
            tags: $scope.taps.join(','),
            variants,
            defaultArea: $scope.seleWare ? $scope.seleWare.areaId : ''
          }

          return listData
        }

        if(TYPE == 'Lazada' && MarketplaceUrl === 'cb') {
          listData.listType = $scope.publishedMethod
          if ($scope.publishedMethod === 'GSP') {
            const venturesReq = getLazadaVenReq()
            if (venturesReq) {
              listData.ventures = venturesReq
            }
          }
        }

        if ($scope.store.TYPE == 'shopify') {
          listData["taxable"] = $scope.taxable ? '1' : '0';
          listData.collectionId = $scope.collectionId ? $scope.collectionId : '';
        }

        if ($scope.store.TYPE == 'Lazada' || $scope.store.TYPE == 'shopee') {
          listData.areaId = $scope.seleWare.areaId;
          //汇率转换：源货币
          listData.fromCode = $scope.CurrencyCode;
          //汇率转换：需要转换成的货币。转换的货币类型按店铺国家决定
          listData.toCode = replaceCountry(($scope.store.ThemeId || $scope.store.MarketplaceUrl || $scope.lazadaCountry) ?
            ($scope.store.TYPE == 'shopee' ? $scope.store.ThemeId : $scope.store.TYPE == 'Lazada' && $scope.store.MarketplaceUrl != 'cb' ? $scope.store.MarketplaceUrl : $scope.lazadaCountry) : '')

          function replaceCountry(params) {
            let currency = '';
            if (/sg/i.test(params)) {
              currency = 'SGD'
            } else if (/my/i.test(params)) {
              currency = 'MYR'
            } else if (/id/i.test(params)) {
              currency = 'IDR'
            } else if (/th/i.test(params)) {
              currency = 'THB'
            } else if (/ph/i.test(params)) {
              currency = 'PHP'
            } else if (/vn/i.test(params)) {
              currency = 'VND'
            } else if (/tw/i.test(params)) {
              currency = 'TWD'
            } else if (/BR/i.test(params)) {
              currency = 'BRL'
            }
            return currency;
          }
        }

        if ($scope.store.TYPE == 'Lazada') {
          listData.product_type = $scope.lzdCategoryId;
          listData.country = $scope.lazadaCountry;

          listData.attribute = [];
          $scope.normalList.forEach(e => {
            listData.attribute.push({
              name: e.name,
              attributeType: e.attribute_type,
              options: e.key.name_en || e.key.name
            })
          });
          $scope.needList.forEach(e => {
            listData.attribute.push({
              name: e.name,
              attributeType: e.attribute_type,
              options: ""
            })
          });
          // 
        } else if ($scope.store.TYPE == 'shopee') {
          listData.product_type = $scope.shopeCategoryId;
          let _obj = {
            logistic_id: $scope.shopeeLogisticItem.logistic_id,
            enabled: true,
            // enabled: $scope.shopeeLogisticItem.enabled,
            // size_id: $scope.logisticsSize.size_id
          }
          if ($scope.shopeeLogisticItem.fee_type === 'SIZE_SELECTION') {
            _obj = { ..._obj, size_id: $scope.logisticsSize.size_id }
          }
          if ($scope.shopeeLogisticItem.fee_type === 'CUSTOM_PRICE') {
            _obj = { ..._obj, shipping_fee: +$scope.logisticsShipingfee, is_free: +$scope.logisticsShipingfee === 0 }
          }
          listData.shopeeLogistics = [_obj];

          listData.attributes = [];
          for (let i = 0; i < $scope.comboBoxAttr.length; i++) {
            listData.attributes.push({
              attributes_id: $scope.comboBoxAttr[i].attribute_id,
              value: $scope.comboBoxAttr[i].value
            })
          }
          for (let i = 0; i < $scope.textAttr.length; i++) {
            listData.attributes.push({
              attributes_id: $scope.textAttr[i].attribute_id,
              value: $scope.textAttr[i].value
            })
          }

          listData.weight = $scope.shopeeWeight;
          listData.package_length = $scope.shopeeLength;
          listData.package_width = $scope.shopeeWidth;
          listData.package_height = $scope.shopeeHeight;

          // shopee泰国及印尼站点-预售相关参数
          if ($scope.store.countryCode == 'TH' || $scope.store.countryCode == 'ID') {
            if ($scope.isPreOrder == '1') { // 预售
              listData.isPreOrder = true;
            }
            if ($scope.isPreOrder == '0') { // 现售
              listData.isPreOrder = false;
            }
          } else {
            listData.isPreOrder = true; // 其他东南亚站点默认预售
          }

        } else {
          listData["product_type"] = $scope.category1 ? $scope.category1.name : '';
        }
        listData.defaultArea = $scope.seleWare ? $scope.seleWare.areaId : '';
        if ($scope.store.TYPE == 'ebay') {
          listData.siteCode = $scope.ebayCountry
          listData.currencyCode = $scope.ebayCurrency
          listData.shippingService = $scope.othersParam.shippingMethods.shippingService
          listData.shippingServiceType = $scope.othersParam.shippingMethods.serviceType
        }
        return listData;
      }

      $scope.confirmList = function () {
        $scope.yushouLayer = 0;
        let listData = getListData();
        sendListPost(listData);
      }




      function sendListPost(getlistdata) {
        $scope.listingLoading = true;
        // 刊登请求
        var postData;
        var postURL;

        if (/shopify/i.test($scope.store.TYPE)) {
          postURL = 'listed_products/listedLocproduct/listProductEdit';
          postData = getlistdata;
        } else if (/ebay/i.test($scope.store.TYPE)) {
          postURL = 'ebay/addEbayProuctNew';
          if ($scope.specificslist.length > 0 && !$scope.specificslist.variationSpecifics && $scope.specificslist[0].name != 'MPN') {
            $scope.specificslist.forEach(item => {
              item.value = $scope.othersParam[item.name];
            })
          }
          postData = Object.assign(
            getlistdata, {
            categorySpecifics: $scope.specificslist,
            categroy: $scope.ebayCategoryName || '', // 最后一级菜单名称
            categroyId: $scope.ebayCategoryID || '', // 最后一级菜单ID
            categroys: $scope.ebayCategoryArrayID,
            upc: $scope.requiredCode.UPC,
            ean: $scope.requiredCode.EAN,
            isbn: $scope.requiredCode.ISBN,
            email: $scope.othersParam.paypalAccount,
          });

        } else if (/Woocommerce/i.test($scope.store.TYPE)) {
          postURL = 'woo/listingNew';
          postData = getlistdata;
          postData.userName = localStorage.getItem('UserName') || '';
          const scoreList = getComments()
          if (scoreList) {
            postData.scoreList = scoreList
          }
        } else if (/lazada/i.test($scope.store.TYPE)) {
          postURL = 'lazada/product/createProductByUpd';
          postData = getlistdata;
        } else if (/shopee/i.test($scope.store.TYPE)) {
          postURL = 'shopee/product/createProductByUpd';
          postData = getlistdata;
        } else if (/(etsy|wix)/i.test($scope.store.TYPE)) {
          // do etsy wix 发送请求配置
          postURL = 'platform-product/publish/publishProduct'
          postData = getlistdata;
        }

        // var loadLayer = layer.open({
        //   area: ['320px', '150px'],
        //   // time:1000,
        //   title: null,
        //   closeBtn: 0,
        //   btn: [],
        //   shadeClose: false,
        //   skin: 'loader-layer',
        //   shade: [0.01, '#000'],
        //   content: '<div><img style="display: block; margin: 30px auto;" src="./static/image/public-img/loading-2.gif" alt="" /><p style="text-align: center; font-size: 12px; margin-top: 10px;">Please wait as this may take a few minutes. </p></div>'
        // });

        $scope.listFail = {} // 存储异常
        dsp.postFun(postURL, postData, function (data) {
          // layer.close(loadLayer);
          $scope.listingLoading = false;
          var data = data.data;
          if (/Woocommerce/i.test($scope.store.TYPE) && data.code === '200') {
            $scope.merchInStore = data.result;
            $scope.listSuccLayer = 1;
            var parms = {
              type: '0',
              pid: that.parentscope.detailId,
              userid: $scope.userId
            }
            dsp.postFun('erp/publish/Calculation', parms, function () { })
            return
          }
          if (/(etsy|wix)/i.test($scope.store.TYPE) && data.code == '200') {
            // do etsy wix 刊登成功
            $scope.listSuccLayer = 1;
            return
          }
          if (data.statusCode == 801) {
            // 刊登成功+关联成功
            // _this.onClose();
            if ($scope.store.TYPE == 'Lazada') {
              $scope.merchInStore = `https://sellercenter.lazada.co.${$scope.store.MarketplaceUrl != 'cb' ? $scope.store.MarketplaceUrl : $scope.lazadaCountry}/product/portal/index`;
            }
            if ($scope.store.TYPE == 'shopee') {
              $scope.merchInStore = 'https://seller.my.shopee.cn/portal/product/list/active';
            }
            if ($scope.store.TYPE == 'shopify' || $scope.store.TYPE == 'shopify' || $scope.store.TYPE == 'ebay') {
              $scope.merchInStore = data.result;
            }
            $scope.listSuccLayer = 1;
            var parms = {
              type: '0',
              pid: that.parentscope.detailId,
              userid: $scope.userId
            }
            dsp.postFun('erp/publish/Calculation', parms, function () { })
            return
          }

          // 开始处理异常
          $scope.listFail.code = data.statusCode;
          if (/Woocommerce/i.test($scope.store.TYPE)) { // Woocommerce返回的状态码变成code了
            $scope.listFail.code = data.code;
          }
          if (data.statusCode == 805) {
            // 失败-重复刊登
            $scope.listFail.message = "The product already existed in this store, please don't repeat."
          } else if (
            /Woocommerce/i.test($scope.store.TYPE) && (data.code == 403 || data.code == 803)
          ) {
            $scope.listFail.message = data.message;
          } else if (/ebay/i.test($scope.store.TYPE)) {
            if (data.statusCode === '803') {
              $scope.listFail.message = data.message;
            }
            if (data.statusCode === '1008') {
              // 失败-超过限制（ebay）
              $scope.listFail.message = data.message;
            }
            if (data.statusCode === '812') {
              $scope.listFail.message = `<div style=\'margin-bottom: 10px;\'>Exceed Monthly Limits.</div><div>The listing amount exceeds the number of items on eBay. You can list up to ${data.result.quantityLimit} more items and ${data.result.currencySymbol}${data.result.amountLimit} more in total sales this month. But now you are listing up ${data.result.quantity} items and ${data.result.currencySymbol}${data.result.totalPrice} sales.</div><div>Please consider reducing the quantity or Increase Listing Quantities.</div><div>Refer to: <a target=\'_blank\' href=\'https://app.cjdropshipping.com/blog/post/1308656671244914690\'>How to Increase Listing Quantities on eBay?</a></div>`
            }
            if (data.statusCode === '209') {
              $scope.listFail.message = '<div>Authorization failure.</div><div>Please log in to your eBay account and authorize to CJ again.</div><div>Refer to: <a target=\'_blank\' href=\'https://app.cjdropshipping.com/blog/post/how-to-connect-your-ebay-store-to-cj-dropshipping-app?\'>How to authorize your eBay store to CJ?</a></div>';
            }
          } else if (
            /shopify/i.test($scope.store.TYPE) && data.statusCode == 804
          ) {
            // 刊登成功，关联失败
            $scope.printProFlag = false;
            $scope.merchInStore = data.result;
            $scope.manualConLayer = 1;
          } else if (data.statusCode == 505) {
            // lazada/shoppee用
            if ($scope.store.TYPE == 'Lazada') {
              $scope.listFail.message = data.message;
            } else if ($scope.store.TYPE == 'shopee') {
              const obj = JSON.parse(data.result);
              $scope.listFail.message = obj.msg;
            } else {
              $scope.listFail.message = 'Dear sellers, the category is currently under legal and logistic review due to the category migration. Thanks.';
            }
          } else if (data.statusCode == 209) {

            if (/shopify/i.test($scope.store.TYPE)) {
              $scope.listFail.message = "Store not Found or Authorization Failed";
            }
          } else if (data.statusCode == 401) {
            // 失败-变体数量应小于100
            $scope.listFail.message = "The number of variants should be less than 100.";
          } else if (data.statusCode == 8031) {
            $scope.listFail.message = data.message;
          } else {
            $scope.listFail.code = 'other';
            $scope.listFail.message = 'Ѕоrrу, the product list failed, please try again or contact your agent.';
          }
        },
          function (err) {
            // layer.close(loadLayer);
            $scope.listingLoading = false;
            $scope.listFail.code = 'fail';
            $scope.listFail.message = 'The server is busy now. Please try it later. ';
          });
      }



      // 重新授权-目前只支持shopify
      $scope.reAuthorize = function () {
        if (/shopify/i.test($scope.store.TYPE)) {
          var reAddStoreData = {};
          reAddStoreData.userId = $scope.userId;
          reAddStoreData.token = $scope.token;
          reAddStoreData.data = JSON.stringify({
            id: $scope.store.ID,
            name: $scope.store.NAME,
            type: $scope.store.TYPE
          })
          const msgLoading = cjMessage.loading({ isFixed: true });
          dsp.postFun('app/shop/update', JSON.stringify(reAddStoreData), function (data) {
            msgLoading.hide();
            var data = data.data;
            var code = data.statusCode;
            if (code != 200) {
              layer.msg('The server is busy now. Please try it later. ');
              return false;
            }
            // 跳转到返回的网址
            $window.location = data.result;
          }, function () {
            msgLoading.hide();
            layer.msg('The server is busy now. Please try it later. ');
          });
        }
        if (/ebay/i.test($scope.store.TYPE)) {
          dsp.postFun('ebay/againToken', JSON.stringify({
            // ID: updateItem.id,
            type: $scope.store.TYPE,
            name: $scope.store.NAME
          }), function (data) {
            // dsp.closeLoad();
            msgLoading.hide();
            var data = data.data;

            var code = data.statusCode;
            if (code != 200) {
              if (code == 207) {
                layer.msg('This store already existed and belong to one of our other users.');
              } else {
                dsp.cjMesFun(1);
              }
              return false;
            }
            // 跳转到返回的网址
            $window.location = data.result;
          });
        }
      }


      $scope.tryAgain = function () {
        $scope.listFail = null;
        let listData = getListData();
        sendListPost(listData);
      }

    }

    // cj loading动效
    function createLottieAnimation() {
      const dom = document.getElementById('listing-loading');
      if (!dom) return
      lottie.loadAnimation({
        container: dom, // the dom element that will contain the animation
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/egg/image/cj_lottie.json'// the path to the animation json
      });
    }
    createLottieAnimation();

    $scope.connectNow = function () {
      var manualConnectInfo = {};
      manualConnectInfo.storePid = $scope.merchInStore.split('/')[$scope.merchInStore.split('/').length - 1];
      manualConnectInfo.pId = that.parentscope.detailId;
      manualConnectInfo.packWeight = that.parentscope.packWeight;
      manualConnectInfo.propertyKey = that.parentscope.propertyKey;
      manualConnectInfo.shopId = shopId;
      manualConnectInfo = bs.encode(JSON.stringify(manualConnectInfo));
      window.open('myCJ.html#/products-connection/pending-connection//' + manualConnectInfo, '_blank', '');
      $scope.manualConLayer = 0;
    }

    function sortprice(price) {
      return function (a, b) {
        var value1 = a[price];
        var value2 = b[price];
        return value1 - value2;
      }
    }
    //选项卡的切换
    $scope.data = {
      current: "1"
    };
    $scope.actions = {
      setCurrent: function (param) {
        $scope.data.current = param;
        if ($scope.ebayCategoryID && $scope.isVariant) {
          if ($scope.shipitem) {
            $scope.warningTitle5 = false
          }
        }

      }
    };

    // 物流选择添加数据
    function insertShipToVariant() {

      if ($scope.commodityDetails.PRODUCTTYPE === '5') {
        for (var i = 0; i < $scope.listArr.length; i++) {
          if (weights.length == 1) {
            if (shipData[0].discount > 0) {
              $scope.listArr[i].ShippingCost = {
                discount1: 0,
                discountPrice1: shipData[0].price,
                price1: shipData[0].price
              }
            } else {
              $scope.listArr[i].ShippingCost = {
                discount1: shipData[0].discount,
                discountPrice1: shipData[0].discountPrice,
                price1: shipData[0].price
              }
            }
          } else {
            if (shipData[$scope.listArr[i].packweight][0].discount > 0) {
              $scope.listArr[i].ShippingCost = {
                discount1: shipData[$scope.listArr[i].packweight][0].discount,
                discountPrice1: shipData[$scope.listArr[i].packweight][0].discountPrice,
                price1: shipData[$scope.listArr[i].packweight][0].price
              }

            } else {
              $scope.listArr[i].ShippingCost = {
                discount1: 0,
                discountPrice1: shipData[$scope.listArr[i].packweight][0].price,
                price1: shipData[$scope.listArr[i].packweight][0].price
              }
            }
          }
          $scope.listArr[i].DropshippingPrice = ($scope.listArr[i].ShippingCost.price1 + Number($scope.listArr[i].CJPrice)).toFixed(2);
        }
      } else {
        for (let v = 0; v < $scope.listArr.length; v++) {
          for (let l = 0; l < newLogistic.length; l++) {
            if ($scope.listArr[v].sku === newLogistic[l].sku) {
              if(newLogistic[l].discount === "0.0") {
                newLogistic[l].discount = 0
              }
              $scope.listArr[v].ShippingCost = {
                discount1: newLogistic[l].discount || 0,
                discountPrice1: newLogistic[l].discountPrice,
                price1: newLogistic[l].price
              }

            }
          }

          const price1 = $scope.listArr[v].ShippingCost.price1 || 0;
          const CJPrice = $scope.listArr[v].CJPrice || 0;
          const totalPrice = parseFloat(price1) + parseFloat(CJPrice);
          $scope.listArr[v].DropshippingPrice = totalPrice.toFixed(2);
        }
      }
    }

    function resetPriceList() {
      for (let v = 0; v < $scope.listArr.length; v++) {
        $scope.listArr[v].ShippingCost = null;
        $scope.listArr[v].DropshippingPrice = undefined;
      }
    }

    function insertInventoryToVariant(inventoryObj) {
      $scope.listArr.forEach(function (item) {
        item.inventory = inventoryObj[item.id];
      })
    }

    // shopify和Woocommerce新建类目
    $scope.newCategory = () => {
      if (!$scope.category1) return layer.msg("Please input the new category.");
      if ($scope.category1) {
        $scope.categoryList.push({
          name: $scope.category1
        })
        $scope.categoryType = 'select';
        $scope.vendorType = 'select';
      }
    }

    $scope.newVendor = () => {
      if (!$scope.vendor) return layer.msg("Please enter the new vendor.");
      if ($scope.vendor.length > 30) return layer.msg("vendor cannot exceed 30 characters.");
      if ($scope.vendor) {
        if (!$scope.vendorList) {
          $scope.vendorList = []
        }
        $scope.vendorList.push($scope.vendor)
        $scope.vendorType = 'select';
        $scope.categoryType = 'select';
      }
    }

    // YourPrice切换货币
    $scope.selectCurrCode = () => {
      // 切换置空
      if ($scope.listArr) {
        $scope.listArr.forEach(e => {
          e.price = '';
          e.currencyUnit = '';
          e.rateConverted = '';
        });
      }
    }

    /** 添加价格时要干的事情... start===================================================================================================================*/
    var priceTimer;
    $scope.addPrice = (currency, price, item) => {

      if(!(/^\d{1,8}(\.\d{0,2})?$/.test(price))) {
        layer.msg('99,999,999.99 at most.');
        item.price = '';
      }
      
      // 汇率实时转换
      clearTimeout(priceTimer);
      if (currency == 'USD' || !price) {
        item.rateConverted = null;
        return false;
      }
      priceTimer = setTimeout(() => {
        // 
        dsp.getFun(`lazada/shop/getRate?fromCode=${currency}&money=${price}&toCode=USD`, function (res) {
          // 
          item.rateConverted = res.data;
        });
      }, 2000);

      // shopee和lazada输入价格时按国家显示货币单位(目前只做泰国)
      if ($scope.CurrencyCode && $scope.CurrencyCode == 'THB' && $scope.store && ($scope.store.ThemeId == 'TH' || $scope.store.MarketplaceUrl == 'th' || $scope.lazadaCountry == 'th')) {
        if (item.currencyUnit && price) return false;
        // 
        // 
        if (price) return item.currencyUnit = '฿';
        if (!price) return item.currencyUnit = null;
      }
    }

    $scope.addQuantity = (quantity, inventory, item) => {

      if (Number(quantity) > Number(inventory)) {
        layer.msg(`The quantity should not exceed ${inventory}`)
        item.quantity = 0;
      }
    }
    // 批量修改价格时的汇率转换
    function bulkrateConvert(currency, price, array) {

      if (currency == 'USD' || !price || array.length <= 0) {
        array.forEach(item => item.rateConverted = null);
        return false;
      }
      dsp.getFun(`lazada/shop/getRate?fromCode=${currency}&money=${price}&toCode=USD`, function (res) {

        array.forEach(item => item.rateConverted = res.data);
      });
    }
    /** 添加价格时要干的事情... end===================================================================================================================*/

    /**
     * rutter 变体属性小于三个可以刊登
     */
    function rutterNotAllowThreeOption() {
      const variantKeys = $scope.variantArr
      if(variantKeys.length >= 3) $scope.rutterNotAllowModal = true
      return variantKeys.length >= 3
    }

    $scope.maxRutterProTitleLen = 80 // rutter商品title最长限制
    $scope.isRutter = () => {
      if(!$scope.store || !$scope.store.TYPE) return false
      return /(wix|etsy)/i.test($scope.store.TYPE)
    }
  }


})(angular)
