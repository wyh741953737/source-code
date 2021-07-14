import { goAuthStore, goAuthShipstation } from './authStore'

export function authorizeFactory(angular) {
  // 1.店铺授权模块
  var app = angular.module("authorize.module", ["service"]);
  app.controller("authorize.ctrl", [
    "$scope",
    "$http",
    "$window",
    "$location",
    "$timeout",
    "dsp",
    "$interval",
    "$stateParams",
    function(
      $scope,
      $http,
      $window,
      $location,
      $timeout,
      dsp,
      $interval,
      $stateParams
    ) {
      $scope.searchName = $stateParams.storeName ? $stateParams.storeName : '';
      $scope.isInSmallPage = document.documentElement.clientHeight < 850
      const authorizeTypeModel = {
        Shopify: { type: "shopify", val: "0" },
        Woocommerce: { type: "Woocommerce", val: "1" },
        Shipstation: { type: "Shipstation", val: "2" },
        Ebay: { type: "ebay", val: "4" },
        // Amazon: { type: "amazon", val: "5" },
        Wix: { type: "wix", val: "6" },
        Lazada: { type: "Lazada", val: "7" },
        Shopee: { type: "shopee", val: "8" },
        API: { type: "api", val: "9" },
        Etsy: { type: "etsy", val: "10" }
      };
      $scope.transferList = {
        leftList: {
          normal: 'static/image/authorize/transferLeft.svg',
          vip: 'static/image/authorize/transferLeftVip.svg'
        },
        imgList: [
          { path: 'static/image/authorize/transfer01.svg', name: 'Settings', vipPath: 'static/image/authorize/transferVip01.svg' },
          { path: 'static/image/authorize/transfer02.svg', name: 'Submission', vipPath: 'static/image/authorize/transferVip02.svg' },
          { path: 'static/image/authorize/transfer03.svg', name: 'New Account', vipPath: 'static/image/authorize/transferVip03.svg' },
          { path: 'static/image/authorize/transfer04.svg', name: 'Verification', vipPath: 'static/image/authorize/transferVip04.svg' }
        ]
      }
      $scope.countryList =[
          {
            countryCode: 'CN',
            countryName: 'CN'
          }]
      // $scope.selectedItem = 'CN';

      const base64 = new Base64();
      const isNotErpAdmin = base64.decode(localStorage.getItem('erpoperateuser') || '') != 'admin' 
      const isFromErp = encodeURIComponent(localStorage.getItem('loginfromerp') || '') == '1' 
      $scope.fromErpNotAdmin = isNotErpAdmin && isFromErp
      
      $scope.getCountryList = function(){
        dsp.getFun(`platform-shop/country/queryCountryList?platform=AMAZON`, function(
            res
        ){
          const {data} = res
          if(data.code===200){
            $scope.countryList = data.data;
          }else{
            $scope.countryList=[];
          }
        });
      };
      $scope.getCountryList()
      $scope.currentAuthorize = $stateParams.type
        ? authorizeTypeModel[$stateParams.type].type
        : authorizeTypeModel.Shopify.type;
      $scope.StoreType = $stateParams.type
        ? authorizeTypeModel[$stateParams.type].val
        : authorizeTypeModel.Shopify.val;
      $scope.navparamy = $stateParams.type || "Shopify";
      if(!!dsp.getQueryString('code')){
        // 展示shopee和lazada的回调是否成功弹窗
        const code = dsp.getQueryString('code')
        
        const obj = {
          '10000':'Authorization Successfully.',
          '10001':'Authorization Failed.',
          '10002':'Your store has been authorized to another CJ account.',
          '10003':'Store name is wrong.'
        }
        if(!!code) layer.msg(obj[code])
        // const url = "/myCJ.html#/authorize/" + $stateParams.type
        // $window.location = url
      }

      dsp.setRightMinHeight();
      $(".store-authorize-box").css(
        "min-height",
        $(window).height() * 1 - 171 + "px"
      );

      var vip =
        localStorage.getItem("vip") == undefined
          ? ""
          : localStorage.getItem("vip");
      if (vip == "1") {
        //vipFlag
        $(".header-nav").addClass("vipFlag");
        $(".mycj-left-bar").addClass("vipFlag");
        $(".mycj-right-wrap")
          .css("background", "#F0EDE7")
          .addClass("vip");
      } else {
        $(".header-nav").removeClass("vipFlag");
        $(".mycj-left-bar").removeClass("vipFlag");
        $(".mycj-right-wrap")
          .css("background", "#f2f3f5")
          .removeClass("vip");
      }
      $scope.userVip = vip === '1'
      $(".header-nav li")
        .eq(4)
        .addClass("active");
      var b = new Base64();
      $scope.userId = b.decode($window.localStorage.getItem("userId") || "");
      $scope.token = b.decode($window.localStorage.getItem("token") || "");
      $scope.userEmail = b.decode($window.localStorage.getItem("email") || "")
      $scope.subAccountName = b.decode($window.localStorage.getItem('subAccountLoginName') || '') || ''
      // 获取店铺列表
      $scope.storeList = [];
      $scope.noData = false;
      $scope.getStoreList = function(filterObj) {
        var getStoreData = {};
        getStoreData.userId = $scope.userId;
        getStoreData.token = $scope.token;
        getStoreData.data = JSON.stringify({
          filter: filterObj,
          sort: "UPDATA_DATE$DESC"
        });

        dsp.postFun("app/shop/list", JSON.stringify(getStoreData), function(
          data
        ) {
          var data = data.data;

          var code = data.statusCode;
          if (code != 200) {
            $scope.noData = true;
            if (code == 207) {
              layer.msg("This store had been authoried to one of our users.");
            }
            return false;
          }

          $scope.storeList = JSON.parse(data.result).root.filter(store => {
            return store.type === $scope.currentAuthorize;
          });
          $scope.switchIdentification = JSON.parse(data.result).switchIdentification;
          $scope.noData = $scope.storeList.length == 0;
          $scope.transferStoreList = $scope.storeList.filter(v => v.status == 1)
        });
      };

      $scope.showDeactiStoresVal = true
      let _obj = {};
      if ($scope.searchName) {
        _obj = {..._obj, SEARCH$LIKE$name: $scope.searchName}
      }
      $scope.getStoreList({
        ..._obj
      });

      // 复制物流链接
      $scope.handleCopy = (url,ev) => {
        ev.stopPropagation();
        if(url) {
          const input = document.getElementById('copyUrl');
          input.setAttribute('value', url);
          input.select();
          document.execCommand('copy');
          layer.msg('Copied Successfully');
        }
      }

      $scope.handleCheck = (bool) => {
        $scope.showDeactiStoresVal = bool;
        $scope.showDeactiStores();
      }

      // action显示下拉框
      $scope.showAction = false;
      $scope.handleActionHover = (item) => {
        $scope.showAction = item.id;
      }

      $scope.handleActionOut = () => {
        $scope.showAction = false;
      }

      $scope.$on('hideAction', (d, data) => {
        $scope.handleActionOut();
      })

      // 选中所有禁用店铺
      $scope.showDeactiStores = function() {
        let obj = {}
        if ($scope.searchName) {
          obj = {...obj, SEARCH$LIKE$name: $scope.searchName}
        }
        if ($scope.showDeactiStoresVal) {
          $scope.getStoreList({...obj});
        } else {
          $scope.getStoreList({
            ...obj
          });
        }
      };

      // 搜索店铺
      $scope.searchStore = function() {
        $scope.showDeactiStores()
      };

      $scope.showDeactiStoresVal = true
      // $scope.getStoreList({})
      $scope.searchStore()

      // 复制物流链接
      $scope.handleCopy = (url,ev) => {
        ev.stopPropagation();
        if(url) {
          const input = document.getElementById('copyUrl');
          input.setAttribute('value', url);
          input.select();
          document.execCommand('copy');
          layer.msg('Copy Success');
        }
      }

      $scope.handleCheck = (bool) => {
        $scope.showDeactiStoresVal = bool;
        $scope.showDeactiStores();
      }

      
      // 增加店铺
      $scope.StoreDialog = false;
      // 配置物流查询链接弹窗
      $scope.defaultConfigLogisticsUrl = '';
      $scope.isVip = localStorage.getItem("vip") == '1'
      $scope.configLogisticsDialog = {
        isShow: false,
        link: $scope.defaultConfigLogisticsUrl,
        itemData: null,
        selectLink: 'https://cjpacket.com/',
        showSelectLinkBox: false,
        selectLinkArr: ['https://cjpacket.com/', 'https://www.17track.net/zh-en'],
        showInoutAddNew: false,
        showResetInfoBox: false,
        // showResetInfo: false,
        resetInfo: 'Are you sure to reset the tracking URL? The tracking URL is https://cjpacket.com/.',
        // showConfigInfo: false,
        configInfo: 'Are you sure to add the tracking URL? The tracking URL will be sent to you by email. Then, you can set the tracking URL in your store and send it to your customers to track orders. Please check the tracking URL carefully.',
        infoText: '',
        close: () => {
          $scope.configLogisticsDialog.isShow = false;
          $scope.configLogisticsDialog.itemData = null;
          $scope.configLogisticsDialog.showSelectLinkBox = false;
          $scope.configLogisticsDialog.showInoutAddNew = false;
        },
        handleAddNew: () => {
          $scope.configLogisticsDialog.showInoutAddNew = true;
          $scope.configLogisticsDialog.link = $scope.defaultConfigLogisticsUrl;
          $scope.configLogisticsDialog.showSelectLinkBox = false;
        },
        handleBack: () => {
          $scope.configLogisticsDialog.showInoutAddNew = false;
          $scope.configLogisticsDialog.link = $scope.configLogisticsDialog.selectLink;
          $scope.configLogisticsDialog.showSelectLinkBox = false;
        },
        trackingBtnClick: (item) => {
          if($scope.fromErpNotAdmin) {
            layer.msg('You cannot edit it.')
            return
          }
          $scope.configLogisticsDialog.itemData = item;
          if (item.trackUrlTemplate && item.trackUrlTemplate !== '') {
            $scope.configLogisticsDialog.selectLink = item.trackUrlTemplate;
          } else {
            $scope.configLogisticsDialog.selectLink = 'https://cjpacket.com/';
          }
          $scope.configLogisticsDialog.link = $scope.configLogisticsDialog.selectLink;
          $scope.configLogisticsDialog.isShow = true;
          $scope.configLogisticsDialog.showSelectLinkBox = false;
        },
        // showTrackingInfo: (item) => {
        //   $scope.showTrackingInfo = item.id;
        // },
        // hideTrackingInfo: () => {
        //   $scope.showTrackingInfo = null;
        // },
        handleSelectLink: (i) => {
          $scope.configLogisticsDialog.selectLink = $scope.configLogisticsDialog.selectLinkArr[i];
          $scope.configLogisticsDialog.link = $scope.configLogisticsDialog.selectLink;
          $scope.configLogisticsDialog.showSelectLinkBox = false;
        },
        confirm: () => {
          if(!$scope.configLogisticsDialog.link) {
            layer.msg('URL cannot be blank')
            return
          }
          $scope.configLogisticsDialog.showResetInfoBox = true;
          $scope.configLogisticsDialog.infoText = $scope.configLogisticsDialog.configInfo;
          $scope.configLogisticsDialog.showSelectLinkBox = false;
        },
        handleShowResetInfo: () => {
          $scope.configLogisticsDialog.showResetInfoBox = true;
          $scope.configLogisticsDialog.infoText = $scope.configLogisticsDialog.resetInfo;
          $scope.configLogisticsDialog.showSelectLinkBox = false;
        },
        infoCancel: () => {
          $scope.configLogisticsDialog.showResetInfoBox = false;
        },
        infoConfirm: () => {
          if($scope.configLogisticsDialog.infoText == $scope.configLogisticsDialog.resetInfo) {
            $scope.configLogisticsDialog.selectLink = 'https://cjpacket.com/';
            $scope.configLogisticsDialog.link = $scope.configLogisticsDialog.selectLink;
          } 
          const link = $scope.configLogisticsDialog.link
          const itemData = $scope.configLogisticsDialog.itemData
          if (itemData) {
            const msgLoading = cjMessage.loading({ isFixed: true });
            dsp.postFun('app/shop/updateTrackurlTemplate',{
              shopId: itemData.id,
              trackUrlTemplate: link
            }, res => {
              msgLoading.hide();
              const {data} = res;
              if (data.statusCode != 200) {
                layer.msg(data.message)
                return
              }
              layer.msg('Set Successfully')
              $scope.configLogisticsDialog.isShow = false;
              $scope.configLogisticsDialog.showResetInfoBox = false;
              $scope.configLogisticsDialog.showInoutAddNew = false;
              $scope.getStoreList({});
            }, err => {
              msgLoading.hide();
            })
          }
        }
      };
      // $scope.StoreType = '1';
      // 添加店铺
      $scope.addStore = function(flag) {

        const storeType = $scope.StoreType
        if(storeType == '6') {
          return goAuthStore(dsp, 'wix')
        }else if(storeType == '7'){ // 7 lazada
          return goAuthStore(dsp, 'Lazada')
        }else if(storeType == '8'){
          return goAuthStore(dsp, 'shopee')
        } else if(storeType == '10') {
          return goAuthStore(dsp, 'etsy')
        }

        $scope.addStoreFlag = true;
        if ($scope.StoreType != "7" && $scope.StoreType != "8" && $scope.StoreType != "10") {
          $scope.StoreDialog = true;
        }
        // if (flag == 'shopify') $scope.StoreType = '0';

        $scope.linkurl = "";
        $scope.SiteUrl = "";
        $scope.ConsumerKey = "";
        $scope.ConsumerSecret = "";
        $scope.APIKey = "";
        $scope.APISecret = "";

        $scope.ShopName = "";
        $scope.accountAmazon = "";
        $scope.storein = "";
        $scope.MarketplaceId = "";
        $scope.sellerId = "";
        $scope.mwsAuthToken = "";
      };
      window.onload = function() {
        handleAddstore();
      };
      function handleAddstore() {
        const addstore = dsp.getQueryString("addstore");
        addstore && document.getElementsByClassName("add-store-btn")[0].click();
      }
      // 2019-06-20 xiaoy 转移店铺
      const sendTxt = "Send"; // html中对于的 !== Send 须同时修改
      var timer = null; //计时器
      $scope.messageBoxShow = false; //是否转移店铺界面显示
      $scope.transferShow = false; //转移店铺界面显示隐藏
      // $scope.tipNum = 0;//提示信息   //弃用
      $scope.text = sendTxt; //发送验证码文本
      $scope.pending = false; //提交状态
      const _DEFAULT_INFO = {
        type: '',           //类型： transfer 转移  suerTransfer 确认转移
        shop: '',
        receiveName: '',    //接收人邮箱
        receiveId: '',      //接收人id
        receiveEmail: '',
        originName: '',     //当前用户
        mailCode: '',       //验证码
        transferShop: '',   //确认转移 - 转移店铺名
        transferId: '',  //确认转移 - 转移账户邮箱
      }
      
      $scope.toggleTransferStore = function(bol, type, options = {}) {
        //更换店铺界面显示隐藏
        $scope.transferShow = bol;
        if (!bol) {
          $scope.info = {
            ..._DEFAULT_INFO
          };
          $scope.emailError = ''
          $scope.storeError = ''
          $scope.mailCodeError = ''
          $scope.text = sendTxt;
          $interval.cancel(timer); //清楚计时器
        } else {
          $scope.info = {
            ..._DEFAULT_INFO,
            originName: $scope.userEmail,
            ...options,
            type
          }
        }
      };

      //获取转移信息
      $scope.acceptTransfer = item => {
        const params = {
          shopId: item.id,
          receivedStatus: 1,
        }
        dsp.postFun('platform-shop/transfer/queryShopTransferRecords', params, ({ data }) => {
          const { code, data: list } = data
          if(+code !== 200 ) return;
          
          const { transferEmail, shopName, shopTransferRecordId } = list[0] || {}
          $scope.toggleTransferStore(true, 'suerTransfer', {
            shop: item.id,
            transferShop: shopName,
            originName: transferEmail,
            transferId: shopTransferRecordId
          })

        }, () => {})
      }
      $scope.newAccountType = 'loginName'
      $scope.newAccountTypeFun = (e) => {
        $scope.info.receiveName = ''
        $scope.newAccountType = e
        $scope.emailError = ''
      }
      //转移店铺 - 邮箱验证
      $scope.emailVerify = () => {
        return new Promise(function(resolve, reject) {
          if (!$scope.info.receiveName) {
            if ($scope.newAccountType == 'loginName') {
              $scope.emailError = 'Please enter the new account'
            } else {
              $scope.emailError = 'Please enter the Email'
            }
            resolve(false);
          } else {
            const parmas = {
              [$scope.newAccountType]: $scope.info.receiveName
            };
            const msgLoading = cjMessage.loading({ isFixed: true })
            dsp.postFun('cj/account/getByLogin', parmas, ({ data }) => {
              msgLoading.hide();
              const { statusCode, result: { accountId = '', accountEmail, accountStatus } = {} } = data
              if (statusCode == '505') {
                $scope.emailError = 'The store cannot be transferred to the same account.'
                return false;
              }
              if(!accountId) {
                $scope.emailError = 'The account is not registered.'
              } else {
                if(+accountStatus !== 1) {
                  $scope.emailError = 'Account Blocked. Please change to another account.'
                } else {
                  $scope.info.receiveId = accountId
                  $scope.info.receiveEmail = accountEmail
                  $scope.emailError = ''
                }
              }
              resolve(!$scope.emailError);
            }, function(data) {
              msgLoading.hide();
              return layer.msg('The server is busy now, please try again later.');
            });
          }
        });
      }
      //转移店铺 - 店铺验证
      $scope.storeVerify = () => {
        return new Promise(function (resolve, reject) {
          $scope.storeError = !$scope.info.shop ? 'Please select a store' : ''
          resolve(!$scope.storeError)
        })
      }
      //转移店铺 - 验证码验证
      $scope.mailCodeVerify = () => {
        return new Promise(function (resolve, reject) {
          $scope.mailCodeError = !$scope.info.mailCode ? 'Please enter the verification code' : ''
          resolve(!$scope.mailCodeError)
        })
      }

      //转移店铺 - 提交
      $scope.transferSubmit = () => {
        const { type } = $scope.info
        type === 'transfer' ? transferConfirm() : suerTransferConfrim()
      }
      //转移店铺 - 转移 - 确认
      function transferConfirm() {
        Promise.all([$scope.emailVerify(), $scope.storeVerify(), $scope.mailCodeVerify()]).then((resolve, reject) => {
          if (resolve.filter(item => item === false).length > 0) return;
          if ($scope.pending) return layer.msg("Submitting, please wait a second...")
          const params = {
            receiverAccountId: $scope.info.receiveId,
            receiverEmail: $scope.info.receiveEmail,
            receiverLoginName: $scope.info.receiveName,
            shopId: $scope.info.shop,
            verifyCode: $scope.info.mailCode
          }
          $scope.pending = true
          dsp.postFun('platform-shop/transfer/transferShop', params, ({data}) => {
            const { code, message } = data
            $scope.pending = false;
            if (+code !== 200) return layer.msg(message)
            layer.msg('Transfer Success')
            $scope.toggleTransferStore(false);
            $scope.showDeactiStores()
          }, () => {
            $scope.pending = false;
            dsp.cjMesFun(1);
          })
        })
       
      }
      //转移店铺 - 确认转移 - 确认
      function suerTransferConfrim() {
        Promise.all([$scope.mailCodeVerify()]).then((resolve, reject) => {
          if (resolve.filter(item => item === false).length > 0) return;
          if ($scope.pending) return layer.msg("Submitting, please wait a second...")
          const params = {
            shopTransferId: $scope.info.transferId,
            verifyCode: $scope.info.mailCode
          }
          $scope.pending = true
          dsp.postFun('platform-shop/transfer/transferConfirm', params, ({ data }) => {
            const { code, message } = data
            $scope.pending = false;
            if (+code !== 200) return layer.msg(message)
            
            layer.msg('Transfer Success')
            $scope.toggleTransferStore(false);
            $scope.showDeactiStores()
          }, () => {
            $scope.pending = false;
            dsp.cjMesFun(1);
          })
          
        })
      }
      //转移店铺 - 发送验证码
      $scope.getEmailCode = function() {
        const { type } = $scope.info
        type === 'transfer' ? sendEmailByTransfer() : sendMailCodeImpl()
      };

      //转移店铺 - 转移 - 发送验证码
      function sendEmailByTransfer() {
        Promise.all([$scope.emailVerify(), $scope.storeVerify()]).then(function(resolve, reject) {
          if (resolve.filter(item => item === false).length > 0) return;
          sendMailCodeImpl()
        })
      }

      //转移店铺 - 接收转移 - 发送验证码
      function sendMailCodeImpl() {
        if($scope.text !== 'Send') return

        const { type, shop } = $scope.info
        let params = {
          shopId: shop,
          type: type === 'transfer' ? 'SHOP_TRANSFER' : 'SHOP_TRANSFER_CONFIRM',
        }
        if (type === 'transfer') {
          params.receiverLoginName = $scope.info.receiveName
        }
        if (type === 'suerTransfer') {
          params.shopTransferRecordId = $scope.info.transferId
        }
        setTime()
        const msgLoading = cjMessage.loading({ isFixed: true });
        dsp.postFun('platform-shop/transfer/sendVerifyCode', params, ({data}) => {
          msgLoading.hide();
          const { code, message } = data
          if (+code !== 200) {
            clearTime()
            layer.msg(message)
            return
          }
          layer.msg('The verification code was sent successfully. Please check your email. The code will expire in 10 minutes')
        }, () => {
          clearTime()
          msgLoading.hide();
          dsp.cjMesFun(1)
        })
      }

      function setTime(wait) {
        wait = wait || 60;
        $scope.text = wait;
        timer = $interval(function() {
          wait--;
          $scope.text = wait;
          if (wait === 0) {
            $interval.cancel(timer);
            $scope.text = sendTxt;
          }
        }, 1000);
      }
      function clearTime() {
        $interval.cancel(timer);
        $scope.text = sendTxt;
      }
      $scope.transferBox = function() {
        //授权按钮  => 转移店铺
        this.messageBoxShow = false;
        this.transferShow = true;
      };
      // ---------------------------------------------- 18-11-02-add 控制店铺显示【backend:tyy】
      var login_name = new Base64().decode(window.localStorage.loginName || "");
      $scope.brightpearl_show =
        login_name === "trafilea" ? true : login_name === "anan" ? true : false;
      // ----------------------------------------------

      $scope.ShopifySub = function() {
        // 添加店铺
        var type;
        if ($scope.StoreType == "0") {
          type = "shopify";
        } else if ($scope.StoreType == "1") {
          type = "Woocommerce";
        } else if ($scope.StoreType == "2") {
          type = "shipstation";
        } else if ($scope.StoreType == "3") {
          // 18-10-15-add 增加店鋪类型【backend:tyy】
          type = "brightpearl";
        } else if ($scope.StoreType == "4") {
          // 18-10-15-add 增加店鋪类型【backend:tyy】
          type = "ebay";
        } else if ($scope.StoreType == "6") {
          type = "wix";
        } else if ($scope.StoreType == "7") {
          // 19-8-6-add 增加店鋪类型
          type = "Lazada";
        } else if ($scope.StoreType == "8") {
          // 19-8-28-add 增加店鋪类型
          type = "shopee";
        }
        if (type == "shopify") {
          if (!$scope.linkurl) {
            layer.msg("Please input store link here.");
          }
          // else if(!$scope.apiPassword){
          //     layer.msg('Please input API Password here.');
          // }
          else {
            if (
              $scope.linkurl.indexOf("https://") != -1 ||
              $scope.linkurl.indexOf("http://") != -1
            ) {
              layer.msg('Store ID only, no "https://" or "http://".');
            } else {
              if ($scope.linkurl.endsWith(".myshopify.com")) {
                $scope.linkurl = $scope.linkurl.replace(/.myshopify.com/i, "");
              }
              const msgLoading = cjMessage.loading({ isFixed: true });
              dsp.getFun(
                `platform-shop/authorize/getAuthorUrl?fromType=2&shopName=${$scope.linkurl}&platform=SHOPIFY`,
                function(data) {
                  msgLoading.hide();
                  var data = data.data;
                  var code = data.code;
                  if (code != 200) {
                    if (code === 10007) {
                      // 此状态 1. 显示授权弹框   2. 关闭当前弹框
                      $scope.StoreDialog = false; // 2. 关闭当前弹框
                      layer.alert(
                        "The store already exists, the bound mailbox is:" +
                          data.message +
                          ", if it is your email, please log in with this email account.",
                        {
                          btn: "OK, I got it.",
                          title: "",
                          skin: "auth-btn",
                          btnAlign: "c"
                        }
                      );
                      // $scope.messageBoxShow = true;//1. 显示授权弹框
                    } else {
                      dsp.cjMesFun(1);
                    }
                    return false;
                  }
                  $window.location = data.data;
                },function() {
                  msgLoading.hide()
              }
              );
            }
          }
        } else if (type == "Woocommerce") {
          if (!$scope.SiteUrl) {
            return layer.msg("Please enter Site Url.");
          } else if (!$scope.ConsumerKey) {
            return layer.msg("Please enter Seller Id.");
          } else if (!$scope.ConsumerSecret) {
            return layer.msg("Please enter MWS Auth Token.");
          } else {
            if (
              $scope.SiteUrl.indexOf("https://") != -1 ||
              $scope.SiteUrl.indexOf("http://") != -1
            ) {
              // 不允许填写https或者http
              return layer.msg('Store ID only, no "https://" or "http://".');
            } else {
              // dsp.load();
              layer.load(2);
              // var addStoreData = {};
              // addStoreData.userId = $scope.userId;
              // addStoreData.token = $scope.token;
              // addStoreData.data = JSON.stringify({
              //   name: $scope.SiteUrl,
              //   type: type,
              //   consumerKey: $scope.ConsumerKey,
              //   consumerSecret: $scope.ConsumerSecret
              // });
              const params = {
                userId: $scope.userId,
                consumerKey: $scope.ConsumerKey,
                consumerSecret: $scope.ConsumerSecret,
                platform: 'WOOCOMMERCE',
                fromType: '2',
                shopName: $scope.SiteUrl,
              }

              let queryStr = "", fristFlag = true;
              for (const key in params) {
                const value = params[key]
                queryStr += `${fristFlag ? '?' : '&'}${encodeURIComponent(key)}=${encodeURIComponent(value)}`
                fristFlag = false
              }
              dsp.getFun("platform-shop/authorize/saveShop"+ queryStr, function(
                data
              ) {
                dsp.closeLoad();
                var data = data.data;
                var code = data.code;
                if (code == 200) {
                  // layer.msg("Authorization Successfully.");
                  // $scope.StoreDialog = false;
                  window.location.href = 'welcome.html?from=authorize&result=1'
                }  else if (code == 10013) {
                  layer.msg(data.message,{time: 3000},()=>{
                    $timeout(() => {
                      $scope.notShowOAuth = false;
                    })
                  }); 
                } else {
                  layer.msg(data.message)
                }
                // 跳转到返回的网址
                // $window.location = data.result;
              });
            }
          }
        } else if (type == "shipstation") {
          goAuthShipstation(dsp, $scope)
        } else if (type == "brightpearl") {
          // 18-10-15-add 增加店鋪类型【backend:tyy】
          if (!$scope.brightpearl_app_ref) {
            return layer.msg("Please brightpearl-app-ref.");
          } else if (!$scope.account) {
            return layer.msg("Please account.");
          } else if (!$scope.brightpearl_account_token) {
            return layer.msg("Please brightpearl-account-token.");
          } else {
            var addStoreData = {};
            addStoreData.userId = $scope.userId;
            addStoreData.token = $scope.token;
            addStoreData.data = JSON.stringify({
              type: type,
              account: $scope.account,
              consumerkey: $scope.brightpearl_app_ref,
              consumerSecret: $scope.brightpearl_account_token
            });
            // dsp.load();
            layer.load(2);
            dsp.postFun(
              "app/shop/addBrightpearl",
              JSON.stringify(addStoreData),
              function(data) {
                // dsp.closeLoad();
                layer.closeAll("loading");
                var data = data.data;
                var code = data.statusCode;
                if (code == 200) {
                  layer.msg("Authorization Successfully.");
                  var isEmpower = localStorage.getItem("isEmpower");
                  if (isEmpower == "0") {
                    localStorage.setItem("isEmpower", "1");
                  } else if (isEmpower == "2") {
                    localStorage.setItem("isEmpower", "2");
                  }
                  location.href = "#/myCJAssociatedStore";
                  $scope.StoreDialog = false;
                  $scope.addStoreFlag = false;
                } else {
                  layer.msg("Authorization Failed.");
                }
                // 跳转到返回的网址
                // $window.location = data.result;
              }
            );
          }
        } else if (type == "ebay") {
          if (!$scope.ebaylinkurl) {
            layer.msg("Please input store link here.");
            return;
          }
          goAuthStore(dsp, type, { shopName:$scope.ebaylinkurl })
        } else if (type == "wix") {
          if (!$scope.wixName) {
            layer.msg("Please enter Store URL.");
            return;
          }
          if (
            $scope.wixName.indexOf("https://") == -1 &&
            $scope.wixName.indexOf("http://") == -1
          ) {
            layer.msg("Please enter a URL starting with http:// or https://");
            return;
          }
          layer.load(2);
          let addWixData = {};
          addWixData.userId = $scope.userId;
          addWixData.token = $scope.token;
          addWixData.data = JSON.stringify({
            type: "wix",
            wixName: $scope.wixName
          });
          dsp.postFun("app/shop/addWix", JSON.stringify(addWixData), function(
            data
          ) {
            layer.closeAll("loading");
            if (data.data.statusCode != 200) {
            }
            // 跳转到返回的网址
            $window.location = data.data.result;
          });
        }
      };
      // 添加Amazon
      $scope.amazonSub = function() {
        if (!$scope.shopName) {
          layer.msg("Please enter Store name.");
          return;
        }
        if (!$scope.country) {
          layer.msg("Please enter Country.");
          return;
        }
        if (!$scope.consumerKey) {
          layer.msg("Please enter Seller Id.");
          return;
        }
        if (!$scope.consumerSecret) {
          layer.msg("Please enter MWS Auth Token.");
          return;
        }
        const params = {
          shopName: $scope.shopName,
          country: $scope.country,
          consumerKey: $scope.consumerKey,
          consumerSecret: $scope.consumerSecret
        }

        layer.load(2);
        dsp.getFun(
          `platform-shop/authorize/saveShop?platform=AMAZON&shopName=${$scope.shopName}&country=${$scope.country}&consumerKey=${$scope.consumerKey}&consumerSecret=${$scope.consumerSecret}`,
          function(data) {
            if (data.data.code === 200) {
              window.location.href = 'welcome.html?from=authorize&result=1'
            } else if (data.data.statusCode == "209") {
              layer.msg("Authorization Failed.");
            }
            layer.closeAll("loading");
          }
        );
      };
      /* 用于邮箱验证的函数 */
      function validateEmail(email) {
        // 邮箱验证正则
        var reg = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/;
        return reg.test(email);
      }

      $scope.ShopifyUpdate = function() {
        // 重新授权店铺
        var type;
        if ($scope.StoreType == "0") {
          type = "shopify";
        } else if ($scope.StoreType == "1") {
          type = "Woocommerce";
        } else if ($scope.StoreType == "2") {
          type = "shipstation";
        } else if ($scope.StoreType == "3") {
          // 18-10-15-add 增加店鋪类型【backend:tyy】
          type = "brightpearl";
        } else if ($scope.StoreType == "4") {
          // 18-10-15-add 增加店鋪类型【backend:tyy】
          type = "ebay";
        }
        if (type == "shopify") {
          if (!$scope.linkurl) {
            layer.msg("Please input store link here.");
          }
          // else if(!$scope.apiPassword){
          //     layer.msg('Please input API Password here.');
          // }
          else {
            if (
              $scope.linkurl.indexOf("https://") != -1 ||
              $scope.linkurl.indexOf("http://") != -1
            ) {
              layer.msg('Store ID only, no "https://" or "http://".');
            } else {

              const msgLoading = cjMessage.loading({ isFixed: true });
              dsp.getFun(
                `platform-shop/authorize/getAuthorUrl?fromType=2&shopName=${$scope.linkurl}&platform=SHOPIFY`,
                function(data) {
                  msgLoading.hide();
                  var data = data.data;
                  var code = data.code;
                  if (code != 200) {
                    if (code === 10007) {
                      // 此状态 1. 显示授权弹框   2. 关闭当前弹框
                      $scope.StoreDialog = false; // 2. 关闭当前弹框
                      layer.alert(
                        "The store already exists, the bound mailbox is:" +
                          data.message +
                          ", if it is your email, please log in with this email account.",
                        {
                          btn: "OK,I got it.",
                          title: "",
                          skin: "auth-btn",
                          btnAlign: "c"
                        }
                      );
                      // $scope.messageBoxShow = true;//1. 显示授权弹框
                    } else {
                      dsp.cjMesFun(1);
                    }
                    return false;
                  }
                  $window.location = data.data;
                },function() {
                  msgLoading.hide()
              }
              );
              // dsp.postFun(
              //   "app/shop/update",
              //   JSON.stringify(reAddStoreData),
              //   function(data) {
              //     layer.closeAll("loading");
              //     var data = data.data;
              //     var code = data.statusCode;
              //     if (code != 200) {
              //       layer.msg(
              //         "The server is busy now, please try again later."
              //       );
              //       return false;
              //     }
              //     // 跳转到返回的网址
              //     $window.location = data.result;
              //   },
              //   function() {
              //     layer.closeAll("loading");
              //     layer.msg("The server is busy now, please try again later.");
              //   }
              // );
            }
          }
        }
        if (type == "ebay") {
          if (!$scope.ebaylinkurl) {
            layer.msg("Please input store link here.");
            return;
          }
          goAuthStore(dsp, type, { shopName:$scope.ebaylinkurl })
        }
        if (type == "Woocommerce") {
          if (!$scope.SiteUrl) {
            layer.msg("Please enter Site Url.");
          } else if (!$scope.ConsumerKey) {
            layer.msg("Please enter Seller Id.");
          } else if (!$scope.ConsumerSecret) {
            layer.msg("Please enter MWS Auth Token.");
          } else {
            if (
              $scope.SiteUrl.indexOf("https://") != -1 ||
              $scope.SiteUrl.indexOf("http://") != -1
            ) {
              layer.msg('Store ID only, no "https://" or "http://".');
            } else {
              layer.load(2);
              // var addStoreData = {};
              // addStoreData.userId = $scope.userId;
              // addStoreData.token = $scope.token;
              // addStoreData.data = JSON.stringify({
              //   name: $scope.SiteUrl,
              //   type: type,
              //   consumerKey: $scope.ConsumerKey,
              //   consumerSecret: $scope.ConsumerSecret
              // });
              const params = {
                userId: $scope.userId,
                consumerKey: $scope.ConsumerKey,
                consumerSecret: $scope.ConsumerSecret,
                platform: 'WOOCOMMERCE',
                fromType: '2',
                shopName: $scope.SiteUrl,
              }

              let queryStr = "", fristFlag = true;
              for (const key in params) {
                const value = params[key]
                queryStr += `${fristFlag ? '?' : '&'}${encodeURIComponent(key)}=${encodeURIComponent(value)}`
                fristFlag = false
              }
              dsp.getFun("platform-shop/authorize/saveShop"+ queryStr, function(
                data
              ) {
                dsp.closeLoad();
                var data = data.data;
                var code = data.code;
                if (code == 200) {
                  window.location.href = 'welcome.html?from=authorize&result=1'
                } else {
                  layer.msg(data.message);
                }
              });
            }
          }
        }
        if(type == "shipstation"){
          goAuthShipstation(dsp, $scope, { shopName: updateItem.name })
        }
      };

      // 禁用店铺
      $scope.operateStore = function(storeId, opeStatue, scb) {
        var deactStoreData = {};
        deactStoreData.userId = $scope.userId;
        deactStoreData.token = $scope.token;
        deactStoreData.data = JSON.stringify({
          id: storeId,
          status: opeStatue
        });
        dsp.postFun(
          "app/shop/startstop",
          JSON.stringify(deactStoreData),
          function(data) {
            var data = data.data;

            var code = data.statusCode;
            if (code != 200) {
              layer.msg("The server is busy now, please try again later.");
              return false;
            }
            scb();
          },
          function() {
            layer.msg("The server is busy now, please try again later.");
          }
        );
      };
      $scope.popConfirmType = '';
      $scope.storeId = '';
      $scope.deactivate = function (storeId) {
        $scope.popConfirmType = 'deactivate';
        $scope.content = 'Are you sure to deactivate the connection ?';
        $scope.showPopUps = true;
        $scope.storeId = storeId;
        
      };

      // 启用店铺
      $scope.activate = function (storeId) {
        $scope.operateStore(storeId, 1, function() {
          layer.msg(
            "Activated",
            {
              time: 1000
            },
            function() {
              //$window.location = 'myCJ.html#/authorize';
              $window.location.reload();
            }
          );
        });
      };

      // 重新授权
      var updateItem;
      $scope.reauthorize = function(item) {
        updateItem = item;
        $scope.updateStoreFlag = true;
        // $scope.StoreDialog = true;
        if (item.type == "shopify") {
          $scope.StoreType = "0";
        } else if (item.type == "Woocommerce") {
          $scope.StoreType = "1";
        } else if (item.type == "Shipstation") {
          $scope.StoreType = "2";
        } else if (item.type == "brightpearl") {
          // 18-10-15-add 增加店鋪类型【backend:tyy】
          $scope.StoreType = "3";
        } else if (item.type == "ebay") {
          // 18-10-15-add 增加店鋪类型【backend:tyy】
          $scope.StoreType = "4";
        } else if (item.type === "amazon") {
          $scope.StoreType = "5";
        } else if (item.type === "wix") {
          $scope.StoreType = "6";
          return goAuthStore(dsp, item.type)
          // $scope.wixName = item.name
        } else if (item.type === 'Lazada') {
          $scope.StoreType = "7"
          return goAuthStore(dsp, item.type)
        } else if (item.type === 'shopee') {
          $scope.StoreType = "8"
          return goAuthStore(dsp, item.type)
        } else if(item.type === 'etsy') {
          $scope.StoreType = '10'
          return goAuthStore(dsp, item.type)
        }

        if ($scope.StoreType != "7" && $scope.StoreType != "8") {
          $scope.StoreDialog = true;
        }
        // $scope.StoreType = item.type;
        $scope.linkurl = item.name;
        $scope.SiteUrl = item.name;
        $scope.ebaylinkurl = item.name;
        $scope.ConsumerKey = item.consumerkey;
        $scope.ConsumerSecret = item.consumerSecret;
        $scope.APIKey = item.consumerkey;
        $scope.APISecret = item.consumerSecret;
      };

      // $scope.addPODFail = true;
      var addPODItem;
      $scope.addPODFeature = function(item) {
        if($scope.fromErpNotAdmin) {
          layer.msg('You cannot edit it.')
          return
        }
        addPODItem = item;
        // layer.load(2);
        const msgLoading = cjMessage.loading({ isFixed: true })
        dsp.postFun(
          "app/shop/upShopIndividuationNum",
          { ID: item.id },
          function(data) {
            // layer.closeAll("loading");
            msgLoading.hide();
            var data = data.data;
            if (data.statusCode != 200) {
              // layer.msg('Added failed');
              $scope.addPODFail = true;
            } else {
              layer.msg("Added successfully");
              $scope.storeList = [];
              $scope.getStoreList({});
            }
          },function() {
            msgLoading.hide();
          }
        );
      };
      $scope.ReauthAfterAddFail = function() {
        var reAddStoreData = {};
        reAddStoreData.userId = $scope.userId;
        reAddStoreData.token = $scope.token;
        reAddStoreData.data = JSON.stringify({
          id: addPODItem.id,
          name: addPODItem.name,
          type: addPODItem.type
        });
        layer.load(2);
        dsp.postFun(
          "app/shop/update",
          JSON.stringify(reAddStoreData),
          function(data) {
            layer.closeAll("loading");
            var data = data.data;
            var code = data.statusCode;
            if (code != 200) {
              layer.msg("The server is busy now, please try again later.");
              return false;
            }
            // 跳转到返回的网址
            $window.location = data.result;
          },
          function() {
            layer.closeAll("loading");
            layer.msg("The server is busy now, please try again later.");
          }
        );
      };
      $scope.removePODFeature = function(item) {
        if($scope.fromErpNotAdmin) {
          layer.msg('You cannot edit it.')
          return
        }
        const msgLoading = cjMessage.loading({ isFixed: true });
        dsp.postFun(
          "app/shop/delectShopIndividuationNum",
          { ID: item.id },
          function(data) {
            msgLoading.hide();
            var data = data.data;
            if (data.statusCode != 200) {
              layer.msg("Remove failed");
            } else {
              layer.msg("Remove successfully");
              $scope.storeList = [];
              $scope.getStoreList({});
            }
          },function() {
            msgLoading.hide();
          }
        );
      };

      var updateStore;
      $scope.updatePODFeature = function(item) {
        if($scope.fromErpNotAdmin) {
          layer.msg('You cannot edit it.')
          return
        }
        $scope.updatePODTan = true;
        updateStore = item;
      };
      $scope.goUpdatePOD = function() {
        var reAddStoreData = {};
        reAddStoreData.userId = $scope.userId;
        reAddStoreData.token = $scope.token;
        reAddStoreData.data = JSON.stringify({
          noWriteThemes: "1",
          id: updateStore.id,
          name: updateStore.name,
          type: updateStore.type
        });
        layer.load(2);
        dsp.postFun("app/shop/update", JSON.stringify(reAddStoreData), function(
          data
        ) {
          layer.closeAll("loading");
          var data = data.data;
          var code = data.statusCode;
          if (code != 200) {
            layer.msg("The server is busy now, please try again later.");
            return false;
          }
          // 跳转到返回的网址
          $window.location = data.result;
        });
      };
      $scope.podSetting = function(item) {
        if(item.status != 1) return false;
        if($scope.fromErpNotAdmin) {
          layer.msg('You cannot edit it.')
          return
        }
        $scope.$broadcast("showpodsetting", item);
      };
      $scope.$on("podsetting-succ", function(event, data) {
        if (data) {
          $scope.storeList = [];
          $scope.getStoreList({});
        }
      });
      $scope.handleStoreLogistics = (item) => {
        $scope.$broadcast('showStoreLogistics', {
          iteminfo: item
        });
      }


      // 物流映射设置
      $scope.handleShowShipping = (item) => {
        // ERP端开启了用户物流映射设置的权限，才会展示这个入口
        $scope.$broadcast("showLogisticsSettings", item);
      }
      /* 头部菜单进入埋点 */
      function trackFun() {
        dsp.postFun(
          "pojo/home/addStatisByType",
          {
            entryPage: +dsp.getQueryString("track")
          },
          res => {
            console.log(res.data);
          }
        );
      }
      if (+dsp.getQueryString("track") == 1) {
        trackFun();
        location.href = "#/authorize/Shopify";
      }

      $scope.changeAliasName = function(index) {
        $scope.isChangeCurrentIndex = index;
      };

      $scope.upateAliasName = function(item) {
        var data = {
          aliasName: item.aliasName,
          shopId: item.id
        };
        layer.load(2);
        dsp.postFun("app/shop/updateShopAliasName", data, function(res) {
          layer.closeAll("loading");
          var data = res.data;
          var code = data.statusCode;
          if (code === 200) {
            $scope.showDeactiStores();
          }
          if (code != 200) {
            layer.msg("修改店铺昵称失败.");
            return false;
          }
          $scope.isChangeCurrentIndex = undefined;
        });
      };

      $scope.dropDown = (item, fileds) => {
        if(fileds == 'podShow' && item.status != 1) return false;
        event.stopPropagation()
        $scope.storeList = $scope.storeList.map(o => ({
          ...o,
          authorizeShow: false,
          syncShow: false,
          emlShow: false,
          podShow: false,
          logisticsShow: false,
          [fileds]: o[fileds] ? false : o.id === item.id,
        }))
      }

      function initConfirmBox ({content, cb}) {
        $scope.confirmBox = {
          showFlag: true,
          confirm() {
            cb && cb()
            this.showFlag = false;
          },
          cancel() {
            this.showFlag = false;
          },
          content,
        }
      }
      $scope.content = 'Are you sure to enable inventory sync? CJ will continue to manage the inventory for products fulfilled by CJ.';
      $scope.showPopUps = false;
      let disabledId = '';
      let syncInventory = '';
      $scope.enableStockSync = item => {
        if (item.syncInventory == 0) {
          $scope.content = "Are you sure to enable inventory sync? CJ will continue to manage the inventory for products fulfilled by CJ.";
          syncInventory = '1';
        } else if (item.syncInventory == 1) {
          $scope.content = "Are you sure to disable inventory sync? The inventory of the connected products will be managed by yourself, but products cannot be shipped when there is a inventory shortage.";
          syncInventory = '0';
        }
        $scope.popConfirmType = 'enableStockSync';
        $scope.showPopUps = true;
        disabledId = item.id;
      }
      // 获取弹窗组件关闭按钮
      $scope.$on('closePopUps', (e, d) => {
        $scope.showPopUps = false;
      })
      // 获取弹窗组件确定按钮
      $scope.$on('confirmPopUps', (e, d) => {
        if($scope.popConfirmType == 'enableStockSync') {
          enableStockSyncFun();
        } else if($scope.popConfirmType == 'deactivate') {
          deactivateFun();
        }
      })

      function enableStockSyncFun() {
        dsp.postFun('app/shop/synchronizeInventory',{
          shopId: disabledId,
          syncInventory
        }, res => {
          layer.closeAll("loading");
          const {data} = res;
          if (data.statusCode != 200) {
            layer.msg('Sorry, there was an unknown error. Inventory sync failed. Please try it again.');
            return
          }
          layer.msg('success')
          $scope.showPopUps = false;
          $scope.getStoreList({});
          
        })
      }

      function deactivateFun() {
        $scope.operateStore($scope.storeId, 2, function() {
          layer.msg(
            "Deactivated",
            {
              time: 1000
            },
            function() {
              layer.close(2);
              $scope.showPopUps = false;
              $window.location.reload();
            }
          );
        });
      }


      // 是否开启更新商店发送邮件提示
      $scope.updateEmailNotification = function(filterObj) {
        const params = {
          shopId: filterObj.id,
          emailNotification: filterObj.emailNotification == 1 ? 0 : 1
        }
        dsp.postFun("app/shop/updateEmailNotification", params, function(
          data
        ) {
          var data = data.data;
          if (data.statusCode != 200) {
            initConfirmBox({
              content: "Sorry, there was an unknown error. Please try it again."
            })
            return
          }
          layer.msg('success')
          $scope.getStoreList({});
        });
      };

      //Woocommerce Oauth授权方式
      $scope.ClientKey = ''
      $scope.ClientSecret = ''
      $scope.ErifierCode = ''
      $scope.notShowOAuth = true
      $scope.isShowNext = false
      $scope.isDisplay = function() {
        $scope.notShowOAuth = true
      }
      $scope.notDisplay = function() {
        $scope.notShowOAuth = false
      }

      $scope.limitClientKey = function() {
        if($scope.ClientKey.length > 199) {
          return layer.msg("You can enter 200 characters at most.")
        }
      }
      $scope.limitClientSecret = function() {
        if ($scope.ClientSecret.length > 199) {
          return layer.msg("You can enter 200 characters at most.")
        }
      }
      $scope.limitErifierCode = function() {
        if($scope.ErifierCode.length > 199) {
          return layer.msg("You can enter 200 characters at most.")
        }
      }
      $scope.goBack = function() {
        $scope.isShowNext = false
      }
 
      $scope.nextStep = function() {
        if (!$scope.SiteUrl) {
          return layer.msg("Please enter Site Url.");
        } else if (!$scope.ClientKey) {
          return layer.msg("Please enter Client Key.");
        } else if (!$scope.ClientSecret) {
          return layer.msg("Please enter Client Secret.");
        } else if (
            // 不允许填写https或者http
            $scope.SiteUrl.indexOf("https://") != -1 ||
            $scope.SiteUrl.indexOf("http://") != -1
          ) {
            return layer.msg('Store ID only, no "https://" or "http://".');
          } else {
            dsp.getFun(
              `platform-shop/authorize/getAuthorUrl?fromType=2&consumerKey=${$scope.ClientKey}&consumerSecret=${$scope.ClientSecret}&shopName=${$scope.SiteUrl}&platform=WOOCOMMERCE`,
              function(data) {
                if (data.data.code === 200) {
                  $scope.isShowNext = true
                  window.open(data.data.data)
                } else {
                  layer.msg(data.data.message);
                }
              }
            );
          }
      }

      $scope.oauthSub = function() {
        if(!$scope.ErifierCode) {
          document.getElementById("erifierCode").setAttribute('style', 'border-color: red')
          return layer.msg("Please enter Erifier code.");
        } else {
          document.getElementById("erifierCode").removeAttribute('style')
          dsp.getFun(`platform-shop/authorize/saveShop?platform=WOOCOMMERCE&consumerKey=${$scope.ClientKey}&consumerSecret=${$scope.ClientSecret}&shopName=${$scope.SiteUrl}&verifier=${$scope.ErifierCode}`, function(data) {
            if (data.data.code === 200) {
              window.location.href = 'welcome.html?from=authorize&result=1'
            } else {
              layer.msg(data.data.message);
            }
          })
        }
      }
    }
  ]);

  return app;
}
