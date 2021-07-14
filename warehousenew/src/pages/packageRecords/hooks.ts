import { useEffect, useRef, useState } from 'react';
import { Form, message } from 'antd';
import * as api from '@/services/packageRecord';
import { printDetail } from '@/services/directSend';
import { namespace } from '@/models/packageRecords';
import useButton from '@/hooks/useButton';
// import printAuto from '@/components/Print';
import printAuto from '@/utils/printThree';
import { exportData } from '@/utils/exportData';
import moment from 'moment';
import { momentRangeSplit } from '@/utils';

export const searchFormHooks = (
  searchData: any,
  warehouseId: string,
  dispatch: Function,
) => {
  const [form] = Form.useForm();
  const dataRange = useRef([moment().add(-30, 'days'), moment()]);
  useEffect(() => {
    form.setFieldsValue(searchData);
  }, [searchData]);
  useEffect(() => {
    const temp: any = {};
    if (!searchData.createTime) temp.createTime = dataRange.current;
    dispatch({
      type: `${namespace}/search`,
      payload: { searchData: { ...temp, storehouseId: warehouseId } },
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
      payload: { storehouseId: warehouseId, createTime: dataRange.current },
    });
  };
  return {
    form,
    onSearch,
    onClearSearch,
  };
};

export const indexHooks = (dispatch: Function, searchData: any) => {
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
   * 打印装箱明细
   */
  const printDetailClick = async () => {
    if (selected.rows.length === 0) {
      message.warn('至少选择一个');
      return;
    }
    const resp = await printDetail(selected.keys);
    printAuto(
      resp.data.map(d => {
        const target: any = selected.rows.find((r: any) => r.id === d.id);
        return {
          url: d.pdf,
          logisticsChannel: d.logisticsChannel,
          orderId: d.orderId,
          logisticsCompany: d.logisticsCompany,
        };
      }),
    );
  };
  /**
   * 打印面单
   */
  const printBtn = useButton({
    onClick: async () => {
      if (selected.rows.length === 0) {
        message.warn('至少选择一个');
        return Promise.reject();
      }

      // const resp = await api.printList({
      //   packCodeList: selected.rows.map((r: any) => r.packCode),
      // });
      //暂时启用新接口
      const resp = await api.printListTwo({
        ids: selected.keys,
      });
      if (resp.data.length > 0) {
        printAuto(
          resp.data.map(d => ({
            url: d.pdf ? d.pdf : d.packPdf,
            logisticsChannel: d.logisticsChannel,
            orderId: d.orderId,
            logisticsCompany: d.logisticsCompany,
          })),
        );
      }
    },
  });
  /**
   * 导出
   */
  const exportBtn = useButton({
    onClick: async () => {
      const [beginDate, endDate] = momentRangeSplit(
        searchData.createTime,
        'YYYY-MM-DD HH:mm:ss',
      );
      const resp = await api.exportList({
        packCode: searchData.packCode,
        orderId: searchData.orderId,
        trackingNumber: searchData.trackingNumber,
        storehouseId: searchData.storehouseId,
        createBy: searchData.createBy,
        variantSku: searchData.variantSku,
        packStatus: searchData.packStatus,
        variantNum: searchData.variantNum,
        beginDate: beginDate || '',
        endDate: endDate || '',
      });
      exportData(resp, '打包记录.xlsx');
    },
  });

  return {
    onChange,
    onSelectChange,
    selected,
    printDetailClick,
    printBtn,
    exportBtn,
  };
};
