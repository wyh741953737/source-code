import { history } from 'umi';
const { pathname } = history.location;
import Storage from '@/utils/storage';
export function render(oldRender: Function) {
  const token = Storage.localGet('_TOKEN_');
  if (token && pathname === '/') {
    history.push('/outBoundOrder');
    oldRender();
  } else {
    oldRender();
  }
}
