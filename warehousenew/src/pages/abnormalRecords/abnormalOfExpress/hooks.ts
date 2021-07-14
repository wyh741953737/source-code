import { useEffect, useState } from 'react';
import { Form, message, Modal } from 'antd';
import * as api from '@/services/abnormalOfExpress';
import { namespace } from '@/models/abnormalOfExpress';
import useButton from '@/hooks/useButton';
import { EXPRESSSTATUS } from '@/enum.config';
// import printAuto from '@/components/Print';
import printAuto from '@/utils/printThree';
import * as printApi from '@/services/packageRecord';
import useModal from '@/hooks/useModal';
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
    form.setFieldsValue({ storehouseId: warehouseId });
  }, [warehouseId]);
  useEffect(() => {
    dispatch({
      type: `${namespace}/search`,
      payload: { searchData: { storehouseId: warehouseId } },
    });
  }, [warehouseId]);
  const onSearch = async () => {
    const values = form.getFieldsValue();
    dispatch({
      type: `${namespace}/search`,
      payload: { searchData: values },
    });
  };
  const onClearSearch = () => {
    form.resetFields();
    dispatch({
      type: `${namespace}/searchDataClear`,
      payload: { storehouseId: warehouseId },
    });
  };
  return {
    form,
    onSearch,
    onClearSearch,
  };
};

export const indexHooks = (dispatch: Function) => {
  const [selected, setSelected] = useState({ keys: [], rows: [] });
  const onSelectChange = (keys: any, rows: any) => {
    setSelected({ keys, rows });
  };
  const onChange = (page: number, pageSize?: number | undefined) => {
    dispatch({
      type: `${namespace}/search`,
      payload: {
        pageNumber: page,
        pageSize,
      },
    });
  };
  /**
   * 批量打印面单
   */
  const printBtn = useButton({
    onClick: async () => {
      if (selected.rows.length === 0) {
        message.warn('至少选择一个');
        return Promise.reject();
      }
      const prints = selected.rows.map((item: any) => item.packCode);
      const resp = await printApi.printList({
        packCodeList: prints,
        isCheckExpireTime: 0,
      });
      if (resp.data.length > 0)
        printAuto(
          resp.data.map(d => ({
            url: d.pdf ? d.pdf : d.packPdf,
            logisticsChannel: d.logisticsChannel,
            orderId: d.orderId,
            logisticsCompany: d.logisticsCompany,
          })),
        );
    },
  });
  const reCreate = async (record: any) => {
    const { packCode } = record;
    const resp = await printApi.printList({
      packCodeList: [packCode],
      isCheckExpireTime: 0,
    });
    if (resp.data.length > 0)
      printAuto(
        resp.data.map(d => ({
          url: d.pdf,
          logisticsChannel: d.logisticsChannel,
          orderId: d.orderId,
          logisticsCompany: d.logisticsCompany,
        })),
      );
  };
  const print = (record: any) => {
    const {
      orderAddress,
      packCode,
      logisticsChannel,
      orderId,
      logisticsCompany,
    } = record;
    printAuto([
      {
        url: orderAddress,
        logisticsChannel,
        orderId: orderId,
        logisticsCompany: logisticsCompany,
      },
    ]);
  };

  // 回填运单号
  const [editModal] = useModal({
    onOk: async (values, p) => {
      console.log(values, p);
      const { trackingNumber, offlineLogistics } = values;
      const { packCode, orderType } = p;
      const makeupParams: any =
        orderType != 1
          ? {
              trackingNumber,
              packCode,
              offlineLogistics,
            }
          : {
              trackingNumber,
              packCode,
            };
      try {
        await api.filloutTrackNumber(makeupParams).catch(e => {});
        message.success('修改成功');
        dispatch({
          type: `${namespace}/search`,
          payload: {},
        });
        return true;
      } catch (error) {
        message.error(error);
        return false;
      }
    },
  });

  return {
    onChange,
    print,
    reCreate,
    onSelectChange,
    selected,
    printBtn,
    editModal,
  };
};
