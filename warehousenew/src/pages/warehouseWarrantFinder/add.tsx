import React, { useState, useEffect } from 'react';
import {
  Col,
  Form,
  Modal,
  Row,
  Select,
  Input,
  Upload,
  Button,
  message,
} from 'antd';
import { WAREHOUSWARRANTETYPE } from '@/enum.config';
import { UploadOutlined } from '@ant-design/icons/lib';
import style from './index.less';
import { FormInstance } from 'antd/lib/form/hooks/useForm';
import { RcFile } from 'antd/lib/upload/interface';
import * as xlsx from 'xlsx';
import { ModalProps } from '@/hooks/useModal';
import useOptions from '@/hooks/useOptions';
import { warehouseApply } from '@/option.apply';
import ExcelUpload from '@/components/CustomFields/ExcelUpload';

interface Props {
  modal: ModalProps;
}

export default ({ modal }: Props) => {
  const { visible, close, onOk, form, params = {}, loading } = modal;
  const [type, setType] = useState<string>('');
  const [option] = useOptions(warehouseApply, {
    // reApply: req => {
    //   useEffect(() => {
    //     visible && req();
    //   }, [visible]);
    // },
  });

  useEffect(() => {
    const time = new Date().getTime();
    form.setFieldsValue({ inboundBatch: time });
  }, [visible]);

  const columnNames = function(): Array<{
    title: string;
    name: string;
    validate: (value: any) => { value?: any; err?: string };
  }> {
    return [
      {
        title: 'SKU',
        name: 'sku',
        validate: (value: string) => {
          return value ? { value: value.trim() } : { err: '未找到' };
        },
      },
      {
        title: '数量',
        name: 'quantity',
        validate: (value: string) => (value ? { value } : { err: '未找到' }),
      },
    ];
  };

  const excelColumns = columnNames();
  const importEditNetworkStatus = async (values: any) => {
    console.log(values, 'string');
    form.setFieldsValue({ proDetail: values });
  };
  const changeType = (e: string) => {
    console.log(e);
    setType(e);
    const time = new Date().getTime();
    form.setFieldsValue({ inboundBatch: time });
    form.setFieldsValue({ commodityDetailsList: undefined });
  };

  const layout = { labelCol: { span: 6 }, wrapperCol: { span: 18 } };
  return (
    <Modal
      title="添加入库单"
      visible={visible}
      confirmLoading={loading}
      className={style['add-modal']}
      width={750}
      onCancel={close}
      onOk={() => onOk({ option })}
    >
      <Form form={form}>
        <Row>
          <Col span={12}>
            <Form.Item
              label="入库类型"
              name="type"
              {...layout}
              rules={[{ required: true, message: '请选择入库类型' }]}
            >
              <Select
                getPopupContainer={triggerNode => triggerNode.parentNode}
                placeholder={'请选择'}
                onChange={changeType}
              >
                {WAREHOUSWARRANTETYPE.map(item => (
                  <Select.Option
                    key={item.key}
                    value={item.key}
                    disabled={item.disableAdd}
                  >
                    {item.value}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="入库仓库"
              name="warehouse"
              {...layout}
              rules={[{ required: true, message: '请选择入库仓库' }]}
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
        </Row>
        {type != '7' ? (
          <>
            <Form.Item
              label={'物流单号'}
              name={'numbers'}
              labelCol={{ span: 3 }}
              wrapperCol={{ span: 21 }}
              rules={[{ required: true, message: '请输入物流单号' }]}
            >
              <Input.TextArea
                placeholder={"请输入物流单号，多个之间用英文';'分隔"}
                rows={4}
              />
            </Form.Item>
            <Form.Item
              label={' '}
              labelCol={{ span: 3 }}
              wrapperCol={{ span: 21 }}
              colon={false}
              extra={'支持扩展名：.xlsx，.xls'}
            >
              <Upload
                className={style.upload}
                accept={'.xlsx,.xls'}
                showUploadList={false}
                beforeUpload={file => onBeforeUpload(form, file)}
              >
                <Button icon={<UploadOutlined />}>上传文件</Button>
              </Upload>
              <a
                download={'模板2.xlsx'}
                href={'/logistics_number_template.xlsx'}
                target="_blank"
              >
                模板下载
              </a>
            </Form.Item>
          </>
        ) : (
          <>
            <Form.Item
              label={'入库批次'}
              name={'inboundBatch'}
              labelCol={{ span: 3 }}
              wrapperCol={{ span: 21 }}
              rules={[{ required: true, message: '请输入入库批次' }]}
            >
              <Input placeholder={'请输入入库批次'} maxLength={30} />
            </Form.Item>
            <Form.Item
              label={'商品明细'}
              labelCol={{ span: 3 }}
              name={'commodityDetailsList'}
              wrapperCol={{ span: 21 }}
              colon={false}
              extra={'支持扩展名：.xlsx，.xls'}
              rules={[{ required: true, message: '请导入商品明细' }]}
            >
              <ExcelUpload
                templateHref={'/pro_detail_template.xlsx'}
                templateName={'商品明细模板.xlsx'}
                columns={excelColumns}
                upload={importEditNetworkStatus}
                buttonName="导入明细"
                isShowList={true}
              />
            </Form.Item>
          </>
        )}
      </Form>
    </Modal>
  );
};
const onBeforeUpload = (form: FormInstance, file: RcFile) => {
  const reader = new FileReader();
  reader.onload = (e: any) => {
    const data = new Uint8Array(e.target.result);
    const workbook = xlsx.read(data, { type: 'array' });
    const firstSheetName = workbook.SheetNames[0];
    if (!firstSheetName)
      return message.error('上传的模板格式不正确，请参考模板');
    const firstSheet = workbook.Sheets[firstSheetName];
    const result = xlsx.utils
      .sheet_to_json(firstSheet, { header: 'A' })
      .splice(1)
      .map((i: any) => i.A);
    const numbers = form.getFieldValue('numbers');
    if (numbers) result.unshift(numbers);
    form.setFieldsValue({ numbers: result.join(';') });
  };
  reader.readAsArrayBuffer(file);
  return false;
};
