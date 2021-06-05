import React from 'react';
import { IconFont } from '@/global';
import { CateList } from '@/services/homePage/homePage';
import { HOTICON } from '@/enum.config';
import styles from './style';

interface Props {
  data: CateList;
  goPage?: (a: CateList) => void;
  isVertical?: boolean;
}

const HotKind = ({ data, goPage, isVertical = true }: Props) => (
  <div className={isVertical ? styles.hotKindV : styles.hotKind}>
    <div className="hot-kind-icon" onClick={() => goPage && goPage(data)}>
      <IconFont
        type={HOTICON.key(data.dspId)?.value || ''}
        className="kind-icon"
      />
    </div>
    <div className="hot-kind-detail">
      {data.nameLanguageJson.find((item) => item.language === 'en')?.name}
    </div>
  </div>
);

export default HotKind;
