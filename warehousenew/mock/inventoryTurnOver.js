import Mock from 'mockjs';

const { Random } = Mock;
export default {
  // 查询sku列表
  'POST /storehouse/storehouseInventoryTurnover/getInventoryTurnoverPage': Mock.mock(
    {
      success: true,
      code: 200,
      messageEn: '成功',
      messageCn: '成功',
      data: {
        pageSize: 10,
        pageNumber: 1,
        totalRecords: 30,
        totalPages: 3,
        'content|30': [
          {
            // 属性 id 是一个自增数，起始值为 1，每次增 1
            'id|+1': 1,

            storehouseId: '62cfedee247c4be1a0d497bfd2cf65ae',
            'variantId|+1': 1,
            sku: '@guid()',
            shortCode: '@word(3,5)',
            'notDeductionDay|1-100': 100,
            customerName: '@name()',
            image: Random.image('200x100', '#894FC4', '#FFF', 'png', '!'),
            productId: '@id()',
            'availableQuantity|1-100': 100,
            lastDeductionAt: '@datetime()',
            'notDeductionDay|1-100': 100,
            'weekOutQuantity|1-100': 100,
            'monthOutQuantity|1-100': 100,
            'threeMonthOutQuantity|1-100': 100,
            'weekTurnoverDay|1-100': 100,
            'monthTurnoverDay|1-100': 100,
            'threeMonthTurnoverDay|1-100': 100,
            variantKeyMap: '{"颜色":"color"}',
          },
        ],
      },
    },
  ),

  // 查询商品列表
  'POST /storehouse/storehouseInventoryTurnoverProduct/getInventoryTurnoverProductPage': Mock.mock(
    {
      success: true,
      code: 200,
      messageEn: '成功',
      messageCn: '成功',
      data: {
        pageSize: 10,
        pageNumber: 1,
        totalRecords: 30,
        totalPages: 3,
        'content|30': [
          {
            // 属性 id 是一个自增数，起始值为 1，每次增 1
            'id|+1': 1,

            storehouseId: '62cfedee247c4be1a0d497bfd2cf65ae',
            'productId|+1': 1,
            sku: '@guid()',
            shortCode: '@word(3,5)',
            'notDeductionDay|1-100': 100,
            customerName: '@name()',
            image: Random.image('200x100', '#894FC4', '#FFF', 'png', '!'),
            'availableQuantity|1-100': 100,
            lastDeductionAt: '@datetime()',
            'notDeductionDay|1-100': 100,
            'weekOutQuantity|1-100': 100,
            'monthOutQuantity|1-100': 100,
            'threeMonthOutQuantity|1-100': 100,
            'weekTurnoverDay|1-100': 100,
            'monthTurnoverDay|1-100': 100,
            'threeMonthTurnoverDay|1-100': 100,
          },
        ],
      },
    },
  ),

  //理货详情查询
  'POST /storehouse/storehouseTurnoverDetail/getTurnoverDetailPage': Mock.mock({
    success: true,
    code: 200,
    messageEn: '成功',
    messageCn: '成功',
    'data|5': [
      {
        /**主键ID */
        'id|+1': 1,

        'availableQuantity|1-100': 100,
        customerName: '@name()',
        customerNum: '@guid()',
        containerNum: '@word(3)',
        'isServiceGoods|1-2': 2,
        shortCode: '@word(3)',
        storageName: '金华仓-2',
        storehouseId: '62cfedee247c4be1a0d497bfd2cf65ae',
        'tallyVolume|1-100': 100,
        'type|1-4': 1,
        variantId: '@id()',
        locationId: '@id()',
        locationName: '@name()',
        toLocationName: '@name()',
        id: '@id()',
        sku: '@id()',
      },
    ],
  }),

  // 生活理货任务
  'POST /storehouse/storehouseTurnover/addStorehouseTally': Mock.mock({
    success: true,
    code: 200,
    messageEn: '成功',
    messageCn: '成功',
    data: true,
  }),
};
