import { StyleSheet, PixelRatio } from 'react-native';
import px2dp from '../../../../utils/px2dp';

export default StyleSheet.create({
  mask: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 1999,
  },
  picker_warp: {
    backgroundColor: '#fff',
    borderTopLeftRadius: px2dp(8),
    borderTopRightRadius: px2dp(8),
    paddingHorizontal: px2dp(16),
    position: 'absolute',
    width: '100%',
    height: px2dp(385),
    bottom: 0,
    left: 0,
    zIndex: 2000,
  },
  title_box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: px2dp(16),
  },
  cancel_text: {
    color: '#909399',
    fontWeight: '500',
    fontSize: px2dp(14),
  },
  confirm_text: {
    color: '#4400FA',
    fontWeight: '500',
    fontSize: px2dp(14),
  },
  search_box: {
    marginBottom: px2dp(16),
    paddingHorizontal: px2dp(10),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
    borderRadius: px2dp(4),
  },
  input: {
    flexGrow: 1,
    height: px2dp(32),
    paddingRight: px2dp(10),
    fontSize: px2dp(14),
    backgroundColor: '#F5F7FA',
    paddingVertical: px2dp(0),
    marginBottom: px2dp(0),
    borderRadius: px2dp(0),
    borderWidth: px2dp(0),
  },
  inputStyle: {
    paddingLeft: px2dp(0),
    fontSize: px2dp(14),
  },
  prefix: {
    marginRight: px2dp(10),
  },
  divider: {
    marginBottom: px2dp(8),
    borderBottomWidth: 1 / PixelRatio.get(),
    borderColor: '#DCDFE6',
  },
  dividerMargin: {
    marginTop: px2dp(16),
  },
  item_warp: {
    marginBottom: px2dp(16),
  },
  item: {
    lineHeight: px2dp(32),
    marginBottom: px2dp(5),
    fontSize: px2dp(14),
    color: '#606266',
    // paddingHorizontal: px2dp(16),
  },
  active: {
    color: '#333333',
    fontWeight: '500',
    // backgroundColor: '#F5F7FA',
    borderRadius: px2dp(4),
    overflow: 'hidden',
  },
});
