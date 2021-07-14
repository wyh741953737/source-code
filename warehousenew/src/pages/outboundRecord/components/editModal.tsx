import React, { useEffect, useState } from 'react';
import { Modal, Table, Space, Button, Descriptions } from 'antd';
import style from '../index.less';
import { ModalProps } from '@/hooks/useModal';
import { connect } from 'dva';
import { defaultColumns } from '@/utils';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import * as api from '@/services/tookOutbound';
interface Props {
  modal: ModalProps;
}

const { confirm } = Modal;

export default connect(({ common }: any) => ({}))(({ modal }: Props) => {
  const { visible, close, onOk, form, params, loading } = modal;
  const [dataSource, setData] = useState<any>({});
  useEffect(() => {
    if (params) {
      setData(params);
    }
  }, [params]);
  const onValuesChange = (changedValues: any) => {
    if ('storehouseId' in changedValues) {
    }
  };
  const inputWeight = (
    value: string | number | undefined,
    record: any,
    index: number,
  ) => {
    const currentItem = { ...record, actualWeight: value };
    let newData = JSON.parse(JSON.stringify(dataSource));
    newData.splice(index, 1, currentItem);
    setData(newData);
    // let newData =
  };

  const confirmDelete = (record: any) => {
    const { id } = dataSource;

    confirm({
      title: '确认从清单中删除包裹吗？',
      icon: <ExclamationCircleOutlined />,
      onOk: async () => {
        const resp: any = await api
          .dletePackage({
            receiveRecordId: id,
            weighingPackageId: record.id,
          })
          .catch(e => {});
        if (resp && resp.data) {
          let Data = resp.data;

          if (Data.length > 0) {
            setData(resp.data);
          } else {
            onOk();
          }
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  const columns = defaultColumns([
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      align: 'left',
      width: 80,
      fixed: 'left',
      render: (text: any, record: any, index: number) => index + 1,
    },
    {
      title: '包裹号',
      dataIndex: 'packageNumber',
      key: 'packageNumber',
      align: 'left',
    },
    {
      title: '包裹数量(票)',
      dataIndex: 'packageQuantity',
      key: 'packageQuantity',
      align: 'left',
    },

    {
      title: '净重(KG)',
      dataIndex: 'netWeight',
      key: 'netWeight',
      align: 'left',
    },
    {
      title: '毛重(KG)',
      dataIndex: 'grossWeight',
      key: 'grossWeight',
      align: 'left',
    },

    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 80,
      align: 'left',
      fixed: 'right',
      render: (text: string, record: any, index: number) => {
        return (
          <Space direction="vertical">
            <Button
              size="small"
              type="primary"
              onClick={() => confirmDelete(record)}
            >
              删除
            </Button>
          </Space>
        );
      },
    },
  ]);

  const confirmOk = () => {
    return false;
    onOk(dataSource);
  };
  const {
    logisticsCompany,
    storageName,
    netWeight,
    grossWeight,
    bagsQuantity,
    packangQuantity,
    receiveNumber,
  } = dataSource;
  return (
    <Modal
      title={`揽收编辑`}
      visible={visible}
      width={800}
      destroyOnClose={true}
      wrapClassName={style['add-or-update-modal']}
      confirmLoading={loading}
      onCancel={close}
      onOk={confirmOk}
      footer={null}
    >
      <div className={style.formLayout}>
        <p>出库单编号： {receiveNumber}</p>
      </div>
      <Table
        // @ts-ignore
        columns={columns}
        bordered
        dataSource={dataSource.packageResultDTOList}
        loading={loading}
        rowKey={(record: any) => record.id}
        pagination={false}
      />

      <Descriptions
        column={{ xxl: 3, xl: 3, lg: 3, md: 2, sm: 2, xs: 1 }}
        style={{ paddingTop: '20px' }}
      >
        <Descriptions.Item label={'物流公司'}>
          {logisticsCompany}
        </Descriptions.Item>

        <Descriptions.Item label={'大包裹数量(袋)'}>
          {bagsQuantity}
        </Descriptions.Item>

        <Descriptions.Item label={'包裹总净重(KG)'}>
          {netWeight}
        </Descriptions.Item>

        <Descriptions.Item label={'仓库'}>{storageName}</Descriptions.Item>

        <Descriptions.Item label={'小包裹数量(量)'}>
          {packangQuantity}
        </Descriptions.Item>

        <Descriptions.Item label={'包裹总毛重(KG)'}>
          {grossWeight}
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
});
