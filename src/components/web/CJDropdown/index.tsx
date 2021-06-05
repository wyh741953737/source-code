import { IconFont } from '@/global';
import React, { useEffect, useRef, useState } from 'react';
import ReactDom from 'react-dom';
import styles from './styles';

/** 数据子节点 */
export interface ChildObj {
  /** 节点label */
  label: string;
  /** 节点value */
  value?: string;
  /** 跳转路径，如果传了url和handleClick，url跳转将不生效 */
  url?: string;
  /** 图标 */
  icon?: string;
  /** 节点点击事件,如果传了url和handleClick，url跳转将不生效 */
  handleClick?: (arg?: ChildObj) => void;
  /** 子节点数据 */
  children?: Array<ChildObj>;
  /** 其他参数 */
  [name: string]: any;
}

interface WProps {
  /** 下拉菜单对齐方式 */
  placement?: 'left' | 'center' | 'right';
  /** 触发方式 */
  trigger?: 'hover' | 'click';
  /** 菜单数据 */
  data?: Array<ChildObj>;
  /** 子节点 */
  children?: Array<any> | any;
  /** 标题 */
  title?: string | any;
}

/** 下拉菜单 */
const DropMenu = (props: WProps): any => {
  const {
    placement = 'left',
    trigger = 'hover',
    children,
    data = [],
    title,
  } = props;
  const menuRef: any = useRef(); // 菜单展示容器
  const dropContainerRef: any = useRef(); // 下拉菜单容器
  const unshowTimerRef: any = useRef(); // 延迟关闭菜单的timer
  const showTimerRef: any = useRef(); // 延迟展示菜单的timer
  const [visible, setVisible] = useState(false); // 菜单展示状态

  useEffect(() => {
    document.body.addEventListener('click', delayHide);
    document.addEventListener('scroll', hide);
    return (): void => {
      document.body.removeEventListener('click', delayHide);
      document.removeEventListener('scroll', hide);
    };
  }, []);

  function getDropdownPos(): any {
    const menuPos = menuRef.current?.getBoundingClientRect();
    const { width } = dropContainerRef.current.getBoundingClientRect();
    if (placement === 'left') {
      return { left: `${menuPos.left}px`, top: `${menuPos.bottom}px` };
    }

    if (placement === 'center') {
      return {
        left: `${menuPos.left + (menuPos.width - width) / 2}px`,
        top: `${menuPos.bottom}px`,
      };
    }
    if (placement === 'right') {
      return {
        left: `${menuPos.left + (menuPos.width - width)}px`,
        top: `${menuPos.bottom}px`,
      };
    }
  }

  /** 展示菜单 */
  function showMenu(): void {
    if (!data.length && !children?.length) return;

    unshowTimerRef.current && clearTimeout(unshowTimerRef.current); // 展示菜单的时候，如果有正在延迟关闭菜单的定时器，清除定时器，禁止关闭
    showTimerRef.current && clearTimeout(showTimerRef.current); // 展示菜单的时候，如果有正在延迟展示菜单的定时器，清除定时器，重新来过

    let container = dropContainerRef.current;
    if (!container) {
      const domNode = (
        <div
          ref={dropContainerRef}
          className={`${styles.itemContainer} ${styles.boxStyle}`}
          onMouseEnter={mouseEnter}
          onMouseLeave={mouseLeave}
        >
          {renderItem(data, children)}
        </div>
      );
      const divNode = document.createElement('div');
      document.body.appendChild(divNode);
      ReactDom.render(domNode, divNode);
      container = dropContainerRef.current;
      container.classList.add(styles.hide);
      showTimerRef.current = setTimeout(() => {
        show();
      }, 50); // 添加延迟，呈现展示菜单动画
    } else {
      show();
    }
    setVisible(true);
  }

  /** 定位并展示下拉 */
  function show(): void {
    const container = dropContainerRef.current;
    if (!container) return;
    const { left, top } = getDropdownPos();
    container.style.left = left;
    container.style.top = top;
    container.classList.remove(styles.hide);
    container.classList.add(styles.show);
  }

  function hide(): void {
    const container = dropContainerRef.current;
    if (!container) return;
    container.classList.remove(styles.show);
    container.classList.add(styles.hide);
    setVisible(false);
  }

  /** 延时隐藏菜单 */
  function delayHide(): void {
    unshowTimerRef.current && clearTimeout(unshowTimerRef.current);
    unshowTimerRef.current = setTimeout(hide, 50); // 加延迟为了鼠标移到下拉菜单时仍能展示下拉菜单
  }

  /** 鼠标滑入 */
  function mouseEnter(): void {
    if (trigger === 'click') return;
    showMenu();
  }

  /** 鼠标移出 */
  function mouseLeave(): void {
    if (trigger === 'click') return;
    delayHide();
  }

  /** 点击事件 */
  function handleClick(e: React.MouseEvent): void {
    e.stopPropagation();
    if (trigger === 'hover') return;
    visible && delayHide();
    !visible && showMenu();
  }

  return (
    <div
      className={styles.dropdownMenu}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      onClick={handleClick}
      ref={menuRef}
    >
      {!!title && typeof title === 'string' && (
        <div
          className={`${styles.menuTitle} ${
            visible ? styles.menuVisible : null
          }`}
        >
          {title}
        </div>
      )}
      {!!title && typeof title !== 'string' && title}
    </div>
  );
};

/** 子节点属性 */
interface ItemProps {
  /** 节点label */
  label: string;
  /** 节点value */
  value?: string;
  /** 跳转路径 */
  url?: string;
  /** icon图标 */
  icon?: string;
  /** 数据子节点 */
  data?: ChildObj;
  /** 子节点 */
  children?: Array<object> | object;
}

/** 子节点 */
const Item = (props: ItemProps): any => {
  const { data, children, label, url, icon } = props;

  /** 是否有子节点 */
  const hasChildren = !!data?.children?.length || !!children;
  const [visible, setVisible] = useState(false);

  function showMenu(): void {
    setVisible(true);
  }

  function delayHide(): void {
    setVisible(false);
  }

  return (
    <div
      onMouseEnter={showMenu}
      onMouseLeave={delayHide}
      className={styles.menuItem}
    >
      <a
        onClick={() => {
          data?.handleClick && data?.handleClick(data);
        }}
        href={data?.handleClick ? undefined : url}
      >
        <div className={styles.itemSelf}>
          <span className={styles.icon_text}>
            {icon && <IconFont type={icon} className={styles.icon} />}
            <span className={styles.selfText}>{label}</span>
          </span>
          {hasChildren && <span className={styles.rightArrow} />}
        </div>
      </a>
      {hasChildren && (
        <div
          className={`${styles.itemChildren} ${styles.boxStyle} ${
            visible ? styles.show : styles.hide
          }`}
        >
          {renderItem(data?.children, children)}
        </div>
      )}
    </div>
  );
};

/**
 * 渲染子节点
 * @param childData 下拉菜单数据
 * @param childNodes 外部渲染的React子节点
 */
const renderItem = (childData: Array<ChildObj> = [], childNodes: any): any => {
  if (childNodes) return childNodes;
  return childData?.map((item: ChildObj, index: number) => (
    <Item
      key={item.value || index}
      label={item.label}
      url={item.url}
      icon={item.icon}
      data={item}
    />
  ));
};

DropMenu.Item = Item;

export default DropMenu;
