import React from 'react';
import { defaultColumns } from '@/utils';
import { Space, Button } from 'antd';
import { history } from 'umi';
import { namespace } from '@/models/performanceList';
/*!
 * 绩效列表-入库称重表头
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
      title: '称重批次',
      dataIndex: 'batchNumberCount',
      key: 'batchNumberCount',
    },
    {
      title: '称重次数',
      dataIndex: 'weighCount',
      key: 'weighCount',
    },
    {
      title: '修改重量次数',
      dataIndex: 'modifyWeighCount',
      key: 'modifyWeighCount',
    },
    {
      title: '修改体积次数',
      dataIndex: 'modifyVolumeCount',
      key: 'modifyVolumeCount',
    },
    {
      title: '合格数量',
      dataIndex: 'qualifiedCount',
      key: 'qualifiedCount',
    },
    // {
    //   title: '次品数量',
    //   dataIndex: 'defectiveCount',
    //   key: 'defectiveCount',
    // },
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
