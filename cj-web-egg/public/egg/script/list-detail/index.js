import listFilter from '../vue/list-filter.vue';
import productCard from '../vue/product-card.vue';
import listPage from '../vue/list-page.vue';
import swiperTab from '../vue/swiper-tab.vue';

const pageHandleScroll = () => { //滚动监听，改变分页定位
  const scrollTop = window.pageYOffset;
  if (document.querySelector('.list-page')) {
    const offsetHeight = document.body.offsetHeight
    const scrollHeight = document.body.scrollHeight;
    const x = scrollHeight - (scrollTop + offsetHeight);
    if(x<=205){
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

new Vue({
  el: "#vue-product-list",
  components: {
    productCard,
    listPage,
    listFilter
  },
  beforeCreate() {
  },
  data: {
    loading: false,
    imgSize: [179, 190],
    productList: [],
    seo: true,
    otherListType: CJ_.getQueryVariable('otherListType'), // 0-趋势商品 1-最新商品 2-视频商品 3.滞销
    cjListParams: {
      keyWord: CJ_.getQueryVariable('search') && decodeURIComponent(CJ_.getQueryVariable('search')) || undefined, // 关键词
      categoryId: CJ_.getQueryVariable('id') || undefined, // 分类id
      countryCode: CJ_.getQueryVariable('from') || undefined, // 仓库国家地区短码
      productType: undefined, // 商品类型 4-供应商商品  10-视频商品
      startSellPrice: undefined, // 售卖价格起始值
      endSellPrice: undefined, // 售卖价格结束值
      addMarkStatus: undefined, // 0-不包邮 1-包邮
      sortByParam: { // {feildType: 0-最匹配 1-刊登  2-价格 3-最新的。isAsc：0-降序 1-升序}
        feildType: 0,
        isAsc: 0
      },
    },
    filter: {
      keywordList: [], //根据关键词搜索的时候获取相关三级类目列表
      isSearchImg: CJ_.getQueryVariable('searchImg'), // 是否图片搜索
      searchImg: '',
      warehouseCur: 0, // 仓库默认选择
      warehouseList: [{ //仓库列表
        areaEn: 'Ship from All Warehouses',
        countryCode: undefined
      }],
      filterType: [0], //filter模块 0：显示推荐关键词，1：显示面包屑类目，2：图片搜索
      categoryShowList: [], // 当前显示类目
      prodTypeList: [{ // 商品类型 4-供应商商品  10-视频商品
        name: 'Sort All Types',
        productType: undefined
      },{
        name: 'Supplier Products',
        productType: 4
      },{
        name: 'Product Videos',
        productType: 10
      }],
    },
    pageData: {
      pageNum: 1, // 当前页
      pageSize: 60, // 当前条数
      totalNum: 0,
      totalPages: 0
    }
  },
  created() {
    if(!this.otherListType) {
      this.seo = false;
      CJ_.getCateGoryList((cateGoryList) => {
        if (CJ_.getQueryVariable('name')) {// 获取url name，处理类目数据
          this.filter.categoryShowList = this.categoryShowFn(JSON.parse(CJ_.$base64.decode(CJ_.getQueryVariable('name'))), cateGoryList)
        } else {
          this.filter.categoryShowList = [{
            id: undefined,
            nameEn:"All Categories",
            children: cateGoryList
          }]
        }
      })
      if(this.filter.keywordList.length > 0 && !this.filter.isSearchImg) {
        // 如果有关键字且没有图片搜索展示关键字模块
        this.filter.filterType = [0];
      } else if(this.filter.isSearchImg) {
        // 展示图片搜索
        document.title = 'Search by Image';
        this.filter.filterType = [2];
        this.getSearchImg()
        return
      } else {
        // 展示三级类目
        this.filter.filterType = [1];
      }
      if(this.cjListParams.countryCode === 'all') {
        // 如果仓库为all,就赋值undefined不传countryCode参数
        this.cjListParams.countryCode = undefined
      }
      this.getList(true)
    }
  },
  mounted() {
    window.addEventListener('scroll', pageHandleScroll)
  },
  destroyed () {//离开该页面需要移除这个监听的事件
    window.removeEventListener('scroll', pageHandleScroll)
  },
  methods: {
    categoryShowFn(list, cateGoryList) {
      const data = list.map((item, idx) => {
        if(item.name === "All Categories") {
          item.children = cateGoryList
          return item
        }
        if(idx === 0) { // 当前为一级类目需要获取其下的二级类目
          cateGoryList.forEach(_ => {
            if(_.id === item.id) item.children = _.children
          })
        } else if(idx === 1) { // 当前为二级类目需要获取其下的三级类目
          const parentId = list[idx - 1] ? list[idx - 1].id : ''
          cateGoryList.forEach(_ => {
            if (_.id === parentId) {
              _.children.forEach(child => {
                if (child.id === item.id) item.children = child.children
              })
            }
          })
        }
        return item
      })
      return data
    },
    // 获取列表
    getList(isCreated) {
      this.loading = true;
      CJ_.$axios.post('elastic-api/product/v0.2/search', {
        ...this.cjListParams,
        page: this.pageData.pageNum,
        size: this.pageData.pageSize,
      })
        .then(([err, res]) => {
          this.loading = false
          if (err) return console.warn(err)
          const {success, data, message} = res
          if (!success) return console.warn(message)
          if (data) {
            this.pageData = {
              ...this.pageData,
              pageNum: data.pageNumber,
              totalNum: data.totalRecords,
              totalPages: data.totalPages
            }
            const content = data.content[0]
            this.filter.warehouseList = content.storeList && [
              {
                areaEn: 'Ship from All Warehouses',
                countryCode: undefined
              },
              ...content.storeList,
            ] || []
            if(this.filter.keywordList.length === 0) {
              this.filter.keywordList = content.relatedCategoryList || []
            }
            if(this.filter.keywordList.length > 0) {
              this.filter.filterType = [0];
            }
            if(CJ_.getQueryVariable('from') && isCreated) {
              let index = 0
              const val = CJ_.getQueryVariable('from')
              const list = this.filter.warehouseList
              list && list.forEach((item, idx) => {
                if (item.countryCode === val) this.filter.warehouseCur = idx
              })
            }
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
    // 重置分页
    resetPage() {
      this.pageData.pageNum = 1
      this.pageData.pageSize = 60
    },
    // 点击分页
    pageChange(pageNum) {
      window.scrollTo({
        top: 300
      });
      if(pageNum && pageNum != 'null') {
        this.pageData.pageNum = pageNum
        this.getList()
      }
    },
    // 点击推荐关键字
    clickKeyword(item) {
      this.resetPage()
      this.cjListParams.categoryId = item.id
      this.getList()
    },
    // 仓库选项
    clickWarehouse(item) {
      this.resetPage()
      this.cjListParams.countryCode = item.countryCode
      this.getList()
    },
    // 商品类型选项
    clickProdType(item) {
      this.resetPage()
      this.cjListParams.productType = item.productType
      this.getList()
    },
    // 价格范围
    clickPriceConfirm(minNum, maxNum) {
      this.resetPage()
      if(minNum > maxNum) {
        layer.msg('Please enter the correct price format')
        return
      }
      this.cjListParams.startSellPrice = minNum
      this.cjListParams.endSellPrice = maxNum
      this.getList()
    },
    // 包邮过滤
    onCheckboxShip(bool) {
      this.resetPage()
      this.cjListParams.addMarkStatus = bool ? 1 : undefined
      this.getList()
    },
    // 点击类目
    clickCategories(item, idx) {
      this.resetPage()
      this.filter.categoryShowList.splice(idx+1,2);
      this.cjListParams.categoryId = item.id
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
      this.cjListParams.categoryId = childrenItem.id
      this.getList()
    },
    // 图片搜索
    getSearchImg() {
      this.resetPage()
      const imgData = JSON.parse(localStorage.getItem('_search_pic_'));
      if (!imgData) return;
      const { dataURL, fileName } = imgData;
      this.filter.searchImg = dataURL;
      fetch(dataURL)
        .then(img => img.blob())
        .then(blob => {
          const formData = new FormData();
          formData.append('uploadimg', blob, fileName);
          this.uploadImg(formData, dataURL);
        });
    },
    uploadImg(formData) {
      this.loading = true;
      return CJ_.$axios.post('app/picture/searchUpload', formData)
        .then(([err, res]) => {
          this.loading = false;
          if (err) return console.warn(err)
          const [e, d] = CJ_.statusCode200(res)
          if (e) return console.warn(e)
          if (d.categorys) {
            this.filter.keywordList = d.categorys.map(item => {
              const arr = item.categoryName.split(' / ')
              return { id: item.categoryId, categoryNameEn: arr[arr.length - 1] }
            })
          }
          if (d.all) {
            this.pageData = {
              ...this.pageData,
              totalNum: d.all,
              totalPages: Math.ceil(d.all / 60)
            }
            this.productList = d.location
          }
        })
    },
    // 点击sort by排序
    clickSort(item) {
      this.resetPage()
      if (item.isAsc === null) {
        this.cjListParams.sortByParam = undefined
      } else {
        this.cjListParams.sortByParam = item
      }
      this.getList()
    }
  }
});

new Vue({
  el: "#vue-other-list",
  components: {
    productCard,
    listPage,
    swiperTab
  },
  data: {
    loading: false,
    imgSize: [179, 190],
    productList: [],
    seo: true,
    otherListType: CJ_.getQueryVariable('otherListType'),
    titles: { // 0-趋势商品 1-最新商品 2-视频商品 3.滞销
      '0': 'Trending Products',
      '1': 'New Products',
      '2': 'Video Products',
      '3': 'Super Deals'
    },
    params: {
      categoryId: undefined,
      productFlag: CJ_.getQueryVariable('otherListType') || undefined
    },
    pageData: {
      pageNum: 1,
      pageSize: 60,
      totalNum: 0,
      totalPages: 0
    },
    tabData: {
      pageNum: 1,
      rowNum: 5,
      tabList: []
    },
  },
  created() {
    this.seo = false;
    CJ_.getCateGoryList((cateGoryList) => {
      this.tabData.tabList = [
        {
          id: undefined,
          nameEn:"All Categories"
        },
        ...cateGoryList
      ]
    })
    if(this.otherListType) {
      document.title = this.titles[this.otherListType]
      this.getList()
    }
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
      return CJ_.$axios.post('elastic-api/product/trendSearch', {
        ...this.params,
        page: this.pageData.pageNum,
        size: this.pageData.pageSize,
      })
        .then(([err, res]) => {
          this.loading = false
          if (err) return console.warn(err)
          const {success, data, message} = res
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
    // 点击分页
    pageChange(pageNum) {
      window.scrollTo({
        top: 0
      });
      if(pageNum != 'null') {
        this.pageData.pageNum = pageNum
        this.getList()
      }
    },
    onTab(item) {
      this.pageData.pageNum = 1
      this.pageData.pageSize = 60
      this.params.categoryId = item.id
      this.getList()
    },
  }
});
