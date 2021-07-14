import React, { useEffect, useState } from 'react';
import { Form, message, Modal } from 'antd';
import useModal from '@/hooks/useModal';
import * as api from '@/services/containerManage';
import { CheckCircleTwoTone } from '@ant-design/icons';
import style from './index.less';
import useRowSelection from '@/hooks/useRowSelection';

const { confirm } = Modal;
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
      type: 'containerManage/search',
      payload: { searchData: { warehouse: warehouseId } },
    });
  }, [warehouseId]);
  const onSearch = async () => {
    const values = form.getFieldsValue();
    dispatch({
      type: 'containerManage/search',
      payload: { searchData: values },
    });
  };
  const onClearSearch = () => {
    form.resetFields();
    dispatch({
      type: 'containerManage/searchDataClear',
      payload: { warehouse: warehouseId },
    });
  };
  return {
    form,
    onSearch,
    onClearSearch,
  };
};

export const indexHooks = (dispatch: Function, dataSource: Array<any>) => {
  const [modal] = useModal({
    onOk: async values => {
      await api.add({
        storehouseId: values.warehouse,
        containerNum: values.containerNum,
        type: values.containerType,
        remarks: values.remark,
      });
      dispatch({ type: 'containerManage/search', payload: {} });
      modal.form.resetFields();
    },
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState<Array<number>>([]);

  const [activeIndex, setActiveIndex] = useState<number>();
  useEffect(() => {
    setSelectedRowKeys([]);
    SetRowSelected(undefined);
  }, [dataSource]);
  const onSelectionChange = (keys: any) => {
    setSelectedRowKeys(keys);
  };
  const [rowSelect, SetRowSelected] = useState<any>();
  const onRowSelect = (record: object, index: number | undefined) => {
    SetRowSelected(record);
    setActiveIndex(index);
  };

  const onChange = (page: number, pageSize?: number | undefined) => {
    dispatch({
      type: 'containerManage/search',
      payload: {
        pageNumber: page,
        pageSize,
      },
    });
  };
  const onPrint = async () => {
    const containerNums = dataSource
      .filter(d => selectedRowKeys.includes(d.id))
      .map(i => i.containerNum);
    if (containerNums.length === 0) return message.warn('请选择容器');
    const resp = await api.print({ containerNums });
    window.open(Array.isArray(resp.data) ? resp.data[0] : resp.data);
  };
  const onStop = () => {
    if (selectedRowKeys.length === 0) return message.warn('请选择容器');
    Modal.confirm({
      title: '提示',
      content: '确定停用选中的容器么？',
      onOk: async () => {
        await api.disable({ ids: selectedRowKeys });
        dispatch({ type: 'containerManage/search', payload: {} });
      },
    });
  };
  const onRelease = async () => {
    if (selectedRowKeys.length === 0) return message.warn('请选择容器');
    const resp = await api.release({ ids: selectedRowKeys });
    if (resp && resp.data) {
      const detail = resp.data.join('/');
      Modal.info({
        title: '释放成功容器：',
        icon: <CheckCircleTwoTone twoToneColor="#ffb900" />,
        content: (
          <div>
            <p>{detail ? detail : '暂无释放成功容器'}</p>
          </div>
        ),
        onOk() {},
      });
    }
    dispatch({ type: 'containerManage/search', payload: {} });
  };

  const setClassName = (record: any, index: number) => {
    //record代表表格行的内容，index代表行索引
    //判断索引相等时添加行的高亮样式
    return index === activeIndex ? `${style['l-table-row-active']}` : '';
  };

  return {
    onChange,
    onSelectionChange,
    onRowSelect,
    rowSelect,
    modal,
    onPrint,
    onStop,
    onRelease,
    selectedRowKeys,
    setClassName,
  };
};

export const recordInfoHooks = (record: any) => {
  const [dataSource1, setDataSource1] = useState([]);
  const [dataSource2, setDataSource2] = useState([]);
  const [rowSelection, selected, setSelected] = useRowSelection();
  const deleteBusiness = async () => {
    if (selected.rows.length === 0) return message.warn('请选择记录');
    confirm({
      title: '提示',
      content: '确定删除关联商品吗？',
      onOk: async (values, p) => {
        try {
          await api.deleteBusiness({ idList: selected.keys });
          message.success('删除成功');
          getAssociatedData();
        } catch (error) {}
      },
    });
  };
  const getAssociatedData = () => {
    api
      .getCommodity({
        containerNum: record.containerNum,
        storehouseId: record.storehouseId,
      })
      .then(e => setDataSource1(e.data));
    api
      .getLog({
        containerId: record.id,
      })
      .then(e => setDataSource2(e.data));
  };
  useEffect(() => {
    if (record) {
      api
        .getCommodity({
          containerNum: record.containerNum,
          storehouseId: record.storehouseId,
        })
        .then(e => setDataSource1(e.data));
      api
        .getLog({
          containerId: record.id,
        })
        .then(e => setDataSource2(e.data));
    }
  }, [record]);
  return {
    dataSource1,
    dataSource2,
    rowSelection,
    setSelected,
    deleteBusiness,
  };
};
