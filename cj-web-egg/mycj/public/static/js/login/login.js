/**
 * 一个立即执行函数表达式(IIFE),
 * @param {} Angular
 * @param {} Base64
 * @param {} JSEncrypt
 */
//引入了JSEncrypt但是没有引用,函数需要优化
(function (angular, Base64,JSEncrypt) {
    //通过angular.module(name,[])来定义一个模块
    //name为模块名,[]为依赖列表
    var app = angular.module('app', ['service', 'commonHeaderLoginModl', 'commonFooterLoginModl','cjDotModule', 'loginLanguageSelect']);
    app.controller('loginCtrl', ['$scope', '$http', '$timeout', 'dsp','$filter','$rootScope', function ($scope, $http, $timeout, dsp,$filter,$rootScope) {

        // 到登录页说明退出登录，清除推荐类目干扰id和推荐商品版本号
        window.setInterfereProdVersion && window.setInterfereProdVersion('', true)
        window.cjSetInterfereProdId && window.cjSetInterfereProdId('', true)

        if (dsp.isPhone(true, { page: 'login' })) return;
        
        $scope.showBlackTip=false;
        //---------------------------
        var b = new Base64();
        // 检测是否有tarket查询字符串
        $scope.target = dsp.getQueryString('target');
        if ($scope.target) {
            // $scope.targetEncode = $scope.target;
            $scope.target = b.decode($scope.target);
        }

        var saleman = dsp.getQueryString('ma');
        $scope.saleman = saleman;
        var token = dsp.getQueryString('token');
        $scope.token = token;

        $scope.inputType1 = 'password';
        $scope.handleChangeType = (type) => {
            $scope[type] = $scope[type] === 'password' ? 'text' : 'password';
        }


		const UserName = b.decode(localStorage.getItem('UserName') || '') || ""
		const subAccountName = b.decode(localStorage.getItem('subAccountLoginName') || '') || ''
        $scope.remberPass = localStorage.getItem('isRememberPassword') === '1' ? true : false;
        $scope.userName = subAccountName || UserName// 只有记住密码时才回填密码  否则只回填账号
        if($scope.remberPass) {
            $scope.passWord = b.decode(localStorage.getItem('password') || '') || "";
        }
        $scope.loginError = false;
        $scope.loginErrorMsg = '';
        var fromUrlArr = document.referrer.split('/');
        var fromPage = fromUrlArr[fromUrlArr.length - 1]
        var checkAds = dsp.getQueryString('checkAds')
        if(fromPage.indexOf('product-detail.html') != -1 && checkAds == 1) {
            fromPage = fromPage + '&checkAds=1';
        }
        // console.log(fromUrlArr[fromUrlArr.length - 1]);
        
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
        console.log(localStorage.getItem('regLoginShow'))
        $scope.regLoginShow = localStorage.getItem('regLoginShow') === 'true'; //注册登录显示隐藏 google一键登录判断如果是新用户则显示弹窗注册  facebook 邮箱注册成功显示弹窗注册
        
        const thirdLoginTempData = JSON.parse(localStorage.getItem('thirdLoginTempData') || '{}')
        $scope.thirdLoginParams = thirdLoginTempData.thirdLoginParams ? thirdLoginTempData.thirdLoginParams : {
            thirdEmail: '', // 第三方登录返回的邮箱
            facebookId: '', // 第三方登录的facebookId
            googleId: '', // 第三方登录的googleId
        }
        $scope.lockThirdPartyEmail = thirdLoginTempData.lockThirdPartyEmail || false // 是否锁定第三方的邮箱
        if($scope.lockThirdPartyEmail) {
            $scope.userName = thirdLoginTempData.userName
            localStorage.removeItem('thirdLoginTempData')
        }

        // $scope.regLoginShow = false; //注册登录显示隐藏
        $scope.toggleHandle = function (key) { $scope.regLoginInfo[key] = !$scope.regLoginInfo[key] }
        $scope.closeRegLoginBox = function () {//关闭清除信息
            $scope.regLoginShow = false;
            let regLoginInfo = $scope.regLoginInfo;
            Object.keys(regLoginInfo).forEach(key => {
                if (typeof regLoginInfo[key] === 'string') regLoginInfo[key] = '';
            });
            regLoginInfo.canSubmit = false;
            console.log('closeRegLoginBox', regLoginInfo)
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
            if (name.length === 0) return 'Please input a Username'
            if (name.length > 8 || name.length < 4) return 'Username length must be 4-8 characters';
            if (re.test(re.test(name))) return 'No space or capital';
            return 'ok';
        }
        $scope.focusHandle = function (which) {
            $scope.focus[which] = true;
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
                // debugger
                // if (statusCode == 811) {
                //     layer.msg(message)
                //     $scope.lockThirdPartyEmail = true // 第三方登录
                //     $scope.userName = $scope.regLoginInfo.email
                //     $scope.thirdLoginParams = {
                //         thirdEmail: $scope.regLoginInfo.email, // 第三方登录返回的邮箱
                //         facebookId: '', // 第三方登录的facebookId
                //         googleId: $scope.regLoginInfo.id, // 第三方登录的googleId
                //     }
                //     return
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
        //成功跳转 参数 须整理
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
            // var fromUrlArr = document.referrer.split('/');
            // console.log(fromUrlArr)
            // var fromPage = fromUrlArr[fromUrlArr.length - 1];
            // var checkAds = dsp.getQueryString('checkAds')
            // if(fromPage.indexOf('product-detail.html') != -1 && checkAds == 1) {
            //     fromPage = fromPage + '&checkAds=1';
            // }
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
            if(userInfo.address) localStorage.setItem('address', b.encode(userInfo.address));
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
                  $scope.lockThirdPartyEmail = true // 第三方登录
                  $scope.userName = fbParams.email
                  $scope.thirdLoginParams = {
                    thirdEmail: fbParams.email, // 第三方登录返回的邮箱
                    facebookId: fbParams.id, // 第三方登录的facebookId
                    googleId: '', // 第三方登录的googleId
                  }
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
                    $scope.thridLoading && $scope.thridLoading.hide()
                } else {//老用户 直接跳转页面
                    successfn()// 执行 旧版 登录功能  依赖 $scope.localParams
                }
            }).catch(err => {

                if(+err.statusCode == 811) {// 第三方邮箱和cj邮箱冲突时，做回填并禁止修改邮箱
                    
                    $scope.lockThirdPartyEmail = true // 第三方登录
                    $scope.userName = params.email
                    $scope.thirdLoginParams = {
                        thirdEmail: params.email, // 第三方登录返回的邮箱
                        facebookId: '', // 第三方登录的facebookId
                        googleId: params.id, // 第三方登录的googleId
                    }
                    $scope.thridLoading && $scope.thridLoading.hide()
                    return
                }

                errHandle()
                $scope.thridLoading && $scope.thridLoading.hide()
                layer.msg(str)
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
                $scope.thridLoading = cjMessage.loading({ isFixed: true })
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
                $scope.thridLoading && $scope.thridLoading.hide();
                console.log('googleApi.attachClickHandler err =>', err)
                console.log(JSON.stringify(err, undefined, 2));
            });
        }
        
        /* shopify授权处理 */
        const from = dsp.getQueryString("from");
        const shopifyEmail = dsp.getQueryString("email");
        const shopId = dsp.getQueryString("shopId");
        if(from === 'shopifyNeedAuth' ) {
            if(shopifyEmail) {
                $scope.lockShopifyEmail = true;
                $scope.userName = shopifyEmail;
            }
            
        }

        //第三方登录相关处理  <------------------------------
        // 登录函数
        $scope.login = function () {
            if (!$scope.userName) {
                $scope.Nousername = true;
                $scope.NoPassword = false;
            } else if (!$scope.passWord) {
                $scope.Nousername = false;
                $scope.NoPassword = true;
                $scope.loginError = false
            } else {
                $scope.Nousername = false;
                $scope.NoPassword = false;
                dsp.login({
                    name: $scope.userName,
                    passwd: $scope.passWord,
                    chatType: "0",
                    platform: 'pc',
                    thirdEmail: $scope.thirdLoginParams.thirdEmail,
                    facebookId: $scope.thirdLoginParams.facebookId,
                    googleId: $scope.thirdLoginParams.googleId
                }, function (data) {
                    var data = data.data;
                    var code = data.statusCode;
                    if (code != 200) {
                        localStorage.clear();
                        if (code == 503 || code == 502) {
                            $scope.loginError = true;
                            $scope.loginErrorMsg = 'Username or password error.';
                        } else if (code == 520) {
                            layer.msg('Sorry, There is something wrong with your profile, you can not login at the moment.');
                        } else if (code == 518) {
                            $scope.loginError = true;
                            $scope.loginErrorMsg = 'Your email has not been verified. Please verify or log in with your username.';
                            $timeout(function () {
                                $scope.loginErrorMsg = '';
                            }, 2000);
                        } else if (code == 519) {
                            $scope.showBlackTip=true;
                            $scope.loginError = false;
                            $scope.NoPassword = false;
                            // layer.msg('Unfortunately, Your account had been blocked, please contact CJ support or your agent.')
                        } else if (code == 6001){// 当前第三方邮箱与要绑定的账号邮箱不一致
                            layer.msg(data.message)
                        } else {
                            layer.msg('The server is busy now, please try again later.');
                        }

                    } else {  // 登录成功
                        var result = JSON.parse(data.result);
                        if(fromPage) {
                            result.fromPage = fromPage
                        }
                        let odate =  $filter('date')(new Date(),'yyyyMMddhhmmss')-0;
                        // 需要二次验证
                        var b  = new Base64()
                        if (result.check) {
                            dsp.setCookie('userId',b.encode(result.userId))
                            dsp.setCookie('from',from)
                            dsp.setCookie('tempShopId',shopId)
                            dsp.setCookie('shopId',$scope.shopId)
                            dsp.setCookie('remberPass',$scope.remberPass)
                            dsp.setCookie('target',$scope.target)
                            dsp.setCookie('fromPage',fromPage)
                            dsp.setCookie('odate',odate)
                            dsp.setCookie('auth-passWord',b.encode($scope.passWord))
                            dsp.setCookie('auth-userName',b.encode($scope.userName))

                            localStorage.setItem('thirdLoginTempData',JSON.stringify({
                                thirdLoginParams: {
                                    facebookId: $scope.thirdLoginParams.facebookId, // 第三方登录的facebookId
                                    googleId: $scope.thirdLoginParams.googleId, // 第三方登录的googleId
                                }
                            }))

                            location.href = 'second-authorize.html';
                        } else {
                            result.passWord = b.encode($scope.passWord)
                            result.userName = b.encode($scope.userName)
                            dsp.loginProcess(result,from,shopId,$scope.shopId,$scope.remberPass,$scope.target,fromPage,odate,loginErrorProcess);
                        }
                    }
                    
                })
            }

		}
        function loginErrorProcess() {
            $scope.loginError = false;
        }

        $rootScope.$on('account-blocked',function(d,data) {
            if(data) {$scope.showBlackTip=true};
        })
        $scope.inputfocus = function () {
            // $scope.isHideInfo=true;
        }
        // 记住密码
        $scope.isCheck = function () {
            $scope.remberPass = !$scope.remberPass;

        }
        $scope.keyDown = function (Event) {
            if (Event.keyCode == 13) {
                $scope.login();
            }
        }
        $scope.ceshi = function () {
            var data = {
                "email": "zlzandy2013@gmail.com",
                "first_name": "Andy",
                "id": "2187476281524835",
                "last_name": "Chou",
                "name": "Andy Chou"
            }
            dsp.postFun('app/account/facebookLogin', data, function (data) {

            })
        }
        $scope.goResetPass = (event)=>{
            event.stopPropagation();
            if($scope.lockThirdPartyEmail) { // 如果当前第三方登录的email与cj的email有冲突，把冲突email存起来，在忘记密码页回填
                localStorage.setItem('thirdPartyEmail', $scope.thirdLoginParams.thirdEmail)
            }
            window.location.href = 'forgotPassword.html';
        }
    }]).directive('repeatFinish', function () {
        return {
            link: function ($scope, element, attr) {
                if ($scope.userName) {
                    $scope.isfocus1 = true;
                    $scope.isfocus2 = true;
                }
            }
        }
    });


})(angular, Base64,JSEncrypt)
