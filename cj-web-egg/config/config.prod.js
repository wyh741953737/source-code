
'use strict';

const path = require('path')

/**
 * 生产环境配置
 */
module.exports = (appInfo) => {

  const config = exports = {};

  config.static = {
    cacheControl: 'max-age=600',
  };

  // config.view.variable.PUBLIC_STYLE = '/egg/md5-style'
  // config.view.variable.PUBLIC_SCRIPT = '/egg/md5-script'

  config.view = {
    root: path.join(appInfo.baseDir, 'dist/view'),
    variable: {
      // 模版变量
      PUBLIC: '/egg',
      PUBLIC_LIBS: '/egg/libs',
      PUBLIC_STYLE: '/egg/md5-style',
      PUBLIC_SCRIPT: '/egg/md5-script',
      PUBLIC_IMG: '/egg/image',
    }
  }

  return {
    ...config,
  };
};
