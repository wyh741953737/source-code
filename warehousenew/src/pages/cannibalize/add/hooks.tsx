import React, { useEffect, useState } from 'react';
import { Form, message, Modal } from 'antd';
import useModal from '@/hooks/useModal';
import * as api from '@/services/cannibalize';
import { Add, ImportInfos } from '@/services/cannibalize.d';
import useRowSelection from '@/hooks/useRowSelection';
import useButton from '@/hooks/useButton';
import { history } from 'umi';
import useOptions from '@/hooks/useOptions';
import { warehouseApply } from '@/option.apply';
import {
  exportExcel,
  ExcelColumns,
} from '@/components/CustomFields/ExcelDownload';
import { STORETYPETRANS } from '@/enum.config';

export interface ProduceInfo extends Add.ProduceInfo {
  // 前端生成的唯一id，sku-短码 拼接出来
  id: string;
  // 输入的sku或短码
  skuOrNum: string;
}

export interface AddModalParams {
  sourceStorehouseId: string;
  packProperty: string;
  info?: ProduceInfo;
}

interface FormItems {
  type: number;
  transferRange: number;
  sourceStorehouseId: string;
  targetStorehouseId: string;
  packProperty: number;
  remark: string;
}

export default () => {
  const [form] = Form.useForm<FormItems>();
  const [option] = useOptions(warehouseApply, { interval: Infinity });
  const [rowSelection, selected] = useRowSelection();
  // 标记是否调拨单详情必须参数是否填写
  const [isVerify, setIsVerify] = useState<boolean>(false);
  // 寄存所有的商品信息
  const [produceList, setProduceList] = useState<ProduceInfo[]>([]);
  const [addModal] = useModal<AddModalParams>({
    onOk: async (values: ProduceInfo) => {
      const isEdit = !!addModal.params?.info;
      if (isEdit) {
        // 如果是编辑进行替换
        const newProduceList = produceList.map(p => {
          if (p.id === values.id) return values;
          return p;
        });
        setProduceList(newProduceList);
        return;
      }
      // 如果是非编辑状态，先判断是否存在，否则添加到最前面。
      if (produceList.find(p => p.id === values.id)) {
        message.error('该商品已添加，您可以去修改该商品明细！');
        return Promise.reject();
      }
      setProduceList([values, ...produceList]);
    },
    closeAndClear: true,
  });
  // 添加商品
  const onAddClick = () => {
    const { sourceStorehouseId, packProperty } = form.getFieldsValue([
      'sourceStorehouseId',
      'packProperty',
    ]);
    if (!sourceStorehouseId) return;
    addModal.show({ sourceStorehouseId, packProperty });
  };
  // 修改
  const onUpdateClick = (info: ProduceInfo) => {
    const { sourceStorehouseId, packProperty } = form.getFieldsValue([
      'sourceStorehouseId',
      'packProperty',
    ]);
    if (!sourceStorehouseId) return;
    addModal.show({ sourceStorehouseId, packProperty, info });
  };
  // 批量删除
  const multiDelete = useButton({
    onClick: async () => {
      if (selected.keys.length === 0) {
        message.warn('至少选择一项');
        return;
      }
      await new Promise(resolve => {
        Modal.confirm({
          title: '删除提示',
          content: '确定删除全部选中商品吗？',
          onOk: () => {
            const newProduceList = produceList.filter(
              p => !selected.keys.includes(p.id),
            );
            setProduceList(newProduceList);
            resolve('');
          },
          onCancel: () => resolve(''),
        });
      });
    },
  });
  // 单个删除
  const del = (id: string) => {
    Modal.confirm({
      title: '删除提示',
      content: '确定删除此商品吗？',
      onOk: () => {
        const newProduceList = produceList.filter(p => p.id !== id);
        setProduceList(newProduceList);
      },
    });
  };
  const columns = [
    {
      title: '库存类型',
      name: 'stockType',
      valueFormat: value => STORETYPETRANS.key(value)?.value,
    },
    { title: 'SKU', name: 'variantSku' },
    { title: '需调度数量', name: 'transferQuantity' },
    { title: '短码', name: 'variantNum' },
    { title: '商品属性', name: 'productProperty' },
    { title: '可用库存数', name: 'availableQuantity' },
    { title: '错误原因', name: 'errorReason' },
  ] as ExcelColumns;
  // 保存
  const save = useButton({
    onClick: async () => {
      const values = (await form.validateFields()) as FormItems;
      const resp = await api.add({
        transferRange: values.transferRange,
        packProperty: values.packProperty,
        sourceStorehouseId: values.sourceStorehouseId,
        sourceStorehouseName: option.menu.key(values.sourceStorehouseId)
          ?.value as string,
        targetStorehouseId: values.targetStorehouseId,
        targetStorehouseName: option.menu.key(values.targetStorehouseId)
          ?.value as string,
        remark: values.remark,
        list: produceList.map(p => ({ ...p, id: undefined })),
      });
      const { errorList, errorNum, successNum } = resp.data;
      if (errorNum === 0) {
        message.success('保存成功');
        history.push('/cannibalize');
        return;
      }
      // 部分成功，创建excel
      const download = exportExcel(columns, errorList, '保存失败商品.xlsx');
      const warn = Modal.warn({
        title: '库存变动，部分保存成功',
        content: `成功：${successNum}，失败：${errorNum}`,
        okText: '下载失败文件并关闭',
        onOk: () => {
          download();
          history.push('/cannibalize');
          warn.destroy();
        },
      });
    },
  });
  // 导入
  const upload = async (validValues: ImportInfos.List[]) => {
    const { sourceStorehouseId, packProperty } = form.getFieldsValue([
      'sourceStorehouseId',
      'packProperty',
    ]);
    const resp = await api.importInfos({
      sourceStorehouseId,
      packProperty,
      list: validValues,
    });
    const { errorList, errorNum, successList, successNum } = resp.data;
    const success: ProduceInfo[] = successList.map(s => ({
      ...s,
      id: `${s.variantSku}-${s.stockType}`,
      skuOrNum: s.variantNum,
    }));
    // 新的在前，旧的在后面，所以如果旧的里面和新的里面同时存在同一个id，必定旧的会被过滤掉
    const nextList = [...success, ...produceList].reduce((a, b) => {
      if (a.find(i => i.id === b.id)) return a;
      return [...a, b];
    }, [] as ProduceInfo[]);
    setProduceList(nextList);
    if (errorNum === 0) return message.success('导入成功');
    // 部分成功，创建excel
    const download = exportExcel(columns, errorList, '导入失败商品.xlsx');
    const warn = Modal.warn({
      title: '部分导入成功',
      content: `成功：${successNum}，失败：${errorNum}`,
      okText: '下载失败文件并关闭',
      onOk: () => {
        download();
        warn.destroy();
      },
    });
  };
  // 取消
  const cancel = useButton({
    onClick: async () => {
      Modal.confirm({
        title: '取消提示',
        content: '确定取消编辑该调拨单吗？',
        onOk: () => {
          history.push('/cannibalize');
        },
      });
    },
  });

  return {
    form,
    addModal,
    onAddClick,
    isVerify,
    setIsVerify,
    produceList,
    rowSelection,
    multiDelete,
    save,
    cancel,
    upload,
    onUpdateClick,
    del,
  };
};
