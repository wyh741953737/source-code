import moment, { Moment } from 'moment';
import React from 'react';
import { ColumnsType } from 'antd/lib/table/interface';

export const NumberList = {
  /**
   * 创建范围数字数组
   * @param start 开始数字
   * @param end 结束数字
   * @param digit 不满指定位数自动补零
   */
  create: (
    start: number,
    end: number,
    digit: number | undefined,
  ): Array<any> => {
    const temp = [];
    for (let i = start; i <= end; i++) {
      if (!digit) {
        temp.push(String(i));
        continue;
      }
      const len = digit - String(i).length;
      if (len <= 0) {
        temp.push(String(i));
        continue;
      }
      temp.push(new Array(len + 1).join('0') + String(i));
    }
    return temp;
  },
  /**
   * 创建范围数字数组枚举
   * @param start 开始数字
   * @param end 结束数字
   * @param digit 不满指定位数自动补零
   */
  createEnum: (
    start: number,
    end: number,
    digit: number | undefined,
  ): Array<any> => {
    const temp = [];
    for (let i = start; i <= end; i++) {
      if (!digit) {
        temp.push(['', { key: String(i), value: String(i) }]);
        continue;
      }
      const len = digit - String(i).length;
      if (len <= 0) {
        temp.push(['', { key: String(i), value: String(i) }]);
        continue;
      }
      const key = new Array(len + 1).join('0') + String(i);
      temp.push(['', { key: key, value: key }]);
    }
    return temp;
  },
};

/**
 * 下载文件方法，这里做了些兼容
 * @param {string} sUrl 文件地址
 * @param {string} fileName 文件名称
 */
export const downloadFile = function(sUrl: string, fileName: string) {
  sUrl = sUrl.split('?')[0] + `?attname=${encodeURIComponent(fileName)}`;
  const isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
  const isSafari = navigator.userAgent.toLowerCase().indexOf('safari') > -1;
  //iOS devices do not support downloading. We have to inform user about this.
  if (/(iP)/g.test(navigator.userAgent)) {
    alert(
      'Your device does not support files downloading. Please try again in desktop browser.',
    );
    return false;
  }
  //If in Chrome or Safari - download via virtual link click
  if (isChrome || isSafari) {
    //Creating new link node.
    let link = document.createElement('a');
    link.target = '_blank';
    link.href = sUrl;
    if (link.download !== undefined) {
      //Set HTML5 download attribute. This will prevent file from opening if supported.
      link.download =
        fileName || sUrl.substring(sUrl.lastIndexOf('/') + 1, sUrl.length);
    }
    //Dispatching click event.
    if (document.createEvent) {
      let e = document.createEvent('MouseEvents');
      e.initEvent('click', true, true);
      link.dispatchEvent(e);
      return true;
    }
  }
  // Force file download (whether supported by server).
  if (sUrl.indexOf('?') === -1) {
    sUrl += '?download';
  }
  window.open(sUrl);
  return true;
};

/**
 * 后端给的日期转换，有带默认输出
 */
interface DateTimeFormatConfig {
  /**
   * moment的format，默认：'YYYY-MM-DD HH:mm:ss'
   */
  format?: string;
  /**
   * 当时间不存在或者不符合要求，返回的默认值，默认为：'-'
   */
  defaultValue?: string;
}

export const dateTimeFormat = function(
  dateStr: string | undefined,
  config?: DateTimeFormatConfig,
) {
  const date = moment(dateStr);
  return dateStr && date.isValid()
    ? date.add(8, 'hours').format(config?.format || 'YYYY-MM-DD HH:mm:ss')
    : config?.defaultValue || '-';
};

/**
 * 用于moment数组传给后端时候自动解析方法
 * @param momentRange moment数组
 * @param formatStr 自定义解析
 */
export const momentRangeSplit = function(
  momentRange: [Moment | undefined, Moment | undefined] | undefined,
  formatStr?: string | [string, string],
) {
  let startFormat = 'YYYY-MM-DD',
    endFormat = 'YYYY-MM-DD';
  if (Array.isArray(formatStr)) {
    startFormat = formatStr[0];
    endFormat = formatStr[1];
  } else if (formatStr) {
    startFormat = endFormat = formatStr;
  }
  const [start, end] = momentRange || [];
  return [start?.format(startFormat), end?.format(endFormat)];
};

/**
 * 自动加默认值
 * @param columns
 * @param defaultValue
 */
export function defaultColumns<T = any>(
  columns: ColumnsType<T>,
  defaultValue?: string | React.ReactElement,
) {
  return columns.map(c => {
    const render = c.render;
    c.render = function(text: any, record: any, index: number) {
      let temp = text;
      if (render) temp = render(text, record, index);
      if (temp === undefined || temp === null || temp === '') {
        return defaultValue || '-';
      }
      return temp;
    };
    return c;
  });
}

export const displayMoney = function(
  value: number | string | undefined,
  config?: { precision?: number; addon?: string },
) {
  const precision = config?.precision || 2;
  value = Number(value);
  if (isNaN(value)) return '';
  value = value.toFixed(precision);
  return `${config?.addon || '￥'} ${value}`.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ',',
  );
};

// 去除输入框前后空格
export const getValueFromEvent = (e: any) => {
  return e.target.value.replace(/(^\s*)|(\s*$)/g, '');
};
