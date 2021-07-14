export function myInventoryRecordFactory(angular) {
  const app = angular.module('my-inventory-record.module', []);

  app.controller('my-inventory-record.ctrl', ['$scope', '$stateParams', 'dsp', function ($scope, $stateParams, dsp) {

    dsp.setRightMinHeight();

    var vid = $stateParams.vid;
    console.log(vid);
    dsp.getFun('pojo/inventory/getInventoryChange?vid=' + vid, function (data) {
      // console.log(data);
      if (data.data.statusCode != 200) {
        dsp.cjMesFun(1);
        return;
      }
      var result = JSON.parse(data.data.result);
      $scope.inveHistory = result.list;
      console.log($scope.inveHistory);
      if ($scope.inveHistory.length == 0) {
        dsp.addNodataPic($('.cj-load-wrap'), nodataHeight);
      }
    });

  }]);

  return app;
}
