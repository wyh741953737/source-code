
import { checkLogin } from '../global/utils';
import { ajax } from '@common/utils';
// 将商品的干预类目id存入缓存
export const cjSetInterfereProdId = (id = '', clear) => {
  if (clear) {
    // 清空类目id
    localStorage.removeItem('categoryIdArr')
    return
  }
  if (!id) return
  let categoryIdArr = localStorage.getItem('categoryIdArr') && JSON.parse(localStorage.getItem('categoryIdArr')) || []
  const categoryId = id
  // 判断缓存中是否已经存在类目id
  const findIndex = categoryIdArr.findIndex(val => {
    return val.categoryId == categoryId
  })
  if (findIndex != -1) {
    // 已经缓存这个id,直接加1
    categoryIdArr[findIndex].num += 1
  } else {
    categoryIdArr = categoryIdArr.map((_, index) => {
      let num = _.num
      if (categoryIdArr.length >= 4) {
        // 缓存的id大于4个才-1
        num -= 1
      }
      if (index >= 3 && num <= 0) {
        // 如果是第4个及以上，次数为0，直接过滤
        return false
      }
      return {
        categoryId: _.categoryId,
        num: num < 0 ? 0 : num
      }
    }).filter(_ => !!_)
    if (categoryIdArr.length < 4) {
      // 小于3个直接添加一个
      categoryIdArr.push({
        categoryId,
        num: 1
      })
    }
  }
  categoryIdArr.sort((a, b) => {
    return b.num - a.num
  })
  localStorage.setItem('categoryIdArr', JSON.stringify(categoryIdArr))
}

// 获取干预类目id
export const getInterfereProdId = () => {
  const data = localStorage.getItem('categoryIdArr') && JSON.parse(localStorage.getItem('categoryIdArr')).map(_ => {
    return _.categoryId
  }) || undefined
  return data
}

// 设置版本号
export const setInterfereProdVersion = (version, clear) => {
  if (clear) {
    // 清空类目id
    localStorage.removeItem('interfereProdVersion')
    return
  }
  // localStorage.setItem('interfereProdVersionTime', new Date().getTime()) // 设置版本号的时候，设置当前时间戳
  localStorage.setItem('interfereProdVersion', version)
}

// 获取版本号
export const getInterfereProdVersion = () => {
  // 刷新页面或重新加载就清空版本号
  let interfereProdVersion = undefined
  return function (version) {
    // const nowTime = new Date().getTime();
    // const interfereProdVersionTime = localStorage.getItem('interfereProdVersionTime') || nowTime;
    // if (nowTime - interfereProdVersionTime > 1000 * 3600 * 24 * 2) {
    //   // 如果当前时间>存储时间的2天，清除版本号和类目id
    //   setInterfereProdVersion('', true)
    //   cjSetInterfereProdId('', true)
    // }
    if (version) {
      interfereProdVersion = String(version)
      if (localStorage.getItem('interfereProdVersion') && (localStorage.getItem('interfereProdVersion') != interfereProdVersion)) {
        // 如果版本号和缓存的版本号不同，说明版本号更新了，就清空类目
        cjSetInterfereProdId('', true)
      }
      setInterfereProdVersion(interfereProdVersion)
    }
    return interfereProdVersion
  }
}

// 是否要临时id
export const isTempUserId = () => {
  // 直接export anync函数会报regeneratorRuntime is not defined，先通过这种方式导出anync函数
  const fun = async () => {
    if (!checkLogin()) {
      // 没有登录且获取临时id
      const tempUserId = localStorage.getItem('tempUserId')
      if (!tempUserId) {
        // 缓存中没有临时id,请求接口获取
        const [error, data] = await ajax.post('elastic-api/recommend/search/getTempUserId')
        if (data.success) {
          localStorage.setItem('tempUserId', data.data)
          return data.data
        }
        return undefined
      }
      return tempUserId
    }
    return undefined
  }
  return fun
}
// 获取临时id
export const getTempUserId = () => {
  return localStorage.getItem('tempUserId') || undefined
}