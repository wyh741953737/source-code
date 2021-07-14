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
import { dateTimeFormat } from '@/utils';
import propertyTraversal from '@/utils/propertyUtils';
import { PrinterOutlined } from '@ant-design/icons';
import { Link } from 'umi';
import { AuthJudge } from '@cckj/cj-authority';
import { AUTH } from '~/authority';
export default BreadcrumbHeader([{ name: '入库' }, { name: '质检管理' }])(
  connect(({ qualityManage }: any) => ({
    dataSource: qualityManage.dataSource,
    loading: qualityManage.loading,
    current: Number(qualityManage.current),
    pageSize: Number(qualityManage.pageSize),
    total: qualityManage.total,
  }))(({ dataSource, loading, current, pageSize, total, dispatch }: any) => {
    const { onChange, print, simpleForm } = indexHooks(dispatch);
    const columns = [
      {
        title: '质检单号',
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
              <PrinterOutlined
                title="打印批次号"
                onClick={() => simpleForm.show(record)}
                style={{
                  color: '#ffb900',
                  fontSize: '18px',
                  cursor: 'pointer',
                }}
              />
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
        title: '质检状态',
        dataIndex: 'qualityTestingStatus',
        key: 'qualityTestingStatus',
        align: 'left',
        render: (text: any, record: any) =>
          COMMONSTATUS.key(Number(text))?.value1 || '-',
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
          let typeNameObj: any = CONTAINERTYPE.key(
            Number(record.containerType),
          );
          let typeName: string = typeNameObj ? typeNameObj.value : '';
          return !typeName && !record.containerNum
            ? '-'
            : typeName + record.containerNum;
        },
      },
      {
        title: '分标数量',
        dataIndex: 'subStandardQuantity',
        key: 'subStandardQuantity',
        align: 'left',
        render: (text: any, record: any) => {
          return text ? text : 0;
        },
      },
      {
        title: '质检数量',
        dataIndex: 'inspectionQuantity',
        key: 'inspectionQuantity',
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
        title: '质检人',
        dataIndex: 'updateBy',
        key: 'updateBy',
        align: 'left',
      },
      {
        title: '质检时间',
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
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        align: 'left',
        fixed: 'right',
        width: 150,
        render: (text: any, record: any) => {
          return (
            <AuthJudge code={AUTH.ZJGL001002}>
              <Button
                size="small"
                type="primary"
                onClick={() => print(record)}
                disabled={record.orderNumber ? false : true}
              >
                打印采购单号
              </Button>
            </AuthJudge>
          );
        },
      },
    ];
    return (
      <SearchTable
        className={style['quality-manage']}
        searchFormRender={<SearchForm />}
        operateBtnRender={
          <>
            <AuthJudge code={AUTH.ZJGL001001}>
              <Button type="primary">
                <Link to="/qualityManage/normal" target="_blank">
                  质检
                </Link>
              </Button>
            </AuthJudge>
            <Button type="primary">
              <Link to="/qualityManage/twoNormal" target="_blank">
                二次质检
              </Link>
            </Button>
          </>
        }
      >
        <Table
          // @ts-ignore
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          scroll={{ x: 2200 }}
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
