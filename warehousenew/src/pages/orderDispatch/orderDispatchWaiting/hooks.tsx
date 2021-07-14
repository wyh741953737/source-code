import React, { useEffect, useState } from 'react';
import { Form, message, Modal } from 'antd';
import { namespace } from '@/models/orderDispatchWaiting';
import useModal from '@/hooks/useModal';
import * as api from '@/services/orderDispatch';
import moment from 'moment';
import useOptions from '@/hooks/useOptions';
import { warehouseApply } from '@/option.apply';
import { exportData } from '@/utils/exportData';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { history } from '@@/core/history';

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
      payload: { searchData: { status: 1 } },
    });
  }, [warehouseId]);
  const onSearch = async () => {
    const values = form.getFieldsValue();
    const timer = form.getFieldsValue().createTime;
    let beginDate = timer ? moment(timer[0]).format('YYYY-MM-DD') : '';
    let endDate = timer ? moment(timer[1]).format('YYYY-MM-DD') : '';
    dispatch({
      type: `${namespace}/search`,
      payload: { searchData: { ...values, beginDate, endDate, status: 1 } },
    });
  };
  return {
    form,
    onSearch,
  };
};

export const indexHooks = (dispatch: Function) => {
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

  const [editModal] = useModal({
    onOk: async (values, p) => {
      try {
        if (p) {
          const { id } = p;
          const { remarks, goodsLoanName, otherName } = values;
          // 是修改
          const resp = await api.editSheduling({
            id,
            remarks,
            goodsLoanName:
              goodsLoanName == '其它' ? `其它-${otherName}` : goodsLoanName,
          });
          if (resp && resp.data) {
            message.success('更新成功！');
            dispatch({
              type: `${namespace}/search`,
              payload: {},
            });
          }
        } else {
          const {
            remarks,
            sourceStorehouseId,
            targetStorehouseId,
            goodsLoanName,
            otherName,
          } = values;
          const sourceStorehouseName = option.options.filter(
            item => item.key === sourceStorehouseId,
          )[0].value;
          const targetStorehouseName = option.options.filter(
            item => item.key === targetStorehouseId,
          )[0].value;
          const response = await api.addScheduling({
            remarks,
            sourceStorehouseId,
            targetStorehouseId,
            goodsLoanName:
              goodsLoanName == '其它' ? `其它-${otherName}` : goodsLoanName,
            sourceStorehouseName,
            targetStorehouseName,
          });
          if (response && response.data) {
            message.success('添加成功');
            dispatch({
              type: `${namespace}/search`,
              payload: {},
            });
          }
        }
      } catch (e) {
        return false;
      }
      return true;
    },
  });

  // 调度任务确认发货
  const confirmDelivery = async (record: any) => {
    const { id, schedulingPackageList } = record;
    const everyTrue: boolean =
      schedulingPackageList && schedulingPackageList.length > 0
        ? schedulingPackageList.every((item: any) => item.trackingNumber)
        : false;
    if (!everyTrue) {
      return message.error('运单号为空，无法确认发货！');
    }
    const hide = message.loading('确认中，请稍后...');
    const resp: any = await api
      .confirmGoodsDelivery({ id, status: 2 })
      .catch(e => {});
    hide();
    if (resp && resp.data) {
      dispatch({
        type: `${namespace}/search`,
        payload: {},
      });
    }
  };

  // 调度包裹确认发货
  const confirmDeliveryPackage = async (record: any, item: any) => {
    const { id, trackingNumber } = item;
    if (!trackingNumber) {
      return message.error('该包裹运单号为空，无法确认发货！');
    }
    const hide = message.loading('确认中，请稍后...');

    const resp: any = await api
      .confirmReceiveGoods({ id, schedulingId: record.id })
      .catch(e => {});
    hide();
    if (resp && resp.data) {
      dispatch({
        type: `${namespace}/search`,
        payload: {},
      });
    }
  };

  // 删除调度任务
  const cancelDispatcher = (record: any) => {
    const { id } = record;
    Modal.confirm({
      title: '确定删除该调度任务吗？',
      icon: <ExclamationCircleOutlined />,
      onOk: async () => {
        const resp: any = await api.deleteDispatcher({ id }).catch(e => {});
        if (resp && resp.data) {
          dispatch({
            type: `${namespace}/search`,
            payload: {},
          });
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
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

  const printParcelNumber = async (
    packageNumberList: Array<any>,
    packageIdList: Array<any>,
  ) => {
    const hide = message.loading('打印中，请稍后...');
    const resp: any = await api
      .printPackageNumber({ packageNumberList, packageIdList })
      .catch(e => {});
    hide();
    resp && window.open(resp.data);
  };
  // 批量打印包裹编号
  const batchPrintPackageNumber = async () => {
    if (selected.keys.length === 0) {
      return message.warn('请选择要打印的包裹编号的记录！');
    }
    const allPackageList = mergeArray(selected.rows);
    const packageNumberList = allPackageList.map(item => item.parcelNumber);
    const packageIdList = allPackageList.map(item => item.id);
    if (allPackageList.length === 0) {
      return message.warn('选择的调度任务下还没有包裹，请先添加包裹');
    }

    printParcelNumber(packageNumberList, packageIdList);
  };
  // 单个打印包裹编号
  const singlePrintPackageNumber = async (record: any, item: any) => {
    const packageNumberList = [item.parcelNumber];
    const packageIdList = [item.id];
    printParcelNumber(packageNumberList, packageIdList);
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
  const exportCustomInfo = async (item: any) => {
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

  // 删除包裹
  const deletePackage = (item: any) => {
    const { id } = item;
    Modal.confirm({
      title: '确定删除该包裹吗？',
      icon: <ExclamationCircleOutlined />,
      onOk: async () => {
        const resp: any = await api.deletePackage({ id }).catch(e => {});
        if (resp && resp.data) {
          dispatch({
            type: `${namespace}/search`,
            payload: {},
          });
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  // 新增包裹
  const addPackage = (record: any) => {
    dispatch({
      type: `${namespace}/_changecurrentItem`,
      payload: { currentItem: record },
    });
    history.push(`/orderDispatch/details`);
  };

  // 编辑包裹
  const editPackage = (record: any, item: any) => {
    dispatch({
      type: `${namespace}/_changecurrentItem`,
      payload: { currentItem: record },
    });
    history.push({
      pathname: '/orderDispatch/details',
      query: { id: item.id },
    });
  };

  // 包裹详情
  const [detailModal] = useModal({});

  // 日志详情
  const [logModal] = useModal({});
  return {
    onChange,
    onSelectChange,
    selected,
    editModal,
    confirmDelivery,
    cancelDispatcher,
    batchPrintPackageNumber,
    batchExport,
    exportCustomInfo,
    singlePrintPackageNumber,
    detailModal,
    checkDetail,
    logModal,
    checkLog,
    deletePackage,
    addPackage,
    editPackage,
    confirmDeliveryPackage,
  };
};
