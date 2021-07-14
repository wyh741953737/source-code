import React, { useEffect, useState } from 'react';
import { Modal, Row, Col, message, Table, Input, Button, Form } from 'antd';
import style from '../index.less';
import { ModalProps } from '@/hooks/useModal';
import { connect } from 'dva';
import { dateTimeFormat, defaultColumns } from '@/utils';
import { Record } from 'immutable';
import { useForm } from 'antd/es/form/Form';
import * as api from '@/services/cannibalize';
import useButton from '@/hooks/useButton';
interface Props {
  modal: ModalProps;
}

const { confirm } = Modal;

export default ({ modal }: Props) => {
  const { visible, close, onOk, form, params, loading } = modal;

  const [dataSource, setDataSource] = useState<Array<any>>([]);
  const [currentDispatchNumber, setDispatchNumber] = useState<string>('');

  useEffect(() => {
    if (params) {
      setDataSource(params.data);
      setDispatchNumber(params.transferCode);
    }
  }, [params]);

  const saveDetail = async (fillForm: any, record: any, index: number) => {
    const values = await fillForm.validateFields();
    const logisticsCompany = values[`logisticsCompany${index}`];
    const trackingNumber = values[`trackingNumber${index}`];
    const { packCode } = record;
    const companysArr = Array.from(
      new Set(
        dataSource
          .filter(item => item.logisticsCompany)
          .map(current => current.logisticsCompany),
      ),
    );
    const trackingNumberArr = Array.from(
      new Set(
        dataSource
          .filter(item => item.trackingNumber)
          .map(current => current.trackingNumber),
      ),
    );
    if (
      (companysArr.length > 0 &&
        companysArr.indexOf(logisticsCompany) === -1) ||
      (trackingNumberArr.length > 0 &&
        trackingNumberArr.indexOf(trackingNumber) > -1)
    ) {
      return message.warn(
        '同一调拨出库单下的包裹物流应保持一致且运单号不能重复，请重新输入',
      );
    }
    const resp = await api.savePackageDetail({
      packCode,
      logisticsCompany,
      trackingNumber,
      transferCode: currentDispatchNumber,
    });
    if (resp && resp.data) {
      const list = (
        await api.getPackageDetail({ transferCode: currentDispatchNumber })
      )?.data;
      setDataSource(list);
    }
  };
  const columns = defaultColumns([
    {
      title: '包裹编码',
      dataIndex: 'packCode',
      key: 'packCode',
      align: 'left',
      width: 160,
    },
    {
      title: '商品数量',
      dataIndex: 'packQuantity',
      key: 'packQuantity',
      align: 'left',
      width: 80,
    },
    {
      title: '物流公司/运单号',
      dataIndex: 'logisticsCompanyTrackingNumber',
      key: 'logisticsCompanyTrackingNumber',
      align: 'left',
      width: 550,
      render: (text: string | number, record: any, index: number) => {
        const [fillForm] = useForm();
        const { logisticsCompany, trackingNumber } = record;
        const packageBtn = useButton({
          onClick: async () => {
            await saveDetail(fillForm, record, index);
          },
        });
        return logisticsCompany && trackingNumber ? (
          `${logisticsCompany}/${trackingNumber}`
        ) : (
          <Form layout="inline" form={fillForm}>
            {!logisticsCompany ? (
              <Form.Item
                name={`logisticsCompany${index}`}
                rules={[{ required: true, message: '请输入物流公司' }]}
              >
                <Input placeholder="请输入物流公司" />
              </Form.Item>
            ) : (
              logisticsCompany
            )}

            {!trackingNumber ? (
              <Form.Item
                name={`trackingNumber${index}`}
                rules={[{ required: true, message: '请输入运单号' }]}
              >
                <Input placeholder="请输入运单号" />
              </Form.Item>
            ) : (
              trackingNumber
            )}

            <Form.Item>
              <Button
                type="primary"
                onClick={packageBtn.onClick}
                loading={packageBtn.loading}
              >
                保存
              </Button>
            </Form.Item>
          </Form>
        );
      },
    },
  ]);

  return (
    <Modal
      title={`订单分拣明细`}
      visible={visible}
      width={850}
      destroyOnClose={true}
      closeIcon={true}
      wrapClassName={style['add-or-update-modal']}
      footer={
        <Button type="primary" onClick={close}>
          关闭
        </Button>
      }
    >
      {dataSource && dataSource.length > 0 ? (
        <Table
          // @ts-ignore
          columns={columns}
          bordered
          dataSource={dataSource}
          loading={loading}
          rowKey={(record: any) => record.packCode}
          pagination={false}
        />
      ) : (
        <p style={{ textAlign: 'center' }}>暂无数据</p>
      )}
    </Modal>
  );
};
