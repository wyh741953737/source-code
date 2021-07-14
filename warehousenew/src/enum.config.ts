import Enum, { EnumItem } from '@/utils/enum';
import { NumberList } from './utils';

/**
 * 入库类型(1：采购入库，2：调货入库，3：客户退回入库，4：货代退回入库，5：服务商品入库，6：供应商商品入库)
 */
interface _WAREHOUSWARRANTETYPE extends Enum {
  purchase: EnumItem;
  transfer: EnumItem;
  customerSendBack: EnumItem;
  forwarderSendBack: EnumItem;
  serviceCommodity: EnumItem;
  providerCommodity: EnumItem;
}
export const WAREHOUSWARRANTETYPE = <_WAREHOUSWARRANTETYPE>new Enum([
  ['purchase', { key: 1, value: '采购入库', disableAdd: true }],
  ['transfer', { key: 2, value: '调货入库', disableAdd: true }],
  ['customerSendBack', { key: 3, value: '客户退回入库', disableAdd: true }],
  ['forwarderSendBack', { key: 4, value: '货代退回入库', disableAdd: false }],
  ['serviceCommodity', { key: 5, value: '服务商品入库', disableAdd: true }],
  ['providerCommodity', { key: 6, value: '供应商包裹入库', disableAdd: true }],

  ['manuallyCreate', { key: 7, value: '手动创建', disableAdd: false }],
]);

/**
 * 入库状态
 */
interface _WAREHOUSESTATUS extends Enum {
  onRoad: EnumItem;
  partIn: EnumItem;
  finished: EnumItem;
  close: EnumItem;
}
export const WAREHOUSESTATUS = <_WAREHOUSESTATUS>new Enum([
  ['onRoad', { key: 0, value: '在途', color: '#FFF0F5' }],
  ['partIn', { key: 1, value: '部分入库', color: '#3078ED' }],
  ['finished', { key: 2, value: '入库完成', color: '#00B850' }],
  ['close', { key: 3, value: '已关闭', color: '#FD0025' }],
]);

/**
 * 库区类型
 */
interface _WAREHOUSETYPE extends Enum {
  orderPickArea: EnumItem;
  TSArea: EnumItem;
  scrappedPartArea: EnumItem;
}
export const WAREHOUSETYPE = <_WAREHOUSETYPE>new Enum([
  ['orderPickArea', { key: 1, value: '拣货区' }],
  ['TSArea', { key: 2, value: '备货区' }],
  ['scrappedPartArea', { key: 3, value: '残品区' }],
]);

/**
 * 库区搜索类型
 */
interface _SELECTOPTION extends Enum {
  warehouseNumber: EnumItem;
  warehouseCommodityType: EnumItem;
}
export const SELECTOPTION = <_SELECTOPTION>new Enum([
  ['warehouseNumber', { key: 1, value: '库区编号' }],
  ['warehouseCommodityType', { key: 2, value: '库区品类' }],
]);

/**
 * 共用是否
 */
interface _COMMONBOOLEAN extends Enum {
  true: EnumItem;
  false: EnumItem;
}
export const COMMONBOOLEAN = <_COMMONBOOLEAN>new Enum([
  ['false', { key: 0, value: '否', value1: '禁用', value2: '无货' }],
  ['true', { key: 1, value: '是', value1: '启用', value2: '有货' }],
]);
/**
 * 库位类型
 */
interface _POSITIONTYPE extends Enum {
  clapboard: EnumItem;
  floor: EnumItem;
}
export const POSITIONTYPE = <_POSITIONTYPE>new Enum([
  ['clapboard', { key: 1, value: '隔板库位' }],
  ['floor', { key: 2, value: '地堆' }],
]);
/**
 * 库位用途
 */
export const POSITIONPURPOSE = new Enum([
  ['', { key: 1, value: '拣货库位' }],
  ['', { key: 2, value: '存储库位' }],
  ['', { key: 3, value: '拣选库位' }],
  ['', { key: 4, value: '收货暂存库位' }],
  ['', { key: 5, value: '发货暂存库位' }],
  ['', { key: 6, value: '中转库位' }],
  ['', { key: 7, value: '异常处理库位' }],
  ['', { key: 8, value: '冻结库位' }],
  ['', { key: 9, value: '差异库位' }],
  ['', { key: 10, value: '集货库位' }],
  ['', { key: 11, value: '一级集货区库位' }],
]);
/**
 * 库位货品
 */
interface _POSITIONQUAILTY extends Enum {
  oneForOne: EnumItem;
  oneForMany: EnumItem;
}
export const POSITIONQUAILTY = <_POSITIONQUAILTY>new Enum([
  ['oneForOne', { key: 1, value: '一位一品' }],
  ['oneForMany', { key: 2, value: '一位多品' }],
]);
/**
 * 库区枚举
 */
export const POSITIONNUMBER = new Enum([
  ['', { key: 'A区', value: 'A区' }],
  ['', { key: 'B区', value: 'B区' }],
  ['', { key: 'C区', value: 'C区' }],
  ['', { key: 'D区', value: 'D区' }],
  ['', { key: 'E区', value: 'E区' }],
  ['', { key: 'F区', value: 'F区' }],
  ['', { key: 'G区', value: 'G区' }],
  ['', { key: 'H区', value: 'H区' }],
  ['', { key: 'I区', value: 'I区' }],
  ['', { key: 'J区', value: 'J区' }],
  ['', { key: 'K区', value: 'K区' }],
  ['', { key: 'L区', value: 'L区' }],
  ['', { key: 'M区', value: 'M区' }],
  ['', { key: 'N区', value: 'N区' }],
  ['', { key: 'O区', value: 'O区' }],
  ['', { key: 'P区', value: 'P区' }],
  ['', { key: 'Q区', value: 'Q区' }],
  ['', { key: 'R区', value: 'R区' }],
  ['', { key: 'S区', value: 'S区' }],
  ['', { key: 'T区', value: 'T区' }],
  ['', { key: 'U区', value: 'U区' }],
  ['', { key: 'V区', value: 'V区' }],
  ['', { key: 'W区', value: 'W区' }],
  ['', { key: 'X区', value: 'X区' }],
  ['', { key: 'Y区', value: 'Y区' }],
  ['', { key: 'Z区', value: 'Z区' }],
  ['', { key: 'SY区', value: 'SY区' }],
  ['', { key: 'ZF区', value: 'ZF区' }],
]);
/**
 * 通道枚举
 */
