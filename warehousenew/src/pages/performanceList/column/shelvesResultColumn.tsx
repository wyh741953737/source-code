import React from 'react';
import { defaultColumns } from '@/utils';
import { Space, Button } from 'antd';
import { history } from 'umi';
import { namespace } from '@/models/performanceList';

/*!
 * 绩效列表-上架表头
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
      title: '上架变体数',
      dataIndex: 'skuStanCount',
      key: 'skuStanCount',
    },
    {
      title: '商品数量',
      dataIndex: 'productCount',
      key: 'productCount',
    },
    {
      title: '上架重量(g)',
      dataIndex: 'weightNum',
      key: 'weightNum',
    },
    {
      title: '上架体积(cm^3)',
      dataIndex: 'volumeNum',
      key: 'volumeNum',
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
