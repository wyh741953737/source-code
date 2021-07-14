/**
 * 公用顶部栏
 */
import './language-currency'; // 翻译、币种
import loadBounce from '../vue/load-bounce.vue';
import guidCard from '../vue/guid-card.vue'
import i18next from 'i18next';
import { getCookie } from '../global/utils';
import utils from '@common/utils';
import { createWarehouseStockCache, getClientReat, getGoogleLogin } from '../global/utils';
import CJMsg from '../../../../mycj/public/static/js/cjmsg/cjmsg';

const bs = CJ_.$base64
const userId = bs.decode(localStorage.getItem('userId') == undefined ? "" : localStorage.getItem('userId'));
// 获取url参数
function getQueryVariable(variable){
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
          var pair = vars[i].split("=");
          if(pair[0] == variable){return pair[1];}
  }
  return(false);
}

// 个人中心头部
new Vue({
  el: '#vue-top-bar-admin',
  data: {
    isLogin: CJ_isLogin,
    userInfo: CJ_userInfo,
    messageTab: [
      { name: i18next.t('common-top-from-cj'), active: 'true', val: '1', count: 0 },
      { name: i18next.t('common-top-elites'), active: 'false', val: '2', count: 0 },
      { name: i18next.t('common-top-recommendations'), active: 'false', val: '3', count: 0 }
    ],
    messagePre: [], // 消息列表
    noData: true,
    MessageType: '1',
    isMark: true,
    loading: false,
    messageNum: 0, // 消息通知总数量
    token: '',
    ElitesUrl: CJ_.getElitesUrl(),
    accountOver: false, // 用户名称鼠标是否悬浮
    supportOver: false, // support鼠标是否悬浮
    userAvatar: '', // 备用头像 -- 防止shopfiy登陆过来的拿不到头像
    evaluteCount: 0,
    noticeFlag: false,
  },

  components: {
    loadBounce,
  },

  created() {
    if (this.isLogin) {
      this.token = CJ_.store.get('token', { decode: true });
      // this.getMessage();
      // this.getCount();
      this.getcjEvaluation(); // 获取供应商评价数量
      
    } else {
      //判断如果用户登录信息不存在，则弹出google一键登录框
      getGoogleLogin(); //谷歌一键登录
    }
  },

  mounted() {
    this.initCjMsg()
    window.addEventListener('userInfoUpdateEv', ev => {
      console.log('userInfoUpdateEv',ev.detail);
      this.userAvatar = ev.detail.img;
    });
  },

  watch: {
    // MessageType() {
    //   this.getMessage();
    // }
  },

  methods: {
    initCjMsg() {
      new CJMsg({ getDomainByUrl: utils.getDomainByUrl, isLogin: CJ_isLogin })
    },
    // 消息通知 tab切换
    changeMessageTab(item) {
      this.messageTab.forEach(_ => _.active = item.val === _.val ? 'true' : 'false');
      this.MessageType = item.val;
      this.isMark = true;
      this.getMessage();
    },

    // 消息通知 获取消息
    getMessage(){
      this.noData = false;
      this.messagePre = [];
      const fun = {
        '1': this.getMessageCJ,
        '2': this.getMessageElites,
        '3': this.getMessageComment,
      };
      this.isLogin && fun[this.MessageType]();
    },

    getMessageCJ() {
      let getTopMesData = {
        pageSize: 5,
        pageNum: 1,
        data: {
          isread: "",
          userId
        }
      }
      const listen = loading => this.loading = loading;
      CJ_.$axios.post('messageCenterCj/notification/queryGetCjnotification', getTopMesData, listen)
        .then(([err, res]) => {
          if (err) {
            console.warn(err);
            return;
          }
          const { code, data: result = {} } = res
          if(+code !== 200) return;

          const { list } = result
          let isReadArr = []
          this.messagePre = list.map(v => {
            const ind = v.notificationType.indexOf('html:')
            if ( ind > -1) {
              v.url = v.notificationType.slice(ind + 5);
              v.notificationType = v.notificationType.slice(0, ind)
            }
            isReadArr.push(v.isread)
            return v
          })
          this.isMark = !isReadArr.includes('0')
          this.noData = this.messagePre.length === 0
          console.log(this.isMark)
          //将未读的置顶
          let idxs = [], tops = []
          this.messagePre.forEach((v, i) => {
            v.isread === '0' && idxs.unshift(i)
          })
          idxs.forEach(idx => tops = tops.concat(this.messagePre.splice(idx, 1)))
          this.messagePre = tops.reverse().concat(this.messagePre)

          CJ_.$axios.post("messageCenterCj/notification/queryNoticeUpperApex", { userId }, listen)
            .then(([err, res]) => {
              if (err) {
                console.warn(err);
                return;
              }
              const { code: topCode, data: topResult = {} } = res
              if (+topCode !== 200) return;

              const { list: topList } = topResult
              const noReadList = topList.filter(v => v.isread === '0').reverse()
              const arr = utils.uniqueArr([...noReadList, ...this.messagePre], 'id')
              this.messagePre = arr.filter((v, i) => i < 5)
              noReadList.length > 0 && this.changeMouseEnter(true)
            })
        });
    },

    getMessageElites() {
      var getTopMesData = {
        "pageNum": "1",
        "pageSize": "5"
      }
      const listen = loading => this.loading = loading;
      CJ_.$axios.post('cujia-message/cj/notification/getInformList', getTopMesData, listen)
        .then(([err, res]) => {
          if (err) {
            console.warn(err);
            return;
          }
          const [e, d] = CJ_.statusCode200(res);
          if (e) {
            console.warn(e);
            return;
          }
          this.messagePre = d.list || [];
          if (this.messagePre.length > 0) {
            let isReadArr = [];
            for (let i = 0; i < this.messagePre.length; i++) {
              isReadArr.push(this.messagePre[i].read_status);
              if (isReadArr.includes(2)) {
                this.isMark = false;
              }
            }
          } else {
            this.noData = true;
          }
        });
    },

    getMessageComment() {
      var getTopMesData = {
        "pageNum": "1",
        "pageSize": "5"
      }
      const listen = loading => this.loading = loading;
      CJ_.$axios.post('cj/appPush/getCJPushInfoListByUserId', getTopMesData, listen)
        .then(([err, res]) => {
          if (err) {
            console.warn(err);
            return;
          }
          const [e, d] = CJ_.statusCode200(res);
          if (e) {
            console.warn(e);
            return;
          }
          const list = d.list || []

          this.messagePre = list.map(_ => {
            const arr = _.picurl.split(',')
            return {
              ..._, 
              img_url_one: arr.length > 0 ? arr[0] : _.picurl 
            }
          });
          if (this.messagePre.length > 0) {
            let isReadArr = [];
            this.messagePre && this.messagePre.forEach(con => {
              con.create_time = con.create_time.split('.')[0];
              isReadArr.push(con.is_read);
              if (isReadArr.includes(2)) {
                this.isMark = false;
              }
            })
          } else {
            this.noData = true;
          }
        });
    },

    // 获取通知数量
    getCount() {
      const listen = loading => this.loading = loading;
      CJ_.$axios.post('app/notification/selectIsNotRead', { isread: 0 }, listen)
        .then(([err, res]) => {
          if (err) {
            console.warn(err);
            return;
          }
          const [e, d] = CJ_.statusCode200(res);
          if (e) {
            console.warn(e);
            return;
          }
          const { elitesCount, pushCount } = d
          CJ_.$axios.post('messageCenterCj/notification/queryCjInformMap', { userId }, listen)
            .then(([err, res]) => {
              if (err) {
                console.warn(err);
                return;
              }
              const { code, data: result = {}} = res
              if (+code !== 200) return;
              const { cjInformNum } = result
              this.messageNum = cjInformNum - -elitesCount - -pushCount
              this.messageTab = this.messageTab.map((v, i) => {
                if (i === 0) v.count = cjInformNum;
                if (i === 1) v.count = elitesCount * 1;
                if (i === 2) v.count = pushCount * 1;
                return v
              })
            })
        });
    },
    // From CJ跳转
    // handleClickFromCJ(item) {
    //   location.href = item.url ? item.url + '&href' : '/myCJ.html#/message-list/' + item.id;
    //   this.getCount();
    // },
    // 消息通知跳转
    toAnother(item) {
      if (this.MessageType == '2') {
        let otime = new Date().getTime();
        if (item.operation_type == '1') {
          window.open(`https://elites.cjdropshipping.com/cross?token=${this.token}&_t=${otime}&url=/personal-index?id=${item.user_id}&page=other`);           //关注
        }
        if (item.operation_type == '4' || item.operation_type == '6' || item.operation_type == '9' || item.operation_type == '10') {
          window.open(`https://elites.cjdropshipping.com/cross?token=${this.token}&_t=${otime}&url=/question-detail?id=${item.detail_id}`);           //问题
        }
        if (item.operation_type == '3' || item.operation_type == '7') {
          window.open(`https://elites.cjdropshipping.com/cross?token=${this.token}&_t=${otime}&url=/question-detail?id=${item.question_id}`);           //问题
        }
        if (item.operation_type == '2' || item.operation_type == '5' || item.operation_type == '8') {
          window.open(`https://elites.cjdropshipping.com/cross?token=${this.token}&_t=${otime}&url=/article-detail?id=${item.detail_id}`);   //文章详情
        }
      } else if (this.MessageType == '3') {
        location.href = '/list-detail?id=' + item.push_id + '&fromType=CommentList';
      }
    },

    toAnother2(item) {
      if (this.MessageType == '2') {
        let otime = new Date().getTime();
        if (item.operation_type == '1') {
          window.open(`https://elites.cjdropshipping.com/cross?token=${this.token}&_t=${otime}&url=/personal-index?id=${item.user_id}&page=other`);           //关注
        }
        if (item.operation_type == '4' || item.operation_type == '6' || item.operation_type == '9' || item.operation_type == '10') {
          window.open(`https://elites.cjdropshipping.com/cross?token=${this.token}&_t=${otime}&url=/question-detail?id=${item.detail_id}`);           //问题
        }
        if (item.operation_type == '3' || item.operation_type == '7') {
          window.open(`https://elites.cjdropshipping.com/cross?token=${this.token}&_t=${otime}&url=/question-detail?id=${item.question_id}`);           //问题
        }
        if (item.operation_type == '2' || item.operation_type == '5' || item.operation_type == '8') {
          window.open(`https://elites.cjdropshipping.com/cross?token=${this.token}&_t=${otime}&url=/article-detail?id=${item.detail_id}`);   //文章详情
        }
      } else if (this.MessageType == '3') {
        location.href = '/list-detail.html?id=' + item.push_id + '&fromType=CommentList';
      }
    },

    // 标记当前全部已读
    toMarkAll() {
      console.log(this.MessageType)
      const postUrl = {
        "1": "messageCenterCj/notification/updateRead",
        "2": "cujia-message/cj/notification/allRead",
        "3": "cj/appPush/updateAppPushIsRead"
      }; 
      const someFun = {
        "1": this.getMessageCJ,
        "2": this.getMessageElites,
        "3": this.getMessageComment,
      };
      const listen = loading => this.loading = loading;
      if(this.MessageType === '1') {
        CJ_.$axios.post(postUrl[this.MessageType], { userId }, listen)
          .then(([err, res]) => {
            if (err) {
              console.warn(err);
              return;
            }
            const { code } = res
            if (code === 200) {
              this.getCount();
              someFun[this.MessageType]();
            }
          })
      } else {
        CJ_.$axios.post(postUrl[this.MessageType], {}, listen)
        .then(([err, res]) => {
          if (err) {
            console.warn(err);
            return;
          }
          const [e, d] = CJ_.statusCode200(res);
          if (e) {
            console.warn(e);
            return;
          }
          this.getCount();
          someFun[this.MessageType]();
        });
      }
     
    },

    // 跳转到对应的消息列表
    toAllMessage() {
      location.href = '/myCJ.html#/all-message/' + this.MessageType;
    },

     // 子账号-路由权限
    disposeHrefFn(href, type) {
      const allMenu = localStorage.getItem('AllPowerMenu') ? CJ_.store.get('AllPowerMenu', { decode: true }) : [];
      const powerMenu = localStorage.getItem('PowerMenu') ? CJ_.store.get('PowerMenu', { decode: true }) : [];
      const res = allMenu.includes(`#${type}`) && !powerMenu.includes(`#${type}`) ? '/myCJ.html#/noPower' : href;
      return res;
    },

    // 登出
    logOut() {
      CJ_.$axios.post('app/platform/quitLogin', {"token": this.token})
        .then(([err, res]) => {
          if (err) {
            console.warn(err);
            return;
          }
          const [e, d] = CJ_.statusCode200(res);
          if (e) {
            console.warn(e);
            return;
          }

          CJ_.store.remove('token');
          CJ_.store.remove('noEncodeToken');
          CJ_.store.remove('utmSource');
          // 退出时清空 cookie / storage email
          CJ_.store.remove('emailVerifyStatus');
          localStorage.setItem('emailVerifyStatus', 0);
          document.cookie = `emailVerifyStatus=0; domain=${__root__domain}`;

          const cookieAttr = { domain: CJ_.getTopDomain() };
          CJ_.$cookie.remove('cjLoginName', cookieAttr);
          CJ_.$cookie.remove('cjLoginToken', cookieAttr);
          // CJ_.$cookie.remove('awc', cookieAttr);
          var exp = new Date();
          exp.setDate(exp.getDate() - 1);
          document.cookie = "awc=" + "123" + ";expires=" + exp.toGMTString();
          location.reload();
        });
    },

    // 获取供应商评价数量
    getcjEvaluation (){
      CJ_.$axios.post('cjEvaluation/getEvalSupplierCount', {})
      .then(([err, res]) => {
        console.log("res",res)
        if (err) {
          console.warn(err);
          return;
        }
        const [e, d] = CJ_.statusCode200(res);
        if (e) {
          console.warn(e);
          return;
        }
        this.evaluteCount = res.data.count;
      });
    },

    //notice鼠标移入移出
    changeMouseEnter(bool) {
      this.noticeFlag = bool
    },

  }
});

