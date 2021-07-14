<template>
  <div class="filter-wrap">
    <!-- 首页关键词搜索进来-显示推荐关键词 -->
    <div class="keyword-category" v-show="kcType.includes(0)">
      <div class="filter-label">{{this.keywordTitle}}:</div>
      <div class="kc-wrap">
        <div class="keyword-content" :class="isMore && 'more'">
          <div class="keyword-box">
            <span class="filter-span" :class="{ active:idx == keywordCur}" v-for="(item, idx) of keywordList" :key="idx" @click="clickKeyword(item, idx)">{{ item.categoryNameEn || item.name || item.areaEn }}</span>
          </div>
          <button class="keyword-more" @click="showMore()" v-show="isShowMore">{{isMore ? 'Less' : 'More'}}</button>
        </div>
      </div>
    </div>
    <!-- 首页类目点击进来-显示面包屑类目 -->
    <div class="keyword-category" v-show="kcType.includes(1)">
      <div class="filter-label">You are in:</div>
      <div class="kc-wrap">
        <div class="category-content">
          <a class="select-item" href="javascript:void(0);" v-for="(item, idx) of categoryShowList" :key="idx">
            <span class="filter-span" @click="clickCategories(item, idx)">
              {{ (item.nameEn || item.name) + (idx == categoryShowList.length - 1 ? '' : '  > ') }}
              <i class="iconfont iconxiangxia" v-show="categoryShowList.length < 3 && idx === categoryShowList.length - 1"></i>
            </span>
            <ul class="select-ul" v-show="categoryShowList.length < 3 && idx === categoryShowList.length - 1">
              <li v-for="(i, index) of item.children" :key="index" @click="clickLiCategories(i, item)">
                {{ i.nameEn }}
              </li>
            </ul>
          </a>
        </div>
      </div>
    </div>
    <!-- 首页图片搜索进来-显示搜索图片 -->
    <div class="keyword-category" v-show="kcType.includes(2)">
      <div class="kc-wrap">
        <div class="search-img">
          <img :src="searchImg" />
          <div class="keyword-box">
            <span class="filter-span" :class="{ active:idx == keywordCur}" v-for="(item, idx) of keywordList" :key="idx" @click="clickKeyword(item, idx)">{{ item.categoryNameEn || item.name }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="filter-by">
      <div class="filter-label">Filter by:</div>
      <div class="filter-item select-item" v-show="isFilterWarehouse">
        <span class="filter-span active">
          {{ warehouseList[warehouseCurOn] && warehouseList[warehouseCurOn].areaEn }}
          <i class="iconfont iconxiangxia"></i>
        </span>
        <ul class="select-ul">
          <li :class="{ active:idx == warehouseCurOn }" v-for="(item, idx) of warehouseList" :key="idx" @click="clickWarehouse(item, idx)">{{ item.areaEn }}</li>
        </ul>
      </div>
      <div class="filter-item select-item">
        <span class="filter-span active">
          {{ prodTypeList[prodTypeCur] && prodTypeList[prodTypeCur].name }}
          <i class="iconfont iconxiangxia"></i>
        </span>
        <ul class="select-ul">
          <li :class="{ active:idx == prodTypeCur }" v-for="(item, idx) of prodTypeList" :key="idx" @click="clickProdType(item, idx)">{{ item.name }}</li>
        </ul>
      </div>
      <div class="filter-item">
        <span class="filter-span">
          Price
        </span>
        <div class="filter-price-group">
          <input @input="onInputMin" class="filter-input" placeholder="Min" v-model="minNum">
          <span>-</span>
          <input @input="onInputMax" class="filter-input" placeholder="Max" v-model="maxNum">
          <button class="confirm-btn" @click="clickPriceConfirm()">Confirm</button>
        </div>
      </div>
      <label class="filter-item">
        <input @change="onCheckboxShip" type="checkbox" class="checkbox" v-model="checkedShipping">
        <span>Free Shipping</span>
      </label>
    </div>
    <div class="filter-by" v-show="isSortby">
      <div class="filter-label">Sort by:</div>
      <div class="filter-item">
        <span class="filter-span" :class="{ active:0 == sortByCur}" @click="bestMatchClk()">Best Match</span>
      </div>
      <div class="filter-item">
        <span class="sort filter-span" @click="clickListsSort()" :class="{ active:1 == sortByCur}">
          Lists
          <div class="sortIcon">
            <i :class="isAsc===0 ? 'active':  ''" class="iconfont iconxia2"></i>
          </div>
        </span>
      </div>
      <div class="filter-item">
        <span class="sort filter-span" @click="clickPriceSort()" :class="{ active:2 == sortByCur}">
          Price
          <div class="sortIcon">
            <i :class="isAsc===1 ? 'active':  ''" class="iconfont iconshang1"></i>
            <i :class="isAsc===0 ? 'active':  ''" class="iconfont iconxia2"></i>
          </div>
        </span>
      </div>
      <div class="filter-item">
        <span class="filter-span" :class="{ active:3 == sortByCur}" @click="newestClk()">Newest</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "list-filter",
  props: {
    filter: {
      type: Object,
      default: {}
    },
  },
  data() {
    return {
      isMore: false, // more按钮开关状态
      isShowMore: false, // 是否显示more按钮
      searchImg: this?.filter?.searchImg || '', // 图片搜索的图片路径
      isAsc: null, // 0:降序, 1:升序
      sortByCur: 0, // 0:bestMatch, 1:Lists, 2:price, 3:newest
      keywordCur: this?.filter.keywordCur, // 推荐关键词选中键值
      prodTypeCur: 0,
      minNum: '',
      maxNum: '',
      checkedShipping: false,
      isSortby: this.filter.isSortby ?? true,
      warehouseCur: 0,
      keywordTitle: this.filter?.keywordTitle || 'CATEGORIES',
      isFilterWarehouse: this.filter?.isFilterWarehouse ?? true, // 是否显示filter by的仓库筛选项
    };
  },
  computed: {
    keywordList: function() {
      this.$nextTick(function () {
        if (document.querySelector('.keyword-box')?.clientHeight > 60) {
          this.isShowMore = true;
        }
      })
      return this.filter.keywordList || []
    },
    warehouseList: function() {
      return this.filter.warehouseList || []
    },
    prodTypeList: function() {
      return this.filter.prodTypeList || []
    },
    categoryShowList: function() {
      return this.filter.categoryShowList || []
    },
    kcType: function() {// 0：显示推荐关键词，1：显示面包屑类目，2：图片搜索
      return this?.filter?.filterType || 0
    },
    warehouseCurOn: {
      get: function() {
        this.warehouseCur = this.filter.warehouseCur || this.warehouseCur
        return this.warehouseCur
      },
      set: function(newValue) {
        this.filter.warehouseCur = newValue
        this.warehouseCur = newValue
      }
    }
  },
  methods: {
    showMore() {
      this.isMore = !this.isMore;
    },
    bestMatchClk() {
      this.sortByCur = 0;
      this.isAsc = 0;
      this.clickSort()
    },
    newestClk() {
      this.sortByCur = 3;
      this.isAsc = 0;
      this.clickSort()
    },
    clickListsSort() {
      if (this.sortByCur != 1) {
        this.sortByCur = 1;
        this.isAsc = 0;
      }
      this.clickSort()
    },
    clickPriceSort() {
      if (this.sortByCur != 2) {
        this.sortByCur = 2;
        this.isAsc = 1;
      } else {if(this.isAsc === 1) {
          this.isAsc = 0
        } else if(this.isAsc === 0) {
          this.isAsc = 1
        }
      }
      this.clickSort()
    },
    clickKeyword(item, idx) {
      this.keywordCur=idx;
      this.$parent.clickKeyword(item)
    },
    // 点击sort by排序
    clickSort() {
      this.$parent.clickSort({
        feildType: this.sortByCur,
        isAsc: this.isAsc,
      })
    },
    // 仓库选项
    clickWarehouse(item, idx) {
      this.warehouseCurOn = idx
      this.$parent.clickWarehouse(item)
    },
    // 商品类型选项
    clickProdType(item, idx) {
      this.prodTypeCur = idx
      this.$parent.clickProdType(item)
    },
    // 价格范围
    onInputMin(e) {
      this.minNum = e.target.value === '0' ? '0' : e.target.value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.').replace(/^[0]*/,'').replace(/^\./,'0.').match(/^0\.([1-9]|\d[1-9])$|^[0-9]\d{0,8}\.\d{0,2}|^[1-9]\d{0,7}/g)?.[0];
      // this.minNum = e.target.value === '0' ? '0' : e.target.value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.').replace(/^[0]*/,'').replace(/^[0]*$/,'0').replace(/^\./,'0.').match(/^0\.([1-9]|\d[1-9])$|^[1-9]\d{0,8}\.\d{0,2}|^[1-9]\d{0,7}/g)?.[0];

    },
    onInputMax(e) {
      this.maxNum = e.target.value === '0' ? '0' : e.target.value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.').replace(/^[0]*/,'').replace(/^\./,'0.').match(/^0\.([1-9]|\d[1-9])$|^[0-9]\d{0,8}\.\d{0,2}|^[1-9]\d{0,7}/g)?.[0];
    },
    clickPriceConfirm() {
      this.$parent.clickPriceConfirm(parseFloat(this.minNum), parseFloat(this.maxNum))
    },
    // 包邮过滤
    onCheckboxShip() {
      console.log(this.checkedShipping)
      this.$parent.onCheckboxShip(this.checkedShipping)
    },
    // 点击类目
    clickCategories(item, idx) {
      this.$parent.clickCategories(item, idx)
    },
    // 点击选择下级类目
    clickLiCategories(childrenItem, fatherItem) {
      this.$parent.clickLiCategories(childrenItem, fatherItem)
    },
  },
};
</script>

