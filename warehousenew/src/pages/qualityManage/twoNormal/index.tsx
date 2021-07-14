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
  InputNumber,
  Image,
} from 'antd';
import { indexHooks } from './hooks';
import ImagePreview from '@/components/ImagePreview';
import SKUView from '@/components/SKUView';
import OperateLayout from '@/components/OperateLayout';
import ExceptionModal from '@/components/ExceptionModal';
import SimpleModal from '@/components/SimpleModalForm';
import { BATCHNUMBERTYPE } from '@/enum.config';
import { connect } from 'dva';
import { defaultColumns } from '@/utils';
import propertyTraversal from '@/utils/propertyUtils';
import { Link } from 'umi';
interface Params {
  [key: string]: string | number;
}
export default BreadcrumbHeader([
  { name: '入库' },
  { name: '质检管理', url: '/qualityManage' },
  { name: '二次质检' },
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
      simpleForm,
      qualityConfirm,
      onShelfNum,
      onContainerChange,
      containerEl,
      printBatchNumber,
      currentContainer,
      currentScanNumber,
      numberEl,
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
            <div>
              <Link
                style={{ color: '#000000d9' }}
                to={`/productDetail/${record.productId}`}
                target="_blank"
              >
                <SKUView text={text} shortText={record.shotNum} />
              </Link>
              <div>{propertyTraversal(record.variantKeyMap)}</div>;
            </div>
          );
        },
      },
      {
        title: '批次类型',
        dataIndex: 'batchNumberType',
        key: 'batchNumberType',
        align: 'left',
        render: (text: any, record: any) => {
          return BATCHNUMBERTYPE.key(Number(text))?.value || '-';
        },
      },
      {
        title: '标记备注',
        dataIndex: 'signRemark',
        key: 'signRemark',
      },
      {
        title: '分标数量',
        dataIndex: 'subStandardQuantity',
        key: 'subStandardQuantity',
        align: 'left',
        render: (text: boolean) => {
          return text ? text : 0;
        },
      },

      {
        title: '质检数量',
        dataIndex: 'inspectionQuantity',
        key: 'inspectionQuantity',
        align: 'left',
        render: (text: number, record: any, index: number) => (
          <InputNumber
            value={isNaN(Number(text)) ? 0 : Number(text)}
            min={0}
            maxLength={7}
            precision={0}
            onChange={e => onValueChange(index, { inspectionQuantity: e })}
            disabled={
              record.exceptionPost ||
              record.confirmPost ||
              record.qualityTestingStatus == '1'
            }
          />
        ),
      },
      {
        title: '合格数量',
        dataIndex: 'qualifiedQuantity',
        key: 'qualifiedQuantity',
        align: 'left',
        render: (text: number, record: any, index: number) => {
          let min: number = Math.min(
            record.inspectionQuantity,
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
                record.qualityTestingStatus == '1'
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
        render: (text: number, record: any, index: number) => {
          let min: number = Math.min(
            record.inspectionQuantity,
            record.subStandardQuantity,
          );
          let diff: number = min - record.qualifiedQuantity;
          const num = diff > 0 ? diff : 0;
          return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {diff > 0 ? diff : 0}
              <Button
                size="large"
                type="primary"
                className={style.marginLeft}
                onClick={() => printBatchNumber(record, 3, num)}
                disabled={
                  !record.confirmPost ||
                  diff <= 0 ||
                  record.qualityTestingStatus == '1'
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
        dataIndex: 'smallNum',
        key: 'smallNum',
        align: 'left',
        render: (text: string, record: any) => {
          let diff: number =
            record.subStandardQuantity - record.inspectionQuantity;
          return diff > 0 ? diff : 0;
        },
      },
      {
        title: '多货数量',
        dataIndex: 'bigNum',
        key: 'bigNum',
        align: 'left',
        render: (text: string, record: any) => {
          let diff: number =
            record.inspectionQuantity - record.subStandardQuantity;
          const num = diff > 0 ? diff : 0;
          return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {diff > 0 ? diff : 0}
              <Button
                size="large"
                type="primary"
                className={style.marginLeft}
                onClick={() => printBatchNumber(record, 4, num)}
                disabled={
                  !record.confirmPost ||
                  diff <= 0 ||
                  record.qualityTestingStatus == '1'
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
        render: (text: boolean) => {
          return text ? text : 0;
        },
      },
      {
        title: '系统包装重量（g）',
        dataIndex: 'systemPackingWeight',
        key: 'systemPackingWeight',
        align: 'left',
        render: (text: boolean) => {
          return text ? text : 0;
        },
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
        render: (text: string) => {
          return Number(text) ? '是' : '否';
        },
      },
      {
        title: '分标人',
        dataIndex: 'createBy',
        key: 'createBy',
        align: 'left',
      },
      {
        title: '采购人',
        dataIndex: 'purchaser',
        key: 'purchaser',
        align: 'left',
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        width: 80,
        align: 'left',
        fixed: 'right',
        render: (text: number, record: any) => {
          const usedContainerNum = form.getFieldsValue().container.trim();
          let min: number =
            record.inspectionQuantity > record.subStandardQuantity
              ? record.subStandardQuantity
              : record.inspectionQuantity;
          let exceptionNumber: number = min - record.qualifiedQuantity;
          let recordParams: Params = {
            relatedId: record.id, //关联主键i
            productId: record.productId, //商品id
            variantId: record.variantId, //变体id
            sku: record.sku, //变体sku
            batchNumber: record.batchNumber, //批次号
            image: record.image, //sku图片
            putStoragNumber: record.putStoragNumber, //入库编号
            type: 2, //0：签收异常，1：分标异常，2：质检异常，4：称重异常，5：上架异常
            quantity: exceptionNumber, //异常数量=实际数量-合格数量
            unexceptionQuantity: record.qualifiedQuantity, //无异常数量或合格数量
            expectQuantity: record.subStandardQuantity, //预计到货数量
            realQuantity: record.inspectionQuantity, //实际数量
            storageId: record.storageId, //仓库ID
            usedContainerNum,
          };
          return (
            <Space direction="vertical">
              {exceptionNumber > 0 ? (
                <Button
                  size="large"
                  type="primary"
                  onClick={() => exception.show(recordParams, exceptionNumber)}
                  disabled={
                    record.exceptionPost || record.qualityTestingStatus == '1'
                  }
                >
                  异常
                </Button>
              ) : null}

              <Button
                size="large"
                type="primary"
                onClick={() => simpleForm.show(record)}
              >
                补打
              </Button>
              <Button
                size="large"
                type="primary"
                onClick={() => qualityConfirm(record)}
                disabled={
                  record.confirmPost ||
                  (exceptionNumber > 0 && !record.exceptionPost) ||
                  record.qualityTestingStatus == '1'
                    ? true
                    : false
                }
              >
                确认
              </Button>
            </Space>
          );
        },
      },
    ]);
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
            label="扫描商品条形码"
            name="searchId"
            rules={[{ required: true, message: '请扫描商品条形码' }]}
            getValueFromEvent={event => {
              return event.target.value.replace(/\s+/g, '');
            }}
          >
            <Input
              placeholder="请扫描商品条形码"
              onPressEnter={onPressEnter}
              ref={numberEl}
            />
          </Form.Item>,
        ]}
        otherDescript={<p>当前绑定容器：{currentContainer || '-'}</p>}
      >
        <Alert
          message={
            <>
              <span className={style.number}>
                入库单号：
                <span className={style.value}>
                  {dataSource && dataSource.length > 0
                    ? dataSource[0].putStorageNumber
                    : '-'}
                </span>
              </span>
              <span className={style.number} style={{ marginLeft: '20px' }}>
                当前扫描商品条形码：
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
            </>
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
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {dataSource.map(item => (
            <Image
              alt="图片预览"
              fallback={require('@/assist/cjlogo.png')}
              src={`${item.image}?x-oss-process=image/resize,w_500,m_lfit`}
              preview={true}
              width={330}
              height={330}
              placeholder={true}
            />
          ))}
        </div>
        <ExceptionModal exception={exception} />
        <SimpleModal simple={simpleForm} />
      </OperateLayout>
    );
  }),
);
