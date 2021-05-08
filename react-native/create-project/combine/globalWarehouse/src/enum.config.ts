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
