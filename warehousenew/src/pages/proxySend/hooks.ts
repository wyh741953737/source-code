import { Input, message, Modal } from 'antd';
import { useEffect, useRef, useState } from 'react';
import useSearchForm from '@/hooks/useSearchForm';
import * as api from '@/services/directSend';
import { GetList } from '@/services/directSend.d';
import storage from '@/utils/storage';
import useModal from '@/hooks/useModal';
import useButton from '@/hooks/useButton';
// import printAuto from '@/components/Print';
import printAuto from '@/utils/printThree';
import { reportLocalAudio } from '@/utils/report';
import * as regExp from '@/regExp.config';
import dealPropertiesData from '@/utils/dealPropertiesData';
import { EXCEPTOUTBOUNDORDERTYPE } from '@/enum.config';
const confirmFun = (e: any) => {
  e = window.event || e;
  e.returnValue = '确定离开当前页面吗？';
};

/**
 * checked: 已检数据维护
 */
interface Checked {
  // n：sku或者sku短码，
  [n: string]: {
    count: number;
    batchIds: {
      [n: string]: number;
    };
  };
}

export const indexHooks = (warehouseId: string) => {
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);
  const containerRef = useRef<Input>(null);
  const skuRef = useRef<Input>(null);
  const [checked, setChecked] = useState<Checked>({});
  const [checkSuccess, setCheckSuccess] = useState<boolean>(false);
  const [allOrderList, setAllOrderList] = useState<Array<GetList.Record>>([]);
  const [currentProgress, setCurrentProgress] = useState<number>(1);
  const [allOrderLength, setAllOrderLength] = useState<number>(0);

  /**
   * 存储当前容器或者订单是否是单品，多品, (commodityRules  1:单品，2：一单一品 3：多品)
   * 多品按列表返回顺序正常验单，单品和一单一品按照用户扫描sku返回对应订单
   * 多品自动跳转下一单，单品不自动跳转
   * @param isSingle 用来控制是否自动加载数据,默认自动加载数据
   * @param faceType  用来保存当前订单的单品多品类型
   */
  const [isSingle, setIsSingle] = useState<boolean>(false);

  /**
   * 根据订单标识识别出面单过期订单，并弹出提示
   * @param isAbnormal 0-否 1-是
   *  */
  const identifySheetExpired = (data: any) => {
    if (data.isAbnormal) {
      const value = EXCEPTOUTBOUNDORDERTYPE.key(data.exOrderType)?.value || '';
      Modal.error({
        title: `该订单为#${value}#，请交接组长！`,
        onOk: async () => {
          try {
            const resp = await api.transferExOrder({
              ids: [data.orderId],
            });

            Array.isArray(resp.data) &&
              resp.data.length > 0 &&
              printAuto(
                resp.data.map(d => ({
                  url: d.pdf ? d.pdf : d.packPdf,
                  logisticsChannel: d.logisticsChannel,
                  orderId: d.orderId,
                  logisticsCompany: d.logisticsCompany,
                })),
              );
            await checkHasNextOrder();
          } catch (error) {
            console.log(error);
          }
        },
      });
    } else {
      if (
        searchForm.dataSource.length > 0 &&
        searchForm.dataSource[0].commodityRules != 3
      ) {
        console.log(skuRef.current?.input.value, 'skuRef.current?.input.value');
        skuRef.current?.input.value &&
          SKUEnter({
            target: {
              value: skuRef.current?.input.value,
            },
          });
      }
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => containerRef.current?.focus(), 200);
    window.addEventListener('beforeunload', confirmFun);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('beforeunload', confirmFun);
    };
  }, []);
  const searchForm = useSearchForm<GetList.Record>(
    async (cond, p) => {
      try {
        let responseData = await api.getList({
          sortedContainer: cond.searchData.containerId,
          isDF: '1',
          storehouseId: warehouseId,
        });
        setAllOrderList(responseData);
        setAllOrderLength(responseData.length);
        setCurrentProgress(1);
        let resp = JSON.parse(
          JSON.stringify(responseData),
        ) as GetList.ResponseTrans;
        if (resp.length === 0) {
          message.error('此容器没有待检订单');
          containerRef.current?.focus();
          containerRef.current?.select();
          return Promise.reject();
        }

        // 查询本地是否有缓存
        const local: Checked = await storage.dbGet(resp[0].id);
        const flag = await new Promise(resolve => {
          // 当p为true时候不走提示，直接判断flag
          if (p !== undefined) {
            resolve(!!local);
            return;
          }
          if (!local) return resolve(false);
          Modal.confirm({
            title: '提示',
            content: '此容器存在未完成验货记录，是否继续验货？',
            okText: '继续验货',
            cancelText: '不了，我要重新验货',
            onOk: () => resolve(true),
            onCancel: () => resolve(false),
          });
        });
        if (flag) {
          setChecked(local);
          // 使用本地缓存，把缓存的数据加入到原数据中，推算出退出前的状态。
          const checkedNum = Object.keys(local).reduce(
            (a, b) => a + local[b].count,
            0,
          );
          resp = [
            {
              ...resp[0],
              pendingVerify: resp[0].pendingVerify - checkedNum,
              processedVerify: resp[0].processedVerify + checkedNum,
              list: resp[0].list.map(l => {
                const skuChecked = local[l.sku];
                if (!skuChecked) return l;
                return {
                  ...l,
                  pendingVerify: l.pendingVerify - skuChecked.count,
                  processedVerify: l.processedVerify + skuChecked.count,
                };
              }),
            },
          ];
          setExpandedRowKeys([resp[0].id]);
          setTimeout(() => skuRef.current?.focus(), 1000);
          historySearch.search({ nextSearchData: { id: resp[0].id } });
          return {
            current: 1,
            pageSize: 1,
            total: 1,
            dataSource: resp,
          };
        } else {
          // 获取单品多品，来控制数据显示
          responseData[0].commodityRules != 3
            ? setIsSingle(true)
            : setIsSingle(false);

          if (responseData[0].commodityRules == 3) {
            // 重新验货
            const ids = resp ? resp.map(item => item.id) : [];
            local && (await api.undoPackRecord({ ids }));
            setAllOrderList(responseData);
            console.log(allOrderList, 'allOrderList=====136');
            setExpandedRowKeys([resp[0].id]);
            setTimeout(() => skuRef.current?.focus(), 1000);
            historySearch.search({ nextSearchData: { id: resp[0].id } });
            return {
              current: 1,
              pageSize: 1,
              total: 1,
              dataSource: resp,
            };
          } else {
            setTimeout(() => skuRef.current?.focus(), 1000);
            return {
              current: 1,
              pageSize: 1,
              total: 1,
              dataSource: [],
            };
          }
        }
      } catch (e) {
        containerRef.current?.focus();
        containerRef.current?.select();
        return Promise.reject();
      }
    },
    [],
    { noAutoFetch: true },
  );

  useEffect(() => {
    if (searchForm.dataSource.length > 0) {
      identifySheetExpired(searchForm.dataSource[0]);
    }
  }, [searchForm.dataSource[0] && searchForm.dataSource[0].id]);

  const historySearch = useSearchForm(
    async cond => {
      const resp = await api.getHistory({
        orderId: cond.searchData.id,
      });
      return {
        current: 1,
        pageSize: cond.pageSize,
        total: resp.data.length,
        dataSource: resp.data,
      };
    },
    [],
    { noAutoFetch: true, localPage: true },
  );
  // 扫描容器事件
  const containerEnter = (e: any) => {
    const containerId = e.target.value.trim();
    if (!containerId) return message.error('容器id不能为空');
    const currentDataSource = searchForm.dataSource[0];
    if (!currentDataSource) {
      return searchForm.search({ nextSearchData: { containerId } });
    }
    if (currentDataSource?.pendingVerify) {
      return Modal.confirm({
        title: '提示',
        content: '当前订单还未检验完成，确认要放弃检验么？',
        onOk: () => {
          searchForm.search({ nextSearchData: { containerId } });
        },
      });
    }
  };
  // 扫描商品SKU事件
  const SKUEnter = (e: any) => {
    skuRef.current?.focus();
    skuRef.current?.select();
    let skuId: string = e.target.value ? e.target.value.trim() : undefined;
    if (
      searchForm.dataSource.length === 0 ||
      (searchForm.dataSource.length > 0 &&
        searchForm.dataSource[0].pendingVerify === 0 &&
        searchForm.dataSource[0].commodityRules != 3)
    ) {
      const skuVal = regExp.STRINGFIRSTISMATERIAL.test(skuId)
        ? skuId
        : skuId.substring(0, skuId.length - 7);
      if (allOrderList.length === 0) {
        return message.error('请先扫描容器');
      }
      console.log(allOrderList, 'allOrderList', skuId, skuVal);
      const singleData = allOrderList.find(
        (item: any) =>
          item.list.length > 0 &&
          (String(item.list[0].sku) === String(skuVal) ||
            String(item.list[0].variantSku) === String(skuVal) ||
            String(item.list[0].sku) === String(skuId) ||
            String(item.list[0].sku) === String(skuId)),
      );
      console.log(singleData, 'singleData');
      if (!singleData) {
        return message.warn('请扫描正确的SKU!');
      }
      searchForm.setDataSource([singleData]);
      historySearch.search({ nextSearchData: { id: singleData.id } });
    } else {
      const statistics = searchForm.dataSource[0] as GetList.Record;
      if (!statistics) return message.error('请先扫描容器');
      const checker = (
        id: string,
      ): [number | undefined, GetList.ListItem | undefined] => {
        let index = undefined;
        let target = statistics.list.find((s, i) => {
          const flag =
            String(s.sku) === String(id) ||
            (String(s.variantSku) === String(id) && s.pendingVerify > 0);
          if (flag) index = i;
          return flag;
        });
        return [index, target];
      };
      // 第一次查询所有的sku没有符合的就去掉后面7个字段获取sku重新查询一般
      // 扫描的sku有可能是sku短码+批次号组成
      let [index, target] = checker(skuId);
      let batchId: string | undefined = undefined;
      if (index === undefined) {
        // skuId = skuId.substring(0, skuId.length - 7);
        // 兼容pod和sku
        skuId = regExp.STRINGFIRSTISMATERIAL.test(skuId)
          ? skuId
          : skuId.substring(0, skuId.length - 7);
        batchId = skuId ? skuId : undefined;
        if (skuId) {
          [index, target] = checker(skuId);
        }
      }
      if (index === undefined || !target) {
        reportLocalAudio(['失败']);
        return message.error('多货商品，无需验货！');
      }
      if (target.pendingVerify === 0) {
        !checkSuccess
          ? reportLocalAudio(['成功'])
          : reportLocalAudio(['校验次数大于商品']);
        if (!checkSuccess) {
          setCheckSuccess(true);
        }

        return message.error(`sku:${skuId} 已没有待验的货了`);
      }
      const newChecked = {
        ...checked,
        [skuId]: {
          count: (checked[skuId]?.count || 0) + 1,
          batchIds: batchId
            ? { [batchId]: (checked[skuId]?.batchIds[batchId] || 0) + 1 }
            : { ...checked[skuId]?.batchIds },
        },
      };
      setChecked(newChecked);
      storage.dbSet(searchForm.dataSource[0].id, newChecked);
      target = {
        ...target,
        active: Date.now(),
        pendingVerify: target.pendingVerify - 1,
        processedVerify: target.processedVerify + 1,
      };
      statistics.list.splice(index, 1);
      const newList = statistics.list.sort((a, b) => {
        return b.pendingVerify - a.pendingVerify;
      });
      const newStatistics = {
        ...statistics,
        pendingVerify: statistics.pendingVerify - 1,
        processedVerify: statistics.processedVerify + 1,
        list: [target, ...newList.map(item => ({ ...item, active: false }))],
      };
      searchForm.setDataSource([newStatistics]);
      reportLocalAudio(['成功']);
    }
    console.log(allOrderList, 'allOrderList======');
  };
  useEffect(() => {
    const current = searchForm.dataSource[0];
    if (current && current.pendingVerify === 0) {
      doPackage(true);
    }
  }, [checked]);
  // 耗材录入弹框
  const [consumableModal] = useModal<{ id: number; isLast: boolean }>({
    onOk: async (values, p) => {
      if (p.length > 0 && consumableModal.params?.id) {
        await api.consumable({
          storehousePackId: consumableModal.params?.id,
          consumablesNum: p.join(','),
        });
      }
      const skus = Object.keys(checked);
      const checkedList = searchForm.dataSource[0].list.reduce(
        (a: Array<any>, b: any) => {
          if (
            !skus.includes(String(b.sku)) &&
            !skus.includes(String(b.variantSku))
          )
            return a;
          return [
            ...a,
            {
              ...b,
              checkedNum: checked[b.sku]
                ? checked[b.sku]?.count
                : checked[b.variantSku]?.count,
            },
          ];
        },
        [],
      );
      historySearch.search();
      // 清空检验列表
      setChecked({});

      // 代发单不需要装箱明细
      // packageInfoModal.show({
      //   data: checkedList,
      //   isLast: consumableModal.params?.isLast,
      //   id: consumableModal.params?.id,
      // });
      // if (consumableModal.params?.isLast) await checkHasNextOrder();
    },
    closeAndClear: true,
  });
  // const [packageInfoModal] = useModal<{
  //   data: Array<any>;
  //   isLast?: boolean;
  //   id?: number;
  // }>({
  //   onOk: async () => {
  //     if (packageInfoModal.params?.isLast) await checkHasNextOrder();
  //   },
  // });
  // 撤销封箱
  const giveUp = async (id: string) => {
    Modal.confirm({
      title: '撤销封箱提示',
      content: '是否撤销封箱？',
      onOk: async () => {
        await api.giveUp({ id });
        message.success('撤销成功');
        historySearch.search();
        searchForm.search(undefined, true);
      },
    });
  };
  const packageBtn = useButton({
    onClick: async () => {
      const current = searchForm.dataSource[0];
      if (current && current.pendingVerify === 0) {
        doPackage(true);
      } else {
        await doPackage(false);
      }
    },
  });
  // 封箱
  const doPackage = async (isLast: boolean = false) => {
    if (Object.keys(checked).length === 0 && !isLast) {
      return message.warn('至少检验一个以上商品，才可以封箱');
    }
    const target = searchForm.dataSource[0];
    const checkedList = target.list.filter(
      t =>
        Object.keys(checked).includes(t.sku) ||
        Object.keys(checked).includes(t.variantSku),
    );
    const storehousePackByFXDTOS = checkedList.map(c => {
      // 是否订单包装商品
      const isOrder =
        c.pendingVerify + c.processedVerify ===
        c.batchSortedRecordByBZDTOS[0]?.uninspectedQuantity;
      // 此sku是否全部验单完成
      const isSkuFinished = c.pendingVerify === 0;
      const isLoadPackByPackageFXDTO = isOrder ? isSkuFinished : true;
      const checkedSku = checked[c.sku] || checked[c.variantSku];

      /**争对验单完成数量的值做一个传参校验，使其不超过当前待验量的上限 */
      const checkCount =
        checkedSku.count > c.uninspectedQuantity
          ? c.uninspectedQuantity
          : checkedSku.count;
      return {
        variantSku: c.variantSku,
        packQuantity: checkCount,
        batchId: c.batchId,
        orderDetailId: c.id,
        productType: c.productType,
        inspectionCountList: Object.keys(checkedSku.batchIds).map(b => ({
          infoBatchNum: b,
          count: checkedSku.batchIds[b],
        })),
        packByPackageFXDTO:
          c.batchSortedRecordByBZDTOS.length !== 0 && isLoadPackByPackageFXDTO
            ? c.batchSortedRecordByBZDTOS.map(b => ({
                variantSku: b.variantSku,
                batchId: b.batchId,
                packQuantity:
                  checkCount > b.uninspectedQuantity
                    ? b.uninspectedQuantity
                    : checkCount,
                orderDetailId: b.id,
                productType: b.productType,
              }))
            : undefined,
      };
    });
    if (storehousePackByFXDTOS.length === 0) {
      return;
    }

    const resp = await api.doPackage({
      orderId: target.id,
      storehouseId: target.list[0].storehouseId,
      isLast: isLast ? 1 : 0,
      sortedContainer: searchForm.searchData.containerId,
      storehousePackByFXDTOS,
    });
    if (searchForm.dataSource[0]?.id) {
      await storage.dbRemove(searchForm.dataSource[0]?.id);
    }
    // consumableModal.show({ id: resp.data, isLast }); 暂时隐藏耗材管理

    //**-----------------耗材管理内部下面逻辑 */
    const skus = Object.keys(checked);
    const newcheckedList = searchForm.dataSource[0].list.reduce(
      (a: Array<any>, b: any) => {
        if (
          !skus.includes(String(b.sku)) &&
          !skus.includes(String(b.variantSku))
        )
          return a;
        return [
          ...a,
          {
            ...b,
            checkedNum: checked[b.sku]
              ? checked[b.sku]?.count
              : checked[b.variantSku]?.count,
          },
        ];
      },
      [],
    );
    // historySearch.search();
    // 清空检验列表
    setChecked({});
    /**------------------耗材管理内部逻辑 */
    if (!isLast) {
      historySearch.search();
    }
    if (isLast) await checkHasNextOrder();
    await print(resp.data, isLast);
  };
  /**
   * 暂不打包
   */
  // const stopPackage = () => {
  //   tSContainerModal.show();
  // };
  // const [tSContainerModal] = useModal({
  //   onOk: async () => {
  //     await api.noPack({});
  //     await checkHasNextOrder();
  //   },
  //   closeAndClear: true,
  // });
  /**
   * 打印面单
   * @param id 包裹id(表id)
   * @param isLast 是否订单最后的自动封箱
   */
  const print = async (id: string, isLast: boolean) => {
    // 获取打印的pdf的url地址，并打开
    // url可能是面单pdf、包裹码pdf
    const resp = await api.printListTwo({
      ids: [id],
    });
    if (resp.data.length > 0) {
      printAuto(
        resp.data.map(d => ({
          url: d.pdf ? d.pdf : d.packPdf,
          logisticsChannel: d.logisticsChannel,
          orderId: d.orderId,
          logisticsCompany: d.logisticsCompany,
        })),
        () => {
          skuRef.current?.focus();
          skuRef.current?.select();
        },
      );

      skuRef.current?.focus();
      skuRef.current?.select();
    }
    // printAuto([{ title: '封箱面单/包裹编号打印', url: resp.data }]);
  };
  /**
   * 查看还有没有下个订单，存在就拉去下个订单，如果不存在就清掉所有数据，等待再次扫容器
   */
  const checkHasNextOrder = async (isJump: boolean = false, target?: any) => {
    // 判断单品多品
    if (isSingle) {
      // 根据id找到当前订单进行过滤删除
      const nextDataSource = allOrderList.filter(item => {
        return item.id != searchForm.dataSource[0].id;
      });
      if (isJump) {
        // 判断当前订单是自动跳转还是手动跳过
        nextDataSource.push(target);
      }
      console.log(nextDataSource, '512,checkhasNextOrder');
      setAllOrderList(nextDataSource);

      console.log(allOrderList, '522,checkhasNextOrder');
      if (nextDataSource.length === 0) {
        setCurrentProgress(1);
        // setAllOrderList([]);
        searchForm.resetSearchForm();
        // historySearch.resetSearchForm();
        message.success('当前容器已经全部验完，您可以扫描容器后继续验货！');
        containerRef.current?.focus();
        containerRef.current?.select();
      } else {
        !isJump && setCurrentProgress(currentProgress + 1);
        if (isJump) {
          searchForm.setDataSource([]);
          historySearch.resetSearchForm();
        }

        skuRef.current?.focus();
        skuRef.current?.select();
        searchForm.form.setFieldsValue({ skuId: '' });
      }
    } else {
      const nextDataSource = [...allOrderList];
      nextDataSource.shift();
      if (isJump) {
        // 判断当前订单是自动跳转还是手动跳过
        nextDataSource.push(target);
      }
      console.log(nextDataSource, '512,checkhasNextOrder');
      setAllOrderList(nextDataSource);

      console.log(allOrderList, '522,checkhasNextOrder');
      if (nextDataSource.length > 0) {
        !isJump && setCurrentProgress(currentProgress + 1);
        searchForm.setDataSource([{ ...nextDataSource[0] }]);
        historySearch.resetSearchForm();
        historySearch.search({ nextSearchData: { id: nextDataSource[0].id } });
        skuRef.current?.focus();
        skuRef.current?.select();
        searchForm.form.setFieldsValue({ skuId: '' });
        message.success('已为您拉取下个订单待检数据，请继续验货');
      } else {
        setCurrentProgress(1);
        setAllOrderList([]);
        searchForm.resetSearchForm();
        historySearch.resetSearchForm();
        message.success('当前容器已经全部验完，您可以扫描容器后继续验货！');
        containerRef.current?.focus();
        containerRef.current?.select();
      }
    }
  };
  // 跳过当前订单
  const jumpNextOrder = useButton({
    onClick: async () => {
      const target = searchForm.dataSource[0];
      if (!target) return;
      await checkHasNextOrder(true, target);
    },
  });

  //提交异常
  const submitAbnormalBtn = useButton({
    onClick: async () => {
      const target = searchForm.dataSource[0];
      if (!target) return;
      if (target.pendingVerify === 0) return;
      await new Promise(resolve => {
        Modal.confirm({
          title: '提交异常',
          content: `该订单缺货${target.pendingVerify}件，确定提交到异常吗？`,
          okText: '提交',
          cancelText: '关闭',
          onCancel: () => resolve(''),
          onOk: async () => {
            try {
              const resp = await api.submitAbnormal(
                target.list.reduce((a, b) => {
                  if (b.pendingVerify === 0) return a;
                  return [
                    ...a,
                    {
                      orderId: b.orderId,
                      outboundOrderDetailId: b.id,
                      sku: b.variantSku,
                      imgUrl: b.variantImg,
                      variantId: b.variantId,
                      quantity: b.pendingVerify,
                      storehouseId: b.storehouseId,
                      batchNumber: b.batchId,
                      isFirstOrder: b.isFirstOrder,
                    },
                  ];
                }, [] as Array<any>),
              );

              Array.isArray(resp.data) &&
                resp.data.length > 0 &&
                printAuto(
                  resp.data.map(d => ({
                    title: '打印面单',
                    url: d.pdf ? d.pdf : d.packPdf,
                    logisticsChannel: d.logisticsChannel,
                    orderId: d.orderId,
                    logisticsCompany: d.logisticsCompany,
                  })),
                  () => {
                    skuRef.current?.focus();
                    skuRef.current?.select();
                  },
                );
              await checkHasNextOrder();
            } catch (e) {}
            resolve('');
          },
        });
      });
    },
  });

  //结束验货
  const endCheckGoods = useButton({
    onClick: async () => {
      if (allOrderList.length === 0) return;
      await new Promise(resolve => {
        Modal.confirm({
          title: '结束验货',
          content: `确定将该容器中剩余订单提交到缺货异常`,
          okText: '提交',
          cancelText: '关闭',
          onCancel: () => resolve(),
          onOk: async () => {
            try {
              const resp = await api.endCheckGoods({
                orderIds: allOrderList.map(d => d.orderId),
              });

              setCurrentProgress(1);
              setAllOrderList([]);
              searchForm.resetSearchForm();
              historySearch.resetSearchForm();
              message.success(
                '当前容器中剩余订单已提交到缺货异常，您可以扫描容器后继续验货！',
              );
              containerRef.current?.focus();
              containerRef.current?.select();
              Array.isArray(resp.data) &&
                resp.data.length > 0 &&
                printAuto(
                  resp.data.map(d => ({
                    url: d.pdf ? d.pdf : d.packPdf,
                    logisticsChannel: d.logisticsChannel,
                    orderId: d.orderId,
                    logisticsCompany: d.logisticsCompany,
                  })),
                  () => {
                    containerRef.current?.focus();
                    containerRef.current?.select();
                  },
                );
            } catch (e) {}
            resolve();
          },
        });
      });
    },
  });
  // 是否存在封箱记录
  const hasHistory = historySearch.dataSource.length > 0;
  // 是否当前订单全部检验完成
  const hasAllChecked =
    !!searchForm.dataSource[0] && searchForm.dataSource[0].pendingVerify === 0;

  const [gxhOrderModal] = useModal();
  const [gxhProductModal] = useModal();

  const showCustomerInfo = async (data: any) => {
    console.log(data, 'data=======');
    const resp = await api.getPODProductProperties({
      orderId: data.orderId,
      podSku: data.variantSku,
      orderDetailId: data.id,
    });
    if (resp.data && resp.data.properties) {
      const customerInfo = dealPropertiesData(
        resp.data?.properties,
        'product',
        data,
      );
      gxhProductModal.show(customerInfo);
    } else {
      message.error('没有查到对应的客户定制信息');
    }
  };
  return {
    searchForm,
    containerEnter,
    SKUEnter,
    containerRef,
    skuRef,
    historySearch,
    giveUp,
    doPackage,
    packageBtn,
    checked,
    consumableModal,
    // packageInfoModal,
    submitAbnormalBtn,
    // stopPackage,
    // tSContainerModal,
    hasHistory,
    hasAllChecked,
    allOrderList,
    currentProgress,
    jumpNextOrder,
    allOrderLength,
    isSingle,
    endCheckGoods,
    showCustomerInfo,
    gxhOrderModal,
    gxhProductModal,
  };
};
