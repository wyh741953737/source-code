import React from 'react';
import BreadcrumbHeader from '@/components/BreadcrumbHeader';
import {
  Input,
  Form,
  Table,
  Alert,
  Space,
  Button,
  Image,
  Tag,
  InputNumber,
  Modal,
  Row,
  Col,
} from 'antd';
import { indexHooks } from './hooks';
import ImagePreview from '@/components/ImagePreview';
import SKUView from '@/components/SKUView';
import ExceptionModal from '@/components/ExceptionModal';
import { connect } from 'dva';
import OperateLayout from '@/components/OperateLayout';
import { defaultColumns, dateTimeFormat } from '@/utils';
import useOptions from '@/hooks/useOptions';
import { warehouseApply } from '@/option.apply';
import GxOrderModal from '@/components/CustomerInfo/gxhOrderModal';
import GxhProductModal from '@/components/CustomerInfo/gxhProductModal';

import style from './index.less';
import { getELinks } from '@cckj/cj-authority';

interface Params {
  [key: string]: string | number;
}

export default BreadcrumbHeader([
  { name: '入库' },
  { name: '分标管理', url: '/minuteMarkManage' },
  { name: 'POD分标' },
])(
  connect(({ common, minuteMarkManage }: any) => ({
    warehouseId: common.warehouseId,
    loading: minuteMarkManage.loading,
  }))(({ warehouseId, loading }) => {
    const [option] = useOptions(warehouseApply, { interval: Infinity });
    const {
      form,
      onPressEnter,
      dataSource,
      onValueChange,
      numberEl,
      changeRowsKey,
      expandedRowKeys,
      containerEl,
      setExceptionIndex,
      onContainerChange,
      onPressEnterContainer,
      customInformation,
      messageVisible,
      setMessageVisible,
      printSku,
      exception,
      openMessageModal,
      itemConfirm,
      messageContent,
      printModalVisible,
      printCancel,
      printChange,
      printNumberChange,
      showPrintWarn,
      setPersonal,
      onSearch,
      onClearSearch,
      gxhOrderModal,
      gxhProductModal,
      initData,
      getLink,
    } = indexHooks(warehouseId);

    const columns = [
      {
        title: '图片',
        dataIndex: 'image',
        key: 'image',
        align: 'left',
        width: 80,
        fixed: 'left',
        render: (text: any, record: any) => (
          <ImagePreview
            url={record.receiptSubStandardDTO.image}
            size={50}
            prevSize={300}
          />
        ),
      },
      {
        title: 'sku',
        dataIndex: 'sku',
        key: 'sku',
        align: 'left',
        width: 240,
        fixed: 'left',
        render: (text: any, record: any) => {
          return (
            <div>
              <div>{record.receiptSubStandardDTO.sku}</div>
              <SKUView
                text={''}
                shortText={record.receiptSubStandardDTO.shotNum}
              />
            </div>
          );
        },
      },
      {
        title: '签收仓库',
        dataIndex: 'storageId',
        key: 'storageId',
        align: 'left',
        render: (text: string, record: any) =>
          option.menu.key(record.receiptSubStandardDTO.storageId)?.value || '-',
      },
      {
        title: '预计到货数量',
        dataIndex: 'quantity',
        key: 'quantity',
        align: 'left',
        render: (text: any, record: any) =>
          record.receiptSubStandardDTO.quantity || 0,
      },
      {
        title: '实际数量',
        dataIndex: '',
        key: '',
        align: 'left',
        render: (text: any, record: any) =>
          record.receiptSubStandardDTO.actualQuantity || 0,
      },
      {
        title: '合格数量',
        dataIndex: 'qualifiedQuantity',
        key: 'qualifiedQuantity',
        align: 'left',
        render: (text: any, record: any) =>
          record.receiptSubStandardDTO.qualifiedQuantity || 0,
      },
      {
        title: '少货数量',
        dataIndex: 'lessProduct',
        key: 'lessProduct',
        align: 'left',
        render: (text: string, record: any) =>
          record.receiptSubStandardDTO.lessProduct || 0,
      },
      {
        title: '多货数量',
        dataIndex: 'moreProduct',
        key: 'moreProduct',
        align: 'left',
        render: (text: string, record: any) =>
          record.receiptSubStandardDTO.moreProduct || 0,
      },
      {
        title: '系统重量（g）',
        dataIndex: 'systemWeight',
        key: 'systemWeight',
        align: 'left',
        render: (text: any, record: any) =>
          record.receiptSubStandardDTO.systemWeight || 0,
      },
      {
        title: '长（cm）',
        dataIndex: 'length',
        key: 'length',
        align: 'left',
        render: (text: any, record: any) =>
          record.receiptSubStandardDTO.length || 0,
      },
      {
        title: '宽（cm）',
        dataIndex: 'width',
        key: 'width',
        align: 'left',
        render: (text: any, record: any) =>
          record.receiptSubStandardDTO.width || 0,
      },
      {
        title: '高（cm）',
        dataIndex: 'height',
        key: 'height',
        align: 'left',
        render: (text: any, record: any) =>
          record.receiptSubStandardDTO.height || 0,
      },
      {
        title: '是否抛货',
        dataIndex: 'isLarge',
        key: 'isLarge',
        align: 'left',
        render: (text: any, record: any) =>
          record.receiptSubStandardDTO.isLarge == 1 ? '是' : '否',
      },
    ];

    const expandedRowRender = (record: any) => {
      const { receiptSubStandardDTO, podOrderList } = record;
      const { id, packageType, productId, variantId } = receiptSubStandardDTO;
      const columns1 = defaultColumns([
        {
          title: 'CJ订单号',
          dataIndex: 'orderId',
          key: 'orderId',
          align: 'left',
          width: 270,
          render: (text: string, record: any) => {
            return (
              <div className={style.tag}>
                {record.orderId}
                {packageType == 2 ? (
                  <Tag className={style.package}>包</Tag>
                ) : null}
                {packageType == 1 ? (
                  <Tag
                    className={style.personal}
                    onClick={() => setPersonal(record)}
                  >
                    个
                  </Tag>
                ) : null}
                {record.message ? (
                  <Tag
                    className={style.stage}
                    onClick={() => openMessageModal(record.message)}
                  >
                    留
                  </Tag>
                ) : null}
                {packageType == 2 ? (
                  <Tag
                    style={{
                      fontSize: '13px',
                      cursor: 'pointer',
                      background: '#fb9f38eb',
                      color: '#fff',
                    }}
                    onClick={() => getLink(record.customDesign)}
                  >
                    导包图
                  </Tag>
                ) : null}
              </div>
            );
          },
        },
        {
          title: '预计到货数量',
          dataIndex: 'quantity',
          key: 'quantity',
          align: 'left',
        },
        {
          title: '到货数量',
          dataIndex: 'arrivalQuantity',
          key: 'arrivalQuantity',
          align: 'left',
          render: (text: number, record: any, index: number) => {
            return (
              <InputNumber
                value={record.arrivalQuantity}
                min={0}
                precision={0}
                onChange={e => onValueChange(index, { arrivalQuantity: e }, id)}
                disabled={record.status == 1}
              />
            );
          },
        },
        {
          title: '合格数量',
          dataIndex: 'qualifiedNum',
          key: 'qualifiedNum',
          align: 'left',
          width: 120,
          render: (text: number, record: any, index: number) => {
            let min: number = Math.min(
              record.quantity,
              record.arrivalQuantity || 0,
            );
            return (
              <InputNumber
                value={record.qualifiedNum}
                min={0}
                max={Number(min)}
                precision={0}
                onChange={e => onValueChange(index, { qualifiedNum: e }, id)}
                disabled={record.status == 1}
              />
            );
          },
        },
        {
          title: '次品数量',
          dataIndex: 'defectiveNum',
          key: 'defectiveNum',
          align: 'left',
          width: 150,
          render: (text: number, record: any, index: number) => {
            let min: number = Math.min(record.arrivalQuantity, record.quantity);
            let diff: number = min - record.qualifiedNum;
            console.log(min, record.qualifiedNum, diff);
            return diff > 0 ? diff : 0;
          },
        },
        {
          title: '少货数量',
          dataIndex: '',
          key: '',
          align: 'left',
          render: (text: string, record: any) => {
            let diff: number = record.quantity - record.arrivalQuantity;
            return diff > 0 ? diff : 0;
          },
        },
        {
          title: '多货数量',
          dataIndex: 'moreGoods',
          key: 'moreGoods',
          align: 'left',
          width: 150,
          render: (text: string, record: any) => {
            let diff: number = record.arrivalQuantity - record.quantity;
            return diff > 0 ? diff : 0;
          },
        },
        {
          title: '操作',
          dataIndex: 'id',
          key: 'id',
          width: 120,
          align: 'left',
          render: (text: number, record: any, index) => {
            let min: number = Math.min(record.arrivalQuantity, record.quantity);
            let exceptionNumber: number = min - record.qualifiedNum;
            let recordParams: Params = {
              productId: record.id, //主键id 对应id
              relatedId: receiptSubStandardDTO.id, // 分标id	对应subId， 要从receiptSubStandardDTO.id取
              quantity:
                min - record.qualifiedNum > 0 ? min - record.qualifiedNum : 0, //次品数量	对应defectiveNum
              expectQuantity:
                record.quantity - record.arrivalQuantity > 0
                  ? record.quantity - record.arrivalQuantity
                  : 0, //  少货数量	对应lackNum
              realQuantity:
                record.arrivalQuantity - record.quantity > 0
                  ? record.arrivalQuantity - record.quantity
                  : 0, //多货数量	对应moreQuantity
              storageId: form.getFieldValue('container'), //  容器编号	 对应containerNum
              unexceptionQuantity: record.arrivalQuantity, // 到货数量， 对应arrivalQuantity
              variantId: record.type, // 是否是定制商品，1是，2位包装
              type: record.qualifiedNum, // 合格数量， 对应qualifiedNum
            };

            return (
              <Space direction="horizontal">
                <Button
                  type="primary"
                  size="small"
                  onClick={() =>
                    itemConfirm(
                      record,
                      receiptSubStandardDTO.id,
                      form.getFieldValue('container'),
                      index,
                      recordParams,
                      exceptionNumber,
                    )
                  }
                  disabled={record.status == 1}
                >
                  确定
                </Button>
                <Button
                  type="primary"
                  size="small"
                  onClick={() =>
                    record.type == 1
                      ? printChange(record.id)
                      : printSku(2, record.id)
                  }
                  disabled={record.status == 0}
                >
                  打印
                </Button>
              </Space>
            );
          },
        },
      ]);
      return (
        <Table
          // @ts-ignore
          columns={columns1}
          rowKey={r => r.id}
          dataSource={podOrderList}
          pagination={false}
        />
      );
    };

    return (
      <OperateLayout
        title=""
        form={form}
        empty={!dataSource}
        searchItems={[
          <Form.Item
            label="扫描容器"
            name="container"
            rules={[{ required: true, message: '请扫描容器编号' }]}
            getValueFromEvent={event => {
              return event.target.value.replace(/\s+/g, '');
            }}
          >
            <Input
              placeholder="请扫描容器编号"
              onPressEnter={onPressEnterContainer}
              onChange={onContainerChange}
              ref={containerEl}
            />
          </Form.Item>,
          <Form.Item
            label="扫描包裹"
            name="number"
            rules={[{ required: true, message: '请扫描包裹' }]}
            getValueFromEvent={event => {
              return event.target.value.replace(/\s+/g, '');
            }}
          >
            <Input
              placeholder="请扫描运单号/入库单号"
              onPressEnter={onPressEnter}
              ref={numberEl}
            />
          </Form.Item>,
        ]}
      >
        {initData.length > 0 && (
          <Form form={form} name="search">
            <Row>
              <Col span={4}>
                <Form.Item name="orderId" label="订单号">
                  <Input placeholder="请输入" maxLength={50} allowClear />
                </Form.Item>
              </Col>
              <Col style={{ margin: '0 30px' }}>
                <Button type="primary" onClick={onSearch}>
                  搜索
                </Button>
              </Col>
              <Col>
                <Button onClick={onClearSearch}>重置</Button>
              </Col>
            </Row>
          </Form>
        )}
        <Alert
          message={
            <span className={style.number}>
              入库单号：
              <span className={style.value}>
                {dataSource.length > 0
                  ? dataSource[0].receiptSubStandardDTO.putStorageNumber
                  : ''}
              </span>
            </span>
          }
          type="info"
          style={{ marginBottom: 5 }}
        />
        <Table
          // @ts-ignore
          columns={columns}
          dataSource={dataSource}
          rowKey={(record: any) => record.receiptSubStandardDTO.id}
          loading={loading}
          scroll={{ x: 2000 }}
          expandable={{
            expandedRowRender,
            rowExpandable: record => {
              return record.podOrderList.length > 0;
            },
          }}
          defaultExpandAllRows={true}
          expandedRowKeys={expandedRowKeys}
          onExpand={(expanded, record) => changeRowsKey(expanded, record)} //点击展开时重新赋值Rowskey
          pagination={false}
        />
        <Modal
          title="采购留言"
          visible={messageVisible}
          onCancel={() => setMessageVisible(false)}
          onOk={() => setMessageVisible(false)}
          destroyOnClose
        >
          {messageContent && messageContent.length > 0 ? (
            messageContent.map((item: any) => (
              <div
                style={{ margin: '4px 0', borderBottom: '1px solid #ebeaea' }}
              >
                <p>
                  <span>业务员：</span>
                  <span>{item.createUserName}</span>
                </p>
                <p>
                  <span>时间: </span>
                  <span>{dateTimeFormat(item.createDate)}</span>
                </p>
                <p>
                  <span>留言内容: </span>
                  <span>{item.message}</span>
                </p>
              </div>
            ))
          ) : (
            <div>
              <p>
                <span>业务员：</span>
                <span>-</span>
              </p>
              <p>
                <span>时间: </span>
                <span>-</span>
              </p>
              <p>
                <span>留言内容: </span>
                <span>-</span>
              </p>
            </div>
          )}
        </Modal>
        <Modal
          title="打印张数"
          visible={printModalVisible}
          onCancel={() => printCancel()}
          onOk={() => printSku(1)}
          destroyOnClose
        >
          <span>打印张数： </span>
          <InputNumber
            min={1}
            maxLength={2}
            style={{ width: '300px' }}
            onChange={(value: any) => printNumberChange(value)}
          />
          {showPrintWarn ? (
            <p style={{ color: 'red', margin: '5px' }}>请输入要打印的张数</p>
          ) : null}
        </Modal>
        <ExceptionModal exception={exception} />
        <GxOrderModal modal={gxhOrderModal} />
        <GxhProductModal modal={gxhProductModal} />
      </OperateLayout>
    );
  }),
);
