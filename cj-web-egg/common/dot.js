/**
 *首页 埋点工具
 * @author zhou miao
 * @since 2020/8/17
 */
const utils = require('./utils');
const axios = require('axios');
/**
   * 添加全局埋点
   */
  var browerObj = getBrowser();
  var dot = {
    default: {
      exposureItem: null, // 统计页面中需要添加眼球曝光埋点的DOM元素
      showExposureData: [], // 添加眼球曝光的埋点数据
      maxNum: 50, // 数据累计多少条上报一次
      time: 5000, // 多久上报一次，这里是5000ms
    },

    // 客户端基本信息
    params: {
      browser: navigator.userAgent, // 浏览器信息
      title: document.title, // 页面标题
      resolve: window.screen.width + 'x' + window.screen.height + '(px)', // 设备分辨率
      deviceType: 'pc', // 设备类型
      language: navigator.language, // 客户端语言
      link: location.href, // 页面链接
    },

    result: {
      conversationId: '',//浏览器会话id
      userId: localStorage.getItem('userId') ? localStorage.getItem('userId') : '', //客户id 用来区分是否游客
      pageCode: '', //页面代号
      operationPageAddress: location.href, //父类操作页面的全路径
      operationSequence: 0, //用户操作行为顺序
      source: '', //点击来源
      eventType: 0, //0 曝光事件 例如商品的曝光 1 按钮点击事件 2 浏览事件
      buttonName: '',//按钮名称
      buttonType: 0,// 0 ,1是否需要去查询级联关系
      productId: [],//产品id集合
      bName: browerObj.appname, //浏览器名称
      bVersion: browerObj.version, //浏览器版本
      bLanguage: navigator.language, //浏览器语言
      cardName: ''
    },

    keyWords: {
      account: ["userName"],
      productId: ["productData.id", "detailId", "productId"],
      collection: ['collectType','product.isCollect','prod.isCollect'],
    },
    
    videoTimerRecord: {}//会话-视频ID结合作为键，开始播放时记录起始时间，JS定时更新, 计算最后更新值与起始时间的差值即是观看时长 

  }

  // 如果页面中存在上一次没有提报表的埋点，先进行提报
  dotFromLocalStorage()
  // 注册客户端app webview的关闭生命钩子事件
  // this.beforeLeaveWebview()
  let that = dot
  let timer
  let showExposureData = that.default.showExposureData
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry, index) => {
      // 这段逻辑，是每一个被观察的组件进入视窗时都会触发的
      if (entry.isIntersecting) {
        // 把进入视口的组件数据添加进待上报的数据对象中
        let show = entry.target.attributes['cjdotshow'].value;
        // console.log("我看见了++++++++++++++++++++" + show )
        show = JSON.parse(show)
        let curObj = JSON.parse(JSON.stringify(dot.result))
        curObj.pageCode = show['pageCode'];
        curObj.eventType = show['eventType'];
        curObj.conversationId = getSessionId();
        curObj.operationSequence = getOptionOrderFun();
        curObj.buttonName = show['buttonName'];
        if(show['cardName']){
          curObj.cardName = show['cardName'];
        }
        curObj.operationPageAddress = location.href;
        if (show['keys']) {
            change(show['keys'], dot.keyWords, curObj);
        }
        showExposureData.push(curObj)
        // 清除当前定时器
        clearTimeout(timer)
        // 停止观察进入视口的组件
        observer.unobserve(entry.target)
        // 超过一定数量埋点，上报后会删除这一批
        if (showExposureData.length >= that.default.maxNum) {
          console.log(showExposureData,'showExposureData')
          let paraObj = paramesFun(showExposureData);
          mdPostFun(paraObj)
          // showExposureData.forEach(data => {
          //   mdPostFun(data)
          // })
          dot.result.productId = [];
          showExposureData.length = 0
        } else {
          if (showExposureData.length > 0) {
            // 有新的数据进来，但是不满足上报数量，n秒后也上报
            let paraObj = paramesFun(showExposureData);
            localStorage.setItem('showExposureData', JSON.stringify(paraObj))
            timer = setTimeout(() => {
              console.log(showExposureData,'showExposureData====')
              console.log(paraObj)
              mdPostFun(paraObj)
              // showExposureData.forEach(data => {
              //   mdPostFun(data)
              // })
              dot.result.productId = [];
              showExposureData.length = 0
            }, that.default.time)
          }
        }
      }
    })
  }, {
    root: null, // 默认根节点是视口
    rootMargin: '0px',
    threshold: 0.7 // 全部进入视口才被观察  这个阈值介于0和1之间
  })

