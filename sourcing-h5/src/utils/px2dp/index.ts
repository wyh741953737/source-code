import {Dimensions} from 'react-native';

/*
 * 设计稿元素宽度（px） / 设计稿总宽度（px）= 元素的宽度（dp）/ 屏幕的总宽度（dp）
 * 元素的宽度（dp）= 设计稿元素宽度（px）/ 设计稿总宽度(px) * 屏幕的总宽度（dp）
 * */

// 设备宽度，单位 dp
const deviceWidthDp = Dimensions.get('window').width;

// 设计稿宽度，单位 px
const uiWidthPx = 375;

// px 转 dp（设计稿中的 px 转 rn 中的 dp）
const px2dp = (uiElePx: number) => (uiElePx / uiWidthPx) * deviceWidthDp;

export default px2dp;
