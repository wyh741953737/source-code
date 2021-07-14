import { addChatOrGuidJs } from "../vue/mixin";
let addChatOrGuidJsMixin = new addChatOrGuidJs({})
new Vue({
  el: "#vue-partnership-list",
  mixins: [addChatOrGuidJsMixin],
  components: {
  },
  beforeCreate() {
  },
  data: {
    loading: false,
    disable: false,
    platformslist:[],
    listUrl: 'cj/partner/getAllTypePlatformList',
    bounceUpSty:{
      transform: `translate3d(0px, 0, 0px)`,
      opacity: 1
    },
    currentTypes: [], //当前选中type存储数组
  },
  created() {
    this.platformslist = []
    // this.getList();
    window.addEventListener('page-scroll', function (ev) {
      // 加头部文字1+1动画
      this.toggleSticky(ev.detail)
    }.bind(this));
  },
  methods: {
    // 头部文字动画
    toggleSticky({ scrollTop }) {
      const opanum = 1 - scrollTop/100;
      this.bounceUpSty ={
        transform: `translate3d(0px, ${-scrollTop+20}px, 0px)`,
        opacity: opanum
      }
    },
    // 获取所有类别列表
    getList() {
      const _that = this;
      const listen = loading => this.loading = loading
      CJ_.$axios.post(_that.listUrl, {}, listen).then(([err, res]) => {
          if (err) return console.warn(err)
          const [e, d] = CJ_.statusCode200(res)
          if (e) return console.warn(e)
          if (Array.isArray(d)) {
            _that.platformslist = d.map(item=>{
              if(item.list.length>4){
                item.list = item.list.slice(0,4);
                item.showMore=true;
              }
              return item;
            })
          }
        })
    },
    toAdd(){
      location.href=`/partnership-add.html`
    },
    ajax(request) {
      let p = new Promise((resolve, reject) => {
        let r = new XMLHttpRequest()
        r.open(request.method, request.url, true)
        if (request.contentType !== undefined) {
          r.setRequestHeader('Content-Type', request.contentType)
        }
        r.addEventListener('load', () => {
          request.callback(r.response)
          resolve(r.response)
        })
        if (request.method == 'GET') {
          r.send()
        } else {
          r.send(request.data)
        }

      })
      return p
    },
    onPlatformItem(partnerId) {
      this.ajax({
        method: 'GET',
        url: `${window.location.origin}/cj/partner/click/${partnerId}`,
        contentType: 'application/json',
      })
    },
    getMore(type){
      //判断当前type是否存在 , 存在即过滤掉 否则存入currentTypes
      this.currentTypes.includes(parseInt(type)) ? this.currentTypes = this.currentTypes.filter((i) => i != type) : this.currentTypes.push(parseInt(type));
      // if (!this.currentTypes.includes(parseInt(type))) {
      //   this.currentTypes.push(parseInt(type));
      // } else {
      //   this.currentTypes = this.currentTypes.filter((i) => i != type);
      // }
    }
  }
});