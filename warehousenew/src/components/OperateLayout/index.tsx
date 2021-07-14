import React from 'react';
import style from './index.less';
import { Empty, Form } from 'antd';
import { FormInstance } from 'antd/lib/form/hooks/useForm';
import classnames from 'classnames';

interface Props {
  title: string;
  form: FormInstance;
  className?: string;
  empty?: boolean;
  searchItems: Array<React.ReactNode>;
  children?: React.ReactNode;
  otherDescript?: React.ReactNode;
}
export default ({
  title,
  className,
  form,
  empty = true,
  searchItems,
  children,
  otherDescript,
}: Props) => {
  const cls = classnames({
    [style['operate-layout']]: true,
    [String(className)]: !!className,
  });
  return (
    <div className={cls}>
      <div className={style.header}>
        <h2>{title}</h2>
        <Form form={form} className={style.search}>
          {searchItems.map((item, index) => (
            <div key={index} className={style['search-item']}>
              {item}
            </div>
          ))}
        </Form>
        <div className={style.descript}>{otherDescript}</div>
      </div>
      {empty ? (
        <Empty style={{ marginTop: 100 }} description={false} />
      ) : (
        children
      )}
    </div>
  );
};
