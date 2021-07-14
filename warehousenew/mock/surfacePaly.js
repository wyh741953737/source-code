// import Mock from 'mockjs';

// const { Random } = Mock;
// export default {
//   // 面单补打列表
//   'POST /storehouse/storehousePack/getOutboundOrderList': Mock.mock({
//     success: true,
//     code: 200,
//     messageEn: '成功',
//     messageCn: '成功',
//     'data|10': [
//       {
//         // 属性 id 是一个自增数，起始值为 1，每次增 1
//         'id|+1': 1,

//         /**
//          * 出库单号
//          */
//         outboundOrder: Random.id(),

//         /**
//          * 订单号 待发单或者直发单号
//          */
//         orderId: Random.id(),

//         /**
//          * 母订单号
//          */
//         shipmentsOrderId: Random.id(),

//         /**
//          * 出库单类型 1 客户订单代发单 2 客户直发单 3 调度任务 4 退供 5 cj领料
//          */
//         'type|1-5': 5,

//         /**
//          * 订单金额
//          */
//         'orderAmount|10-100': 100,

//         /**
//          * 物流费用
//          */
//         'logisticsCost|10-100': 100,

//         /**
//          * 物流名称
//          */
//         logisticsCompany: '@name',

//         /**
//          * 物流追踪号
//          */
//         logisticsTrackingNumber: Random.id(),

//         /**
//          * 收件人
//          */
//         consignee: '@name',

//         /**
//          * 客户名称
//          */
//         customerName: '@name',

//         /**
//          * 客户订单号
//          */
//         clientOrderId: Random.id(),

//         /**
//          * 物流渠道
//          */
//         logisticsChannel: Random.id(),
//         'quantity|10-100': 100,
//         'weight|10-100': 100,
//       },
//     ],
//   }),

//   // 面单补打
//   'POST /storehouse/storehousePack/getOrderAddress': Mock.mock({
//     success: true,
//     code: 200,
//     messageEn: '成功',
//     messageCn: '成功',
//     data: true,
//   }),

//   //出库异常列表
//   'POST /storehouseBatchPickingAbnormal/getAbnormalList': Mock.mock({
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
//            * 异常编号(单据ID)
//            */
//           abnormalCode: Random.id(),

//           /**
//            * 异常类型：1.拣货少货，2.拣货坏件
//            */
//           'abnormalType|1-2': 2,

//           /**
//            * 异常数量
//            */
//           'abnormalQuantity|10-100': 100,

//           /**
//            * 变体ID
//            */
//           variantId: Random.id(),

//           /**
//            * 变体sku
//            */
//           variantSku: Random.id(),

//           /**
//            * 变体短码
//            */
//           variantNum: Random.id(5),

//           /**
//            * 变体图片
//            */
//           variantImg: Random.image(),

//           /**
//            * 拣货批次id
//            */
//           batchId: Random.id(),

//           /**
//            * 拣货容器编号
//            */
//           containerNum: Random.id(),

//           /**
//            * 提交人id
//            */
//           createId: Random.id(),

//           /**
//            * 提交人名称
//            */
//           createBy: '@name',

//           /**
//            * 提交时间
//            */
//           createAt: '@datetime',

//           /**
//            * 仓库ID
//            */
//           storehouseId: Random.id(),

//           /**
//            * 仓库名称
//            */
//           storehouseName: '金华仓',
//         },
//       ],
//     },
//   }),
// };
