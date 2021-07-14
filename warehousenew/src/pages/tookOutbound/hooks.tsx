import { Form, message, Modal } from 'antd';
import React, { useState, useEffect, useRef } from 'react';
import * as api from '@/services/tookOutbound';
import { getLogisticList } from '@/services/weightConfig';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { reportLocalAudio } from '@/utils/report';
import throttle from '@/utils/throttle';
const { confirm } = Modal;
const throttleContainer = throttle.new();
export const indexHooks = () => {
  const [form] = Form.useForm();

  const [logisticData, setLogistic] = useState<Array<any>>([]);
  const [dataSource, setDataSource] = useState<Array<any>>([]);

  const [companyId, setCompanyId] = useState<string>('');
  const [info, setInfo] = useState<any>(undefined);
  const [receiveRecordId, setReceiveId] = useState<string>('');
  const [storageId, setStorageId] = useState<string>('');
  const [companyAccount, setCompanyAccount] = useState<string>('');
  const containerEl = useRef<any>(null);

  useEffect(() => {
    containerEl.current.focus();
  }, []);
  useEffect(() => {
    getLogisticList()
      .then((res: any) => {
        if (res && res.code === 200) {
          setLogistic(res.data);
        }
      })
      .catch(e => {});
  }, []);

  const logisticChange = async (value: any, option: any) => {
    setCompanyId(option.key);
  };

  const onPressEnter = async () => {
    const values = await form.validateFields();
    const { logisticsCompany, packageNumber } = values;
    const hide = message.loading('查询中，请稍后...');
    await throttleContainer.dispatch(
      async () => {
        const resp: any = await api
          .getPackageInfo({
            logisticsCompany,
            packageNumber,
            receiveRecordId,
            storageId,
            companyAccount,
            companyId,
          })
          .catch(e => {});
        hide();
        if (resp && resp.data) {
          let Data = resp.data;
          setInfo(Data);
          setReceiveId(Data.id);
          setStorageId(Data.storageId);

          setDataSource(Data.packageResultDTOList);
          const len = String(Data.packageResultDTOList.length);
          reportLocalAudio([len]);

          if (
            Data.packageResultDTOList &&
            Data.packageResultDTOList.length > 0
          ) {
            !companyAccount &&
              setCompanyAccount(Data.packageResultDTOList[0].companyAccount);
          }
        }
        containerEl.current.select();
      },
      { time: 500 },
    );
  };
  const onValueChange = (index: number, objVal: any) => {
    // 缺少判断少货和多货逻辑
  };

  const confirmDelete = (record: any) => {
    const { id } = info;

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
          setInfo(Data);
          setReceiveId(Data.id);
          setStorageId(Data.storageId);

          setDataSource(Data.packageResultDTOList);
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  // 质检确认
  interface confirmParams {
    id: string;
    subStandardQuantity: number;
    qualifiedQuantity: number;
    putStorageNumber: string;
    [propName: string]: any;
  }

  // 打印sku
  const printSku = async () => {
    const { id } = info;
    const hide = message.loading('加载中，请稍后...');
    const resp: any = await api.printTook({ ids: [id] }).catch(e => {});
    hide();
    if (resp) {
      window.open(resp.data);
    }
  };
  return {
    form,
    onPressEnter,
    info,
    dataSource,
    onValueChange,
    printSku,
    logisticData,
    confirmDelete,
    logisticChange,
    companyAccount,
    containerEl,
  };
};
