(function(angular) {
    angular.module('cjCompnentModule')
        .component('shopifyCollections', {
            templateUrl: './static/components/shopify_collections/shopify_collections.html',
            controller: shopifyCollectionsCtrl,
            bindings: {
                storeinfo: '=',
                // storetype: '=',
                // onLog: '&'
            }
        });

    function shopifyCollectionsCtrl($scope, dsp, $filter) {
        var that = this;

        var storeinfo = that.storeinfo;

        $scope.$on('quick-list', function (ev,data) {
            if (data.flag == 'chan-store') {
                $scope.collectionId='';
                $scope.shopItem = data.store;
                getShopifyCollection();
            }
        });
        
        // 取shopify Collection
        $scope.collectionType = 'select'
        function getShopifyCollection() {
            dsp.postFun('app/shop/getShopifyCategroy', {
                shopName: $scope.shopItem.NAME
            }, function (data) {
                var data = data.data;
                if (data.statusCode != 200) {
                    return false;
                } else {
                    $scope.collectionList = (data.result || []);
                    $scope.collectionList.forEach(function (item) {
                        if (item.rules) {
                            var remarkArr = [];
                            for (var i = 0; i < item.rules.length; i++) {
                                remarkArr.push($filter('fWordUpcase')(item.rules[i].column.split('_').join(' ')) + ' ' + item.rules[i].relation.split('_').join(' ') + ' ' + item.rules[i].condition.split('_').join(' ') + '.')
                            }
                            item.remark = remarkArr.join(' ');
                        }
                        if (item.type == 1) {
                            item.disabled = true
                            item.title = item.remark
                        } else {
                            item.disabled = false
                        }
                    })
                }
            });
        }
        $scope.addNewCollection = function () {
            if (!$scope.newCollection) return;
            layer.load(2);
            dsp.postFun('app/shop/addShopifyCategroy', {
                shopName: $scope.shopItem.NAME,
                categoryName: $scope.newCollection
            }, function (data) {
                var data = data.data;
                layer.closeAll('loading');
                if (data.statusCode != 200) {
                    return false;
                } else {
                    $scope.collectionList.unshift(data.result);
                    $scope.collectionId = data.result.id + '';
                    $scope.$emit('shopify-collections', {
                        flag: 'fresh-collection-id',
                        collectionId: $scope.collectionId
                    })
                    $scope.newCollection = '';
                    $scope.collectionType = 'select';
                }
            });
        }
        $scope.chanCollection = function () {
            $scope.$emit('shopify-collections', {
                flag: 'fresh-collection-id',
                collectionId: $scope.collectionId
            })
        }
    }


})(angular)