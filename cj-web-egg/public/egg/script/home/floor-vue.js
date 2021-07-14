import { Floor } from '@common/home';
import i18next from 'i18next';
import productCard from '../vue/product-card.vue';
import productSource from '../vue/product-source.vue';
import loadBounce from '../vue/load-bounce.vue';
import { getCookie, transWarehouseStock } from '../global/utils';
import {
  getInterfereProdId,
  getInterfereProdVersion,
  isTempUserId,
} from '../cjTool/index';
const { NODE_ENV } = require('@root/env');

const floors = Floor.floors;
const floor = new Floor({ $axios: CJ_.$axios, $ajax: CJ_.$ajax });

const mixin = {
  components: {
    productCard,
    productSource,
  },
  created() {
    floor.getData(this.params, {
      lng: getCookie('lng') || 'en',
    }).then(([err, list]) => {
      err || (this.list = list);
    });
  },
};

// 楼层 1
new Vue({
  el: '#vue-floor-1',
  mixins: [mixin],
  beforeCreate() {
    this.params = floors.floor_1;
  },
  data: {
    list: [],
    imgSize: [179, 190],
  },
});

// 楼层 2
new Vue({
  el: '#vue-floor-2',
  mixins: [mixin],
  beforeCreate() {
    this.params = floors.floor_2;
  },
  data: {
    list: [],
    imgSize: [179, 190],
  },
});

// 楼层 3
new Vue({
  el: '#vue-floor-3',
  mixins: [mixin],
  beforeCreate() {
    this.params = floors.floor_3;
  },
  data: {
    list: [],
    imgSize: [179, 190],
  },
});
new Vue({
  el: '#vue-floor-njk-4',
  beforeCreate() {
    this.params = floors.floor_4;
  },
  data: {
    list: [],
    imgSize: [179, 190],
  },
  mounted() {
    const floor = document.getElementById("vue-floor-njk-4");
    const images = floor.getElementsByTagName("img");
    console.log("##############",images);
    for(let i = 0;i < images.length;i++){
      const observer = new IntersectionObserver((changes)=>{
        // changes是观测对象合集（即使是一个观测对象也会形成数组的形式）
        changes.forEach(({target, isIntersecting})=>{
          // target是节点dom isIntersecting是否有交叉（有交叉就是一部分在可视区一部分不在可视区）
          // 第一次进入如果有交叉证明进入可视区这时候就可以解除
          if(isIntersecting){
            // 关闭观察器
            observer.disconnect();
            // 停止观察
            observer.unobserve(target);
          }
          if(isIntersecting && target.getAttribute("data-url")){
            // 判断是否数据img存在，如果不存在继续使用默认图片
            target.src = target.getAttribute("data-url");
          }
        });
      });
      // 观测根据数据ref生成的dom节点
      observer.observe(images[i]);
    };
  },
});
// 楼层 5
// new Vue({
//   el: '#vue-floor-5',
//   mixins: [mixin],
//   beforeCreate() {
//     this.params = floors.floor_5;
//   },
//   data: {
//     list: [],
//     imgSize: [179, 190],
//   },
// });

// 楼层 6
// new Vue({
//   el: '#vue-floor-6-left',
//   mixins: [mixin],
//   beforeCreate() {
//     this.params = floors.floor_6.left;
//   },
//   data: {
//     list: [],
//     imgSize: [270, 290],
//   },
// });
// new Vue({
//   el: '#vue-floor-6-right',
//   mixins: [mixin],
//   beforeCreate() {
//     this.params = floors.floor_6.right;
//   },
//   data: {
//     list: [],
//     imgSize: [270, 290],
//   },
// });

// 楼层 7
new Vue({
  el: '#vue-floor-7-left',
  mixins: [mixin],
  beforeCreate() {
    this.params = floors.floor_7.left;
  },
  data: {
    list: [],
    imgSize: [270, 290],
  },
});
// new Vue({
//   el: '#vue-floor-7-right',
//   mixins: [mixin],
//   beforeCreate() {
//     this.params = floors.floor_7.right;
//   },
//   data: {
//     list: [],
//     imgSize: [270, 290],
//   },
// });

