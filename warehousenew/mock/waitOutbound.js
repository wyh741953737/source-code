// import Mock from 'mockjs';

// const { Random } = Mock;
// export default {
//   // 出库单列表
//   'POST /storehouse/storehouseOutboundOrderLogisticsInfo/list': Mock.mock({
//     success: true,
//     code: 200,
//     messageEn: '成功',
//     messageCn: '成功',
//     data: {
//       pageSize: 10,
//       pageNumber: 1,
//       totalRecords: 30,
//       totalPages: 3,
//       'content|30': [
//         {
//           // 属性 id 是一个自增数，起始值为 1，每次增 1
//           'id|+1': 1,

//           /**
//            * 物流渠道 */

//           'logisticsChannel|1': [
//             '京东快递',
//             '顺丰快递',
//             '圆通快递',
//             '申通快递',
//           ],

//           /**
//            * 物流名字 */

//           'logisticsCompany|1': [
//             '京东快递',
//             '顺丰快递',
//             '圆通快递',
//             '申通快递',
//           ],

//           /**
//            * 物流追踪号 */

//           logisticsTrackingNumber: '@id()',

//           /**
//            * 出库单订单号 */

//           orderId: '@guid',

//           /**
//            * 0 待出库(待称重)  1 已出库（已称重） 2 称重异常	 */

//           'status|0-2': 0,

//           /**
//            * 出库类型（0 销售出库 ，1 调用出库）
//            */
//           'outboundType|0-1': 1,

//           /**
//            * 包裹出库称重重量 */

//           weight: Random.natural(60, 100),

//           /**
//            * 重量偏差 */

//           weightDeviation: Random.natural(0, 20),

//           /**
//            * 创建人 */

//           createBy: '@name',

//           /**
//            * 创建时间 */

//           createAt: '@datetime',

//           /**
//            * 修改人
//            */
//           updateBy: '@name',

//           /**
//            * 修新时间 */

//           updateAt: '@datetime',

//           /**
//            * 逻辑删除标识（0：未删除，1：已删除）
//            */
//           'isDelete|0-1': 1,

//           /**
//            * 称重人 */

//           weightBy: '@name',

//           /**
//            * 称重时间 */

//           weightAt: '@datetime',

//           /**
//            * 0 电子秤称重  1 手动输入
//            */
//           'weightType|0-1': 1,

//           /**
//            * 仓库id */

//           storageId: '@guid',

//           /**
//            * 仓库名称 */

//           storageName: '@name',

//           /**
//            * 异常原因 */

//           exceptionRemark: '@word(5,10)',

//           /**
//            * 出库单号 */

//           outboundOrder: '@id()',

//           /**
//            * 0 待上网  1 已上网	 */

//           'onlineStatus|0-1': 1,

//           /**
//            * 称重包裹id
//            */
//           weightPackageId: '@id()',

//           /**
//            * 揽收记录id */

//           receiveRecordId: '@id()',
//           /**
//            * 对应框位
//            */
//           frameLocation: '@number(20,30)',
//           /**
//            * 耗材重量
//            */
//           consumablesQuantity: Random.natural(20, 50),
//         },
//       ],
//     },
//   }),

//   //强制出库
//   'POST /storehouse/storehouseOutboundOrderLogisticsInfo/forcedDeliveryTrackingNumber': Mock.mock(
//     {
//       success: true,
//       code: 200,
//       messageEn: '成功',
//       messageCn: '成功',
//       data: true,
//     },
//   ),

//   // 批量导出清单
//   'POST /storehouse/storehouseOutboundOrderLogisticsInfo/exportOrderExcel': Mock.mock(
//     {
//       success: true,
//       code: 200,
//       messageEn: '成功',
//       messageCn: '成功',
//       data: true,
//     },
//   ),

//   // 录入重量
//   'POST /storehouse/storehouseOutboundOrderLogisticsInfo/addWeightManually': Mock.mock(
//     {
//       success: true,
//       code: 200,
//       messageEn: '成功',
//       messageCn: '成功',
//       'data|5': [
//         {
//           // 属性 id 是一个自增数，起始值为 1，每次增 1
//           'id|+1': 1,

//           /**
//            * 物流渠道 */

//           'logisticsChannel|1': [
//             '京东快递',
//             '顺丰快递',
//             '圆通快递',
//             '申通快递',
//           ],

//           /**
//            * 物流名字 */

//           'logisticsCompany|1': [
//             '京东快递',
//             '顺丰快递',
//             '圆通快递',
//             '申通快递',
//           ],

//           /**
//            * 物流追踪号 */

//           logisticsTrackingNumber: '@id()',

//           /**
//            * 出库单订单号 */

//           orderId: '@guid',

//           /**
//            * 0 待出库(待称重)  1 已出库（已称重） 2 称重异常	 */

//           'status|0-2': 0,

//           /**
//            * 出库类型（0 销售出库 ，1 调用出库）
//            */
//           'outboundType|0-1': 1,

//           /**
//            * 包裹出库称重重量 */

//           weight: Random.natural(60, 100),

//           /**
//            * 重量偏差 */

//           weightDeviation: Random.natural(0, 20),

//           /**
//            * 创建人 */

//           createBy: '@name',

//           /**
//            * 创建时间 */

//           createAt: '@datetime',

//           /**
//            * 修改人
//            */
//           updateBy: '@name',

//           /**
//            * 修新时间 */

//           updateAt: '@datetime',

//           /**
//            * 逻辑删除标识（0：未删除，1：已删除）
//            */
//           'isDelete|0-1': 1,

//           /**
//            * 称重人 */

//           weightBy: '@name',

//           /**
//            * 称重时间 */

//           weightAt: '@datetime',

//           /**
//            * 0 电子秤称重  1 手动输入
//            */
//           'weightType|0-1': 1,

//           /**
//            * 仓库id */

//           storageId: '@guid',

//           /**
//            * 仓库名称 */

//           storageName: '@name',

//           /**
//            * 异常原因 */

//           exceptionRemark: '@word(5,10)',

//           /**
//            * 出库单号 */

//           outboundOrder: '@id()',

//           /**
//            * 0 待上网  1 已上网	 */

//           'onlineStatus|0-1': 1,

//           /**
//            * 称重包裹id
//            */
//           weightPackageId: '@id()',

//           /**
//            * 揽收记录id */

//           receiveRecordId: '@id()',
//           /**
//            * 对应框位
//            */
//           frameLocation: '@number(20,30)',
//           /**
//            * 耗材重量
//            */
//           consumablesQuantity: Random.natural(20, 50),
//         },
//       ],
//     },
//   ),
// };
