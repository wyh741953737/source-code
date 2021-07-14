export declare namespace GetProductDetail {
  export interface Request {
    /**
     * 商品id
     */
    productId: string;
  }
  export type Response = {
    /**商品id */
    id: string;

    /**展示图片 ,一张 */
    bigImage: string;

    /**商品类目 */
    category: string;

    /**描述 */
    description: string;

    /**报关名称 */
    entryName: string;

    /**报关英文名 */
    entryNameEn: string;

    /**默认图片 */
    image: Array<string>;

    /**商品材料 */
    materialList: Array<string>;

    /**商品名称 */
    name: string;

    /**商品英文名称 */
    nameEn: string;

    /**商品包装 */
    packingList: Array<string>;

    /**商品属性 */
    propertyList: Array<string>;

    /**商品sku */
    sku: string;

    /**供应商名称 */
    supplierName: string;

    /**变体属性键 */
    variantKey: Array<string>;

    /**供应商链接/采购链接 */
    supplierLink: Array<{
      name: string;
      star: number;
      remark: string;
      price: string;
    }>;

    /**0-正常商品 1-服务商品 3-包装商品 4-供应商商品 5-供应商自发货商品 */
    productType: string;

    /**对手链接 */
    rivalLink: Array<{
      name: string;
      price: string;
      videoUrl: string;
    }>;

    /**视频url */
    videoUrl: string;

    /**属性1 */
    property1: {
      id: number;
      name: string;
      nameEn: string;
    };

    /**属性2 */
    property2: {
      id: number;
      name: string;
      nameEn: string;
    };

    /**属性3 */
    property3: {
      id: number;
      name: string;
      nameEn: string;
    };

    /**变体集合 */
    variantList: Array<{
      id: string;
      costPrice: string;
      entryValue: number;
      image: string;
      packWeight: number;
      sellPrice: string;
      sku: string;
      skuAlisa: Array<string>;
      unit: string;
      weight: number;
      num: number;
      length: number;
      width: number;
      height: number;
      status: number;
      value1: string;
      value2: string;
      value3: string;
    }>;
  };
}
