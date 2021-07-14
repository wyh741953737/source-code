/**
 * 楼层请求
 */
const { statusCode200, NODE_ENV } = require('./utils');


const floors = {
  floor_1: {
    U: 'cj/superDeal/product/getTop5UnsoldProduct',
    P: {},
    title: 'Super Deal',
  },
  floor_2: {
    U: 'cj/homePage/selectNewProductList',
    P: { timeFlag: 'Dropshipping', pageSize: 6, },
    title: 'Trending Products',
  },
  floor_3: {
    U: 'cj/homePage/selectNewProductList',
    P: { timeFlag: 'month', pageSize: 6, },
    title: 'New Products',
  },
  floor_4: {
    U: 'cj/homePage/getHotCategory',
    P: { count: 4, productsCount: 1, },
    title: 'Hot Selling Categories',
    map: arr => {
      let _arr = Array.isArray(arr) ? arr : [];
      // [{ name: '', img: '', param: '' }]
      return _arr.map((item, idx) => {
        let img = '';
        if (Array.isArray(item.products) && item.products[0]) {
          img = item.products[0].bigImg;
        }
        return {
          name: item.categoryNameVal,
          img,
          param: `category${idx + 1}`,
          id: item.categoryId,
        }
      })
    },
  },
  floor_5: {
    U: 'cj/homePage/selectNewProductList',
    P: { timeFlag: 'listed', pageSize: 6, },
    title: 'Listable Products',
  },
  floor_6: {
    left: {
      U: 'cj/homePage/selectNewProductList',
      P: { timeFlag: 'USAStorage', pageSize: 4, },
      title: 'US Warehouse',
    },
    right: {
      U: 'cj/homePage/selectNewProductList',
      P: { timeFlag: 'th', pageSize: 4, },
      title: 'Thailand Warehouse',
    },
  },
  floor_7: {
    left: {
      U: 'cj/homePage/selectNewProductList',
      P: { timeFlag: 'video', pageSize: 6, },
      title: 'Videos',
    },
    right: {
      U: 'cj/homePage/selectNewProductList',
      P: { timeFlag: 'source', pageSize: 4, },
      title: 'Sourcing',
    },
  },
  floor_8: {
    U: 'cj/homePage/selectNewProductList',
    P: { timeFlag: 'POD', pageSize: 6, },
    title: 'Print on Demand',
  },
  floor_9: {
    U: 'product-api/cjProductInfo/home/recommend/queryPage',
    P: { page: 1, size: 24, language: 'en'},
    title: 'Recommended Products',
  },
  floor_global_warehouse: function() {
    //USAStorage : 美仓, th : 泰国仓, CNStorage : 中国仓, DEStorage : 德国仓, IDStorage : 印尼仓, AUStorage : 澳大利亚仓, FRStorage : 法国仓, GBStorage: 英国仓 
    // title需要和sessionStorage-warehouse_lng_里的en对应，用于六国翻译
    const pageSize = 3
    return [{
      U: 'cj/homePage/selectNewProductList',
      P: { timeFlag: 'USAStorage', pageSize, },
      h:"us",
      title: 'US Warehouse',
    },{
      U: 'cj/homePage/selectNewProductList',
      P: { timeFlag: 'DEStorage', pageSize, },
      h:"de",
      title: 'Germany Warehouse',
    },{
      U: 'cj/homePage/selectNewProductList',
      P: { timeFlag: 'CNStorage', pageSize, },
      // title: 'China Warehouses',
      h:"cz",
      title: 'Czechia Warehouse'
    },{
      U: 'cj/homePage/selectNewProductList',
      P: { timeFlag: 'th', pageSize, },
      h:"th",
      title: 'Thailand Warehouse',
    },{
      U: 'cj/homePage/selectNewProductList',
      P: { timeFlag: 'IDStorage', pageSize, },
      // title: 'Indonesia Warehouse',
      h:"my",
      title: 'Malaysia Warehouse',
    },{
      U: 'cj/homePage/selectNewProductList',
      P: { timeFlag: 'AUStorage', pageSize, },
      h:"au",
      title: 'Australia Warehouse',
    },{
      U: 'cj/homePage/selectNewProductList',
      P: { timeFlag: 'FRStorage', pageSize, },
      h:"fr",
      title: 'France Warehouse',
    },{
      U: 'cj/homePage/selectNewProductList',
      P: { timeFlag: 'GBStorage', pageSize, },
      h:"gb",
      title: 'Britain Warehouse',
    }]
  },
};

function Floor(opt) {
  const {
    $axios,
    $ajax,
    writeToLog = () => {},
  } = opt;
  // params-其它请求参数，主要用于配置headers
  this.getData = function (floor, params = {}) {
    return new Promise(resolve => {
      const tmp = floor;
      if (tmp) {
        /* $axios.post(tmp.U, tmp.P).then(([err, data]) => {
          err ? resolve([err]) : resolve(statusCode200(data));
        }); */
        $ajax({
          method: 'post',
          url: tmp.U,
          data: tmp.P,
          headers: {
            language: params.lng || '',
          }
        }).then(([err, data]) => {
          err ? resolve([err]) : resolve(statusCode200(data));
        });
      } else {
        const log = `${floor} 没找到`;
        resolve([log]);
        writeToLog('common-home.js.log', log);
      }
    });
  };
};

Floor.floors = floors;

module.exports = {
  Floor,
};
