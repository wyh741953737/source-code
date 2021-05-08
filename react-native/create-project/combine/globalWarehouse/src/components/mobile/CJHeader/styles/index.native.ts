import { StyleSheet } from 'react-native';
import px2dp from '../../../../utils/px2dp';

export default StyleSheet.create({
  header_wrap: {
    flex: undefined,
  },
  headerBox: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  header_content: {
    flex: 1,
    height: px2dp(44),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: px2dp(16),
  },
  title: {
    fontSize: px2dp(16),
    fontWeight: '500',
  },
  right_box: {},
});
