import React from 'react';
import style from './index.less';
import { connect } from 'dva';
import SearchForm from './searchForm';
import { Button, Dropdown, Menu, Table } from 'antd';
import { indexHooks } from './hooks';
import SearchTable from '@/components/SearchTable';
import { DownOutlined } from '@ant-design/icons/lib';
import ImagePreview from '@/components/ImagePreview';
import LogModal from './logModal';
import { dateTimeFormat, defaultColumns } from '@/utils';
import { PURCHASETYPEOPTIONS, PURCHASEMARK } from '@/enum.config';
import propertyTraversal from '@/utils/propertyUtils';
import { Link } from 'umi';
export default connect(({ packageUnSign }: any) => ({
  dataSource: packageUnSign.dataSource,
  loading: packageUnSign.loading,
  current: Number(packageUnSign.current),
  pageSize: Number(packageUnSign.pageSize),
  total: packageUnSign.total,
}))(({ dataSource, loading, current, pageSize, total, dispatch }: any) => {
  const {
    onChange,
    print,
    showLog,
    getNewLogisticInfo,
    expandedRowKeys,
    changeRowsKey,
  } = indexHooks(dispatch);
  const columns = defaultColumns([
    {
      title: '包裹入库序号',
      dataIndex: 'id',
      key: 'id',
      align: 'left',
    },
    {
      title: '入库单号',
      dataIndex: 'putStorageNumber',
      key: 'putStorageNumber',
      align: 'left',
    },
    {
      title: '采购单号',
      dataIndex: 'orderNumber',
      key: 'orderNumber',
      align: 'left',
    },
    {
      title: '标记',
      dataIndex: 'mark',
      key: 'mark',
      align: 'left',
      render: text => PURCHASEMARK.key(text)?.value || '-',
    },
    {
      title: '标记备注',
      dataIndex: 'signRemark',
      key: 'signRemark',
      align: 'left',
    },
    {
      title: '采购类型',
      dataIndex: 'purchaserType',
      key: 'purchaserType',
      align: 'left',
      render: (text: string) => PURCHASETYPEOPTIONS.key(text)?.value || '-',
    },
    {
      title: '采购人',
      dataIndex: 'purchaser',
      key: 'purchaser',
      align: 'left',
    },
    {
      title: '仓库',
      dataIndex: 'storageName',
      key: 'storageName',
      align: 'left',
    },
    {
      title: '签收类型',
      dataIndex: 'type',
      key: 'type',
      align: 'left',
    },
    {
      title: '供货公司',
      dataIndex: 'logisticsCompany',
      key: 'logisticsCompany',
      align: 'left',
    },
    {
      title: '追踪号',
      dataIndex: 'logisticsTrackingNumber',
      key: 'logisticsTrackingNumber',
      align: 'left',
    },
    {
      title: '创建时间',
      dataIndex: 'createAt',
      key: 'createAt',
      align: 'left',
      render: (text: string) => dateTimeFormat(text),
    },
    {
      title: '创建人',
      dataIndex: 'createBy',
      key: 'createBy',
      align: 'left',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      align: 'left',
      width: 150,
      fixed: 'right',
      render: (text: any, record: any) => {
        const menu = (
          <Menu>
            <Menu.Item onClick={() => print(record)}>打印运单号</Menu.Item>
            <Menu.Item onClick={() => getNewLogisticInfo(record)}>
              获取物流信息
            </Menu.Item>
            <Menu.Item onClick={() => showLog(record)}>操作日志</Menu.Item>
          </Menu>
        );
        return (
          <Dropdown overlay={menu}>
            <Button size="small">
              更多操作 <DownOutlined />
            </Button>
          </Dropdown>
        );
      },
    },
  ]);
  return (
    <SearchTable
      className={style['package-sign-list']}
      searchFormRender={<SearchForm />}
      operateBtnRender={
        <Button type="primary">
          <Link to="/packageSign/signing" target="_blank">
            签收
          </Link>
        </Button>
      }
    >
      <Table
        // @ts-ignore
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: 1600 }}
        loading={loading}
        defaultExpandAllRows={true}
        expandedRowKeys={expandedRowKeys}
        onExpand={(expanded, record) => changeRowsKey(expanded, record)} //点击展开时重新赋值Rowskey
        expandable={{
          expandedRowRender,
          rowExpandable: record =>
            record.detailsList && record.detailsList.length > 0,
        }}
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
      <LogModal />
    </SearchTable>
  );
});
const expandedRowRender = (record: any) => {
  return (
    <>
      {record.detailsList.length > 0 &&
        record.detailsList.map((item: any) => (
          <div key={item.id} className={style['expanded-item']}>
            <span>
              <ImagePreview key={item.image} url={item.image} />
              <span>SKU:{item.sku}</span>
            </span>
            <span>{propertyTraversal(item.variantKeyMap)}</span>
            <span>数量：{item.quantity}</span>
          </div>
        ))}
    </>
  );
};
