import React from 'react';
import BreadcrumbHeader from '@/components/BreadcrumbHeader';
import { connect } from 'dva';
import { Space, Table, Button } from 'antd';
import SearchTable from '@/components/SearchTable';
import SearchForm from './searchForm';
import { indexHooks } from './hooks';
import RecordInfo from './recordInfo';
import AddContainer from './addContainer';
import useOptions from '@/hooks/useOptions';
import { warehouseApply } from '@/option.apply';
import { COMMONBOOLEAN, CONTAINERSTATUS, CONTAINERTYPE } from '@/enum.config';
import { dateTimeFormat } from '@/utils';
import { AuthJudge } from '@cckj/cj-authority';
import { AUTH } from '~/authority';

export default BreadcrumbHeader([{ name: '系统管理' }, { name: '容器管理' }])(
  connect(({ containerManage }: any) => ({
    searchData: containerManage.searchData,
    dataSource: containerManage.dataSource,
    current: containerManage.current,
    pageSize: containerManage.pageSize,
    total: containerManage.total,
    loading: containerManage.loading,
  }))(
    ({
      dataSource,
      loading,
      current,
      pageSize,
      total,
      dispatch,
      searchData,
    }: any) => {
      const {
        onChange,
        onSelectionChange,
        onRowSelect,
        rowSelect,
        modal,
        onPrint,
        onStop,
        onRelease,
        selectedRowKeys,
        setClassName,
      } = indexHooks(dispatch, dataSource);
      const [option] = useOptions(warehouseApply, { interval: Infinity });
      const columns = [
        {
          title: '容器编号',
          dataIndex: 'containerNum',
          key: 'containerNum',
          align: 'left',
          fixed: 'left',
        },
        {
          title: '仓库',
          dataIndex: 'storehouseId',
          key: 'storehouseId',
          align: 'left',
          render: (text: any) => option.menu.key(text)?.value || '-',
        },
        {
          title: '容器类型',
          dataIndex: 'type',
          key: 'type',
          align: 'left',
          render: (text: any) => CONTAINERTYPE.key(text)?.value || '-',
        },
        {
          title: '创建人',
          dataIndex: 'createBy',
          key: 'createBy',
          align: 'left',
        },
        {
          title: '创建时间',
          dataIndex: 'createAt',
          key: 'createAt',
          align: 'left',
          render: (text: string) => dateTimeFormat(text),
        },
        {
          title: '最新操作人',
          dataIndex: 'updateBy',
          key: 'updateBy',
          align: 'left',
        },
        {
          title: '备注',
          dataIndex: 'remarks',
          key: 'remarks',
          width: 200,
          align: 'left',
        },
        {
          title: '停用',
          dataIndex: 'isDelete',
          key: 'isDelete',
          width: 80,
          fixed: 'right',
          render: (text: any) => COMMONBOOLEAN.key(text)?.value,
        },
        {
          title: '状态',
          dataIndex: 'status',
          key: 'status',
          align: 'left',
          fixed: 'right',
          render: (text: any) => CONTAINERSTATUS.key(text)?.value,
        },
      ];
      return (
        <SearchTable
          searchFormRender={<SearchForm />}
          operateBtnRender={
            <Space>
              <AuthJudge code={AUTH.RQGL001001}>
                <Button
                  type="primary"
                  onClick={() =>
                    modal.show({ storehouseId: searchData.warehouse })
                  }
                >
                  新建容器
                </Button>
              </AuthJudge>
              <AuthJudge code={AUTH.RQGL001002}>
                <Button onClick={onPrint}>打印编号</Button>
              </AuthJudge>
              <AuthJudge code={AUTH.RQGL001003}>
                <Button type="primary" danger ghost onClick={onStop}>
                  停用
                </Button>
              </AuthJudge>
              <AuthJudge code={AUTH.RQGL001004}>
                <Button onClick={onRelease}>释放容器</Button>
              </AuthJudge>
            </Space>
          }
        >
          <Table
            // @ts-ignore
            columns={columns}
            rowKey={record => record.id}
            bordered
            scroll={{ x: 1500 }}
            dataSource={dataSource}
            loading={loading}
            rowSelection={{
              fixed: true,
              onChange: onSelectionChange,
              selectedRowKeys,
            }}
            rowClassName={setClassName} //表格行点击高亮
            onRow={(record, index) => ({
              onClick: () => onRowSelect(record, index),
            })}
            pagination={{
              current,
              pageSize,
              total,
              pageSizeOptions: ['10', '20', '50', '100'],
              showQuickJumper: true,
              showTotal: total => {
                return <span>共计{total}条数据</span>;
              },
              onChange: onChange,
            }}
          />
          <AddContainer modal={modal} />
          {rowSelect && <RecordInfo target={rowSelect} />}
        </SearchTable>
      );
    },
  ),
);
