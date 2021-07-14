export const cjMessage = {
  loading: function({
    popupContainerDom = null, // 渲染父节点。默认渲染到 body 上
    isFixed = false,
  } = {}) {
    const loading = new cjLoading({
      popupContainerDom,
      isFixed,
    });
    // debugger
    loading.show();
    return {
      hide: () => {
          loading.close();
          loading.destory();
      },
    };
  },
};

export const cjLoading = function({
  popupContainerDom = null,
  isFixed = false,
  config = {},
}) {
  const { width = 64, height = 64, zIndex = 999999 } = config;
  this.popupContainerDom = popupContainerDom;
  this.isFixed = isFixed;
  this.loading = document.createElement("div");
  this.lot = lottie.loadAnimation({
    container: this.loading,
    setSpeed: 0.1,
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "/egg/image/cj_lottie.json",
  });
  // loading元素样式
  this.loading.style.width = `${width}px`;
  this.loading.style.height = `${height}px`;
  this.loading.style.zIndex = zIndex;
  this.loading.style.margin = "auto";
  this.loading.style.position = "absolute";
  this.loading.style.top = "0";
  this.loading.style.left = "0";
  this.loading.style.bottom = "0";
  this.loading.style.right = "0";
  // 蒙层元素样式
  this.wrapper = document.createElement("div");
  this.wrapper.style.top = "0";
  this.wrapper.style.left = "0";
  this.wrapper.style.bottom = "0";
  this.wrapper.style.right = "0";
  this.wrapper.style.display = "none";
  this.wrapper.style.zIndex = zIndex + 1;
  
  if (isFixed) {
    this.wrapper.style.position = "fixed";
    this.wrapper.appendChild(this.loading);
    document.body.appendChild(this.wrapper);
  } else if (popupContainerDom) {
    this.wrapper.style.position = "absolute";
    popupContainerDom.style.position = "relative";
    this.wrapper.appendChild(this.loading);
    popupContainerDom.appendChild(this.wrapper);
  } else {
    this.loading.style.display = "none";
    this.loading.style.position = "relative";
    document.body.appendChild(this.loading);
  }
};
cjLoading.prototype.show = function() {
  if (this.isFixed || this.popupContainerDom) {
    this.wrapper.style.display = "block";
  } else {
    this.loading.style.display = "block";
  }
};
cjLoading.prototype.close = function() {
  if (this.isFixed || this.popupContainerDom) {
    this.wrapper.style.display = "none";
  } else {
    this.loading.style.display = "none";
  }
};
cjLoading.prototype.destory = function() {
  this.lot && this.lot.destroy();
  this.loading && this.loading.remove();
  this.wrapper && this.wrapper.remove();
};