// LOGO、SEARCH 部分
new Vue({
  el: '#vue-logo-bar',
  data: {
    queueNum: 0,
    sticky: false,
    searchMerchName: '', // 搜索词
    categoryId: '',
    categoryName: 'All Categories',
    imgSearchShowTips: false,
    queueAnimate: false,
    isCJPub: false, // 是否显示安装google插件的弹窗
    isInstall: false, // 是否已点击安装
    CJPubTitle: i18next.t('common-top-install-cj-chrome-extension'), // 安装google插件弹窗-标题
    CJPubtxt: i18next.t('common-top-we-found-you-have-not-installed-cj-chrome-extension-do-you-want-to-install-it'), // 安装google插件弹窗-内容
    isCrx: false, // 通过检测dom判断是否安装google插件
    yaoliuFlag: true,
    taobaoFlag: true,
    SwitchURL: '', // 加载的第三方地址（1688&淘宝等）
    showCateIcon: false,  // 页面滚动超过类目区域时显示类目图标

    showCate: false,  // 显示类目

    isCategoryHover:false, // 类目hover
    categoryImgUrl:'',
    categories:[], // 分类菜单
    categoriesLoading:false, // 加载分类菜单时的loading
    secondList:[], // 子分类
    isPod: location.pathname.includes('PrintonDemand'),
    fromCountry: getQueryVariable('from') || 'all',
    fromType: getQueryVariable('fromType') || 'all',
    firstCategory:{}, // 保存当前一级类目,
    debounceTimer: false,
  },
  components: {
    guidCard,
  },
  created() {
    window.addEventListener('page-scroll', function (ev) {
      //console.log('scroll', ev);
      this.toggleSticky(ev.detail);
      // 隐藏快捷类目快捷导航
      //this.cateVisible()
    }.bind(this));
    this.TOP_BAR_HEIGHT = $('#top-bar').height();

    CJ_isLogin && this.getQueueList();

    const that = this
    // that.categoriesLoading = true;
    let categoryList = [];
    try {
      categoryList = eval('(' + window.categoryList +')')
    } catch (error) {
    }
    that.categories = categoryList;
    // this.getCateGoryList(function(list){
    //   that.categoriesLoading = false
    //   that.categories = list
    // })
  },

  mounted() {
    // 更新刊登数量
    window.addEventListener('queueNumUpdate', ev => {
      console.log('queueNum',ev.detail);
      this.queueAnimate = true;
      this.queueNum += parseInt(ev.detail.queueNumAdd);
      setTimeout(() => {
        this.queueAnimate = false;
      }, 300);
    });

    const that = this
    // 开启拖拽以图搜图
    cjUtils.addListenGetFilesForDragOver({
      elemId:'searchImgBox',
      ondrop: function(files) {
        that.searchImg(files[0])
      }
    })
  },

  methods: {
    toggleSticky({ scrollTop }) {
      this.sticky = scrollTop > this.TOP_BAR_HEIGHT;
    },

    // 搜索框回车
    enterSearch(event) {
      if (event.keyCode == 13) {
        this.searchByMerchName();
      }
    },
    
    // interesting debounce
    debounce(fn) {
      if (!this.debounceTimer) {
        this.debounceTimer = true
        fn();
        let timer = setTimeout(() => {
          clearTimeout(timer);
          this.debounceTimer = false;
        }, 2000);
      }
    },

    // 搜索
    searchByMerchName() {
      this.debounce(() => {
        if (!this.searchMerchName){
          // 提示
          this.$my_message.info(i18next.t('common-top-please-enter-keywords!'));
          return;
        }
        //埋点触发
        if ($global_tracking) {
          $global_tracking.pushData({
            actionType: "SearchButton_Click",
            elementId: "NCJ029-001",
            list: [
              {
                fieldValue: this.searchMerchName,
                filedName: "searchWords"
              }
            ]
          })
        }
        let categoryNameArr = [
          {
            id: this.categoryId,
            name: this.categoryName
          }
        ];
  
        location.href = `/list-detail?search=${encodeURIComponent(this.searchMerchName)}&id=${this.categoryId}&name=${CJ_.$base64.encode(JSON.stringify(categoryNameArr))}&fromWhere=''`;
      
      })
    },

    // 图片搜索图标提示控制
    imgSearchShowTipsC(){
      this.imgSearchShowTips = !this.imgSearchShowTips;
    },

    // 上传图片-以图搜图
    upLoadImg(event){
      const file = event.target.files[0];
      this.searchImg(file)
    },

    // 以图搜图的操作
    searchImg(file){
      const fileName = file.name;
      // 图片格式 allow: *.jpg/*.png/*.png/*.JPG
      if (!/.png|.jpg|.PNG|.JPG$/.test(fileName)) {
        this.$my_message.info(i18next.t('common-top-invalid-image.-only-jpg-and-png-supported.'));
        return;
      }
      // 图片大小处理
      if (file.size > 1024 * 1024 * 1.5) {
        this.$my_message.info(i18next.t('common-top-1.5mb-is-the-max-image-size'));
        return;
      }
      const url = URL.createObjectURL(file); // 获取图片暂时性链接
      fetch(url)
        .then(pic => pic.blob()) // 通过 fetch 将图片转 blob
        .then(pic => {
          const fr = new FileReader(); // 通过fileReader 转 dataURL
          fr.onload = () => {
            const dataURL = fr.result;
            localStorage.setItem('_search_pic_', JSON.stringify({
              dataURL,
              fileName
            }));
          };
          fr.readAsDataURL(pic);
        })
        .then(() => {
          // 后续跳转处理
          // 利用a标签打开新窗口防止被浏览器阻止弹窗
          const a = document.createElement('a')
          a.setAttribute('target', '_blank')
          a.setAttribute('href', '/list-detail.html?searchImg=1')
          a.click()
          a.remove()
        });
    },

    // 批量刊登获取数量
    getQueueList() {
      let params = {
        pageNum: 1,
        pageSize: 1000,
        shopId: '',
        inputStr: '',
        status: '0' //0--待刊登，1--刊登中，2--刊登失败
      };
      const listen = loading => this.loading = loading;
      CJ_.$axios.post('cj/listedproduct/getListProductCount', params, listen)
        .then(([err, res]) => {
          if (err) {
            console.warn(err);
            return;
          }
          const [e, d] = CJ_.statusCode200(res);
          if (e) {
            console.warn(e);
            return;
          }
          this.queueNum = d.totle;
        });
    },

    // 菜单埋点
    addStatisFun(type, ev) {
      CJ_.$axios.post('pojo/home/addStatisByType', { entryPage: type })
        .then(([err, res]) => {
          if (err) {
            console.warn(err);
            return;
          }
          const [e, d] = CJ_.statusCode200(res);
          if (e) {
            console.warn(e);
            return;
          }
        });
    },

    // 第三方链接跳转（1688&淘宝等）
    goToAliUrl(type) {
      this.addStatisFun(9);
      this.checkCjcrx();
      if (this.isCrx) {
        const switchURL = {
          "1688": 'https://www.1688.com/',
          "taobao": 'https://www.taobao.com/',
          "express": 'https://alitems.com/g/1e8d11449400282ca80416525dc3e8/',
          "shopify": 'https://www.shopify.com'
        }
        window.open(switchURL[type]);
      } else {
        this.isCJPub = true;
      }
    },

    // 检测是否安装google插件
    checkCjcrx(){
      this.isCrx = document.getElementsByTagName('body')[0].getAttribute('data-cjcrx');
      this.isCJPub = !this.isCrx;
    },

    Install() {
      this.isInstall = true;
      this.CJPubTitle = 'Refresh Page Required:';
      this.CJPubtxt =
        'If you had installed the extension, please click Refresh button.';
      window.open(
        'https://chrome.google.com/webstore/detail/cjdropshipping/mbndljkgaoailfnpeodnlejigmkdpokb?utm_source=chrome-ntp-icon'
      );
    },

    Cancel() {
       this.isCJPub = false;
     },

    Refresh() {
      this.isCJPub = false;
      location.reload();
    },
    // watch visible cate
    cateVisible() {
      //console.log('scroll');
      const { top, height } = getClientReat(document.querySelector('.category'));
      if (height + top - 98 < 0) {
        this.showCateIcon = true;
      } else {
        this.showCateIcon = false;
      }
      console.log(this.showCateIcon);
    },
    // 显示类目
    enterCateIcon() {
      this.showCate = true;
    },
    leaveCateIcon() {
      this.showCate = false;
    },
    
    // 获取分类
    // getCateGoryList(callback){
    //   CJ_.$ajax('app/product/categorylist?pid=', {
    //     headers:{
    //       language: localStorage.getItem('lng') || 'en'
    //     }
    //   }).then(function([err,res]) {
    //     if(err) return []
    //     const [e, d] = CJ_.statusCode200(res);
    //     if(e) callback([])
    //     callback(d)
    //   }) 
    // },

    // 为分类添加列表link
    addLinkToCateTAT() {
      const that = this
      that.secondList.forEach(function (o2, i) {
        var itemArr = [that.firstCategory, o2];
        var arr = [];
        itemArr.forEach(item => {
          arr.push({ id: item.id, name: item.nameEn })
        })
        o2.aLink = '/list-detail?id=' + o2.id + '&name=' + bs.encode(JSON.stringify(arr)) + '&from=' + that.fromCountry + '&fromType=' + that.fromType;
        o2.children.forEach(o3 => {
          var itemArr = [that.firstCategory, o2, o3];
          var arr = [];
          itemArr.forEach(item => {
            arr.push({ id: item.id, name: item.nameEn })
          })
          o3.aLink = '/list-detail?id=' + o3.id + '&name=' + bs.encode(JSON.stringify(arr)) + '&from=' + that.fromCountry + '&fromType=' + that.fromType;
        })
      })
    },

    // 获取二级分类
    getSecondData(category, type){
      const that = this
      that.categories = that.categories.map(function(item){
        return {...item, isHover: type === 'mouseenter' ? item.id === category.id : false}
      })
      that.firstCategory = category
      that.secondList = type === 'mouseenter' ? category.children || [] : []

      that.addLinkToCateTAT()
    },

    // 点击类目进行搜索
    toMerchList(id, list){
      const that = this
      if (that.isPod) {
        const _obj = list[0] || {}
        location.href = `/PrintonDemand.html?Search=&category=${bs.encode(JSON.stringify({
          id: _obj.id,
          name: _obj.nameEn
        }))}`
      } else {
        let arr = []
        list.forEach(item => {
          arr.push({id: item.id, name: item.nameEn})
        })
        arr = bs.encode(JSON.stringify(arr))
        location.href = `/list-detail?id=${id}&name=${arr}&from=${that.fromCountry}&fromType=${that.fromType}`
      }
    }
  },
});

