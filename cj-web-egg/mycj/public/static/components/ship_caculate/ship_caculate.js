(function (angular) {
    angular.module('cjCompnentModule')
    .component('shipCaculate', {
        templateUrl: './static/components/ship_caculate/ship_caculate.html',
        controller: ['$scope', 'dsp', function ($scope, dsp) {
            this.$onInit = function () {
                shipCaculateCtrl.call(this, $scope, dsp);
            };
        }],
        bindings: {
            shipinfo: '=',
            proinfo: '=', //product信息
            // navparamy: '=',
            // onLog: '&'
        }
    });

    // 使用方法
    // 传入：shipinfo
    // shipinfo = {
    //         weight: 邮寄重量,
    //         enName: 物流方式英文名称,
    //         pid: 商品id,
    //         shipDiscount: 运费折扣,
    //         index1: index, // 标记（会返回给父组件）
    //         index2:i  // 标记（会返回给父组件）
    // }
    // 点击save通知父组件
    // $scope.$emit('saveShipPrice', {
    //     index1: 传入的标记,
    //     index2: 传入的标记,
    //     shipDiscountPrice: 算好的折扣运费
    // });

    function shipCaculateCtrl($scope, dsp) {
        // console.log('kkkk',this.shipinfo);
        $scope.shipinfo = this.shipinfo;
        $scope.proinfo = this.proinfo;
        $scope.showCost = false;
        $scope.cacuShip = function () {
            $scope.showCost = true;
        }
        
        $scope.$on('closeShipCost', () => {
            $scope.showCost = false;
        })

        $scope.$on('confirmShipCost', (data) => {
            const { shipinfo } = data.targetScope;
            if(shipinfo) {
                shipinfo.AMOUNTPRICE = dsp.cacuAmount(shipinfo.priceDis, shipinfo.discountPrice || 0);
                setTimeout(function () {
                    $scope.$apply()
                })
                $scope.$emit('saveShipPrice', {
                    index1: shipinfo.index1,
                    index2: shipinfo.index2,
                    shipDiscountPrice: shipinfo.discountPrice
                });
            }
        })
    }


})(angular)