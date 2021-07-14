// import Mock from 'mockjs';

// const { Random } = Mock;
// export default {
//   // 查询列表
//   'POST /scheduling/selectSchedulingPage': Mock.mock({
//     success: true,
//     code: 200,
//     messageEn: '成功',
//     messageCn: '成功',
//     data: {
//       pageSize: 10,
//       pageNumber: 1,
//       totalRecords: 20,
//       totalPages: 2,
//       'content|10': [
//         {
//           // 属性 id 是一个自增数，起始值为 1，每次增 1
//           'id|+1': 1,
//           dispatchNumber: '@id',
//           remarks: '@word(5,50)',
//           'status|1-3': 1,
//           createBy: '@name',
//           createAt: '@datetime',
//           sourceStorehouseName: '义乌直发仓',
//           sourceStorehouseId: '4c3ef4dc8a3f44f7be7c90ff538cdf7f',
//           targetStorehouseId: '08898c4735bf43068d5d677c1d217ab0',
//           targetStorehouseName: '深圳仓',
//           goodsLoanName: '@word(5,10)',
//           'schedulingPackageList|3': [
//             {
//               'id|+1': 1,
//               'packProperty|1-2': 1,
//               parcelNumber: '@id',
//               trackingNumber: '@id',
//               'length|10-20': 20,
//               'width|10-20': 20,
//               'height|10-20': 20,
//               'weight|10-20': 20,
//               remarks: '@word(10,50)',
//               'status|1-2': 2,
//               createBy: '@name',
//               createAt: '@datetime',
//               schedulingId: '@id',
//               'mark|1': 1,
//             },
//           ],
//         },
//       ],
//     },
//   }),

//   // 添加调度任务
//   'POST /scheduling/saveScheduling': Mock.mock({
//     success: true,
//     code: 200,
//     messageEn: '处理成功',
//     messageCn: '处理成功',
//     data: true,
//   }),

//   // 编辑调度任务
//   'POST /scheduling/updateScheduling': Mock.mock({
//     success: true,
//     code: 200,
//     messageEn: '处理成功',
//     messageCn: '处理成功',
//     data: true,
//   }),

//   // 打印包裹编号
//   'POST /scheduling/printPackageNumber': Mock.mock({
//     success: true,
//     code: 200,
//     messageEn: '处理成功',
//     messageCn: '处理成功',
//     data: 'https:www.baidu.com',
//   }),

//   // 确认发货
//   'POST /scheduling/schedulingConfirmDelivery': Mock.mock({
//     success: true,
//     code: 200,
//     messageEn: '处理成功',
//     messageCn: '处理成功',
//     data: true,
//   }),

//   // 查看包裹详情
//   'POST /scheduling/getSchedulingPackageDetailById': Mock.mock({
//     success: true,
//     code: 200,
//     messageEn: '处理成功',
//     messageCn: '处理成功',
//     'data|5': [
//       {
//         /**调度类型：1、订单调度 2、库存调拨	 */
//         'schedulingType|1-2': 2,

//         /**包裹编号或运单号 */
//         parcelOrWaybillNumber: '@id(5,8)',

//         /**订单号 */
//         orderId: '@id(5,10)',

//         /**属性 */
//         property: '普货',

//         /**重量(KG) */
//         'weight|1-100': 100,

//         /**数量 */
//         'quantity|1-100': 100,

//         /**调度id */
//         schedulingPackageId: '@id(6,8)',
//       },
//     ],
//   }),

//   // 查看包裹日志
//   'POST /scheduling/getSchedulingLogList': Mock.mock({
//     success: true,
//     code: 200,
//     messageEn: '处理成功',
//     messageCn: '处理成功',
//     'data|5': [
//       {
//         /**主键id */
//         'id|+1': 1,

//         /**调拨单号 */
//         transferCode: '@id(5,10)',

//         /**操作人id */
//         createId: '@id(5,10)',

//         /**操作人名称 */
//         createBy: '@name',

//         /**操作时间 */
//         createAt: '@datetime',

//         /**操作内容 */
//         operationContent: '提交到已发货',

//         /**操作节点 */
//         'operationNode|1-100': 100,
//       },
//     ],
//   }),

