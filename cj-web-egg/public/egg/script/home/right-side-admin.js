/**
 * 个人中心 benner 右侧
 */
import loadBounce from '../vue/load-bounce.vue';
import i18next from 'i18next';
import { EXCHANGE_RATE } from '@common/filter';

new Vue({
  el: '#vue-right-side-admin',
  data: {
    logined: CJ_isLogin,
    loading: false,
    userInfo: CJ_userInfo,
    dropInfo: [],
    userLevel: CJ_userInfo.vip === 1 ? 'VIP' : CJ_userInfo.moneyLevel ? `LV${CJ_userInfo.moneyLevel}` : '', //`LV${CJ_userInfo.moneyLevel}`
  },
  components: {
    loadBounce,
  },
  created() {
    // 未登录时候 CJ Admin LOGO
    this.adminIcon = 'https://cc-west-usa.oss-us-west-1.aliyuncs.com/15460992/209159487000.png';

    if (this.logined) {
      this.getDropInfo();
    }
  },
  mounted() {
    window.addEventListener('currency-rate/updated', () => this.$forceUpdate());
  },
  methods: {
    // 获取一些销售金额、钱包、订单信息之类的(接口返回一部分用户信息)
    getDropInfo() {
      const listen = loading => this.loading = loading;
      CJ_.$axios.post('cj/homePage/chaXunYongHuXinXi', {}, listen).then(([err, data]) => {
        if (err) {
          console.warn(err);
          return;
        }
        const [err2, data2] = CJ_.statusCode200(data);
        if (err2) {
          console.warn(err2);
          return;
        }
        this.setDropInfo(data2);
      });
    },
    setDropInfo(info) {
      const arr = [];
      if (info) {
        arr.push({ title: i18next.t('home-sales-amount'), value: info.salesAmount, currency: true });
        arr.push({ title: i18next.t('common-wallet'), value: info.wallet, currency: true, href: 'myCJ.html#/myCJWallet?track=12' });
        arr.push({ title: i18next.t('home-awaiting-payment'), value: info.forPaymentSum, href: '/newmycj/dropshipping/orderManage?active=2' });
        arr.push({ title: i18next.t('home-pending'), value: info.toBeProcessedSum, href: '/newmycj/dropshipping/orderManage?active=3' });
        arr.push({ title: i18next.t('home-processing'), value: info.waitForDeliverySum, href: '/newmycj/dropshipping/orderManage?active=4' });
        arr.push({ title: i18next.t('home-dispatched'), value: info.shippedSum, href: '/newmycj/dropshipping/orderManage?active=5' });
        arr.push({ title: i18next.t('home-completed'), value: info.completedSum, href: '/newmycj/dropshipping/orderManage?active=6' });
        arr.push({ title: i18next.t('home-closed'), value: info.overSum, href: '/newmycj/dropshipping/orderManage?active=7' });
        this.userLevel = info.vip === 1 ? 'VIP' : info.moneyLevel ? `LV${info.moneyLevel}` : '';
        this.userInfo.avatar = info.img === 'https://cc-west-usa.oss-us-west-1.aliyuncs.com/ba627238-87d7-41a9-86f1-960b4cc07ebf.png' ? '' : info.img;
        this.userInfo.name = info.name || '';
        this.userInfo.vip = info.vip || 0;
        const ev = { detail: { img: info.img } }; // 用户头像更新 -- 防止shopfiy登陆过来的拿不到头像
        window.dispatchEvent(new CustomEvent('userInfoUpdateEv', ev));
      }
      this.dropInfo = arr;
    },
    isShow(value) {
      const v = EXCHANGE_RATE(value, undefined, true)
      if (v.includes('M') || v.includes('B')) {
        return true
      }
    }
  },
});