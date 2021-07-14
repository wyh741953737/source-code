import React, { useEffect } from 'react';
import { Modal, Form, Select, Switch } from 'antd';
import { POSITIONNUMBER, WAREHOUSETYPE } from '@/enum.config';
import useOptions from '@/hooks/useOptions';
import { warehouseApply, categoryApply } from '@/option.apply';
import { ModalProps } from '@/hooks/useModal';
import { connect } from 'dva';

interface Props {
  modal: ModalProps;
  warehouseId: string;
}

const AddOrUpdate: React.FC<Props> = ({ modal, warehouseId }) => {
  const { visible, close, onOk, form, params, loading } = modal;
  const [option] = useOptions(warehouseApply, { interval: Infinity });
  const [option1] = useOptions(categoryApply);
  useEffect(() => {
    form.setFieldsValue({
      storehouseId: params?.record.storehouseId,
      areaName: params?.record.areaName,
      type: params?.record.type,
      categoryId: params?.record.categoryId,
      isDelete: params?.record.isDelete,
    });
  }, [params]);
  useEffect(() => {
    form.setFieldsValue({ storehouseId: warehouseId });
  }, [warehouseId]);
  const layout = { labelCol: { span: 6 }, wrapperCol: { span: 14 } };
  return (
    <Modal
      title={`${params?.isUpdate ? '修改' : '新增'}库区`}
      visible={visible}
      confirmLoading={loading}
      onCancel={close}
      onOk={() =>
        onOk({
          isUpdate: params?.isUpdate,
          categoryEnum: option1.menu,
          id: params?.record.id,
        })
      }
    >
      <Form form={form} {...layout}>
        <Form.Item
          label={'所属仓库'}
          name={'storehouseId'}
          rules={[{ required: true, message: '请选择所属仓库' }]}
        >
          <Select
            getPopupContainer={triggerNode => triggerNode.parentNode}
            placeholder="请选择"
            disabled={params?.isUpdate}
          >
            {option.menu.map(item => (
              <Select.Option key={item.key} value={item.key}>
                {item.value}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label={'库区编号'}
          name={'areaName'}
          rules={[{ required: true, message: '请输入库区编号' }]}
        >
          <Select
            getPopupContainer={triggerNode => triggerNode.parentNode}
            placeholder={'请选择'}
            showSearch
            disabled={params?.isUpdate}
          >
            {POSITIONNUMBER.map(item => (
              <Select.Option key={item.key} value={item.key}>
                {item.value}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label={'库区类型'}
          name={'type'}
          rules={[{ required: true, message: '请选择库区类型' }]}
        >
          <Select
            getPopupContainer={triggerNode => triggerNode.parentNode}
            placeholder={'请选择'}
          >
            {WAREHOUSETYPE.map(item => (
              <Select.Option key={item.key} value={item.key}>
                {item.value}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label={'库区品类'} name={'categoryId'} rules={[]}>
          <Select
            getPopupContainer={triggerNode => triggerNode.parentNode}
            placeholder={'请选择'}
          >
            {option1.menu.map(item => (
              <Select.Option key={item.key} value={item.key}>
                {item.value}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        {params?.isUpdate && (
          <Form.Item label={'停用'} name={'isDelete'} valuePropName="checked">
            <Switch checkedChildren={'是'} unCheckedChildren={'否'} />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};
export default connect(({ common }: any) => ({
  warehouseId: common.warehouseId,
}))(AddOrUpdate);
