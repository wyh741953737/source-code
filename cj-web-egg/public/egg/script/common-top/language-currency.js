// 语言选择器 -s- https://gtranslate.io/
import i18next from 'i18next';
let vm_language = null;
import { languages } from '@common/config';


function getCookie(c_name) {
  var c_start = document.cookie.indexOf(c_name + "=");
  var c_end;
  if (document.cookie.length > 0)     {
    c_start = document.cookie.indexOf(c_name + "=")           
    if (c_start != -1){ 
      c_start = c_start + c_name.length + 1 
      c_end = document.cookie.indexOf(";", c_start) 
      if (c_end == -1)   
        c_end = document.cookie.length   
        return unescape(document.cookie.substring(c_start, c_end))   
      } 
    } 
  return ''
}
// 点击任意地方关闭货币选择弹窗
function closeLangHandle(ev) {
  const rect = document
    .getElementById('language-suspence')
    .getBoundingClientRect();

  if (
    ev.clientX < rect.x ||
    ev.clientX > rect.x + rect.width ||
    (ev.clientY < rect.y || ev.clientY > rect.y + rect.height)
  ) {
    vm_language.visibleLang = false;
  }
}
function toggleCloseLangHandle(bool) {
  if (bool) {
    document.addEventListener('click', closeLangHandle);
  } else {
    document.removeEventListener('click', closeLangHandle);
  }
}
/**
 * 获取国家、币种信息，每次进入页面同步一次 localStorage
 * @param {Object} options 
 */
