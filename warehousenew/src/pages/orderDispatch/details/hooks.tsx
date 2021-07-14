import { useEffect, useState } from 'react';
import { Form, message } from 'antd';
import * as api from '@/services/orderDispatchDetail';
import { checkPackageDetail } from '@/services/orderDispatch';
import { reportText } from '@/utils/report';
import storage from '@/utils/storage';
import { history } from 'umi';
import moment from 'moment';
export const indexHooks = (
  dispatch: Function,
  queryId: any,
  currentItem: any,
) => {
  const [form] = Form.useForm();

  // 包裹明细
  const [detailData, setDetailData] = useState<Array<any>>([]);

  //包裹列表
  const [packageData, setPackageData] = useState<Array<any>>([]);

  //拦截列表
  const [interceptData, setInterceptData] = useState<Array<any>>([]);

  // 保存按钮loading
  const [btnLoading, setBtnLoading] = useState<boolean>(false);

  // 存储id
  const [currentId, setCurrentId] = useState<number>(history.location.query.id);

  // 打标记判断数据是否变动

  const [isDataChange, setDataChange] = useState<boolean>(false);

  const [parcelNumber, setParcelNumber] = useState<string>('');

  useEffect(() => {
    getPackageList();
    if (queryId) {
      checkPackageDetail({ id: queryId }).then(res => {
        const detailData: any = res.data;
        setDetailData(detailData);
      });
    } else {
      const { dispatchNumber } = currentItem;
      form.setFieldsValue({ dispatchNumber });
      const currentData = storage.localGet('currentPackageList')
        ? storage.localGet('currentPackageList')
        : [];
      setDetailData(currentData);
      packageAutoInput(currentData);
    }
  }, [queryId]);

  // useEffect(() => {

  // }, [currentId]);

  // 获取包裹列表
  const getPackageList = () => {
    const { id } = currentItem;
    api
      .checkPackageDetailById({
        id,
      })
      .then(res => {
        const Data: any = res.data;
        setPackageData(Data);
        if (queryId) {
          const { dispatchNumber } = currentItem;
          const packageObj = Data.filter((item: any) => {
            return item.id == queryId;
          })[0];
          setParcelNumber(packageObj.parcelNumber);
          form.setFieldsValue({ ...packageObj, dispatchNumber });
        }
      });
  };

  const scanPackageOrTrackNumber = async (e: any) => {
    const { targetStorehouseId, sourceStorehouseId } = currentItem;
    const { packProperty } = form.getFieldsValue();
    const parcelOrWaybillNumber = e.target.value;
    const resp = await api.scanPackageOrTrackNumber({
      targetStorehouseId,
      sourceStorehouseId,
      packProperty,
      parcelOrWaybillNumber,
    });

    if (resp && resp.data) {
      const Data: any = resp.data;
      const store = !Data.store
        ? '与当前仓库不符'
        : Data.store === 2
        ? '美东'
        : '美西';
      if (Data.orderType === 1) {
        const sourceData = JSON.parse(JSON.stringify(detailData));
        const isExist = sourceData.some((item: any) => {
          return item.parcelOrWaybillNumber == Data.parcelOrWaybillNumber;
        });
        reportText(store);
        if (!isExist) {
          sourceData.push(Data);
          setDetailData(sourceData);
          storage.localSet('currentPackageList', sourceData);
          packageAutoInput(sourceData);
          setDataChange(true);
        } else {
          message.warn('重复扫描');
        }
      } else {
        let msg = '';
        switch (Data.orderType) {
          case 2:
            msg = '包裹错误，无法添加！';
            break;
          case 3:
            msg = `到达仓错误 ${store}`;
            break;
          case 4:
            msg = `属性异常-${Data.property}`;
            break;
          default:
            msg = `包裹或订单号不存在`;
            break;
        }
        message.warn(msg);
        reportText(msg);
        const sourceData = JSON.parse(JSON.stringify(interceptData));
        const isExist = sourceData.some((item: any) => {
          return item.parcelOrWaybillNumber == Data.parcelOrWaybillNumber;
        });
        if (!isExist) {
          sourceData.push(Data);
          setInterceptData(sourceData);
        } else {
          message.warn('重复扫描');
        }
      }
    }
  };

  const packageAutoInput = (detailData: Array<any>) => {
    let propertyString: string = '';
    detailData.forEach((element: any) => {
      if (element.property) {
        propertyString += element.property + ',';
      }
    });
    const propertyArr: Array<any> = Array.from(
      new Set(
        propertyString
          .split(',')
          .map(element => {
            if (element) return element;
          })
          .filter(item => {
            if (item) return item;
          }),
      ),
    );
    let remarks = '';
    if (queryId) {
      remarks =
        propertyArr.length === 0
          ? ''
          : `${moment().format(
              'YYYY-MM-DD',
            )}-${parcelNumber}-${propertyArr.join(',')}`;
    } else {
      remarks =
        propertyArr.length === 0
          ? ''
          : `${moment().format('YYYY-MM-DD')}-${propertyArr.join(',')}`;
    }
    form.setFieldsValue({ remarks: remarks });
  };
  const savePackage = async () => {
    setBtnLoading(true);
    const formVal = form.getFieldsValue();
    const { id, dispatchNumber } = currentItem;
    let params = {
      ...formVal,
      schedulingId: id,
      dispatchNumber,
      id: queryId ? queryId : undefined,
      detailList: detailData,
    };

    const resp = await api.saveDetailPackageShceduing({
      ...params,
    });
    setBtnLoading(false);
    if (resp && resp.data) {
      storage.localRemove('currentPackageList');
      let isUpdate = queryId;
      let msg = isUpdate ? '编辑成功' : '新增包裹成功';
      message.success(msg);
      setDataChange(false);
      if (!isUpdate) {
        const { dispatchNumber } = currentItem;
        form.resetFields();
        form.setFieldsValue({ dispatchNumber });
        setDetailData([]);
        getPackageList();
      }
    }
  };

  const deleteDetail = (record: any) => {
    const newData = detailData.filter(
      (item: any) =>
        item.parcelOrWaybillNumber !== record.parcelOrWaybillNumber,
    );
    setDetailData(newData);
    packageAutoInput(newData);
    storage.localSet('currentPackageList', newData);
  };

  // packageList跳转
  const packageListUseRouter = (record: any) => {
    if (isDataChange) {
      return message.warn('当前数据发生变化，请保存后再点击切换！');
    }
    setCurrentId(record.id);
    history.push({
      pathname: '/orderDispatch/details',
      query: { id: record.id },
    });
  };
  return {
    form,
    detailData,
    packageData,
    interceptData,
    savePackage,
    deleteDetail,
    scanPackageOrTrackNumber,
    btnLoading,
    packageListUseRouter,
    parcelNumber,
  };
};
