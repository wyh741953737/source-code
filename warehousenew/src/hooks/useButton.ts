import { useState } from 'react';

/**
 * 用于点击按钮有异步执行逻辑的情况使用
 */
interface Props {
  onClick?: (...args: any) => Promise<any>;
}

export default function useButton(props: Props = {}) {
  const [loading, setLoading] = useState<boolean>(false);
  const onClick = async (...args: any) => {
    if (!props.onClick) return;
    setLoading(true);
    try {
      await props.onClick(...args);
    } catch (e) {}
    setLoading(false);
  };
  return {
    loading,
    setLoading,
    onClick,
  };
}
