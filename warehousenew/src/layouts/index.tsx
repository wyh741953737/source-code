import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'umi';
import { history } from '@@/core/history';
import { AuthProvider, hasAuth } from '@cckj/cj-authority';
import { Layout, Menu, message } from 'antd';
import menus, { MenuConfig } from './menuConfig';
import * as uuid from 'uuid';
import { config } from '../../authority';
import style from './index.less';
console.log(hasAuth('CKZX-CKCD001'), 131131313131131);

message.config({
  duration: 3,
  top: 300,
});

type Routes = {
  path: string;
  exact: boolean;
  component: React.ReactNode;
  routes: Array<Routes>;
};

interface Props {
  children: React.ReactNode | undefined;
}

type _MenuConfig = Array<{
  key: string;
  name: string;
  url?: string;
  code?: string;
  isELink?: boolean;
  children?: _MenuConfig;
}>;
type Paths = { [n: string]: { key: string; paths: Array<string> } };
type AutoAddKey = (list: MenuConfig) => [_MenuConfig, Paths];
const autoAddkey: AutoAddKey = list => {
  const paths: Paths = {};
  const fun = (children: MenuConfig, path: Array<string> = []) => {
    return children.map(c => {
      const temp = { key: uuid.v4(), ...c };
      if (c.url && path) paths[c.url] = { key: temp.key, paths: path };
      if (c.children) temp.children = fun(c.children, [...path, temp.key]);
      return temp;
    }) as _MenuConfig;
  };
  return [fun(list), paths];
};

const LayoutBase = ({ children }: Props) => {
  const [openKeys, setOpenKeys] = useState<Array<string>>([]);
  const [selectedKeys, setSelectedKeys] = useState<Array<string>>([]);
  const [_menus, paths] = useMemo(() => autoAddkey(menus()), []);
  const pathname: string = history.location.pathname;
  const p = paths[pathname];
  // const selectedKeys = [p?.key];
  console.log(paths, 'paths', menus());
  useEffect(() => {
    setOpenKeys(p?.paths);
    setSelectedKeys([p?.key]);
    console.log(p, '=========pppppp', openKeys);
  }, [history.location.pathname]);
  // const openKeys = p?.paths;
  // p?.paths&&setOpenKeys(p?.paths)
  // 仓库菜单处理
  const menuFactory = (node: _MenuConfig) => {
    return node.map((item, index) => {
      if (!item?.isELink && !hasAuth(item?.code || '') && 'code' in item) {
        return null;
      }
      if (item.children && item.children.length > 0) {
        return (
          <Menu.SubMenu key={`${item?.key}`} title={item.name}>
            {menuFactory(item.children)}
          </Menu.SubMenu>
        );
      }

      return (
        <Menu.Item key={`${item.key}`}>
          <Link to={item.url || '/'}>{item.name}</Link>
        </Menu.Item>
      );
    });
  };
  const getRootMenuKeys: any = (node: _MenuConfig) => {
    return node.map((item, index) => {
      if (!(!item?.isELink && !hasAuth(item?.code || '') && 'code' in item)) {
        return item.key;
      }
    });
  };
  const rootSubmenuKeys = getRootMenuKeys(_menus);
  const onOpenChange = (keys: Array<any>) => {
    const latestOpenKey = openKeys
      ? keys.find(key => openKeys.indexOf(key) === -1)
      : undefined;
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <Layout style={{ height: '100%' }} className={style.layout}>
      <Layout.Sider theme="dark" style={{ zIndex: 10, overflow: 'hidden' }}>
        <div className={style.iconTitle}>
          <img src={require('@/assist/storehouse.svg')} alt="" />
          仓库管理中心
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={selectedKeys}
          // defaultOpenKeys={openKeys}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
        >
          {/* 仓库原来菜单处理 */}
          {menuFactory(_menus)}
        </Menu>
      </Layout.Sider>
      <Layout.Content style={{ position: 'relative' }}>
        {children}
      </Layout.Content>
    </Layout>
  );
};

export default ({ children }: Props) => {
  return (
    <AuthProvider
      ignoreAuth
      config={config}
      getToken={() => localStorage.getItem('_TOKEN_') || ''}
      loadingRender={(() => {
        return (
          <div
            style={{
              fontSize: '24px',
              textAlign: 'center',
              color: '#03b196',
              marginTop: '64px',
            }}
          >
            权限加载中...
          </div>
        );
      })()}
      goLogin={flag => {
        if (!flag) return;
        history.push('/login');
      }}
    >
      <LayoutBase>{children}</LayoutBase>
    </AuthProvider>
  );
};
