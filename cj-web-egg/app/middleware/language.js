
const { getClientIP, getClientInfoByIp, getLngByCountry, getTopDomain } = require('@root/common/utils');
const i18next = require('i18next');
const { NODE_ENV } = require('@root/env')
const getI18nextUtilConfig = require('@root/i18n.util.config')
const { languages } = require('@root/common/config')
const { getLocalLang, getPageLang } = require('cckj-i18n-util/dist/node')
const routers = require('@root/public/lang/router.json')

const i18nextUtilConfig = getI18nextUtilConfig({ env: NODE_ENV })
const isDev = NODE_ENV === 'development'

/** 
 * 服务端语言设置
 */

module.exports = options => async (ctx, next) => {
  const { onlyPath = [] } = options;
  const urlPath = ctx.path.indexOf('/blog/post') || ctx.path.indexOf('/blog/list') ? '/blog/pathto' : ctx.path;

  if (onlyPath.join(',').indexOf(urlPath) < 0) {
    console.log('skip language:', urlPath);
    await next();
    return;
  }
  const startTime = Date.now()
  // 测试检测方式为cookie
  let lng = '';
  let ip_lng = '';
  const client_lng = ctx.cookies.get('lng', { signed: false })

  // 获取归属地ip信息
  if (!client_lng) {
    const clientIp = getClientIP(ctx);
    if (clientIp) {
      console.warn('客户端ip地址:', clientIp);
      const { country } = await getClientInfoByIp(clientIp);
      console.log('客户端地区:', country);
      ip_lng = getLngByCountry(country) || ''; 
    }
  }

  lng = client_lng || ip_lng || 'en';
  // 六国才用翻译中心管理
  if(!languages.includes(lng)) {
    ctx.isGoogleTrans = true
    lng = 'en'
  }

  // 获取语言包，获取不到会报错
  console.log('lng', lng)
  let trans = null;
  
  console.log('env', NODE_ENV)
  console.log('route', ctx.path)

  // if(!isDev){
  //   trans = await getLocalLang('public/lang/local/all.json')
  // } else {
    let route = ctx.path
    if(['/home.html', '/index.html', '/'].includes(route)) route = '/home'
    const pages = [
      {
        router: i18nextUtilConfig.defaultRouter.path,
        pageId: i18nextUtilConfig.defaultRouter.push.pageId
      }
    ]
    if(routers[route]) {
      pages.push({
        router: route,
        pageId: routers[route].push.pageId
      })
    }
    trans = await getPageLang({
      lang: lng,
      localLangPath: 'public/lang/pull',
      pages,
      serverConfig: {
        apiUrl: `${i18nextUtilConfig.config.apiUrl}/cj-translation-api/v2/word/findByApplicationIdAndLinkAndCountryCode`,
        data: {
          applicationId: i18nextUtilConfig.config.applicationId,
        }
      },
    })
  // }

  // 开发环境输出当前请求页当前语言的翻译词库
  if(trans && isDev) {
    require('fs').writeFileSync('./dist/pullDevelopmentLang.json', JSON.stringify(trans, null, 2));
  }

  i18next.init({
    lng,
    debug: false,
    resources: {
      [lng]: {
        translation: trans,
      },
    },
    keySeparator: '__keySeparator__',
    nsSeparator: '__nsSeparator__'
  })
  ctx.translation = trans
  await next()
  if (!client_lng) {
    const topDomain = getTopDomain(ctx.hostname);
    // 客户端没带cookie过来，设置cookie，设置language
    console.log('设置cookie', lng);
    ctx.cookies.set('lng', lng, {
      httpOnly: false,
      signed: false,
      expires: new Date('2030'),
      domain: topDomain,
    });
    const language = `en|${lng === 'zh' ? 'zh-CN' : lng}`
    ctx.cookies.set('language', language, {
      httpOnly: false,
      signed: false,
      expires: new Date('2030'),
      domain: topDomain,
    });
  }
  console.log(Date.now() - startTime);
}
