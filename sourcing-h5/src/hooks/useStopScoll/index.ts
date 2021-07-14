import {useEffect} from 'react';

export default (visible: boolean) => {
  useEffect(() => {
    const root: any = document.querySelectorAll('body')[0];
    const {style} = root;
    if (visible) {
      style.overflow = 'hidden';
    }
    return () => {
      style.overflow = 'auto';
    };
  }, [visible]);
};
