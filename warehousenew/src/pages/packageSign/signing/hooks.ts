import { Form, message } from 'antd';
import { useState, useRef, useEffect } from 'react';
import * as api from '@/services/packageSign';
import { reportText, reportLocalAudio } from '@/utils/report';
import useButton from '@/hooks/useButton';
import throttle from '@/utils/throttle';

const throttleContainer = throttle.new();
export const indexHooks = () => {
  const [currentScanNumber, setScanNumber] = useState<string>(''); //存储当前扫描的包裹号，商品条形码，批次号
  const [form] = Form.useForm();
  // 普通签收列表
  const [commonList, setCommonList] = useState<Array<any>>([]);

  //服务商品列表
  const [serviceList, setServiceList] = useState<any>({
    productName: '',
    storageName: '',
    batchNumber: '',
    logisticsTrackingNumber: '',
    quantity: '',
    salesmanName: '',
    customerName: '',
    deliveryTime: '',
    feeList: [],
  });

  const [detailsList, setDetailList] = useState<any>([]);
  // 是否显示“请移交至线下组
  const [showText, setShowText] = useState<boolean>(false);

  const [storeId, setStoreId] = useState<string>('');
  const [trackingNumber, setLogisticNumber] = useState<string>('');

  const [isSigning, setSign] = useState<boolean>(false);
  const [initSign, setInitSign] = useState<boolean>(false);
  const numberEl = useRef<any>(null);
  useEffect(() => {
    numberEl.current.focus();
  }, []);
  const onPressEnter = async () => {
    const values = await form.validateFields();
    const { storageId, logisticsTrackingNumber } = values;
    const hide = message.loading('查询中，请稍后...');
    await throttleContainer.dispatch(
      async () => {
        const resp: any = await api
          .getReceiptList({
            storageId: storageId ? storageId : '',
            logisticsTrackingNumber,
          })
          .catch(e => {});
        hide();
        if (resp && resp.data) {
          const { receiptProductList, packageResult, voiceStatus } = resp.data;
          if (voiceStatus && voiceStatus.indexOf('线下组') > -1) {
            setShowText(true);
          } else {
            setShowText(false);
          }
          console.log(receiptProductList, packageResult);
          let sourceData: Array<any> = receiptProductList
            ? receiptProductList
            : [];
          reportLocalAudio(voiceStatus.split(','));
          setCommonList(sourceData);
          if (packageResult) {
            setServiceList(packageResult);
            const { detailsList, productName } = packageResult;
            setDetailList(detailsList);
          } else {
            voiceStatus !== '包裹已签收' && message.success('签收成功');
            setServiceList([]);
            setDetailList([]);
          }
          setScanNumber(logisticsTrackingNumber);

          setStoreId(storageId);
          setLogisticNumber(logisticsTrackingNumber);
          setSign(false);

          // 判断是否签收过
          voiceStatus !== '包裹已签收' ? setInitSign(false) : setInitSign(true);
        } else {
          setCommonList([]);
          setServiceList([]);
          setDetailList([]);
          reportText('异常');
        }
        form.setFieldsValue({ logisticsTrackingNumber: '' });
        numberEl.current.focus();
      },
      { time: 500 },
    );
  };

  const onValueChange = (index: number, objVal: any) => {
    // 缺少判断少货和多货逻辑
    let key: string = Object.keys(objVal)[0];
    let sourceData = JSON.parse(JSON.stringify(detailsList));
    let replaceData = JSON.parse(JSON.stringify(sourceData[index]));
    let replaceNewData = { ...replaceData, ...objVal };

    sourceData.splice(index, 1, replaceNewData);
    setDetailList(sourceData);
  };
  const checkAmount = async () => {
    let p = new Promise(function(resolve, reject) {
      //做一些异步操作去掉按钮loading
      setTimeout(function() {
        resolve('包裹列表输入实收和损坏总量不能大于该服务商品数量');
      }, 10);
    });
    return p;
  };
  // 签收
  const receiptPackage = useButton({
    onClick: async () => {
      const amount: number = await detailsList.reduce(
        (total: number, cur: any) => {
          return total + cur.quantity + cur.damagedQuantity;
        },
        0,
      );
      if (amount > serviceList.quantity) {
        const msg: any = await checkAmount();
        message.warn(msg);
        return;
      }

      const detailsDTOS = detailsList.map((item: any) => {
        return {
          id: item.id,
          quantity: item.quantity || 0,
          damagedQuantity: item.damagedQuantity || 0,
        };
      });
      const params = {
        type: 1,
        logisticsTrackingNumber: trackingNumber,
        storageId: storeId,
        detailsDTOS,
      };
      const resp = await api.serviceProductConfirm(params);

      if (resp && resp.data) {
        message.success('签收成功');
        reportText('签收成功');
        setSign(true);
      } else {
        reportText('异常');
      }
    },
  });

  const refuseReceipt = useButton({
    onClick: async () => {
      const amount: number = await detailsList.reduce(
        (total: number, cur: any) => {
          return total + cur.quantity + cur.damagedQuantity;
        },
        0,
      );
      if (amount > serviceList.quantity) {
        const msg: any = await checkAmount();
        message.warn(msg);
        return;
      }

      const detailsDTOS = detailsList.map((item: any) => {
        return {
          id: item.id,
          quantity: item.quantity,
          damagedQuantity: item.damagedQuantity,
        };
      });
      const params = {
        type: 2,
        logisticsTrackingNumber: trackingNumber,
        storageId: storeId,
        detailsDTOS,
      };

      const resp = await api.serviceProductConfirm(params);

      if (resp && resp.data) {
        message.success('拒收成功');
        reportText('拒收成功');
        setSign(true);
      } else {
        message.error('拒收失败');
        reportText('拒收失败');
      }
    },
  });

  return {
    form,
    onPressEnter,
    commonList,
    serviceList,
    onValueChange,
    detailsList,
    receiptPackage,
    refuseReceipt,
    isSigning,
    currentScanNumber,
    numberEl,
    initSign,
    showText,
  };
};
