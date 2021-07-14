import request from '@/utils/request';
import {
  GetList,
  PointChange,
  ExportPerfmance,
  GetLogList,
} from './performanceList.d';
/**
 * 获取绩效列表
 * @param data
 */
export function getList(data: GetList.Request) {
  return request.post<GetList.Response>(
    '/storehouse/performance/getPerformanceList',
    data,
  );
}

//绩效变更
export function pointChange(data: PointChange.Request) {
  return request.post<PointChange.Response>(
    '/storehouse/performance/pointsChange',
    data,
  );
}

/**绩效导出 */
export function exportPerfmance(data: ExportPerfmance.Request) {
  return request.post<ExportPerfmance.Response>(
    `/storehouse/performance/exportPerformance`,
    data,
    {
      responseType: 'blob',
    },
  );
}

//绩效日志列表
export function getLogList(data: GetLogList.Request) {
  return request.post<GetLogList.Response>(
    '/storehouse/performance/getPerformanceDetailList',
    data,
  );
}
