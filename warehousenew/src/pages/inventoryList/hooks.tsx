import React, { useEffect, useRef, useState } from 'react';
import { Form, message, Modal } from 'antd';
import inventoryList from '@/models/inventoryList';
import useRowSelection from '@/hooks/useRowSelection';
import * as api from '@/services/inventoryList';
import useModal from '@/hooks/useModal';
import moment from 'moment';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import style from './index.less';
import { CHECKSTATUS } from '@/enum.config';
const { namespace } = inventoryList;
import useButton from '@/hooks/useButton';
const { confirm } = Modal;
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
  const [rowDetail, setRowDetail] = useState<any[]>([]); // 盘点详情列表
  const [activeIndex, setActiveIndex] = useState<number>();
  const [rowInfo, setRowInfo] = useState<any>({}); // 选中的行

  const [rowSelection, selected, setSelected] = useRowSelection({
    getCheckboxProps: record => ({
      // 只有未盘点的可选
      disabled: record.status !== CHECKSTATUS.undo.key,
    }),
    // onSelect: (record: any, selected: boolean) => {
    //   dealSelect(selected, record.id);
    // },
    // onSelectAll: (selected, selectedRows) => {
    //   if (selectedRows.length > 1) {
    //     return;
    //   }
    //   dealSelect(selected, selectedRows[0]?.id);
    // },
  });
  const [rowSelection2, selected2, setSelected2] = useRowSelection({
    getCheckboxProps: () => ({
      // 只有未盘点的可选
      disabled: rowInfo.status !== CHECKSTATUS.undo.key,
    }),
  });

  useEffect(() => {
    // 盘点单变化时重置选中行，以及明细数据
    reset();
  }, [dataSource]);

  function reset() {
    setRowInfo([]);
    setSelected({ keys: [], rows: [] });
    setActiveIndex(-1);
    setRowDetail([]);
    setSelected2({ keys: [], rows: [] });
  }

  const onChange = (page: number, pageSize?: number | undefined) => {
    dispatch({
      type: `${namespace}/search`,
      payload: {
        pageNumber: page,
        pageSize,
      },
    });
  };

  function dealSelect(selected: boolean, id: number) {
    let idx = -1;
    if (selected && id) {
      getRowDetail(id);
      dataSource.map((item: any, index: number) => {
        if (item.id == id) {
          idx = index;
        }
      });
    } else {
      setRowDetail([]);
      setSelected2({ keys: [], rows: [] });
    }
    setActiveIndex(idx);
  }

  /** 放弃按钮 */
  const giveUp = () => {
    if (selected.keys.length === 0) {
      message.warn('至少选择一项');
      return;
    }
    confirm({
      title: '确认放弃吗？',
      icon: <ExclamationCircleOutlined />,
      onOk: async () => {
        await api.giveUp({
          checkIdList: selected.keys,
        });
        message.success('放弃成功');
        dispatch({ type: `${namespace}/search` });
      },
      onCancel() {},
    });
  };

  /** 生成批次 */
  const createBatch = useButton({
    onClick: async () => {
      if (selected.keys.length === 0) {
        message.warn('至少选择一项！');
        return;
      }
      if (selected.keys.length > 1) {
        message.warn('不可同时选择多个盘点单！');
        return;
      }

      const data = await getRowDetail(selected.rows[0].id);
      if (data.length == 0) {
        message.warn('盘点单明细为空，无法生成！');
        return;
      }
      await api.createBatch({ checkId: selected.rows[0].id });
      message.success('生成批次成功！');
      dispatch({ type: `${namespace}/search` });
      // history.push('/inventoryBatchNo');
    },
  });

  /** 新增modal */
  const [modal] = useModal({
    onOk: async (_, values) => {
      await api.add(values);
      modal.close();
      message.success('新增成功');
      dispatch({ type: `${namespace}/search` });
    },
    closeAndClear: true,
  });

  /**选择行 */
  const onRowSelect = (record: any, index: number | undefined) => {
    setActiveIndex(index);
    setRowInfo(record);
    getRowDetail(record.id);
  };

  /**获取明细 */
  const getRowDetail = async (checkId: number) => {
    try {
      const resp: any = await api.getRowDetail({ checkId });
      const data = resp?.data || [];
      setRowDetail(data);
      return data;
    } catch (e) {
      setRowDetail([]);
      return [];
    }
  };

  const setClassName = (record: any, index: number) => {
    //record代表表格行的内容，index代表行索引
    //判断索引相等时添加行的高亮样式
    return index === activeIndex ? style['l-table-row-active'] : '';
  };

  function deleteDetail() {
    confirm({
      title: '确认删除吗？',
      icon: <ExclamationCircleOutlined />,
      onOk: async () => {
        await api.deleteDetail({
          idList: selected2.keys,
        });
        message.success('删除成功');
        setSelected2({ keys: [], rows: [] });
        getRowDetail(rowInfo.id);
      },
      onCancel() {},
    });
  }
  return {
    onChange,
    rowSelection,
    rowSelection2,
    rowInfo,
    giveUp,
    createBatch,
    modal,
    onRowSelect,
    setClassName,
    rowDetail,
    selected,
    selected2,
    deleteDetail,
  };
};
