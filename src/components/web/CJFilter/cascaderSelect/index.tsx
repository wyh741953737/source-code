/**
 * 多级选中组件
 * */

import React, { useState } from 'react';
import basicData from '@/components/web/CJFilter/cascaderSelect/data';
import MultiLevel from '@/components/web/CJFilter/cascaderSelect/multiLevel';
import styles from './index.less';
import { AllCategories } from '../type';

interface DataType {
  key: string;
  value: string;
}

interface Props {
  onchange?: (a: string[], b: DataType[]) => void;
  options: AllCategories[];
}

const CascaderSelect = ({ onchange, options }: Props) => {
  const [dataArr, setDataArr] = useState<any>([]);
  /** 处理数据 */
  const dealData = (data: any) =>
    data.map((item: any) => ({
      ...item,
      key: item.id,
      value: item.nameEn,
    }));
  const data = dealData(options);
  /** 选中的回调  把数据传输到外层 */
  const onSelect = (selectedData: any) => {
    const temp = [...dataArr];
    temp.push({
      ...selectedData,
      children: dealData(selectedData.children || []),
    });
    setDataArr(temp);
    outPutData(temp);
    // console.log(temp, 'ssss');
  };
  /** 点击节点的回调,只有不是最后一个节点才会有 */
  const nodeCheck = (id: string) => {
    const nowIndex = dataArr.findIndex((item: any) => item.key === id);
    const newArr = dataArr.splice(0, nowIndex + 1);
    setDataArr(newArr);
    outPutData(newArr);
  };
  /** 定义一个函数,把返回值传输出去 */
  const outPutData = (data: any) => {
    // 取出全部选中的key
    const keys = data.map((item: any) => item.key);
    // 调用外部onchange方法
    onchange && onchange(keys, data);
  };
  return (
    <div className={styles.cascaderSelect}>
      {!dataArr.length && (
        <div className="cascader-inner">
          <MultiLevel
            initValue="All Categories"
            initKey=""
            options={data}
            isLast={true}
            onchange={onSelect}
          />
        </div>
      )}
      {dataArr.map((item: any, index: number) => (
        <div className="cascader-inner" key={item.key}>
          <MultiLevel
            initValue={item.value}
            initKey={item.key}
            options={item.children || []}
            isLast={
              index === dataArr.length - 1 ||
              (index === 0 && dataArr.length === 0)
            }
            nodeCheck={nodeCheck}
            onchange={onSelect}
          />
        </div>
      ))}
    </div>
  );
};

export default CascaderSelect;
