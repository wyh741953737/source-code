/**
 * 埋点工具
 * @author zhou miao
 * @since 2020/8/11
 */
; (function () {
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
      productId: ["productData.id", "detailId", "id", "productId"],
      collection: ['collectType'],
    },

    videoTimerRecord: {}//会话-视频ID结合作为键，开始播放时记录起始时间，JS定时更新, 计算最后更新值与起始时间的差值即是观看时长 

  }
  // 注册客户端app webview的关闭生命钩子事件
  let that = dot
  let timer
  let globelDsp
  let showExposureData = that.default.showExposureData
  var observer = new IntersectionObserver(function (entries) {

    entries.forEach((entry, index) => {
      // 这段逻辑，是每一个被观察的组件进入视窗时都会触发的
      if (entry.isIntersecting) {
        // console.log("位置+++++++++++index: " + index)
        // 把进入视口的组件数据添加进待上报的数据对象中
        // console.log("我被看见了:" + entry.target.attributes['cjdotshow'].value)
        let show = entry.target.attributes['cjdotshow'].value;
        show = JSON.parse(show)
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
        if (location.href.indexOf('myCJ.html') != -1) {
          curObj.pageCode = 'myCJ'
        } else {//非mycj模块页面(主要针对公共组件 在哪个页面操作)
          let pathName = queryPageCodeFun(location.pathname)
          if (pathName) {
            curObj.pageCode = pathName;
          }
        }
        if (show.keys) {
          change(show.keys, dot.keyWords, curObj);
        }
        showExposureData.push(curObj)
        // 清除当前定时器
        clearTimeout(timer)
        // 停止观察进入视口的组件
        observer.unobserve(entry.target)
        // 超过一定数量埋点，上报后会删除这一批
        if (showExposureData.length >= that.default.maxNum) {
          // showExposureData.forEach(data => {
          //   dspPostFun(data)
          // })
          let paraObj = paramesFun(showExposureData);
          mdPostFun(paraObj)
          dot.result.productId = [];
          showExposureData.length = 0

        } else {
          if (showExposureData.length > 0) {
            // 有新的数据进来，但是不满足上报数量，n秒后也上报
            let paraObj = paramesFun(showExposureData);
            localStorage.setItem('showExposureData', JSON.stringify(paraObj))
            timer = setTimeout(() => {
              dspPostFun(paraObj)
              // showExposureData.forEach(data => {
              //   dspPostFun(data)
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
  function queryPageCodeFun(url) {
    let pathName = url;
    if (pathName && pathName.indexOf('/') != -1) {
      pathName = pathName.substr(1).split('.')[0]
    }
    return pathName
  }
  var app = angular.module('cjDotModule', ['service']);
  /**
   * 事件埋点
   */
  app.directive('cjstat', function (dsp) {
    return {
      link: function (scope, element, attrs) {
        // console.log('service--------==========',dsp)
        globelDsp = dsp;
        // 如果页面中存在上一次没有提报表的埋点，先进行提报
        dotFromLocalStorage()
        element.bind("click", function () {
          // console.log(element)
          let show = attrs.cjstatshow;
          show = JSON.parse(show)
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
          if (location.href.indexOf('myCJ.html') != -1) {
            curObj.pageCode = 'myCJ'
          } else {//非mycj模块页面(主要针对公共组件 在哪个页面操作)
            let pathName = queryPageCodeFun(location.pathname)
            if (pathName) {
              curObj.pageCode = pathName;
            }
          }
          if (show.keys) {
            change(show.keys, dot.keyWords, curObj);
          }
          let curList = [];
          curList.push(curObj)
          let paraObj = paramesFun(curList);
          dspPostFun(paraObj)
        });
      }
    }
  });
  /**
   * 视图埋点
   */
  app.directive('cjdot', function (dsp) {
    return {
      link: function (scope, element, attrs) {
        // console.log("观察了一个元素")
        globelDsp = dsp;
        observer.observe(element[0])
      }
    }
  });

  /**
   * 视频埋点
   */
  app.directive('cjvideo', function (dsp) {
    return {
      link: function (scope, element, attrs) {
        const pageSearch = location.search
        const currentProdId = pageSearch.substring(pageSearch.indexOf('?') + 1, pageSearch.indexOf('&'))
        globelDsp = dsp;
        scope.videoList.forEach((item, idx) => {
          const productId = item.locProductId;
          let flag = false;
          //定时的作用是等待视频准备就绪
          let timer = setInterval(() => {
            const eleId = `J_prismPlayer${idx + 1}`;
            let player = scope.videoPlayers[eleId];
            if (player) {
              const vodieSourceUrl = player.getSourceUrl()
              // player.on('ready',() => {
              //     console.log("视频准备好了")
              // });
              player.on('play',() => {
                console.log("视频开始播放")
                $global_tracking.pushData({
                  actionType: "product_video_play",
                  elementId: "009",
                  list: [
                    {
                      fieldValue: currentProdId,
                      filedName: "productId"
                    }
                  ]
                })
              });
              player.on('pause', () => {
                var curTime = parseInt(player.getCurrentTime());
                var duration = parseInt(player._duration)
                $global_tracking.pushData({
                  actionType: "product_video_pause",
                  elementId: "010",
                  list: [
                    {
                      fieldValue: currentProdId,
                      filedName: "productId"
                    },
                    {
                      fieldValue: curTime,
                      filedName: "playTime"
                    }
                  ]
                })
                
                if(curTime < duration){
                  sendVideoData(vodieSourceUrl, curTime, productId)
                  // console.log("视频暂停了")
                }
               
              });
              // player.on('playing',() => {
              //   console.log("视频播放中")
              // });
              player.on('ended', () => {
                var curTime = parseInt(player.getCurrentTime());
                sendVideoData(vodieSourceUrl, curTime, productId);
                // console.log("视频播放结束")
              });
              flag = true;
            }
            if (flag) {//此时视频已准备就绪,关闭定时
              clearTimeout(timer)
            }
          }, 2000);
        })
      }
    }
  });

  /**
   * 返送视频观看数据
   */
  function sendVideoData(videoSourceUrl, curTime, productId) {
    let currentResult = JSON.parse(JSON.stringify(dot.result))
    currentResult.conversationId = getSessionId();
    currentResult.operationSequence = getOptionOrderFun();
    currentResult.videoSourceUrl = videoSourceUrl
    currentResult.curTime = curTime
    currentResult.productId.push(productId)
    let curList = [];
    curList.push(currentResult)
    let paraObj = paramesFun(curList);
    dspPostFun(paraObj)
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
   * 处理获取包含'.'的多层属性值,例如product.id, 拿到页面绑定数据product的商品id属性的值
   * @param {*} scope 
   * @param {*} actions 
   */
  function getMoreAction(scope, actions) {
    let acsList = actions.split(".");
    let result
    acsList.forEach(action => {
      if (result) {
        result = result[action]
      } else {
        result = scope[action]
      }

    })
    return result;
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

  /**
   * 发送数据到后台
   * @param {发送数据到后台} parames 
   */
  function dspPostFun(parames) {
    globelDsp.maiDianPostFun('collection/dot/saveDot', parames, function () {

    })
  }
  //组装参数
  function paramesFun(list) {
    let paraObj = {
      collectionParaList: []
    };
    paraObj.collectionParaList = JSON.parse(JSON.stringify(list));
    return paraObj
  }
  /**
   * 清除浏览器本地记录
   */
  function dotFromLocalStorage() {
    let localmesText = localStorage.getItem('showExposureData')
    if (localmesText) {
      let paraObj = JSON.parse(localmesText)
      dspPostFun(paraObj)
      // let localArr = JSON.parse(localmesText)
      // localArr.forEach(item => {
      //   dspPostFun(item)
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
}());