//   // 删除包裹
//   'POST /scheduling/deletePackage': Mock.mock({
//     success: true,
//     code: 200,
//     messageEn: '处理成功',
//     messageCn: '处理成功',
//     data: true,
//   }),
//   // 拦截包裹
//   'POST /scheduling/interceptPackage': Mock.mock({
//     success: true,
//     code: 200,
//     messageEn: '处理成功',
//     messageCn: '处理成功',
//     data: true,
//   }),

//   // 已签收包裹列表
//   'POST /scheduling/signedPackagesList': Mock.mock({
//     success: true,
//     code: 200,
//     messageEn: '成功',
//     messageCn: '成功',
//     data: {
//       pageSize: 10,
//       pageNumber: 1,
//       totalRecords: 20,
//       totalPages: 2,
//       'content|10': [
//         {
//           // 属性 id 是一个自增数，起始值为 1，每次增 1
//           'id|+1': 1,
//           parcelNumber: '@id(5,10)',
//           remarks: '@word(5,50)',
//           receiptBy: '@name',
//           receiptAt: '@datetime',
//           trackingNumber: '@id(5,10)',
//         },
//       ],
//     },
//   }),

//   // 签收
//   'POST /scheduling/signFor': Mock.mock({
//     success: true,
//     code: 200,
//     messageEn: '处理成功',
//     messageCn: '处理成功',
//     data: {
//       /**包裹属性1、普货 2、非普货	*/ id: 1,
//       'packProperty|1-2': 2,

//       /**包裹编号*/

//       parcelNumber: '@id(5)',

//       /**追踪号*/

//       trackingNumber: '@id(8)',

//       /**尺寸：长*/

//       'length|1-100': 100,

//       /**尺寸：宽*/

//       'width|1-100': 100,

//       /**尺寸：高*/

//       'height|1-100': 100,

//       /**重量/KG*/

//       'weight|1-100': 100,

//       /**备注*/

//       remarks: '@word(5,10)',

//       /**标记1、拦截	*/

//       'mark|1': 1,

//       /**调度编号*/

//       schedulingNumber: '@id(10)',

//       /**转出仓名称*/

//       sourceStorehouseName: '@name(5,6)',

//       /**货贷名称*/

//       goodsLoanName: '@name(5,6)',

//       'detailResultList|3': [
//         {
//           /** 调度类型：1、订单调度 2、库存调拨	 */
//           'schedulingType|1-2': 2,

//           /**包裹编号或运单号 */
//           parcelOrWaybillNumber: '@id(8)',

//           /**订单号 */
//           orderId: '@id(8)',

//           /**属性 */
//           'property|1-2': 2,

//           /** 重量(KG)	 */
//           'weight|1-100': 100,

//           /**数量 */
//           'quantity|1-100': 100,

//           /**调度id */
//           schedulingPackageId: '@id(8)',
//         },
//       ],
//     },
//   }),

//   // 绩效日志列表
//   'POST /storehouse/performance/getPerformanceDetailList': Mock.mock({
//     success: true,
//     code: 200,
//     messageEn: '成功',
//     messageCn: '成功',
//     data: {
//       pageSize: 10,
//       pageNumber: 1,
//       totalRecords: 20,
//       totalPages: 2,
//       'content|10': [
//         {
//           // 属性 id 是一个自增数，起始值为 1，每次增 1
//           'id|+1': 1,
//           /**员工id*/
//           employeeId: '@id(5)',

//           /**员工名称*/

//           employeeName: '@name(5)',

//           /**仓库id*/

//           storehouseId: '@id(5)',

//           /**类别(1:签收;2:分标;3:质检;4:入库称重;5:上架;6:拣货;7:分拣;8:验单;9:打包;10:出库称重;)	*/

//           'type|1-10': 10,

//           /**变动分分数*/
//           'score|1-100': 100,

//           /**变动 1加 2减	*/

//           'scoreType|1-2': 2,

//           /**操作后总分*/

//           'totalScore|1-100': 100,

//           /**业务id*/

//           businessId: '@id(5)',

//           /**内容*/

//           content:
//             '当日签收包裹数量[361]个,采购单数量[361]单;当前包裹sku数量[1]个,变体数量[3]个',

//           /**操作人员工id*/

//           operatorId: '@id(5)',

//           /**创建时间*/

//           createAt: '@datetime',
//         },
//       ],
//     },
//   }),
// };
