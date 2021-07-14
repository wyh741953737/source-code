// import Mock from 'mockjs';

// const { Random } = Mock;
// export default {
//   // 查询列表
//   'POST /storehouse/performanceRule/getRuleList': Mock.mock({
//     success: true,
//     code: 200,
//     messageEn: '成功',
//     messageCn: '成功',
//     data: {
//       group: 2,
//       'receiveResult|2': [
//         {
//           // 属性 id 是一个自增数，起始值为 1，每次增 1
//           'id|+1': 1,
//           /**类型1-分类,2-sku	 */
//           'type|1': 1,
//           /** 状态(0:启用；1:已删除) */
//           'status|0-1': 1,

//           /**分类或sku ID */
//           categorySku: '0,1,2,1,4',

//           /** 类目或sku ID名称 */
//           categorySkuName: '0,1,2,1,4',

//           /**包裹数量规则 */
//           packageNum: '0,1,2,1,4',

//           /**sku数量规则 */
//           skuNum: '0,1,2,1,4',

//           /**变体总数(个)规则 */
//           variantNum: '0,1,2,1,4',

//           /**对应采购订单数量规则 */
//           caigouOrderNum: '0,1,2,1,4',
//         },
//       ],
//       'distributeResult|2': [
//         {
//           // 属性 id 是一个自增数，起始值为 1，每次增 1
//           'id|+1': 1,
//           /**类型1-分类,2-sku	 */
//           'type|1': 1,
//           /** 状态(0:启用；1:已删除) */
//           'status|0-1': 1,

//           /**分类或sku ID */
//           categorySku: '0,2,1,5,4',

//           /**类目或sku ID名称 */
//           categorySkuName: '0,2,1,5,4',

//           /**sku分标商品数量 */
//           skuNum: '0,2,1,5,4',

//           /**sku变体数量规则 */
//           skuVariantNum: '0,2,1,5,4',

//           /**到货数量规则 */
//           arrivalGoodsNum: '0,2,1,5,4',

//           /**合格数量规则 */
//           qualifiedNum: '0,2,1,5,4',

//           /**次品数量规则 */
//           ungradedProductsNum: '0,2,1,5,4',

//           /**少货数量规则 */
//           lessGoodsNum: '0,2,1,5,4',

//           /**多货数量规则 */
//           multipleGoodsNum: '0,2,1,5,4',
//         },
//       ],
//       'inspectionResult|2': [
//         {
//           // 属性 id 是一个自增数，起始值为 1，每次增 1
//           'id|+1': 1,
//           /**类型1-分类,2-sku	 */
//           'type|1': 1,
//           /** 状态(0:启用；1:已删除) */
//           'status|0-1': 1,

//           /**分类或sku */
//           categorySku: '2,1,3,4,5',

//           /**类目或sku */

//           categorySkuName: '2,1,3,4,5',

//           /**领批次数量规则 */

//           collarBatchCount: '2,1,3,4,5',

//           /**商品总数量规则 */

//           productAllCount: '2,1,3,4,5',

//           /**sku总数量规则 */

//           skuAllCount: '2,1,3,4,5',

//           /**sku变体数量规则 */

//           skuStanCount: '2,1,3,4,5',

//           /**到货数量 */

//           qualifiedNum: '2,1,3,4,5',

//           /**次品数量规则 */

//           ungradedProductsNum: '2,1,3,4,5',

//           /**少货数量规则 */

//           lessGoodsNum: '2,1,3,4,5',

//           /**多货数量规则 */

//           multipleGoodsNum: '2,1,3,4,5',
//         },
//       ],
//       'weighInResult|2': [
//         {
//           // 属性 id 是一个自增数，起始值为 1，每次增 1
//           'id|+1': 1,
//           /**类型1-分类,2-sku	 */
//           'type|1': 1,
//           /** 状态(0:启用；1:已删除) */
//           'status|0-1': 1,

//           /**分类或sku */
//           categorySku: '2,4,1,1,0',

//           /**类目或sku */

//           categorySkuName: '2,4,1,1,0',

//           /**批次号规则 */

//           batchNumber: '2,4,1,1,0',

//           /**称重次数规则 */

//           weighTotalCount: '2,4,1,1,0',

//           /**修改重量次数规则 */

//           modifyWeightCount: '2,4,1,1,0',

//           /**修改体积次数规则 */

//           modifyVolumeCount: '2,4,1,1,0',

//           /**称重数量规则 */

//           weighNum: '2,4,1,1,0',

//           /**合格数量 */

//           qualifiedNum: '2,4,1,1,0',

//           /**次品数量规则 */

//           ungradedProductsNum: '2,4,1,1,0',

//           /**少货数量规则 */

//           lessGoodsNum: '2,4,1,1,0',

//           /**多货数量规则 */

//           multipleGoodsNum: '2,4,1,1,0',
//         },
//       ],
//       'weighOutResult|2': [
//         {
//           // 属性 id 是一个自增数，起始值为 1，每次增 1
//           'id|+1': 1,
//           /**类型1-分类,2-sku	 */
//           'type|1': 1,
//           /** 状态(0:启用；1:已删除) */
//           'status|0-1': 1,

//           /**分类或sku ID */
//           categorySku: '2,3,1,1,4',

//           /**类目或sku ID名称 */
//           categorySkuName: '2,3,1,1,4',

//           /**包裹总数量规则 */
//           packingTotalNum: '2,3,1,1,4',

//           /**包裹净重(千克)规则 */
//           packingNetWeight: '2,3,1,1,4',

