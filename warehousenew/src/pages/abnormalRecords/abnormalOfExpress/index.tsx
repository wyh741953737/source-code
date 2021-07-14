import React from 'react';
import { connect } from 'dva';
import { Table, Space, Button, Menu, Dropdown } from 'antd';
import SearchForm from './searchForm';
import SearchTable from '@/components/SearchTable';
import { indexHooks } from './hooks';
import { EXPRESSSTATUS } from '@/enum.config';
import { defaultColumns } from '@/utils';
import useOptions from '@/hooks/useOptions';
import { warehouseApply } from '@/option.apply';
import { DownOutlined } from '@ant-design/icons/lib';
import EditTrackNumber from './components/editTrackNumber';
import { AuthJudge } from '@cckj/cj-authority';
import { AUTH } from '~/authority';

/**
 * 异常记录
 */
export default connect(({ abnormalOfExpress }: any) => ({
  searchData: abnormalOfExpress.searchData,
  dataSource: abnormalOfExpress.dataSource,
  current: abnormalOfExpress.current,
  pageSize: abnormalOfExpress.pageSize,
  total: abnormalOfExpress.total,
  loading: abnormalOfExpress.loading,
}))(({ dataSource, loading, current, pageSize, total, dispatch }) => {
  const {
    onChange,
    print,
    reCreate,
    onSelectChange,
    selected,
    printBtn,
    editModal,
  } = indexHooks(dispatch);
  const [option] = useOptions(warehouseApply, { interval: Infinity });
  const columns = defaultColumns([
    {
      title: '包裹编号',
      dataIndex: 'packCode',
      key: 'packCode',
      fixed: 'left',
      align: 'left',
    },
    {
      title: 'CJ订单号',
      dataIndex: 'orderId',
      key: 'orderId',
      align: 'left',
    },
    {
      title: '运单号',
      dataIndex: 'trackingNumber',
      key: 'trackingNumber',
      align: 'left',
    },
    {
      title: '仓库',
      dataIndex: 'storehouseId',
      key: 'storehouseId',
      render: (text: string) => option.menu.key(text)?.value || '-',
    },
    {
      title: '物流',
      dataIndex: 'logisticsCompany',
      key: 'logisticsCompany',
      align: 'left',
    },
    {
      title: '状态',
      dataIndex: 'sheetStatus',
      key: 'sheetStatus',
      align: 'left',
      width: 100,
      render: (text: any) => EXPRESSSTATUS.key(text)?.value || '-',
    },
    {
      title: '操作',
      dataIndex: 'id',
      key: 'id',
      width: 120,
      fixed: 'right',
      render: (text: any, record: any) => {
        const MenuAction = (
          <Menu>
            {/* {EXPRESSSTATUS.success.key === record.sheetStatus &&  (
                <Menu.Item onClick={() => print(record)}>
                  打印面单
                </Menu.Item>
              )} */}

            {/* {EXPRESSSTATUS.failed.key === record.sheetStatus && (
                <Menu.Item onClick={() => reCreate(record)}>重新生成</Menu.Item>
              ) } */}
            <AuthJudge code={AUTH.YSBZ007001}>
              <Menu.Item
                onClick={() => {
                  editModal.show(record);
                }}
              >
                手动填写运单号
              </Menu.Item>
            </AuthJudge>
          </Menu>
        );
        return (
          <Dropdown overlay={MenuAction}>
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
      searchFormRender={<SearchForm />}
      // operateBtnRender={
      //   <Button
      //     type="primary"
      //     onClick={printBtn.onClick}
      //     loading={printBtn.loading}
      //   >
      //     批量打印面单
      //   </Button>
      // }
    >
      <Table
        // @ts-ignore
        columns={columns}
        bordered
        rowKey={record => record.id}
        scroll={{ x: 1000 }}
        dataSource={dataSource}
        loading={loading}
        rowSelection={{
          fixed: true,
          onChange: onSelectChange,
          selectedRowKeys: selected.keys,
        }}
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

      <EditTrackNumber simple={editModal} />
    </SearchTable>
  );
});