<style lang="less" scoped>
.filter-wrap {
  background: #fff;
  padding: 0 16px;
  button:focus {
    outline: none;
  }
  .filter-label {
    font-size: 14px;
    font-weight: 600;
    color: rgba(51,51,51,1);
    line-height: 24px;
    width: 120px;
  }
  .filter-span {
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-right: 10px;
    &.active {
      color: var(--color-theme-1) !important;
    }
    &:hover {
      color: var(--color-theme-1-1) !important;
      .sortIcon {
        i {
          color: var(--color-theme-1-1) !important;
        }
      }
    }
  }
  .iconfont {
    margin-left: 8px;
    font-size: 12px;
    color: #666;
  }
  .select-item {
    position: relative;
    .select-ul {
      position: absolute;
      top: 100%;
      left: 0;
      background-color: #fff;
      box-shadow: 0px 1px 4px 1px rgba(213, 212, 212, 0.48);
      z-index: 9;
      border-radius: 4px;
      overflow: hidden;
      min-width: 100%;
      width: max-content;
      display: none;
      max-height: 280px;
      overflow-y: auto;
      li{
        padding: 10px 16px;
        font-size: 14px;
        color: #333;
        cursor: pointer;
        &:hover{
          background: rgba(255, 119, 0, .2);
          color: #FF7700;
        }
        &.active{
          color: #FF7700;
        }
      }
    }
    &:hover {
      .select-ul {
        display: block;
      }
      .iconfont {
        transform: rotate(180deg);
      }
    }
  }
  .keyword-category {
    display: flex;
    border-bottom: 1px dashed #e8e8e8;
    .filter-label {
      line-height: 60px;
    }
    .kc-wrap {
      display: flex;
      flex: 1;
      .keyword-content{
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex: 1;
        height: initial;
        transition: height 2s linear;
        overflow: hidden;
        height: 60px;
        &.more {
          height: auto;
        }
        .keyword-box {
          padding-top: 20px;
          span {
            display: inline-block;
            font-size: 14px;
            color: #666;
            margin: 0 32px 21px 0;
            cursor: pointer;
            line-height: 1;
            &:hover{
              color: #FF7700;
            }
          }
        }
        .keyword-more {
          font-size: 12px;
          border-radius: 50px;
          border: 1px solid #e8e8e8;
          background: #fff;
          padding: 0 10px;
          height: 20px;
          position: relative;
          top: 20px;
          color: #666;
          word-break: keep-all;
          &:hover {
            border-color: #FF7700;
            color: #FF7700;
          }
          &:focus {
            outline: none;
          }
        }
      }
      .category-content {
        height: 60px;
        display: flex;
        align-items: center;
        a {
          color: #666;
          font-weight: 400;
          font-size: 14px;
          &:nth-last-child(1), &:hover {
            color: #FF7700;
          }
        }
      }
      .search-img {
        margin: 10px 0;
        display: flex;
        img {
          width: 104px;
          height: 104px;
          border-radius: 8px;
          border: 1px solid #F2F2F2;
          margin-right: 30px;
        }
        .keyword-box {
          flex: 1;
          span {
            display: inline-block;
            font-size: 14px;
            margin-right: 32px;
            margin-bottom: 25px;
            cursor: pointer;
          }
        }
      }
    }
  }
  .filter-by {
    padding: 16px 0;
    display: flex;
    align-items: center;
    label {
      margin-bottom: 0;
    }
    .filter-item {
      font-size: 14px;
      color: #333;
      margin-right: 54px;
      display: flex;
      align-items: center;
      .filter-price-group{
        margin-left: 10px;
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
        }
        input[type="number"]{
          -moz-appearance: textfield;
        }
        .filter-input {
          height: 28px;
          border: 1px solid rgba(153,153,153,.3);
          width: 64px;
          border-radius: 4px;
          padding: 0 8px;
          font-size: 14px;
        }
        button {
          width: 82px;
          height: 28px;
          background: var(--color-theme-1);
          border-radius: 14px;
          color: #fff;
          font-size: 14px;
          margin-left: 10px;
        }
        .confirm-btn:hover {
          background: var(--color-theme-1-1);
        }
      }
      .checkbox {
        -webkit-appearance: none;
        width: 16px;
        height: 16px;
        border: 1px solid #E8E8E8;
        margin-right: 10px;
        border-radius: 50%;
        &:hover {
          border-color: #F9912A;
        }
        &:checked {
          border-color: #F9912A;
          &::after {
            content: '';
            display: block;
            background: #F9912A;
            border-radius: 50%;
            width: 8px;
            height: 8px;
            margin: 3px;
          }
        }
      }
      .sort {
        .sortIcon {
          width: 10px;
          line-height: 8px;
          .iconfont {
            margin-left: 3px;
          }
        }
        &.active {
          .iconfont {
            &.active {
              color: #FF7700;
            }
          }
        }
      }
    }
  }
}
</style>
