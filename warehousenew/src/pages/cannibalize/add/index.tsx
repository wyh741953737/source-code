import React from 'react';
import BreadcrumbHeader from '@/components/BreadcrumbHeader';
import SearchTable from '@/components/SearchTable';
import SearchForm from './searchForm';
import ImagePreview from '@/components/ImagePreview';
import hooks, { ProduceInfo } from './hooks';
import { Button, Space, Table } from 'antd';
import style from './index.less';
import AddModal from './addModal';
import { STORETYPE, STORETYPETRANS } from '@/enum.config';
import ExcelUpload from '@/components/CustomFields/ExcelUpload';
import * as regExp from '@/regExp.config';
import { defaultColumns } from '@/utils';

export default BreadcrumbHeader([
  { name: '出库' },
  { name: '调度任务', url: '/cannibalize' },
  { name: '调拨单详情' },
])(() => {
  const {
    form,
    addModal,
    onAddClick,
    isVerify,
    setIsVerify,
    produceList,
    rowSelection,
    multiDelete,
    save,
    cancel,
    upload,
    onUpdateClick,
    del,
  } = hooks();
  const columns = defaultColumns<ProduceInfo>([
    {
      title: '图片',
      key: 'variantImg',
      dataIndex: 'variantImg',
      width: 80,
      render: (text: string) => <ImagePreview key={text} url={text} />,
    },
    { title: 'SKU', key: 'variantSku', dataIndex: 'variantSku' },
    {
      title: '属性',
      key: 'productProperty',
      dataIndex: 'productProperty',
    },
    {
      title: '库存类型',
      key: 'stockType',
      dataIndex: 'stockType',
      render: (text: string) => STORETYPE.key(text)?.value || '-',
    },
    {
      title: '商品重量',
      key: 'packWeight',
      dataIndex: 'packWeight',
      render: (text: number, record) =>
        !isNaN(Number(text)) && !isNaN(Number(record.transferQuantity))
          ? `${Number(text) * Number(record.transferQuantity)}g`
          : '-',
    },
    {
      title: '可用库存量',
      key: 'availableQuantity',
      dataIndex: 'availableQuantity',
    },
    {
      title: '需调度数量',
      key: 'transferQuantity',
      dataIndex: 'transferQuantity',
    },
    {
      title: '操作',
      key: 'id',
      dataIndex: 'id',
      width: 120,
      render: (text: string, record) => (
        <div className={style.operates}>
          <a onClick={() => onUpdateClick(record)}>修改</a>
          <a onClick={() => del(text)}>删除</a>
        </div>
      ),
    },
  ]);
  return (
    <SearchTable
      searchFormRender={
        <SearchForm
          form={form}
          setIsVerify={setIsVerify}
          disabled={produceList.length > 0}
        />
      }
    >
      <div className={style.title}>商品信息</div>
      <div className={style.btns}>
        <Button type="primary" onClick={onAddClick} disabled={!isVerify}>
          添加商品
        </Button>
        <ExcelUpload
          templateHref={'/produce_template.xlsx'}
          templateName={'商品导入模板.xlsx'}
          columns={excelColumns}
          upload={upload}
          disabled={!isVerify}
        />
        <Button
          type="primary"
          danger
          loading={multiDelete.loading}
          onClick={multiDelete.onClick}
        >
          批量删除
        </Button>
      </div>
      <Table
        columns={columns}
        rowKey={record => record.id}
        dataSource={produceList}
        pagination={{
          size: 'small',
          showTotal: total => `共计${total}条数据`,
          showQuickJumper: true,
          pageSizeOptions: ['10', '20', '50', '100'],
        }}
        rowSelection={rowSelection}
      />
      <Space className={style.space}>
        <Button type="primary" loading={save.loading} onClick={save.onClick}>
          保存
        </Button>
        <Button onClick={cancel.onClick}>取消</Button>
      </Space>
      <AddModal modal={addModal} produceList={produceList} />
    </SearchTable>
  );
});

const excelColumns = [
  {
    title: '库存类型',
    name: 'stockType',
    validate: (value: string) => {
      const temp = STORETYPETRANS.value(value);
      if (!temp) return { err: '库存类型错误' };
      return { value: temp.key };
    },
  },
  {
    title: 'SKU/短码',
    name: 'skuOrNum',
    validate: (value: string) => {
      if (!value) return { err: '必填' };
      if (value.length > 50) return { err: '限制50个字符' };
      return { value };
    },
  },
  {
    title: '需调拨数量',
    name: 'transferQuantity',
    validate: (value: string) => {
      const val = Number(value);
      if (isNaN(val)) return { err: '必填' };
      if (!regExp.POSITIVEINTEGER.test(value)) return { err: '必须是正整数' };
      return { value: val };
    },
  },
];
