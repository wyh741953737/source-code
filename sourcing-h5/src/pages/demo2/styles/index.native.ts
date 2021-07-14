import {StyleSheet} from 'react-native';
import px2dp from '../../../utils/px2dp';

export default StyleSheet.create({
  warp: {
    backgroundColor: '#F0F2F5',
    flex: 1,
  },
  item: {
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: px2dp(15),
    borderRadius: px2dp(4),
    paddingVertical: px2dp(16),
    borderBottomWidth: px2dp(1),
    borderBottomColor: '#dddddd',
  },
  img: {
    width: '60%',
    height: px2dp(80),
    marginRight: px2dp(16),
  },
  item_column: {
    width: px2dp(167),
    height: px2dp(280),
    overflow: 'hidden',
    borderRadius: px2dp(4),
    backgroundColor: '#fff',
    marginTop: px2dp(13),
    marginLeft: px2dp(13),
  },
  img_column: {
    width: '100%',
    height: px2dp(167),
    marginBottom: px2dp(16),
  },
});
