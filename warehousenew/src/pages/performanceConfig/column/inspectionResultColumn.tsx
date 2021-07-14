import React from 'react';
import { defaultColumns } from '@/utils';
import { Space, Button, Badge } from 'antd';
import { history } from 'umi';
import { namespace } from '@/models/performanceConfig';
import { PERFORMANCECONFIGSTATUS } from '@/enum.config';
import { AuthJudge } from '@cckj/cj-authority';
import { AUTH } from '~/authority';

/*!
 * 绩效列表-质检表头
 * 20021-01-15
 */

export default (displayStatus: Function, dispatch: Function) => {
  return defaultColumns([
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
      dataIndex: 'qualifiedNum',
      key: 'qualifiedNum',
    },
    {
      title: '次品数量',
      dataIndex: 'ungradedProductsNum',
      key: 'ungradedProductsNum',
    },
    {
      title: '少货数量',
      dataIndex: 'lessGoodsNum',
      key: 'lessGoodsNum',
    },
    {
      title: '多货数量',
      dataIndex: 'multipleGoodsNum',
      key: 'multipleGoodsNum',
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
