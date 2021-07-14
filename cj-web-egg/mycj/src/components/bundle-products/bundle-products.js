import template from './bundle-products.html';
import styles from  './bundle-products.less';

export function bundleProducts(module) {
  module.component('bundleProducts', {
    template,
    controller: ['$scope','$element','dsp', function ($scope, $element, dsp) {
      $element.addClass([styles.bundleProducts, 'bundle-products'])
      $scope.total = {
        variant: 0, // 种类
        piece: 0 // 数量
      };
      $scope.productLst = []
      this.$onInit = () => pageCtrl.call(this,$scope);
      $scope.closeModal = () => {
        this.close()
      }
    }],
    bindings: {
      products: '=',
      close: '='
    }
  });

  function pageCtrl($scope) {
    let num = 0 
    this.products.forEach(val => {
      num = num + val.itemCount
    });
    $scope.productLst = angular.copy(this.products)
    $scope.total = {
      variant: this.products.length,
      piece:num
    }
  }

}