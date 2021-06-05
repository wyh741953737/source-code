import * as Api from '@/services/CJHeader';
import { CountryItem, WarehouseItem } from '@/services/CJHeader/index.d';
import { ChildObj } from '@/components/web/CJDropdown';
import { useEffect, useState } from 'react';
import { GLOBAL_ENV } from '@/config';

const cjBaseWebsite = 'https://cjdropshipping.com';

/** 人工翻译的语种，来自cj common文件夹 */
const languages = ['zh', 'en', 'de', 'fr', 'id', 'th'];

/** Authorization */
const authList: Array<ChildObj> = [
  {
    label: i18n.t('top-nav-shopify', 'Shopify'),
    url: `${cjBaseWebsite}/myCJ.html#/authorize/Shopify`,
  },
  {
    label: i18n.t('top-nav-ebay', 'eBay'),
    url: `${cjBaseWebsite}/myCJ.html#/authorize/Ebay`,
  },
  {
    label: i18n.t('top-nav-woocommerce', 'Woocommerce'),
    url: `${cjBaseWebsite}/myCJ.html#/authorize/Woocommerce`,
  },
  {
    label: i18n.t('top-nav-shipstation', 'ShipStation'),
    url: `${cjBaseWebsite}/myCJ.html#/authorize/Shipstation`,
  },
  {
    label: i18n.t('top-nav-api', 'API'),
    url: `${cjBaseWebsite}/myCJ.html#/authorize/API`,
  },
  {
    label: i18n.t('top-nav-lazada', 'Lazada'),
    url: `${cjBaseWebsite}/myCJ.html#/authorize/Lazada`,
  },
  {
    label: i18n.t('top-nav-shopee', 'Shopee'),
    url: `${cjBaseWebsite}/myCJ.html#/authorize/Shopee`,
  },
];
/** WishList */
const wishList = `${cjBaseWebsite}/myCJ.html#/myCJ-favorites?track=2`;
/** Print On Demand */
const printOnDemand = `${cjBaseWebsite}/printonDemand/home`;
/** Sourcing */
const sourcing = `${cjBaseWebsite}/myCJ.html#/sourcing?track=5`;
/** MY CJ */
const myCJ = `${cjBaseWebsite}/myCJ.html#/myCJAssociatedStore?track=6`;
/** 登录人下拉操作 */
const originOperate: Array<ChildObj> = [
  {
    url: `${cjBaseWebsite}/myCJ.html#/profile`,
    label: i18n.t('warehouse-header-profile', 'Profile'),
    type: '/profile/:type',
    icon: 'icon-gerenzhongxin',
  },
  {
    url: `${cjBaseWebsite}/myCJ.html#/myCJWallet`,
    label: i18n.t('warehouse-header-wallet', 'Wallet'),
    type: '/myCJWallet',
    icon: 'icon-zhanghu',
  },
  {
    label: i18n.t('warehouse-header-tool', 'Tool'),
    icon: 'icon-wuliu',
    children: [
      {
        url: 'https://cjpacket.com/',
        label: i18n.t('warehouse-header-track-order', 'Track Orders'),
        type: '/Tool',
      },
      {
        url: `${cjBaseWebsite}/calculation.html`,
        label: i18n.t(
          'warehouse-header-shipping-calculate',
          'Shipping Calculation',
        ),
        type: '/Tool',
      },
    ],
  },
  {
    url: `${cjBaseWebsite}/evalute.html`,
    label: 'Rating',
    icon: 'icon-gongyingshangpingjia',
    btn: 'Rating', // 特殊处理的标识
  },
  {
    url: `${cjBaseWebsite}/myCJ.html#/accountManage`,
    label: i18n.t('warehouse-header-account', 'Account'),
    icon: 'icon-zizhanghu',
    type: '/accountManage',
  },
  {
    label: i18n.t('warehouse-header-logout', 'Log Out'),
    icon: 'icon-tuichu',
    handleClick: async () => {
      Api.logOut();
    },
  },
];
/** Support List */
const supportList: Array<ChildObj> = [
  {
    url: `${cjBaseWebsite}/myCJ.html#/ticketList?track=8`,
    label: i18n.t('warehouse-header-ticket', 'Ticket'),
    icon: 'icon-ticket',
    type: '/ticketList?track',
  },
  {
    url: `${cjBaseWebsite}/help-center`,
    label: i18n.t('warehouse-header-help-center', 'Help-Center'),
    icon: 'icon-tutorial',
    type: 'Tutorial',
  },
  {
    url: getElitesUrl(),
    label: i18n.t('warehouse-header-elites', 'ELITES'),
    icon: 'icon-elites',
    type: 'Elites',
  },
  {
    url: 'https://blog.cjdropshipping.com/',
    label: i18n.t('warehouse-header-blog', 'Blog'),
    icon: 'icon-boke',
    type: 'Blog',
  },
];

