import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

/**
 * useEffect类似，只不过第一次不执行
 * @param effect useEffect第一个入参
 * @param deps useEffect第二个入参
 */
function useChanged(effect: EffectCallback, deps: DependencyList) {
  const isFirst = useRef<boolean>(true);
  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    return effect();
  }, deps);
}

export default useChanged;
