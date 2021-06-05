import React from 'react';
import { CJView, CJText } from '@/components/baseUI';
import { IconFont } from '@/global';
import { HOTICON } from '@/enum.config';
import { CateList } from '@/services/homePage/homePage';
import styles from './style';

interface Props {
  data: CateList;
  goPage?: (a: CateList) => void;
}

const HotCategories = ({ data, goPage }: Props) => (
  <CJView className={styles.hotCategories}>
    <CJView className="hot-categories-img">
      <CJView
        className="hot-categories-img-inner"
        onClick={() => goPage && goPage(data)}
      >
        <IconFont
          type={HOTICON.key(data.dspId)?.value || ''}
          className="kind-icon"
        />
      </CJView>
    </CJView>
    <CJView className="hot-categories-text">
      <CJText className="categories-text">
        {data.nameLanguageJson.find((item) => item.language === 'en')?.name}
      </CJText>
    </CJView>
  </CJView>
);

export default HotCategories;
