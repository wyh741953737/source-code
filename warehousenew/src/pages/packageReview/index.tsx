import React from 'react';
import BreadcrumbHeader from '@/components/BreadcrumbHeader';
import { Col, Descriptions, Empty, Form, Input, Row, Spin, Table } from 'antd';
import SearchTable from '@/components/SearchTable';
import style from './index.less';
import { indexHooks } from './hooks';
import Storage from '@/utils/storage';
import { GetList } from '@/services/directSend.d';
import { BarcodeOutlined, InboxOutlined } from '@ant-design/icons/lib';
import { dateTimeFormat, defaultColumns } from '@/utils';
import ItemContent, { Status } from './item';
import { connect } from 'dva';
import propertyTraversal from '@/utils/propertyUtils';
export default BreadcrumbHeader([
  { name: '出库' },
  { name: '验货包装' },
  { name: '打包复核' },
])(
  connect(({ common }: any) => ({ warehouseId: common.warehouseId }))(
    ({ warehouseId }) => {
      const {
        searchForm,
        containerEnter,
        SKUEnter,
        containerRef,
        skuRef,
        historySearch,
      } = indexHooks(warehouseId);
      const userInfo = Storage.localGet('_USERINFO_');
      // 是否可以封箱
      const columns2 = defaultColumns([
        {
          title: '包裹编号',
          dataIndex: 'packCode',
          key: 'packCode',
          align: 'left',
          fixed: 'left',
        },
        {
          title: '耗材条码',
          dataIndex: 'consumablesNum',
          key: 'consumablesNum',
          align: 'left',
        },
        {
          title: '商品数量',
          dataIndex: 'packQuantity',
          key: 'packQuantity',
          align: 'left',
        },
        {
          title: '运单号',
          dataIndex: 'trackingNumber',
          key: 'trackingNumber',
          align: 'left',
        },
        {
          title: '操作人',
          dataIndex: 'createBy',
          key: 'createBy',
          align: 'left',
        },
        {
          title: '操作时间',
          dataIndex: 'createAt',
          key: 'createAt',
          align: 'left',
          render: (text: string) => dateTimeFormat(text),
        },
      ]);
      const SearchForm = (
        <Form form={searchForm.form} style={{ position: 'relative' }}>
          <Row>
            <Col style={{ width: 320 }}>
              <Form.Item
                label="容器编号"
                name="containerId"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
              >
                <Input
                  ref={containerRef}
                  placeholder="请扫描容器编号"
                  onPressEnter={containerEnter}
                  onFocus={() => containerRef.current?.select()}
                  prefix={<BarcodeOutlined />}
                />
              </Form.Item>
            </Col>
            <Col style={{ width: 320 }}>
              <Form.Item
                label="扫描商品SKU"
                name="skuId"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
              >
                <Input
                  ref={skuRef}
                  placeholder="请扫描商品SKU"
                  onPressEnter={SKUEnter}
                  onFocus={() => skuRef.current?.select()}
                  prefix={<BarcodeOutlined />}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item>
                <span className={style.operate}>
                  操作人：<span className={style.name}>{userInfo.name}</span>
                </span>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className={style.details}>
                <span>
                  业务员：
                  <span>
                    {searchForm.dataSource[0]?.customerNameByYW || '-'}
                  </span>
                </span>
                <span>
                  订单号：
                  <span>{searchForm.dataSource[0]?.orderId || '-'}</span>
                </span>
              </div>
            </Col>
          </Row>
        </Form>
      );
      return (
        <SearchTable searchFormRender={SearchForm}>
          <div className={style.container}>
            {searchForm.loading && (
              <Spin spinning={true}>
                {!searchForm.dataSource[0] && (
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                )}
              </Spin>
            )}
            {searchForm.dataSource[0]?.list
              .sort((a, b) => b.pendingVerify - a.pendingVerify)
              .map((item: GetList.ListItem, index: number) => {
                let status: Status = 'dealing';
                if (item.processedVerify === 0) status = 'pending';
                if (item.pendingVerify === 0) status = 'finish';
                return (
                  <ItemContent
                    key={item.sku + index}
                    data={item}
                    status={status}
                  />
                );
              })}
          </div>
          <>
            <div className={style.title}>
              <InboxOutlined />
              &nbsp;封箱记录
            </div>
            <Table
              // @ts-ignore
              columns={columns2}
              rowKey={r => r.id}
              scroll={{ x: 1200, y: 400 }}
              dataSource={historySearch.dataSource}
              loading={historySearch.loading}
              expandable={{ expandedRowRender }}
              pagination={{
                current: historySearch.current,
                pageSize: historySearch.pageSize,
                total: historySearch.total,
                onChange: historySearch.onChange,
              }}
            />
          </>
        </SearchTable>
      );
    },
  ),
);

const expandedRowRender = (record: any) => {
  return record.storehousePackRecordDTOs.map((s: any, index: number) => (
    <Descriptions column={4} key={s.variantSku + index}>
      <Descriptions.Item label="商品名称">{s.productName}</Descriptions.Item>
      <Descriptions.Item label="商品SKU">{s.variantSku}</Descriptions.Item>
      <Descriptions.Item label="属性">
        {propertyTraversal(s.variantKeyMap)}
      </Descriptions.Item>
      <Descriptions.Item label="数量">{s.processedQuantity}</Descriptions.Item>
    </Descriptions>
  ));
};
