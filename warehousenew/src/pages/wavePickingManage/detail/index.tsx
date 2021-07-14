import React, { useCallback } from 'react';
import BreadcrumbHeader from '@/components/BreadcrumbHeader';
import style from './index.less';
import { Button, Descriptions, Table } from 'antd';
import { BATCHSTUTUS, WAVEPICKINGSTATUS, WAVEPICKINGTYPE } from '@/enum.config';
import { history, connect, Link } from 'umi';
import { dateTimeFormat, defaultColumns } from '@/utils';
import storage from '@/utils/storage';
import useSearchForm from '@/hooks/useSearchForm';
import { getWavePickingDetailList } from '@/services/wavePickingManage';
import { GetList } from '@/services/wavePickingManage.d';

/**
 * 波次详情
 */
export default BreadcrumbHeader([
  { name: '出库' },
  { name: '波次管理', url: '/wavePickingManage' },
  { name: '波次详情' },
])(
  connect(({ wavePickingManage }: any) => ({
    dataSource: wavePickingManage.dataSource,
  }))(({ dataSource = [] }: { dataSource: Array<GetList.Record> }) => {
    const id = history.location.query.id;
    const info: GetList.Record | undefined = useCallback(() => {
      let target = dataSource.find(d => d.id === id);
      if (target) {
        storage.sessionSet(`BC${id}`, target);
      } else {
        target = storage.sessionGet(`BC${id}`) as GetList.Record;
      }
      return target;
    }, [id])();
    const searchForm = useSearchForm(async condition => {
      const resp = await getWavePickingDetailList({
        pageSize: condition.pageSize,
        pageNum: condition.current,
        data: { id },
      });
      return {
        current: resp.data.pageNumber,
        pageSize: resp.data.pageSize,
        total: resp.data.totalRecords,
        dataSource: resp.data.content,
      };
    });
    const columns = defaultColumns([
      {
        title: '客户订单号',
        dataIndex: 'clientOrderId',
        key: 'clientOrderId',
        align: 'left',
      },
      {
        title: 'CJ订单号',
        dataIndex: 'orderId',
        key: 'orderId',
        align: 'left',
      },
      {
        title: '母订单号',
        dataIndex: 'shipmentsOrderId',
        key: 'shipmentsOrderId',
        align: 'left',
      },
      {
        title: '拣货状态',
        dataIndex: 'batchStatus',
        key: 'batchStatus',
        align: 'left',
        render: (text: string) => BATCHSTUTUS.key(text)?.value || '-',
      },
      {
        title: '拣货批次',
        dataIndex: 'batchId',
        key: 'batchId',
        align: 'left',
      },
      {
        title: '客户名称',
        dataIndex: 'customerName',
        key: 'customerName',
        align: 'left',
      },
      {
        title: '操作',
        dataIndex: 'id',
        key: 'id',
        fixed: 'right',
        width: 80,
        render: (text: string, record: any) => {
          return <Link to={`/outBoundDetail?id=${record.orderId}`}>查看</Link>;
        },
      },
    ]);
    return (
      <div className={style['wave-picking-detail']}>
        <div className={style.back}>
          <Button onClick={() => window.history.back()}>返回</Button>
        </div>
        <Descriptions column={4}>
          <Descriptions.Item label={'波次ID'}>
            {info?.id || '-'}
          </Descriptions.Item>
          <Descriptions.Item label={'波次名称'}>
            {info?.waveName || '-'}
          </Descriptions.Item>
          <Descriptions.Item label={'波次类型'}>
            {WAVEPICKINGTYPE.key(info?.waveType)?.value || '-'}
          </Descriptions.Item>
          <Descriptions.Item label={'当前波次订单数量'}>
            {info?.orderQuantity || '-'}
          </Descriptions.Item>
          <Descriptions.Item label={'波次状态'}>
            {WAVEPICKINGSTATUS.key(info?.waveStatus)?.value || '-'}
          </Descriptions.Item>
          <Descriptions.Item label={'创建人'}>
            {info?.createBy || '-'}
          </Descriptions.Item>
          <Descriptions.Item label={'创建时间'}>
            {dateTimeFormat(info?.createAt)}
          </Descriptions.Item>
          <Descriptions.Item label={'订单数量上限'}>
            {info?.orderQuantityLimit || '-'}
          </Descriptions.Item>
          <Descriptions.Item label={'备注'}>
            {info?.remark || '-'}
          </Descriptions.Item>
        </Descriptions>
        <Table
          // @ts-ignore
          columns={columns}
          scroll={{ x: 1600 }}
          rowKey={record => record.id}
          dataSource={searchForm.dataSource}
          loading={searchForm.loading}
          pagination={{
            current: searchForm.current,
            pageSize: searchForm.pageSize,
            total: searchForm.total,
            pageSizeOptions: ['10', '20', '50', '100'],
            showQuickJumper: true,
            showTotal: total => {
              return <span>共计{total}条数据</span>;
            },
            onChange: searchForm.onChange,
          }}
        />
      </div>
    );
  }),
);