export const NUMBERLIST99 = new Enum(NumberList.createEnum(1, 99, 2));
/**
 * 货架枚举
 */
export const NUMBERSHELVE35 = new Enum(NumberList.createEnum(1, 35, 2));
/**
 * 货位枚举
 */
export const NUMBERGOODS75 = new Enum(NumberList.createEnum(1, 75, 2));

/**
 * 包裹签收搜索类型
 */
export const PACKAGESELECTOPTION = new Enum([
  ['', { key: 0, value: '入库编号', paramsKey: 'putStorageNumber' }],
  ['', { key: 1, value: '包裹入库序号', paramsKey: 'id' }],
  ['', { key: 2, value: '创建人', paramsKey: 'createBy' }],
  ['', { key: 3, value: '供货公司', paramsKey: 'supplier' }],
  ['', { key: 4, value: '追踪号', paramsKey: 'logisticsTrackingNumber' }],
  ['', { key: 5, value: '变体sku', paramsKey: 'sku' }],
  ['', { key: 6, value: '采购单号', paramsKey: 'orderNumber' }],
]);

/**
 * 包裹签收类型
 */
export const PACKAGETYPE = new Enum([
  ['', { key: 1, value: 'CJ采购' }],
  ['', { key: 6, value: '供应商包裹' }],
  ['', { key: 2, value: '调度' }],
  ['', { key: 3, value: '客户退货' }],
  ['', { key: 5, value: '服务商品入库' }],
  ['', { key: 4, value: '货代退回' }],
]);
/**
 * 分标管理搜索类型
 */
export const MINUTEMARKSELECTOPTION = new Enum([
  ['', { key: 1, value: '入库单号' }],
  ['', { key: 2, value: '供货公司' }],
  ['', { key: 3, value: '包裹入库序号' }],
  ['', { key: 4, value: '追踪号' }],
  ['', { key: 5, value: '变体sku' }],
  ['', { key: 6, value: '采购订单号' }],
]);
/**
 * value分标状态
 * value1质检状态
 * value2称重状态
 */
export const COMMONSTATUS = new Enum([
  ['', { key: 1, value: '已分标', value1: '已质检', value2: '已称重' }],
  ['', { key: 0, value: '待分标', value1: '待质检', value2: '待称重' }],
]);
/**
 * 质检管理搜索类型
 */
export const QUALITYSELECTOPTIONS = new Enum([
  ['', { key: 1, value: '批次号' }],
  ['', { key: 2, value: '入库单号' }],
  ['', { key: 3, value: '变体sku' }],
  ['', { key: 4, value: '质检单号' }],
  ['', { key: 5, value: '采购订单号' }],
]);

/**
 * 称重管理搜索类型
 */
export const WEIGHTSELECTOPTIONS = new Enum([
  ['', { key: 1, value: '批次号' }],
  ['', { key: 2, value: '入库单号' }],
  ['', { key: 3, value: '变体sku' }],
  ['', { key: 4, value: '称重单号' }],
  ['', { key: 5, value: '采购订单号' }],
]);

/**
 * 采购方式
 */
export const PURCHASETYPEOPTIONS = new Enum([
  ['', { key: 0, value: '非1688API' }],
  ['', { key: 1, value: '1688API' }],
  ['', { key: 2, value: '淘宝' }],
  ['', { key: 3, value: '天猫' }],
  ['', { key: 4, value: '线下' }],
]);

/**
 * 异常记录处理状态
 */
interface _EXCEPTIIONDEALSTATUS extends Enum {
  pending: EnumItem;
  finded: EnumItem;
  lost: EnumItem;
}

export const EXCEPTIIONDEALSTATUS = <_EXCEPTIIONDEALSTATUS>new Enum([
  ['pending', { key: 0, value: '待处理', value2: '待处理' }],
  ['finded', { key: 1, value: '货已找到', value2: '处理中' }],
  ['lost', { key: 2, value: '确认少件', value2: '已完成' }],
]);
export const EXCEPTIIONDEALSTATUSORDER = new Enum([
  ['', { key: 0, value: '待处理' }],
  ['', { key: 1, value: '处理中' }],
  ['', { key: 2, value: '已完成' }],
  ['', { key: 3, value: '已废弃' }],
]);
/**
 * 异常类型
 */
export const EXCEPTIONSTATUS = new Enum([
  ['', { key: 1, value: '分标少件' }],
  ['', { key: 2, value: '质检少件' }],
  ['', { key: 3, value: '称重少件' }],
  ['', { key: 4, value: '上架少件' }],
  ['', { key: 5, value: '定制商品少件' }],
  ['', { key: 6, value: '包装商品少件' }],
]);

/**
 * 入库异常搜索类型
 */
interface _EXCEPTIONWAREHOUSEOPTIONS extends Enum {
  exceptionNum: EnumItem;
  logisticsTrackingNumber: EnumItem;
  batchNumber: EnumItem;
}

export const EXCEPTIONWAREHOUSEOPTIONS = <_EXCEPTIONWAREHOUSEOPTIONS>new Enum([
  ['exceptionNum', { key: 1, value: '异常单号' }],
  ['logisticsTrackingNumber', { key: 2, value: '运单号' }],
  ['batchNumber', { key: 3, value: '批次号' }],
]);
/**
 * 单据枚举
 */
export const RECEIPTES = new Enum([
  ['', { key: 0, value: '容器管理' }],
  ['', { key: 1, value: '分标' }],
  ['', { key: 2, value: '质检' }],
  ['', { key: 3, value: '称重' }],
  ['', { key: 4, value: '上架' }],
  ['', { key: 5, value: '出库拣货' }],
  ['', { key: 6, value: '出库分拣' }],
]);
/**
 * 异常类型
 */
