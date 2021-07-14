import listPage from '../vue/list-page.vue';
import { tutorialMenu, addChatOrGuidJs } from "../vue/mixin";
let addChatOrGuidJsMixin = new addChatOrGuidJs({})

if(document.querySelector('#vue-menu')) {
  new Vue({
    el: "#vue-menu",
    mixins: [tutorialMenu],
  });
}

if(document.querySelector('#vue-faq')) {
  new Vue({
    el: "#vue-faq",
    data: {
      activeIdx: undefined,
      queryObj: CJ_.paramsToObject(location.search),
      lastDom: null,
			faqList: []
    },
    created() {
      if(this.queryObj.scrollToNum) {
        window.scrollTo({
          top: this.queryObj.scrollToNum
        });
      }
      this.getQuestionListByPage()
    },
    methods: {
      // 获取fqa列表
      getQuestionListByPage() {
        const { pageNum = '1', faqType = '1', navType } = this.queryObj
        const pageSize = this.queryObj.pageSize || (navType === 'faq' ? 10 : 5)
        CJ_.$axios.post('app/message/getQuestionListByPage', {
          type: faqType,
					page: pageNum,
					limit: pageSize,
          status: '1',
          search: ''
        })
          .then(([err, res]) => {
            // this.loading = false
            if (err) return console.warn(err)
            if (res.statusCode === 'CODE_200') {
              this.faqList = res.result.list.map((item, idx) => {
                return {
                  ...item,
                  idx: pageSize * (pageNum - 1) + (idx + 1)
                }
              });
            }
          })
      },
      toggleShow($event, i) {
        const e = $event.currentTarget
        if (this.lastDom) {
          this.lastDom.nextElementSibling.style.height = '0px'
        }
        if (this.activeIdx == i) {
          this.activeIdx = undefined
          e.nextElementSibling.style.height = '0px'
          return
        }
        e.nextElementSibling.style.height = e.nextElementSibling.scrollHeight + 'px'
        this.activeIdx = i
        this.lastDom = e
      }
    }
  });
}

if(document.querySelector('#vue-detail-context')) {
  new Vue({
    el: "#vue-detail-context",
    mixins: [tutorialMenu, addChatOrGuidJsMixin],
    components: {
      listPage,
    },
    data: {
      isVoteClick: true,
      popupArticleClass: '',
      articleList: [],
      articleTitle: '', // 文章面包屑标题
      menuOpenIdx: '', // 默认类目打开
      menuActiveIdx: '', // 默认选中类目
      categoryId: '',
      context: '',
      pageData: {
        pageNum: 1, // 当前页
        pageSize: 8, // 当前条数
        totalNum: 0,
        totalPages: 0
      }
    },
    created() {
      this.menuOpenIdx = this.queryObj.menuOpenIdx
      this.menuActiveIdx = this.queryObj.menuActiveIdx
      this.updateSkimCount() // 刷新一次加一次浏览量
    },
    methods: {
      updateSkimCount() {
        const id = location.pathname.split("/article-details/")[1] || ''
        CJ_.$axios.post('cj/contentInfo/getContentDetail', {
          id
        })
          .then(([err, res]) => {
            if (err) return console.warn(err)
            const [e, data] = CJ_.statusCode200(res)
            if (e) return console.warn(e)
            if(data) {
              this.context = data.context
              CJ_.$axios.post('cj/contentInfo/updateSkimCount', {
                id
              })
            }
          })
      },
      getList() {
        CJ_.$axios.post('cj/contentInfo/queryContentByCategoryId', {
          pageNum: this.pageData.pageNum,
          pageSize: this.pageData.pageSize,
          categoryId: this.categoryId
        })
          .then(([err, res]) => {
            if (err) return console.warn(err)
            this.pageData = {
              ...this.pageData,
              totalNum: res.total,
              totalPages: Math.ceil(res.total / 8)
            }
            this.articleList = res.data.map(item => {
              return {
                ...item,
                id: item.contentUrl.split('/article-details/')[1] || ''
              }
            }) || []
          })
      },
      clickMenu($event) {
        const e = $event.currentTarget
        this.popupArticleClass = 'enter'
        const menuOpenIdx = e.getAttribute("openIdx")
        const menuActiveIdx = e.getAttribute("menuActiveIdx")
        if(this.menuOpenIdx != menuOpenIdx || this.menuActiveIdx != menuActiveIdx) {
          const arrLi = document.querySelectorAll(".sub-menu-li")
          arrLi[menuOpenIdx].querySelectorAll(".sub-menu-a")[menuActiveIdx].classList.add("active")
          this.menuOpenIdx && this.menuOpenIdx && arrLi[this.menuOpenIdx].querySelectorAll(".sub-menu-a")[this.menuActiveIdx].classList.remove("active")
        }
        this.menuOpenIdx = menuOpenIdx
        this.menuActiveIdx  = menuActiveIdx
        this.articleTitle = e.getAttribute("articleTitle")
        this.categoryId = e.getAttribute("id")
        e.classList.add("active");
        this.pageData = {
          pageNum: 1, // 当前页
          pageSize: 8, // 当前条数
          totalNum: 0,
          totalPages: 0
        }
        this.getList()
      },
      close() {
        this.popupArticleClass = ''
      },
      // 点击分页
      pageChange(pageNum) {
        if(pageNum && pageNum != 'null') {
          this.pageData.pageNum = pageNum
          this.getList()
        }
      },
      voteClick($event, type) {
        const currentTarget = $event.currentTarget
        if(this.isVoteClick) {
          this.isVoteClick = false
          let postUrl = ''
          if (type) {
            postUrl = 'cj/contentInfo/updateValidCount'
          } else {
            postUrl = 'cj/contentInfo/updateUnvalidCount'
          }
          CJ_.$axios.post(postUrl, {
            id: location.pathname.split("/")[2] || ''
          })
            .then(([err, res]) => {
              const [e, d] = CJ_.statusCode200(res)
              if (e) {
                this.isVoteClick = true
                return console.warn(e)
              }
              if (type) {
                anim_great.play()
              } else {
                anim_trample.play()
              }
              currentTarget.classList.add("active")
              currentTarget.querySelector('span').innerText=parseInt(currentTarget.getAttribute("count") || 0) + 1
            })
        } else {
          layer.msg('Your feedback has been submitted.');
        }
      },
      clickDetails($event) {
        const el = $event.target;
        if (el && el.nodeName === "IMG") {
          if (el.parentNode.nodeName === "A") {
            el.parentNode.preventDefault()
            // if (el.getAttribute("src") === el.parentNode.getAttribute("href")) {
            // }
          }
          window.open(el.getAttribute("src"))
        }
      }
    },
  });
}

