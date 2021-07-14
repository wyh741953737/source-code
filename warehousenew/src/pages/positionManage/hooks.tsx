import { Form, Modal, message } from 'antd';
import React from 'react';
import { useEffect, useState } from 'react';
import useModal from '@/hooks/useModal';
import * as api from '@/services/positionManage';
import useOptions from '@/hooks/useOptions';
import { warehouseApply } from '@/option.apply';
import * as regExp from '@/regExp.config';
import Enum from '@/utils/enum';
import { POSITIONQUAILTY } from '@/enum.config';
import { UploadRecord } from '@/services/positionManage.d';
import printRequest from '@/utils/printTwo';
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
      type: 'positionManage/search',
      payload: { searchData: { warehouse: warehouseId } },
    });
  }, [warehouseId]);
  const onSearch = async () => {
    const values = form.getFieldsValue();
    dispatch({
      type: 'positionManage/search',
      payload: { searchData: values },
    });
  };
  return {
    form,
    onSearch,
  };
};

export const indexHooks = (dispatch: Function, dataSource: any) => {
  const [option] = useOptions(warehouseApply, { interval: Infinity });
  const [uploading, setUploading] = useState(false);
  const [addOrUpdateModal] = useModal({
    onOk: async (values, p) => {
      try {
        if (p) {
          // 是修改
          await api.updateRecord({
            id: p.id,
            locationId: p.locationId,
            areaCode: p.areaCode,
            channel: p.channel,
            shelf: p.shelf,
            location: p.location,
            locationL: values.locationL,
            locationW: values.locationW,
            locationH: values.locationH,
            capacity: values.capacity,
            localtionLoad: values.localtionLoad,
            type: values.type,
            useType: values.useType,
            locationType: values.locationType,
            pathNode: values.pathNode,
            isDelete: values.isDelete ? 1 : 0,
          });
        } else {
          await api.addRecord({
            storehouseId: values.storehouseId,
            areaName: values.areaName,
            channel: values.channel,
            shelf: values.shelf,
            location: values.location,
            locationH: values.locationH,
            locationL: values.locationL,
            locationW: values.locationW,
            capacity: values.capacity,
            localtionLoad: values.localtionLoad,
            type: values.type,
            useType: values.useType,
            locationType: values.locationType,
            pathNode: values.pathNode,
          });
        }
      } catch (e) {
        return false;
      }
      dispatch({ type: 'positionManage/search', payload: {} });
      return true;
    },
  });
  const [multiAddModal] = useModal({
    onOk: async values => {
      await api.multiAddRecord({
        storehouseId: values.storehouseId,
        areaName: values.areaName,
        channelStart: values.channel[0],
        channelEnd: values.channel[1],
        shelfStart: values.shelf[0],
        shelfEnd: values.shelf[1],
        locationStart: values.location[0],
        locationEnd: values.location[1],
        locationH: values.locationH,
        locationL: values.locationL,
        locationW: values.locationW,
        capacity: values.capacity,
        localtionLoad: values.localtionLoad,
        type: values.type,
        useType: values.useType,
        locationType: values.locationType,
      });
      dispatch({ type: 'positionManage/search', payload: {} });
    },
  });

  const onChange = (page: number, pageSize?: number | undefined) => {
    dispatch({
      type: 'positionManage/search',
      payload: {
        pageNumber: page,
        pageSize,
      },
    });
  };
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  useEffect(() => {
    setSelectedRowKeys([]);
  }, [dataSource]);
  const onSelectionChange = (keys: any, rows: any) => {
    setSelectedRowKeys(keys);
    setSelectedRows(rows);
  };
  const deleteRecord = (recordIds: Array<string>) => {
    if (recordIds.length === 0) return message.warn('请选择需要删除的记录');
    Modal.confirm({
      title: '删除提示',
      content: '确定要删除此库位？',
      onOk: () => {
        return new Promise((resolve, reject) => {
          api.deleteRecord({ locationIds: recordIds }).then(
            () => {
              dispatch({ type: `positionManage/search` });
              resolve('');
            },
            () => {
              console.log('111111111');
              reject('error');
            },
          );
        }).catch(() => console.log('出错!'));
      },
    });
  };
  const importEditNetworkStatus = async (values: UploadRecord.Request) => {
    await api.uploadRecord(values).catch(e => {});
    message.success('上传成功');
    dispatch({ type: 'positionManage/search' });
  };
  const excelColumns = columnNames(option.menu, POSITIONQUAILTY);
  const onPrint = async () => {
    if (selectedRows.length === 0) {
      return message.warn('请选择库区');
    }
    const locationCodes = selectedRows.map((item: any) => item.locationName);
    const resp = await api.print({ locationCodes });
    // window.open(Array.isArray(resp.data) ? resp.data[0] : resp.data);
    printRequest([
      {
        title: '打印库位编号',
        url: Array.isArray(resp.data) ? resp.data[0] : resp.data,
      },
    ]);
  };
  return {
    onChange,
    onSelectionChange,
    deleteRecord,
    selectedRowKeys,
    addOrUpdateModal,
    multiAddModal,
    option,
    uploading,
    excelColumns,
    importEditNetworkStatus,
    onPrint,
  };
};

const columnNames = function(
  storehouseOption: Enum,
  locationTypeOption: Enum,
): Array<{
  title: string;
  name: string;
  validate: (value: any) => { value?: any; err?: string };
}> {
  const storehouseNames = storehouseOption.toArray().map(o => o.value);
  return [
    {
      title: '所属仓库',
      name: 'storehouseName',
      validate: (value: string) => {
        return storehouseNames.includes(value) ? { value } : { err: '未找到' };
      },
    },
    {
      title: '库位',
      name: 'locationName',
      validate: (value: string) => ({ value }),
    },
    {
      title: '库位高度',
      name: 'locationH',
      validate: (value: number) => {
        if (value == undefined) return { value };
        return value > 0 && value < 1000 ? { value } : { err: '限制0-1000' };
      },
    },
    {
      title: '库位宽度',
      name: 'locationW',
      validate: (value: number) => {
        if (value == undefined) return { value };
        return value > 0 && value < 1000 ? { value } : { err: '限制0-1000' };
      },
    },
    {
      title: '库位长度',
      name: 'locationL',
      validate: (value: number) => {
        if (value == undefined) return { value };
        return value > 0 && value < 1000 ? { value } : { err: '限制0-1000' };
      },
    },
    {
      title: '可承载数量',
      name: 'capacity',
      validate: (value: number) => {
        if (value == undefined) return { value };
        return value > 0 && value < 10000 ? { value } : { err: '限制0-10000' };
      },
    },
    {
      title: '可承载重量',
      name: 'localtionLoad',
      validate: (value: number) => {
        if (value == undefined) return { value };
        return value > 0 && value < 100000
          ? { value }
          : { err: '限制0-100000' };
      },
    },
    {
      title: '库位货品',
      name: 'locationType',
      validate: (value: string) => {
        if (value === undefined) return { value };
        const o = locationTypeOption.toArray().find(o => o.value === value);
        return o ? { value: o.key } : { err: '未找到' };
      },
    },
    {
      title: '路径节点',
      name: 'pathNode',
      validate: (value: string) => {
        return regExp.POSITIVEINTEGER.test(value)
          ? { value }
          : { err: '限制正整数' };
      },
    },
  ];
};
