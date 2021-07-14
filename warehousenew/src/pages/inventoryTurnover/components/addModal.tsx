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
import * as api from '@/services/inventoryTurnOver';
import { dateTimeFormat, defaultColumns } from '@/utils';
import { STORETYPE, SERVICECOMMODITYFLAG, POSITIONNUMBER } from '@/enum.config';
import { connect } from 'dva';
import * as regExp from '@/regExp.config';
import { GetTurnoverDetailPage } from '@/services/inventoryTurnOver.d';
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
  const { visible, close, onOk, loading, params } = modal;
  const searchForm = useSearchForm(
    async e => {
      let dataSource: any = [];
      try {
        const resp = await api.getTurnoverDetailPage({
          ...params,
          type: e.searchData.type,
          reservoirArea: e.searchData.reservoirArea,
          variantSku: e.searchData.variantSku,
          startQuantity: e.searchData.startQuantity,
          endQuantity: e.searchData.endQuantity,
          skuOrCode: e.searchData.skuOrCode,
        });
        dataSource = Array.isArray(resp.data)
          ? resp.data.map(item => {
              return { ...item };
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
      setSelected({ keys: [], rows: [] });
      searchForm.search({ ...params });
    }
  }, [visible]);

  useEffect(() => {
    setDataSource(searchForm.dataSource);
  }, [searchForm.dataSource]);
  const [option] = useOptions(warehouseApply, { interval: Infinity });
  const search = async () => {
    const values = await form.validateFields();
    searchForm.search({ nextSearchData: values });
    setSelected({ keys: [], rows: [] });
  };
  const [selected, setSelected] = useState({ keys: [], rows: [] });
  const [dataSource, setDataSource] = useState<Array<any>>([]);

  const timer: any = useRef();

  const onValueChange = (index: number, objVal: any) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(async () => {
      console.log(objVal, 'fdafsd');
      // 缺少判断少货和多货逻辑
      let key: string = Object.keys(objVal)[0];
      let sourceData = JSON.parse(JSON.stringify(dataSource));
      let replaceData = JSON.parse(JSON.stringify(sourceData[index]));

      let replaceNewData = { ...replaceData, ...objVal };
      sourceData.splice(index, 1, replaceNewData);
      setDataSource(sourceData);
    }, 300);
  };
  const commonColumns = defaultColumns([
    { title: 'SKU_ID', dataIndex: 'sku', key: 'sku', width: 120 },
    { title: '短码', dataIndex: 'shortCode', key: 'shortCode' },
    {
      title: '仓库名称',
      dataIndex: 'storageName',
      key: 'storageName',
    },
    {
      title: '货主编号',
      dataIndex: 'customerNum',
      key: 'customerNum',
    },
    {
      title: '服务商品',
      dataIndex: 'isServiceGoods',
      key: 'isServiceGoods',
      render: (text: number) => SERVICECOMMODITYFLAG.key(text)?.value,
    },
    {
      title: '容器名称',
      dataIndex: 'containerNum',
      key: 'containerNum',
    },
    {
      title: '库存类型',
      dataIndex: 'type',
      key: 'type',
      render: (text: number) => STORETYPE.key(text)?.value || '-',
    },
    {
      title: '原库位',
      dataIndex: 'locationName',
      key: 'locationName',
    },
    {
      title: '可用库存',
      dataIndex: 'availableQuantity',
      key: 'availableQuantity',
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
      dataIndex: 'tallyVolume',
      key: 'tallyVolume',
      width: 120,
      fixed: 'right',
      render: (text: any, record: any, index: number) => {
        return (
          <Form.Item
            shouldUpdate
            name={`tallyVolume${index}`}
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
              onChange={e => onValueChange(index, { tallyVolume: e })}
            />
          </Form.Item>
        );
      },
    },
  ]);
  const batchSetTarget = (e: string) => {
    if (selected.rows.length === 0) {
      return message.warn('请选择至少一条记录');
    }
    if (!e) {
      return message.warn('设置库位不能为空');
    }
    const newData = dataSource.map((item: any, index: number) => {
      if (selected.keys.indexOf(item.id) > -1) {
        formTwo.setFieldsValue({
          [`toLocationName${index}`]: e,
        });
        return { ...item, toLocationName: e };
      }
      return { ...item };
    });
    setDataSource(newData);
    setSelected({ keys: [], rows: [] });
  };
  const deleteItem = () => {
    if (selected.rows.length === 0) {
      return message.warn('请选择至少一条记录');
    }
    const newData = dataSource.filter((item: any, index: number) => {
      return selected.keys.indexOf(item.id) === -1;
    });
    setDataSource(newData);
    setSelected({ keys: [], rows: [] });
  };
  const onSelectChange = (keys: any, rows: any) => {
    setSelected({ keys, rows });
  };

  const confirmOk = async () => {
    await formTwo.validateFields();
    onOk({ storehouseTallyVariantDTOList: dataSource });
  };
  const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } };
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
                name="variantSku"
                label="SKU"
                {...layout}
                rules={[{ whitespace: true, message: '不能为空' }]}
              >
                <Input placeholder="请输入" allowClear />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="库存量" {...layout}>
                <div style={{ display: 'flex', height: '32px' }}>
                  <Form.Item name="startQuantity">
                    <Input placeholder="请输入" allowClear />
                  </Form.Item>
                  <span style={{ lineHeight: '28px', margin: '0 4px' }}>~</span>
                  <Form.Item name="endQuantity">
                    <Input placeholder="请输入" allowClear />
                  </Form.Item>
                </div>
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item name="reservoirArea" label="原库区" {...layout}>
                <Select placeholder="请选择">
                  {POSITIONNUMBER.map(item => (
                    <Select.Option key={item.key} value={item.key}>
                      {item.value}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item name="type" label="库存类型" {...layout}>
                <Select placeholder="请选择">
                  {STORETYPE.map(item => (
                    <Select.Option key={item.key} value={item.key}>
                      {item.value}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={2} offset={1}>
              <Button type="primary" onClick={search}>
                查询
              </Button>
            </Col>
          </Row>
        </Form>
        <Row style={{ marginBottom: '10px' }}>
          <Col style={{ marginRight: '10px' }}>
            <Popconfirm title="确定删除?" onConfirm={deleteItem}>
              <Button danger>删除</Button>
            </Popconfirm>
          </Col>
          <Col>
            <Input.Search
              placeholder="请输入目标库位"
              allowClear
              enterButton="批量设置库位"
              size="middle"
              onSearch={batchSetTarget}
            />
          </Col>
        </Row>
        <Form form={formTwo} component={false}>
          <Table
            columns={commonColumns}
            bordered
            rowKey={record => record.id}
            dataSource={dataSource}
            loading={searchForm.loading}
            scroll={{ x: 1500, y: 400 }}
            pagination={false}
            rowSelection={{
              fixed: true,
              onChange: onSelectChange,
              selectedRowKeys: selected.keys,
            }}
          />
        </Form>
      </>
    </Modal>
  );
};
export default connect(({ common }: any) => ({
  warehouseId: common.warehouseId,
}))(Index);
