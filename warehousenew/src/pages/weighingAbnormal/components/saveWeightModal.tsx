import React, { useEffect, useState } from 'react';
import { Modal, Table, InputNumber } from 'antd';
import style from '../index.less';
import { ModalProps } from '@/hooks/useModal';
import { connect } from 'dva';
import { defaultColumns } from '@/utils';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Throttle from '@/utils/throttle';
interface Props {
  modal: ModalProps;
  thresholdObj: any;
}

const { confirm } = Modal;

export default connect(({ weighingAbnormal }: any) => ({
  thresholdObj: weighingAbnormal.thresholdVal,
}))(({ modal, thresholdObj }: Props) => {
  const { visible, close, onOk, params, loading } = modal;
  const [dataSource, setData] = useState<Array<any>>([]);
  const [throttle] = useState(Throttle.new());
  useEffect(() => {
    setData(params);
    console.log(params, 'params=========');
  }, [params]);
  const inputWeight = (
    value: string | number | undefined,
    record: any,
    index: number,
  ) => {
    const currentItem = { ...record, actualWeight: value };
    let data = JSON.parse(JSON.stringify(dataSource));
    data.splice(index, 1, currentItem);
    let newData = data.map((item: any) => {
      if (checkSomeValue(item)) {
        return {
          ...item,
          isWarning: true,
        };
      } else {
        return {
          ...item,
          isWarning: false,
        };
      }
    });
    setData(newData);
  };
  const columns = defaultColumns([
    {
      title: '订单号',
      dataIndex: 'orderId',
      key: 'orderId',
      align: 'left',
    },
    {
      title: '运单号',
      dataIndex: 'logisticsTrackingNumber',
      key: 'logisticsTrackingNumber',
      align: 'left',
    },
    {
      title: '录入重量(g)',
      dataIndex: 'inputWeight',
      key: 'inputWeight',
      align: 'left',
      render: (text: string | number, record: any, index: number) => {
        return (
          <div>
            <InputNumber
              min={0}
              precision={0}
              className={
                !record.isWarning ? style.inputWeight : style.inputRedWeight
              }
              onChange={val =>
                throttle.dispatch(() => inputWeight(val, record, index), {
                  time: 300,
                })
              }
            />
          </div>
        );
      },
    },
  ]);

  const checkSomeValue = (item: any) => {
    const thresholdVal = item.consumablesQuantity;
    console.log(thresholdVal, 'thresholdVal=========');
    let absValue = Math.abs(thresholdVal - item.actualWeight);
    let scale = absValue / thresholdVal;
    console.log(thresholdObj, 'thresholdObj============');
    return scale > thresholdObj.number / 100;
  };
  const checkEveryValue = (item: any) => {
    return item.actualWeight === undefined;
  };

  const confirmOk = () => {
    let isException = dataSource.some(checkSomeValue);
    let isEmpty = dataSource.every(checkEveryValue);
    if (isEmpty) {
      onOk([]);
    } else {
      const SubContent = () => (
        <div>
          <div>
            <span style={{ color: 'red' }}>点击【继续】依旧可以提交该重量</span>
            ，你还要继续吗？
          </div>
          <div>点击【取消】可以将超过阈值的重量标红</div>
        </div>
      );
      if (isException) {
        confirm({
          width: 450,
          title: '您部分输入的重量超过阈值',
          icon: <ExclamationCircleOutlined />,
          content: <SubContent />,
          okText: '继续',
          onOk() {
            let newData = dataSource.filter(item => {
              if (item.actualWeight !== undefined) {
                return item;
              }
            });
            onOk(newData);
          },
          onCancel() {},
        });
      } else {
        let newData = dataSource.filter(item => {
          if (item.actualWeight !== undefined) {
            return item;
          }
        });
        onOk(newData);
      }
    }

    return false;
    // onOk(dataSource);
  };

  return (
    <Modal
      title={`录入重量`}
      visible={visible}
      width={800}
      destroyOnClose={true}
      wrapClassName={style['add-or-update-modal']}
      confirmLoading={loading}
      onCancel={close}
      onOk={confirmOk}
    >
      <Table
        // @ts-ignore
        columns={columns}
        bordered
        dataSource={dataSource}
        loading={loading}
        rowKey={(record: any) => record.id}
        pagination={false}
      />
      <p className={style.remark}>*如您不想对该运单号输入重量，不填写即可</p>
    </Modal>
  );
});
