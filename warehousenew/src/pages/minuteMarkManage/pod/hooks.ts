import { Form, message, Modal } from 'antd';
import { useState, useRef, useEffect } from 'react';
import * as api from '@/services/minuteMarkManage';
import * as api2 from '@/services/weighManage';
import { useExceptionModal } from '@/components/ExceptionModal';
import printRequest from '@/utils/printTwo';
import storage from '@/utils/storage';
import useButton from '@/hooks/useButton';
import throttle from '@/utils/throttle';
import debounce from '@/utils/debounce';
import CJ_createZip from '@/utils/zip';
import { MinuteMarkNewConfirm } from '@/services/minuteMarkManage.d';
import useModal from '@/hooks/useModal';
import dealPropertiesData from '@/utils/dealPropertiesData';
import { ShopTwoTone } from '@ant-design/icons';

const throttleContainer = throttle.new();

export const searchFormHooks = (
  searchData: any,
  warehouseId: string,
  dispatch: Function,
) => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(searchData);
  }, [searchData]);

  useEffect(() => {
    form.setFieldsValue({ warehouse: warehouseId });
  }, [warehouseId]);

  useEffect(() => {
    dispatch({
      type: 'moveInWarehouse/search',
      payload: { searchData: { warehouse: warehouseId } },
    });
  }, [warehouseId]);

  const onSearch = async () => {
    const values = form.getFieldsValue();
    dispatch({
      type: 'moveInWarehouse/search',
      payload: { searchData: values },
    });
  };

  const onClearSearch = () => {
    form.resetFields();
    dispatch({
      type: 'moveInWarehouse/searchDataClear',
      payload: { warehouse: warehouseId },
    });
  };
  return {
    form,
    onSearch,
    onClearSearch,
  };
};

