import React, { useCallback, useEffect, useState } from 'react';
import BreadcrumbHeader from '@/components/BreadcrumbHeader';
import style from './index.less';
import { Button, Descriptions, Table } from 'antd';
import {
  BATCHTYPE,
  LEADTYPE,
  OUTBOUNDORDERTYPE,
  BATCHMANAGEISPRINT,
} from '@/enum.config';
import { history, connect, Link, useStore } from 'umi';
import { dateTimeFormat, defaultColumns } from '@/utils';
import useSearchForm from '@/hooks/useSearchForm';
import { getDetailList } from '@/services/batchManage';
import { GetList } from '@/services/batchManage.d';
import storage from '@/utils/storage';

/**
 * 批次详情
 */
export default BreadcrumbHeader([
  { name: '出库' },
  { name: '拣货管理', url: '/batchManage' },
  { name: '批次详情' },
])(
  connect(({ batchManage }: any) => ({ dataSource: batchManage.dataSource }))(
    ({ dataSource = [] }: { dataSource: Array<GetList.Record> }) => {
      const id = history.location.query.id;
      const info: GetList.Record | undefined = useCallback(() => {
        let target = dataSource.find(d => d.id === id);
        if (target) {
          storage.sessionSet(`PC${id}`, target);
        } else {
          target = storage.sessionGet(`PC${id}`) as GetList.Record;
        }
        return target;
      }, [id])();
      const searchForm = useSearchForm(async cond => {
        const resp = await getDetailList({
          pageNum: cond.current,
          pageSize: cond.pageSize,
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
          title: '物流渠道\\运单号',
          dataIndex: 'logisticsCompany',
          key: 'logisticsCompany',
          align: 'left',
          render: (text: string, record: any) =>
            `${text}：${record.logisticsTrackingNumber || '-'}`,
        },
        {
          title: '客户名称',
          dataIndex: 'customerName',
          key: 'customerName',
          align: 'left',
        },
        {
          title: '商品数量',
          dataIndex: 'quantity',
          key: 'quantity',
          align: 'left',
        },
        {
          title: '操作',
          dataIndex: 'id',
          key: 'id',
          align: 'left',
          fixed: 'right',
          width: 80,
          render: (text: string, record: any) => {
            return (
              <Link to={`/outBoundDetail?id=${record.orderId}`}>查看</Link>
            );
          },
        },
      ]);
      return (
        <div className={style['detail']}>
          <div className={style.back}>
            <Button onClick={() => window.history.back()}>返回</Button>
          </div>
          <Descriptions column={4}>
            <Descriptions.Item label={'批次号'}>
              {info?.id || '-'}
            </Descriptions.Item>
            <Descriptions.Item label={'拣货状态'}>
              {BATCHTYPE.key(info?.status)?.value || '已完成'}
            </Descriptions.Item>
            <Descriptions.Item label={'是否打印'}>
              {BATCHMANAGEISPRINT.key(info?.isCodePrint)?.value || '-'}
            </Descriptions.Item>
            <Descriptions.Item label={'是否领单'}>
              {LEADTYPE.key(info?.claimTicketStatus)?.value || '-'}
            </Descriptions.Item>
            <Descriptions.Item label={'订单数量'}>
              {info?.quantity || '-'}
            </Descriptions.Item>
            <Descriptions.Item label={'波次ID'}>
              {info?.waveId || '-'}
            </Descriptions.Item>
            <Descriptions.Item label={'订单类型'}>
              {OUTBOUNDORDERTYPE.key(info?.orderType)?.value || '-'}
            </Descriptions.Item>
            <Descriptions.Item label={'波次名称'}>
              {info?.waveName || '-'}
            </Descriptions.Item>
            <Descriptions.Item label={'领单人'}>
              {info?.zhaoHuoRen || '-'}
            </Descriptions.Item>
            <Descriptions.Item label={'商品数量'}>
              {info?.productNum || '-'}
            </Descriptions.Item>
            <Descriptions.Item label={'领单时间'}>
              {dateTimeFormat(info?.zhaoHuoDate)}
            </Descriptions.Item>
            <Descriptions.Item label={'位置数量'}>
              {info?.locationNum || '-'}
            </Descriptions.Item>
          </Descriptions>
          <Table
            // @ts-ignore
            columns={columns}
            scroll={{ x: 1000 }}
            rowKey={(record: any) => record.orderId}
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
    },
  ),
);
