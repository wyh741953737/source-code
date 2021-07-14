import React from 'react';
import { Tag, Dropdown, Button, Menu } from 'antd';
import { defaultColumns, dateTimeFormat } from '@/utils';
import {
  OUTBOUNDORDERTYPE,
  OUTBOUNDORDERSTATUS,
  EXCEPTOUTBOUNDORDERTYPE,
} from '@/enum.config';
import { AuthJudge } from '@cckj/cj-authority';
import { AUTH } from '~/authority';
import { DownOutlined } from '@ant-design/icons/lib';

/*!
 *出库单查询-通用表格表头(
    全部，
    待配齐，
    已配齐，
    待拣货，
    待分拣，
    待验货，
    待称重，
    已出库-状态下)
 * 20021-01-15 
 */
const getCodeObj = (status: string) => {
  let codeObj: any = {};
  switch (status) {
    case '10': // 待处理
      codeObj.detailCode = AUTH.CKCX003001;
      codeObj.logCode = AUTH.CKCX003002;
      break;
    case '0': // 待配齐
      codeObj.detailCode = AUTH.CKCX004001;
      codeObj.logCode = AUTH.CKCX004002;
      break;
    case '1': // 已配齐
      codeObj.detailCode = AUTH.CKCX004001;
      codeObj.logCode = AUTH.CKCX004002;
      break;
    case '2': // 待拣货
      codeObj.detailCode = AUTH.CKCX006001;
      codeObj.logCode = AUTH.CKCX006002;
      break;
    case '3': // 待分拣
      codeObj.detailCode = AUTH.CKCX007001;
      codeObj.logCode = AUTH.CKCX007002;
      break;
    case '4': // 待验货
      codeObj.detailCode = AUTH.CKCX008001;
      codeObj.logCode = AUTH.CKCX008002;
      break;
    case '5': // 待称重
      codeObj.detailCode = AUTH.CKCX009001;
      codeObj.logCode = AUTH.CKCX009002;
      break;
    case '6': // 已出库
      codeObj.detailCode = AUTH.CKCX010001;
      codeObj.logCode = AUTH.CKCX010002;
      break;
    default:
      // 全部
      codeObj.detailCode = AUTH.CKCX002001;
      codeObj.logCode = AUTH.CKCX002002;
      break;
  }

  return codeObj;
};

export default (
  dispatch: Function,
  routerDetail: Function,
  showLog: Function,
  submitToWeight: Function,
  printModal: any,
  exceptModal?: any,
  status?: string,
) => {
  const codeObj = getCodeObj(status || '');
  let cloumns: any = [
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
      title: '业务员群主',
      dataIndex: 'salesmanName',
      key: 'salesmanName',
    },
    {
      title: '出库单类型',
      dataIndex: 'type',
      key: 'type',
      render: (text: any, record: any) =>
        OUTBOUNDORDERTYPE.key(text)?.value || '-',
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
            {record.status == 0 && (
              <Menu.Item>
                <a
                  onClick={e => {
                    e.stopPropagation();
                    submitToWeight(record.id);
                  }}
                >
                  提交至待称重
                </a>
              </Menu.Item>
            )}
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
  ];
  if ([1, 2, 3, 4, 5].indexOf(Number(status)) > -1) {
    cloumns.splice(cloumns.length - 1, 0, {
      title: '已配齐时间',
      dataIndex: 'completeAt',
      key: 'completeAt',
      render: (text: string) => dateTimeFormat(text),
    });
  }
  return defaultColumns(cloumns);
};
