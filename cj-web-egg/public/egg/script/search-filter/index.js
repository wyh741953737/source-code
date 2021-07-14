new Vue({
  el: '#vue-search-filter',
  data: {
    isMore: false, // more按钮开关状态
    isShowMore: false, // 是否显示more按钮
    minNum: CJ_.getQueryVariable('startSellPrice') || '',
    maxNum: CJ_.getQueryVariable('endSellPrice') || '',
    checkedShipping: CJ_.getQueryVariable('addMarkStatus') === '1' ? true : false,
    queryObj: CJ_.paramsToObject(location.search) || {},
  },
  created() {
    this.$nextTick(function () {
      if (document.querySelector('.keyword-box')?.clientHeight > 60) {
        this.isShowMore = true;
      }
    })
    if(this.queryObj.id) {
      this.isMore = true
    }
  },
  methods: {
    showMore() {
      this.isMore = !this.isMore;
    },
    // 价格范围
    onInputMin(e) {
      this.minNum = e.target.value === '0' ? '0' : e.target.value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.').replace(/^[0]*/,'').replace(/^\./,'0.').match(/^0\.([1-9]|\d[1-9])$|^[0-9]\d{0,8}\.\d{0,2}|^[1-9]\d{0,7}/g)?.[0];
    },
    onInputMax(e) {
      this.maxNum = e.target.value === '0' ? '0' : e.target.value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.').replace(/^[0]*/,'').replace(/^\./,'0.').match(/^0\.([1-9]|\d[1-9])$|^[0-9]\d{0,8}\.\d{0,2}|^[1-9]\d{0,7}/g)?.[0];
    },
    clickPriceConfirm() {
      if(parseFloat(this.minNum) > parseFloat(this.maxNum)) {
        layer.msg('Please enter the correct price format')
        return
      }
      const abnormal = [null,undefined]
      if (abnormal.includes(this.minNum)) {
        this.minNum = ''
      }
      if (abnormal.includes(this.maxNum)) {
        this.maxNum = ''
      }
      location.href = `${location.pathname}?${CJ_.objectToParams({
        ...CJ_.paramsToObject(location.search),
        pageNum: 1,
        startSellPrice: this.minNum && parseFloat(this.minNum),
        endSellPrice: this.maxNum && parseFloat(this.maxNum),
      })}`
    },
    // 包邮过滤
    onCheckboxShip() {
      // addMarkStatus 0-不包邮 1-包邮
      location.href = `${location.pathname}?${CJ_.objectToParams({
        ...CJ_.paramsToObject(location.search),
        pageNum: 1,
        addMarkStatus: this.checkedShipping ? 1 : '',
      })}`
    },
  },
})