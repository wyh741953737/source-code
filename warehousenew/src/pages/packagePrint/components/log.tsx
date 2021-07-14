import React from 'react';
import { Modal, Table, Button } from 'antd';
import { connect } from 'dva';
import { logModalHooks } from '../hooks';
import { dateTimeFormat } from '@/utils';

export default connect(({ packagePrint }: any) => ({
  visible: packagePrint.logVisible,
  logInfo: packagePrint.logInfo,
}))(({ visible, logInfo, dispatch }: any) => {
  const { onClose } = logModalHooks(dispatch);
  const columns = [
    {
      title: '打印人',
      dataIndex: 'operation',
      key: 'operation',
      align: 'left',
    },
    {
      title: '打印时间',
      dataIndex: 'operationTime',
      key: 'operationTime',
      align: 'left',
      render: (text: string) => dateTimeFormat(text),
    },
  ];
  return (
    <Modal
      title={'操作日志'}
      visible={visible}
      onCancel={onClose}
      width={600}
      footer={
        <Button type="primary" onClick={onClose}>
          关闭
        </Button>
      }
    >
      <Table
        //@ts-ignore
        columns={columns}
        dataSource={logInfo}
        rowKey={record => record.id}
      />
    </Modal>
  );
});
