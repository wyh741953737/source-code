import { NAV_LIST } from './mycj.constant';
import { BUILD_TIMESTAMP, NODE_ENV } from '@root_egg/env';
import MD5_MAP from '@src/pages/pages-md5';

/*jshint -W024 */
const isDev = NODE_ENV === 'development';
const alipayjs = (NODE_ENV === 'test'||NODE_ENV === 'development')?'//render.alipay.com/p/w/checkoutSDK-sandbox/index_v1.js':'//render.alipay.com/p/w/checkoutSDK/index_v1.js'
// Cj 主页
export const DASHBOARD = '/myCJAssociatedStore';
// 路由可选参数
const squash = { squash: true, value: '' };
// 构建更新缓存 - 文件自身 md5
const versionURL = (url, route) => {
  let hash = BUILD_TIMESTAMP; // 默认构建时间戳
  if (!isDev) {
    for (const [key, val] of Object.entries(MD5_MAP)) {
      if (key.endsWith(url.replace(/\.css$/, '.less'))) { // 读取的是 less 文件 hash
        hash = val.substr(0, 9); // 取9位长度hash
        break;
      }
    }
  }
  return isDev ? url : `${url}?v=${hash}`;
};
// processing、processed、completed 子订单公用模板
const dropChildCommonOmit = angular => ({
  data: { name: 'Dropshipping Orders', nav: NAV_LIST.dropCenter },
  templateUrl: versionURL('/pages/mycj/dropshipping-orders/drop-child-common.html'),
  controller: 'drop-child-common.ctrl',
  lazyLoad: transition => {
    const $lazy = transition.injector().get('$ocLazyLoad');
    $lazy.load([
      versionURL('/pages/mycj/dropshipping-orders/drop-common.css'),
      versionURL('/pages/mycj/dropshipping-orders/drop-child-common.css'),
    ]);
    return import('./dropshipping-orders/drop-child-common')
      .then(m => $lazy.load(m.dropChildCommonFactory(angular)));
  },
});


