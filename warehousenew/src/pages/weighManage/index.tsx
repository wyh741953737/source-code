import React from 'react';
import style from './index.less';
import { connect } from 'dva';
import SearchForm from './searchForm';
import { Button, Table } from 'antd';
import { indexHooks } from './hooks';
import BreadcrumbHeader from '@/components/BreadcrumbHeader';
import SearchTable from '@/components/SearchTable';
import ImagePreview from '@/components/ImagePreview';
import { COMMONSTATUS, CONTAINERTYPE, BATCHNUMBERTYPE } from '@/enum.config';
import SimpleModal from '@/components/SimpleModalForm';
import { dateTimeFormat, defaultColumns } from '@/utils';
import propertyTraversal from '@/utils/propertyUtils';
import { PrinterOutlined } from '@ant-design/icons';
import { Link } from 'umi';
import { AuthJudge } from '@cckj/cj-authority';
import { AUTH } from '~/authority';
export default BreadcrumbHeader([{ name: '入库' }, { name: '称重管理' }])(
  connect(({ weighManage }: any) => ({
    dataSource: weighManage.dataSource,
    loading: weighManage.loading,
    current: Number(weighManage.current),
    pageSize: Number(weighManage.pageSize),
    total: weighManage.total,
  }))(({ dataSource, loading, current, pageSize, total, dispatch }: any) => {
    const { onChange, simpleForm } = indexHooks(dispatch);
    const columns = defaultColumns([
      {
        title: '称重单号',
        dataIndex: 'id',
        key: 'id',
        align: 'left',
        fixed: 'left',
        width: 200,
      },
      {
        title: '批次号',
        dataIndex: 'batchNumber',
        key: 'batchNumber',
        align: 'left',
        fixed: 'left',
        width: 120,
        render: (text: string, record: any) => {
          return (
            <p>
              {text}{' '}
              <AuthJudge code={AUTH.CZGL001002}>
                <PrinterOutlined
                  title="打印批次号"
                  onClick={() => simpleForm.show(record)}
                  style={{
                    color: '#ffb900',
                    fontSize: '18px',
                    cursor: 'pointer',
                  }}
                />
              </AuthJudge>
            </p>
          );
        },
      },
      {
        title: '批次类型',
        dataIndex: 'batchNumberType',
        key: 'batchNumberType',
        align: 'left',
        render: (text: any, record: any) =>
          BATCHNUMBERTYPE.key(Number(text))?.value || '-',
      },
      {
        title: '仓库',
        dataIndex: 'storageName',
        key: 'storageName',
        align: 'left',
      },
      {
        title: '称重状态',
        dataIndex: 'weighStatus',
        key: 'weighStatus',
        align: 'left',
        render: (text: any, record: any) =>
          COMMONSTATUS.key(Number(text))?.value2 || '-',
      },
      {
        title: '入库单号',
        dataIndex: 'putStorageNumber',
        key: 'putStorageNumber',
        align: 'left',
      },
      {
        title: '采购订单号',
        dataIndex: 'orderNumber',
        key: 'orderNumber',
        align: 'left',
      },
      {
        title: '图片',
        dataIndex: 'image',
        key: 'image',
        align: 'left',
        render: (text: any, record: any) => {
          return <ImagePreview key={text} url={text} />;
        },
      },
      {
        title: 'sku',
        dataIndex: 'sku',
        key: 'sku',
        align: 'left',
      },
      {
        title: '属性',
        dataIndex: 'variantKeyMap',
        key: 'variantKeyMap',
        width: 150,
        render: (text: any) => {
          return <div>{propertyTraversal(text)}</div>;
        },
      },
      {
        title: '位置',
        dataIndex: 'location',
        key: 'location',
        align: 'left',
        render: (text: string, record: any) => {
          const type: any = CONTAINERTYPE.key(Number(record.containerType));
          const name: string = type ? type.value : '';
          return !name && !record.containerNum
            ? '-'
            : name + record.containerNum;
        },
      },
      {
        title: '质检数量',
        dataIndex: 'subStandardQuantity',
        key: 'subStandardQuantity',
        align: 'left',
        render: (text: any, record: any) => {
          return text ? text : 0;
        },
      },
      {
        title: '称重数量',
        dataIndex: 'weighQuantity',
        key: 'weighQuantity',
        align: 'left',
        render: (text: any, record: any) => {
          return text ? text : 0;
        },
      },
      {
        title: '正品数量',
        dataIndex: 'qualifiedQuantity',
        key: 'qualifiedQuantity',
        align: 'left',
        render: (text: any, record: any) => {
          return text ? text : 0;
        },
      },
      {
        title: '多货数量',
        dataIndex: 'bigNum',
        key: 'bigNum',
        align: 'left',
        render: (text: any, record: any) => {
          return text ? text : 0;
        },
      },
      {
        title: '少货数量',
        dataIndex: 'smallNum',
        key: 'smallNum',
        align: 'left',
        render: (text: any, record: any) => {
          return text ? text : 0;
        },
      },
      {
        title: '颜色问题',
        dataIndex: 'colourNum',
        key: 'colourNum',
        align: 'left',
        render: (text: any, record: any) => {
          return text ? text : 0;
        },
      },
      {
        title: '尺寸问题',
        dataIndex: 'sizeNum',
        key: 'sizeNum',
        align: 'left',
        render: (text: any, record: any) => {
          return text ? text : 0;
        },
      },
      {
        title: '异常件',
        dataIndex: 'exceptionNum',
        key: 'exceptionNum',
        align: 'left',
        render: (text: any, record: any) => {
          return text ? text : 0;
        },
      },
      {
        title: '称重人',
        dataIndex: 'updateBy',
        key: 'updateBy',
        align: 'left',
      },
      {
        title: '称重时间',
        dataIndex: 'updateAt',
        key: 'updateAt',
        align: 'left',
        render: (text: string) => dateTimeFormat(text),
      },
      {
        title: '创建时间',
        dataIndex: 'createAt',
        key: 'createAt',
        align: 'left',
        render: (text: string) => dateTimeFormat(text),
      },
    ]);
    return (
      <SearchTable
        className={style['quality-manage']}
        searchFormRender={<SearchForm />}
        operateBtnRender={
          <>
            <AuthJudge code={AUTH.CZGL001001}>
              <Button type="primary">
                <Link to="/weighManage/normal" target="_blank">
                  称重
                </Link>
              </Button>
            </AuthJudge>
          </>
        }
      >
        <Table
          // @ts-ignore
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          scroll={{ x: 2000 }}
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

            onChange,
          }}
        />
        <SimpleModal simple={simpleForm} />
      </SearchTable>
    );
  }),
);
