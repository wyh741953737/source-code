import React, { memo } from 'react';
import { Modal, Table } from 'antd';
import useSearchForm from '@/hooks/useSearchForm';
import * as api from '@/services/putawayManage';
import { dateTimeFormat, defaultColumns } from '@/utils';

interface Props {
  detailId: string;
  sku: string;
  visible: boolean;
  onCancel: () => void;
}

const Detail: React.FC<Props> = ({ detailId, sku, visible, onCancel }) => {
  const {
    pageSize,
    current,
    total,
    dataSource,
    loading,
    search,
  } = useSearchForm(
    async c => {
      if (detailId) {
        const { current, pageSize } = c;
        const resp: any = await api
          .getputawayRecordDetail({
            onShelfInfoId: detailId,
            pageNum: current,
            pageSize,
          })
          .catch(e => {});
        return {
          current: resp.data.pageNumber,
          total: resp.data.totalRecords,
          dataSource: resp.data.content,
          pageSize: resp.data.pageSize,
        };
      } else {
        return {
          current: 1,
          total: 0,
          dataSource: [],
          pageSize: 10,
        };
      }
    },
    [detailId],
  );
  const columns = defaultColumns([
    {
      title: '操作人',
      dataIndex: 'createBy',
      key: 'createBy',
      align: 'left',
    },
    {
      title: '上架数量',
      dataIndex: 'onShelfQuantity',
      key: 'onShelfQuantity',
      align: 'left',
    },
    {
      title: '操作时间',
      dataIndex: 'createAt',
      key: 'createAt',
      align: 'left',
      render: (text: string) => dateTimeFormat(text),
    },
    {
      title: '上架库位',
      dataIndex: 'locationName',
      key: 'locationName',
      align: 'left',
    },
    {
      title: '推荐库位',
      dataIndex: 'recommendLocation',
      key: 'recommendLocation',
      align: 'left',
    },
  ]);
  return (
    <Modal
      title={`${sku}-已上架`}
      visible={visible}
      onCancel={onCancel}
      width={800}
    >
      <Table
        // @ts-ignore
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        rowKey={(record: any) => record.id}
        pagination={{
          current: Number(current),
          pageSize: Number(pageSize),
          total: total,
          pageSizeOptions: ['10', '20', '50', '100'],
          showQuickJumper: true,
          showTotal: total => {
            return <span>共计{total}条数据</span>;
          },
          onChange: (page: any, pageSize: any) => {
            search({ nextPageNumber: page, nextPageSize: pageSize });
          },
        }}
      />
    </Modal>
  );
};
export default memo(Detail);
