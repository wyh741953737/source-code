require('module-alias/register');
const Service = require('egg').Service;
const utils = require('@root/common/utils');
const { Floor } = require('@root/common/home');

const floors = Floor.floors;

module.exports = class HomeService extends Service {

  constructor(app) {
    super(app);
    this.floor = new Floor(this.app);

    this.getFloor_1 = this.getFloor_1.bind(this);
    this.getFloor_2 = this.getFloor_2.bind(this);
    this.getFloor_3 = this.getFloor_3.bind(this);
    this.getFloor_4 = this.getFloor_4.bind(this);
    this.getFloor_5 = this.getFloor_5.bind(this);
    this.getFloor_6_l = this.getFloor_6_l.bind(this);
    this.getFloor_6_r = this.getFloor_6_r.bind(this);
    this.getFloor_7_l = this.getFloor_7_l.bind(this);
    this.getFloor_7_r = this.getFloor_7_r.bind(this);
    this.getFloor_8 = this.getFloor_8.bind(this);
    this.getFloor_9 = this.getFloor_9.bind(this);
    this.getFloor_gw = this.getFloor_gw.bind(this);

    this.getWarehouseList = this.getWarehouseList.bind(this);
  }

  // 类目信息
  async getCategoryList(cache = true, opt = {}) {
    const { headers = {}, lng } = opt;
    if (cache) {
      // 读取缓存
      return this.app.readFromCache(`home/category_${lng}.json`, opt);
    } else {
      // 即时拉取
      const [err, data] = await this.app.$ajax('app/product/categorylist?pid=', {
        headers: {...headers}
      })

      return err ? [err] : utils.statusCode200(data);
    }
  }

  // 获取轮播图
  async getBanner(cache = true, opt) {
    const _opt = {
      type: 'CJ' || 'SUPPLIER', // CJ、供应商
      U: '',
      P: null,
      ...opt,
    };
    if (_opt.type === 'CJ') {
      _opt.cache = 'home/banner_cj.json';
      _opt.U = 'cj/banner/getWebHomeBannerInfo';
      _opt.P = { platformType: 1 };
    } else if (_opt.type === 'SUPPLIER') {
      _opt.cache = 'home/banner_supplier.json';
      _opt.U = 'app/web/shopInfoById';
      _opt.P = { shopId: '' };
    }
    if (cache) {
      return this.app.readFromCache(_opt.cache, opt);
    } else {
      let res;
      const [err, data] = await this.app.$axios.post(_opt.U, _opt.P);
      const processData = result => {
        let arr = [];
        if (_opt.type === 'CJ') {
          // 不做处理
          arr = result
        } else if (_opt.type === 'SUPPLIER') {
          try {
            arr = result.list[0].webShopSettingVos[0].webBannerUrl.map((item, idx) => ({
              img_url: item.bannerUrl,
              link: '',
              skipType: '1',
            }));
          } catch (e) {
            this.app.writeToLog('home/cache/banner_supplier.log', e);
          }
        }
        return arr;
      };
      if (err) {
        res = [err];
      } else {
        if (+data.statusCode === 200) {
          res = [null, processData(data.result)];
        } else {
          res = [data];
        }
      }
      return res;
    }
  }

  // 获取 banner 右侧 You may want to know:
  async getCjdropshippingFAQ(cache = true, opt) {
    const { headers = {}, lng } = opt;
    const _opt = {
      U: 'cj/contentInfo/queryRecommendContent',
      P: { count: '5' },
      ...opt,
    };
    if (cache) {
      return this.app.readFromCache(`home/cjdropshippingFAQ_${lng}.json`, opt);
    } else {
      const [err, data] = await this.app.$ajax({
        method: 'post',
        url: _opt.U,
        data: _opt.P,
        headers: {...headers},
      })
      // console.log('________', err, JSON.stringify(data));
      return err ? [err] : utils.statusCode200(data);
    }
  }

  // 获取楼层信息
  async getFloor_1(cache = true, opt = {}) {
    const { lng = 'en' } = opt;
    if (cache) {
      return this.app.readFromCache(`home/floor_1_${lng}.json`, opt);
    } else {
      return this.floor.getData({
        ...floors.floor_1,
        test: 'hah',
      }, opt);
    }
  }

  async getFloor_2(cache = true, opt) {
    const { lng = 'en' } = opt;
    if (cache) {
      return this.app.readFromCache(`home/floor_2_${lng}.json`, opt);
    } else {
      /* egg 内置的 httpClient
      const { status, headers, data } = await this.app.curl(tmp.U, {
        method: 'POST',
        data: tmp.P,
        contentType: 'json',
      }); */
      return this.floor.getData(floors.floor_2);
    }
  }

  async getFloor_3(cache = true, opt) {
    const { lng = 'en' } = opt;
    if (cache) {
      return this.app.readFromCache(`home/floor_3_${lng}.json`, opt);
    } else {
      return this.floor.getData(floors.floor_3);
    }
  }

  async getFloor_4(cache = true, opt) {
    const { lng = 'en' } = opt;
    if (cache) {
      return this.app.readFromCache(`home/floor_4_${lng}.json`, opt);
    } else {
      let res;
      const tmp = floors.floor_4;
      /* const [err, data] = await this.app.$axios.post(tmp.U, tmp.P); */
      const [err, data] = await this.app.$ajax({
        method: 'post',
        url: tmp.U,
        data: tmp.P,
        headers: {
          language: lng,
        }
      });
      //console.log('data________', data)
      if (err) {
        res = [err];
      } else {
        if (+data.statusCode === 200) {
          const result = data.result;
          const d = tmp.map(result);
          res = [null, d];
        } else {
          res = [data];
        }
      }
      return res;
    }
  }

  async getFloor_5(cache = true, opt) {
    const { lng = 'en' } = opt;
    if (cache) {
      return this.app.readFromCache(`home/floor_5_${lng}.json`, opt);
    } else {
      return this.floor.getData(floors.floor_5);
    }
  }

  async getFloor_6_l(cache = true, opt) {
    const { lng = 'en' } = opt;
    if (cache) {
      return this.app.readFromCache(`home/floor_6_l_${lng}.json`, opt);
    } else {
      return this.floor.getData(floors.floor_6.left);
    }
  }

  async getFloor_6_r(cache = true, opt) {
    const { lng = 'en' } = opt;
    if (cache) {
      return this.app.readFromCache(`home/floor_6_r_${lng}.json`, opt);
    } else {
      return this.floor.getData(floors.floor_6.right);
    }
  }

  async getFloor_7_l(cache = true, opt) {
    const { lng = 'en' } = opt;
    if (cache) {
      return this.app.readFromCache(`home/floor_7_l_${lng}.json`, opt);
    } else {
      return this.floor.getData(floors.floor_7.left);
    }
  }

  async getFloor_7_r(cache = true, opt) {
    const { lng = 'en' } = opt;
    if (cache) {
      return this.app.readFromCache(`home/floor_7_r_${lng}.json`, opt);
    } else {
      return this.floor.getData(floors.floor_7.right);
    }
  }

  async getFloor_8(cache = true, opt) {
    const { lng = 'en' } = opt;
    if (cache) {
      return this.app.readFromCache(`home/floor_8_${lng}.json`, opt);
    } else {
      return this.floor.getData(floors.floor_8);
    }
  }

  async getFloor_9(cache = true, opt) {
    const { lng = 'en' } = opt;
    if (cache) {
      return this.app.readFromCache(`home/floor_9_${lng}.json`, opt);
    } else {
      return this.floor.getData(floors.floor_9);
    }
  }

  async getFloor_gw(cache = true, opt) {
    const { lng = 'en' } = opt;
    if (cache) {
      return this.app.readFromCache(`home/floor_global_warehouse_${lng}.json`, opt);
    } else {
      const data = floors.floor_global_warehouse()
      const list = []
      const promiseAll = []
      for (let index = 0; index < data.length; index++) {
        promiseAll.push(this.floor.getData(data[index]))
      }
      await Promise.all(promiseAll).then(values => {
        for (let i = 0; i < values.length; i++) {
          const [err_list, banner_list = []] = values[i]
          list.push({
            title: data[i].title,
            list: banner_list,
          })
        }
      })
      return [null, list]
    }
  }

  // 仓库列表
  async getWarehouseList(cache = true, opt) {
    const { lng = 'en',  } = opt;
    if (cache) {
      // 读取缓存
      return this.app.readFromCache(`home/warehouse_${lng}.json`, opt);
    } else {
      // 即时拉取
      /* const [err, data] = await this.app.$axios.post('warehouseBuildWeb/management/getCountryByAreaId'); */
      const [err, data = {}] = await this.app.$ajax({
        method: 'post',
        url: 'warehouseBuildWeb/management/getCountryByAreaId',
        headers: {
          language: lng
        }
      })
      // 仓库的翻译用到两个接口
      let _data = data.data;
      const [err_trans, data_trans] =  await utils.getTransWarehouse(lng);
      if(!err_trans){
        _data = utils.transWarehouse(_data, ((data_trans[1] || {}).result) || [])
      }
      return err ? [err] : [null, _data];
    }
  }
  // 合作伙伴列表
  async getPlatformList(cache = false, opt) {
    const { lng = 'en',  } = opt;
    if (cache) {
      // 读取缓存
      return this.app.readFromCache(`home/platform_${lng}.json`, opt);
    } else {
      // 即时拉取
      const [err, data = {}] = await this.app.$ajax({
        method: 'post',
        url: 'cj/partner/getRecommendPlatformList',
        headers: {
          language: lng
        }
      })
      // 
      let _data = data.result || [];
      // ctx.app.writeToCache(`home/platform_${lng}.json`, { _data });
      return err ? [err] : [null, _data];
    }
  }
  // 是否取缓存OutBannerList
  async getOutBannerListCache(cache = false, opt) {
    const { lng = 'en' } = opt
    if(cache) return this.app.readFromCache(`home/outBannerList_${lng}.json`, opt)
    
    const [err, data] = await this.getOutBannerList({ 
      data: {
        pageNum: 1,
        pageSize: 4,
        platformType: 1, //平台类型(1.web端平台,2.app端平台)
      },
      headers: {
        language: lng
      }
    })
    const _data = data ? data : []
    return err ? [err] : [null, _data]
  }
  // 选品上架活动列表
  async getWebHomeBannerInfo(opt = {}) {
    const { headers = {}, lng } = opt;
    // 即时拉取
    const [err, data] = await this.app.$ajax({
      method: 'post',
      url: 'cj/banner/getWebHomeBannerInfo',
      data: opt.data,
      headers: { ...headers },
    })
    return err ? [err] : utils.statusCode200(data);
  }
  // 选品往期已下架活动列表
  async getOutBannerList(opt = {}) {
    const { headers = {}, lng } = opt;
    // 即时拉取
    const [err, data] = await this.app.$ajax({
      method: 'post',
      url: 'cj/banner/getOutBannerList',
      data: opt.data,
      headers: { ...headers },
    })
    return err ? [err] : utils.statusCode200(data);
  }
}
