import React from 'react';
import { Modal, Table, Button } from 'antd';
import { connect } from 'dva';
import { logModalHooks } from '../hooks';
import { dateTimeFormat, defaultColumns } from '@/utils';

export default connect(({ outBoundOrder }: any) => ({
  visible: outBoundOrder.logVisible,
  logInfo: outBoundOrder.logInfo,
}))(({ visible, logInfo, dispatch }: any) => {
  const { onClose } = logModalHooks(dispatch);
  const columns = defaultColumns([
    {
      title: '操作人',
      dataIndex: 'operation',
      key: 'operation',
      align: 'center',
    },
    {
      title: '操作节点',
      dataIndex: 'operationNode',
      key: 'operationNode',
      align: 'center',
    },
    {
      title: '操作内容',
      dataIndex: 'operationContent',
      key: 'operationContent',
      align: 'center',
    },

    {
      title: '操作时间',
      dataIndex: 'operationTime',
      key: 'operationTime',
      render: (text: string) => dateTimeFormat(text),
    },
  ]);
  return (
    <Modal
      title={'操作日志'}
      visible={visible}
      onCancel={onClose}
      width={800}
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
        scroll={{ y: 500 }}
      />
    </Modal>
  );
});
