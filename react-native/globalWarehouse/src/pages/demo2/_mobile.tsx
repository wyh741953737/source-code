import React, { useEffect, useState, useRef } from 'react';
import { CJView, CJImage, CJText, CJIcon } from '@/components/baseUI';
import { CJHeader, CJListView, CJEmptyData } from '@/components/mobile';
import { getRouteParams } from '@/utils/tools';
import { toDemo3 } from '@/utils/location';
import img from '@/assets/images/test.png';
import styles from './styles';

interface Item {
  id: number;
  name: string;
  img: string;
}

const pageId = 'demo002';

export default (props: any) => {
  console.log(props);

  console.log(getRouteParams(props));

  const [column, setColumn] = useState<number>(2);
  const [dataSource, setDataSource] = useState<Item[] | null>(null);
  const pageNumRef = useRef<number>(1);
  const pageSize = 10;

  useEffect(() => {
    (async () => {
      await getDataList();
    })();
    return () => setDataSource([]);
  }, []);

  // 获取数据列表
  const getDataList = async () => {
    const dataList = await requestDataList(pageNumRef.current, pageSize);
    const _dataList = viewDataProcess(dataList);
    if (pageNumRef.current === 1) {
      setDataSource(_dataList);
    } else {
      setDataSource((data: any) => [...data, ..._dataList]);
    }
  };

  // 渲染单项
  const renderRow = (item: Item) => (
    <CJView
      className={column === 1 ? styles.item : styles.item_column}
      onClick={toDemo3}
    >
      <CJImage
        className={column === 1 ? styles.img : styles.img_column}
        source={item.img}
      />
      <CJText className={styles.name}>{item.name}</CJText>
    </CJView>
  );

  // 下拉刷新
  const handleRefresh = async () => {
    console.log('刷新');
    pageNumRef.current = 1;
    await getDataList();
  };

  // 上拉加载
  const handleLoadMore = async () => {
    console.log('加载');
    pageNumRef.current += 1;
    if (pageNumRef.current <= 3) {
      await getDataList();
    }
  };

  return (
    <>
      <CJHeader
        title="ListView长列表"
        right={
          <CJIcon
            name="icondaili-FreeSuppliers"
            color="#333"
            onClick={() => setColumn((col) => (col === 1 ? 2 : 1))}
          />
        }
      />
      <CJView className={styles.warp}>
        <CJListView
          key={column}
          numColumns={column}
          dataSource={dataSource}
          renderRow={renderRow}
          refresh={handleRefresh}
          loadMore={handleLoadMore}
          hasMore={pageNumRef.current < 3}
          emptyDataComponent={<CJEmptyData />}
        />
      </CJView>
    </>
  );
};

// 请求数据列表
const requestDataList = (pageNum: number, pageSize: number): Promise<Item[]> =>
  new Promise((resolve) => {
    const dataList: Item[] = [];
    setTimeout(() => {
      const start = pageNum >= 1 ? (pageNum - 1) * pageSize : pageNum;

      for (let i = start; i < pageNum * pageSize; i++) {
        dataList.push({ id: i, name: `商品名称${i}`, img });
      }

      resolve(dataList);
    }, 1200);
  });

// 曝光埋点数据处理
const viewDataProcess = (dataList: any[]) => {
  if (!Array.isArray(dataList)) {
    return [];
  }

  return dataList?.map((item) => ({
    ...item,
    _tracking: {
      pageId,
      id: item.id, // id 必传，埋点工具需要
      eventType: 0,
      productId: item.id,
      productName: item.name,
      eventId: `${pageId}-03`,
    },
  }));
};
