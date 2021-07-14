import React, { FC } from 'react';
import { ELink, findELinkPath } from '@cckj/cj-authority';
import { config } from '~/authority';
import BreadcrumbHeader from '@/components/BreadcrumbHeader';
import style from './index.less';

export default (props: any) => {
  const { id } = props?.match?.params;
  console.log(findELinkPath(id));
  const Connect = BreadcrumbHeader(
    findELinkPath(id)?.map((item: any) => ({ name: item?.name })),
  )((prop: any) => {
    return (
      <ELink
        className={style.iframe}
        code={id}
        connectPath={config.connectPath}
      />
    );
  });
  return <Connect {...props} />;
};