export function mycjRouter(mycjModule, angular) {
  mycjModule.config([
    '$locationProvider',
    '$stateProvider',
    '$urlRouterProvider',
    function ($location, $state, $urlRouter) {
      $location.hashPrefix(''); // 去掉路径中的! (/#!/ -> /#/)
      $urlRouter.otherwise(isDev ? DASHBOARD : '/404');

      $state
        /**** mycj **** start ****/
        // myCj 首页
        .state('associated-store', {
          url: `${DASHBOARD}/:type?track`,
          params: { type: squash },
          data: { name: 'Dashboard', nav: NAV_LIST.mycj },
          templateUrl: versionURL('/pages/mycj/associated-store/associated-store.html'),
          controller: 'associated-store.ctrl',
          lazyLoad: transition => {
            const $lazy = transition.injector().get('$ocLazyLoad');
            $lazy.load([
              versionURL('/pages/mycj/associated-store/associated-store.css'),
              versionURL('/pages/mycj/associated-store/associated-store-vip.css'),
              // versionURL('/static/components/product_card/product_card.css'),
              // versionURL('/static/components/product_card/product_card.js'),
            ]);
            return import(
              './associated-store/associated-store')
              .then(m => $lazy.load(m.associatedStoreFactory(angular)));
          },
        })
        // vip 等级说明
        .state('vip-level-desc', {
          url: '/vip-level-desc',
          params: { type: squash },
          templateUrl: versionURL('/pages/mycj/vip-level-description/vip-level-description.html'),
          controller: 'vip-level-desc.ctrl',
          lazyLoad: transition => {
            const $lazy = transition.injector().get('$ocLazyLoad');
            $lazy.load([
              versionURL('/pages/mycj/vip-level-description/vip-level-description.css'),
            ]);
            return import('./vip-level-description/vip-level-description')
              .then(m => $lazy.load(m.vipLevelDescFactory(angular)));
          }
        })
        // todo list
        .state('todo-list', {
          url: '/todoList/:type',
          params: { type: squash },
          data: { name: 'Dashboard', nav: NAV_LIST.mycj },
          templateUrl: versionURL('/pages/mycj/todo-list/todo-list.html'),
          controller: 'todo-list.ctrl',
          lazyLoad: transition => {
            const $lazy = transition.injector().get('$ocLazyLoad');
            $lazy.load(versionURL('/pages/mycj/todo-list/todo-list.css'));
            return import('./todo-list/todo-list')
              .then(m => $lazy.load(m.todoListFactory(angular)));
          }
        })
        //搜品
        .state('sourcing', {
          url: '/sourcing/:type',
          params: { type: squash },
          data: { name: 'Sourcing', nav: NAV_LIST.mycj },
          templateUrl: versionURL('/pages/mycj/sourcing/sourcing.html'),
          controller: 'sourcing.ctrl',
          lazyLoad: transition => {
            const $lazy = transition.injector().get('$ocLazyLoad');
            $lazy.load([
              versionURL('/pages/mycj/sourcing/sourcing.css'),
            ]);
            return import('./sourcing/sourcing')
              .then(m => $lazy.load(m.sourcingFactory(angular)));
          },
        })
        // 搜品详情
        .state('sourcing-detail', {
          url: '/seachgoods-detail/:id/:sourcetype',
          data: { name: 'Sourcing', nav: NAV_LIST.mycj },
          templateUrl: versionURL('/pages/mycj/sourcing/sourcing-detail.html'),
          controller: 'sourcing-detail.ctrl',
          lazyLoad: transition => {
            const $lazy = transition.injector().get('$ocLazyLoad');
            $lazy.load(versionURL('/pages/mycj/sourcing/sourcing-detail.css'));
            return import('./sourcing/sourcing-detail')
              .then(m => $lazy.load(m.sourcingDetailFactory(angular)));
          },
        })
        // 添加搜品
        .state('add-sourcing', {
          url: '/add-sourcing/{spName}/{storeId}/{supplierId}/{supplierName}',
          params: { spName: null, storeId: null, supplierId: null, supplierName: null },
          data: { name: 'Sourcing', nav: NAV_LIST.mycj },
          templateUrl: versionURL('/pages/mycj/sourcing/sourcing-add.html'),
          controller: 'sourcing-add.ctrl',
          lazyLoad: transition => {
            // wangEditor
            const $lazy = transition.injector().get('$ocLazyLoad');
            $lazy.load(versionURL('/pages/mycj/sourcing/sourcing-add.css'));
            return import('./sourcing/sourcing-add')
              .then(m => $lazy.load(m.sourcingAddFactory(angular)));
          },
        })
        .state('market-place', {
          // type-订单类型 type=1--fba订单   默认--直发订单
          // show-购物车是否打开 show=1--展开购物车  默认--不展开购物车
          url: '/goods/:type/:show',
          params: { type: squash, show: squash },
          data: { name: 'Purchase List', nav: NAV_LIST.mycj },
          templateUrl: versionURL('/pages/mycj/goods/goods.html'),
          controller: 'goods.ctrl',
          lazyLoad: transition => {
            const $lazy = transition.injector().get('$ocLazyLoad');
            $lazy.load([
              versionURL('/pages/mycj/goods/goods-common.css'),
              versionURL('/pages/mycj/goods/goods.css'),
              // versionURL('/static/components/cart/cart.js'), // 购物车组件
            ]);
            return import('./goods/goods')
              .then(m => $lazy.load(m.goodsFactory(angular)));
          },
        })
        .state('FBA-purchase', {
          url: '/myCJ-FBApurchase',
          data: { name: 'Marketplace' },
          templateUrl: versionURL('/pages/mycj/fba-purchase/fba-purchase.html'),
          controller: 'fba-purchase.ctrl',
          lazyLoad: transition => {
            const $lazy = transition.injector().get('$ocLazyLoad');
            $lazy.load(versionURL('/pages/mycj/fba-purchase/fba-purchase.css'));
            return import('./fba-purchase/fba-purchase')
              .then(m => $lazy.load(m.FBA_purchaseFactory(angular)));
            },
        })
        // 购物车
        .state('cart', {
          url: '/cart/:sku?',
          params: { sku: squash },
          data: { name: 'Purchase List', nav: NAV_LIST.mycj },
          templateUrl: '/pages/mycj/goods/goods-cart.html',
          controller: 'goods-cart.ctrl',
          lazyLoad: transition => {
            const $lazy = transition.injector().get('$ocLazyLoad');
            $lazy.load([
              versionURL('/pages/mycj/goods/goods-cart.css'),
              versionURL('/pages/mycj/goods/goods-common.css'),
            ]);
            return import('../mycj/goods/goods-cart')
              .then(m => $lazy.load(m.goodsCartFactory(angular)));

          },
        })
        // 订单结算页面
        .state('mycj-purchase', {
          url: '/myCJ-purchase/{id}/{orderType}/{isSupplier}/{shipType}',
          // id: 1688 淘宝插件订单 orderType: 订单类型[1688插件订单:'taobao',自定义包装订单:'package',直发订单:'zf'] isSupplier: 供应商或泰国商品
          // shipType: 区分直发、私有库存 1直发 2私有
          params: { id: null, orderType: null, isSupplier: null, shipType:null },
          data: { name: 'Purchase List' },
          templateUrl: '/pages/mycj/settle/purchase.html',
          controller: 'mycj-purchase.ctrl',
          lazyLoad: transition => {
            const $lazy = transition.injector().get('$ocLazyLoad');
            $lazy.load(versionURL('/pages/mycj/settle/purchase.css'));
            return import('./settle/purchase')
              .then(m => $lazy.load(m.mycjPurchaseFactory(angular)));
          },
        })
        // myCJ-采购历史
        .state('purchase-history', {
          url: '/purchase-history/:ordid',
          params: { ordid: squash },
          data: { name: 'Purchase List', nav: NAV_LIST.mycj },
          templateUrl: versionURL('/pages/mycj/purchase/purchase-history.html'),
          controller: 'purchaseHistory.ctrl',
          lazyLoad: transition => {
            const $lazy = transition.injector().get('$ocLazyLoad');
            $lazy.load(versionURL('/pages/mycj/purchase/purchase.css'));
            return import('./purchase/purchase')
              .then(m => $lazy.load(m.purchaseFactory(angular)));
          },
        })
        // myCJ-采购- 1688/toabao
        .state('purchase-taobao', {
          url: '/purchase-Taobao/:type',
          params: { type: squash },
          data: { name: 'Purchase List', nav: NAV_LIST.mycj },
          templateUrl: versionURL('/pages/mycj/purchase/purchase-taobao.html'),
          controller: 'purchaseTaobao.ctrl',
          lazyLoad: transition => {
            const $lazy = transition.injector().get('$ocLazyLoad');
            $lazy.load(versionURL('/pages/mycj/purchase/purchase.css'));
            return import('./purchase/purchase')
              .then(m => $lazy.load(m.purchaseFactory(angular)));
          },
        })
        // 订单详情
        .state('order-detail', {
          url: '/order-detail/:id/:istrackFlag/:status/:orderType',
          params: { id: squash, istrackFlag: squash, status: squash, orderType: squash },
          templateUrl: versionURL('/pages/mycj/dropshipping-orders/order-detail.html'),
          controller: 'order-detail.ctrl',
          lazyLoad: transition => {
            const $lazy = transition.injector().get('$ocLazyLoad');
            $lazy.load([
              versionURL('/pages/mycj/dropshipping-orders/order-detail.css'),
            ]);
            return import('./dropshipping-orders/order-detail')
              .then(m => $lazy.load(m.orderDetailFactory(angular)));
          },
        })
        // 订单日志
        .state('order-log', {
          url: '/order-log/:id',
          params: { id: squash },
          data: { name: 'Dropshipping Orders', nav: NAV_LIST.dropCenter },
          templateUrl: versionURL('/pages/mycj/dropshipping-orders/order-log.html'),
          controller: 'order-log.ctrl',
          lazyLoad: transition => {
            const $lazy = transition.injector().get('$ocLazyLoad');
            $lazy.load([
              versionURL('/pages/mycj/dropshipping-orders/order-log.css'),
            ]);
            return import('./dropshipping-orders/order-log')
              .then(m => $lazy.load(m.orderDetailFactory(angular)));
          },
        })
        // myCJ-视频订单
        .state('video-order', {
          url: '/video-history/:ordid',
          params: { ordid: squash },
          data: { name: 'My Photography', nav: NAV_LIST.mycj },
          templateUrl: versionURL('/pages/mycj/video/video-order.html'),
          controller: 'video-order.ctrl',
          lazyLoad: transition => {
            const $lazy = transition.injector().get('$ocLazyLoad');
            $lazy.load(versionURL('/pages/mycj/video/video-order.css'));
            // $lazy
            //   .load('https://g.alicdn.com/de/prismplayer/2.8.1/aliplayer-min.js') // aliyun 播放器 ... 在 mycj.module 中加载
            //   .then(() => window.dispatchEvent(new Event('aliplayer-min.js')));
            return import('./video/video-order')
              .then(m => $lazy.load(m.videoOrderFactory(angular)));
          },
        })
        // myCJ-视频需求
        .state('video-demand', {
          url: '/video-demand',
          data: { name: 'My Photography', nav: NAV_LIST.mycj },
          templateUrl: versionURL('/pages/mycj/video/video-demand.html'),
          controller: 'video-demand.ctrl',
          lazyLoad: transition => {
            const $lazy = transition.injector().get('$ocLazyLoad');
            $lazy.load(versionURL('/pages/mycj/video/video-demand.css'));
            return import('./video/video-demand')
              .then(m => $lazy.load(m.videoDemandFactory(angular)));
          },
        })
        // add myCJ-视频需求
        .state('add-video-demand', {
          url: '/add-video-demand/:spName/:storeId',
          params: { spName: squash, storeId: squash },
          data: { name: 'My Photography', nav: NAV_LIST.mycj },
          templateUrl: versionURL('/pages/mycj/video/video-demand-add.html'),
          controller: 'video-demand-add.ctrl',
          lazyLoad: transition => {
            // wangEditor
            const $lazy = transition.injector().get('$ocLazyLoad');
            $lazy.load(versionURL('/pages/mycj/video/video-demand-add.css'));
            return import('./video/video-demand-add')
              .then(m => $lazy.load(m.videoDemandAddFactory(angular)));
          },
        })
        // detail myCJ-视频需求
        .state('video-demand-detail', {
          url: '/video-demand-detail/:id/:sourcetype',
          params: { spName: squash, storeId: squash },
          data: { name: 'My Photography', nav: NAV_LIST.mycj },
          templateUrl: versionURL('/pages/mycj/video/video-demand-detail.html'),
          controller: 'video-demand-detail.ctrl',
          lazyLoad: transition => {
            const $lazy = transition.injector().get('$ocLazyLoad');
            $lazy.load([
              versionURL('/pages/mycj/sourcing/sourcing-detail.css'),
              versionURL('/pages/mycj/video/video-demand-detail.css'),
            ]);
            return import('./video/video-demand-detail')
              .then(m => $lazy.load(m.videoDemandDetailFactory(angular)));
          },
        })
        // 我的库存
        .state('my-inventory', {
          url: '/my-inventory',
          templateUrl: versionURL('/pages/mycj/inventory/my-inventory.html'),
          data: { name: 'My Inventory', nav: NAV_LIST.mycj },
          controller: 'my-inventory.ctrl',
          lazyLoad: transition => {
            const $lazy = transition.injector().get('$ocLazyLoad');
            $lazy.load(versionURL('/pages/mycj/inventory/my-inventory.css'));
            return import('./inventory/my-inventory')
              .then(m => $lazy.load(m.myInventoryFactory(angular)));
          }
        })
        // 包装库存
        .state('package-inventory', {
          url: '/package-inventory/:packVid/:type',
          params: { packVid: squash, type: squash },
          templateUrl: versionURL('/pages/mycj/inventory/package-inventory.html'),
          data: { name: 'My Inventory', nav: NAV_LIST.mycj },
          controller: 'package-inventory.ctrl',
          lazyLoad: transition => {
            const $lazy = transition.injector().get('$ocLazyLoad');
            $lazy.load(versionURL('/pages/mycj/inventory/package-inventory.css'));
            return import('./inventory/package-inventory')
              .then(m => $lazy.load(m.packageInventoryFactory(angular)));
          }
        })
        // 包装库存-关联商品
        .state('inventory-package-related-goods', {
          url: '/related-goods/:id/:shopId/:shopName',
          params: { shopId: squash, shopName: squash },
          templateUrl: versionURL('/pages/mycj/inventory-package/related-goods.html'),
          data: { name: 'My Inventory', nav: NAV_LIST.mycj },
          controller: 'inventory-package-related-goods.ctrl',
          lazyLoad: transition => {
            const $lazy = transition.injector().get('$ocLazyLoad');
            return import('./inventory-package/related-goods')
              .then(m => $lazy.load(m.relatedGoodsFactory(angular)));
          }
        })
        // 包装库存-已使用/已订购
        .state('inventory-package-use-order', {
          url: '/use-order/:path/:id/:shopId',
          params: { shopId: squash },
          templateUrl: versionURL('/pages/mycj/inventory-package/use-order.html'),
          data: { name: 'My Inventory', nav: NAV_LIST.mycj },
          controller: 'inventory-package-use-order.ctrl',
          lazyLoad: transition => {
            const $lazy = transition.injector().get('$ocLazyLoad');
            $lazy.load(versionURL('/pages/mycj/inventory-package/use-order.css'));
            return import('./inventory-package/use-order')
              .then(m => $lazy.load(m.useOrderFactory(angular)));
          }
        })
        // 包装库存-已使用/已订购
        .state('inventory-package-child-order', {
          url: '/child-order/:type/:id/:packVid/:shopId',
          params: { shopId: squash },
          templateUrl: versionURL('/pages/mycj/inventory-package/child-order.html'),
          data: { name: 'My Inventory', nav: NAV_LIST.mycj },
          controller: 'inventory-package-child-order.ctrl',
          lazyLoad: transition => {
            const $lazy = transition.injector().get('$ocLazyLoad');
            return import('./inventory-package/child-order')
              .then(m => $lazy.load(m.childOrderFactory(angular)));
          }
        })
        // 收藏
        .state('mycj-favorites', {
          url: '/myCJ-favorites/:pid',
          templateUrl: versionURL('/pages/mycj/favorites/favorites.html'),
          params: { pid: squash },
          data: { name: 'Wishlist', nav: NAV_LIST.mycj },
          controller: 'mycj-favorites.ctrl',
          lazyLoad: transition => {
            // wangEditor
            const $lazy = transition.injector().get('$ocLazyLoad');
            $lazy.load([
              versionURL('/pages/mycj/favorites/favorites.css'),
              versionURL('/static/components/edit_frame/edit_frame.js'), // 编辑后刊登
              versionURL('/static/components/edit_frame/edit_frame.css'),
              versionURL('/static/components/shopify_collections/shopify_collections.js'), // shopify collection
              versionURL('/static/components/shopify_collections/shopify_collections.css'),
            ]);
            return import('./favorites/favorites')
              .then(m => $lazy.load(m.favoritesFactory(angular)));
          }
        })
        // .state('amazon-FBA', {
        //   url: '/myCJ-FBA',
        //   templateUrl: versionURL('/pages/mycj/amazon-fba/amazon-fba.html'),
        //   data: { name: 'Amazon FBA', nav: NAV_LIST.mycj },
        //   controller: 'amazon-FBA.ctrl',
        //   lazyLoad: transition => {
        //     const $lazy = transition.injector().get('$ocLazyLoad');
        //     $lazy.load(versionURL('/pages/mycj/amazon-fba/amazon-fba.css'));
        //     return import('./amazon-fba/amazon-fba')
        //       .then(m => $lazy.load(m.amazonFBA_factory(angular)));
        //   }
        // })
        // myCJ-普通包装
        .state('regular-packaging', {
          url: '/regular-packaging/:type',
          templateUrl: versionURL('/pages/mycj/packaging/regular-package.html'),
          params: { type: squash },
          data: { name: 'Custom Packaging', nav: NAV_LIST.mycj },
          controller: 'regular-package.ctrl',
          lazyLoad: transition => {
            const $lazy = transition.injector().get('$ocLazyLoad');
            $lazy.load(versionURL('/pages/mycj/packaging/regular-package.css'));
            return import('./packaging/regular-package')
              .then(m => $lazy.load(m.regularPackageFactory(angular)));
          }
        })
        // 积分红包
        .state('point-reward', {
          url: '/points-mall',
          templateUrl: versionURL('/pages/mycj/point-reward/point-reward.html'),
          data: { name: 'Dashboard', nav: NAV_LIST.mycj },
          controller: 'point-reward.ctrl',
          lazyLoad: transition => {
            const $lazy = transition.injector().get('$ocLazyLoad');
            $lazy.load(versionURL('/pages/mycj/point-reward/point-reward.css'));
            return import('./point-reward/point-reward')
              .then(m => $lazy.load(m.pointRewardFactory(angular)));
          }
        })
        /**** mycj **** end ****/

        /**** Dropshipping Center **** start ****/
        // left-bar对应的自动订单
        .state('direct-orders', {
          url: '/direct-orders/:idlist',
          params: { idlist: squash },
          data: { name: 'Imported Orders', nav: NAV_LIST.dropCenter },
          templateUrl: versionURL('/pages/mycj/imported-orders/import-process-required.html'),
          controller: 'import-process-required.ctrl',
          lazyLoad: transition => {
            const $lazy = transition.injector().get('$ocLazyLoad');
            $lazy.load([
              versionURL('/pages/mycj/imported-orders/import-common.css'),
              versionURL('/pages/mycj/imported-orders/import-process-required.css'),
            ]);
            return import('./imported-orders/import-process-required')
              .then(m => $lazy.load(m.importProcessRequiredFactory(angular)));
          }
        })
        // 待提交订单
        .state('imp-cart', {
          url: '/imp-cart',
          data: { name: 'Imported Orders', nav: NAV_LIST.dropCenter },
          templateUrl: versionURL('/pages/mycj/imported-orders/import-cart.html'),
          controller: 'import-cart.ctrl',
          lazyLoad: transition => {
            const $lazy = transition.injector().get('$ocLazyLoad');
            $lazy.load();
            $lazy.load([
              versionURL('/pages/mycj/imported-orders/import-common.css'),
              versionURL('/pages/mycj/imported-orders/import-cart.css'),
            ]);
            return import('./imported-orders/import-cart')
              .then(m => $lazy.load(m.importCartFactory(angular)));
          }
        })
        // 商品不全的订单
        .state('imp-incomp', {
          url: '/imp-incomp',
          data: { name: 'Imported Orders', nav: NAV_LIST.dropCenter },
          templateUrl: versionURL('/pages/mycj/imported-orders/import-incomplete.html'),
          controller: 'import-incomplete.ctrl',
          lazyLoad: transition => {
            const $lazy = transition.injector().get('$ocLazyLoad');
            $lazy.load([
              versionURL('/pages/mycj/imported-orders/import-common.css'),
              versionURL('/pages/mycj/imported-orders/import-incomplete.css'),
            ]);
            return import('./imported-orders/import-incomplete')
              .then(m => $lazy.load(m.importIncompleteFactory(angular)));
          }
        })
        // 被取消订单
        .state('imp-cancel', {
          url: '/imp-cancel',
          data: { name: 'Imported Orders', nav: NAV_LIST.dropCenter },
          templateUrl: versionURL('/pages/mycj/imported-orders/import-cancel.html'),
          controller: 'import-cancel.ctrl',
          lazyLoad: transition => {
            const $lazy = transition.injector().get('$ocLazyLoad');
            $lazy.load(versionURL('/pages/mycj/imported-orders/import-common.css'));
            return import('./imported-orders/import-cancel')
              .then(m => $lazy.load(m.importCancelFactory(angular)));
          }
        })
        /** ---- useless ----
        .state('all-import', {
          url: '/all-import',
          data: { name: 'Imported Orders', nav: NAV_LIST.dropCenter },
          templateUrl: versionURL('/pages/mycj/imported-orders/import-all.html'),
          controller: 'import-all.ctrl',
          lazyLoad: transition => {
            const $lazy = transition.injector().get('$ocLazyLoad');
            $lazy.load(versionURL('/pages/mycj/imported-orders/import-common.css'));
            return import('./imported-orders/import-all')
              .then(m => $lazy.load(m.importAllFactory(angular)));
          }
        }) */
        // 待处理订单
        .state('search-all', {
          url: '/search-all',
          data: { name: 'Imported Orders', nav: NAV_LIST.dropCenter },
          templateUrl: versionURL('/pages/mycj/imported-orders/import-search-all.html'),
          controller: 'import-search-all.ctrl',
          lazyLoad: transition => {
            const $lazy = transition.injector().get('$ocLazyLoad');
            $lazy.load([
              versionURL('/pages/mycj/imported-orders/import-common.css'),
              versionURL('/pages/mycj/imported-orders/import-search-all.css'),
            ]);
            return import('./imported-orders/import-search-all')
              .then(m => $lazy.load(m.importSearchAllFactory(angular)));
          }
        })
        // 授权后的订单
        .state('AuthorizeOrder', {
          url: '/AuthorizeOrder',
          data: { name: 'Imported Orders', nav: NAV_LIST.dropCenter },
          templateUrl: versionURL('/pages/mycj/imported-orders/import-store.html'),
          controller: 'import-store.ctrl',
          lazyLoad: transition => {
            const $lazy = transition.injector().get('$ocLazyLoad');
            $lazy.load([
              versionURL('/pages/mycj/imported-orders/import-common.css'),
              versionURL('/pages/mycj/imported-orders/import-store.css'),
            ]);
            return import('./imported-orders/import-store')
              .then(m => $lazy.load(m.importStoreFactory(angular)));
          }
        })
        // 对应的代发订单 订单的 awaiting payment
        .state('dropshipping-orders', {
          url: '/dropshipping-orders',
          data: { name: 'Dropshipping Orders', nav: NAV_LIST.dropCenter },
          templateUrl: versionURL('/pages/mycj/dropshipping-orders/drop-await-payment.html'),
          controller: 'drop-await-payment.ctrl',
          lazyLoad: transition => {
            const $lazy = transition.injector().get('$ocLazyLoad');
            $lazy.load([
              versionURL('/pages/mycj/dropshipping-orders/drop-common.css'),
              versionURL('/pages/mycj/dropshipping-orders/drop-await-payment.css'),
            ]);
            return import('./dropshipping-orders/drop-await-payment')
              .then(m => $lazy.load(m.dropAwaitPaymentFactory(angular)));
          }
        })
        // 订单的 awaiting payment 的子订单
        .state('drop-home-zi', {
          url: '/drop-home-zi/:muordid/:ziid',
          params: { ziid: squash },
          data: { name: 'Dropshipping Orders', nav: NAV_LIST.dropCenter },
          templateUrl: versionURL('/pages/mycj/dropshipping-orders/await-payment-child.html'),
          controller: 'await-payment-child.ctrl',
          lazyLoad: transition => {
            const $lazy = transition.injector().get('$ocLazyLoad');
            $lazy.load([
              versionURL('/pages/mycj/dropshipping-orders/drop-common.css'),
              versionURL('/pages/mycj/dropshipping-orders/await-payment-child.css'),
            ]);
            return import('./dropshipping-orders/await-payment-child')
              .then(m => $lazy.load(m.awaitPaymentChildFactory(angular)));
          }
        })
        // 对应的代发订单 订单的processing
        .state('drop-proce', {
          url: '/drop-proce/:ordid',
          params: { ordid: squash },
          data: { name: 'Dropshipping Orders', nav: NAV_LIST.dropCenter },
          templateUrl: versionURL('/pages/mycj/dropshipping-orders/drop-processing.html'),
          controller: 'drop-processing.ctrl',
          lazyLoad: transition => {
            const $lazy = transition.injector().get('$ocLazyLoad');
            $lazy.load([
              versionURL('/pages/mycj/dropshipping-orders/drop-common.css'),
              versionURL('/pages/mycj/dropshipping-orders/drop-processing.css'),
            ]);
            return import('./dropshipping-orders/drop-processing')
              .then(m => $lazy.load(m.dropProcessingFactory(angular)));
          }
        })
        // 订单processing的子订单
        .state('drop-processing-child', {
          url: '/drop-proce-zi/{muordid}/{ziid}/{stu}/{sku}',
          params: { muordid: null, ziid: null, stu: null, sku: null },
          ...dropChildCommonOmit(angular),
        })
        // 对应的代发订单 订单的processed
        .state('drop-processed', {
          url: '/drop-processed',
          data: { name: 'Dropshipping Orders', nav: NAV_LIST.dropCenter },
          templateUrl: versionURL('/pages/mycj/dropshipping-orders/drop-processed.html'),
          controller: 'drop-processed.ctrl',
          lazyLoad: transition => {
            const $lazy = transition.injector().get('$ocLazyLoad');
            $lazy.load([
              versionURL('/pages/mycj/dropshipping-orders/drop-common.css'),
              versionURL('/pages/mycj/dropshipping-orders/drop-processed.css'),
            ]);
            return import('./dropshipping-orders/drop-processed')
              .then(m => $lazy.load(m.dropProcessedFactory(angular)));
          }
        })
        // 订单processing的子订单
        .state('drop-processed-child', {
          url: '/drop-processed-zi/:muordid/:ziid/:type/:sku',
          params: { muordid: squash, ziid: squash, type: squash, sku: squash },
          ...dropChildCommonOmit(angular),
        })
        // 对应的代发订单 订单的completed
        .state('drop-complet', {
          url: '/drop-complet',
          data: { name: 'Dropshipping Orders', nav: NAV_LIST.dropCenter },
          templateUrl: versionURL('/pages/mycj/dropshipping-orders/drop-completed.html'),
          controller: 'drop-completed.ctrl',
          lazyLoad: transition => {
            const $lazy = transition.injector().get('$ocLazyLoad');
            $lazy.load(versionURL('/pages/mycj/dropshipping-orders/drop-common.css'));
            return import('./dropshipping-orders/drop-completed')
              .then(m => $lazy.load(m.dropCompletedFactory(angular)));
          }
        })
        // 订单completed的子订单
        .state('drop-completed-child', {
          url: '/drop-complet-zi/:muordid/:ziid/:type',
          params: { muordid: squash, ziid: squash, type: squash },
          ...dropChildCommonOmit(angular),
        })
        // 对应的代发订单 订单的closed
        .state('drop-close', {
          url: '/drop-close',
          data: { name: 'Dropshipping Orders', nav: NAV_LIST.dropCenter },
          templateUrl: versionURL('/pages/mycj/dropshipping-orders/drop-closed.html'),
          controller: 'drop-closed.ctrl',
          lazyLoad: transition => {
            const $lazy = transition.injector().get('$ocLazyLoad');
            $lazy.load(versionURL('/pages/mycj/dropshipping-orders/drop-common.css'));
            return import('./dropshipping-orders/drop-closed')
              .then(m => $lazy.load(m.dropClosedFactory(angular)));
          }
        })
        // 对应的代发订单 订单的closed
        .state('drop-close-child', {
          url: '/drop-close-zi/:muordid/:ziid/:type',
          params: { muordid: squash, ziid: squash, type: squash },
          data: { name: 'Dropshipping Orders', nav: NAV_LIST.dropCenter },
          templateUrl: versionURL('/pages/mycj/dropshipping-orders/drop-closed-child.html'),
          controller: 'drop-closed-child.ctrl',
          lazyLoad: transition => {
            const $lazy = transition.injector().get('$ocLazyLoad');
            $lazy.load([
              versionURL('/pages/mycj/dropshipping-orders/drop-common.css'),
              versionURL('/pages/mycj/dropshipping-orders/drop-closed-child.css'),
            ]);
            return import('./dropshipping-orders/drop-closed-child')
              .then(m => $lazy.load(m.dropCloseChildFactory(angular)));
          }
        })
        // 对应的服务中心
        .state('service-await-response', {
          url: '/after-sale/{afterStu}/{jfId}/:ordid?filter',
          params: { afterStu: null, jfId: null, ordid: squash },
          data: { name: 'Disputes', nav: NAV_LIST.dropCenter },
          templateUrl: versionURL('/pages/mycj/service-center/service-await-response.html'),
          controller: 'service-await-response.ctrl',
          lazyLoad: transition => {
            const $lazy = transition.injector().get('$ocLazyLoad');
            $lazy.load([
              versionURL('/pages/mycj/service-center/service-common.css'),
              versionURL('/pages/mycj/service-center/service-await-response.css'),
            ]);
            return import('./service-center/service-await-response')
              .then(m => $lazy.load(m.serviceAwaitResponseFactory(angular)));
          }
        })
        .state('service-return', {
          url: '/after-sale-return',
          data: { name: 'Disputes', nav: NAV_LIST.dropCenter },
          templateUrl: versionURL('/pages/mycj/service-center/service-return.html'),
          controller: 'service-return.ctrl',
          lazyLoad: transition => {
            const $lazy = transition.injector().get('$ocLazyLoad');
            $lazy.load([
              versionURL('/pages/mycj/service-center/service-common.css'),
              versionURL('/pages/mycj/service-center/service-return.css'),
            ]);
            return import('./service-center/service-return')
              .then(m => $lazy.load(m.serviceReturnFactory(angular)));
          }
        })
        .state('service-return-detail', {
          url: '/after-sale-returndetail/:returnId',
          params: { returnId: squash },
          data: { name: 'Disputes', nav: NAV_LIST.dropCenter },
          templateUrl: versionURL('/pages/mycj/service-center/service-return-detail.html'),
          controller: 'service-return-detail.ctrl',
          lazyLoad: transition => {
            const $lazy = transition.injector().get('$ocLazyLoad');
            $lazy.load(versionURL('/pages/mycj/service-center/service-return-detail.css'));
            return import('./service-center/service-return-detail')
              .then(m => $lazy.load(m.serviceReturnDetailFactory(angular)));
          }
        })
        // 问题包裹-待重发
        .state('problem-package', {
          url: '/problem-package/:problemStu/:packagetype/:ordid',
          params: { problemStu: squash, packagetype: squash, ordid: squash },
          data: { name: 'Undelivered Orders', nav: NAV_LIST.dropCenter },
          templateUrl: versionURL('/pages/mycj/undelivered-orders/undeliver-pending-reship.html'),
          controller: 'undeliver-pending-reship.ctrl',
          lazyLoad: transition => {
            const $lazy = transition.injector().get('$ocLazyLoad');
            $lazy.load(versionURL('/pages/mycj/undelivered-orders/undeliver-pending-reship.css'));
            return import('./undelivered-orders/undeliver-pending-reship')
              .then(m => $lazy.load(m.undeliverPendingReshipFactory(angular)));
          }
        })
        // 订单支付抵扣
        .state('order-pay', {
          url: '/order-pay',
          templateUrl: versionURL('/pages/mycj/order-pay/order-pay.html'),
          data: { name: 'Dropshipping Orders', nav: NAV_LIST.dropCenter },
          controller: 'order-pay.ctrl',
          lazyLoad: transition => {
            const $lazy = transition.injector().get('$ocLazyLoad');
            $lazy.load(versionURL('/pages/mycj/order-pay/order-pay.css'));
            return import('./order-pay/order-pay')
              .then(m => $lazy.load(m.orderPayFactory(angular)));
          }
        })
        // 各种支付
        .state('payment', {
          url: '/payment/:ordn/:ordm/:ordq/:ordType/:pid/:videoId',
          params: { ordq: squash, ordType: squash, pid: squash, videoId: squash },
          data: {},
          templateUrl: versionURL('/pages/mycj/payment/payment.html'),
          controller: 'payment.ctrl',
          lazyLoad: transition => {
            const $lazy = transition.injector().get('$ocLazyLoad');
            $lazy.load([
              versionURL('/pages/mycj/payment/payment.css'),
              versionURL('/static/css/flags.css'),
              'https://js.stripe.com/v3', // 支付
              alipayjs
            ]);
            return import('./payment/payment')
              .then(m => $lazy.load(m.paymentFactory(angular)));
          }
        })
        // 派安盈 授权回调页
        .state('p-auth', {
          url: '/p-auth/:code',
          //params: { code: { code: 1 } },
          data: {},
          templateUrl: versionURL('/pages/mycj/payment/p-auth.html'),
          controller: 'p-auth.ctrl',
          lazyLoad: transition => {
            const $lazy = transition.injector().get('$ocLazyLoad');
            $lazy.load([
              versionURL('/pages/mycj/payment/p-auth.css'),
            ]);
            return import('./payment/p-auth')
              .then(m => $lazy.load(m.pAuthFactory(angular)));
          }
        })

        /**** Dropshipping Center **** end ****/

        /**** Products **** start ****/
        // 已关联商品
        .state('connection', {
          url: '/products-connection/connected/:seachCs',
          params: { seachCs: squash },
          data: { name: 'Connection', nav: NAV_LIST.products },
          templateUrl: versionURL('/pages/mycj/connection/connection.html'),
          controller: 'connection.ctrl',
          lazyLoad: transition => {
            const $lazy = transition.injector().get('$ocLazyLoad');
            $lazy.load(versionURL('/pages/mycj/connection/connection.css'));
            return import('./connection/connection')
              .then(m => $lazy.load(m.connectionFactory(angular)));
          }
        })
        // 关联商品
        .state('connection-pending', {
          url: '/products-connection/pending-connection/:searchstr/:mcInfo/:cjsku',
          params: { searchstr: squash, mcInfo: squash,cjsku:squash },
          data: { name: 'Connection', nav: NAV_LIST.products },
          templateUrl: versionURL('/pages/mycj/connection/connection-pending.html'),
          controller: 'connection-pending.ctrl',
          lazyLoad: transition => {
            const $lazy = transition.injector().get('$ocLazyLoad');
            $lazy.load([
              // versionURL('/static/components/sync_store/sync_store.js'), // 同步商品
              versionURL('/pages/mycj/connection/connection-pending.css'),
            ]);
            return import('./connection/connection-pending')
              .then(m => $lazy.load(m.connectionPendingFactory(angular)));
          }
        })
        // 关联搜品 ---- 和下面的一毛一样
        .state('connection-sourcing', {
          url: '/products-connection/sourcing-connection/:searchstr/:scInfo',
          params: { searchstr: squash, scInfo: squash },
          data: { name: 'Connection', nav: NAV_LIST.products },
          templateUrl: versionURL('/pages/mycj/connection/connection-sourcing.html'),
          controller: 'connection-sourcing.ctrl',
          lazyLoad: transition => {
            const $lazy = transition.injector().get('$ocLazyLoad');
            $lazy.load([
              // versionURL('/static/components/sync_store/sync_store.js'), // 同步商品
              versionURL('/pages/mycj/connection/connection-sourcing.css'),
            ]);
            return import('./connection/connection-sourcing')
              .then(m => $lazy.load(m.connectionSourcingFactory(angular)));
          }
        })
        // 关联搜品 ---- 和上面的一毛一样
        .state('connection-service', {
          url: '/products-connection/service-connection/:searchstr/:scInfo',
          params: { searchstr: squash, scInfo: squash },
          data: { name: 'Connection', nav: NAV_LIST.products },
          templateUrl: versionURL('/pages/mycj/connection/connection-sourcing.html'),
          controller: 'connection-sourcing.ctrl',
          lazyLoad: transition => {
            const $lazy = transition.injector().get('$ocLazyLoad');
            $lazy.load([
              // versionURL('/static/components/sync_store/sync_store.js'), // 同步商品
              versionURL('/pages/mycj/connection/connection-sourcing.css'),
            ]);
            return import('./connection/connection-sourcing')
              .then(m => $lazy.load(m.connectionSourcingFactory(angular)));
          }
        })
        // 关联包装
        .state('relevant-packaging', {
          url: '/relevant-packaging/:itemData/:type/:ids',
          // data: { name: 'Connection' }, 两个同时高亮 BUG
          params: { itemData: squash, type: squash, ids: squash },
          templateUrl: versionURL('/pages/mycj/connection/relevant-packaging.html'),
          controller: 'relevant-packaging.ctrl',
          lazyLoad: transition => {
            const $lazy = transition.injector().get('$ocLazyLoad');
            $lazy.load(versionURL('/pages/mycj/connection/relevant-packaging.css'));
            return import('./connection/relevant-packaging')
              .then(m => $lazy.load(m.relevantPackagingFactory(angular)));
          }
        })
        // 刊登记录
        .state('mycj-listed', {
          url: '/products-connection/history/:status?track',
          params: { status: squash },
          data: { name: 'Listed', nav: NAV_LIST.products },
          templateUrl: versionURL('/pages/mycj/listed/listed.html'),
          controller: 'mycj-listed.ctrl',
          lazyLoad: transition => {
            const $lazy = transition.injector().get('$ocLazyLoad');
            $lazy.load([
              // versionURL('/static/components/ship_caculate/ship_caculate.js'), // 运费试算
              versionURL('/pages/mycj/listed/listed.css'),
              versionURL('/static/components/shopify_collections/shopify_collections.js'), // shopify collection
              versionURL('/static/components/shopify_collections/shopify_collections.css'),
            ]);
            return import('./listed/listed')
              .then(m => $lazy.load(m.listedFactory(angular)));
          }
        })
        .state('sku-list', {
          url: '/products-connection/SKUlist',
          data: { name: 'SKU List', nav: NAV_LIST.products },
          templateUrl: versionURL('/pages/mycj/sku-list/sku-list.html'),
          controller: 'mycj-sku-list.ctrl',
          lazyLoad: transition => {
            const $lazy = transition.injector().get('$ocLazyLoad');
            $lazy.load([
              // versionURL('/static/components/ship_caculate/ship_caculate.js'), // 运费试算
              // versionURL('/static/components/ship_setting/ship_setting.js'), // 物流设置
              versionURL('/pages/mycj/sku-list/sku-list.css'),
            ]);
            return import('./sku-list/sku-list')
              .then(m => $lazy.load(m.skuListFactory(angular)));
          }
        })
        // 服务商品
        .state('service-product', {
          url: '/products-connection/service',
          data: { name: 'Service Products', child: 'Service Product List', nav: NAV_LIST.products },
          templateUrl: versionURL('/pages/mycj/service-product/service-product.html'),
          controller: 'service-product.ctrl',
          lazyLoad: transition => {
            const $lazy = transition.injector().get('$ocLazyLoad');
            $lazy.load([
              versionURL('/pages/mycj/service-product/service-product.css'),
              // versionURL('/static/components/ship_caculate/ship_caculate.js'), // 运费试算
              // versionURL('/static/components/ship_setting/ship_setting.js'), // 物流设置
            ]);
            return import('./service-product/service-product')
              .then(m => $lazy.load(m.serviceProductFactory(angular)));
          }
        })
        // 服务商品-products
        .state('service-product-products', {
          url: '/products-connection/goods',
          data: { name: 'Service Products', child: 'Products', nav: NAV_LIST.products },
          templateUrl: versionURL('/pages/mycj/service-product/products.html'),
          controller: 'service-product-products.ctrl',
          lazyLoad: transition => {
            const $lazy = transition.injector().get('$ocLazyLoad');
            $lazy.load([
              versionURL('/pages/mycj/service-product/products.css'),
            ]);
            return import('./service-product/products')
              .then(m => $lazy.load(m.serviceProductProductsFactory(angular)));
          }
        })
        // 服务商品-运单
        .state('service-product-shipment', {
          url: '/products-connection/waybill',
          data: { name: 'Service Products', child: 'Shipment', nav: NAV_LIST.products },
          templateUrl: versionURL('/pages/mycj/service-product/shipment.html'),
          controller: 'service-product-shipment.ctrl',
          lazyLoad: transition => {
            const $lazy = transition.injector().get('$ocLazyLoad');
            $lazy.load([
              versionURL('/pages/mycj/service-product/shipment.css'),
            ]);
            return import('./service-product/shipment')
              .then(m => $lazy.load(m.serviceProductShipmentFactory(angular)));
          }
        })
        /**** Products **** end ****/

        /**** Print on Demand **** start ****/
        // 定制商品-buyer design
        .state('pod-buyer-design', {
          url: '/pod/buyer-design',
          data: { name: `Buyer's Design`, nav: NAV_LIST.pod },
          templateUrl: versionURL('/pages/mycj/pod/buyers-design.html'),
          controller: 'pod-buyers-design.ctrl',
          lazyLoad: transition => {
            const $lazy = transition.injector().get('$ocLazyLoad');
            $lazy.load([
              versionURL('/pages/mycj/pod/buyers-design.css'),
              // versionURL('/static/components/ship_caculate/ship_caculate.js'), // 运费试算
            ]);
            return import('./pod/buyers-design')
              .then(m => $lazy.load(m.podBuyersDesignFactory(angular)));
          }
        })
        // 定制商品-design myself
        .state('pod-design-myself', {
          url: '/pod/design-myself/:opencart',
          data: { name: 'Design Myself', nav: NAV_LIST.pod },
          params: { opencart: squash },
          templateUrl: versionURL('/pages/mycj/pod/design-myself.html'),
          controller: 'pod-design-myself.ctrl',
          lazyLoad: transition => {
            // wangEditor
            const $lazy = transition.injector().get('$ocLazyLoad');
            $lazy.load([
              versionURL('/pages/mycj/pod/design-myself.css'),
              versionURL('/pages/mycj/pod/pod.css'),
              // versionURL('/static/components/ship_caculate/ship_caculate.js'), // 运费试算
              // 设计弹框
              versionURL('/static/components/design_frame/design_frame.js'),
              versionURL('/static/components/design_frame2/design_frame.js'),
              '/static/components/design_frame2/fabric.min.js', // canvas 操作工具
            ]);
            return import('./pod/design-myself')
              .then(m => $lazy.load(m.podDesignMyselfFactory(angular)));
          }
        })
        /**** Print on Demand **** end ****/

        /**** Authorization **** strt ****/
        .state('authorize', {
          url: '/authorize/:type?track&storeName',
          params: { 
            type: squash
          },
          data: {
            names: {
              '/authorize': 'Shopify',
              '/authorize/Shopify': 'Shopify',
              '/authorize/Ebay': 'eBay',
              '/authorize/Woocommerce': 'Woocommerce',
              '/authorize/Shipstation': 'ShipStation',
              '/authorize/Wix': 'Wix',
              '/authorize/API': 'API',
              '/authorize/Lazada': 'Lazada',
              '/authorize/Shopee': 'Shopee',
              // '/authorize/Etsy': 'Etsy',
              '/authorize/Wix': 'Wix'
            },
            nav: NAV_LIST.authorize
          },
          templateUrl: versionURL('/pages/mycj/authorize/authorize.html'),
          controller: 'authorize.ctrl',
          lazyLoad: transition => {
            const $lazy = transition.injector().get('$ocLazyLoad');
            $lazy.load([
              versionURL('/pages/mycj/authorize/authorize.css'),
              versionURL('/pages/mycj/pod/pod.css'),
              // versionURL('/static/components/store_ship_setting/store_ship_setting.js'), // 店铺授权页物流设置
              // versionURL('/static/components/store_ship_setting/store_ship_setting.css'), // 店铺授权页物流设置
            ]);
            return import('./authorize/authorize')
              .then(m => $lazy.load(m.authorizeFactory(angular)));
          }
        })
        .state('apikey', {
          url: '/apikey',
          data: { name: 'API', nav: NAV_LIST.authorize },
          templateUrl: versionURL('/pages/mycj/authorize/apikey.html'),
          controller: 'apikey.ctrl',
          lazyLoad: transition => {
            const $lazy = transition.injector().get('$ocLazyLoad');
            $lazy.load(versionURL('/pages/mycj/authorize/apikey.css'));
            return import('./authorize/apikey')
              .then(m => $lazy.load(m.apikeyFactory(angular)));
          }
        })
        /**** Authorization **** end ****/

        /**** 头部导航 **** start ****/
        // 个人中心
        .state('profile', {
          url: '/profile/:type',
          params: { type: squash },
          templateUrl: versionURL('/pages/mycj/profile/profile.html'),
          controller: 'mycj-profile.ctrl',
          lazyLoad: transition => {
            const $lazy = transition.injector().get('$ocLazyLoad');
            $lazy.load([
              versionURL('/static/css/myCJAddressManage.css'),
              versionURL('/pages/mycj/profile/profile.css'),
            ]);
            return import('./profile/profile')
              .then(m => $lazy.load(m.profileFactory(angular)));
          }
        })
        // 钱包
        // .state('myCJWallet', {
        //   url: '/myCJWallet',
        //   templateUrl: versionURL('/pages/mycj/wallet/wallet.html'),
        //   controller: 'mycj-wallet.ctrl',
        //   lazyLoad: transition => {
        //     const $lazy = transition.injector().get('$ocLazyLoad');
        //     $lazy.load([
        //       versionURL('/pages/mycj/wallet/wallet.css'),
        //     ]);
        //     return import('./wallet/wallet')
        //       .then(m => $lazy.load(m.walletFactory(angular)));
        //   }
        // })
        .state('myCJnewWallet', {
          url: '/myCJWallet/:id/:tag',
          params: { tag: squash, id: squash },     // 重定向回掉参数   id-金额、币种  tag-returnid
          templateUrl: versionURL('/pages/mycj/wallet/newWallet.html'),
          controller: 'mycj-new-wallet.ctrl',
          lazyLoad: transition => {
            const $lazy = transition.injector().get('$ocLazyLoad');
            $lazy.load([
              versionURL('/pages/mycj/wallet/newWallet.css'),
            ]);
            return import('./wallet/newWallet')
              .then(m => $lazy.load(m.newWalletFactory(angular)));
          }
        })
        // 运费试算
        .state('shipping-calculation', {
          url: '/myCJShippingCalculation',
          templateUrl: versionURL('/pages/mycj/shipping-calculation/shipping-calculation.html'),
          controller: 'shipping-calculation.ctrl',
          lazyLoad: transition => {
            const $lazy = transition.injector().get('$ocLazyLoad');
            $lazy.load([
              versionURL('/pages/mycj/shipping-calculation/shipping-calculation.css'),
            ]);
            return import('./shipping-calculation/shipping-calculation')
              .then(m => $lazy.load(m.shippingCalculationFactory(angular)));
          }
        })
        // ticketList
        .state('ticket-list', {
          url: '/ticketList?track',
          templateUrl: versionURL('/pages/mycj/ticket/ticket-list.html'),
          controller: 'ticket-list.ctrl',
          lazyLoad: transition => {
            const $lazy = transition.injector().get('$ocLazyLoad');
            $lazy.load([
              versionURL('/static/css/home-common.css'),
              versionURL('/pages/mycj/mycj-common.css'),
              versionURL('/pages/mycj/ticket/ticket-list.css'),
            ]);
            return import('./ticket/ticket-list')
              .then(m => $lazy.load(m.ticketListFactory(angular)));
          }
        })
        // ticketList - add
        .state('ticket-add', {
          url: '/addTicket',
          templateUrl: versionURL('/pages/mycj/ticket/ticket-add.html'),
          controller: 'ticket-add.ctrl',
          lazyLoad: transition => {
            const $lazy = transition.injector().get('$ocLazyLoad');
            $lazy.load([
              versionURL('/static/css/home-common.css'),
              versionURL('/pages/mycj/mycj-common.css'),
              versionURL('/pages/mycj/ticket/ticket-list.css'),
              versionURL('/pages/mycj/ticket/ticket-add.css'),
            ]);
            return import('./ticket/ticket-add')
              .then(m => $lazy.load(m.ticketAddFactory(angular)));
          }
        })
        // 系统消息 所有消息
        .state('system-message-all', {
          url: '/all-message/:id',
          templateUrl: versionURL('/pages/mycj/system-message/msg-all.html'),
          controller: 'system-message-all.ctrl',
          lazyLoad: transition => {
            const $lazy = transition.injector().get('$ocLazyLoad');
            $lazy.load([
              versionURL('/pages/mycj/system-message/msg-all.css'),
            ]);
            return import('./system-message/message.module')
              .then(m => $lazy.load(m.messageFactory(angular)));
          }
        })
        // 系统消息 消息详情
        .state('message-list', {
          url: '/message-list/:mid',
          templateUrl: versionURL('/pages/mycj/system-message/msg-list.html'),
          controller: 'system-message-list.ctrl',
          lazyLoad: transition => {
            const $lazy = transition.injector().get('$ocLazyLoad');
            $lazy.load(versionURL('/pages/mycj/system-message/msg-list.css'));
            return import('./system-message/message.module')
              .then(m => $lazy.load(m.messageFactory(angular)));
          }
        })
        // 账号管理
        .state('accountManage', {
          url: '/accountManage',
          params: { type: squash },
          templateUrl: versionURL('/pages/mycj/accountManage/accountManage.html'),
          controller: 'mycj-accountManage.ctrl',
          lazyLoad: transition => {
            const $lazy = transition.injector().get('$ocLazyLoad');
            $lazy.load([
              versionURL('/pages/mycj/accountManage/accountManage.css'),
            ]);
            return import('./accountManage/accountManage')
              .then(m => $lazy.load(m.accountManageFactory(angular)));
          }
        })

         // 预警
         .state('warningSet', {
          url: '/warning_set',
          params: { type: squash },
          templateUrl: versionURL('/pages/mycj/warningSet/warningSet.html'),
          controller: 'mycj-warningSet.ctrl',
          lazyLoad: transition => {
            const $lazy = transition.injector().get('$ocLazyLoad');
            $lazy.load([
              versionURL('/pages/mycj/warningSet/warningSet.css'),
            ]);
            return import('./warningSet/warningSet')
              .then(m => $lazy.load(m.warningSetFactory(angular)));
          }
        })
   
  
        /**** 头部导航 **** end ****/
        /** 没有权限 */
        .state('noPower', {
          url: '/noPower',
          templateUrl: versionURL('/pages/mycj/noPower/noPower.html'),
          data: { type: 'noPower' },
        })
        .state('404', {
          url: '/404',
          templateUrl: versionURL('/pages/mycj/404/404.html'),
        });
    }])
    .run(['$rootScope', '$state', '$timeout', 'dsp', 'utils', '$location', runCallback]);
}

