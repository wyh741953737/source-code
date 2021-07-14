// import Mock from 'mockjs';
// export default {
//   'POST /storehouseCheck/getCheckByParam': Mock.mock({
//     success: true,
//     code: 200,
//     messageEn: '成功',
//     messageCn: '成功',
//     data: {
//       content: [
//         {
//           id: '1',
//           checkNum: '1123213123',
//           type: 1,
//           storehouseId: 'dasdasdads',
//           storehouseName: '奥术大师多',
//           checkType: 1,
//           checkDimension: 1,
//           status: 1,
//           isFrozen: 1,
//           createBy: 'ycy',
//           createAt: '2020-01-01 10:10:10',
//         },
//         {
//           id: '2',
//           checkNum: '1123213123',
//           type: 2,
//           storehouseId: 'dasdasdads',
//           storehouseName: '奥术大师多',
//           checkType: 2,
//           checkDimension: 2,
//           status: 2,
//           isFrozen: 2,
//           createBy: 'ycy',
//           createAt: '2020-01-01 10:10:10',
//         },
//         {
//           id: '3',
//           checkNum: '1123213123',
//           type: 3,
//           storehouseId: 'dasdasdads',
//           storehouseName: '奥术大师多',
//           checkType: 2,
//           checkDimension: 2,
//           status: 3,
//           isFrozen: 1,
//           createBy: 'ycy',
//           createAt: '2020-01-01 10:10:10',
//         },
//       ],
//     },
//   }),
//   'POST /storehouseCheck/getCheckVariant': Mock.mock({
//     success: true,
//     code: 200,
//     messageEn: '成功',
//     messageCn: '成功',
//     data: [
//       {
//         id: '1',
//         sku: '11232131231',
//         customerName: 1,
//         locationName: 'dasdasdads1',
//         areaName: '奥术大师多1',
//       },
//       {
//         id: '2',
//         sku: '11232131232',
//         customerName: 2,
//         locationName: 'dasdasdads2',
//         areaName: '奥术大师多2',
//       },
//       {
//         id: '3',
//         sku: '11232131233',
//         customerName: 3,
//         locationName: 'dasdasdads3',
//         areaName: '奥术大师多3',
//       },
//     ],
//   }),
//   'POST /storehouseCheck/deleteCheckVariant': Mock.mock({
//     success: true,
//     code: 200,
//     messageEn: '成功',
//     messageCn: '成功',
//     data: true,
//   }),
//   'POST /storehouseCheck/deleteCheck': Mock.mock({
//     success: true,
//     code: 200,
//     messageEn: '成功',
//     messageCn: '成功',
//     data: true,
//   }),
//   'POST /storehouseCheck/getCustomerIdBysku': Mock.mock({
//     success: true,
//     code: 200,
//     messageEn: '成功',
//     messageCn: '成功',
//     data: [
//       { customerId: '1', customerName: '1' },
//       { customerId: '2', customerName: '2' },
//       { customerId: '3', customerName: '3' },
//     ],
//   }),
//   'POST /storehouseCheck/getCheckNum': Mock.mock({
//     success: true,
//     code: 200,
//     messageEn: '成功',
//     messageCn: '成功',
//     data: String(Date.now()),
//   }),
//   'POST /storehouseCheck/addCheck': Mock.mock({
//     success: true,
//     code: 200,
//     messageEn: '成功',
//     messageCn: '成功',
//     data: true,
//   }),
//   'POST /storehouseCheck/addBtach': Mock.mock({
//     success: true,
//     code: 200,
//     messageEn: '成功',
//     messageCn: '成功',
//     data: true,
//   }),
// };