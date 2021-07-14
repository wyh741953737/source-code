(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('i18next')) :
  typeof define === 'function' && define.amd ? define(['i18next'], factory) :
  (global = global || self, factory(global.i18next));
}(this, (function (i18next) { 'use strict';

  i18next = i18next && Object.prototype.hasOwnProperty.call(i18next, 'default') ? i18next['default'] : i18next;

  // 底部相关链接


  var relatedLinks = function relatedLinks(i18next) {
    return [{
      title: i18next.t('footer-cj-dropshipping'),
      list: [{
        title: i18next.t('footer-our-offers'),
        href: '/ouroffers'
      }, {
        title: i18next.t('footer-overview'),
        href: '/overview'
      }, {
        title: i18next.t('footer-about-us'),
        href: '/aboutus'
      }, {
        title: i18next.t('footer-contact-us'),
        href: '/contactus'
      }, {
        title: i18next.t('footer-user-agreement'),
        href: '/user-agreement'
      }, {
        title: i18next.t('footer-refund-resend-and-returns'),
        href: '/dispute-policy.html'
      }, {
        title: i18next.t('footer-privacy-policy'),
        href: '/privacyPolicy'
      }, {
        title: i18next.t('footer-payment-methods'),
        href: '/article-details/112'
      }, {
        title: i18next.t('footer-api'),
        href: 'https://developers.cjdropshipping.com/'
      }]
    }, {
      title: i18next.t('footer-fulfillment'),
      list: [{
        title: i18next.t('footer-tracking-orders'),
        href: 'https://cjpacket.com/'
      }, {
        title: i18next.t('footer-shipping-cost-and-delivery-time'),
        href: '/calculation.html'
      }, {
        title: i18next.t('footer-bulk-purchase'),
        href: '/article-details/19'
      }, {
        title: i18next.t('footer-print-on-demand'),
        href: '/printonDemand/home'
      }, {
        title: i18next.t('footer-custom-packaging'),
        href: '/article-details/1349967944867778560'
      }, {
        title: i18next.t('footer-fulfillment-by-cj'),
        href: '/article-details/61'
      }, {
        title: i18next.t('footer-fulfillment-fees'),
        href: '/service-fee'
      }, {
        title: i18next.t('footer-quality-inspection'),
        href: '/article-details/118'
      }]
    }, [[{
      title: i18next.t('footer-programs'),
      list: [{
        title: i18next.t('footer-cod'),
        href: 'https://cod.cjdropshipping.com/'
      }, {
        title: i18next.t('footer-cj-supplier'),
        href: 'https://suppliers.cjdropshipping.cn/'
      }, {
        title: i18next.t('footer-affiliate'),
        href: 'https://affiliate.cjdropshipping.com/'
      }, {
        title: i18next.t('footer-cj-school'),
        href: 'https://cjdropship.com/'
      }]
    }, {
      title: i18next.t('footer-resources'),
      list: [{
        title: i18next.t('footer-product-reports'),
        href: '/productReport/list'
      }, {
        title: i18next.t('footer-academy'),
        href: 'https://academy.cjdropshipping.com/'
      }, {
        title: i18next.t('footer-blog'),
        href: 'https://blog.cjdropshipping.com/'
      }]
    }], [{
      title: i18next.t('footer-features'),
      list: [{
        title: i18next.t('footer-product-sourcing-requests'),
        href: '/sourcing'
      }, {
        title: i18next.t('footer-branding'),
        href: 'https://branding.cjdropshipping.com/'
      }, {
        title: i18next.t('footer-global-warehouses'),
        href: '/global-warehouses'
      }, {
        title: i18next.t('footer-google-chrome-extension'),
        href: 'https://chrome.google.com/webstore/detail/cjdropshipping/mbndljkgaoailfnpeodnlejigmkdpokb'
      }, {
        title: i18next.t('footer-product-photography'),
        href: 'https://cjdropship.com/video-for-winning-products/'
      }]
    }, {
      title: i18next.t('footer-support'),
      list: [{
        title: i18next.t('footer-24/7-support'),
        href: 'https://chat.cjdropshipping.com'
      }, {
        title: i18next.t('footer-help-center'),
        href: '/help-center'
      }, {
        title: i18next.t('footer-ticket'),
        href: '/myCJ.html#/ticketList?track=8'
      }, {
        title: i18next.t('footer-elites'),
        href: 'https://elites.cjdropshipping.com'
      }]
    }]]];
  };

  var relatedLinks_1 = {
    relatedLinks: relatedLinks
  };

  var relatedLinks$1 = relatedLinks_1.relatedLinks; //底部链接

  new Vue({
    el: '#vue-related-links',
    beforeCreate: function beforeCreate() {},
    data: {
      relatedLinksList: relatedLinks$1(i18next) || []
    },
    created: function created() {
      console.log(this.relatedLinksList);
    },
    filters: {
      getTitleHref: function getTitleHref(href) {
        var authHref = href.includes('myCJ.html') ? CJ_.authLoginUrl(href) : href;
        return authHref;
      }
    }
  });

})));

//# sourceMappingURL=maps/footer-link.js.map