// https://stackoverflow.com/questions/21867569/how-to-watch-state-change-of-stateprovider-in-angularjs
function runCallback($rootScope, $state, $timeout, dsp, utils, $location) {
  $rootScope.$on('$locationChangeStart', function (evt, next, current) {
    if (!dsp.isInLoginState()) {
      location.href = 'login.html?target=' + $rootScope.base64.encode(location.pathname + location.hash);
      return;
    }
  });
  let t = null;
  const watchCb = () => {
    if(location.href.indexOf('#/payment') === -1) sessionStorage.setItem('newpay', '1');;//旧版支付默认1
    if (t) return;
    t = $timeout(() => {
      
      t = null;
      // $state.$current.data 对应路由配置中的 data
      const allMenu = localStorage.getItem('AllPowerMenu') ? utils.JSONparse($rootScope.base64.decode(localStorage.getItem('AllPowerMenu'))) : []
      const powerMenu = localStorage.getItem('PowerMenu') ? utils.JSONparse($rootScope.base64.decode(localStorage.getItem('PowerMenu'))) : []
      if ($state.current.name && allMenu.includes(`#${$state.current.url}`) && !powerMenu.includes(`#${$state.current.url}`)) {
        $rootScope.$emit('old-url-change', $state.current.data || {})
        location.href = `#/noPower`
        return
      } else if (
        $state.current.name && allMenu.length > 0
        && $state.current.name === "authorize"
        && !powerMenu.includes(`#${$location.url() === '/authorize' ? '/authorize/Shopify' : $location.url()}`)) {
        $rootScope.$emit('old-url-change', $state.current.data || {})
        location.href = `#/noPower`
        return
      } else if ($state.current.name && allMenu.length > 0
        && ($state.current.name === 'service-product-products' || $state.current.name === 'service-product-shipment')
        && !powerMenu.includes(`#/products-connection/service`)
      ) {
        $rootScope.$emit('old-url-change', $state.current.data || {})
        location.href = `#/noPower`
        return
      } else {
        $rootScope.$emit('on-url-changed', $state.$current.data || {});
      }
    }, 14);
  };

  $rootScope.$on('$locationChangeSuccess', watchCb);      // for watch params change.
  $rootScope.$watch(() => $state.$current.data, watchCb); // for watch url change.

}
