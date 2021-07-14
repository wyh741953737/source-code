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
import SimpleModal from '@/components/SimpleModalForm';
import { BATCHNUMBERTYPE } from '@/enum.config';
import { connect } from 'dva';
import propertyTraversal from '@/utils/propertyUtils';
import { Link } from 'umi';
export default BreadcrumbHeader([
  { name: '入库' },
  { name: '称重管理', url: '/weighManage' },
  { name: '称重' },
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
      simpleForm,
      weightConfirm,
      onContainerChange,
      containerEl,
      submitAudit,
      currentContainer,
      currentScanNumber,
      numberEl,
    } = indexHooks(warehouseId);
    const columns = [
      {
        title: '图片',
        dataIndex: 'image',
        key: 'image',
        align: 'left',
        width: 80,
        fixed: 'left',
        render: (text: any) => (
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
              (
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
        render: (text: any) => {
          return BATCHNUMBERTYPE.key(Number(text))?.value || '-';
        },
      },
      {
        title: '质检数量',
        dataIndex: 'subStandardQuantity',
        key: 'subStandardQuantity',
        align: 'left',
        render: (text: boolean) => {
          return text ? text : 0;
        },
      },
      {
        title: '称重数量',
        dataIndex: 'weighQuantity',
        key: 'weighQuantity',
        align: 'left',
        render: (text: number, record: any, index: number) => (
          <InputNumber
            value={isNaN(Number(text)) ? 0 : Number(text)}
            min={0}
            max={Number(record.subStandardQuantity)}
            maxLength={7}
            precision={0}
            onChange={e => onValueChange(index, { weighQuantity: e })}
          />
        ),
      },
      {
        title: '少货数量',
        dataIndex: 'smallNum',
        key: 'smallNum',
        align: 'left',
        render: (text: string, record: any) => {
          let diff: number = record.subStandardQuantity - record.weighQuantity;
          return diff > 0 ? diff : 0;
        },
      },
      // {
      //   title: '多货数量',
      //   dataIndex: 'bigNum',
      //   key: 'bigNum',
      //   align: 'left',
      //   render: (text: string, record: any) => {
      //     let diff: number = record.weighQuantity - record.subStandardQuantity;
      //     return diff > 0 ? diff : 0;
      //   },
      // },
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
        title: '实际重量（g）',
        dataIndex: 'realityWeight',
        key: 'realityWeight',
        align: 'left',
        render: (text: number, record: any, index: number) => (
          <InputNumber
            value={isNaN(Number(text)) ? 0 : Number(text)}
            min={1}
            onChange={e => onValueChange(index, { realityWeight: e })}
            onBlur={() => submitAudit(record)}
          />
        ),
      },
      {
        title: '长（cm）',
        dataIndex: 'length',
        key: 'length',
        align: 'left',
        render: (text: number, record: any, index: number) => (
          <InputNumber
            value={isNaN(Number(text)) ? 0 : Number(text)}
            min={1}
            maxLength={7}
            onChange={e => onValueChange(index, { length: e })}
          />
        ),
      },
      {
        title: '宽（cm）',
        dataIndex: 'width',
        key: 'width',
        align: 'left',
        render: (text: number, record: any, index: number) => (
          <InputNumber
            value={isNaN(Number(text)) ? 0 : Number(text)}
            min={1}
            maxLength={7}
            onChange={e => onValueChange(index, { width: e })}
          />
        ),
      },
      {
        title: '高（cm）',
        dataIndex: 'height',
        key: 'height',
        align: 'left',
        render: (text: number, record: any, index: number) => (
          <InputNumber
            value={isNaN(Number(text)) ? 0 : Number(text)}
            min={1}
            maxLength={7}
            onChange={e => onValueChange(index, { height: e })}
          />
        ),
      },
      {
        title: '是否抛货',
        dataIndex: 'isLarge',
        key: 'isLarge',
        align: 'left',
        render: (text: boolean) => {
          return text ? '是' : '否';
        },
      },
      {
        title: '质检人',
        dataIndex: 'createBy',
        key: 'createBy',
        align: 'left',
      },
      {
        title: '操作',
        dataIndex: '',
        key: '',
        width: 80,
        align: 'left',
        fixed: 'right',
        render: (text: string, record: any) => {
          return (
            <Space direction="vertical">
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
                onClick={() => weightConfirm(record)}
                disabled={
                  record.confirmPost || record.weighStatus == '1' ? true : false
                }
              >
                确认
              </Button>
            </Space>
          );
        },
      },
    ];
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
                  {dataSource.length > 0 ? dataSource[0].putStorageNumber : '-'}
                </span>
              </span>
              <span className={style.number} style={{ marginLeft: '20px' }}>
                当前扫描商品条形码：
                <span className={style.value}>{currentScanNumber}</span>
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
        <div
          className={style.imgList}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          {dataSource.map(item => (
            <Image
              alt="图片预览"
              placeholder={true}
              fallback={require('@/assist/cjlogo.png')}
              src={`${item.image}?x-oss-process=image/resize,w_300,m_lfit`}
              preview={true}
              width={330}
              height={330}
            />
          ))}
        </div>
        <SimpleModal simple={simpleForm} />
      </OperateLayout>
    );
  }),
);
