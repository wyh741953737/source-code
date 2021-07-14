import { Paging, PagingRequest } from './common.d';

interface list {
  /**
   * 出库称重包裹id
   */
  id: number;

  /**
   * 包裹编号
   */
  packageNumber: string;

  /**
   * 袋数
   */
  bagsQuantity: number;

  /**
   * 包裹数量
   */
  packageQuantity: number;

  /**
   * 净重(KG)
   */
  netWeight: number;

  /**
   * 毛重(KG)
   */
  grossWeight: number;

  /**
   * 仓库id
   */
  storageId: string;

  /**
   * 仓库名称
   */
  storageName: string;
}
interface ResponseData {
  /**
   * 揽件出库记录表
   */
  id: number;

  /**
   * 揽件出库编号
   */
  receiveNumber: string;

  /**
   * 仓库id
   */
  storageId: string;

  /**
   * 仓库名称
   */
  storageName: string;

  /**
   * 物流渠道
   */
  logisticsChannel: string;

  /**
   * 物流名字
   */
  logisticsCompany: string;

  /**
   * 袋数
   */
  bagsQuantity: number;

  /**
   * 包裹数
   */
  packangQuantity: number;

  /**
   * 净重(KG)
   */
  netWeight: number;

  /**
   * 毛重(KG)
   */
  grossWeight: number;

  /**
   * 包裹列表
   */
  packageResultDTOList: Array<list>;
}
//获取包裹打印列表
export declare namespace GetPackageInfo {
  export type Request = {
    /**
     * 包裹编号
     */
    packageNumber: string;

    /**
     * 物流名字
     */
    logisticsCompany: string;

    /**
     * 揽收记录ID
     */
    receiveRecordId: string;

    /**
     * 仓库ID
     */
    storageId: string;

    /**物流账号 */
    companyAccount: string;

    // 物流公司ID
    companyId: string;
  };

  export type Response = ResponseData;
}

// 包裹删除

export declare namespace DeletePackage {
  export type Request = {
    /**
     * 包裹编号
     */
    weighingPackageId: number;

    /**
     * 揽收记录ID
     */
    receiveRecordId: number;
  };
  export type Response = ResponseData;
}

// 揽收打印
export declare namespace PrintTook {
  export type Request = {
    ids: Array<number>;
  };

  export type Response = string;
}
