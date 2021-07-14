import React, { useEffect, useRef, useState } from 'react';
import { Form, message } from 'antd';
import { namespace } from '@/models/inventoryResult';
import * as api from '@/services/inventoryResult';
import useModal from '@/hooks/useModal';
import useRowSelection from '@/hooks/useRowSelection';
import moment from 'moment';
import style from './index.less';
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
    form.setFieldsValue({
      storehouseId: warehouseId,
      createTime: dataRange.current,
    });
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
    form.setFieldsValue({
      storehouseId: warehouseId,
      createTime: dataRange.current,
    });
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
  const [rowInfo, setRowInfo] = useState<any[]>();
  const [activeIndex, setActiveIndex] = useState<number>();
  const [title, setTitle] = useState<string>('');
  const [currentCheckNumber, setCurrentCheckNumber] = useState<string>('');
  const [operationNumber, setOperationNumber] = useState<number>();
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
    if (dataSource.length > 0) {
      const checkNum = dataSource[0].checkNum;
      api.getListDetail({ checkNum }).then(res => {
        setRowInfo(res.data);
      });
    } else {
      setRowInfo([]);
    }
  }, [dataSource]);
  /**
   * 盘点结果-复盘
   */
  const resultReplay = async (record: any) => {
    const { checkNum } = record;
    const operation = 1;
    setTitle('生成复盘单');
    setCurrentCheckNumber(checkNum);
    setOperationNumber(operation);
    modal.show({ checkNum, operation });
  };

  /**
   * 盘点结果-终盘
   */
  const resultEndplay = async (record: any) => {
    const { checkNum } = record;
    const operation = 2;
    setTitle('生成终盘单');
    setCurrentCheckNumber(checkNum);
    setOperationNumber(operation);
    modal.show({ checkNum, operation });
  };

  /**
   * 盘点结果-终结盘点
   */
  const resultCheckEnd = async (record: any) => {
    if (selected.keys.length === 0) {
      message.warn('至少选择一项');
      return;
    } else if (selected.keys.length > 1) {
      message.warn('不能批量结束盘点');
      return;
    }
    const hasOther = selected.rows.some(
      (item: any) => item.status == 1 || item.status == 4,
    );
    if (!hasOther) {
      try {
        const checkNum: string = selected.rows.map(item => item.checkNum)[0];
        await api.checkEnd({ checkNum });
        message.success('结束盘点成功');
        dispatch({
          type: `${namespace}/search`,
          payload: {},
        });
      } catch (error) {}
    } else {
      message.warn('至少盘点二次后才能结束');
      return;
    }
  };
  /**
   * 查询盘点异常明细
   */
  const [modal] = useModal({
    noVerifyForm: true,
    onFetch: async params => {
      const resp = await api.searchExceptionData({
        checkNum: params.checkNum,
        operation: params.operation,
      });
      return resp.data;
    },
    onOk: async (e, values, p) => {
      const checkResultVariantId = p.map((item: any) => item.id);
      const checkNum = currentCheckNumber;
      const checkType = values;
      if (operationNumber == 1) {
        try {
          await api.replay({
            checkResultVariantId,
            checkNum,
            checkType,
          });
          dispatch({
            type: `${namespace}/search`,
            payload: {},
          });
        } catch (error) {
          return Promise.reject(error);
        }
      } else {
        try {
          await api.endplay({
            checkResultVariantId,
            checkNum,
            checkType,
          });
          dispatch({
            type: `${namespace}/search`,
            payload: {},
          });
        } catch (error) {
          return Promise.reject(error);
        }
      }
    },
  });

  const onRowSelect = async (record: any, index: number | undefined) => {
    const { checkNum } = record;
    const resp = await api.getListDetail({ checkNum });
    setRowInfo(resp.data);

    setActiveIndex(index);
  };
  const setClassName = (record: any, index: number) => {
    //record代表表格行的内容，index代表行索引
    //判断索引相等时添加行的高亮样式
    return index === activeIndex ? `${style['l-table-row-active']}` : '';
  };
  return {
    onChange,
    modal,
    onRowSelect,
    rowInfo,
    setClassName,
    resultReplay,
    resultEndplay,
    resultCheckEnd,
    rowSelection,
    title,
  };
};
