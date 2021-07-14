import React from 'react';
import { connect } from 'dva';
import { Link } from 'umi';
import { Table, Button, Space, InputNumber } from 'antd';
import BreadcrumbHeader from '@/components/BreadcrumbHeader';
import SearchForm from './searchForm';
import SearchTable from '@/components/SearchTable';
import { indexHooks } from './hooks';
import { dateTimeFormat, defaultColumns } from '@/utils';
import AddPackage from './components/addPackage';
import PackageDetail from './components/packageDetail';
import LogModal from './components/log';
import { AuthJudge } from '@cckj/cj-authority';
import { AUTH } from '~/authority';
import style from './index.less';
/**
 * 上架单查询
 */
export default BreadcrumbHeader([
  { name: '出库' },
  { name: '称重出库' },
  { name: '包裹打印' },
])(
  connect(({ packagePrint }: any) => ({
    searchData: packagePrint.searchData,
    dataSource: packagePrint.dataSource,
    current: Number(packagePrint.current),
    pageSize: Number(packagePrint.pageSize),
    total: packagePrint.total,
    loading: packagePrint.loading,
  }))(({ dataSource, loading, current, pageSize, total, dispatch }: any) => {
    const {
      onChange,
      addPackageModal,
      showLog,
      updateWeight,
      updateStatus,
      printPackage,
      threSholdObj,
      detailModal,
      getPackInfo,
    } = indexHooks(dispatch);
    const columns = defaultColumns([
      {
        title: '包裹编号',
        dataIndex: 'packageNumber',
        key: 'packageNumber',
        fixed: 'left',
        width: 180,
        align: 'left',
        render: (text: string) => (
          <a onClick={() => getPackInfo(text)}>{text}</a>
        ),
      },
      {
        title: '创建时间',
        dataIndex: 'createAt',
        key: 'createAt',
        render: (text: string) => dateTimeFormat(text),
      },
      {
        title: '仓库',
        dataIndex: 'storageName',
        key: 'storageName',
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
        title: '包裹数量',
        dataIndex: 'packageQuantity',
        key: 'packageQuantity',
      },
      {
        title: '电子秤型号',
        dataIndex: 'electronicScaleModel',
        key: 'electronicScaleModel',
      },
      {
        title: '净重(KG)',
        dataIndex: 'netWeight',
        key: 'netWeight',
      },
      {
        title: '毛重(KG)',
        dataIndex: 'grossWeight',
        key: 'grossWeight',
        render: (text: number, record: any) => {
          const standardVal = threSholdObj ? threSholdObj.number : 8;
          const statusArr = [0];
          const { netWeight, grossWeight } = record;
          let styleName = '';
          const diff = (Math.abs(netWeight - grossWeight) / netWeight) * 100;
          if (grossWeight > netWeight && diff > standardVal) {
            styleName = 'overWeight';
          } else if (grossWeight < netWeight && diff > standardVal) {
            styleName = 'superLight';
          }
          return statusArr.includes(record.status) ? (
            <InputNumber
              style={{ width: '100%' }}
              className={style[styleName]}
              defaultValue={text}
              precision={2}
              onPressEnter={e => {
                updateWeight(e, record);
              }}
            />
          ) : (
            <span className={style[styleName]}>{text}</span>
          );
        },
      },
      {
        title: '打印时间',
        dataIndex: 'printAt',
        key: 'printAt',
        render: (text: string) => dateTimeFormat(text),
      },
      {
        title: '打印人',
        dataIndex: 'printBy',
        key: 'printBy',
      },
      {
        title: '打印日志',
        dataIndex: 'log',
        key: 'log',
        render: (text: string, record: any) => {
          return (
            <a
              onClick={e => {
                e.stopPropagation;
                showLog(record.packageNumber);
              }}
            >
              日志
            </a>
          );
        },
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        width: 80,
        align: 'left',
        fixed: 'right',
        render: (text: number, record: any) => {
          const statusArr = [0, 1];
          return (
            <Space direction="vertical">
              {record.status !== 1 ? (
                <Button
                  size="small"
                  type="primary"
                  onClick={() => printPackage(record)}
                >
                  打印
                </Button>
              ) : null}
              {statusArr.includes(record.status) ? (
                <Button
                  size="small"
                  danger={record.status == 0 ? true : false}
                  type="primary"
                  onClick={() => {
                    updateStatus(record);
                  }}
                >
                  {record.status == 0 ? '暂停' : '启用'}
                </Button>
              ) : null}
              {record.status === 0 ? (
                <Button
                  size="small"
                  type="default"
                  onClick={() => {
                    addPackageModal.show(record);
                  }}
                >
                  新增
                </Button>
              ) : null}
            </Space>
          );
        },
      },
    ]);

    return (
      <SearchTable
        searchFormRender={<SearchForm />}
        operateBtnRender={
          <Space>
            <AuthJudge code={AUTH.CZCD006001}>
              <Button type="primary">
                <Link to="/tookOutbound">揽件出库</Link>
              </Button>
            </AuthJudge>
          </Space>
        }
      >
        <Table
          // @ts-ignore
          columns={columns}
          bordered
          dataSource={dataSource}
          loading={loading}
          rowKey={(record: any) => record.id}
          scroll={{ x: 2000 }}
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

        <AddPackage modal={addPackageModal} />

        <LogModal />
        <PackageDetail modal={detailModal} />
      </SearchTable>
    );
  }),
);
