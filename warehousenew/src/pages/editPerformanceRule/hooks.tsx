import React, { useEffect, useState } from 'react';
import { Form, message } from 'antd';
import moment from 'moment';
import { history } from '@@/core/history';
import * as api from '@/services/performanceConfig';
import { PERFORMANCEGROUP } from '@/enum.config';
import storage from '@/utils/storage';
const namespace = 'performanceConfig';
interface ObjParams {
  [propName: string]: any;
}
const mapForm: ObjParams = {
  receiveResult: {
    data: ['packageNum', 'skuNum', 'variantNum', 'caigouOrderNum'],
    key: 'receiveDTO',
  },
  distributeResult: {
    data: [
      'packageNum',
      'skuNum',
      'skuVariantNum',
      'arrivalGoodsNum',
      'qualifiedNum',
      'ungradedProductsNum',
      'lessGoodsNum',
      'multipleGoodsNum',
    ],
    key: 'distributeDTO',
  },
  inspectionResult: {
    data: [
      'collarBatchCount',
      'productAllCount',
      'skuAllCount',
      'skuStanCount',
      'qualifiedNum',
      'ungradedProductsNum',
      'lessGoodsNum',
      'multipleGoodsNum',
    ],
    key: 'inspectionDTO',
  },
  weighInResult: {
    data: [
      'batchNumber',
      'weighTotalCount',
      'modifyWeightCount',
      'modifyVolumeCount',
      'weighNum',
      'qualifiedNum',
      // 'ungradedProductsNum',
      'lessGoodsNum',
      'multipleGoodsNum',
    ],
    key: 'weighInDTO',
  },
  shelvesResult: {
    data: ['skuStanCount', 'productCount', 'weighNum', 'volumeNum'],
    key: 'shelvesDTO',
  },
  pickResult: {
    data: [
      'singleProductNum',
      'singleBatchNum',
      'singleLocationNum',
      'singleSkuNum',
      'singleStanNum',
      'multiProductNum',
      'multiBatchNum',
      'multiLocationNum',
      'multiSkuNum',
      'multiStanNum',
      'allWeight',
      'allVolume',
      'checklistUnsuccessfulNum',
      'allDistance',
    ],
    key: 'pickDTO',
  },
  sortingResult: {
    data: [
      'goodsCount',
      'batchCount',
      'singleSkuStanCount',
      'multiSkuStanCount',
      'packageProductCount',
      'checklistUnsuccessfulNum',
    ],
    key: 'sortingDTO',
  },
  checkBillResult: {
    data: [
      'orderCount',
      'productCount',
      'packProductCount',
      'checklistUnsuccessfulNum',
    ],
    key: 'checkBillDTO',
  },
  packageResult: {
    data: ['sheetCount', 'productCount', 'volumeCount', 'weightNum'],
    key: 'packageDTO',
  },
  weighOutResult: {
    data: ['packingTotalNum', 'packingNetWeight', 'packingRoughWeight'],
    key: 'weighOutDTO',
  },
};

export const indexHooks = (dispatch: Function, query: any) => {
  const [skuList, setSkuData] = useState<any>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    if (query && query.id) {
      const performanceConfigItem = storage.localGet('performanceConfigItem');

      const { group } = performanceConfigItem;
      const currentEnum: any = PERFORMANCEGROUP.key(Number(group));
      const mapObj = JSON.parse(JSON.stringify(mapForm[currentEnum.code]));
      let params: ObjParams = {};

      mapObj.data.forEach((element: string) => {
        const valueArr = performanceConfigItem[element]
          ? performanceConfigItem[element].split(',')
          : [1, 1, 1, 1, 1];
        for (var i = 0; i < 5; i++) {
          params[`${element}[${i}]`] = valueArr[i];
        }
      });

      form.setFieldsValue({ ...params, group: Number(group) });
      dispatch({
        type: 'performanceConfig/search',
        payload: { searchData: { group: group } },
      });
    } else {
      dispatch({
        type: 'performanceConfig/search',
        payload: { searchData: { group: 1 } },
      });
    }
  }, [query]);

  const confirmPost = async () => {
    const values = form.getFieldsValue();
    const { group } = values;
    const currentEnum: any = PERFORMANCEGROUP.key(Number(group));
    const mapObj = JSON.parse(JSON.stringify(mapForm[currentEnum.code]));
    let params: ObjParams = {};
    if (query && query.id) {
      params[mapObj.key] = {
        id: query.id,
      };
    } else {
      params[mapObj.key] = {};
    }

    mapObj.data.forEach((element: string) => {
      let valArr = [];
      for (var i = 0; i < 5; i++) {
        valArr.push(values[`${element}[${i}]`]);
      }
      params[mapObj.key][element] = valArr.join(',');
    });
    const resp = await api.editRule({
      ...params,
      group,
    });

    if (resp && resp.data) {
      message.success('编辑成功');
      history.push(`/performanceConfig`);
    }
  };

  const typeChange = (value: number) => {
    dispatch({
      type: 'performanceConfig/search',
      payload: { searchData: { group: value } },
    });
  };

  return {
    typeChange,
    skuList,
    confirmPost,
    form,
  };
};
