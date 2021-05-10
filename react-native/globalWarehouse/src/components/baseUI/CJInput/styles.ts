import { StyleSheet, PixelRatio } from 'react-native';
import px2dp from '../../../utils/px2dp';

export default StyleSheet.create({
  input_warp: {
    flexDirection: 'row',
    alignItems: 'center',
    height: px2dp(40),
    borderWidth: 1 / PixelRatio.get(),
    borderColor: '#e8e8e8',
    borderRadius: px2dp(8),
    backgroundColor: '#fff',
    marginBottom: 30,
  },
  input: {
    flex: 1,
    height: '100%',
    padding: 0,
    paddingHorizontal: px2dp(11),
  },
  prefix: {
    paddingLeft: px2dp(11),
  },
  suffix: {
    paddingRight: px2dp(11),
  },
  errMsg: {
    position: 'absolute',
    color: '#FC4B3F',
    fontSize: px2dp(12),
    bottom: px2dp(-18),
    zIndex: 1,
  },
});
