import Mock from 'mockjs';

const { Random } = Mock;
export default {
  //包裹打印列表
  //   'POST /storehouse/weighingPackage/selectParcelPrintingPage': Mock.mock({
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
  //            * 订单id
  //            */
  //           orderId: Random.id(),
  //           /**
  //            * 出库单号
  //            */
  //           outboundOrder: Random.id(),
  //           /**
  //            * 仓库id
  //            */
  //           storageId: '08898c4735bf43068d5d677c1d217ab0',
  //           /**
  //            * 仓库名称
  //            */
  //           storageName: '深圳仓',
  //           /**
  //            * 物流渠道
  //            */
  //           logisticsChannel: Random.cname(),
  //           /**
  //            * 物流名字
  //            */
  //           logisticsCompany: Random.cname(),
  //           /**
  //            * 包裹数量
  //            */
  //           'packageQuantity|1-100': 100,
  //           /**
  //            * 电子秤型号
  //            */
  //           electronicScaleModel: 'YT123123',
  //           /**
  //            * 净重(KG)
  //            */
  //           'netWeight|1-100': 100,
  //           /**
  //            * 毛重(KG)
  //            */
  //           'grossWeight|1-100': 100,
  //           /**
  //            * 打印时间
  //            */
  //           printAt: '@datetime',
  //           /**
  //            * 打印人
  //            */
  //           printBy: Random.cname(),
  //           /**
  //            * 创建人
  //            */
  //           createBy: Random.cname(),
  //           /**
  //            * 创建时间
  //            */
  //           createAt: '@datetime',
  //           /**
  //            * 0 操作中、1 已暂停、2 已完成、3 已揽收
  //            */
  //           'status|0-3': 3,
  //           /**
  //            * 揽件记录id
  //            */
  //           receiveId: Random.id(),
  //           /**
  //            * 0 待上网  1 已上网
  //            */
  //           'onlineStatus|0-1': 1,
  //         },
  //       ],
  //     },
  //   }),
  //   // 更新包裹打印毛重
  //   'POST /storehouse/weighingPackage/updateParcelPrinting': Mock.mock({
  //     success: true,
  //     code: 200,
  //     messageEn: '成功',
  //     messageCn: '成功',
  //     data: true,
  //   }),
  //   // 更新包裹打印状态
  //   'POST /storehouse/weighingPackage/updateParcelPrintingStatus': Mock.mock({
  //     success: true,
  //     code: 200,
  //     messageEn: '成功',
  //     messageCn: '成功',
  //     data: true,
  //   }),
  //   // 新增包裹
  //   'POST /storehouse/weighingPackage/addParcelTrackingNumberInfo': Mock.mock({
  //     success: true,
  //     code: 200,
  //     messageEn: '成功',
  //     messageCn: '成功',
  //     data: true,
  //   }),
  //   // 验证追踪号
  //   'POST /storehouse/weighingPackage/getParcelTrackingNumberInfo': Mock.mock({
  //     success: true,
  //     code: 200,
  //     messageEn: '成功',
  //     messageCn: '成功',
  //     data: true,
  //   }),
  // 'POST /storehouse-sign-web/parcel/signForReceipt': Mock.mock({
  //   success: true,
  //   code: 200,
  //   messageEn: '成功',
  //   messageCn: '成功',
  //   data: {
  //     receiptProductList: [
  //       {
  //         // 属性 id 是一个自增数，起始值为 1，每次增 1
  //         'id|+1': 1,
  //         /**商品id */
  //         productId: Random.id(),
  //         /**变体id */
  //         variantId: Random.id(),
  //         /**变体sku */
  //         sku: Random.guid(),
  //         /**预计到货数量 */
  //         'quantity|1-100': 100,
  //         /**0：在途，1：部分入库,3：已入库,4：异常	 */
  //         'status|0-4': 4,
  //         /**入库编号 */
  //         putStorageNumber: Random.id(),
  //         /**商品图片 */
  //         image: Random.image('200x100', '#894FC4', '#FFF', 'png', '!'),
  //         /**短码 */
  //         shotNum: Random.id(),
  //         /**仓库id */
  //         storageId: Random.id(),
  //         /**仓库名称 */
  //         storageName: '深圳仓',
  //         /**1：采购入库，2：调货入库，3：客户退回入库，4：货代退回入库，5：服务商品入库，6：供应商商品入库 */
  //         'type|1-6': 6,
  //         /**包裹类型：0-普通包裹，1-个，2-包，3-供，4-包 */
  //         'packageType|0-4': 4,
  //         /**订单号 */
  //         orderNumber: Random.id(),
  //         /**供货商 */
  //         supplier: '@name()',
  //         /**备注 */
  //         remark: '@word()',
  //         /**采购人 */
  //         purchaser: '@name()',
  //         /**货主 */
  //         ownerGoods: '@name()',
  //         /**采购类型：0：非1688API，1：1688API，2：淘宝，3：天猫，4：线下 */
  //         'purchaserType|0-4': 4,
  //         /**物流追中号 */
  //         logisticsTrackingNumber: Random.id(),
  //       },
  //     ],
  //     packageResult: {
  //       /**商品名称 */
  //       productName: '@name()',
  //       /**仓库名称 */
  //       storageName: '@name()',
  //       /**批次号 */
  //       batchNumber: Random.id(),
  //       /**物流追踪号 */
  //       logisticsTrackingNumber: Random.id(),
  //       /**数量 */
  //       'quantity|1-100': 100,
  //       /**业务员姓名 */
  //       salesmanName: '@name()',
  //       /**客户名称 */
  //       customerName: '@name()',
  //       /**发货时间 */
  //       deliveryTime: '@datetime',
  //       /**粘贴费 */
  //       pasteFee: 100,
  //       /**质检费 */
  //       inspectionFee: 99,
  //       /**清点费 */
  //       countingFee: 98,
  //       /**处理费 */
  //       processingFee: 97,
  //       /**滞留费 */
  //       detentionFee: 96,
  //       /**装卸费 */
  //       loadingFee: 95,
  //       'detailsList|3': [
  //         {
  //           /**入库单详情信息id */
  //           id: Random.id(),
  //           /**变体sku */
  //           sku: Random.id(),
  //           /**商品图片 */
  //           image: Random.image('200x100', '#894FC4', '#FFF', 'png', '!'),
  //           /**预计到货数量 */
  //           'quantity|1-100': 100,
  //           /**损坏数量 （服务商品使用） */
  //           'damagedQuantity|1-100': 100,
  //         },
  //       ],
  //     },
  //   },
  // }),
};
