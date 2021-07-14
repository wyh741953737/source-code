import { Paging } from './common.d';
// 查询列表
export declare namespace GetList {
  // ("1", "签收"),
  // ("2", "分标"),
  // ("3", "质检"),
  // ("4", "称重入库"),
  // ("5", "上架"),
  // ("6", "拣货"),
  // ("7", "分拣"),
  // ("8", "验单"),
  // ("9", "打包"),
  // ("10", "称重出库");
  export type Request = {
    /**仓库id */
    storeId?: string;

    /**组 */
    group?: string;
  };
  interface receiveResult {
    id: number;
    /**类型1-分类,2-sku	 */
    type: number;

    /**分类或sku ID */
    categorySku: string;

    /** 类目或sku ID名称 */
    categorySkuName: string;

    /**包裹数量规则 */
    packageNum: string;

    /**sku数量规则 */
    skuNum: string;

    /**变体总数(个)规则 */
    variantNum: string;

    /**对应采购订单数量规则 */
    caigouOrderNum: string;

    /** 状态(0:启用；1:已删除) */
    status: number;
  }
  interface distributeResult {
    id: number;
    /**类型 1-分类,2-sku,3-通用 */
    type: number;

    /**分类或sku ID */
    categorySku: string;

    /**类目或sku ID名称 */
    categorySkuName: string;

    /**扫描包裹数量 */
    packageCount?: string;

    /**sku分标商品数量 */
    skuNum: string;

    /**sku变体数量规则 */
    skuVariantNum: string;

    /**到货数量规则 */
    arrivalGoodsNum: string;

    /**合格数量规则 */
    qualifiedNum: string;

    /**次品数量规则 */
    ungradedProductsNum: string;

    /**少货数量规则 */
    lessGoodsNum: string;

    /**多货数量规则 */
    multipleGoodsNum: string;

    /**状态(0:启用；1:已删除) */
    status: number;
  }
  interface inspectionResult {
    id: number;
    /**类型 1-分类,2-sku,3-通用 */
    type: number;
    /**分类或sku */
    categorySku: string;

    /**类目或sku */

    categorySkuName: string;

    /**领批次数量规则 */

    collarBatchCount: string;

    /**商品总数量规则 */

    productAllCount: string;

    /**sku总数量规则 */

    skuAllCount: string;

    /**sku变体数量规则 */

    skuStanCount: string;

    /**到货数量 */

    qualifiedNum: string;

    /**次品数量规则 */

    ungradedProductsNum: string;

    /**少货数量规则 */

    lessGoodsNum: string;

    /**多货数量规则 */

    multipleGoodsNum: string;

    /**状态(0:启用；1:已删除) */
    status: number;
  }
  interface weighInResult {
    id: number;
    /**类型 1-分类,2-sku,3-通用 */
    type: number;

    /**分类或sku */
    categorySku: string;

    /**类目或sku */

    categorySkuName: string;

    /**批次号规则 */

    batchNumber: string;

    /**称重次数规则 */

    weighTotalCount: string;

    /**修改重量次数规则 */

    modifyWeightCount: string;

    /**修改体积次数规则 */

    modifyVolumeCount: string;

    /**称重数量规则 */

    weighNum: string;

    /**合格数量 */

    qualifiedNum: string;

    /**次品数量规则 */

    ungradedProductsNum: string;

    /**少货数量规则 */

    lessGoodsNum: string;

    /**多货数量规则 */

    multipleGoodsNum: string;

    /**状态(0:启用；1:已删除) */
    status: number;
  }
  interface weighOutResult {
    id: number;
    /**类型 1-分类,2-sku,3-通用 */
    type: number;

    /**分类或sku ID */
    categorySku: string;

    /**类目或sku ID名称 */
    categorySkuName: string;

    /**包裹总数量规则 */
    packingTotalNum: string;

    /**包裹净重(千克)规则 */
    packingNetWeight: string;

    /**包裹毛重(立方米)规则 */
    packingRoughWeight: string;

    /**状态(0:启用；1:已删除) */
    status: number;
  }
  interface shelvesResult {
    id: number;
    /**类型 1-分类,2-sku,3-通用 */
    type: number;

    /**分类或sku */
    categorySku: string;

    /**类目或sku */
    categorySkuName: string;

    /**sku变体数量 */
    skuStanCount: string;

    /**商品数量 */
    productCount: string;

    /**上架重量规则 */
    weighNum: string;

    /**上架体积规则 */
    volumeNum: string;

