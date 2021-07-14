import { useEffect, useContext } from 'react';
import { Form, message, Modal } from 'antd';
import { namespace } from '@/models/cannibalize';
import * as api from '@/services/cannibalize';
import useModal from '@/hooks/useModal';
import { StaticParams } from '@/components/StaticModal';
import { checkPackageLog } from '@/services/orderDispatch';

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
    form.setFieldsValue({ storehouseId: warehouseId });
  }, [warehouseId]);
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

export const indexHooks = (dispatch: Function) => {
  const onChange = (page: number, pageSize?: number | undefined) => {
    dispatch({
      type: `${namespace}/search`,
      payload: {
        pageNumber: page,
        pageSize,
      },
    });
  };
  // 取消调拨单
  const cancel = (id: string) => {
    Modal.confirm({
      title: '取消提示',
      content: '确定取消此调拨单吗？',
      onOk: async () => {
        return new Promise((resolve, reject) => {
          api.cancel({ id }).then(
            () => {
              dispatch({ type: `${namespace}/search` });
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
  // 日志弹框
  const [logModal] = useModal<{ id: number }, StaticParams>({
    onFetch: async params => {
      const resp = await checkPackageLog({ id: params?.id as number });
      return {
        keys: ['createBy', 'operationContent', 'createAt'],
        dataSource: resp.data,
      };
    },
  });

  // 订单明细
  const [resultModal] = useModal({});

  const checkDetail = async (record: any) => {
    const { transferCode } = record;
    const hide = message.loading('查询中，请稍后...');

    try {
      const resp = await api.getPackageDetail({ transferCode });
      resultModal.show({
        transferCode: transferCode,
        data: resp?.data,
      });
    } catch (error) {
    } finally {
      hide();
    }
  };

  return {
    onChange,
    cancel,
    logModal,
    resultModal,
    checkDetail,
  };
};
