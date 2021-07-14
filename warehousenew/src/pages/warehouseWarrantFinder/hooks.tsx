import React from 'react';
import { useEffect, useState } from 'react';
import { Form, message, Modal } from 'antd';
import useModal from '@/hooks/useModal';
import * as api from '@/services/warehouseWarrant';
import { getLog } from '@/services/common';
import { namespace } from '@/models/warehouseWarrantFinder';
import { WAREHOUSESTATUS } from '@/enum.config';
import {
  exportExcel,
  ExcelColumns,
} from '@/components/CustomFields/ExcelDownload';

const columns = [
  {
    title: 'SKU',
    name: 'sku',
  },
  { title: '数量', name: 'quantity' },
] as ExcelColumns;

export const searchFormHooks = (searchData: any, dispatch: Function) => {
  const [form] = Form.useForm();
  const onSearch = async () => {
    const values = form.getFieldsValue();
    dispatch({
      type: `${namespace}/search`,
      payload: { searchData: values },
    });
  };
  const onClearSearch = () => {
    dispatch({ type: `${namespace}/searchDataClear` });
    setTimeout(() => form.resetFields(), 0);
  };
  return {
    form,
    onSearch,
    onClearSearch,
  };
};

export const indexHooks = (dispatch: Function, dataSource: any) => {
  const [selected, setSelected] = useState<Array<any>>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<Array<any>>([]);
  useEffect(() => {
    setSelected([]);
    setSelectedRowKeys([]);
  }, [dataSource]);
  const [addModal] = useModal({
    onOk: async (values, p) => {
      if (values.type && values.type == '7') {
        try {
          const resp: any = await api.manuallyImport({
            type: values.type,
            storageId: values.warehouse,
            storageName: p.option.menu.key(values.warehouse)?.value,
            logisticsTrackingNumbers: values.numbers,
            inboundBatch: values.inboundBatch,
            commodityDetailsList: values.commodityDetailsList,
          });
          // 部分成功，创建excel
          const { successQuantity, errorQuantity, resultList } = resp.data;
          const download = exportExcel(
            columns,
            resultList,
            '保存失败商品.xlsx',
          );
          const warn = Modal.confirm({
            title: '提示',
            content: (
              <div>
                <p>
                  成功：{successQuantity}，失败：{errorQuantity}
                </p>
                <p>失败原因：未找到</p>
              </div>
            ),
            cancelText: '取消',
            okText: '下载失败文件并关闭',
            onCancel: () => {
              warn.destroy();
            },
            onOk: () => {
              download();
              warn.destroy();
            },
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        const resp: any = await api.addRecord({
          type: values.type,
          storageId: values.warehouse,
          storageName: p.option.menu.key(values.warehouse)?.value,
          logisticsTrackingNumbers: values.numbers,
        });
      }

      dispatch({ type: `${namespace}/search` });
    },
  });
  const [updateModal] = useModal({
    onOk: async (values, p) => {
      const logisticsInfoDTOS = values.logistics
        .map((l: any, index: number) => {
          if (index >= p.logisticsList.length) {
            return {
              logisticsCompany: l.name,
              logisticsTrackingNumber: l.number,
            };
          }
        })
        .filter(Boolean);
      await api.updateRecord({
        id: p.id,
        status: values.status,
        logisticsInfoDTOS,
      });
      dispatch({ type: `${namespace}/search` });
    },
  });
  const [logModal] = useModal({
    onFetch: async params => {
      return await getLog({ ids: [params.id] });
    },
  });
  useEffect(() => {
    dispatch({ type: `${namespace}/search` });
  }, []);

  const onChange = (page: number, pageSize?: number | undefined) => {
    dispatch({
      type: `${namespace}/search`,
      payload: {
        pageNumber: page,
        pageSize,
      },
    });
  };

  const onDelete = () => {
    if (!selected.length) return message.warn('请选择入库单');
    Modal.confirm({
      title: '是否删除入库单',
      content: '如果删除入库单则无法恢复，请确定是否删除',
      okText: '立即删除',
      cancelText: '取消',
      onOk: async () => {
        return new Promise((resolve, reject) => {
          api.deleteRecord({ ids: selected.map(s => s.id) }).then(
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
  const onSelectionChange = (
    selectedRowKeys: Array<any>,
    selectedRows: Array<any>,
  ) => {
    setSelected(selectedRows);
    setSelectedRowKeys(selectedRowKeys);
  };
  const onUpdate = () => {
    if (selected.length === 0) return message.warn('请选择需要修改的入库单');
    if (selected.length > 1) return message.warn('一次只能修改一个入库单');
    if (
      selected[0].status === WAREHOUSESTATUS.finished.key ||
      selected[0].status === WAREHOUSESTATUS.close.key
    ) {
      return message.warn(
        `${WAREHOUSESTATUS.finished.value}和${WAREHOUSESTATUS.close.value}的状态下，无法修改运单号`,
      );
    }
    updateModal.show(selected[0]);
  };
  return {
    onChange,
    onDelete,
    onSelectionChange,
    addModal,
    updateModal,
    logModal,
    onUpdate,
    selectedRowKeys,
  };
};
