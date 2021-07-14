import React, { FC, useState } from 'react';
import { Button } from 'antd';
import * as xlsx from 'xlsx';
import { DownloadOutlined } from '@ant-design/icons';
import { BaseButtonProps } from 'antd/lib/button/button';

type Exclude = 'onClick' | 'icon' | 'loading';

interface Props extends Omit<BaseButtonProps, Exclude> {
  /**
   * 调用的api或者处理数据逻辑
   */
  onFetch: () => Promise<[Columns[], any[], string]>;
}

const ExcelDownloadButton: FC<Props> = ({ onFetch, ...props }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const fetch = async () => {
    setLoading(true);
    try {
      const [columns, data, fileName] = await onFetch();
      exportExcel(columns, data, fileName)();
    } catch (e) {}
    setLoading(false);
  };
  return (
    <Button
      {...props}
      icon={<DownloadOutlined />}
      loading={loading}
      onClick={fetch}
    >
      下载
    </Button>
  );
};

export default ExcelDownloadButton;

interface Columns {
  /**
   * 首行头部名称
   */
  title: string;
  /**
   * 对应的字段
   */
  name: string;
  /**
   * 值的转换
   * @param value
   */
  valueFormat?: (value: any) => string;
}

export type ExcelColumns = Columns[];

/**
 * 根据后端数组，前端自己组装excel并下载
 * @param columns
 * @param data
 * @param fileName
 * @return Function 下载方法
 */
export const exportExcel = (
  columns: Columns[],
  data: any[],
  fileName: string,
) => {
  const wb = xlsx.utils.book_new();
  const list = data.map(e =>
    columns.map(c =>
      c.valueFormat ? c.valueFormat(e[c.name]) : e[c.name] || '',
    ),
  );
  const ws = xlsx.utils.aoa_to_sheet([columns.map(c => c.title), ...list]);
  xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
  return () => xlsx.writeFile(wb, fileName);
};
