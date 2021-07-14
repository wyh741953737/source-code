/**
 * 商品卡片
 */
<template>
  <div class="card-wrap" ref="cardWrap">
    <div class="inner-box" :class="product.islist && 'product-card-add'">
      <span class="add-icon" v-show="product.islist">
        <span class="iconfont iconduihao"></span>
        <span class="add-icon-bg"></span>
      </span>
      <a ref="prodImg"
        v-cjstat='{"pageCode":"home", "keys":[{"key":"productId","value":`${product.id || product.productId}`}], "eventType": 1, "buttonName": "ProductCard","buttonType": "1"}'
        v-cjdot :cjdotshow='"{\"pageCode\":\"home\", \"eventType\": 0, \"buttonName\": \"ProductCard\", \"keys\":[{\"key\":\"productId\",\"value\":\""+
         (product.id || product.productId) + "\"}], \"cardName\":\"" + cardTitle + "\"}"' 
        :href="
          product.flag == 1 ?
          '/product-detail.html?id=' + (product.id || product.productId || product.productid) + '&from=all&fromType=&productType=' + (product.productType || 0)
            : 'reptail-detail.html?id=' + (product.id || product.productId || product.productid)
        "
        @click="goTodetail(prod, $event)"
        class="detail-anchor"
      >
<!--        <img :src="product.bigImg | IMG_SIZE(imgSize[0], imgSize[1])" class="lazy-img" onerror="javascript:this.src='/egg/image/img_default.jpg'" />-->
        <img :src="defaultImg" ref="lazyImg" onerror="javascript:this.src='/egg/image/img_default.jpg'"/>
        <i v-if="product.isHaveVideo == 'HAVE_VIDEO'" class="iconfont iconshipinda isVideo" :style="{fontSize: imgSize[0] == 270 ? '45px' : '30px'}"></i>
      </a>
      <div class="move-box">
        <a ref="prodTitle"
          v-cjstat='{"pageCode":"home","keys":[{"key":"productId","value":`${product.id || product.productId}`}], "eventType": 1, "buttonName": "ProductName","buttonType": "1"}'
          :href="
            product.flag == 1 ?
            '/product-detail.html?id=' + (product.id || product.productId || product.productid) + '&from=all&fromType=&productType=' + (product.productType || 0)
              : 'reptail-detail.html?id=' + (product.id || product.productId || product.productid)
          "
          @click="goTodetail(prod, $event)"
          class="desc detail-anchor"
        >
          {{ product.nameVal | INIT_UPPERCASE }}
        </a>
        <div class="list-collect">
          <span class="list">
            <div style="display:inline-block;" v-if="product.isAut != 1">
              <span>
                <span v-if="product.num > 1">{{ staticText['Lists'] }}:</span>
                <span v-else>{{ staticText['List'] }}:</span>
              </span>
              <span>{{ product.num }}</span>
            </div>
            <div 
              class="freeShip" 
              v-if="product.addMarkStatus==1 && product.productType == '5'"
              @mouseenter="$enterFreeShip(prod)"
              @mouseleave="$leaveFreeShip(prod)"
            >
              <div class="shipModel" v-if="product.showFreeShip">
                <div class="long-text">{{ staticText['Free Shipping'] }}</div>
              </div>
            </div>
            
            <i v-if="product.isPersonalized == '1'" class="personalise"></i>
          </span>
          <div ref="cardCollect"
            :key="product.isCollect"
            v-cjstat='{"pageCode":"home", "keys":[{"key":"productId","value":`${product.id || product.productId}`},{"key":"collectType","value": `${product.isCollect}`}], "eventType": 1, "buttonName": "collection","buttonType": "1"}'
            class="collect" :class="{ active: product.isCollect==1 }" @click="$clickcollect(prod)">
            <span v-if="product.isCollect==1" class="iconfont icontianjiashoucangzhihou solid"></span>
            <span v-if="product.isCollect==0" class="iconfont icontianjiashoucang hollow"></span>
          </div>
        </div>
        <div class="price notranslate" v-if="product.nowPrice">
          <span class="theme-price">{{ product.nowPrice | EXCHANGE_RATE }}</span>
          <del class="origin-price">{{ prod | GET_PRICE | EXCHANGE_RATE }}</del>
        </div>
        <div class="price notranslate" v-else>{{ prod | GET_PRICE | EXCHANGE_RATE }}</div>
        <div class="btns">
          <div
            class="btn-item view-inventory"
            @mouseenter="$enterInventory(prod)"
            @mouseleave="$leaveInventory(prod)"
          >
            <span>{{ staticText['View Inventory'] }}</span>
            <div class="inventory" v-if="product.showInventory && product.inventories && product.inventories.length > 0">
              <span class="arrow"></span>
              <span v-if="product.inventories && product.inventories.length <= 0">loading...</span>
              <div
                class="d-flex justify-content-between"
                v-for="inven of product.inventories"
                :key="inven.areaEn"
              >
                <span class="name">{{ inven.areaVal }}</span>
                <span class="num">{{ inven.num }}</span>
              </div>
            </div>
          </div>
          <div 
          v-cjstat='{"pageCode":"home", "keys":[{"key":"productId","value":`${product.id || product.productId}`}], "eventType": 1, "buttonName": "List","buttonType": "1"}'
          class="btn-item list" @click="goToList(prod,'list',$event)">{{ staticText['List'] }}</div>
        </div>
        <div class="add-queue" v-cjstat='{"pageCode":"home", "keys":[{"key":"productId","value":`${product.id || product.productId}`}], "eventType": 1, "buttonName": "Add to Queue","buttonType": "1"}'>
          <div ref="cardAddQueue" class="btn-add" @click="addToQueueRun(prod,$event)"><i class="iconfont" style="font-size:12px;">{{ product.islist ? '&#xe661;' : '&#xe6df;' }}</i> {{ product.islist ? staticText['Added to Queue'] : staticText['Add to Queue'] }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { productCard } from "./mixin";
import i18next from 'i18next';
import { getCookie, transWarehouseStock, } from '../global/utils';
import { IMG_SIZE } from '../../../../common/filter'


export default {
  name: "product-card",
  props: {
    title: {
      type: String,
      default: ""
    },
    prod: {
      type: Object,
      default: {}
    },
    imgSize: {
      type: Array,
      default: () => [179, 190]
    },
    tracking: {
      type: String,
      default: '{"clickId": "", "collectionId":"", "addToQueueId": ""}'
    },
    staticText: {
      type: Object,
      default: () => ({
        'Lists': i18next.t('product-card-lists'),
        'List': i18next.t('product-card-list'),
        'View Inventory': i18next.t('product-card-view-inventory'),
        'Add to Queue': i18next.t('product-card-add-to-queue'),
        'Added to Queue': i18next.t('product-card-added-to-queue'),
        'Free Shipping':i18next.t('product-card-free-shipping'),
      })
    }
  },
  mixins: [productCard],
  data() {
    return {
      product: this.prod,
      cardTitle: this.title,
      defaultImg:'/egg/image/img_default.jpg'
    };
  },
  mounted() {
    const observer = new IntersectionObserver((changes)=>{
      // changes是观测对象合集（即使是一个观测对象也会形成数组的形式）
        changes.forEach(({target, isIntersecting})=>{
          // target是节点dom isIntersecting是否有交叉（有交叉就是一部分在可视区一部分不在可视区）
          // 第一次进入如果有交叉证明进入可视区这时候就可以解除
          if(isIntersecting){
            // 关闭观察器
            observer.disconnect()
            // 停止观察
            observer.unobserve(target)
          }
          if(isIntersecting && this.prod.bigImg){
            // 判断是否数据img存在，如果不存在继续使用默认图片
            this.defaultImg = IMG_SIZE(this.prod.bigImg, this.imgSize[0], this.imgSize[1])
          }
        })
    })
    // 观测根据数据ref生成的dom节点
    observer.observe(this.$refs.lazyImg)

    /** 绑定埋点 */
    const trackProps = JSON.parse(this.tracking);;
    if (trackProps.exposureId) {
      const domWrap = this.$refs.cardWrap
      let viewData = {
        elementId: trackProps.exposureId,
        actionType: "product_exposure",
        list: [
          {
            fieldValue: this.product.productId || this.product.productid,
            filedName: "productId"
          }
        ]
      }
      domWrap.setAttribute('data-tracking-element-view', JSON.stringify(viewData))
    }
    if (trackProps.clickResult) {
      let domWrap = this.$refs.cardWrap;
      let positionNum = 0;
      while((domWrap = domWrap.previousSibling) != null) positionNum++;

      let clickResultData = {
        elementId: trackProps.clickResult,
        actionType: "SearchResult_Click",
        list: [
          {
            fieldValue: this.product.productId || this.product.productid,
            filedName: "productId"
          },
          {
            fieldValue: trackProps.searchKey,
            filedName: "searchWords"
          },
          {
            fieldValue: trackProps.productNum,
            filedName: "resultNumber"
          },
          {
            fieldValue: `${positionNum === 0 ? 1 : Math.ceil(positionNum/6)}, ${positionNum%6 + 1}`,
            filedName: "positionNumber"
          }
        ]
      }
      this.$refs.cardWrap.setAttribute('data-tracking-element-click', JSON.stringify(clickResultData))
    }
    if (trackProps.clickId) {
      let clickData = {
        elementId: trackProps.clickId,
        actionType: "product_click",
        list: [
          {
            fieldValue: this.product.productId || this.product.productid,
            filedName: "productId"
          }
        ]
      }
      this.$refs.prodImg.setAttribute('data-tracking-element-click', JSON.stringify(clickData))
      this.$refs.prodTitle.setAttribute('data-tracking-element-click', JSON.stringify(clickData))
    }
    if (trackProps.collectionId) {
      let collectData = {
        elementId: trackProps.collectionId,
        actionType: "product_collection",
        list: [
          {
            fieldValue: this.product.productId || this.product.productid,
            filedName: "productId"
          },
          {
            fieldValue: this.product.isCollect,
            filedName: "collectionState"
          }
        ]
      }
      this.$refs.cardCollect.setAttribute('data-tracking-element-click', JSON.stringify(collectData))
    }
    if (trackProps.addToQueueId) {
      let queueData = {
        elementId: trackProps.addToQueueId,
        actionType: "product_add_to_queue",
        list: [
          {
            fieldValue: this.product.productId || this.product.productid,
            filedName: "productId"
          },
          {
            fieldValue: this.product.islist ? 1 : 0,
            filedName: "queueState"
          }
        ]
      }
      this.$refs.cardAddQueue.setAttribute('data-tracking-element-click', JSON.stringify(queueData))
    }
  },
  methods: {
    $enterInventory (prod) {
      const _this = this;
      this.product.showInventory = true;
      _this.$forceUpdate();
      if (!Array.isArray(this.product.inventories)) {
        CJ_.$axios
          .post("storehousecj/areaInventory/getAreaInventoryInfo", {
            pid: this.product.id
          })
          .then(([err, res]) => {
            if (err) {
              console.warn(err);
            } else {
              // 翻译文案
              res.data = transWarehouseStock(res.data);
              if (res.data.length == 1 && res.data[0].countryCode == 'CN' && res.data[0].num == 0) {
                CJ_.$axios
                  .post("cj/locProduct/huoQuShangPinXiangQing", {
                    id: this.product.id
                  })
                  .then(([err2, res2]) => {
                    if (err) {
                      console.warn(err);
                    } else {
                      res.data[0].num = 10000 * res2.result.stanProducts.length;
                      this.product.inventories = res.data;
                    }
                  });
              }else{
                this.product.inventories = res.data;
              }
              _this.$forceUpdate();
            }
          });
      }
    },
    $leaveInventory(prod) {
      this.product.showInventory = false;
      this.$forceUpdate();
    },
    $enterFreeShip(prod) {
      this.product.showFreeShip = true
      this.$forceUpdate();
    },
    $leaveFreeShip(prod) {
      this.product.showFreeShip = false
      this.$forceUpdate();
    },
    // 添加到刊登
    addToQueueRun(prod, e) {
      // 已在队列中提示
      if(this.product.islist) return layer.msg(i18next.t('product-card-please-check-the-product-in-queue.-it-has-been-added-to-queue.'))

      if(!CJ_isLogin){
        location.href = '/login.html';
        return;
      }

      let oid = this.product.id || this.product.productId || this.product.productid;
      CJ_.$axios
        .post("cj/listedproduct/add", [oid])
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
          if(d > 0) {
            this.product = { ...this.product, islist: true }
            const ev = { detail: {queueNumAdd: d } };
            window.dispatchEvent(new CustomEvent('queueNumUpdate', ev));
          }else{
            this.$my_message.info(i18next.t('product-card-added-to-queue-successfully.'));
          } 
        });
    },
  },
};
</script>

<style lang="less" scoped>
// 样式文件使用额外的 product-card.less，可以 njk 和 vue 公用
</style>
