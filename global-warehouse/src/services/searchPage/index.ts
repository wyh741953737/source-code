import request from '../../utils/request';
import { SearchList } from '@/services/homePage/homePage.d';

interface SearchParams {
  page: number;
  // 当前条数
  size: number;
  // 关键词
  keyWord?: string;
  // 分类id
  categoryId?: string;
  // 仓库国家地区短码
  countryCode?: string;
  // 商品类型 4-供应商商品  10-视频商品
  productType?: number;
  // 售卖价格起始值
  startSellPrice?: number;
  // 售卖价格结束值
  endSellPrice?: number;
  // 0-不包邮 1-包邮
  addMarkStatus?: number;
  sortByParam?: {
    // 0-最匹配 1-刊登  2-价格 3-最新的
    feildType?: number;
    // 0-降序 1-升序
    isAsc: string;
  };
}

interface WarehouseInfoParam {
  pid: string;
  customerId?: string;
}

// 商品库存

export interface ProductInventoryItem {
  areaEn: string; // 仓库的英文名称
  areaId: string; // 仓库所在地区的id
  countryCode: string; // 国家标志
  num: number; // 库存数量
}
export interface ProductInventory {
  data: Array<ProductInventoryItem>;
  message: string;
  success: boolean;
}

export interface QueeueResponse {
  result: Object;
  message: string;
  statusCode: string;
}

export default {
  // 获取消息数量
  getMessageCount(data: { isread: number }) {
    return request.post<any>(
      '/original-service/app/notification/selectIsNotRead',
      data,
    );
  },
  // 点击Add To Queue刊登
  addToQueueRequest(data: Array<string>) {
    return request.post<QueeueResponse>(
      '/original-service/cj/listedproduct/add',
      data,
    );
  },
  // 鼠标悬浮在卡片上获取仓库以及数量
  getWarehouseInfo(data: WarehouseInfoParam) {
    return request.post<Array<ProductInventoryItem>>(
      '/original-service-new/storehousecj/areaInventory/getAreaInventoryInfo',
      data,
    );
  },
  // 收藏
  collectRequest(data: { productId: string }) {
    return request.post<any>(
      '/original-service/cj/homePage/shouCangShnagPin',
      data,
    );
  },
};
