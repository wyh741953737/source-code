import filters from '@common/filter';
import utils from '@common/utils';
import { addChatBody, addGuidWindow } from '../global/utils';

const {
  $base64,
} = utils;

export const productCard = {
  filters,
  methods: {
    $clickcollect(prod) {
      if (CJ_isLogin) {
        CJ_.$axios.post('cj/homePage/shouCangShnagPin', { productId: prod.id })
          .then(([err, data]) => {
            err || (prod.isCollect = prod.isCollect == 1 ? 0 : 1);
          });
      } else {
        location.href = CJ_.authLoginUrl('home.html');
      }
    },

    /*商品点击去详情*/
    goTodetail(item, $event) {
      $event.preventDefault();
      const params = {
        ID: item.productId,
        BIGIMG: item.bigImg,
        NAME: '',
        SKU: '',
        type: 'clickSource'
      };
      // 数据埋点
      CJ_.$axios.post('cj/homePage/shangPinMaiDian', params, false)
        .then(([err, res]) => {
          if (err) {
            console.warn(err);
            return;
          }
          const [e, d] = CJ_.statusCode200(res);
          if (e) {
            console.warn(e);
            return;
          }
        });
      let id = item.id || item.productId || item.productid;
      const categoryIdArr = item.categoryId
      window.cjSetInterfereProdId && window.cjSetInterfereProdId(categoryIdArr)
      if (item.flag == '1') {
        window.open('/product-detail.html?id=' + id + '&from=all&fromType=&productType=' + (item.productType || 0));
      } else {
        window.open('/reptail-detail.html?id=' + id);
      }
    },

    // list 按钮 -- from&fromType后续要加
    goToList(item, type, $event) {
      $event.stopPropagation();
      let id = item.id || item.productId || item.productid;
      const categoryIdArr = item.categoryId
      window.cjSetInterfereProdId && window.cjSetInterfereProdId(categoryIdArr)
      let push_id = item.push_id || '';
      if (CJ_isLogin) {
        if (type == 'source') {
          window.open('/reptail-detail.html?id=' + id + '&source=1');
        }else{
          window.open('/product-detail.html?id=' + id + '&push_id=' + push_id + '&from=&fromType=&list=1');
        }
      } else {
        if (type == 'source') {
          location.href = '/login.html?target=' + $base64.encode('reptail-detail.html?id=' + id + '&source=1');
        } else if (type == 'list') {
          location.href = '/login.html?target=' + $base64.encode('product-detail.html?id=' + id + '&from=&fromType=&list=1');
        }
      }
    },

  },
  mounted() {
    window.addEventListener('currency-rate/updated', () => this.$forceUpdate());
  },
}

export const tutorialMenu = {
  data: {
    queryObj: CJ_.paramsToObject(location.search),
    menuOpenGroup: {
      openIdx: undefined,
    },
    lastDom: null,
  },
  created() {
    const { menuOpenIdx, menuActiveIdx, scrollToNum } = this.queryObj
    if(scrollToNum) {
      window.scrollTo({
        top: scrollToNum
      });
    }
    this.menuOpenGroup = {
      openIdx: menuOpenIdx,
      activeIdx: menuActiveIdx
    }
  },
  methods: {
    toggleShow($event) {
      const e = $event.currentTarget
      const { nextElementSibling, parentNode } = e
      const i = e.getAttribute("i")
      if (this.lastDom && this.lastDom.nextElementSibling) {
        // 将最后一次点击的菜单收起
        this.lastDom.nextElementSibling.style.height = '0px'
        this.lastDom.parentNode.classList.remove("sub-menu-open");
      } else if (document.querySelector('.sub-menu-height-auto')) {
        // 将带sub-menu-height-auto收起
        const dom = document.querySelector('.sub-menu-height-auto')
        dom.querySelector(".sub-menu").style.height = dom.querySelector(".sub-menu").scrollHeight + 'px'
        setTimeout(() => {
          dom.querySelector(".sub-menu").style.height = '0px'
        }, 10)
        dom.classList.remove("sub-menu-height-auto")
      }
      if (this.menuOpenGroup.openIdx === i) { // 收起 
        nextElementSibling.style.height = nextElementSibling.scrollHeight + 'px'
        parentNode.classList.remove("sub-menu-open");
        parentNode.classList.remove("sub-menu-height-auto");
        this.menuOpenGroup.openIdx = undefined
        setTimeout(() => {
          nextElementSibling.style.height = '0px'
        }, 10)
        return
      }
      if (nextElementSibling) { // 展开
        parentNode.classList.add("sub-menu-open");
        nextElementSibling.style.height = nextElementSibling.scrollHeight + 'px'
      }
      this.menuOpenGroup.openIdx = i
      this.lastDom = e // 记录最后一次点击的菜单dom
    },
  },
}

export const addChatOrGuidJs = ({
  isAddChatBody = true,
  isAddGuidWindow = false
} = {}) => { // 添加聊天悬浮js
  return {
    data: {
    },
    created() {
      isAddChatBody && !CJ_.store.get('loginfromerp') && addChatBody();
      isAddGuidWindow && !CJ_.store.get('loginfromerp') && addGuidWindow();
    },
    methods: {
    },
  }
}