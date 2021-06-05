import { Enum } from '@cckj/cj-utils';
import { EnumItem } from '@cckj/cj-utils/bin/Enum';

// 试例
/**
 * 共用是否
 */
interface CommonBoolean extends Enum {
  true: EnumItem;
  false: EnumItem;
}
export const COMMONBOOLEAN = new Enum([
  ['false', { key: 0, value: '否', value1: '禁用' }],
  ['true', { key: 1, value: '是', value1: '启用' }],
]) as CommonBoolean;

/**
 * 热门分类图标的枚举
 * */
export const HOTICON = new Enum([
  [
    '手机',
    {
      key: 'E9FDC79A-8365-4CA6-AC23-64D971F08B8B',
      value: 'icon-bianzu41beifen3',
    },
  ],
  [
    '运动',
    {
      key: '4B397425-26C1-4D0E-B6D2-96B0B03689DB',
      value: 'icon-bianzu8beifen2',
    },
  ],
  [
    '摩托车',
    { key: 'A2F799BE-FB59-428E-A953-296AA2673FCF', value: 'icon-bianzu' },
  ],
  [
    '男士服装',
    {
      key: 'B8302697-CF47-4211-9BD0-DFE8995AEB30',
      value: 'icon-bianzu61beifen4',
    },
  ],
  [
    '家居装修',
    {
      key: '6A5D2EB4-13BD-462E-A627-78CFED11B2A2',
      value: 'icon-bianzu63beifen2',
    },
  ],
  [
    '消费类电子产品',
    {
      key: 'D9E66BF8-4E81-4CAB-A425-AEDEC5FBFBF2',
      value: 'icon-bianzu53beifen2',
    },
  ],
  [
    '园艺',
    { key: '52FC6CA5-669B-4D0B-B1AC-415675931399', value: 'icon-bianzu64' },
  ],
  [
    '玩具',
    {
      key: 'A50A92FA-BCB3-4716-9BD9-BEC629BEE735',
      value: 'icon-bianzu65beifen2',
    },
  ],
  [
    '头发',
    { key: '2C7D4A0B-1AB2-41EC-8F9E-13DC31B1C902', value: 'icon-bianzu56' },
  ],
  [
    '电脑',
    {
      key: '1126E280-CB7D-418A-90AB-7118E2D97CCC',
      value: 'icon-bianzu25beifen2',
    },
  ],
  [
    '包袋',
    {
      key: '2415A90C-5D7B-4CC7-BA8C-C0949F9FF5D8',
      value: 'icon-bianzu26beifen',
    },
  ],
  [
    '珠宝手表',
    {
      key: '2837816E-2FEA-4455-845C-6F40C6D70D1E',
      value: 'icon-bianzu47beifen',
    },
  ],
  [
    '女性着装',
    { key: '2FE8A083-5E7B-4179-896D-561EA116F730', value: 'icon-bianzu59' },
  ],
]);

/** 4:供应商商品; 10:视频商品 */
export const PRODUCTTYPE = new Enum([
  [
    '',
    {
      key: 4,
      value: i18n.t('warehouse-product-type', 'Product Videos'),
    },
  ],
  [
    '',
    {
      key: 10,
      value: i18n.t('warehouse-product-type', 'Supplier Products'),
    },
  ],
]);

/** 1：包邮 */
export const DISCOUNT = new Enum([
  ['', { key: 1, value: i18n.t('warehouse-discount', 'Free Shipping') }],
]);
