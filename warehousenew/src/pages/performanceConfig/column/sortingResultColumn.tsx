import React from 'react';
import { defaultColumns } from '@/utils';
import { Space, Button, Badge } from 'antd';
import { history } from 'umi';
import { namespace } from '@/models/performanceConfig';
import { PERFORMANCECONFIGSTATUS } from '@/enum.config';
import { AuthJudge } from '@cckj/cj-authority';
import { AUTH } from '~/authority';

/*!
 * 绩效列表-分拣表头
 * 20021-01-15
 */

export default (displayStatus: Function, dispatch: Function) => {
  return defaultColumns([
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
