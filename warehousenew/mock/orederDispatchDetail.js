// import Mock from 'mockjs';

// const { Random } = Mock;
// export default {
//   // 包裹或运单号扫描
//   'POST /scheduling/parcelScanning': Mock.mock({
//     success: true,
//     code: 200,
//     messageEn: '成功',
//     messageCn: '成功',
//     data: {
//       /**调度类型：1、订单调度 2、库存调拨 */
//       'schedulingType|1-2': 2,

//       /**包裹编号或运单号 */
//       parcelOrWaybillNumber: '@id(8,10)',

//       /**订单号 */
//       orderId: '@id(8,10)',

//       /**属性 */
//       property: ['普货'],

//       /**重量(KG) */
//       'weight|1-1--': 100,

//       /**数量 */
//       'quantity|1-1--': 100,

//       /** 仓库 2:美西 3：美东 StorageEnum	 */
//       'store|2-3': 3,

//       /** 订单类型 1：正常 2：纠纷订单 3：拦截订单 */
//       orderType: 3,
//     },
//   }),
//   // 订单调度包裹及明细保存
//   'POST /scheduling/saveSchedulingPackageAndDetail': Mock.mock({
//     success: true,
//     code: 200,
//     messageEn: '处理成功',
//     messageCn: '处理成功',
//     data: true,
//   }),
//   // 根据调度任务ID查询包裹及明细
//   'POST /scheduling/getPackageAndDetailsAccordingToSchedulingId': Mock.mock({
//     success: true,
//     code: 200,
//     messageEn: '处理成功',
//     messageCn: '处理成功',
//     'data|10': [
//       {
//         // 属性 id 是一个自增数，起始值为 1，每次增 1
//         'id|+1': 1,
//         /**包裹属性 1、普货 2、非普货 */
//         'packProperty|1-2': 2,

//         /**包裹编号 */
//         parcelNumber: '@id(8,10)',

//         /**追踪号 */
//         trackingNumber: '@id(8,10)',

//         /**尺寸：长 */
//         'length|1-100': 100,

//         /**尺寸：宽 */
//         'width|1-100': 100,

//         /**尺寸：高 */
//         'height|1-100': 100,

//         /**重量/KG	 */
//         'weight|1-100': 100,

//         /**备注 */
//         remarks: '@word(8,10)',

//         /**状态 1：未签收 2：已签收 */
//         'status|1-2': 2,

//         /**调度任务id */
//         schedulingId: '@id(8,10)',

//         /**标记 1、拦截 */
//         mark: 1,
//       },
//     ],
//   }),
// };
