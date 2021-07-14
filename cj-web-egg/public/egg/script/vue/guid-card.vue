/**
* 智能引导
*/
<template>
  <div class="guid-box">

    <div class="guid-left h-100" v-cjdot cjdotshow='{"pageCode":"home", "eventType": 2, "buttonName": "Our Services"}'>
      <img :class="targetCls" class="position-absolute guid-path" src="/egg/image/guidPath.svg" alt />
      <div
        class="guid-left-item"
        v-for="litem of gList"
        :key="litem.key"
        :class="{ act: litem.active }"
        @mouseenter="$enterFirst(litem.key)"
      >
        <span class="iconfont" :class="litem.icon"></span>
        <span class="guid-first-name">{{litem.name}}</span>
      </div>
    </div>
    <div class="guid-right h-100">
      <div
        class="guid-item"
        v-for="rItem of gList"
        :key="rItem.key"
        :class="{ act: rItem.itemFlag === 'active', prev: rItem.itemFlag === 'prev', next: rItem.itemFlag === 'next' }"
      >
        <div class="guid-s-nav">
          <ul>
            <li
              v-for="(nav, idx) in rItem.children"
              :key="idx"
              :class="{ act: nav.active }"
              @mouseenter="$enterNav(idx, rItem.key - 1)"
              @click="jumpWeb(nav)"
            >
              <span>{{nav.name}}</span>
              <span class="iconfont iconlujing"></span>
            </li>
          </ul>
        </div>
        <div class="guid-show">
          <div
            class="guid-show-item"
            :class="{ act: lfItem.active }"
            v-for="(lfItem, lfidx) in rItem.children"
            :key="lfidx"
          >
            <div v-if="lfItem.active" class="w-100 h-100">
              <div class="guid-img w-100">
                <img
                  @load="$onloadImg(lfidx, rItem.key - 1)"
                  :src="lfItem.image"
                  onerror="javascript:this.src='/egg/image/img_default.jpg'"
                  alt
                />
              </div>
              <div class="guid-describe">{{lfItem.describe}}</div>
              <div class="guid-describe">{{lfItem.describe2}}</div>
              <div class="guid-describe">{{lfItem.describe3}}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="guid-show">
        <img :src="timage" onerror="javascript:this.src='/egg/image/img_default.jpg'" alt />
      </div>-->
    </div>
  </div>
</template>

<script>
import i18next from "i18next";
import guidList from "@common/intelGuid";
import utils from "@common/utils";
import { getCookie } from "../global/utils";

export default {
  name: "guid-card",
  props: {
    list: {
      type: Array,
      default: () => [
        ...guidList(i18next).map((v, i) => ({
          ...v,
          active: i === 0,
          itemFlag: i === 0 ? "active" : "next",
          children: v.children.map((_v, _i) => ({
            ..._v,
            active: i === 0 && _i === 0
          }))
        }))
      ]
    }
  },
  data() {
    console.log("g-list =>", this.list);
    return {
      gList: this.list,
      targetCls: "gp-1"
      // timage: this.list[0].children[0].image
    };
  },
  created() {
    this.getLanguage();
  },
  methods: {
    getLanguage() {
      const lng = getCookie("lng");
      utils.getTransWarehouse(lng).then(([err, res]) => {
        if (!err) {
          let result = (res || {}).result || [];
          let cnName, gmName, idName;
          result.forEach(v => {
            if (v.en === "China Warehouse") cnName = v.value;
            if (v.en === "Germany Warehouse") gmName = v.value;
            if (v.en === "Indonesia Warehouse") idName = v.value;
          });
          this.gList = this.gList.map(v => {
            if (v.key === 3) {
              v.children = v.children.map(_c => {
                if (_c.name === "China Warehouse") _c.name = cnName;
                if (_c.name === "Germany Warehouse") _c.name = gmName;
                if (_c.name === "Indonesia Warehouse") _c.name = idName;
                return _c;
              });
            }
            return v;
          });
        }
      });
    },
    $enterFirst(ikey) {
      const _key = ikey - 1;
      this.targetCls = `gp-${ikey}`;
      const precIdx = this.gList.findIndex(_ => _.active) || 0; //查找上一个激活项索引
      this.gList = this.gList.map((v, i) => {
        v.active = i === _key;
        if (i === _key) v.itemFlag = "active";
        if (precIdx !== _key) {
          v.children = v.children.map((_v, _i) => ({
            ..._v,
            active: i === _key && _i === 0
          }));
          if (i === precIdx) v.itemFlag = precIdx > _key ? "next" : "prev";
        }

        return v;
      });
    },
    $enterNav(idx, pidx) {
      this.gList = this.gList.map((v, i) => {
        if (i === pidx)
          v.children = v.children.map((_v, _i) => {
            _v.active = _i === idx;
            // if(_i === idx) this.timage = _v.image
            return _v;
          });
        return v;
      });
    },
    $onloadImg(idx, pidx) {},
    jumpWeb(item) {
      const { url, isCJ } = item;
      if (!url) return;
    
      if (isCJ && url.includes("myCJ.html") && !CJ_isLogin) {
        location.href = "/login.html";
      } else {
        window.open(url);
      }
    }
  }
};
</script>

