import React from 'react';
import { defaultColumns } from '@/utils';
import { Space, Button, Badge } from 'antd';
import { history } from 'umi';
import { namespace } from '@/models/performanceConfig';
import { PERFORMANCECONFIGSTATUS } from '@/enum.config';
import { AuthJudge } from '@cckj/cj-authority';
import { AUTH } from '~/authority';

/*!
 * 绩效列表-拣货表头
 * 20021-01-15
 */

export default (displayStatus: Function, dispatch: Function) => {
  return defaultColumns([
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
      title: '总距离(m)',
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
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text: any, record: any) => {
        const status = PERFORMANCECONFIGSTATUS.key(text);
        return status ? (
          <div>
            <span>
              <Badge color={status.color} />
              {status.value}
            </span>
          </div>
        ) : (
          '-'
        );
      },
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
            <AuthJudge code={AUTH.JXTJ003002}>
              <Button
                size="small"
                type="primary"
                onClick={() => {
                  dispatch({
                    type: `${namespace}/_changecurrentItem`,
                    payload: { currentItem: record },
                  });

                  history.push({
                    pathname: `/editPerformanceRule`,
                    query: { id: record.id },
                  });
                }}
              >
                编辑
              </Button>
            </AuthJudge>
            <AuthJudge code={AUTH.JXTJ003003}>
              <Button
                size="small"
                type="primary"
                onClick={() => {
                  displayStatus(record);
                }}
              >
                {record.status == 1 ? '启用' : '禁用'}
              </Button>
            </AuthJudge>
          </Space>
        );
      },
    },
  ]);
};
