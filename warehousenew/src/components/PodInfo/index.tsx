import React, { useState } from 'react';
import { Modal, Button, Table } from 'antd';
import { getPodInfo } from '@/services/common';

interface Props {
  podInfo: PodInfoProps;
}
const PodInfo: React.FC<Props> = ({ podInfo }) => {
  const { visible, close, dataSource } = podInfo;
  const columns = [
    {
      title: '位置',
      dataIndex: '',
      key: '',
      align: 'left',
    },
    {
      title: '原图',
      dataIndex: '',
      key: '',
      align: 'left',
    },
    {
      title: '设计图',
      dataIndex: '',
      key: '',
      align: 'left',
    },
    {
      title: '类型',
      dataIndex: '',
      key: '',
      align: 'left',
    },
    {
      title: '操作',
      dataIndex: '',
      key: '',
      align: 'left',
      render: () => (
        <a download={'demo.jpg'} href={require('@/assist/demo.jpg')}>
          下载图片
        </a>
      ),
    },
  ];
  return (
    <Modal
      title="个性化信息"
      visible={visible}
      footer={
        <Button type="primary" onClick={close}>
          关闭
        </Button>
      }
    >
      <Table
        // @ts-ignore
        columns={columns}
        bordered
        dataSource={dataSource}
        pagination={false}
      />
    </Modal>
  );
};
export default PodInfo;

interface PodInfoProps {
  show: (podId: string) => void;
  visible: boolean;
  close: () => void;
  dataSource: Array<any> | undefined;
}
export const usePodInfo: () => [PodInfoProps] = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<Array<any>>();
  const show = async (podId: string) => {
    setVisible(true);
    const resp = await getPodInfo({});
    setDataSource(resp.data);
  };
  const close = () => {
    setVisible(false);
  };
  return [{ show, visible, close, dataSource }];
};
