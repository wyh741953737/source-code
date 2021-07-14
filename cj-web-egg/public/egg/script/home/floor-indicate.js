import i18next from 'i18next'
// import { animation } from '../global/utils';

// 楼层联动指示
new Vue({
  el: '#vue-floor-indicate',
  data: {
    visible: false,
    indicates: [
      { act: false, icon: 'iconshouyecuxiao1', title: i18next.t('home-cj-super-deals'), floor: 1 },
      { act: false, icon: 'iconshouyeremenchanpin1', title: i18next.t('home-trending-products'), floor: 2 },
      { act: false, icon: 'iconshouyexinpin1', title: i18next.t('home-new-products'), floor: 3 },
      { act: false, icon: 'iconshouyerexiao1', title: i18next.t('home-hot-selling-categories'), floor: 4 },
      // { act: false, icon: 'iconshouyeshangjiashangpin1', title: i18next.t('home-listable-products'), floor: 5 },
      // { act: false, icon: 'iconshouyecangku1', title: i18next.t('home-us-warehouse-&-thai-warehouse'), floor: 6 },
      { act: false, icon: 'iconshouyecangku1', title: i18next.t('home-global-warehouses'), floor: 'global-warehouse' },
      { act: false, icon: 'iconicon-test2', title: i18next.t('home-video-products'), floor: 7 },
      { act: false, icon: 'iconshouyebianjishangpin1', title: i18next.t('common-print-on-demand'), floor: 8 },
      { act: false, icon: 'iconshouyetuijianshangpin1', title: i18next.t('home-recommended-products'), floor: 9 },
      { act: false, icon: 'iconshouyewuliu1', title: i18next.t('home-cjdropshipping'), floor: 10 },
      { act: false, icon: 'iconshouyehezuohuoban', title: i18next.t('home-partnership'), floor: 11 },
      { act: false, icon: 'iconshouyeappxiazai', title: i18next.t('home-cj-app'), floor: 12 },
      { act: false, icon: 'iconshouyepinglun1', title: i18next.t('home-reviews'), floor: 13 },
      { act: false, icon: 'iconbianzu5', cls: 'back-top', },
    ]
  },
  created() {
    window.addEventListener('page-scroll', function (ev) {
      this.scrollHandle(ev.detail);
    }.bind(this));
    this.HEADER_HEIGHT = 78;  // 写死头部高度 - 万圣节修改
    this.BANNER_HEIGHT = 550; // 写死 banner 高度
  },
  methods: {
    clickIndicate(item, idx) {
      let top;
      if (item.cls === 'back-top') {
        top = 0;
      } else {
        top = $(`.floor-${item.floor}`).offset().top - this.HEADER_HEIGHT - parseInt($(`.floor-${item.floor}`).css('marginTop')); //  万圣节修改
      }
      // if (idx == 9 || idx == 10 || idx == 11) {
      //   animation(false)()
      // }
      window.scrollTo({ top, behavior: 'smooth' });
    },
    scrollHandle({ scrollTop }) {
      const OFFSET = 20; // 偏移量
      if (scrollTop > this.HEADER_HEIGHT + this.BANNER_HEIGHT + OFFSET) {
        this.visible = true;
        const arr = [];
        for (let x = 0; x < this.indicates.length-1; x++) {
          const el = $(`.floor-${this.indicates[x].floor}`);
          if (el.length) {
            const top = el.offset().top - this.HEADER_HEIGHT - parseInt(el.css('marginTop')) - 10; // 偏移头部高度
            const tmp = [top, top + el.outerHeight()];
            arr.push(tmp);
          }
        }
        const idx = arr.findIndex(([top, bottom]) => scrollTop > top && scrollTop < bottom);
        this.indicates = this.indicates.map((_, i) => {
          _.act = idx === i;
          return _;
        });
      } else {
        this.visible = false;
      }

    },
  },
});
