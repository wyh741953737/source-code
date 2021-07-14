import React, { useEffect, useState } from 'react';
import { Form, message, Modal } from 'antd';
import moment from 'moment';
import useModal from '@/hooks/useModal';
import { printTook } from '@/services/tookOutbound';
import * as api from '@/services/outboundRecord';
import { exportData } from '@/utils/exportData';
import { history } from '@@/core/history';

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
    dispatch({
      type: 'outboundRecord/search',
      payload: { searchData: { storageId: warehouseId } },
    });
  }, [warehouseId]);
  const onSearch = async () => {
    const values = form.getFieldsValue();
    const timer = form.getFieldsValue().createTime;
    let beginDate = timer ? moment(timer[0]).format('YYYY-MM-DD') : '';
    let endDate = timer ? moment(timer[1]).format('YYYY-MM-DD') : '';
    dispatch({
      type: 'outboundRecord/search',
      payload: {
        searchData: {
          ...values,
          beginDate,
          endDate,
        },
      },
    });
  };
  const onClearSearch = () => {
    form.resetFields();
    dispatch({
      type: 'outboundRecord/searchDataClear',
      payload: { storageId: warehouseId },
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
  useEffect(() => {
    dispatch({ type: 'outboundRecord/saveLogistic', payload: {} });
  }, []);
  const onChange = (page: number, pageSize?: number | undefined) => {
    dispatch({
      type: 'outboundRecord/search',
      payload: {
        pageNumber: page,
        pageSize,
      },
    });
  };
  const onSelectChange = (keys: any, rows: any) => {
    setSelected({ keys, rows });
  };

  const [inputWeightModal] = useModal({
    onOk: async (values, p) => {
      dispatch({ type: 'outboundRecord/search', payload: {} });
      return true;
    },
  });

  const print = async () => {
    if (selected.keys.length === 0) return message.warning('未选择运单号');
    const ids: Array<number> = selected.keys;
    const hide = message.loading('打印中，请稍后...');
    const resp: any = await printTook({ ids }).catch(e => {});
    hide();
    if (resp) {
      window.open(resp.data);
    }
    // inputWeightModal.show(selected.rows);
  };

  const exportExcel = async () => {
    const resp = await api
      .batchExportExcel({
        data: {
          receiveNumber: searchData?.receiveNumber,
          storageId: searchData?.storageId,
          logisticsCompany: searchData?.logisticsCompany,
          printBy: searchData?.printBy,
          printStatus: searchData?.printStatus,
          logisticsTrackingNumber: searchData?.logisticsTrackingNumber,
          orderId: searchData?.orderId,
        },
        beginDate: searchData?.beginDate,
        endDate: searchData?.endDate,
        pageSize: searchData?.pageSize,
        pageNum: searchData?.current,
      })
      .catch(e => {});
    if (resp) {
      exportData(resp, '揽件记录列表');
    }
  };

  const checkNetwork = async (record: any) => {
    const { id } = record;
    const resp: any = await api.checkRecord({ id }).catch(e => {});
    const Data = resp ? resp.data : undefined;
    let receiveRecordId: string, notOnlineNum: number, onlineNum: number;
    if (Data) {
      receiveRecordId = Data.receiveRecordId;
      notOnlineNum = Data.notOnlineNum || 0;
      onlineNum = Data.onlineNum || 0;
    } else {
      receiveRecordId = '';
      notOnlineNum = 0;
      onlineNum = 0;
    }
    const SubContent = () => (
      <div>
        <p>
          已上网：
          <a
            onClick={e => {
              e.preventDefault();
              modalInfo.destroy();
              history.push({
                pathname: '/outboundRecord/bagDetail',
                query: { receiveRecordId, onlineStatus: 1 },
              });
            }}
          >
            {onlineNum}
          </a>
        </p>
        <p>
          未上网：
          <a
            onClick={e => {
              e.preventDefault();
              modalInfo.destroy();
              history.push({
                pathname: '/outboundRecord/bagDetail',
                query: { receiveRecordId, onlineStatus: 0 },
              });
            }}
          >
            {notOnlineNum}
          </a>
        </p>
      </div>
    );
    const modalInfo = Modal.info({
      width: 280,
      title: '上网状态',
      // icon: <ExclamationCircleOutlined />,
      content: <SubContent />,
      onOk() {},
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const editPackage = async (id: string) => {
    const resp: any = await api
      .getTookDetail({
        id,
      })
      .catch(e => {});

    if (resp && resp.data) {
      inputWeightModal.show(resp.data);
    }
  };
  return {
    onChange,
    selected,
    onSelectChange,
    print,
    exportExcel,
    inputWeightModal,
    checkNetwork,
    editPackage,
  };
};
