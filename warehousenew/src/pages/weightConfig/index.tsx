import React from 'react';
import style from './index.less';
import { connect } from 'dva';
import { Button, Descriptions, Table, Space } from 'antd';
import BreadcrumbHeader from '@/components/BreadcrumbHeader';
import EditContent from './components/editContent';
import EditThreshold from './components/editThreshold';
import { indexHooks } from './hooks';

import { defaultColumns, dateTimeFormat } from '@/utils';
import { AuthJudge } from '@cckj/cj-authority';
import { AUTH } from '~/authority';

export default BreadcrumbHeader([
  { name: '出库' },
  { name: '称重出库' },
  { name: '配置' },
])(
  connect(({ weightConfig }: any) => ({
    searchData: weightConfig.searchData,
    dataSource: weightConfig.dataSource,
    current: Number(weightConfig.current),
    pageSize: Number(weightConfig.pageSize),
    total: weightConfig.total,
    loading: weightConfig.loading,
    thresholdVal: weightConfig.thresholdVal,
    logisticData: weightConfig.logisticData,
  }))(
    ({
      dataSource,
      loading,
      current,
      pageSize,
      total,
      thresholdVal,
      logisticData,
      dispatch,
    }: any) => {
      const {
        editModal,
        thresholdModal,

        onChange,
        deleteConfig,
      } = indexHooks(dispatch, dataSource, logisticData);

      const columns = defaultColumns([
        {
          title: '框位',
          dataIndex: 'frameLocation',
          key: 'frameLocation',
          fixed: 'left',
          width: 180,
          align: 'left',
        },
        {
          title: '物流公司',
          dataIndex: 'logisticsCompany',
          key: 'logisticsCompany',
        },
        {
          title: '物流账号',
          dataIndex: 'companyAccount',
          key: 'companyAccount',
        },
        {
          title: '仓库',
          dataIndex: 'storehouseName',
          key: 'storehouseName',
        },
        {
          title: '音频文件',
          dataIndex: 'fileName',
          key: 'fileName',
          render: (text: string, record: any) => {
            return text ? (
              <a href={record.fileUrl} target="_blank">
                {text}
              </a>
            ) : (
              '-'
            );
          },
        },
        {
          title: '修改人',
          dataIndex: 'updateBy',
          key: 'updateBy',
        },
        {
          title: '修改时间',
          dataIndex: 'updateAt',
          key: 'updateAt',
          render: (text: string) => dateTimeFormat(text),
        },
        {
          title: '操作',
          dataIndex: 'action',
          key: 'action',
          width: 150,
          align: 'left',
          fixed: 'right',
          render: (text: number, record: any) => {
            const editContent = {
              ...record,
              files: record.fileName
                ? [
                    {
                      name: record.fileName,
                      status: 'done',
                      type: 'audio/mpeg',
                      uid: record.fileUrl,
                      url: record.fileUrl,
                    },
                  ]
                : '',
            };
            return (
              <Space direction="horizontal">
                <AuthJudge code={AUTH.CZCD005002}>
                  <Button
                    size="small"
                    type="primary"
                    onClick={() => editModal.show(editContent)}
                  >
                    {record.logisticsCompany ? '修改' : '添加'}
                  </Button>
                </AuthJudge>
                <AuthJudge code={AUTH.CZCD005003}>
                  <Button
                    size="small"
                    type="default"
                    onClick={() => deleteConfig(record)}
                  >
                    删除
                  </Button>
                </AuthJudge>
              </Space>
            );
          },
        },
      ]);
      return (
        <div className={style.paddingContent}>
          <Descriptions title="重量阈值" column={24}>
            <Descriptions.Item span={24} label="">
              <div className={style.desLayout}>
                <span>阈值：</span>
                <span>
                  {thresholdVal.number ? `${thresholdVal.number}%` : '-'}
                </span>
                <AuthJudge code={AUTH.CZCD005001}>
                  <Button
                    type="primary"
                    onClick={() => thresholdModal.show(thresholdVal)}
                  >
                    修改
                  </Button>
                </AuthJudge>
              </div>
            </Descriptions.Item>
          </Descriptions>

          <Descriptions
            title="框位设置"
            column={24}
            style={{ marginTop: '50px' }}
          >
            <Descriptions.Item span={24}>
              <Table
                style={{ width: '100%' }}
                // @ts-ignore
                columns={columns}
                bordered
                dataSource={dataSource}
                loading={loading}
                rowKey={(record: any) => record.id}
                pagination={{
                  current,
                  pageSize,
                  total,
                  pageSizeOptions: ['10', '20', '50', '100'],
                  showQuickJumper: true,
                  showTotal: total => {
                    return <span>共计{total}条数据</span>;
                  },

                  onChange: onChange,
                }}
              />
            </Descriptions.Item>
            <Descriptions.Item span={24}>
              <AuthJudge code={AUTH.CZCD005004}>
                <Button type="primary" onClick={() => editModal.show()}>
                  添加行
                </Button>
              </AuthJudge>
            </Descriptions.Item>
          </Descriptions>

          <EditContent modal={editModal} />
          <EditThreshold modal={thresholdModal} />
        </div>
      );
    },
  ),
);