export const EXCEPTIONTYPE = new Enum([
  ['', { key: 1, value: '多件' }],
  ['', { key: 2, value: '少件' }],
  ['', { key: 3, value: '坏件' }],
]);
/**
 * 异常已处理状态
 */
export const EXCEPTIONPROCESSEDSTATUS = new Enum([
  ['', { key: 0, value: '采购待处理' }],
  ['', { key: 1, value: '采购处理中' }],
  ['', { key: 2, value: '采购已处理' }],
]);
/**
 * 采购异常处理方式
 */
export const EXCEPTIONPURCHASEDEALTYPE = new Enum([
  [
    '',
    {
      key: 1,
      value: '仅补发',
      form: require('@/pages/exceptionPurchase/deal').Form1,
      describe: require('@/pages/exceptionWarehouse/dealResult').Reissue,
      fetch: require('@/services/exceptionPurchase').dealReissue,
    },
  ],
  [
    '',
    {
      key: 2,
      value: '仅退款',
      form: require('@/pages/exceptionPurchase/deal').Form2,
      describe: require('@/pages/exceptionWarehouse/dealResult').Refund,
      fetch: require('@/services/exceptionPurchase').dealRefund,
    },
  ],
  [
    '',
    {
      key: 3,
      value: '退货退款',
      form: require('@/pages/exceptionPurchase/deal').Form4,
      describe: require('@/pages/exceptionWarehouse/dealResult')
        .ReturnAndRefund,
      fetch: require('@/services/exceptionPurchase').dealReturnAndRefund,
    },
  ],
  [
    '',
    {
      key: 4,
      value: '仅补发配件',
      form: require('@/pages/exceptionPurchase/deal').Form1,
      describe: require('@/pages/exceptionWarehouse/dealResult').PartsReissue,
      fetch: require('@/services/exceptionPurchase').dealPartsReissue,
    },
  ],
  [
    '',
    {
      key: 5,
      value: '退货换货',
      form: require('@/pages/exceptionPurchase/deal').Form3,
      describe: require('@/pages/exceptionWarehouse/dealResult')
        .ReturnAndChange,
      fetch: require('@/services/exceptionPurchase').dealReturnAndChange,
    },
  ],
  [
    '',
    {
      key: 6,
      value: '合格',
      form: require('@/pages/exceptionPurchase/deal').Form5,
      describe: require('@/pages/exceptionWarehouse/dealResult').Qualified,
      fetch: require('@/services/exceptionPurchase').dealQualified,
    },
  ],
  [
    '',
    {
      key: 7,
      value: '更改SKU',
      form: require('@/pages/exceptionPurchase/deal').Form6,
      describe: require('@/pages/exceptionWarehouse/dealResult').SKUChange,
      fetch: require('@/services/exceptionPurchase').dealSKUChange,
    },
  ],
  [
    '',
    {
      key: 8,
      value: '部分签收',
      form: require('@/pages/exceptionPurchase/deal').Form1,
      describe: require('@/pages/exceptionWarehouse/dealResult').SignPart,
      fetch: require('@/services/exceptionPurchase').dealSignPart,
    },
  ],
]);
/**
 * 容器类型
 */
export const CONTAINERTYPE = new Enum([
  ['', { key: 1, value: '箱子' }],
  // ['', { key: 2, value: '工位' }],
]);
/**
 * 容器状态
 */
export const CONTAINERSTATUS = new Enum([
  ['', { key: 0, value: '锁定容器' }],
  ['', { key: 1, value: '释放容器' }],
  // ['', { key: 2, value: '空闲容器' }],
]);
/**
 * 结算维度
 */
export const SETTLEMENT = new Enum([
  ['', { key: 0, value: '商品' }],
  ['', { key: 1, value: '订单' }],
]);
/**
 * 服务商品
 */
export const SERVICECOMMODITY = new Enum([
  ['', { key: 0, value: '全部', value1: '否' }],
  ['', { key: 1, value: '服务商品', value1: '是' }],
]);
/**
 * 服务商品2
 */
export const SERVICECOMMODITYFLAG = new Enum([
  ['', { key: 1, value: '否' }],
  ['', { key: 2, value: '是' }],
]);

/**
 * 统计单位
 */
export const STATISTICSUNIT = new Enum([
  ['', { key: 0, value: '件' }],
  ['', { key: 1, value: '单' }],
]);
/**
 * 移动类型
 */
export const MOVETYPE = new Enum([
  ['', { key: 1, value: '普通移动' }],
  ['', { key: 2, value: '盘点移动' }],
]);

/**
 * 移动状态
 */
interface _MOVESTATUS extends Enum {
  finish: EnumItem;
  pending: EnumItem;
  givedUp: EnumItem;
}

export const MOVESTATUS = <_MOVESTATUS>new Enum([
  ['pending', { key: 1, value: '待处理' }],
  ['finish', { key: 2, value: '移动完成' }],
  ['givedUp', { key: 3, value: '已放弃' }],
]);

/**
 * 库存类型
 */
export const STORETYPE = new Enum([
  ['', { key: 1, value: '正品', isTrans: true }],
  ['', { key: 2, value: '残品', isTrans: true }],
  // ['', { key: 3, value: '异常品' }],
  // ['', { key: 4, value: '少货' }],
]);

/**
 * 可转移的库存类型
 */
export const STORETYPETRANS = new Enum([
  ['', { key: 1, value: '正品库存' }],
  ['', { key: 2, value: '残品库存' }],
]);

/**
 * 上架状态
 */
export const PUTAWAYSTATUS = new Enum([
  ['', { key: 0, value: '已创建', color: '#CCCCCC' }],
  ['', { key: 1, value: '待上架', color: '#CCCCCC' }],
  ['', { key: 2, value: '上架中', color: '#108DE9' }],
  ['', { key: 3, value: '上架完成', color: '#00A854' }],
  ['', { key: 4, value: '异常结束', color: '#F04134' }],
]);
/**
 * 操作信息
 */
