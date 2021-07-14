(function (angular, Base64, JSEncrypt) {
  var app = angular.module('app', ['service', 'commonHeaderLoginModl', 'cjDotModule', 'loginLanguageSelect']);
  app.controller('registerCtrl', [
    '$scope',
    '$http',
    '$timeout',
    '$compile',
    'dsp',
    '$sce',
    '$filter',
    function ($scope, $http, $timeout, $compile, dsp, $sce, $filter) {

      if(dsp.getQueryString('token')){
        dsp.setCookie("invite-token",dsp.getQueryString('token'));
      }
      function encryptF(str) {
        var encrypt = new JSEncrypt();
        var public_key = `
-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCisNIJMSV7SSjH1k7jNfHF+Ywk4rvYp15IS78B8yZg73pAKqGPZWad0MKpqeuNKyN0iYK1Bh+Btt6SEAClvov2td8DoPurgwx7cxyy0spohOVuaM9U6w8tsdLC4NjZwdKtFlGUuJ45df63LpPEQFRuLY+RKmn3K7AGPK/xJYG5CwIDAQAB
-----END PUBLIC KEY-----
`;
        encrypt.setPublicKey(public_key);
        return encrypt.encrypt(str);
      }

      if (dsp.isPhone(true, {
          page: 'register'
        })) return;

      /* flowId增加的相关参数 */
      try {
        $scope.flowId = ""
        countClick()

        // 进入判断是否含有flowId
        function countClick() {
          const location = window.location
          const search = location.search
          if (search) {
            const searchParam = search.substr(1)
            const searchObj = handleSearchParam(searchParam.split("&"))
            const flowId = searchObj.flowId
            if (flowId) {
              countRequest(flowId)
              $scope.flowId = flowId
              localStorage.setItem('flowId', flowId)
            }
          }
          try {
            const referrer = document.referrer;
            const result = referrer.match(/flowId=(\d*)/);
            if(result) {
              $scope.flowId = result[1]
              localStorage.setItem('flowId', result[1])
            }
          } catch(e) {
            console.log('flowId报错了')
          }
        }

        /* count click request */
        function countRequest(flowId) {
          const params = {
            flowId
          }
          dsp.postFun("app/account/addClickCount", params, function (res) {})
        }

        /* 处理地址栏的参数, "key=sdaf" 转换为对象 */
        function handleSearchParam(arr) {
          const paramObj = {}
          arr.map((item) => {
            const [key, value] = item.split("=")
            paramObj[`${key}`] = value
          })
          return paramObj
        }
      } catch(err) {
        console.log('flowId错误')
      }

      /* flowId增加的相关参数 End */

      $scope.token = dsp.getQueryString('token');

      $scope.saleman = dsp.getQueryString('ma');
      const passReq = /^(?=(.*[A-Za-z]){1,})(?=(.*[\d]){1,})(?=(.*[^\w\s]){1,})(?=(.*[\s]){0,}).{1,}$/;
      // 获取国家列表
      let countryList = null;
      $scope.countries = null;
      $scope.isOpen = false;
      $scope.countryItem = {
        id: 'US',
        name: '美国',
        nameEn: 'United States of America (the)',
        phoneCode: '1'
      };
      dsp.getFun(
        'app/account/countrylist',
        function (data) {
          var data = data.data;
          if (data.statusCode != 200) {
            layer.msg('Get the country list error');
          } else {
            $scope.countries = JSON.parse(data.result);
            countryList = JSON.parse(data.result);
          }
        }
      );
      $scope.openCountrybox = function () {
        $scope.isOpen = true;
      };
      $scope.selectCount = function (item) {
        $scope.countryItem = item;
        $scope.isOpen = false;
      };
      const stringFun = (str) => {
        let val = str.toLowerCase() // 转成小写
        val = val.replace(/\s+/g, "") // 去掉所有空格
        return val
      }
      $scope.conuntrySearchFun = () => {
        if (!$scope.countryVal) {
          $scope.countries = countryList;
        } else {
          $scope.countries = countryList.filter(item => {
            const nameEn = stringFun(item.nameEn)
            const phoneCode = item.phoneCode
            const countryVal = stringFun($scope.countryVal)
            // ~ 可以用来判断是否为true（真） 例如 var value = "My value";  var valid = ~value.indexOf("My");  // ~-1 的值为0 判断为false；像~4 = -5 判断为true
            if (~nameEn.indexOf(countryVal) || ~phoneCode.indexOf(countryVal)) {
              return item;
            }
          });
        }
      };

      $scope.step = '1';
      $scope.inputType1 = 'password';
      $scope.inputType2 = 'password';

      $scope.handleChangeType = (type) => {
        $scope[type] = $scope[type] === 'password' ? 'text' : 'password';
      };

      // 表单验证
      $scope.emailVerify = () => {
        return new Promise(function (resolve, reject) {
          if (!$scope.email) {
            $scope.emailVerifyErrorMsg = $sce.trustAsHtml('! Please enter email.');
            resolve(false);
          } else if (!dsp.isEmail($scope.email)) {
            $scope.emailVerifyErrorMsg = $sce.trustAsHtml('! Please enter a correct email address.');
            resolve(false);
          } else {
            const parmas = {
              data: JSON.stringify({
                email: $scope.email
              })
            };
            const layer2 = layer.load(2);
            dsp.postFun('app/account/checkexist', parmas, ({
              data
            }) => {
              layer.close(layer2);
              if (data.statusCode === '207') {
                const link = $scope.saleman ? `login.html?ma=${$scope.saleman}` : $scope.token ? `login.html?token=${$scope.token}` : 'login.html';
                $scope.emailVerifyErrorMsg = $sce.trustAsHtml(`! The email address is registered. Already have an account? <a href="${link}">Login</a>.`);
              } else if (data.statusCode === '204') {
                $scope.emailVerifyErrorMsg = '';
              } else {
                layer.msg('! The server is busy now, please try again later.');
              }
              resolve(!$scope.emailVerifyErrorMsg);
            }, function (data) {
              return layer.msg('The server is busy now, please try again later.');
            });
          }
        });
      }

      $scope.passVerify = () => {
        return new Promise(function (resolve, reject) {
          if (!$scope.pass) {
            $scope.passVEM = $sce.trustAsHtml('! Please enter password.');
            return
          }
          let errMsg = ``;
          if ($scope.pass.includes(' ')) {
            errMsg = `! Password can\'t contain any spaces.<br/>`;
          }
          if ($scope.pass.length < 8 || $scope.pass.length > 15) {
            errMsg = `${errMsg} ! Password must be at least 8-15 characters long.<br/>`;
          }
          if (!(passReq.test($scope.pass))) {
            errMsg = `${errMsg} ! Password must contain letters, numbers and special characters.<br/>`;
          }
          $scope.passVEM = $sce.trustAsHtml(errMsg);
          if ($scope.confirmPass) {
            $scope.cpassVEM = $scope.confirmPass !== $scope.pass ? $sce.trustAsHtml("! The password can't be the same as any of the last four passwords.") : '';
          }
          resolve(!$scope.passVEM);
        });
      };

      $scope.cpassVerify = () => {
        return new Promise(function (resolve, reject) {
          if (!$scope.pass) {
            $scope.passVEM = '! Please input a password.';
          }
          if ($scope.confirmPass) {
            $scope.cpassVEM = $scope.confirmPass === $scope.pass ? '' : $sce.trustAsHtml('! Two passwords must match.');
          } else {
            $scope.cpassVEM = $sce.trustAsHtml('! Please confirm the password.');
          }
          resolve(!$scope.cpassVEM);
        });
      };

      $scope.userVerify = () => {
        return new Promise(function (resolve, reject) {
          if (!$scope.user) {
            $scope.userVerifyErrorMsg = $sce.trustAsHtml('! Please input a user name.');
            resolve(false);
          } else if ($scope.user.includes(' ')) {
            $scope.userVerifyErrorMsg = $sce.trustAsHtml('! The username can\'t contain any spaces.');
            resolve(false);
          } else if ($scope.user.length < 4 || $scope.user.length > 16) {
            $scope.userVerifyErrorMsg = $sce.trustAsHtml('! Username length must be 4-16 characters.');
            resolve(false);
          } else {
            const parmas = {
              data: JSON.stringify({
                loginName: $scope.user
              })
            };
            let layer1 = layer.load(2);
            dsp.postFun('app/account/checkexist', parmas, ({
              data
            }) => {
              layer.close(layer1);
              if (data.statusCode === '207') {
                $scope.userVerifyErrorMsg = $sce.trustAsHtml('! The user name already exists.');
                resolve(false);
              } else if (data.statusCode === '504') {
                $scope.userVerifyErrorMsg = $sce.trustAsHtml('! Only numbers and letters.');
                resolve(false);
              } else if (data.statusCode === '204') {
                $scope.userVerifyErrorMsg = '';
                resolve(true);
              } else {
                layer.msg('! The server is busy now, please try again later.');
                resolve(false);
              }
            }, function (data) {
              dsp.cjMesFun(1);
              return layer.msg('! The server is busy now, please try again later.');
            });
          }
        });
      };

      $scope.firstNameVerify = () => {
        return new Promise(resolve => {
          nameLenLimit()
          $scope.firstNameErrorMsg = !$scope.firstName ? $sce.trustAsHtml('! Please enter your first name.') : '';
          resolve(!$scope.firstNameErrorMsg);
        });
      };

      $scope.lastNameVerify = () => {
        return new Promise(resolve => {
          nameLenLimit()
          $scope.lastNameErrorMsg = !$scope.lastName ? $sce.trustAsHtml('! Please enter your last time.') : '';
          resolve(!$scope.lastNameErrorMsg);
        });
      };

      function nameLenLimit() {
        return new Promise(resolve => {
          const len = ($scope.firstName || '').length + ($scope.lastName || '').length;
          $scope.firstNameMaxLen = 40 - ($scope.lastName || '').length
          $scope.lastNameMaxLen = 40 - ($scope.firstName || '').length
          $scope.nameErrorMsg = len >= 40 ? $sce.trustAsHtml('! First Name plus Last Name cannot exceed 40 characters.') : '';
          //console.log(len,$scope.firstNameMaxLen,$scope.lastNameMaxLen);
          resolve(!(len >= 40));
        });
      }

      $scope.phoneVerify = () => {
        return new Promise(function (resolve, reject) {
          $scope.phoneVEM = !$scope.telephone ? $sce.trustAsHtml('! Please enter your phone number.') : '';
          resolve(!$scope.phoneVEM);
        });
      };

      $scope.phoneInput = () => {
        $scope.telephone = $scope.telephone && $scope.telephone.replace(/[^0-9]/g, '').replace(/\D/g, '');
      };

      //
      $scope.showConfirm = false;
      $scope.confirmMsg = '';

      $scope.handleNextStep = function () {
        Promise.all([$scope.emailVerify(), $scope.passVerify(), $scope.cpassVerify()]).then(function (resolve, reject) {
          console.log(resolve);
          if (resolve.filter(item => item === false).length > 0) return;
          if (!$scope.isAgree) {
            $scope.showConfirm = true;
            $scope.confirmMsg = `When you click "Confirm", you agree to our Terms and Privacy Policy. `;
          } else {
            $scope.step = '2';
          }
          $scope.$apply();
        });
      };

      /* shopify授权处理 */
      const from = dsp.getQueryString("from");
      const shopId = dsp.getQueryString("shopId");
      var fxReferrer = sessionStorage.getItem('fxReferrer');
      $scope.handleRegister = function () {
        Promise.all([$scope.userVerify(), $scope.firstNameVerify(), $scope.lastNameVerify(), nameLenLimit(), $scope.phoneVerify()]).then(function (resolve, reject) {
          console.log(resolve);
          if (resolve.filter(item => item === false).length > 0) return;
           //联盟平台 例如：awin
          let utmSource = {
            source: dsp.getCookie("utm_source") || '',
            awc: dsp.getCookie("awc") || '',
            awinaffid: dsp.getCookie("awinaffid") || ''
          }
          const registerData= {
            name: `${$scope.firstName} ${$scope.lastName}`,
            firstName: $scope.firstName,
            lastName: $scope.lastName,
            loginName: $scope.user,
            passwd: encryptF($scope.pass),
            email: $scope.email,
            phone: `${$scope.countryItem.phoneCode}-${$scope.telephone}`,
            contactID: {},
            country: $scope.countryItem.id,
            countryName: $scope.countryItem.nameEn,
            type: 'com',
            isEncryption: '2',
            isLazada: '1',
            affiliateId: dsp.getCookie("invite-token") || '',
            utmSource: dsp.getCookie("invite-token") ? '' :  JSON.stringify(utmSource) , //联盟平台 例如：awin
            userName: $scope.saleman || '',
            source: localStorage.getItem('adsource'),
            fxReferrer: fxReferrer
          }
          const storageFlowId = localStorage.getItem('flowId');
          if($scope.flowId || storageFlowId){
            const flow_id = $scope.flowId || storageFlowId;
            registerData.flowId = `${flow_id}`
          }
          const parmas = {
            data: JSON.stringify(registerData)
          };

          layer.load(2);
          dsp.postFun('app/account/register', parmas, ({
            data
          }) => {
            console.log(data)
            layer.closeAll('loading');
            if (data.statusCode === '200') {
              const b = new Base64();
              localStorage.removeItem('adsource');
              dsp.delCookie("invite-token")
              // 注册成功存密码保存
              localStorage.setItem('pass', b.encode($scope.pass));
              if (from === 'shopifyNeedAuth' && shopId) { // 从shopfiy过来注册的同时 
                const params = {
                  email: JSON.parse(data.result).email,
                  shopId
                }
                dsp.postFun("platform-shop/authorize/saveAccount", params, function(res) {
                    if(res.data.code === 200) {
                      try {
                        dsp.postFun(
                        "app/shop/upShopIndividuationNum",
                        { ID: $scope.shopId })
                        dsp.postFun(
                        "platform-product/product/pullShopProduct",
                        { ID: $scope.shopId })
                      } catch (error) {
                        console.log(error)
                      }
                      location.href = 'welcome.html?from=authorize&result=1'
                    } else {
                      const fromPage = $scope.fromPage ? b.encode($scope.fromPage) : null;
                      console.log('11111111111111111', fromPage)
                      location.href = `register-success.html?name=${b.encode($scope.user)}&email=${b.encode($scope.email)}&fromPage=${fromPage}`;
                    }
                })
              } else {
                const fromPage = $scope.fromPage ? b.encode($scope.fromPage) : null;
                console.log('222222222222222222222222', fromPage)
                location.href = `register-success.html?name=${b.encode($scope.user)}&email=${b.encode($scope.email)}&fromPage=${fromPage}`;
              }
            } else if (data.statusCode === '504') {
              layer.msg('Only numbers and letters are allowed in you username.');
            }
          }, err => {
            console.log(err);
          });
        });
      };

      $scope.confirmFun = () => {
        $scope.isAgree = true;
        $scope.showConfirm = false;
      };

      //第三方登录相关处理  --->
      $scope.regLoginInfo = {//注册登录所需参数
        canSubmit: false,//提交按钮 disabled 控制
        passwordShow: false,//密码显示隐藏
        login_name: '',//用户名
        password: '',// 密码
        email: '',
        first_name: '',
        id: '',
        last_name: '',
        name: '',
        //   familyName: '',// google
        //   givenName: '',// google
      }
      
      const facebookLogin = 'app/account/facebookLoginCs';
      const facebookReg = 'app/account/facebookRegCs';
      const googleLogin = 'app/account/googleLoginCs';
      const GoogleReg = 'app/account/googleRegCs';
      const httpApi = {
        facebook: {
            login: facebookLogin,
            reg: facebookReg
        },
        google: {
            login: googleLogin,
            reg: GoogleReg
        }
      }
      $scope.whichNetwork = localStorage.getItem('regGoogleInfo') ? 'google' : ''; //记录第三方登录的名称 regGoogleInfo: 'google'
      $scope.regLoginShow = localStorage.getItem('regLoginShow') === 'true'; //注册登录显示隐藏 google一键登录判断如果是新用户则显示弹窗注册  facebook 邮箱注册成功显示弹窗注册
      $scope.toggleHandle = function (key) { $scope.regLoginInfo[key] = !$scope.regLoginInfo[key] }
      $scope.closeRegLoginBox = function () {//关闭清除信息
        $scope.regLoginShow = false;
        let regLoginInfo = $scope.regLoginInfo;
        Object.keys(regLoginInfo).forEach(key => {
            if (typeof regLoginInfo[key] === 'string') regLoginInfo[key] = '';
        });
        regLoginInfo.canSubmit = false;
        localStorage.setItem('regLoginShow', false); //关闭注册登录开关
        localStorage.setItem('regGoogleInfo', ''); //清除google一键登录用户信息
      }
      $scope.errMsg = 'ok';
      $scope.focus = {};
      $scope.loginVerify = function (which) {
          const { login_name, password } = $scope.regLoginInfo;
          $scope.errMsg = verifyUsername(login_name);
          $scope.focus[which] = $scope.regLoginInfo[which] ? true : false;
          $scope.regLoginInfo.canSubmit = (password && login_name) ? true : false;
      }
      function verifyUsername(name) {//仅允许 数字 小写字母   4-8长度
          name += '';
          const re = /^[a-z0-9]*$/g;
          if (name.length === 0) return 'Please input a user name'
          if (name.length > 8 || name.length < 4) return 'User name length must be 4-8 characters';
          if (re.test(re.test(name))) return 'No space or capital';
          return 'ok';
      }
      $scope.focusHandle = function (which) {
          $scope.focus[which] = true;
      }
      function throttle(fn, wait) {
        let lastTime = Date.now();
        return function () {
            let currentTime = Date.now();
            if (currentTime - lastTime > wait) {
                lastTime = currentTime;
                fn.apply(this, arguments)
            }
        }
      }
      $scope.localParams = {};//登录跳转  localStorage本地存储所需参数
      let regLogin = function () {// 第三方第一次 登录  会调用  注册 登录操作
        if (!$scope.regLoginInfo.canSubmit) return
        console.log('注册 登录操作 ---->>>', $scope.regLoginInfo)
        //google一键登录时新用户注册 需要的Google用户信息
        const googleInfo = Object.assign($scope.regLoginInfo, JSON.parse(localStorage.getItem('regGoogleInfo')));
        $scope.regLoginInfo = localStorage.getItem('regGoogleInfo') ? googleInfo : $scope.regLoginInfo;
        if (!$scope.whichNetwork) return
        const url = httpApi[$scope.whichNetwork].reg;
        layer.load()
        $scope.regLoginInfo.fxReferrer = sessionStorage.getItem('fxReferrer') || '';
        dsp.postFun(url, $scope.regLoginInfo, function ({ data }) {
            layer.closeAll('loading')
            console.log('data --> ', data)
            let { result, statusCode, message } = data;//不同的后端返回的数据字段不一样 视情况而定
            // if (statusCode == 811) {
            //   layer.msg(message)
            //   localStorage.setItem('thirdLoginTempData',JSON.stringify({
            //     lockThirdPartyEmail: true,
            //     userName: $scope.regLoginInfo.email,
            //     thirdLoginParams: {
            //       thirdEmail: $scope.regLoginInfo.email, // 第三方登录返回的邮箱
            //       facebookId: '', // 第三方登录的facebookId
            //       googleId: $scope.regLoginInfo.id, // 第三方登录的googleId
            //     }
            //   }))
            //   
                // setTimeout(() => {
                //   location.href = 'login.html'
                // }, 2000)
            // }
            if (statusCode != 200) {
                return layer.msg(message)
            }
            result = JSON.parse(result)
            $scope.localParams = result;
            console.log('注册成功  ---> ', result)
            successfn()
        })
      }
      $scope.regLogin = throttle(regLogin, 1000);
      function successfn() {//登录成功后的操作 (沿用 之前的SignInWith.js 代码)
        let userInfo = $scope.localParams;
        console.log(userInfo);
        dsp.saveDataAfterLogin(userInfo);
        var b = new Base64();
        // 检测是否有tarket查询字符串
        function getQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return decodeURI(r[2]);
            return null;
        }

        var target = getQueryString('target');
        if (target) target = b.decode(target);
        console.log(target);
        var fromUrlArr = document.referrer.split('/');
        console.log(fromUrlArr)
        var fromPage = fromUrlArr[fromUrlArr.length - 1];
        $scope.fromPage = fromPage;
        const keysArr = ['id', 'loginName', 'token', 'name', 'firstName', 'lastName', 'status', 'avatar', 'contactID', 'country', 'address', 'email', 'phone', 'storeLink', 'relateSalesman', 'salesmanId'];
        if (keysArr.some(key => userInfo[key] === undefined)) {// 缺少参数提示
            console.log('err  --->   缺少后台回传参数    undefined 引起 编码报错')
        }
        localStorage.setItem('userId', b.encode(userInfo.id));
        localStorage.setItem('loginName', b.encode(userInfo.loginName));
        localStorage.setItem('token', b.encode(userInfo.token));
        localStorage.setItem('noEncodeToken', userInfo.token);
        localStorage.setItem('name', b.encode(userInfo.name));
        localStorage.setItem('firstName', b.encode(userInfo.firstName));
        localStorage.setItem('lastName', b.encode(userInfo.lastName));
        localStorage.setItem('avatar', b.encode(userInfo.avatar || ''));
        if (userInfo.lastAccess) {
            localStorage.setItem('lastLoginTime', b.encode(userInfo.lastAccess.loginDate));
        }
        localStorage.setItem('contactID', b.encode(userInfo.contactID));
        localStorage.setItem('country', b.encode(userInfo.country));
        localStorage.setItem('address', b.encode(userInfo.address));
        localStorage.setItem('email', b.encode(userInfo.email));
        localStorage.setItem('phone', b.encode(userInfo.phone));
        localStorage.setItem('storeLink', b.encode(userInfo.storeLink));
        localStorage.setItem('relateSalesman', b.encode(userInfo.relateSalesman));
        localStorage.setItem('salesmanId', b.encode(userInfo.salesmanId));
        localStorage.setItem('loginTime', new Date().getTime());
        console.log('成功登录  即将跳转 主页');
        if (target) {
            location.href = target;
            return;
        }
        if (fromPage.indexOf('list-detail.html') != -1 || fromPage.indexOf('reptail-detail.html') != -1 || fromPage.indexOf('product-detail.html') != -1) {
            location.href = fromPage;
            return;
        }
        location.href = 'home.html';
      }
      //通过facebookid获取邮箱
      function getEmailByFacebookId (params) {
        var b = new Base64();
        dsp.postFun('app/account/getEmailFacebookId', { facebookId: params.id }, function ({ data }) {
            // 邮箱不存在则跳转到邮箱注册页 否则请求app/account/facebookLogin 接口登录主页
            if (+data.statusCode !== 200) {
                localStorage.setItem('facebookParam', b.encode(JSON.stringify(params || ''))) //将facebook用户信息存入localStorage
                location.href = 'facebookEmail.html';
            }
            let fbParams = { ...params, email: data.result}
            console.log('facebookLogin params ---> ', fbParams)
            // $scope.whichNetwork = 'facebook';
            // loginByAuth($scope.whichNetwork, fbParams)
            loginByFacebook(fbParams , 'alreadyHaveEmail')
        })
      }

      function loginByFacebook(fbParams, type) {
        layer.load();
        let params = {
          id: fbParams.id, //facebookid
          email: fbParams.email, //邮箱
          name: fbParams.name,
          first_name: fbParams.first_name,
          last_name: fbParams.last_name,
          isFacebookHave: 1 //如果Facebook账号里已经有了邮箱，则需要传递参数isFacebookHave
        };
        // 已经有邮箱的账号不需要传递参数isFacebookHave
        type === 'alreadyHaveEmail' && delete params.isFacebookHave
        let url = "app/account/facebookLogin";
        dsp.postFun(url, params, function({ data }) {
          layer.closeAll('loading');
          let { result, statusCode, message } = data;
          if (+statusCode === 200) {
            $scope.localParams = JSON.parse(result)
            successfn()
            return
          }
          if(+statusCode === 811) {
            layer.msg(message)
            localStorage.setItem('thirdLoginTempData',JSON.stringify({
              lockThirdPartyEmail: true,
              userName: fbParams.email,
              thirdLoginParams: {
                thirdEmail: fbParams.email, // 第三方登录返回的邮箱
                facebookId: fbParams.id, // 第三方登录的facebookId
                googleId: '', // 第三方登录的googleId
              }
            }))
            setTimeout(() => {
              location.href = 'login.html'
            }, 2000)
          }
          //其余情况
          console.log("errMsg----->", message);
        });
      }

      //11-22 重写 三方登录
      $scope.facebookLogin = function () {//按钮触发
        if (typeof FB === 'undefined') {
            layer.msg('Sorry, the Facebook SDK is not found.')
            return console.log('FB is not defined')
        }
        layer.load();
        facebookAuth().then(params => {
            console.log('facebookLogin params ---> ', params)
            params.email ? loginByFacebook(params) : getEmailByFacebookId(params)
            // $scope.whichNetwork = 'facebook';
            // loginByAuth($scope.whichNetwork, params)
        }).catch(() => {
            errHandle('Facebook Auth Failed')
        })
    }
    function facebookAuth() {// facebook auth
        return new Promise((resolve, reject) => {
            FB.login((res) => {
                console.log('facebookLogin --> res ', res)//accessToken userID signedRequest
                if (res.status === 'connected') {
                    const { accessToken, userID } = res.authResponse || {};
                    const url = `https://graph.facebook.com/${userID}?fields=id,name,email,first_name,last_name&access_token=${accessToken}`;
                    
                    dsp.getFun(url, function({data}) {
                        // console.log('facebookAuth data ---> ', data)
                        resolve(data)// first_name, last_name, id, name, email
                    }, function(err) {
                        reject(err)
                        console.log('facebookLogin err --> ', err)
                    })
                } else {
                    errHandle('facebook auth failed')
                }
            }, {scope: 'public_profile,email'})
        })
    }
    function loginByAuth(network, params) {// 调用后端 相关 登录接口
        dsp.mypost(httpApi[network].login, params).then(res => {//传递第三方信息给后端 判断是否需要注册登录   还是 老用户直接登录
            res = JSON.parse(res);//
            $scope.localParams = res// email  first_name  last_name  name login_name password
            console.log(' login_type == 1  新用户---> ', res) // login_type === 1 新用户 没有则为老用户
            if (res.login_type == 1) {//新用户  开启 注册登录遮罩
                let paramsCs = {};
                if (network == 'facebook') {
                  let { id, name, first_name, last_name, email } = params;
                  const obj = { id, name, first_name, last_name, email };
                  paramsCs = Object.assign({}, obj);
                  if (!email){
                    return layer.msg('Facebook Login Failed. Please link your email and try it again.');
                  }
                  if (!Object.values(paramsCs).every(item => item)) {//注册所需 values
                      return layer.msg('Facebook Login Failed. Please complete your profile and try it again.');
                  }
                }
                if (network == 'google') {
                    let { givenName, familyName, id, name, email } = params;
                    const obj = { givenName, familyName, id, name, email }
                    paramsCs = Object.assign({}, obj);
                    if (!email){
                      return layer.msg('Google Login Failed. Please link your email and try it again.');
                    }
                    if (!Object.values(obj).every(item => item)) {//注册所需 values
                        return layer.msg('Google Login Failed. Please complete your profile and try it again.');
                    }
                }
                $scope.regLoginInfo = Object.assign($scope.regLoginInfo, paramsCs); // 新用户注册所需参数 存储

                $scope.regLoginShow = true;
                layer.closeAll('loading')
            } else {//老用户 直接跳转页面
                successfn()// 执行 旧版 登录功能  依赖 $scope.localParams
            }
        }).catch(err => {
          if(+err.statusCode == 811) {// 第三方邮箱和cj邮箱冲突时，做回填并禁止修改邮箱
            localStorage.setItem('thirdLoginTempData',JSON.stringify({
              lockThirdPartyEmail: true,
              userName: params.email,
              thirdLoginParams: {
                thirdEmail: params.email, // 第三方登录返回的邮箱
                facebookId: '', // 第三方登录的facebookId
                googleId: params.id, // 第三方登录的googleId
              }
            }))
            setTimeout(() => {
              location.href = 'login.html'
            }, 2000)
            layer.closeAll('loading')
            return
          }
            errHandle()
            console.log('loginByAuth err -> ', err)
        })
      }
      function errHandle(str='Server is busy ...') {
          layer.closeAll('loading')
          layer.msg(str)
      }
      ;(function init() {//初始化 三方登录 必备条件
          loadFacebookScript()
          initFacebookInstance()
          initGoogleScript()
          initGoogleInstance()
      }())
      function loadFacebookScript() {//加载 Facebook sdk
          (function (d, s, id) {
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) return;
              js = d.createElement(s); js.id = id;
              js.src = 'https://connect.facebook.net/en_US/sdk.js';
              fjs.parentNode.insertBefore(js, fjs);
          }(document, 'script', 'facebook-jssdk'));
      }
      function initFacebookInstance() {// 初始化 FB实例
        window.fbAsyncInit = function () {
          FB.init({
            appId: '2678412275531221',
            cookie: true,                     // Enable cookies to allow the server to access the session.
            xfbml: true,                     // Parse social plugins on this webpage.
            version: 'v5.0'           // Use this Graph API version for this call.
          });
        };     
      }
      function initGoogleScript() {
        (function (d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s); js.id = id;
          js.src = "https://apis.google.com/js/platform.js?onload=googleAuthInit";
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'google-jssdk'));
      }
      function initGoogleInstance() {//初始化 gapi 实例
        window.googleAuthInit = function() {
          gapi.load('auth2', function() {
            const googleApi = gapi.auth2.init({
              // client_id: '126980844117-a8sr7tog7alfdabbkg47j2pq2mhflogc.apps.googleusercontent.com',// old
              client_id: '708607489636-7ihggmvci7r9b6npeo3j9v4mnb2g23fp.apps.googleusercontent.com',// 本地8081允许测试
              cookiepolicy: 'single_host_origin'
            });
            addGoogleLoginEventListener(googleApi)
          })
        }
      }
      function addGoogleLoginEventListener(googleApi) {//添加 google 点击登录事件
        googleApi.attachClickHandler(document.getElementById('google'), {}, (googleUser) => {//获取用户信息
            layer.load();
            const profile = googleUser.getBasicProfile();
            console.log('profile', profile);
            // const { HT: familyName, GV: givenName, Ad: name, bu: email, aU: id } = profile || {};
            const familyName = profile.getFamilyName(); //姓
            const givenName = profile.getGivenName(); // 名
            const name = profile.getName(); //姓名
            const email = profile.getEmail(); //邮箱
            const id = profile.getId(); // id
            // const headUrl = profile.getImageUrl(); //头像
            const params = { givenName, familyName, id, name, email };
            $scope.whichNetwork = 'google';
            console.log("addGoogleLoginEventListener -> params", params)
            loginByAuth($scope.whichNetwork, params)
        }, function (err) {
            console.log('googleApi.attachClickHandler err =>', err)
            console.log(JSON.stringify(err, undefined, 2));
        });
      }
    }
  ]);
})(angular, Base64, JSEncrypt);