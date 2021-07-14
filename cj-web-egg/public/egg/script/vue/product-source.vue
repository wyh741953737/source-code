/**
 * 搜品卡片
 */
<template>
  <div class="card-wrap source">
    <div class="inner-box">
      <a
      v-cjstat='{"pageCode":"home", "keys":[{"key":"productId","value":`${prod.id || prod.productId || prod.productid}`}], "eventType": 1, "buttonName": "Sourcing","buttonType": "1"}'
      v-cjdot :cjdotshow='"{\"pageCode\":\"home\", \"eventType\": 0, \"buttonName\": \"Sourcing\", \"keys\":[{\"key\":\"productId\",\"value\":\""+
         (prod.id || prod.productId || prod.productid) + "\"}], \"cardName\":\"Sourcing\"}"'
        :href="
          prod.flag == 1 ?
          'product-detail.html?id=' + (prod.id || prod.productId || prod.productid) + '&from=all&fromType=&productType=' + (prod.productType || 0)
            : 'reptail-detail.html?id=' + (prod.id || prod.productId || prod.productid)
        "
        @click="goTodetail(prod, $event)"
        class="detail-anchor"
      >
        <img :src="prod.bigImg | IMG_SIZE(imgSize[0], imgSize[1])" onerror="javascript:this.src='/egg/image/img_default.jpg'" />
        <i v-if="prod.isHaveVideo == 'HAVE_VIDEO'" class="iconfont iconshipinda isVideo" :style="{fontSize: imgSize[0] == 270 ? '45px' : '30px'}"></i>
      </a>
      <div class="move-box">
        <a
        v-cjstat='{"pageCode":"home", "keys":[{"key":"productId","value":`${prod.id || prod.productId || prod.productid}`}], "eventType": 1, "buttonName": "Sourcing","buttonType": "1"}'
        v-cjdot :cjdotshow='"{\"pageCode\":\"home\", \"eventType\": 0, \"buttonName\": \"Sourcing\", \"keys\":[{\"key\":\"productId\",\"value\":\""+
         (prod.id || prod.productId || prod.productid) + "\"}], \"cardName\":\"Sourcing\"}"'
          :href="
            prod.flag == 1 ?
            'product-detail.html?id=' + (prod.id || prod.productId || prod.productid) + '&from=all&fromType=&productType=' + (prod.productType || 0)
              : 'reptail-detail.html?id=' + (prod.id || prod.productId || prod.productid)
          "
          @click="goTodetail(prod, $event)"
          class="desc detail-anchor"
        >
          {{ prod.nameVal | INIT_UPPERCASE }}
        </a>
        <div class="list-collect">
          <span class="list"></span>
          <div class="collect" 
           v-cjstat='{"pageCode":"home", "keys":[{"key":"productId","value":`${prod.id || prod.productId || prod.productid}`},{"key":"collectType","value": `${prod.isCollect}`}], "eventType": 1, "buttonName": "collection","buttonType": "1"}' 
          :class="{ active: prod.isCollect==1 }" @click="$clickcollect(prod)">
            <span v-if="prod.isCollect==1" class="iconfont icontianjiashoucangzhihou solid"></span>
            <span v-if="prod.isCollect==0" class="iconfont icontianjiashoucang hollow"></span>
          </div>
        </div>
        <div class="price">{{ prod | GET_PRICE | EXCHANGE_RATE }}</div>
        <div class="btns">
          <div class="btn-item list" 
           v-cjstat='{"pageCode":"home", "keys":[{"key":"productId","value":`${prod.id || prod.productId || prod.productid}`}], "eventType": 1, "buttonName": "Source","buttonType": "1"}'
          @click="goToList(prod,'source',$event)">{{ staticText['Source'] }}</div>
        </div>
        <div class="add-queue"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { productCard } from "./mixin";
import i18next from 'i18next';

export default {
  name: 'product-source',
  props: {
    prod: {
      type: Object,
      default: {}
    },
    imgSize: {
      type: Array,
      default: () => [179, 190]
    },
    staticText: {
      type: Object,
      default: () => ({
        'Source': i18next.t('product-card-source')
      })
    }
  },
  mixins: [productCard],
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
// 样式文件使用额外的 product-card.less，可以 njk 和 vue 公用
</style>