// import Mock from 'mockjs';

// const { Random } = Mock;
// export default {
//   //框位列表
//   'POST /storehouse/storehouseFrameSetting/list': Mock.mock({
//     success: true,
//     code: 200,
//     messageEn: '成功',
//     messageCn: '成功',
//     data: {
//       pageSize: 10,
//       pageNumber: 1,
//       totalRecords: 5,
//       totalPages: 1,
//       'content|5': [
//         {
//           // 属性 id 是一个自增数，起始值为 1，每次增 1
//           'id|+1': 1,
//           /**
//            * 框位
//            */
//           'frameLocation|+1': 1,

//           /**
//            * 物流编码
//            *  */

//           'logisticsCode|1': [
//             'JD20201118',
//             'YT20201118',
//             'ST20201118',
//             'SF20201118',
//           ],

//           /**
//            * 物流公司 */

//           'logisticsCompany|1': [
//             '京东快递',
//             '圆通快递',
//             '申通快递',
//             '顺丰快递',
//           ],

//           /**
//            * 文件名称 */

//           fileName: '这是一个测试的文件.mp3',

//           /**
//            * 文件地址 */

//           fileUrl:
//             'https://cc-west-usa.oss-us-west-1.aliyuncs.com/4fc5bf93-b0c7-4860-add0-693e4a68a4e5.mp3',

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
//            * 修改时间 */

//           updateAt: '@datetime',
//         },
//       ],
//     },
//   }),

//   // 获取物流公司
//   'GET /cujiaLogisticsAdmin/Company/base/list': Mock.mock({
//     success: true,
//     code: 200,
//     messageEn: '成功',
//     messageCn: '成功',
//     data: [
//       {
//         // 属性 id 是一个自增数，起始值为 1，每次增 1
//         id: 1,
//         companyCnName: '圆通快递',

//         companyCode: 'YT20201118',

//         companyEnName: 'YT',
//       },
//       {
//         // 属性 id 是一个自增数，起始值为 1，每次增 1
//         id: 2,
//         companyCnName: '京东快递',

//         companyCode: 'JD20201118',

//         companyEnName: 'JD',
//       },
//       {
//         // 属性 id 是一个自增数，起始值为 1，每次增 1
//         id: 3,
//         companyCnName: '申通快递',

//         companyCode: 'ST20201118',

//         companyEnName: 'ST',
//       },
//       {
//         // 属性 id 是一个自增数，起始值为 1，每次增 1
//         id: 4,
//         companyCnName: '顺丰快递',

//         companyCode: 'SF20201118',

//         companyEnName: 'SF',
//       },
//     ],
//   }),

//   // 修改新增框位
//   'POST /storehouse/storehouseFrameSetting/saveSetting': Mock.mock({
//     success: true,
//     code: 200,
//     messageEn: '成功',
//     messageCn: '成功',
//     data: true,
//   }),

//   // 清空删除框位
//   'POST /storehouse/storehouseFrameSetting/remove': Mock.mock({
//     success: true,
//     code: 200,
//     messageEn: '成功',
//     messageCn: '成功',
//     data: true,
//   }),

//   // 保存重量阈值
//   'POST /storehouse/storehouseFrameSetting/saveWeightThreshold': Mock.mock({
//     success: true,
//     code: 200,
//     messageEn: '成功',
//     messageCn: '成功',
//     data: true,
//   }),

//   // 查询重量阈值
//   'POST /storehouse/storehouseFrameSetting/getWeightThreshold': Mock.mock({
//     success: true,
//     code: 200,
//     messageEn: '成功',
//     messageCn: '成功',
//     data: {
//       // 属性 id 是一个自增数，起始值为 1，每次增 1
//       'id|+1': 1,
//       ruleKey: '@name',
//       'number|1-100': 1,
//       createId: '@guid',
//     },
//   }),
// };
