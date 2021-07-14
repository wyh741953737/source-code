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
  InputNumber,
  Popconfirm,
} from 'antd';
import { ModalProps } from '@/hooks/useModal';
import useOptions from '@/hooks/useOptions';
import { warehouseApply } from '@/option.apply';
import useSearchForm from '@/hooks/useSearchForm';
import * as api from '@/services/tallyManage';
import { dateTimeFormat, defaultColumns } from '@/utils';
import { STORETYPE, SERVICECOMMODITYFLAG } from '@/enum.config';
import { connect } from 'dva';
import * as regExp from '@/regExp.config';
import { useRef } from 'react';

interface Props {
  modal: ModalProps;
  warehouseId: string;
  title: string;
  okText: string;
  type?: 2;
}

const Index: React.FC<Props> = ({
  modal,
  warehouseId,
  title,
  okText,
  type,
}) => {
  const { visible, close, onOk, loading } = modal;
  const [storehouseId, setStorehouseId] = useState<string>('');
  const searchForm = useSearchForm(
    async e => {
      let dataSource: any = [];
      try {
        const resp = await api.addTallySearch({
          storehouseId: e.searchData.storehouseId,
          skuOrShort: e.searchData.skuOrShort
            ? e.searchData.skuOrShort.trim()
            : '',
          location: e.searchData.location ? e.searchData.location.trim() : '',
        });
        dataSource = Array.isArray(resp.data)
          ? resp.data.map(item => {
              return { ...item, hasDetail: false };
            })
          : [];
      } catch (e) {}
      return { dataSource };
    },
    [],
    { noAutoFetch: true },
  );
  const { form } = searchForm;
  const [formTwo] = Form.useForm();
  useEffect(() => {
    if (visible) {
      searchForm.resetSearchForm();
      searchForm.form.setFieldsValue({ storehouseId: warehouseId });
      setSelected({ keys: [], rows: [] });
    }
  }, [visible, warehouseId]);
  useEffect(() => {
    setDataSource(searchForm.dataSource);
  }, [searchForm.dataSource]);
  const [option] = useOptions(warehouseApply, { interval: Infinity });
  const layout = { labelCol: { span: 10 }, wrapperCol: { span: 14 } };
  const search = async () => {
    const values = await form.validateFields();
    searchForm.search({ nextSearchData: values });
    setDetailData([]);

    setStorehouseId(form.getFieldValue('storehouseId'));
  };
  const [selected, setSelected] = useState({ keys: [], rows: [] });
  const [dataSource, setDataSource] = useState<Array<any>>([]);
  const [detailData, setDetailData] = useState<Array<any>>([]);

  const timer: any = useRef();

  // 校验sku，成功设置variantId（查询需要的入参）
  const validateVariantId = async (rule: any, value: any) => {
    const locationName = form.getFieldValue('location');
    if (!value && !locationName) {
      return Promise.reject('SKU/短码和库位至少输入一个');
    }
  };
  const validateLocationName = async (rule: any, value: any) => {
    const sku = form.getFieldValue('skuOrShort');
    if (!value && !sku) {
      return Promise.reject('SKU/短码和库位至少输入一个');
    }
  };
  const addTallyDetail = (record: any) => {
    let newDetail = JSON.parse(JSON.stringify(detailData));
    newDetail.push(record);
    let newSource = JSON.parse(JSON.stringify(dataSource)).map((item: any) => {
      if (newDetail.map((detail: any) => detail.id).indexOf(item.id) > -1) {
        return { ...item, hasDetail: true };
      } else {
        return { ...item, hasDetail: false };
      }
    });
    setDetailData(newDetail);
    setDataSource(newSource);
    const index = newDetail.length - 1;
    formTwo.setFieldsValue({
      [`toLocationName${index}`]: undefined,
      [`quantity${index}`]: undefined,
    });
  };
  const deleteDetail = (record: any) => {
    let newDetail = JSON.parse(JSON.stringify(detailData)).filter(
      (item: any) => item.id !== record.id,
    );
    let newSource = JSON.parse(JSON.stringify(dataSource)).map((item: any) => {
      if (newDetail.map((detail: any) => detail.id).indexOf(item.id) > -1) {
        return { ...item, hasDetail: true };
      } else {
        return { ...item, hasDetail: false };
      }
    });
    setDetailData(newDetail);
    setDataSource(newSource);
  };
  const onValueChange = (index: number, objVal: any) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(async () => {
      console.log(objVal, 'fdafsd');
      // 缺少判断少货和多货逻辑
      let key: string = Object.keys(objVal)[0];
      let sourceData = JSON.parse(JSON.stringify(detailData));
      let replaceData = JSON.parse(JSON.stringify(sourceData[index]));

      let replaceNewData = { ...replaceData, ...objVal };
      sourceData.splice(index, 1, replaceNewData);
      setDetailData(sourceData);
    }, 300);
  };

  const confirmOk = async () => {
    console.log(detailData);
    if (detailData.length === 0) {
      return message.warn('理货明细数据不能为空！');
    }
    await formTwo.validateFields();
    onOk({ list: detailData, storehouseId });
  };
  const commonColumns = defaultColumns([
    { title: 'SKU', dataIndex: 'sku', key: 'sku', width: 180 },
    { title: '短码', dataIndex: 'shortCode', key: 'shortCode', width: 120 },
    {
      title: '仓库名称',
      dataIndex: 'storageName',
      key: 'storageName',
      width: 100,
    },
    {
      title: '货主编号',
      dataIndex: 'customerNum',
      key: 'customerNum',
      width: 100,
    },
    {
      title: '服务商品',
      dataIndex: 'isServiceGoods',
      key: 'isServiceGoods',
      width: 100,
      render: (text: number) => SERVICECOMMODITYFLAG.key(text)?.value,
    },
    {
      title: '库位名称',
      dataIndex: 'locationName',
      key: 'locationName',
      width: 100,
    },
    {
      title: '库存类型',
      dataIndex: 'type',
      key: 'type',
      width: 100,
      render: (text: number) => STORETYPE.key(text)?.value || '-',
    },
  ]);
  const columns1 = commonColumns.concat(
    defaultColumns([
      {
        title: '实物库存',
        dataIndex: 'realityQuantity',
        key: 'realityQuantity',
        width: 100,
      },
      {
        title: '可用库存',
        dataIndex: 'availableQuantity',
        key: 'availableQuantity',
        width: 100,
      },
      {
        title: '占用库存',
        dataIndex: 'useQuantity',
        key: 'useQuantity',
        width: 100,
      },
      {
        title: '冻结库存',
        dataIndex: 'frozenQuantity',
        key: 'frozenQuantity',
        width: 100,
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        align: 'left',
        fixed: 'right',
        width: 100,
        render: (text: any, record: any) => {
          return (
            <Button
              size="small"
              disabled={record.hasDetail}
              type="primary"
              onClick={() => addTallyDetail(record)}
            >
              添加
            </Button>
          );
        },
      },
    ]),
  );
  const columns2 = commonColumns.concat(
    defaultColumns([
      {
        title: '可用库存',
        dataIndex: 'availableQuantity',
        key: 'availableQuantity',
        width: 100,
      },
      {
        title: '目标库位',
        dataIndex: 'toLocationName',
        key: 'toLocationName',
        width: 120,
        fixed: 'right',
        render: (text: any, record: any, index: number) => {
          return (
            <Form.Item
              shouldUpdate
              name={`toLocationName${index}`}
              style={{ margin: 0 }}
              rules={[
                {
                  required: true,
                  message: `请输入目标库位!`,
                },
              ]}
            >
              <Input
                placeholder="请输入"
                allowClear
                onBlur={e =>
                  onValueChange(index, { toLocationName: e.target.value })
                }
              />
            </Form.Item>
          );
        },
      },
      {
        title: '理货数量',
        dataIndex: 'quantity',
        key: 'quantity',
        width: 120,
        fixed: 'right',
        render: (text: any, record: any, index: number) => {
          return (
            <Form.Item
              shouldUpdate
              name={`quantity${index}`}
              style={{ margin: 0 }}
              rules={[
                {
                  required: true,
                  message: `请输入理货数量!`,
                },
              ]}
            >
              <InputNumber
                placeholder="请输入"
                min={0}
                max={record.availableQuantity}
                onChange={e => onValueChange(index, { quantity: e })}
              />
            </Form.Item>
          );
        },
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        align: 'left',
        fixed: 'right',
        width: 100,
        render: (text: any, record: any) => {
          return (
            <Popconfirm
              title="确定删除?"
              onConfirm={() => deleteDetail(record)}
            >
              <a>删除</a>
            </Popconfirm>
          );
        },
      },
    ]),
  );
  return (
    <Modal
      title={title}
      width={1000}
      visible={visible}
      onCancel={close}
      onOk={async () => {
        confirmOk();
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
                <Select placeholder="请选择">
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
                name="skuOrShort"
                label="SKU/短码"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                rules={[
                  { validator: validateVariantId },
                  { whitespace: true, message: '不能为空' },
                ]}
              >
                <Input placeholder="请输入" allowClear />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item
                name="location"
                label="库位"
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
          columns={columns1}
          bordered
          rowKey={record => record.id}
          dataSource={dataSource}
          loading={searchForm.loading}
          scroll={{ x: 1500, y: 200 }}
          pagination={false}
        />
        <div style={{ marginTop: '10px', marginBottom: '10px' }}>
          理货明细：
        </div>
        <Form form={formTwo} component={false}>
          <Table
            columns={columns2}
            bordered
            rowKey={record => record.id}
            dataSource={detailData}
            loading={searchForm.loading}
            scroll={{ x: 1500, y: 200 }}
            pagination={false}
          />
        </Form>
      </>
    </Modal>
  );
};
export default connect(({ common }: any) => ({
  warehouseId: common.warehouseId,
}))(Index);
