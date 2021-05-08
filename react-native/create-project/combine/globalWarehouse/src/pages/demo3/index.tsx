import React from 'react';
import { CJHeader } from '../../components/mobile';
import { CJView, CJText, CJButton } from '../../components/baseUI';

const pageId = 'demo003';

export default () => (
  <>
    <CJHeader title="埋点" />
    <CJView
      style={{ margin: 16 }}
      data-tracking-page-load={JSON.stringify({
        pageId,
        eventId: `${pageId}-01`,
        pageLoad: '测试h5页面浏览埋点',
      })}
    >
      <CJText>{i18n.t('page-demo3-index')}</CJText>
      <CJButton
        data-tracking-element-click={JSON.stringify({
          testClick: '测试点击埋点',
        })}
      >
        {i18n.t('page-demo3-index-button')}
      </CJButton>
      <CJText
        data-tracking-element-view={JSON.stringify({
          testView: '测试曝光埋点',
        })}
      >
        曝光的埋点(h5)
      </CJText>
    </CJView>
  </>
);
