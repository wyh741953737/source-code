import template from './re-authorize.html';
import styles from './re-authorize.less';


export function reAuthorizeFactory(module) {
    module.component('reAuthorize', {
        template,
        controller: ['$rootScope', '$scope', 'dsp', '$element', 'utils', function($rootScope, $scope, dsp, $element, utils) {
            $element.addClass([styles.reAuthorizeComponent, 're_authorize'])
            this.$onChanges = function() {
                reAuthorizeCtrl.call(this, $rootScope, $scope, dsp, utils)
            }
        }],
        transclude: true,
        bindings: {
            content: '<'
        }
    })
}

function reAuthorizeCtrl($rootScope, $scope, dsp) {
    const userInfo = $rootScope.userInfo;
    $scope.vip = userInfo.vip
    $scope.expireList = this.content

    $scope.handleClose = () => {
        $scope.$emit('closeReAuthorize', {showReAuthorize: false})
    }

    $scope.authorizeNow = (shopName) => {
        $scope.$emit('closeReAuthorize', {showReAuthorize: false})
        const url = `platform-shop/authorize/getAuthorUrl?platform=LAZADA&fromType=2&shopName=${shopName}`
        dsp.getFun(url, function(res) {
            const {data} = res
            if (data.code == 200) {
                window.location.href = data.data
            }
        })
    }
}