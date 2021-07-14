/**
 * cj-web 服务端、客户端通用配置
 */
const { NODE_ENV } = require('../env');

let environment = NODE_ENV;
if (NODE_ENV === 'development') {
  // 开发环境，可以随便折腾 ^_^
  environment = 'test';
}

const apiConfig = {
  // 开发
  development: {
    "app": "https://app.cjdropshipping.cn/"
    , "erp": "https://app.cjdropshipping.cn/"
    , "cj": "https://newapp.cjdropshipping.cn/"
    , "storage": "https://app.cjdropshipping.cn/"
    , "tool": "https://app.cjdropshipping.cn/"
    , "order": "https://app.cjdropshipping.cn/"
    , "caigou": "https://app.cjdropshipping.cn/"
    , "source": "https://app.cjdropshipping.cn/"
    , "freight": "https://app.cjdropshipping.cn/"
    , "cujiaLogisticsFreight": "https://app.cjdropshipping.cn/"
    , "lazada": "https://app.cjdropshipping.cn/"
    , "shopee": "https://app.cjdropshipping.cn/"
    , "woo": "https://app.cjdropshipping.cn/"
    , "ebay": "https://app.cjdropshipping.cn/"
    , "authorize": "https://app.cjdropshipping.cn/"
    , "newlogistics": "https://app.cjdropshipping.cn/"
    , "_logistics_190606": "https://app.cjdropshipping.cn/"
    , "_affiliate3_190606": "https://app.cjdropshipping.cn/"
    , "listed_products": "https://app.cjdropshipping.cn/"
    , "orderUsa": "https://app.cjdropshipping.cn/"
    , "_chat_190606": "https://chat.cjdropshipping.cn/"
    , "_phone_190606": "http://m.cjdropshipping.com/"
    , "log_recod": "http://jhmjjx.cn:4000/"
    , "storehouse": "https://app.cjdropshipping.cn/"
    , "warehouseBuildWeb": "https://app.cjdropshipping.cn/"
    , "storehousecj": "https://app.cjdropshipping.cn/"
    , "media": "https://app.cjdropshipping.cn/"
    , "erpSupplierSourceProduct": "https://app.cjdropshipping.cn/"
    , "supplierPlanInfo": "https://app.cjdropshipping.cn/"
    , "cjSupplier": "https://app.cjdropshipping.cn/"
    , "message": "https://chat.cjdropshipping.cn/"
    , "cjEvaluation": "https://app.cjdropshipping.cn/"
    , "product": "https://app.cjdropshipping.cn/"
    , "cujialog": "https://app.cjdropshipping.cn/"
    , "supplier":"https://app.cjdropshipping.cn/"
    , "comment":"https://app.cjdropshipping.cn/"
    , "platform-shop": "https://app.cjdropshipping.cn/"
    , "_elites_200812": "https://app.cjdropshipping.cn/"
    , "collection": "https://app.cjdropshipping.cn/"
    ,"platform-product":"https://app.cjdropshipping.cn/"
    , "messageCenterCj": "https://app.cjdropshipping.cn/"
    , "product-api": "https://app.cjdropshipping.cn/"
    , "elastic-api": "https://app.cjdropshipping.cn/"
    , "freightService": "https://app.cjdropshipping.cn/"
    , "push": "https://app.cjdropshipping.cn/"
    , "operation":"https://app.cjdropshipping.cn/"
    , "operationCenterApi": "https://app.cjdropshipping.cn/"
    , "statistics": "https://app.cjdropshipping.cn/"
    , "order-center": "https://app.cjdropshipping.cn/"
    , "_cjpacket_210408": "https://logistics.cjdropshipping.com/"
    , "early-warning-web":  "http://master.backend-home-center.cj.com/"
    , "product-integration-api": "https://app.cjdropshipping.cn/"
    , "cj-logistics-rule": "https://app.cjdropshipping.cn/"
    , "payment": "https://pay.cjdropshipping.com/" // 支付判断欧洲服务
    , "wallet": "https://pay.cjdropshipping.com/" // 钱包
    // , "cujia-message": "https://message-center-api.cjdropshipping.com/" // 线上
    , "cujia-message": "https://app.cjdropshipping.cn/" // 线上
    , "messageCenterWeb": "https://app.cjdropshipping.cn/",
  },
  //测试
  test: {
    "app": "http://app.test.com/" //http://app.test.com
    , "erp": "http://erp1.test.com/"
    , "freightService": "http://192.168.5.149:8000/"
    , "cujiaLogisticsFreight": "http://192.168.5.197:8058/"
    , "storage": "http://app.test.com/"
    , "tool": "http://tools.test.com/"
    , "caigou": "http://caigou.test.com/"
    , "order": "http://order.test.com/"
    , "cj": "http://app1.test.com/"//app1.test.com
    , "source": "http://sourcing.test.com/"
    , "freight": "http://192.168.5.37:8001/"
    , "authorize":"http://192.168.5.197:7610/"
    , "ebay": "http://192.168.5.239:5901/"  // 原
    , "lazada": "http://192.168.5.239:8026/"
    , "shopee": "http://192.168.5.212:8025/"
    , "woo": "http://192.168.5.239:9903/" // 原
    , "newlogistics": "http://logistics2.test.com/"
    , "_logistics_190606": "http://dsp-logist.test.com/" //http://logistics.test.com/
    , "_chat_190606": "http://chat.test.com/"
    , "listed_products": "http://publish.test.com/"
    , "_affiliate3_190606": "https://affiliate3.cjdropshipping.com/" //http://affiliate3.test.com/
    , "_phone_190606": "http://m.test.com/"
    , "storehousecj": "http://192.168.5.197:8002/"
    , "warehouseBuildWeb": "http://192.168.5.197:8001/"
    , "storehouse": "http://192.168.5.197:8009/"
    , "warehouse": "http://192.168.5.197:8001/"
    , "media": "http://192.168.5.197:8045/"
    , "erpSupplierSourceProduct": "http://192.168.5.239:8077/"
    , "supplierPlanInfo": "http://192.168.5.239:8092/"
    , "cjSupplier": "http://192.168.5.239:8077/"
    , "message": "http://chat.test.com/"
    , "cjEvaluation": "http://cj-supplier-erp.cj-1.com/"
    , "product": "http://192.168.5.197:7612/"
    , "cujialog": "http://192.168.5.197:8831/"
    , "supplier":"http://192.168.5.239:8092/"
    , "comment":"http://192.168.5.197:7612/"
    , "platform-shop": "http://192.168.5.197:7610/"
    // , "platform-shop": "http://192.168.5.103:3000/"
    , "platform-product": "http://192.168.5.197:7612/"
    , "_elites_200812": "http://192.168.5.37:8081/"
    , "collection": "http://collection.test.com/"
    , "messageCenterCj": "http://master.backend-cujia-message-center.cj.com/"
    , "cujia-message": "http://master.backendcujiamessagecenter.cj.com/" // 测试服
    , "product-api": "http://release.cjproductcenter.cj.com/"
    , "elastic-api": "http://product-center.cj.com/"
    , "push": "http://app.test.com/"
    , "operation":"http://192.168.5.197:8058/cujiaLogisticsFreight/"
    , "operationCenterApi": 'http://master.backend-cj-operation-center.cj.com/'
    , "statistics": "http://192.168.5.197:8025/"
    , "product-integration-api": "http://product-center.cj.com/"
    , "order-center": 'http://master.backend-cj-order.cj.com/'
    , "_cjpacket_210408": "https://logistics.cjdropshipping.com/"
    , "early-warning-web":  "http://master.backend-home-center.cj.com/"
    , "cj-logistics-rule": "http://master.logistic.cj.com/"
    , "payment": "https://payment.cjdropshipping.cn/" // 支付
    , "wallet": "https://payment.cjdropshipping.cn/" // 钱包
    , 'messageCenterWeb': "http://master.backend-cujia-message-center.cj.com/",
  },
  testnew:{
      "app": "http://dsp-server.cj-1.com/"
    , "erp": "http://cucheng-erp-web.cj-1.com/"
    , "storage": "http://cucheng-storage-web.cj-1.com/"
    , "freightService": "http://192.168.5.149:8000/"
    , "cujiaLogisticsFreight": "http://192.168.5.197:8058/"
    , "tool": "http://cucheng-tool-web.cj-1.com/"
    , "caigou": "http://cucheng-procurement-web.cj-1.com/"
    , "order": "http://cucheng-order-web.cj-1.com/"
    , "cj": "http://cucheng-app-web.cj-1.com/"//app1.test.com
    , "source": "http://cucheng-source-web.cj-1.com/"
    , "freight": "http://transit-logistics.cj-1.com/"
    , "authorize": "http://cujia-platform-web-authorize.cj-1.com/"
    , "ebay": "http://eaby.cj-1.com/"
    , "lazada": "http://lazada.cj-1.com/"
    , "shopee": "http://shopee.cj-1.com/"
    , "woo": "http://woocommerce.cj-1.com/"
    , "newlogistics": "http://cucheng-logistics-web.cj-1.com/"
    , "_logistics_190606": "http://dsp-logist.test.com/" //http://logistics.test.com/
    , "_chat_190606": "http://chat.test.com/"
    , "listed_products": "http://listed-products.cj-1.com/"
    , "_affiliate3_190606": "https://affiliate3.cjdropshipping.com/" //http://affiliate3.test.com/
    , "_phone_190606": "http://m-web.cj-1.com/"
    , "storehousecj": "http://cujia-storehouse-cj-web.cj-1.com/"
    , "warehouseBuildWeb": "http://cujia-storehouse-build-web.cj-1.com/"
    , "storehouse": "http://cujia-storehouse-web.cj-1.com/"
    , "warehouse": "http://cujia-storehouse-build-web.cj-1.com/"
    , "media": "http://cujia-order-media-web.cj-1.com/"
    , "erpSupplierSourceProduct": "http://cj-supplier-erp.cj-1.com/"
    , "supplierPlanInfo": "http://cj-supplier-web.cj-1.com/"
    , "cjSupplier": "http://cj-supplier-erp.cj-1.com/"
    , "cjEvaluation": "http://cj-supplier-erp.cj-1.com/"
    , "product": "http://cujia-platform-web-product.cj-1.com/"
    , "cujialog": "http://192.168.5.197:8831/"
    , "supplier":"http://192.168.5.239:8092/"
    ,"comment":"http://192.168.5.197:7612/"
    , "platform-shop": "http://192.168.5.197:7610/"
    , "_elites_200812": "http://192.168.5.37:8081/"
    , "platform-product":"http://192.168.5.197:7612/"
    , "collection": "http://collection.test.com/"
    , "messageCenterCj": "http://master.backend-cujia-message-center.cj.com/"
    , "product-api": "http://release.cjproductcenter.cj.com/"
    , "elastic-api": "http://192.168.3.27:31451/"
    , "operation":"http://192.168.5.197:8058/cujiaLogisticsFreight/"
    , "operationCenterApi": 'http://master.backend-cj-operation-center.cj.com/'
    , "statistics": "http://192.168.5.197:8025/"
    , "product-integration-api": "http://product-center.cj.com/"
    , "order-center": 'http://master.backend-cj-order.cj.com/'
    , "_cjpacket_210408": "https://logistics.cjdropshipping.com/"
    , "early-warning-web":  "http://master.backend-home-center.cj.com/"
    , "cujia-message": "http://master.backendcujiamessagecenter.cj.com/"
    , "cj-logistics-rule": "http://master.logistic.cj.com/"
    , "payment": "https://payment.cjdropshipping.cn/" // 支付
    , "wallet": "https://payment.cjdropshipping.cn/" // 钱包
    , 'messageCenterWeb': "http://master.backend-cujia-message-center.cj.com/",
  },
  /** 线上环境 */
  production: {
    "app": "https://app.cjdropshipping.com/"// https://app.cjdropshipping.com/
    , "erp": "https://erp1.cjdropshipping.com/"
    , "cj": "https://app1.cjdropshipping.com/"
    , "storage": "https://storage.cjdropshipping.com/"
    , "tool": "https://tools.cjdropshipping.com/"
    , "order": "https://order.cjdropshipping.com/"
    , "caigou": "https://caigou.cjdropshipping.com/"
    , "source": "https://sourcing.cjdropshipping.com/"
    , "freight": "https://freight.cjdropshipping.com/"
    , "cujiaLogisticsFreight": "https://app.cjdropshipping.com/"
    , "authorize":"/"
    , "lazada": "https://lazada.cjdropshipping.com/"
    , "shopee": "https://shopee.cjdropshipping.com/"
    , "woo": "https://woocommerce.cjdropshipping.com/"
    , "ebay": "https://ebay.cjdropshipping.com/"
    , "newlogistics": "https://logistics2.cjdropshipping.com/"
    , "_logistics_190606": "https://erp.cjdropshipping.com/"
    , "_chat_190606": "https://chat.cjdropshipping.com/"
    , "listed_products": "https://publish.cjdropshipping.com/"
    , "_affiliate3_190606": "https://affiliate3.cjdropshipping.com/"
    , "_phone_190606": "http://m.cjdropshipping.com/"
    , "log_recod": "http://jhmjjx.cn:4000/"
    , "warehouse": "http://192.168.5.197:8001/"
    , "orderUsa": "/"
    , "storehouse": "/"
    , "warehouseBuildWeb": "https://app.cjdropshipping.com/"
    , "storehousecj": "/"
    , "media": "/"
    , "erpSupplierSourceProduct": "/"
    , "supplierPlanInfo": "/"
    , "cjSupplier": "/"
    , "message": "https://chat.cjdropshipping.com/"
    , "cjEvaluation": "/"
    , "product": "/"
    , "cujialog": "/"
    , "supplier":"/"
    , "comment":"/"
    , "platform-shop": "/"
    , "_elites_200812": "/"
    , "collection": "/"
    , "platform-product":"/"
    , "messageCenterCj": "/"
    , "product-api": "/"
    , "elastic-api": "https://app.cjdropshipping.com/"
    , "freightService": "/"
    , "push": "/"
    , "operation":"/"
    , "operationCenterApi": '/'
    , "statistics": "https://app.cjdropshipping.com/"
    , "order-center": '/'
    , "_cjpacket_210408": "https://logistics.cjdropshipping.com/"
    , "product-integration-api": "/"
    , "early-warning-web":  "/"
    , "cj-logistics-rule": "/"
    , "payment": "https://pay.cjdropshipping.com/" // 支付
    , "wallet": "https://pay.cjdropshipping.com/" // 钱包
    // , "cujia-message": "https://message-center-api.cjdropshipping.com/" // 线上
    , "cujia-message": "/" // 线上
    , 'messageCenterWeb': "/",
  },
  /** 线上环境-国内代理 */
  "production-cn": {
    "app": "https://app.cjdropshipping.cn/"
    , "erp": "/"
    , "cj": "https://newapp.cjdropshipping.cn/"
    , "storage": "/"
    , "tool": "/"
    , "order": "/"
    , "caigou": "/"
    , "source": "/"
    , "freight": "/"
    , "cujiaLogisticsFreight": "/"
    , "lazada": "/"
    , "shopee": "/"
    , "woo": "/"
    , "ebay": "/"
    , "authorize": "/"
    , "newlogistics": "/"
    , "_logistics_190606": "/"
    , "_affiliate3_190606": "/"
    , "listed_products": "/"
    , "orderUsa": "/"
    , "_chat_190606": "https://chat.cjdropshipping.cn/"
    , "_phone_190606": "http://m.cjdropshipping.com/"
    , "log_recod": "http://jhmjjx.cn:4000/"
    , "storehouse": "/"
    , "warehouseBuildWeb": "https://app.cjdropshipping.cn/"
    , "storehousecj": "/"
    , "media": "/"
    , "erpSupplierSourceProduct": "/"
    , "supplierPlanInfo": "/"
    , "cjSupplier": "/"
    , "message": "https://chat.cjdropshipping.cn/"
    , "cjEvaluation": "/"
    , "product": "/"
    , "cujialog": "/"
    , "supplier":"/"
    , "comment":"/"
    , "platform-shop": "/"
    , "_elites_200812": "/"
    , "collection": "/"
    ,"platform-product":"/"
    , "messageCenterCj": "/"
    , "product-api": "/"
    , "elastic-api": "https://app.cjdropshipping.cn/"
    , "freightService": "/"
    , "push": "/"
    , "operation":"/"
    , "operationCenterApi": '/'
    , "statistics": "https://app.cjdropshipping.cn/"
    , "order-center": '/'
    , "_cjpacket_210408": "https://logistics.cjdropshipping.com/"
    , "product-integration-api": "/"
    , "cj-logistics-rule": "/"
    , "early-warning-web":  "/"
    , "payment": "https://pay.cjdropshipping.com/" // 支付判断欧洲服务
    , "wallet": "https://pay.cjdropshipping.com/" // 钱包
    // , "cujia-message": "https://message-center-api.cjdropshipping.com/" // 线上
    , "cujia-message": "/" // 线上
    , 'messageCenterWeb': "/",
  },
  // 线上node服务端 api服务配置
  "production-node": {
    "app": "http://app-server.cj.com/"// https://app.cjdropshipping.com/
    , "cj": "http://cucheng-app-web.cj.com/"
    , "elastic-api": "http://cj-elastic-search-rest-api.cj.com/"
    , "warehouseBuildWeb": "http://cujia-storehouse-build-web.cj.com/"
    , "product-api": "http://cj-product-center-rest-api.cj.usa/"
    , "statistics": "http://cj-about.cj.usa/"
  },
};

apiConfig.development = apiConfig[environment];

module.exports = {
  api: apiConfig,
  // 默认币种
  currency: { symbol: "$", currency: "USD", NAME: "美元", rate: "1" },
  // 人工翻译的语种
  languages: ['zh', 'en', 'de', 'fr', 'id', 'th'],
};
