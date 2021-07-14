import {StyleSheet} from 'react-native';
import px2dp from '../../../../utils/px2dp';

export default StyleSheet.create({
  wrap: {
    backgroundColor: '#FEFEFE',
    borderRadius: px2dp(8),
    paddingHorizontal: px2dp(16),
    paddingBottom: px2dp(16),
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: px2dp(48),
  },
  border_bottom: {
    borderBottomWidth: px2dp(1),
    borderBottomColor: '#f5f7fa',
  },
  content: {
    paddingTop: px2dp(16),
  },
});
