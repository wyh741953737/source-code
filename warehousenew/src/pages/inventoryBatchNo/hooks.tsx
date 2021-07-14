import { useEffect, useRef, useState } from 'react';
import { Form, message } from 'antd';
import inventoryBatchNo from '@/models/inventoryBatchNo';
import useRowSelection from '@/hooks/useRowSelection';
import * as api from '@/services/inventoryBatchNo';
import useModal from '@/hooks/useModal';
import moment from 'moment';
import printRequest from '@/utils/printTwo';
import style from './index.less';
const { namespace } = inventoryBatchNo;

export const searchFormHooks = (
  searchData: any,
  dispatch: Function,
  warehouseId: string,
) => {
  const [form] = Form.useForm();
  const dataRange = useRef([moment().add(-30, 'days'), moment()]);
  useEffect(() => {
    form.setFieldsValue(searchData);
  }, [searchData]);
  useEffect(() => {
    form.setFieldsValue({ storehouseId: warehouseId });
  }, [warehouseId]);
  useEffect(() => {
    dispatch({
      type: `${namespace}/search`,
      payload: {
        searchData: {
          createTime: searchData.createTime || dataRange.current,
          storehouseId: warehouseId,
        },
      },
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
      payload: {
        createTime: dataRange.current,
        transTime: dataRange.current,
        storehouseId: warehouseId,
      },
    });
  };
  return {
    form,
    onSearch,
    onClearSearch,
  };
};

export const indexHooks = (dispatch: Function, dataSource: any[]) => {
  const [rowSelection, selected] = useRowSelection();
  const [rowInfo, setRowInfo] = useState<any>({});
  const [activeIndex, setActiveIndex] = useState<number>();
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
    setRowInfo([]);
  }, [dataSource]);

  /** */
  const [modal] = useModal({
    noVerifyForm: true,
    onOk: async (e, values, p) => {},
  });

  /**批次打印 */
  const printBatch = async () => {
    const batches = selected.rows.map((item: any) => item.batchNum);
    const hide = message.loading('打印中，请稍后...');
    const resp: any = await api.printBatch({ batches });
    hide();
    printRequest([
      {
        title: '盘点批次',
        url: resp.data,
      },
    ]);
  };
  const onRowSelect = (record: any, index: number | undefined) => {
    setRowInfo(record);

    setActiveIndex(index);
  };
  const setClassName = (record: any, index: number) => {
    //record代表表格行的内容，index代表行索引
    //判断索引相等时添加行的高亮样式
    return index === activeIndex ? `${style['l-table-row-active']}` : '';
  };
  return {
    onChange,
    rowSelection,
    modal,
    onRowSelect,
    rowInfo,
    selected,
    setClassName,
    printBatch,
  };
};
