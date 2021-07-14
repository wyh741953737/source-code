import React, { useEffect } from 'react';
import * as api from '@/services/libraryList';

export const indexHooks = (params: string, dispatch: any) => {
  useEffect(() => {
    dispatch({
      type: 'libraryListDetail/search',
      payload: { searchData: { batchNumber: params } },
    });
  }, []);
  const onChange = (page: number, pageSize?: number | undefined) => {
    dispatch({
      type: 'libraryListDetail/search',
      payload: {
        pageNumber: page,
        pageSize,
      },
    });
  };

  // 释放
  const release = async (id: string) => {
    const result = await api.skipOrderReleaseInventory({ id });
    if (result.code === 200) {
      dispatch({
        type: 'libraryListDetail/search',
        payload: { searchData: { batchNumber: params } },
      });
    }
  };
  // 返回
  const back = () => {
    history.back();
  };

  return {
    onChange,
    back,
    release,
  };
};
