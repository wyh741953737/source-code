import React from 'react';
import { connect } from 'dva';
import { Table, Form, Button } from 'antd';
import BreadcrumbHeader from '@/components/BreadcrumbHeader';
import SearchForm from './searchForm';
import SearchTable from '@/components/SearchTable';
import { indexHooks } from './hooks';
import ImagePreview from '@/components/ImagePreview';
import {
  TIMEOUTORDERSTATUS,
  OUTBOUNDORDERCOLUMN,
  OUTBOUNDISDEDUCTION,
} from '@/enum.config';
import LogModal from './components/log';
import PrintModal from './components/printModal';
import ExceptionModal from './components/exceptionModal';
import style from './index.less';
import TileSelect from '@/components/CustomFields/TileSelect';
import propertyTraversal from '@/utils/propertyUtils';
import { defaultColumns } from '@/utils';
export default BreadcrumbHeader([{ name: '出库' }, { name: '出库单查询' }])(
  connect(({ outBoundOrder, common }: any) => ({
    searchData: outBoundOrder.searchData,
    dataSource: outBoundOrder.dataSource,
    current: Number(outBoundOrder.current),
    pageSize: Number(outBoundOrder.pageSize),
    total: outBoundOrder.total,
    loading: outBoundOrder.loading,
    tabData: outBoundOrder.tabData,
    columnTag: outBoundOrder.columnTag,
    warehouseId: common.warehouseId,
  }))(
    ({
      searchData,
      dataSource,
      loading,
      current,
      pageSize,
      total,
      tabData,
      columnTag,
      warehouseId,
      dispatch,
    }: any) => {
      const [form] = Form.useForm();
      const {
        onChange,
        showLog,
        submitToWeight,
        routerDetail,
        exceptModal,
        changeType,
        selected,
        onSelectChange,
        deductionStore,
        releaseStore,
        printModal,
        directExport,
        commonExport,
      } = indexHooks(
        dispatch,
        dataSource,
        searchData,
        tabData,
        warehouseId,
        form,
      );

      const columns = OUTBOUNDORDERCOLUMN.key(columnTag)?.fn(
        dispatch,
        routerDetail,
        showLog,
        submitToWeight,
        printModal,
        exceptModal,
        searchData?.status,
      );
      const expandedRowRender = (record: any) => {
        const columns1 = defaultColumns([
          {
            title: '图片',
            dataIndex: 'image',
            key: 'image',
            align: 'left',
            width: 80,
            fixed: 'left',
            render: (text: any, record: any) => (
              <ImagePreview key={text} url={text} size={50} prevSize={300} />
            ),
          },
          {
            title: 'SKU',
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
            title: '商品名称',
            dataIndex: 'productName',
            key: 'productName',
            align: 'left',
          },
          {
            title: '是否到货',
            dataIndex: 'isDeduction',
            key: 'isDeduction',
            align: 'left',
            render: (text: number) => (
              <span style={{ color: '#ffb900' }}>
                {OUTBOUNDISDEDUCTION.key(text)?.value2 || '-'}
              </span>
            ),
          },
          {
            title: '属性',
            dataIndex: 'property',
            key: 'property',
            align: 'left',
          },
          {
            title: '重量(g)',
            dataIndex: 'weight',
            key: 'weight',
            align: 'left',
          },
          {
            title: '数量',
            dataIndex: 'quantity',
            key: 'quantity',
            align: 'left',
          },
          {
            title: '原价($)',
            dataIndex: 'originalPrice',
            key: 'originalPrice',
            align: 'left',
          },
          {
            title: '总价($)',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            align: 'left',
          },
          {
            title: '折后价($)',
            dataIndex: 'discountPrice',
            key: 'discountPrice',
            align: 'left',
          },
          {
            title: '折后总价($)',
            dataIndex: 'totalPriceAfterDiscount',
            key: 'totalPriceAfterDiscount',
            align: 'left',
          },
        ]);
        return (
          record.detailResultList.length > 0 && (
            <Table
              // @ts-ignore
              columns={columns1}
              rowKey={r => r.id}
              dataSource={record.detailResultList}
              pagination={false}
              scroll={{ y: 200 }}
            />
          )
        );
      };
      return (
        <>
          <div className={style.statusLayout}>
            <TileSelect
              hideAll={true}
              isHuth={true}
              options={tabData}
              value={searchData.status}
              onChange={changeType}
            />
          </div>
          <SearchTable
            searchFormRender={<SearchForm form={form} />}
            operateBtnRender={
              <>
                {searchData.status === 0 || searchData.status === 10 ? (
                  <Button type="primary" onClick={deductionStore}>
                    抵扣库存
                  </Button>
                ) : null}
                {searchData.status === 0 ||
                searchData.status === 1 ||
                searchData.status === 10 ? (
                  <Button type="primary" onClick={releaseStore}>
                    释放库存
                  </Button>
                ) : null}
                {searchData.status === 6 ? (
                  <Button
                    type="primary"
                    onClick={directExport.onClick}
                    loading={directExport.loading}
                  >
                    直发单清单导出
                  </Button>
                ) : null}
                <Button
                  type="primary"
                  onClick={commonExport.onClick}
                  loading={commonExport.loading}
                >
                  导出
                </Button>
              </>
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
              expandable={{ expandedRowRender }}
              rowSelection={
                searchData.status === 0 ||
                searchData.status === 1 ||
                searchData.status === 10
                  ? {
                      fixed: true,
                      onChange: onSelectChange,
                      selectedRowKeys: selected.keys,
                    }
                  : undefined
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
              rowClassName={(record, index) => {
                const statusObj = TIMEOUTORDERSTATUS.key(record.controlStatus);
                /**
                 * 针对超时未处理状态下的数据根据异常状态controlStatus字段展示不同的行背景色值
                 */
                if (columnTag === 'timeout')
                  return `${style[statusObj?.class]}`;
                return '';
              }}
            />
            <LogModal />
            <PrintModal modal={printModal} />
            <ExceptionModal modal={exceptModal} />
          </SearchTable>
        </>
      );
    },
  ),
);
