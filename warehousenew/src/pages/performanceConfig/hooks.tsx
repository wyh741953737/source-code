import React, { useEffect } from 'react';
import { Form, Modal } from 'antd';
import * as api from '@/services/performanceConfig';
import { PERFORMANCEGROUP } from '@/enum.config';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;
interface ObjParams {
  [propName: string]: any;
}
const mapForm: ObjParams = {
  receiveResult: 'receiveDTO',
  distributeResult: 'distributeDTO',
  inspectionResult: 'inspectionDTO',
  weighInResult: 'weighInDTO',
  shelvesResult: 'shelvesDTO',
  pickResult: 'pickDTO',
  sortingResult: 'sortingDTO',
  checkBillResult: 'checkBillDTO',
  packageResult: 'packageDTO',
  weighOutResult: 'weighOutDTO',
};
export const indexHooks = (dispatch: Function) => {
  const [form] = Form.useForm();
  useEffect(() => {
    dispatch({
      type: 'performanceConfig/search',
      payload: { searchData: { group: 1 } },
    });
  }, []);

  const onChange = (page: number, pageSize?: number | undefined) => {
    dispatch({
      type: 'performanceConfig/search',
      payload: {
        pageNumber: page,
        pageSize,
      },
    });
  };

  const displayStatus = (record: any) => {
    const { status, group, id } = record;
    let subContent = null;
    let title = null;
    if (status) {
      title = '启用提示';
      subContent = (
        <div>
          <span style={{ color: 'red' }}>启用后则按该规则计分，</span>
          ，你还要继续吗？
        </div>
      );
    } else {
      title = '禁用提示';
      subContent = (
        <div>
          <span style={{ color: 'red' }}>禁用后则无法通过该规则计算积分</span>
          ，你还要继续吗？
        </div>
      );
    }
    let mapObj = PERFORMANCEGROUP.key(Number(group));

    let params: ObjParams = {};
    params[mapForm[mapObj?.code]] = {
      id,
      status: status == 1 ? 0 : 1,
    };

    confirm({
      title: title,
      icon: <ExclamationCircleOutlined />,
      content: subContent,
      onOk: async () => {
        const resp = await api.editRule({ ...params, group });
        if (resp && resp.data) {
          dispatch({
            type: 'performanceConfig/search',
            payload: { group },
          });
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const typeChange = (value: number) => {
    dispatch({
      type: 'performanceConfig/search',
      payload: { searchData: { group: value } },
    });
  };

  return {
    onChange,
    typeChange,
    form,
    displayStatus,
  };
};
