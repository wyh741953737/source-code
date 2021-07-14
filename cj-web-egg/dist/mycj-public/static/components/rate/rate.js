(function (angular) {
  angular.module('cjCompnentModule')
      .component('rate', {
          templateUrl: 'static/components/rate/rate.html',
          // controller: rateCtrl,
          controller: ['$scope', 'dsp', function ($scope, dsp) {
            this.$onInit = function () {
              rateCtrl.call(this, $scope, dsp);
            };
        }],
          bindings: {
            rateNumber: '=',
            readOnly: '=',
            from: '=',
            fR: '='
          }
      })

  function rateCtrl($scope) {
    // 评分的分数
    $scope.rateStar = this.rateNumber ? this.rateNumber : null;
    $scope.readOnly = this.readOnly ? this.readOnly : false;
    $scope.hoverStar = null;
    
    $scope.handleRate = (val) => {
      if($scope.readOnly) return false;
      $scope.rateStar = val;
      $scope.$emit('detailRateCtrl', $scope.rateStar)
    }
    $scope.handleRateHover = (val) => {
      if($scope.readOnly) return false;
        $scope.hoverStar = val;
    }
    $scope.handleRateLeave = () => {
      $scope.hoverStar = null;
    }
  }
})(angular);