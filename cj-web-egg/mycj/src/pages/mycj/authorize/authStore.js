/**
 * 授权店铺集合
 * @param {dsp} dsp dsp 服务
 * @param {string} storeName 店铺名
 * @param {object}} params 参数
 */
export const goAuthStore = (dsp, storeName, params) => {
  const url = 'platform-shop/authorize/getAuthorUrl'
  const storeTypeObj = {
    'ebay': { shopType: 'EBAY', StoreType: '4', url: `${url}?platform=EBAY&fromType=2&shopName=${params && params.shopName ? params.shopName : ''}` },
    'Lazada': { shopType: 'LAZADA', StoreType: '7', url: `${url}?platform=LAZADA&fromType=2` },
    'shopee': { shopType: ' SHOPEE', StoreType: '8', url: `${url}?platform= SHOPEE&fromType=2` },
    'wix': { shopType: 'WIX', StoreType: '6', url: `${url}?platform=WIX&fromType=2` },
    'etsy': { shopType:'ETSY', StoreType: '10', url: `${url}?platform=ETSY&fromType=2` }
  }
  const load = layer.load(2)
  dsp.getFun(storeTypeObj[storeName].url, function (res) {
    layer.close(load)
    if (res.data.code != 200) return layer.msg(res.data.message || "Authorization Failed.")
    location.href = res.data.data
  })
}

/**
 * 授权goAuthShipstation
 * @param {dsp} dsp dsp 服务注入
 * @param {params} params 授权参数
 */
export const goAuthShipstation = (dsp, $scope, newParams = {}) => {

  if (!$scope.APIKey) return layer.msg("Please enter API Key.");
  if (!$scope.APISecret) return layer.msg("Please enter API Secret.");

  const params = {
    userId: $scope.userId,
    consumerKey: $scope.APIKey,
    consumerSecret: $scope.APISecret,
    platform: 'SHIPSTATION',
    fromType: '2',
    ...newParams
  }

  let queryStr = "", fristFlag = true;
  for (const key in params) {
    const value = params[key]
    queryStr += `${fristFlag ? '?' : '&'}${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    fristFlag = false
  }

  const load = layer.load(2)
  dsp.getFun(
    'platform-shop/authorize/saveShop' + queryStr,
    function (res) {
    layer.close(load)
    if (res.data.code != 200) return layer.msg(res.data.message || "Authorization Failed.")
    layer.msg('Authorization Successfully.')
    var isEmpower = localStorage.getItem("isEmpower");
    if (isEmpower == "0") {
      localStorage.setItem("isEmpower", "1");
    } else if (isEmpower == "2") {
      localStorage.setItem("isEmpower", "2");
    }
    window.location.href = 'welcome.html?from=authorize&result=1'
  })
}