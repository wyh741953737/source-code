import React from 'react';
import { Tag, Dropdown, Button, Menu } from 'antd';
import { defaultColumns, dateTimeFormat } from '@/utils';
import {
  EXCEPTENDTYPE,
  OUTBOUNDORDERSTATUS,
  EXCEPTOUTBOUNDORDERTYPE,
} from '@/enum.config';
import { AuthJudge } from '@cckj/cj-authority';
import { AUTH } from '~/authority';
import { DownOutlined } from '@ant-design/icons/lib';

/*!
 * 出库单查询(异常结束状态)-表格表头
 * 20021-01-15
 */

export default (
  dispatch: Function,
  routerDetail: Function,
  showLog: Function,
  printModal: any,
  exceptModal?: any,
  status?: string,
) => {
  return defaultColumns([
    {
      title: '出库单号',
      dataIndex: 'outboundOrder',
      key: 'outboundOrder',
      align: 'center',
      width: 160,
      fixed: 'left',
      render: (text: string, record: any) => {
        return (
          <>
            <div>{text}</div>
            {record.isPod == '1' && (
              <Tag color="#f50" style={{ marginRight: '10px' }}>
                个
              </Tag>
            )}
            {record.isFirstOrder == '1' && <Tag color="#f50">首</Tag>}
          </>
        );
      },
    },
    {
      title: '出库仓库',
      dataIndex: 'storageName',
      key: 'storageName',
    },
    {
      title: '客户订单号',
      dataIndex: 'clientOrderId',
      key: 'clientOrderId',
    },
    {
      title: 'CJ订单号',
      dataIndex: 'orderId',
      key: 'orderId',
    },
    {
      title: '母订单号',
      dataIndex: 'shipmentsOrderId',
      key: 'shipmentsOrderId',
    },
    {
      title: '出库单状态',
      dataIndex: 'status',
      key: 'status',
      render: (text: any, record: any) => (
        <div>
          {OUTBOUNDORDERSTATUS.key(text)?.value || '-'}(
          {EXCEPTOUTBOUNDORDERTYPE.key(record.exceptionStatus)?.value || '-'})
        </div>
      ),
    },
    {
      title: '结束类型',
      dataIndex: 'exceptionEndStatus',
      key: 'exceptionEndStatus',
      render: (text: any, record: any) => EXCEPTENDTYPE.key(text)?.value || '-',
    },
    {
      title: '业务员群主',
      dataIndex: 'salesmanName',
      key: 'salesmanName',
    },
    {
      title: '客户名称',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: '数量\\金额',
      dataIndex: 'numberPrice',
      key: 'numberPrice',
      render: (text: any, record: any) => {
        return record.quantity + ' \\ $' + record.orderAmount;
      },
    },
    {
      title: '重量\\邮费',
      dataIndex: 'weightPoster',
      key: 'weightPoster',
      render: (text: any, record: any) => {
        return record.weight + 'g \\ $' + record.logisticsCost;
      },
    },
    {
      title: '物流渠道\\运单号',
      dataIndex: 'logisticsList',
      key: 'logisticsList',
      render: (text: Array<any>, record: any) => {
        let length = text.length;

        let stringArr = text.map(item => {
          let logisticsModeName = item.logisticsModeName
            ? item.logisticsModeName
            : '-';
          return !item.logisticsCompany && !item.logisticsTrackingNumber
            ? '-'
            : logisticsModeName +
                '\\' +
                item.logisticsCompany +
                ': ' +
                item.logisticsTrackingNumber;
        });
        return length === 0 ? '-' : stringArr.join(',\n');
      },
    },
    {
      title: '波次ID',
      dataIndex: 'waveId',
      key: 'waveId',
    },
    {
      title: '创建时间',
      dataIndex: 'createAt',
      key: 'createAt',
      render: (text: string) => dateTimeFormat(text),
    },
    {
      title: '上一步操作时间',
      dataIndex: 'changeTime',
      key: 'changeTime',
      render: (text: string) => dateTimeFormat(text),
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 150,
      align: 'left',
      fixed: 'right',
      render: (text: number, record: any) => {
        const { orderId, storehousePackInfoList } = record;

        const MenuAction = (
          <Menu style={{ textAlign: 'center' }}>
            <Menu.Item>
              <AuthJudge code={AUTH.CKCX012001}>
                <a
                  onClick={e => {
                    e.stopPropagation();
                    dispatch({
                      type: 'outBoundOrder/_changecurrentItem',
                      payload: { currentItem: record },
                    });
                    routerDetail(orderId);
                  }}
                >
                  详情
                </a>
              </AuthJudge>
            </Menu.Item>
            <Menu.Item>
              <AuthJudge code={AUTH.CKCX012002}>
                <a
                  onClick={e => {
                    e.stopPropagation();
                    showLog(orderId);
                  }}
                >
                  {' '}
                  操作日志
                </a>
              </AuthJudge>
            </Menu.Item>
            {storehousePackInfoList && storehousePackInfoList.length > 0 && (
              <Menu.Item
                onClick={e => {
                  printModal.show(storehousePackInfoList);
                }}
              >
                面单打印
              </Menu.Item>
            )}
          </Menu>
        );
        return (
          <Dropdown overlay={MenuAction}>
            <Button size="small">
              更多操作 <DownOutlined />
            </Button>
          </Dropdown>
        );
      },
    },
  ]);
};
