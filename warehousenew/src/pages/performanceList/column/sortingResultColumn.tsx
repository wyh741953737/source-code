import React from 'react';
import { defaultColumns } from '@/utils';
import { Space, Button } from 'antd';
import { history } from 'umi';
import { namespace } from '@/models/performanceList';

/*!
 * 绩效列表-分拣表头
 * 20021-01-15
 */

export default (editModal: any, dispatch: Function) => {
  return defaultColumns([
    {
      title: '排名',
      dataIndex: 'sortIndex',
      key: 'sortIndex',
      render: (text: any, record: any, index: number) => {
        return index + 1;
      },
    },
    {
      title: '操作人',
      dataIndex: 'employeeName',
      key: 'employeeName',
    },
    {
      title: '分拣商品总数量',
      dataIndex: 'goodsCount',
      key: 'goodsCount',
    },
    {
      title: '批次号数量',
      dataIndex: 'batchCount',
      key: 'batchCount',
    },
    {
      title: '单品变体sku商品数量',
      dataIndex: 'singleSkuStanCount',
      key: 'singleSkuStanCount',
    },
    {
      title: '多品变体sku商品数量',
      dataIndex: 'multiSkuStanCount',
      key: 'multiSkuStanCount',
    },
    {
      title: '包装多品商品批次数量',
      dataIndex: 'packageProductCount',
      key: 'packageProductCount',
    },
    {
      title: '验单不成功数',
      dataIndex: 'checklistUnsuccessfulNum',
      key: 'checklistUnsuccessfulNum',
    },
    {
      title: '日平均每小时积分',
      dataIndex: 'averageHour',
      key: 'averageHour',
    },
    {
      title: '总积分',
      dataIndex: 'score',
      key: 'score',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 150,
      align: 'left',
      fixed: 'right',
      render: (text: number, record: any) => {
        return (
          <Space direction="horizontal">
            <Button
              size="small"
              type="primary"
              onClick={() => {
                editModal.show(record);
              }}
            >
              变更
            </Button>
            <Button
              size="small"
              type="primary"
              onClick={() => {
                dispatch({
                  type: `${namespace}/_changecurrentItem`,
                  payload: { currentItem: record },
                });
                history.push(
                  `/${namespace}/performanceLog/${record.employeeId}`,
                );
              }}
            >
              查看
            </Button>
          </Space>
        );
      },
    },
  ]);
};