// 楼层 8
new Vue({
  el: '#vue-floor-8',
  mixins: [mixin],
  beforeCreate() {
    this.params = floors.floor_8;
  },
  data: {
    list: [],
    imgSize: [179, 190],
  },
});

// 选品活动展示模块
new Vue({
  el: '#vue-floor-njk-8',
  mounted() {
    const floor = document.getElementById("vue-floor-njk-8");
    if(!floor){
      return;
    }
    const images = floor.getElementsByTagName("img");
    for(let i = 0;i < images.length;i++){
      const observer = new IntersectionObserver((changes)=>{
        // changes是观测对象合集（即使是一个观测对象也会形成数组的形式）
        changes.forEach(({target, isIntersecting})=>{
          // target是节点dom isIntersecting是否有交叉（有交叉就是一部分在可视区一部分不在可视区）
          // 第一次进入如果有交叉证明进入可视区这时候就可以解除
          if(isIntersecting){
            // 关闭观察器
            observer.disconnect();
            // 停止观察
            observer.unobserve(target);
          }
          if(isIntersecting && target.getAttribute("data-url")){
            // 判断是否数据img存在，如果不存在继续使用默认图片
            target.src = target.getAttribute("data-url");
          }
        });
      });
      // 观测根据数据ref生成的dom节点
      observer.observe(images[i]);
    };
  },
});
// 楼层 9
new Vue({
  el: '#vue-floor-9',
  components: {
    productCard,
    productSource,
    loadBounce,
  },
  data: {
    loading: false,
    disable: false,
    clickNum: 0,
    totalPages: 0,
    params: {
      page: null,
      size: 24,
      language: getCookie('lng') || 'en',
      requestSource: '0', // 请求来源  0 : web端 1 : M站/App
    },
    tempUserId: undefined,
    list: [],
    imgSize: [179, 190],
    getVersion: getInterfereProdVersion()
  },
  created() {
    const getTempUserIdFun = isTempUserId()
    getTempUserIdFun().then(tempUserId => {
      this.tempUserId = tempUserId;
      this.loadMore();
    })
  },
  methods: {
    viewMore() {
      this.clickNum +=1
      this.params.page += 1;
      if (this.clickNum >= this.totalPages) {
        return;
      } else {
        if (this.params.page > this.totalPages) {
          this.params.page = 1;
        }
      }
      this.loadMore();
    },
    loadMore() {
      const listen = loading => this.loading = loading;
      const interfereProdVersion = this.getVersion()
      CJ_.$axios.post('elastic-api/recommend/search/home/queryPage', {
        ...this.params,
        versionNum: interfereProdVersion, // 版本号
        categoryIdList: getInterfereProdId(), // 干预的类目的id集合
        tempUserId: this.tempUserId // 如果没有登录，使用临时id
      }, listen)
        .then(([err, res]) => {
          if (err) {
            console.warn(err);
            return;
          }
          const [e, d] = CJ_.statusCode200(res);
          if(res.success) {
            if (Array.isArray(res.data.content)) {
              const tempList = res.data.content.map(i => {
                return {
                  ...i,
                  id: i.productId
                }
              })
              const versionNum = res.data.content[0] && res.data.content[0].versionNum || ''
              if (interfereProdVersion == undefined) {
                // 没有版本号的时候，设置
                this.getVersion(versionNum)
              }
              this.list = this.list.concat(tempList);
              this.totalPages = parseInt(res.data.totalPages)
              this.params.page = parseInt(res.data.pageNumber);
            }
          }

        });
    },
  },
  // watch: {
  //   'params.page': function () {
     
  //   },
  // },
});

