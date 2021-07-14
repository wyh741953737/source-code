declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.png';
declare module '@cckj/i18n-util';
declare module 'postcss-plugin-px2rem';
declare module 'js-tracking-report';
declare let i18n: any;
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string;
  export default url;
}
declare interface Window {
  // 是否app环境
  appEnv: boolean;
}
