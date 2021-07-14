import template from './info.html';
import css from './info.less';
import {orderModel,platformModel,marketModel} from './listdata'

export function profileInfoFactory(module) {
  module.component('profileInfo', {
    template,
    controller: ['$scope', 'dsp', 'utils','$filter','$element', function ($scope, dsp, utils,$filter,$element) {
      $element.addClass([css.info, 'profile-user-info']);
      this.$onInit = function () {
        $scope.callback=this.callback;
        controllerFn.call(this, $scope, dsp, utils);
      };
    }],
    bindings: {
      callback: '<', // 是否是编辑模式
    },
  });
}

function controllerFn($scope, dsp, utils, $filter,$element) {
  const that = this;
  const base64 = new Base64();
  const isNotErpAdmin = base64.decode(localStorage.getItem('erpoperateuser') || '') != 'admin' 
  const isFromErp = encodeURIComponent(localStorage.getItem('loginfromerp') || '') == '1' 
  $scope.fromErpNotAdmin = isNotErpAdmin && isFromErp
  const userId = localStorage.getItem('userId') ? base64.decode(localStorage.getItem('userId')) : "";
  const token = localStorage.getItem('token') ? base64.decode(localStorage.getItem('token')) : "";
  const loginName = base64.decode(localStorage.getItem('loginName') || "");
  let infoResult;
  $scope.userEditFlag=false;
  getUserInfo()
  const signModel = {
    Facebook: "",
    Instagram: "",
    Line: "",
    Linkedin: "",
    Skype: "",
    Twitter: "",
    WeChat: "",
    Whatapp: "",
  }
  $scope.orderModel = orderModel;
  $scope.platformModel = platformModel;
  $scope.marketModel = marketModel;
  $scope.userImgStyles = { 'maxHeight': '100%', 'maxWidth': '100%' }
  $scope.userImgUrl = ''
  /** v2.42.22  */
  const boxDom = document.getElementById('router-outlet-wrap')
  $scope.isFixed = true // 编辑按钮是否固定在底部
  boxDom.onscroll = () => {
    const profileBox = document.getElementById('profile-user-info')
    safeApply(() => {
      $scope.isFixed = profileBox.offsetHeight - boxDom.scrollTop > 975
    })
    
  }
  /* 授权弹窗 */
  Authorized()
  function Authorized() {
    $scope.AuthorizedDailog = false;
    dsp.postFun('app/shop/checkUserInfoComplete', {}, function (data) {
      if (data.data.result == 'open') {
        $scope.AuthorizedDailog = true;
      } else {
        $scope.AuthorizedDailog = false;
      }
    });
  }
  $scope.getSupplierAppUrl = dsp.getSupplierAppUrl;
  $scope.authorizedConfirm = function () {
    if (!$scope.Username) {
      layer.msg('Username required.')
    } else if (!$scope.FirstName) {
      layer.msg('FirstName required.')
    } else if (!$scope.LastName) {
      layer.msg('LastName required.')
    } else if (!$scope.Password) {
      layer.msg('Password required.')
    } else if ($scope.Password.length < 6) {
      layer.msg('Please set 6 digits or more password.')
    } else if (!$scope.Confirmpassword) {
      layer.msg('Please enter your password again.')
    } else if (!$scope.Mobile) {
      layer.msg('Mobile required.')
    } else if (!$scope.email) {
      layer.msg('Please enter the correct email.')
    } else {
      if ($scope.Password == $scope.Confirmpassword) {
        var data = {
          firstName: $scope.FirstName,
          lastName: $scope.LastName,
          loginName: $scope.Username,
          password: $scope.Password,
          email: $scope.email,
          phone: $scope.Mobile
        }
        dsp.postFun('app/account/perfectInfo', data, function (res) {
          if (res.data.result == 1) {
            $scope.AuthorizedDailog = false;
            localStorage.setItem('isopen', 1)
            layer.msg('Modify information successfully.')
            location.reload();
          } else {
            layer.msg('Information modification failed')
          }
        }, function (res) {

        })
      } else {
        layer.msg('Inconsistent passwords.')
      }
    }
  };
  // 获取个人信息
  function getUserInfo() {
    const params = {
      data: JSON.stringify({ userId, token })
    }
    dsp.postFun('app/info/userinfo', params, ({data})=> {
      const result = JSON.parse(data.result)[0]
      localStorage.setItem('customerCjNum',result.num)
      result.imgname = result.NAME ? result.NAME.slice(0, 1).toUpperCase() : '';
      result.createOn = utils.parseTime(new Date(result.CREATE_DATE.time), 'yyyy-MM-dd hh:mm:ss')
      result.CONTACT_ID = result.CONTACT_ID ? JSON.parse(result.CONTACT_ID.replace(/\\/g, '')) : {}
      result.signList = Object.keys(signModel).map(key => {
        const name = key === 'Whatapp' ? 'WhatsApp' : key
        const item = {
          name,
          value: result.CONTACT_ID[name],
          img: `static/image/profile/${name.toLowerCase()}.svg`
        }
        return item
      })
      result.STORE_LINK = result.STORE_LINK ? JSON.parse(result.STORE_LINK) : ['']
      result.survey = result.survey ? JSON.parse(result.survey) : {}  
      result.survey.niches = result.survey.niches || []
      $scope.userInfoOne = result;
      if($scope.userInfoOne.img && $scope.userInfoOne.img == 'https://cc-west-usa.oss-us-west-1.aliyuncs.com/ba627238-87d7-41a9-86f1-960b4cc07ebf.png') {
        $scope.userInfoOne.img = '';
      }
      getImgSize($scope.userInfoOne.img)
      $scope.userInfoEdit = JSON.parse(JSON.stringify(result));
      infoResult = JSON.parse(JSON.stringify(result));
    }, function (data) {
      console.log(data)
    })
  }
  // 模拟获取图片大小
  function getImgSize (imgUrl) {
    if (!imgUrl) return;
    var img = new Image();
    // 改变图片的src
    img.src = imgUrl;
    if (img.complete){
      console.log('from:complete : width:'+img.width+',height:'+img.height);
      disposeImgCss(img.width, img.height, imgUrl)
    } else {
      img.onload = () => {
        console.log('from:onload : width:'+img.width+',height:'+img.height);
        disposeImgCss(img.width, img.height, imgUrl)
      };
    }
  }
  // 根据img的宽高判断图片的大小
  function disposeImgCss (width, height, url) {
    safeApply(() => {
      if (+width > +height) {
        $scope.userImgStyles = { 'maxHeight': '100%', 'maxWidth': 'unset' }
      } else {
        $scope.userImgStyles = { 'maxWidth': '100%', 'maxHeight': 'unset' }
      }
      $scope.userImgUrl = url
    })
  }
  function safeApply(fn) {
    ($scope.$$phase || $scope.$root.$$phase) ? fn() : $scope.$apply(fn);
  }
  getAgentInfo()
  // 获取客服人员信息
  function getAgentInfo() {
    dsp.postFun('app/message/getOwnerByAccLoginName', JSON.stringify({ loginName }), ({data})=> {
      if(data.statusCode=='CODE_200'){
        const { data: result } = data
        result.avatarName = result.nameEN[0].toUpperCase();
        $scope.agentInfo = result
      }
      
    }, function (data) {
      console.log(data)
    })
  }
  const callbackFun = function (obj) {
    const fun = $scope.callback
    if (!fun) return
    fun(obj)
}
  $scope.editOpen = () => {
    if($scope.fromErpNotAdmin) {
      layer.msg('You cannot edit it.')
      return
    }
    callbackFun({show:true});
    $scope.userEditFlag=true;
    $scope.userInfoEdit = angular.copy(infoResult);
    const { orderNumber = [], platforms = [], markets = [] } = $scope.userInfoEdit.survey;
    $scope.orderModel = setModeChecked($scope.orderModel, orderNumber)
    $scope.platformModel = setModeChecked($scope.platformModel, platforms)
    $scope.marketModel = setModeChecked($scope.marketModel, markets)
  }
  // 20-02-07 大陆手机号 +86 前缀
  $scope.add86prefix = function (tel) {
    if (typeof tel !== 'string') return tel;
    if (tel.startsWith('1') && tel.length === 11) {
      return `+86 ${tel}`;
    }
    return tel;
  };
  //修改或者上传头像
  $scope.uploadPortrait = () => {
    cjUtils.readLocalFile({
      success: ({ FileList }) => {
        const file = FileList[0]
        cjUtils.uploadFileToOSS({
          file,
          signatureURL: `${window.httpsJson.app}app/oss/policy`,
          success: link => {
            dsp.postFun('app/account/updateimg', { data: `{'id': '${userId}','img':'${link}'}` }, ({data})=> {
              if (data.statusCode === '200') {
                $scope.userInfoOne.img = link
                getImgSize($scope.userInfoOne.img)
                localStorage.setItem('avatar', base64.encode(link || ''))
              }
            }, (data)=> {
              console.log(data)
            })
          }
        })
      }
    })
  }
  $scope.firstCategory = {            //细分市场 -- 一级类目
    list: [],                         //列表
    current: '',                      //当前选中项
    flag: true,                       //select 显示隐藏
    type: 'first',
    name:'firstCategory',
    err:false
  }
  $scope.secondCategory = {           //细分市场 -- 二级类目
    list: [],
    current: '',
    flag: false,
    type: 'second',
    name:'secondCategory',
    err:false
  }
  $scope.thirdCategory = {            //细分市场 -- 三级类目
    list: [],
    current: '',
    flag: false,
    type: 'third',
    name:'thirdCategory',
    err:false
  }
  //细分市场 -- 进入编辑页面获取一级类目
  getTagList('', ({ root }) => {
    $scope.firstCategory.list = root
    $scope.firstCategory.current = ''
  })
  //细分市场 -- 获取类目
  function getTagList(id, callback) {
    dsp.postFun('app/locProduct/cusTaglist',JSON.stringify({ id }),({ data })=>{
      const { statusCode } = data
      if (statusCode != '200') {
        layer.msg('The server is busy now, please try again later.')
      } else {
        callback && callback(data.result ? JSON.parse(data.result) : {})
      }
    })
  }
  function categoryInit(){
    $scope.firstCategory.err=false;
    $scope.secondCategory.err=false;
    $scope.thirdCategory.err=false;
    $scope.firstCategory.most=false;
    $scope.secondCategory.most=false;
    $scope.thirdCategory.most=false;
  }
  //细分市场 -- 选择类目 获取下一级或者新增细分市场
  $scope.selectTag = (json, eleJson) => {
    const { current, type, name } = json
    categoryInit()
    if (eleJson) {
      if (type === 'first') {
        $scope.secondCategory.current = ''
        $scope.thirdCategory.current = ''
        $scope.thirdCategory.flag = false
      } else if (type === 'second') {
        $scope.thirdCategory.current = ''
      }
      getTagList(current, ({ root }) => {
        eleJson.flag = root[0] !== null
        eleJson.list = root
        if (root[0] === null) {
          setTag(json,type)
        }
      })
    } else {
      setTag(json,'third')
    }
  }
  function isSameFun(_obj,type){
    let isSame = false;
    $scope.userInfoEdit.survey.niches.forEach(item=>{
      if(item.id==_obj.id) isSame=true;
    })
    if(isSame) $scope[_obj.name].err=true;
    return !isSame;
  }
  //细分市场 新增市场细分
  function setTag(json,type) {
    console.log(json)
    const { current, list, name } = json
    if(current) {
      let _obj
      list.forEach(item => {
        if (item.id === current) _obj = { id: current, name: item.nameEn }
      })
      if(isSameFun(_obj,type)) $scope.userInfoEdit.survey.niches.push(_obj)
    }
    
    if($scope.userInfoEdit.survey.niches.length==6) {
      $scope[name].most=true;
      return;
    }
  }
  //细分市场 -- 删除
  $scope.nichesDelete = idx=> {
    $scope.userInfoEdit.survey.niches = $scope.userInfoEdit.survey.niches.filter((_, index) => index !== idx);
    categoryInit();
  }
  //验证邮箱是否以注册
  $scope.reqEmailFn = () => {
    const { email: editEmail } = $scope.userInfoEdit
    const { EMAIL: oldEmail } = $scope.userInfoOne
    console.log(editEmail, oldEmail)
    $scope.emailMsg = ''
    if (!editEmail || !dsp.isEmail(editEmail)) {
      $scope.emailMsg = 'Please enter a correct email address.'
      return;
    }
    if (editEmail !== oldEmail) {
      const params = {
        data: JSON.stringify({ email: editEmail })
      }
      dsp.postFun('app/account/checkexist',JSON.stringify(params),({ data })=>{
        const { statusCode } = data
        if (statusCode == 207) {
          $scope.reqEmailFlag = true
          $scope.emailMsg = 'The email address is registered.'
        } else if (statusCode == 204) {
          $scope.reqEmailFlag = false
        } else {
          $scope.emailMsg = 'The email address is registered.'
          layer.msg('The server is busy now, please try again later.')
        }
      })
    }
  }
  //聊天信息 -- 打开聊天
  $scope.goToContact = () => {
    window.postMessage({ flag: "profile-concat" }, "*")
  }
  /* 名字验证 */
  $scope.nameVerify = () => {
    const len = ($scope.userInfoEdit.firstName || '').length + ($scope.userInfoEdit.lastName || '').length;
    $scope.firstNameMaxLen = 40 - ($scope.userInfoEdit.lastName || '').length
    $scope.lastNameMaxLen = 40 - ($scope.userInfoEdit.firstName || '').length
    $scope.nameErrorMsg = len >= 40 ? 'First name and Last name are no more than 40 characters.' : '';
  };
  /* 取消编辑 */
  $scope.cancelSubmitFn = ()=>{
    callbackFun({show:false});
    $scope.userEditFlag = false;
  }
  //编辑 -- 确认修改
  $scope.submitEdit = () => {
    if (!$scope.reqEmailFlag && !$scope.reqEmailAjax) {
      const {  } = $scope.userInfoOne;
      const { ID: id,firstName, lastName, EMAIL:email,PHONE:phone,COUNTRY:country,ADDRESS:address,signList,STORE_LINK:storeLink } = $scope.userInfoEdit
      const len = (firstName || '').length + (lastName || '').length;
      let contactID = {};
      signList.forEach(item=>{
        if(item.value)contactID[item.name]=item.value;
      })
      const options = {
        id,firstName,lastName,email,phone,country,address,contactID,storeLink,
        survey:$scope.userInfoEdit.survey
      }
      $scope.isStoreLinkValue = true
      options.storeLink.forEach(item => {
        if(!item) {
          $scope.isStoreLinkValue = false
        }
      })
      if(!$scope.isStoreLinkValue) {
        layer.msg("Please enter a store URL before submission.")
        return
      }
      if(!firstName) {
        layer.msg('Please enter your first name.')
        return;
      }
      if(!lastName) {
        layer.msg("Please enter your last name.")
        return;
      }
      if (len >= 40){
        layer.msg("First name and Last name are no more than 40 characters.")
        return;
      }
      if (!email || !dsp.isEmail(email)) {
        layer.msg('Please enter your email address.')
        return;
      }
      const params = {
        data: JSON.stringify(options)
      }
      dsp.postFun('app/account/update', JSON.stringify(params), ({data})=> {
        callbackFun({show:false});
        const { statusCode } = data
        if (statusCode === '200') {
          layer.msg('Saved Successfully')
          const { firstName, lastName } = $scope.userInfoEdit
          const { status, email } = JSON.parse(data.result)
          localStorage.setItem('firstName', base64.encode(firstName))
          localStorage.setItem('lastName', base64.encode(lastName))
          localStorage.setItem('name', base64.encode(`${firstName} ${lastName}`));
          localStorage.setItem('status', status);
          localStorage.setItem('email', base64.encode(email));
          dsp.setCookie('firstName', base64.encode(firstName), 3, __root__domain);
          dsp.setCookie('lastName', base64.encode(lastName), 3, __root__domain);
          dsp.setCookie('name', base64.encode(`${firstName} ${lastName}`), 3, __root__domain);
          dsp.setCookie('status', status, 3, __root__domain);
          dsp.setCookie('email', base64.encode(email), 3, __root__domain);
          $scope.cancelSubmitFn()
          getUserInfo()
        } else if(statusCode==='207'){
          layer.msg('Submit Failed. Please use another email')
        }else {
          layer.msg('Save changes failed')
        }
      },(err)=>{
        console.log(err);
      })
    }
  }
  /** 注册问题 */
  //单选
  $scope.radioClickFn = name => {
    const list = [name]
    $scope.userInfoEdit.survey.orderNumber = list
    $scope.orderModel = setModeChecked($scope.orderModel, $scope.userInfoEdit.survey.orderNumber)
  }
  //多选
  $scope.checkBoxClickFn = (key, type) => {
    const arr = type === 'platform' ? $scope.platformModel : $scope.marketModel
    const list = arr.map(item => {
      const { checked } = item
      if (item.key === key) item.checked = !checked
      return item
    })
    if (type === 'platform') {
      $scope.platformModel = list
    } else {
      $scope.marketModel = list
    }
    setQusestionList(list, type)
  }
  //循环遍历 判断选中项
  function setModeChecked(arr, checkedList) {
    const list = arr.map(item => {
      item.checked = checkedList.includes(item.name)
      return item
    })
    return list
  }
  //多选框时 循环遍历生成 保存所需的列表
  function setQusestionList(list, type) {
    let arr = []
    list.forEach(item => {
      if (item.checked) arr.push(item.name)
    })
    if (type === 'platform') {
      $scope.userInfoEdit.survey.platforms = arr
    } else {
      $scope.userInfoEdit.survey.markets = arr
    }
    console.log($scope.userInfoEdit)
  }

  // 点击链接跳转
  $scope.handleLink = (storeLink) => {
    let link = String(storeLink);
    if(!link.startsWith('https://') && !link.startsWith('http://')) {
      link = 'https://'+link;
    }
    return link;
  }
  /** 商店链接系列 */
  $scope.setStoreLink = (ele, index) => { //设置当前的storelink
    const value = ele.target.value;
    $scope.userInfoEdit.STORE_LINK[index] = value;

    // if(value.startsWith('https://') || value.startsWith('http://')) {
    //   $scope.userInfoEdit.STORE_LINK[index] = value;
    // } else {
    //   $scope.userInfoEdit.STORE_LINK[index] = '';
    //   layer.msg('Please enter a valid store URL(including http:// or https://)');
    // }
  }
  $scope.addStoreLink = () => { // 新增一条商店链接
    let noneFlag = false
    $scope.userInfoEdit.STORE_LINK.forEach(item => {
      if (!item) noneFlag = true
    })
    if (noneFlag) {
      layer.msg('Please enter your store link.')
    } else {
      $scope.userInfoEdit.STORE_LINK.push("")
    }
  }
  $scope.deleteStoreLink = index => { //删除一条商店链接
    $scope.userInfoEdit.STORE_LINK = $scope.userInfoEdit.STORE_LINK.filter((item, idx) => idx !== index)
  }
}
