import { useState } from 'react';

export default (): any => {
  const [open, setOpen] = useState(false);
  const [select, setSelect] = useState<any>();
  function handleSetOpen(): void {
    setOpen((v: boolean) => !v);
  }
  return { open, handleSetOpen, select, setSelect };
};
