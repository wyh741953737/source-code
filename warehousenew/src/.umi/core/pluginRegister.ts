// @ts-nocheck
import { plugin } from './plugin';
import * as Plugin_0 from 'D:/project/cj/warehousenew/src/app.ts';
import * as Plugin_1 from 'D:/project/cj/warehousenew/src/.umi/plugin-dva/runtime.tsx';
import * as Plugin_2 from '../plugin-initial-state/runtime';
import * as Plugin_3 from 'D:/project/cj/warehousenew/src/.umi/plugin-locale/runtime.tsx';
import * as Plugin_4 from '../plugin-model/runtime';
import * as Plugin_5 from '@@/plugin-qiankun/masterRuntimePlugin';

  plugin.register({
    apply: Plugin_0,
    path: 'D:/project/cj/warehousenew/src/app.ts',
  });
  plugin.register({
    apply: Plugin_1,
    path: 'D:/project/cj/warehousenew/src/.umi/plugin-dva/runtime.tsx',
  });
  plugin.register({
    apply: Plugin_2,
    path: '../plugin-initial-state/runtime',
  });
  plugin.register({
    apply: Plugin_3,
    path: 'D:/project/cj/warehousenew/src/.umi/plugin-locale/runtime.tsx',
  });
  plugin.register({
    apply: Plugin_4,
    path: '../plugin-model/runtime',
  });
  plugin.register({
    apply: Plugin_5,
    path: '@@/plugin-qiankun/masterRuntimePlugin',
  });
