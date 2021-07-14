(function (angular) {


  var comHeader = angular.module('CommonHeaderCom', ['utils', 'cjDotModule'])
  .component('commonHeader', {
    templateUrl: 'static/components/headerandfooters/common-header.html',
    controller: CommonHeaderCtrl,
    bindings: {
      imgurl: '=',
      vinfo: '=',
      onLog: '&',
      showWorkOrder: '&',
      calcExchangeRate: '&',
      store:'=',
    },
  });

  function CommonHeaderCtrl($scope, dsp, cjhome, $rootScope, $sce, $timeout, utils, $location,$window) {
    $scope.queueNum = 0;
    function createLottieAnimation() {
      setTimeout(() => {
        const dom = document.getElementById('myCJOutLine')
        if(!dom) return ;
        lottie.loadAnimation({
          container: dom, // the dom element that will contain the animation
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: '/egg/image/myCJWhite.json'// the path to the animation json
        });
      }, 2000)
    }
    createLottieAnimation();

    $scope.updateAuthHrefNew = (link) => {
      if(!$scope.hasLogin) {
        const base = new Base64();
        location.href = 'login.html?target=' + base.encode(link);
      } else {
        location.href = link;
      }
      
    }
    
   try {
     $scope.$on('catagrate-show', function (d, data) {
       $scope.isHomeFlag = !data;
       $scope.imgurl = $scope.isHomeFlag ? 'static/image/CJ-home/logo2.png' : 'egg/image/new_logo.svg'
     })
     $scope.i18next = dsp.i18next
     $scope.targetLng = dsp.targetLng
     $scope.ElitesUrl = dsp.getElitesUrl();
     /** 2019-12-16 商品搜索优化 */
     $scope.isHomeFlag = window.location.pathname === '/home.html' || window.location.pathname === '/' // 判断当前引用也是否为首页
     $scope.imgurl = $scope.isHomeFlag ? 'static/image/CJ-home/logo2.png' : 'egg/image/new_logo.svg'
     // ----------------------- 19-06-14 币种 -----------

    // -- 通过cookie同步币种信息-域名切换
    // -- 刷新页面是从currency里面拿的，currency是从首页带过来的，带过来后就不更新了
    const currencyIndexObj = dsp.cookieParser(dsp.getCookie('currency'));
    if(currencyIndexObj){
      utils.storage.set('rate_current-country',{
        ID: currencyIndexObj.ID,
        NAME: currencyIndexObj.NAME,
        currency: currencyIndexObj.currency,
      });
      utils.storage.set('rate_current-currency', {
        NAME: currencyIndexObj.NAME,
        currency: currencyIndexObj.currency,
      });
      utils.storage.set('rate_currency-symbol', currencyIndexObj.symbol);
      utils.storage.set('rate_exchange-rate', +currencyIndexObj.rate);
    }

    

     $scope.countryJsonData = utils.storage.get('country-json-data', {
       parse: true
     });
     $scope.currentCountry =
       utils.storage.get('rate_current-country', {
         parse: true
       }) || {};
       
     $scope.currentCountry1 = $scope.currentCountry;
     $scope.showSelectRateBox = false;
     $scope.showFlagList = false;
     $scope.showCurrencyList = false;
     $scope.countryJsonList = [];
     $scope.currencyListOrigin = [];
     $scope.currencyList = [];
     $scope.currentCurrency =
       utils.storage.get('rate_current-currency', {
         parse: true
       }) || {};
     $scope.currentCurrency1 = $scope.currentCurrency;
     $scope.showLanguageBox = false; // 默认不显示切换语言框
     $scope.exchangeRate = 1; // 货币汇率
     $scope.currencySymbol = '$'; // 货币符号
     $scope.store = this.store || '0';//0:默认；1：供应商
     $rootScope.emailVerifyStatus = localStorage.getItem('emailVerifyStatus'); // 1 邮箱已验证 3 邮箱未验证
     $scope.warehouseList = [{
       name: 'China Warehouse',
       val: 'china'
     }, {
       name: 'US Warehouse',
       val: 'us'
     }, {
       name: 'Thailand Warehouse',
       val: 'th'
     }];
     if ($scope.countryJsonData) {
       $scope.countryJsonList = $scope.countryJsonData.countryList;
       $scope.currencySymbol = getCurrencySymbol();
     }
    //  六国语言
    $scope.languages = ['zh', 'en', 'de', 'fr', 'id', 'th'];
    // 默认货币
    $scope.currency = $scope.currentCountry || { symbol: "$", currency: "USD", NAME: "美元", rate: "1" };
    // 所有语言
    $scope.flagList = [
      { opt: "en|en", name: ('English'), flag: 'US' },
      { opt: "en|af", name: ('Afrikaans'), flag: 'ZA' },
      { opt: "en|sq", name: ('Albanian'), flag: 'AL' },
      { opt: "en|ar", name: ('Arabic'), flag: 'SA' },
      { opt: "en|hy", name: ('Armenian'), flag: 'AM' },
      { opt: "en|az", name: ('Azerbaijani') },
      { opt: "en|be", name: ('Belarusian'), flag: 'BY' },
      { opt: "en|bg", name: ('Bulgarian') },
      { opt: "en|zh-CN", name: ('Chinese (Simplified)'), flag: 'CN' },
      { opt: "en|zh-TW", name: ('Chinese (Traditional)'), flag: 'CN' },
      { opt: "en|hr", name: ('Croatian') },
      { opt: "en|cs", name: ('Czech'), flag: 'CZ' },
      { opt: "en|da", name: ('Danish'), flag: 'DK' },
      { opt: "en|nl", name: ('Dutch') },
      { opt: "en|et", name: ('Estonian'), flag: 'EE' },
      { opt: "en|tl", name: ('Filipino'), flag: 'PH' },
      { opt: "en|fi", name: ('Finnish') },
      { opt: "en|fr", name: ('French') },
      { opt: "en|ka", name: ('Georgian'), flag: 'GE' },
      { opt: "en|de", name: ('German') },
      { opt: "en|el", name: ('Greek'), flag: 'GR' },
      { opt: "en|hi", name: ('Hindi'), flag: 'HT' },
      { opt: "en|hu", name: ('Hungarian') },
      { opt: "en|is", name: ('Icelandic') },
      { opt: "en|id", name: ('Indonesian') },
      { opt: "en|ga", name: ('Irish'), flag: 'IE' },
      { opt: "en|it", name: ('Italian') },
      { opt: "en|ja", name: ('Japanese'), flag: 'JP' },
      { opt: "en|ko", name: ('Korean'), flag: 'KR' },
      { opt: "en|lv", name: ('Latvian') },
      { opt: "en|lt", name: ('Lithuanian') },
      { opt: "en|mk", name: ('Macedonian') },
      { opt: "en|ms", name: ('Malay'), flag: 'MY' },
      { opt: "en|mt", name: ('Maltese') },
      { opt: "en|no", name: ('Norwegian') },
      { opt: "en|pl", name: ('Polish') },
      { opt: "en|pt", name: ('Portuguese') },
      { opt: "en|ro", name: ('Romanian') },
      { opt: "en|ru", name: ('Russian') },
      { opt: "en|sr", name: ('Serbian'), flag: 'RS' },
      { opt: "en|sk", name: ('Slovak') },
      { opt: "en|sl", name: ('Slovenian'), flag: 'SI' },
      { opt: "en|es", name: ('Spanish') },
      { opt: "en|sw", name: ('Swahili'), flag: 'SJ' },
      { opt: "en|sv", name: ('Swedish'), flag: 'SE' },
      { opt: "en|th", name: ('Thai') },
      { opt: "en|tr", name: ('Turkish') },
      { opt: "en|uk", name: ('Ukrainian'), flag: 'UA' },
      { opt: "en|ur", name: ('Urdu'), flag: 'PK' },
      { opt: "en|vi", name: ('Vietnamese'), flag: 'VN' },
      { opt: "en|cy", name: ('Welsh'), flag: 'WELSH' },
      { opt: "en|yi", name: ('Yiddish'), flag: 'YIDDISH' },
    ];
    // 默认语言
    const currencyLanguage = $scope.flagList.filter(item => item.opt == (window.localStorage.getItem('language') || "en|en"));
    $scope.language = currencyLanguage[0];
    // 所有货币
    $scope.currencyList = [];
    $scope.visibleSelect1 = false;
    $scope.flagSrc = (item) => {
      const tmp = item.flag || item.opt.split('|')[1].toUpperCase();
      return `/egg/image/home/flag/${tmp}.png`
    }
    $scope.clickSelectBox1 = () => {
      $scope.visibleSelect1 = !$scope.visibleSelect1;
      $scope.visibleSelect2 = false
    }
    $scope.clickSelectBox2 = () => {
      $scope.visibleSelect2 = !$scope.visibleSelect2;
      $scope.visibleSelect1 = false;
    }
    $scope.handleChangeLauguage = (item) => {
      $scope.language = item;
      $scope.visibleSelect1 = false;
      window.localStorage.setItem('language', item.opt)
      
      // 设置语言到cookie, 并刷新页面
      var raw_lng = item.opt.split('|')[1];
      var _lng = /zh-CN/.test(raw_lng) ? 'zh' : raw_lng;
      dsp.delCookie('googtrans');
       // 设置主域及子域
      dsp.setCookie('googtrans', '/' + item.opt.replace('|', '/'), '', __root__domain);
      dsp.setCookie('googtrans', '/' + item.opt.replace('|', '/'), '');
      document.cookie = `lng=${_lng}; expires=Fri, 31 Dec 2030 23:59:59 GMT; domain=${__root__domain}`;
      // 设置主域language，此为lng桥梁
      document.cookie = `language=${item.opt}; expires=Fri, 31 Dec 2030 23:59:59 GMT; domain=${__root__domain}`;
      window.doGTranslate && window.doGTranslate(item.opt); // gtranslate 翻译
      location.reload();
    }

     function getCurrencySymbol(symbol = $scope.countryJsonData.symbol) {
       try {
         var tmp = symbol.filter(json => {
           return json.currency === $scope.currentCurrency.currency;
         });

         return tmp[0] ? tmp[0].symbol : '$';
       } catch (e) {
         return '$';
       }
     }

     dsp.postFun('cjEvaluation/getEvalSupplierCount' , {
        }, function(res) {
            if(res.status === 200 && res.data.code === 200) {
                $scope.evaluteCount = res.data.data.count;
            }
        })

     function resetExchangeRate() {
       // document.getElementById('national-flag-input-flag').value = '';
      //  document.getElementById('national-flag-input-currency').value = '';
       $scope.countryJsonList = $scope.countryJsonData.countryList;
       $scope.currencyList = $scope.currencyListOrigin;
       $scope.showFlagList = false;
       $scope.showCurrencyList = false;
     }
     getCountryData(
       function (data) {
         // if 赋值顺序不要乱
         if (data.currentCountry) {
           $scope.currentCountry = $scope.currentCountry1 = data.currentCountry;
         }
         if (!$scope.currentCurrency.currency) {
           $scope.currentCurrency = {
             currency: $scope.currentCountry.currency,
             NAME: $scope.currentCountry.NAME
           };
           $scope.currentCurrency1 = $scope.currentCurrency;
         }
         if (!$scope.countryJsonData) {
           $scope.countryJsonData = data;
           $scope.countryJsonList = data.countryList;
         }
         $scope.currencySymbol = getCurrencySymbol(data.symbol); // data.symbol 变成undefined时，函数入参口就会取默认值 ^_^
         $scope.currencyList = $scope.currencyListOrigin = data.symbol; // 取数据的symbol
         getExchangeRate($scope.currentCurrency.currency);
       },
       {
         countryList: $scope.countryJsonData ? 0 : 1,
         symbol: 1, // 是否获取币种 固定取过来
         currentCountry: $scope.currentCountry.currency ? 0 : 1
       }
     );

     $scope.searchInList = utils.debounce(function (flag, keywords) {
       if (flag === 'flag') {
         // 搜国家
         $scope.countryJsonList = $scope.countryJsonData.countryList.filter(
           item =>
             // 忽略大小写
             item.NAME_EN.toUpperCase().includes(keywords.toUpperCase()) ||
             item.NAME.includes(keywords)
         );
       } else if (flag === 'currency') {
         // 搜币种
         $scope.currencyList = $scope.currencyListOrigin.filter(
           item =>
             // 忽略大小写
             item.currency.toUpperCase().includes(keywords.toUpperCase()) ||
             item.NAME.includes(keywords)
         );
       }
       $scope.$apply();
     });
     $scope.toggleShowSelectRateBox = function (ev) {
      $scope.showLanguageBox = !$scope.showLanguageBox;
       ev && ev.stopPropagation();
       if (($scope.showSelectRateBox = !$scope.showSelectRateBox)) {
         document.documentElement.addEventListener('click', clickShipToSpan); // 点击页面关闭，有 BUG
       } else {
         resetExchangeRate();
         document.documentElement.removeEventListener('click', clickShipToSpan);
       }
     };
     $scope.toggleShowSelect = function (ev, flag) {
       // 点击隔离
       ev.stopPropagation();
       if (flag === 'flag') {
         $scope.showCurrencyList = false;
         $scope.showFlagList = !$scope.showFlagList;
       } else if (flag === 'currency') {
         $scope.showFlagList = false;
         $scope.showCurrencyList = !$scope.showCurrencyList;
       }
     };
     $scope.clickSearchInput = function (ev) {
       ev && ev.stopPropagation();
     };
     $scope.clickFlagItem = function (ev, flag, item) {
       ev && ev.stopPropagation();
       if (flag === 'flag') {
         $scope.showFlagList = false;
         $scope.currentCountry1 = item;
       } else if (flag === 'currency') {
         $scope.showCurrencyList = false;
         $scope.currency = item;
         $scope.visibleSelect2 = false;
       }
       $scope.currentCurrency1 = {
         currency: item.currency,
         NAME: item.NAME,
         ID: $scope.currentCountry1.ID
       };
     };
     $scope.clickSelectWrap = function (ev) {
       ev && ev.stopPropagation();
       resetExchangeRate();
     };
     $scope.saveExchangeRate = function (ev) {
       ev && ev.stopPropagation();
      //  utils.storage.set(
      //    'rate_current-country',
      //    ($scope.currentCountry = $scope.currentCountry1)
      //  );
      utils.storage.set(
        'rate_current-country',
        ($scope.currentCountry = $scope.currentCurrency1)
      );
       $scope.currentCurrency = $scope.currentCurrency1;
       $scope.currency = $scope.currentCurrency1;
       $scope.currencySymbol = getCurrencySymbol();
       utils.storage.set('rate_current-currency', $scope.currentCurrency);
       utils.storage.set('rate_currency-symbol', $scope.currencySymbol);
       getExchangeRate($scope.currentCurrency.currency);
       $timeout(function () {
         // 延迟关闭，不然getBoundingClientRect会失效
         document.getElementById('national-flag-ship-to').click();
         $scope.$emit('rate_currency-symbol', $scope.currencySymbol);
         // // $scope.showSelectRateBox = false;
         // resetExchangeRate();
       }, 40);

      // -- 通过cookie同步币种信息-域名切换
      const currencyObj = {
        symbol: $scope.currencySymbol,
        currency: $scope.currentCurrency.currency,
        NAME: $scope.currentCurrency.NAME,
        ID: $scope.currentCountry1.ID,
      }
      // if (window.environment == 'production-cn' || window.environment == 'production') {
      //   dsp.setCookie('currency_notindex', encodeURIComponent(dsp.cookieGenerator(currencyObj)), 3, __root__domain);
      // } else {
      dsp.setCookie('currency_notindex', encodeURIComponent(dsp.cookieGenerator(currencyObj)), 3, __root__domain);
      dsp.setCookie('currency', encodeURIComponent(dsp.cookieGenerator(currencyObj)), 3, __root__domain);
      // }

       window.location.reload();
     };
     /** 点击任意地方关闭货币选择弹窗 */
     function clickShipToSpan(ev) {
       let rect = document
         .getElementById('national-flag-select-wrap')
         .getBoundingClientRect();

       if (
         ev.clientX < rect.x ||
         ev.clientX > rect.x + rect.width ||
         (ev.clientY < rect.y || ev.clientY > rect.y + rect.height)
       ) {
         document.getElementById('national-flag-ship-to').click();
       }
     }

     function getCountryData(fn, params = {}) {
       var _params = Object.assign(
         {
           countryList: 0, // 国家列表: 0不需要，1需要
           currency: 1, // 货币
           currentCountry: 1, // 当前IP国家
           symbol: 1,         // 币种符号
         },
         params
       );

       dsp.postFun(
         'cj/homePage/getCountryInfo',
         _params,
         function (res) {
           if (res.data.statusCode == '200') {
             fn(res.data.result);
             if (res.data.result.countryList) {
               setTimeout(() => {
                 window.localStorage.setItem(
                   'country-json-data',
                   JSON.stringify(res.data.result)
                 );
               });
             }
           } else {
             console.warn('获取国家失败', res);
           }
         },
         function (err) {
           console.warn(err);
         }
       );
     }

     function getExchangeRate(currencyCode, fn) {
       dsp.postFun(
         'cj/homePage/exchangeRate',
         {
           toCode: currencyCode
         },
         function (res) {
           if (res.data.statusCode == '200') {
             fn && fn(res.data.result);
             $scope.exchangeRate = res.data.result;
             utils.storage.set('rate_exchange-rate', +$scope.exchangeRate);
             utils.storage.set('rate_currency-symbol', $scope.currencySymbol);

             $rootScope.$emit('calc-exchange-rate', +$scope.exchangeRate);
           } else {
             console.warn('获取汇率失败', res);
           }
         },
         function (err) {
           console.warn(err);
         }
       );
     }
     // -----------------------

     //------------------------------------------------
     let bs = new Base64();
     $scope.userId = localStorage.getItem('userId') ? bs.decode(localStorage.getItem('userId')) : '';
     $scope.email = localStorage.getItem('email') ? bs.decode(localStorage.getItem('email')) : '';
     $scope.loginName = localStorage.getItem('firstName')
       ? bs.decode(localStorage.getItem('firstName'))
       : (localStorage.getItem('loginName')
         ? bs.decode(localStorage.getItem('loginName'))
         : '');
     $scope.subAccountName = localStorage.getItem('subAccountName')
       ? bs.decode(localStorage.getItem('subAccountName')) : ''
     $scope.token =
       localStorage.getItem('token') == undefined
         ? ''
         : bs.decode(localStorage.getItem('token'));
     $scope.hasLogin = dsp.isInLoginState(); //是否登录
     $scope.searchMerchName = dsp.getQueryString('search') || ''; //搜索框
     $scope.isSwitch = false; // 切换第三方网站
     $scope.fromCountry = dsp.getQueryString('from') || 'all'; // 国家类型：所有、China，us
     $scope.fromType = dsp.getQueryString('fromType') || 'all'; //商品类型：所有、list、source、video
     $scope.categoryId = ''; // 搜索类目id
     $scope.categoryName = 'All Categories'; // 搜索类目name
     $scope.isPod = location.pathname.includes('PrintonDemand');
     $scope.avatar = localStorage.getItem('avatar') ? bs.decode(localStorage.getItem('avatar')) : '';
     $scope.$on('userinfo', function (d, data) {
       $scope.loginName = data.firstName || $scope.loginName;
       $scope.avatar = data.avatar;
     })
     //用户名处理
     angular.element(document).ready(() => {
       $scope.userName = $('.user-name').width() >= 70 ? $scope.loginName : '';
     });
     // 快捷导航
     var ouLinks = {
       authorization: [
        { name: 'Shopify', href: '/myCJ.html#/authorize/Shopify' },
        { name: 'eBay',  href: '/myCJ.html#/authorize/Ebay' },
        { name: 'Woocommerce',  href: '/myCJ.html#/authorize/Woocommerce' },
        { name: 'ShipStation',  href: '/myCJ.html#/authorize/Shipstation' },
        { name: 'API',  href: '/myCJ.html#/authorize/API' },
        { name: 'Lazada',  href: '/myCJ.html#/authorize/Lazada' },
        { name: 'Shopee',  href: '/myCJ.html#/authorize/Shopee' },
        // { name: 'Etsy',  href: '/myCJ.html#/authorize/Etsy' },
        { name: 'Wix',  href: '/myCJ.html#/authorize/Wix' },
      ],
       sourcing: 'myCJ.html#/sourcing?track=5',
       wishlist: 'myCJ.html#/myCJ-favorites?track=2',
       mycj: 'myCJ.html#/myCJAssociatedStore?track=6'
     }
     if (!$scope.hasLogin) {
       for (var k in ouLinks) {
         if (k = 'authorization'){
            for (var kk in ouLinks[k]) {
              ouLinks[k][kk].href = 'login.html?target=' + bs.encode(ouLinks[k][kk].href);
            }
         } else {
          ouLinks[k] = 'login.html?target=' + bs.encode(ouLinks[k]);
         }
       }
     };
     $scope.ouLinks = ouLinks;

     //退出登陆
     $scope.logOut = () => {
       cjhome.logout2($scope);
     };
     $scope.iKnown = () => {
       dsp.postFun(
         'pojo/issue/updateCjIssueHint',
         {},
         function (data) {
           if (data.data.statusCode == '200') {
             $('.ticketXS').hide();
             $('.notice-1').hide();
           }
         },
         function () { }
       );
     };
     //newUser
     $scope.newUser = () => {
       var isFirstLogin = localStorage.getItem('isFirstLogin');
       var isEmpower = localStorage.getItem('isEmpower');
       // isFirstLogin = '1'
       // isEmpower = '0'
       if (isFirstLogin == '0') {
       } else if (isFirstLogin == '1' && isEmpower == '0') {
         $scope.addStatisFun(8);
         //已登录未授权 第一步
         //var li = $('.main-nav>li:first-child');
         // var li = $('#my_cj_tab');
         if (
           $scope.iscj == '1' ||
           $scope.affModel == '1' ||
           $scope.affModel == '4'
         ) {
           var li = $('#my_cj_tab');
           var left = getElementLeft(li[0]) - 18;
           var top = getElementTop(li[0]) - 8;
         } else {
           var li = $('#my_cj_tab2');
           var left = getElementLeft(li[0]);
           var top = getElementTop(li[0]);
         }
        $('.online-wrap').css({
          top: top + 'px',
          left: left + 'px'
        });
        // $('.zzc').show();
        localStorage.setItem('isFirstLogin', '0');
      } else if (isFirstLogin == '1' && isEmpower == '2') {
        //已授权 第二步
        localStorage.setItem('closeFlag', '');
        location.href = 'myCJ.html#/myCJAssociatedStore?track=8';
        localStorage.setItem('isEmpower', '1');
      }
    };
    //搜索
    $scope.searchByMerchName = () => {
      if (!$scope.searchMerchName.trim()) {
        layer.msg('Please enter keywords!');
        return;
      }
      const searchMerchName = encodeURIComponent($scope.searchMerchName)
      let arr = [
        {
          id: $scope.categoryId,
          name: $scope.categoryName
        }
      ];
      if ($scope.isPod && searchMerchName.trim()) {
        location.href = `PrintonDemand.html?Search=${
          searchMerchName
        }&category=${bs.encode(
          JSON.stringify({
            id: $scope.categoryId,
            name: $scope.categoryName
          })
        )}`;
      } else {
        location.href = `list-detail?${$rootScope.fromWhere === 'warehouses' ? `from=${$rootScope.fromCountry}` : ''}&search=${searchMerchName}&id=${$scope.categoryId}&name=${bs.encode(JSON.stringify(arr))}&fromWhere=${$rootScope.fromWhere || ''}`;
      }
    };
    $scope.enterSearch = event => {
      if (event.keyCode == 13) {
        $scope.searchByMerchName();
      }
    };
    /*第三方网站*/
    //去1688/taobao/插件处理
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
        $rootScope.isSwitch = true;
        $scope.SwitchURL = $sce.trustAsResourceUrl('https://www.1688.com/');
        $scope.backFlag = true;
        $scope.yaoliuFlag = false;
        $scope.taobaoFlag = true;
      } else {
        $scope.isCJPub = true;
      }
    };
    $scope.goToTaobao = () => {
      $scope.addStatisFun(9);
      if (isCrx) {
        $rootScope.isSwitch = true;
        $scope.SwitchURL = $sce.trustAsResourceUrl('https://www.taobao.com/');
        $scope.backFlag = true;
        $scope.yaoliuFlag = true;
        $scope.taobaoFlag = false;
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
        window.open('https://www.shopify.com/');
      } else {
        $scope.isCJPub = true;
      }
    };
    $scope.backCJ = () => {
      $scope.addStatisFun(9);
      $rootScope.isSwitch = false;
      $scope.backFlag = false;
      $scope.yaoliuFlag = true;
      $scope.taobaoFlag = true;
    };
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
       sessionStorage.setItem('isInstallCJPub', '1');
     };
  
     // 去验证邮件页面
     $scope.handleVerifyEmail = () => {
       location.href = `verify_email.html?target=${bs.encode(location.href)}`
     };
     
     //页面滚动，头部导航栏变化
     $(document).scroll(() => {
       $scope.scrollTop = $(document).scrollTop();
       $scope.scrollTopNum = document.getElementsByClassName('header-nav')[0].clientHeight;
       $scope.$apply();
     });


     const warehousesDom = document.querySelector('.Warehouses-box')
     const warehousesArrDom = document.querySelector('.arrow-container .arrow')
     $scope.arrowFun = () => {
       if (document.querySelector('.Warehouses-box li')) {
         warehousesArrDom.style.width = document.querySelector('.Warehouses-box li').offsetWidth + 'px'
       }
     };
     $scope.scrollSmoothTo = (dom, position) => {
       if (!window.requestAnimationFrame) {
         window.requestAnimationFrame = function (callback, element) {
           return setTimeout(callback, 17);
         };
       }
       // 当前滚动高度
       var scrollTop = dom.scrollTop;
       // 滚动step方法
       var step = function () {
         // 距离目标滚动距离
         var distance = position - scrollTop;
         // 目标滚动位置
         scrollTop = scrollTop + distance / 5;
         if (Math.abs(distance) < 1) {
           dom.scrollTo(0, position);
         } else {
           dom.scrollTo(0, scrollTop);
           window.requestAnimationFrame(step);
         }
       };
       step();
     }
     $scope.warehousesArrowClick = () => {
       const top = warehousesDom.scrollTop + warehousesDom.clientHeight
       if (top > warehousesDom.scrollHeight - 30) {
         $scope.scrollSmoothTo(warehousesDom, 0)
         return
       }
       const scrollTopNum = 38 * 5 + warehousesDom.scrollTop
       $scope.scrollSmoothTo(warehousesDom, scrollTopNum)
     }
     if (warehousesDom && warehousesArrDom) {
       warehousesDom.addEventListener('scroll', function (ev) {
         const top = ev.target.scrollTop + ev.target.clientHeight
         if (top > ev.target.scrollHeight - 30) {
           warehousesArrDom.classList.add("deg");
         } else {
           warehousesArrDom.classList.remove("deg");
         }
       });
     }

     
     //获取类目
     if ($scope.isPod) {
       //获取pod类目
       dsp.getPodCategory(data => {
        $rootScope.CategoryList = data;
        sessionStorage.setItem(
          'podCategoryList',
          JSON.stringify($rootScope.CategoryList)
        );
        addLinkToCateOne()
        initTopCategory($rootScope.CategoryList)
      });
    } else {
      //所有类目
      dsp.getCateList(data => {
        $rootScope.CategoryList = data;
        sessionStorage.setItem(
          'CategoryList',
          JSON.stringify($rootScope.CategoryList)
        );
        addLinkToCateOne()
        initTopCategory($rootScope.CategoryList)
      });
    }
    //打开类目窗口
    $scope.toggleCategory = ev => {
      ev && ev.stopPropagation();
      if (($scope.isShowCategory = !$scope.isShowCategory)) {
        document.documentElement.addEventListener('click', clickShipToCategory); // 点击页面关闭，有 BUG
      } else {
        //resetExchangeRate();
        document.documentElement.removeEventListener(
          'click',
          clickShipToCategory
        );
      }
    }
    // ----------------------- 19-12-17 搜索优化 ----------
    $scope.isCategoryHover = false
    $scope.categoryImgUrl = 'static/image/CJ-home/categoryIcon.svg'
    $scope.secondList = []
    function initTopCategory(list) {
      $scope.topCategoryList = JSON.parse(JSON.stringify(list)) || []
      $scope.topCategoryList = $scope.topCategoryList.map(item => {
        item.isHover = false
        return item
      })
    }
    //一级类目鼠标移入
    $scope.getSecondData = (category, type) => {
      $scope.topCategoryList = $scope.topCategoryList.map(item => {
        item.isHover = type === 'mouseenter' ? item.id === category.id : false
        return item
      })
      $scope.secondList = type === 'mouseenter' ? category.children || [] : []
      $scope.firstCategory = category
      addLinkToCateTAT()
    }
    function addLinkToCateTAT() {
      // cjhome.toMerchList(id, JSON.stringify(arr), $scope.fromCountry, $scope.fromType);
      $scope.secondList.forEach(function (o2, i) {
        var itemArr = [$scope.firstCategory, o2];
        var arr = [];
        itemArr.forEach(item => {
          arr.push({ id: item.id, name: item.nameEn })
        })
        o2.aLink = 'list-detail?id=' + o2.id + '&name=' + bs.encode(JSON.stringify(arr)) + '&from=' + $scope.fromCountry + '&fromType=' + $scope.fromType;
        o2.children.forEach(o3 => {
          var itemArr = [$scope.firstCategory, o2, o3];
          var arr = [];
          itemArr.forEach(item => {
            arr.push({ id: item.id, name: item.nameEn })
          })
          o3.aLink = 'list-detail?id=' + o3.id + '&name=' + bs.encode(JSON.stringify(arr)) + '&from=' + $scope.fromCountry + '&fromType=' + $scope.fromType;
        })
      })
    }
    //点击类目进行搜索
    $scope.toMerchList = (id, list) => {
      if ($scope.isPod) {
        const _obj = list[0] || {}
        location.href = `PrintonDemand.html?Search=&category=${bs.encode(JSON.stringify({
          id: _obj.id,
          name: _obj.nameEn
        }))}`
      } else {
        let arr = []
        list.forEach(item => {
          arr.push({id: item.id, name: item.nameEn})
        })
        arr = bs.encode(JSON.stringify(arr))
        location.href = `list-detail?${$rootScope.fromWhere === 'warehouses' ? `from=${$rootScope.fromCountry}` : ''}&id=${id}&name=${arr}&fromWhere=${$rootScope.fromWhere || ''}`
      }
    }
    // 类目超链接
    function addLinkToCateOne() {
      // cjhome.toMerchList(id, JSON.stringify(arr), $scope.fromCountry, $scope.fromType);
      $rootScope.CategoryList.forEach(function (o, i) {
        var arr = [];
        arr.push({ id: o.id, name: o.nameEn })
        o.aLink = 'list-detail?id=' + o.id + '&name=' + bs.encode(JSON.stringify(arr)) + '&from=' + $scope.fromCountry + '&fromType=' + $scope.fromType;
      })
    }


    /** 点击任意地方关闭货币选择弹窗 */
    function clickShipToCategory(ev) {
      let rect = document
        .getElementById('category-span')
        .getBoundingClientRect();
      if (
        ev.clientX < rect.x ||
        ev.clientX > rect.x + rect.width ||
        (ev.clientY < rect.y || ev.clientY > rect.y + rect.height)
      ) {
        document.getElementById('category-span').click();
      }
    }
    //类目点击
    $scope.categoryItemClick = item => {
      if (item === 'all') {
        $scope.categoryId = '';
        $scope.categoryName = 'All Categories';
      } else {
        $scope.categoryId = item.id;
        $scope.categoryName = item.nameEn;
      }
    };
    // let isFirstLogin = localStorage.getItem('isFirstLogin');
    // if (isFirstLogin == '0') {
    //   let elm = document.getElementById('my-cj');
    //   let left = getElementLeft(elm);
    //   let top = getElementTop(elm) - 10;
    //   console.log(top);
    //   $('.online-wrap').css({
    //     top: 0 + 'px',
    //     left: left + 'px'
    //   });
    //   // $('.zzc').show();
    //   document.body.addEventListener('touchmove', bodyScroll, false);
    //   $('body').css({
    //     position: 'fixed',
    //     width: '100%'
    //   });
    // }

     //第一次登陆处理
     function bodyScroll(event) {
       event.preventDefault();
     }

    $('.online-content').click(function() {
      localStorage.setItem('closeFlag', '');
      location.href = $scope.ouLinks.mycj;
    });
    $('.know').click(function() {
      localStorage.setItem('closeFlag', '1');
      location.href = 'myCJ.html#/myCJAssociatedStore';
    });

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
     $scope.toMyStore = function () {
       if (!$scope.searchMerchName) {
         return layer.msg('Please enter keywords!');
       }
       $scope.$emit('store-search', $scope.searchMerchName);
     }
     $scope.conTactFun = function () {
       window.postMessage({ flag: 'openChat', supplierId: $scope.shopData.supplierId, shopName: $scope.shopData.name }, '*')
     }
     //翻译及其国旗图标
     if (window.localStorage.getItem('language')) {
       $scope.translateData = window.localStorage.getItem('language')
       // 亦可
       dsp.delCookie('googtrans');
       // 设置主域及子域
       dsp.setCookie('googtrans', '/' + $scope.translateData.replace('|', '/'), '', __root__domain);
       dsp.setCookie('googtrans', '/' + $scope.translateData.replace('|', '/'), '');
     } else {
       // 获取系统默认语言
       let language = navigator.language ? navigator.language : 'en';
       if (language.indexOf('en') != -1) {
         language = 'en';
       } else if (language.indexOf('zh') != -1) {
         language = 'zh-CN';
       }
       $scope.translateData = 'en|' + language;
       window.localStorage.setItem('language', $scope.translateData);
       dsp.delCookie('googtrans');
       // 默认语言亦需同步主域和子域
       dsp.setCookie('googtrans', '/' + $scope.translateData.replace('|', '/'), '', __root__domain);
       dsp.setCookie('googtrans', '/' + $scope.translateData.replace('|', '/'), '');
     }
     $scope.$watch('translateData', function () {
       // 同步首页语言设置
      var item = $scope.translateData;
      var raw_lng = item.split('|')[1];
      var _lng = /zh-CN/.test(raw_lng) ? 'zh' : raw_lng;
      document.cookie = `lng=${_lng}; expires=Fri, 31 Dec 2030 23:59:59 GMT; domain=${__root__domain}`;
      // 设置主域language，此为lng桥梁
      document.cookie = `language=${$scope.translateData}; expires=Fri, 31 Dec 2030 23:59:59 GMT; domain=${__root__domain}`;
        // 同步首页语言结束
       window.localStorage.setItem('language', $scope.translateData);
       let odata = $scope.translateData.split('|')[1].toUpperCase();
       if (odata == 'EN' || odata == 'CY' || odata == 'YI') {
         $scope.translateDataID = 'US';
       } else if (odata == 'AF') {
         $scope.translateDataID = 'ZA';
       } else if (odata == 'SQ') {
         $scope.translateDataID = 'AL';
       } else if (odata == 'AR') {
         $scope.translateDataID = 'SA';
       } else if (odata == 'HY') {
         $scope.translateDataID = 'AM';
       } else if (odata == 'BE') {
         $scope.translateDataID = 'BY';
       } else if (odata == 'CS') {
         $scope.translateDataID = 'CZ';
       } else if (odata == 'DA') {
         $scope.translateDataID = 'DK';
       } else if (odata == 'ET') {
         $scope.translateDataID = 'EE';
       } else if (odata == 'TL') {
         $scope.translateDataID = 'PH';
       } else if (odata == 'KA') {
         $scope.translateDataID = 'GE';
       } else if (odata == 'EL') {
         $scope.translateDataID = 'GR';
       } else if (odata == 'HI') {
         $scope.translateDataID = 'HT';
       } else if (odata == 'GA') {
         $scope.translateDataID = 'IE';
       } else if (odata == 'JA') {
         $scope.translateDataID = 'JP';
       } else if (odata == 'KO') {
         $scope.translateDataID = 'KR';
       } else if (odata == 'MS') {
         $scope.translateDataID = 'MY';
       } else if (odata == 'SR') {
         $scope.translateDataID = 'RS';
       } else if (odata == 'SL') {
         $scope.translateDataID = 'SI';
       } else if (odata == 'SW') {
         $scope.translateDataID = 'SJ';
       } else if (odata == 'SV') {
         $scope.translateDataID = 'SE';
       } else if (odata == 'UK') {
         $scope.translateDataID = 'UA';
       } else if (odata == 'UR') {
         $scope.translateDataID = 'PK';
       } else if (odata == 'VI') {
         $scope.translateDataID = 'VN';
       } else if (odata == 'ZH-CN' || odata == 'ZH-TW') {
         $scope.translateDataID = 'CN';
       } else {
         $scope.translateDataID = odata;
       }
     });

     $scope.isSearchImage = dsp.getQueryString('searchImg')
     function searchImg(file){
      const fileName = file.name;
      // 图片格式 allow: *.jpg/*.png/*.png/*.JPG
      if (!/.png|.jpg|.PNG|.JPG$/.test(fileName)) {
        return layer.msg('Invalid image. Only JPG and PNG supported.');
      }
      // 图片大小处理
      if (file.size > 1024 * 1024 * 1.5) {
        return layer.msg('1.5MB is the max image size');
      }
      const url = URL.createObjectURL(file); // 获取图片暂时性链接
      // $scope.imgArr = url; // 输入框图片显示
      fetch(url)
        .then(pic => pic.blob()) // 通过 fetch 将图片转 blob
        .then(pic => {
          const fr = new FileReader(); // 通过fileReader 转 dataURL
          fr.onload = () => {
            const dataURL = fr.result;
            // 将 图片信息 存进 localStorage
            localStorage['_search_pic_'] = JSON.stringify({
              dataURL,
              fileName
            });
          };
          fr.readAsDataURL(pic);
        })
        .then(() => {
          // 后续跳转处理
          if ($scope.isSearchImage) {
            location.reload()
          } else {
           // 利用a标签打开新窗口防止被浏览器阻止弹窗
           const a = document.createElement('a')
           a.setAttribute('target', '_blank')
           a.setAttribute('href', '/list-detail.html?searchImg=1')
           a.click()
           a.remove()
          }
        });
     }
     cjUtils.addListenGetFilesForDragOver({
       elemId:'searchImgBox',
       ondrop: function(files) {
         searchImg(files[0])
       }
     })
     $scope.upLoadImg = files => {
       const file = files[0];
       searchImg(file)
     };
    $scope.evalute = [
      {desc: 'Item as Described', number: 0},
      {desc: 'Communication', number: 0},
      {desc: 'Shipping Speed', number: 0},
    ]
     $scope.$on('shop_data', function (d, data) {
       $scope.shopData = {
         name: data.name,
         id: data.id,
         supplierId: data.supplierId,
         logo: data.logo
       }
       if($scope.shopData.supplierId) {
         dsp.postFun('supplierPlanInfo/selectPlanBySupplierId', {
          "supplierId": $scope.shopData.supplierId,
          }, function (res) {
              if(res.status === 200) {
                $scope.defaultPlan = res.data.data.defaultPlan;
              }
          }, function() {} )
          dsp.postFun('cjEvaluation/getSupplierGrade' , {
              supplierId: data.supplierId
          }, function(res) {
              if(res.status === 200 && res.data.code === 200) {
                  $scope.evalute =  [
                      {desc: 'Item as Described', number: res.data.data.avgGoodMatch},
                      {desc: 'Communication', number: res.data.data.avgAnswerSpeed},
                      {desc: 'Shipping Speed', number: res.data.data.avgDeliverySpeed},
                  ]
              }
          })
       }
       
        
     })
     /**
      * 清除图片数据
      */
     $scope.imgClear = () => {
       localStorage.removeItem('_search_pic_')
       $scope.imgArr = undefined
     };
     // 初始化 图片数据
     function getSearchImg() {
       const isSearchImage = dsp.getQueryString('searchImg');
       if (!isSearchImage) return;
       const imgData = JSON.parse(localStorage.getItem('_search_pic_'));
       if (!imgData) return;
       const { dataURL, fileName } = imgData;
       $scope.imgArr = dataURL;
       // fetch(dataURL)
       //   .then(img => img.blob())
       //   .then(blob => {
       //     const formData = new FormData();
       //     formData.append('uploadimg', blob, fileName);
       //     uploadImg(formData, dataURL);
       //   });
     }
     // // 图片搜索
     // function uploadImg(formData) {
     //   return dsp.postFun(
     //     'app/picture/searchUpload',
     //     formData,
     //     function(data) {
     //       if (data.data.statusCode == 200) {
     //         $scope.goodList = JSON.parse(data.data.result).location;

     //         console.log('img----', $scope);
     //       }
     //     },
     //     err => console.error(error),
     //     {
     //       headers: { 'Content-Type': undefined },
     //       layer2: true
     //     }
     //   );
     // }
     getSearchImg();

     //批量刊登获取数量
     function getQueueList() {
       dsp.postFun('cj/listedproduct/list', {
         pageNum: 1,
         pageSize: 1000,
         shopId: '',
         inputStr: '',
         status: '0' //0--待刊登，1--刊登中，2--刊登失败
       }, function (data) {
         if (data.data.statusCode == '200') {
           $scope.queueNum = JSON.parse(data.data.result).totle || 0;
         } else {
           $scope.queueNum = 0;
         }
       })
     }
     if ($scope.hasLogin) {
       getQueueList();
     }

     $rootScope.$on('queue_data', function (d, data) {
       $scope.queueAnimate = true;
       $scope.queueNum += data - 0;
       setTimeout(() => {
         $scope.queueAnimate = false;
       }, 300)
     })

     $scope.toMyList = function () {
       if ($scope.hasLogin) {
         location.href = 'myCJ.html#/products-connection/history/0?track=10'
       } else {
         location.href = `login.html?target=${bs.encode('myCJ.html#/products-connection/history/0?track=10')}`
       }
     }
     /* 菜单埋点 */
     $scope.addStatisFun = (type, ev) => {
       dsp.postFun('pojo/home/addStatisByType', {
         entryPage: type
       }, res => { console.log(res.data) })
     }



     // 隐藏显示
     // 消息通知

     $scope.MessageType = '1'
     $scope.UrlId = ''
     $scope.CJ = ''
     $scope.Elites = ''
     $scope.recommend = ''
     $scope.messagePre = []
     $scope.isMark = true
     $scope.messageTab = [
       { name: 'From CJ', active: 'true', val: '1', count: 0 },
       { name: 'ELITES', active: 'false', val: '2', count: 0 },
       { name: 'Recommendations', active: 'false', val: '3', count: 0 }
     ]
     $scope.checkMessage = function (item) {
       for (i = 0; i < $scope.messageTab.length; i++) {
         $scope.messageTab[i].active = 'false'
       }
       item.active = 'true'
       $scope.MessageType = item.val
       $scope.isMark = true
       getMessage()
       // console.log($scope.messagePre)
     }

    //消息中心
    //消息中心鼠标移入移出
    $scope.toggleMessage = (bool) => {
      $scope.isTopFlag = bool
    }

    function getMessageCJ() {
      const params = {
        pageNum: 1,
        pageSize: 5,
        data: {
          isread: "",
          userId: $scope.userId
        }
      }
      dsp.postFun("messageCenterCj/notification/queryGetCjnotification", params, ({data}) => {
        const { code, data: result = {} } = data
        if (+code === 200) {
          const { list } = result
          let isReadArr = []
          $scope.messagePre = list.map(v => {
            const ind = v.notificationType.indexOf('html:')
            if ( ind > -1) {
              v.url = v.notificationType.slice(ind + 5);
              v.notificationType = v.notificationType.slice(0, ind)
            }
            isReadArr.push(v.isread)
            return v
          })
          $scope.isMark = !isReadArr.includes('0')
          //将未读的置顶
          let idxs = [], tops = []
          $scope.messagePre.forEach((v, i) => {
            v.isread === '0' && idxs.unshift(i)
          })
          idxs.forEach(idx => tops = tops.concat($scope.messagePre.splice(idx, 1))) //把未读的元素全部拿出来
          $scope.messagePre = tops.reverse().concat($scope.messagePre)
          getTopMessageList($scope, dsp, utils)
        }
      })
    }
    //消息中心 - cj 系统消息 获取置顶消息列表
    function getTopMessageList($scope, dsp, utils) {
      dsp.postFun('messageCenterCj/notification/queryNoticeUpperApex', { userId: $scope.userId }, ({ data }) => {
        const { code, data: result = {} } = data
        if (+code !== 200 ) return;
        const { list } = result
        const noReadList = list.filter(v => v.isread === '0').reverse()
        const arr = utils.uniqueArr([...noReadList, ...$scope.messagePre], 'id')
        $scope.messagePre = arr.filter((v, i) => i < 5)
        noReadList.length > 0 && $scope.toggleMessage(true)
      })
    }
     function getMessageElites() {
       var getTopMesData = {
         "pageNum": "1",
         "pageSize": "5"
       }
       $scope.isLoading = true;
       var url = 'cujia-message/cj/notification/getInformList'
       dsp.postFun(url, JSON.stringify(getTopMesData), function (data) {
         $scope.isLoading = false;
         var data = data.data;
         if (data.statusCode == 200) {
           var result = data.result;
           $scope.messagePre = result.list || [];
           if ($scope.messagePre.length > 0) {
             var isReadArr = []
             for (i = 0; i < $scope.messagePre.length; i++) {
               isReadArr.push($scope.messagePre[i].read_status)
               if (isReadArr.includes(2)) {
                 $scope.isMark = false
               }
             }
           } else {
             $scope.noData = true;
           }

         }
       });
     }
     function getMessageComment() {
       var getTopMesData = {
         "pageNum": "1",
         "pageSize": "5"
       }
       $scope.isLoading = true;
       dsp.postFun('cj/appPush/getCJPushInfoListByUserId', JSON.stringify(getTopMesData), function (data) {
         $scope.isLoading = false;
         var data = data.data;
         if (data.statusCode == 200) {
           var result = data.result;
           var isReadArr = []

           const list = result.list || []

           $scope.messagePre = list.map(_ => {
            const arr = _.picurl.split(',')
            return {
              ..._, 
              img_url_one: arr.length > 0 ? arr[0] : _.picurl 
            }
          });
           if ($scope.messagePre.length > 0) {
             $scope.messagePre && $scope.messagePre.forEach(con => {
               con.create_time = con.create_time.split('.')[0]
               isReadArr.push(con.is_read)
               if (isReadArr.includes(2)) {
                 $scope.isMark = false
               }
             })
           } else {
             $scope.noData = true;
           }
         }
       });
     }

     $scope.toAllMessage = function () {
       // window.open('myCJ.html#/all-message?'+$scope.MessageType)
       // location.href = 'myCJ.html#/all-message?'+$scope.MessageType
       location.href = 'myCJ.html#/all-message/' + $scope.MessageType
       // $state.go ('myCJ.html#/all-message', { id: $scope.MessageType } )
     }
     $scope.toMarkAll = function () {
       if ($scope.MessageType == '1') {
         dsp.postFun('messageCenterCj/notification/updateRead', { userId: $scope.userId }, function (data) {
           if (data.data.code == 200) {
             getCount()
             getMessageCJ()
           }
         })
       } else if ($scope.MessageType == '2') {
         dsp.postFun('cujia-message/cj/notification/allRead', {}, function (data) {
           if (data.data.statusCode == 200) {
             getCount()
             getMessageElites()
           }
         })
       } else if ($scope.MessageType == '3') {
         dsp.postFun('cj/appPush/updateAppPushIsRead', {}, function (data) {
           if (data.data.statusCode == 200) {
             getCount()
             getMessageComment()
           }
         })
       }
     }
     $scope.toAnother = function (item) {
       if ($scope.MessageType == '2') {
         $scope.UrlId = item.detail_id
         let otime = new Date().getTime();
         if (item.operation_type == '1') {
           window.open(`https://elites.cjdropshipping.com/cross?token=${$scope.token}&_t=${otime}&url=/personal-index?id=${item.user_id}&page=other`)           //关注
         }
         if (item.operation_type == '4' || item.operation_type == '6' || item.operation_type == '9' || item.operation_type == '10') {
           window.open(`https://elites.cjdropshipping.com/cross?token=${$scope.token}&_t=${otime}&url=/question-detail?id=${item.detail_id}`)           //问题
         }
         if (item.operation_type == '3' || item.operation_type == '7') {
           window.open(`https://elites.cjdropshipping.com/cross?token=${$scope.token}&_t=${otime}&url=/question-detail?id=${item.question_id}`)           //问题
         }
         if (item.operation_type == '2' || item.operation_type == '5' || item.operation_type == '8') {
           window.open(`https://elites.cjdropshipping.com/cross?token=${$scope.token}&_t=${otime}&url=/article-detail?id=${item.detail_id}`)   //文章详情
         }

       } else if ($scope.MessageType == '3') {
         location.href = 'list-detail.html?id=' + item.push_id + '&fromType=CommentList'
       }
     }

     //获取信息数量
     function getCount() {
       // dsp.postFun('app/notification/getCjnotification',{pageSize: 5,start: 1,isread: 0,type: 1},function(data){
       dsp.postFun('cujia-message/cj/notification/selectIsNotRead', { isread: 0 }, function (data) {
         if (data.data.statusCode == 200) {
          const { elitesCount, pushCount } = data.data.result
          dsp.postFun('messageCenterCj/notification/queryCjInformMap', { userId: $scope.userId }, ({ data }) => {
            const { code, data: result = {}} = data
            if (+code !== 200) return;
            const { cjInformNum } = result
            $scope.messageNum = cjInformNum - -elitesCount - -pushCount
            $scope.messageTab = $scope.messageTab.map((v, i) => {
              if (i === 0) v.count = cjInformNum;
              if (i === 1) v.count = elitesCount * 1;
              if (i === 2) v.count = pushCount * 1;
              return v
            })
          })
         }
       })
     }
    //  if ($scope.hasLogin) {
    //    getCount()
    //  }
     function getMessage() {
       $scope.noData = false;
       $scope.messagePre = [];
       if ($scope.MessageType == '1' && $scope.hasLogin) {
         getMessageCJ()
       } else if ($scope.MessageType == '2' && $scope.hasLogin) {
         getMessageElites()
       } else if ($scope.MessageType == '3' && $scope.hasLogin) {
         getMessageComment()
       }
     }

    //  if ($scope.hasLogin) {
    //    getCount()
    //    getMessageCJ()
    //  }

    $scope.$on('msgBarRendered', function(ev) { // 在节点加载后执行
      new CJMsg({ isLogin:$scope.hasLogin, getDomainByUrl: dsp.getDomainByUrl })
    });
      $scope.warehouseList=[]
      function getWare(){
        dsp.postFun('warehouseBuildWeb/management/getCountryByAreaId',{},function(data){
          if(data.data.code ==200){
            $scope.warehouseList = data.data.data || [];
            sessionStorage.setItem('wareareal',JSON.stringify($scope.warehouseList));
            $scope.$emit('warearea-list',$scope.warehouseList)
          }
        })
      }
      let wareareal = sessionStorage.getItem('wareareal');
      if(wareareal){
        $scope.warehouseList = JSON.parse(wareareal);
        $scope.$emit('warearea-list',$scope.warehouseList)
      }else{
        getWare();
      }

      /** 2020-3-25 子账号-路由权限*/
    $scope.disposeHrefFn = (href, type) => { //Tutorial
      const allMenu = localStorage.getItem('AllPowerMenu') ? utils.JSONparse(bs.decode(localStorage.getItem('AllPowerMenu'))) : []
      const powerMenu = localStorage.getItem('PowerMenu') ? utils.JSONparse(bs.decode(localStorage.getItem('PowerMenu'))) : []
      const res = allMenu.includes(`#${type}`) && !powerMenu.includes(`#${type}`) ? 'myCJ.html#/noPower' : href
      return res
    }
   } catch (error) {
     console.warn(error)
    //  location.href = 'error.html';
   }
  }

  comHeader.directive('onFinish',['$timeout', function($timeout) {// 节点加载后执行
    return {
      restrict: 'A',
      link: function (scope, element, attr) {
        $timeout(function () {
            scope.$emit('msgBarRendered'); // 这里执行msgBarRendered
        });
      }
    }
  }])
})(angular);
