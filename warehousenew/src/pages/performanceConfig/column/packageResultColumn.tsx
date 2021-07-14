import React from 'react';
import { defaultColumns } from '@/utils';
import { Space, Button, Badge } from 'antd';
import { history } from 'umi';
import { namespace } from '@/models/performanceConfig';
import { PERFORMANCECONFIGSTATUS } from '@/enum.config';
import { AuthJudge } from '@cckj/cj-authority';
import { AUTH } from '~/authority';

/*!
 * 绩效列表-打包表头
 * 20021-01-15
 */

export default (displayStatus: Function, dispatch: Function) => {
  return defaultColumns([
    {
      title: '打包面单数',
      dataIndex: 'sheetCount',
      key: 'sheetCount',
    },
    {
      title: '商品数量',
      dataIndex: 'productCount',
      key: 'productCount',
    },
    {
      title: '体积(cm^3)',
      dataIndex: 'volumeCount',
      key: 'volumeCount',
    },
    {
      title: '重量(g)',
      dataIndex: 'weightNum',
      key: 'weightNum',
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
