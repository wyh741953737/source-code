import { useEffect, useState } from 'react';
import { Form, message } from 'antd';
import moment from 'moment';
import useModal from '@/hooks/useModal';
import * as api from '@/services/packagePrint';
import { searchThresholdVal } from '@/services/weightConfig';
// import printAuto from '@/components/Print';
import printAuto from '@/utils/printThree';

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
    dispatch({
      type: 'packagePrint/search',
      payload: { searchData: { storageId: warehouseId } },
    });
  }, [warehouseId]);
  const onSearch = async () => {
    const values = form.getFieldsValue();
    const timer = form.getFieldsValue().createTime;
    let beginDate = timer ? moment(timer[0]).format('YYYY-MM-DD') : '';
    let endDate = timer ? moment(timer[1]).format('YYYY-MM-DD') : '';
    dispatch({
      type: 'packagePrint/search',
      payload: { searchData: { ...values, beginDate, endDate } },
    });
  };
  const onClearSearch = () => {
    form.resetFields();
    dispatch({
      type: 'packagePrint/searchDataClear',
      payload: { storageId: warehouseId },
    });
  };
  return {
    form,
    onSearch,
    onClearSearch,
  };
};

export const indexHooks = (dispatch: Function) => {
  const [threSholdObj, setThreshold] = useState<any>();

  useEffect(() => {
    searchThresholdVal()
      .then(res => {
        if (res && res.data) {
          setThreshold(res.data);
        }
      })
      .catch(e => {});
  }, []);

  const onChange = (page: number, pageSize?: number | undefined) => {
    dispatch({
      type: 'packagePrint/search',
      payload: {
        pageNumber: page,
        pageSize,
      },
    });
  };

  const [addPackageModal] = useModal({
    onOk: async (values, p) => {
      const { logisticsTrackingNumber, weight } = values;
      const { id, logisticsCompany } = p;
      let postParams = {
        logisticsTrackingNumber,
        weight,
        logisticsCompany,
        weightPackageId: id,
      };
      try {
        const resp = await api
          .addNewPackage({
            ...postParams,
          })
          .catch(e => {});
        if (resp && resp.data) {
          dispatch({
            type: 'packagePrint/search',
            payload: {},
          });
        }
      } catch (e) {
        return false;
      }
      return true;
    },
  });

  const updateWeight = async (e: any, record: any) => {
    if (!e.target.value) {
      return message.warn('请输入毛重');
    }
    let grossWeight = parseFloat(e.target.value).toFixed(2);
    const resp = await api
      .updatePackageGrossWeight({
        id: record.id,
        grossWeight: parseFloat(grossWeight),
      })
      .catch(e => {});
    if (resp && resp.data) {
      dispatch({
        type: 'packagePrint/search',
        payload: {},
      });
    }
  };

  const updateStatus = async (record: any) => {
    const resp = await api
      .updatePackageStatus({
        id: record.id,
        status: record.status === 0 ? 1 : 0,
        electronicScaleModel: record.electronicScaleModel,
      })
      .catch(e => {});
    if (resp && resp.data) {
      dispatch({
        type: 'packagePrint/search',
        payload: {},
      });
    }
  };

  const printPackage = async (record: any) => {
    const { id, grossWeight } = record;
    if (!record.grossWeight) {
      return message.warn('毛重不能为空');
    }
    const hide = message.loading('打印中，请稍后...');
    const resp: any = await api.printPackageNumber({ id, grossWeight });
    hide();
    if (resp && resp.data) {
      dispatch({
        type: 'packagePrint/search',
        payload: {},
      });
      // window.open(resp.data);
      printAuto(
        resp.data.map((d: any) => ({
          url: d.pdf,
          logisticsChannel: d.logisticsChannel,
          orderId: d.orderId,
          logisticsCompany: d.logisticsCompany,
        })),
      );
    }
  };

  const showLog = async (orderId: string) => {
    const hide = message.loading('查询中，请稍后...');
    try {
      const resp = await api.getLogList({ id: orderId });
      dispatch({
        type: 'packagePrint/_logVisibleChange',
        payload: { visible: true, data: resp.data },
      });
    } catch (error) {}

    hide();
  };
  const getPackInfo = async (text: string) => {
    const resp = await api.getPackageInfo({ packNumber: text });
    detailModal.show(resp.data);
  };

  // 包裹明细
  const [detailModal] = useModal();
  return {
    onChange,
    addPackageModal,
    showLog,
    updateWeight,
    updateStatus,
    printPackage,
    threSholdObj,
    detailModal,
    getPackInfo,
  };
};

export const logModalHooks = (dispatch: Function) => {
  const onClose = () => {
    dispatch({
      type: 'packagePrint/_logVisibleChange',
      payload: {
        visible: false,
      },
    });
  };
  return {
    onClose,
  };
};
