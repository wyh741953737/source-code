import './right-side-admin'; // 个人中心 benner 右侧
import './vue-right-knowledge'; // 首页 You may want to know
import './floor-vue'; // 楼层相关
import './floor-indicate'; // 楼层联动指示
import { login, saveDataAfterLogin } from './commonLogin';
import { addChatBody, addGuidWindow, debounce } from '../global/utils';
// import { syncFloorState } from './floor-sync'; // 楼层状态同步 useless 已用 vue 渲染 04-18
// import './product-card'; // 商品卡片处理，服务端渲染才会起作用

// 底部二维码
new Vue({
  el: '#vue-qr-code',
  data: {
    logined: CJ_isLogin,
  },
  created() {
    // erp tocj
    const _that = this;
    const username = CJ_.getQueryVariable('username');
    const tempassword = CJ_.getQueryVariable('tempassword');
    const operateuser = CJ_.getQueryParam('operateuser');// 拿到的是经过base64加密的字符串
    if (username && tempassword) {
      login({
        name: decodeURIComponent(username),
        passwd: decodeURIComponent(tempassword),
        chatType: "0",
        platform: 'pc',
        isTOCJ: 'true'
      }, function (data) {
        if (data.statusCode != 200) {
          _that.$my_message.info(data.message);
        } else {
          // 保存登录信息
          CJ_.store.set('loginfromerp', '1'); // 标记从erp过来的模拟登录
          CJ_.store.set('erpoperateuser', operateuser) // 记录从erp过来的操作用户
          let cookieObj = { expires: 3, domain: __root__domain }
          CJ_.$cookie.set('loginfromerp', '1', cookieObj);
          CJ_.$cookie.set('erpoperateuser', operateuser, cookieObj);
          saveDataAfterLogin(data.result);
          location.href = 'home.html';
        }
      })
    } else {
      // 如果不是erp过来的登录，加载聊天
      !CJ_.store.get('loginfromerp') && addChatBody();
      !CJ_.store.get('loginfromerp') && addGuidWindow();
    }

    // 存储分销分享的token
    const affiliate_token = CJ_.getQueryParam("token");
    affiliate_token && CJ_.$cookie.set('invite-token',affiliate_token)

    // 其他应用通过token登陆cj
    let accessToken = CJ_.getQueryVariable('accessToken');
    if (accessToken) {
      accessToken = CJ_.$base64.decode(accessToken);
      const redirectUrl = decodeURI(CJ_.getQueryVariable('redirectUrl') ? CJ_.getQueryVariable('redirectUrl') : '') || '';
      const params = {
        headers: {
          token: accessToken
        },
        method: 'POST',
        url: 'app/platform/getAccountInfo',
        opts: {},
      }
      CJ_.$axios.httpNew(params)
        .then(([err, res]) => {
          if (err) {
            console.warn(err);
            return;
          }
          if (res.statusCode && res.statusCode == 200) {
            saveDataAfterLogin(res.result);
            let goUrl = redirectUrl || 'home.html';
            location.href = goUrl;
          }
        });
    }

  },
  methods: {
    subscribe() {
      console.log(arguments);
      window.postMessage({ flag: "openSubscribe", }, "*")
    }
  },
});

// 授权
new Vue({
  el: '#vue-auth-callback',
  data: {
    authFailLayer: false,
    authFailMes: '',
  },
  mounted() {
    // ebay授权
    const ebaytype = CJ_.getQueryVariable('type');
    const statename = CJ_.getQueryVariable('state');
    const eabyCode = CJ_.getQueryVariable('code');
    if (ebaytype == 'ebay' && eabyCode) {
      const ebayParams = { ebaytype, statename, eabyCode };
      // 分销域名通过app授权店铺需要
      if (location.host == 'app.cjdropshipping.com' || location.host == 'cjdropshipping.com') {
        CJ_.$axios.post('cj/account/getYm', {
          name: statename,
          type: "ebay"
        }).then(([err, res]) => {
          if (err) {
            console.warn(err);
            return;
          }
          if (res.statusCode == 200 && res.isTz) {
            location.href = 'http://' + data.data.domainName + '/home.html' + window.location.search;
          } else {
            this.ebayAuth(ebayParams);
          }
        });
      } else {
        this.ebayAuth(ebayParams);
      }
    }

    // 已经通过cjapp授权，后面通过shopify登录-自动登录
    const shopToken = CJ_.getQueryVariable('shopToken');
    if (statename == 'cjdropshipping') {
      CJ_.$axios.post('app/account/automaticLogin', {
        shopToken
      }).then(([err, res]) => {
        if (err) {
          console.warn(err);
          return;
        }
        if (res.statusCode == 200) {
          // 保存登录信息
          saveDataAfterLogin(res.result);
          CJ_.store.set('isFirstLogin', '1');
          CJ_.store.set('isEmpower', '2');
          location.href = 'home.html';
        }
      });
    }

  },

  methods: {
    // ebay授权
    ebayAuth(ebayParams) {
      CJ_.$axios.post('ebay/accredit', {
        type: ebayParams.ebaytype,
        name: ebayParams.statename,
        ebayCode: ebayParams.eabyCode
      }).then(([err, res]) => {
        if (err) {
          console.warn(err);
          return;
        }
        if (res.statusCode == 200) {
          this.$my_message.info('Authorization  Successfully');
        } else {
          this.authFailLayer = true;
          this.authFailMes = 'Authorization Failed'; //res.message || 'Authorization Failed';
        }
      });
    },

    reAuthorize (shoptype) {
      if (shoptype == 'ebay') {
        location.href = 'myCJ.html#/authorize/Ebay';
      }
    },

  }
});
function isView (el) {
  // console.log(el,"555555555555")
  const viewPortHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  const top = el.getBoundingClientRect() && el.getBoundingClientRect().top;
  // console.log('top', top)
  return top  <= viewPortHeight - 50;
}

