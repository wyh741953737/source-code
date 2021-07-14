import {StyleSheet} from 'react-native';
import px2dp from '../../../utils/px2dp';

export default StyleSheet.create({
  default_style: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: px2dp(8),
    height: px2dp(44),
    fontWeight: '500',
    backgroundColor: '#fff',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#d9d9d9',
  },
  primary_style: {
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '500',
    borderRadius: px2dp(8),
    height: px2dp(44),
    backgroundColor: '#4400FA',
    shadowColor: 'rgba(68,0,250,0.45)', // 阴影颜色
    shadowOffset: {width: 0, height: 10}, // 阴影偏移量
    shadowOpacity: 1, // 阴影的模糊度
    shadowRadius: px2dp(10), // 阴影模糊半径 ios
    elevation: px2dp(20), // 阴影模糊半径 Android
  },
  default_style_disabled: {
    backgroundColor: '#f5f5f5',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#d9d9d9',
  },
  primary_style_disabled: {
    backgroundColor: '#f0f2f5',
    shadowColor: 'transparent',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 0,
    elevation: 0,
  },

  default_text: {
    fontSize: px2dp(14),
    color: 'rgba(0, 0, 0, .85)',
  },
  primary_text: {
    fontSize: px2dp(14),
    color: '#fff',
  },
  default_disabled_text: {
    fontSize: px2dp(14),
    color: 'rgba(0, 0, 0, .25)',
  },
  primary_disabled_text: {
    fontSize: px2dp(14),
    color: '#c0c4cc',
  },
});
