import React, { useEffect, useState } from 'react';
import { Form, message, Modal } from 'antd';
import moment from 'moment';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { exportData } from '@/utils/exportData';
import * as api from '@/services/outboundRecord';
import { getLogisticsInfo } from '@/services/outBoundOrder';
import { ImportInternetStatus } from '@/services/outboundRecord.d';
const { confirm } = Modal;
export const searchFormHooks = (
  searchData: any,
  warehouseId: string,
  query: any,
  dispatch: Function,
) => {
  const [form] = Form.useForm();
  const { receiveRecordId, weightPackageId, onlineStatus } = query;
  useEffect(() => {
    form.setFieldsValue(searchData);
  }, [searchData]);
  useEffect(() => {
    dispatch({
      type: 'bagDetail/search',
      payload: {
        searchData: {
          // storageId: warehouseId,
          receiveRecordId,
          weightPackageId,
          onlineStatus:
            !onlineStatus && onlineStatus != 0
              ? undefined
              : Number(onlineStatus),
        },
      },
    });
  }, [warehouseId]);
  const onSearch = async () => {
    const values = form.getFieldsValue();
    const timer = form.getFieldsValue().createTime;
    let beginDate = timer ? moment(timer[0]).format('YYYY-MM-DD') : '';
    let endDate = timer ? moment(timer[1]).format('YYYY-MM-DD') : '';
    dispatch({
      type: 'bagDetail/search',
      payload: {
        searchData: {
          ...values,
          receiveRecordId,
          weightPackageId,
          beginDate,
          endDate,
        },
      },
    });
  };
  const onClearSearch = () => {
    form.resetFields();
    dispatch({
      type: 'bagDetail/searchDataClear',
      payload: {
        // storageId: warehouseId,
        receiveRecordId,
        weightPackageId,
        onlineStatus:
          !onlineStatus && onlineStatus != 0 ? undefined : Number(onlineStatus),
      },
    });
  };
  return {
    form,
    onSearch,
    onClearSearch,
  };
};

export const indexHooks = (dispatch: Function, query: any, searchData: any) => {
  const [selected, setSelected] = useState({ keys: [], rows: [] });
  const [] = useState(false);
  useEffect(() => {
    dispatch({
      type: 'bagDetail/saveLogistic',
      payload: {},
    });
  }, []);

  const onChange = (page: number, pageSize?: number | undefined) => {
    dispatch({
      type: 'bagDetail/search',
      payload: {
        pageNumber: page,
        pageSize,
      },
    });
  };
  const onSelectChange = (keys: any, rows: any) => {
    setSelected({ keys, rows });
  };

  const checkOtherDetail = async (record: any) => {
    const { orderId } = record;
    const res: any = await getLogisticsInfo({ id: orderId });
    if (res && res.data) {
      const { orderweight, salesmanName, amount, postage } = res.data;
      const SubContent = () => (
        <div>
          <p>系统重量：{orderweight}</p>
          {/* <p>1688订单号：1220352145007418614</p> */}
          <p>业务员：{salesmanName}</p>
          <p>金额：{amount}</p>
          <p>邮费：{postage}</p>
        </div>
      );
      Modal.info({
        width: 350,
        title: '补充详情',
        // icon: <ExclamationCircleOutlined />,
        content: <SubContent />,
        onOk() {},
        onCancel() {
          console.log('Cancel');
        },
      });
    }
  };

  const exportNetworkStatus = async () => {
    const resp = await api
      .batchExportBagDetail({
        data: {
          logisticsCompany: searchData?.logisticsCompany,
          logisticsTrackingNumber: searchData?.logisticsTrackingNumber,
          orderId: searchData?.orderId,
          storageId: searchData?.storageId,
          onlineStatus: searchData?.onlineStatus,
          signingCountry: searchData?.signingCountry,
          weightPackageId: searchData?.weightPackageId,
          receiveRecordId: searchData?.receiveRecordId,
        },
        beginDate: searchData?.beginDate,
        endDate: searchData?.endDate,
        pageSize: searchData?.pageSize,
        pageNum: searchData?.current,
      })
      .catch(() => {});
    if (resp) {
      exportData(resp, '货代详情列表');
    }
  };

  const batchEditNetworkStatus = () => {
    const everyIds = selected.rows.every(
      (item: any) => item.onlineStatus === 1,
    );
    const outlineArr = selected.rows.filter(
      (item: any) => item.onlineStatus === 0,
    );
    const outlineIds = outlineArr.map((item: any) => item.id);
    if (everyIds) return message.warning('请选择未上网状态的记录');
    confirm({
      width: 400,
      title: '确定批量修改订单状态至已上网吗？',
      icon: <ExclamationCircleOutlined />,
      onOk: async () => {
        const resp = await api
          .batchEditOnlineStatus({
            ids: outlineIds,
          })
          .catch(() => {});
        if (resp && resp.code == 200 && resp.data) {
          dispatch({
            type: 'bagDetail/search',
            payload: {},
          });
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const importEditNetworkStatus = async (
    validValues: ImportInternetStatus.requestData[],
  ) => {
    await api.importInternetStatus({ content: validValues }).catch(e => {});
    message.success('上传成功');
    dispatch({ type: 'bagDetail/search' });
  };
  const excelColumns = columnNames();

  return {
    onChange,
    selected,
    onSelectChange,
    checkOtherDetail,
    exportNetworkStatus,
    batchEditNetworkStatus,
    importEditNetworkStatus,
    excelColumns,
  };
};

const columnNames = function(): Array<{
  title: string;
  name: string;
  validate: (value: any) => { value?: any; err?: string };
}> {
  return [
    {
      title: '订单号',
      name: 'orderId',
      validate: (value: string) => {
        return !value ? { err: '订单号不能为空' } : { value };
      },
    },
    {
      title: '追踪号',
      name: 'logisticsTrackingNumber',
      validate: (value: string) => {
        return !value ? { err: '追踪号不能为空' } : { value };
      },
    },
    {
      title: '所属包裹',
      name: 'owningPackage',
      validate: (value: string) => {
        return !value ? { err: '所属包裹不能为空' } : { value };
      },
    },
    {
      title: '订单状态',
      name: 'orderStatus',
      validate: (value: string) => {
        return !value ? { err: '订单状态不能为空' } : { value };
      },
    },
  ];
};
