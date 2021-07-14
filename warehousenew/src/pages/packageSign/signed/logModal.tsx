import React from 'react';
import { Modal, Table, Button } from 'antd';
import { connect } from 'dva';
import { logModalHooks } from './hooks';
import { dateTimeFormat } from '@/utils';

export default connect(({ packageSigned }: any) => ({
  visible: packageSigned.logVisible,
  logInfo: packageSigned.logInfo,
}))(({ visible, logInfo, dispatch }: any) => {
  const { onClose } = logModalHooks(dispatch);
  const columns = [
    {
      title: '操作人',
      dataIndex: 'operateName',
      key: 'operateName',
      align: 'left',
      width: 100,
    },
    {
      title: '操作内容',
      dataIndex: 'description',
      key: 'description',
      align: 'left',
    },
    {
      title: '操作时间',
      dataIndex: 'operateTime',
      key: 'operateTime',
      align: 'left',
      width: 120,
      render: (text: string) => dateTimeFormat(text),
    },
  ];
  return (
    <Modal
      title={'操作日志'}
      visible={visible}
      onCancel={onClose}
      footer={
        <Button type="primary" onClick={onClose}>
          关闭
        </Button>
      }
    >
      <Table
        // @ts-ignore
        columns={columns}
        dataSource={logInfo}
        rowKey={record => record.id}
      />
    </Modal>
  );
});
