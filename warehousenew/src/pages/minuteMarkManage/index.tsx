import React from 'react';
import style from './index.less';
import { connect } from 'dva';
import SearchForm from './searchForm';
import { Button, Space, Table } from 'antd';
import { indexHooks } from './hooks';
import BreadcrumbHeader from '@/components/BreadcrumbHeader';
import SearchTable from '@/components/SearchTable';
import SimpleModal from '@/components/SimpleModalForm';
import ImagePreview from '@/components/ImagePreview';
import { COMMONSTATUS, CONTAINERTYPE } from '@/enum.config';
import { dateTimeFormat, defaultColumns } from '@/utils';
import { AuthJudge } from '@cckj/cj-authority';
import { AUTH } from '~/authority';
import propertyTraversal from '@/utils/propertyUtils';
import { Link } from 'umi';

export default BreadcrumbHeader([{ name: '入库' }, { name: '分标管理' }])(
  connect(({ minuteMarkManage }: any) => ({
    dataSource: minuteMarkManage.dataSource,
    loading: minuteMarkManage.loading,
    current: Number(minuteMarkManage.current),
    pageSize: Number(minuteMarkManage.pageSize),
    total: minuteMarkManage.total,
  }))(({ dataSource, loading, current, pageSize, total, dispatch }: any) => {
    const {
      onChange,
      print,
      expandedRowKeys,
      changeRowsKey,
      simpleForm,
    } = indexHooks(dispatch);
    const columns = defaultColumns([
      {
        title: '入库单号',
        dataIndex: 'putStorageNumber',
        key: 'putStorageNumber',
        align: 'left',
        fixed: 'left',
      },
      {
        title: '供货公司',
        dataIndex: 'supplier',
        key: 'supplier',
        align: 'left',
      },
      {
        title: '目标仓库',
        dataIndex: 'storageName',
        key: 'storageName',
        align: 'left',
      },
      {
        title: '包裹入库序号',
        dataIndex: 'id',
        key: 'id',
        align: 'left',
      },
      {
        title: '采购订单号',
        dataIndex: 'orderNumber',
        key: 'orderNumber',
        align: 'left',
      },
      {
        title: '追踪号',
        dataIndex: 'logisticsTrackingNumber',
        key: 'logisticsTrackingNumber',
        align: 'left',
      },
      {
        title: '分标人',
        dataIndex: 'updateBy',
        key: 'updateBy',
        align: 'left',
        render: (text: any, record: any) => {
          const list = record.subStandardList;
          if (list.length > 0) {
            const status = list[0].subStandardStatus;
            return status == 1 ? list[0].updateBy : '-';
          } else {
            return '-';
          }
        },
      },
      {
        title: '分标时间',
        dataIndex: 'updateAt',
        key: 'updateAt',
        align: 'left',
        render: (text: string, record: any) => {
          const list = record.subStandardList;
          if (list.length > 0) {
            const status = list[0].subStandardStatus;
            return status == 1 ? dateTimeFormat(list[0].updateAt) : '-';
          } else {
            return '-';
          }
        },
      },
      {
        title: '创建时间',
        dataIndex: 'createAt',
        key: 'createAt',
        align: 'left',
        render: (text: string) => dateTimeFormat(text),
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        align: 'left',
        fixed: 'right',
        render: (text: any, record: any) => {
          return (
            <Button size="small" type="primary" onClick={() => print(record)}>
              打印采购单号
            </Button>
          );
        },
      },
    ]);

    const expandedRowRender = (record: any) => {
      return (
        <>
          {record.subStandardList.map((item: any) => {
            let location: any = CONTAINERTYPE.key(Number(item.containerType));
            let statusObj: any = COMMONSTATUS.key(
              Number(item.subStandardStatus),
            );
            return (
              <div key={item.id} className={style['expanded-item']}>
                <span>
                  <ImagePreview key={item.image} url={item.image} />
                  <span>SKU:{item.sku}</span>
                </span>
                <span>{propertyTraversal(item.variantKeyMap)}</span>
                <span>分标状态：{statusObj?.value || '-'}</span>
                <span>批次号：{item.batchNumber || '-'}</span>
                <span>应到数量：{item.quantity}</span>
                <span>实际数量：{item.subStandardQuantity}</span>
                <span>
                  多货数量：
                  {item.subStandardStatus == '0'
                    ? '-'
                    : item.subStandardQuantity - item.quantity > 0
                    ? item.subStandardQuantity - item.quantity
                    : 0}
                </span>
                <span>
                  少货数量：
                  {item.subStandardStatus == '0'
                    ? '-'
                    : item.subStandardQuantity - item.quantity < 0
                    ? item.quantity - item.subStandardQuantity
                    : 0}
                </span>
                <span>
                  颜色问题：
                  {item.subStandardStatus == '0'
                    ? '-'
                    : item.colorNum
                    ? item.colorNum
                    : 0}
                </span>
                <span>
                  尺寸问题：
                  {item.subStandardStatus == '0'
                    ? '-'
                    : item.sizeNum
                    ? item.sizeNum
                    : 0}
                </span>
                <span>
                  异常件：
                  {item.subStandardStatus == '0'
                    ? '-'
                    : item.abnormalPartsNum
                    ? item.abnormalPartsNum
                    : 0}
                </span>
                <span>
                  位置：{location?.value || '-'}
                  {item.containerNum}
                </span>
                <div className={style.supplementPlay}>
                  {Number(item.subStandardStatus) ? (
                    <Button
                      type="primary"
                      onClick={() => simpleForm.show(item)}
                    >
                      补打
                    </Button>
                  ) : null}
                </div>
              </div>
            );
          })}
        </>
      );
    };
    return (
      <SearchTable
        className={style['minute-mark-manage']}
        searchFormRender={<SearchForm />}
        operateBtnRender={
          <Space>
            <AuthJudge code={AUTH.FBGL001001}>
              <Button type="primary">
                <Link to="/minuteMarkManage/normal" target="_blank">
                  分标
                </Link>
              </Button>
            </AuthJudge>
            <AuthJudge code={AUTH.FBGL001001}>
              <Button type="primary">
                <Link to="/minuteMarkManage/pod" target="_blank">
                  POD分标
                </Link>
              </Button>
            </AuthJudge>
          </Space>
        }
      >
        <Table
          // @ts-ignore
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          scroll={{ x: 1500 }}
          expandable={{
            expandedRowRender,
            rowExpandable: record => record.subStandardList.length > 0,
          }}
          defaultExpandAllRows={true}
          expandedRowKeys={expandedRowKeys}
          onExpand={(expanded, record) => changeRowsKey(expanded, record)} //点击展开时重新赋值Rowskey
          rowKey={record => record.id}
          pagination={{
            current,
            pageSize,
            total,
            pageSizeOptions: ['10', '20', '50', '100'],
            showQuickJumper: true,
            showTotal: total => {
              return <span>共计{total}条数据</span>;
            },

            onChange,
          }}
        />

        <SimpleModal simple={simpleForm} />
      </SearchTable>
    );
  }),
);
