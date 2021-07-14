import React from 'react';
import { Modal, Table, Button } from 'antd';
import { connect } from 'dva';
import { logModalHooks } from '../hooks';
import { dateTimeFormat } from '@/utils';

export default connect(({ materialManage }: any) => ({
  visible: materialManage.logVisible,
  logInfo: materialManage.logInfo,
}))(({ visible, logInfo, dispatch }: any) => {
  const { onClose } = logModalHooks(dispatch);
  const columns = [
    { title: '操作人', dataIndex: 'createBy', key: 'createBy', align: 'left' },
    {
      title: '操作内容',
      dataIndex: 'operationInfo',
      key: 'operationInfo',
      align: 'left',
    },
    {
      title: '操作时间',
      dataIndex: 'createAt',
      key: 'createAt',
      align: 'left',
      render: (text: string) => dateTimeFormat(text),
    },
  ];
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
        //@ts-ignore
        columns={columns}
        dataSource={logInfo}
      />
    </Modal>
  );
});
