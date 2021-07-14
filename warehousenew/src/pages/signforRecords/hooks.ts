import { useEffect, useRef, useState } from 'react';
import { Form, message } from 'antd';
import * as api from '@/services/signforRecords';
import { namespace } from '@/models/signforRecords';
import useButton from '@/hooks/useButton';
import { exportData } from '@/utils/exportData';
import { momentRangeSplit } from '@/utils';
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

export const indexHooks = (dispatch: Function, searchData: any) => {
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
   * 导出
   */
  const exportBtn = useButton({
    onClick: async () => {
      const [startScanDate, endScanDate] = momentRangeSplit(
        searchData.createTime,
      );
      const hide = message.loading('导出中，请稍后...');
      const resp = await api
        .exportData({
          putStorageNumber: searchData.putStorageNumber,
          orderNumber: searchData.orderNumber,
          trackingNumber: searchData.trackingNumber,
          storageId: searchData.storageId,
          scanName: searchData.scanName,
          signStatus: searchData.signStatus,
          startScanDate,
          endScanDate,
        })
        .catch(e => {});
      hide();
      if (resp) {
        exportData(resp, '签收扫描记录');
      }
    },
  });

  return {
    onChange,
    exportBtn,
  };
};
