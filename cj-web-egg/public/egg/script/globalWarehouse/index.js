import listFilter from '../vue/list-filter.vue';
import productCard from '../vue/product-card.vue';
import listPage from '../vue/list-page.vue';
import { addChatOrGuidJs } from "../vue/mixin";
let addChatOrGuidJsMixin = new addChatOrGuidJs({})

const pageHandleScroll = () => { //滚动监听，改变分页定位
  if (document.querySelector('.list-page')) {
    const scrollTop = window.pageYOffset;
    const offsetHeight = document.body.offsetHeight
    const scrollHeight = document.body.scrollHeight;
    const x = scrollHeight - (scrollTop + offsetHeight);
    if(x<=180 || (scrollTop - document.querySelector('.porduct-warp').offsetTop < -528)){
      document.querySelector('.list-page').style.cssText = "position: initial;";
    }else{
      document.querySelector('.list-page').style.cssText = "bottom:0px;position:fixed;";
    }
  }
}

new Vue({
  el: "#vue-global-warehouse",
  mixins: [addChatOrGuidJsMixin],
  components: {
    productCard,
    listPage,
    listFilter
  },
  data: {
    loading: false,
    imgSize: [179, 190],
    productList: [],
    seo: true,
    params: {
      categoryId: undefined, // 类目id
      countryCode: undefined, // 仓库国家地区短码
      productType: undefined, // All Types
      startSellPrice: undefined, // 售卖价格起始值
      endSellPrice: undefined, // 售卖价格结束值
      addMarkStatus: undefined, // 0-不包邮 1-包邮
      sortByParam: { // {feildType: 0-最匹配 1-刊登  2-价格 3-最新的。isAsc：0-降序 1-升序}
        feildType: 0,
        isAsc: 0
      },
    },
    filter: {
      keywordList: [],
      keywordTitle: 'Warehouse',
      keywordCur: 0,
      isSortby: true,
      warehouseList: [],
      filterType: [0, 1], //filter模块 0：显示推荐关键词，1：显示面包屑类目，2：图片搜索
      isFilterWarehouse: false,
      categoryShowList: [], // 当前显示类目
      prodTypeList: [{ // 商品类型 4-供应商商品  10-视频商品
        name: 'Sort All Types',
        productType: undefined
      },{
        name: 'Product Videos',
        productType: 10
      }],
    },
    pageData: {
      pageNum: 1,
      pageSize: 60,
      totalNum: 0,
      totalPages: 0
    }
  },
  created() {
    this.seo = false;
    CJ_.getCateGoryList((cateGoryList) => {
      this.filter.categoryShowList = [{
        id: undefined,
        nameEn:"All Categories",
        children: cateGoryList
      }]
    })
    this.getWarehouseList()
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
      this.loading = true;
      return CJ_.$axios.post('elastic-api/product/v0.2/search', {
        ...this.params,
        page: this.pageData.pageNum,
        size: this.pageData.pageSize,
      })
        .then(([err, res]) => {
          this.loading = false
          if (err) return console.warn(err)
          const { success, data, message } = res
          if (!success) return console.warn(message)
          if (data) {
            this.pageData = {
              ...this.pageData,
              pageNum: data.pageNumber,
              totalNum: data.totalRecords,
              totalPages: data.totalPages
            }
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
              pageHandleScroll()
            })
          } else {
            this.productList = []
          }
        })
    },
    // 获取仓库
    getWarehouseList() {
      return CJ_.$axios.post('warehouseBuildWeb/management/getCountryByAreaId')
        .then(([err, res]) => {
          if (err) return console.warn(err)
          const {success, data, message} = res
          if (!success) return console.warn(message)
          this.filter.keywordList = data && [
            { //仓库列表
              areaEn: 'Ship from All Warehouses',
              countryCode: undefined
            },
            ...data,
          ]
        })
    },
    // 重置分页
    resetPage() {
      this.pageData.pageNum = 1
      this.pageData.pageSize = 60
    },
    // 点击分页
    pageChange(pageNum) {
      window.scrollTo({
        top: document.querySelector('.porduct-warp').offsetTop - 78
      });
      if(pageNum != 'null') {
        this.pageData.pageNum = pageNum
        this.getList()
      }
    },
    // 仓库选项
    clickKeyword(item) {
      this.resetPage()
      this.params.countryCode = item.countryCode
      this.getList()
    },
    // 商品类型选项
    clickProdType(item) {
      this.resetPage()
      this.params.productType = item.productType
      this.getList()
    },
    // 价格范围
    clickPriceConfirm(minNum, maxNum) {
      this.resetPage()
      if(minNum > maxNum) {
        layer.msg('Please enter the correct price format')
        return
      }
      this.params.startSellPrice = minNum
      this.params.endSellPrice = maxNum
      this.getList()
    },
    // 包邮过滤
    onCheckboxShip(bool) {
      this.resetPage()
      this.params.addMarkStatus = bool ? 1 : undefined
      this.getList()
    },
    // 点击类目
    clickCategories(item, idx) {
      this.resetPage()
      this.filter.categoryShowList.splice(idx+1,2);
      this.params.categoryId = item.id
      this.getList()
    },
    // 点击选择下级类目
    clickLiCategories(childrenItem, fatherItem) {
      this.resetPage()
      if(!fatherItem.id) { // 判断id是undefined，将All Categories替换为一级目录
        this.filter.categoryShowList = [childrenItem]
      } else {
        this.filter.categoryShowList.push(childrenItem)
      }
      this.params.categoryId = childrenItem.id
      this.getList()
    },
    // 点击sort by排序
    clickSort(item) {
      this.resetPage()
      if (item.isAsc === null) {
        this.params.sortByParam = undefined
      } else {
        this.params.sortByParam = item
      }
      this.getList()
    }
  }
});