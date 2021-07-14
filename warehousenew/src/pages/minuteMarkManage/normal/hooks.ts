import { Form, message, Modal } from 'antd';
import { useState, useRef, useEffect } from 'react';
import * as api from '@/services/minuteMarkManage';
import * as common from '@/services/common';
import { useExceptionModal } from '@/components/ExceptionModal';
import printRequest from '@/utils/printTwo';
import storage from '@/utils/storage';
import useButton from '@/hooks/useButton';
import throttle from '@/utils/throttle';
import debounce from '@/utils/debounce';
import { MinuteMarkNewConfirm } from '@/services/minuteMarkManage.d';
const { confirm } = Modal;
const throttleContainer = throttle.new();
export const indexHooks = (warehouseId: string) => {
  const [isMarkConfirm, setIsMarkConfirm] = useState<boolean>(false);
  const [currentScanNumber, setScanNumber] = useState<string>(''); //存储当前扫描的包裹号，商品条形码，批次号
  const [getExceptionInfoDTOS, setGetExceptionInfoDTOS] = useState<
    Array<MinuteMarkNewConfirm.getExceptionInfoDTOSItem>
  >([]);
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState<Array<any>>([]);
  const [onShelfNum, setShelfNum] = useState<string>('');
  const [exceptionIndex, setExceptionIndex] = useState<number>(0);
  const [currentContainer, setContainer] = useState<string>('');
  const containerEl = useRef<any>(null);
  const numberEl = useRef<any>(null);
  const [flag, setFlag] = useState<boolean>(false);
  const [exception] = useExceptionModal({
    onSuccess: async params => {
      const {
        relatedId,
        quantity,
        colorNum,
        colorRemark,
        sizeNum,
        sizeRemark,
        abnormalPartsNum,
        abnormalPartsRemark,
      } = params;
      const currentGetExceptionInfoDTOS = JSON.parse(
        JSON.stringify(getExceptionInfoDTOS),
      );
      const isHave = currentGetExceptionInfoDTOS.some(
        (item: MinuteMarkNewConfirm.getExceptionInfoDTOSItem) =>
          item.relatedId === params.relatedId,
      );
      if (isHave) {
        let index = currentGetExceptionInfoDTOS.findIndex(
          (item: MinuteMarkNewConfirm.getExceptionInfoDTOSItem) =>
            item.relatedId === params.relatedId,
        );
        currentGetExceptionInfoDTOS.splice(index, 1, {
          relatedId,
          quantity,
          colorNum,
          colorRemark,
          sizeNum,
          sizeRemark,
          abnormalPartsNum,
          abnormalPartsRemark,
        });
      } else {
        currentGetExceptionInfoDTOS.push({
          relatedId,
          quantity,
          colorNum,
          colorRemark,
          sizeNum,
          sizeRemark,
          abnormalPartsNum,
          abnormalPartsRemark,
        });
      }
      console.log(params, 'params=====');
      setGetExceptionInfoDTOS(currentGetExceptionInfoDTOS);
      exception.setLoading(false);
      onValueChange(exceptionIndex, { exceptionPost: true });
      exception.close();
    },
    onPressEnter: async params => {},
  });

  useEffect(() => {
    containerEl.current.focus();
  }, []);
  const containerScan = async () => {
    const values = await form.validateFields(['container']);
    const containerNum = form.getFieldsValue().container;
    const hide = message.loading('查询中，请稍后...');
    await throttleContainer.dispatch(
      async () => {
        const resp: any = await common
          .scanContainer({
            containerNum,
            statusType: 1,
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
  const onPressEnterContainer = async () => {
    if (!isMarkConfirm && dataSource.length > 0) {
      return Modal.confirm({
        title: '提示',
        content: '当前包裹未分标确认，是否确认释放容器？',
        onOk: () => {
          containerScan();
        },
      });
    } else {
      containerScan();
    }
  };
  const getListData = async () => {
    const values = await form.validateFields();
    const { packageNumber, container } = values;
    const hide = message.loading('查询中，请稍后...');
    await throttleContainer.dispatch(
      async () => {
        const resp: any = await api
          .getDetail({ packageNumber, containerNum: container.trim() })
          .catch(e => {});
        hide();
        if (resp && resp.data) {
          let Data = resp.data;
          Data.forEach((item: any) => {
            item['exceptionPost'] = false;
            item['confirmPost'] =
              item.subStandardStatus == '1' ||
              item.putStorageNumberStatus == '1'
                ? true
                : false;
          });
          const isHaveConfirm = Data.every(
            (item: any) =>
              item.subStandardStatus == '1' ||
              item.putStorageNumberStatus == '1',
          );
          // 查询本地是否有缓存
          const local: any = await storage.dbGet(Data[0].orderNumber);
          const flag = await new Promise(resolve => {
            // 当p为true时候不走提示，直接判断flag
            if (!local || isHaveConfirm) return resolve(false);
            Modal.confirm({
              title: '提示',
              content: '此次分标具有已分标的记录，是否继续分标？',
              okText: '继续分标',
              cancelText: '不了，我要重新分标',
              onOk: () => resolve(true),
              onCancel: () => resolve(false),
            });
          });
          if (flag) {
            let exceptionData: Array<MinuteMarkNewConfirm.getExceptionInfoDTOSItem> = [];
            const newData = Data.map((element: any) => {
              if (local[element.id]) {
                local[element.id].exceptionData &&
                  exceptionData.push(local[element.id].exceptionData);
                return {
                  ...element,
                  ...local[element.id],
                };
              }
              return {
                ...element,
              };
            }).sort((a: any, b: any) => a.confirmPost - b.confirmPost);

            setDataSource(newData);

            setGetExceptionInfoDTOS(exceptionData);
          } else {
            setDataSource(Data);
            setGetExceptionInfoDTOS([]);
          }
          setScanNumber(packageNumber);
          form.setFieldsValue({ packageNumber: '' });
          isHaveConfirm ? setIsMarkConfirm(true) : setIsMarkConfirm(false);
        } else {
          setDataSource([]);
        }
      },
      { time: 500 },
    );
  };
  const onPressEnter = async () => {
    if (!isMarkConfirm && dataSource.length > 0) {
      return Modal.confirm({
        title: '提示',
        content: '当前包裹未分标确认，是否放弃并扫描下一个包裹？',
        onOk: () => {
          getListData();
        },
      });
    } else {
      getListData();
    }
  };
  const onContainerChange = () => {
    setShelfNum('');
  };
  const onValueChange = async (index: number, objVal: any) => {
    // 缺少判断少货和多货逻辑
    let key: string = Object.keys(objVal)[0];
    let sourceData = JSON.parse(JSON.stringify(dataSource));
    let replaceData = JSON.parse(JSON.stringify(sourceData[index]));
    let replaceNewData: any = null;
    if (key === 'subStandardQuantity') {
      let changeNum =
        objVal[key] > replaceData.quantity ? replaceData.quantity : objVal[key];
      replaceNewData = {
        ...replaceData,
        ...objVal,
        qualifiedQuantity: changeNum,
      };
    } else {
      replaceNewData = { ...replaceData, ...objVal };
    }

    if (key === 'confirmPost') {
      sourceData.splice(index, 1);
      /**缓存确认数据 */
      let indexDbData = await storage.dbGet(replaceNewData.orderNumber);

      if (objVal[key]) {
        sourceData.push(replaceNewData);
        const getExceptionData = getExceptionInfoDTOS.filter(
          (item: any) => item.relatedId == replaceNewData.id,
        );
        const newChecked = {
          ...indexDbData,
          [replaceNewData.id]: {
            ...replaceNewData,
            exceptionData:
              getExceptionData.length === 0 ? undefined : getExceptionData[0],
          },
        };
        console.log(newChecked);
        storage.dbSet(replaceNewData.orderNumber, newChecked);
      } else {
        sourceData.unshift(replaceNewData);
        delete indexDbData[replaceNewData.id];
        storage.dbSet(replaceNewData.orderNumber, indexDbData);
      }

      setDataSource(sourceData);
    } else {
      sourceData.splice(index, 1, replaceNewData);
      setDataSource(sourceData);
    }
  };

  // 分标确认
  interface confirmParams {
    id: string;
    subStandardQuantity: number;
    qualifiedQuantity: number;
    putStorageNumber: string;
    [propName: string]: any;
  }
  const minuteMarkConfirm = useButton({
    onClick: async () => {
      const isAllConfirm = dataSource.every((item: any) => item.confirmPost);
      if (!isAllConfirm) {
        message.warn('还有待确认的分标数据，请确认');
        return Promise.reject();
      }
      const params = {
        confirmSubDTOS: dataSource
          .filter(
            (item: any) =>
              item.subStandardStatus != '1' &&
              item.putStorageNumberStatus != '1',
          )
          .map(item => {
            const { subStandardQuantity, qualifiedQuantity, quantity } = item;
            let minQuantity = Math.min(subStandardQuantity, quantity);
            const defectiveQuantity =
              minQuantity - qualifiedQuantity > 0
                ? minQuantity - qualifiedQuantity
                : 0; //次品数量

            const multipleQuantity =
              subStandardQuantity - quantity > 0
                ? subStandardQuantity - quantity
                : 0; //多货数量
            return {
              id: item.id,
              subStandardQuantity,
              qualifiedQuantity,
              defectiveQuantity,
              multipleQuantity,
            };
          }),
        getExceptionInfoDTOS: getExceptionInfoDTOS,
        containerNum: currentContainer,
        storageId: warehouseId,
      };

      const resp: any = await api.minuteMarkNewConfirm(params).catch(e => {});
      if (resp && resp.code == 200) {
        message.success('确认成功');
        setIsMarkConfirm(true);
        numberEl.current.focus();
        dataSource.length > 0 &&
          (await storage.dbRemove(dataSource[0].orderNumber));
      }
    },
  });

  /**确认--- */
  const itemConfirm = new debounce().use(
    async (record: confirmParams, index: number) => {
      const { subStandardQuantity, qualifiedQuantity, quantity } = record;
      let minQuantity = Math.min(subStandardQuantity, quantity);
      const defectiveQuantity =
        minQuantity - qualifiedQuantity > 0
          ? minQuantity - qualifiedQuantity
          : 0; //次品数量
      const data: any = {
        id: record.id,
        subStandardQuantity,
        qualifiedQuantity,
        defectiveQuantity,
        containerNum: currentContainer,
        storageId: warehouseId,
      };
      try {
        await api.confirmSingleSub(data);
        onValueChange(index, { confirmPost: true });
        qualifiedQuantity > 0 && printSku(record, 1);
      } catch (error) {}
    },
    100,
    true,
  );

  /**撤回 */
  const withDraw = new debounce().use(
    async (record: confirmParams, index: number) => {
      try {
        await api.recallSub({ id: record.id });
        onValueChange(index, { confirmPost: false, exceptionPost: false });
      } catch (error) {}
    },
    200,
    true,
  );

  // 打印sku
  const printSku = async (record: any, batchNumberType: number) => {
    const { id } = record;
    const hide = message.loading('打印中，请稍后...');
    const resp: any = await api
      .printSku({ id, batchNumberType })
      .catch(e => {});
    hide();
    if (resp) {
      printRequest([
        {
          title: '分标打印',
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
    printSku,
    minuteMarkConfirm,
    onShelfNum,
    onContainerChange,
    setExceptionIndex,
    containerEl,
    currentContainer,
    currentScanNumber,
    numberEl,
    itemConfirm,
    withDraw,
    isMarkConfirm,
  };
};