export const indexHooks = (warehouseId: string) => {
  const [isMarkConfirm, setIsMarkConfirm] = useState<boolean>(false);
  const [currentScanNumber, setScanNumber] = useState<string>(''); //存储当前扫描的包裹号，商品条形码，批次号
  const [getExceptionInfoDTOS, setGetExceptionInfoDTOS] = useState<
    Array<MinuteMarkNewConfirm.getExceptionInfoDTOSItem>
  >([]);
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState<Array<any>>([]);
  const [initData, setInitData] = useState<Array<any>>([]);
  const [onShelfNum, setShelfNum] = useState<string>('');
  const [exceptionIndex, setExceptionIndex] = useState<number>(0);
  const [currentContainer, setContainer] = useState<string>('');
  const containerEl = useRef<any>(null);
  const numberEl = useRef<any>(null);
  const [flag, setFlag] = useState<boolean>(false);
  const [expandedRowKeys, setExpandedRowKeys] = useState<Array<any>>([]);
  const [onLastShelfNum, setLastShelfNum] = useState<string>('');
  // 留言弹框是否可见
  const [messageVisible, setMessageVisible] = useState<boolean>(false);
  // 留言弹框内容
  const [messageContent, setMessageContent] = useState<any>();
  // 是否可以打印
  const [isPrint, setIsPrint] = useState<boolean>(false);
  // 是否显示打印弹框
  const [printModalVisible, setPrintModalVisible] = useState<boolean>(false);
  // 打印弹框保留的id
  const [printId, setPrintId] = useState<string>('');
  // 未输入打印纸，警告
  const [showPrintWarn, setShowPrintWarn] = useState<boolean>(false);
  // 打印值
  const [printCount, setPrintCount] = useState<number>(0);
  // 定制信息
  const [customInformation, setCustomInformation] = useState<any>();

  const [exception] = useExceptionModal({
    onSuccess: async params => {
      const {
        relatedId,
        productId,
        quantity,
        expectQuantity,
        realQuantity,
        storageId,
        type,
        variantId,
        unexceptionQuantity,

        colorNum,
        colorRemark,
        sizeNum,
        sizeRemark,
        abnormalPartsNum,
        abnormalPartsRemark,
      } = params;
      const requestData = {
        id: productId, // 主键id
        subId: relatedId, //分标id，
        qualifiedNum: type, // 合格数量
        defectiveNum: quantity, // 次品数量
        lackNum: expectQuantity, //少货数量
        onShelfNum: onLastShelfNum, // 上架单号
        containerNum: storageId, //容器编号
        arrivalQuantity: unexceptionQuantity, // 到货数量
        moreQuantity: realQuantity, //多货数量

        colourQuantity: colorNum, //颜色问题数量
        colourRemark: colorRemark, //颜色问题备注
        sizeQuantity: sizeNum, //尺寸问题数量
        sizeRemark: sizeRemark, //尺寸问题备注
        abnormalQuantity: abnormalPartsNum, //异常件数量
        abnormalRemark: abnormalPartsRemark, //异常件备注
      };
      console.log('=================================-', requestData);
      const resp: any = await api.submitPodOrder(requestData);
      if (resp.code == 200) {
        if (variantId == 2) {
          const hide = message.loading('打印中，请稍后...');
          const resp: any = await api
            .productPrint({ id: relatedId, quantity: 1 })
            .catch(e => {});
          hide();
          if (resp) {
            printRequest([
              {
                title: '定制商品打印',
                url: resp.data,
              },
            ]);
          }
        } else {
          printChange(productId);
        }
        getListData(false);
      }
      exception.setLoading(false);
      exception.close();
    },
    onPressEnter: async params => {},
  });

  useEffect(() => {
    containerEl.current.focus();
  }, []);

  const onPressEnterContainer = async () => {
    const values = await form.validateFields(['container']);
    const containerNum = form.getFieldsValue().container.trim();
    const hide = message.loading('查询中，请稍后...');

    await throttleContainer.dispatch(
      async () => {
        const resp: any = await api2
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

  const changeRowsKey = (expanded: any, record: any) => {
    let temp = [];
    if (expanded) {
      temp.push(record.receiptSubStandardDTO.id);
    }
    setExpandedRowKeys(temp);
  };

  const getcount = (data: Array<any>) => {
    data.map((item: any) => {
      let count = 0; // 实际
      let qualifed = 0; // 合格
      let more = 0; // 多货
      let less = 0;
      item.podOrderList.map((pod: any) => {
        if (pod.status == 0) {
          pod.arrivalQuantity = pod.quantity;
          pod.qualifiedNum = pod.quantity;
        }
        count += pod.arrivalQuantity;
        qualifed += pod.qualifiedNum;
        const diff =
          pod.arrivalQuantity - pod.quantity > 0
            ? pod.arrivalQuantity - pod.quantity
            : 0;
        const lessdiff = pod.quantity - count > 0 ? pod.quantity - count : 0;
        more += diff;
        less += lessdiff;
        return pod;
      });
      item.receiptSubStandardDTO.actualQuantity = count || 0;
      item.receiptSubStandardDTO.qualifiedQuantity = qualifed || 0;
      item.receiptSubStandardDTO.moreProduct = more;
      item.receiptSubStandardDTO.lessProduct = less;
      return item;
    });
    return data;
  };

  const getListData = async (showText: boolean) => {
    const values = await form.validateFields();
    const { number } = values;
    let hide: any;
    if (showText) {
      hide = message.loading('查询中，请稍后...');
    }
    await throttleContainer.dispatch(
      async () => {
        const resp: any = await api
          .podOrderList({ number, storageId: warehouseId })
          .catch(e => {});
        if (showText) {
          hide();
        }

        if (resp && resp.data) {
          let sourceData = getcount(resp.data);
          setDataSource(sourceData);
          setInitData(sourceData);
          // form.setFieldsValue({ number: '' });
        } else {
          setDataSource([]);
          setInitData([]);
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
          setDataSource([]);
          getListData(true);
        },
      });
    } else {
      getListData(true);
    }
  };

  //
  const onContainerChange = () => {
    setShelfNum('');
  };
  // 缺少判断少货和多货逻辑
  const onValueChange = async (
    index: number,
    objVal: any,
    parentId: string,
  ) => {
    let sourceData = JSON.parse(JSON.stringify(dataSource));
    const newData = sourceData.map((item: any) => {
      if (
        item.receiptSubStandardDTO.id &&
        item.receiptSubStandardDTO.id === parentId
      ) {
        item.podOrderList[index] = {
          ...item.podOrderList[index],
          ...objVal,
        };
      }
      return item;
    });
    console.log(newData);
    setDataSource(newData);
  };

  /**确认--- */
  const itemConfirm = new debounce().use(
    async (
      record: any,
      subId: string,
      containerNum: string,
      index: number,
      recordParams: any,
      exceptionNumber: number,
    ) => {
      const defective =
        Math.min(record.arrivalQuantity, record.quantity) - record.qualifiedNum;
      if (defective > 0) {
        setExceptionIndex(index);
        exception.show(recordParams, exceptionNumber);
      } else {
        const { arrivalQuantity, qualifiedNum, id, type, quantity } = record;
        const more = arrivalQuantity - quantity;
        const less = quantity - arrivalQuantity;
        const data: any = {
          id, //主键id
          subId, //分标id
          qualifiedNum, //合格数量
          defectiveNum: defective > 0 ? defective : 0, //次品数量
          lackNum: less > 0 ? less : 0, //少货数量
          onShelfNum: onLastShelfNum, //上架单号
          containerNum, //容器编号
          arrivalQuantity, //到货数量
          moreQuantity: more > 0 ? more : 0, //多货数量

          colourQuantity: 0, // 颜色问题数量
          colourRemark: '', //颜色问题备注
          sizeQuantity: 0, //尺寸问题数量
          sizeRemark: '', //尺寸问题备注
          abnormalQuantity: 0, //异常件数量
          abnormalRemark: '', //异常件备注
        };
        try {
          const result = await api.submitPodOrder(data);
          if (result && result.code == 200) {
            message.success('确认成功');
          }
          if (type == 2) {
            // 1，定制包装，2：定制商品
            const hide = message.loading('打印中，请稍后...');
            const resp: any = await api
              .productPrint({ id, quantity: 1 })
              .catch(e => {});
            hide();
            if (resp) {
              printRequest([
                {
                  title: '定制商品打印',
                  url: resp.data,
                },
              ]);
            }
          } else {
            // 为1的时候要弹窗输入打印
            console.log('为1的时候要弹窗输入打印');
            printChange(id);
          }
          getListData(false);
        } catch (error) {}
      }
    },
    100,
    true,
  );

  // 自动打印sku
  const printSku = async (type: number, id?: string) => {
    const prontid = id ? id : printId;
    if (!printCount && type == 1) {
      setShowPrintWarn(true);
      return;
    }
    const hide = message.loading('打印中，请稍后...');
    let resp: any;
    if (type == 1) {
      resp = await api
        .productPrint({ id: prontid, quantity: printCount })
        .catch(e => {});
    } else {
      resp = await api
        .productPrint({ id: prontid, quantity: 1 })
        .catch(e => {});
    }
    hide();
    printCancel();
    if (resp) {
      printRequest([
        {
          title: `${type == 1 ? '包装商品打印' : '定制商品打印'}`,
          url: resp.data,
        },
      ]);
    }
  };

  // 打印显示弹窗
  const printChange = (id: string) => {
    setPrintId(id);
    setShowPrintWarn(false);
    setPrintModalVisible(true);
  };

  // 打印张数改变
  const printNumberChange = (value: number) => {
    if (value) {
      setShowPrintWarn(false);
    }
    setPrintCount(value);
  };

  // 取消打印
  const printCancel = () => {
    setPrintId('');
    setShowPrintWarn(false);
    setPrintCount(0);
    setPrintModalVisible(false);
  };

  // 留言弹框
  const openMessageModal = (content: any) => {
    if (!content) return;
    const data = JSON.parse(content);
    setMessageContent(data);
    setMessageVisible(true);
  };

  // 定制信息处理
  const setPersonal = (record: any) => {
    if (record.properties) {
      const customerInfo = dealPropertiesData(
        record.properties,
        'product',
        record,
      );
      gxhProductModal.show(customerInfo);
    } else {
      message.error('未查询到对应的客户定制信息');
    }
  };

  //  onSearch,
  const onSearch = () => {
    if (initData.length < 1) return;
    const { orderId } = form.getFieldsValue();
    let newData: Array<any> = [];
    initData.map((item: any) => {
      item.podOrderList.map((pod: any) => {
        if (orderId == pod.orderId) {
          newData.push(item);
        }
      });
    });
    setDataSource(newData);
  };
  // 重置 onClearSearch
  const onClearSearch = () => {
    setDataSource(initData);
  };

  const getLink = (params: any) => {
    if (!params) return;
    const parseParams = JSON.parse(params);
    if (parseParams && parseParams.length > 0) {
      CJ_createZip(parseParams, () => {});
    } else {
      message.error('导包图数据错误，请重试！');
    }
  };

  const [gxhOrderModal] = useModal();
  const [gxhProductModal] = useModal();
  return {
    form,
    onPressEnter,
    onPressEnterContainer,
    dataSource,
    onValueChange,
    exception,
    printSku,
    onShelfNum,
    onContainerChange,
    setExceptionIndex,
    customInformation,
    containerEl,
    currentContainer,
    currentScanNumber,
    numberEl,
    itemConfirm,
    changeRowsKey,
    expandedRowKeys,
    isMarkConfirm,
    messageVisible,
    setMessageVisible,
    openMessageModal,
    messageContent,
    printModalVisible,
    printCancel,
    printChange,
    printNumberChange,
    showPrintWarn,
    setPersonal,
    onSearch,
    onClearSearch,
    gxhOrderModal,
    gxhProductModal,
    initData,
    getLink,
  };
};
