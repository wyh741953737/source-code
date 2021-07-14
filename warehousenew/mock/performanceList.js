// import Mock from 'mockjs';

// const { Random } = Mock;
// export default {
//   // 查询列表
//   'POST /storehouse/performance/getPerformanceList': Mock.mock({
//     success: true,
//     code: 200,
//     messageEn: '成功',
//     messageCn: '成功',
//     data: {
//       group: 2,
//       receiveResult: {
//         pageSize: 10,
//         pageNumber: 1,
//         totalRecords: 20,
//         totalPages: 2,
//         'content|10': [
//           {
//             // 属性 id 是一个自增数，起始值为 1，每次增 1
//             'id|+1': 1,
//             /**员工id */
//             employeeId: '@id(5)',

//             /**员工名称 */

//             employeeName: '@name(3,5)',

//             /**仓库id */

//             storehouseId: '@id(5)',

//             /**包裹数量(个) */

//             'packageCount|1-100': 100,

//             /**sku数量(个) */

//             'skuCount|1-100': 100,

//             /**变体数量(个) */

//             'stanCount|1-100': 100,

//             /**采购单数量(个) */

//             'orderCount|1-100': 100,

//             /**总分 */

//             'score|1-100': 100,

//             /**创建时间 */

//             createAt: '@datetime',

//             /**修改时间 */
//             updateAt: '@datetime',
//             'averageHour|1-100': 100,
//           },
//         ],
//       },
//       distributeResult: {
//         pageSize: 10,
//         pageNumber: 1,
//         totalRecords: 20,
//         totalPages: 2,
//         'content|10': [
//           {
//             // 属性 id 是一个自增数，起始值为 1，每次增 1
//             'id|+1': 1,
//             /**员工id */
//             employeeId: '@id(5)',

//             /**员工名称 */
//             employeeName: '@name(3,5)',

//             /**仓库id */
//             storehouseId: '@id(5)',

//             /**sku分标数量(个)	 */
//             'skuCount|1-100': 100,

//             /**变体数量(个) */
//             'stanCount|1-100': 100,

//             /**到货数量 */
//             'arrivalCount|1-100': 100,

//             /**合格数量 */
//             'qualifiedCount|1-100': 100,

//             /**次品数量 */
//             'defectiveCount|1-100': 100,

//             /**少货数量 */
//             'understockCount|1-100': 100,

//             /**多货数量 */
//             'overstockCount|1-100': 100,

//             /**总分 */
//             'score|1-100': 100,

//             /**创建时间 */
//             createAt: '@datetime',

//             /**修改时间 */
//             updateAt: '@datetime',
//             'averageHour|1-100': 100,
//           },
//         ],
//       },
//       inspectionResult: {
//         pageSize: 10,
//         pageNumber: 1,
//         totalRecords: 20,
//         totalPages: 2,
//         'content|10': [
//           {
//             // 属性 id 是一个自增数，起始值为 1，每次增 1
//             'id|+1': 1,
//             /**员工id */
//             employeeId: '@id(5)',

//             /**员工名称 */
//             employeeName: '@name(5,7)',

//             /**仓库id */
//             storehouseId: '@id(5)',

//             /**质检批次数量 */
//             'collarBatchCount|1-100': 100,

//             /**商品总数量 */
//             'productAllCount|1-100': 100,

//             /**sku总数量 */
//             'skuAllCount|1-100': 100,

//             /**sku变体数量 */
//             'skuStanCount|1-100': 100,

//             /**到货数量 */
//             'qualifiedCount|1-100': 100,

//             /**次品数量 */
//             'defectiveCount|1-100': 100,

//             /**少货数量 */
//             'understockCount|1-100': 100,

//             /**多货数量 */
//             'overstockCount|1-100': 100,

//             /**总分 */
//             'score|1-100': 100,

//             /**创建时间 */
//             createAt: '@datetime',

//             /**修改时间 */
//             updateAt: '@datetime',
//             'averageHour|1-100': 100,
//           },
//         ],
//       },
//       weighInResult: {
//         pageSize: 10,
//         pageNumber: 1,
//         totalRecords: 20,
//         totalPages: 2,
//         'content|10': [
//           {
//             // 属性 id 是一个自增数，起始值为 1，每次增 1
//             'id|+1': 1,
//             /**员工id */
//             employeeId: '@id(5)',

