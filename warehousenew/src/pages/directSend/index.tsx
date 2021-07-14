import React from 'react';
import BreadcrumbHeader from '@/components/BreadcrumbHeader';
import {
  Button,
  Col,
  Descriptions,
  Form,
  Input,
  Row,
  Table,
  Progress,
} from 'antd';
import SearchTable from '@/components/SearchTable';
import style from './index.less';
import { indexHooks } from '@/pages/directSend/hooks';
import Storage from '@/utils/storage';
import { BarcodeOutlined, InboxOutlined } from '@ant-design/icons/lib';
import ImagePreview from '@/components/ImagePreview';
import { dateTimeFormat, defaultColumns } from '@/utils';
import ConsumableModal from '@/pages/directSend/consumableModal';
import PackageInfoModal from '@/pages/directSend/packageInfoModal';
import { connect } from 'dva';
import propertyTraversal from '@/utils/propertyUtils';
import { AuthJudge } from '@cckj/cj-authority';
import { AUTH } from '~/authority';
export default BreadcrumbHeader([
  { name: '出库' },
  { name: '验货包装' },
  { name: '直发单' },
])(
  connect(({ common }: any) => ({ warehouseId: common.warehouseId }))(
    ({ warehouseId }) => {
      const {
        searchForm,
        containerEnter,
        SKUEnter,
        expandedRowKeys,
        setExpandedRowKeys,
        containerRef,
        skuRef,
        historySearch,
        rowClassName,
        giveUp,
        packageBtn,
        checked,
        consumableModal,
        packageInfoModal,
        submitAbnormal,
        hasAllChecked,
        currentProgress,
        jumpNextOrder,
        allOrderLength,
        isSingle,
        endCheckGoods,
      } = indexHooks(warehouseId);
      const userInfo = Storage.localGet('_USERINFO_');
      // 是否可以封箱
      const packageAble = Object.keys(checked).length !== 0;
      const columns = defaultColumns([
        {
          title: '待验数',
          dataIndex: 'pendingVerify',
          key: 'pendingVerify',
          align: 'center',
          fixed: 'left',
          width: 100,
        },
        {
          title: '已验货',
          dataIndex: 'processedVerify',
          key: 'processedVerify',
          align: 'center',
          fixed: 'left',
          width: 100,
        },
        {
          title: 'CJ订单号',
          dataIndex: 'orderId',
          key: 'orderId',
          align: 'left',
        },
        {
          title: '运单号',
          dataIndex: 'logisticsTrackingNumber',
          key: 'logisticsTrackingNumber',
          align: 'left',
        },
        {
          title: '客户名称',
          dataIndex: 'customerName',
          key: 'customerName',
          align: 'left',
        },
        {
          title: '业务员',
          dataIndex: 'customerNameByYW',
          key: 'customerNameByYW',
          align: 'left',
        },
        {
          title: '物流渠道',
          dataIndex: 'logisticsChannel',
          key: 'logisticsChannel',
          align: 'left',
        },
        {
          title: '操作',
          dataIndex: 'id',
          key: 'id',
          align: 'left',
          width: 100,
          fixed: 'right',
          render: (text: string) => (
            <Button
              type="primary"
              size="small"
              disabled={hasAllChecked}
              onClick={submitAbnormal}
            >
              提交异常
            </Button>
          ),
        },
      ]);
      const columns3 = defaultColumns([
        {
          title: '待验数',
          dataIndex: 'pendingVerify',
          key: 'pendingVerify',
          align: 'center',
          width: 100,
        },
        {
          title: '已验货',
          dataIndex: 'processedVerify',
          key: 'processedVerify',
          align: 'center',
          width: 100,
        },
        {
          title: '图片',
          dataIndex: 'variantImg',
          key: 'variantImg',
          align: 'left',
          width: 100,
          render: (text: string) => <ImagePreview key={text} url={text} />,
        },
        {
          title: 'SKU',
          dataIndex: 'variantSku',
          key: 'variantSku',
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
          title: '短码',
          dataIndex: 'variantNum',
          key: 'variantNum',
          align: 'left',
        },
        {
          title: '名称',
          dataIndex: 'productName',
          key: 'productName',
          align: 'left',
        },
        {
          title: '商品属性',
          dataIndex: 'property',
          key: 'property',
          align: 'left',
        },
        { title: '备注', dataIndex: 'remarks', key: 'remarks', align: 'left' },
      ]);
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
                  placeholder="请扫描容器编号/CJ订单号"
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
            <Col>
              <Form.Item>
                <span className={style.operate}>
                  操作人：<span className={style.name}>{userInfo.name}</span>
                </span>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <AuthJudge code={AUTH.YSBZ002001}>
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
          <Table
            // @ts-ignore
            columns={columns}
            scroll={{ x: 1200 }}
            loading={searchForm.loading}
            rowKey={record => record.id}
            dataSource={searchForm.dataSource}
            pagination={{
              current: searchForm.current,
              pageSize: searchForm.pageSize,
              total: searchForm.total,
              className: style.hide,
            }}
            expandable={{
              // expandIconColumnIndex: -1,
              defaultExpandAllRows: true,
              expandedRowKeys,
              onExpandedRowsChange: expandedRows => {
                setExpandedRowKeys(expandedRows as string[]);
              },
              expandedRowRender: (record: any) => (
                <Table
                  // @ts-ignore
                  columns={columns3}
                  size="small"
                  rowKey={(r: any) => r.sku}
                  dataSource={record.list}
                  scroll={{ y: 350 }}
                  rowClassName={rowClassName}
                />
              ),
            }}
          />
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
          <PackageInfoModal modal={packageInfoModal} />
        </SearchTable>
      );
    },
  ),
);

const expandedRowRender = (record: any) => {
  return record.storehousePackRecordDTOs.map((s: any) => (
    <Descriptions column={4} key={s.id}>
      <Descriptions.Item label="商品名称：">{s.productName}</Descriptions.Item>
      <Descriptions.Item label="商品SKU">{s.variantSku}</Descriptions.Item>
      <Descriptions.Item label="属性">
        {propertyTraversal(s.variantKeyMap)}
      </Descriptions.Item>
      <Descriptions.Item label="数量">{s.processedQuantity}</Descriptions.Item>
      <Descriptions.Item label="拣货库位">
        {s.locationList && s.locationList.length > 0
          ? s.locationList[0].locationName
          : '-'}
      </Descriptions.Item>
    </Descriptions>
  ));
};
