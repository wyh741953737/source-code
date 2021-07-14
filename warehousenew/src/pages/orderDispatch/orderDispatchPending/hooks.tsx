import React, { useEffect, useState } from 'react';
import { Form, message, Modal } from 'antd';
import useModal from '@/hooks/useModal';
import * as api from '@/services/orderDispatch';
import moment from 'moment';
import useOptions from '@/hooks/useOptions';
import { warehouseApply } from '@/option.apply';
import { exportData } from '@/utils/exportData';
import { namespace } from '@/models/orderDispatchPending';

export const searchFormHooks = (
  searchData: any,
  dispatch: Function,
  warehouseId: string,
) => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(searchData);
  }, [searchData]);
  useEffect(() => {
    dispatch({
      type: `${namespace}/search`,
      payload: { searchData: { status: 2 } },
    });
  }, [warehouseId]);
  const onSearch = async () => {
    const values = form.getFieldsValue();
    const timer = form.getFieldsValue().createTime;
    let beginDate = timer ? moment(timer[0]).format('YYYY-MM-DD') : '';
    let endDate = timer ? moment(timer[1]).format('YYYY-MM-DD') : '';
    dispatch({
      type: `${namespace}/search`,
      payload: { searchData: { ...values, beginDate, endDate, status: 2 } },
    });
  };

  return {
    form,
    onSearch,
  };
};

export const indexHooks = (dispatch: Function) => {
  // 确认收货
  const confirmGoods = async (record: any, item: any) => {
    const { id, parcelNumber } = item;
    const hide = message.loading('确认中，请稍后...');
    const resp: any = await api
      .signFor({
        parcelNumbering: parcelNumber,
        storageId: record.targetStorehouseId,
      })
      .catch(e => {});
    hide();
    if (resp && resp.data) {
      dispatch({
        type: `${namespace}/search`,
        payload: {},
      });
    }
  };

  // 标记拦截
  const tagToIntercept = (item: any) => {
    const { id } = item;
    Modal.confirm({
      title: '提示',
      content: '确定将该包裹标记为拦截吗？',
      onOk: async () => {
        const resp = await api
          .interceptPackage({
            id,
          })
          .catch(e => {});
        if (resp && resp.data) {
          dispatch({
            type: `${namespace}/search`,
            payload: {},
          });
        }
      },
    });
  };

  const [option] = useOptions(warehouseApply, { interval: Infinity });
  const [selected, setSelected] = useState({ keys: [], rows: [] });

  const onChange = (page: number, pageSize?: number | undefined) => {
    dispatch({
      type: `${namespace}/search`,
      payload: {
        pageNumber: page,
        pageSize,
      },
    });
  };
  const onSelectChange = (keys: any, rows: any) => {
    setSelected({ keys, rows });
  };

  // 合并schedulingPackageList
  const mergeArray = (array: Array<any>) => {
    let result: Array<any> = [];
    array.forEach(item => {
      if (item.schedulingPackageList && item.schedulingPackageList.length > 0) {
        result = result.concat(item.schedulingPackageList);
      }
    });
    return result;
  };

  const submitExportAction = async (
    schedulingExportType: number,
    schedulingPackageIdList: Array<number>,
  ) => {
    const hide = message.loading('导出中，请稍后...');
    const resp = await api
      .exportExcel({
        schedulingPackageIdList,
        schedulingExportType,
      })
      .catch(e => {});
    hide();
    if (resp) {
      exportData(resp, '导出文件');
    }
  };

  // 批量导出
  const batchExport = (num: number) => {
    if (selected.keys.length === 0) {
      return message.warn('请选择要导出的包裹编号的记录！');
    }
    const allPackageList = mergeArray(selected.rows);
    const packageIdList = allPackageList.map(item => item.id);
    submitExportAction(num, packageIdList);
  };

  // 导出报关信息
  const exportCustomInfo = (item: any) => {
    const schedulingPackageIdList = [item.id];
    submitExportAction(4, schedulingPackageIdList);
  };

  const checkDetail = async (item: any) => {
    const { id, parcelNumber } = item;
    const hide = message.loading('查询中，请稍后...');
    const resp: any = await api.checkPackageDetail({ id }).catch(e => {});
    hide();
    if (resp && resp.data) {
      detailModal.show({
        packageNumber: parcelNumber,
        Data: resp.data,
      });
    }
  };

  // 查询包裹日志
  const checkLog = async (item: any) => {
    const { id } = item;
    const hide = message.loading('查询中，请稍后...');
    const resp: any = await api.checkPackageLog({ id }).catch(e => {});
    hide();
    if (resp && resp.data) {
      logModal.show(resp.data);
    }
  };

  // 包裹详情
  const [detailModal] = useModal({});

  // 日志详情
  const [logModal] = useModal({});

  return {
    tagToIntercept,
    confirmGoods,

    onChange,
    onSelectChange,
    selected,
    batchExport,
    exportCustomInfo,
    detailModal,
    checkDetail,
    logModal,
    checkLog,
  };
};
