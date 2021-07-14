import React, { useState } from 'react';
import {
  CJFragment,
  CJScrollView,
  CJText,
  CJButton,
  CJInput,
  CJCheckbox,
  CJImage,
  CJImageBackground,
  CJLinearGradient,
  CJIcon,
  CJLink,
  CJSwitch,
  CJModal,
  CJNoticeBar,
  CJPanel,
  CJToast,
  CJPicker,
} from '@/components/baseUI';
import { CJHeader } from '@/components/mobile';
import { getListApi, isRegisterApi } from '@/services/testApi';
import { toDemo2 } from '@/utils/location';
import { setTokenStorage, getTokenStorage } from '@/utils/storage';
import styles from './styles';

export default () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [visiblePicker, setVisiblePicker] = useState<boolean>(false);

  const dataSource = [
    { label: 'test1', value: 'test-1' },
    { label: 'test2', value: 'test-2' },
    { label: 'test3', value: 'test-3' },
    { label: 'test4', value: 'test-4' },
  ];

  const checkBoxData = [
    { value: 0, label: 'Ph.D.', checked: true },
    { value: 1, label: 'Bachelor', checked: false },
    { value: 2, label: 'College diploma', checked: false },
  ];

  const handleClick = () => {
    toDemo2();
  };

  const handleRequest = async () => {
    const res1 = await getListApi({ pageNumber: 1 });
    const res2 = await isRegisterApi({ email: '1162258400@qq.com' });
    console.log(res1);
    console.log(res2);
  };

  const handleCheckBox = (check: boolean | number) => {
    console.log('check=', check);
  };

  const handleSwitch = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };

  return (
    <CJFragment>
      <CJHeader title="基础组件简介" isBack={false} />
      <CJScrollView className={styles.wrap}>
        <CJText className={styles.title}>button-default</CJText>
        <CJButton onClick={handleClick}>去demo2页面</CJButton>
        <CJText className={styles.title}>button-primary</CJText>
        <CJButton type="primary" onClick={handleRequest}>
          request请求
        </CJButton>
        <CJText className={styles.title}>button-disabled</CJText>
        <CJButton disabled onClick={handleClick}>
          button
        </CJButton>
        <CJText className={styles.title}>input</CJText>
        <CJInput />
        <CJText className={styles.title}>checkbox</CJText>
        <CJCheckbox onChange={handleCheckBox}>checkbox</CJCheckbox>
        {checkBoxData.map((item) => (
          <CJCheckbox
            key={item.value}
            checked={item.checked}
            onChange={() => handleCheckBox(item.value)}
          >
            {item.label}
          </CJCheckbox>
        ))}
        <CJText className={styles.title}>image 本地图片require引入</CJText>
        <CJImage
          source={require('../../assets/images/test.png')}
          className={styles.image}
        />
        <CJText className={styles.title}>image 网络图对象形式传入</CJText>
        <CJImage
          source={{
            uri:
              'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
          }}
          className={styles.image}
        />
        <CJText className={styles.title}>
          CJImageBackground 需要手动指定宽高或者内容撑开，背景图平铺方式样式
        </CJText>
        <CJImageBackground
          source={{
            uri:
              'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
          }}
          className={styles.image_background}
        />
        <CJImageBackground
          source={require('../../assets/images/test.png')}
          className={styles.image_background_content}
        >
          <CJText>内容撑开</CJText>
          <CJText>内容撑开</CJText>
          <CJText>内容撑开</CJText>
          <CJText>内容撑开</CJText>
          <CJText>内容撑开</CJText>
          <CJText>内容撑开</CJText>
          <CJText>内容撑开</CJText>
          <CJText>内容撑开</CJText>
          <CJText>内容撑开</CJText>
          <CJText>内容撑开</CJText>
          <CJText>内容撑开</CJText>
          <CJText>内容撑开</CJText>
          <CJText>内容撑开</CJText>
          <CJText>内容撑开</CJText>
          <CJText>内容撑开</CJText>
          <CJText>内容撑开</CJText>
          <CJText>内容撑开</CJText>
          <CJText>内容撑开</CJText>
          <CJText>内容撑开</CJText>
          <CJText>内容撑开</CJText>
          <CJText>内容撑开</CJText>
        </CJImageBackground>
        <CJText className={styles.title}>
          背景色 h5端单独设置样式, app参考文档
        </CJText>
        <CJLinearGradient
          onClick={handleRequest}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          locations={[0, 0.51, 0.75]}
          colors={['#9fb8ad', '#1fc8db', '#2cb5e8']}
          className={styles.linear_gradient}
        >
          渐变色
        </CJLinearGradient>
        <CJText className={styles.title}>icon</CJText>
        <CJIcon
          name="icondanxuanyixuanzhong-Radioselected"
          size="20"
          color="#2cb5e8"
        />
        <CJText className={styles.title}>链接跳转</CJText>
        <CJLink to="https://www.baidu.com">百度</CJLink>
        <CJText className={styles.title}>开关</CJText>
        <CJSwitch onChange={handleSwitch} />
        <CJText className={styles.title}>弹窗</CJText>
        <CJButton onClick={() => setVisible(true)}>show modal</CJButton>
        <CJModal
          visible={visible}
          title="testModal"
          content="123123123"
          onOk={() => console.log('confirm')}
          onCancel={() => setVisible(false)}
        />
        <CJText className={styles.title}>通告栏</CJText>
        <CJNoticeBar mode="closable" marqueeProps={{ loop: true }}>
          通告栏通告栏通告栏通告栏通告栏通告栏通告栏通告栏通告栏
        </CJNoticeBar>
        <CJText className={styles.title}>面板卡片</CJText>
        <CJPanel title="Test">
          <CJText>123123</CJText>
        </CJPanel>
        <CJText className={styles.title}>轻提示</CJText>
        <CJButton
          onClick={() => {
            CJToast.success('success', 2);
          }}
        >
          Toast
        </CJButton>
        <CJText className={styles.title}>底部下拉选择器</CJText>
        <CJButton onClick={() => setVisiblePicker(true)}>show picker</CJButton>
        <CJPicker
          showSearch
          initValue="test-1"
          visible={visiblePicker}
          dataSource={dataSource}
          onOk={(active) => console.log(active)}
          onCancel={() => setVisiblePicker(false)}
        />
        <CJText className={styles.title}>本地存储存取</CJText>
        <CJButton onClick={async () => setTokenStorage('123123123123')}>
          setToken
        </CJButton>
        <CJButton onClick={async () => console.log(await getTokenStorage())}>
          getToken
        </CJButton>
      </CJScrollView>
    </CJFragment>
  );
};