export default () => {
  const [wareList, setWareList] = useState<Array<ChildObj>>([]); // 仓库列表
  const [userOperateList, setUserOperate] = useState<Array<ChildObj>>([]); // 登录人下拉列表
  const [userSupportList, setUserSupport] = useState<Array<ChildObj>>([]); // Support List

  useEffect(() => {
    getWarelist();
    getAuthMenu();
  }, []);

  /** 获取仓库列表 */
  async function getWarelist() {
    const language = languages.includes(i18n.language) ? i18n.language : 'en';
    const resp = await Api.getCountryList({ language });
    const resp2 = await Api.getWareHouseWorlds({ language });
    const data = transWarehouse(resp?.data || [], resp2?.data || []);
    const wList = data.map((item: any) => ({
      label: item.areaVal,
      countryCode: item.countryCode,
      handleClick: (arg: any) => {
        console.log(arg);
      },
      // href: `/list-detail?from=${item.countryCode}&fromType=all&track=3&fromWhere=warehouses`,
    }));
    setWareList(wList);
  }

  /** 获取所有菜单 */
  async function getAuthMenu() {
    const [resp, resp2, resp3] = await Promise.all([
      Api.getAllMenu(),
      Api.getUserMenus(),
      Api.getEvalSupplierCount(),
    ]);
    const supplierCount = resp3?.data?.count || 0; // 供应商评价数量
    const allMenu = (resp?.data || []).reduce((menu: string[], item) => {
      if (item.href !== '#') {
        menu.push(item.href);
      }
      return menu;
    }, []);
    const userMenu = (resp2?.data || []).reduce((menu: string[], item) => {
      if (item.href !== '#') {
        menu.push(item.href);
      }
      return menu;
    }, []);
    const operateList = loop(allMenu, userMenu, originOperate, supplierCount);
    setUserOperate(operateList);
    const userSupport = loop(allMenu, userMenu, supportList, supplierCount);
    setUserSupport(userSupport);
    console.log(operateList, userSupport);
  }

  /** 处理下拉操作列表是否有权限 */
  function loop(
    allMenu: string[],
    userMenu: string[],
    arr: ChildObj[],
    supplierCount: number,
  ): ChildObj[] {
    return arr.map((item) => {
      const noPower =
        allMenu.includes(`#${item.type}`) &&
        !userMenu.includes(`#${item.type}`);

      return {
        ...item,
        url: noPower ? `${cjBaseWebsite}/myCJ.html#/noPower` : item.url,
        label:
          item.btn === 'Rating'
            ? i18n.t('warehouse-header-rating', {
                defaultValue: 'Rating ({{supplierCount}})',
                supplierCount,
              })
            : item.label,
        children: item.children
          ? loop(allMenu, userMenu, item.children, supplierCount)
          : undefined,
      };
    });
  }

  return {
    authList,
    wishList,
    wareList,
    printOnDemand,
    sourcing,
    myCJ,
    userOperateList,
    userSupportList,
  };
};

/** 处理仓库数据 */
function transWarehouse(target: Array<CountryItem>, arr: Array<WarehouseItem>) {
  const map: { [name: string]: string } = arr.reduce((obj: any, cur) => {
    const { en } = cur;
    if (!obj[en]) {
      obj[en] = cur.value;
    }
    return obj;
  }, {});
  target.forEach((v: any) => {
    v.areaVal = map[v.areaEn] || v.areaEn;
  });
  return target;
}

/** 获取论坛跳转链接 */
function getElitesUrl() {
  const t = Date.now();
  let url =
    GLOBAL_ENV !== 'prod'
      ? 'http://192.168.5.219:4000/cross'
      : 'https://elites.cjdropshipping.com/cross';
  const token = localStorage.getItem('token'); // TODO 获取token
  url = `${url}?_t=${t}&token=${token}`;
  return url;
}