if(document.querySelector('#vue-tutorial-search')) {
  new Vue({
    el: "#vue-tutorial-search",
    mixins: [addChatOrGuidJsMixin],
    data: {
      keyWord: CJ_.getQueryVariable('keyWord') && decodeURIComponent(CJ_.getQueryVariable('keyWord')) || ''
    },
    created() {
    },
    methods: {
      searchClick() {
        const pattern=/[`!&()|':;\-',\\\.<>\/?~！#……&（）——'；：""'。，、？\s]/g;
        const keyWord = this.keyWord.replace(pattern," ") || '';
        const navType = CJ_.getQueryVariable('navType') || 'content'
        const searchType = CJ_.getQueryVariable('searchType') || navType
        location.href = `/help-center?navType=search&searchType=${searchType}&keyWord=${encodeURIComponent(keyWord)}`
      },
    },
  });
}
// if (document.querySelector('#vue-a-back')) {
//   new Vue({
//     el: "#vue-a-back",
//     data: {
//       hasHistory: false,
//       fallbackUrl: '/help-center'
//     },
//     mounted() {
//       window.addEventListener('beforeunload', () => {
//         // 如果页面成功卸载，说明即将返回上一页，改变标记值
//         this.hasHistory = true;
//       });
//     },
//     methods: {
//       back($event) {
//         $event.preventDefault()
//         // 尝试返回上一页，如果没有上一页会静默失败，不会抛异常
//         window.history.back();

//         // hasHistory是异步改变的，所以这里同样要异步判断
//         setTimeout(() => {
//           // hasHistory为false说明当前页面没有卸载，也就没有能成功返回，那就跳转到fallbackUrl
//           if (!this.hasHistory) {
//             window.location.href = this.fallbackUrl;
//           }
//         }, 200);
//       },
//     },
//   });
// }

const vote_great = document.getElementById('vote_great');
const vote_trample = document.getElementById('vote_trample');
let anim_great
let anim_trample
if(vote_great) {
  const params = {
    container: vote_great,  //播放的位置
    renderer: 'svg', 
    loop: false, //是否循环播放 
    autoplay: false, //是否自动播放
    path: '/egg/image/tutorial/vote_great.json'
  };
  anim_great = lottie.loadAnimation(params); //  加载
  anim_great.setSubframe(false)
}
if(vote_trample) {
  const params = {
    container: vote_trample,  //播放的位置
    renderer: 'svg', 
    loop: false, //是否循环播放 
    autoplay: false, //是否自动播放
    path: '/egg/image/tutorial/vote_trample.json'
  };
  anim_trample = lottie.loadAnimation(params); //  加载
  anim_trample.setSubframe(false)
}