import React from 'react';
import { Table, Rate } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import ImagePreview from '@/components/ImagePreview';

export default (props: any) => {
  const data = props.list;
  const list = data && data.variantList ? data.variantList : [];
  const columns: ColumnsType<any> = [
    {
      title: '运费',
      key: 'costPrice',
      dataIndex: 'costPrice',
      align: 'left',
    },
    {
      title: '海关信息',
      key: 'entryValue',
      dataIndex: 'entryValue',
      align: 'left',
    },
    {
      title: '图片',
      key: 'image',
      dataIndex: 'image',
      align: 'left',
      render: text => <ImagePreview key={text} url={text} />,
    },
    {
      title: '包装重量',
      key: 'packWeight',
      dataIndex: 'packWeight',
      align: 'left',
    },
    {
      title: '零售价格',
      key: 'sellPrice',
      dataIndex: 'sellPrice',
      align: 'left',
    },
    {
      title: 'sku',
      key: 'sku',
      dataIndex: 'sku',
      align: 'left',
    },
    {
      title: '变体sku别名',
      key: 'skuAlisa',
      dataIndex: 'skuAlisa',
      align: 'left',
    },
    {
      title: '单位',
      key: 'unit',
      dataIndex: 'unit',
      align: 'left',
    },
    {
      title: '重量',
      key: 'weight',
      dataIndex: 'weight',
      align: 'left',
    },
    {
      title: '变体唯一标识',
      key: 'num',
      dataIndex: 'num',
      align: 'left',
    },
    {
      title: '长(mm)',
      key: 'length',
      dataIndex: 'length',
      align: 'left',
    },
    {
      title: '宽(mm)',
      key: 'width',
      dataIndex: 'width',
      align: 'left',
    },
    {
      title: '高(mm)',
      key: 'height',
      dataIndex: 'height',
      align: 'left',
    },
    // {
    //   title: `${list.property1.name}`,
    //   key: 'propertyValue1',
    //   dataIndex: 'propertyValue1',
    //   align: 'left',
    // },
    // {
    //   title: `${list.property2.name}`,
    //   key: 'propertyValue2',
    //   dataIndex: 'propertyValue2',
    //   align: 'left',
    // },
    // {
    //   title: `${list.property3.name}`,
    //   key: 'propertyValue3',
    //   dataIndex: 'propertyValue3',
    //   align: 'left',
    // }
  ];
  if (data.property1 && data.property1.name) {
    columns.push({
      title: `${data.property1.name}`,
      key: 'propertyValue1',
      dataIndex: 'propertyValue1',
      align: 'left',
    });
  }
  if (data.property2 && data.property2.name) {
    columns.push({
      title: `${data.property2.name}`,
      key: 'propertyValue2',
      dataIndex: 'propertyValue2',
      align: 'left',
    });
  }
  if (data.property3 && data.property3.name) {
    columns.push({
      title: `${data.property3.name}`,
      key: 'propertyValue3',
      dataIndex: 'propertyValue3',
      align: 'left',
    });
  }

  return (
    <Table
      style={{ width: '100%' }}
      dataSource={list}
      columns={columns}
      pagination={false}
      bordered
    />
  );
};
