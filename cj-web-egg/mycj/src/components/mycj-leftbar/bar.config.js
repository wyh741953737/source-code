export const menus = [
  {
    "name":"My CJ",
    "iconclass":"iconmycj",
    "active": false,
    childs:[
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
    ]
  },
  {
    "name":"Dropshipping Center",
    "iconclass":"icondropshipping",
    "active": false,
    childs:[
      {
        "name": "Imported Orders",
        "iconclass": "iconjiluziliaoguanli",
        "route": "newmycj/dropshipping/untreatedOrder",
        "oldroute": "#/direct-orders",
        "active": false
      },
      {
        "name": "Dropshipping Orders",
        "iconclass": "iconchengyunshangyundanchaxun",
        "route": "newmycj/dropshipping/orderManage",
        "oldroute": "#/dropshipping-orders",
        "active": false
      },
      {
        "name": "Disputes",
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
    ]
  },{
    "name":"Cart",
    "iconclass":"iconcar",
    "active": false,
    "showicon":false,
    "route":"newmycj/dropshipping/shoppingCart",
    "oldroute": "myCJ.html#/imp-cart",
    childs:[]
  },{
    "name":"Products",
    "iconclass":"iconproducts",
    "active": false,
    childs:[
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
            "name": "Service Product List",
            "route": "#/products-connection/service",
            "active": false
          },
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
    ]
  },{
    "name":"Print on Demand",
    "iconclass":"iconprint",
    "active": false,
    childs:[
      {
        "name": "Buyer's Design",
        "iconclass": "iconmaijiaxinxi",
        "route": "#/pod/buyer-design",
        "active": false,
        "tipName": "Connected POD products in your store."
      },
      {
        "name": "Design Myself",
        "iconclass": "iconmaijiazhongxin_chanpinkumingjiangku",
        "route": "#/pod/design-myself",
        "active": false,
        "tipName": "Your designed products on CJ."
      }
    ]
  },{
    "name":"Authorization",
    "iconclass":"iconauthorization",
    "active": false,
    childs:[
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
      // {
      //   "name": "Amazon",
      //   "iconclass": "iconyamaxun",
      //   "route": "#/authorize/Amazon",
      //   "type": "authorize",
      //   "active": false
      // },
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
      },
      // {
      //   "name": "Etsy",
      //   "iconclass": "iconetsy",
      //   "route": "#/authorize/Etsy",
      //   "type": "authorize",
      //   "active": false
      // },
      {
        "name": "Wix",
        "iconclass": "iconwix",
        "route": "#/authorize/Wix",
        "type": "authorize",
        "active": false
      }
    ]
  }
]
