import request from '../../utils/request';
import {
  BannerList,
  SearchList,
  CategoriesTree,
  CategoriesList,
  HomePageInfo,
  RecommendList,
  GetCountryArr,
} from './homePage.d';

export default {
  // 获取banner列表
  getBannerList(data: BannerList.Request) {
    return request.get<BannerList.Response>(
      `product-api/globalWarehouse/getBannerList/${data.warehouse}`,
    );
  },
  // 搜索列表
  searchGoods(data: SearchList.Request) {
    return request.post<SearchList.Response>(
      '/original-service-new/elastic-api/product/v0.2/search',
      data,
    );
  },
  // 获取类目树
  getCategoriesTree(data: CategoriesTree.Request) {
    return request.get<CategoriesTree.Response>(
      '/original-service/app/product/categorylist',
      { params: data },
    );
  },
  // 热门分类列表
  getHostList(data: CategoriesList.Request) {
    return request.get<CategoriesList.Response>(
      `product-api/globalWarehouse/queryPoplarFirstCategory/${data.warehouse}`,
    );
  },
  // 查询推荐商品列表
  getRecommendList(data: RecommendList.Request) {
    return request.get<RecommendList.Response>(
      `product-api/globalWarehouse/queryRecommendProducts/${data.warehouse}`,
    );
  },
  // 查询配置信息
  getHomePageInfo(data: HomePageInfo.Request) {
    return request.get<HomePageInfo.Response>(
      `product-api/globalWarehouse/getPageInfo/${data.warehouse}`,
    );
  },
  // 获取下拉仓库的列表 国家标志 地区 id
  getCountryList() {
    return request.post<GetCountryArr.Response>(
      '/original-service-new/warehouseBuildWeb/management/getCountryByAreaId',
    );
  },
};
