import template from './index.html'
import './index.less'

export function syncProductModal(module) {
  module.component('syncproductmodal', {
    template,
    controller: ['$scope', 'dsp', 'utils', controllerCtrl],
    controllerAs: 'vm',
    bindings: {
      storeinfo: '=',
      visible: '=',
      initCallback: '&', // 组件创建时候的回调
      selectshopinfo: '=',
      searchshopcommodity: '=',
      shopselectlist: '='
    }
  });

  function controllerCtrl($scope, dsp, utils) {
    const vm = this

    $scope.vip = localStorage.getItem('vip') || 0

    // amazon 商品查询
    $scope.resultProducts = []
    $scope.advanceObj = {
      pageNum: 1,
      pageSize: 10,
      data: {
        // shopType: 'AMAZON',
        type: '', // 1 商品发布时间  2 商品更新时间
        productName: ''
      }
    }
    function getAmazonProducts() {
      const params = angular.copy($scope.advanceObj)
      params.data.shopId = vm.storeinfo.ID

      if (!params.data.country) return layer.msg('Please select country.')
      const load = layer.load(0)
      dsp.postFun('platform-product/product/getProductPageList', params, function (res) {
        layer.close(load)
        if (res.data.code != 200) return
        const list = res.data.data.list
        const oldList = $scope.resultProducts
        $scope.resultProducts = [...oldList, ...list]
        $scope.allChecked = false
      })
    }

    $scope.searchAmazonProduct = function () {
      $scope.resultProducts = []
      $scope.advanceObj.pageNum = 1
      if(!$scope.advanceObj.data.productName) return layer.msg('Please entry product name.')
      getAmazonProducts()
    }

    // 精准搜索
    $scope.advancedSearch = () => {
      vm.visible = true
      $scope.amazonCountrys = []
      const shopId = vm.storeinfo.ID
      dsp.getFun('platform-shop/country/queryMarketplaceList?shopId=' + shopId, function (res) {
        if (res.data.code != 200) return;
        const list = res.data.data || [];
        let amazonCountryArray = [];
        for(let i=0;i<list.length;i++){
          amazonCountryArray.push(list[i].countryCode);
        }
        $scope.amazonCountrys = amazonCountryArray;
      })
    }
    // 全选
    $scope.checkAll = function () {
      const checked = !$scope.allChecked, list = $scope.resultProducts;
      $scope.resultProducts = list.map(_ => ({ ..._, checked }))
      $scope.allChecked = checked;
    }
    // 单选
    $scope.checkItem = function (item) {
      const checked = !item.checked
      item.checked = checked
      if (!checked) return $scope.allChecked = false
      const list = $scope.resultProducts
      const count = list.filter(_ => _.checked).length
      if (count >= list.length) $scope.allChecked = true
    }

    // 同步店铺
    $scope.SnycStore = function () {
      const list = $scope.resultProducts;
      const checkedList = list.filter(_ => _.checked) // 选中的records
      if (checkedList.length <= 0) return layer.msg('Choose at least one item')
      const productIds = checkedList.map(item => item.productId)
      const params = {
        productIds,
        country: $scope.advanceObj.data.country,
        shopId: vm.storeinfo.ID,
        // shopType: $scope.advanceObj.data.shopType
      }
      const load = layer.load(2)
      dsp.postFun('platform-product/product/batchSaveProduct', params, function (res) {
        layer.close(load)
        const customCodeMsg = ['30001', '30002']
        const statusCode = res.data.code
        const outMsg = msg => layer.msg(msg)
        if (customCodeMsg.includes(statusCode)) return outMsg(res.data.message || 'Sync Failed')

        const errMsg = {
          20000: 'Please Do not synchronize products repeatedly',
          5000: 'Wrong request parameter',
          5001: "You haven't bound the store yet",
          5002: 'Data update failed'
        }
        if (Object.keys(errMsg).includes(statusCode)) return outMsg(errMsg[statusCode])
        if (statusCode != 200) return outMsg('Sync Failed')
        outMsg('Synced Successfully')
      })
    }

    const pullProductDom = document.querySelector('#pull-products')
    const debounceGetAmazonProducts = utils.debounce(() => {
      $scope.advanceObj.pageNum += 1;
      getAmazonProducts()
    }, 500)

    pullProductDom.addEventListener('scroll', function () {
      const scrollTop = pullProductDom.scrollTop
      const scrollH = pullProductDom.scrollHeight
      const clientH = pullProductDom.clientHeight

      console.log('pull-products', scrollTop, scrollH, scrollH - scrollTop == clientH)

      if ((scrollH - scrollTop) <= clientH + 50) {
        console.log('到底了')
        // debounceGetAmazonProducts()
      }

    })


    this.$onInit = function () {
      const advancedSearch = $scope.advancedSearch
      vm.initCallback && vm.initCallback({ advancedSearch })
    }

  }
}