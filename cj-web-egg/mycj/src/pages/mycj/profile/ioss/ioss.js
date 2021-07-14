import template from './ioss.html';
import css from './ioss.less';

export const profileIossFactory = function (module) {
  module.component('profileIoss', {
    template,
    controller: ['$scope', 'dsp', 'utils', '$filter', '$element', function ($scope, dsp, utils, $filter, $element) {
      $element.addClass([css.ioss, 'profile-ioss'])
      this.$onInit = function () {
        controllerFn.call(this, $scope, dsp, utils)
      }
    }],
    bindings: {},
  })
}

const controllerFn = function ($scope, dsp, utils, $filter, $element) {
  const log = console.log.bind(console, '**ioss**')

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

  // 初始化变量
  const init = () => {
    // 区分是编辑还是新增
    $scope.isEdit = false
    // 获取 userId
    $scope.userId = utils.getLocalInfo('userId')
    // 是否显示弹窗
    $scope.showIoss = false
    // 删除弹窗
    $scope.showDelete = false
    // radio 的默认值为 0
    // 1-不使用IOSS申报 2-使用我的IOSS号申报 3-使用CJ的IOSS号申报
    $scope.defaultSettingValue = '1'
    // 1-选择店铺金额(含运费) 2-选择CJ金额(含运费)
    // 【当前只有ioss_type=2或者3的时候该字段才进行赋值】
    $scope.amountType = '1'
    // ioss 列表
    $scope.iossList = []
    // 已配置国家数量
    $scope.configTaxCountry = 0
    // 待配置国家数量
    $scope.nonConfigTaxCountry = 0
    // 待配置国家列表
    $scope.unLinkedList = []
  }


  // 初始化添加/编辑 ioss 相关变量
  // item 数据格式依赖后端格式
  const setIossParams = (item = {}) => {
    $scope.itemUserId = item.userId
    $scope.itemDescription = item.iossName
    $scope.itemIossId = item.iossSn
    $scope.itemCountryCodeList = item.countryCodeList
    $scope.itemCountryCodeEnNameList = item.countryCodeEnNameList
    $scope.itemId = item.id
  }

  // 获取原来的设置信息
  $scope.getSettingInfo = () => {
    const params = new URLSearchParams({
      userId: $scope.userId,
    })
    const url = 'cj-logistics-rule/userTaxConfig/getListByUserId?' + params.toString()
    const msgLoading = cjMessage.loading({ isFixed: true })
    dsp.getFun(url, (res) => {
      msgLoading.hide()
      if (res.data.success) {
        const data = res.data.data || {}
        $scope.configTaxCountry = data.configTaxCountry
        $scope.nonConfigTaxCountry = data.nonConfigTaxCountry
        $scope.defaultSettingValue = data.iossType && String(data.iossType)
        $scope.amountType = data.iossSubType && String(data.iossSubType)
        $scope.iossList = data.configurationList || []
        $scope.id = data.id
      }
    }, () => {
      msgLoading.hide()
    })
    // 获取原来配置信息的时候还需要获取未配置国家列表
    // 由于后端暂时未在接口中返回, 这里我们直接请求另一个列表接口
    // 气泡框提示需要显示这个列表
    getUnlinkedCountry()
  }

  // 改变金额类型
  $scope.onChangeAmountType = (type) => {
    $scope.amountType = type
    setSetting()
  }

  // 选择了不同的配置项
  $scope.onSettingChange = () => {
    $scope.amountType = '1'
    setSetting()
  }

  // 默认的配置被修改了
  const setSetting = (value) => {
    const iossType = Number($scope.defaultSettingValue)

    const params = {
      id: $scope.id || undefined,
      iossType,
      userId: $scope.userId,
    }
    // 店铺金额当前只有ioss_type=2或者3的时候该字段才进行赋值
    if ([2, 3].includes(iossType)) {
      params.iossSubType = Number($scope.amountType)
    }
    const url = 'cj-logistics-rule/userPropertyInfo/addOrUpdateUserPropertyInfo'
    const msgLoading = cjMessage.loading({ isFixed: true })
    dsp.postFun(url, JSON.stringify(params), (res) => {
      msgLoading.hide()
      $scope.getSettingInfo()
    }, () => {
      msgLoading.hide()
    })
  }

  // 获取未配置的国家列表
  const getUnlinkedCountry = () => {
    const params = new URLSearchParams({
      userId: $scope.userId,
    })
    dsp.getFun(`cj-logistics-rule/country/getEnableIossAndUserUnConfigCountry?${params.toString()}` ,(res) => {
      const { success, data } = res.data
      if (success) {
        const countryList = data || []
        $scope.unLinkedList = countryList.map(country => country.enName)
      }
    })
  }

  // 添加 IOSS
  $scope.onAdd = () => {
    setIossParams()
    $scope.showIoss = true
    $scope.isEdit = false
  }

  // 打开删除确认弹窗
  $scope.onOpenDelete = (item) => {
    setIossParams(item)
    $scope.showDelete = true
  }

  // 删除
  $scope.onDelete = throttle(() => {
    const params = {
      id: $scope.itemId,
    }
    const url = 'cj-logistics-rule/userTaxConfig/deleteById'
    dsp.postFun(url, JSON.stringify(params), (res) => {
      const success = res.data.success
      if (success) {
        $scope.showDelete = false
        $scope.getSettingInfo()
      }
    })
  })

  // 关闭删除弹窗
  $scope.onCloseDelete = () => {
    $scope.showDelete = false
  }

  // 编辑
  $scope.onEdit = (item) => {
    setIossParams(item)
    $scope.showIoss = true
    $scope.isEdit = true
  }

  // 关闭弹窗
  $scope.closeIoss = () => {
    $scope.showIoss = false
  }

  const __main = () => {
    init()
    $scope.getSettingInfo()
  }

  __main()
}