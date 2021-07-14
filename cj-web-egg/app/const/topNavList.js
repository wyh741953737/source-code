const topNavList = (i18next) => ([
  {
    name: i18next.t('top-nav-authorization'),
    href: 'javascript:void(0);',
    id: 1,
    child: [
      { name: i18next.t('top-nav-shopify'), auth: true, href: '/myCJ.html#/authorize/Shopify' },
      { name: i18next.t('top-nav-ebay'), auth: true, href: '/myCJ.html#/authorize/Ebay' },
      { name: i18next.t('top-nav-woocommerce'), auth: true, href: '/myCJ.html#/authorize/Woocommerce' },
      { name: i18next.t('top-nav-shipstation'), auth: true, href: '/myCJ.html#/authorize/Shipstation' },
      { name: i18next.t('top-nav-api'), auth: true, href: '/myCJ.html#/authorize/API' },
      { name: i18next.t('top-nav-lazada'), auth: true, href: '/myCJ.html#/authorize/Lazada' },
      { name: i18next.t('top-nav-shopee'), auth: true, href: '/myCJ.html#/authorize/Shopee' },
      // { name: 'Etsy', auth: true, href: '/myCJ.html#/authorize/Etsy' },
      { name: 'Wix', auth: true, href: '/myCJ.html#/authorize/Wix' },
    ]
  },
  { name: i18next.t('top-nav-wishlist'), auth: true, href: '/myCJ.html#/myCJ-favorites?track=2' },
  {
    name: i18next.t('top-nav-warehouses'),
    href: 'javascript:void(0);',
    id: 2,
    child: [
      { name: i18next.t('top-nav-china-warehouse'), href: '/list-detail.html?from=china&fromType=all&track=3&fromWhere=warehouses' },
      { name: i18next.t('top-nav-us-warehouse'), href: '/list-detail.html?from=us&fromType=all&track=3&fromWhere=warehouses' },
      { name: i18next.t('top-nav-thailand-warehouse'), href: '/list-detail.html?from=th&fromType=all&track=3&fromWhere=warehouses' }
    ]
  },
  { name: i18next.t('top-nav-print-on-demand'), href: '/printonDemand/home', key: 'pod', id: 3 },
  { name: i18next.t('top-nav-sourcing'), auth: true, href: '/myCJ.html#/sourcing?track=5', id: 4 },
  { name: i18next.t('top-nav-my-cj'), auth: true, href: '/myCJ.html#/myCJAssociatedStore?track=6', id: 5 },
]);

module.exports = { topNavList };