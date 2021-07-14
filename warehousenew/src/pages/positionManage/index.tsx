import React from 'react';
import BreadcrumbHeader from '@/components/BreadcrumbHeader';
import { connect } from 'dva';
import style from './index.less';
import SearchForm from './searchForm';
import { Button, Dropdown, Menu, Table } from 'antd';
import { indexHooks } from './hooks';
import AddOrUpdate from './addOrUpdate';
import { DownOutlined } from '@ant-design/icons';
import MultiAdd from './multiAdd';
import SearchTable from '@/components/SearchTable';
import { POSITIONPURPOSE, POSITIONQUAILTY, POSITIONTYPE } from '@/enum.config';
import ExcelUpload from '@/components/CustomFields/ExcelUpload';
import { AuthJudge } from '@cckj/cj-authority';
import { AUTH } from '~/authority';

export default BreadcrumbHeader([{ name: '系统管理' }, { name: '库位管理' }])(
  connect(({ positionManage }: any) => ({
    dataSource: positionManage.dataSource,
    loading: positionManage.loading,
    current: positionManage.current,
    pageSize: positionManage.pageSize,
    total: positionManage.total,
  }))(({ dataSource, loading, current, pageSize, total, dispatch }) => {
    const {
      onChange,
      addOrUpdateModal,
      multiAddModal,
      onSelectionChange,
      deleteRecord,
      selectedRowKeys,
      importEditNetworkStatus,
      option,
      uploading,
      excelColumns,
      onPrint,
    } = indexHooks(dispatch, dataSource);
    const columns = [
      {
        title: '库位编号',
        dataIndex: 'locationName',
        key: 'locationName',
        align: 'left',
        fixed: 'left',
      },
      {
        title: '所属仓库',
        dataIndex: 'storehouseId',
        key: 'storehouseId',
        align: 'left',
        render: (text: string) => option.menu.key(text)?.value || '-',
      },
      {
        title: '所属库区',
        dataIndex: 'areaName',
        key: 'areaName',
        align: 'left',
      },
      {
        title: '库位用途',
        dataIndex: 'useType',
        key: 'useType',
        align: 'left',
        render: (text: any) => POSITIONPURPOSE.key(text)?.value || '-',
      },
      {
        title: '库位类型',
        dataIndex: 'type',
        key: 'type',
        align: 'left',
        render: (text: any) => POSITIONTYPE.key(text)?.value || '-',
      },
      {
        title: '库位货品',
        dataIndex: 'locationType',
        key: 'locationType',
        align: 'left',
        render: (text: any) => POSITIONQUAILTY.key(text)?.value || '-',
      },
      {
        title: '路径节点',
        dataIndex: 'pathNode',
        key: 'pathNode',
        align: 'left',
      },
      {
        title: '库位高度(cm)',
        dataIndex: 'locationH',
        key: 'locationH',
        align: 'left',
      },
      {
        title: '库位宽度(cm)',
        dataIndex: 'locationW',
        key: 'locationW',
        align: 'left',
      },
      {
        title: '库位长度(cm)',
        dataIndex: 'locationL',
        key: 'locationL',
        align: 'left',
      },
      {
        title: '停用',
        dataIndex: 'isDelete',
        key: 'isDelete',
        align: 'left',
        render: (text: any) => (!!text ? '是' : '否'),
      },
      {
        title: '操作',
        key: '',
        align: 'left',
        fixed: 'right',
        width: 100,
        render: (text: any, record: any) => (
          <AuthJudge code={AUTH.CWGL001005}>
            <a onClick={() => addOrUpdateModal.show(record)}>修改</a>
          </AuthJudge>
        ),
      },
    ];
    const menu = (
      <Menu>
        {/* <Menu.Item onClick={() => deleteRecord(selectedRowKeys)}>
          批量删除
        </Menu.Item> */}
        <AuthJudge code={AUTH.CWGL001004}>
          <Menu.Item onClick={() => multiAddModal.show()}>
            批量生成库位
          </Menu.Item>
        </AuthJudge>
      </Menu>
    );
    const btns = (
      <>
        <AuthJudge code={AUTH.CWGL001001}>
          <Button type="primary" onClick={() => addOrUpdateModal.show()}>
            新增库位
          </Button>
        </AuthJudge>
        <AuthJudge code={AUTH.CWGL001002}>
          <Button onClick={onPrint}>打印库位编号</Button>
        </AuthJudge>
        <AuthJudge code={AUTH.CWGL001003}>
          <ExcelUpload
            templateHref={'/position_add_template.xlsx'}
            templateName={'库位导入模板.xlsx'}
            columns={excelColumns}
            upload={importEditNetworkStatus}
            buttonName="导入库位"
          />
        </AuthJudge>
        <Dropdown overlay={menu}>
          <Button>
            批量操作 <DownOutlined />
          </Button>
        </Dropdown>
      </>
    );
    return (
      <SearchTable
        className={style['position-manage']}
        searchFormRender={<SearchForm />}
        operateBtnRender={btns}
      >
        <Table
          // @ts-ignore
          columns={columns}
          rowKey={record => record.locationId}
          dataSource={dataSource}
          loading={loading}
          scroll={{ x: 1500 }}
          rowSelection={{
            fixed: true,
            onChange: onSelectionChange,
            selectedRowKeys,
          }}
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
        <AddOrUpdate modal={addOrUpdateModal} />
        <MultiAdd modal={multiAddModal} />
      </SearchTable>
    );
  }),
);
