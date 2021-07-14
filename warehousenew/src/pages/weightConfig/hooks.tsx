import React, { useEffect } from 'react';
import { Modal, message } from 'antd';
import useModal from '@/hooks/useModal';
import * as api from '@/services/weightConfig';
import { ExclamationCircleOutlined } from '@ant-design/icons';
interface logisticItem {
  cnName: string;
  enName: string;
  [property: string]: string | number;
}
const { confirm } = Modal;
export const indexHooks = (
  dispatch: Function,
  dataSource: any,
  logisticData: Array<logisticItem>,
) => {
  useEffect(() => {
    dispatch({ type: 'weightConfig/search', payload: {} });
    dispatch({ type: 'weightConfig/saveThreshold', payload: {} });
    dispatch({ type: 'weightConfig/saveLogistic', payload: {} });
  }, []);
  const [editModal] = useModal({
    onOk: async (values, p) => {
      console.log(values, p, '=======');
      const {
        logisticsCode,
        companyAccount,
        storehouseId,
        frameLocation,
      } = values;
      const { logisticsCompany, storehouseName } = p;
      const fileName = values.files[0].name;
      const fileUrl = values.files[0].url;
      let postParams = {
        logisticsCode,
        logisticsCompany,
        fileName,
        fileUrl,
        id: p && p.id ? p.id : undefined,
        companyAccount,
        frameLocation,
        storehouseName,
        storehouseId,
      };
      try {
        await api
          .updateConfigList({
            ...postParams,
          })
          .catch(() => {});
      } catch (e) {
        return false;
      }
      dispatch({ type: 'weightConfig/search', payload: {} });
      return true;
    },
  });
  const [thresholdModal] = useModal({
    onOk: async (values, p) => {
      console.log(values, p, '=======test');
      try {
        const resp = await api
          .saveThresholdVal({
            ...values,
            id: p.id,
          })
          .catch(() => {});
        if (resp && resp.data) {
          message.success('修改成功！');
          dispatch({ type: 'weightConfig/saveThreshold', payload: {} });
        }
      } catch (e) {
        return false;
      }

      return true;
    },
  });

  const onChange = (page: number, pageSize?: number | undefined) => {
    dispatch({
      type: 'weightConfig/search',
      payload: {
        pageNumber: page,
        pageSize,
      },
    });
  };
  const deleteConfig = async (record: any) => {
    confirm({
      title: '你确定清空该配置吗？',
      icon: <ExclamationCircleOutlined />,
      onOk: async () => {
        const { id } = record;
        return new Promise((resolve, reject) => {
          api
            .deleteRecord({
              id,
            })
            .then(
              () => {
                dispatch({ type: 'weightConfig/search', payload: {} });
                resolve('');
              },
              () => {
                reject('error');
              },
            );
        }).catch(() => console.log('出错!'));
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  return {
    editModal,
    thresholdModal,

    onChange,
    deleteConfig,
  };
};
