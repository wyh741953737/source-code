// import Mock from 'mockjs';

// const { Random } = Mock;
// export default {
//   // 查询列表
//   'POST /storehouse/storehouseTallyBatch/getTallyBatchList': Mock.mock({
//     success: true,
//     code: 200,
//     messageEn: '成功',
//     messageCn: '成功',
//     data: {
//       pageSize: 10,
//       pageNumber: 1,
//       totalRecords: 10,
//       totalPages: 1,
//       'content|10': [
//         {
//           // 属性 id 是一个自增数，起始值为 1，每次增 1
//           'id|+1': 1,
//           'quantity|20-100': 20,
//           tallyNum: '111',
//           batchNum: 'hhhhhhh7888888',
//           createBy: '@name',
//           createAt: '@datetime',
//           updateBy: '@name',
//           updateAt: '@datetime',
//           'status|0-1': 1,
//           image: Random.image('200x100', '#894FC4', '#FFF', 'png', 'test'),
//         },
//       ],
//     },
//   }),
//   // 理货明细
//   'POST /storehouse/storehouseTallyBatch/getTallyBatchVariantList': Mock.mock({
//     success: true,
//     code: 200,
//     messageEn: '成功',
//     messageCn: '成功',
//     data: {
//       pageSize: 10,
//       pageNumber: 1,
//       totalRecords: 10,
//       totalPages: 1,
//       'content|10': [
//         {
//           // 属性 id 是一个自增数，起始值为 1，每次增 1
//           'id|+1': 1,
//           'quantity|20-100': 20,
//           'realQuantity|20-100': 60,
//           sku: 'sku111',
//           locationName: '库位111',
//           toLocationName: '库位222',
//           batchNum: 'hhhhhhh7888888',
//           createBy: '@name',
//           createAt: '@datetime',
//           updateBy: '@name',
//           updateAt: '@datetime',
//           'status|1-2': 1,
//           image: Random.image('200x100', '#894FC4', '#FFF', 'png', 'test'),
//         },
//       ],
//     },
//   }),
//   // 新增耗材
//   'POST /storehouse/consumables/addConsumables': Mock.mock({
//     success: true,
//     code: 200,
//     messageEn: '处理成功',
//     messageCn: '处理成功',
//     data: true,
//   }),
//   // 修改耗材
//   'POST /storehouse/consumables/updateConsumables': Mock.mock({
//     success: true,
//     code: 200,
//     messageEn: '处理成功',
//     messageCn: '处理成功',
//     data: true,
//   }),

//   // 日志查询
//   'POST /storehouse/consumablesLog/getConsumablesLog': Mock.mock({
//     success: true,
//     code: 200,
//     messageEn: '处理成功',
//     messageCn: '处理成功',
//     'data|10': [
//       {
//         // 属性 id 是一个自增数，起始值为 1，每次增 1
//         'id|+1': 1,
//         consumablesId: '@guid',
//         cNumber: '@id',
//         cName: '@name',
//         createBy: '@name',
//         createAt: '@datetime',
//         operationInfo: '@word',
//       },
//     ],
//   }),

//   //批量导入
//   'POST /storehouse/consumables/addBatchConsumables': Mock.mock({
//     success: true,
//     code: 200,
//     messageEn: '处理成功',
//     messageCn: '处理成功',
//     data: true,
//   }),
// };
