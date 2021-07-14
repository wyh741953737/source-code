/**
 * 页面加载后一些全局事件
 */
import $cookie from 'js-cookie';
import { throttle, getTopDomain, store } from './utils'
import utils from '@common/utils';

const $post = utils.axiosEnhance(new utils.Axios({ method: 'POST' }));
const { cookieParser, cookieGenerator, statusCode200 } = utils;

/**
 * 页面滚动监听
 */
$(document).scroll(throttle(function () {
  const scrollTop = $(document).scrollTop();
  const ev = { detail: { scrollTop } };
  window.dispatchEvent(new CustomEvent('page-scroll', ev));
}, 19));

/**
 * 获取汇率，设置 cookie
 */
function getCurrencyRateToCookie(opt) {
  $post('cj/homePage/exchangeRate', { toCode: opt.currency })
    .then(([e, res]) => {
      if (e) {
        console.warn(e);
        return;
      }
      const [err, rate] = statusCode200(res);
      if (err) {
        console.warn(err);
        return;
      }
      const ev = { detail: Object.assign(opt, { rate }) };
      CJ_.store.set('rate_exchange-rate', rate); // 兼容老代码
      const domain = getTopDomain(); //--顶级域名获取方法有问题 暂不加到顶级域名
      const value = cookieGenerator(Object.assign(opt, { rate }));
      // 因为数据可能要同步给服务端，所以用 cookie 储存
      console.log('domain',domain)
      window.NODE_ENV == 'development' || window.NODE_ENV == 'test'
      ? $cookie.set('currency', value, { expires: 3, domain: __root__domain })
      : $cookie.set('currency', value, { expires: 3, domain: __root__domain });
      // --兼用blog页
      window.NODE_ENV == 'development' || window.NODE_ENV == 'test'
      ? $cookie.set('currency_notindex', encodeURIComponent(value), { expires: 3, domain: __root__domain })
      : $cookie.set('currency_notindex', encodeURIComponent(value), { expires: 3, domain: __root__domain });
      
      window.dispatchEvent(new CustomEvent('currency-rate/updated', ev));
      window.dispatchEvent(new CustomEvent('currency-rate/setSwiper', ev));
    });
}
// 监听切换币种，更新汇率
window.addEventListener('currency-rate/set', ev => {
  getCurrencyRateToCookie(ev.detail);
});
// 加载页面后，根据 cookie 缓存更新汇率
// -- 通过cookie同步币种信息-域名切换 -start
const currency_notindex = cookieParser($cookie.get('currency_notindex')); 
console.log('currency_notindex',currency_notindex)
if(currency_notindex) {
  store.set('rate_current-country', {
    currency: currency_notindex.currency,
    NAME: currency_notindex.NAME,
    ID: currency_notindex.ID
  }); // 兼容老代码
  store.set('rate_current-currency', {
    currency: currency_notindex.currency,
    NAME: currency_notindex.NAME
  }); // 兼容老代码
  store.set('rate_currency-symbol', currency_notindex.symbol); // 兼容老代码
}
// -- 通过cookie同步币种信息-域名切换 -end

const currency = {
  symbol: store.get('rate_currency-symbol') || "$",
  currency: store.get('rate_current-currency') ? store.get('rate_current-currency').currency : "USD",
  NAME: store.get('rate_current-currency') ? store.get('rate_current-currency').NAME : "美元",
  ID: store.get('rate_current-country') ? store.get('rate_current-country').ID : "US",
}; // 兼容老代码
if (currency) {
  //  const tmp = cookieParser(currency);
  const tmp = currency; // 兼容老代码
  if (tmp) {
    getCurrencyRateToCookie(tmp);
  }
}