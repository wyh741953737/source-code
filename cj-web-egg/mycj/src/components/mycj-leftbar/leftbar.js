import template from './leftbar.html';
import styles from './leftbar.less';
// import { menus } from './leftbar.config';
import { menus } from './bar.config';
import { store } from '../../utils/index'
export function leftBarFactory(module) {
  module.component('mycjLeftbar', {
    template,
    controller: LeftBar,
    bindings: {}
  });
}

/**
 * 左侧栏目，展开发出false，收起发出true
 * 开启和关闭发出事件 $rootScope.$emit('leftbar-light', bool)
 * 开启和关闭动作结束发出事件 $rootScope.$emit('leftbar-light-end', bool)
 */
class LeftBar {
  static $inject = ['$rootScope', '$scope', '$state', '$element', '$location'];

  constructor($rootScope, $scope, $state, $element, $location) {
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.$state = $state;
    this.$element = $element;
    this.$location = $location;
    // window.onresize 会触发 transitionend
    this.windowResizeGuard = false;
    window.addEventListener('resize', () => this.windowResizeGuard = true);
  }

  $onInit() {
    this.$scope.isShowWixMenu = store.get('loginName', { decode: true }) == 'Wixtest' // 单用户显示
    this.$scope.orderversion = store.get('orderversion');
    this.$element.addClass(['component-mycj-leftbar', styles.leftBar]);
    this.$element.bind('transitionend', this.handleTransitionEnd);
    this.$scope.vip = localStorage.getItem('vip') == undefined ? "" : localStorage.getItem('vip');
    this.$scope.currIndex = null; //当前选择的index
    const menuCollapsed = localStorage.getItem('menuCollapsed') == undefined ? false : localStorage.getItem('menuCollapsed');
    this.$scope.isShow = menuCollapsed === 'false'? true : false;
    this.$scope.barScollSty = this.$scope.isShow?{'overflow':'auto'}:{};
    this.$scope.toggle = () => {
      this.$scope.isShow = !this.$scope.isShow;
      this.$scope.barScollSty = this.$scope.isShow?{'overflow':'auto'}:{};
      localStorage.setItem('menuCollapsed',!this.$scope.isShow)
      this.$rootScope.$emit('leftbar-light', !this.$scope.isShow); // 展开发出false，收起发出true
      this.matchRouter();
    };
    this.$scope.toggleChild = (item, e) => this.toggleChild(item, e);
    this.matchRouter();
    this.watchRouterChange();
    this.$scope.mouseEnter = (item) => this.mouseEnter(item);
    this.$scope.mouseLeave = (item) => this.mouseLeave(item);
    this.$scope.mouseEnterThird = (item,e) => this.mouseEnterThird(item,e);
    this.$scope.mouseLeaveThird = (item,e) => this.mouseLeaveThird(item,e);
    this.$scope.secondMouseEnter = (item) => this.secondMouseEnter(item);
    this.$scope.secondMouseLeave = (item) => this.secondMouseLeave(item);
    this.$scope.secondMouseClick = (item) => this.secondMouseClick(item);
    this.$scope.toUrl = (item) => this.toUrl(item);
    this.$scope.toThird = (item,e)=>this.toThird(item,e);
  }

  $onDestroy() {
    this.$element.unbind('transitionend', this.handleTransitionEnd);
  }
  toUrl(citem,e) {
    if(e){
      e && e.stopPropagation();
      if(citem.childRouter && citem.length>0) return citem.active=!citem.active;
      if (citem.route.indexOf('newmycj') >= 0 && ($scope.orderversion ?? 2)) {
        location.href = `${location.origin}/${citem.route}`
      } else if($scope.orderversion==1) {
        location.href = `${citem.oldroute}`
      } else {
        location.href = `${citem.route}`
      }
    }
  }
  toThird(item, e) {
    e && e.stopPropagation();
    item.active = !item.active;
  }

  // 对 DropShipping Center 里的两个模块进行新老版本判断
  // 跳转不同的页面
  versionControl(data) {
    // 1. 老版本, 2. 新版本
    const mapper = {
      'Imported Orders': {
        1: '#/direct-orders',
        2: 'newmycj/dropshipping/untreatedOrder',
      },
      'DropShipping Orders': {
        1: '#/dropshipping-orders',
        2: 'newmycj/dropshipping/orderManage',
      },
    }
    // 获取 localStroage 里存的版本, 使用对应的路由地址
    let version = store.get('orderversion', { parse: true })
    let routeInfo = mapper[data.name]
    if (routeInfo && routeInfo[version]) {
      // log('version', version)
      // log('routeInfo', routeInfo)
      data.route = routeInfo[version]
    }
  }

