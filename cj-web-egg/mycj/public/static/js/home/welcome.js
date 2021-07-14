
(function (Base64) {
  var app = angular.module('welcomeApp', ['service', 'home-service', 'cjCompnentModule', 'cjDirectiveModule', 'CommonHeaderCom', 'CommonFooterCom', 'custom-filter','cjDotModule']);
  // // 创建组件模块
  angular.module('cjCompnentModule', ['utils']);
  /*新版*/
  app.controller('welcomeController', ['$scope', '$timeout', '$window', 'dsp', '$window', '$sce', '$rootScope', '$location', '$anchorScroll', 'utils', function ($scope, $timeout, $watch, dsp, $window, $sce, $rootScope, $location, $anchorScroll, utils) {
    /* 判断pc/phone端 */
    if (dsp.isPhone(true)) return;
    //-----------------------------------------------------------------------------------
    let bs = new Base64();
    $scope.userId = localStorage.getItem('userId') == undefined ? "" : bs.decode(localStorage.getItem('userId'));
    $scope.token = localStorage.getItem('token') == undefined ? "" : bs.decode(localStorage.getItem('token'));

    $scope.isAuth = 0 // 授权状态值 0:授权中 1:授权成功 -1：授权失败
    $scope.backUrl = undefined // 失败时的跳转路径
    $scope.winH = $(window).height() - 475 - 120 - 60 // 白框高度

    $(window).on('resize', function () {
      $scope.winH = $(window).height() - 475 - 120 - 60
      $scope.$apply()
    })

  function createLottieFail(){
    setTimeout(() => {
      const dom = document.getElementsByClassName('welcome-auth')[0];
      lottie.loadAnimation({
        container: dom, // the dom element that will contain the animation
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/egg/image/authWelcome/auth-fail.json'// the path to the animation json
      });
    },1000)
  }

  function createLottieSuccess(){
    setTimeout(() => {
      const dom = document.getElementsByClassName('welcome-auth')[0];
      lottie.loadAnimation({
        container: dom, // the dom element that will contain the animation
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/egg/image/authWelcome/auth-success.json'// the path to the animation json
      });
    },1000)
  }

    
  

    // 授权成功后
    function authSuccess() {
      $scope.isAuth = 1
      
      $timeout(function () {
        $scope.$apply()
      })
      createLottieSuccess();
    }

    // 授权失败后
    function authFailed(backUrl) {
      $scope.isAuth = -1
      
      $scope.backUrl = backUrl
      // $scope.$apply()
      setFiveInter()
      createLottieFail();
    }

    // try again
    $scope.tryAgain = function () {
      if ($scope.backUrl) {
        window.location.href = $scope.backUrl
        return;
      } else {
        const shopName = dsp.getQueryString("shopName");
        if(shopName) {
          window.location.href = `https://${shopName}/admin/oauth/authorize?client_id=6092673ffae7ca48ab9cb01736bae7fa&scope=read_content,read_customers,write_inventory,read_locations,read_inventory,read_themes,read_products,write_products,read_product_listings,read_collection_listings,read_orders,write_orders,read_fulfillments,write_fulfillments,read_price_rules,read_script_tags,write_script_tags,write_themes&redirect_uri=https://app.cjdropshipping.com/welcome.html&state=shopify&grant_options[]=default`
        } else {
          window.location.href = "/home.html"
        }
      }
    }

    // 倒计时跳转
    var inter;
    $scope.timeout = 5
    function setFiveInter() {
      inter = setInterval(function () {
        $scope.timeout -= 1
        if ($scope.timeout == 0) {
          window.clearInterval(inter)
          $scope.tryAgain()
        }
        $scope.$apply()
      }, 1000)
    }

    var passlReg = /^(?=(.*[A-Za-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,15}$/;
    var isValidPass = false;
    $scope.verifyPass = function () {// 校验密码
      isValidPass = passlReg.test($scope.newPwd);
      if (!isValidPass) {
        $scope.passErrorMsg = 'Password must be at least 8-15 characters long, including letters, numbers and special characters.';
        isValidPass = false
      } else {
        $scope.passErrorMsg = '';
        isValidPass = true
      }
    };

    //初始化密码
    // $scope.showzzc2 = true
    
    var shop2 = sessionStorage.getItem('isInitial');
    $scope.newPwd = '';
    // $scope.isWix = false;
    $scope.storeName = '';
    if (shop2 == '' || shop2 == null || shop2 == undefined) {
    } else {
      // $('.zzc2').show().attr('data-shop', shop2);
      $('.zzc2').attr('data-shop', shop2);
      $scope.storeName = shop2
      shop2 === 'wix' ? $scope.isWix = true : $scope.isWix = false
    }
    $scope.surePwd = function () {
      let shopName
        , reg = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/

      shop2 === 'wix' ? shopName = $scope.storeName : shopName = sessionStorage.getItem('isInitial');
      // if (!shopName) shopName = shop2

      if (!shopName) {
        layer.msg('Please set store name');
      } else if (shop2 === 'wix' && !reg.test(shopName)) {
        layer.msg('Please enter a URL starting with http:// or https://')
      } else if (!$scope.newPwd) {
        layer.msg('Please set password');
      } else {

        if (!isValidPass) return false
        let url
          , sendData = {
            "userId": $scope.userId,
            "password": cjUtils.md5($scope.newPwd),
            "isEncryption": '0'
          };
        if (shop2 === 'wix') {
          url = 'app/account/wixUpdatePassword';
          sendData.storeName = shopName
        } else {
          url = 'app/account/initPassword';
          sendData.shopName = shopName
        }
        console.log(sendData)
        dsp.load();
        dsp.postFun(url, JSON.stringify(sendData), function (data) {
          dsp.closeLoad();
          if (data.data.statusCode == '200') {
            layer.msg('Password set successfully');
            // $('.zzc2').hide();
            $scope.showzzc2 = false;
            sessionStorage.removeItem('isInitial');
            // location.href = 'myCJ.html#/myCJAssociatedStore';
          }
        }, function () {
          dsp.closeLoad();
        });
      }
    };

    //获取用户信息
    function getUserInfo() {
      dsp.postFun('cj/homePage/chaXunYongHuXinXi', {}, function (res) {
        if (res.data.statusCode == 200) {
          $scope.userInfo = res.data.result;
          let name = ($scope.userInfo.name).trim().split(/\s+/)[0]
          localStorage.setItem('firstName', bs.encode(name));
          localStorage.setItem('avatar', bs.encode($scope.userInfo.img || ''));
          $scope.$broadcast('userinfo', {
            firstName: name,
            avatar: $scope.userInfo.img
          })
        }
      }, function (err) {
        console.log('获取数据失败！')
      })
    }

    // 店铺授权（打开页面首先查看是否有code和state参数）
    var code = dsp.getQueryString('code');
    var state = dsp.getQueryString('state');
    var shop = dsp.getQueryString('shop');
    var shopToken = dsp.getQueryString('shopToken');
    var instanceId = dsp.getQueryString('instanceId');
    var wixToken = dsp.getQueryString('token')
    var from = dsp.getQueryString('from')
    var result = dsp.getQueryString('result')
    const hmac = dsp.getQueryString("hmac");
    const timestamp = dsp.getQueryString("timestamp")
    const email = localStorage.getItem("email");
    console.log('code=>', code, 'state=>', state, 'shop=>', shop, 'shopToken=>', shopToken, "instanceId=>", instanceId);
    //shopToken='761c4bf88b744eb49a3ae574f6c35c6d';
    
    if(!!code) {  // ebay、lazada、shoppe 授权验证通过url里面的code码实现
      if(code === '10000') {
        authSuccess()
      }
    }
    
    

    if(from === 'authorize' && result === '1') {
      authSuccess()
    }
    if(from === 'authorize' && result === '0') {
      authFailed()
    }
    
    $scope.notLogin = false
    $scope.checkLogin = function (email) {
      window.location.href = `login.html?from=shopifyNeedAuth&email=${email}&shopId=${$scope.shopId}&shopName=${$scope.shopName}`;
    }
    if (code && state && shop) { // shopify授权
      var authoStoreData = {};
      authoStoreData.userId = $scope.userId;
      authoStoreData.data = JSON.stringify({
        state: state,
        code: code,
        shop: shop
      });
      // 已经通过cjapp授权，后面通过shopify登录-自动登录
      if (state == 'cjdropshipping') {
        dsp.postFun('app/account/automaticLogin', {
          "shopToken": shopToken
        }, function (data) {
          if (data.data.statusCode == '200') {
            // 保存登录信息
            dsp.saveDataAfterLogin(data.data.result);
            localStorage.setItem('isFirstLogin', '1');
            localStorage.setItem('isEmpower', '2');
            // location.href = 'home.html';
            authSuccess()
          }
        });
      } else if (state == 'shopify1' || state == 'shopify2') { 
        const params = {
          shopName: shop,   //店铺名称
          code,             //编号 也是shopify 用来换授权token的参数
          state,            //ebay回参 也是shopify的请求标识
          hmac,              //shopify 加密后参数
          message : `code=${code}&shop=${shop}&state=${state}&timestamp=${timestamp}`       //shopify 验证请求正确性
        }
        dsp.postFun('platform-shop/authorize/authorizeShopIfy', params, function (data) {
          if (data.data.code == '200') {
            /*resData.data.code对应4种状态:
              1.YET_LOGIN, 已授权过账号,已登录
              2.NOT_LOGIN, 已授权过账号,未登录
              3.NOT_AUTHORIZE_YETLOGIN, 未授权过账号,已登录
              4.NOT_AUTHORIZELOGIN, 未授权过账号,未登录
            */
            if(data.data.data.code == 'NOT_LOGIN') {
              $scope.notLogin = true
              $scope.existEmail = data.data.data.email
              $scope.shopId = data.data.data.shopId
              $scope.shopName = shop
              return
            }
            const params2 = {
              shopId: data.data.data.shopId,
              email: data.data.data.email
            }
            dsp.postFun("platform-shop/authorize/saveAccount", params2, function(res) {
              if(res.data.code === 200) {
                if(state === 'shopify1') {
                  try {
                    dsp.postFun("app/shop/upShopIndividuationNum",{ ID: data.data.data.shopId })
                    dsp.postFun("platform-product/product/pullShopProduct",{ ID: data.data.data.shopId })
                  } catch (error) {
                    console.log(error)
                  }
                }
                authSuccess()
              } else {
                authFailed('home.html')
              }
            })
           
          } else {
            authFailed('home.html')
          }
        });
      } else { // cjapp主动授权shopify
        // 分销域名通过app授权店铺需要
        if (window.location.host == 'app.cjdropshipping.com' || window.location.host == 'cjdropshipping.com') {
          dsp.postFun('cj/account/getYm', {
            "name": shop.replace('.myshopify.com', ''),
            "type": "shopify"
          }, function (data) {
            if (data.data.isTz) {
              location.href = 'http://' + data.data.domainName + '/home.html' + window.location.search;
            } else {
              shopifyAuth();
            }
          })
        } else {
          shopifyAuth();
        }

        function shopifyAuth() {
          dsp.postFun('app/shop/authorize', JSON.stringify(authoStoreData), function (data) {
            var data = data.data;
            var code = data.statusCode;
            if (code == 200) {
              if (state == '11112222aaaaa') {
                // 保存登录信息
                dsp.saveDataAfterLogin(data.result);
                var isEmpower = localStorage.getItem('isEmpower');
                if (isEmpower == '0') {
                  localStorage.setItem('isEmpower', '1');
                } else if (isEmpower == '2') {
                  localStorage.setItem('isEmpower', '2');
                }
                // location.href = 'myCJ.html#/myCJAssociatedStore';
                authSuccess()
              } else {
                authSuccess()
              }
            } else {
              authFailed('myCJ.html#/authorize/Shopify')
            }
          });
        }
      }
    }
    // wix 授权
    if (code && state && instanceId) {
      let WixsendData = {
        userId: $scope.userId || '',
        token: $scope.token || '',
        data: JSON.stringify({
          code: code,
          state: decodeURIComponent(state),
          instanceId: instanceId
        })
      }
      if (state.includes('wix_cj')) {
        // 用户通过cjapp授权wix店铺回调
        // 分销域名通过app授权店铺需要
        if (window.location.host == 'app.cjdropshipping.com' || window.location.host == 'cjdropshipping.com') {
          dsp.postFun('cj/account/getYm', {
            "name": decodeURIComponent(state).replace('wix_cj', ''),
            "type": "wix"
          }, function (data) {
            if (data.data && data.data.isTz) {
              location.href = 'http://' + data.data.domainName + '/home.html' + window.location.search;
            } else {
              wixAuth();
            }
          })
        } else {
          wixAuth();
        }
        // wixAuth();

        function wixAuth() {
          dsp.postFun('app/shop/wixAuthorize', JSON.stringify(WixsendData), function (data) {
            if (data.data.statusCode === '200') {
              localStorage.setItem('isFirstLogin', '1');
              localStorage.setItem('isEmpower', '2');
              localStorage.setItem('closeFlag', '');
              authSuccess()
            } else {
              authFailed('myCJ.html#/authorize/Wix')
            }
          })
        }
      } else if (state.includes('wix_cj_app')) {
        // 用户从wixapp market添加cjapp，第二次回调
        dsp.postFun('app/shop/appwixAuthorize', JSON.stringify(WixsendData), function (data) {
          if (data.data.statusCode === '200') {
            // 保存登录信息
            dsp.saveDataAfterLogin(data.data.result);
            let result = JSON.parse(data.data.result);
            layer.msg('Authorization Successfully', function () {
              localStorage.setItem('isFirstLogin', '1');
              if (result.newUser) {
                sessionStorage.setItem('isInitial', 'wix');
                //$('.zzc2').show().attr('data-shop',shop);
                localStorage.setItem('isEmpower', '1');
                localStorage.setItem('closeFlag', '');
                // location.href = 'home.html';
              } else {
                localStorage.setItem('isEmpower', '2');
                localStorage.setItem('closeFlag', '');
                location.href = 'myCJ.html#/authorize/Wix';
              }
            });
          }
        });
      }
    }
    // 用户从wixapp market添加cjapp，第一次回调
    if (wixToken) {
      dsp.postFun('app/shop/appWix', { "token": wixToken }, function (data) {
        location.href = data.data.result
      });
    }
    // ebay授权
    var ebaytype = dsp.getQueryString('type');
    var ebayname = dsp.getQueryString('state');
    var eabyCode = dsp.getQueryString('code');
    if (ebaytype == 'ebay' && eabyCode) {
      // 分销域名通过app授权店铺需要
      if (window.location.host == 'app.cjdropshipping.com' || window.location.host == 'cjdropshipping.com') {
        dsp.postFun('cj/account/getYm', {
          "name": ebayname,
          "type": "ebay"
        }, function (data) {
          if (data.data.isTz) {
            location.href = 'http://' + data.data.domainName + '/home.html' + window.location.search;
          } else {
            ebayAuth();
          }
        })
      } else {
        ebayAuth();
      }
      // ebayAuth();

      function ebayAuth() {
        dsp.postFun('ebay/accredit', {
          type: ebaytype,
          name: ebayname,
          ebayCode: eabyCode
        }, function (data) {
          var data = data.data;
          var code = data.statusCode;
          if (code == 200) {
            authSuccess()
          } else {
            // $scope.authFailLayer = 1;
            // $scope.authFailMes = data.message || 'Authorization Failed';
            // layer.msg(data.message ? data.message : 'Authorization Failed', function () {
            //   // location.href = 'myCJ.html#/authorize/Ebay';
            // });
            authFailed('myCJ.html#/authorize/Ebay')
          }
        });
      }
    }
    $scope.reAuthorize = function (shoptype) {
      if (shoptype == 'ebay') {
        location.href = 'myCJ.html#/authorize/Ebay';
      }
    }

    // lazada授权
    var shoptypeLazada = dsp.getQueryString('shoptype');
    var codeLazada = dsp.getQueryString('code');
    if (shoptypeLazada == 'Lazada' && codeLazada) {
      dsp.postFun('lazada/authorize', {
        userId: $scope.userId,
        data: `{\"type\":\"Lazada\",\"code\":\"${codeLazada}\"}`
      }, function (res) {
        var data = res.data;
        var code = data.statusCode;
        if (code == 200) {
          authSuccess()
        } else if (code === '209') {
          layer.msg(data.message)
        } else {
          authFailed('myCJ.html#/authorize/Lazada')
        }
      });
    }

    // shopee授权
    var shopeeId = dsp.getQueryString('shop_id');
    if (shopeeId) {
      dsp.postFun('shopee/saveShop', { 'shop_id': shopeeId, 'userId': $scope.userId, "type": "shopee" },
        function (res) {
          const code = res.data.statusCode
          if (code == 200) {
            authSuccess()
            
          } else {
            authFailed('myCJ.html#/authorize/Shopee')
          }
        });
    }

  }]);
})(Base64)