//           /**包裹毛重(立方米)规则 */
//           packingRoughWeight: '2,3,1,1,4',

//           /**体积（立方米） */
//           volumeCount: '2,3,1,1,4',
//         },
//       ],
//       'shelvesResult|2': [
//         {
//           // 属性 id 是一个自增数，起始值为 1，每次增 1
//           'id|+1': 1,
//           /**类型1-分类,2-sku	 */
//           'type|1': 1,
//           /** 状态(0:启用；1:已删除) */
//           'status|0-1': 1,

//           /**分类或sku */
//           categorySku: '2,1,2,3,1',

//           /**类目或sku */
//           categorySkuName: '2,1,2,3,1',

//           /**sku变体数量 */
//           skuStanCount: '2,1,2,3,1',

//           /**上架重量规则 */
//           weighNum: '2,1,2,3,1',

//           /**上架体积规则 */
//           volumeNum: '2,1,2,3,1',
//         },
//       ],
//       pickResult: [
//         {
//           // 属性 id 是一个自增数，起始值为 1，每次增 1
//           'id|+1': 1,
//           /**类型1-分类,2-sku	 */
//           'type|1': 1,
//           /** 状态(0:启用；1:已删除) */
//           'status|0-1': 1,

//           /**分类或sku */
//           categorySku: '1,2,3,5,6',

//           /**类目或sku */
//           categorySkuName: '1,2,3,5,6',

//           /**单品商品数规则 */
//           singleProductNum: '1,2,3,5,6',

//           /**单品批次数规则 */
//           singleBatchNum: '1,2,3,5,6',

//           /**单品库位数规则 */
//           singleLocationNum: '1,2,3,5,6',

//           /**单品sku数规则 */
//           singleSkuNum: '1,2,3,5,6',

//           /**单品sku变体数规则 */
//           singleStanNum: '1,2,3,5,6',

//           /**多品商品数规则 */
//           multiProductNum: '1,2,3,5,6',

//           /**多品批次数规则 */
//           multiBatchNum: '1,2,3,5,6',

//           /**多品库位数规则 */
//           multiLocationNum: '1,2,3,5,6',

//           /**多品sku数规则 */
//           multiSkuNum: '1,2,3,5,6',

//           /**多品sku变体数规则 */
//           multiStanNum: '1,2,3,5,6',

//           /** 总重量(g)规则 */
//           allWeight: '1,2,3,5,6',

//           /**总体积(cm)规则 */
//           allVolume: '1,2,3,5,6',

//           /**验单错误数量 */
//           checklistUnsuccessfulNum: '1,2,3,5,6',

//           /**总距离(米) */
//           allDistance: '1,2,3,5,6',
//         },
//       ],
//       sortingResult: [
//         {
//           'id|+1': 1,
//           /**类型1-分类,2-sku	 */
//           'type|1': 1,
//           /** 状态(0:启用；1:已删除) */
//           'status|0-1': 1,

//           /**分类或sku*/
//           categorySku: '1,2,3,4,5',

//           /**类目或sku*/

//           categorySkuName: '1,2,3,4,5',

//           /**单品批次商品数量（个）*/

//           goodsCount: '1,2,3,4,5',

//           /**批次数量（个）*/
//           batchCount: '1,2,3,4,5',

//           /**单品变体sku数量（个）*/
//           singleSkuStanCount: '1,2,3,4,5',

//           /**多品变体sku数量（个）*/
//           multiSkuStanCount: '1,2,3,4,5',

//           /**包装多品批次商品数量（个）*/
//           packageProductCount: '1,2,3,4,5',

//           /**验单错误数量*/
//           checklistUnsuccessfulNum: '1,2,3,4,5',
//         },
//       ],
//       checkBillResult: [
//         {
//           'id|+1': 1,
//           /**类型1-分类,2-sku	 */
//           'type|1': 1,
//           /** 状态(0:启用；1:已删除) */
//           'status|0-1': 1,

//           /**分类或sku */
//           categorySku: '1,2,3,4,6',

//           /**类目或sku */
//           categorySkuName: '1,2,3,4,6',

//           /**订单数量（个） */
//           orderCount: '1,2,3,4,6',

//           /**商品数量（个） */
//           productCount: '1,2,3,4,6',

//           /**包装商品数量（个） */
//           packProductCount: '1,2,3,4,6',

//           /**验单错误数量 */
//           checklistUnsuccessfulNum: '1,2,3,4,6',
//         },
//       ],
//       packageResult: [
//         {
//           'id|+1': 1,
//           /**类型1-分类,2-sku	 */
//           'type|1': 1,
//           /** 状态(0:启用；1:已删除) */
//           'status|0-1': 1,

//           /**分类或sku */
//           categorySku: '2,1,4,2,5',

//           /**类目或sku */
//           categorySkuName: '2,1,4,2,5',

//           /**打包面单数 */
//           sheetCount: '2,1,4,2,5',

//           /**商品数量（个） */
//           productCount: '2,1,4,2,5',

//           /**体积（平方米） */
//           volumeCount: '2,1,4,2,5',

//           /**重量 */
//           weightNum: '2,1,4,2,5',
//         },
//       ],
//     },
//   }),

//   // 绩效规则新增编辑
//   'POST /storehouse/performanceRule/addOrUpdateForRuleList': Mock.mock({
//     success: true,
//     code: 200,
//     messageEn: '处理成功',
//     messageCn: '处理成功',
//     data: true,
//   }),
// };
