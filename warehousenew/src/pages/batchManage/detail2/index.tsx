import React, { useEffect, useState } from 'react';
import BreadcrumbHeader from '@/components/BreadcrumbHeader';
import style from './index.less';
import { Button, Descriptions, Table } from 'antd';
import { history } from 'umi';
import { dateTimeFormat, defaultColumns } from '@/utils';
import useSearchForm from '@/hooks/useSearchForm';
import { getDetail2List } from '@/services/batchManage';

/**
 * 入库单详情
 */
export default BreadcrumbHeader([
  { name: '出库' },
  { name: '拣货管理', url: '/batchManage' },
  { name: '拣货详情' },
])(() => {
  const id = history.location.query.id;
  const searchForm = useSearchForm(async cond => {
    const resp = await getDetail2List({
      pageSize: cond.pageSize,
      pageNum: cond.current,
      data: { batchId: id },
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
      title: 'sku',
      dataIndex: 'variantSku',
      key: 'variantSku',
      align: 'left',
    },
    {
      title: '货架位置',
      dataIndex: 'locationName',
      key: 'locationName',
      align: 'left',
    },
    {
      title: '待拣量',
      dataIndex: 'pendingQuantity',
      key: 'pendingQuantity',
      align: 'left',
    },
    {
      title: '已拣量',
      dataIndex: 'processedQuantity',
      key: 'processedQuantity',
      align: 'left',
    },
    {
      title: '装货容器ID',
      dataIndex: 'containerNum',
      key: 'containerNum',
      align: 'left',
    },

    {
      title: '拣货人',
      dataIndex: 'createBy',
      key: 'createBy',
      align: 'left',
    },
    {
      title: '拣货时间',
      dataIndex: 'createAt',
      key: 'createAt',
      align: 'left',
      render: (text: string) => dateTimeFormat(text),
    },
  ]);
  return (
    <div className={style['detail']}>
      <div className={style.back}>
        <Button onClick={() => window.history.back()}>返回</Button>
      </div>
      <Table
        // @ts-ignore
        columns={columns}
        scroll={{ x: 1000 }}
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
});