const scrollWarehouses = () => {
  const warehousesDom = document.querySelector('.Warehouses-box')
  const warehousesArrDom = document.querySelector('.arrow-container .arrow')
  if (warehousesDom && warehousesArrDom) {
    warehousesDom.addEventListener('scroll', function (ev) {
      const top = ev.target.scrollTop + ev.target.clientHeight
      if (top > ev.target.scrollHeight - 30) {
        warehousesArrDom.classList.add("deg");
      } else {
        warehousesArrDom.classList.remove("deg");
      }
    });
  }
}

const createLottieAnimation = () => {
  const navItem5 = document.getElementById('navItem5')
  const dom = document.getElementById('myCJOutLine')
  
  if(!dom) return ;
  lottie.loadAnimation({
    container: dom, // the dom element that will contain the animation
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '/egg/image/myCJWhite.json'// the path to the animation json
  });
}

// 头部菜单部分
new Vue({
  el: '#vue-top-nav',
  data: {
    topnavOver1: false, // 头部菜单悬浮下拉-授权 
    topnavOver2: false, // 头部菜单悬浮下拉-仓库
  },

  created(){
    createWarehouseStockCache(); // 当前语言仓库翻译数据缓存
    setTimeout(() => {
      createLottieAnimation(); // My CJ 动效
    }, 2000)
    
  },
  mounted() {
    this.$nextTick(function () {
      scrollWarehouses();
    })
  },

  methods: {
    // 更新需验证url
    updateAuthHref(ahref, auth = false) {
      let authHref = auth ? CJ_.authLoginUrl(ahref) : ahref;
      // console.log("event",event.target.href)
      event.target.href = authHref;
    },
    updateAuthHrefNew(ahref, auth = false) {
      let authHref = auth ? CJ_.authLoginUrl(ahref) : ahref;
      location.href = authHref;
    },
    warehousesMouseover() {
      const warehousesArrDom = document.querySelector('.arrow-container .arrow')
      warehousesArrDom.style.width = document.querySelector('.Warehouses-box li').offsetWidth + 'px'
    },
    scrollSmoothTo(dom, position) {
      if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (callback, element) {
          return setTimeout(callback, 17);
        };
      }
      // 当前滚动高度
      var scrollTop = dom.scrollTop;
      // 滚动step方法
      var step = function () {
        // 距离目标滚动距离
        var distance = position - scrollTop;
        // 目标滚动位置
        scrollTop = scrollTop + distance / 5;
        if (Math.abs(distance) < 1) {
          dom.scrollTo(0, position);
        } else {
          dom.scrollTo(0, scrollTop);
          window.requestAnimationFrame(step);
        }
      };
      step();
    },
    warehousesArrowClick() {
      const warehousesDom = document.querySelector('.Warehouses-box')
      const top = warehousesDom.scrollTop + warehousesDom.clientHeight
      if (top > warehousesDom.scrollHeight - 30) {
        this.scrollSmoothTo(warehousesDom,0)
        return
      }
      const scrollTopNum = 38 * 5 + warehousesDom.scrollTop
      this.scrollSmoothTo(warehousesDom,scrollTopNum)
    }
  }
})

// 头部未验证邮箱提示
new Vue({
  el: '#vue-unverify-tip',
  data: {
    email: CJ_.store.get('email', { decode: true }),
    emailVerifyStatus: CJ_.store.get('emailVerifyStatus') || 1, // 1 邮箱已验证 3 邮箱未验证
  },
  methods: {
    // 去验证邮件页面
    handleVerifyEmail(){
      location.href = `/verify_email.html?target=${CJ_.$base64.encode(location.href)}`
    }
  },
})