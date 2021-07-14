import React from 'react';
import { connect } from 'dva';
import { Button, Row, Col, Card, Form, Input } from 'antd';
import { history } from 'umi';
import { indexHooks } from './hooks';
import style from './index.less';

import BreadcrumbHeader from '@/components/BreadcrumbHeader';
import PackageForm from './components/packageForm';
import Intercept from './components/interceptList';
import PackageList from './components/packageList';
import DetailList from './components/detailList';

/**
 * 未发货
 */
export default BreadcrumbHeader([
  { name: '出库' },
  { name: '订单调度', url: '/orderDispatch' },
  { name: '包裹编辑' },
])(
  connect(({ orderDispatchWaiting }: any) => ({
    currentItem: orderDispatchWaiting.currentItem,
  }))(({ currentItem, dispatch }) => {
    const { id } = history.location.query;
    const {
      form,
      detailData,
      packageData,
      interceptData,
      savePackage,
      scanPackageOrTrackNumber,
      deleteDetail,
      btnLoading,
      packageListUseRouter,
      parcelNumber,
    } = indexHooks(dispatch, id, currentItem);
    return (
      <div className={style.editPackage}>
        <Row>
          <Col span={16}>
            <Card title="当前包裹" bordered={false} style={{ width: '100%' }}>
              {id ? (
                <p className={style.detailTitle}>包裹详情-{parcelNumber}</p>
              ) : null}
              <PackageForm form={form} detailData={detailData} />
            </Card>
            <Card title="添加订单" bordered={false} style={{ width: '100%' }}>
              <Form>
                <Form.Item name="parcelOrWaybillNumber" label="运单号/包裹号">
                  <Input
                    placeholder="请扫描或输入运单号/包裹号"
                    style={{ width: '50%' }}
                    onPressEnter={scanPackageOrTrackNumber}
                  />
                </Form.Item>
              </Form>
            </Card>
            <Card title="包裹明细" bordered={false} style={{ width: '100%' }}>
              <DetailList dataSource={detailData} deleteDetail={deleteDetail} />
              <div className={style.saveButton}>
                <Button
                  type="default"
                  onClick={() => {
                    history.push('/orderDispatch');
                  }}
                >
                  取消
                </Button>
                <Button
                  type="primary"
                  onClick={savePackage}
                  loading={btnLoading}
                >
                  {id ? '保存' : '保存并新增包裹'}
                </Button>
              </div>
            </Card>
          </Col>
          <Col span={8} style={{ borderLeft: '1px solid rgb(240 240 240)' }}>
            <Card
              title="该调度任务下的包裹"
              bordered={false}
              style={{ width: '100%' }}
            >
              <PackageList
                dataSource={packageData}
                packageListUseRouter={packageListUseRouter}
              />
            </Card>
            <Card
              title="已扫描拦截订单"
              bordered={false}
              style={{ width: '100%' }}
            >
              <Intercept dataSource={interceptData} />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }),
);
