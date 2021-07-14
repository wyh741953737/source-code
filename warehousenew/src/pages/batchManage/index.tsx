import React from 'react';
import BreadcrumbHeader from '@/components/BreadcrumbHeader';
import { connect } from 'dva';
import SearchForm from './searchForm';
import { Button, Space, Table } from 'antd';
import { indexHooks } from './hooks';
import AddOrUpdate from './addOrUpdate';
import SearchTable from '@/components/SearchTable';
import {
  BATCHTYPE,
  LEADTYPE,
  OUTBOUNDORDERTYPE,
  BATCHMANAGEISPRINT,
} from '@/enum.config';
import { dateTimeFormat, defaultColumns } from '@/utils';
import { PrinterOutlined, SettingOutlined } from '@ant-design/icons/lib';
import useOptions from '@/hooks/useOptions';
import { warehouseApply } from '@/option.apply';
import { Link } from 'umi';
import { AuthJudge } from '@cckj/cj-authority';
import { AUTH } from '~/authority';
export default BreadcrumbHeader([{ name: '出库' }, { name: '拣货管理' }])(
  connect(({ batchManage }: any) => ({
    dataSource: batchManage.dataSource,
    loading: batchManage.loading,
    current: batchManage.current,
    pageSize: batchManage.pageSize,
    total: batchManage.total,
  }))(({ dataSource, loading, current, pageSize, total, dispatch }) => {
    const {
      onChange,
      modal,
      onPrint,
      printSelect,
      printAll,
      onSelectChange,
      selected,
    } = indexHooks(dispatch, dataSource);
    const [option] = useOptions(warehouseApply, { interval: Infinity });
    const columns = defaultColumns([
      {
        title: '批次号',
        dataIndex: 'id',
        key: 'id',
        align: 'left',
      },
      {
        title: '目标仓库',
        dataIndex: 'storehouseId',
        key: 'storehouseId',
        align: 'left',
        render: (text: string) => option.menu.key(text)?.value || '-',
      },
      {
        title: '拣货状态',
        dataIndex: 'status',
        key: 'status',
        align: 'left',
        render: (text: number) => BATCHTYPE.key(text)?.value || '已完成',
      },
      {
        title: '订单类型',
        dataIndex: 'orderType',
        key: 'orderType',
        align: 'left',
        render: (text: number) => OUTBOUNDORDERTYPE.key(text)?.value || '-',
      },
      {
        title: '订单数量',
        dataIndex: 'quantity',
        key: 'quantity',
        render: (text: number, record: any) => (
          <Link to={`/batchManage/detail2?id=${record.id}`}>{text}</Link>
        ),
      },
      {
        title: '商品数量',
        dataIndex: 'productNum',
        key: 'productNum',
      },
      {
        title: '库位个数',
        dataIndex: 'locationNum',
        key: 'locationNum',
      },
      {
        title: '波次id',
        dataIndex: 'waveId',
        key: 'waveId',
        align: 'left',
      },
      {
        title: '波次名称',
        dataIndex: 'waveName',
        key: 'waveName',
        align: 'left',
      },
      {
        title: '打印状态',
        dataIndex: 'isCodePrint',
        key: 'isCodePrint',
        align: 'left',
        render: (text: number) => BATCHMANAGEISPRINT.key(text)?.value || '-',
      },
      {
        title: '是否领单',
        dataIndex: 'claimTicketStatus',
        key: 'claimTicketStatus',
        align: 'left',
        render: (text: string) => LEADTYPE.key(text)?.value || '-',
      },
      {
        title: '领单人',
        dataIndex: 'zhaoHuoRen',
        key: 'zhaoHuoRen',
        align: 'left',
      },
      {
        title: '领单时间',
        dataIndex: 'zhaoHuoDate',
        key: 'zhaoHuoDate',
        align: 'left',
        render: (text: string) => dateTimeFormat(text),
      },
      {
        title: '完成拣货时间',
        dataIndex: 'zhaoHuoCompleteDate',
        key: 'zhaoHuoCompleteDate',
        align: 'left',
        render: (text: string) => dateTimeFormat(text),
      },
      {
        title: '创建时间',
        dataIndex: 'createDate',
        key: 'createDate',
        align: 'left',
        render: (text: string) => dateTimeFormat(text),
      },
      {
        title: '创建人',
        dataIndex: 'creater',
        key: 'creater',
        align: 'left',
      },
      {
        title: '第一次打印时间',
        dataIndex: 'daDanFirstDate',
        key: 'daDanFirstDate',
        align: 'left',
        render: (text: string) => dateTimeFormat(text),
      },
      {
        title: '最新打印时间',
        dataIndex: 'daDanDate',
        key: 'daDanDate',
        align: 'left',
        render: (text: string) => dateTimeFormat(text),
      },
      {
        title: '操作',
        key: 'id',
        dataIndex: 'id',
        align: 'left',
        fixed: 'right',
        width: 130,
        render: (text: any, record: any) => (
          <Space>
            <AuthJudge code={AUTH.JHGL001004}>
              <Link to={`/batchManage/detail?id=${text}`}>查看</Link>
            </AuthJudge>

            <AuthJudge code={AUTH.JHGL001005}>
              <a onClick={() => onPrint(record)}>打印批次</a>
            </AuthJudge>
          </Space>
        ),
      },
    ]);
    return (
      <SearchTable
        searchFormRender={<SearchForm />}
        operateBtnRender={
          <>
            <AuthJudge code={AUTH.JHGL001001}>
              <Button
                type="primary"
                onClick={() => modal.show()}
                icon={<SettingOutlined />}
              >
                批次规则设置
              </Button>
            </AuthJudge>
            <AuthJudge code={AUTH.JHGL001002}>
              <Button
                type="primary"
                onClick={printSelect}
                icon={<PrinterOutlined />}
              >
                批次打印
              </Button>
            </AuthJudge>
            <AuthJudge code={AUTH.JHGL001003}>
              <Button onClick={printAll} icon={<PrinterOutlined />}>
                打印所有未打印批次
              </Button>
            </AuthJudge>
          </>
        }
      >
        <Table
          // @ts-ignore
          columns={columns}
          scroll={{ x: 1800 }}
          rowKey={record => record.id}
          rowSelection={{
            fixed: true,
            onChange: onSelectChange,
            selectedRowKeys: selected.keys,
          }}
          dataSource={dataSource}
          loading={loading}
          bordered
          pagination={{
            current,
            pageSize,
            total,
            pageSizeOptions: ['10', '20', '50', '100'],
            showQuickJumper: true,
            showTotal: total => {
              return <span>共计{total}条数据</span>;
            },
            onChange,
          }}
        />
        <AddOrUpdate modal={modal} />
      </SearchTable>
    );
  }),
);
