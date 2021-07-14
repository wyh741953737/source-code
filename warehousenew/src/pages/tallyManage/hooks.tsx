import React, { useEffect, useRef, useState } from 'react';
import { Form, message, Modal } from 'antd';
import { namespace } from '@/models/tallyManage';
import useRowSelection from '@/hooks/useRowSelection';
import useModal from '@/hooks/useModal';
import * as api from '@/services/tallyManage';
import moment from 'moment';
import * as regExp from '@/regExp.config';
import { BatchImportTallyDetail } from '@/services/tallyManage.d';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import style from './index.less';
import { jsonToxlsx } from '@/utils/exportData';
import useButton from '@/hooks/useButton';
const { confirm } = Modal;
export const searchFormHooks = (
  searchData: any,
  dispatch: Function,
  warehouseId: string,
) => {
  const [form] = Form.useForm();
  const dataRange = useRef([moment().add(-30, 'days'), moment()]);
  useEffect(() => {
    form.setFieldsValue(searchData);
  }, [searchData]);
  useEffect(() => {
    form.setFieldsValue({ storehouseId: warehouseId });
  }, [warehouseId]);
  useEffect(() => {
    dispatch({
      type: `${namespace}/search`,
      payload: {
        searchData: {
          createTime: searchData.createTime || dataRange.current,
          transTime: searchData.transTime || dataRange.current,
          storehouseId: warehouseId,
        },
      },
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
      payload: {
        createTime: dataRange.current,
        transTime: dataRange.current,
        storehouseId: warehouseId,
      },
    });
  };
  return {
    form,
    onSearch,
    onClearSearch,
  };
};

export const indexHooks = (dispatch: Function, dataSource: any[]) => {
  const [rowSelection, selected] = useRowSelection();
  const [rowInfo, setRowInfo] = useState<any[]>();
  const [activeIndex, setActiveIndex] = useState<number>();
  const onChange = (page: number, pageSize?: number | undefined) => {
    dispatch({
      type: `${namespace}/search`,
      payload: {
        pageNumber: page,
        pageSize,
      },
    });
  };
  useEffect(() => {
    if (dataSource.length > 0) {
      setRowInfo(dataSource[0].storehouseTallyVariantDTOList);
    } else {
      setRowInfo([]);
    }
  }, [dataSource]);

  /**
   * 放弃按钮
   */
  const giveUp = () => {
    if (selected.keys.length === 0) {
      message.warn('至少选择一项');
      return;
    }
    const isSome = selected.rows.some(item => item.status != 1);
    if (isSome) {
      message.warn('理货状态非待处理不能放弃');
      return;
    }
    confirm({
      title: '确认放弃吗？',
      icon: <ExclamationCircleOutlined />,
      onOk: async () => {
        try {
          await api.giveUp({
            ids: selected.keys.map(k => k),
          });

          message.success('放弃成功');
          dispatch({ type: `${namespace}/search` });
        } catch (error) {
          console.log(error);
        }
      },
      onCancel() {},
    });
  };
  /**
   * 新增理货弹框
   */
  const [modal] = useModal({
    noVerifyForm: true,
    onOk: async (values, p) => {
      console.log(values, 'values', p);
      try {
        await api.addTally({
          storehouseId: p.storehouseId,
          storehouseTallyVariantDTOList: p.list.map((item: any) => {
            return {
              id: item.id,
              quantity: item.quantity,
              toLocationName: item.toLocationName,
              customerNum: item.customerNum,
            };
          }),
        });

        message.success('新增成功');
        dispatch({ type: `${namespace}/search` });
        return true;
      } catch (error) {
        return Promise.reject(error);
      }
    },
  });

  const onRowSelect = (record: any, index: number | undefined) => {
    setRowInfo(
      Array.isArray(record.storehouseTallyVariantDTOList)
        ? record.storehouseTallyVariantDTOList
        : [],
    );

    setActiveIndex(index);
  };
  const setClassName = (record: any, index: number) => {
    //record代表表格行的内容，index代表行索引
    //判断索引相等时添加行的高亮样式
    return index === activeIndex ? `${style['l-table-row-active']}` : '';
  };

  const createBatch = useButton({
    onClick: async () => {
      if (selected.keys.length === 0) {
        message.warn('至少选择一项');
        return;
      } else if (selected.keys.length > 1) {
        message.warn('不可同时选择多个理货单');
        return;
      }
      try {
        console.log(selected);
        await api.createBatchNumber({ id: selected.keys[0] });
        message.success('成功生成批次');
        dispatch({ type: `${namespace}/search` });
      } catch (error) {}
    },
  });

  // json生成xlxs
  const downloadFailFiles = (data: Array<any>, name: string) => {
    if (data.length === 0) {
      return message.info('失败明细为空！');
    }
    //设置excel标题
    let excel_str = `<tr>
      <td>仓库</td>
      <td>SKU</td>
      <td>货主编号</td>
      <td>库位</td>
      <td>库存类型</td>
      <td>目标库位</td>
      <td>理货数量</td>
      <td>失败原因</td>
    </tr>`;
    //循环遍历，每行加入tr标签，每个单元格加td标签
    data.forEach(item => {
      excel_str += `<tr>
      <td>${item.storehouseName}</td>
      <td>${item.sku}</td>
      <td>${item.customerNum}</td>
      <td>${item.locationName}</td>
      <td>${item.type}</td>
      <td>${item.toLocationName}</td>
      <td>${item.quantity}</td>
      <td>${item.failureCause}</td>
    </tr>`;
    });
    jsonToxlsx(excel_str, name);
  };

  const importMaterialData = async (
    validValues: BatchImportTallyDetail.Data[],
  ) => {
    try {
      const resp = await api
        .batchImportTallyDetail({ storehouseTallyVariantDTOList: validValues })
        .catch(e => {});
      Modal.info({
        title: '上传结果',
        content: (
          <div>
            <p>成功：{resp?.data.successNum}</p>
            <p>
              失败：{resp?.data.failuresNum}{' '}
              <a
                style={{ marginLeft: '5px' }}
                onClick={() =>
                  downloadFailFiles(
                    resp.data.tallyVariantErrorLogVOS,
                    '失败明细',
                  )
                }
              >
                点击下载失败文件！
              </a>{' '}
            </p>
          </div>
        ),
        onOk() {
          dispatch({ type: `${namespace}/search` });
        },
      });
    } catch (error) {}
  };
  const excelColumns = columnNames();
  return {
    onChange,
    giveUp,
    rowSelection,
    modal,
    onRowSelect,
    rowInfo,
    setClassName,
    excelColumns,
    importMaterialData,
    createBatch,
  };
};

const columnNames = function(): Array<{
  title: string;
  name: string;
  validate: (value: any) => { value?: any; err?: string };
}> {
  return [
    {
      title: '仓库',
      name: 'storehouseName',
      validate: (value: string) => {
        return !value ? { err: '该字段属于必填项' } : { value };
      },
    },
    {
      title: 'SKU',
      name: 'sku',
      validate: (value: string) => {
        return !value ? { err: '该字段属于必填项' } : { value };
      },
    },
    {
      title: '货主编号',
      name: 'customerNum',
      validate: (value: string) => {
        return !value ? { err: '该字段属于必填项' } : { value };
      },
    },
    {
      title: '库位',
      name: 'locationName',
      validate: (value: string) => {
        return !value ? { err: '该字段属于必填项' } : { value };
      },
    },
    {
      title: '库存类型',
      name: 'type',
      validate: (value: string) => {
        return !value
          ? { err: '该字段属于必填项' }
          : !regExp.POSITIVEINTEGER.test(value)
          ? { err: '限制正整数' }
          : { value };
      },
    },
    {
      title: '目标库位',
      name: 'toLocationName',
      validate: (value: string) => {
        return !value ? { err: '该字段属于必填项' } : { value };
      },
    },
    {
      title: '理货数量',
      name: 'quantity',
      validate: (value: string) => {
        return !value
          ? { err: '该字段属于必填项' }
          : !regExp.POSITIVEINTEGER.test(value)
          ? { err: '限制正整数' }
          : { value };
      },
    },
  ];
};
