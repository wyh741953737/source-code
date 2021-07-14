import React from 'react';
import { connect } from 'dva';
import { Table, Button } from 'antd';
import SearchForm from './searchForm';
import SearchTable from '@/components/SearchTable';
import { indexHooks } from './hooks';
import style from './index.less';
import { CopyOutlined } from '@ant-design/icons/lib';
import PackageDetail from '@/components/PackageDetail';
import Log from '@/components/Log';
import { PACKAGEPORPERTY, ORDERDISPATCHTABLECLOUMN } from '@/enum.config';
/**
 * 已收货
 */
export default connect(({ orderDispatchProcessed }: any) => ({
  searchData: orderDispatchProcessed.searchData,
  dataSource: orderDispatchProcessed.dataSource,
  current: orderDispatchProcessed.current,
  pageSize: orderDispatchProcessed.pageSize,
  total: orderDispatchProcessed.total,
  loading: orderDispatchProcessed.loading,
}))(
  ({ searchData, dataSource, loading, current, pageSize, total, dispatch }) => {
    const { type } = searchData;
    const {
      onChange,
      onSelectChange,
      selected,
      checkDetail,
      checkLog,
      detailModal,
      logModal,
    } = indexHooks(dispatch);
    const columns = ORDERDISPATCHTABLECLOUMN.key(type)?.fn(
      checkDetail,
      checkLog,
    );
    const expandedRowRender = (record: any) => {
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
                </div>
                <span>
                  <Button size="small" onClick={() => checkDetail(item)}>
                    查看详情
                  </Button>
                </span>
              </div>
            );
          })}
        </>
      );
    };
    return (
      <SearchTable searchFormRender={<SearchForm />}>
        <Table
          // @ts-ignore
          columns={columns}
          bordered
          rowKey={record => record.id}
          // scroll={{ x: 1600 }}
          dataSource={dataSource}
          loading={loading}
          expandable={
            type === 'top'
              ? undefined
              : {
                  expandedRowRender,
                  rowExpandable: record =>
                    record.schedulingPackageList &&
                    record.schedulingPackageList.length > 0
                      ? true
                      : false,
                }
          }
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
  },
);
