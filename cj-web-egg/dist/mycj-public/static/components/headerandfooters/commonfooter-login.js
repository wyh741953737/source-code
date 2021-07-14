(function (angular) {

    angular.module('commonFooterLoginModl', [])
            .component('commonfooterLogin', {
                templateUrl: 'static/components/headerandfooters/commonfooter-login.html',
                controller: commonFooterLoginCtrl,
                bindings: {
                    vinfo: '=',
                    onLog: '&',
                    showWorkOrder: '&'
                }
            });

    function commonFooterLoginCtrl($scope,dsp) {
        console.log('commonFooterLoginCtrl')
        $scope.year = new Date().getFullYear();
        dsp.domainData().then((res) => {
            // 请求成功的结果
            $scope.iscj = res.iscj;
            if($scope.iscj == '1'){
                //cj
                $scope.useLink = 'https://cjdropshipping.com/term-of-use/';
                $scope.policyLink = 'https://cjdropshipping.com/privacy-policy/';
                $scope.isuseLink = true;
                $scope.ispolicyLink = true;
            }else {
                //客户
                $scope.useLink = 'termsOfuse.html';
                $scope.policyLink = 'privacyPolicy.html';
                $scope.isuseLink = res.termUse ;
                $scope.ispolicyLink = res.privacyPolicy;
            }
        })
     /*   if (localStorage.getItem('domainNameData')) {
            $scope.domainNameData = JSON.parse(localStorage.getItem('domainNameData'));
            $scope.iscj = $scope.domainNameData.iscj;
            if($scope.iscj == '1'){
                //cj
                $scope.useLink = 'https://cjdropshipping.com/term-of-use/';
                $scope.policyLink = 'https://cjdropshipping.com/privacy-policy/';
                $scope.domainName = 'CJDropshipping.com';
            }else {
                //客户
                $scope.useLink = 'termsOfuse.html';
                $scope.policyLink = 'privacyPolicy.html';
                $scope.domainName = $scope.domainNameData.domainName;
            }
        } else {
           dsp.domainData().then((res) => {
               // 请求成功的结果
               $scope.iscj = res.iscj;
               if($scope.iscj == '1'){
                   //cj
                   $scope.useLink = 'https://cjdropshipping.com/term-of-use/';
                   $scope.policyLink = 'https://cjdropshipping.com/privacy-policy/';
                   $scope.domainName = 'CJDropshipping.com';
               }else {
                   //客户
                   $scope.useLink = 'termsOfuse.html';
                   $scope.policyLink = 'privacyPolicy.html';
                   $scope.domainName = res.domainName;
               }
           })
         /!*   window['common-header-login'] = function (data) {
                $scope.domainNameData = JSON.parse(data);
                console.log($scope.domainNameData);
                $scope.iscj = $scope.domainNameData.iscj;
            }*!/
        }*/
    }
})(angular);