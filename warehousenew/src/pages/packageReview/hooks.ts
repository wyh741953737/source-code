import { Input, message, Modal } from 'antd';
import { useEffect, useRef, useState } from 'react';
import useSearchForm from '@/hooks/useSearchForm';
import * as api from '@/services/packageReview';
import * as directApi from '@/services/directSend';
import { GetList } from '@/services/packageReview.d';
import storage from '@/utils/storage';
import useButton from '@/hooks/useButton';
// import printAuto from '@/components/Print';
import printAuto from '@/utils/printThree';
import { reportLocalAudio } from '@/utils/report';
import * as regExp from '@/regExp.config';
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
            const resp = await directApi.transferExOrder({
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
        let resp = JSON.parse(
          JSON.stringify(responseData),
        ) as GetList.ResponseTrans;
        if (resp.length === 0) {
          message.error('此容器没有待检订单');
          containerRef.current?.focus();
          containerRef.current?.select();
          return Promise.reject();
        }

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
      const resp = await directApi.getHistory({
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
        content: '当前订单还未复核完成，确认要放弃复核么？',
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
    console.log(allOrderList, 'allOrderList======');
  };
  useEffect(() => {
    const current = searchForm.dataSource[0];
    if (current && current.pendingVerify === 0) {
      doPackage(true);
    }
  }, [checked]);

  // 封箱
  const doPackage = async (isLast: boolean = false) => {
    if (Object.keys(checked).length === 0 && !isLast) {
      return message.warn('至少复核一个以上商品，才可以封箱');
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
                packQuantity: checkCount,
                orderDetailId: b.id,
                productType: b.productType,
              }))
            : undefined,
      };
    });
    if (storehousePackByFXDTOS.length === 0) {
      return;
    }

    if (isLast) {
      await api.reinspectionOrder({
        orderId: target.id,
        storehouseId: target.list[0].storehouseId,
      });
      await checkHasNextOrder();
    }
  };
  const checkHasNextOrder = async () => {
    setAllOrderList([]);
    searchForm.resetSearchForm();
    historySearch.resetSearchForm();
    message.success('复核成功');
    reportLocalAudio(['复核成功']);
    containerRef.current?.focus();
    containerRef.current?.select();
    setChecked({});
  };

  // 是否存在封箱记录
  const hasHistory = historySearch.dataSource.length > 0;
  return {
    searchForm,
    containerEnter,
    SKUEnter,
    containerRef,
    skuRef,
    historySearch,
    doPackage,
    checked,
    hasHistory,
  };
};
