export function href2json(href, isStr) {
  var json = {},
    arr = [],
    tmp, str = '';

  try {
    str = decodeURIComponent(href).split('?')[1];
    arr = str.split('&');
    for (var x = 0; x < arr.length; x++) {
      tmp = arr[x].split('=');
      json[tmp[0]] = tmp[1];
    }
    return isStr ? JSON.stringify(json) : json;
  } catch (e) {
    console.warn('跳转路由传参错误', e.track);
    return json;
  }
}

export function urlSearch2json(search = window.location.search) {
  if (!search) return {};

  var arr1 = search.replace('?', '').split('&');
  var json = {};

  for (let x = 0; x < arr1.length; x++) {
    let tmp = arr1[x].split('=');

    json[tmp[0]] = tmp[1];
  }

  return json;
}

export function skipToMobile(skipURLParams) {
  return function (args, isJSON = true) {
    let base64 = new Base64();
    var toHref = skipURLParams.toURL;
    var params;
    var newToHref = skipURLParams.toURL; // 19-12-02 新版m站路由

    try {
      toHref = args ?
        skipURLParams.toURL + '?params=' + (isJSON ? JSON.stringify(
          Object.assign(args, urlSearch2json())
        ) : args) :
        skipURLParams.toURL;
    } catch (e) {
      console.warn(e);
    }

    // console.log(toHref);
    // 19-12-02 新版m站路由匹配 ---------
    if (args) {
      if (args.page === 'product-detail') {
        newToHref = `${newToHref}product/details/${args.id}`;
      } else if (args.page === 'login') {
        newToHref = `${newToHref}login`;
      } else if (args.page === 'category-list') {
        // 从分类列表跳过去
        var param = [`from=pc-category-list`];
        // 添加一二三级分类
        param.push(`category_id=${args.id || ''}`);
        args.cateNameArr.length > 0 && args.cateNameArr.forEach((item,index)=>{
          param.push(`category_id${index+1}=${item.id}`)
        })

        try {
          var arr = JSON.parse(base64.decode(args.name));
          // 一级分类
          var json = arr[0] || {}
          param.push(`title=${json.name || ''}`); // 手机端标题名称
        } catch (e) { }
        newToHref = `${newToHref}product/list?${param.join('&')}`;
      } else if (args.page === 'reptail-detail') {
        newToHref = `${newToHref}reptile/details/${args.id || ''}`;
      } else if (args.page === 'category-list') {
        // 首页搜索后列表页
        newToHref = `${newToHref}search?from=pc&keywords=${args.search}`;
      } else if (args.page === 'mycj') {
        newToHref = `${newToHref}mycj`;
      } else if (args.page === 'shipping-cost-calculation') {
        // 运费适算
        newToHref = `${newToHref}mycj/shipping-cost-calculation`;
      } else if (args.page === 'register') {
        // newToHref = `${newToHref}login-register`;
      }
    }


    window.location.assign(newToHref);
    // 19-12-02 新版m站路由匹配 ---------
    // window.location.replace(toHref);
  }
}

export function isPhone({ skipToMobile, skipURLParams }) {
  return function (skip, args, isJSON) {
    var isphone = false;
    var sUserAgent = navigator.userAgent;
    if (sUserAgent.indexOf('Android') > -1 || sUserAgent.indexOf('iPhone') > -1 || sUserAgent.indexOf('iPad') > -1 || sUserAgent.indexOf('iPod') > -1 || sUserAgent.indexOf('Symbian') > -1) {

      /* cj 域名 */
      isphone = true;
      if (skipURLParams.reservedDomains.indexOf(window.location.hostname) !== -1 && skip) {
        skipToMobile(args, isJSON);
      }

      /* 预留其他供应商域名 */
      else {
        isphone = true;
      }
    }
    return isphone;
  }
}