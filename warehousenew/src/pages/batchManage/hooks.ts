import { Form, message, Modal } from 'antd';
import { useEffect, useState } from 'react';
import useModal from '@/hooks/useModal';
import * as api from '@/services/batchManage';
import { namespace } from '@/models/batchManage';
// import printAuto from '@/components/Print';
import printAuto from '@/utils/printThree';

export const searchFormHooks = (
  searchData: any,
  warehouseId: string,
  dispatch: Function,
) => {
  const [form] = Form.useForm();
  const [selectedOption, setSelectedOption] = useState(
    searchData.selectedOption,
  );
  useEffect(() => {
    form.setFieldsValue({ ...searchData });
  }, [searchData]);
  useEffect(() => {
    dispatch({
      type: `${namespace}/search`,
      payload: { searchData: { warehouse: warehouseId } },
    });
  }, [warehouseId]);
  const valuesChanged = (changedValues: any) => {
    if ('selectedOption' in changedValues) {
      setSelectedOption(changedValues.selectedOption);
    }
  };
  const onSearch = async () => {
    await form.validateFields();
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
      payload: { warehouse: warehouseId },
    });
  };
  return {
    form,
    selectedOption,
    valuesChanged,
    onSearch,
    onClearSearch,
  };
};

export const indexHooks = (dispatch: Function, dataSource: any) => {
  const [selected, setSelected] = useState({ keys: [], rows: [] });
  const [modal] = useModal({
    onOk: async (values, p) => {
      await api.update({
        storehouseId: values.storehouseId,
        singleOrderNum: values.singleOrderCount,
        singleProductNum: values.singleCommodityCount,
        moreOrderNum: values.multiOrderCount,
        moreProductNum: values.multiCommodityCount,
        orderType: values.orderType,
      });
      dispatch({ type: `${namespace}/search`, payload: {} });
    },
  });
  const onChange = (page: number, pageSize?: number | undefined) => {
    dispatch({
      type: `${namespace}/search`,
      payload: {
        pageNumber: page,
        pageSize,
      },
    });
  };
  useEffect(() => {
    setSelected({ keys: [], rows: [] });
  }, [dataSource]);
  const onSelectChange = (keys: any, rows: any) => {
    setSelected({ keys, rows });
  };
  const onPrint = async (record: any) => {
    const resp = await api.print([record.id]);
    printAuto(
      resp.data.map((d: any) => ({
        url: d.pdf,
        logisticsChannel: d.logisticsChannel,
        orderId: d.orderId,
        logisticsCompany: d.logisticsCompany,
      })),
    );
    // window.open(resp.data);
  };
  const printSelect = async (record: any) => {
    if (selected.keys.length === 0) return message.warning('请选择记录');
    const resp = await api.print(selected.keys);
    printAuto(
      resp.data.map((d: any) => ({
        url: d.pdf,
        logisticsChannel: d.logisticsChannel,
        orderId: d.orderId,
        logisticsCompany: d.logisticsCompany,
      })),
    );
    // window.open(resp.data);
  };
  const printAll = async (record: any) => {
    const resp = await api.printRemain();
    printAuto(
      resp.data.map((d: any) => ({
        url: d.pdf,
        logisticsChannel: d.logisticsChannel,
        orderId: d.orderId,
        logisticsCompany: d.logisticsCompany,
      })),
    );
    // window.open(resp.data);
  };
  return {
    onChange,
    modal,
    onPrint,
    printSelect,
    printAll,
    selected,
    onSelectChange,
  };
};
