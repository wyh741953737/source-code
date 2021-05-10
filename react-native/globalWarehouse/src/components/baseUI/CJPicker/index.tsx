import React, { FC, useEffect, useState } from 'react';
import { CJText, CJView, CJScrollView, CJInput, CJIcon } from '../index';
import { Modal } from './components';
import { useStopScoll } from '../../../hooks';
import styles from './styles';

interface Item {
  /* label 标题 */
  label: string;
  /* value */
  value: string;
  /* 是否选中 */
  active?: boolean;
}

interface IProps {
  /* 初始值 */
  initValue: string | null;
  /* 数据源 */
  dataSource: Item[];
  /* 控制弹窗显示隐藏 */
  visible: boolean;
  /* 遮罩层样式 */
  rnStyle?: object;
  /* h5 遮罩层样式 */
  h5Style?: object;
  /* item 样式 */
  rnItemClass?: object;
  /* h5 item 样式 */
  h5ItemClass?: string;
  /* 确认按钮文字 */
  okText?: string;
  /* 取消按钮文字 */
  cancelText?: string;
  /* 确认事件回调 */
  onOk?: (props: any) => void;
  /* 取消事件回调 */
  onCancel?: () => void;
  /* 是否显示搜索栏 */
  showSearch?: boolean;
}

const Index: FC<IProps> = (props) => {
  const {
    dataSource,
    initValue,
    visible,
    rnStyle,
    h5Style,
    rnItemClass,
    h5ItemClass,
    okText,
    cancelText,
    onOk,
    onCancel,
    showSearch,
  } = props;
  const [search, setSearch] = useState<string>('');
  const [newData, setNewData] = useState<Item[]>([]);
  const [cloneData, setCloneData] = useState<Item[]>([]);

  // 禁用滚动条
  useStopScoll(visible);

  useEffect(() => {
    // 如果有数据源, 那么拿到数据源, 并拷贝备份
    if (dataSource && (initValue || visible)) {
      const dataList = dataSource.map((obj: Item) => ({
        ...obj,
        active: obj.value === initValue,
      }));
      setNewData(dataList);
      setCloneData(dataList);
    }
    if (visible) {
      setSearch('');
    }
  }, [initValue, visible, dataSource]);

  useEffect(() => {
    let data = cloneData;
    if (search) {
      data = cloneData.filter((item: Item) =>
        item.label.toLowerCase().includes(search.toLowerCase()),
      );
    }
    setNewData(data);
  }, [search]);

  const onChange = (value: string) => {
    setSearch(value);
  };

  const handleCancel = () => {
    // @ts-ignore
    onCancel();
  };

  const handleOk = () => {
    const filterItem = newData.filter((obj: Item) => obj.active);
    const selected = filterItem?.length > 0 ? filterItem[0] : {};
    delete selected.active;
    // @ts-ignore
    onOk({ ...selected });
  };

  const onSelect = (item: any) => {
    setNewData(
      newData.map((obj: Item) => ({
        ...obj,
        active: obj.value === item.value,
      })),
    );
  };

  return (
    <>
      {visible && (
        <Modal visible={visible} animationType="fade" transparent>
          <CJView
            rnClass={[styles.mask, { ...rnStyle }]}
            h5Class={`${styles.mask}`}
            h5Style={h5Style}
            onClick={handleCancel}
          />
          <CJView className={styles.picker_warp}>
            <CJView className={styles.title_box}>
              <CJText className={styles.cancel_text} onClick={handleCancel}>
                {cancelText}
              </CJText>
              <CJText className={styles.confirm_text} onClick={handleOk}>
                {okText}
              </CJText>
            </CJView>
            {showSearch && (
              <CJView className={styles.search_box}>
                <CJIcon
                  name="iconsousuo-search"
                  rnClass={styles.prefix}
                  h5Class={styles.prefix}
                  color="#c0c4cc"
                  size={16}
                />
                <CJInput
                  className={styles.input}
                  rnInputStyle={styles.inputStyle}
                  placeholder="Search"
                  keyboardType="default"
                  value={search}
                  returnKeyType="done"
                  onCJChangeText={onChange}
                />
              </CJView>
            )}
            <CJView className={styles.divider} />
            <CJScrollView rnClass={styles.item_warp} h5Class={styles.item_wrap}>
              {newData?.map((obj: any) => (
                <CJText
                  key={obj.value}
                  onClick={() => onSelect(obj)}
                  h5Class={`${styles.item} ${
                    obj.active ? styles.active : ''
                  } ${h5ItemClass}`}
                  rnClass={[
                    styles.item,
                    obj.active && styles.active,
                    rnItemClass,
                  ]}
                >
                  {obj.label}
                </CJText>
              ))}
            </CJScrollView>
          </CJView>
        </Modal>
      )}
    </>
  );
};

Index.defaultProps = {
  rnStyle: {},
  h5Style: {},
  rnItemClass: {},
  h5ItemClass: '',
  initValue: null,
  visible: false,
  okText: 'Confirm',
  cancelText: 'Cancel',
  dataSource: [],
  showSearch: false,
};

export default Index;
