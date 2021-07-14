import React, { useEffect, useState } from 'react';
import { Form, message, Modal } from 'antd';
import useModal from '@/hooks/useModal';
import * as api from '@/services/materialManage';
import { RcFile } from 'antd/lib/upload/interface';
import * as xlsx from 'xlsx';
import * as regExp from '@/regExp.config';
import { exportData } from '@/utils/exportData';
import { BatchImport } from '@/services/materialManage.d';

export const searchFormHooks = (searchData: any, dispatch: Function) => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(searchData);
  }, [searchData]);
  const onSearch = async () => {
    const values = form.getFieldsValue();
    dispatch({
      type: 'materialManage/search',
      payload: { searchData: { ...values } },
    });
  };
  const onClearSearch = () => {
    form.resetFields();
    dispatch({
      type: 'materialManage/searchDataClear',
    });
  };

  return {
    form,
    onSearch,
    onClearSearch,
  };
};

export const indexHooks = (
  dispatch: Function,
  dataSource: any,
  searchData: any,
) => {
  const [uploading, setUploading] = useState(false);
  useEffect(() => {
    dispatch({
      type: 'materialManage/search',
      payload: {},
    });
  }, []);
  const [editModal] = useModal({
    onOk: async (values, p) => {
      const imageInfo =
        values.image && values.image.length > 0 ? values.image[0].url : '';
      try {
        if (p) {
          // 是修改
          await api
            .editConsumables({
              ...values,
              image: imageInfo,
              id: p.id,
            })
            .catch(e => {});
        } else {
          await api
            .addConsumables({
              ...values,
              image: imageInfo,
            })
            .catch(e => {});
        }
      } catch (e) {
        return false;
      }
      dispatch({ type: 'materialManage/search', payload: {} });
      return true;
    },
  });

  const [exportModal] = useModal({
    onOk: async (values, p) => {
      if (p.length == 0) {
        message.warn('请选择需要导出的字段信息');
        return;
      }

      const resp = await api
        .exportExcel({
          ...searchData,
          titleList: p,
        })
        .catch(e => {});
      if (resp) {
        exportData(resp, '耗材列表');
      }
    },
  });

  const importMaterialData = async (validValues: BatchImport.Data[]) => {
    await api
      .batchImport({ storehouseConsumablesDTOList: validValues })
      .catch(e => {});
    message.success('上传成功');
    dispatch({ type: 'materialManage/search' });
  };
  const excelColumns = columnNames();
  const onChange = (page: number, pageSize?: number | undefined) => {
    dispatch({
      type: 'materialManage/search',
      payload: {
        pageNumber: page,
        pageSize,
      },
    });
  };

  const showLog = async (id: string) => {
    const hide = message.loading('查询中，请稍后...');
    const resp = await api.getLog({ id });
    dispatch({
      type: 'materialManage/_logVisibleChange',
      payload: { visible: true, data: resp.data },
    });
    hide();
  };

  return {
    onChange,
    editModal,
    exportModal,
    showLog,
    excelColumns,
    importMaterialData,
  };
};

export const logModalHooks = (dispatch: Function) => {
  const onClose = () => {
    dispatch({
      type: 'materialManage/_logVisibleChange',
      payload: {
        visible: false,
      },
    });
  };
  return {
    onClose,
  };
};

const columnNames = function(): Array<{
  title: string;
  name: string;
  validate: (value: any) => { value?: any; err?: string };
}> {
  return [
    {
      title: '耗材编号',
      name: 'cNumber',
      validate: (value: string) => {
        return value && !regExp.EN.test(value)
          ? { error: '耗材编号由数字和字母组成' }
          : value && value.length > 14
          ? { err: '耗材编号长度不得大于14位' }
          : { value };
      },
    },
    {
      title: '耗材名称',
      name: 'cName',
      validate: (value: string) => {
        return !value
          ? { err: '未找到' }
          : value.length > 10
          ? { err: '耗材名称长度不能大于10位' }
          : { value };
      },
    },
    {
      title: '长(cm)',
      name: 'length',
      validate: (value: string) => {
        return value && !regExp.METARIALINTERGE.test(value)
          ? { err: '限制浮点数' }
          : value && Number(value) > 9999.99
          ? { err: '数值不能大于9999.99' }
          : { value };
      },
    },
    {
      title: '宽(cm)',
      name: 'width',
      validate: (value: string) => {
        return value && !regExp.METARIALINTERGE.test(value)
          ? { err: '限制浮点数' }
          : value && Number(value) > 9999.99
          ? { err: '数值不能大于9999.99' }
          : { value };
      },
    },
    {
      title: '高(cm)',
      name: 'height',
      validate: (value: string) => {
        return value && !regExp.METARIALINTERGE.test(value)
          ? { err: '限制浮点数' }
          : value && Number(value) > 9999.99
          ? { err: '数值不能大于9999.99' }
          : { value };
      },
    },
    {
      title: '重量(g)',
      name: 'weight',
      validate: (value: string) => {
        return value && !regExp.METARIALINTERGE.test(value)
          ? { err: '限制浮点数' }
          : value && Number(value) > 9999.99
          ? { err: '数值不能大于9999.99' }
          : { value };
      },
    },
    {
      title: '体积(cm^2)',
      name: 'volume',
      validate: (value: string) => {
        return value && !regExp.METARIALINTERGE.test(value)
          ? { err: '限制浮点数' }
          : value && Number(value) > 9999.99
          ? { err: '数值不能大于9999.99' }
          : { value };
      },
    },
    {
      title: '单价($)',
      name: 'price',
      validate: (value: string) => {
        return value && !regExp.METARIALINTERGE.test(value)
          ? { err: '限制浮点数' }
          : value && Number(value) > 9999.99
          ? { err: '数值不能大于9999.99' }
          : { value };
      },
    },
    {
      title: '停用',
      name: 'isDelete',
      validate: (value: any) => {
        return value && ![0, 1].includes(value)
          ? { err: '数值只能是0和1' }
          : { value };
      },
    },
  ];
};
