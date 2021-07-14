import React from 'react';
import BreadcrumbHeader from '@/components/BreadcrumbHeader';
import {
  Button,
  Col,
  Descriptions,
  Empty,
  Form,
  Input,
  Row,
  Spin,
  Table,
  Progress,
} from 'antd';
import SearchTable from '@/components/SearchTable';
import style from './index.less';
import { indexHooks } from './hooks';
import Storage from '@/utils/storage';
import { GetList } from '@/services/directSend.d';
import { BarcodeOutlined, InboxOutlined } from '@ant-design/icons/lib';
import { dateTimeFormat, defaultColumns } from '@/utils';
import ConsumableModal from '@/pages/directSend/consumableModal';
// import PackageInfoModal from '@/pages/directSend/packageInfoModal';
import GxOrderModal from '@/components/CustomerInfo/gxhOrderModal';
import GxhProductModal from '@/components/CustomerInfo/gxhProductModal';
import ItemContent, { Status } from './item';
import { connect } from 'dva';
import propertyTraversal from '@/utils/propertyUtils';
import { AuthJudge } from '@cckj/cj-authority';
import { AUTH } from '~/authority';
export default BreadcrumbHeader([
  { name: '出库' },
  { name: '验货包装' },
  { name: '代发单' },
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
        giveUp,
        // stopPackage,
        checked,
        consumableModal,
        // packageInfoModal,
        submitAbnormalBtn,
        // tSContainerModal,
        hasAllChecked,
        allOrderList,
        packageBtn,
        currentProgress,
        jumpNextOrder,
        allOrderLength,
        endCheckGoods,
        showCustomerInfo,
        gxhOrderModal,
        gxhProductModal,
      } = indexHooks(warehouseId);
      const userInfo = Storage.localGet('_USERINFO_');
      // 是否可以封箱
      const packageAble = Object.keys(checked).length !== 0;
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
        {
          title: '操作',
          dataIndex: 'id',
          key: 'id',
          align: 'left',
          width: 100,
          fixed: 'right',
          render: (text: string) => {
            return (
              <Button
                onClick={() => giveUp(text)}
                type="link"
                size="small"
                disabled={hasAllChecked}
              >
                撤销封箱
              </Button>
            );
          },
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
                {/*<Button*/}
                {/*  type="primary"*/}
                {/*  ghost*/}
                {/*  disabled={!hasAllChecked}*/}
                {/*  className={style.btns}*/}
                {/*  onClick={stopPackage}*/}
                {/*>*/}
                {/*  暂不打包*/}
                {/*</Button>*/}
                <span className={style.operate}>
                  操作人：<span className={style.name}>{userInfo.name}</span>
                </span>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <AuthJudge code={AUTH.YSBZ003001}>
              <Button
                type="primary"
                icon={<InboxOutlined />}
                onClick={packageBtn.onClick}
                loading={packageBtn.loading}
                className={style.btns}
                disabled={!packageAble}
                onKeyPress={e => {
                  e.preventDefault();
                }}
              >
                封箱
              </Button>
            </AuthJudge>
            <AuthJudge code={AUTH.YSBZ003002}>
              <Button
                type="primary"
                className={style.btns}
                disabled={!searchForm.dataSource[0] || hasAllChecked}
                onClick={submitAbnormalBtn.onClick}
                loading={submitAbnormalBtn.loading}
              >
                提交异常
              </Button>
            </AuthJudge>
            <Button
              type="primary"
              className={style.btns}
              disabled={!searchForm.dataSource[0]}
              onClick={jumpNextOrder.onClick}
              loading={jumpNextOrder.loading}
            >
              跳过当前订单
            </Button>
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
                <span>
                  当前框位：
                  <span>{searchForm.dataSource[0]?.frameLocation || '-'}</span>
                </span>
              </div>
            </Col>
            <div className={style.progress}>
              验单进度：
              {allOrderLength > 0 ? (
                <span>
                  {currentProgress} / {allOrderLength}
                </span>
              ) : (
                '-'
              )}
            </div>
            <div className={style.endCheckFace}>
              <Button
                type="primary"
                onClick={endCheckGoods.onClick}
                loading={endCheckGoods.loading}
              >
                结束验货
              </Button>
            </div>
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
                    showCustomerInfo={() => showCustomerInfo(item)}
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
          <ConsumableModal modal={consumableModal} />
          {/* <PackageInfoModal modal={packageInfoModal} /> */}
          {/*<TSContainerModal modal={tSContainerModal} />*/}

          <GxOrderModal modal={gxhOrderModal} />
          <GxhProductModal modal={gxhProductModal} />
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
