import React from 'react';
import style from './index.less';
import BreadcrumbHeader from '@/components/BreadcrumbHeader';
import {
  Input,
  Form,
  Table,
  Space,
  Button,
  Select,
  Descriptions,
  Divider,
} from 'antd';
import { indexHooks } from './hooks';
import OperateLayout from '@/components/OperateLayout';
import { defaultColumns } from '@/utils';
const { Option } = Select;
export default BreadcrumbHeader([
  { name: '出库' },
  { name: '称重出库' },
  { name: '包裹打印', url: '/packagePrint' },
  { name: '揽收出库' },
])(() => {
  const {
    form,
    onPressEnter,
    info,
    dataSource,
    printSku,
    logisticData,
    confirmDelete,
    logisticChange,
    companyAccount,
    containerEl,
  } = indexHooks();
  const columns = defaultColumns([
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      align: 'left',
      width: 80,
      fixed: 'left',
      render: (text: any, record: any, index: number) => index + 1,
    },
    {
      title: '包裹号',
      dataIndex: 'packageNumber',
      key: 'packageNumber',
      align: 'left',
    },
    {
      title: '包裹数量(票)',
      dataIndex: 'packageQuantity',
      key: 'packageQuantity',
      align: 'left',
    },

    {
      title: '净重(KG)',
      dataIndex: 'netWeight',
      key: 'netWeight',
      align: 'left',
    },
    {
      title: '毛重(KG)',
      dataIndex: 'grossWeight',
      key: 'grossWeight',
      align: 'left',
    },

    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 80,
      align: 'left',
      fixed: 'right',
      render: (text: string, record: any) => {
        return (
          <Space direction="vertical">
            <Button
              size="small"
              type="primary"
              onClick={() => confirmDelete(record)}
            >
              删除
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
      empty={false}
      className={style.resetOperate}
      otherDescript={<div>物流账号：{companyAccount || '-'}</div>}
      searchItems={[
        <Form.Item
          label="选择物流公司"
          name="logisticsCompany"
          rules={[{ required: true, message: '请选择物流公司' }]}
        >
          <Select
            placeholder={'请选择'}
            showSearch
            style={{ width: '200px' }}
            optionFilterProp="children"
            filterOption={(input: any, option: any) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            onChange={logisticChange}
          >
            {logisticData.map(item => (
              <Option key={item.id} value={item.companyCnName}>
                {item.companyCnName}
              </Option>
            ))}
          </Select>
        </Form.Item>,
        <Form.Item
          label="扫描包裹"
          name="packageNumber"
          rules={[{ required: true, message: '请扫描条形码/输入包裹编号' }]}
        >
          <Input
            placeholder="请扫描条形码/输入包裹编号"
            onPressEnter={onPressEnter}
            ref={containerEl}
          />
        </Form.Item>,
      ]}
    >
      <div style={{ color: '#000000', padding: '15px 0', fontSize: '16px' }}>
        <span className={style.number}>
          出库编号:
          <span className={style.value}>{info ? info.receiveNumber : '-'}</span>
        </span>
      </div>
      <Table
        // @ts-ignore
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        rowKey={(record: any) => record.id}
      />

      <div className={style.detailContent}>
        <Divider
          style={{ height: '1px', background: '#ccc', marginBottom: '40px' }}
        />
        <Detail info={info} key={null} />

        <div
          style={{
            textAlign: 'right',
            padding: '40px 100px',
            color: '#000000',
          }}
        >
          揽收人签字：
        </div>
        <div className={style.btnLayout}>
          <Button type="primary" disabled={!info} onClick={() => printSku()}>
            打印
          </Button>
        </div>
      </div>
    </OperateLayout>
  );
});

interface DetailProps {
  info: any;
}
const Detail: React.FC<DetailProps> = ({ info }) => {
  const {
    logisticsCompany,
    storageName,
    netWeight,
    grossWeight,
    bagsQuantity,
    packangQuantity,
  } = info
    ? info
    : {
        logisticsCompany: '',
        storageName: '',
        netWeight: '',
        grossWeight: '',
        bagsQuantity: '',
        packangQuantity: '',
      };
  return (
    <>
      <Descriptions column={{ xxl: 3, xl: 3, lg: 3, md: 2, sm: 2, xs: 1 }}>
        <Descriptions.Item label={'物流公司'}>
          {logisticsCompany || '-'}
        </Descriptions.Item>

        <Descriptions.Item label={'大包裹数量(袋)'}>
          {bagsQuantity || '-'}
        </Descriptions.Item>

        <Descriptions.Item label={'包裹总净重(KG)'}>
          {netWeight || '-'}
        </Descriptions.Item>

        <Descriptions.Item label={'仓库'}>
          {storageName || '-'}
        </Descriptions.Item>

        <Descriptions.Item label={'小包裹数量(量)'}>
          {packangQuantity || '-'}
        </Descriptions.Item>

        <Descriptions.Item label={'包裹总毛重(KG)'}>
          {grossWeight || '-'}
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};
