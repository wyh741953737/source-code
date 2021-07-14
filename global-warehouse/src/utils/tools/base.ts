// 匹配h5正则
const reg =
  /(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i;

class Platform {
  /**
   * 是否为app移动端
   */
  get isApp() {
    return window.appEnv;
  }

  /**
   * 是否为h5移动端
   */
  get isH5() {
    return reg.test(navigator.userAgent);
  }

  /**
   * 是否为pc端
   */
  get isPC() {
    return !this.isApp && !this.isH5;
  }
}

/**
 * 判断当前运行平台 app|h5|pc
 * */
export const platform = new Platform();
