import React from 'react';
import { connect } from 'dva';
import { Table, Space, Button, Dropdown, Menu } from 'antd';
import SearchForm from './searchForm';
import SearchTable from '@/components/SearchTable';
import { indexHooks } from './hooks';
import { dateTimeFormat, defaultColumns } from '@/utils';
import style from './index.less';
import { DownOutlined } from '@ant-design/icons/lib';
import { CopyOutlined } from '@ant-design/icons/lib';

import PackageDetail from '@/components/PackageDetail';
import Log from '@/components/Log';
import { PACKAGEPORPERTY, OUTPUTRECEIPTTYPE } from '@/enum.config';
import { AuthJudge } from '@cckj/cj-authority';
import { AUTH } from '~/authority';

/**
 * 已发货
 */
export default connect(({ orderDispatchPending }: any) => ({
  searchData: orderDispatchPending.searchData,
  dataSource: orderDispatchPending.dataSource,
  current: orderDispatchPending.current,
  pageSize: orderDispatchPending.pageSize,
  total: orderDispatchPending.total,
  loading: orderDispatchPending.loading,
}))(({ dataSource, loading, current, pageSize, total, dispatch }) => {
  const {
    onChange,
    onSelectChange,
    selected,
    batchExport,
    exportCustomInfo,
    checkDetail,
    checkLog,
    detailModal,
    logModal,
    confirmGoods,
    tagToIntercept,
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
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 100,
      align: 'left',
      fixed: 'right',
      render: (text: number, record: any) => {
        const receiptedArr = record.schedulingPackageList.filter(
          (item: any) => item.status === 2,
        );
        return (
          <span className={style.spanAction}>
            {receiptedArr.length}/ {record.schedulingPackageList.length}
          </span>
        );
      },
    },
  ]);
  const expandedRowRender = (record: any) => {
    const MenuAction = ({ record, item }: any) => {
      return (
        <Menu>
          <Menu.Item onClick={() => checkDetail(item)}>查看详情</Menu.Item>
          {item.status === 1 ? (
            <Menu.Item onClick={() => confirmGoods(record, item)}>
              确认收货
            </Menu.Item>
          ) : null}
          <Menu.Item onClick={() => tagToIntercept(item)}>标记为拦截</Menu.Item>
          <Menu.Item onClick={() => exportCustomInfo(item)}>
            导出报关信息
          </Menu.Item>
        </Menu>
      );
    };
    return (
      <>
        {record.schedulingPackageList.map((item: any) => {
          return (
            <div key={item.id} className={style['expanded-item']}>
              <div>
                <span title={item.parcelNumber}>
                  包裹编号：{item.parcelNumber || '-'}
                  <CopyOutlined
                    className={style.copy}
                    onClick={() => checkLog(item)}
                  />
                  {item.mark && item.mark == 1 ? (
                    <span className={style.interceptSpan}>拦</span>
                  ) : null}
                </span>
                <span title={PACKAGEPORPERTY.key(item.packProperty)?.value}>
                  包裹属性：
                  {PACKAGEPORPERTY.key(item.packProperty)?.value || '-'}
                </span>
                <span title={item.trackingNumber}>
                  运单号：{item.trackingNumber || '-'}
                </span>
                <span></span>
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
                <Dropdown overlay={<MenuAction record={record} item={item} />}>
                  <Button size="small">
                    更多 <DownOutlined />
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
          <AuthJudge code={AUTH.DING003001}>
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
            record.schedulingPackageList.length > 0
              ? true
              : false,
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

      <PackageDetail modal={detailModal} />
      <Log modal={logModal} />
    </SearchTable>
  );
});
