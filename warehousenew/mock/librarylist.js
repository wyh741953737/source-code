import Mock from 'mockjs';

const { Random } = Mock;
export default {
  // 出库单列表
  'POST /storehouse/library/list': Mock.mock({
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
          batchNumber: '@id()',
          sku: '@guid()',
          'quantity|1-100': 1,
          'productQuantity|1-100': 1,
          'productLocation|1-100': 1,
          'status|0-2': 1,
          checkman: '@name()',
          beginDate: '@datetime',
          completeDate: '@datetime',
        },
      ],
    },
  }),
};
