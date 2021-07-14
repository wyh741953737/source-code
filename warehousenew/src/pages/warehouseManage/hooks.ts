import { Form } from 'antd';
import { useEffect, useState } from 'react';
import useModal from '@/hooks/useModal';
import * as api from '@/services/warehouseManage';

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
      type: 'warehouseManage/search',
      payload: { searchData: { warehouse: warehouseId } },
    });
  }, [warehouseId]);
  const valuesChanged = (changedValues: any) => {
    if ('selectedOption' in changedValues) {
      setSelectedOption(changedValues.selectedOption);
    }
  };
  const onSearch = async () => {
    const values = form.getFieldsValue();
    dispatch({
      type: 'warehouseManage/search',
      payload: { searchData: values },
    });
  };
  return {
    form,
    selectedOption,
    valuesChanged,
    onSearch,
  };
};

export const indexHooks = (dispatch: Function) => {
  const [modal] = useModal({
    onOk: async (values, p) => {
      const categoryName = values.categoryId
        ? p.categoryEnum.key(values.categoryId).value
        : undefined;
      try {
        if (p.isUpdate) {
          await api.updateRecord({
            id: p.id,
            areaName: values.areaName,
            storehouseId: values.storehouseId,
            categoryId: values.categoryId,
            categoryName: categoryName,
            type: values.type,
            isDelete: values.isDelete ? 1 : 0,
          });
        } else {
          await api.addRecord({
            areaName: values.areaName,
            storehouseId: values.storehouseId,
            categoryId: values.categoryId,
            //？ 为什么一定要个name
            categoryName: categoryName,
            type: values.type,
          });
        }
      } catch (e) {
        console.log(e, 'error');
        return false;
      }
      dispatch({ type: 'warehouseManage/search', payload: {} });
      return true;
    },
  });
  const onChange = (page: number, pageSize?: number | undefined) => {
    dispatch({
      type: 'warehouseManage/search',
      payload: {
        pageNumber: page,
        pageSize,
      },
    });
  };
  return {
    onChange,
    modal,
  };
};

export const addOrUpdateHooks = (dispatch: Function) => {
  const [form] = Form.useForm();
  const onCancel = () => {
    dispatch({
      type: 'warehouseManage/_visibleChange',
      payload: {
        visible: false,
        isUpdate: false,
      },
    });
  };
  const onOk = async () => {
    const values = await form.validateFields();

    dispatch({
      type: 'warehouseManage/addOrUpdate',
      payload: {},
    });
  };
  return {
    form,
    onCancel,
    onOk,
  };
};
