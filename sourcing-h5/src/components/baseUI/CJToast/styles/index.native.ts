import {StyleSheet} from 'react-native';
import px2dp from '../../../../utils/px2dp';

export default StyleSheet.create({
  mask: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content_wrap: {
    maxWidth: px2dp(275),
    paddingVertical: px2dp(16),
    paddingHorizontal: px2dp(32),
    borderRadius: px2dp(8),
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginBottom: px2dp(10),
  },
  content: {
    textAlign: 'center',
    lineHeight: px2dp(24),
    fontSize: px2dp(16),
    fontWeight: '500',
    color: '#ffffff',
  },
});