export const OPERATION = new Enum([
  ['', { key: 1, value: '新增容器' }],
  ['', { key: 2, value: '锁定容器' }],
  ['', { key: 3, value: '释放容器' }],
  ['', { key: 4, value: '停用容器' }],
  ['', { key: 5, value: '商品删除' }],
]);
/**
 * 快递公司
 */
export const LOGISTICS = new Enum([
  ['', { key: '顺丰速运', value: '顺丰速运' }],
  ['', { key: '圆通速递', value: '圆通速递' }],
  ['', { key: '中通速递', value: '中通速递' }],
  ['', { key: '申通速递', value: '申通速递' }],
  ['', { key: '韵达快递', value: '韵达快递' }],
  ['', { key: '天天快递', value: '天天快递' }],
  ['', { key: '百世快递', value: '百世快递' }],
  ['', { key: '速尔快递', value: '速尔快递' }],
  ['', { key: '邮政快递包裹', value: '邮政快递包裹' }],
  ['', { key: 'EMS', value: 'EMS' }],
  ['', { key: '京东快递', value: '京东快递' }],
  ['', { key: '优速快递', value: '优速快递' }],
  ['', { key: '德邦快递', value: '德邦快递' }],
  ['', { key: '吉通快递', value: '吉通快递' }],
]);

// 包裹类型
export const PACKGAGEDESCRIPT = new Enum([
  ['', { key: 0, value: '普通包裹' }],
  ['', { key: 1, value: '个' }],
  ['', { key: 2, value: '包' }],
  ['', { key: 3, value: '供' }],
  ['', { key: 4, value: '包' }],
]);

/**
 * 波次类型
 */
interface _WAVEPICKINGTYPE extends Enum {
  commodity: EnumItem;
  order: EnumItem;
  customer: EnumItem;
  logistics: EnumItem;
  date: EnumItem;
}

export const WAVEPICKINGTYPE = <_WAVEPICKINGTYPE>new Enum([
  ['commodity', { key: 1, value: '按商品' }],
  ['order', { key: 2, value: '按订单' }],
  ['customer', { key: 3, value: '按货主' }],
  ['logistics', { key: 4, value: '按物流' }],
  ['date', { key: 5, value: '按时间' }],
]);

/**
 * 波次状态
 */
interface _WAVEPICKINGSTATUS extends Enum {
  pending: EnumItem;
  dealing: EnumItem;
  finish: EnumItem;
  repeal: EnumItem;
}

export const WAVEPICKINGSTATUS = <_WAVEPICKINGSTATUS>new Enum([
  ['pending', { key: 1, value: '待拣货' }],
  ['dealing', { key: 2, value: '拣货中' }],
  ['finish', { key: 3, value: '已完成' }],
  ['repeal', { key: 4, value: '已撤销' }],
]);

/**
 * 商品规则
 */
interface _COMMODITYRULE extends Enum {
  single: EnumItem;
  oneToOne: EnumItem;
  sameSku: EnumItem;
  multi: EnumItem;
}

export const COMMODITYRULE = <_COMMODITYRULE>new Enum([
  ['single', { key: 1, value: '单品' }],
  ['oneToOne', { key: 2, value: '一单一品' }],
  ['multi', { key: 3, value: '多品' }],
  ['sameSku', { key: 4, value: '相同sku' }],
]);

/**
 * 订单类型
 */
interface _ORDERTYPE extends Enum {
  noChoose: EnumItem;
}

export const ORDERTYPE = <_ORDERTYPE>new Enum([
  ['', { key: 1, value: '代发单' }],
  ['', { key: 2, value: '直发单' }],
  ['', { key: 3, value: '调拨单' }],
  ['', { key: 4, value: '退供单' }],
  // ['', { key: 5, value: 'CJ领料' }],
]);
/**
 * 拣货状态
 */
export const BATCHTYPE = new Enum([
  ['', { key: '0', value: '待拣货' }],
  ['', { key: '1', value: '拣货中' }],
  ['', { key: '2', value: '已完成' }],
]);
/**
 * 拣货状态-波次详情专用
 */
export const BATCHSTUTUS = new Enum([
  ['', { key: 1, value: '待拣货' }],
  ['', { key: 2, value: '已拣货' }],
]);
/**
 * 是否领单
 */
export const LEADTYPE = new Enum([
  ['', { key: 1, value: '已领单' }],
  ['', { key: 0, value: '未领单' }],
]);

/**
 * 抵扣规则启用状态
 */
export const OFFSETRULETYPE = new Enum([
  ['', { key: 1, value: '启用', class: 'colorGreen' }],
  ['', { key: 0, value: '停用', class: 'colorRed' }],
]);

/**
 * 耗材停用状态
 */
export const MATERIALSTATUS = new Enum([
  ['', { key: 1, value: '是' }],
  ['', { key: 0, value: '否' }],
]);

/**
 * 超时出库订单的异常状态
 */
export const TIMEOUTORDERSTATUS = new Enum([
  ['', { key: 1, value: '待处理', class: 'colorNormal' }],
  ['', { key: 2, value: '可控', class: 'colorGreen' }],
  ['', { key: 3, value: '不可控', class: 'colorRed' }],
]);

/**
 * 出库单类型
 */
export const OUTBOUNDORDERTYPE = new Enum([
  ['', { key: 1, value: '客户订单代发单' }],
  ['', { key: 2, value: '客户直发单' }],
  ['', { key: 3, value: '调度任务' }],
  ['', { key: 4, value: '退供' }],
  ['', { key: 5, value: 'CJ领料' }],
]);

/**
 * 出库单状态
 */
export const OUTBOUNDORDERSTATUS = new Enum([
  ['', { key: 0, value: '待配齐' }],
  ['', { key: 1, value: '已配齐' }],
  ['', { key: 2, value: '待拣货' }],
  ['', { key: 3, value: '待分拣' }],
  ['', { key: 4, value: '待验货' }],
  ['', { key: 5, value: '待称重' }],
  ['', { key: 6, value: '已出库' }],
  ['', { key: 10, value: '待处理' }],
  ['', { key: 11, value: '待处理' }],

  ['', { key: 8, value: '异常订单' }],
  ['', { key: 9, value: '异常结束' }],
  ['', { key: 12, value: '面单过期' }],
  ['', { key: 13, value: '验单缺货' }],
]);

