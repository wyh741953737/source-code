import React, { useEffect, useState } from 'react';
import BreadcrumbHeader from '@/components/BreadcrumbHeader';
import style from './index.less';
import { connect } from 'dva';
import { Descriptions, Table, Badge, Button } from 'antd';
import { WAREHOUSESTATUS, WAREHOUSWARRANTETYPE } from '@/enum.config';
import ImagePreview from '@/components/ImagePreview';
import { history } from 'umi';
import * as api from '@/services/warehouseWarrant';
import moment from 'moment';
import { dateTimeFormat } from '@/utils';
import propertyTraversal from '@/utils/propertyUtils';
/**
 * 入库单详情
 */
export default BreadcrumbHeader([
  { name: '入库' },
  { name: '入库单查询', url: '/warehouseWarrantFinder' },
  { name: '入库单详情' },
])(
  connect((state: any) => ({ ...state.warehouseWarrantDetail }))(
    ({ dataSource, current, pageSize, total, loading, dispatch }: any) => {
      const [info, setInfo] = useState<any>();
      const id = history.location.query.id;
      useEffect(() => {
        api.getDetailInfo({ id }).then(resp => {
          setInfo(resp.data);
        });
        dispatch({
          type: 'warehouseWarrantDetail/search',
          payload: { searchData: { id: id } },
        });
      }, []);
      return (
        <div className={style['warehouse-warrant-detail']}>
          <div className={style.back}>
            <Button onClick={() => window.history.back()}>返回</Button>
          </div>
          <Descriptions title={`入库单详情-${id}`}>
            <Descriptions.Item label={'仓库'}>
              {info?.storageName || '-'}
            </Descriptions.Item>
            <Descriptions.Item label={'采购人'}>
              {info?.purchaser || '-'}
            </Descriptions.Item>
            <Descriptions.Item label={'采购单号'}>
              {info?.orderNumber || '-'}
            </Descriptions.Item>
            <Descriptions.Item label={'入库类型'}>
              {WAREHOUSWARRANTETYPE.key(info?.type)?.value || '-'}
            </Descriptions.Item>
            <Descriptions.Item label={'创建时间'}>
              {dateTimeFormat(info?.createAt)}
            </Descriptions.Item>
            <Descriptions.Item label={'物流单号'}>
              {info?.logisticsInfo || '-'}
            </Descriptions.Item>
            <Descriptions.Item label={'备注'}>
              {info?.remark || '-'}
            </Descriptions.Item>
          </Descriptions>
          <Table
            // @ts-ignore
            columns={columns}
            rowKey={record => record.id}
            expandable={{ expandedRowRender, rowExpandable: () => true }}
            dataSource={dataSource}
            loading={loading}
            pagination={{
              current,
              pageSize,
              total,
              pageSizeOptions: ['10', '20', '50', '100'],
              showQuickJumper: true,
              showTotal: total => {
                return <span>共计{total}条数据</span>;
              },
              onChange: (page: number, pageSize?: number | undefined) => {
                dispatch({
                  type: 'warehouseWarrantDetail/search',
                  payload: {
                    pageNumber: page,
                    pageSize,
                  },
                });
              },
            }}
          />
        </div>
      );
    },
  ),
);

const expandedRowRender = (record: any) => {
  return (
    <>
      <div className={style['expanded-item']}>
        <span>已入库</span>
        <span>{record.inStorageQuantity || 0}</span>
      </div>
      <div className={style['expanded-item']}>
        <span>在途</span>
        <span>
          {Number(record.quantity || 0) -
            Number(record.inStorageQuantity || 0) -
            Number(record.exceptionQuantity || 0)}
        </span>
      </div>
      <div className={style['expanded-item']}>
        <span>异常</span>
        <span>{Number(record.exceptionQuantity || 0)}</span>
      </div>
    </>
  );
};
const columns = [
  {
    title: 'SKU',
    dataIndex: 'sku',
    key: 'sku',
    align: 'left',
    render: (text: any, record: any) => {
      return (
        <div className={style['sku-render']}>
          <ImagePreview key={record.image} url={record.image} />
          <span>{text}</span>
        </div>
      );
    },
  },
  {
    title: '属性',
    dataIndex: 'variantKeyMap',
    key: 'variantKeyMap',
    width: 150,
    render: (text: any) => {
      return <div>{propertyTraversal(text)}</div>;
    },
  },
  {
    title: '总数量',
    dataIndex: 'quantity',
    key: 'quantity',
    align: 'left',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    align: 'left',
    render: (text: any, record: any) => {
      const status = WAREHOUSESTATUS.key(text);
      return status ? (
        <div>
          <Badge color={status.color} />
          {status.value}
        </div>
      ) : (
        '-'
      );
    },
  },
];
