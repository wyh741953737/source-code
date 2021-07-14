import React from 'react';
import style from './index.less';
import BreadcrumbHeader from '@/components/BreadcrumbHeader';
import {
  Input,
  Form,
  Table,
  Alert,
  Space,
  Button,
  Image,
  InputNumber,
} from 'antd';
import { indexHooks } from './hooks';
import ImagePreview from '@/components/ImagePreview';
import SKUView from '@/components/SKUView';
import OperateLayout from '@/components/OperateLayout';
import ExceptionModal from '@/components/ExceptionModal';
import propertyTraversal from '@/utils/propertyUtils';
import { connect } from 'dva';
import { defaultColumns } from '@/utils';
import { Link } from 'umi';
import { MARKWARRANTSTATUS } from '@/enum.config';
interface Params {
  [key: string]: string | number;
}
export default BreadcrumbHeader([
  { name: '入库' },
  { name: '分标管理', url: '/minuteMarkManage' },
  { name: '分标' },
])(
  connect(({ common }: any) => ({
    warehouseId: common.warehouseId,
  }))(({ warehouseId }) => {
    const {
      form,
      onPressEnter,
      onPressEnterContainer,
      dataSource,
      onValueChange,
      exception,
      minuteMarkConfirm,
      printSku,
      onContainerChange,
      onShelfNum,
      setExceptionIndex,
      containerEl,
      currentContainer,
      currentScanNumber,
      numberEl,
      itemConfirm,
      withDraw,
      isMarkConfirm,
    } = indexHooks(warehouseId);
    const columns = defaultColumns([
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
        title: 'sku',
        dataIndex: 'sku',
        key: 'sku',
        align: 'left',
        width: 160,
        fixed: 'left',
        render: (text: any, record: any) => {
          return (
            <Link
              style={{ color: '#000000d9' }}
              to={`/productDetail/${record.productId}`}
              target="_blank"
            >
              <SKUView text={text} shortText={record.shotNum} />
            </Link>
          );
        },
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
        title: '标记备注',
        dataIndex: 'signRemark',
        key: 'signRemark',
      },
      {
        title: '签收仓库',
        dataIndex: 'storageName',
        key: 'storageName',
        align: 'left',
      },
      {
        title: '预计到货数量',
        dataIndex: 'quantity',
        key: 'quantity',
        align: 'left',
      },
      {
        title: '实际数量',
        dataIndex: 'subStandardQuantity',
        key: 'subStandardQuantity',
        align: 'left',
        width: 120,
        render: (text: number, record: any, index: number) => (
          <InputNumber
            value={isNaN(Number(text)) ? 0 : Number(text)}
            min={0}
            maxLength={7}
            precision={0}
            onChange={e => onValueChange(index, { subStandardQuantity: e })}
            disabled={
              record.exceptionPost ||
              record.confirmPost ||
              record.subStandardStatus == MARKWARRANTSTATUS.yes.key ||
              record.putStorageNumberStatus == MARKWARRANTSTATUS.yes.key
            }
          />
        ),
      },
      {
        title: '合格数量',
        dataIndex: 'qualifiedQuantity',
        key: 'qualifiedQuantity',
        align: 'left',
        width: 120,
        render: (text: number, record: any, index: number) => {
          let min: number = Math.min(
            record.quantity,
            record.subStandardQuantity,
          );
          return (
            <InputNumber
              value={isNaN(Number(text)) ? 0 : Number(text)}
              min={0}
              max={Number(min)}
              precision={0}
              onChange={e => onValueChange(index, { qualifiedQuantity: e })}
              disabled={
                record.exceptionPost ||
                record.confirmPost ||
                record.subStandardStatus == MARKWARRANTSTATUS.yes.key ||
                record.putStorageNumberStatus == MARKWARRANTSTATUS.yes.key
              }
            />
          );
        },
      },
      {
        title: '次品数量',
        dataIndex: 'noQualifiedQuantity',
        key: 'noQualifiedQuantity',
        align: 'left',
        width: 150,
        render: (text: number, record: any, index: number) => {
          let min: number = Math.min(
            record.subStandardQuantity,
            record.quantity,
          );
          let diff: number = min - record.qualifiedQuantity;
          return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {diff > 0 ? diff : 0}
              <Button
                size="large"
                type="default"
                className={style.marginLeft}
                onClick={() => printSku(record, 6)}
                disabled={
                  (record.subStandardStatus == MARKWARRANTSTATUS.yes.key ||
                    record.putStorageNumberStatus ==
                      MARKWARRANTSTATUS.yes.key) &&
                  diff > 0
                    ? false
                    : !record.confirmPost || diff <= 0
                }
              >
                打印
              </Button>
            </div>
          );
        },
      },
      {
        title: '少货数量',
        dataIndex: 'lessGoods',
        key: 'lessGoods',
        align: 'left',
        render: (text: string, record: any) => {
          let diff: number = record.quantity - record.subStandardQuantity;
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
          let diff: number = record.subStandardQuantity - record.quantity;
          return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {diff > 0 ? diff : 0}
              <Button
                size="large"
                type="default"
                value="打印"
                className={style.marginLeft}
                onClick={() => printSku(record, 2)}
                disabled={
                  (record.subStandardStatus == MARKWARRANTSTATUS.yes.key ||
                    record.putStorageNumberStatus ==
                      MARKWARRANTSTATUS.yes.key) &&
                  diff > 0
                    ? false
                    : !record.confirmPost || diff <= 0
                }
              >
                打印
              </Button>
            </div>
          );
        },
      },
      {
        title: '系统重量（g）',
        dataIndex: 'systemWeight',
        key: 'systemWeight',
        align: 'left',
      },
      {
        title: '长（cm）',
        dataIndex: 'length',
        key: 'length',
        align: 'left',
      },
      {
        title: '宽（cm）',
        dataIndex: 'width',
        key: 'width',
        align: 'left',
      },
      {
        title: '高（cm）',
        dataIndex: 'height',
        key: 'height',
        align: 'left',
      },
      {
        title: '是否抛货',
        dataIndex: 'isLarge',
        key: 'isLarge',
        align: 'left',
        render: (text: string, record: any) => {
          return text == '0' ? '否' : '是';
        },
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        width: 150,
        align: 'left',
        fixed: 'right',
        render: (text: string, record: any, index: number) => {
          let min: number = Math.min(
            record.subStandardQuantity,
            record.quantity,
          );
          let exceptionNumber: number = min - record.qualifiedQuantity;
          const usedContainerNum = form.getFieldsValue().container.trim();
          let recordParams: Params = {
            relatedId: record.id, //关联主键i
            productId: record.productId, //商品id
            variantId: record.variantId, //变体id
            sku: record.sku, //变体sku
            batchNumber: record.batchNumber, //批次号
            image: record.image, //sku图片
            putStoragNumber: record.putStoragNumber, //入库编号
            type: 1, //0：签收异常，1：分标异常，2：质检异常，4：称重异常，5：上架异常
            quantity: exceptionNumber, //异常数量=实际数量-合格数量
            unexceptionQuantity: record.qualifiedQuantity, //无异常数量或合格数量
            createBy: record.createBy, //创建人
            expectQuantity: record.quantity, //预计到货数量
            realQuantity: record.subStandardQuantity, //实际数量
            storageId: record.storageId, //仓库ID
            usedContainerNum,
          };

          return (
            <Space direction="vertical">
              {exceptionNumber > 0 ? (
                <Button
                  size="large"
                  type="primary"
                  onClick={() => {
                    setExceptionIndex(index);
                    exception.show(recordParams, exceptionNumber);
                  }}
                  disabled={
                    record.exceptionPost ||
                    record.subStandardStatus == MARKWARRANTSTATUS.yes.key ||
                    record.putStorageNumberStatus == MARKWARRANTSTATUS.yes.key
                  }
                >
                  异常
                </Button>
              ) : null}
              <Button
                size="large"
                type="primary"
                onClick={() => itemConfirm(record, index)}
                disabled={
                  record.confirmPost ||
                  (exceptionNumber > 0 && !record.exceptionPost) ||
                  record.subStandardStatus == MARKWARRANTSTATUS.yes.key ||
                  record.putStorageNumberStatus == MARKWARRANTSTATUS.yes.key
                }
              >
                确认
              </Button>
              <Button
                size="large"
                type="primary"
                onClick={() => withDraw(record, index)}
                disabled={
                  !record.confirmPost ||
                  isMarkConfirm ||
                  record.subStandardStatus == MARKWARRANTSTATUS.yes.key ||
                  record.putStorageNumberStatus == MARKWARRANTSTATUS.yes.key
                }
              >
                撤回
              </Button>
            </Space>
          );
        },
      },
      {
        title: 'sku条码打印',
        dataIndex: '',
        key: '',
        width: 120,
        align: 'left',
        fixed: 'right',
        render: (text: string, record: any) => (
          <Space direction="vertical">
            {/* <Button size="large">自动打印</Button> */}
            <Button
              size="large"
              onClick={() => printSku(record, 1)}
              disabled={
                (record.subStandardStatus == MARKWARRANTSTATUS.yes.key ||
                  record.putStorageNumberStatus == MARKWARRANTSTATUS.yes.key) &&
                record.qualifiedQuantity == 0
                  ? false
                  : !(record.confirmPost && record.qualifiedQuantity > 0)
              }
            >
              &nbsp;打印&nbsp;
            </Button>
          </Space>
        ),
      },
    ]);
    let morePutStorageNumber = Array.from(
      new Set(dataSource.map(item => item.putStorageNumber)),
    ).join(',');

    return (
      <OperateLayout
        title=""
        form={form}
        empty={!dataSource || dataSource.length == 0}
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
              onBlur={!onShelfNum ? onPressEnterContainer : () => false}
              ref={containerEl}
            />
          </Form.Item>,
          <Form.Item
            label="扫描包裹"
            name="packageNumber"
            rules={[
              { required: true, message: '请扫描运单号/入库单号/批次号' },
            ]}
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
        otherDescript={<p>当前绑定容器：{currentContainer || '-'}</p>}
      >
        <Alert
          message={
            <div className={style.alertStyle}>
              <span className={style.number}>
                入库单号：
                <span className={style.value}>
                  {dataSource.length > 0 ? morePutStorageNumber : '-'}
                </span>
              </span>
              <span className={style.number} style={{ marginLeft: '20px' }}>
                当前扫描包裹：
                <span className={style.value}>{currentScanNumber}</span>
              </span>
              <span className={style.number} style={{ marginLeft: '20px' }}>
                当前采购单号：
                <span className={style.value}>
                  {dataSource.length > 0 ? dataSource[0].orderNumber : '-'}
                </span>
              </span>
              <span className={style.number} style={{ marginLeft: '20px' }}>
                当前采购人：
                <span className={style.value}>
                  {dataSource.length > 0 ? dataSource[0].purchaser : '-'}
                </span>
              </span>
              <Button
                type="primary"
                disabled={
                  isMarkConfirm ||
                  dataSource.every(
                    (item: any) =>
                      item.subStandardStatus == MARKWARRANTSTATUS.yes.key ||
                      item.putStorageNumberStatus == MARKWARRANTSTATUS.yes.key,
                  ) ||
                  dataSource.length === 0
                }
                onClick={minuteMarkConfirm.onClick}
                loading={minuteMarkConfirm.loading}
                style={{ position: 'absolute' }}
              >
                分标确认
              </Button>
            </div>
          }
          type="info"
          style={{ marginBottom: 5 }}
        />
        <Table
          // @ts-ignore
          columns={columns}
          dataSource={dataSource}
          scroll={{ x: 2000 }}
          pagination={false}
          rowKey={(record: any) => record.id}
        />
        <div className={style.detailContent}>
          {dataSource.map(item => (
            <Detail info={item} key={item.id} />
          ))}
        </div>
        <ExceptionModal exception={exception} />
      </OperateLayout>
    );
  }),
);

interface DetailProps {
  info: any;
}
const Detail: React.FC<DetailProps> = ({ info }) => {
  return (
    <div className={style.detail}>
      <div className={style.header}>
        <div>
          变体信息：<span className={style.value}>{info.sku}</span>
        </div>
        <div>
          预计到货数量：<span className={style.value}>{info.quantity}</span>
        </div>
      </div>
      <div className={style.container}>
        <Image
          alt="图片预览"
          placeholder={true}
          fallback={require('@/assist/cjlogo.png')}
          src={`${info.image}?x-oss-process=image/resize,w_200,m_lfit`}
          preview={true}
          width={390}
          height={390}
        />
      </div>
    </div>
  );
};