/**
 * 出库单状态-已配齐
 */
export const OUTBOUNDORDERSTATUSHASMATCH = new Enum([
  ['', { key: 1, value: '已配齐' }],
  ['', { key: 2, value: '待拣货' }],
  ['', { key: 3, value: '待分拣' }],
  ['', { key: 4, value: '待验货' }],
  ['', { key: 5, value: '待称重' }],
]);

/**
 * 出库单详情抵扣状态
 */
export const OUTBOUNDISDEDUCTION = new Enum([
  ['', { key: 0, value: '未抵扣', value2: '未到货' }],
  ['', { key: 1, value: '已抵扣', value2: '已到货' }],
]);
/**
 * 异常出库单类型
 */
export const EXCEPTOUTBOUNDORDERTYPE = new Enum([
  ['', { key: 1, value: '面单过期' }],
  ['', { key: 2, value: '修改订单' }],
  ['', { key: 3, value: '客户纠纷' }],
  ['', { key: 4, value: '采购缺货' }],
  ['', { key: 5, value: '验单缺货' }],
  ['', { key: 6, value: '拦截中' }],
  ['', { key: 7, value: '拦截成功' }],
  ['', { key: 8, value: '搁置订单' }],
  ['', { key: 9, value: '生成批次失败' }],
  ['', { key: 10, value: '转仓' }],
]);
/**
 * 异常结束类型
 */
export const EXCEPTENDTYPE = new Enum([
  ['', { key: 1, value: '采购缺货退款' }],
  ['', { key: 2, value: '纠纷退款' }],
  ['', { key: 3, value: '纠纷补发' }],
  ['', { key: 4, value: '商品调拨单取消' }],
  ['', { key: 5, value: '转仓' }],
]);

/**
 * 等待出库类型
 */
export const WAITOUTBOUNDTYPE = new Enum([
  ['', { key: 0, value: '销售出库' }],
  ['', { key: 1, value: '调用出库' }],
]);
/**
 * 等待出库数据状态
 */
export const WAITOUTBOUNDSTATUS = new Enum([
  ['', { key: 0, value: '待称重', color: '#CCCCCC' }],
  ['', { key: 1, value: '已出库', color: '#00A854' }],
  ['', { key: 2, value: '称重异常', color: '#F04134' }],
]);

/**
 * 称重方式
 */
export const WEIGHINGTYPE = new Enum([
  ['', { key: 0, value: '电子秤' }],
  ['', { key: 1, value: '手动输入' }],
]);

/**
 * 揽收出库打印状态
 */
export const OUTBOUNDPRINTSTATUS = new Enum([
  ['', { key: 0, value: '未打印', color: '#CCCCCC' }],
  ['', { key: 1, value: '已打印', color: '#00A854' }],
]);

/**
 * 货袋详情上网状态
 */
export const BAGNETWORKSTATUS = new Enum([
  ['', { key: 0, value: '未上网', color: '#CCCCCC' }],
  ['', { key: 1, value: '已上网', color: '#00A854' }],
]);

/**
 * 生成面单状态
 */
interface _EXPRESSSTATUS extends Enum {
  success: EnumItem;
  failed: EnumItem;
}

export const EXPRESSSTATUS = <_EXPRESSSTATUS>new Enum([
  ['success', { key: 0, value: '生成成功' }],
  ['failed', { key: 1, value: '生成失败' }],
]);
/**
 * 包裹状态
 */
export const PACKAGESTATUS = new Enum([
  ['', { key: 1, value: '待打单' }],
  ['', { key: 2, value: '待称重' }],
  ['', { key: 3, value: '待揽收' }],
  ['', { key: 4, value: '已揽收' }],
  ['', { key: 5, value: '已撤箱' }],
  ['', { key: 6, value: '已回滚' }],
]);

/**
 * 出库异常类型
 */
export const OUTBOUNDEXCEPTIONTYPE = new Enum([
  ['', { key: 1, value: '拣货少货' }],
  ['', { key: 2, value: '拣货坏件' }],
]);

/**
 * 库内转移状态
 */
export const TRANSFERSTATUS = new Enum([
  ['', { key: 1, value: '待处理' }],
  ['', { key: 2, value: '已完成' }],
  ['', { key: 3, value: '已放弃' }],
]);

/**
 * 理货管理来源
 */
export const MANAGESOURCE = new Enum([
  ['', { key: 1, value: '手动创建' }],
  ['', { key: 2, value: '外部同步' }],
]);

/**
 * 理货管理状态
 */
export const MANAGESTATUS = new Enum([
  ['', { key: 1, value: '待处理' }],
  ['', { key: 2, value: '处理中' }],
  ['', { key: 3, value: '已完成' }],
  ['', { key: 4, value: '已放弃' }],
]);

/**
 * 理货管理类型
 */
export const MANAGESTYTLE = new Enum([
  ['', { key: 1, value: '日常理货' }],
  ['', { key: 2, value: '商品下架理货' }],
]);

/**
 * 理货批次明细状态
 */
export const BATCHDETAILSTATUS = new Enum([
  ['', { key: 1, value: '待处理' }],
  ['', { key: 2, value: '已完成' }],
]);

/**
 * 库内调整状态
 */
export const ADJUSTSTATUS = new Enum([
  ['', { key: 1, value: '待处理' }],
  ['', { key: 2, value: '已调整' }],
  ['', { key: 3, value: '已放弃' }],
]);

/**
 * 调拨范围
 */
export const CANNIBALIZERANGE = new Enum([
  ['', { key: 1, value: '国内调拨' }],
  ['', { key: 2, value: '国外调拨' }],
]);

/**
 * 调拨类型
 */
export const CANNIBALIZETYPE = new Enum([['', { key: 1, value: '库存调拨' }]]);

/**
 * 调拨属性
 */
