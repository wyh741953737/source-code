/**
 * 仅中文、英文、数字
 */
export const CEN = /^[A-z0-9\u4e00-\u9fa5]*$/;
/**
 * 仅英文、数字
 */
export const EN = /^[A-z0-9]*$/;
/**
 * 电话号码正则表达式（支持手机号码，3-4位区号，7-8位直播号码，1－4位分机号）
 */
export const CONTACTNUM = /(\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/;
/**
 * 非空格
 */
export const BLANK = /^\S+$/;
/**
 * 两边非空格
 */
export const BLANKAROUND = /^\S+.*\S+$/;
/**
 * 正整数包括0
 */
export const POSITIVEINTEGER = /^\d+$/;

/**
 * 仅数字
 */
export const METARIALINTERGE = /^((\d*)(\.\d*)?|0)$/;
/**
 * 网址链接
 */
export const LINK = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/;

/**
 * 仅数字包含正负数
 */

export const AUTHNUMBERABOUTMINUS = /^-?[0-9]+.?[0-9]*/;

/**
 * 只支持数字、英文，不区分大小写
 */
export const MATERIALNUMBERREGEXP = /^[a-zA-Z0-9]*$/;

// 判断字符串是否以英文字母开头

export const STRINGFIRSTISMATERIAL = /^[a-zA-Z]/;

/**
 * 只支持数字、英文，英文逗号，-,不区分大小写
 */
export const COMMMASSEPARATE = /^[a-zA-Z0-9,-]*$/;
