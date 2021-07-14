import React, { useEffect, useState } from 'react';
import { Link } from 'umi';
import { Breadcrumb, Select, Form, Skeleton, Dropdown, Menu } from 'antd';
import style from './index.less';
import useOptions from '@/hooks/useOptions';
import { warehouseApply } from '@/option.apply';
import { connect } from 'dva';
import { history } from 'umi';
import Storage from '@/utils/storage';
import { LogoutOutlined } from '@ant-design/icons';
interface Data {
  name: string;
  url?: string;
}

export default (data: Array<Data>) => (WrappedComponent: any) =>
  connect(({ common }: any) => ({ warehouseId: common.warehouseId }))(
    ({ warehouseId, dispatch, ...props }: any) => {
      const defaultWarehouseId = Storage.localGet('defaultWarehouseId');
      const [userInfo, setUserInfo] = useState<any>(undefined);
      const [option] = useOptions(warehouseApply, {
        interval: Infinity,
        callback: e => {
          if (e.options.length === 0 && warehouseId) return;
          // 第一次初始化默认赋值第一个仓库
          dispatch({
            type: 'common/warehouseChange',
            payload: { warehouseId: defaultWarehouseId || e.options[0]?.key },
          });
          Storage.localSet(
            'defaultWarehouseId',
            defaultWarehouseId || e.options[0]?.key,
          );
        },
      });
      const onChange = (warehouseId: string) => {
        dispatch({ type: 'common/warehouseChange', payload: { warehouseId } });
        Storage.localSet('defaultWarehouseId', warehouseId);
      };
      const logout = () => {
        Storage.localRemove('_TOKEN_');
        Storage.localRemove('_USERINFO_');
        history.push('/login');
      };
      useEffect(() => {
        const userInfo = Storage.localGet('_USERINFO_');
        userInfo && setUserInfo(userInfo);
      }, []);
      useEffect(() => {
        /**根据模块名称修改标签title */
        if (data && data.length > 0) {
          let len = data.length - 1;
          const timer = setTimeout(() => {
            document.title = data[len].name;
          }, 1);
          return () => {
            clearTimeout(timer);
          };
        }
      }, [history.location]);
      const logoutMenu = (
        <Menu>
          <Menu.Item>账号：{userInfo && userInfo.number}</Menu.Item>
          <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" onClick={logout}>
              <LogoutOutlined /> 退出登录
            </a>
          </Menu.Item>
        </Menu>
      );
      return (
        <div className={style['breadcrumb-view']}>
          <div className={style.head}>
            <Form.Item label="默认仓库" className={style.warehouse}>
              <Select
                size="small"
                placeholder="请选择"
                value={warehouseId}
                onChange={onChange}
              >
                {option.menu.map(item => (
                  <Select.Option key={item.key} value={item.key}>
                    {item.value}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Dropdown overlay={logoutMenu} placement="bottomLeft">
              <div className={style.user}>
                <img src={userInfo?.avatar || ''} alt="" />
                {userInfo?.name || ''}
              </div>
            </Dropdown>
          </div>
          <div className={style.body}>
            {/* <div className={style.breadCrumb}>
              <Breadcrumb>
                {data.map((d, k) => (
                  <Breadcrumb.Item key={k}>
                    {d.url ? <Link to={d.url}>{d.name}</Link> : d.name}
                  </Breadcrumb.Item>
                ))}
              </Breadcrumb>
            </div> */}
            <div className={style.container}>
              <Skeleton loading={!warehouseId} active>
                <WrappedComponent {...props} />
              </Skeleton>
            </div>
          </div>
        </div>
      );
    },
  );