export const CANNIBALIZEPROPERTY = new Enum([
  [
    '',
    {
      key: 1,
      value: '普货',
      judge: function(str: string) {
        return str.split(',').includes('普货');
      },
    },
  ],
  [
    '',
    {
      key: 2,
      value: '非普货',
      judge: function(str: string) {
        return !str.split(',').includes('普货');
      },
    },
  ],
]);

/**
 * 出库签收状态
 */
export const OUTPUTRECEIPTTYPE = new Enum([
  ['', { key: 0, value: '待发货' }],
  ['', { key: 1, value: '已发货' }],
  ['', { key: 2, value: '已收货' }],
]);

/**
 * 包裹属性
 */
export const PACKAGEPORPERTY = new Enum([
  ['', { key: 1, value: '普货' }],
  ['', { key: 2, value: '非普货' }],
]);

/**
 * 绩效组
 */
export const PERFORMANCEGROUP = new Enum([
  [
    '',
    {
      key: 1,
      value: '签收',
      code: 'receiveResult',
      component: require('@/pages/editPerformanceRule/components/receiveResult')
        .default,
      listFun: require('@/pages/performanceList/column/receiveResultColumn')
        .default,
      configFun: require('@/pages/performanceConfig/column/receiveResultColumn')
        .default,
    },
  ],
  [
    '',
    {
      key: 2,
      value: '分标',
      code: 'distributeResult',
      component: require('@/pages/editPerformanceRule/components/distributeResult')
        .default,
      listFun: require('@/pages/performanceList/column/distributeResultColumn')
        .default,
      configFun: require('@/pages/performanceConfig/column/distributeResultColumn')
        .default,
    },
  ],
  [
    '',
    {
      key: 3,
      value: '质检',
      code: 'inspectionResult',
      component: require('@/pages/editPerformanceRule/components/inspectionResult')
        .default,
      listFun: require('@/pages/performanceList/column/inspectionResultColumn')
        .default,
      configFun: require('@/pages/performanceConfig/column/inspectionResultColumn')
        .default,
    },
  ],
  [
    '',
    {
      key: 4,
      value: '入库称重',
      code: 'weighInResult',
      component: require('@/pages/editPerformanceRule/components/weighInResult')
        .default,
      listFun: require('@/pages/performanceList/column/weighInResultColumn')
        .default,
      configFun: require('@/pages/performanceConfig/column/weighInResultColumn')
        .default,
    },
  ],
  [
    '',
    {
      key: 5,
      value: '上架',
      code: 'shelvesResult',
      component: require('@/pages/editPerformanceRule/components/shelvesResult')
        .default,
      listFun: require('@/pages/performanceList/column/shelvesResultColumn')
        .default,
      configFun: require('@/pages/performanceConfig/column/shelvesResultColumn')
        .default,
    },
  ],
  [
    '',
    {
      key: 6,
      value: '拣货',
      code: 'pickResult',
      component: require('@/pages/editPerformanceRule/components/pickResult')
        .default,
      listFun: require('@/pages/performanceList/column/pickResultColumn')
        .default,
      configFun: require('@/pages/performanceConfig/column/pickResultColumn')
        .default,
    },
  ],
  [
    '',
    {
      key: 7,
      value: '分拣',
      code: 'sortingResult',
      component: require('@/pages/editPerformanceRule/components/sortingResult')
        .default,
      listFun: require('@/pages/performanceList/column/sortingResultColumn')
        .default,
      configFun: require('@/pages/performanceConfig/column/sortingResultColumn')
        .default,
    },
  ],
  [
    '',
    {
      key: 8,
      value: '验单',
      code: 'checkBillResult',
      component: require('@/pages/editPerformanceRule/components/checkBillResult')
        .default,
      listFun: require('@/pages/performanceList/column/checkBillResultColumn')
        .default,
      configFun: require('@/pages/performanceConfig/column/checkBillResultColumn')
        .default,
    },
  ],
  [
    '',
    {
      key: 9,
      value: '打包',
      code: 'packageResult',
      component: require('@/pages/editPerformanceRule/components/packageResult')
        .default,
      listFun: require('@/pages/performanceList/column/packageResultColumn')
        .default,
      configFun: require('@/pages/performanceConfig/column/packageResultColumn')
        .default,
    },
  ],
  [
    '',
    {
      key: 10,
      value: '出库称重',
      code: 'weighOutResult',
      component: require('@/pages/editPerformanceRule/components/weighOutResult')
        .default,
      listFun: require('@/pages/performanceList/column/weighOutResultColumn')
        .default,
      configFun: require('@/pages/performanceConfig/column/weighOutResultColumn')
        .default,
    },
  ],
]);

/**
 * 货代名称
 */

export const FORWARDERLIST = new Enum([
  ['', { key: '义乌UPS红单', value: '义乌UPS红单' }],
  ['', { key: '官方DHL美国账号', value: '官方DHL美国账号' }],
  ['', { key: '官方DHL中国账号', value: '官方DHL中国账号' }],
  ['', { key: '顺丰官方账号', value: '顺丰官方账号' }],
  ['', { key: '联邦', value: '联邦' }],
  ['', { key: 'DHL', value: 'DHL' }],
  ['', { key: 'UPS', value: 'UPS' }],
  ['', { key: '海运', value: '海运' }],
  ['', { key: '圆通', value: '圆通' }],
  ['', { key: '顺丰', value: '顺丰' }],
  ['', { key: '百世快运', value: '百世快运' }],
  ['', { key: '中通', value: '中通' }],
  ['', { key: '宝来空派', value: '宝来空派' }],
  ['', { key: '南风空派', value: '南风空派' }],
  ['', { key: 'Hecny Transportion', value: 'Hecny Transportion' }],
  ['', { key: '双清全包海运', value: '双清全包海运' }],
  ['', { key: '优速', value: '优速' }],
  ['', { key: 'Kerryexpress', value: 'Kerryexpress' }],
  ['', { key: '泰国其他', value: '泰国其他' }],
  ['', { key: 'T86', value: 'T86' }],
  ['', { key: '9610', value: '9610' }],
  ['', { key: '其它', value: '其它' }],
]);

