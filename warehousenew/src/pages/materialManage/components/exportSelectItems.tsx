import React, { useEffect, useState } from 'react';
import { Modal, Checkbox, Row, Col } from 'antd';
import style from '../index.less';
import { ModalProps } from '@/hooks/useModal';

const CheckboxGroup = Checkbox.Group;

interface Props {
  modal: ModalProps;
}

export default ({ modal }: Props) => {
  const { visible, close, onOk, loading } = modal;

  const layout = { labelCol: { span: 7 }, wrapperCol: { span: 17 } };
  const layout2 = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14, offset: 1 },
  };
  const [checkedList, setCheckList] = useState<Array<number>>([]);
  const [checkAll, setCheckAll] = useState<boolean>(false);
  const [indeterminate, setIndeterminate] = useState<boolean>(true);
  const onValuesChange = (changedValues: any) => {
    // if ('storehouseId' in changedValues) {
    // }
  };
  const plainOptions = [
    { label: '耗材编号', value: 'materialCode', value2: 0 },
    { label: '耗材名称', value: 'materialName', value2: 1 },
    { label: '长', value: 'length', value2: 2 },
    { label: '宽', value: 'width', value2: 3 },
    { label: '高', value: 'height', value2: 4 },
    { label: '重量', value: 'weight', value2: 5 },
    { label: '体积', value: 'volume', value2: 6 },
    { label: '单价', value: 'materialPrice', value2: 7 },
    { label: '创建人', value: 'createBy', value2: 9 },
    { label: '创建时间', value: 'createAt', value2: 10 },
    { label: '修改人', value: 'updateBy', value2: 11 },
    { label: '修改时间', value: 'updateAt', value2: 12 },
    { label: '停用', value: 'status', value2: 13 },
  ];
  const onChange = (checkedList: any) => {
    setCheckList(checkedList);
    setIndeterminate(
      !!checkedList.length && checkedList.length < plainOptions.length,
    );
    setCheckAll(checkedList.length === plainOptions.length);
  };

  const onCheckAllChange = (e: any) => {
    const checkAllList = plainOptions.map(item => item.value2);
    setCheckList(e.target.checked ? checkAllList : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  return (
    <Modal
      title={`导出`}
      visible={visible}
      width={600}
      destroyOnClose={true}
      wrapClassName={style['add-or-update-modal']}
      confirmLoading={loading}
      onCancel={close}
      onOk={() => onOk(checkedList)}
    >
      <div className={style['site-checkbox-all-wrapper']}>
        <Checkbox
          indeterminate={indeterminate}
          onChange={onCheckAllChange}
          checked={checkAll}
        >
          全选
        </Checkbox>
      </div>
      <br />
      <CheckboxGroup value={checkedList} onChange={onChange}>
        <Row>
          {plainOptions.map(item => (
            <Col span={8} key={item.value}>
              <Checkbox key={item.value} value={item.value2}>
                {item.label}
              </Checkbox>
            </Col>
          ))}
        </Row>
      </CheckboxGroup>
    </Modal>
  );
};
