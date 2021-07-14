import { platform } from '@/utils/tools/base';
import webStyles from './web.less';
import mobileStyles from './mobile.less';

export default platform.isH5 ? mobileStyles : webStyles;
