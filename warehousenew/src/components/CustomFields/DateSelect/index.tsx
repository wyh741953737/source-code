import React, { useEffect, useState } from 'react';
import style from './index.less';
import { DatePicker, Space, Button } from 'antd';
import moment, { Moment } from 'moment';
import * as regExp from '@/regExp.config';

type Value = [Moment, Moment] | undefined;
interface DateSelectProps {
  value?: Value;
  modelType?: boolean;
  onChange?: (v: Value) => void;

  [name: string]: any;
}
export default ({
  value,
  modelType,
  onChange,
  ...PickerProps
}: DateSelectProps) => {
  const [val, setVal] = useState(value);
  const [model, setType] = useState<boolean | undefined>(false);
  useEffect(() => {
    onChange && onChange(val);
  }, [val]);
  useEffect(() => {
    setVal(value);
  }, [value]);
  useEffect(() => {
    setType(modelType);
  }, [modelType]);
  const btnClick = (day: any) => {
    if (regExp.AUTHNUMBERABOUTMINUS.test(day)) {
      const target = moment().add(day, 'days');
      setVal([target, target]);
    } else {
      switch (day) {
        case 'week':
          const weekStart = moment().weekday(0);
          const weekEnd = moment().weekday(6);
          console.log(
            weekStart.format('YYYY-MM-DD'),
            weekEnd.format('YYYY-MM-DD'),
            'week',
          );
          setVal([weekStart, weekEnd]);
          break;
        case 'month':
          const monthStart = moment().startOf('month');
          const monthEnd = moment().endOf('month');

          setVal([monthStart, monthEnd]);
          break;

        case 'threeMonths':
          const threeMonthsStart = moment().subtract(3, 'months');
          const threeEndEnd = moment().add(0, 'days');
          setVal([threeMonthsStart, threeEndEnd]);
          break;
      }
    }
  };
  const active = (day: any) => {
    if (!val || !val[0] || !val[1]) return false;
    if (regExp.AUTHNUMBERABOUTMINUS.test(day)) {
      const target = moment().add(day, 'days');
      return target.isSame(val[0], 'day') && target.isSame(val[1], 'day');
    } else {
      switch (day) {
        case 'week':
          const weekStart = moment().weekday(0);
          const weekEnd = moment().weekday(6);
          return (
            weekStart.isSame(val[0], 'day') && weekEnd.isSame(val[1], 'day')
          );
          break;
        case 'month':
          const monthStart = moment().startOf('month');
          const monthEnd = moment().endOf('month');
          return (
            monthStart.isSame(val[0], 'day') && monthEnd.isSame(val[1], 'day')
          );
          break;

        case 'threeMonths':
          const threeMonthsStart = moment().subtract(3, 'months');
          const threeEndEnd = moment().add(0, 'days');
          return (
            threeMonthsStart.isSame(val[0], 'day') &&
            threeEndEnd.isSame(val[1], 'day')
          );
          break;
      }
    }
  };
  return (
    <div className={style['date-select']}>
      <DatePicker.RangePicker
        value={val}
        onChange={(e: any) => setVal(e)}
        {...PickerProps}
      />
      <Space className={style.space}>
        {!model ? (
          <>
            <Button
              size="small"
              type={active(-2) ? 'primary' : 'default'}
              onClick={() => btnClick(-2)}
            >
              前日
            </Button>
            <Button
              size="small"
              type={active(-1) ? 'primary' : 'default'}
              onClick={() => btnClick(-1)}
            >
              昨日
            </Button>
            <Button
              size="small"
              type={active(0) ? 'primary' : 'default'}
              onClick={() => btnClick(0)}
            >
              今日
            </Button>
          </>
        ) : (
          <>
            <Button
              size="small"
              type={active(0) ? 'primary' : 'default'}
              onClick={() => btnClick(0)}
            >
              今日
            </Button>
            <Button
              size="small"
              type={active('week') ? 'primary' : 'default'}
              onClick={() => btnClick('week')}
            >
              本周
            </Button>
            <Button
              size="small"
              type={active('month') ? 'primary' : 'default'}
              onClick={() => btnClick('month')}
            >
              本月
            </Button>
            <Button
              size="small"
              type={active('threeMonths') ? 'primary' : 'default'}
              onClick={() => btnClick('threeMonths')}
            >
              三个月
            </Button>
          </>
        )}
      </Space>
    </div>
  );
};