/**
 * 调度类型
 */
export const SCHEDULINGTYPE = new Enum([
  ['', { key: 1, value: '订单调度' }],
  ['', { key: 2, value: '库存调拨' }],
]);

/**
 * 调整类型
 */
export const ADJUSTTYPE = new Enum([
  ['', { key: 1, value: '日常调整' }],
  ['', { key: 2, value: '盘点调整' }],
]);

/**
 * 绩效变更类型
 */
export const SCORETYPE = new Enum([
  ['', { key: 1, value: '加分' }],
  ['', { key: 2, value: '减分' }],
]);

/**
 * 绩效规则状态
 */
export const PERFORMANCECONFIGSTATUS = new Enum([
  ['', { key: 0, value: '启用', color: '#00A854' }],
  ['', { key: 1, value: '禁用', color: '#CCCCCC' }],
]);

/**
 * 拣货管理是否打印状态
 */
export const BATCHMANAGEISPRINT = new Enum([
  ['', { key: 0, value: '未打印', color: '#CCCCCC' }],
  ['', { key: 1, value: '已打印', color: '#00A854' }],
]);

/**
 * 批次类型:1.合格品，2或4.多品，3或6.次品
 */
export const BATCHNUMBERTYPE = new Enum([
  ['', { key: 1, value: '合格品' }],
  ['', { key: 2, value: '多品' }],
  ['', { key: 3, value: '次品' }],
  ['', { key: 4, value: '多品' }],
  ['', { key: 6, value: '次品' }],
]);

/**
 * 分拣状态：0.待分拣，1.已分拣
 */
export const SORTSTATUS = new Enum([
  ['', { key: 0, value: '待分拣' }],
  ['', { key: 1, value: '已分拣' }],
]);

/**
 * 是否是服务商品
 */
export const ISSEhanRVICEGOODS = new Enum([
  ['', { key: 1, value: '否' }],
  ['', { key: 2, value: '是' }],
]);

/**
 * 是否是服务商品
 */
export const ISSERVICEGOODS = new Enum([
  ['', { key: 1, value: '否' }],
  ['', { key: 2, value: '是' }],
]);
/**订单调度-已收货表头 */
export const ORDERDISPATCHTABLECLOUMN = new Enum([
  [
    '',
    {
      key: 1,
      value: '已签收包裹',
      fn: require('@/pages/orderDispatch/orderDispatchProcessed/column/parcelSignedColumn')
        .default,
    },
  ],
  [
    '',
    {
      key: 2,
      value: '已签收调度任务',
      fn: require('@/pages/orderDispatch/orderDispatchProcessed/column/schedulingTaskSignedColumn')
        .default,
    },
  ],
]);

/**订单调度-已收货表头 */
export const OUTBOUNDORDERCOLUMN = new Enum([
  [
    '',
    {
      key: 'normal',
      value: '通用表头',
      fn: require('@/pages/outBoundOrder/column/commonColumn').default,
    },
  ],
  [
    '',
    {
      key: 'except',
      value: '异常处理',
      fn: require('@/pages/outBoundOrder/column/exceptOrderColumn').default,
    },
  ],
  [
    '',
    {
      key: 'ended',
      value: '异常结束',
      fn: require('@/pages/outBoundOrder/column/endedColumn').default,
    },
  ],
  [
    '',
    {
      key: 'timeout',
      value: '超时未处理',
      fn: require('@/pages/outBoundOrder/column/timeoutColumn').default,
    },
  ],
]);

/**
 * 签收音频组
 */
export const AUDIOGROUP = new Enum([
  [
    '',
    {
      key: '正常',
      value: '正常',
      audio: require('@/audio/zhengchang.mp3').default,
    },
  ],
  [
    '',
    {
      key: '加急',
      value: '加急',
      audio: require('@/audio/jiaji.mp3').default,
    },
  ],
  [
    '',
    {
      key: '组装',
      value: '组装',
      audio: require('@/audio/zuzhuang.mp3').default,
    },
  ],
  [
    '',
    {
      key: '线下组',
      value: '线下组',
      audio: require('@/audio/xianxiazu.mp3').default,
    },
  ],
  [
    '',
    {
      key: '改标',
      value: '改标',
      audio: require('@/audio/gaiBiao.mp3').default,
    },
  ],
  [
    '',
    {
      key: '不入库',
      value: '不入库',
      audio: require('@/audio/buruku.mp3').default,
    },
  ],
  [
    '',
    {
      key: '小单直发',
      value: '小单直发',
      audio: require('@/audio/xiaoDanZhiFa.mp3').default,
    },
  ],
  [
    '',
    {
      key: '海外仓直发',
      value: '海外仓直发',
      audio: require('@/audio/haiWaiCangZhiFa.mp3').default,
    },
  ],
  [
    '',
    {
      key: '贵重物品',
      value: '贵重物品',
      audio: require('@/audio/guiZhongWuPin.mp3').default,
    },
  ],
  [
    '',
    {
      key: '请注意',
      value: '请注意',
      audio: require('@/audio/qingzhuyi.mp3').default,
    },
  ],
  [
    '',
    {
      key: 'VIP',
      value: 'VIP',
      audio: require('@/audio/vip.mp3').default,
    },
  ],
  [
    '',
    {
      key: '直发',
      value: '直发',
      audio: require('@/audio/zhifa.mp3').default,
    },
  ],
  [
    '',
    {
      key: 'USA直发',
      value: 'USA直发',
      audio: require('@/audio/usazhifa.mp3').default,
    },
  ],
  [
    '',
    {
      key: '不存在',
      value: '不存在',
      audio: require('@/audio/shibai.mp3').default,
    },
  ],
  [
    '',
    {
      key: '检验次数大于商品',
      value: '检验次数大于商品',
      audio: require('@/audio/jianyanguoduo.mp3').default,
    },
  ],
  [
    '',
    {
      key: '成功',
      value: '成功',
      audio: require('@/audio/cg.mp3').default,
    },
  ],
  [
    '',
    {
      key: '失败',
      value: '失败',
      audio: require('@/audio/shibai.mp3').default,
    },
  ],
  [
    '',
    {
      key: '验单正确',
      value: '验单正确',
      audio: require('@/audio/checkSuccess.mp3').default,
    },
  ],
  [
    '',
    {
      key: '验单错误',
      value: '验单错误',
      audio: require('@/audio/checkFail.mp3').default,
    },
  ],
]);

