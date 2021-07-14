import template from './edit-ioss.html';
import styles from './edit-ioss.less';

export function editIoss(module) {
  module.component('editIoss', {
    template,
    controller: ['$scope','$element','dsp', 'utils', function ($scope, $element, dsp, utils) {
      $element.addClass([styles.editIoss, 'edit-ioss'])
      // 用户 id
      $scope.userId = ''
      // 描述字段
      $scope.description = ''
      // 必填状态
      $scope.desFlag = false
      // iossId
      $scope.iossId = ''
      // 必填状态
      $scope.iossIdFlag = false
      // 已选择的国家列表
      $scope.selectCountryList = []
      // 目的国家校验状态
      $scope.countryFlag = false
      // 国家原始列表
      $scope.originCountryList = []
      // 国家列表/模糊匹配后列表
      $scope.countryList = []
      // 模糊匹配关键词
      $scope.countryName = ''
      // 是否显示下拉框
      $scope.showSelect = false;
      // 是否是编辑
      $scope.isEdit = false;
      this.$onInit = () => pageCtrl.call(this, $scope, $element, dsp, utils);
      $scope.closeModal = () => {
        this.close()
      }
    }],
    bindings: {
      description: '=',
      iossId: '=',
      countryCodeList: '=',
      countryCodeEnNameList: '=',
      close: '=',
      isEdit: '=', // 是否是编辑
      // 该条数据的 id, 编辑时要传
      id: '=',
      // 回调
      callback: '=',
      // 用户 id
      userId: '=',
      // 是否是个人中心, 个人中心的按钮不需要区分 vip 非 vip
      isProfile: '=',
      // 是否已知国家
      country: '=',
    }
  });

  function pageCtrl($scope, $element, dsp, utils) {
    const log = console.log.bind(console, '**edit-ioss**')
    // 初始化逻辑
    const init = () => {
      // 保存成功之后的回调函数
      $scope.callback = this.callback
      // id
      $scope.id = this.id
      // 用户 id, 编辑的时候可以从列表里面拿
      // 新增的时候拿本地的
      $scope.userId = this.userId || utils.getLocalInfo('userId')
      // 是否是 vip
      const vip = localStorage.getItem('vip')
      $scope.isVip = vip === '1'
      // 区分是编辑还是新增
      $scope.isEdit = this.isEdit || false
      // 编辑时要拿到原来的数据
      $scope.description = this.description || ''
      $scope.iossId = this.iossId || ''
      // 表单校验变量
      $scope.desFlag = false
      $scope.iossIdFlag = false
      $scope.countryFlag = false
      $scope.desNotice = ''
      $scope.iossIdNotice = ''
      $scope.countryNotice = ''
      // 是否是个人中心
      $scope.isProfile = this.isProfile || false
      // 是否已知国家
      $scope.hasCountry = this.country
      if( $scope.hasCountry ){
        $scope.selectCountryList = [$scope.hasCountry.countrycode]
      }
    }

    /** 节流 */
    const throttle = function (fn, delay = 400) {
      let t = null;
      return function (...args) {
        const _this = this;
        if (t !== null) {
          return;
        }
        fn.apply(_this, args);
        t = setTimeout(() => {
          t = null;
        }, delay);
      }
    }

    // 获取描述
    $scope.getDescription = () => {
      const des = $scope.description
      if (!Boolean(des)) {
        $scope.desFlag = true
        $scope.desNotice = 'Please enter description.'
      } else if (des.length > 500) {
        $scope.desFlag = true
        $scope.desNotice = ''
      } else {
        $scope.desFlag = false
        $scope.desNotice = ''
      }
    }
    // 校验 ioss id
    $scope.getIossId = () => {
      const iossId = $scope.iossId
      $scope.iossIdFlag = !Boolean(iossId) || iossId.length > 500
      const mapper = {
        default: '',
        empty: 'Please enter IOSS ID',
        errorLength: 'Please enter an IOSS ID with 12 alphanumeric characters',
      }
      if (!Boolean(iossId)) {
        $scope.iossIdFlag = true
        $scope.iossIdNotice = 'Please enter an IOSS ID with 12 alphanumeric characters.'
      } else if (!/^[0-9a-zA-Z]{12}$/.test(iossId)) {
        $scope.iossIdFlag = true
        $scope.iossIdNotice = 'Please enter an IOSS ID with 12 alphanumeric characters.'
      } else {
        $scope.iossIdFlag = false
        $scope.iossIdNotice = ''
      }
    }

    // 获取国家校验状态
    $scope.getCountry = () => {
      const country = $scope.selectCountryList
      $scope.countryFlag = country.length === 0
      if (country.length === 0) {
        $scope.countryFlag = true
        $scope.countryNotice = 'Please select at least 1 destination country.'
      } else {
        $scope.countryFlag = false
        $scope.countryNotice = ''
      }
    }
    // 显示下拉框
    $scope.onshowSelect= ($event) =>{
      $scope.showSelect = !$scope.showSelect
      $event.stopPropagation();
    }
    // 取消事件冒泡
    $scope.cancelEvent = ($event) => {
      $event.stopPropagation();
    }
    // 关闭下拉框
    $scope.closeSelect= () =>{
      if($scope.showSelect){
        $scope.showSelect = false
      }
    }
    // 选中项
    $scope.selectItem = (code, record, $event) => {
      $event.stopPropagation();
      let list = [...$scope.selectCountryList]
      let dataIndex = list.findIndex(val=> val.alpha2Code === code)
      if(dataIndex > -1) {
        list.splice(dataIndex, 1)
      } else {
        list.push(record)
      }
      $scope.selectCountryList = list
      // 校验国家
      $scope.getCountry()
    }
    // 是否选中
    $scope.isSelect = (item) => {
      if($scope.selectCountryList.findIndex((value) => value.alpha2Code === item) > -1) {
        return true
      }
      return false
    }
   // 搜索国家
    $scope.searchCode = () => {
      let countryList = []
      if($scope.countryName === '') {
        $scope.countryList = $scope.originCountryList
        return
      }
      $scope.originCountryList.forEach(value => {
        if(value.enName.toLowerCase().indexOf($scope.countryName.toLowerCase()) > -1){
          countryList.push(value)
        }
      })
      $scope.countryList = countryList
    }

    // 校验表单
    const validForm = () => {
      // 先触发校验
      $scope.getDescription()
      $scope.getIossId()
      $scope.getCountry()
      return !$scope.desFlag && !$scope.iossIdFlag && !$scope.countryFlag
    }

    // 保存税号
    $scope.saveIoss = throttle(() => {
      // 如果表单校验没有通过, 那么不请求接口
      if (!validForm()) {
        return
      }
      let params = {
        countryCodeList: $scope.hasCountry ? [$scope.hasCountry.countrycode] : $scope.selectCountryList.map(value => value.alpha2Code), // 目的国家有关的二字码
        id: $scope.id || undefined, // 主键id
        iossName: $scope.description, // IOSS名称
        iossSn: $scope.iossId, // IOSS号
        userId: $scope.userId, // 用户id
      }
      const url = 'cj-logistics-rule/userTaxConfig/addOrUpdateUserTaxConfig'
      dsp.postFun(url, JSON.stringify(params), ({data}) => {
        const { success, message } = data
        if (success) {
          this.close()
          $scope.callback && $scope.callback()
        } else {
          layer.msg(message)
        }
      })
    }, 600)

    // 获取国家列表
    const getCountryList = () => {
      const params = new URLSearchParams({
        userId: $scope.userId,
      })

      // 如果有 countryCodeList 传入, 那么需要合并已选择列表和未选择列表
      // 并且需要拿到选中的国家
      const codeList = this.countryCodeList
      const enList = this.countryCodeEnNameList
      if (codeList) {
        // 合并已选择列表和未选择列表
        const selectedList = codeList.map((item, index) => {
          return {
            alpha2Code: item,
            enName: enList[index],
          }
        })
        $scope.originCountryList = $scope.originCountryList.concat(selectedList)
        // 拿到选中的国家列表
        $scope.selectCountryList = selectedList
      }

      dsp.getFun(`cj-logistics-rule/country/getEnableIossAndUserUnConfigCountry?${params.toString()}` ,(res) => {
        // console.log('fenge res', res)
        if (res.status === 200 && res.data.success) {
          const list = res.data.data
          $scope.originCountryList = $scope.originCountryList.concat(list)
          $scope.countryList = $scope.originCountryList
        }
      })
    }

    const __main = () => {
      init()
      getCountryList()
    }

    __main()
  }
}
