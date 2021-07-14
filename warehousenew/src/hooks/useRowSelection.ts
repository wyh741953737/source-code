import React, { useState } from 'react';
import { TableRowSelection } from 'antd/lib/table/interface';

interface Selected {
  keys: string[];
  rows: any[];
}

type SetSelected = React.Dispatch<React.SetStateAction<Selected>>;

/**
 * table的rowSelection属性封装，后期有需要可以继续封装更多属性，注意兼容性
 * @param other 覆盖原有属性
 */
export default function useRowSelection<T = any>(
  other?: TableRowSelection<T>,
): [TableRowSelection<T>, Selected, SetSelected] {
  const [selected, setSelected] = useState<Selected>({
    keys: [],
    rows: [],
  });
  const onChange = (keys: any, rows: any) => {
    setSelected({ keys, rows });
  };
  return [
    { fixed: true, onChange, selectedRowKeys: selected.keys, ...other },
    selected,
    setSelected,
  ];
}