//             /**员工名称 */
//             employeeName: '@name(3,5)',

//             /**仓库id */
//             storehouseId: '@id(5)',

//             /**批次号数量 */
//             'batchNum|1-100': 100,

//             /**称重次数 */
//             'weighCount|1-100': 100,

//             /**修改重量次数 */
//             'modifyWeighCount|1-100': 100,

//             /**修改体积次数 */
//             'modifyVolumeCount|1-100': 100,

//             /**称重数量 */
//             'weighNum|1-100': 100,

//             /**合格数量 */
//             'qualifiedCount|1-100': 100,

//             /**次品数量 */
//             'defectiveCount|1-100': 100,

//             /**少货数量 */
//             'understockCount|1-100': 100,

//             /**多货数量 */
//             'overstockCount|1-100': 100,

//             /**总分 */
//             'score|1-100': 100,

//             /**创建时间 */
//             createAt: '@datetime',

//             /**修改时间 */
//             updateAt: '@datetime',
//             'averageHour|1-100': 100,
//           },
//         ],
//       },
//       weighOutResult: {
//         pageSize: 10,
//         pageNumber: 1,
//         totalRecords: 20,
//         totalPages: 2,
//         'content|10': [
//           {
//             // 属性 id 是一个自增数，起始值为 1，每次增 1
//             'id|+1': 1,
//             /**员工id */
//             employeeId: '@id(5)',

//             /**员工名称 */
//             employeeName: '@name(3,5)',

//             /**仓库id */
//             storehouseId: '@id(5)',

//             /**包裹总数量 */
//             'packageAllCount|1-100': 100,

//             /**包裹净重(千克) */
//             'packageWeightCount|1-100': 100,

//             /**包裹毛重(千克)	 */
//             'packageGrossWeightCount|1-100': 100,

//             /**体积（立方米） */
//             'volumeCount|1-100': 100,

//             /**总分 */
//             'score|1-100': 100,

//             /**创建时间 */
//             createAt: '@datetime',

//             /**修改时间 */
//             updateAt: '@datetime',
//             'averageHour|1-100': 100,
//           },
//         ],
//       },
//       shelvesResult: {
//         pageSize: 10,
//         pageNumber: 1,
//         totalRecords: 20,
//         totalPages: 2,
//         'content|10': [
//           {
//             // 属性 id 是一个自增数，起始值为 1，每次增 1
//             'id|+1': 1,
//             /**员工id */
//             employeeId: '@id(5)',

//             /**员工名称 */
//             employeeName: '@name(3,5)',

//             /**仓库id */
//             storehouseId: '@id(5)',

//             /**sku变体数量 */
//             'skuStanCount|1-100': 100,

//             /**上架重量（克） */
//             'weightNum|1-100': 100,

//             /**上架体积（平方米） */
//             'volumeNum|1-100': 100,

//             /**总分 */
//             'score|1-100': 100,

//             /**创建时间 */
//             createAt: '@datetime',

//             /**修改时间 */
//             updateAt: '@datetime',
//             'averageHour|1-100': 100,
//           },
//         ],
//       },
//       pickResult: {
//         pageSize: 10,
//         pageNumber: 1,
//         totalRecords: 20,
//         totalPages: 2,
//         'content|10': [
//           {
//             // 属性 id 是一个自增数，起始值为 1，每次增 1
//             'id|+1': 1,
//             /**员工id */
//             employeeId: '@id(5)',

//             /**员工名称 */

//             employeeName: '@name(3,5)',

//             /**仓库id */

//             storehouseId: '@id(5)',

//             /**单品商品数 */

//             'singleProductNum|1-100': 100,

//             /**单品批次数 */

//             'singleBatchNum|1-100': 100,

//             /**单品库位数 */

//             'singleLocationNum|1-100': 100,

//             /**单品sku数 */

//             'singleSkuNum|1-100': 100,

//             /**单品sku变体数 */

//             'singleStanNum|1-100': 100,

//             /**多品商品数 */

//             'multiProductNum|1-100': 100,

//             /**多品批次数 */

//             'multiBatchNum|1-100': 100,

//             /**多品库位数 */

//             'multiLocationNum|1-100': 100,

//             /**多品sku数 */

//             'multiSkuNum|1-100': 100,

//             /**多品sku变体数 */

//             'multiStanNum|1-100': 100,

