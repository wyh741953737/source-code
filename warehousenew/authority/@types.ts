/** 自动生成文件，请勿修改 */
export interface Config {
  apiGet: string;
  appId: string;
  connectPath: string;
  microPath: string;
}
export interface AuthEnum {
  /** WMS系统 */
  CKZX001: string;
  /** WMS系统=>入库 */
  CXZXRKCD001: string;
  /** WMS系统=>入库=>入库单查询 */
  RKCDRKCX001: string;
  /** WMS系统=>入库=>入库单查询=>添加入库单 */
  RKCX001001: string;
  /** WMS系统=>入库=>入库单查询=>修改 */
  RKCX001002: string;
  /** WMS系统=>入库=>入库单查询=>删除 */
  RKCX001003: string;
  /** WMS系统=>入库=>包裹签收 */
  RKCDBGQS001: string;
  /** WMS系统=>入库=>包裹签收=>签收 */
  BGQS001001: string;
  /** WMS系统=>入库=>包裹签收=>打印运单号 */
  BGQS001002: string;
  /** WMS系统=>入库=>包裹签收=>获取物流信息 */
  BGQS001003: string;
  /** WMS系统=>入库=>包裹签收=>操作日志 */
  BGQS001004: string;
  /** WMS系统=>入库=>分标管理 */
  RKCDFBGL001: string;
  /** WMS系统=>入库=>分标管理=>分标 */
  FBGL001001: string;
  /** WMS系统=>入库=>质检管理 */
  RKCDZJGL001: string;
  /** WMS系统=>入库=>质检管理=>质检 */
  ZJGL001001: string;
  /** WMS系统=>入库=>质检管理=>打印条码 */
  ZJGL001002: string;
  /** WMS系统=>入库=>称重管理 */
  RKCDCZGL001: string;
  /** WMS系统=>入库=>称重管理=>称重 */
  CZGL001001: string;
  /** WMS系统=>入库=>称重管理=>打印条码 */
  CZGL001002: string;
  /** WMS系统=>入库=>上架管理 */
  RKCDSJGL001: string;
  /** WMS系统=>入库=>异常处理 */
  RKCDYCCL001: string;
  /** WMS系统=>入库=>异常处理=>异常记录 */
  RKCDYCCL002: string;
  /** WMS系统=>入库=>异常处理=>异常记录=>确认少件 */
  YCCL002001: string;
  /** WMS系统=>入库=>异常处理=>异常记录=>货已找到 */
  YCCL002002: string;
  /** WMS系统=>入库=>异常处理=>入库异常单 */
  RKCDYCCL003: string;
  /** WMS系统=>入库=>异常处理=>入库异常单=>待处理 */
  RKCDYCCL004: string;
  /** WMS系统=>入库=>异常处理=>入库异常单=>待处理=>提交 */
  YCCL003001: string;
  /** WMS系统=>入库=>异常处理=>入库异常单=>待处理=>放弃 */
  YCCL003002: string;
  /** WMS系统=>入库=>异常处理=>入库异常单=>待处理=>添加异常明细 */
  YCCL004001: string;
  /** WMS系统=>入库=>异常处理=>入库异常单=>处理中 */
  RKCDYCCL005: string;
  /** WMS系统=>入库=>异常处理=>入库异常单=>处理中=>确认处理 */
  YCCL005001: string;
  /** WMS系统=>入库=>异常处理=>入库异常单=>已处理 */
  RKCDYCCL010: string;
  /** WMS系统=>入库=>异常处理=>入库异常单=>已放弃 */
  RKCDYCCL011: string;
  /** WMS系统=>入库=>异常处理=>采购入库异常单 */
  RKCDYCCL006: string;
  /** WMS系统=>入库=>异常处理=>采购入库异常单=>待处理 */
  RKCDYCCL007: string;
  /** WMS系统=>入库=>异常处理=>采购入库异常单=>待处理=>处理 */
  YCCL007001: string;
  /** WMS系统=>入库=>异常处理=>采购入库异常单=>处理中 */
  RKCDYCCL008: string;
  /** WMS系统=>入库=>异常处理=>采购入库异常单=>处理中=>编辑 */
  YCCL008001: string;
  /** WMS系统=>入库=>异常处理=>采购入库异常单=>处理中=>确认处理 */
  YCCL008002: string;
  /** WMS系统=>入库=>异常处理=>采购入库异常单=>已处理 */
  RKCDYCCL009: string;
  /** WMS系统=>入库=>异常处理=>采购入库异常单=>已处理=>查看 */
  YCCL009001: string;
  /** WMS系统=>出库 */
  CKZXCKCD001: string;
  /** WMS系统=>出库=>出库单查询 */
  CKCDCKCX001: string;
  /** WMS系统=>出库=>出库单查询=>全部 */
  CKCDCKCX002: string;
  /** WMS系统=>出库=>出库单查询=>全部=>详情 */
  CKCX002001: string;
  /** WMS系统=>出库=>出库单查询=>全部=>操作日志 */
  CKCX002002: string;
  /** WMS系统=>出库=>出库单查询=>待处理 */
  CKCDCKCX003: string;
  /** WMS系统=>出库=>出库单查询=>待处理=>详情 */
  CKCX003001: string;
  /** WMS系统=>出库=>出库单查询=>待处理=>操作日志 */
  CKCX003002: string;
  /** WMS系统=>出库=>出库单查询=>待配齐 */
  CKCDCKCX004: string;
  /** WMS系统=>出库=>出库单查询=>待配齐=>详情 */
  CKCX004001: string;
  /** WMS系统=>出库=>出库单查询=>待配齐=>操作日志 */
  CKCX004002: string;
  /** WMS系统=>出库=>出库单查询=>待配齐=>抵扣库存 */
  CKCX004003: string;
  /** WMS系统=>出库=>出库单查询=>待配齐=>释放库存 */
  CKCX004004: string;
  /** WMS系统=>出库=>出库单查询=>已配齐 */
  CKCDCKCX005: string;
  /** WMS系统=>出库=>出库单查询=>已配齐=>详情 */
  CKCX005001: string;
  /** WMS系统=>出库=>出库单查询=>已配齐=>操作日志 */
  CKCX005002: string;
  /** WMS系统=>出库=>出库单查询=>已配齐=>释放库存 */
  CKCX005003: string;
  /** WMS系统=>出库=>出库单查询=>待拣货 */
  CKCDCKCX006: string;
  /** WMS系统=>出库=>出库单查询=>待拣货=>详情 */
  CKCX006001: string;
  /** WMS系统=>出库=>出库单查询=>待拣货=>操作日志 */
  CKCX006002: string;
  /** WMS系统=>出库=>出库单查询=>待分拣 */
  CKCDCKCX007: string;
  /** WMS系统=>出库=>出库单查询=>待分拣=>详情 */
  CKCX007001: string;
  /** WMS系统=>出库=>出库单查询=>待分拣=>操作日志 */
  CKCX007002: string;
  /** WMS系统=>出库=>出库单查询=>待验货 */
  CKCDCKCX008: string;
  /** WMS系统=>出库=>出库单查询=>待验货=>详情 */
  CKCX008001: string;
  /** WMS系统=>出库=>出库单查询=>待验货=>操作日志 */
  CKCX008002: string;
  /** WMS系统=>出库=>出库单查询=>待称重 */
  CKCDCKCX009: string;
  /** WMS系统=>出库=>出库单查询=>待称重=>详情 */
  CKCX009001: string;
  /** WMS系统=>出库=>出库单查询=>待称重=>操作日志 */
  CKCX009002: string;
  /** WMS系统=>出库=>出库单查询=>已出库 */
  CKCDCKCX010: string;
  /** WMS系统=>出库=>出库单查询=>已出库=>详情 */
  CKCX010001: string;
  /** WMS系统=>出库=>出库单查询=>已出库=>操作日志 */
  CKCX010002: string;
  /** WMS系统=>出库=>出库单查询=>异常订单 */
  CKCDCKCX011: string;
  /** WMS系统=>出库=>出库单查询=>异常订单=>详情 */
  CKCX011001: string;
  /** WMS系统=>出库=>出库单查询=>异常订单=>操作日志 */
  CKCX011002: string;
  /** WMS系统=>出库=>出库单查询=>异常结束 */
  CKCDCKCX012: string;
  /** WMS系统=>出库=>出库单查询=>异常结束=>详情 */
  CKCX012001: string;
  /** WMS系统=>出库=>出库单查询=>异常结束=>操作日志 */
  CKCX012002: string;
  /** WMS系统=>出库=>出库单查询=>超时未处理 */
  CKCDCKCX013: string;
  /** WMS系统=>出库=>出库单查询=>超时未处理=>处理 */
  CKCX013001: string;
  /** WMS系统=>出库=>出库单查询=>超时未处理=>详情 */
  CKCX013002: string;
  /** WMS系统=>出库=>出库单查询=>超时未处理=>操作日志 */
  CKCX013003: string;
  /** WMS系统=>出库=>波次管理 */
  CKCDBCGL001: string;
  /** WMS系统=>出库=>波次管理=>新建波次 */
  BCGL001001: string;
  /** WMS系统=>出库=>波次管理=>查看 */
  BCGL001002: string;
  /** WMS系统=>出库=>波次管理=>撤销波次 */
  BCGL001003: string;
  /** WMS系统=>出库=>拣货管理 */
  CKCDJHGL001: string;
  /** WMS系统=>出库=>拣货管理=>批次规则设置 */
  JHGL001001: string;
  /** WMS系统=>出库=>拣货管理=>批次打印 */
  JHGL001002: string;
  /** WMS系统=>出库=>拣货管理=>打印所有未打印批次 */
  JHGL001003: string;
  /** WMS系统=>出库=>拣货管理=>查看 */
  JHGL001004: string;
  /** WMS系统=>出库=>拣货管理=>打印批次 */
  JHGL001005: string;
  /** WMS系统=>出库=>分拣管理 */
  CKCDFLGL001: string;
  /** WMS系统=>出库=>出库异常 */
  CKCDCKYC001: string;
  /** WMS系统=>出库=>验货包装 */
  CKCDYSBZ001: string;
  /** WMS系统=>出库=>验货包装=>直发单 */
  CKCDYSBZ002: string;
  /** WMS系统=>出库=>验货包装=>直发单=>封箱 */
  YSBZ002001: string;
  /** WMS系统=>出库=>验货包装=>代发单 */
  CKCDYSBZ003: string;
  /** WMS系统=>出库=>验货包装=>代发单=>封箱 */
  YSBZ003001: string;
  /** WMS系统=>出库=>验货包装=>代发单=>提交异常 */
  YSBZ003002: string;
  /** WMS系统=>出库=>验货包装=>打包记录 */
  CKCDYSBZ004: string;
  /** WMS系统=>出库=>验货包装=>打包记录=>打印装箱明细 */
  YSBZ004001: string;
  /** WMS系统=>出库=>验货包装=>打包记录=>打印面单 */
  YSBZ004002: string;
  /** WMS系统=>出库=>验货包装=>打包记录=>导出 */
  YSBZ004003: string;
  /** WMS系统=>出库=>验货包装=>异常记录 */
  CKCDYSBZ005: string;
  /** WMS系统=>出库=>验货包装=>异常记录=>缺货异常 */
  CKCDYSBZ006: string;
  /** WMS系统=>出库=>验货包装=>异常记录=>缺货异常=>货已找到 */
  YSBZ006001: string;
  /** WMS系统=>出库=>验货包装=>异常记录=>缺货异常=>确认缺货 */
  YSBZ006002: string;
  /** WMS系统=>出库=>验货包装=>异常记录=>面单异常 */
  CKCDYSBZ007: string;
  /** WMS系统=>出库=>验货包装=>异常记录=>面单异常=>手动填写运单号 */
  YSBZ007001: string;
  /** WMS系统=>出库=>称重 */
  CKCDCZCD001: string;
  /** WMS系统=>出库=>称重=>等待出库 */
  CKCDCZCD002: string;
  /** WMS系统=>出库=>称重=>等待出库=>线下录入重量 */
  CZCD002001: string;
  /** WMS系统=>出库=>称重=>称重异常 */
  CKCDCZCD003: string;
  /** WMS系统=>出库=>称重=>称重异常=>线下录入重量 */
  CZCD003001: string;
  /** WMS系统=>出库=>称重=>称重异常=>强制出库 */
  CZCD003002: string;
  /** WMS系统=>出库=>称重=>已出库 */
  CKCDCZCD004: string;
  /** WMS系统=>出库=>称重=>已出库=>导出清单 */
  CZCD004001: string;
  /** WMS系统=>出库=>称重=>配置 */
  CKCDCZCD005: string;
  /** WMS系统=>出库=>称重=>配置=>修改（重量阈值） */
  CZCD005001: string;
  /** WMS系统=>出库=>称重=>配置=>修改|添加（框位设置） */
  CZCD005002: string;
  /** WMS系统=>出库=>称重=>配置=>删除 */
  CZCD005003: string;
  /** WMS系统=>出库=>称重=>配置=>添加行 */
  CZCD005004: string;
  /** WMS系统=>出库=>称重=>包裹打印 */
  CKCDCZCD006: string;
  /** WMS系统=>出库=>称重=>包裹打印=>揽件出库 */
  CZCD006001: string;
  /** WMS系统=>出库=>称重=>揽收记录 */
  CKCDCZCD007: string;
  /** WMS系统=>出库=>称重=>揽收记录=>打印 */
  CZCD007001: string;
  /** WMS系统=>出库=>称重=>揽收记录=>导出 */
  CZCD007002: string;
  /** WMS系统=>出库=>称重=>揽收记录=>编辑 */
  CZCD007003: string;
  /** WMS系统=>出库=>称重=>揽收记录=>查看 */
  CZCD007004: string;
  /** WMS系统=>出库=>调度任务 */
  CKCDDDRW001: string;
  /** WMS系统=>出库=>调度任务=>调拨出库单 */
  CKCDDDRW002: string;
  /** WMS系统=>出库=>调度任务=>调拨出库单=>新增调拨单 */
  DDRW002001: string;
  /** WMS系统=>出库=>调度任务=>调拨出库单=>取消 */
  DDRW002002: string;
  /** WMS系统=>出库=>调度任务=>订单调度 */
  CKCDDING001: string;
  /** WMS系统=>出库=>调度任务=>订单调度=>未发货 */
  CKCDDING002: string;
  /** WMS系统=>出库=>调度任务=>订单调度=>未发货=>新增调度任务 */
  DING001001: string;
  /** WMS系统=>出库=>调度任务=>订单调度=>未发货=>打印包裹编号 */
  DING001002: string;
  /** WMS系统=>出库=>调度任务=>订单调度=>未发货=>导出 */
  DING001003: string;
  /** WMS系统=>出库=>调度任务=>订单调度=>未发货=>编辑 */
  DING001004: string;
  /** WMS系统=>出库=>调度任务=>订单调度=>未发货=>新增包裹 */
  DING001005: string;
  /** WMS系统=>出库=>调度任务=>订单调度=>未发货=>确认发货 */
  DING001006: string;
  /** WMS系统=>出库=>调度任务=>订单调度=>未发货=>删除 */
  DING001007: string;
  /** WMS系统=>出库=>调度任务=>订单调度=>已发货 */
  CKCDDING003: string;
  /** WMS系统=>出库=>调度任务=>订单调度=>已发货=>导出 */
  DING003001: string;
  /** WMS系统=>出库=>调度任务=>订单调度=>已收货 */
  CKCDDING004: string;
  /** WMS系统=>出库=>调度任务=>到达仓签收 */
  CKCDDCQS001: string;
  /** WMS系统=>出库=>调度任务=>到达仓签收=>签收 */
  DCQS001001: string;
  /** WMS系统=>出库=>绩效统计 */
  CKCDJXTJ001: string;
  /** WMS系统=>出库=>绩效统计=>绩效列表 */
  CKCDJXTJ002: string;
  /** WMS系统=>出库=>绩效统计=>绩效列表=>导出 */
  JXTJ002001: string;
  /** WMS系统=>出库=>绩效统计=>绩效规则配置 */
  CKCDJXTJ003: string;
  /** WMS系统=>出库=>绩效统计=>绩效规则配置=>添加 */
  JXTJ003001: string;
  /** WMS系统=>出库=>绩效统计=>绩效规则配置=>编辑 */
  JXTJ003002: string;
  /** WMS系统=>出库=>绩效统计=>绩效规则配置=>禁用|启用 */
  JXTJ003003: string;
  /** WMS系统=>库存管理 */
  CKZXKCCD001: string;
  /** WMS系统=>库存管理=>库存看板 */
  KCCDKCKB001: string;
  /** WMS系统=>库存管理=>库存看板=>一级库存 */
  KCCDKCKB002: string;
  /** WMS系统=>库存管理=>库存看板=>二级库存 */
  KCCDKCKB003: string;
  /** WMS系统=>库存管理=>库存看板=>三级库存 */
  KCCDKCKB004: string;
  /** WMS系统=>库存管理=>库存看板=>三级库存=>查看详情 */
  KCKB004001: string;
  /** WMS系统=>库存管理=>库存看板=>库存流水 */
  KCCDKCKB005: string;
  /** WMS系统=>库存管理=>库内移动 */
  KCCDKCYD001: string;
  /** WMS系统=>库存管理=>库内移动=>新增 */
  KCYD001001: string;
  /** WMS系统=>库存管理=>库内移动=>提交移动 */
  KCYD001002: string;
  /** WMS系统=>库存管理=>库内移动=>放弃 */
  KCYD001003: string;
  /** WMS系统=>库存管理=>库存转移 */
  KCCDKCZZ001: string;
  /** WMS系统=>库存管理=>库存转移=>新增 */
  KCZZ001001: string;
  /** WMS系统=>库存管理=>库存转移=>放弃 */
  KCZZ001002: string;
  /** WMS系统=>库存管理=>库存转移=>转移 */
  KCZZ001003: string;
  /** WMS系统=>库存管理=>库存转移=>入库异常 */
  KCZZ001004: string;
  /** WMS系统=>库存管理=>库存调整 */
  KCCDKCTZ001: string;
  /** WMS系统=>库存管理=>库存调整=>新增 */
  KCTZ001001: string;
  /** WMS系统=>库存管理=>库存调整=>调整 */
  KCTZ001002: string;
  /** WMS系统=>库存管理=>库存调整=>放弃 */
  KCTZ001003: string;
  /** WMS系统=>系统管理 */
  CKZXXTCD001: string;
  /** WMS系统=>系统管理=>库区管理 */
  XTCDCQGL001: string;
  /** WMS系统=>系统管理=>库区管理=>新增库区 */
  CQGL001001: string;
  /** WMS系统=>系统管理=>库区管理=>修改 */
  CQGL001002: string;
  /** WMS系统=>系统管理=>库位管理 */
  XTCDCWGL001: string;
  /** WMS系统=>系统管理=>库位管理=>新增库位 */
  CWGL001001: string;
  /** WMS系统=>系统管理=>库位管理=>打印库位编号 */
  CWGL001002: string;
  /** WMS系统=>系统管理=>库位管理=>导入库位/下载模板 */
  CWGL001003: string;
  /** WMS系统=>系统管理=>库位管理=>批量生成库位 */
  CWGL001004: string;
  /** WMS系统=>系统管理=>库位管理=>修改 */
  CWGL001005: string;
  /** WMS系统=>系统管理=>容器管理 */
  XTCDRQGL001: string;
  /** WMS系统=>系统管理=>容器管理=>新建容器 */
  RQGL001001: string;
  /** WMS系统=>系统管理=>容器管理=>打印编号 */
  RQGL001002: string;
  /** WMS系统=>系统管理=>容器管理=>停用 */
  RQGL001003: string;
  /** WMS系统=>系统管理=>容器管理=>释放容器 */
  RQGL001004: string;
  /** WMS系统=>系统管理=>抵扣规则配置 */
  XTCDDKGZ001: string;
  /** WMS系统=>系统管理=>抵扣规则配置=>添加 */
  DKGZ001001: string;
  /** WMS系统=>系统管理=>抵扣规则配置=>编辑 */
  DKGZ001002: string;
  /** WMS系统=>系统管理=>抵扣规则配置=>启用 */
  DKGZ001003: string;
  /** WMS系统=>系统管理=>抵扣规则配置=>停用 */
  DKGZ001004: string;
  /** WMS系统=>系统管理=>耗材管理 */
  XTCDHCGL001: string;
  /** WMS系统=>系统管理=>耗材管理=>添加耗材 */
  HCGL001001: string;
  /** WMS系统=>系统管理=>耗材管理=>导入/下载模板 */
  HCGL001002: string;
  /** WMS系统=>系统管理=>耗材管理=>导出 */
  HCGL001003: string;
  /** WMS系统=>系统管理=>耗材管理=>修改 */
  HCGL001004: string;
  /** WMS系统=>系统管理=>耗材管理=>操作日志 */
  HCGL001005: string;
}