exports.init = Vue => {
  //点击事件埋点
  Vue.directive('cjstat', {
    bind: function (el, binding, vnode) {
      el.addEventListener('click', (e) => {
        // console.log("我被点击了+++++++++++",binding,el)
        let show = binding.value;
        // console.log(show)
        dot.result.productId = [];
        let curObj = JSON.parse(JSON.stringify(dot.result))
        curObj.pageCode = show['pageCode'];
        curObj.eventType = show['eventType'];
        curObj.conversationId = getSessionId();
        curObj.operationSequence = getOptionOrderFun();
        curObj.buttonName = show['buttonName'];
        curObj.buttonType = show['buttonType'];
        if(show['cardName']){
          curObj.cardName = show['cardName'];
        }
        curObj.operationPageAddress = location.href;
        if (show.keys) {
            change(show.keys, dot.keyWords, curObj);
        }
        let curList = [];
        curList.push(curObj)
        let paraObj = paramesFun(curList);
        mdPostFun(paraObj)
      }, false)
    }
  })
 //曝光事件埋点
 Vue.directive('cjdot', {
    bind: function (el, binding, vnode) {
      observer.observe(el)
    }
  })

}


    /**
   * 后端字段和前端字段适配方法
   * @param {*} action 
   */
  function change(keys, keyWords, curObj) {
    let flag = false;
    keys.forEach(item => {
      flag = true;
      for (var key in keyWords) {
        keyWords[key].forEach(
          word => {
            if (item.key == word) {
              if (key == 'productId' && flag) {
                curObj.productId.push(item.value);
                flag = false;
              } else {
                curObj[key] = item.value;
              }
            }
          }
        )
      }
    })
  }
  
  /**
   * 拿到或生成会话id
   */
  function getSessionId() {
    let sessionId = sessionStorage.getItem('conversationId')
    if (!sessionId) {
      sessionId = (Math.random() * 10000000).toString(16).substr(0, 4) + '-' + (new Date()).getTime().toString().substr(6) + '-' + Math.random().toString().substr(2, 5);
      sessionStorage.setItem('conversationId', sessionId)
    }
    return sessionId;
  }

  /**
   * 用户操作行为顺序
   */
  function getOptionOrderFun() {
    let curOptionOrderId = sessionStorage.getItem('optionOrderId')
    if (curOptionOrderId) {
      curOptionOrderId = curOptionOrderId - 0 + 1;
      sessionStorage.setItem('optionOrderId', curOptionOrderId);
    } else {
      sessionStorage.setItem('optionOrderId', 0)
      curOptionOrderId = 0;
    }
    return curOptionOrderId;
  }
  //组装参数
  function paramesFun(list){
    let paraObj = {
      collectionParaList: []
    };
    paraObj.collectionParaList = JSON.parse(JSON.stringify(list));
    return paraObj
  }
  /**
   * 发送数据到后台
   * @param {发送数据到后台} parames 
   */
  function mdPostFun(parames) {
    let url =  utils.getDomainByUrl("collection/dot/saveDot");
    axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';
    axios.defaults.headers['Accept'] = 'application/json;charset=UTF-8';
    axios.defaults.headers['token'] = typeof window == 'undefined' ? '' : utils.$base64.decode(localStorage.getItem('token') || '')
    axios.post(url, parames);
  }

  /**
   * 清除浏览器本地记录
   */
  function dotFromLocalStorage() {
    let localmesText = localStorage.getItem('showExposureData')
    if (localmesText) {
      mdPostFun(localmesText)
      // let localArr = JSON.parse(localmesText)
      // localArr.forEach(item => {
      //   mdPostFun(item)
      // })
    }
    localStorage.removeItem('showExposureData')
  }

  function getBrowser(){//浏览器信息
    var browser = {
      msie: false,
      firefox: false,
      opera: false,
      safari: false,
      chrome: false,
      netscape: false,
      appname: 'unknown',
      version: 0
    };
    var ua = window.navigator.userAgent.toLowerCase();
    if (/(msie|firefox|opera|chrome|netscape)\D+(\d[\d.]*)/.test(ua)) {
      browser[RegExp.$1] = true;
      browser.appname = RegExp.$1;
      browser.version = RegExp.$2;
    } else if (/version\D+(\d[\d.]*).*safari/.test(ua)) {
    // safari
      browser.safari = true;
      browser.appname = 'safari';
      browser.version = RegExp.$2;
    }
    return browser;
  }
