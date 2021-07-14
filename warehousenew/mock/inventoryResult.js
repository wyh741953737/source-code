// import Mock from 'mockjs';

// const { Random } = Mock;
// export default {
//   // 查询列表
//   'POST /storehouse/storehouseCheckResult/getCheckResultByParam': Mock.mock({
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

//           /**盘点单号 */
//           checkNum: '@guid()',

//           /**1：初盘单，2：复盘单，2：终盘单 */
//           'type|1-3': 1,

//           /**仓库ID */
//           storehouseId: '2991a224-737b-42a3-a1d9-8ccd2936b341',
//           storehouseName: '东莞仓',

//           /**1：明盘，2：暗盘 */
//           'checkType|1-2': 1,

//           /**1：初盘已完成，2：复盘已完成，3：终盘已完成，4：结束盘点 */
//           'status|1-4': 1,

//           /**1：未冻结，2：冻结 */
//           'isFrozen|1-2': 1,

//           /**修改人 */
//           updateBy: '@name',

//           /**修改时间 */
//           updateAt: '@datetime',
//         },
//       ],
//     },
//   }),

//   //盘点结果-明细
//   'POST /storehouse/storehouseCheckResult/getCheckResultDetailByParam': Mock.mock(
//     {
//       success: true,
//       code: 200,
//       messageEn: '成功',
//       messageCn: '成功',
//       'data|5': [
//         {
//           /**主键ID */
//           'id|+1': 1,

//           /**盘点结果主键ID */
//           checkResultId: '@guid()',

//           /**批次号 */
//           batchNum: '@word(5,8)',

//           /**盘点编号 */
//           checkNum: '@word(5,8)',

//           /**仓库id */
//           storehouseId: '2991a224-737b-42a3-a1d9-8ccd2936b341',

//           /**SKU */
//           sku: '@guid()',

//           /**短码 */
//           shortCode: '@word(3,5)',

//           /**变体id */
//           variantId: '@guid()',

//           /**图片链接 */
//           image: Random.image('200x100', '#894FC4', '#FFF', 'png', 'test'),

//           /**1：正品，2次品 */
//           'type|1-2': 1,

//           /**盘点货人 */
//           updateBy: '@name',

//           /**盘点时间 */
//           updateAt: '@datetime',

//           /**货主ID */
//           customerId: '@guid',

//           /**货主名称 */
//           customerName: '@name',

//           /**货主编号 */
//           customerNum: '@word(5,8)',

//           /**1：初盘已盘点，2：复盘已盘点，3：终盘已盘点 */
//           'status|1-3': 1,

//           /**初盘系统数量 */
//           'initQuantity|1-100': 1,

//           /**初盘数量 */
//           'firstQuantity|1-100': 1,

//           /**复盘系统数量 */
//           'secondSystemQuantity|1-100': 1,

//           /**复盘数量 */
//           'secondQuantity|1-100': 1,

//           /**终盘系统数量 */
//           'lastSystemQuantity|1-100': 1,

//           /**终盘数量 */
//           'lastQuantity|1-100': 1,

//           /**3级库存id */
//           'storehouseInventoryInfoId|1-100': 1,

//           /**盘点批次关联变体表主键id */
//           'checkBatchVariantId|1-100': 1,

//           /**下架库位ID */
//           locationId: '@guid()',

//           /**库位名称 */
//           locationName: '@name',

//           /**库区 */
//           areaName: '@name',
//         },
//       ],
//     },
//   ),

//   // 查询盘点单异常数据
//   'POST /storehouse/storehouseCheckResult/getExQuantityCheckResultByCheckNum': Mock.mock(
//     {
//       success: true,
//       code: 200,
//       messageEn: '成功',
//       messageCn: '成功',
//       'data|10': [
//         {
//           /**主键ID */
//           'id|+1': 1,

//           /**盘点结果主键ID */
//           checkResultId: '@guid()',

//           /**盘点编号 */
//           checkNum: '@word(5,8)',

//           /**SKU */
//           sku: '@word(5,8)',

//           /**货主ID */
//           customerId: '@word(5,8)',

//           /**货主名称 */
//           customerName: '@name',

//           /**初盘系统数量 */
//           'initQuantity|1-100': 1,

//           /**复盘系统数量 */
//           'secondSystemQuantity|1-100': 1,

//           /**初盘数量 */
//           'firstQuantity|1-100': 1,

//           /**复盘数量 */
//           'secondQuantity|1-100': 1,

//           /**库位名称 */
//           locationName: '@name',

//           /**库区 */
//           areaName: '@name',
//         },
//       ],
//     },
//   ),

//   // 盘点结果-复盘
//   'POST /storehouse/storehouseCheckResult/updateSecondCheck': Mock.mock({
//     success: true,
//     code: 200,
//     messageEn: '成功',
//     messageCn: '成功',
//     data: true,
//   }),

//   // 盘点结果-终盘
//   'POST /storehouse/storehouseCheckResult/updateLastCheck': Mock.mock({
//     success: true,
//     code: 200,
//     messageEn: '成功',
//     messageCn: '成功',
//     data: true,
//   }),

//   // 盘点结果-结束
//   'POST /storehouse/storehouseCheckResult/checkEnd': Mock.mock({
//     success: true,
//     code: 200,
//     messageEn: '成功',
//     messageCn: '成功',
//     data: true,
//   }),
// };
