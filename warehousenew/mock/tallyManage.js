// import Mock from 'mockjs';

// const { Random } = Mock;
// export default {
//   // 理货查询列表
//   'POST /storehouse/storehouseTally/getTallyAndDetailPage': Mock.mock({
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

//           /**理货单号 */
//           tallyNum: '@guid',
//           /**1：日常理货，2：商品下架理货 */
//           'type|1-2': 1,

//           /**仓库ID */
//           storehouseId: '2991a224-737b-42a3-a1d9-8ccd2936b341',

//           /**仓库名称 */
//           storehouseName: '东莞仓',

//           /**1：待处理，2：处理中，3：已完成，4：已放弃 */
//           'status|1-4': 1,
//           /**创建人 */
//           createBy: '@name',
//           /**创建时间 */
//           createAt: '@datetime',
//           /**理货来源1：手动创建，2：外部同步 */
//           'tallySource|1-2': 1,
//           'storehouseTallyVarian|5': [
//             {
//               'id|+1': 1,
//               /**SKU */
//               sku: '@id',

//               /**短码 */
//               shortCode: '@word(1,2)',

//               /**理货数量 */
//               'quantity|1-100': 1,

//               /**货主名称 */
//               customerName: '@name',

//               /**货主编号 */
//               customerNum: '@guid()',

//               /**库位名称 */
//               locationName: '@name',

//               /**目标库位名称 */
//               toLocationName: '@name',

//               /**理货类型 */
//               'type|1-2': 1,

//               /**1：否，2：是(是否服务商品) */
//               'isServiceGoods|1-2': 1,

//               /**实际理货数量 */
//               'realQuantity|1-100': 1,
//             },
//           ],
//         },
//       ],
//     },
//   }),

//   //理货放弃
//   'POST /storehouse/storehouseTally/updateTallyToAbandon': Mock.mock({
//     success: true,
//     code: 200,
//     messageEn: '成功',
//     messageCn: '成功',
//     data: true,
//   }),

//   // 批量导入理货单明细
//   'POST /storehouse/storehouseTally/insertStorehouseTally': Mock.mock({
//     success: true,
//     code: 200,
//     messageEn: '成功',
//     messageCn: '成功',
//     data: {
//       /** 成功数*/
//       'successNum|1-100': 1,

//       /** 失败数*/
//       'failuresNum|1-100': 1,

//       'tallyVariantErrorLogVOS|5': [
//         {
//           'id|+1': 1,
//           /**SKU */
//           sku: '@id',

//           /**短码 */
//           shortCode: '@word(5,8)',

//           /**理货数量 */
//           'quantity|1-100': 1,

//           /**1：正品，2次品 */
//           'type|1-2': 1,

//           /**货主ID */
//           customerId: '@id()',

//           /**货主名称 */
//           customerName: '@name',

//           /**货主编号 */
//           customerNum: '@number(5,8)',

//           /**库位名称 */
//           locationName: '@name',

//           /**目标库位名称 */
//           toLocationName: '@name',

//           /**仓库名称 */
//           storehouseName: '东莞仓',

//           /**失败原因 */
//           failureCause: '@word(3,5)',
//         },
//       ],
//     },
//   }),

//   // 新增理货单库存查询
//   'POST /storehouse/storehouseTally/getInventoryInfoForTally': Mock.mock({
//     success: true,
//     code: 200,
//     messageEn: '成功',
//     messageCn: '成功',
//     'data|5': [
//       {
//         // 属性 id 是一个自增数，起始值为 1，每次增 1
//         'id|+1': 1,
//         sku: '@guid()',
//         /**变体ID*/
//         variantId: '@id()',

//         /**库存类型：1：正品，2：次品，3：异常品，4：少货*/
//         'type|1-4': 1,

//         /**货主ID*/
//         customerId: '@id(5,8)',

//         /**库位名称*/
//         locationName: '@name()',

//         /**1：否，2：是*/
//         'isServiceGoods|1-2': 1,

//         /**实物数量*/
//         'realityQuantity|1-100': 1,

//         /**可用数量*/
//         'availableQuantity|1-100': 1,

//         /**冻结数量*/
//         'frozenQuantity|1-100': 1,

//         /**占用数量*/
//         'useQuantity|1-100': 1,

//         /**仓库名称*/
//         storageName: '东莞仓',

//         /**短码*/
//         shortCode: '@word(3,5)',

//         /**货主编号*/
//         customerNum: '@guid()',
//       },
//     ],
//   }),
// };
