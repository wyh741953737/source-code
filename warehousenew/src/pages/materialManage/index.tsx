import React from 'react';
import { connect } from 'dva';
import { Table, Button, Upload, Dropdown, Menu } from 'antd';
import BreadcrumbHeader from '@/components/BreadcrumbHeader';
import SearchForm from './searchForm';
import SearchTable from '@/components/SearchTable';
import { indexHooks } from './hooks';
import { MATERIALSTATUS } from '@/enum.config';
import { dateTimeFormat, defaultColumns } from '@/utils';
import ImagePreview from '@/components/ImagePreview';
import EditContent from './components/editContent';
import ExportSelectItems from './components/exportSelectItems';
import LogModal from './components/log';
import ExcelUpload from '@/components/CustomFields/ExcelUpload';
import { AuthJudge } from '@cckj/cj-authority';
import { AUTH } from '~/authority';

export default BreadcrumbHeader([{ name: '系统管理' }, { name: '耗材管理' }])(
  connect(({ materialManage }: any) => ({
    searchData: materialManage.searchData,
    dataSource: materialManage.dataSource,
    current: Number(materialManage.current),
    pageSize: Number(materialManage.pageSize),
    total: materialManage.total,
    loading: materialManage.loading,
  }))(
    ({
      searchData,
      dataSource,
      loading,
      current,
      pageSize,
      total,
      dispatch,
    }: any) => {
      const {
        editModal,
        exportModal,
        onChange,
        showLog,
        excelColumns,
        importMaterialData,
      } = indexHooks(dispatch, dataSource, searchData);

      const columns = defaultColumns([
        {
          title: '图片',
          dataIndex: 'image',
          key: 'image',
          align: 'left',
          width: 80,
          fixed: 'left',
          render: (text: any, record: any) => (
            <ImagePreview key={text} url={text} />
          ),
        },
        {
          title: '耗材编号',
          dataIndex: 'cNumber',
          key: 'cNumber',
        },
        {
          title: '耗材名称',
          dataIndex: 'cName',
          key: 'cName',
        },
        {
          title: '长(cm)',
          dataIndex: 'length',
          key: 'length',
        },
        {
          title: '宽(cm)',
          dataIndex: 'width',
          key: 'width',
        },
        {
          title: '高(cm)',
          dataIndex: 'height',
          key: 'height',
        },
        {
          title: '重量(g)',
          dataIndex: 'weight',
          key: 'weight',
        },
        {
          title: '体积(cm^2)',
          dataIndex: 'volume',
          key: 'volume',
        },
        {
          title: '单价($)',
          dataIndex: 'price',
          key: 'price',
        },
        {
          title: '创建人',
          dataIndex: 'createBy',
          key: 'createBy',
        },
        {
          title: '创建时间',
          dataIndex: 'createAt',
          key: 'createAt',
          render: (text: string) => dateTimeFormat(text),
        },
        {
          title: '修改人',
          dataIndex: 'updateBy',
          key: 'updateBy',
        },
        {
          title: '修改时间',
          dataIndex: 'updateAt',
          key: 'updateAt',
          render: (text: string) => dateTimeFormat(text),
        },
        {
          title: '停用',
          dataIndex: 'isDelete',
          key: 'isDelete',
          render: (text: any, record: any) => {
            const status: any = MATERIALSTATUS.key(text);
            return <div>{status.value}</div>;
          },
        },
        {
          title: '操作',
          dataIndex: 'action',
          key: 'action',
          width: 150,
          align: 'left',
          fixed: 'right',
          render: (text: number, record: any) => {
            const editContent = {
              ...record,
              image: record.image
                ? [
                    {
                      name: 'w_20190429214518451813.jpg',
                      status: 'done',
                      type: 'image/jpeg',
                      uid: record.image,
                      url: record.image,
                    },
                  ]
                : '',
            };
            return (
              <>
                <AuthJudge code={AUTH.HCGL001004}>
                  <a
                    style={{ marginRight: '20px' }}
                    onClick={e => {
                      e.stopPropagation;
                      editModal.show(editContent);
                    }}
                  >
                    修改
                  </a>
                </AuthJudge>
                <AuthJudge code={AUTH.HCGL001005}>
                  <a
                    onClick={e => {
                      e.stopPropagation;
                      showLog(record.id);
                    }}
                  >
                    操作日志
                  </a>
                </AuthJudge>
              </>
            );
          },
        },
      ]);
      return (
        <SearchTable
          searchFormRender={<SearchForm />}
          operateBtnRender={
            <>
              <AuthJudge code={AUTH.HCGL001001}>
                <Button type="primary" onClick={() => editModal.show()}>
                  添加耗材
                </Button>
              </AuthJudge>
              <AuthJudge code={AUTH.HCGL001002}>
                <ExcelUpload
                  templateHref={'/metarialTemplate.xlsx'}
                  templateName={'耗材管理导入模板.xlsx'}
                  columns={excelColumns}
                  upload={importMaterialData}
                  buttonName="导入"
                />
              </AuthJudge>
              <AuthJudge code={AUTH.HCGL001003}>
                <Button onClick={() => exportModal.show()}>导出</Button>
              </AuthJudge>
            </>
          }
        >
          <Table
            // @ts-ignore
            columns={columns}
            bordered
            dataSource={dataSource}
            loading={loading}
            rowKey={(record: any) => record.id}
            scroll={{ x: 2000 }}
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
          <EditContent modal={editModal} />
          <ExportSelectItems modal={exportModal} />
          <LogModal />
        </SearchTable>
      );
    },
  ),
);
