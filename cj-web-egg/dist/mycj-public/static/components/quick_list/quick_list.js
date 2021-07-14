; (function (angular) {
    angular.module('cjCompnentModule')
        .component('quickList', {
            templateUrl: './static/components/quick_list/quick_list.html',
            controller: quickListCtrl,
            bindings: {
                // designpid: '=',
                // showflag: '=',
                parentscope: '=',
                onLog: '&'

            },
            
            // controllerAs: 'ctrl',
        })
   
    function quickListCtrl($scope, $timeout, dsp, cjhome, utils, $filter, $window) {

        const API = {
          commentsUrl:"platform-product/comment/countCrawlerComment", // 查看该商品是否有评论
        }

        let bs = new Base64()
        $scope.userId = localStorage.getItem('userId') == undefined ? "" : bs.decode(localStorage.getItem('userId'));
        $scope.fromType = dsp.getQueryString('fromType') || '';
        $scope.push_id = dsp.getQueryString('push_id') || '';
        $scope.id = dsp.getQueryString('id') || '';

        var that = this;
        
        $scope.parentscope = that.parentscope;
        $scope.podProduct = that.parentscope.podProduct;
        $scope.productDetailId = that.parentscope.productdetail.ID
        $scope.shopItem = null;
        $scope.vendorList = []
        $scope.taxable = false;
        $scope.check_All = false;

        $scope.notAllowed = false; // 是否可以立即刊登

        $scope.inputTag = '' // 输入的tag
        $scope.rutterTags = [] // etsy wix 必填字段tags
        $scope.delRutterTags = (_) => {
            const list = $scope.rutterTags
            for(let i=0; i < list.length; i++) {
                if(_ === list[i]) {
                    $scope.rutterTags.splice(i, 1)
                    break
                }
            }
        }
        $scope.addRutterTags = function() {
            const val = $scope.inputTag
            const list = $scope.rutterTags
            if(val) {
                if(val.length > 255) return 
                if(list.length >= 7) return layer.msg('7 tags at most.')
                for(let i=0; i < list.length; i++) {
                    if(val === list[i]) return
                }
                $scope.rutterTags.push(val.trim())
                $scope.inputTag = ''
            }
        }
        $scope.handleTagKeyup = function(event) {
            if(event.keyCode == 13) {
                $scope.addRutterTags()
            }
        }

        /* imp-review 组件参数 */ 
        $scope.isImport = "1"
        $scope.starPool = {
          five:false,
          four:false,
          three:false,
          two:false,
          one:false,
        } 
        $scope.showReviews = false;
        let attributesList = []; // 属性集合

        // 批量价格金额限制
        $scope.handlePriceChange = (value) => {
            if($scope.bulkRevise == 'price') {
                const price = value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.').replace(/^[0]*/,'').replace(/^\./,'0.');
                const arr = price.split('.');
                if(arr[0] && arr[0].length > 8) arr[0] = arr[0].slice(0,8);
                if(arr[1] && arr[1].length > 2) arr[1] = arr[1].slice(0,2);
                $scope.bulkReviseValue = arr.join('.')
            }
        }

        // 选择物流时展示的参数
        $scope.shipMethodTime = '';
        $scope.shipMethodCost = '';
        $scope.shipMethodInfo = '';

        // 获取评价的统计接口，没有值则不展示评论
        function getCanReviews() {
          const url = API.commentsUrl
          const id = $scope.parentscope.detailId
          $scope.showReviews = false
          dsp.getFun(`${url}?productId=${id}`, (res) => {
            const { data } = res
            if(data.code == 200){
              if(data.data){
                $scope.showReviews = true
              }
            } 
            
          }, (err) => {

          })
        }
        /* imp-review end */

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
                    $scope.tempStanProducts[index][name] = '';
                    attributesList[index][name] = '';
                    return false;
                }
                
            }
        }

        /* ebay站点 start */
        $scope.ebayCountryList = [] // 站点列表
        $scope.ebayCountry = "" // 选择的站点

        $scope.ebayCurrencyList = []  // ebay货币列表
        $scope.ebayCurrency = ""  // 选择的货币 

        $scope.ebayShipList =[] // ebay物流列表
        $scope.ebayShip = ""  // 选择的ebay物流 { serviceType:string, shippingDescription:string, shippingService: string}

        $scope.limitSymbol = "" // 限制金额

        $scope.platform = "EBAY"

        //显示Shipping Methods on eBay下拉框
        $scope.showOtherSelect = false
        /* 全局方法 */ 
        $scope.selectEbayCountry = selectEbayCountry  

        function getEbayCountry(){
          if(!$scope.shopItem){
            return  
          }
          const shopId = $scope.shopItem.ID
          const msgLoading = cjMessage.loading({ isFixed: true })
          dsp.getFun(`platform-shop/country/queryCountryList?platform=${$scope.platform}&shopId=${shopId}`, function (res) {
            msgLoading.hide();
            const data = res.data;
            if(data.code===200){
              $scope.ebayCountryList = data.data
              getEbayDefaultCountry(data.data)
            }else{
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
        function getEbayDefaultCountry(ebayCountryList){
          const list = ebayCountryList
          let defaultCountry = list[0].countryCode
          list.map((item) => {
            if(item.registeredCountry){
              defaultCountry = item.countryCode
            }
          })
          $scope.ebayCountry = defaultCountry
          selectEbayCountry(defaultCountry)
        }

        /* 选择站点事件 */
        function selectEbayCountry(ebayCountry){
            $scope.displayScrollBtn = false;
            $scope.eBayAttr = []
            $scope.variationTrue = []
            // init
            $scope.ebayCurrencyList = []
            $scope.ebayCurrency = "" 
            $scope.ebayShipList =[]
            $scope.ebayShip = ""
            $scope.ebayMenus = $scope.ebayMenus.slice(0, 1);
            getEbayCurrency(ebayCountry)
            getShipLimit(ebayCountry)
            getEbayType();
        } 

        /* 获取币种 */
        function getEbayCurrency(ebayCountry){
          let list = []
          $scope.ebayCountryList.map((item) => {
            if(item.countryCode===ebayCountry){
              list = item.currencyList
            }
          })
          $scope.ebayCurrencyList =list
          $scope.ebayCurrency = list[0].currencyCode
          $scope.getEbayLimit();
        } 

        /* 获取ebay的物流 */ 
        function getShipLimit(ebayCountry){
          if(!$scope.shopItem){
            return
          }
          $scope.ebayOthersParam.paypalAccount = $scope.shopItem.email;
          const shopId = $scope.shopItem.ID
          const siteCode = ebayCountry
          const msgLoading = cjMessage.loading({ isFixed: true })
          dsp.getFun(`platform-shop/logistics/queryLogisticsList?platform=${$scope.platform}&shopId=${shopId}&siteCode=${siteCode}`, function (res) {
            msgLoading.hide();
            const data = res.data;
            $scope.siteData = data.data
            if(data.code===200){
              $scope.ebayShipList = data.data
              handleShipList()
            }else{
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

        /* 获取ebay店铺限额 */
        $scope.getEbayLimit = ()=>{
          dsp.getFun(`ebay/refreshEbayLimit?id=${$scope.shopItem.ID}&name=${$scope.shopItem.NAME}`, function (res) {
            const {result} = res.data
            if(result){
              $scope.limitSymbol =result.currencySymbol
              $scope.ebayObj={
                limitCount:result.quantityLimit,
                limitAmount:result.amountLimit,
              }
            }else{
              $scope.ebayObj={
                limitCount:0,
                limitAmount:0
              }
              $scope.limitSymbol = ""
            }
          });
        }

        /** 获取ebay店铺类目 */
        function getEbayType(categoryID, i = -1) {
          const countryCode = $scope.ebayCountry || ""
          const msgLoading = cjMessage.loading({ isFixed: true });
          const url = `platform-product/category/getChildCategoryList?categoryId=${categoryID?categoryID:'0'}&countryCode=${countryCode}&platform=${$scope.platform}`
          dsp.getFun(url, res => {
            msgLoading.hide();
            const {data} = res;
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
          const msgLoading = cjMessage.loading({ isFixed: true });
          const categoryId = categoryID || ""
          const shopId = $scope.shopItem.ID || ""
          const siteCode = $scope.ebayCountry || ""
          const url = `platform-product/category/getCategoryFeatureList?categoryId=${categoryId}&shopId=${shopId}&siteCode=${siteCode}&platform=${$scope.platform}`
          dsp.getFun(url, res => {
            msgLoading.hide();
            const { data } = res;
            if (data.code == 5000) {
                return 
            }
            if(data.data.length > 0) {
                if(data.data[0].upcEnabled === 'REQUIRED') {
                    $scope.requiredCode.UPC = '';
                } 
                if(data.data[0].eanEnabled === 'REQUIRED') {
                    $scope.requiredCode.EAN = '';
                } 
                if(data.data[0].isbnEnabled === 'REQUIRED') {
                    $scope.requiredCode.ISBN = '';
                }
                $scope.isVariant = data.data[0].isVariant ? data.data[0].isVariant : ''
                
                if($scope.siteData.length > 0 && $scope.isVariant){
                    $scope.ebayOthersParam.ebayShip = $scope.ebayShip;
                }
            }
            $scope.requiredCodeLen = Object.keys($scope.requiredCode).length;
          }, function (err) {
            msgLoading.hide();
          }, {
            layer2: true
          });
        }
        //拼接Your属性
        $scope.spliceYourAttr = function() {
            let str 
            let yourAttrList = []
            for(let key in $scope.tempStanProducts) {
                str = ''
                for(let value of $scope.variationTrueName) {
                    if ($scope.tempStanProducts[key][value]) {
                        str += $scope.tempStanProducts[key][value] + '-'
                    }
                }
                yourAttrList.push(str.slice(0,-1))
            }
            $scope.eBayAttr = yourAttrList
        }
        //ebay变体列表设置默认值
        function ebayDefaultValue() {
            let list = []
            let listObj = {}
            $scope.isVosTure.forEach(itemTrue => {
              itemTrue.variantSpecificsVOS.forEach(itemVOS => {
                const {vid, optionValue} = itemVOS;
                listObj[vid] = optionValue;
              })
              list.push(listObj)
              listObj = {}
            })
            const NAME_INDEX = $scope.variationTrueNameMap;
            let yourAttr = Array.from({length: 5}, () => '')
            $scope.tempStanProducts.forEach(item => {
                $scope.isVosTure.forEach((itemTrue, index) => {
                    yourAttr[NAME_INDEX[itemTrue.name]]= list[index][item.ID];
                    itemTrue['yourAttr'] = yourAttr
                    item[itemTrue.name] = list[index][item.ID]
                })
            })
        }
        /* 多级类目获取联动 ebay */ 
        $scope.changeEbayCategory = (cata) => {
            clearOtherData();
            $scope.ebayOthersParam.paypalAccount = $scope.shopItem.email;
          $scope.variationTrue = []
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
            const shopId = $scope.shopItem.ID || ""
            const siteCode = $scope.ebayCountry || ""
            const url = `platform-product/category/getCategorySpecificsList?categoryId=${categoryId}&platform=${$scope.platform}&shopId=${shopId}&siteCode=${siteCode}&productId=${$scope.productDetailId}`
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
                let dataList = data.data
                $scope.variationTrue = []
                $scope.variationFalse = []
                if(dataList.length > 0) {
                    if(dataList[0].name == 'MPN') {
                        $scope.specificslist = dataList;

                    } else {
                        for(let i = 0; i < dataList.length; i++) {
                            if(dataList[i].variationSpecifics) {
                                if($scope.isVariant) $scope.variationTrue.push(dataList[i])
                            } else {
                                $scope.variationFalse.push(dataList[i])
                            }
                        }
                        $scope.specificslist = $scope.variationFalse
                        //your属性名入参
                        let variantkeyen = ''
                        //ebay变体your属性名
                        $scope.variationTrueName = []
                        $scope.variationTrueNameMap = {}
                        //拿到有VOS返回值的Your属性
                        $scope.isVosTure = []
                        for(let i = 0; i < $scope.variationTrue.length; i++) {
                            $scope.variationTrueNameMap[$scope.variationTrue[i].name] = i
                            variantkeyen += $scope.variationTrue[i].name + '-'
                            $scope.variationTrueName.push($scope.variationTrue[i].name)
                            if ($scope.variationTrue[i].variantSpecificsVOS.length > 0) {
                                $scope.isVosTure.push($scope.variationTrue[i])
                            }
                        }
                        $scope.variantkeyen = variantkeyen.slice(0, -1);
                        ebayDefaultValue()
                    }
                    //传入$scope.specificslist属性名到othersParam初始参数
                    for (let i = 0; i < $scope.specificslist.length; i++) {
                        $scope.ebayOthersParam[$scope.specificslist[i].name] = ''
                    }
                }
              }
            })
            getEbayCodeRuquire($scope.ebayCategoryID)
          }
          $scope.ebayCategoryArrayID.splice(index, 6-index, cataInfo.categoryId)
        }


        /* ebay站点 end */  

        /* lazada全球站点选择 */
        $scope.lazadaStationList = []
        $scope.showLazadaStation = false
        $scope.publishedMethod = "ASC"

        $scope.selectPublishedMethod = () => {
            $scope.displayScrollBtn = false;
            if($scope.publishedMethod === 'GSP'){
                $scope.lazadaStationList =  $scope.lazadaStationList.map((item) => {
                    item.checked = true;
                    return item
                })
                $scope.showLazadaStation = true
                $scope.lazadaCountry = 'my'
                getLazadaCategory(function (data){
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
            
            // clear tags
            $scope.rutterTags = []
            $scope.inputTag = ''
        }

        // 获取站点选择的列表
        function getLazadaStationList() {
            const url = `platform-shop/country/queryCountryList?platform=LAZADA`
            dsp.getFun(url, function (res) {
                const { data } = res
                if(data.code === 200) {
                    $scope.lazadaStationList = data.data
                }
            })
        }
        getLazadaStationList()

        // 获取站点多选时的请求参数
        function getLazadaVenReq() {
            const countryList = []
            $scope.lazadaStationList.map((item) =>{
                if(item.checked) {
                    countryList.push(item.countryCode) 
                }
            })

            return countryList.join(",")

        }

        /* lazada全球站点选择 END */

        function bodyScroll(event) {
            event.preventDefault();
        }
        function forbidScroll () { // 禁止滚动
            document.body.addEventListener('touchmove', bodyScroll, false);
            angular.element('body').css({ 'position': 'fixed', "width": "100%" });
            angular.element('.pd-con-wrap').css({ 'position': 'relative', 'zIndex': 101 });
        }
        function permitScroll () { // 放开滚动
            document.body.removeEventListener('touchmove', bodyScroll, false);
            angular.element("body").css({ "position": "initial", "height": "auto" });
            angular.element('.pd-con-wrap').css({ 'position': 'static', 'zIndex': 101 });
        }

        // $scope.$on('showlistframe', function (d, data) {
        //     forbidScroll();
        //     goActList(that.parentscope);
        // })

        $scope.showWuliuList = function () {
            $scope.$emit('quick-list', {
                flag: 'show-list',
                frompage: 'quick-list'
            }); 
        }
        
        $scope.cancel = function (elementId, actionType) {
            $global_tracking.pushData({
                elementId: elementId,
                actionType: actionType,
                list: [
                    {
                        fieldValue: $scope.id,
                        filedName: "productId"
                    }
                ]
            })
            $scope.showListFrame = false;
            permitScroll();
        }

        $scope.listitNowBefore = function () {
            $scope.listNow();
        };

        $scope.ebaySelectChange = (key) => {
            console.log($scope.ebayOthersParam);
            $scope.ebayOthersWarn[key] = false;
            let error = false
            for(let key in $scope.ebayOthersParam) {
                if(!$scope.ebayOthersWarn[key]) error = true
            }
            $scope.warningTitle = error;
        }
        // ebay店铺others参数初始化
        $scope.ebayOthersWarn = {
            title:false
        };
        function clearOtherData(){
            $scope.validateMSG = 0//是否需要错误填写提示
            $scope.variationTrue = []
            $scope.ebayOthersParam = {
                ebayShip: $scope.ebayShip
            }
            for(let key in $scope.ebayOthersWarn) {
                $scope.ebayOthersWarn[key] = false;
            }
        }
        clearOtherData();
        const ebayOthersValidate = () => {
            const msgObj = {
                ebayShip:'Please fill in Shipping Limits.',
                MPN:'Please fill in MPN code.',
                EAN:'Please fill in EAN code.',
                ISBN:'Please fill in ISBN code.',
                UPC:'Please fill in UPC code.',
                paypalAccount:'PayPal Account error.'
            }
            
            //操作时将未操作ebayOthersParam的值初始化
            if(!$scope.ebayOthersParam.hasOwnProperty('paypalAccount'))$scope.ebayOthersParam.paypalAccount='';
            //操作时将未操作ebayOthersParam的值初始化
            if($scope.specificslist.length>0 && $scope.specificslist[0].name == 'MPN'){
                $scope.specificslist.forEach(_i=>{
                    if(!$scope.ebayOthersParam.hasOwnProperty(_i.name)) $scope.ebayOthersParam[_i.name]=null;
                })
            }
            if($scope.requiredCodeLen > 0 && $scope.isVariant){
                for(let key in $scope.requiredCode) {
                    if(!$scope.ebayOthersParam.hasOwnProperty(key)) $scope.ebayOthersParam[key]=null;
                }
            }
            if($scope.specificslist.length>0 && !$scope.specificslist.variationSpecifics && $scope.specificslist[0].name != 'MPN'){
                $scope.specificslist.forEach(_i=>{
                    if(!$scope.ebayOthersParam.hasOwnProperty(_i.name)) $scope.ebayOthersParam[`${_i.name}`]=null;
                })
            }
            // ebay 店铺判断
            if (!$scope.ebayCategoryID || !$scope.isVariant) {
                layer.msg('Please select the category.'); // 三级类目必选
                return false;
            }
            if(!$scope.ebayCountry){
              layer.msg('Please fill in Ebay Country.');
              return false;
            }
            if(!$scope.ebayCurrency){
              layer.msg('Please fill in Price Currency.');
              return false;
            }
            for(let key in $scope.ebayOthersParam){
                if(!$scope.ebayOthersParam[key]){
                  $scope.ebayOthersWarn[key] = true;
                  if($scope.validateMSG == 1) {
                      let otherMsg = 'Please fill all Others attribute.';
                      if($scope.specificslist.length>0 && !$scope.specificslist.variationSpecifics && $scope.specificslist[0].name != 'MPN'){
                          $scope.specificslist.every(_i=>{
                              if(_i.name == key && _i.valueRecommendations.length>0) otherMsg = 'Please select all Others attribute.';
                          })
                      }
                      layer.msg(msgObj[key]? msgObj[key] : otherMsg);
                  }
                  $scope.ebayOthersWarn.title=true;
                  return false;
                } else {
                  $scope.ebayOthersWarn[key] = false;
                }
              }
              $scope.ebayOthersWarn.title=false;
            // Your属性校验
            let varVosLen = document.querySelectorAll('#varVos')
            if (varVosLen.length > 0) {
                for (let i = 0; i < varVosLen.length; i++) {
                    if (varVosLen[i].children[0].value == '') {
                        document.getElementById('vari').setAttribute('style', 'color: red')
                        varVosLen[i].children[0].setAttribute('style', 'border-color: red')
                        layer.msg('Please fill all Your attribute.')
                        return false;
                    }
                    else if (varVosLen[i].children[0].value == '?') {
                        document.getElementById('vari').setAttribute('style', 'color: red')
                        varVosLen[i].children[0].setAttribute('style', 'border-color: red')
                        layer.msg('Please select all Your attribute.')
                        return false;
                    } 
                    else {
                        document.getElementById('vari').removeAttribute('style')
                        varVosLen[i].children[0].removeAttribute('style')
                    }
                }
            }
            return true;
        }
        $scope.listNow = function () {
            if($scope.notAllowed) return false;
            if (!$scope.shopItem) {
                return layer.msg('Please select a store first.');
            }
            // 个性商品暂时只支持刊登到shopify店铺
            if (that.parentscope.podProduct && $scope.shopItem && $scope.shopItem.TYPE != 'shopify') {
                return layer.msg('Unfortunately, The POD products are only available to be listed to Shopify currently.');
            }

            if (
                /shopify/i.test($scope.shopItem.TYPE)
            ) {
                if (!$scope.category1) {
                    return layer.msg('Please select product type.');
                }
                if (!$scope.vendor) {
                    return layer.msg('Please select vendor.');
                }
            } else if (/Woocommerce/i.test($scope.shopItem.TYPE)) {
                if (!$scope.category1) {
                    return layer.msg('Please select the category.');
                }
            } else if (/ebay/i.test($scope.shopItem.TYPE)) {
                $scope.validateMSG = 1
                if(!ebayOthersValidate()) return;
            } else if ($scope.shopItem.TYPE == 'shopee') {
                if (!$scope.shopeCategoryId) {
                    return layer.msg('Please select the category.');
                }
            } else if ($scope.shopItem.TYPE == 'Lazada') {
                if (!$scope.lazadaCountry) {
                    return layer.msg('Please select the Country.');
                }
                if (!$scope.lzdCategoryId) {
                    return layer.msg('Please select the category.');
                }
            }
            if ($scope.check_All == false) {
                return layer.msg('Please select all variants');
            }
            for (let i = 0; i < $scope.tempStanProducts.length; i++) {
                if (!$scope.tempStanProducts[i].sellPrice || $scope.tempStanProducts[i].sellPrice == 0) {
                    layer.msg('Please input your store price.')
                    return;
                }

                if ($scope.shopItem.TYPE == 'Lazada') {
                    // 
                    if ($scope.tempStanProducts[i].WEIGHT > 20000) {
                        return layer.msg('The weight must not exceed 20 kg.');
                    } else if (!$scope.tempStanProducts[i].WEIGHT) {
                        return layer.msg('Please fill in the weight.');
                    }
                    let sum = 0
                    for (const size of $scope.tempStanProducts[i].STANDARD) {
                        // 
                        if (!size) {
                            return layer.msg('Please fill in the size.');
                        }
                        sum += +size;
                    }
                    // 
                    if (sum > 3000) {
                        return layer.msg('The sum of length, width and height should not be more than 3000 mm.');
                    }

                    // 判断Lazada给的变体项是否已全部选择/属性组合是否重复
                    if ($scope.skuList && $scope.skuList.length > 0) {
                        for (const item of $scope.skuList) {
                            if (!$scope.tempStanProducts[i][item.name]) {
                                return layer.msg(`Please select ${item.label}`)
                            }
                            let skuList = $scope.tempStanProducts.filter(_ => _[item.name])
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
                }
            }

            if (/(etsy|wix)/i.test($scope.shopItem.TYPE)) {
                // do etsy wix 点击刊登时
                if(rutterNotAllowThreeOption()) return
                if($scope.rutterTags.length <= 0) return layer.msg('Please fill in the Tags.')
                if($scope.rutterProTitle.length == 0 || $scope.rutterProTitle.length > $scope.maxRutterTitleLen) return $scope.proTitleMaxLenModal = true
                $scope.proTitleMaxLenModal = false
            }

            // 判断Attributes选项卡中的必选项有没有选值 --Lazada
            if ($scope.shopItem.TYPE == 'Lazada' && $scope.normalList && $scope.normalList.length > 0) {
                for (let i = 0; i < $scope.normalList.length; i++) {
                    if (!$scope.normalList[i].key) {
                        if($scope.normalList[i].name === 'brand') {
                            $scope.normalList[i].key = {
                                name:'No Brand',
                                name_en: "No Brand"
                            }
                        }else {
                            $('a[href="#others"]').tab('show')
                            return layer.msg(`Please select ${$scope.normalList[i].label}`);
                        }
                      
                    }
                }
            }

            // 判断Attributes选项卡中的必选项有没有选值 --shopee
            if ($scope.shopItem.TYPE == 'shopee' && !!$scope.requiredAttr) {
                for (let i = 0; i < $scope.comboBoxAttr.length; i++) {
                    if (!$scope.comboBoxAttr[i].value) {
                        $('a[href="#others"]').tab('show')
                        return layer.msg(`Please select ${$scope.comboBoxAttr[i].attribute_name}`);
                    }
                }
                for (let i = 0; i < $scope.textAttr.length; i++) {
                    if (!$scope.textAttr[i].value) {
                        $('a[href="#others"]').tab('show')
                        return layer.msg(`Please fill in the ${$scope.textAttr[i].attribute_name}`);
                    }
                }
                if (!$scope.shopeeLogisticItem) {
                    $('a[href="#others"]').tab('show')
                    return layer.msg('Please specify a shipping method');
                }
                if (!$scope.shopeeWeight) {
                    $('a[href="#others"]').tab('show')
                    return layer.msg('Please fill in the weight');
                }
                if (!$scope.shopeeLength) {
                    $('a[href="#others"]').tab('show')
                    return layer.msg('Please fill in the length');
                }
                if (!$scope.shopeeWidth) {
                    $('a[href="#others"]').tab('show')
                    return layer.msg('Please fill in the width');
                }
                if (!$scope.shopeeHeight) {
                    $('a[href="#others"]').tab('show')
                    return layer.msg('Please fill in the height');
                }
                if ($scope.shopeeLogisticItem && $scope.shopeeLogisticItem.fee_type === 'SIZE_SELECTION' && !$scope.logisticsSize) {
                    return layer.msg('Please specify a logistics size')
                }
                if ($scope.shopeeLogisticItem && $scope.shopeeLogisticItem.fee_type === 'CUSTOM_PRICE' && !$scope.logisticsShipingfee) {
                    return layer.msg('Please fill in the shipping fee');
                }
                
            }

            // shopee站点预售-提示
            if ($scope.shopItem.TYPE == 'shopee' && $scope.shipCountry) {
                if ($scope.shipCountry == 'TH' || $scope.shipCountry == 'ID') {
                    // shopee泰国及印尼站点选择预售-提示
                    if ($scope.isPreOrder == '1') {
                        $scope.yushouLayer = 1;
                    } else {
                        // shopee泰国及印尼站点选择现售-直接提交
                        var listData = getListData();
                        sendListPost(listData);
                    }
                } else {
                    // 非shopee泰国及印尼站点默认预售-提示
                    $scope.yushouLayer = 1;
                }
            } else {
                var listData = getListData();
                sendListPost(listData);
            }
        }

        // 小灯泡链接
        $scope.openPrompt = function() {
          window.open("https://app.cjdropshipping.com/blog/post/1308656671244914690")
        }

        function getListData () {
            var shopId = $scope.shopItem.ID;
            var seleLogistic = $scope.shipMethod;
            var listData = {};
            if (that.parentscope.podProduct) {
                listData.productType = '0';
            }
            listData.logistics = seleLogistic || '';
            listData.pid = that.parentscope.detailId;
            listData.shopId = shopId;
            
            const {
                TYPE,
                MarketplaceUrl,
            } = $scope.shopItem

            if(TYPE == 'Lazada' && MarketplaceUrl === 'cb') {
                listData.listType = $scope.publishedMethod
                if($scope.publishedMethod === 'GSP'){
                    const venturesReq = getLazadaVenReq()
                    if(venturesReq) {
                        listData.ventures = venturesReq
                    }
                }
            }
            

            if ($scope.shopItem.TYPE == 'Lazada' || $scope.shopItem.TYPE == 'shopee') {
                
                listData.areaId = $scope.areaObj.areaId;
                //汇率转换：源货币
                listData.fromCode = $scope.CurrencyCode;
                //汇率转换：需要转换成的货币。转换的货币类型按店铺国家决定
                listData.toCode = replaceCountry(($scope.shopItem.ThemeId || $scope.shopItem.MarketplaceUrl || $scope.lazadaCountry) ?
                ($scope.shopItem.TYPE == 'shopee' ? $scope.shopItem.ThemeId : $scope.shopItem.TYPE == 'Lazada' && $scope.shopItem.MarketplaceUrl != 'cb' ? $scope.shopItem.MarketplaceUrl : $scope.lazadaCountry) : '')
                function replaceCountry(params) {
                    let currency = '';
                    if (/sg/i.test(params)) {currency = 'SGD'}
                    else if (/my/i.test(params)) {currency = 'MYR'}
                    else if (/id/i.test(params)) {currency = 'IDR'}
                    else if (/th/i.test(params)) {currency = 'THB'}
                    else if (/ph/i.test(params)) {currency = 'PHP'}
                    else if (/vn/i.test(params)) {currency = 'VND'}
                    else if (/tw/i.test(params)) {currency = 'TWD'}
                    else if (/BR/i.test(params)) {currency = 'BRL'}
                    return currency;
                }
            }

            if ($scope.shopItem.TYPE == 'Lazada') {
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
            } else if ($scope.shopItem.TYPE == 'shopee') {
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
                    _obj = { ..._obj, shipping_fee: +$scope.logisticsShipingfee,  is_free: +$scope.logisticsShipingfee === 0}
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
                if ($scope.shipCountry == 'TH' || $scope.shipCountry == 'ID') {
                    if ($scope.isPreOrder == '1') { // 预售
                        listData.isPreOrder = true
                    }
                    if ($scope.isPreOrder == '0') { // 现售
                        listData.isPreOrder = false;
                    }
                } else {
                    listData.isPreOrder = true; // 其他东南亚站点默认预售
                }
            } else {
                listData.product_type = $scope.category1
            } 
            
            // etsy wix刊登接口所需所有字段
            if (/(etsy|wix)/i.test($scope.shopItem.TYPE)) {
                // do etsy 获取请求参数
                const images = [] 
                for(let i = 0; i < $scope.parentscope.merchLitImgs.length; i++) {
                    const src = $scope.parentscope.merchLitImgs[i]
                    if(i < 5) {
                        images.push({ isCheck: true, url: src })
                    }
                }
                
                const variants = []
                for(let i=0; i < $scope.tempStanProducts.length; i++) {
                    const variant = $scope.tempStanProducts[i]
                    let variantKey = variant.VARIANTKEY || variant.variantKey
                    if(variantKey) variantKey = variantKey.split('-')
                    const options = []
                    for(let i=0; i < variantKey.length; i++) {
                        options.push({
                            optionName: tempVarientKeys[i],
                            optionValue: variantKey[i]
                        })
                    }

                    variants.push({
                        image: variant.IMG || variant.img,
                        inventoryCount: variant.inventory || 0,
                        sku: variant.SKU || variant.sku,
                        weight: variant.WEIGHT || variant.weight,
                        options,
                        price: variant.sellPrice,
                        variantId: variant.id || variant.ID,
                        // variantTitle: '', // 后端自己查
                    })
                }

                listData = {
                    shopId,
                    images,
                    bigImg: $scope.parentscope.productdetail.BIGIMG,
                    logisticsWay: listData.logistics,
                    productDescription: $scope.parentscope.productdetail.DESCRIPTION,
                    productId: $scope.productDetailId,
                    productOptionName: $scope.tempVarientKeys.join('-'),
                    productTitle: $scope.rutterProTitle || '',
                    productType: $scope.parentscope.productdetail.PRODUCTTYPE,
                    tags: $scope.rutterTags.join(','),
                    defaultArea: $scope.areaObj ? $scope.areaObj.areaId : '', // 选择的发货地
                    variants
                }

                return listData
            }

            if ($scope.shopItem.TYPE == 'shopify') {
                listData.taxable = $scope.taxable ? '1' : '0';
                listData.collectionId = $scope.collectionId ? $scope.collectionId : '';
                listData.vendor = $scope.vendor;
            }
            listData.variants = {};
            
            var tempStanProducts = $scope.tempStanProducts;
            for (var i = 0; i < tempStanProducts.length; i++) {
                let variantval;
                if ($scope.shopItem.TYPE == 'ebay') {
                    let arr = [];
                    for(let value of $scope.variationTrueName) {
                        if ($scope.tempStanProducts[i][value]) {
                            arr.push($scope.tempStanProducts[i][value]);
                        }
                    }
                    variantval = arr.join('-');
                    // variantval=$scope.eBayAttr[i];
                } else {
                    variantval=tempStanProducts[i].VARIANTKEY || tempStanProducts[i].variantKey;
                }
                listData.variants[(tempStanProducts[i].ID || tempStanProducts[i].id)] = {
                    img: (tempStanProducts[i].IMG || tempStanProducts[i].img),
                    sku: (tempStanProducts[i].SKU || tempStanProducts[i].sku),
                    variantKey: variantval,
                    sellPrice: $scope.tempStanProducts[i].sellPrice
                }
                if ($scope.shopItem.TYPE == 'Lazada') {
                    if ($scope.skuList) {
                        $scope.skuList.forEach(e => {
                            listData.variants[(tempStanProducts[i].ID || tempStanProducts[i].id)][e.name] = $scope.tempStanProducts[i][e.name]
                        });
                    }
                    listData.variants[(tempStanProducts[i].ID || tempStanProducts[i].id)].weight = $scope.tempStanProducts[i].WEIGHT,
                    listData.variants[(tempStanProducts[i].ID || tempStanProducts[i].id)].length = $scope.tempStanProducts[i].STANDARD[0],
                    listData.variants[(tempStanProducts[i].ID || tempStanProducts[i].id)].width = $scope.tempStanProducts[i].STANDARD[1],
                    listData.variants[(tempStanProducts[i].ID || tempStanProducts[i].id)].height = $scope.tempStanProducts[i].STANDARD[2]
                }

                if($scope.shopItem.TYPE == 'ebay') {
                    listData.variants[(tempStanProducts[i].ID || tempStanProducts[i].id)].quantity = $scope.tempStanProducts[i].quantity || 0;
                    listData.siteCode = $scope.ebayCountry 
                    listData.currencyCode = $scope.ebayCurrency
                    listData.shippingService = $scope.ebayOthersParam.ebayShip.shippingService
                    listData.shippingServiceType = $scope.ebayOthersParam.ebayShip.serviceType
                }
            }
            listData.variants = JSON.stringify(listData.variants);
            // listData = JSON.stringify(listData)
            // 
            
            listData.defaultArea = $scope.areaObj ? $scope.areaObj.areaId : ''; // 选择的发货地
            return listData;
        }

        $scope.confirmList = function () {
            $scope.yushouLayer = 0;
            var listData = getListData();
            sendListPost(listData);
        }

        $scope.listingLoading = false;
        function sendListPost(listData) {
            // var loadLayer = layer.open({
            //     area: ['320px', '150px'],
            //     // time:1000,
            //     title: null,
            //     closeBtn: 0,
            //     btn: [],
            //     shadeClose: false,
            //     skin: 'loader-layer',
            //     shade: [0.01, '#000'],
            //     content: '<div><img style="display: block; margin: 30px auto;" src="./static/image/public-img/loading-2.gif" alt="" /><p style="text-align: center; font-size: 12px; margin-top: 10px;">Please wait as this may take a few minutes.</p></div>'
            // });
            $scope.listingLoading = true;
            let postData, postUrl;

            if (/shopify/i.test($scope.shopItem.TYPE)) {
                postUrl = 'listed_products/listedLocproduct/listProduct';
                postData = listData;
            } else if (/ebay/i.test($scope.shopItem.TYPE)) {
                // let lastCategroy = $scope.ebayMenus[$scope.ebayMenus.length - 1].category || {};
                // let categroys = $scope.ebayMenus.map(menu => menu.category.categoryID);

                postUrl = 'ebay/addEbayProuct';
                if($scope.specificslist.length>0 && !$scope.specificslist.variationSpecifics && $scope.specificslist[0].name != 'MPN'){
                    $scope.specificslist.forEach(item=>{
                        item.value = $scope.ebayOthersParam[item.name];
                    })
                }
                postData = Object.assign(
                    listData, {
                        categroyId: $scope.ebayCategoryID, //最后一级类目ID
                        categroys: $scope.ebayCategoryArrayID,
                        categorySpecifics: $scope.specificslist,
                        upc: $scope.ebayOthersParam.UPC,
                        ean: $scope.ebayOthersParam.EAN,
                        isbn: $scope.ebayOthersParam.ISBN,
                        variantkeyen: $scope.variantkeyen,
                        email: $scope.ebayOthersParam.paypalAccount,
                    }
                )
            } else if (/Woocommerce/i.test($scope.shopItem.TYPE)) {
                postUrl = 'woo/listing';
                postData = listData;
                postData.userName = localStorage.getItem('UserName') || '';
                const scoreList = getComments()
                if(scoreList) {
                  postData.scoreList =scoreList
                }
            } else if (/Lazada/i.test($scope.shopItem.TYPE)) {
                postUrl = 'lazada/product/createProduct';
                postData = listData;
            } else if (/shopee/i.test($scope.shopItem.TYPE)) {
                postUrl = 'shopee/product/createProduct';
                postData = listData;
            } else if (/(etsy|wix)/i.test($scope.shopItem.TYPE)) {
                // do etsy do wix 发送请求配置
                postUrl = 'platform-product/publish/publishProduct'
                postData = listData;
            }
            $scope.listFail = {} // 存储异常
            if (!isSendingPost) { // 防止重复请求
                dsp.postFun(postUrl, postData, function (data) {
                    // 埋点
                    let trackingData = {
                        elementId: '014',
                        actionType: 'listnow_click',
                        list: [
                            {
                                fieldValue: $scope.id,
                                filedName: "productId"
                            },
                            {
                                fieldValue: 0,
                                filedName: "listState"
                            }
                        ]
                    }
                    // (Please be patience once the images have not shown up. )
                    // layer.close(loadLayer);
                    $scope.listingLoading = false;
                    isSendingPost = false;
                    
                    var data = data.data;
                    if (/Woocommerce/i.test($scope.shopItem.TYPE) && data.code === '200') {
                        $scope.merchInStore = data.result;
                        trackingData.list[1].fieldValue = 1
                        $global_tracking.pushData(trackingData)
                        $scope.listSuccLayer = 1;
                        var parms = {
                        type: '0',
                        pid: that.parentscope.detailId,
                        userid: $scope.userId
                    }
                    dsp.postFun('erp/publish/Calculation', parms, function() {})
                        return
                    } else if(/(etsy|wix)/i.test($scope.shopItem.TYPE) && data.code == '200') {
                        // do etsy wix 刊登成功
                        $scope.listSuccLayer = 1;
                        return
                    } else if (data.statusCode == 801) {
                        var parms = {
                            type: '0',
                            pid: that.parentscope.detailId,
                            userid: $scope.userId
                        }
                        dsp.postFun('erp/publish/Calculation', parms, function() {})
                        // layer.close(listIndex);
                        $scope.showListFrame = false;
                        permitScroll();
                        if ($scope.shopItem.TYPE == 'Lazada') {
                            $scope.merchInStore = `https://sellercenter.lazada.co.${$scope.shopItem.MarketplaceUrl != 'cb' ? $scope.shopItem.MarketplaceUrl : $scope.lazadaCountry}/product/portal/index`;
                        }
                        if ($scope.shopItem.TYPE == 'shopee') {
                            $scope.merchInStore = 'https://seller.my.shopee.cn/portal/product/list/active';
                        }
                        if ($scope.shopItem.TYPE == 'shopify' || $scope.shopItem.TYPE == 'shopify' || $scope.shopItem.TYPE == 'ebay') {
                            $scope.merchInStore = data.result;
                        }
                        $scope.listSuccLayer = 1;
                        $global_tracking.pushData(trackingData)
                        return
                    }
                    // 开始处理异常
                    $scope.listFail.code = data.statusCode;
                    if (/Woocommerce/i.test($scope.shopItem.TYPE)) { // Woocommerce返回的状态码变成code了
                        $scope.listFail.code = data.code;
                    }
                    if (data.statusCode == 805) {
                        // 失败-重复刊登
                        // permitScroll();
                        $scope.listFail.message = "The product already existed in this store, please don't repeat."
                    } else if (/ebay/i.test($scope.shopItem.TYPE)) {
                        if(data.statusCode === '803') {
                            $scope.listFail.message = data.message;
                        }
                        if(data.statusCode === '1008') {
                            // 失败-超过限制（ebay）
                            $scope.listFail.message = data.message;
                        }
                        if(data.statusCode === '812') {
                            $scope.listFail.message = `<div style=\'margin-bottom: 10px;\'>Exceed Monthly Limits.</div><div>The listing amount exceeds the number of items on eBay. You can list up to ${data.result.quantityLimit} more items and ${data.result.currencySymbol}${data.result.amountLimit} more in total sales this month. But now you are listing up ${data.result.quantity} items and ${data.result.currencySymbol}${data.result.totalPrice} sales.</div><div>Please consider reducing the quantity or Increase Listing Quantities.</div><div>Refer to: <a target=\'_blank\' href=\'https://app.cjdropshipping.com/blog/post/1308656671244914690\'>How to Increase Listing Quantities on eBay?</a></div>`
                        }
                        if(data.statusCode === '209') {
                            $scope.listFail.message = '<div>Authorization failure.</div><div>Please log in to your eBay account and authorize to CJ again.</div><div>Refer to: <a target=\'_blank\' href=\'https://app.cjdropshipping.com/blog/post/how-to-connect-your-ebay-store-to-cj-dropshipping-app?\'>How to authorize your eBay store to CJ?</a></div>'
                        }
                    } else if (
                        /Woocommerce/i.test($scope.shopItem.TYPE) && (data.code == 403 || data.code == 803)
                    ) {
                        $scope.listFail.message = data.message;
                    } else if (
                        /shopify/i.test($scope.shopItem.TYPE) && data.statusCode == 804
                    ) {
                        // 刊登成功，关联失败
                        $scope.showListFrame = false;
                        permitScroll();
                        $scope.merchInStore = data.result;
                        $scope.manualConLayer = 1;
                    } else if (data.statusCode == 505) {
                        // lazada/shoppee用
                        if ($scope.shopItem.TYPE == 'Lazada') {
                            $scope.listFail.message = data.message;
                        } else if ($scope.shopItem.TYPE == 'shopee') {
                            const obj = JSON.parse(data.result);
                            $scope.listFail.message = obj.msg;
                        } else {
                            $scope.listFail.message = 'Dear sellers, the category is currently under legal and logistic review due to the category migration. Thanks.';
                        }
                    } else if (data.statusCode == 209) {
                        if (/shopify/i.test($scope.shopItem.TYPE)) {
                            $scope.listFail.message = "Store not Found or Authorization Failed";
                        }
                    } else if (data.statusCode == 401) {
                        // 失败-变体数量应小于100
                        $scope.listFail.message = "The number of variants should be less than 100.";
                    } else if (data.statusCode == 8031) {
                        $scope.listFail.message = data.message;
                    } else {
                        $scope.listFail.code = 'other';
                        $scope.listFail.message = 'Sorry, the product fails to be listed. Please try again or contact your agent.';
                    }
                    $global_tracking.pushData(trackingData)
                }, function (err) {
                    // layer.close(loadLayer);
                    $scope.listingLoading = false;
                    isSendingPost = false;
                    $scope.listFail.code = 'fail';
                    $scope.listFail.message = 'The server is busy now. Please try it later. ';
                });
            }
        }

        // cj loading动效
        function createLottieAnimation(){
            const dom = document.getElementById('listing-loading')
            if(!dom) return 
            lottie.loadAnimation({
              container: dom, // the dom element that will contain the animation
              renderer: 'svg',
              loop: true,
              autoplay: true,
              path: '/egg/image/cj_lottie.json'// the path to the animation json
            });
          }
          createLottieAnimation();

        /* 获取评论 */
        getComments =() => {
          const starList = $scope.starPool
          const paramList = []
          !starList.five || paramList.push(5)
          !starList.four || paramList.push(4)
          !starList.three || paramList.push(3)
          !starList.two || paramList.push(2)
          !starList.one || paramList.push(1)

          if($scope.isImport === "0"){
            if(paramList.length>0){
              return paramList
            }
          }
          return null
        }

        // 重新授权-目前只支持shopify
        $scope.reAuthorize = function () {
            if(/shopify/i.test($scope.shopItem.TYPE)) {
                var reAddStoreData = {};
                reAddStoreData.userId = $scope.userId;
                reAddStoreData.token = $scope.token;
                reAddStoreData.data = JSON.stringify({
                    id: $scope.shopItem.ID,
                    name: $scope.shopItem.NAME,
                    type: $scope.shopItem.TYPE
                })
                const msgLoading = cjMessage.loading({ isFixed: true });
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
            if(/ebay/i.test($scope.shopItem.TYPE)) {
                dsp.postFun('ebay/againToken', JSON.stringify({
                    // ID: updateItem.id,
                    type: $scope.shopItem.TYPE,
                    name: $scope.shopItem.NAME
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
                },function(err) {
                    msgLoading.hide();
                });
            }
          
        }
        $scope.tryAgain = function () {
            $scope.listFail = null;
            // sendListPost();
            var listData = getListData();
            sendListPost(listData);
        }
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

        $scope.editList = function () {
            $global_tracking.pushData({
                elementId: '015',
                actionType: 'editlisting_click',
                list: [
                    {
                        fieldValue: $scope.id,
                        filedName: "productId"
                    }
                ]
            })
            if (that.parentscope.merchanisCollect == '1') {
                dsp.postFun('cj/homePage/shouCangShnagPin', { productId: that.parentscope.detailId }, function (data) {
                    if (data.data.statusCode == 200) {
                        dsp.postFun('cj/homePage/shouCangShnagPin', { productId: that.parentscope.detailId }, function (data) {
                            if (data.data.statusCode == 200) {
                                location.href = 'myCJ.html#/myCJ-favorites/' + that.parentscope.detailId + '&&' + that.parentscope.podProduct;;
                            }
                        });
                    }
                });
            } else {
                dsp.postFun('cj/homePage/shouCangShnagPin', { productId: that.parentscope.detailId }, function (data) {
                    if (data.data.statusCode == 200) {
                        location.href = 'myCJ.html#/myCJ-favorites/' + that.parentscope.detailId + '&&' + that.parentscope.podProduct;;
                    }
                });
            }
        }

        /**初始化店铺数据 start */
        function initState(shop) {
            // type栏初始化为变体页
            $('a[href="#variants"]').tab('show')
            // 货币初始化
            if ($scope.shopItem && $scope.shopItem.currencyCode) {
                $scope.CurrencyCode = $scope.shopItem.currencyCode;
            } else {
                $scope.CurrencyCode = 'USD';
            }
            // 置空变体价格/货币符号/换算的汇率
            if ($scope.tempStanProducts) {
                $scope.tempStanProducts.forEach(e => {
                    e.sellPrice = '';
                    e.currencyUnit = '';
                    e.rateConverted = '';
                });
                getAreaInventory($scope.id, $scope.areaObj.areaId);
            }
            // 置空批量修改价格
            $scope.bulkReviseValue = '';

            // POD商品暂时只支持刊登到shopify店铺
            if (that.parentscope.podProduct && $scope.shopItem && $scope.shopItem.TYPE != 'shopify') {
                $scope.showPodProduct = true;
                $scope.shopItem = null;
                return false;
            }

            if (
                /shopify/i.test(shop)
                ||
                /Woocommerce/i.test(shop)
            ) {
                $scope.category1 = '';
                $scope.categoryList = [];
                $scope.categoryType = 'select' || 'input';
                $scope.vendorType = 'select' || 'input';
            } else if (/ebay/i.test(shop)) {
                $scope.ebayMenus = [];
                $scope.ebayCategoryID = undefined;
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
                $scope.rutterProTitle = $scope.parentscope.merchName
            } else {
                $scope.categoryType = 'select' || 'input';
                // $scope.commodityDetails = {};
                $scope.shopList = []; // 平台列表
                $scope.shopItem = null; // 当前平台
                $scope.category1 = ''; // shopify | woocommerce 店铺类目
                $scope.categoryList = []; // shopify | woocommerce 店铺类目列表
                $scope.ebayMenus = []; // ebay 联动菜单
            }
        }

        // 切换仓库或店铺时调用，判断是否有库存
        function showInsufficientTips() {
            const list = $scope.tempStanProducts;
            // ThemeId是shopee的国家;MarketplaceUrl是lazada的国家
            if($scope.areaObj && $scope.areaObj.countryCode != 'CN' && $scope.shopItem && $scope.shopItem.TYPE == 'Lazada' && ( $scope.shopItem.MarketplaceUrl == 'id' || $scope.shopItem.MarketplaceUrl == 'cb' && ($scope.publishedMethod == 'ASC' && $scope.lazadaCountry == 'id') )) {
                // 选择发货地为海外仓【非中国仓】且刊登平台【刊登平台为lazada的印尼和泰国站点】，查询该变体所在海外仓真实库存，库存不足时，变体商品标记且显示图标，
                $scope.tempStanProducts = list.map(obj => {
                    return {
                        ...obj,
                        showInsufficientTips: obj.realNum == 0 
                    }
                })
            } else if($scope.areaObj && $scope.areaObj.countryCode != 'CN' && $scope.shopItem && $scope.shopItem.TYPE == 'shopee' && $scope.shopItem.ThemeId == 'TH') {
                // 选择发货地为海外仓【非中国仓】且刊登平台【刊登平台为shoppe的泰国站点】，查询该变体所在海外仓真实库存，库存不足时，变体商品标记且显示图标
                $scope.tempStanProducts = list.map(obj => {
                    return {
                        ...obj,
                        showInsufficientTips: obj.realNum == 0 
                    }
                })
            } else {
                $scope.tempStanProducts = list.map(obj => {
                    return {
                        ...obj,
                        showInsufficientTips: false 
                    }
                })
            }
        }


        // 库存不足不能刊登 shopItem，notAllowed
        function NotAllowed() {
            let variants = true;
            const list = $scope.tempStanProducts;
            for (let i = 0; i < list.length; i++) {
                if(list[i].realNum != 'undefined' && list[i].realNum == 0) {
                    variants = false;
                }
            }
            
            
            if($scope.areaObj && $scope.areaObj.countryCode != 'CN' && $scope.shopItem && $scope.shopItem.TYPE == 'Lazada' && !variants && ( $scope.shopItem.MarketplaceUrl == 'id' || $scope.shopItem.MarketplaceUrl == 'cb' && $scope.publishedMethod == 'ASC' && $scope.lazadaCountry == 'id' )) {
                // a、选择发货地为海外仓【非中国仓】且刊登平台【刊登平台为lazada的印尼和泰国站点】，商品变体列表海外仓没有库存时，按钮置灰色
                $scope.notAllowed = true;
            } else if($scope.areaObj && $scope.areaObj.countryCode != 'CN' && $scope.shopItem && $scope.shopItem.TYPE == 'shopee' && $scope.shopItem.ThemeId == 'TH' && !variants) {
                // b、刊登选择发货地为海外仓时【非中国仓】且刊登平台【刊登平台为shoppe的泰国站点】，商品变体列表海外仓没有库存时，按钮置灰色
                $scope.notAllowed = true;
            } else {
                $scope.notAllowed = false;
            }
        }


        // 切换平台、店铺
        $scope.chanShop = function (shopItem) {
            $scope.displayScrollBtn = false
            // 初始化店铺数据
            initState($scope.shopItem.TYPE);
            $scope.variationTrue = []
            $scope.vendorList = []
            // 初始化Lazada站点信息
            initStationState();
            if (/shopify/i.test($scope.shopItem.TYPE)) {
                getShopifyType($scope.shopItem.ID);
                getShopifyVendor($scope.shopItem.ID);

                // 告诉shopify collections组件切换店铺了
                $scope.$broadcast('quick-list', {
                    flag: 'chan-store',
                    store: $scope.shopItem
                });
                getCanReviews();
                $scope.storeCountry = '';
            } else if (/ebay/i.test($scope.shopItem.TYPE)) {
                getEbayCountry();
                $scope.storeCountry = '';
            } else if (/Woocommerce/i.test($scope.shopItem.TYPE)) {
                handleWoocommerce({
                    shopId: $scope.shopItem.ID,
                    fn: function (data) {
                        $scope.categoryList = data;
                    }
                });
                getCanReviews();
                $scope.storeCountry = '';
            } else if (/wix/i.test($scope.shopItem.TYPE)) {
                $scope.storeCountry = '';
            } else if (/api/i.test($scope.shopItem.TYPE)) {
                $scope.storeCountry = '';
            } else if (/amazon/i.test($scope.shopItem.TYPE)) {
                $scope.storeCountry = '';
            } else if (/Lazada/i.test($scope.shopItem.TYPE)) {
                
                //cb代表跨境店铺,跨境店铺不属于任何国家,需要另选国家; 不是跨境店铺直接获取类目
                // $scope.shopItem.MarketplaceUrl == 'th' && $scope.parentscope.inveInfo &&$scope.parentscope.inveInfo.TH <= 0
                // 
                if ($scope.shopItem.MarketplaceUrl != 'cb') {
                    if (
                        $scope.shopItem.MarketplaceUrl == 'th' 
                        && $scope.wareListObj && !$scope.wareListObj.TH 
                    ) {
                        $scope.noStockLayer = 1;
                        // 置空类目数据
                        $scope.lazadaCate = [];
                        $scope.shopItem = null;
                        showInsufficientTips();
                        NotAllowed();
                        return;
                    }
                    $scope.lazadaCountry = $scope.shopItem.MarketplaceUrl;
                    getLazadaCategory(function (data){
                        assembleLazadaCate({ menus: data, type: 'init' })
                    });
                    
                } else {
                    $scope.contrabandShow = true; //违禁品弹窗
                    return false;
                }
                // 设置Lazada或shopee物流国家
                $scope.shipCountry = $scope.shopItem.countryCode || 'TH';
                $scope.storeCountry = $scope.shopItem.countryCode;
            } else if (/shopee/i.test($scope.shopItem.TYPE)) {
                getShopeeCate(function (data) {
                    assembleShopeeMenus({ menus: data, type: 'init' })
                })
                // 设置Lazada或shopee物流国家
                $scope.shipCountry = $scope.shopItem.countryCode || 'TH';
                $scope.storeCountry = $scope.shopItem.countryCode;
                // shopee泰国及印尼站点-预售默认赋值
                
                if ($scope.shopItem.countryCode == 'TH') {
                    // $scope.parentscope.inveInfo && $scope.parentscope.inveInfo.TH > 0
                    if ($scope.areaObj.countryCode == 'TH' && $scope.wareListObj && $scope.wareListObj.TH) {
                        $scope.isPreOrder = '0'; // 现售
                    } else {
                        $scope.isPreOrder = '1'; // 预售
                    }
                } else if ($scope.shopItem.countryCode == 'ID') {
                    if ($scope.areaObj.countryCode == 'ID' && $scope.wareListObj && $scope.wareListObj.ID) {
                        $scope.isPreOrder = '0'; // 现售
                    } else {
                        $scope.isPreOrder = '1'; // 预售
                    }
                } else {
                    $scope.isPreOrder = '1'; // 其他东南亚站点默认预售
                }
            } else if (/(etsy|wix)/i.test($scope.shopItem.TYPE)) {
                // do etsy wix 选择店铺时逻辑
                if(rutterNotAllowThreeOption()) return
            }
            // 刷新物流数据
            getReceiveCountries(function (data) {
                setCountryData(data);
                if ($scope.shipCountry) {
                    if($scope.parentscope.productdetail.PRODUCTTYPE === '5') {
                        getShipList(function(data2) {
                            $scope.wuliuList = data2;
                            if ($scope.wuliuList.length == 0 || JSON.stringify(data2)=="{}") {
                                $scope.shipMethod = '';
                                insertShipcostToVariant({})
                                
                                return;
                            }
                            $scope.shipMethod = data2[0].logisticName; // 取价格最低的物流方式
                            getShipCost(function (data3) {
                                insertShipcostToVariant(data3);
                            });
                        })
                    } else {
                        getMulShipList(function (data2) {
                            $scope.wuliuList = data2;
                            if ($scope.wuliuList.length == 0 || JSON.stringify(data2)=="{}") {
                                $scope.shipMethod = '';
                                insertShipcostToVariant({})
                                
                                return;
                            }
                            $scope.shipMethod = data2[0].logisticName; // 取价格最低的物流方式
                            getMulShipCost(function (data3) {
                                insertShipcostToVariant(data3);
                            });
                        })
                    }
                } else {
                    $scope.wuliuList = [];
                    $scope.shipMethod = '';
                    insertShipcostToVariant({})
                }
            })  

            
        }
        //监听现售、预售的变化，刷新物流数据
        $scope.$watch('isPreOrder',
            function (newVal, oldVal) {
                
                if (oldVal) {
                    $scope.chanAreaObj()
                }
            })
        // 刊登弹窗内切换Ship from刷新物流数据
        $scope.chanAreaObj = function (seleWare) {
            getReceiveCountries(function (data) {
                setCountryData(data);
                if ($scope.shipCountry) {
                    if($scope.parentscope.productdetail.PRODUCTTYPE === '5') {
                        getShipList(function(data2) {
                            $scope.wuliuList = data2;
                            if ($scope.wuliuList.length == 0 || JSON.stringify(data2)=="{}") {
                                $scope.shipMethod = '';
                                insertShipcostToVariant({})
                                
                                return;
                            }
                            $scope.shipMethod = data2[0].logisticName; // 取价格最低的物流方式
                            getShipCost(function (data3) {
                                insertShipcostToVariant(data3);
                            });
                        })
                    } else {
                        getMulShipList(function (data2) {
                            $scope.wuliuList = data2;
                            if ($scope.wuliuList.length == 0 || JSON.stringify(data2)=="{}") {
                                $scope.shipMethod = '';
                                insertShipcostToVariant({})
                                
                                return;
                            }
                            $scope.shipMethod = data2[0].logisticName; // 取价格最低的物流方式
                            getMulShipCost(function (data3) {
                                insertShipcostToVariant(data3);
                            });
                        })
                    }
                } else {
                    $scope.wuliuList = [];
                    $scope.shipMethod = '';
                    insertShipcostToVariant({})
                }
                // dsp.getVInvsByPidAndAreaId({
                //     pid: $scope.id, 
                //     areaId: seleWare.areaId
                // },function (d) {
                //     console.log('sssssssssssssssss====', d)
                //     $scope.$emit('ship-from', {
                //         flag: 'variant-invs',
                //         data: d
                //     });
                // })
                getAreaInventory($scope.id, seleWare.areaId);
            })
            showInsufficientTips();
        }
        $scope.$on('pro-detail', function (ev, data) {
            
            
            if (data.flag == 'show-list') {
                $scope.check_All = false;
                $scope.showListFrame = true;
                forbidScroll();
            }
            if (data.flag == 'fresh-variant-invs') {
                $scope.tempStanProducts.forEach(function (item) {
                    item.inventory = data.data[item.ID];
                })
                
            }
            if (data.flag == 'storage-default') {
                $scope.wareListObj = data.wareListObj;
                $scope.areaObj = data.areaObj;
                getReceiveCountries(function (data) {
                    setCountryData(data);
                    if ($scope.shipCountry) {
                        if($scope.parentscope.productdetail.PRODUCTTYPE === '5') {
                            getShipList(function(data2) {
                                $scope.wuliuList = data2;
                                if ($scope.wuliuList.length == 0 || JSON.stringify(data2)=="{}") {
                                    $scope.shipMethod = '';
                                    insertShipcostToVariant({})
                                    
                                    return;
                                }
                                $scope.shipMethod = data2[0].logisticName; // 取价格最低的物流方式
                                getShipCost(function (data3) {
                                    insertShipcostToVariant(data3);
                                });
                            })
                        } else {
                            getMulShipList(function (data2) {
                                $scope.wuliuList = data2;
                                if ($scope.wuliuList.length == 0 || JSON.stringify(data2)=="{}") {
                                    $scope.shipMethod = '';
                                    insertShipcostToVariant({})
                                    
                                    return;
                                }
                                $scope.shipMethod = data2[0].logisticName; // 取价格最低的物流方式
                                getMulShipCost(function (data3) {
                                    insertShipcostToVariant(data3);
                                });
                            })
                        }
                    } else {
                        $scope.wuliuList = [];
                        $scope.shipMethod = '';
                        insertShipcostToVariant({})
                    }
                })
            }
            if (data.flag == 'chan-ware') {
                $scope.areaObj = data.areaObj;
                getReceiveCountries(function (data) {
                    setCountryData(data);
                    if ($scope.shipCountry) {
                        if($scope.parentscope.productdetail.PRODUCTTYPE === '5') {
                            getShipList(function(data2) {
                                $scope.wuliuList = data2;
                                if ($scope.wuliuList.length == 0 || JSON.stringify(data2)=="{}") {
                                    $scope.shipMethod = '';
                                    insertShipcostToVariant({})
                                    
                                    return;
                                }
                                $scope.shipMethod = data2[0].logisticName; // 取价格最低的物流方式
                                getShipCost(function (data3) {
                                    insertShipcostToVariant(data3);
                                });
                            })
                        } else {
                            getMulShipList(function (data2) {
                                $scope.wuliuList = data2;
                                if ($scope.wuliuList.length == 0 || JSON.stringify(data2)=="{}") {
                                    $scope.shipMethod = '';
                                    insertShipcostToVariant({})
                                    
                                    return;
                                }
                                $scope.shipMethod = data2[0].logisticName; // 取价格最低的物流方式
                                getMulShipCost(function (data3) {
                                    insertShipcostToVariant(data3);
                                });
                            })
                        }
                    } else {
                        $scope.wuliuList = [];
                        $scope.shipMethod = '';
                        insertShipcostToVariant({})
                    }
                })
            }
        }); 

        function getAreaInventory(pid, areaId) {
            dsp.postFun('storehousecj/areaInventory/getAreaInventoryInfoByPidAndAreaId', {
                pid: pid,
                areaId: areaId
            }, function(response) {
                const { code, data, message } = response.data;
                if (code == 200) {
                    var vInvsMap = {};
                    for (let i = 0; i < data.length; i++) {
                      vInvsMap[data[i].entityId] = data[i].num;
                      if($scope.tempStanProducts && $scope.tempStanProducts.length > 0) {
                        for(let j = 0; j < $scope.tempStanProducts.length; j++) {
                            if($scope.tempStanProducts[j].SKU == data[i].entitySku) {
                                $scope.tempStanProducts[j].realNum = data[i].pubNum || 0;
                                $scope.tempStanProducts[j].virtualNum = data[i].virtualNum || 0;
                            }
                        }
                      }
                    }
                    $scope.$emit('ship-from', {
                        flag: 'variant-invs',
                        data: vInvsMap
                    });
                    showInsufficientTips();
                    NotAllowed();
                } else {
                    layer.msg(message);
                }
            })
        }

        //根据价格（price）排序
        function sortprice(price) {
            return function (a, b) {
                var value1 = a[price];
                var value2 = b[price];
                return value1 - value2;
            }
        }

        // 接收shopify collections组件传过来的collectionId
        $scope.$on('shopify-collections', function (ev, data) {
            if (data.flag == 'fresh-collection-id') {
                $scope.collectionId = data.collectionId;
            }
        })

        /** 获取 lazada 类目 start========================================================================================================================================== */
        // cb跨境店铺另选国家获取类目
        $scope.selectLzdCountry = () => {
            $scope.displayScrollBtn = false;
            if ($scope.lazadaCountry) {
                
                // $scope.lazadaCountry == 'th' && $scope.parentscope.inveInfo && $scope.parentscope.inveInfo.TH <= 0
                if (
                    $scope.lazadaCountry == 'th' 
                    && $scope.wareListObj 
                    && !$scope.wareListObj.TH
                ) {
                    $scope.noStockLayer = 1;
                     // 置空类目数据
                    $scope.lazadaCate = [];
                    $scope.lazadaCountry = '';
                    showInsufficientTips();
                    NotAllowed();
                    return;
                }
                getLazadaCategory(function (data){
                    assembleLazadaCate({ menus: data, type: 'init' })
                });
                showInsufficientTips();
                NotAllowed();
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
            if (lazadaCate && Array.isArray(lazadaCate.data)) {
                fn instanceof Function && fn(lazadaCate.data);
            }
        }
        // 获取lazada类目 即时获取
        function realTimeGetCate(fn) {
            const msgLoading = cjMessage.loading({ isFixed: true })
            dsp.postFun(`lazada/product/getCategoryTree`, {
                shopId: $scope.shopItem.ID,
                country: $scope.lazadaCountry
            }, function (res) {
                msgLoading.hide();
                // 
                const data = res.data;
                if (data.statusCode == 200) {
                    if(data.result.categoryTree && Array.isArray(data.result.categoryTree.data) && data.result.categoryTree.data.length > 0) {
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
            },function() {
                msgLoading.hide()
            })
        }


        // 多级类目联动 Lazada
        $scope.changeLazadaCate = function (oSelect, item) {
            var index, ID
            if (oSelect) {
                index = +oSelect.dataset.index; // 记个坑，“+” 转换成数字，不然误导 splice(0, index + 1) 你懂的
                ID = +oSelect.value;
            }
            if (item) {
                index = item.index;
                ID = item.id;
            }
            // var index = +oSelect.dataset.index; // 记个坑，“+” 转换成数字，不然误导 splice(0, index + 1) 你懂的
            // var ID = oSelect.value;

            $scope.lazadaCate = $scope.lazadaCate.splice(0, index + 1); // 拼装多级类目前，先还原
            
            $scope.lazadaCate[index].category = $scope.lazadaCate[index]
                .menus.find(menu => +menu.category_id === ID);
            if (
                Array.isArray($scope.lazadaCate[index].category.children)
                &&
                $scope.lazadaCate[index].category.children.length
            ) {
                assembleLazadaCate({ menus: $scope.lazadaCate[index].category.children, type: 'add' });
            } else {
                $scope.$apply();
                getLazadaBrand(); //获取品牌
                getLazadaCateInfo(ID); //获取选中类目的相应信息
            }
        }
        // 拼装多级类目 Lazada
        function assembleLazadaCate({ category = {}, menus = [], type }) {
            // 
            if (type === 'init') {
                $scope.lazadaCate = [{ category, menus }];
            } else if (type === 'add') {
                setTimeout(function () {
                    menus.length && $scope.lazadaCate.push({ category, menus });
                    $scope.$apply();//必需手动进行脏值检测,否则数据无法刷新到界面
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
            const msgLoading = cjMessage.loading({ isFixed: true })
            dsp.postFun(`lazada/product/getBrandListByCountry`, {
                shopId: $scope.shopItem.ID,
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
            }, function(err) {
                msgLoading.hide();
            })
        }

        // 获取lazada选中类目的相应信息
        function getLazadaCateInfo(ID) {
            $scope.lzdCategoryId = ID;
            const msgLoading = cjMessage.loading({ isFixed: true })
            const labelList = [];
            const old_skuList = $scope.skuList ? [...$scope.skuList] : [];
            old_skuList.map(e => labelList.push(e.name))
            dsp.postFun(`lazada/product/getCategoryInfoListById`, {
                shopId: $scope.shopItem.ID,
                productId: $scope.parentscope.detailId,
                country: $scope.lazadaCountry,
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
                    
                    for(let i = 0; i < $scope.tempStanProducts.length; i++) {
                        labelList.map(name => {
                            $scope.tempStanProducts[i][name] = '';
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
            }, function(err) {
                msgLoading.hide();
            })
        }
        /** 获取 lazada 类目 end========================================================================================================================================== */


        /** 获取 shopee 类目 start=============================================================================================================================*/
        function getShopeeCate(fn) {
            const shopeeCate = localStorage.getItem(`shopeeCate-${$scope.shopItem.countryCode}`) && JSON.parse(localStorage.getItem(`shopeeCate-${$scope.shopItem.countryCode}`));
            if (!shopeeCate) return getShopeeType(fn);
            if ((new Date().getTime() - shopeeCate.currentTime) > 2592000000) return getShopeeType(fn); // 缓存一个月
            if (shopeeCate.country != $scope.shopItem.countryCode) return getShopeeType(fn);

            getCateThreeTree(shopeeCate.cata);
            if (Array.isArray(shopeeCate.cata)) {
                fn instanceof Function && fn(shopeeCate.cata);
            }
            $scope.shopeeLogistics = shopeeCate.logistics;
            $scope.shopeeLogisticItem = $scope.shopeeLogistics ? $scope.shopeeLogistics[0] : null;
        }

        function getShopeeType(fn) {
            const params = {
                shopId: $scope.shopItem.ID,
                userId: $scope.userId,
                account: $scope.shopItem.accountName,
                type: $scope.shopItem.TYPE
            }
            // const index = layer.load(2);
            const msgLoading = cjMessage.loading({ isFixed: true })
            dsp.postFun(`shopee/product/getCategories`, params,
            function (res) {
                // layer.close(index);
                msgLoading.hide();
                // 
                const data = res.data;
                if (data.statusCode == 200 && data.result != '') {
                    // 
                    const cataInfo = JSON.parse(data.result);
                    
                    let shopeeCate = {};
                    shopeeCate.cata = cataInfo.categList; //类目
                    shopeeCate.logistics = cataInfo.logistics; //物流
                    shopeeCate.currentTime = new Date().getTime(); //记录缓存时间
                    shopeeCate.country = $scope.shopItem.countryCode; //记录国家
                    // 
                    localStorage.setItem(`shopeeCate-${$scope.shopItem.countryCode}`, JSON.stringify(shopeeCate));
                    getCateThreeTree(cataInfo.categList);
                    if (cataInfo && Array.isArray(cataInfo.categList)) {
                        fn instanceof Function && fn(cataInfo.categList);
                    }
                    $scope.shopeeLogistics = cataInfo.logistics; //shopee自己的物流
                    $scope.shopeeLogisticItem = $scope.shopeeLogistics ? $scope.shopeeLogistics[0] : null;
                } else {
                    return layer.msg(data.message);
                }
            }, function() {
                msgLoading.hide()
            })
        }

        // 多级类目联动 shopee
        $scope.changeShopeeCate = function (oSelect) {
            var index = +oSelect.dataset.index; // 记个坑，“+” 转换成数字，不然误导 splice(0, index + 1) 你懂的
            var ID = +oSelect.value;

            $scope.shopeeMenus = $scope.shopeeMenus.splice(0, index + 1); // 拼装多级类目前，先还原
            
            $scope.shopeeMenus[index].category = $scope.shopeeMenus[index]
                .menus.find(menu => +menu.category_id === ID);
            if (
                Array.isArray($scope.shopeeMenus[index].category.children)
                &&
                $scope.shopeeMenus[index].category.children.length
            ) {
                assembleShopeeMenus({ menus: $scope.shopeeMenus[index].category.children, type: 'add' });
            } else {
                $scope.$apply();
                getAttributes(ID);
            }
        }
        // 拼装多级类目 shopee
        function assembleShopeeMenus({ category = {}, menus = [], type }) {
            // 
            if (type === 'init') {
                $scope.shopeeMenus = [{ category, menus }];
            } else if (type === 'add') {
                setTimeout(function () {
                    menus.length && $scope.shopeeMenus.push({ category, menus });
                    $scope.$apply();  // 避开第一次请求装配菜单报错
                }, 500);
            }
        }

        function getAttributes(ID) {
            const shopId = $scope.shopItem.ID;
            $scope.shopeCategoryId = ID;
            const msgLoading = cjMessage.loading({ isFixed: true })
            dsp.postFun(`shopee/product/getAttributes`,{shopId, categoryId: $scope.shopeCategoryId}, function (res) {
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
                        $('a[href="#variants"]').tab('show')
                        $scope.attrErrLayer = 1;
                        $scope.attrErrMes = obj.msg;
                    }
                }
            }, function(err) {
                msgLoading.hide();
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
            if (item.cateTwoIndex>=0) {
                setTimeout(() => {
                    document.querySelector('#my-select-1').selectedIndex = item.cateTwoIndex + 1;
                    document.querySelector('#my-select-1').dispatchEvent(new Event('change'));
                    if (item.cateThreeIndex>=0) {
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

        $scope.ebayCategoryArrayID = [];
        $scope.specificslist = [];

        $scope.specificsItemFocus = (ev) => {
            
            ev.target.parentNode.lastChild.previousSibling.style="display: block;"
        }

        $scope.specificsItemBlur = (ev) => {
            setTimeout(() => {
                ev.target.parentNode.lastChild.previousSibling.style="display: none;"
            },200)
            
        } 

        $scope.specificsItemClick = (i, index) => {
            
            $scope.specificslist[index] = Object.assign($scope.specificslist[index], {value: i});
        }


        // 取shopfiy商品类目 [发布商品到shoppingify中选择店铺触发]
        function getShopifyType(shopId) {
            // $scope.shopifyCateList = [];
            if (!$scope.shopItem) return;
            dsp.getFun(`pojo/product/ShopifyProductType?shopId=${shopId}`, function (data) {
                var data = data.data;
                
                if (data.statusCode != 200) {
                    return false;
                } else {
                    $scope.shopifySeleCate = true;
                    $scope.categoryList = (utils.JSONparse(data.result) || [])
                            .map(item => {
                                item.name = item.product_type; // 统一 name 显示字段
                                return item;
                            });
                }
            });
        }

        function getShopifyVendor(shopId) {
            if (!$scope.shopItem) return;
            dsp.postFun('listed_products/shopfiy/product/getShopifyVendor ', {shopId: shopId}, function (res) {
                if(res.data.code == '200') {
                    $scope.vendorList = res.data.data||[];
                }
            });
        }
        $scope.waiting = false;
        $scope.refreshVendorList = function() {
            if($scope.waiting) {
                return;
            }
            $scope.waiting = true;
            if(!$scope.shopItem.ID) return;
            const msgLoading = cjMessage.loading({ isFixed: true })
            dsp.postFun('listed_products/shopfiy/product/refreshShopifyVendor', {shopId: $scope.shopItem.ID}, function (res) {
                if(res.data.code == '200') {
                    $scope.vendorList = res.data.data;
                    $timeout(() => {
                        $scope.waiting = false;
                    }, 60000)
                };
                msgLoading.hide();
            }, function(err) {
                msgLoading.hide();
            });
        }
        $scope.addNewVendor = function() {
          $scope.vendorList.push($scope.vendor);
        }
        

        /** 获取Woocommerce店铺-类目 */
        function handleWoocommerce({ cmd = 'get', shopId = '', name = '', fn }) {
            let url, param;

            if (cmd === 'get') {
                url = `woo/wccGetCategory`;
                param = { shopId };
            } else if (cmd === 'create') { // useless
                url = `woo/wccGetCategory`; // 手动输入，创建类别
                param = { name, shopId };
            }
            dsp.postFun(url, param, function (res) {
                // let list = utils.JSONparse(res.data.result.replace('﻿', '')) || [];
                const xiao_hong_dian = String.fromCharCode(65279); // 19-10-28 bug
                
                let list = res.data.result ? utils.JSONparse(res.data.result.replace(xiao_hong_dian, '')) : [];

                
                fn instanceof Function && fn(list);
            }, function () { }, { layer2: true, errorAlert: true, code200: true });
        }

        var language = localStorage.getItem('language'); // 临时解决翻译带来的问题

        /**
         * lists 弹窗函数
         */
        // var shoptype;
        var isSendingPost = false;
        
        function goActList(parentScope) {
            $scope.check_All = false;
            // initState(); //初始化店铺数据
            $scope.showListFrame = true;
        }
        var tempVarientKeys = JSON.parse(JSON.stringify($scope.parentscope.varientKeys));
        $scope.tempVarientKeys = tempVarientKeys;
        // 取shopfiy店铺列表
        getShop();
        function getShop () {
           
            var parentScope = $scope.parentscope;
            
            dsp.postFun('app/shop/getshop', {
                data: JSON.stringify({ userId: parentScope.userId }),
            }, function (data) {
                // 
                var data = data.data;
                if (data.statusCode != 200) {
                    
                    return false;
                } else {
                    $scope.shopList = (utils.JSONparse(data.result) || {}).shoplist || [];
                    // 目前只支持 shopify|ebay|Woocommerce 19-06-25
                    $scope.shopList = $scope.shopList.filter(item => {
                        return /shopify|ebay|Woocommerce|lazada|shopee|etsy|wix/i.test(item.TYPE);
                    });
                    /**店铺列表名字展示改成 店铺名+店铺类型+国家全名、增加国家全写参数、增加国家缩写参数 start */
                    $scope.shopList.forEach(e => {
                        // 国家全名。ThemeId是shopee的国家;MarketplaceUrl是lazada的国家
                        e.countryfullName = replaceCountry(e.TYPE == 'shopee' ? e.ThemeId : e.TYPE == 'Lazada' ? e.MarketplaceUrl : '').fullName;
                        // 店铺名+店铺类型+国家全名
                        e.rNAME = `${e.NAME} - ${e.TYPE.replace(e.TYPE[0], e.TYPE[0].toUpperCase())} ${e.countryfullName ? '- '+e.countryfullName : ''} ${e.TYPE == 'shopee'? e.is_cb != 1 ? '- International' : '' : ''} ${e.TYPE == 'Lazada' && e.is_cb != 1 ? '- cross_border' : ''}`;
                        // 国家Code(大写)-物流模块传递国家需要
                        e.countryCode = (e.ThemeId || e.MarketplaceUrl) ? (e.TYPE == 'shopee' ? e.ThemeId : e.TYPE == 'Lazada' ? e.MarketplaceUrl : '').toUpperCase() : '';
                        // 货币代码
                        e.currencyCode = replaceCountry(e.TYPE == 'shopee' ? e.ThemeId : e.TYPE == 'Lazada' ? e.MarketplaceUrl : '').currencyCode;
                    });
                    function replaceCountry(params) {
                        let fullName = '';
                        let currencyCode = '';
                        if (/sg/i.test(params)) { fullName = 'Singapore', currencyCode = 'SGD' }
                        else if (/my/i.test(params)) { fullName = 'Malaysia', currencyCode = 'MYR' }
                        else if (/id/i.test(params)) { fullName = 'Indonesia', currencyCode = 'IDR' }
                        else if (/th/i.test(params)) { fullName = 'Thailand', currencyCode = 'THB' }
                        else if (/ph/i.test(params)) { fullName = 'Philippines', currencyCode = 'PHP' }
                        else if (/vn/i.test(params)) { fullName = 'Vietnam', currencyCode = 'VND' }
                        return { fullName, currencyCode };
                    }
                    /**店铺列表名字展示改 成店铺名+店铺类型+国家、增加国家全写参数、增加国家缩写参数 end */
                    
                }
            });
        }

        // initShipInfo();
        function initShipInfo () {
            // $scope.shipCountry = 'US';
            $scope.shipCountry = $scope.parentscope.shipCountryCode;
            $scope.shipMethod = $scope.parentscope.merchShipMethod;
            // 这里将商品详情的选中的库存类型赋值给list scope中 ex: "CHINA"
            $scope.seleWare = $scope.parentscope.seleWare;
            if (language && language != 'en|en') { // 临时解决翻译带来的问题
                document.querySelector('#sele-logistic-name').innerHTML = $scope.shipMethod
            }
        }

        initVariant();
        function initVariant () {
            var tempStanProducts = JSON.parse(JSON.stringify($scope.parentscope.stanProducts));
            
            tempStanProducts.forEach(item => {
                item.STANDARD = item.STANDARD.replace("long=", "").replace("width=", "").replace("height=", "").split(",");
            })
            $scope.tempStanProducts = tempStanProducts;
        }
        function getReceiveCountries (fn) {
            
            
            
            function originProcess() {
                if ($scope.shopItem && $scope.shopItem.TYPE == 'shopee') {
                    if ($scope.shopItem.is_cb != 1) { // 国际站 取shipfrom国家
                        return [$scope.areaObj.countryCode]
                    } else { // 本土站
                        if ($scope.isPreOrder && $scope.isPreOrder == '1') { // 预售商品
                            return [$scope.areaObj.countryCode]
                        } else if ($scope.isPreOrder && $scope.isPreOrder == '0') { // 现售商品
                            return [$scope.shopItem.countryCode]
                        } else {
                            return [$scope.shopItem.countryCode]
                        }
                    }
                } else {
                    return [$scope.areaObj.countryCode];
                }
            }
            if($scope.parentscope.productdetail.PRODUCTTYPE === '5') {
                 dsp.getSupplierReceiveCountries({sku: $scope.parentscope.productdetail.SKU}, 
                    function (data) {
                        fn && fn(data);
                    })
            } else {
                dsp.getReceiveCountries({
                    // startCountryCodes: $scope.shopItem && $scope.shopItem.TYPE == 'shopee' ?
                    // $scope.shopItem.is_cb != 1 ? [$scope.areaObj.countryCode] : $scope.isPreOrder && $scope.isPreOrder == '1' ? [$scope.areaObj.countryCode] : [$scope.shopItem.countryCode] : [$scope.areaObj.countryCode],
                    startCountryCodes: originProcess(),
                    platForm: $scope.shopItem ? $scope.shopItem.TYPE ? $scope.shopItem.TYPE.toLowerCase() : '' : ''
                }, function (data) {
                    fn && fn(data);
                })
            }
        }
        function setCountryData(data) {
            $scope.receiveCountryList = data || [];
            if ($scope.receiveCountryList.length > 0) {
                var setFlag = 0;
                for (var i = 0; i < $scope.receiveCountryList.length; i++) {
                    if ($scope.receiveCountryList[i].code == 'US' ) {
                        // 优先选中美国
                        setFlag = 1;
                        $scope.shipCountry = 'US';
                        break;
                    }
                }
                if (!setFlag) {
                    $scope.shipCountry = $scope.receiveCountryList[0].code;
                }
            } else {
                $scope.shipCountry = '';
            }
        }

        function getShipList (fn) {
            dsp.getShipList({
                country: $scope.shipCountry,
                weight: $scope.parentscope.packWeight,
                // enName: $scope.shipMethod,
                pid: $scope.parentscope.detailId,
                character: $scope.parentscope.propertyKey,
                shopType: $scope.shopItem ? $scope.shopItem.TYPE ? $scope.shopItem.TYPE.toLowerCase() : '' : '',
                storeCountry: $scope.storeCountry ? $scope.storeCountry : '',
                area: $scope.shopItem && $scope.shopItem.TYPE == 'shopee' ? $scope.shopItem.is_cb != 1 ? $scope.areaObj.countryCode : $scope.isPreOrder && $scope.isPreOrder == '1' ?
                $scope.areaObj.countryCode : $scope.shopItem.countryCode : $scope.areaObj.countryCode,
                supplierId: $scope.parentscope.productdetail.supplier_id,
                productType: $scope.parentscope.productdetail.PRODUCTTYPE,
                sku: $scope.parentscope.productdetail.SKU,
                successCallback: function (data) {
                    fn && fn(data);
                    // insertShipcostToVariant(data);
                }
            })
        }

        function getMulShipList(fn) { // 这个是新的物流试算，需要传入商品的长宽高
            if(!$scope.shipCountry) {
                return fn && fn([]);
            }
            const params = $scope.parentscope.stanProducts.map(i => {
                return {
                    startCountryCode: $scope.shopItem && $scope.shopItem.TYPE == 'shopee' ? $scope.shopItem.is_cb != 1 ? $scope.areaObj.countryCode : $scope.isPreOrder && $scope.isPreOrder == '1' ?
                            $scope.areaObj.countryCode : $scope.shopItem.countryCode : $scope.areaObj.countryCode,
                    countryCode: $scope.shipCountry,
                    platform: $scope.shopItem ? $scope.shopItem.TYPE ? $scope.shopItem.TYPE.toLowerCase() : '' : '',
                    property: $scope.parentscope.propertyKey,
                    weight: i.PACKWEIGHT,
                    sku: $scope.id,
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
                    showShipMethodCost();
                }
            )
        }
        function getShipCost(fn) {
            dsp.getShipList({
                country: $scope.shipCountry,
                weight: $scope.parentscope.varientWeightArr.join(','),
                enName: $scope.shipMethod,
                pid: $scope.parentscope.detailId,
                character: $scope.parentscope.propertyKey,
                shopType: $scope.shopItem ? $scope.shopItem.TYPE ? $scope.shopItem.TYPE.toLowerCase() : '' : '',
                storeCountry: $scope.storeCountry ? $scope.storeCountry : '',
                area: $scope.shopItem && $scope.shopItem.TYPE == 'shopee' ? $scope.shopItem.is_cb != 1 ? $scope.areaObj.countryCode : $scope.isPreOrder && $scope.isPreOrder == '1' ?
                $scope.areaObj.countryCode : $scope.shopItem.countryCode : $scope.areaObj.countryCode,
                supplierId: $scope.parentscope.productdetail.supplier_id,
                productType: $scope.parentscope.productdetail.PRODUCTTYPE,
                sku: $scope.parentscope.productdetail.SKU,
                successCallback: function (data) {
                    fn && fn(data);
                    // insertShipcostToVariant(data);
                }
            })
        }

        function getMulShipCost(fn) {
            const params = $scope.parentscope.stanProducts.map(i => {
                return {
                    sku: i.SKU,
                    logisticsFreightRequest: {
                        sku: $scope.id,
                        startCountryCode: $scope.shopItem && $scope.shopItem.TYPE == 'shopee' ? $scope.shopItem.is_cb != 1 ? $scope.areaObj.countryCode : $scope.isPreOrder && $scope.isPreOrder == '1' ?
                            $scope.areaObj.countryCode : $scope.shopItem.countryCode : $scope.areaObj.countryCode,
                        countryCode: $scope.shipCountry,
                        logisticsName: $scope.shipMethod,
                        property: $scope.parentscope.propertyKey,
                        platform: $scope.shopItem ? $scope.shopItem.TYPE ? $scope.shopItem.TYPE.toLowerCase() : '' : '',
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

        
        function showShipMethodCost() {
            if($scope.wuliuList.length > 0 && $scope.shipMethod) {
                const isSelect = $scope.wuliuList.filter(e => e.logisticName == $scope.shipMethod);
                $scope.shipMethodTime = isSelect[0].aging;
                $scope.shipMethodCost = isSelect[0].price;
                $scope.shipMethodInfo = isSelect[0].aging != undefined ? 'Available' : 'Unavailable';
            } else {
                $scope.shipMethodTime = '';
                $scope.shipMethodCost = '';
                $scope.shipMethodInfo = '';
            }
            
        }
        $scope.chanShipMethod = function () {
            showShipMethodCost();
            if($scope.parentscope.productdetail.PRODUCTTYPE === '5') {
                getShipCost(function (data) {
                    insertShipcostToVariant(data);
                    $scope.wuliuList = data;
                })
            } else {
                getMulShipList(function (data2) {
                    $scope.wuliuList = data2;
                    if ($scope.wuliuList.length == 0 || JSON.stringify(data2)=="{}") {
                        $scope.shipMethod = '';
                        insertShipcostToVariant({})
                        
                        return;
                    }
                    getMulShipCost(function (data) {
                        insertShipcostToVariant(data);
                    })
                })
                
            }
        }

        // 全选
        $scope.checkAll = function () {
            const trackingData = {
                elementId: "011",
                actionType: "Selectall_click",
                list: [
                    {
                        fieldValue: $scope.id,
                        filedName: "productId"
                    }
                ]
            }
            if ($scope.check_All) {
                $scope.tempStanProducts.forEach((ele) => {
                    ele.check = true;
                });
                trackingData.select_state = "1"
            } else {
                $scope.tempStanProducts.forEach((ele) => {
                    ele.check = false;
                });
                trackingData.select_state = "0"
            }
            $global_tracking.pushData(trackingData)
        };
        // 单选
        $scope.checkOne = function (item, index) {
            
            if (item.check) {
                var num = 0;
                for (var i = 0; i < $scope.tempStanProducts.length; i++) {
                    if ($scope.tempStanProducts[i].check) {
                        num++;
                    }
                }
                if (num == $scope.tempStanProducts.length) {
                    $scope.check_All = true;
                    // 
                }
            } else {
                $scope.check_All = false;
            }
        }

        /** 批量修改 start================================================================================================================== */
        $scope.bulkOK = (type) => {
            // 
            if (type == "price") {
                let flag = true;
                $scope.tempStanProducts.forEach((ele) => {
                    if (ele.check) {
                        flag = false;
                        ele.sellPrice = $scope.bulkReviseValue;
                        // 泰国店铺批量修改价格时显示泰铢符号
                        if ($scope.CurrencyCode && $scope.CurrencyCode == 'THB' && $scope.shopItem &&
                            ($scope.shopItem.ThemeId == 'TH' || $scope.shopItem.MarketplaceUrl == 'th' || $scope.lazadaCountry == 'th'))
                        return ele.currencyUnit = '฿';
                    }
                });
                // 批量修改价格时的汇率转换
                bulkrateConvert($scope.CurrencyCode, $scope.bulkReviseValue, $scope.tempStanProducts.filter(item => item.check == true));
                if (flag) {
                    layer.msg('Please select a product to list. ');
                }
            } else if (type == "weight") {
                let flag = true;
                $scope.tempStanProducts.forEach((ele) => {
                    if (ele.check) {
                        flag = false;
                        ele.WEIGHT = $scope.bulkReviseValue;
                    }
                });
                if (flag) {
                    layer.msg('Please select a product to list. ');
                }
            } else if (type == "length") {
                let flag = true;
                $scope.tempStanProducts.forEach((ele) => {
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
                $scope.tempStanProducts.forEach((ele) => {
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
                $scope.tempStanProducts.forEach((ele) => {
                    if (ele.check) {
                        flag = false;
                        ele.STANDARD[2] = $scope.bulkReviseValue;
                    }
                });
                if (flag) {
                    layer.msg('Please select a product to list. ');
                }
            } else if (type === "inventory") {
                let flag = true;
                $scope.tempStanProducts.forEach((ele) => {
                    if (ele.check) {
                        flag = false;
                        if(Number(ele.inventory) <= Number($scope.bulkReviseValue || 0)) {
                            layer.msg('The listing quantity you input has exceeded the remaining inventory, so we fill in the maximum inventory for you. ');
                            ele.quantity = ele.inventory;
                        } else {
                            ele.quantity = $scope.bulkReviseValue;
                        }
                    }
                });
                if (flag) {
                    layer.msg('Please select a product to list. ');
                }
            }
        }
        /** 批量修改 end================================================================================================================== */

        // 物流试算数据插入变体列表
        function insertShipcostToVariant (data) {
            
            var stanProducts = $scope.tempStanProducts;
            $scope.tempStanProducts.forEach(function (item, index) {
                if(item.nowPrice==item.SELLPRICE)item.nowPrice=''
                if ($.isArray(data)) {
                    const selectedLogistic = data.find(i => i.sku === item.SKU);
                    if (data.length > 0 && selectedLogistic) {
                        item.shipCost = selectedLogistic.price;
                        item.shipCostDis = selectedLogistic.price;
                        item.freightDiscount = selectedLogistic.discount || 0;
                        item.amountPrice = (item.shipCostDis * 1 + (item.SELLPRICEDIS || item.sellPrice) * 1).toFixed(2);
                        if(item.nowPrice){
                            item._amountPrice = (item.shipCostDis * 1 + item.nowPrice * 1).toFixed(2);
                        }
                    } else {
                        item.shipCost = '';
                        item.shipCostDis = '';
                        item.freightDiscount = 0;
                        item.amountPrice = (item.shipCostDis * 1 + (item.SELLPRICEDIS || item.sellPrice) * 1).toFixed(2);
                    }
                } else {
                    if (JSON.stringify(data) == '{}') {
                        item.shipCost = '';
                        item.shipCostDis = '';
                        item.freightDiscount = 0;
                        item.amountPrice = (item.shipCostDis * 1 + (item.SELLPRICEDIS || item.sellPrice) * 1).toFixed(2);
                    } else {
                        if (data[item.PACKWEIGHT][0]) {
                            item.shipCost = data[item.PACKWEIGHT][0].discountPrice || data[item.PACKWEIGHT][0].price;
                            item.shipCostDis = data[item.PACKWEIGHT][0].price;
                            item.freightDiscount = data[item.PACKWEIGHT][0].discount || 0;
                            item.amountPrice = (item.shipCostDis * 1 + (item.SELLPRICEDIS || item.sellPrice) * 1).toFixed(2);
                            if(item.nowPrice){
                                item._amountPrice = (item.shipCostDis * 1 + item.nowPrice * 1).toFixed(2);
                            }
                        } else {
                            item.shipCost = '';
                            item.shipCostDis = '';
                            item.freightDiscount = 0;
                            item.amountPrice = (item.shipCostDis * 1 + (item.SELLPRICEDIS || item.sellPrice) * 1).toFixed(2);
                        }
                    }
                }
            })
            
            // $scope.tempStanProducts = stanProducts;
            

            // 临时解决翻译带来的问题
            if (language && language != 'en|en') {
                $('.stan-product-line').each(function (index) {
                    if (stanProducts[index].freightDiscount && stanProducts[index].freightDiscount > 0 && stanProducts[index].freightDiscount < 100) {
                        $(this).find('.yunfei2').show();
                        $(this).find('.yunfei').hide()
                    } else {
                        $(this).find('.yunfei').show();
                        if (stanProducts[index].shipCost) {
                            $(this).find('.yunfei').show().html($filter("exchangeRate")(stanProducts[index].shipCost));
                            // $(this).find('.amount').show().html($filter("exchangeRate")(stanProducts[index].amountPrice));
                        } else {
                            $(this).find('.yunfei').show().html('--')
                            // $(this).find('.amount').show().html('--');
                        }
                    }
                    


                })
            }

            $scope.tempStanProducts.forEach(v => {
                v._shipCost = $filter('exchangeRate')(v.shipCost);
                v._shipCostDis = $filter('exchangeRate')(v.shipCostDis)
                v._SELLPRICE = $filter('exchangeRate')(v.SELLPRICE);
                v._SELLPRICEDIS = $filter('exchangeRate')(v.SELLPRICEDIS)
                v._nowPrice = $filter('exchangeRate')(v.nowPrice)
                v.amountPrice = $filter('exchangeRate')(v.amountPrice)
                v._amountPrice = $filter('exchangeRate')(v._amountPrice)
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
                // $scope.category1 = '';
            }
        }

        $scope.newVendor = () => {
            if (!$scope.vendor) return layer.msg("Please input the new vendor.");
            if ($scope.vendor.length > 30) return layer.msg("vendor cannot exceed 30 characters.");
            if ($scope.vendor) {
                $scope.vendorList.push($scope.vendor)
                
                $scope.vendorType = 'select';
            }
        }

        // YourPrice切换货币
        $scope.selectCurrCode = () => {
            // 切换置空
            if ($scope.tempStanProducts) {
                $scope.tempStanProducts.forEach(e => {
                    e.sellPrice = '';
                    e.currencyUnit = '';
                    e.rateConverted = '';
                });
            }
        }

        /** 添加价格时要干的事情... start===================================================================================================================*/
        var priceTimer;
        $scope.addPrice = (currency, price, item, index) => {
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
            if ($scope.CurrencyCode && $scope.CurrencyCode == 'THB' && $scope.shopItem &&
                ($scope.shopItem.ThemeId == 'TH' || $scope.shopItem.MarketplaceUrl == 'th' || $scope.lazadaCountry == 'th')) {
                if (item.currencyUnit && price) return false;
                // 
                // 
                if (price) return item.currencyUnit = '฿';
                if (!price) return item.currencyUnit = null;
            }
        }
        // 验证用户输入价格是否符合规则
        $scope.handleVerificationPrice = (currency, price, item, index) => {
            if(!(/^\d{1,8}(\.\d{0,2})?$/.test(price))) {
                layer.msg('99,999,999.99 at most.');
                $scope.tempStanProducts[index].sellPrice = '';
                return false;
            }
            if(/^[0]*\.$/.test(price)) {
                $scope.tempStanProducts[index].sellPrice = 0;
            }
        }
        // eaby 添加库存 需要做一下库存限制，如果客户输入大于变体中最大库存给出提示并清空
        $scope.addQuantity = (quantity,inventory, index) => {
            
            if(Number(quantity) > Number(inventory)) {
                layer.msg(`The quantity should not exceed ${inventory}`)
                tempStanProducts[index].quantity = 0;
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

        // 告诉详情页pro-detail，inventory已经加载好了
        $scope.$emit('quick-list', {
            flag: 'ready'
        }); 
       
        /** 小屏list刊登弹窗新增 */
        $scope.scrollType = true;
        const scrollDom = $('.confirm-content')[0];
        scrollDom.addEventListener('scroll', (e) => {
            if (scrollDom.scrollTop > 300) 
            {
                $scope.$apply(function (){
                    $scope.displayScrollBtn = true;
                    $scope.scrollType = true
                });
            }

            if (scrollDom.scrollTop < 300) {
                $scope.$apply(function (){
                    if ($scope.isShouldMove) {
                        $scope.isShouldMove = false
                        return
                    }
                    $scope.displayScrollBtn = false;
                });
            }
        })

        $scope.showRightTip = true;
        $('.listNow-table-item')[0].addEventListener('scroll', (e) => {
            const dom = e.target;
            const scrollLf = dom.scrollLeft + dom.clientWidth;
            if (scrollLf >= dom.scrollWidth && $scope.showRightTip) {
                $scope.$apply(function (){
                    $scope.showRightTip = false;
                });
            }
            if (scrollLf < dom.scrollWidth && !$scope.showRightTip) {
                $scope.$apply(function (){
                    $scope.showRightTip = true;
                });
            }
        })

        $scope.scrollTableContent = function () {
            if ($scope.scrollType) {
                $scope.cookieScroll = scrollDom.scrollTop;
                scrollDom.scrollTop = 0;
                $scope.scrollType = false;
                $scope.isShouldMove = true;
            }
            else {
                scrollDom.scrollTop = $scope.cookieScroll;
                $scope.scrollType = true;
            }
        }

        /**
         * rutter 变体属性小于三个可以刊登
         */
        function rutterNotAllowThreeOption() {
            const variantKeys = $scope.tempVarientKeys
            if(variantKeys.length >= 3) $scope.rutterNotAllowModal = true
            return variantKeys.length >= 3
        }

        $scope.maxRutterTitleLen = 80 // 商品标题限制
        $scope.isRutter = () => {
            if(!$scope.shopItem || !$scope.shopItem.TYPE) return false
            return /(wix|etsy)/i.test($scope.shopItem.TYPE)
        }
        $scope.rutterProTitle = ''
        $scope.isRutterTitleAllow = function(){return $scope.rutterProTitle.length == 0 || $scope.rutterProTitle.length > $scope.maxRutterTitleLen}
    }




})(angular)
