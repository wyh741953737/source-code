(function (angular) {
    var app = angular.module('app', ['service', 'commonHeaderLoginModl', 'commonFooterLoginModl', 'loginLanguageSelect']);
    app.controller('forgotCtrl', ['$scope', '$http', 'dsp','$sce', function ($scope, $http, dsp,$sce) {
        dsp.domainData().then((res) => {
            // 请求成功的结果
            $scope.iscj = res.iscj;
            if ($scope.iscj == '1') {
                //cj
                $scope.icon = '/favicon.ico';
            } else {
                //客户
                $scope.icon = res.logo1 || '/favicon.ico';
                $('link[rel$=icon]').replaceWith('');
                $('head').append($('<link rel="shortcut icon"/>').attr('href', $scope.icon));
            }
        })
        $scope.isError = false;
        $scope.isSuccess = false;
        $scope.emailAdress = '';
        $scope.error = false;
        $scope.isHideInfo=false;
        $scope.verifyErrMsg = $sce.trustAsHtml("Please enter your email address. We'll send you a link to reset password.")

        const thirdPartyEmail = localStorage.getItem('thirdPartyEmail')
        $scope.emailAdress = thirdPartyEmail || '';
        localStorage.removeItem('thirdPartyEmail')

        $('.email-input').focus(function () {
            $('.email-img').attr('src', './static/image/login/email-check.png');
        })
        $('.email-input').blur(function () {
            $('.email-img').attr('src', './static/image/login/email.png');
        })
        $scope.sendEmail = function () {
            var ismail = dsp.isEmail($scope.emailAdress);
            if (!ismail) {
                $scope.errorMsg = 'Please enter a correct email address';
                return;
            }
            $scope.errorMsg = '';
            var sendData = {};
            sendData.data = JSON.stringify({email: $scope.emailAdress});
            $('.cover').show();
            dsp.postFun('app/account/checkexist', JSON.stringify(sendData), function (data) {
                var data = data.data;
                $('.cover').show();
                var code = data.statusCode;
                if (code == 207) {
                    $('.cover').show();
                    dsp.postFun('app/account/makepwdlink', JSON.stringify(sendData), function (data) {
                        console.log(data);
                        var data = data.data;
                        $('.cover').hide();
                        $scope.isError = false;
                        if (data.statusCode === '200'){
                          $scope.isSuccess = true;
                          $scope.showConfirm=true;
                          $scope.confirmMsg='A verification email has been sent to your inbox.';
                        }else if (data.statusCode === '812'){
                          $scope.verifyErrMsg = $sce.trustAsHtml(`We have sent five emails to you. If you don’t receive them, please check your spam or <a target="_blank" href="https://chat.cjdropshipping.com">contact human agent</a>. `)
                        }else {
                          $scope.isError = false;
                          $scope.isSuccess = false;
                          $scope.verifyErrMsg = $sce.trustAsHtml("Please enter your email address. We'll send you a link to reset password.")
                          layer.msg('Failed to send mail.');
                        }
                    }, function (data) {
                        $('.cover').hide();
                        dsp.cjMesFun(1);
                    });

                } else if (code == 204) { //如果没有找到邮件地址
                    $('.cover').hide();
                    $scope.isSuccess = false;
                    $scope.isError = true;
                    $scope.showConfirm=true;
                    $scope.confirmMsg='Not found account registered with this email address.';
                }
            }, function (data) {
                $('.cover').hide();
                    dsp.cjMesFun(1);
            });

        }
        $scope.confirmFun = ()=>{
            if($scope.isError){
                $scope.showConfirm=false;
            }else{
                window.location.href = 'login.html';
            }
        }
    }])
})(angular)
