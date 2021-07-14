import Mock from 'mockjs';

const { Random } = Mock;
export default {
  // 打包明细记录
  'POST /storehouse/packDetailRecords/list': Mock.mock({
    success: true,
    code: 200,
    messageEn: '成功',
    messageCn: '成功',
    data: {
      pageSize: 10,
      pageNumber: 1,
      totalRecords: 10,
      totalPages: 1,
      'content|10': [
        {
          // 属性 id 是一个自增数，起始值为 1，每次增 1
          'id|+1': 1,
          image:
            'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fvsd-picture.cdn.bcebos.com%2F8d02769e80d7dd643320b83cfa9bcaa52240dfb1.jpg&refer=http%3A%2F%2Fvsd-picture.cdn.bcebos.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1624782132&t=bc6538812e4651bfb86aadd9c08a2a60',
          sku: '@guid',
          variantNum: '@guid(5)',
          variantKeyMap: '{"颜色":"color"}',
          batchNumber: '@id(6)',
          storageName: '金华仓',
          storageId: '@guid(10)',
          deductionLocation: 'A-10-21',
          'packQuantity|1-100': 1,
          goodsName: '@name()',
          'isService|0-1': 1,
          orderNumber: '@id(8)',
          logisticsTrackingNumber: '@guid(9)',
          packMan: '@name()',
          deductionContainer: 'B-01-01',
          packTime: '@datetime',
        },
      ],
    },
  }),

  // 上架明细记录
  'POST /storehouse/shelfDetailRecords/list': Mock.mock({
    success: true,
    code: 200,
    messageEn: '成功',
    messageCn: '成功',
    data: {
      pageSize: 10,
      pageNumber: 1,
      totalRecords: 10,
      totalPages: 1,
      'content|10': [
        {
          // 属性 id 是一个自增数，起始值为 1，每次增 1
          'id|+1': 1,
          image:
            'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fvsd-picture.cdn.bcebos.com%2F8d02769e80d7dd643320b83cfa9bcaa52240dfb1.jpg&refer=http%3A%2F%2Fvsd-picture.cdn.bcebos.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1624782132&t=bc6538812e4651bfb86aadd9c08a2a60',
          sku: '@guid',
          variantNum: '@guid(5)',
          variantKeyMap: '{"颜色":"color"}',
          batchNumber: '@id(6)',
          storageName: '金华仓',
          storageId: '@guid(10)',

          'inventoryQuantity|1-100': 5,
          shelfLocation: 'A-10-21',
          goodsName: '@name()',
          'isService|0-1': 1,
          shelfNumber: '@id(8)',
          shelfMan: '@name()',
          shelfContainer: 'B-01-01',
          shelfTime: '@datetime',
          'avaliableStockQuantity|1-100': 1,
        },
      ],
    },
  }),
};
