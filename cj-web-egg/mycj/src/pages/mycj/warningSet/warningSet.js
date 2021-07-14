export function warningSetFactory(angular) {
	
	const app = angular.module('mycj-warningSet.module', ['service']);
	app.controller('mycj-warningSet.ctrl', ['$rootScope', '$scope', 'dsp', '$stateParams', 'utils','$location',
		function ($rootScope, $scope, dsp, $stateParams, utils, $location) {
			$scope.inventoryOptions = [
				{value: 0, label: 'By Current Inventory'},
				{value: 1, label: 'By Estimated Remaining Days'},
			]
			$scope.promptOptions = [
				{value: 0, label: 'Once Only'},
				{value: 1, label: 'Every Time'},
				{value: 2, label: 'One Week'},
				{value: 3, label: 'Never'},
			]
			$scope.selectedInventory = '0';
			$scope.selectedPrompt = '0';
			$scope.inputValue = '';
			$scope.text = 'Available private inventory';
			$scope.edit = false;
			$scope.showOutConfirmModel = false;

			$scope.chaneInventory = function(value) {
			   $scope.edit = true;
			   $scope.selectedInventory = String(value);
			   if(value == 0){
					$scope.text = 'Available private inventory';
			   } else {
					$scope.text = 'Private Inventory (SKU 1)/Average Daily Sales Volume of the Past Week=Estimated Remaining Days (SKU 1)';
			   }
			}
			function setDefaultValue(valueObj) {
				$scope.selectedInventory = String(valueObj.warningType);
				$scope.selectedPrompt = String(valueObj.tipsType);
				if(valueObj.warningNumber) {
					$scope.inputValue = valueObj.warningNumber;
					$scope.text = 'Available private inventory';
				} else {
					$scope.text = 'Private Inventory (SKU 1)/Average Daily Sales Volume of the Past Week=Estimated Remaining Days (SKU 1)';
				}
			}

			function getDefaultValue() {
				dsp.getFun('early-warning-web/warningSetting/getWarningSetting', ({data}) => {
					layer.closeAll();
					if(data.code == 200) {
						if(data.data) {
							setDefaultValue(data.data)
						}
					}
				  }, (err) => {
					layer.closeAll();
				  });
			}

			getDefaultValue();


			$scope.inputChange = function(value) {
				$scope.inputValue = value.replace(/[^\d]/g,'').replace(/^0/,'');
				$scope.edit = true;
			}
			
			$scope.chanePrompt = function(value) {
				$scope.edit = true;
				$scope.selectedPrompt = String(value);
			}

			$scope.submitSet = function() {
				if(Number($scope.selectedInventory) == 0 && !$scope.inputValue) {
					layer.msg('Please input inventory quantity!');
					return;
				} 
				let params;
				if(Number($scope.selectedInventory) === 0) {
					params = {
						warningType: Number($scope.selectedInventory),
						warningNumber: Number($scope.inputValue),
						tipsType: Number($scope.selectedPrompt)
					}
				} else {
					params = {
						warningType: Number($scope.selectedInventory),
						tipsType: Number($scope.selectedPrompt)
					}
				}
				layer.load(2)
				dsp.postFun('early-warning-web/warningSetting/saveWarningSetting', {...params}, ({data}) => {
				  layer.closeAll();
				  if(data.code === 200){
					  layer.msg('Save success');
					  history.go(-1);
				  } else {
					layer.msg('Failed to save. Please try again!');
				  }
				}, (err) => {
				  layer.closeAll();
				});
			}

			$scope.cancelSet = function() {
				if($scope.edit) {
					$scope.showOutConfirmModel = true;
				} else {
					history.go(-1);
				}
			}

			$scope.cancelOut = function() {
				$scope.showOutConfirmModel = false;
			}

			$scope.confirmOut = function() {
				$scope.showOutConfirmModel = false;
				history.go(-1);
			}
		}])
	return app;
}