import template from "./stockoutNotice.html";
import styles from "./stockoutNotice.less";

export function stockoutNoticeFactory(module) {
	module.component("stockoutNotice", {
		template,
		controller: ["$rootScope", "$scope", "$location", "dsp", "$element", "utils", function ($rootScope, $scope, $location, dsp, $element, utils) {
			$element.addClass([styles.stockoutNotice, "stockout-notice-box"]);
			this.$onInit = function () {
				stockoutNoticeCtrl.call(this, $scope, dsp, utils);
			};
		}],
		bindings: {
			parmas: "="
		}
	});
	function stockoutNoticeCtrl($scope, dsp, utils) {
		console.log('1111111111111111111111111111111')
		$scope.showFlag = false

		$scope.$on('stockout-notice', (_, res) => {
			console.log('2222222222222 =>', res)
			$scope.stockoutInfo = res
			$scope.showFlag = true
			// const { type } = res
		  // if(type === 'refund') {
			// 	$scope.stockoutInfo = `The product has been completed with a refund of $${res.refundAmount} on March 4, 2020, which has been paid into your wallet, please check`
			// }
		})

	}
}