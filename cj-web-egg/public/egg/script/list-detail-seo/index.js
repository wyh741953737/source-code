import productCard from '../vue/product-card.vue';
import { addChatOrGuidJs } from "../vue/mixin";
let addChatOrGuidJsMixin = new addChatOrGuidJs({})

const pageHandleScroll = () => { //滚动监听，改变分页定位
  const scrollTop = window.pageYOffset;
  if (document.querySelector('.list-page')) {
    const offsetHeight = document.body.offsetHeight
    const scrollHeight = document.body.scrollHeight;
    const x = scrollHeight - (scrollTop + offsetHeight);
    if(x<=195){
      document.querySelector('.list-page').style.cssText = "position: initial;";
    }else{
      document.querySelector('.list-page').style.cssText = "bottom:0px;position:fixed;";
    }
  }
  if (document.querySelector('.tab-header')) {
    if(scrollTop<=40){
      document.querySelector('.tab-header').classList.remove('fixed')
    }else{
      document.querySelector('.tab-header').classList.add('fixed')
    }
  }
}

if(document.querySelector('#vue-product-list')) {
  new Vue({
    el: "#vue-product-list",
    mixins: [addChatOrGuidJsMixin],
    components: {
      productCard,
    },
    data: {
      // loading: false,
      imgSize: [179, 190],
      productList: [],
      seo: true,
      queryObj: CJ_.paramsToObject(location.search) || {},
      params: {},
      productNum: 0,
      passTracking: location.search.indexOf("?search=") === -1 ? false : true
    },
    created() {
      let countryCode
      if (this.queryObj.from === 'all' || !this.queryObj.from || this.queryObj.from === 'undefined') {
        countryCode = undefined
      } else {
        countryCode = this.queryObj.from
      }
      this.params = {
        page: this.queryObj.pageNum || 1, // 当前页
        size: this.queryObj.pageSize || 60, // 当前条数
        keyWord: this.queryObj.search || undefined, // 关键词
        categoryId: this.queryObj.id || undefined, // 分类id
        countryCode, // 仓库国家地区短码
        productType: this.queryObj.productType || undefined, // 商品类型 4-供应商商品  10-视频商品
        startSellPrice: this.queryObj.startSellPrice || undefined, // 售卖价格起始值
        endSellPrice: this.queryObj.endSellPrice || undefined, // 售卖价格结束值
        addMarkStatus: this.queryObj.addMarkStatus || undefined, // 0-不包邮 1-包邮
        sortByParam: { // {feildType: 0-最匹配 1-刊登  2-价格 3-最新的。isAsc：0-降序 1-升序}
          feildType: this.queryObj.feildType || 0,
          isAsc: this.queryObj.isAsc || 0
        },
      }
      this.getList()
    },
    mounted() {
      window.addEventListener('scroll', pageHandleScroll)
    },
    destroyed () {//离开该页面需要移除这个监听的事件
      window.removeEventListener('scroll', pageHandleScroll)
    },
    methods: {
      // 获取列表
      getList() {
        // this.loading = true;
        CJ_.$axios.post('elastic-api/product/v0.2/search', this.params)
          .then(([err, res]) => {
            // this.loading = false
            if (err) return console.warn(err)
            const {success, data, message} = res
            if (!success) return console.warn(message)
            if (data) {
              this.productNum = Number(data.totalRecords)
              const content = data.content[0]
              this.productList = content.productList.map(item => {
                return {
                  ...item,
                  id: item.id,
                  bigImg: item.bigImage,
                  productId: item.id,
                  isCollect: item.isCollect,
                  num: item.listedNum,
                  nameVal: item.nameEn,
                  nameEn: item.nameEn,
                  sellPrice: item.sellPrice,
                  flag: '1'
                }
              })
              this.$nextTick(function () {
                this.seo = false;
                pageHandleScroll()
              })
              /** 埋点 */
              window.onload = () => {
                $global_tracking.pushData({
                  actionType: "Search_Request",
                  elementId: "002",
                  list: [
                    {
                      fieldValue: this.params?.keyWord ? this.params.keyWord : "",
                      filedName: "searchWords"
                    },
                    {
                      fieldValue: Number(data.totalRecords),
                      filedName: "resultNumber"
                    }
                  ]
                })
              }
            } else {
              this.productList = []
            }
          })
      },
    }
  });
}

if(document.querySelector('#vue-other-list')) {
  new Vue({
    el: "#vue-other-list",
    mixins: [addChatOrGuidJsMixin],
    components: {
      productCard,
    },
    data: {
      // loading: false,
      imgSize: [179, 190],
      productList: [],
      seo: true,
      otherListType: CJ_.getQueryVariable('otherListType'),
      queryObj: CJ_.paramsToObject(location.search) || {},
      titles: { // 0-趋势商品 1-最新商品 2-视频商品 3.滞销
        '0': 'Trending Products',
        '1': 'New Products',
        '2': 'Video Products',
        '3': 'Super Deals'
      },
      passTracking: location.search.indexOf("?search=") === -1 ? false : true
    },
    created() {
      document.title = this.titles[this.otherListType]
      this.getList()
    },
    mounted() {
      window.addEventListener('scroll', pageHandleScroll)
    },
    destroyed () {//离开该页面需要移除这个监听的事件
      window.removeEventListener('scroll', pageHandleScroll)
    },
    methods: {
      // 获取列表
      getList() {
        // this.loading = true;
        return CJ_.$axios.post('elastic-api/product/trendSearch', {
          page: this.queryObj.pageNum || 1,
          size: this.queryObj.pageSize || 60,
          categoryId: this.queryObj.id || undefined,
          productFlag: this.queryObj.otherListType || undefined
        })
          .then(([err, res]) => {
            // this.loading = false
            if (err) return console.warn(err)
            const {success, data, message} = res
            if (!success) return console.warn(message)
            if (data) {
              const content = data.content[0]
              this.productList = content.productList.map(item => {
                return {
                  ...item,
                  id: item.id,
                  bigImg: item.bigImage,
                  productId: item.id,
                  isCollect: item.isCollect,
                  num: item.listedNum,
                  nameVal: item.nameEn,
                  nameEn: item.nameEn,
                  sellPrice: item.sellPrice,
                  flag: '1'
                }
              })
              this.$nextTick(function () {
                this.seo = false;
                pageHandleScroll()
              })
            } else {
              this.productList = []
            }
          })
      },
    }
  });
}
