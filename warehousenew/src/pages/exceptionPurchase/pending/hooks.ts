import { useEffect, useState } from 'react';
import { Form, message } from 'antd';
import useModal from '@/hooks/useModal';
import { EXCEPTIONPURCHASEDEALTYPE } from '@/enum.config';

export const searchFormHooks = (searchData: any, dispatch: Function) => {
  const [form] = Form.useForm();
  const onSearch = async () => {
    const values = form.getFieldsValue();

    dispatch({
      type: 'exceptionPurchasePending/search',
      payload: { searchData: values },
    });
  };
  const onClearSearch = () => {
    form.resetFields();
    dispatch({ type: 'exceptionPurchasePending/searchDataClear' });
  };
  return {
    form,
    onSearch,
    onClearSearch,
  };
};
type DealModalP = Array<{
  receiptExceptionRecordId: string;
  purchaseExceptionRecordId: string;
  quantity: number;
}>;
export const indexHooks = (dispatch: Function) => {
  useEffect(() => {
    dispatch({ type: 'exceptionPurchasePending/search' });
  }, []);
  const [dealModal] = useModal<DealModalP>({
    onOk: async (values, p) => {
      const deal = EXCEPTIONPURCHASEDEALTYPE.key(values.processType);
      if (!deal) return;
      if ('refundCertificate' in values && values.refundCertificate) {
        values.refundCertificate = values.refundCertificate
          .map((r: any) => r.url)
          .join(',');
      }
      await deal.fetch(
        p.map((item: any) => ({
          ...values,
          addOrUpdate: 0,
          receiptExceptionRecordId: item.receiptExceptionRecordId,
          purchaseExceptionRecordId: item.purchaseExceptionRecordId,
        })),
      );
      message.success('处理成功');
      dispatch({ type: 'exceptionPurchasePending/search' });
    },
  });
  const onChange = (page: number, pageSize?: number | undefined) => {
    dispatch({
      type: 'exceptionPurchasePending/search',
      payload: {
        pageNumber: page,
        pageSize,
      },
    });
  };
  const [selectedRowKeysMap, setSelectedRowKeysMap] = useState<{
    [k: string]: any;
  }>({});
  const onSelectionChange = (rowKey: string, keys: any) => {
    setSelectedRowKeysMap({ ...selectedRowKeysMap, [rowKey]: keys });
  };
  return {
    onChange,
    selectedRowKeysMap,
    onSelectionChange,
    dealModal,
  };
};
