import React, { useEffect, useRef } from 'react';
import { IconFont } from '@/global';
import useCJHooks from './cjHooks';
import styles from './styles';
import CJVerifyHeader from '../CJVerifyHeader';
import CJDropdown from '../CJDropdown';
import CJLanguage from '../CJLanguage';

interface WProps {}

/** 导航栏 */
export default (props: WProps) => {
  const {} = props;
  const initMsgRef = useRef(false);
  const {
    authList,
    wishList,
    wareList,
    printOnDemand,
    sourcing,
    myCJ,
    userOperateList,
    userSupportList,
  } = useCJHooks();

  useEffect(() => {
    if (initMsgRef.current) return;
    const { CJMsg } = window as any;
    if (CJMsg) {
      new CJMsg({
        getDomainByUrl: (url: string) => url,
        checkVip: true,
      });
      initMsgRef.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [(window as any).CJMsg]);

  return (
    <div className={styles.headerBox}>
      <CJVerifyHeader />
      <div className={styles.menuNav}>
        <div className={`${styles.w1200} ${styles.menuBox}`}>
          <div className={styles.boxLeft}>
            <CJLanguage />
            <CJDropdown title="Authorization" data={authList} />
            <div className={styles.splitLine} />
            <a href={wishList} className={styles.linkItem}>
              Wishlist
            </a>
            <div className={styles.splitLine} />
            <CJDropdown title="Warehouses" data={wareList} />
            <div className={styles.splitLine} />
            <a href={printOnDemand} className={styles.linkItem}>
              Print on Demand
            </a>
            <div className={styles.splitLine} />
            <a href={sourcing} className={styles.linkItem}>
              Sourcing
            </a>
            <div className={styles.splitLine} />
            <a href={myCJ} className={styles.linkItem}>
              My CJ
            </a>
          </div>
          <div className={styles.boxRight}>
            <span id="msgBar">
              <IconFont
                type="icon-xiaoxi"
                style={{ color: '#fff', fontSize: 16 }}
              />
            </span>
            <CJDropdown title="Chalsasdasd" data={userOperateList} />
            <CJDropdown
              placement="right"
              title="Support Center"
              data={userSupportList}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
