import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { ModalProps } from '@/hooks/useModal';
import TypeZero from './customerZero';
import TypeOne from './customerOne';
import TypeTwo from './customerTwo';
import TypeCommon from './customerCommon';
import NewCusDesign from './newCusDesign';
interface Props {
  modal: ModalProps;
}

const Index: React.FC<Props> = ({ modal }) => {
  const { visible, close, onOk, loading, params = {} } = modal;
  // const {type0Arr,type1Arr,type2Arr,typeCommon,ordTableTit,newCusDesignArr} = params;
  const tuCengFun = () => {};
  return (
    <Modal
      title={'个性化信息'}
      width={1000}
      visible={visible}
      onCancel={close}
      onOk={onOk}
      confirmLoading={loading}
      maskClosable={false}
    >
      {params ? (
        <React.Fragment>
          {params?.type0Arr && <TypeZero dataSource={params?.type0Arr} />}
          {params?.type1Arr && <TypeOne dataSource={params?.type1Arr} />}
          {params?.type2Arr && <TypeTwo dataSource={params?.type2Arr} />}
          {params?.typeCommon && (
            <TypeCommon
              dataSource={params?.typeCommon}
              ordTableTit={params?.ordTableTit}
            />
          )}
          {params?.newCusDesignArr && (
            <NewCusDesign
              dataSource={params?.newCusDesignArr}
              tuCengFun={tuCengFun}
            />
          )}
        </React.Fragment>
      ) : null}
    </Modal>
  );
};
export default Index;
