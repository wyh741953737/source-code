(function (angular, Base64,JSEncrypt) {
    var app = angular.module('app', ['service', 'commonHeaderLoginModl', 'commonFooterLoginModl']);
    app.controller('loginCtrl', ['$scope', '$http', '$timeout', 'dsp','$filter','$rootScope', function ($scope, $http, $timeout, dsp,$filter,$rootScope) {
        if (dsp.isPhone(true, { page: 'login' })) return;
        //---------------------------
        dsp.domainData().then((res) => {
            // 请求成功的结果
            console.log(res)
            $scope.iscj = res.iscj;
            if($scope.iscj == '1'){
                //cj
                $scope.icon = '/favicon.ico';
                $scope.logo = 'static/image/login/loginuser.png';
            }else {
                //客户
                $scope.icon = res.logo1 || '/favicon.ico';
                $scope.logo = res.logo1 || 'static/image/login/loginuser.png';
                $('link[rel$=icon]').replaceWith('');
                $('head').append($('<link rel="shortcut icon"/>').attr('href', $scope.icon ));
            }

        })
        
        $scope.showBlackTip=false;
        //---------------------------
        var b = new Base64();
        // 检测是否有tarket查询字符串
        $scope.target = dsp.getQueryString('target');
        if ($scope.target) {
            // $scope.targetEncode = $scope.target;
            $scope.target = b.decode($scope.target);
        }
        console.log($scope.target, '》》》》》》》》》》》》》》》》》');

        var saleman = dsp.getQueryString('ma');
        $scope.saleman = saleman;
        var token = dsp.getQueryString('token');
        $scope.token = token;

        $scope.userName = b.decode(localStorage.getItem('UserName') || '') || "";
        $scope.passWord = b.decode(localStorage.getItem('password') || '') || "";
        $scope.remberPass = localStorage.getItem('isRememberPassword') === '1' ? true : false;
        $scope.loginError = true;
        $scope.loginErrorMsg = '';
        var fromUrlArr = document.referrer.split('/');
        var fromPage = fromUrlArr[fromUrlArr.length - 1]
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
        $scope.focus = {
            login_name: false,
            password: false
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
        let whichNetwork = '';//记录第三方登录的名称
        $scope.regLoginShow = false; //注册登录显示隐藏
        $scope.toggleHandle = function (key) { $scope.regLoginInfo[key] = !$scope.regLoginInfo[key] }
        $scope.closeRegLoginBox = function () {//关闭清除信息
            $scope.regLoginShow = false;
            let regLoginInfo = $scope.regLoginInfo;
            Object.keys(regLoginInfo).forEach(key => {
                if (typeof regLoginInfo[key] === 'string') regLoginInfo[key] = '';
            });
            regLoginInfo.canSubmit = false;
            console.log('closeRegLoginBox', regLoginInfo)
        }
        $scope.errMsg = 'ok';
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
        $scope.localParams = {};//登录跳转  localStorage本地存储所需参数
        
        let regLogin = function () {// 第三方第一次 登录  会调用  注册 登录操作
            if (!$scope.regLoginInfo.canSubmit) return
            console.log('注册 登录操作 ---->>>', $scope.regLoginInfo)
            if (!whichNetwork) return
            const url = httpApi[whichNetwork].reg;
            layer.load()

            dsp.postFun(url, $scope.regLoginInfo, function ({ data }) {
                layer.closeAll('loading')
                console.log('data --> ', data)
                let { result, statusCode, message } = data;//不同的后端返回的数据字段不一样 视情况而定
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
        //11-22 重写 三方登录
        $scope.facebookLogin = function () {//按钮触发
            if (typeof FB === 'undefined') {
                layer.msg('Sorry, the Facebook SDK is not found.')
                return console.log('FB is not defined')
            }
            layer.load();
            facebookAuth().then(params => {
                console.log('facebookLogin params ---> ', params)
                const url = 'app/account/facebookLoginCs';
                loginByAuth(url, params)
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
        function loginByAuth(url, params) {// 调用后端 相关 登录接口
            dsp.mypost(url, params).then(res => {//传递第三方信息给后端 判断是否需要注册登录   还是 老用户直接登录
                res = JSON.parse(res);//
                $scope.localParams = res// email  first_name  last_name  name login_name password
                console.log(' login_type == 1  新用户---> ', res) // login_type === 1 新用户 没有则为老用户
                if (res.login_type == 1) {//新用户  开启 注册登录遮罩
                    $scope.regLoginShow = true;
                    layer.closeAll('loading')
                } else {//老用户 直接跳转页面
                    successfn()// 执行 旧版 登录功能  依赖 $scope.localParams
                }
            }).catch(err => {
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
                    window.googleApi = googleApi;//供线上测试
                    addGoogleLoginEventListener(googleApi)
                })
            }
        }
        function addGoogleLoginEventListener(googleApi) {//添加 google 点击登录事件
            googleApi.attachClickHandler(document.getElementById('google'), {}, (googleUser) => {//获取用户信息
                layer.load();
                const profile = googleUser.getBasicProfile();
                // window.userInfo = profile;//供全局 查看 返回信息
                // console.log('profile', profile);
                const { JU: familyName, JW: givenName, Ad: name, Au: email, eV: id } = profile || {};
                const params = { givenName, familyName, id, name, email };
                const url = 'app/account/googleLoginCs';
                // console.log("addGoogleLoginEventListener -> params", params)
                loginByAuth(url, params)
            }, function (err) {
                console.log('googleApi.attachClickHandler err =>', err)
            });
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
            } else {
                $scope.Nousername = false;
                $scope.NoPassword = false;
                dsp.login({
                    name: $scope.userName,
                    passwd: $scope.passWord,
                    chatType: "0",
                    platform: 'pc'
                }, function (data) {
                    var data = data.data;
                    var code = data.statusCode;
                    if (code != 200) {
                        localStorage.clear();
                        if (code == 503 || code == 502) {
                            $scope.loginError = true;
                            $scope.loginErrorMsg = 'User name or password error';
                        } else if (code == 520) {
                            layer.msg('Sorry, There is something wrong with your profile, you can not login at the moment.');
                        } else if (code == 518) {
                            $scope.loginError = true;
                            $scope.loginErrorMsg = 'Your email has not been verified. Please verify or log in with your username!';
                            $timeout(function () {
                                $scope.loginErrorMsg = '';
                            }, 2000);
                        } else if (code == 519) {
                            $scope.showBlackTip=true;
                            // layer.msg('Unfortunately, Your account had been blocked, please contact CJ support or your agent.')
                        } else {
                            layer.msg('The server is busy now, please try again later.');
                        }

                    } else { // 登录成功
                        var result = JSON.parse(data.result);
                        let updatePassword = data.updatePassword?(data.updatePassword.replace(/[^\d]/g,'')-0):'';
                        let odata = $filter('date')(new Date(),'yyyyMMddhhmmss')-0;
                        if(updatePassword&&odata>updatePassword){
                            layer.confirm('For security reason, we recommend you change the password per 90 days.', {
                                title: 'Security Alert',
                                btn: ['Skip','Change Now'] //按钮
                                }, function(ca){
                                    $scope.loginError = false;
                                    dsp.saveDataAfterLogin(result);
                                    if ($scope.remberPass) {
                                        localStorage.setItem('password', b.encode($scope.passWord));
                                        localStorage.setItem('isRememberPassword', '1');
                                    } else {
                                        localStorage.removeItem('password');
                                        localStorage.setItem('isRememberPassword', '0');
                                    }
                                    console.log('login success');
                                    if ($scope.target) {
                                        location.href = $scope.target;
                                        return;
                                    }
                                    if (fromPage.indexOf('list-detail.html') != -1 || fromPage.indexOf('reptail-detail.html') != -1 || fromPage.indexOf('product-detail.html') != -1) {
                                        location.href = fromPage;
                                        return;
                                    }
                                    location.href = 'home.html';
                                    layer.close(ca);
                                }, function(index){
                                    location.href = 'forgotPassword.html';
                                });
                        }else{
                            $scope.loginError = false;
                            dsp.saveDataAfterLogin(result);
                            if ($scope.remberPass) {
                                localStorage.setItem('password', b.encode($scope.passWord));
                                localStorage.setItem('isRememberPassword', '1');
                            } else {
                                localStorage.removeItem('password');
                                localStorage.setItem('isRememberPassword', '0');
                            }
                            console.log('login success');
                            if ($scope.target) {
                                location.href = $scope.target;
                                return;
                            }
                            if (fromPage.indexOf('list-detail.html') != -1 || fromPage.indexOf('reptail-detail.html') != -1 || fromPage.indexOf('product-detail.html') != -1) {
                                location.href = fromPage;
                                return;
                            }
                            location.href = 'home.html';
                        }
                    }
                    
                })
            }

        }
        $rootScope.$on('account-blocked',function(d,data) {
            console.log('account-blocked====='+data)
            if(data) {$scope.showBlackTip=true};
        })
        $scope.inputfocus = function (val, flag) {
            console.log(val)
            console.log(flag)
            if (!val) {
                $scope[flag] = true;
            }
        }
        $scope.inputblur = function (type) {
            if (type == 'name') {
                console.log(1)
                if ($scope.userName) {
                    $scope.isfocus1 = true;
                } else {
                    $scope.isfocus1 = false;
                }
            } else if (type == 'pass') {
                console.log(2)
                if ($scope.passWord) {
                    $scope.isfocus2 = true;
                } else {
                    $scope.isfocus2 = false;
                }
            }
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
