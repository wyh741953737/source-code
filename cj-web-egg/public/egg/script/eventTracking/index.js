/**
 * 埋点工具
 */
import utils from '@common/utils';
const axios = require('axios');

export const EventTracking = (cg) => {
  let config = {
    dataName: { // ，埋点属性名
      elementClick: 'cj-data-tracking-element-click',
      elementView: 'cj-data-tracking-element-view',
    },
    maxNum: 5, // 数据累计多少条上报一次
    postUrl: '', // 埋点接口地址
    processData: (attrData) => { // 处理埋点数据结构
      return attrData
    },
    submitConditions: () => true, // 所有埋点提交条件
    viewConditions: () => true, // 曝光埋点提交条件
    clickConditions: () => true, // 点击埋点提交条件
    submitData: (attrData, type) => { // 埋点事件
      const dataList = config.processData(attrData, type)
      if (!config.submitConditions(dataList, config.maxNum)) {
        return
      }
      if (type === config.dataName.elementView) {
        if (!config.viewConditions(dataList, config.maxNum)) {
          return
        } else {
          // 如果是曝光，清空缓存数据
          removeLocalData()
        }
      } else if (type === config.dataName.elementClick) {
        if (!config.clickConditions(dataList, config.maxNum)) {
          return
        }
      }
      mdPostFun(dataList)
    },
    ...cg
  }

  const saveLocalData = data => {
    localStorage.setItem('cj-data-tracking', JSON.stringify(data))
  }

  const getLocalData = () => {
    return JSON.parse(localStorage.getItem('cj-data-tracking')) || []
  }

  const removeLocalData = () => {
    localStorage.removeItem('cj-data-tracking')
  }

  let observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry, index) => {
      // 这段逻辑，是每一个被观察的组件进入视窗时都会触发的
      if (entry.isIntersecting) {
        const dataList = getLocalData()
        // 把进入视口的组件数据添加进待上报的数据对象中
        if (entry.target.attributes[config.dataName.elementView]) {
          let data = entry.target.attributes[config.dataName.elementView].value;
          data = JSON.parse(data)
          dataList.push(data)
          // 停止观察进入视口的组件
          // observer.unobserve(entry.target)
          saveLocalData(dataList)
          config.submitData(dataList, config.dataName.elementView)
        }
      }
    })
  }, {
    root: null, // 默认根节点是视口
    rootMargin: '0px',
    threshold: 0.7 // 全部进入视口才被观察  这个阈值介于0和1之间
  })

  setTimeout(() => {
    document.querySelectorAll(`[${config.dataName.elementView}]`).forEach(item => {
      observer.observe(item) // 观察每一个进入视口的区域
    })
    document.querySelectorAll(`[${config.dataName.elementClick}]`).forEach(item => {
      item.onclick = (e) => {
        let data = e.currentTarget.attributes[config.dataName.elementClick].value;
        data = JSON.parse(data)
        config.submitData(data, config.dataName.elementClick)
      }
    })
  }, 100)
  // 如果页面刷新后存在上一次没有提报表的埋点，直接上传缓存中的埋点
  dotFromLocalStorage()
  function dotFromLocalStorage() {
    let data = getLocalData()
    if (data.length > 0) {
      const dataList = config.processData(data, config.dataName.elementView)
      mdPostFun(dataList)
    }
    removeLocalData()
  }

  /**
   * 发送数据到后台
   * @param {发送数据到后台} parames 
   */
  function mdPostFun(data) {
    let url = utils.getDomainByUrl(config.postUrl);
    axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';
    axios.defaults.headers['Accept'] = 'application/json;charset=UTF-8';
    axios.defaults.headers['token'] = typeof window == 'undefined' ? '' : utils.$base64.decode(localStorage.getItem('token') || '')
    axios.post(url, data);
  }
  return {
    mdPostFun,
    removeLocalData,
    dataName: config.dataName
  }
}
// window.EventTracking = EventTracking
