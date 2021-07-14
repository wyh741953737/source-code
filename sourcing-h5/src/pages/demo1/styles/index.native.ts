import {StyleSheet} from 'react-native';
import px2dp from '../../../utils/px2dp';

export default StyleSheet.create({
  wrap: {
    paddingHorizontal: px2dp(16),
    backgroundColor: '#f5f5f5',
    paddingBottom: px2dp(32),
  },
  title: {
    fontSize: px2dp(16),
    marginVertical: px2dp(10),
    borderBottomWidth: px2dp(1),
    borderBottomColor: '#eee',
  },
  image: {
    width: '100%',
    height: px2dp(200),
  },
  image_background: {
    resizeMode: 'cover',
    height: px2dp(250),
  },
  linear_gradient: {
    height: px2dp(50),
  },
});
