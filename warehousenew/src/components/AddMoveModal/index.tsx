import React, { useEffect, useState } from 'react';
import {
  Form,
  Modal,
  Select,
  Input,
  Col,
  Button,
  Table,
  Row,
  message,
} from 'antd';
import { ModalProps } from '@/hooks/useModal';
import useOptions from '@/hooks/useOptions';
import { warehouseApply } from '@/option.apply';
import useSearchForm from '@/hooks/useSearchForm';
import * as api from '@/services/moveInWarehouse';
import { STORETYPE, SERVICECOMMODITYFLAG } from '@/enum.config';
import { connect } from 'dva';

interface Props {
  modal: ModalProps;
  warehouseId: string;
  title: string;
  okText: string;
  type?: 1 | 2 | 3;
}

const Index: React.FC<Props> = ({
  modal,
  warehouseId,
  title,
  okText,
  type,
}) => {
  const { visible, close, onOk, loading } = modal;
  const searchForm = useSearchForm(
    async e => {
      let dataSource = [];
      try {
        const resp = await api.getInventorys(
          {
            storehouseId: e.searchData.storehouseId,
            skuOrNum: e.searchData.sku ? e.searchData.sku.trim() : '',
            locationName: e.searchData.locationName
              ? e.searchData.locationName.trim()
              : '',
          },
          type ? type : 1,
        );
        dataSource = resp.data;
      } catch (e) {}
      return { dataSource };
    },
    [],
    { noAutoFetch: true },
  );
  const { form } = searchForm;
  useEffect(() => {
    if (visible) {
      searchForm.resetSearchForm();
      searchForm.form.setFieldsValue({ storehouseId: warehouseId });
      setSelected({ keys: [], rows: [] });
    }
  }, [visible, warehouseId]);
  const [option] = useOptions(warehouseApply, { interval: Infinity });
  const layout = { labelCol: { span: 10 }, wrapperCol: { span: 14 } };
  const search = async () => {
    const values = await form.validateFields();
    searchForm.search({ nextSearchData: values });
  };
  const [selected, setSelected] = useState({ keys: [], rows: [] });
  const onSelectChange = (keys: any, rows: any) => {
    setSelected({ keys, rows });
  };
  // 校验sku，成功设置variantId（查询需要的入参）
  const validateVariantId = async (rule: any, value: any) => {
    const locationName = form.getFieldValue('locationName');
    if (!value && !locationName) {
      return Promise.reject('SKU/短码和库位至少输入一个');
    }
  };
  const validateLocationName = async (rule: any, value: any) => {
    const sku = form.getFieldValue('sku');
    if (!value && !sku) {
      return Promise.reject('SKU/短码和库位至少输入一个');
    }
  };
  const columns = [
    { title: 'SKU', dataIndex: 'sku', key: 'sku', width: 180 },
    { title: '短码', dataIndex: 'shortCode', key: 'shortCode', width: 120 },
    {
      title: '仓库名称',
      dataIndex: 'storehouseId',
      key: 'storehouseId',
      width: 120,
      render: (text: string) => option.menu.key(text)?.value || '-',
    },
    {
      title: '货主编号',
      dataIndex: 'customerId',
      key: 'customerId',
      width: 120,
    },
    {
      title: '服务商品',
      dataIndex: 'isServiceGoods',
      key: 'isServiceGoods',
      width: 120,
      render: (text: number) => SERVICECOMMODITYFLAG.key(text)?.value,
    },
    {
      title: '容器名称',
      dataIndex: 'containerNum',
      key: 'containerNum',
      width: 120,
      render: (text: string, record: any) => {
        return [text, record.locationName].filter(Boolean).join('/');
      },
    },
    {
      title: '库存类型',
      dataIndex: 'type',
      key: 'type',
      width: 120,
      render: (text: number) => STORETYPE.key(text)?.value || '-',
    },
    {
      title: '实物库存',
      dataIndex: 'realityQuantity',
      key: 'realityQuantity',
      width: 120,
    },
    {
      title: '可用库存',
      dataIndex: 'availableQuantity',
      key: 'availableQuantity',
      width: 120,
    },
    {
      title: '占用库存',
      dataIndex: 'useQuantity',
      key: 'useQuantity',
      width: 120,
    },
    {
      title: '冻结库存',
      dataIndex: 'frozenQuantity',
      key: 'frozenQuantity',
      width: 120,
    },
  ];
  return (
    <Modal
      title={title}
      width={1000}
      visible={visible}
      onCancel={close}
      onOk={async () => {
        const select: any = selected.rows[0];
        if (!select) return message.warn(`请选择被${okText}容器`);
        const values = await form.validateFields();
        onOk(values, {
          ...select,
          storageName: option.menu.key(select.storehouseId),
        });
      }}
      confirmLoading={loading}
      okText={okText}
      maskClosable={false}
    >
      <>
        <Form form={form}>
          <Row>
            <Col span={5}>
              <Form.Item
                name="storehouseId"
                label="仓库名称"
                {...layout}
                rules={[{ required: true, message: '请选择仓库' }]}
              >
                <Select
                  getPopupContainer={triggerNode => triggerNode.parentNode}
                  placeholder="请选择"
                >
                  {option.menu.map(item => (
                    <Select.Option key={item.key} value={item.key}>
                      {item.value}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="sku"
                label="SKU/短码"
                dependencies={['locationName']}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                rules={[
                  { validator: validateVariantId },
                  { whitespace: true, message: '不能为空' },
                ]}
              >
                <Input placeholder="请输入" allowClear />
              </Form.Item>
              <Form.Item name="variantId" hidden />
            </Col>
            <Col span={5}>
              <Form.Item
                name="locationName"
                label="库位"
                dependencies={['variantId']}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                rules={[
                  { validator: validateLocationName },
                  { whitespace: true, message: '不能为空' },
                ]}
              >
                <Input placeholder="请输入" allowClear />
              </Form.Item>
            </Col>
            <Col span={5} offset={1}>
              <Button type="primary" onClick={search}>
                查询
              </Button>
            </Col>
          </Row>
        </Form>
        <Table
          // @ts-ignore
          columns={columns}
          bordered
          rowKey={record => record.id}
          dataSource={searchForm.dataSource}
          loading={searchForm.loading}
          scroll={{ x: 1500, y: 600 }}
          onRow={record => ({
            onClick: () => onSelectChange([record.id], [record]),
          })}
          rowSelection={{
            fixed: true,
            onChange: onSelectChange,
            selectedRowKeys: selected.keys,
            type: 'radio',
          }}
          pagination={false}
        />
      </>
    </Modal>
  );
};
export default connect(({ common }: any) => ({
  warehouseId: common.warehouseId,
}))(Index);