    /**状态(0:启用；1:已删除) */
    status: number;
  }
  interface pickResult {
    id: number;
    /**类型 1-分类,2-sku,3-通用 */
    type: number;

    /**分类或sku */
    categorySku: string;

    /**类目或sku */
    categorySkuName: string;

    /**单品商品数规则 */
    singleProductNum: string;

    /**单品批次数规则 */
    singleBatchNum: string;

    /**单品库位数规则 */
    singleLocationNum: string;

    /**单品sku数规则 */
    singleSkuNum: string;

    /**单品sku变体数规则 */
    singleStanNum: string;

    /**多品商品数规则 */
    multiProductNum: string;

    /**多品批次数规则 */
    multiBatchNum: string;

    /**多品库位数规则 */
    multiLocationNum: string;

    /**多品sku数规则 */
    multiSkuNum: string;

    /**多品sku变体数规则 */
    multiStanNum: string;

    /** 总重量(g)规则 */
    allWeight: string;

    /**总体积(cm)规则 */
    allVolume: string;

    /**验单错误数量 */
    checklistUnsuccessfulNum: string;

    /**总距离(米) */
    allDistance: string;

    /**状态(0:启用；1:已删除) */
    status: number;
  }
  interface sortingResult {
    id: number;
    /**类型 1-分类,2-sku,3-通用 */
    type: number;

    /**分类或sku*/
    categorySku: string;

    /**类目或sku*/

    categorySkuName: string;

    /**单品批次商品数量（个）*/

    goodsCount: string;

    /**批次数量（个）*/
    batchCount: string;

    /**单品变体sku数量（个）*/
    singleSkuStanCount: string;

    /**多品变体sku数量（个）*/
    multiSkuStanCount: string;

    /**包装多品批次商品数量（个）*/
    packageProductCount: string;

    /**验单错误数量*/
    checklistUnsuccessfulNum: string;

    /**状态(0:启用；1:已删除) */
    status: number;
  }
  interface checkBillResult {
    id: number;
    /**类型 1-分类,2-sku,3-通用 */
    type: number;

    /**分类或sku */
    categorySku: string;

    /**类目或sku */
    categorySkuName: string;

    /**订单数量（个） */
    orderCount: string;

    /**商品数量（个） */
    productCount: string;

    /**包装商品数量（个） */
    packProductCount: string;

    /**验单错误数量 */
    checklistUnsuccessfulNum: string;

    /**状态(0:启用；1:已删除) */
    status: number;
  }
  interface packageResult {
    id: number;
    /**类型 1-分类,2-sku,3-通用 */
    type: number;

    /**分类或sku */
    categorySku: string;

    /**类目或sku */
    categorySkuName: string;

    /**打包面单数 */
    sheetCount: string;

    /**商品数量（个） */
    productCount: string;

    /**体积（平方米） */
    volumeCount: string;

    /**重量 */
    weightNum: string;

    /**状态(0:启用；1:已删除) */
    status: number;
  }
  interface responseData {
    /**签收 */
    receiveResult?: Array<receiveResult>;

    /**分标 */
    distributeResult?: Array<distributeResult>;

    /**质检 */
    inspectionResult?: Array<inspectionResult>;

    /**入库称重 */
    weighInResult?: Array<weighInResult>;

    /**出库称重 */
    weighOutResult?: Array<weighOutResult>;

    /**上架 */
    shelvesResult?: Array<shelvesResult>;

    /**拣货 */
    pickResult?: Array<pickResult>;

    /**分拣 */
    sortingResult?: Array<sortingResult>;

    /**验单 */
    checkBillResult?: Array<checkBillResult>;

    /**打包 */
    packageResult?: Array<packageResult>;

    group?: number;
  }
  export type Response = responseData;
}

// 绩效规则新增编辑

export declare namespace EditRule {
  interface checkBillDTO {
    id?: number;

    /**订单数量（个） */
    orderCount?: string;

    /**商品数量（个） */
    productCount?: string;

    /**包装商品数量（个） */
    packProductCount?: string;

    /**验单错误数量 */
    checklistUnsuccessfulNum?: string;
  }
  interface distributeDTO {
    id?: number;

    /**扫描包裹数量 */
    packageCount?: string;
    /**sku分标商品数量 */
    skuNum?: string;

    /**sku变体数量规则 */
    skuVariantNum?: string;

    /**到货数量规则 */
    arrivalGoodsNum?: string;

    /**合格数量规则 */
    qualifiedNum?: string;

    /**次品数量规则 */
    ungradedProductsNum?: string;

    /**少货数量规则 */
    lessGoodsNum?: string;

