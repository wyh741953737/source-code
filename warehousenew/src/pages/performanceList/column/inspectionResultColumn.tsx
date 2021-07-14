import React from 'react';
import { defaultColumns } from '@/utils';
import { Space, Button } from 'antd';
import { history } from 'umi';
import { namespace } from '@/models/performanceList';

/*!
 * 绩效列表-质检表头
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
      title: '质检批次',
      dataIndex: 'collarBatchCount',
      key: 'collarBatchCount',
    },
    {
      title: '商品总数',
      dataIndex: 'productAllCount',
      key: 'productAllCount',
    },
    {
      title: '质检sku数量',
      dataIndex: 'skuAllCount',
      key: 'skuAllCount',
    },
    {
      title: '变体sku数量',
      dataIndex: 'skuStanCount',
      key: 'skuStanCount',
    },
    {
      title: '合格数量',
      dataIndex: 'qualifiedCount',
      key: 'qualifiedCount',
    },
    {
      title: '次品数量',
      dataIndex: 'defectiveCount',
      key: 'defectiveCount',
    },
    {
      title: '少货数量',
      dataIndex: 'understockCount',
      key: 'understockCount',
    },
    {
      title: '多货数量',
      dataIndex: 'overstockCount',
      key: 'overstockCount',
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
