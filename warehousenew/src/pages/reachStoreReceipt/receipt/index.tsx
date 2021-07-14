import React from 'react';
import style from './index.less';
import BreadcrumbHeader from '@/components/BreadcrumbHeader';
import { Input, Form, Table, Select } from 'antd';
import { indexHooks } from './hooks';
import OperateLayout from '@/components/OperateLayout';
import { PACKAGEPORPERTY, SCHEDULINGTYPE } from '@/enum.config';
import { defaultColumns } from '@/utils';
import useOptions from '@/hooks/useOptions';
import { warehouseApply } from '@/option.apply';
import { connect } from 'dva';
interface Params {
  [key: string]: string | number;
}
export default BreadcrumbHeader([
  { name: '出库' },
  { name: '到达仓签收', url: '/reachStoreReceipt' },
  { name: '签收' },
])(
  connect(({ common }: any) => ({
    warehouseId: common.warehouseId,
  }))(({ warehouseId }) => {
    const {
      form,
      onPressEnterContainer,
      dataSource,
      onValueChange,
      containerEl,
    } = indexHooks(warehouseId);

    const [option] = useOptions(warehouseApply, { interval: Infinity });
    const columns = defaultColumns([
      {
        title: '包裹编号',
        dataIndex: 'parcelNumber',
        key: 'parcelNumber',
        align: 'left',
        fixed: 'left',
        width: 250,
        render: (text: string, record: any) => {
          return (
            <>
              {text}
              {record.mark && record.mark == 1 ? (
                <span className={style.interceptSpan}>拦</span>
              ) : null}
            </>
          );
        },
      },
      {
        title: '运单号',
        dataIndex: 'trackingNumber',
        key: 'trackingNumber',
        align: 'left',
      },
      {
        title: '包裹重量',
        dataIndex: 'weight',
        key: 'weight',
        align: 'left',
      },

      {
        title: '属性',
        dataIndex: 'packProperty',
        key: 'packProperty',
        align: 'left',
        render: (text: number, record: any) => {
          return PACKAGEPORPERTY.key(text)?.value || '-';
        },
      },
      {
        title: '备注',
        dataIndex: 'remarks',
        key: 'remarks',
        align: 'left',
      },
      {
        title: '明细总数',
        dataIndex: 'quantity',
        key: 'quantity',
        align: 'left',
        render: (text: number, record: any) => {
          return record.detailResultList ? record.detailResultList.length : 0;
        },
      },
      {
        title: '调度编号',
        dataIndex: 'schedulingNumber',
        key: 'schedulingNumber',
        align: 'left',
      },
      {
        title: '转出仓',
        dataIndex: 'sourceStorehouseName',
        key: 'sourceStorehouseName',
        align: 'left',
      },
      {
        title: '货代名称',
        dataIndex: 'goodsLoanName',
        key: 'goodsLoanName',
        align: 'left',
      },
    ]);
    const expandedRowRender = (record: any) => {
      return (
        <>
          {record.detailResultList.map((item: any) => {
            return (
              <div key={item.orderId} className={style['expanded-item']}>
                <div>
                  <span title={item.parcelOrWaybillNumber}>
                    运单号/包裹号：{item.parcelOrWaybillNumber || '-'}
                  </span>
                  <span title={item.orderId}>
                    订单号：{item.orderId || '-'}
                  </span>
                  <span title={item.orderId}>
                    包裹属性：{item.property || '-'}
                  </span>
                </div>

                <div>
                  <span title={SCHEDULINGTYPE.key(item.schedulingType)?.value}>
                    调度类型：
                    {SCHEDULINGTYPE.key(item.schedulingType)?.value || '-'}
                  </span>
                  <span title={item.weight}>重量：{item.weight || '-'}</span>
                  <span></span>
                </div>
              </div>
            );
          })}
        </>
      );
    };
    return (
      <OperateLayout
        title=""
        form={form}
        empty={!dataSource || dataSource.length == 0}
        searchItems={[
          <Form.Item
            label=""
            name="storageId"
            rules={[{ required: true, message: '请选择目标仓库' }]}
          >
            <Select
              getPopupContainer={triggerNode => triggerNode.parentNode}
              placeholder="请选择目标仓库"
            >
              {option.menu.map(o => (
                <Select.Option key={o.key} value={o.key}>
                  {o.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>,
          <Form.Item
            label=""
            name="parcelNumbering"
            rules={[{ required: true, message: '请扫描/输入包裹编号' }]}
          >
            <Input
              placeholder="请扫描/输入包裹编号"
              onPressEnter={onPressEnterContainer}
              ref={containerEl}
            />
          </Form.Item>,
        ]}
      >
        <Table
          // @ts-ignore
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          scroll={{ x: 1400 }}
          rowKey={(record: any) => record.trackingNumber}
          expandable={{
            expandedRowRender,
            rowExpandable: record =>
              record.detailResultList && record.detailResultList.length > 0,
          }}
        />
      </OperateLayout>
    );
  }),
);
