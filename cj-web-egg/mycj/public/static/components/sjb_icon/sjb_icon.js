(function (angular) {
  angular.module('cjCompnentModule')
  .component('sjbIcon', {
    templateUrl: './static/components/sjb_icon/sjb_icon.html',
    controller: sjbIconCtrl,
    bindings: {
      src: '=',
      width: '=',
      height: '=',
      color:'=',
      // onLog: '&'
    }
  })
  function sjbIconCtrl($scope, dsp, cjhome, $interval) {
    let that = this;
    $scope._src = this.src;
    $scope._width = this.width;
    $scope._height = this.height;
    $scope._filter = `drop-shadow(100000px 0 0 ${this.color || '#FF7E3B'})`;
  }
})(angular)