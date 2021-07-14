// import Mock from 'mockjs';

// const { Random } = Mock;
// export default {
//   //获取包裹信息
//   'POST /storehouse/weighingPackage/getOutboundWeighingPackage': Mock.mock({
//     success: true,
//     code: 200,
//     messageEn: '成功',
//     messageCn: '成功',
//     data: {
//       /**
//        * 揽件出库记录表
//        */
//       id: 123456789,

//       /**
//        * 揽件出库编号
//        */
//       receiveNumber: '987654321',

//       /**
//        * 仓库id
//        */
//       storageId: '08898c4735bf43068d5d677c1d217ab0',

//       /**
//        * 仓库名称
//        */
//       storageName: '深圳仓',

//       /**
//        * 物流渠道
//        */
//       logisticsChannel: 'TYESD1231564',

//       /**
//        * 物流名字
//        */
//       logisticsCompany: '京东快递',

//       /**
//        * 袋数
//        */
//       bagsQuantity: 10,

//       /**
//        * 包裹数
//        */
//       packangQuantity: 20,

//       /**
//        * 净重(KG)
//        */
//       netWeight: 100,

//       /**
//        * 毛重(KG)
//        */
//       grossWeight: 105,

//       /**
//        * 包裹列表
//        */
//       'packageResultDTOList|5': [
//         {
//           // 属性 id 是一个自增数，起始值为 1，每次增 1
//           'id|+1': 1,
//           /**
//            * 包裹编号
//            */
//           packageNumber: Random.id(),

//           /**
//            * 袋数
//            */
//           bagsQuantity: 5,

//           /**
//            * 包裹数量
//            */
//           packageQuantity: 10,

//           /**
//            * 净重(KG)
//            */
//           netWeight: 10,

//           /**
//            * 毛重(KG)
//            */
//           grossWeight: 15,

//           /**
//            * 仓库id
//            */
//           storageId: '08898c4735bf43068d5d677c1d217ab0',

//           /**
//            * 仓库名称
//            */
//           storageName: '深圳仓',
//         },
//       ],
//     },
//   }),

//   //   删除包裹
//   'POST /storehouse/weighingPackage/addOutboundReceiveRecordDeleteFlag': Mock.mock(
//     {
//       success: true,
//       code: 200,
//       messageEn: '成功',
//       messageCn: '成功',
//       data: {
//         /**
//          * 揽件出库记录表
//          */
//         id: 123456789,

//         /**
//          * 揽件出库编号
//          */
//         receiveNumber: '987654321',

//         /**
//          * 仓库id
//          */
//         storageId: '08898c4735bf43068d5d677c1d217ab0',

//         /**
//          * 仓库名称
//          */
//         storageName: '深圳仓',

//         /**
//          * 物流渠道
//          */
//         logisticsChannel: 'TYESD1231564',

//         /**
//          * 物流名字
//          */
//         logisticsCompany: '京东快递',

//         /**
//          * 袋数
//          */
//         bagsQuantity: 10,

//         /**
//          * 包裹数
//          */
//         packangQuantity: 20,

//         /**
//          * 净重(KG)
//          */
//         netWeight: 100,

//         /**
//          * 毛重(KG)
//          */
//         grossWeight: 105,

//         /**
//          * 包裹列表
//          */
//         'packageResultDTOList|4': [
//           {
//             // 属性 id 是一个自增数，起始值为 1，每次增 1
//             'id|+1': 1,
//             /**
//              * 包裹编号
//              */
//             packageNumber: Random.id(),

//             /**
//              * 袋数
//              */
//             bagsQuantity: 5,

//             /**
//              * 包裹数量
//              */
//             packageQuantity: 10,

//             /**
//              * 净重(KG)
//              */
//             netWeight: 10,

//             /**
//              * 毛重(KG)
//              */
//             grossWeight: 15,

//             /**
//              * 仓库id
//              */
//             storageId: '08898c4735bf43068d5d677c1d217ab0',

//             /**
//              * 仓库名称
//              */
//             storageName: '深圳仓',
//           },
//         ],
//       },
//     },
//   ),
// };