/**
 * 签收采购标记
 */
export const PURCHASEMARK = new Enum([
  ['', { key: 1, value: '不入库' }],
  ['', { key: 2, value: '改标' }],
  ['', { key: 3, value: '加急' }],
  ['', { key: 4, value: '线下组' }],
  ['', { key: 5, value: '正常' }],
  ['', { key: 6, value: '直发' }],
  ['', { key: 7, value: '组装' }],
  ['', { key: 8, value: '小单直发' }],
  ['', { key: 9, value: '海外仓直发' }],
  ['', { key: 10, value: '贵重物品' }],
]);

/**
 * 商品类型
 */
export const PRODUCTTYPE = new Enum([
  ['', { key: 0, value: '正常商品' }],
  ['', { key: 1, value: '服务商品' }],
  ['', { key: 3, value: '包装商品' }],
  ['', { key: 4, value: '供应商商品' }],
  ['', { key: 5, value: '供应商自发货商品' }],
]);

/**
 * 是否国内外订单
 */
interface _ISCOUNTRYORDER extends Enum {
  no: EnumItem;
  yes: EnumItem;
}

export const ISCOUNTRYORDER = <_ISCOUNTRYORDER>new Enum([
  ['no', { key: 0, value: '否' }],
  ['yes', { key: 1, value: '是' }],
]);

/**分标状态(subStandardStatus)，入库单状态(putStorageNumberStatus) */
export const MARKWARRANTSTATUS = <_ISCOUNTRYORDER>new Enum([
  ['no', { key: 0, value: '未分标', value2: '入库单状态未完成' }],
  ['yes', { key: 1, value: '已分标', value2: '入库单状态完成' }],
]);

/**
 * 越库状态
 */
export const LIBRARYSTATUS = new Enum([
  ['', { key: 1, value: '待验单' }],
  ['', { key: 2, value: '验单中' }],
  ['', { key: 3, value: '已完成' }],
]);

/**
 * 签收状态
 */
export const SIGNFORSTATUS = new Enum([
  ['', { key: 0, value: '签收成功' }],
  ['', { key: 1, value: '签收失败' }],
]);

/** 盘点类别 */
export const CHECKTYPES = new Enum([
  ['', { key: 1, value: '初盘单' }],
  ['', { key: 2, value: '复盘单' }],
  ['', { key: 3, value: '终盘单' }],
]);

interface _CHECKSTATUS extends Enum {
  /**未盘点 */
  undo: EnumItem;
  /**盘点中 */
  doing: EnumItem;
  /**盘点完成 */
  finish: EnumItem;
  /**已放弃 */
  giveup: EnumItem;
}

/** 盘点状态 */
export const CHECKSTATUS = <_CHECKSTATUS>new Enum([
  ['undo', { key: 1, value: '未盘点' }],
  ['doing', { key: 2, value: '盘点中' }],
  ['finish', { key: 3, value: '盘点完成' }],
  ['giveup', { key: 4, value: '已放弃' }],
]);

interface _CHECKWAYS extends Enum {
  /**明盘 */
  light: EnumItem;
  /**暗盘 */
  dark: EnumItem;
}

/** 盘点方式 */
export const CHECKWAYS = <_CHECKWAYS>new Enum([
  ['light', { key: 1, value: '明盘' }],
  ['dark', { key: 2, value: '暗盘' }],
]);

interface _CHECKRANGE extends Enum {
  /**库位 */
  position: EnumItem;
  /**商品 */
  product: EnumItem;
}

/** 盘点维度 */
export const CHECKRANGE = <_CHECKRANGE>new Enum([
  ['position', { key: 1, value: '库位' }],
  ['product', { key: 2, value: '商品' }],
]);

/** 冻结盘点 */
export const CHECKFROZEN = new Enum([
  ['', { key: 1, value: '否' }],
  ['', { key: 2, value: '是' }],
]);

/** 动碰类型 */
export const TOUCHTYPES = new Enum([
  ['', { key: 1, value: '上架动碰' }],
  ['', { key: 2, value: '拣货动碰' }],
  ['', { key: 3, value: '移动动碰' }],
]);

/**盘点批次状态 */
export const BATCHSTATUS = new Enum([
  ['', { key: 1, value: '待领取' }],
  ['', { key: 2, value: '已领取' }],
  ['', { key: 3, value: '已完成' }],
]);

/**盘点状态 */
export const INVENTORYSTATUS = new Enum([
  ['', { key: 1, value: '待盘点' }],
  ['', { key: 2, value: '已盘点' }],
]);

// 盘点结果-状态
export const INVENTORYRESULTSTATUS = new Enum([
  ['', { key: 1, value: '初盘已完成' }],
  ['', { key: 2, value: '复盘已完成' }],
  ['', { key: 3, value: '终盘已完成' }],
  ['', { key: 4, value: '结束盘点' }],
]);

// 盘点结果-明细状态
export const INVENTORYRESULTDETAILSTATUS = new Enum([
  ['', { key: 1, value: '初盘已盘点' }],
  ['', { key: 2, value: '复盘已盘点' }],
  ['', { key: 3, value: '终盘已盘点' }],
]);

/**库存周转率 */

export const INVENTORYTURNOVERTIME = new Enum([
  ['', { key: 'week', value: '近一周出库量', value2: '近一周库存周转天数' }],
  [
    '',
    { key: 'month', value: '近一个月出库量', value2: '近一个月库存周转天数' },
  ],
  [
    '',
    {
      key: 'threeMonths',
      value: '近三个月出库量',
      value2: '近三个月库存周转天数',
    },
  ],
]);