<style lang='less'>
.guid-box {
  display: flex;
  height: 100%;
  .guid-left {
    width: 265px;
    box-shadow: 0px 0px 10px 0px rgba(208, 208, 208, 0.4);
    padding: 28px 0 28px 20px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 1;
  }
  .guid-left-item {
    height: 84px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 24px;
    position: relative;
    cursor: pointer !important;
    &.act {
      span {
        transition: color 0.5s;
        color: #fff !important;
      }
    }
    span {
      font-size: 14px;
      line-height: 20px;
      color: #999;
      transition: color 0.5s;
      &.guid-first-name {
        font-size: 20px;
        color: #666;
      }
    }
  }
  .guid-path {
    left: 7px;
    top: 16px;
    transition: top 0.3s;
    &.gp-1 {
      top: 16px;
      transition: top 0.3s;
    }
    &.gp-2 {
      top: 132px;
      transition: top 0.3s;
    }
    &.gp-3 {
      top: 248px;
      transition: top 0.3s;
    }
    &.gp-4 {
      top: 364px;
      transition: top 0.3s;
    }
    &.gp-5 {
      top: 480px;
      transition: top 0.3s;
    }
  }
  .guid-right {
    width: calc(100% - 265px);
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: row-reverse;
  }
  .guid-item {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 600px;
    left: 0;
    padding: 34px 40px;
    background: #fff;
    opacity: 0;
    display: flex;
    justify-content: space-between;
    transition: top 1s, opacity 1s;
    &.act {
      top: 0;
      opacity: 1;
      transition: top 1s, opacity 1s;
    }
    &.prev {
      top: -600px;
      opacity: 0;
      transition: top 1s, opacity 1s;
    }
    &.next {
      top: 600px;
      opacity: 0;
      transition: top 1s, opacity 1s;
    }
    li {
      font-size: 14px;
      color: #999;
      line-height: 30px;
      display: flex;
      align-items: center;
      width: max-content;
      cursor: pointer !important;
      .iconfont {
        font-size: 12px;
        margin-left: 8px;
        position: relative;
        top: 2px;
        color: #fff;
      }
      &.act {
        color: #ff7700;
        .iconfont {
          color: #ff7700;
        }
      }
    }
  }
  .guid-show {
    width: 450px;
    height: 100%;
    margin-right: 90px;
    padding-top: 60px;
    background: #fff;
    position: relative;
    img {
      max-width: 450px;
      max-height: 355px;
    }
    .guid-img {
      height: 355px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .guid-describe {
      text-align: center;
      font-size: 16px;
      color: #333;
      margin-top: 20px;
      line-height: 16px;
    }
    .guid-show-item {
      width: 100%;
      position: absolute;
      background: #fff;
      opacity: 0;
      transition: opacity 4s;
      &.act {
        opacity: 1;
        transition: opacity 4s;
      }
    }
  }
}
</style>