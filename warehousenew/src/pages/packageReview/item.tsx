import React from 'react';
import style from './index.less';
import { Descriptions, Image, Tooltip } from 'antd';
import { GetList } from '@/services/directSend.d';
import classname from 'classnames';
import propertyTraversal from '@/utils/propertyUtils';
export type Status = 'pending' | 'dealing' | 'finish';

interface Props {
  data: GetList.ListItem;
  status: Status;
}

export default ({ data, status }: Props) => {
  const cls = classname({
    [style['item-content']]: true,
    [style[status]]: true,
  });
  return (
    <div className={cls}>
      <div>
        <div className={style.numbers}>
          <span>待检：{data.pendingVerify}</span>
          <span>已检：{data.processedVerify}</span>
        </div>
        <Descriptions column={2} size="small">
          <Descriptions.Item label="SKU">
            <Tooltip placement="topLeft" title={data.variantSku}>
              {data.variantSku}
            </Tooltip>
          </Descriptions.Item>
          <Descriptions.Item label="属性">
            {propertyTraversal(data.variantKeyMap)}
          </Descriptions.Item>
          <Descriptions.Item label="短码">
            <Tooltip placement="topLeft" title={data.variantNum}>
              {data.variantNum}
            </Tooltip>
          </Descriptions.Item>
          <Descriptions.Item label="商品属性">
            <Tooltip placement="topLeft" title={data.property}>
              {data.property}
            </Tooltip>
          </Descriptions.Item>
          <Descriptions.Item label="备注">
            <Tooltip placement="topLeft" title={data.remarks || '-'}>
              {data.remarks || '-'}
            </Tooltip>
          </Descriptions.Item>
          <Descriptions.Item label="拣货库位">
            {data.locationList && data.locationList.length > 0
              ? data.locationList[0].locationName
              : '-'}
          </Descriptions.Item>
        </Descriptions>
        <Image
          alt="图片预览"
          placeholder={true}
          fallback={require('@/assist/cjlogo.png')}
          src={`${data.variantImg}?x-oss-process=image/resize,w_300,m_lfit`}
          preview={true}
          width={330}
          height={330}
        />
      </div>
      {data.batchSortedRecordByBZDTOS &&
        data.batchSortedRecordByBZDTOS.map(b => (
          <div className={style.affiliate}>
            <Descriptions column={2} size="small">
              <Descriptions.Item label="包装" span={2}>
                {b.variantSku}
              </Descriptions.Item>
              <Descriptions.Item label="数量" span={2}>
                {b.uninspectedQuantity}
              </Descriptions.Item>
              <Descriptions.Item label="商品属性">
                {b.property}
              </Descriptions.Item>
              <Descriptions.Item label="备注">
                {b.remarks || '-'}
              </Descriptions.Item>
            </Descriptions>
            <Image
              alt="图片预览"
              placeholder={true}
              fallback={require('@/assist/cjlogo.png')}
              src={`${b.variantImg}?x-oss-process=image/resize,w_300,m_lfit`}
              preview={true}
              width={330}
              height={330}
            />
          </div>
        ))}
      {data.specifiedPackageList &&
        data.specifiedPackageList.map((s, index) => {
          let images: string[] = [];
          try {
            images = JSON.parse(s.imgs);
          } catch (e) {}
          let packs: string[] = [];
          try {
            packs = JSON.parse(s.pack);
          } catch (e) {}
          return (
            <div className={style.pack} key={s.pack + data.variantSku + index}>
              <Descriptions column={2} size="small">
                <Descriptions.Item label="包装" span={2}>
                  {packs.join('，')}
                </Descriptions.Item>
                <Descriptions.Item label="留言" span={2}>
                  {s.remark}
                </Descriptions.Item>
              </Descriptions>
              {images.map(img => (
                <Image
                  alt="图片预览"
                  placeholder={true}
                  fallback={require('@/assist/cjlogo.png')}
                  src={`${img}?x-oss-process=image/resize,w_300,m_lfit`}
                  preview={true}
                  width={330}
                  height={330}
                />
              ))}
            </div>
          );
        })}
    </div>
  );
};
