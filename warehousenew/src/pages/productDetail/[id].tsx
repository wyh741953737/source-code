import React, { useEffect,useState } from 'react';
import styles from './index.less';
import Page from '@/components/Page';
import { history } from 'umi';
import { Row, Button,Descriptions } from 'antd';
import BreadcrumbHeader from '@/components/BreadcrumbHeader';
import * as api from '@/services/productDetails'
import ImagePreview from '@/components/ImagePreview';
import PurchaseLink from './components/purchaseLink';
import RivalLink from './components/rivalLink';
import VariantKeys from './components/variantKeys'
import {PRODUCTTYPE} from '@/enum.config'
export default BreadcrumbHeader([{ name: '商品详情' },])(
 (props:any) => {
   const [dataSource,setDataSource] = useState<any>({}) 
    console.log(props,history);
    const {id} = props.match.params;
    useEffect(()=>{
      api.getProductDetail({productId:id}).then(res=>{
        console.log(res)
        setDataSource(res.data)
      })
    },[])
    const {
      sku,
      name,
      nameEn,
      category,
      description,
      bigImage,
      materialList,
      packingList,
      propertyList,
      entryName,
      entryNameEn,
      supplierName,
      variantKey,
      supplierLink,
      rivalLink,
      productType,
      variantList,
      property1,
      property2,
      property3,
    } = dataSource;
    return (
      <Page>
      <Row className={styles.VoCategory}>
      <Descriptions
          title="商品信息"
          size="middle"
          column={1}
          labelStyle={{width:'100px'}}
        >
          <Descriptions.Item label="商品类目">{category || '-'}</Descriptions.Item>
          <Descriptions.Item label="商品名称">{name || '-'}</Descriptions.Item>
          <Descriptions.Item label="商品英文名称">{nameEn || '-'}</Descriptions.Item>
          <Descriptions.Item label="商品sku">{sku || '-'}</Descriptions.Item>
          <Descriptions.Item label="商品描述" className={styles.edits}> 
            <p dangerouslySetInnerHTML={{__html:description}}></p>
          </Descriptions.Item>
          <Descriptions.Item label="商品图片">
          <ImagePreview key={bigImage} url={bigImage} />
          </Descriptions.Item>
          <Descriptions.Item label="商品材料">
          {Array.isArray(materialList)?materialList.map((item:any)=>item.material).join('、'):'-'}
          </Descriptions.Item>
          <Descriptions.Item label="商品包装">
          {Array.isArray(packingList)?packingList.map((item:any)=>item.packing).join('、'):'-'}
          </Descriptions.Item>
          <Descriptions.Item label="商品属性">
          {Array.isArray(propertyList)?propertyList.map((item:any)=>item.property).join('、'):'-'}
          </Descriptions.Item>
          <Descriptions.Item label="商品类型">
        {PRODUCTTYPE.key(Number(productType))?.value || '-'}
          </Descriptions.Item>
        </Descriptions>
      <Descriptions
          title="仓库信息"
          size="middle"
          column={1}
          labelStyle={{width:'100px'}}
        >
           <Descriptions.Item label="报关名称">{entryName || '-'}</Descriptions.Item>
          <Descriptions.Item label="报关英文名">{entryNameEn || '-'}</Descriptions.Item>
          <Descriptions.Item label="供应商名称">{supplierName || '-'}</Descriptions.Item>
          <Descriptions.Item label="变体属性键"> {Array.isArray(variantKey)?variantKey.join('、'):'-'}</Descriptions.Item>
          <Descriptions.Item span={24} label="采购链接">
          <PurchaseLink supplierLink={supplierLink} />
          </Descriptions.Item>
          <Descriptions.Item span={24} label="对手链接">
          <RivalLink supplierLink={rivalLink} />
          </Descriptions.Item>
          <Descriptions.Item span={24} label="变体集合">
          <VariantKeys list={dataSource} />
          </Descriptions.Item>
          
        </Descriptions>
      </Row>
    </Page>
    );
  });