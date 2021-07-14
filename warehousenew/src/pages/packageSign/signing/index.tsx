import React from 'react';
import style from './index.less';
import BreadcrumbHeader from '@/components/BreadcrumbHeader';
import {
  Input,
  Form,
  Select,
  Table,
  Descriptions,
  InputNumber,
  Button,
  Alert,
} from 'antd';
import { indexHooks } from './hooks';
import { connect } from 'dva';
import ImagePreview from '@/components/ImagePreview';
import SKUView from '@/components/SKUView';
import OperateLayout from '@/components/OperateLayout';
import useOptions from '@/hooks/useOptions';
import { warehouseApply } from '@/option.apply';
import {
  PURCHASETYPEOPTIONS,
  PACKAGETYPE,
  PACKGAGEDESCRIPT,
  PURCHASEMARK,
} from '@/enum.config';
import { dateTimeFormat, defaultColumns } from '@/utils';
import propertyTraversal from '@/utils/propertyUtils';
export default BreadcrumbHeader([
  { name: '入库' },
  { name: '包裹签收', url: '/packageSign' },
  { name: '签收' },
])(
  connect(({ common }: any) => ({
    warehouseId: common.warehouseId,
  }))(({ warehouseId }: any) => {
    const {
      form,
      onPressEnter,
      commonList,
      serviceList,
      onValueChange,
      detailsList,
      receiptPackage,
      refuseReceipt,
      isSigning,
      currentScanNumber,
      numberEl,
      initSign,
      showText,
    } = indexHooks();
    const [option] = useOptions(warehouseApply, { interval: Infinity });
    const columns = defaultColumns([
      {
        title: '图片',
        dataIndex: 'image',
        key: 'image',
        align: 'left',
        render: (text: any, record: any) => (
          <ImagePreview key={text} url={text} size={60} prevSize={300} />
        ),
      },
      {
        title: 'sku',
        dataIndex: 'sku',
        key: 'sku',
        align: 'left',
        render: (text: any, record: any) => {
          const packageObj: any = PACKGAGEDESCRIPT.key(
            Number(record.packageType),
          );
          return (
            <SKUView
              text={text}
              shortText={record.shotNum}
              packageType={packageObj.value}
            />
          );
        },
      },
      {
        title: '运单号',
        dataIndex: 'logisticsTrackingNumber',
        key: 'logisticsTrackingNumber',
        align: 'left',
      },
      {
        title: '采购订单号',
        dataIndex: 'orderNumber',
        key: 'orderNumber',
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
        title: '标记',
        dataIndex: 'mark',
        key: 'mark',
        render: (text: any, record: any) =>
          PURCHASEMARK.key(text)?.value || '-',
      },
      {
        title: '标记备注',
        dataIndex: 'signRemark',
        key: 'signRemark',
      },
      {
        title: '入库单号',
        dataIndex: 'putStorageNumber',
        key: 'putStorageNumber',
        align: 'left',
      },
      {
        title: '签收类型',
        dataIndex: 'type',
        key: 'type',
        align: 'left',
        render: (text: any, record: any) => PACKAGETYPE.key(text)?.value || '-',
      },
      {
        title: '采购方式',
        dataIndex: 'purchaserType',
        key: 'purchaserType',
        align: 'left',
        render: (text: any, record: any) =>
          PURCHASETYPEOPTIONS.key(text)?.value || '-',
      },
      {
        title: '采购人',
        dataIndex: 'purchaser',
        key: 'purchaser',
        align: 'left',
      },
      {
        title: '供货公司',
        dataIndex: 'supplier',
        key: 'supplier',
        align: 'left',
      },
      {
        title: '预计到货数量',
        dataIndex: 'quantity',
        key: 'quantity',
        align: 'left',
      },
    ]);
    const detailCloumns = defaultColumns([
      {
        title: '图片',
        dataIndex: 'image',
        key: 'image',
        align: 'left',
        render: (text: any, record: any) => (
          <ImagePreview key={text} url={text} size={60} prevSize={300} />
        ),
      },
      {
        title: 'sku',
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
        title: '实收',
        dataIndex: 'quantity',
        key: 'quantity',
        align: 'left',
        render: (text: number, record: any, index: number) => {
          return (
            <InputNumber
              value={isNaN(Number(text)) ? 0 : Number(text)}
              min={0}
              precision={0}
              onChange={e => onValueChange(index, { quantity: e })}
            />
          );
        },
      },

      {
        title: '损坏',
        dataIndex: 'damagedQuantity',
        key: 'damagedQuantity',
        align: 'left',
        render: (text: number, record: any, index: number) => {
          return (
            <InputNumber
              value={isNaN(Number(text)) ? 0 : Number(text)}
              min={0}
              precision={0}
              onChange={e => onValueChange(index, { damagedQuantity: e })}
            />
          );
        },
      },
    ]);
    const {
      productName,
      storageName,
      batchNumber,
      logisticsTrackingNumber,
      quantity,
      salesmanName,
      customerName,
      deliveryTime,
      feeList,
    } = serviceList;
    return (
      <OperateLayout
        title=""
        form={form}
        empty={(!commonList || commonList.length == 0) && !productName}
        searchItems={[
          <Form.Item
            label="目标仓库"
            name="storageId"
            rules={[{ required: false, message: '请选择目标仓库' }]}
            initialValue={warehouseId}
          >
            <Select
              getPopupContainer={triggerNode => triggerNode.parentNode}
              placeholder="全部"
            >
              {option.menu.map(item => (
                <Select.Option key={item.key} value={item.key}>
                  {item.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>,
          <Form.Item
            name="logisticsTrackingNumber"
            extra="手动输入后回车或聚焦输入框后使用扫描枪扫码"
            rules={[{ required: true, message: '请输入运单号/采购订单号' }]}
            initialValue=""
          >
            <Input
              placeholder="请输入运单号/采购订单号"
              onPressEnter={onPressEnter}
              ref={numberEl}
            />
          </Form.Item>,
        ]}
      >
        {commonList.length > 0 ? (
          <>
            <Alert
              message={
                <span className={style.number} style={{ marginLeft: '20px' }}>
                  当前扫描运单号/采购订单号：
                  <span className={style.value}>{currentScanNumber}</span>
                </span>
              }
              type="info"
              style={{ marginBottom: 5 }}
            />
            <Table
              // @ts-ignore
              columns={columns}
              dataSource={commonList}
              pagination={false}
              rowKey={(record: any) => record.id}
            />
          </>
        ) : null}
        {productName ? (
          <>
            <Descriptions
              title="服务商品入库单"
              style={{ marginTop: '15px' }}
              column={3}
            >
              <Descriptions.Item label="商品名称">
                {productName}
              </Descriptions.Item>
              <Descriptions.Item label="仓库">{storageName}</Descriptions.Item>
              <Descriptions.Item label="批次号">
                {batchNumber}
              </Descriptions.Item>
              <Descriptions.Item label="运单号">
                {logisticsTrackingNumber}
              </Descriptions.Item>
              <Descriptions.Item label="数量">{quantity}</Descriptions.Item>
              <Descriptions.Item label="业务员名称">
                {salesmanName}
              </Descriptions.Item>
              <Descriptions.Item label="客户名称">
                {customerName}
              </Descriptions.Item>
              <Descriptions.Item label="发货时间">
                {deliveryTime ? dateTimeFormat(deliveryTime) : '-'}
              </Descriptions.Item>
              {feeList.map((item: any) => (
                <Descriptions.Item key={item.item_name} label={item.item_name}>
                  {item.status ? '是' : '否'}
                </Descriptions.Item>
              ))}
            </Descriptions>
            <p className={style.title}>包裹列表</p>
            {detailsList.length > 0 ? (
              <Table
                // @ts-ignore
                columns={detailCloumns}
                dataSource={detailsList}
                pagination={false}
                rowKey={(record: any) => record.id}
              />
            ) : null}

            {!isSigning && detailsList.length > 0 && !initSign ? (
              <div className={style.operateBtn}>
                <Button
                  type="primary"
                  onClick={receiptPackage.onClick}
                  loading={receiptPackage.loading}
                >
                  签收
                </Button>
                <Button
                  onClick={refuseReceipt.onClick}
                  loading={refuseReceipt.loading}
                >
                  拒收
                </Button>
              </div>
            ) : null}
          </>
        ) : null}
        {showText && <h2>请将包裹移交至线下组</h2>}
      </OperateLayout>
    );
  }),
);