    /**多货数量规则 */
    multipleGoodsNum?: string;
  }
  interface inspectionDTO {
    id?: number;

    /**领批次数量规则 */
    collarBatchCount?: string;

    /**商品总数量规则 */
    productAllCount?: string;

    /**sku总数量规则 */
    skuAllCount?: string;

    /**sku变体数量规则 */
    skuStanCount?: string;

    /**到货数量 */
    qualifiedNum?: string;

    /**次品数量规则 */
    ungradedProductsNum?: string;

    /**少货数量规则 */
    lessGoodsNum?: string;

    /**多货数量规则 */
    multipleGoodsNum?: string;
  }
  interface packageDTO {
    id?: number;

    /**打包面单数 */
    sheetCount?: string;

    /**商品数量（个） */
    productCount?: string;

    /**体积（平方米） */
    volumeCount?: string;

    /**重量 */
    weightNum?: string;
  }
  interface pickDTO {
    id?: number;
    /**单品商品数规则 */
    singleProductNum?: string;

    /**单品批次数规则 */

    singleBatchNum?: string;

    /**单品库位数规则 */

    singleLocationNum?: string;

    /**单品sku数规则 */

    singleSkuNum?: string;

    /**单品sku变体数规则 */

    singleStanNum?: string;

    /**多品商品数规则 */

    multiProductNum?: string;

    /**多品批次数规则 */

    multiBatchNum?: string;

    /**多品库位数规则 */

    multiLocationNum?: string;

    /**多品sku数规则 */

    multiSkuNum?: string;

    /**多品sku变体数规则 */

    multiStanNum?: string;

    /**总重量(g)规则	 */

    allWeight?: string;

    /**总体积(cm)规则 */
    allVolume?: string;

    /**验单不成功数 */

    checklistUnsuccessfulNum?: string;

    /**总距离 (米)*/

    allDistance?: string;
  }
  interface receiveDTO {
    id?: number;

    /**包裹数量规则 */
    packageNum?: string;

    /**sku数量规则 */
    skuNum?: string;

    /**变体总数(个)规则 */
    variantNum?: string;

    /**对应采购订单数量规则 */
    caigouOrderNum?: string;
  }
  interface shelvesDTO {
    id?: number;

    /**sku变体数量 */
    skuStanCount?: string;

    /**上架重量规则 */
    weighNum?: string;

    /**上架体积规则 */
    volumeNum?: string;
  }
  interface sortingDTO {
    id?: number;

    /**单品批次商品数量（个） */
    goodsCount?: string;

    /**批次数量（个） */
    batchCount?: string;

    /**单品变体sku数量（个） */
    singleSkuStanCount?: string;

    /**多品变体sku数量（个） */
    multiSkuStanCount?: string;

    /**包装多品批次商品数量（个） */
    packageProductCount?: string;

    /**验单不成功数 */
    checklistUnsuccessfulNum?: string;
  }
  interface weighInDTO {
    id?: number;

    /**批次号规则 */
    batchNumber?: string;

    /**称重次数规则 */
    weighTotalCount?: string;

    /**修改重量次数规则 */
    modifyWeightCount?: string;

    /**修改体积次数规则 */
    modifyVolumeCount?: string;

    /**称重数量规则 */
    weighNum?: string;

    /**合格数量 */
    qualifiedNum?: string;

    /**次品数量规则 */
    ungradedProductsNum?: string;

    /**少货数量规则 */
    lessGoodsNum?: string;

    /**多货数量规则 */
    multipleGoodsNum?: string;
  }
  interface weighOutDTO {
    id?: number;

    /**包裹总数量规则 */
    packingTotalNum: string;

    /**包裹净重 */
    packingNetWeight: string;

    /**包裹毛重 */
    packingRoughWeight: string;
  }

  export type Request = {
    /**验单 */
    checkBillDTO?: checkBillDTO;

    /**分标 */
    distributeDTO?: distributeDTO;

    /**质检 */
    inspectionDTO?: inspectionDTO;

    /**打包 */
    packageDTO?: packageDTO;

    /**拣货 */
    pickDTO?: pickDTO;

    /**签收 */
    receiveDTO?: receiveDTO;

    /**上架 */
    shelvesDTO?: shelvesDTO;

    /**分拣 */
    sortingDTO?: sortingDTO;

    /**入库称重 */
    weighInDTO?: weighInDTO;

    /**出库称重 */
    weighOutDTO?: weighOutDTO;

    /**组 */
    group?: string;
  };

  export type Response = boolean;
}
