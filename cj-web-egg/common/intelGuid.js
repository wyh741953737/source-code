const guidList = (i18next) => {

  return (
    [
      {
        key: 1,
        icon: 'iconapp',
        name: i18next.t('intelGuid-cj-platform'),
        children: [
          {
            name: i18next.t('intelGuid-products-automatic-listing'),
            url: "/myCJ.html#/products-connection/history/0",
            isCJ: true,
            describe: i18next.t('intelGuid-list-products-to-your-store-automatically.'),
            image: "https://cc-west-usa.oss-accelerate.aliyuncs.com/20200814/1057203781124.svg"
          },
          {
            name: i18next.t('intelGuid-product-reviews-importing'),
            url: "/article-details/108",
            describe: i18next.t('intelGuid-import-product-reviews-into-your-store-when-you-list-product.'),
            image: "https://cc-west-usa.oss-accelerate.aliyuncs.com/20200818/6182488303874.svg"
          },
          {
            name: i18next.t('intelGuid-product-connection'),
            url: "/myCJ.html#/products-connection/connected",
            isCJ: true,
            describe: i18next.t('intelGuid-connect-your-store-products-with-cj-products.'),
            image: "https://cc-west-usa.oss-accelerate.aliyuncs.com/20200818/6598880524409.svg"
          },
          {
            name: i18next.t('intelGuid-automatic-order-syncing'),
            url: "/newmycj/dropshipping/untreatedOrder",
            isCJ: true,
            describe: i18next.t('intelGuid-sync-orders-from-your-store-to-cj-automatically.'),
            image: "https://cc-west-usa.oss-accelerate.aliyuncs.com/20200814/236671205595.svg"
          },
          {
            name: i18next.t('intelGuid-csv-orders-uploading'),
            url: "/newmycj/dropshipping/untreatedOrder",
            isCJ: true,
            describe: i18next.t('intelGuid-you-can-upload-orders-by-csv.'),
            image: "https://cc-west-usa.oss-accelerate.aliyuncs.com/20200814/392757853056.svg"
          },
          {
            name: i18next.t('intelGuid-paypal-credit-card-payment'),
            url: "/article-details/112",
            describe: i18next.t('intelGuid-pay-your-orders-by-paypal-and-credit-card.'),
            image: "https://cc-west-usa.oss-accelerate.aliyuncs.com/20200818/1589416313917.svg"
          },
          {
            name: i18next.t('intelGuid-automatic-invoice'),
            url: "/newmycj/dropshipping/orderManage?active=2",
            isCJ: true,
            describe: i18next.t('intelGuid-cj-provides-automatic-invoice-service-for-you.'),
            image: "https://cc-west-usa.oss-accelerate.aliyuncs.com/20200814/4084337319157.svg"
          },
          {
            name: i18next.t('intelGuid-tracking-numbers-inventory-monitoring'),
            url: "/newmycj/dropshipping/orderManage?active=3",
            isCJ: true,
            describe: i18next.t('intelGuid-easy-to-know-products-inventory-and-get-shipping-tracking-numbers.'),
            image: "https://cc-west-usa.oss-accelerate.aliyuncs.com/20200814/844803047640.svg"
          },
          {
            name: i18next.t('intelGuid-fulfillment-shipping-tracking'),
            url: "/newmycj/dropshipping/orderManage?active=3",
            isCJ: true,
            describe: i18next.t('intelGuid-easy-to-monitor-delivery-process.'),
            image: "https://cc-west-usa.oss-accelerate.aliyuncs.com/20200814/369530170543.svg"
          },
          {
            name: i18next.t('intelGuid-multiple-store-management'),
            url: "/myCJ.html#/authorize/Shopify",
            isCJ: true,
            describe: i18next.t('intelGuid-manage-all-your-stores-after-authorization.'),
            image: "https://cc-west-usa.oss-accelerate.aliyuncs.com/20200814/5112529691507.svg"
          },
          {
            name: i18next.t('intelGuid-store-transfer'),
            url: "/article-details/155",
            describe: i18next.t('intelGuid-transfer-store-between-accounts.'),
            image: "https://cc-west-usa.oss-accelerate.aliyuncs.com/20200814/1861770459250.svg"
          },
          {
            name: i18next.t('intelGuid-manual-order-creation'),
            url: "/newmycj/dropshipping/untreatedOrder",
            isCJ: true,
            describe: i18next.t('intelGuid-create-orders-manually.'),
            image: "https://cc-west-usa.oss-accelerate.aliyuncs.com/20200814/1234294993313.svg"
          },
          {
            name: i18next.t('intelGuid-print-on-demand'),
            url: "/myCJ.html#/pod/design-myself",
            isCJ: true,
            describe: i18next.t('intelGuid-extend-your-store-through-personalized-items.'),
            image: "https://cc-west-usa.oss-accelerate.aliyuncs.com/20200818/852899319832.svg"
          },
          {
            name: i18next.t('intelGuid-multiple-staff-accounts'),
            url: "/myCJ.html#/accountManage",
            isCJ: true,
            describe: i18next.t('intelGuid-set-up-staff-accounts.'),
            image: "https://cc-west-usa.oss-accelerate.aliyuncs.com/20200814/11276471915.svg"
          },
          {
            name: i18next.t('intelGuid-chrome-extension'),
            url: "https://chrome.google.com/webstore/detail/cjdropshipping/mbndljkgaoailfnpeodnlejigmkdpokb?hl=en",
            describe: i18next.t('intelGuid-source-products-from-other-platforms-by-chrome-extension.'),
            image: "https://cc-west-usa.oss-accelerate.aliyuncs.com/20200814/1888199607048.svg"
          },
          {
            name: i18next.t('intelGuid-mobile-app-processing'),
            url: "/cjAppDownload.html",
            isCJ: true,
            describe: i18next.t('intelGuid-put-cjdropshipping-into-your-pocket.'),
            image: "https://cc-west-usa.oss-accelerate.aliyuncs.com/20200818/2876123416433.svg"
          },
          {
            name: i18next.t('intelGuid-cj-api-for-developers'),
            url: "https://developers.cjdropshipping.com/",
            describe: i18next.t('intelGuid-start-cooperation-by-api.'),
            image: "https://cc-west-usa.oss-accelerate.aliyuncs.com/20200814/2982690705645.svg"
          },
          {
            name: i18next.t('intelGuid-cj-wallet-with-2%-discount'),
            url: "/myCJ.html#/myCJWallet",
            isCJ: true,
            describe: i18next.t('intelGuid-top-up-has-2%-rebate-at-most.'),
            image: "https://cc-west-usa.oss-accelerate.aliyuncs.com/20200814/793756591901.svg"
          }
        ]
      },
      {
        key: 2,
        icon: 'iconFulfillment',
        name: i18next.t('intelGuid-order-fulfillment'),
        children: [
          {
            name: i18next.t('intelGuid-combine-orders'),
            url: "/newmycj/dropshipping/untreatedOrder",
            isCJ: true,
            describe: i18next.t('intelGuid-combine-orders-to-reduce-delivery-cost.'),
            image: "https://cc-west-usa.oss-accelerate.aliyuncs.com/20200818/5114573899321.svg"
          },
          {
            name: i18next.t('intelGuid-split-orders'),
            url: "/newmycj/dropshipping/untreatedOrder",
            isCJ: true,
            describe: i18next.t('intelGuid-split-your-order-into-several-orders.'),
            image: "https://cc-west-usa.oss-accelerate.aliyuncs.com/20200818/331049597404.svg"
          },
          {
            name: i18next.t('intelGuid-bundle-sku'),
            url: "https://cjdropshipping.com/article-details/1363059865307713536",
            describe: i18next.t('intelGuid-bundle-several-products-skus-into-one-sku.'),
            image: "https://cc-west-usa.oss-accelerate.aliyuncs.com/20200814/1892661817798.svg"
          },
          {
            name: i18next.t('intelGuid-custom-packaging-branding'),
            url: "/myCJ.html#/regular-packaging",
            isCJ: true,
            describe: i18next.t('intelGuid-custom-packaging-for-your-own-brand.'),
            image: "https://cc-west-usa.oss-accelerate.aliyuncs.com/20200819/276205933510.png"
          }
        ]
      },
      {
        key: 3,
        icon: 'iconWarehousing',
        name: i18next.t('intelGuid-warehousing'),
        children: [
          {
            name: i18next.t('intelGuid-worldwide-warehouses'),
            url: "/list-detail.html?from=CN&fromType=all&track=3&fromWhere=warehouses",
            isCJ: true,
            describe: i18next.t('intelGuid-more-global-warehouses-are-coming-soon.'),
            image: "https://cc-west-usa.oss-accelerate.aliyuncs.com/20200814/760676230145.svg"
          },
          {
            name: "China Warehouse",
            url: "/list-detail?from=CN&fromType=all&track=3&fromWhere=warehouse ",
            isCJ: true,
            describe: i18next.t('intelGuid-yiwu-warehouse'),
            describe2: i18next.t('intelGuid-jinhua-warehouse'),
            describe3: i18next.t('intelGuid-shenzhen-warehouse'),
            image: "https://cc-west-usa.oss-accelerate.aliyuncs.com/20200814/71737584743.svg"
          },
          {
            name: i18next.t('intelGuid-us-warehouse'),
            url: "/list-detail?from=US&fromType=all&track=3&fromWhere=warehouses",
            isCJ: true,
            describe: i18next.t('intelGuid-us-warehouse-of-west-chino-ca'),
            describe2: i18next.t('intelGuid-us-warehouse-of-east-cranbury-nj'),
            image: "https://cc-west-usa.oss-accelerate.aliyuncs.com/20200814/3169106268664.svg"
          },
          {
            name: i18next.t('intelGuid-thailand-warehouse'),
            url: "/list-detail?from=TH&fromType=all&track=3&fromWhere=warehouses",
            isCJ: true,
            describe: i18next.t('intelGuid-located-in-samut-prakan.'),
            image: "https://cc-west-usa.oss-accelerate.aliyuncs.com/20200814/1252693761408.svg"
          },
          {
            name: "Indonesia Warehouse",
            url: "/list-detail?from=ID&fromType=all&track=3&fromWhere=warehouses",
            isCJ: true,
            describe: i18next.t('intelGuid-located-in-jakarta.'),
            image: "https://cc-west-usa.oss-accelerate.aliyuncs.com/20200814/6391661937959.svg"
          },
          {
            name: "Germany Warehouse",
            url: "/list-detail?from=DE&fromType=all&track=3&fromWhere=warehouses",
            isCJ: true,
            describe: i18next.t('intelGuid-located-in-frankfurt.'),
            image: "https://cc-west-usa.oss-accelerate.aliyuncs.com/20200814/1238738749561.svg"
          },
          {
            name: i18next.t('intelGuid-private-inventory'),
            url: "/myCJ.html#/my-inventory",
            isCJ: true,
            describe: i18next.t('intelGuid-keep-private-inventory-for-your-customer-to-shorten-processing-time.'),
            image: "https://cc-west-usa.oss-accelerate.aliyuncs.com/20200814/2568511498716.svg"
          },
          {
            name: i18next.t('intelGuid-supplier-inventory'),
            url: "/list-detail?from=&fromType=all&track=3&fromWhere=warehouses&addMarkStatus=1",
            isCJ: true,
            describe: i18next.t('intelGuid-suppliers-provide-products-directly.'),
            image: "https://cc-west-usa.oss-accelerate.aliyuncs.com/20200818/1803339062774.svg"
          }
        ]
      },
      {
        key: 4,
        icon: 'iconShipping',
        name: i18next.t('intelGuid-shipping'),
        children: [
          {
            name: i18next.t('intelGuid-shipping-time-and-price'),
            url: "/calculation.html",
            isCJ: true,
            describe: i18next.t('intelGuid-check-your-shipping-cost.'),
            image: "https://cc-west-usa.oss-accelerate.aliyuncs.com/20200814/1443555450785.svg"
          },
          {
            name: i18next.t('intelGuid-cash-on-delivery'),
            url: "https://cod.cjdropshipping.com/",
            describe: i18next.t('intelGuid-cod-service-is-available.'),
            image: "https://cc-west-usa.oss-accelerate.aliyuncs.com/20200814/1970512207498.svg"
          },
          {
            name: i18next.t('intelGuid-cjpacket'),
            url: "https://cjpacket.com/",
            describe: i18next.t('intelGuid-cjpacket-is-a-special-shipping-line-formed-by-cjdropshipping.'),
            image: "https://cc-west-usa.oss-accelerate.aliyuncs.com/20200814/15164122296700.svg"
          },
          {
            name: i18next.t('intelGuid-usps'),
            url: "/calculation.html",
            isCJ: true,
            describe: i18next.t('intelGuid-the-united-states-postal-service.'),
            image: "https://cc-west-usa.oss-accelerate.aliyuncs.com/20200814/3398810329544.svg"
          },
          {
            name: i18next.t('intelGuid-dhl'),
            url: "/calculation.html",
            isCJ: true,
            describe: i18next.t('intelGuid-over-220-countries-and-territories-served.'),
            image: "https://cc-west-usa.oss-accelerate.aliyuncs.com/20200814/786469581689.svg"
          },
          {
            name: i18next.t('intelGuid-special-line'),
            url: "/calculation.html",
            isCJ: true,
            describe: i18next.t('intelGuid-ship-for-electronic-products.'),
            image: "https://cc-west-usa.oss-accelerate.aliyuncs.com/20200818/1129342886469.svg"
          },
          {
            name: i18next.t('intelGuid-jewel-shipping'),
            url: "/calculation.html",
            isCJ: true,
            describe: i18next.t('intelGuid-ship-for-trinket/accessories.'),
            image: "https://cc-west-usa.oss-accelerate.aliyuncs.com/20200818/710411592377.svg"
          },
          {
            name: i18next.t('intelGuid-epacket'),
            url: "/calculation.html",
            isCJ: true,
            describe: i18next.t('intelGuid-ems-courier-service-in-china.'),
            image: "https://cc-west-usa.oss-accelerate.aliyuncs.com/20200814/14236541748774.svg"
          }
        ]
      },
      {
        key: 5,
        icon: 'iconProService',
        name: i18next.t('intelGuid-pro-service'),
        children: [
          {
            name: i18next.t('intelGuid-sourcing-from-1688-taobao-aliexpress'),
            url: "/myCJ.html#/add-sourcing////",
            isCJ: true,
            describe: i18next.t('intelGuid-source-products-to-cj-from-1688-taobao-aliexpress.'),
            image: "https://cc-west-usa.oss-accelerate.aliyuncs.com/20200818/1243248967651.svg"
          },
          {
            name: i18next.t('intelGuid-winning-product-recommendations'),
            url: "/productReport/list",
            isCJ: true,
            describe: i18next.t('intelGuid-winning-products-recommendation-help-you-succeed.'),
            image: "https://cc-west-usa.oss-accelerate.aliyuncs.com/20200818/1747078223272.svg"
          },
          {
            name: i18next.t('intelGuid-video-photo-shooting'),
            url: "/myCJ.html#/video-demand",
            isCJ: true,
            describe: i18next.t('intelGuid-attractive-video-and-photo-shooting.'),
            image: "https://cc-west-usa.oss-accelerate.aliyuncs.com/20200818/688248635439.svg"
          },
          {
            name: i18next.t('intelGuid-quality-checking'),
            url: "/article-details/118",
            isCJ: true,
            describe: i18next.t('intelGuid-strict-quality-check-process.'),
            image: "https://cc-west-usa.oss-accelerate.aliyuncs.com/20200814/2404385346474.svg"
          },
          {
            name: i18next.t('intelGuid-wholesaling'),
            url: "/myCJ.html#/purchase-history",
            isCJ: true,
            describe: i18next.t('intelGuid-bulk-order-service-for-wholesalers.'),
            image: "https://cc-west-usa.oss-accelerate.aliyuncs.com/20200818/25895001440824.svg"
          },
          {
            name: i18next.t('intelGuid-dropshipping-training'),
            url: "/tutorial.html?track=8",
            isCJ: true,
            describe: i18next.t('intelGuid-professional-dropshipping-training-makes-you-an-expert.'),
            image: "https://cc-west-usa.oss-accelerate.aliyuncs.com/20200818/1272071089940.svg"
          },
          {
            name: i18next.t('intelGuid-ticket-to-management-team'),
            url: "/myCJ.html#/ticketList?track=8",
            isCJ: true,
            describe: i18next.t('intelGuid-submit-tickets-to-management-team.'),
            image: "https://cc-west-usa.oss-accelerate.aliyuncs.com/20200814/7694204656217.svg"
          },
          {
            name: i18next.t('intelGuid-disputing-online'),
            url: "/newmycj/dropshipping/orderManage?active=3",
            isCJ: true,
            describe: i18next.t('intelGuid-in-case-of-any-doubts-about-your-orders-you-can-open-a-dispute.'),
            image: "https://cc-west-usa.oss-accelerate.aliyuncs.com/20200814/3099992660670.svg"
          },
          {
            name: i18next.t('intelGuid-7/24-support'),
            url: "https://chat.cjdropshipping.com ",
            describe: i18next.t('intelGuid-the-personal-agent-will-help-you-out-of-problems.'),
            image: "https://cc-west-usa.oss-accelerate.aliyuncs.com/20200814/801943942542.svg"
          },
          {
            name: i18next.t('intelGuid-affiliate'),
            url: "https://affiliate.cjdropshipping.com/",
            describe: i18next.t('intelGuid-refer-and-earn'),
            image: "https://cc-west-usa.oss-accelerate.aliyuncs.com/1614912385493.png"
          }
        ]
      }
    ]
  )
}

export default guidList