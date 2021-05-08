/**
 * 判断当前运行平台 app|h5|pc
 * */
export const platform = () => {
  const reg = /(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i;

  if (window.platform === 'App') return 'app';

  if (navigator.userAgent.match(reg)) return 'h5';

  return 'pc';
};
