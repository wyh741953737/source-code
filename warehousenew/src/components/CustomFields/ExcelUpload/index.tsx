import React, { FC, useEffect, useState } from 'react';
import { Dropdown, Menu, message, Modal, Upload } from 'antd';
import { RcFile } from 'antd/lib/upload/interface';
import * as xlsx from 'xlsx';
import { LoadingOutlined } from '@ant-design/icons/lib';

interface Props {
  // 模板下载路径
  templateHref: string;
  // 模板名称
  templateName: string;
  // 导入名称
  buttonName?: string;
  // 是否禁用
  disabled?: boolean;
  // 行描述
  columns: Column[];
  // 上传方法，可以不传
  upload?: (validValues: Array<any>, values: Array<any>) => Promise<any>;
  // 是否忽略报错项，upload中validValues只有非报错项
  ignoreError?: boolean;
  value?: ValueItem[] | undefined;
  onChange?: (value: ValueItem[] | undefined) => void;
  isShowList?: boolean;
}

interface ValueItem {
  [n: string]: string | number;
}

// 行描述
export interface Column {
  // 表头名字
  title: string;
  // 对应的转换名字，一般对应接口字段名
  name: string;
  // 校验方法
  validate: (value: any) => { value?: any; err?: string };
}

const ExcelUpload: FC<Props> = ({
  templateHref,
  templateName,
  buttonName,
  columns,
  upload,
  disabled,
  ignoreError,
  value,
  onChange,
  isShowList = false,
}) => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [val, setVal] = useState<ValueItem[] | undefined>();
  useEffect(() => {
    setVal(value);
  }, [value]);
  const change = (e: ValueItem[] | undefined) => {
    onChange && onChange(e);
    setVal(e);
  };
  const isDisabled = disabled || uploading;
  const menu = (
    <Menu>
      <Menu.Item>
        <a href={templateHref} download={templateName}>
          下载模板
        </a>
      </Menu.Item>
    </Menu>
  );
  const onBeforeUpload = (file: RcFile) => {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      setUploading(true);
      const data = new Uint8Array(e.target.result);
      const workbook = xlsx.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const firstSheet = workbook.Sheets[firstSheetName];
      const firstRow: Array<string> = xlsx.utils.sheet_to_json(firstSheet, {
        header: 1,
      })[0] as Array<string>;
      console.log(firstRow, 'firstRow======');
      const invalid = !!columns.find((c, i) => {
        console.log(c.title, firstRow[i]);
        return c.title !== firstRow[i];
      });
      if (invalid) {
        setUploading(false);
        return message.error('上传的模板格式不正确，请参考模板');
      }
      const result = xlsx.utils.sheet_to_json(firstSheet);
      if (result.length === 0) {
        setUploading(false);
        return message.error('上传文件中未找到数据，请填写数据后再上传');
      }
      const errors: Array<string> = [];
      const errorsIndexData: Array<number> = [];
      const values: Array<any> = [];
      result.map((item: any, index) => {
        let temp: { [n: string]: string } = {};
        columns.map(c => {
          const v = c.validate(item[c.title]);
          if (v.err) {
            if (errorsIndexData.indexOf(index) === -1) {
              errorsIndexData.push(index);
            }
            return errors.push(`第${index + 1}行，${c.title}：${v.err}`);
          }

          temp[c.name] = v.value;
        });

        values.push(temp);
      });

      const _upload = () => {
        const validValues = values.filter((item, index) => {
          return errorsIndexData.indexOf(index) === -1;
        });
        change(validValues);
        upload &&
          upload(validValues, values)
            .then(e => {
              setUploading(false);
            })
            .catch(e => setUploading(false));
      };

      if (errors.length == 0) return _upload();
      const args = {
        title: '导入字段验证错误信息',
        content: (
          <div style={{ maxHeight: 500, overflow: 'auto' }}>
            {errors.map((e, i) => (
              <div key={i}>{e}</div>
            ))}
          </div>
        ),
      };
      if (ignoreError) {
        Modal.confirm({
          ...args,
          onOk: _upload,
          okText: '过滤错误并继续上传',
        });
      } else {
        setUploading(false);
        return Modal.error(args);
      }
    };
    reader.readAsArrayBuffer(file);
    return false;
  };
  return (
    <Dropdown.Button overlay={menu} disabled={isDisabled}>
      <Upload
        showUploadList={isShowList}
        accept={'.xlsx,.xls'}
        beforeUpload={onBeforeUpload}
        disabled={isDisabled}
      >
        {uploading && <LoadingOutlined />}
        &nbsp;{buttonName || '导入'}
      </Upload>
    </Dropdown.Button>
  );
};
export default ExcelUpload;
