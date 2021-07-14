// import Mock from 'mockjs';

// const { Random } = Mock;
// export default {
//   // 查询列表
//   'POST /storehouse/deductionRules/getDeductionRuleList': Mock.mock({
//     success: true,
//     code: 200,
//     messageEn: '成功',
//     messageCn: '成功',
//     'data|3': [
//       {
//         // 属性 id 是一个自增数，起始值为 1，每次增 1
//         'id|+1': 1,
//         name: '@name',
//         'type|1-2': 1,
//         storehouseId: '522d3c01c75e4b819ebd31e854841e6c',
//         storehouseName: '金华仓',
//         'status|0-1': 1,
//         createAt: '@datetime',
//         createBy: '@name',
//         updateAt: '@datetime',
//         updateBy: '@name',
//         'firstOrder|1-2': 1,
//         'firstCustomer|1-2': 1,
//         username: '@name',
//         storehouseRuleRelationDTOList: [
//           {
//             ruleId: '20003',
//             ruleName: '代发订单（多品）',
//             ruleRank: 2,
//           },
//           {
//             ruleId: '20002',
//             ruleName: '代发订单（单品）',
//             ruleRank: 1,
//           },
//           {
//             ruleId: '20004',
//             ruleName: '直发订单',
//             ruleRank: 3,
//           },
//           {
//             ruleId: '20005',
//             ruleName: '直发订单（私有）',
//             ruleRank: 4,
//           },
//           {
//             ruleId: '20001',
//             ruleName: '订单付款时间',
//             ruleRank: 5,
//           },
//         ],
//       },
//     ],
//   }),

//   // 新增抵扣规则
//   'POST /storehouse/deductionRules/addDeductionRule': Mock.mock({
//     success: true,
//     code: 200,
//     messageEn: '处理成功',
//     messageCn: '处理成功',
//     data: true,
//   }),
//   // 修改抵扣规则
//   'POST /storehouse/deductionRules/updateDeductionRule': Mock.mock({
//     success: true,
//     code: 200,
//     messageEn: '处理成功',
//     messageCn: '处理成功',
//     data: true,
//   }),

//   // 停用启用
//   'POST /storehouse/deductionRules/disableOrEnableRule': Mock.mock({
//     success: true,
//     code: 200,
//     messageEn: '处理成功',
//     messageCn: '处理成功',
//     data: true,
//   }),
// };
