import React from 'react';
import { connect } from 'dva';
import { Table, Space, Button, Dropdown, Menu } from 'antd';
import SearchForm from './searchForm';
import SearchTable from '@/components/SearchTable';
import { indexHooks } from './hooks';
import { dateTimeFormat, defaultColumns } from '@/utils';
import style from './index.less';
import { CopyOutlined, DownOutlined } from '@ant-design/icons/lib';
import EditDispatcher from './components/editDispatcher';
import PackageDetail from '@/components/PackageDetail';
import Log from '@/components/Log';
import { PACKAGEPORPERTY, OUTPUTRECEIPTTYPE } from '@/enum.config';
import { AuthJudge } from '@cckj/cj-authority';
import { AUTH } from '~/authority';
/**
 * 未发货
 */

const { SubMenu } = Menu;
export default connect(({ orderDispatchWaiting }: any) => ({
  searchData: orderDispatchWaiting.searchData,
  dataSource: orderDispatchWaiting.dataSource,
  current: orderDispatchWaiting.current,
  pageSize: orderDispatchWaiting.pageSize,
  total: orderDispatchWaiting.total,
  loading: orderDispatchWaiting.loading,
}))(({ dataSource, loading, current, pageSize, total, dispatch }) => {
  const {
    onChange,
    onSelectChange,
    selected,
    editModal,
    confirmDelivery,
    cancelDispatcher,
    batchPrintPackageNumber,
    batchExport,
    exportCustomInfo,
    singlePrintPackageNumber,
    detailModal,
    checkDetail,
    logModal,
    checkLog,
    deletePackage,
    addPackage,
    editPackage,
    confirmDeliveryPackage,
  } = indexHooks(dispatch);
  const columns = defaultColumns([
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      align: 'left',
      width: 80,
      fixed: 'left',
      render: (text: any, record: any, index: number) => index + 1,
    },
    {
      title: '调度编号',
      dataIndex: 'dispatchNumber',
      key: 'dispatchNumber',
      align: 'left',
      fixed: 'left',
    },
    {
      title: '货代名称',
      dataIndex: 'goodsLoanName',
      key: 'goodsLoanName',
      align: 'left',
    },
    {
      title: '转出仓',
      dataIndex: 'sourceStorehouseName',
      key: 'sourceStorehouseName',
      align: 'left',
    },
    {
      title: '到达仓',
      dataIndex: 'targetStorehouseName',
      key: 'targetStorehouseName',
      align: 'left',
    },
    {
      title: '创建人',
      dataIndex: 'createBy',
      key: 'createBy',
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
      title: '备注',
      dataIndex: 'remarks',
      key: 'remarks',
      align: 'left',
    },
    {
      title: '发货状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      align: 'left',
      render: (text: number, record: any) => {
        const receiptedArr = record.schedulingPackageList.filter(
          (item: any) => item.status != 0,
        );
        return (
          <span className={style.spanAction}>
            {receiptedArr.length}/ {record.schedulingPackageList.length}
          </span>
        );
      },
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 300,
      align: 'left',
      fixed: 'right',
      render: (text: number, record: any) => {
        return (
          <Space direction="horizontal">
            <AuthJudge code={AUTH.DING001004}>
              <Button
                size="small"
                type="primary"
                onClick={() => editModal.show(record)}
              >
                编辑
              </Button>
            </AuthJudge>
            <AuthJudge code={AUTH.DING001005}>
              <Button
                size="small"
                type="primary"
                onClick={() => addPackage(record)}
              >
                新增包裹
              </Button>
            </AuthJudge>
            <AuthJudge code={AUTH.DING001006}>
              <Button
                size="small"
                type="primary"
                onClick={() => confirmDelivery(record)}
              >
                确认发货
              </Button>
            </AuthJudge>
            <AuthJudge code={AUTH.DING001007}>
              <Button
                size="small"
                type="default"
                danger
                onClick={() => cancelDispatcher(record)}
              >
                删除
              </Button>
            </AuthJudge>
          </Space>
        );
      },
    },
  ]);
  const expandedRowRender = (record: any) => {
    return (
      <>
        {record.schedulingPackageList.map((item: any) => {
          const MenuAction = (
            <Menu>
              {item.status === 0 ? (
                <AuthJudge code={AUTH.DING001003}>
                  <Menu.Item onClick={() => editPackage(record, item)}>
                    编辑
                  </Menu.Item>
                </AuthJudge>
              ) : null}

              {item.status === 0 ? (
                <AuthJudge code={AUTH.DING001007}>
                  <Menu.Item onClick={() => deletePackage(item)}>
                    删除
                  </Menu.Item>
                </AuthJudge>
              ) : null}
              <Menu.Item onClick={() => checkDetail(item)}>查看详情</Menu.Item>
              {item.status === 0 ? (
                <AuthJudge code={AUTH.DING001006}>
                  <Menu.Item
                    onClick={() => confirmDeliveryPackage(record, item)}
                  >
                    确认发货
                  </Menu.Item>
                </AuthJudge>
              ) : null}
              <AuthJudge code={AUTH.DING001002}>
                <Menu.Item
                  onClick={() => singlePrintPackageNumber(record, item)}
                >
                  打印包裹编号
                </Menu.Item>
              </AuthJudge>
              <AuthJudge code={AUTH.DING001003}>
                <Menu.Item onClick={() => exportCustomInfo(item)}>
                  导出报关信息
                </Menu.Item>
              </AuthJudge>
            </Menu>
          );
          return (
            <div key={item.id} className={style['expanded-item']}>
              <div>
                <span title={item.parcelNumber}>
                  包裹编号：{item.parcelNumber || '-'}
                  <CopyOutlined
                    className={style.copy}
                    onClick={() => checkLog(item)}
                  />
                </span>
                <span title={PACKAGEPORPERTY.key(item.packProperty)?.value}>
                  包裹属性：
                  {PACKAGEPORPERTY.key(item.packProperty)?.value || '-'}
                </span>
                <span title={item.trackingNumber}>
                  运单号：{item.trackingNumber || '-'}
                </span>
              </div>
              <div>
                <span>
                  包裹尺寸：{item.length || '-'}*{item.width || '-'}*
                  {item.height || '-'}
                </span>
                <span title={item.weight}>重量：{item.weight || '-'}</span>
                <span title={item.remarks}>备注：{item.remarks || '-'}</span>
                <span>
                  状态：{OUTPUTRECEIPTTYPE.key(item.status)?.value || '-'}
                </span>
              </div>

              <span>
                <Dropdown overlay={MenuAction}>
                  <Button size="small">
                    更多操作 <DownOutlined />
                  </Button>
                </Dropdown>
              </span>
            </div>
          );
        })}
      </>
    );
  };
  const exportNode = (
    <Menu>
      <Menu.Item>
        <a onClick={() => batchExport(1)}>杭州模版报关文件</a>
      </Menu.Item>
      <Menu.Item>
        <a onClick={() => batchExport(2)}>上海模版清单文件</a>
      </Menu.Item>
      <Menu.Item>
        <a onClick={() => batchExport(3)}>清关文件</a>
      </Menu.Item>
      <Menu.Item>
        <a onClick={() => batchExport(4)}>报关文件</a>
      </Menu.Item>
    </Menu>
  );
  return (
    <SearchTable
      searchFormRender={<SearchForm />}
      operateBtnRender={
        <Space>
          <AuthJudge code={AUTH.DING001001}>
            <Button type="primary" onClick={() => editModal.show()}>
              新增调度任务
            </Button>
          </AuthJudge>
          <AuthJudge code={AUTH.DING001002}>
            <Button type="primary" onClick={batchPrintPackageNumber}>
              打印包裹编号
            </Button>
          </AuthJudge>
          <AuthJudge code={AUTH.DING001003}>
            <Dropdown overlay={exportNode} placement="bottomRight" arrow>
              <Button type="primary">导出</Button>
            </Dropdown>
          </AuthJudge>
        </Space>
      }
    >
      <Table
        // @ts-ignore
        columns={columns}
        bordered
        rowKey={record => record.id}
        scroll={{ x: 1600 }}
        dataSource={dataSource}
        loading={loading}
        expandable={{
          expandedRowRender,
          rowExpandable: record =>
            record.schedulingPackageList &&
            record.schedulingPackageList.length > 0,
        }}
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

      <EditDispatcher modal={editModal} />
      <PackageDetail modal={detailModal} />
      <Log modal={logModal} />
    </SearchTable>
  );
});