new Vue({
  el: '#vue-floor-global-warehouse',
  components: {
    productCard,
    productSource,
  },
  data: {
    list: [],
    imgSize: [270, 290],
    tabCur: 0,
    isPrev: true,
    isNext: true,
    rowNum: 2,
    pageNum: 0,
    wrapperStyles: {},
    warehouseList: [],
    swiperContainerWidth: 0,
    totalPage: 0,
    throttleBool: true,
  },
  beforeCreate() {
    this.params = floors.floor_global_warehouse();
  },
  created() {
    const promiseAll = []
    const list = []
    for (let index = 0; index < this.params.length; index++) {
      promiseAll.push(floor.getData(this.params[index], {
        lng: getCookie('lng') || 'en',
      }))
    }
    Promise.all(promiseAll).then(values => {
      const environment = NODE_ENV;
      // 判断是cn环境还是com环境
      const host = location.host;
      const hostArr = host.split('.');
      const lastHostName = hostArr[hostArr.length - 1];
      const isOnline = environment==="production"||environment==="production-cn";
      for (let i = 0; i < values.length; i++) {
        const [err_list, data = []] = values[i];
        err_list || list.push({
          areaEn: this.params[i].title,
          list: data,
          link:isOnline?`https://${this.params[i].h}.cjdropshipping.com`:`http://${this.params[i].h}.test.com`
        });
      }
      this.warehouseList = transWarehouseStock(list)
      if (this.warehouseList.length<=this.rowNum) {
        this.isPrev = false;
        this.isNext = false;
      } else {
        this.isNext = true;
      }
      this.$nextTick(function () {
        // 无缝轮播，头部添加最后两个，尾部添加前面两个
        this.totalPage = Math.ceil(document.querySelectorAll('#vue-floor-global-warehouse .swiper-slide').length / 2)
        this.swiperContainerWidth = this.$refs.swiperContainerDom.clientWidth
        const swiperWrapper=document.querySelector("#vue-floor-global-warehouse .swiper-wrapper");
        const slideAll = document.querySelectorAll('#vue-floor-global-warehouse .swiper-slide');
        const first_slide1=slideAll[slideAll.length - 2].cloneNode(true);
        const first_slide2=slideAll[slideAll.length - 1].cloneNode(true);
        const lase_slide3=slideAll[0].cloneNode(true);
        const lase_slide4=slideAll[1].cloneNode(true);
        swiperWrapper.addEventListener('transitionend', this.translate3dEnd, false)
        swiperWrapper.insertBefore(first_slide1, slideAll[0])
        swiperWrapper.insertBefore(first_slide2, slideAll[0])
        swiperWrapper.appendChild(lase_slide3);
        swiperWrapper.appendChild(lase_slide4);
        this.wrapperStyles = {
          transform: `translate3d(-${this.swiperContainerWidth}px, 0, 0)`
        }
      })
    })
  },
  methods: {
    // tab翻页
    onPrev() {
      if(this.throttleBool) {
        this.throttleBool=false;
        this.pageNum -=1
        if (this.pageNum>=-1) {
          this.isNext = true;
          const transform = this.swiperContainerWidth * (this.pageNum + 1)
          this.wrapperStyles = {
            transition: 'all 300ms ease 0s',
            transform: `translate3d(-${transform}px, 0, 0)`
          }
        }
      }
    },
    onNext() {
      if(this.throttleBool) {
        this.throttleBool=false;
        this.pageNum +=1
        if (this.pageNum<=this.totalPage) {
          this.isPrev = true;
          const transform = this.swiperContainerWidth * (this.pageNum + 1)
          this.wrapperStyles = {
            transition: 'all 300ms ease 0s',
            transform: `translate3d(-${transform}px, 0, 0)`
          }
        }
      }
    },
    translate3dEnd() {
      // 动画结束回调
      if(this.pageNum === -1) {
        this.pageNum = this.totalPage - 1
        const transform = this.swiperContainerWidth * this.totalPage
        this.wrapperStyles = {
          transform: `translate3d(-${transform}px, 0, 0)`
        }
      }else if(this.pageNum === this.totalPage) {
        this.pageNum = 0
        this.wrapperStyles = {
          transform: `translate3d(-${this.swiperContainerWidth}px, 0, 0)`
        }
      }
      this.throttleBool = true
    }
  }
});