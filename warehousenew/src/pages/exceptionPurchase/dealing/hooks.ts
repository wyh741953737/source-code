import { useEffect } from 'react';
import { Form, message } from 'antd';
import useModal from '@/hooks/useModal';
import * as api from '@/services/exceptionPurchase';
import { EXCEPTIONPURCHASEDEALTYPE } from '@/enum.config';

export const searchFormHooks = (searchData: any, dispatch: Function) => {
  const [form] = Form.useForm();
  const onSearch = async () => {
    const values = form.getFieldsValue();

    dispatch({
      type: 'exceptionPurchaseDealing/search',
      payload: { searchData: values },
    });
  };
  const onClearSearch = () => {
    form.resetFields();
    dispatch({ type: 'exceptionPurchaseDealing/searchDataClear' });
  };
  return {
    form,
    onSearch,
    onClearSearch,
  };
};

export const indexHooks = (dispatch: Function) => {
  useEffect(() => {
    dispatch({ type: 'exceptionPurchaseDealing/search', payload: {} });
  }, []);
  const [dealModal] = useModal({
    onFetch: async params => {
      const resp = await api.detailForDeal({ exceptionNum: params.id });
      return {
        isUpdate: true,
        data: resp.data,
      };
    },
    onOk: async (values, p) => {
      const deal = EXCEPTIONPURCHASEDEALTYPE.key(values.processType);
      if (!deal) return;
      if ('refundCertificate' in values && values.refundCertificate) {
        values.refundCertificate = values.refundCertificate
          .map((r: any) => r.url)
          .join(',');
      }
      await deal.fetch([
        {
          ...values,
          addOrUpdate: 1,
          id: p.data.id,
          receiptExceptionRecordId: p.data.receiptExceptionRecordId,
          purchaseExceptionRecordId: p.data.purchaseExceptionRecordId,
        },
      ]);
      message.success('编辑成功');
      dispatch({ type: 'exceptionPurchaseDealing/search' });
    },
  });
  const [dealConfirmModal] = useModal({
    onOk: async (values, p) => {
      await api.confirm({
        purchaseExceptionRecordIdList: [p.id],
        status: 1002,
        remark: values.remark,
      });
      message.success('处理确认成功');
      dispatch({ type: 'exceptionPurchaseDealing/search' });
    },
  });

  const onChange = (page: number, pageSize?: number | undefined) => {
    dispatch({
      type: 'exceptionPurchaseDealing/search',
      payload: {
        pageNumber: page,
        pageSize,
      },
    });
  };
  return {
    onChange,
    dealModal,
    dealConfirmModal,
  };
};
