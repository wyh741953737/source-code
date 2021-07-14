import { mycjRouter } from "./mycj.router";
import { mycjController } from "./mycj.controller";
import { loadingCartFactory } from "@src/components/loading/loading-cart";
import { loadingBounceFactory } from "@src/components/loading/bounce";
import { skeletonCardFactory } from "@src/components/loading/skeleton-card";
import { notDataFactory } from "@src/components/not-found/not-data";
import { mycjHeaderFactory } from "@src/components/mycj-header/mycj-header";
import { leftBarFactory } from "@src/components/mycj-leftbar/leftbar";
import { commonFooterFactory } from "@src/components/common-footer/common-footer";
import { paginationFactory } from "@src/components/pagination/page";
import { orderInfoFactory } from "@src/provider/order-infro";
import { filterFactory } from "@src/provider/filter";
import { disputeBtnFactory } from "@src/components/dispute/dispute";
import { copyOrdFactory } from "@src/components/copy-ord/copy";
import { addAddressFactory } from "@src/components/add-address/add-address";
import { popUpsFactory } from "@src/components/pop-ups/pop-ups";
import { rateFactory } from "@src/components/rate/rate";
import { progressBarFactory } from "@src/components/progress-bar/progress-bar";
import { progressCircleFactory } from "@src/components/progressCircle/progressCircle";
import { shipCostFactory } from "@src/components/ship-cost/ship-cost"
import { vipInfoPopup } from "@src/components/vipInfoPopup/vipInfoPopup";
import { tipsFactory } from "@src/components/tips/tips";
import { tooltipFactory } from "@src/components/tooltip/tooltip";
import { stockoutNoticeFactory } from "@src/components/stockout-notice/stockoutNotice"
import { profileInfoFactory } from "@src/pages/mycj/profile/info/info.js"
import { profileAddressFactory } from "@src/pages/mycj/profile/address/address.js"
import { profileInvioceFactory } from "@src/pages/mycj/profile/invoice/invoice.js"
import { profileEmailFactory } from "@src/pages/mycj/profile/email/email.js"
import { profilePasswordFactory } from "@src/pages/mycj/profile/password/password.js"
import { profileIossFactory } from '@src/pages/mycj/profile/ioss/ioss.js'
import { versionControlFactory } from "@src/components/versionControl/index";
import { bundleProducts } from "@src/components/bundle-products/bundle-products.js"
import { editIoss } from "@src/components/edit-ioss/edit-ioss.js"
import {sendTicketModalFactory} from '@src/components/sendTicketModal/index.js'
import {ticketDetailModalFactory} from '@src/components/ticketDetailModal/index.js'
import { reAuthorizeFactory } from "@src/components/re-authorize/re-authorize.js"

import {profileSecurityRouteFactory} from '@src/pages/mycj/profile/securityRoute/securityRoute.js'
import { closeOrderModalFactory } from '@src/components/closeOrderModal/closeOrderModal'
// import { utilsFactory } from '@src/provider/utils';

// 创建模块
const mycjModule = angular.module("mycj.module", [
  "ui.router",
  "oc.lazyLoad",
  "service", // common.js
  "cjCompnentModule", // 公共模块，给零散的service、component、filter等体统寄宿
  "wui.date", // 日期插件
  "enum"
  // "ui.router.state.events"
]);

// loading 组件-购物车
loadingCartFactory(mycjModule);

// loading 组件-bounce
loadingBounceFactory(mycjModule);

// loading 组件-骨架图
skeletonCardFactory(mycjModule);

// 没找到数据组件
notDataFactory(mycjModule);

// 头部组件
mycjHeaderFactory(mycjModule);

// 左侧栏组件
leftBarFactory(mycjModule);

// 公共底部组件
commonFooterFactory(mycjModule);

// 分页器
paginationFactory(mycjModule);

// 本地数据中转
orderInfoFactory(mycjModule);

// 过滤器
filterFactory(mycjModule);

// 添加地址
addAddressFactory(mycjModule);

// 弹窗组件
popUpsFactory(mycjModule);
// 提交工单
sendTicketModalFactory(mycjModule);

// 工单详情
ticketDetailModalFactory(mycjModule);
// 评分组件
rateFactory(mycjModule);

// 同步进度条组件
progressBarFactory(mycjModule);

// 圆形进度条
progressCircleFactory(mycjModule);

// 运费计算组件
shipCostFactory(mycjModule);

// vip等级权限说明
vipInfoPopup(mycjModule);

// 提示
tipsFactory(mycjModule);

// 文字提示
tooltipFactory(mycjModule)
// 工具类
// utilsFactory(mycjModule); 加载会报错，暂时没搞定[19-12-28]

// 创建控制器
mycjController(mycjModule, angular);

// 启动路由
mycjRouter(mycjModule, angular);

// 纠纷申请
disputeBtnFactory(mycjModule);

// tips

// 复制订单
copyOrdFactory(mycjModule);
//缺货 信息展示 组件
stockoutNoticeFactory(mycjModule);

//个人中心信息组件
profileInfoFactory(mycjModule)
//个人中心地址管理
profileAddressFactory(mycjModule)
//个人中心发票管理
profileInvioceFactory(mycjModule)
//个人中心邮件接收设置
profileEmailFactory(mycjModule)
//个人中心安全设置
profilePasswordFactory(mycjModule)
// IOSS 设置
profileIossFactory(mycjModule)

// 新老版本切换控制
versionControlFactory(mycjModule)
//组合商品弹窗
bundleProducts(mycjModule)
// ioss弹窗
editIoss(mycjModule)
//授权token过期弹窗
reAuthorizeFactory(mycjModule)

profileSecurityRouteFactory(mycjModule)
// 关闭老页面订单页面提示弹窗
closeOrderModalFactory(mycjModule)
// 延迟加载js
function loadScripts() {
  const arr = [
    // rsa
    // "https://cdn.jsdelivr.net/npm/jsencrypt@3.0.0-rc.1/bin/jsencrypt.min.js",

    // A client-side JavaScript SDK for authenticating with OAuth2 ===> http://adodson.com/hello.js/
    // "https://cdn.jsdelivr.net/npm/hellojs@1.18.1/dist/hello.all.min.js",

    // 百度 echarts 图表
    // '/static/js/public/echarts.common.min.js', // 730kb

    // aliyun 播放器
    // 'https://g.alicdn.com/de/prismplayer/2.8.1/aliplayer-min.js',

    // wangEditor 编辑器
    // '/static/js/public/wangEditor.min.js', // 已经放到首页加载
  ];

  arr.forEach(function(src) {
    const script = document.createElement('script');
    script.async = 'async';
    script.src = src;
    script.onload = function() {
      const temp = src.split('/');
      window.dispatchEvent(new CustomEvent('load-script', {
        detail: { src, name: temp[temp.length - 1], },
      }));
    };
    document.body.appendChild(script);
  });
}

// 延迟加载style
function loadStyles() {
  const arr = [
    // aliyun 播放器
    // 'https://g.alicdn.com/de/prismplayer/2.8.1/skins/default/aliplayer-min.css',

    // wangEditor 编辑器
    // '/static/css/wangEditor.min.css',
  ];

  arr.forEach(function(href) {
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = href;
    document.head.appendChild(linkElement);
  });
}

window.addEventListener('load', function() {
  this.setTimeout(function() {
    document.body.removeChild(document.getElementById('loading-pending')); // 移除 pending 动画
    loadScripts();
    loadStyles();
  }, 0);
});

