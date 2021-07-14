;
(function(angular){
    angular.module('mfaverifyModule',['service'])
        .component('mfaVerify', {
        templateUrl: './static/components/mfaVerify/mfaVerify.html',
        controller: myController,
        controllerAs: 'vm',
        bindings: {
            shortTitle: "<",
            shortDescPrefix: "<",
            shortDescSuffix: "<",
            showQrFlag:"<",
            buttonName:'<',
            thirdLoginParams: '<'
        },
        styleUrl: '/static/components/mfaVerify/mfaVerify.css'
    });

    function myController($rootScope, $scope, $filter, $timeout, dsp) {

        $scope.qrClass = $scope.vm.showQrFlag ? 'qr-code2':'qr-codeAuthorize';
        $scope.qrBlockClass = $scope.vm.showQrFlag ?  'qr-code-block':'qr-code-block-authorize'
        $scope.mainStyle = $scope.vm.showQrFlag ?  '-13px':'auto'
        $scope.nextButtonStyle = $scope.vm.showQrFlag ?  '10px':'40px'
        
        $scope.goToContact = () => {
            window.postMessage({ flag: "profile-concat" }, "*")
        }
        /**
         * copy value to the clipboard
         */
        var clipboard = new ClipboardJS('.copyButton');
        clipboard.on('success',function(e){
            layer.msg('Copied')
        })
        $scope.backFronter = function(){
            history.back();
        }
    
        let base64 = new Base64();
        var username = dsp.getCookie('auth-userName')
        if(username){
            username = base64.decode(username)

        }else{
            // alert('not login')
        }
        $scope.user = username;
        $scope.qrCode = '../static/image/authorize/people1.svg';
        $scope.secretKey = '********';
        $scope.matchError = false;
        $scope.auth_code = "";
        $scope.downloadQrCodeFlag = false
        if($scope.vm.showQrFlag){
            $scope.qrCode='../static/image/authorize/people3.gif';
            $scope.qrClass ='qr-code3';
        }
        let bs = new Base64();
        $scope.linkNow = function () {
            if( $scope.auth_code == ''){
                layer.msg('Please enter the code.')
                return
            }
            var params = {}
            params.code = $scope.auth_code
            if($scope.vm.showQrFlag){
                dsp.postFun('app/accountVerification/bindVerify',params,(res)=>{
                    if(res.data.statusCode === '209'){
                        $scope.matchError = true
                    }else if(res.data.statusCode === '200'){
                        layer.msg('Link Success',{time:1000},function () {
                            location.href = "bindSuccess.html?target=".concat(bs.encode(location.href));
                        })
                    }
                })
            }else {
                params.userId = base64.decode(dsp.getCookie('userId'))
                if($scope.vm.thirdLoginParams) { // 如果是第三方登录，传第三方id
                    params.facebookId = $scope.vm.thirdLoginParams.facebookId
                    params.googleId = $scope.vm.thirdLoginParams.googleId
                }
                let from = dsp.getCookie('from')
                let tempShopId = dsp.getCookie('tempShopId')
                let shopId = dsp.getCookie('shopId')
                let remberPass = dsp.getCookie('remberPass')
                let target = dsp.getCookie('target')
                let fromPage = dsp.getCookie('fromPage')
                let odate = dsp.getCookie('odate')
                let userName = dsp.getCookie('auth-userName')
                let passWord = dsp.getCookie('auth-passWord')
                dsp.postFun('app/accountVerification/loginVerify',params,(res)=>{
                    if(res.data.statusCode === '201' ||  res.data.statusCode === '401'){
                        $scope.matchError = true
                    }else if(res.data.statusCode === '200'){
                        var result = res.data.result
                        result.userName = userName
                        result.passWord = passWord
                        dsp.loginProcess(result,from,tempShopId,shopId,remberPass,target,fromPage,odate,null);
                    }
                })
            }

        }
        $scope.keyDown = function (Event) {
            if (Event.keyCode == 13) {
                $scope.linkNow();
            }
        }
        //get qr code from api
        if($scope.vm.showQrFlag){
            // const load = layer.load(2 ,{
            //     offset: ['45%','49.5%']
            // })
            dsp.postFun('app/accountVerification/getSecretKey',{},(res)=>{
                $scope.secretKey = res.data.result.secretKey
                dsp.postFun('app/accountVerification/qrCodeMFA',{},(res)=>{
                    $scope.qrClass ='qr-code2';
                    let blob = new Blob([res.data]);
                    let href = window.URL.createObjectURL(blob);
                    $scope.qrCode =  href
                }, err => {
                    console.log(err)
                },{
                    responseType: 'arraybuffer' //arraybuffer
                })
            })
        }


        $scope.isNumber = function () {

            $scope.matchError = false
            // let value = $scope.auth_code
            $scope.auth_code = $scope.auth_code.replace(/[^\d]/g,'');
            // if (isNaN(+value)) {
            //     $scope.auth_code = value.substring(0, value.length - 1)
            // }
        }
        $scope.isEntered =  function () {
            $scope.downloadQrCodeFlag = true
        }
        $scope.isLeaved = function () {
            $scope.downloadQrCodeFlag = false
        }
        $scope.copySecret = function () {

        }
    }
})(angular)
