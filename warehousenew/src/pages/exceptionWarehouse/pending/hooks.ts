import { useEffect, useState } from 'react';
import { Form, message, Modal } from 'antd';
import useModal from '@/hooks/useModal';
import * as api from '@/services/exceptionWarehouse';
import * as uuid from 'uuid';

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
      type: 'exceptionWarehousePending/search',
      payload: { searchData: { warehouse: warehouseId } },
    });
  }, [warehouseId]);
  const onSearch = async () => {
    const values = form.getFieldsValue();
    dispatch({
      type: 'exceptionWarehousePending/search',
      payload: { searchData: values },
    });
  };
  const onClearSearch = () => {
    form.resetFields();
    dispatch({
      type: 'exceptionWarehousePending/searchDataClear',
      payload: { warehouse: warehouseId },
    });
  };
  return {
    form,
    onSearch,
    onClearSearch,
  };
};

export const indexHooks = (dispatch: Function, dataSource: any) => {
  useEffect(() => {
    setSelected({ keys: [], rows: [] });
  }, [dataSource]);
  const [addExceptionModal] = useModal({
    onOk: async (values, p) => {
      try {
        await api.add(
          values.list.map((v: any) => ({
            receiptExceptionId: p.id,
            quantity: v.count,
            exceptionCause: v.remark,
            images: v.images
              ? v.images
                  .filter((item: any) => item.status === 'done')
                  .map((item: any) => item.url)
                  .join(',')
              : '',
          })),
        );
        message.success('添加成功');
        dispatch({ type: 'exceptionWarehousePending/search' });
      } catch (error) {
        console.log(error);
      }
    },
  });
  useEffect(() => {
    if (addExceptionModal.visible) {
      addExceptionModal.form.resetFields();
    }
  }, [addExceptionModal.visible]);
  const [updateExceptionModal] = useModal({
    onFetch: async params => {
      const { data, record } = params;
      return {
        id: data.id,
        remark: data.exceptionCause,
        count: data.quantity,
        images: (data.images || '').split(',').map((item: any) => ({
          uid: uuid.v4(),
          status: 'done',
          url: item,
        })),
        record,
      };
    },
    onOk: async (values, p) => {
      await api.update({
        id: p.id,
        exceptionCause: values.remark,
        quantity: values.count,
        images: values.images
          .filter((item: any) => item.status === 'done')
          .map((item: any) => item.url)
          .join(','),
      });
      message.success('更新成功');
      dispatch({ type: 'exceptionWarehousePending/search' });
    },
  });
  const deleteRecord = (id: number) => {
    Modal.confirm({
      title: '提示',
      content: '确认删除这条明细吗？',
      onOk: async () => {
        return new Promise((resolve, reject) => {
          api.update({ id, isDelete: 1 }).then(
            () => {
              dispatch({ type: 'exceptionWarehousePending/search' });
              message.success('删除成功');
              resolve('');
            },
            () => {
              reject('error');
            },
          );
        }).catch(() => console.log('出错!'));
      },
    });
  };
  const onChange = (page: number, pageSize?: number | undefined) => {
    dispatch({
      type: 'exceptionWarehousePending/search',
      payload: {
        pageNumber: page,
        pageSize,
      },
    });
  };
  const [selected, setSelected] = useState({ keys: [], rows: [] });
  const onSelectionChange = (keys: any, rows: any) => {
    setSelected({ keys, rows });
  };
  const [submitLoading, setSubmitLoading] = useState(false);
  const submit = async () => {
    if (selected.keys.length === 0) return message.warn('至少选择一条记录');
    // 判断是否存在不满足条件的
    const temp: any = selected.rows.filter((s: any) => {
      const total = s.receiptRecordList.reduce(
        (a: number, b: any) => a + (b.quantity || 0),
        0,
      );
      return total !== s.quantity;
    });
    if (temp.length > 0) {
      return Modal.warn({
        title: '异常提示',
        content: `异常单号：${temp
          .map((t: any) => t.exceptionNum)
          .join(
            '、',
          )} 的异常明细异常数量总和不等于总异常数量，请满足条件后再次提交！`,
      });
    }
    setSubmitLoading(true);
    try {
      await api.subimt({ ids: selected.keys });
      message.success('提交成功');
      dispatch({ type: 'exceptionWarehousePending/search' });
    } catch (e) {
    } finally {
      setSubmitLoading(false);
    }
  };
  const [giveUpLoading, setGiveUpLoading] = useState(false);
  const giveUp = async () => {
    if (selected.keys.length === 0) return message.warn('至少选择一条记录');
    setGiveUpLoading(true);
    try {
      await api
        .giveUp({ receiptExceptionIdList: selected.keys, status: 3 })
        .catch(e => {});
      message.success('放弃成功');
      dispatch({ type: 'exceptionWarehousePending/search' });
    } catch (e) {
    } finally {
      setGiveUpLoading(false);
    }
  };
  return {
    onChange,
    addExceptionModal,
    updateExceptionModal,
    submitLoading,
    giveUpLoading,
    deleteRecord,
    submit,
    giveUp,
    onSelectionChange,
    selected,
  };
};
