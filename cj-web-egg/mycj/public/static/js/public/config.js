import { BUILD_TIMESTAMP, NODE_ENV } from '@root_egg/env';
import { api } from '@root_egg/common/config.js';

// 写入全局顶级域名
/** 获取顶级域名 */
function getTopDomain(host = location.hostname) {
  const ip_pattern = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/; // 匹配ip
  if (ip_pattern.test(host)){
    return host;
  }
  
  const tmp = host.split('.');
  let domain = '';
  if (tmp.length > 1) {
    const last = tmp.length - 1;
    domain = `${tmp[last - 1]}.${tmp[last]}`;
  } else {
    domain = host;
  }
  return domain === 'localhost' ? domain : `.${domain}`;
}

window.environment = NODE_ENV;

window.__root__domain = getTopDomain();

window.BUILD_TIMESTAMP = BUILD_TIMESTAMP; // 项目构建时间戳


const ENV_JSON = api;
window.httpsJson = ENV_JSON[NODE_ENV] || {};
