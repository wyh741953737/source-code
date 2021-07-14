import {StyleSheet} from 'react-native';
import px2dp from '../../utils/px2dp';

export default StyleSheet.create({
  no_data: {
    flex: 1,
    marginTop: '10%',
    alignItems: 'center',
  },
  img: {
    width: px2dp(75),
    height: undefined,
    aspectRatio: 75 / 87,
  },
  no_data_text: {
    fontSize: px2dp(14),
    color: '#909399',
    marginTop: px2dp(10),
    marginBottom: px2dp(10),
  },
});
