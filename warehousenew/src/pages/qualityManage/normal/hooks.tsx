import React from 'react';
import { Form, message, Modal } from 'antd';
import { useState, useRef, useEffect } from 'react';
import * as api from '@/services/qualityManage';
import * as common from '@/services/common';
import { useExceptionModal } from '@/components/ExceptionModal';
import useModal from '@/hooks/useModal';
import printRequest from '@/utils/printTwo';
import throttle from '@/utils/throttle';
import styles from './index.less';
const { confirm } = Modal;
const throttleContainer = throttle.new();
export const indexHooks = (warehouseId: string) => {
  const [currentScanNumber, setScanNumber] = useState<string>(''); //存储当前扫描的包裹号，商品条形码，批次号
  const [form] = Form.useForm();
  const [exception] = useExceptionModal({
    onSuccess: async params => {
      const resp: any = await api.addException(params).catch(e => {});
      exception.setLoading(false);
      if (resp && resp.code == 200) {
        message.success('提交成功');
        onValueChange(0, { exceptionPost: true });
        exception.close();
      }
    },
    onPressEnter: async params => {},
  });
  const [simpleForm] = useModal({
    onOk: async values => {
      const record: any = simpleForm.params;
      const { batchNumber, sku, shotNum, variantKeyMap } = record;
      const { subStandardQuantity } = values;
      const makeupParams: any = {
        subStandardQuantity,
        batchNumber,
        sku,
        shotNum,
        variantKeyMap,
      };
      const resp: any = await api.qualityMakeup(makeupParams).catch(e => {});
      printRequest([
        {
          title: '补打',
          url: resp.data,
        },
      ]);
      // resp && window.open(resp.data);
    },
  });
  const [dataSource, setDataSource] = useState<Array<any>>([]);
  const [onShelfNum, setShelfNum] = useState<string>('');
  const [currentContainer, setContainer] = useState<string>('');
  const containerEl = useRef<any>(null);
  const numberEl = useRef<any>(null);
  const [flag, setFlag] = useState<boolean>(false);

  useEffect(() => {
    containerEl.current.focus();
  }, []);

  const onPressEnterContainer = async () => {
    const values = await form.validateFields(['container']);
    const containerNum = form.getFieldsValue().container.trim();
    const hide = message.loading('查询中，请稍后...');
    await throttleContainer.dispatch(
      async () => {
        const resp: any = await common
          .scanContainer({
            containerNum: containerNum,
            statusType: 2,
            isOnShelf: 1,
            storehouseId: warehouseId,
            flag,
          })
          .catch(e => {});
        hide();
        if (resp && resp.data) {
          if (resp.data === '0') {
            message.success('容器释放成功');
            form.resetFields();
            setDataSource([]);
            setContainer('');
            setShelfNum('');
            setFlag(false);
          } else {
            message.success('容器绑定成功');
            setShelfNum(resp.data);
            setContainer(containerNum);
            numberEl.current.focus();
            setFlag(true);
          }
        } else {
          setContainer('');
          setShelfNum('');
        }
      },
      { time: 500 },
    );
  };
  const onPressEnter = async () => {
    const values = await form.validateFields();
    const batchNumber = form
      .getFieldsValue()
      .searchId.trim()
      .slice(-7);
    const fullBatchNumber = form.getFieldsValue().searchId.trim();
    const containerNum = form.getFieldsValue().container.trim();
    const hide = message.loading('查询中，请稍后...');
    await throttleContainer.dispatch(
      async () => {
        const resp: any = await api
          .getDetail({ batchNumber, containerNum })
          .catch(e => {});
        hide();
        if (resp && resp.data) {
          let Data = [resp.data];
          Data.forEach((item: any) => {
            item['exceptionPost'] = false;
            item['confirmPost'] = false;
          });

          setDataSource(Data);
          setScanNumber(fullBatchNumber);
          form.setFieldsValue({ searchId: '' });
        } else {
          setDataSource([]);
        }
      },
      { time: 500 },
    );
  };
  const onContainerChange = () => {
    setShelfNum('');
  };
  const onValueChange = (index: number, objVal: any) => {
    // 缺少判断少货和多货逻辑
    let key: string = Object.keys(objVal)[0];
    let sourceData = JSON.parse(JSON.stringify(dataSource));
    let replaceData = JSON.parse(JSON.stringify(sourceData[index]));
    let replaceNewData = null;
    if (key === 'inspectionQuantity') {
      let changeNum =
        objVal[key] > replaceData.subStandardQuantity
          ? replaceData.subStandardQuantity
          : objVal[key];
      replaceNewData = {
        ...replaceData,
        ...objVal,
        qualifiedQuantity: changeNum,
      };
    } else {
      replaceNewData = { ...replaceData, ...objVal };
    }
    sourceData.splice(index, 1, replaceNewData);
    setDataSource(sourceData);
  };

  // 质检确认
  interface confirmParams {
    id: string;
    inspectionQuantity: number;
    qualifiedQuantity: number;
    createBy: string;
    putStorageNumber: string;
    [propName: string]: any;
  }
  const qualityConfirm = async (record: confirmParams) => {
    let params = {
      id: record.id,
      containerNum: String(form.getFieldsValue().container),
      inspectionQuantity: record.inspectionQuantity,
      qualifiedQuantity: record.qualifiedQuantity,
      isCreateWeigh: '0',
      updateBy: record.createBy,
      putStorageNumber: record.putStorageNumber,
    };
    const resp: any = await api.qualityConfirm(params).catch(e => {});
    if (resp && resp.code == 200) {
      const { sku, num, container, batchNumber } = resp.data;
      if (resp.data?.sku) {
        Modal.info({
          title: '不入库提示',
          content: (
            <div>
              <p>
                商品sku:<span className={styles.tipSpan}>{sku}</span>
                存在不入库订单，请单独拿出
                <span className={styles.tipSpan}>{num}</span>
                个放进容器<span className={styles.tipSpan}>{container}</span>中
              </p>
            </div>
          ),
          okText: '确定',
          onOk: async () => {
            const resp = await api.getSkipOrderBatchPrintByBatchNum({
              ids: batchNumber,
            });
            printRequest([
              {
                title: '越库批次',
                url: resp.data,
              },
            ]);
          },
        });
      }
      message.success('确认成功');
      onValueChange(0, { confirmPost: true });
      numberEl.current.focus();
    }
  };

  const printBatchNumber = async (
    record: any,
    batchNumberType: number,
    subStandardQuantity: number,
  ) => {
    const { sku, shotNum, variantId, putStorageNumber, variantKeyMap } = record;
    const hide = message.loading('打印中，请稍后...');
    const resp: any = await api
      .makeUpByReceiptInspect({
        subStandardQuantity,
        sku,
        shotNum,
        variantId,
        putStorageNumber,
        batchNumberType,
        variantKeyMap,
      })
      .catch(e => {});

    hide();
    if (resp) {
      printRequest([
        {
          title: '质检补打',
          url: resp.data,
        },
      ]);
      // window.open(resp.data);
    }
  };

  return {
    form,
    onPressEnter,
    onPressEnterContainer,
    dataSource,
    onValueChange,
    exception,
    simpleForm,
    qualityConfirm,
    onShelfNum,
    onContainerChange,
    containerEl,
    printBatchNumber,
    currentContainer,
    currentScanNumber,
    numberEl,
  };
};
