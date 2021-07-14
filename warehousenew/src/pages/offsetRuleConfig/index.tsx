import React from 'react';
import style from './index.less';
import { connect } from 'dva';
import { Button, Collapse, Menu, Dropdown, Spin } from 'antd';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import BreadcrumbHeader from '@/components/BreadcrumbHeader';
import Header from './components/header';
import Detail from './components/detail';
import EditContent from './components/editContent';
import { indexHooks } from './hooks';
import { OFFSETRULETYPE } from '@/enum.config';
import { AuthJudge } from '@cckj/cj-authority';
import { AUTH } from '~/authority';

const { Panel } = Collapse;

export default BreadcrumbHeader([
  { name: '系统管理' },
  { name: '抵扣规则配置' },
])(
  connect(({ offsetRuleConfig }: any) => ({
    dataSource: offsetRuleConfig.dataList,
    loading: offsetRuleConfig.loading,
  }))(({ dataSource, loading, dispatch }: any) => {
    const { editModal, onClick } = indexHooks(dispatch, dataSource);

    const menu = (record: any) => {
      return (
        <Menu onClick={props => onClick({ ...props }, record)}>
          {OFFSETRULETYPE.map(item => {
            // 权限修改，注意OFFSETRULETYPE在别处也有引用，所以不在OFFSETRULETYPE加code
            const code = item.key === '0' ? AUTH.DKGZ001004 : AUTH.DKGZ001003;
            return (
              <AuthJudge code={code}>
                <Menu.Item key={item.key} disabled={item.key == record.status}>
                  {item.value}
                </Menu.Item>
              </AuthJudge>
            );
          })}
        </Menu>
      );
    };
    const genExtra = (record: any) => (
      <div className={style.operateAction}>
        <AuthJudge code={AUTH.DKGZ001002}>
          <a
            className={style.edit}
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              editModal.show({ ...record });
            }}
          >
            编辑
          </a>
        </AuthJudge>
        <Dropdown overlay={() => menu(record)}>
          <a
            className="ant-dropdown-link"
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            更多 <DownOutlined />
          </a>
        </Dropdown>
      </div>
    );
    return (
      <div className={style.paddingContent}>
        <Spin spinning={loading}>
          <Collapse
            defaultActiveKey={['1']}
            bordered={false}
            className={style.customCollapse}
          >
            {dataSource &&
              dataSource.map((item: any, index: number) => (
                <Panel
                  header={<Header record={item} />}
                  key={item.id}
                  className={style.customPanel}
                  extra={genExtra(item)}
                >
                  <Detail record={item} />
                </Panel>
              ))}
          </Collapse>
        </Spin>
        <AuthJudge code={AUTH.DKGZ001001}>
          <Button
            block
            icon={<PlusOutlined />}
            onClick={() => editModal.show()}
          >
            添加
          </Button>
        </AuthJudge>

        <EditContent modal={editModal} />
      </div>
    );
  }),
);
