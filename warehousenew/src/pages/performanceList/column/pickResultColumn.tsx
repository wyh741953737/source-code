import React from 'react';
import { defaultColumns } from '@/utils';
import { Space, Button } from 'antd';
import { history } from 'umi';
import { namespace } from '@/models/performanceList';

/*!
 * 绩效列表-拣货表头
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
      title: '单品批次数',
      dataIndex: 'singleBatchNum',
      key: 'singleBatchNum',
    },
    {
      title: '单品商品数',
      dataIndex: 'singleProductNum',
      key: 'singleProductNum',
    },
    {
      title: '单品库位数',
      dataIndex: 'singleLocationNum',
      key: 'singleLocationNum',
    },
    {
      title: '单品sku数',
      dataIndex: 'singleSkuNum',
      key: 'singleSkuNum',
    },
    {
      title: '单品变体sku数',
      dataIndex: 'singleStanNum',
      key: 'singleStanNum',
    },
    {
      title: '多品批次数',
      dataIndex: 'multiBatchNum',
      key: 'multiBatchNum',
    },
    {
      title: '多品商品数',
      dataIndex: 'multiProductNum',
      key: 'multiProductNum',
    },
    {
      title: '多品库位数',
      dataIndex: 'multiLocationNum',
      key: 'multiLocationNum',
    },
    {
      title: '多品sku数',
      dataIndex: 'multiSkuNum',
      key: 'multiSkuNum',
    },
    {
      title: '多品变体sku数',
      dataIndex: 'multiStanNum',
      key: 'multiStanNum',
    },
    {
      title: '总距离(米)',
      dataIndex: 'allDistance',
      key: 'allDistance',
    },
    {
      title: '总重量(g)',
      dataIndex: 'allWeight',
      key: 'allWeight',
    },
    {
      title: '总体积(cm^3)',
      dataIndex: 'allVolume',
      key: 'allVolume',
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