  watchRouterChange() {
    this.$rootScope.$on('on-url-changed', (_, data) => {
      let name = data.name || data.names;
      let type = data.type || ''
      this.$scope.currentNavChild = data.child;
      this.$scope.chidName = data.child || '';
      // json 格式
      if (name && typeof name === 'object') {
        // name = name[this.$location.url()];
        const str = String(this.$location.url());
        if(str && typeof(str) == 'string' && str.indexOf('/authorize') != -1) {
          const _url = str.split('?')[0];
          name = name[_url];
        } else {
          name = name[this.$location.url()];
        }
      }

      this.$scope.currentUrlName = name;
      this.$scope.navAll = menus;
      if (name) {
        this.$scope.navAll = menus;
        this.matchRouter()
      } else {
        if (!type || this.$location.$$search.powerType) this.$scope.navAll = []
      }
    });
    this.$rootScope.$on('old-url-change', (_, data) => {
      if (this.$location.url() !== '/noPower') {
        let name = data.name || data.names
        this.$scope.currentNavChild = data.child;
        // json 格式
        if (name && typeof name === 'object') {
          name = name[this.$location.url()];
        }
        this.$scope.currentUrlName = name;
        if (name) {
          this.$scope.navAll = menus;
          this.matchRouter()
        } else {
          this.$scope.navAll = []
        }
      }
    })
  }
  /* 路由变化时拿到当前路由信息做比较展示查看 */
  matchRouter() {
    let name = this.$scope.currentUrlName;
    let chidName = this.$scope.chidName;
    if (!this.$scope.navAll) return false;
    this.$scope.navAll.forEach(item => {
      item.active = false;
      item.oneActive = false
      item.childs.forEach(citem => {
        // 根据版本修改两个菜单的路由地址
        citem.active = false;
        if (name.indexOf(citem.name) > -1 && !citem.childRouter) {
          citem.active = true;
          item.oneActive = this.$scope.isShow?false:true;
          item.active = this.$scope.isShow?true:false;
        } else if (citem.childRouter && citem.childRouter.length > 0) {
          citem.childRouter.forEach(ccitem => {
            ccitem.active = false;
            if (chidName.indexOf(ccitem.name) > -1) {
              ccitem.active = true;
              citem.active = true;
              item.oneActive = this.$scope.isShow?false:true;
              item.active = this.$scope.isShow?true:false;
            }
          })
        }
      })
    })
  }
  toggleChild = (item, e) => {
    e.stopPropagation();
    const version = this.$scope.orderversion ?? '2';
    if (item.childs.length == 0 && item.route) {
      location.href = version == 2 ? `${location.origin}/${item.route}`:`${location.origin}/${item.oldroute}`
    }
    this.$scope.navAll.forEach(_v => {
      if (item.name != _v.name) _v.active = false;
    })
    item.active = !item.active;
  }
  handleTransitionEnd = ev => {
    if (this.windowResizeGuard) {
      this.windowResizeGuard = false;
    } else {
      if (ev.target.classList.contains('mycj-left-bar')) {
        this.$rootScope.$emit('leftbar-light-end', !this.$scope.isShow); // 动作结束 - 展开发出false，收起发出true
      }
    }
  }
  mouseEnter = item => {
    if (this.$scope.isShow) return;
    this.$scope.navAll.forEach(_i => {
      _i.active = item.name == _i.name;
    })
    if(item.name === 'Cart'){
      this.$scope.showCartPopover = true;
    }else{
      this.$scope.showCartPopover = false;
    }
  }
  mouseLeave = item => {
    if (this.$scope.isShow) return;
    this.$scope.navAll.forEach(_i => _i.active = false)
    if(item.name === 'Cart'){
      this.$scope.showCartPopover = false;
    }
  }
  mouseEnterThird = (item,e) =>{
    item.active=true;
  }
  mouseLeaveThird = (item,e)=>{
    if(this.$scope.isShow) return;
    item.active=false;
  }
  secondMouseEnter = (item) => {
    try {
      const clickRecords = localStorage.getItem("CLICKRECORDS");
      const temp = window.JSONparse(clickRecords);
      if(temp.indexOf(item.name)===-1){
        item.tipShow = true;
      }
    } catch (e) {
      item.tipShow = true;
    }
  }
  secondMouseLeave = (item)=>{
    item.tipShow = false;
  }
  secondMouseClick = (item) =>{
    const clickRecords = localStorage.getItem("CLICKRECORDS");
    let temp = [];
    try {
      temp = window.JSONparse(clickRecords||"");
    } catch (e) {
    }
    if(temp.indexOf(item.name)===-1){
      temp.push(item.name);
      localStorage.setItem("CLICKRECORDS", JSON.stringify(temp));
      item.tipShow = false
    }

  }
}
