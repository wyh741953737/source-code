import { useState } from 'react';

export default () => {
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState<number | undefined>();
  const [discount, setDiscount] = useState<number | undefined>();
  const [category, setCategory] = useState<any>();

  function showMenu() {
    setVisible(true);
  }

  function unshow() {
    setVisible(false);
  }

  function setFilterType(item: number) {
    if (type === item) {
      setType(undefined);
      return;
    }
    setType(item);
  }

  function setFilterDiscount(item: number) {
    if (discount === item) {
      setDiscount(undefined);
      return;
    }
    setDiscount(item);
  }

  return {
    visible,
    showMenu,
    unshow,
    type,
    setFilterType,
    discount,
    setFilterDiscount,
    category,
    setCategory,
  };
};
