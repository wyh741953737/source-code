import { login, saveDataAfterLogin } from '../home/commonLogin';
import { Base64 } from 'js-base64'
import { addChatOrGuidJs } from "../vue/mixin";
let addChatOrGuidJsMixin = new addChatOrGuidJs({})

// set pv 
let pv = sessionStorage.getItem('pv-user')
if (!pv) {
  pv = `pv-${new Date().getTime()}`
  sessionStorage.setItem('pv-user', pv)
}

new Vue({
  el: '#vue-productReport',
  mixins: [addChatOrGuidJsMixin],
  created: function () {
    this.makePoint() // 进入页面埋点
  },
  data: {
    logined: CJ_isLogin,
    // loginPopVisible: false,
    currentReport: {
      url: '',
      productReportId: ''
    },
    confirmPop: false,

    username: '',
    password: '',
    usernameErr: false,
    passwordErr: false,
  },
  methods: {

    // 点击确认登录按钮
    submitLogin: function () {

      // 点击登录埋点
      this.makePoint({
        point: 4
      })

      const _that = this
      if (!this.username) return this.usernameErr = true
      if (!this.password) return this.passwordErr = true

      this.usernameErr = false
      this.passwordErr = false

      login({
        name: decodeURIComponent(this.username),
        passwd: decodeURIComponent(this.password),
        chatType: '0',
        platform: 'pc'
      }, function (data) {
        if (data.statusCode != 200) return _that.$my_message.info(data.message)
        saveDataAfterLogin(data.result);
        location.reload();
      })
    },

    // 埋点请求
    makePoint: function (params, callback) {
      const msgLoading = cjMessage.loading({ isFixed: true });
      CJ_.$axios.post('cj/productReportPoint/create', {
        productReportId: '',
        point: 0, // 默认进入页面埋点
        isLogin: this.logined ? 1 : 0, // 是否登录
        visitorsCode: pv,
        ...params
      }).then(([err, res]) => {
        msgLoading.hide();
        callback && callback()
      });
    },

    // 阅读pdf
    reading: function (type = 'detail') {
      const dom = document.querySelector('#reading-pdf');
      let url = dom.dataset.pdfurl || '';
      const productReportId = dom.dataset.id
      if (!url) return
      url = url.split(',')[0]

      this.makePoint({
        point: type == 'detail' ? 8 : 1,
        productReportId
      })

      let a = document.createElement('a')
      a.href = url
      a.target = '_blank'
      a.click()
      a = null
    },

    // 下载pdf
    downloadPdf: function () {
      let { url, productReportId, type } = this.currentReport
      const that = this

      if (!url) return
      url = url.split(',')[0]

      // 下载埋点
      this.makePoint({ point: type == 'detail' ? 9 : 2, productReportId })

      // const load = layer.load(0)
      const msgLoading = cjMessage.loading({ isFixed: true });
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.responseType = "blob";
      xhr.onload = function () {
        msgLoading.hide();
        that.confirmPop = false
        if (this.status == 200) {
          var blob = this.response;
          var reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onload = function (e) {
            var a = document.createElement('a');
            a.download = new Date().getTime() + '.pdf';
            a.href = e.target.result;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          }
        }
      };

      xhr.onerror = function () {
        this.makePoint({ point: 10, productReportId })
      }

      xhr.send()
    },

    // 去登录
    goLogin: function () {

      const { productReportId = '' } = this.currentReport

      // 去登陆 埋点
      this.makePoint({
        point: 3,
        productReportId
      })

      location.href = '/login.html?target=' + Base64.encode(location.pathname)
    },

    // 点击下载保存当前操作报告
    saveReportInfo: function (type = 'detail') {
      const dom = document.querySelector('#download-pdf');
      let url = dom.dataset.pdfurl || '';
      const productReportId = dom.dataset.id || ''

      this.currentReport = {
        url,
        productReportId,
        type
      }

      const that = this
      if (!this.logined) {
        that.goLogin()
        return
      }

      this.downloadPdf()
    }
  }
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
  console.log('flowId报错');
}