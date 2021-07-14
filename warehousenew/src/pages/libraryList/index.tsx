import React, { useCallback, useState } from 'react';
import { connect } from 'dva';
import { Table, Modal, Radio, Button, Space } from 'antd';
import BreadcrumbHeader from '@/components/BreadcrumbHeader';
import SearchForm from './searchForm';
import SearchTable from '@/components/SearchTable';
import { indexHooks } from './hooks';
import { LIBRARYSTATUS } from '@/enum.config';
import { dateTimeFormat, defaultColumns } from '@/utils';
import { PrinterOutlined, SettingOutlined } from '@ant-design/icons/lib';

/**
 * 上架单查询
 */
export default BreadcrumbHeader([{ name: '出库' }, { name: '越库看板' }])(
  connect(({ libraryList, common }: any) => ({
    searchData: libraryList.searchData,
    dataSource: libraryList.dataSource,
    current: Number(libraryList.current),
    pageSize: Number(libraryList.pageSize),
    total: libraryList.total,
    loading: libraryList.loading,
    warehouseId: common.warehouseId,
  }))(
    ({
      searchData,
      dataSource,
      loading,
      current,
      pageSize,
      total,
      dispatch,
      warehouseId,
    }: any) => {
      const columns = defaultColumns([
        {
          title: '越库批次号',
          dataIndex: 'id',
          key: 'id',
          fixed: 'left',
          width: 180,
          align: 'left',
        },
        {
          title: '越库sku',
          dataIndex: 'sku',
          key: 'sku',
        },
        {
          title: '批次号',
          dataIndex: 'batchNumber',
          key: 'batchNumber',
        },
        {
          title: '入库单号',
          dataIndex: 'putStorageNumber',
          key: 'putStorageNumber',
        },
        {
          title: '订单数量',
          dataIndex: 'orderQuantity',
          key: 'orderQuantity',
          render: (text: any, record: any) => (
            <a onClick={() => checkDetail(record, 1)}>{record.orderQuantity}</a>
          ),
        },
        {
          title: '商品数量',
          dataIndex: 'variantQuantity',
          key: 'variantQuantity',
        },
        {
          title: '商品位置',
          dataIndex: 'containerNum',
          key: 'containerNum',
        },
        {
          title: '验单状态',
          dataIndex: 'status',
          key: 'status',
          render: (text: any, record: any) =>
            LIBRARYSTATUS.key(record.status)?.value || '-',
        },
        {
          title: '验单人',
          dataIndex: 'checkName',
          key: 'checkName',
        },
        {
          title: '验单开始时间',
          dataIndex: 'beginAt',
          key: 'beginAt',
          render: (text: string) => dateTimeFormat(text),
        },
        {
          title: '完成验单时间',
          dataIndex: 'endAt',
          key: 'endAt',
          render: (text: string) => dateTimeFormat(text),
        },
        {
          title: '创建时间',
          dataIndex: 'createAt',
          key: 'createAt',
          render: (text: string) => dateTimeFormat(text),
        },
        {
          title: '操作',
          dataIndex: 'action',
          key: 'action',
          render: (text: any, record: any) => {
            return (
              <Space>
                <Button type="primary" onClick={() => checkDetail(record, 2)}>
                  查看
                </Button>
                <Button type="primary" onClick={() => batchPrint(true, record)}>
                  打印批次
                </Button>
              </Space>
            );
          },
        },
      ]);
      const {
        onChange,
        onSelectChange,
        selected,
        checkDetail,
        onOk,
        visible,
        setVisible,
        radioChange,
        batchPrint,
        batchPrintAll,
        queryStatus,
        selectedRadio,
      } = indexHooks(dispatch, searchData);

      // 越库设置选项
      const options = [
        { label: '关闭越库功能', value: 0 },
        { label: '开启越库功能', value: 1 },
      ];

      // 设置越库规则弹框是否显示
      const setModalVisible = useCallback(async () => {
        await queryStatus(warehouseId);
        setVisible(true);
      }, [dataSource, warehouseId]);

      const onCancel = useCallback(() => {
        setVisible(false);
      }, []);
      return (
        <SearchTable
          searchFormRender={<SearchForm />}
          operateBtnRender={
            <Space>
              <Button type="primary" onClick={setModalVisible}>
                越库设置
              </Button>
              <Button
                type="primary"
                onClick={() => batchPrint(false)}
                icon={<PrinterOutlined />}
              >
                批量打印
              </Button>
              <Button onClick={batchPrintAll} icon={<PrinterOutlined />}>
                打印所有未打印批次
              </Button>
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
            rowSelection={{
              fixed: true,
              onChange: onSelectChange,
              selectedRowKeys: selected.keys,
            }}
          />
          <Modal
            title="越库规则设置"
            visible={visible}
            destroyOnClose
            confirmLoading={loading}
            width={550}
            onCancel={onCancel}
            onOk={() => onOk(warehouseId)}
          >
            <Radio.Group
              options={options}
              defaultValue={selectedRadio}
              onChange={e => radioChange(e)}
            />
          </Modal>
        </SearchTable>
      );
    },
  ),
);
