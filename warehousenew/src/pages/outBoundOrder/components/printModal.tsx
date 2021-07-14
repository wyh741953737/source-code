import React, { useEffect, useState } from 'react';
import { Modal, Table, Button, message } from 'antd';
import style from '../index.less';
import { ModalProps } from '@/hooks/useModal';
import { defaultColumns } from '@/utils';
import * as api from '@/services/directSend';
// import printAuto from '@/components/Print';
import printAuto from '@/utils/printThree';

interface Props {
  modal: ModalProps;
}

export default ({ modal }: Props) => {
  const { visible, close, onOk, form, params, loading } = modal;
  const [dataSource, setDataSource] = useState<
    Array<{ code: string; id: string }>
  >([]);
  const [selected, setSelected] = useState({ keys: [], rows: [] });
  const onSelectChange = (keys: any, rows: any) => {
    setSelected({ keys, rows });
  };
  useEffect(() => {
    console.log(params);
    if (params) {
      setDataSource(params);
    } else {
      setDataSource([]);
    }
  }, [params]);
  useEffect(() => {
    setSelected({ keys: [], rows: [] });
  }, [visible]);
  const columns = defaultColumns([
    {
      title: '包裹码',
      dataIndex: 'code',
      key: 'code',
      align: 'center',
    },
  ]);
  const confirmOk = async () => {
    if (selected.keys.length === 0) {
      return message.warn('请选择需要打印的包裹');
    }
    const resp = await api.printListTwo({
      ids: selected.keys,
    });
    if (resp.data.length > 0) {
      printAuto(
        resp.data.map(d => ({
          url: d.pdf ? d.pdf : d.packPdf,
          logisticsChannel: d.logisticsChannel,
          orderId: d.orderId,
          logisticsCompany: d.logisticsCompany,
        })),
      );
    }
    onOk(params);
  };
  return (
    <Modal
      title={`面单打印`}
      visible={visible}
      width={600}
      destroyOnClose={true}
      wrapClassName={style['add-or-update-modal']}
      confirmLoading={loading}
      onCancel={close}
      onOk={() => confirmOk()}
      okText={'批量打印面单'}
    >
      <Table
        // @ts-ignore
        columns={columns}
        dataSource={dataSource}
        rowKey={record => record.id}
        scroll={{ y: 500 }}
        pagination={false}
        rowSelection={{
          fixed: true,
          onChange: onSelectChange,
          selectedRowKeys: selected.keys,
        }}
      />
    </Modal>
  );
};
