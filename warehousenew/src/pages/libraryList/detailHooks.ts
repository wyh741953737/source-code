import React, { useEffect, useState } from 'react';

export const indexHooks = (currentItem: any, dispatch: any) => {
  const [initData, setInitData] = useState<any>();
  useEffect(() => {
    dispatch({
      type: 'libraryListItem/search',
      payload: { searchData: { batchNumber: currentItem.params } },
    });
    getInitData(currentItem);
  }, []);

  const getInitData = async (currentItem: any) => {
    const { data } = await dispatch({
      type: 'libraryList/getDeatil',
      payload: {
        data: { storehouseId: currentItem.warehouseId, id: currentItem.params },
        pageNum: 1,
        pageSize: 1,
      },
    });
    console.log(data);
    if (data.content && data.content.length > 0) {
      setInitData(data.content[0]);
    }
  };
  const onChange = (page: number, pageSize?: number | undefined) => {
    dispatch({
      type: 'libraryListItem/search',
      payload: {
        pageNumber: page,
        pageSize,
      },
    });
  };
  const back = () => {
    history.back();
  };
  return {
    onChange,
    back,
    initData,
  };
};
