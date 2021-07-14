import Mock from 'mockjs';

const { Random } = Mock;
export default {
  //异常记录
  // 'POST /storehouse/storehouseStockEx/getStockoutExList': Mock.mock({
  //   success: true,
  //   code: 200,
  //   messageEn: '成功',
  //   messageCn: '成功',
  //   data: {
  //     pageSize: 10,
  //     pageNumber: 1,
  //     totalRecords: 10,
  //     totalPages: 1,
  //     'content|10': [
  //       {
  //         // 属性 id 是一个自增数，起始值为 1，每次增 1
  //         'id|+1': 1,
  //         /**
  //          * 揽件出库编号
  //          */
  //         cjorderId: Random.id(),
  //         orderNumber: Random.id(5, 8),
  //         'status|0-2': 0,
  //         stockoutName: '@name()',
  //         stockoutTime: '@datetime',
  //         storeId: '522d3c01c75e4b819ebd31e854841e6c',
  //         storeName: '金华仓',
  //         'totalStockoutCount|0-100': 10,
  //         trackingNumber: '@guid()',
  //         'productList|3': [
  //           {
  //             'id|+1': 1,
  //             cjproductId: '01b1c364530a483bb900505634d6cc9f',
  //             exOrderId: Random.id(),
  //             operatorName: '@name()',
  //             operatorTime: '@datetime',
  //             pickingLocation: 'A32-02',
  //             remarks: 'testttttt',
  //             'status|0-1': 1,
  //             sku: '@guid()',
  //             'stockoutCount|1-100': 1,
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // }),
  //   // 打印
  //   'POST /storehouse/weighingPackage/printCollectionRecord': Mock.mock({
  //     success: true,
  //     code: 200,
  //     messageEn: '成功',
  //     messageCn: '成功',
  //     data: true,
  //   }),
  //   // 揽收查看
  //   'POST /storehouse/weighingPackage/getByReceiveIdList': Mock.mock({
  //     success: true,
  //     code: 200,
  //     messageEn: '成功',
  //     messageCn: '成功',
  //     data: [
  //       {
  //         nums: 40,
  //         onlineStatus: 0,
  //         receiveRecordId: 123,
  //         weightPackageId: 123,
  //       },
  //       {
  //         nums: 50,
  //         onlineStatus: 1,
  //         receiveRecordId: 123,
  //         weightPackageId: 123,
  //       },
  //     ],
  //   }),
  //   //清单详情列表
  //   'POST /storehouse/weighingPackage/selectListDetailsPage': Mock.mock({
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
  //           /**
  //            * 包裹编号
  //            */
  //           packageNumber: Random.id(),
  //           /**
  //            * 仓库名称
  //            */
  //           storageName: '深圳仓',
  //           /**
  //            * 物流名字
  //            */
  //           logisticsCompany: '@name',
  //           /**
  //            * 揽件出库编号
  //            */
  //           receiveNumber: Random.id(),
  //           /**
  //            * 包裹数量
  //            */
  //           'packageQuantity|10-100': 100,
  //           /**
  //            * 净重(KG)
  //            */
  //           'netWeight|10-100': 100,
  //           /**
  //            * 毛重(KG)
  //            */
  //           'grossWeight|10-100': 100,
  //           /**
  //            * 打印时间
  //            */
  //           printAt: '@datetime',
  //           /**
  //            * 打印人
  //            */
  //           printBy: '@name',
  //           /**
  //            * 未上网(票数)
  //            */
  //           'notOnlineNum|10-100': 100,
  //           /**
  //            * 已上网(票数)
  //            */
  //           'onlineNum|10-100': 100,
  //         },
  //       ],
  //     },
  //   }),
  //   //货代详情列表
  //   'POST /storehouse/weighingPackage/selectBagDetailsPage': Mock.mock({
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
  //           /**
  //            * 订单号
  //            */
  //           orderId: Random.id(),
  //           /**
  //            * 运单号
  //            */
  //           logisticsTrackingNumber: Random.id(),
  //           /**
  //            * 包裹编号
  //            */
  //           packageNumber: Random.id(),
  //           /**
  //            * 揽收日期
  //            */
  //           collectionDate: '@datetime',
  //           /**
  //            * 签收国
  //            */
  //           signingCountry: '@name',
  //           /**
  //            * 物流名字
  //            */
  //           logisticsCompany: '@name',
  //           /**
  //            * 物流方式
  //            */
  //           logisticsChannel: '@name',
  //           /**
  //            * CJ追踪号
  //            */
  //           cjTrackingNumber: Random.id(),
  //           /**
  //            * 出库重量
  //            */
  //           'weight|10-100': 100,
  //           /**
  //            * 出库时间
  //            */
  //           weightAt: '@datetime',
  //           /**
  //            * 0 待上网  1 已上网
  //            */
  //           'onlineStatus|0-1': 1,
  //           /**
  //            * 仓库名称
  //            */
  //           storageName: '深圳仓',
  //           /**
  //            * 称重包裹id
  //            */
  //           weightPackageId: Random.id(),
  //           /**
  //            * 揽收记录id
  //            */
  //           receiveRecordId: Random.id(),
  //         },
  //       ],
  //     },
  //   }),
  //   // 货代详情导出
  //   'POST /storehouse/weighingPackage/exportBagDetails': Mock.mock({
  //     success: true,
  //     code: 200,
  //     messageEn: '成功',
  //     messageCn: '成功',
  //     data: true,
  //   }),
  //   // 货代详情-批量修改
  //   'POST /storehouse/weighingPackage/batchRepairNewInternetStatus': Mock.mock({
  //     success: true,
  //     code: 200,
  //     messageEn: '成功',
  //     messageCn: '成功',
  //     data: true,
  //   }),
  //   //揽件编辑-获取详情
  //   'POST /storehouse/weighingPackage/getReceiveRecord': Mock.mock({
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
  //   // 导入修改上网状态
  //   'POST /storehouse/weighingPackage/importAndModifyInternetStatus': Mock.mock({
  //     success: true,
  //     code: 200,
  //     messageEn: '成功',
  //     messageCn: '成功',
  //     data: true,
  //   }),
};
