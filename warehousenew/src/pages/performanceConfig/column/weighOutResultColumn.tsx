import React from 'react';
import { defaultColumns } from '@/utils';
import { Space, Button, Badge } from 'antd';
import { history } from 'umi';
import { namespace } from '@/models/performanceConfig';
import { PERFORMANCECONFIGSTATUS } from '@/enum.config';
import { AuthJudge } from '@cckj/cj-authority';
import { AUTH } from '~/authority';

/*!
 * 绩效列表-称重出库表头
 * 20021-01-15
 */

export default (displayStatus: Function, dispatch: Function) => {
  return defaultColumns([
    {
      title: '打包包裹数',
      dataIndex: 'packingTotalNum',
      key: 'packingTotalNum',
    },
    {
      title: '包裹净重',
      dataIndex: 'packingNetWeight',
      key: 'packingNetWeight',
    },
    {
      title: '包裹毛重',
      dataIndex: 'packingRoughWeight',
      key: 'packingRoughWeight',
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