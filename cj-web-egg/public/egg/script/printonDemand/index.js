import productCard from '../vue/product-card.vue';
import loadBounce from '../vue/load-bounce.vue';
// import trendingSwiper from '../vue/pod-trending-swiper.vue';
import { addChatOrGuidJs } from "../vue/mixin";
let addChatOrGuidJsMixin = new addChatOrGuidJs({})

new Vue({
  el: "#vue-pod-hotSelling",
  mixins: [addChatOrGuidJsMixin],
  components: {
    productCard,
    loadBounce,
  },
  beforeCreate() {
  },
  data: {
    loading: false,
    disable: false,
    list: [],
    trendingList: [],
    imgSize: [258, 258],
    logined: CJ_isLogin
  },
  created() {
    let url = 'cj/podProduct/getList'
    this.getList(url)

    try {
      const flowId = CJ_.getQueryVariable('flowId');
      const flowIdLocalstorage = localStorage.getItem('flowId');

      if(flowId || flowIdLocalstorage) {
        localStorage.setItem('flowId', flowId || flowIdLocalstorage);
        const params = {
          flowId: flowId || flowIdLocalstorage
        }
        CJ_.$axios.post('app/account/addClickCount', params).then(([err, res]) => {});
      }
    } catch(err) {
      console.log('输入flowId报错');
    }
  },
  methods: {
    // 获取列表
    getList(url, params) {
      const listen = loading => this.loading = loading
      CJ_.$axios.post(url, params, listen)
        .then(([err, res]) => {
          if (err) return console.warn(err)

          const [e, d] = CJ_.statusCode200(res)
          if (e) return console.warn(e)
          if (Array.isArray(d)) {
            this.list = d.map(item => {
              return {
                id: item.productId,
                productId: item.productId,
                isCollect: item.isCollect || 0,
                num: item.num,
                nameVal: item.nameEn,
                nameEn: item.nameEn,
                sellPrice: item.sellPrice,
                authorityStatus: 0,
                bigImg: item.bigImg,
                flag: 1,
                isPersonalized: 1
              }
            }).filter((item,i) => {
              if(i > 2 && i<=11 && item.productId) {
                return item
              }
            })
          }
        })

    }
  }
});

new Vue({
  el: "#vue-pod-trending",
  components: {
    productCard,
  },
  beforeCreate() {
  },
  data: {
    trendingList: [],
    slidesPerGroup: 6,
    imgSize: [188, 188],
    slideStyles: {
      width: '100%'
    },
    wrapperStyles: {},
    pageNum: 1
  },
  created() {
    // 轮播
    this.slideStyles = {
      ...this.slideStyles,
      width: 100 / this.slidesPerGroup + '%',
    }
    // end轮播
    let url = "cj/podProduct/getIndividuationProductList";
    this.getList(url);
  },
  methods: {
    getList(url) {
      const listen = (loading) => (this.loading = loading);
      // 获取pod12个类目
      CJ_.$axios.post('cj/individuationProduct/getIndividuationCategoryInfo', {categoryID: ''}, listen).then(([err, res]) => {
        if (err) return console.warn(err);
        const [e, d] = CJ_.statusCode200(res);
        if (e) return console.warn(e);
        const params = []
        for (let i = 0; i < 12; i++) {
          params.push(d[i].ID);
        }
        console.log(params);
        // 获得前12个性商品
        CJ_.$axios.post(url, {categoryIdList: params}, listen).then(([err, res]) => {
          if (err) return console.warn(err);
          const [e, d] = CJ_.statusCode200(res);
          if (e) return console.warn(e);
          this.trendingList = d.map(item => {
            return {
              id: item.id,
              productId: item.id,
              isCollect: item.isCollect,
              num: item.num,
              nameVal: item.nameEn,
              nameEn: item.nameEn,
              sellPrice: item.SELLPRICE,
              authorityStatus: item.authorityStatus,
              bigImg: item.bigImg,
              flag: item.flag,
              isPersonalized: item.isPersonalized
            }
          })
        });
      });
    },
    onNext() {
      if (this.pageNum === 1) {
        this.pageNum = 2
        this.wrapperStyles = {
          transform: `translate3d(-${this.$refs.swiperContainerDom.clientWidth}px, 0, 0)`
        }
      } else {
        this.pageNum = 1
        this.wrapperStyles = {
          transform: "translate3d(0px, 0, 0)"
        }
      }
    },
  },
});