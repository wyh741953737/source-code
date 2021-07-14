import React, { DetailedReactHTMLElement, useRef } from 'react';
import { Button, Form } from 'antd';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons/lib';
import './index.less';
import classnames from 'classnames';
import { FormListFieldData } from 'antd/lib/form/FormList';

interface FormListProps {
  /**
   * 列表名称，用于取值
   */
  name?: string;
  /**
   * 最小行数
   */
  min?: number;
  /**
   * 最大行数
   */
  max?: number;
  /**
   * 样式名
   */
  className?: string;
  /**
   * 隐藏添加按钮
   */
  hideAdd?: boolean;
  /**
   * 每行的渲染方式
   * @param field
   */
  renderItem: (
    field: FormListFieldData,
    index: number,
    fields: Array<FormListFieldData>,
    operates: {
      add: () => void;
      remove: () => void;
    },
  ) => React.ReactNode;
  /**
   * 删除按钮的显示逻辑
   * @param index
   * @param field
   * @param fields
   */
  closeFilter?: (
    index: number,
    field: FormListFieldData,
    fields: Array<FormListFieldData>,
  ) => boolean;
  /**
   * 自定义删除按钮
   */
  closeIcon?: React.ReactComponentElement<any>;
  listProps?: any;
}

const FormList: React.FC<FormListProps> = props => {
  let {
    name = '',
    min = 0,
    max = Infinity,
    renderItem,
    closeFilter,
    className,
    closeIcon,
    listProps,
    hideAdd,
  } = props;
  if (min < 0) min = 0;
  const cls = classnames({
    ['custom-form-list']: true,
    [className || '']: !!className,
  });
  const timer = useRef<any>();
  return (
    <Form.List name={name} {...listProps}>
      {(fields, { add, remove }) => {
        if (fields.length < min) {
          clearTimeout(timer.current);
          timer.current = setTimeout(() => add(min), 0);
        }
        return (
          <div className={cls}>
            {fields.map((field, index) => {
              const closeBtn = React.cloneElement(
                closeIcon || <CloseOutlined />,
                {
                  ...closeIcon?.props,
                  title: '删除',
                  className: 'custom-form-list-item-del',
                  onClick: () => remove(field.name),
                },
              );
              return (
                <div className={'custom-form-list-item'} key={field.key}>
                  {renderItem(field, index, fields, {
                    add,
                    remove: () => remove(field.name),
                  })}
                  {closeFilter && closeFilter(index, field, fields) && closeBtn}
                  {!closeFilter && closeBtn}
                </div>
              );
            })}
            {!hideAdd && fields.length < max && (
              <Form.Item>
                <Button type="dashed" block onClick={() => add()}>
                  <PlusOutlined /> 添加
                </Button>
              </Form.Item>
            )}
          </div>
        );
      }}
    </Form.List>
  );
};
export default FormList;
