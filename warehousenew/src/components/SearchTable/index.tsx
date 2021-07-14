import React, { CSSProperties, ReactElement } from 'react';
import style from './index.less';
import classnames from 'classnames';
import { Button, Space } from 'antd';

interface SearchTableProps {
  className?: string;
  searchFormRender: React.ReactNode;
  operateBtnRender?: React.ReactNode;
  children: React.ReactNode;
  searchBtn?: SearchBtn;
  formStyle?: CSSProperties;
  formMaxWidth?: number;
}

type SearchBtn = false | SearchBtnConfig | ReactElement;
type SearchBtnConfig = {
  onSearch: () => void;
  onClearSearch?: () => void;
};
export default ({
  className,
  searchFormRender,
  operateBtnRender,
  children,
  searchBtn,
  formStyle,
  formMaxWidth,
}: SearchTableProps) => {
  const cls = classnames({
    [style['search-table']]: true,
    [String(className)]: !!className,
  });
  return (
    <div className={cls}>
      <div className={style['search-content']}>
        <div
          className={style['search-form']}
          style={{ ...formStyle, maxWidth: formMaxWidth }}
        >
          {searchFormRender}
        </div>
        <SearchBtnRender searchBtn={searchBtn} />
      </div>
      <div className={style['operate-btns']}>
        <Space>{operateBtnRender}</Space>
      </div>
      {children}
    </div>
  );
};
export const SearchBtnRender = ({
  searchBtn,
  inline,
  children,
}: {
  searchBtn?: SearchBtn;
  inline?: boolean;
  children?: React.ReactComponentElement<any>;
}) => {
  if (!searchBtn) return null;
  if (React.isValidElement(searchBtn)) return searchBtn;
  const cls = classnames({
    [style['search-btns']]: true,
    [style.inline]: !!inline,
  });
  return (
    <div className={cls}>
      <Button type="primary" onClick={searchBtn?.onSearch}>
        搜索
      </Button>
      {searchBtn?.onClearSearch ? (
        <Button onClick={searchBtn?.onClearSearch}>重置</Button>
      ) : null}
      {children}
    </div>
  );
};
