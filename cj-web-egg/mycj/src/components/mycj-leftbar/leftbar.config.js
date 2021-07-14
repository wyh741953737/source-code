export const menus = {
  "mycj": [
    {
      "name": "Dashboard",
      "iconclass": "iconnewspaper",
      "route": "#/myCJAssociatedStore",
      "active": false
    },
    {
      "name": "Sourcing",
      "iconclass": "icondingdangenzong",
      "route": "#/sourcing",
      "active": false
    },
    // {
    //   "name": "Marketplace",
    //   "iconclass": "iconicon-test",
    //   "route": "#/goods",
    //   "active": false,
    //   "id": "goods"
    // },
    {
      "name": "Purchase List",
      "iconclass": "icondingdan",
      "route": "#/purchase-history",
      "active": false
    },
    {
      "name": "My Photography",
      "iconclass": "iconMyPhotography",
      "route": "#/video-history",
      "active": false
    },
    {
      "name": "My Inventory",
      "iconclass": "icon_GJZsiyou",
      "route": "#/my-inventory",
      "active": false
    },
    {
      "name": "Wishlist",
      "iconclass": "iconshiyongaixin",
      "route": "#/myCJ-favorites",
      "active": false,
      "id": "wishlist-box"
    },
    // {
    //   "name": "Amazon FBA",
    //   "iconclass": "iconkuaidi",
    //   "route": "#/myCJ-FBA",
    //   "active": false
    // },
    {
      "name": "Custom Packaging",
      "iconclass": "iconliwuicon_",
      "route": "#/regular-packaging",
      "active": false
    },
    // {
    //   "name": "Point Rewards",
    //   "iconclass": "iconshangcheng",
    //   "route": "#/points-mall",
    //   "active": false
    // }
  ],
  "Dropshipping Center": [
    {
      "name": "Imported Orders",
      "iconclass": "iconjiluziliaoguanli",
      "route": "#/direct-orders",
      "active": false
    },
    {
      "name": "Dropshipping Orders",
      "iconclass": "iconchengyunshangyundanchaxun",
      "route": "#/dropshipping-orders",
      "active": false
    },
    {
      "name": "AS Service Center",
      "iconclass": "icongongyingshang",
      "route": "#/after-sale//",
      "active": false
    },
    {
      "name": "Undelivered Orders",
      "iconclass": "iconweijiaohuodingdan",
      "route": "#/problem-package",
      "active": false
    }
  ],
  "Products": [
    {
      "name": "Connection",
      "iconclass": "iconguanlian",
      "route": "#/products-connection/connected",
      "active": false
    },
    {
      "name": "Listed",
      "iconclass": "iconkandeng",
      "route": "#/products-connection/history",
      "active": false
    },
    {
      "name": "SKU List",
      "iconclass": "iconsku",
      "route": "#/products-connection/SKUlist",
      "active": false
    },
    {
      "name": "Service Products",
      "iconclass": "iconfuwushangpin",
      "route": "#/products-connection/service",
      "active": false,
      "isShowChild": true,
      "childRouter": [
        {
          "name": "Products",
          "route": "#/products-connection/goods",
          "active": false
        },
        {
          "name": "Shipment",
          "route": "#/products-connection/waybill",
          "active": false
        }
      ]
    }
  ],
  "Print on Demand": [
    {
      "name": "Buyer's Design",
      "iconclass": "iconmaijiaxinxi",
      "route": "#/pod/buyer-design",
      "active": false
    },
    {
      "name": "Designed by Myself",
      "iconclass": "iconmaijiazhongxin_chanpinkumingjiangku",
      "route": "#/pod/design-myself",
      "active": false
    }
  ],
  "Authorization": [
    {
      "name": "Shopify",
      "iconclass": "iconshopify",
      "route": "#/authorize/Shopify",
      "active": false
    },
    {
      "name": "eBay",
      "iconclass": "iconeBay",
      "route": "#/authorize/Ebay",
      "type": "authorize",
      "active": false
    },
    {
      "name": "Woocommerce",
      "iconclass": "iconwix1",
      "route": "#/authorize/Woocommerce",
      "type": "authorize",
      "active": false
    },
    {
      "name": "ShipStation",
      "iconclass": "iconshipstation",
      "route": "#/authorize/Shipstation",
      "type": "authorize",
      "active": false
    },
    {
      "name": "API",
      "iconclass": "iconAPI",
      "route": "#/authorize/API",
      "type": "authorize",
      "active": false
    },
    {
      "name": "Lazada",
      "iconclass": "iconlazada",
      "route": "#/authorize/Lazada",
      "type": "authorize",
      "active": false
    },
    {
      "name": "Shopee",
      "iconclass": "iconshopee",
      "route": "#/authorize/Shopee",
      "type": "authorize",
      "active": false
    }
  ]
}
