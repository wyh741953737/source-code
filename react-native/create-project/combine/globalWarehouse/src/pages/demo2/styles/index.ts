import { platform } from '@/utils/tools/base';
import webStyles from './index.web.less';
import mobileStyles from './index.mobile.less';

export default platform() === 'h5' ? mobileStyles : webStyles;