//             /**总重量(Kg) */

//             'allWeight|1-100': 100,

//             /**总体积(立方米) */

//             'allVolume|1-100': 100,

//             /**总分 */

//             'score|1-100': 100,

//             /**创建时间 */

//             createAt: '@datetime',

//             /**修改时间 */

//             updateAt: '@datetime',
//             'averageHour|1-100': 100,
//             'checklistUnsuccessfulNum|1-100': 100,
//             'allDistance|1-100': 100,
//           },
//         ],
//       },
//       sortingResult: {
//         pageSize: 10,
//         pageNumber: 1,
//         totalRecords: 20,
//         totalPages: 2,
//         'content|10': [
//           {
//             // 属性 id 是一个自增数，起始值为 1，每次增 1
//             'id|+1': 1,
//             employeeId: '@id(5)',

//             /**分拣员name */

//             employeeName: '@name(3,5)',

//             /**仓库id */

//             storehouseId: '@id(5)',

//             /**分拣商品总数量（个） */

//             'singleBatchGoodsCount|1-100': 100,

//             /**批次数量（个） */

//             'batchCount|1-100': 100,

//             /**单品变体sku数量（个） */

//             'singleSkuStanCount|1-100': 100,

//             /**多品变体sku数量（个） */

//             'multiSkuStanCount|1-100': 100,

//             /**包装多品批次商品数量（个） */

//             'packageProductCount|1-100': 100,

//             /**总分 */

//             'score|1-100': 100,

//             /**创建时间 */

//             createAt: '@datetime',

//             /**修改时间 */

//             updateAt: '@datetime',
//             'averageHour|1-100': 100,
//           },
//         ],
//       },
//       checkBillResult: {
//         pageSize: 10,
//         pageNumber: 1,
//         totalRecords: 20,
//         totalPages: 2,
//         'content|10': [
//           {
//             // 属性 id 是一个自增数，起始值为 1，每次增 1
//             'id|+1': 1,
//             /**分拣员id */
//             employeeId: '@id(5)',

//             /**分拣员name */
//             employeeName: '@name(3,5)',

//             /**员工id */
//             employeeId: '@id(5)',

//             /**员工name */
//             employeeName: '@name(5)',

//             /**仓库id */
//             storehouseId: '@id(5)',

//             /**订单数量（个） */
//             'orderCount|1-100': 100,

//             /**商品数量（个） */
//             'productCount|1-100': 100,

//             /**包装商品数量（个） */
//             'packProductCount|1-100': 100,

//             /**验单错误数量 */
//             'checklistUnsuccessfulNum|1-100': 100,

//             /**日小时平均数 */
//             'averageHour|1-100': 100,

//             /**总分 */
//             'score|1-100': 100,

//             /**创建时间 */
//             createAt: '@datetime',
//           },
//         ],
//       },
//       packageResult: {
//         pageSize: 10,
//         pageNumber: 1,
//         totalRecords: 20,
//         totalPages: 2,
//         'content|10': [
//           {
//             // 属性 id 是一个自增数，起始值为 1，每次增 1
//             'id|+1': 1,
//             /**分拣员id */
//             employeeId: '@id(5)',

//             /**分拣员name */
//             employeeName: '@name(3,5)',

//             /**仓库id */
//             storehouseId: '@id(5)',

//             /**打包面单数 */
//             'sheetCount|1-100': 100,

//             /**商品数量（个） */
//             'productCount|1-100': 100,

//             /**体积（平方米） */
//             'volumeCount|1-100': 100,

//             /**重量 */
//             'weightNum|1-100': 100,

//             /**总分 */
//             'score|1-100': 100,

//             /**创建时间 */
//             createAt: '@datetime',

//             /**修改时间 */
//             updateAt: '@datetime',
//             'averageHour|1-100': 100,
//           },
//         ],
//       },
//     },
//   }),

//   // 绩效变更
//   'POST /storehouse/performance/pointsChange': Mock.mock({
//     success: true,
//     code: 200,
//     messageEn: '处理成功',
//     messageCn: '处理成功',
//     data: true,
//   }),
//   // 绩效导出
//   'POST /storehouse/performance/exportPerformance': Mock.mock({
//     success: true,
//     code: 200,
//     messageEn: '处理成功',
//     messageCn: '处理成功',
//     data: '123131',
//   }),
// };
