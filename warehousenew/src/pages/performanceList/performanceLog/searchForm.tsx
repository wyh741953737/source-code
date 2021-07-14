import { Col, Form, Row } from 'antd';
import style from './index.less';
import React from 'react';
import { searchFormHooks } from './hooks';
import { connect } from 'dva';
import useOptions from '@/hooks/useOptions';
import { warehouseApply } from '@/option.apply';
import { SearchBtnRender } from '@/components/SearchTable';
import DateSelect from '@/components/CustomFields/DateSelect';
export default connect(({ performanceLog, performanceList }: any) => ({
  searchData: performanceLog.searchData,
  currentItem: performanceList.currentItem,
}))(({ searchData, currentItem, dispatch }: any) => {
  const [option] = useOptions(warehouseApply, { interval: Infinity });
  const { form, onSearch, onClearSearch } = searchFormHooks(
    searchData,
    dispatch,
    currentItem,
  );

  const layout = { labelCol: { span: 6 }, wrapperCol: { span: 18 } };
  return (
    <Form form={form} className={style['search-form']}>
      <Row>
        <Col span={8}>
          <Form.Item label="时间" name="createTime" {...layout}>
            <DateSelect modelType={true} />
          </Form.Item>
        </Col>
        <Col span={4}>
          <SearchBtnRender searchBtn={{ onClearSearch, onSearch }} />
        </Col>
      </Row>
    </Form>
  );
});
