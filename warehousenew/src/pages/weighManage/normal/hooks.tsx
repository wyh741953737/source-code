import { Form, message, Modal } from 'antd';
import React, { useState, useEffect, useRef } from 'react';
import * as api from '@/services/weighManage';
import useModal from '@/hooks/useModal';
import axios from 'axios';
import throttle from '@/utils/throttle';
import printRequest from '@/utils/printTwo';
import style from './index';
const { confirm } = Modal;

const throttleContainer = throttle.new();
export const indexHooks = (warehouseId: string) => {
  let timer: any = null;
  const [currentScanNumber, setScanNumber] = useState<string>(''); //存储当前扫描的包裹号，商品条形码，批次号
  const [form] = Form.useForm();
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
      const resp: any = await api.weightMakeup(makeupParams).catch(e => {});
      printRequest([
        {
          title: '称重补打',
          url: resp.data,
        },
      ]);
      // resp && window.open(resp.data);
    },
  });

  const [dataSource, setDataSource] = useState<Array<any>>([]);
  const [onShelfNum, setShelfNum] = useState<string>('');
  const [onLastShelfNum, setLastShelfNum] = useState<string>('');
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
        const resp: any = await api
          .scanContainer({
            containerNum: containerNum,
            statusType: 3,
            isOnShelf: 1,
            onShelfNum: onLastShelfNum,
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
            setLastShelfNum('');
            setFlag(false);
          } else {
            message.success('容器绑定成功');
            setShelfNum(resp.data);
            setContainer(containerNum);
            setLastShelfNum(resp.data);
            numberEl.current.focus();
            setFlag(true);
          }
        } else {
          setContainer('');
          setShelfNum('');
          setLastShelfNum('');
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
          axios
            .get('http://localhost:3000')
            .then((res: any) => {
              if (res && res.data) {
                let realityWeight: any = res.data[1].g;
                let sourceData: any = { ...resp.data, realityWeight };
                let Data = [sourceData];
                Data.forEach((item: any) => {
                  item['confirmPost'] = false;
                });
                setDataSource(Data);
                setScanNumber(fullBatchNumber);
                form.setFieldsValue({ searchId: '' });
                submitAudit(Data[0], true);
              }
            })
            .catch(error => {
              Modal.error({
                title: '电子秤称重',
                content: (
                  <div>
                    请确定电子秤程序是否启动，如果未安装，请先
                    <a
                      href="https://cc-west-usa.oss-us-west-1.aliyuncs.com/printservice/electronicScale.rar"
                      target="_blank"
                    >
                      点击下载
                    </a>
                    , 并安装后重新称重
                  </div>
                ),
              });
              // message.error("请连接称重设备");
              let Data = [resp.data];
              Data.forEach((item: any) => {
                item['confirmPost'] = false;
              });
              setDataSource(Data);
              setScanNumber(fullBatchNumber);
              form.setFieldsValue({ searchId: '' });
              // submitAudit(resp.data);
            });
        } else {
          setDataSource([]);
        }
      },
      { time: 500 },
    );
  };
  const submitAudit = (sourceData: any, isAutoConfirm: boolean = false) => {
    const {
      variantId,
      productId,
      realityWeight,
      systemPackingWeight,
      systemWeight,
      batchNumber,
    } = sourceData;
    const diff = realityWeight - systemWeight;
    if (diff > 50 || diff < -50) {
      // const diff = realityWeight - systemPackingWeight;
      // if (diff > 10 || diff < -50) {
      confirm({
        title: '商品重量异常，请提交至异常至销售审核。',
        onOk: async () => {
          const responseData = await api.upRealityWeight({
            realityWeight,
            // systemPackingWeight,
            systemPackingWeight: systemWeight,
            variantId,
            productId,
            batchNumber,
          });
          if (responseData && responseData.code == 200) {
            message.success('提交成功');
            numberEl.current.focus();
          }
        },
        onCancel() {},
      });
    } else {
      // 获取实际重量之后且不在阈值区间内，进行自动确认操作
      if (isAutoConfirm) {
        clearTimeout(timer);
        timer = setTimeout(() => {
          weightConfirm(sourceData);
        }, 50);
      }
    }
  };
  const onContainerChange = () => {
    setShelfNum('');
  };
  const onValueChange = (index: number, objVal: any) => {
    // 缺少判断少货和多货逻辑
    let key: string = Object.keys(objVal)[0];
    let sourceData = JSON.parse(JSON.stringify(dataSource));
    let replaceData = JSON.parse(JSON.stringify(sourceData[index]));
    const { systemPackingWeight, variantId, productId } = replaceData;
    let replaceNewData = null;
    if (key === 'weighQuantity') {
      replaceNewData = {
        ...replaceData,
        ...objVal,
        qualifiedQuantity: objVal[key],
      };
    } else {
      replaceNewData = { ...replaceData, ...objVal };
    }
    sourceData.splice(index, 1, replaceNewData);
    setDataSource(sourceData);
  };

  // 称重确认
  interface confirmParams {
    id: number;
    weighQuantity: number;
    qualifiedQuantity: number;
    realityWeight: number;
    length: number;
    width: number;
    height: number;
    createBy: string;
    putStorageNumber: string;
    [propName: string]: any;
  }
  const weightConfirm = async (record: confirmParams) => {
    let params = {
      id: record.id,
      containerNum: String(form.getFieldsValue().container),
      weighQuantity: record.weighQuantity,
      qualifiedQuantity: record.qualifiedQuantity,
      realityWeight: record.realityWeight,
      length: record.length,
      width: record.width,
      height: record.height,
      updateBy: record.createBy,
      onShelfNum: onShelfNum,
      putStorageNumber: record.putStorageNumber,
    };
    const resp: any = await api.weightConfirm(params).catch(e => {});
    if (resp && resp.code == 200) {
      message.success('确认成功');
      setDataSource([{ ...record, confirmPost: true }]);
      numberEl.current.focus();
    }
  };

  return {
    form,
    onPressEnter,
    onPressEnterContainer,
    dataSource,
    onValueChange,
    simpleForm,
    weightConfirm,
    onShelfNum,
    onContainerChange,
    containerEl,
    submitAudit,
    currentContainer,
    currentScanNumber,
    numberEl,
  };
};
