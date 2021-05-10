import { StyleSheet } from 'react-native';
import px2dp from '../../../utils/px2dp';

export default StyleSheet.create({
  modal_mask: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modal_warp: {
    minWidth: px2dp(275),
    maxWidth: px2dp(315),
    backgroundColor: '#fff',
    borderRadius: px2dp(8),
    padding: px2dp(16),
  },
  modal_title: {
    color: '#303133',
    fontWeight: '500',
    fontSize: px2dp(16),
    textAlign: 'center',
    paddingBottom: px2dp(10),
  },
  modal_content: {
    paddingHorizontal: px2dp(10),
    maxHeight: px2dp(250),
  },
  modal_content_text: {
    color: '#606266',
    fontSize: px2dp(14),
    textAlign: 'center',
  },
  modal_footer_buttons: {
    paddingTop: px2dp(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modal_footer_button: {
    width: px2dp(106),
    paddingVertical: px2dp(8),
    borderRadius: px2dp(18),
    color: '#909399',
    fontSize: px2dp(14),
    textAlign: 'center',
    borderWidth: px2dp(1),
    borderColor: '#EBEEF5',
  },
  active_color: {
    color: '#4400fa',
  },
});
