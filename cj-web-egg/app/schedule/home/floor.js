/**
 * 首页楼层数据
 */

const { languages } = require('../../../common/config');
const utils = require('../../../common/utils');

async function getFloorLng(_fetch, writeToCache, floorNum, extra = '', cache = false) {
  for(let i = 0; i < languages.length; i ++) {
    let _ = languages[i];
    await _fetch(cache, { lng: _ }).then(([err, data]) => {
      if (!err && !utils.isEmpty(data)) {
        writeToCache(`home/floor_${floorNum}${extra || ''}_${_}.json`, { data });
      }
    })
  }
}

module.exports = {
  schedule: {
    interval: '10m', // 10分钟执行一次
    type: 'worker',
    immediate: true,
  },
  async task(ctx) {
    const home = ctx.service.home;
    const writeToCache = ctx.app.writeToCache;

    // 楼层1
    /* home.getFloor_1(false, {
      lng: 'zh',
    }).then(([err, data]) => {
      err || writeToCache('home/floor_1.json', { data });
    }); */

    getFloorLng(home.getFloor_1, writeToCache, 1)

    // 楼层2
    getFloorLng(home.getFloor_2, writeToCache, 2)
    /* home.getFloor_2(false).then(([err, data]) => {
      console.log('楼层2写入', data);
      err || writeToCache('home/floor_2.json', { data });
    }); */

    // 楼层3
    getFloorLng(home.getFloor_3, writeToCache, 3)
    /* home.getFloor_3(false).then(([err, data]) => {
      err || writeToCache('home/floor_3.json', { data });
    }); */

    // 楼层4
    getFloorLng(home.getFloor_4, writeToCache, 4)
    /* home.getFloor_4(false).then(([err, data]) => {
      err || writeToCache('home/floor_4.json', { data });
    }); */

    // 楼层5
    getFloorLng(home.getFloor_5, writeToCache, 5)
    /* home.getFloor_5(false).then(([err, data]) => {
      err || writeToCache('home/floor_5.json', { data });
    }); */

    // 楼层6
    getFloorLng(home.getFloor_6_l, writeToCache, 6, '_l')
    getFloorLng(home.getFloor_6_r, writeToCache, 6, '_r')
    /* home.getFloor_6_l(false).then(([err, data]) => {
      err || writeToCache('home/floor_6_l.json', { data });
    });
    home.getFloor_6_r(false).then(([err, data]) => {
      err || writeToCache('home/floor_6_r.json', { data });
    }); */

    // 楼层7
    getFloorLng(home.getFloor_7_l, writeToCache, 7, '_l')
    getFloorLng(home.getFloor_7_r, writeToCache, 7, '_r')
    /* home.getFloor_7_l(false).then(([err, data]) => {
      err || writeToCache('home/floor_7_l.json', { data });
    });
    home.getFloor_7_r(false).then(([err, data]) => {
      err || writeToCache('home/floor_7_r.json', { data });
    }); */

    // 楼层8
    getFloorLng(home.getFloor_8, writeToCache, 8)
    /* home.getFloor_8(false).then(([err, data]) => {
      err || writeToCache('home/floor_8.json', { data });
    }); */

    // 楼层9
    getFloorLng(home.getFloor_9, writeToCache, 9)
    /* home.getFloor_9(false).then(([err, data]) => {
      err || writeToCache('home/floor_9.json', { data });
    }); */
    // 全球仓
    getFloorLng(home.getFloor_gw, writeToCache, 'global_warehouse')
  },
};