export const animation = () => {
  // 图片dom集合
  const itemOne = document.getElementById("img-one")
  const itemTwo = document.getElementById("img-two")
  const itemThree = document.getElementById("img-three")
  const itemFour = document.getElementById("img-four")
  const itemFive = document.getElementById("img-five")
  const itemSix = document.getElementById("img-six")
  const itemSeven = document.getElementById("img-seven")
  const itemEight = document.getElementById("img-eight")
  const itemNine = document.getElementById("img-nine")
  const swiperWrap = document.getElementById("swiper-evalute");
  // 文字dom集合
  const itemTextOne = document.getElementById("textOne")
  const itemTextTwo= document.getElementById("textTwo")
  const itemTextThree= document.getElementById("textThree")
  const itemTextFour= document.getElementById("textFour")
  const itemTextFive= document.getElementById("textFive")
  const itemTextSix= document.getElementById("textSix")
  const itemTextSeven= document.getElementById("textSeven")
  const title= document.getElementById("title")
  // 图片集合
  const viewSwiperWrap = isView(swiperWrap);
  const viewOne = isView(itemOne)
  const viewTwo = isView(itemTwo)
  const viewThree = isView(itemThree)
  const viewFour = isView(itemFour)
  const viewFive = isView(itemFive)
  const viewSix = isView(itemSix)
  const viewSeven = isView(itemSeven)
  const viewEight = isView(itemEight)
  const viewNine = isView(itemNine)
  if(viewOne){
    itemOne.classList.add("img-animation")
  }
  if(viewTwo){
    itemTwo.classList.add("img-animation")
  }
  if(viewThree){
    itemThree.classList.add("img-animation")
  }
  if(viewFour){
    itemFour.classList.add("img-animation")
  }
  if(viewFive){
    itemFive.classList.add("img-left-top-animation")
  }
  if(viewSix){
    itemSix.classList.add("center-animation")
  }
  if(viewSeven){
    itemSeven.classList.add("img-right-bottom-animations")
  }
  if(viewEight){
    itemEight.classList.add("left-code-show")
  }
  if(viewNine){
    itemNine.classList.add("link-button-show")
  }
  if(viewSwiperWrap){
    swiperWrap.classList.add("img-right-bottom-animation")
  }
  // 文字集合
  const viewTitle = isView(title)
  const viewTextOne = isView(itemTextOne)
  const viewTextTwo = isView(itemTextTwo)
  const viewTextThree = isView(itemTextThree)
  const viewTextFour = isView(itemTextFour)
  const viewTextFive = isView(itemTextFive)
  const viewTextSix = isView(itemTextSix)
  if(viewTextOne){
    itemTextOne.classList.add("homepage-head-up")
    itemTextSeven.classList.add("head-detail-center-move")
  }
  if(viewTextTwo){
    itemTextTwo.classList.add("left-enter")
  }
  if(viewTextThree){
    itemTextThree.classList.add("center-text-up")
  }
  if(viewTextFour){
    itemTextFour.classList.add("right-enter")
  }
  if(viewTextFive){
    itemTextFive.classList.add("cooperation-detail-move")
  }
  if(viewTextSix){
    itemTextSix.classList.add("left-title-move")
  }
  if(viewTextSix){
    itemTextSix.classList.add("left-title-move")
  }
  if(viewTitle) {
    title.classList.add("left-title-move")
  }
}
const animateDebounce = debounce(animation,30);
new Vue({
  el: '#vue-companylogo',
  data: {
    // trankNum:"5555",
    coopList:[],
    hrefData:location.origin
  },
  created(){
  },
  mounted() {
    document.addEventListener("scroll",animation)
  },
  destroyed:()=>{
    document.removeEventListener("scroll",animation)
  },
  methods: {
    clicknow() {
      const item = document.getElementById("tranNum")
      const value = item.value
      window.open(`https://cjpacket.com/?trackingNumber=${value}`)
    },
    appclick(){
      window.open("https://apps.apple.com/cn/app/cjdropshipping/id1458056352")
    },
    googleclick(){
      window.open("https://play.google.com/store/apps/details?id=com.cjdropshipping.app")
    },
    trycountlink(){
      window.open("https://app.cjdropshipping.com/calculation.html")
    },
    cooperationlink(type){
      if(type == 1) {
        location.href=`${location.origin}/partnership/home`;
      } else if(type == 2) {
        location.href='https://affiliate.cjdropshipping.com';
      }
     
      // location.href = 'https://affiliate.cjdropshipping.com/#/home';
    },
    sortFun(arr){
      return arr.sort((a, b)=> a.recommendPosition - b.recommendPosition)
    },
    // getTrankNum(e){
    //   const item = document.getElementById("tranNum")
    //   const value = item.value
    //   console.log(value,e.target.value)
    // }
  }
})
//三级目录
new Vue({
  el: '#vue-banner-wrap',
  beforeCreate() {
  },
  data: {
  },
});