function getCountryData(options = {}) {
  // 伸缩性接口：不需要该数据 0 | 需要该数据 1 (自己设计的 😋)
  // 20-04-18
  // 之前过分顾虑流量优化了，然儿大篇幅的代码逻辑，维护复杂
  // 全量接口数据 24kb，不用顾虑流量问题，毕竟写着爽才叫爽
  const defaultOpt = {
    countryList: 1,    // 国家列表
    currency: 1,       // 货币
    currentCountry: 1, // 当前IP国家
    symbol: 1,         // 币种符号
  };
  const params = Object.assign(defaultOpt, options);

  CJ_.$axios.post('cj/homePage/getCountryInfo', params)
    .then(([e, res]) => {
      if (e) {
        console.warn(e);
        return;
      }
      const [err, data] = CJ_.statusCode200(res);
      if (err) {
        console.warn(err);
        return;
      }

      // 首字母排序
      data.symbol = data.symbol.sort((a, b) => a.currency.charCodeAt(0) - b.currency.charCodeAt(0));

      vm_language.currencyList = data.symbol;
      CJ_.store.set('@country/data', data);
    });
}
const defaultCurrency = { 
  symbol: CJ_.store.get('rate_currency-symbol') || "$",
  currency: CJ_.store.get('rate_current-currency') ? CJ_.store.get('rate_current-currency').currency : "USD",
  NAME: CJ_.store.get('rate_current-currency') ? CJ_.store.get('rate_current-currency').NAME : "美元"
}; // 兼容老代码
const defaultLanguage = { opt: "en|en", name: 'English', flag: 'US' };
vm_language = new Vue({
  beforeCreate() {
    // 有些国家国旗木有
    this.flagSrc = item => {
      const tmp = item.flag || item.opt.split('|')[1].toUpperCase();
      return `${PUBLIC_IMG}/home/flag/${tmp}.png`
    };
    this.flagList = [
      { opt: "en|en", name: i18next.t('language-english'), flag: 'US' },
      { opt: "en|af", name: i18next.t('language-afrikaans'), flag: 'ZA' },
      { opt: "en|sq", name: i18next.t('language-albanian'), flag: 'AL' },
      { opt: "en|ar", name: i18next.t('language-arabic'), flag: 'SA' },
      { opt: "en|hy", name: i18next.t('language-armenian'), flag: 'AM' },
      { opt: "en|az", name: i18next.t('language-azerbaijani') },
      { opt: "en|be", name: i18next.t('language-belarusian'), flag: 'BY' },
      { opt: "en|bg", name: i18next.t('language-bulgarian') },
      { opt: "en|zh-CN", name: i18next.t('language-chinese-simplified'), flag: 'CN' },
      { opt: "en|zh-TW", name: i18next.t('language-chinese-traditional'), flag: 'CN' },
      { opt: "en|hr", name: i18next.t('language-croatian') },
      { opt: "en|cs", name: i18next.t('language-czech'), flag: 'CZ' },
      { opt: "en|da", name: i18next.t('language-danish'), flag: 'DK' },
      { opt: "en|nl", name: i18next.t('language-dutch') },
      { opt: "en|et", name: i18next.t('language-estonian'), flag: 'EE' },
      { opt: "en|tl", name: i18next.t('language-filipino'), flag: 'PH' },
      { opt: "en|fi", name: i18next.t('language-finnish') },
      { opt: "en|fr", name: i18next.t('language-french') },
      { opt: "en|ka", name: i18next.t('language-georgian'), flag: 'GE' },
      { opt: "en|de", name: i18next.t('language-german') },
      { opt: "en|el", name: i18next.t('language-greek'), flag: 'GR' },
      { opt: "en|hi", name: i18next.t('language-hindi'), flag: 'HT' },
      { opt: "en|hu", name: i18next.t('language-hungarian') },
      { opt: "en|is", name: i18next.t('language-icelandic') },
      { opt: "en|id", name: i18next.t('language-indonesian') },
      { opt: "en|ga", name: i18next.t('language-irish'), flag: 'IE' },
      { opt: "en|it", name: i18next.t('language-italian') },
      { opt: "en|ja", name: i18next.t('language-japanese'), flag: 'JP' },
      { opt: "en|ko", name: i18next.t('language-korean'), flag: 'KR' },
      { opt: "en|lv", name: i18next.t('language-latvian') },
      { opt: "en|lt", name: i18next.t('language-lithuanian') },
      { opt: "en|mk", name: i18next.t('language-macedonian') },
      { opt: "en|ms", name: i18next.t('language-malay'), flag: 'MY' },
      { opt: "en|mt", name: i18next.t('language-maltese') },
      { opt: "en|no", name: i18next.t('language-norwegian') },
      { opt: "en|pl", name: i18next.t('language-polish') },
      { opt: "en|pt", name: i18next.t('language-portuguese') },
      { opt: "en|ro", name: i18next.t('language-romanian') },
      { opt: "en|ru", name: i18next.t('language-russian') },
      { opt: "en|sr", name: i18next.t('language-serbian'), flag: 'RS' },
      { opt: "en|sk", name: i18next.t('language-slovak') },
      { opt: "en|sl", name: i18next.t('language-slovenian'), flag: 'SI' },
      { opt: "en|es", name: i18next.t('language-spanish') },
      { opt: "en|sw", name: i18next.t('language-swahili'), flag: 'SJ' },
      { opt: "en|sv", name: i18next.t('language-swedish'), flag: 'SE' },
      { opt: "en|th", name: i18next.t('language-thai') },
      { opt: "en|tr", name: i18next.t('language-turkish') },
      { opt: "en|uk", name: i18next.t('language-ukrainian'), flag: 'UA' },
      { opt: "en|ur", name: i18next.t('language-urdu'), flag: 'PK' },
      { opt: "en|vi", name: i18next.t('language-vietnamese'), flag: 'VN' },
      { opt: "en|cy", name: i18next.t('language-welsh'), flag: 'WELSH' },
      { opt: "en|yi", name: i18next.t('language-yiddish'), flag: 'YIDDISH' },
    ];
  },
  el: '#vue-language-flag',
  data: {
    visibleLang: false,
    visibleSelect1: false,
    visibleSelect2: false,
    language: defaultLanguage, // 语言/国旗
    currency: defaultCurrency, // 币种
    currencyList: (CJ_.store.get('@country/data') || {}).symbol, // symbol(带符号)、currency(不带符号)
  },
  created() {
    // const tmp = CJ_.cookieParser(CJ_.$cookie.get('currency'));
    // tmp && (this.currency = tmp); // 同步币种缓存

    // 同步语言缓存
    const currencyLanguage = this.flagList.filter(item => item.opt == (CJ_.store.get('language') || "en|en"));
    this.language = currencyLanguage[0];
    getCountryData();
  },
  computed: {
    flagImg() {
      return this.flagSrc(this.language);
    },
  },
  watch: {
    visibleLang(now, old) {
      toggleCloseLangHandle(now);
      if (!now) {
        this.closeBoth();
      }
    },
    visibleSelect1() {
      this.visibleSelect2 = false;
    },
    visibleSelect2() {
      this.visibleSelect1 = false;
    },
    language() {
      this.visibleLang = false;
    },
    currency() {
      this.visibleLang = false;
    },
  },
  methods: {
    // handlelanguage() {
    //   this.visibleLang = !this.visibleLang;
    //   const box = document.getElementById('language-suspence');
    //   console.log('ssssssssssssssssssssssss', box)
    //   box.style.display = 'block';
    //   box.style.height = '216px';
    //   box.style.transition = '0.5s';
    //   box.style.opacity = 1;
    //   console.log('ggggggggggggggggg', box)
    // },
    clickFlag(item) {
      this.language = item;
      const prevLng = getCookie('lng');
      CJ_.store.set('language', item.opt); // 兼容老代码
      window.doGTranslate && window.doGTranslate(item.opt); // gtranslate 翻译
      // 设置语言到cookie, 并刷新页面
      var raw_lng = item.opt.split('|')[1];
      var _lng = /zh-CN/.test(raw_lng) ? 'zh' : raw_lng;
      console.log('lng__', item.opt);
      document.cookie = `lng=${_lng}; path=/; expires=Fri, 31 Dec 2030 23:59:59 GMT; domain=${__root__domain}`;
      // 不设置子域，避免从其它页返回后存在两个同值cookie
      //document.cookie = `lng=${_lng}; expires=Fri, 31 Dec 2030 23:59:59 GMT`;
      // 机翻语种间不刷新
      if (languages.includes(_lng) || (languages.includes(prevLng) && !languages.includes(_lng))) {
        location.reload()
      }
    },
    clickCurrency(item) {
      CJ_.store.set('rate_current-country', {
        currency: item.currency,
        NAME: item.NAME,
        ID: this.language.flag
      }); // 兼容老代码
      CJ_.store.set('rate_current-currency', {
        currency: item.currency,
        NAME: item.NAME
      }); // 兼容老代码
      CJ_.store.set('rate_currency-symbol', item.symbol); // 兼容老代码
      this.currency = item;
      item.ID = this.language.flag;
      const ev = { detail: item };
      window.dispatchEvent(new CustomEvent('currency-rate/set', ev));
    },
    clickSuspence() {
      this.closeBoth();
    },
    closeBoth() {
      this.visibleSelect1 = false;
      this.visibleSelect2 = false;
    },
    clickSelectBox1() {
      this.visibleSelect1 = !this.visibleSelect1;
    },
    clickSelectBox2() {
      this.visibleSelect2 = !this.visibleSelect2;
    },
    clickConfirm() {
      this.visibleLang = false;
    },
  },
});
// 语言选择器 -e-