//底部链接
new Vue({
  el: '#vue-get-more',
  beforeCreate() {
  },
  data: {
  },
});

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

function getCookie(c_name) {
  if (document.cookie.length > 0) {
    let c_start = document.cookie.indexOf(c_name + "=")
    if (c_start != -1) {
      c_start = c_start + c_name.length + 1
      let c_end = document.cookie.indexOf(";", c_start)
      if (c_end == -1) c_end = document.cookie.length
      return document.cookie.substring(c_start, c_end)
    }
  }
  return ""
}

 function delCookie(name) {
    // console.log("__root__domain",__root__domain)
    var exp = new Date();
    exp.setDate(exp.getDate() - 1);
    var cval = getCookie(name);
    if (cval != null) 
      document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + `;domain=${__root__domain}`;
}

function setAwcCookie(){
  let urlLinkStr = location.search;
  console.log(urlLinkStr)
  if(urlLinkStr && urlLinkStr.indexOf('?') != -1){
    let queryAwcObj = {};
    let queryStr = urlLinkStr.substr(1) //substr()方法返回从参数值开始到结束的字符串；
    let queryStrs = queryStr.split('&')
    for (let i = 0; i < queryStrs.length; i++) {
      queryAwcObj[queryStrs[i].split('=')[0]] = queryStrs[i].split('=')[1]
    }
    if(queryAwcObj.awc){
      let exp = new Date(); 
      exp.setTime(exp.getTime() + 365*24*60*60*1000);
      document.cookie = "awc" + "="+ escape(queryAwcObj.awc) + ";expires=" + exp.toGMTString();
      document.cookie = "utm_source=awin;expires=" + exp.toGMTString();
      if(queryAwcObj.awinaffid){
        document.cookie = "awinaffid="+escape(queryAwcObj.awinaffid)+";expires=" + exp.toGMTString();
      }
      let invite = getCookie("invite-token")
      if(invite){
         delCookie("invite-token")
      }
    }
  }
}

let loginName = localStorage.getItem("loginName")
if(!loginName){
  setAwcCookie()
}




// const halloween = document.getElementById('halloween');
// if(!sessionStorage.getItem('halloweenOpen')) {
//   sessionStorage.setItem('halloweenOpen', 'true')
// }
// if(sessionStorage.getItem('halloweenOpen') === 'true') {
//   halloween.style.display = 'block';
//   if(halloween) {
//     const params = {
//       container: halloween,  //播放的位置
//       renderer: 'svg', 
//       loop: false, //是否循环播放 
//       autoplay: true, //是否自动播放
//       path: '/egg/image/halloween/openAnimation/data.json'
//     };
//     var anim;
//     anim = lottie.loadAnimation(params); //  加载
//     anim.setSubframe(false)
//     anim.addEventListener('DOMLoaded', () => {
//       sessionStorage.setItem('halloweenOpen', 'false')
//       const halloweenStartBtn = document.getElementById('halloween-start-btn');
//       const halloweenCloseBtn = document.getElementById('halloween-close-btn');
//       if (halloweenStartBtn) {
//         const banners = JSON.parse(halloween.getAttribute('banners'))
//         var data = banners.find(item => item.urlOrSku.includes('/halloween/activity-page'))
//         if(data) {
//           halloweenStartBtn.onclick = () => {
//             window.open(data.urlOrSku) // 万圣节出场动画跳转链接
//           }
//         }
//       }
//       if (halloweenCloseBtn) {
//         halloweenCloseBtn.onclick = () => {
//           anim.destroy()
//           halloween.style.display = 'none';
//         }
//       }
//     });
//   }
// }

// 登录后的一些操作
; !function loginedHandle() {
  if (!CJ_isLogin) {
    return;
  }




}();
