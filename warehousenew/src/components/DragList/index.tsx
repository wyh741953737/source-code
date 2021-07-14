import React, { useEffect, useState } from 'react';
import './index.less';
import { Row, Col } from 'antd';

export default ({ data, ...otherPros }: any) => {
  const [lists, setList] = useState<Array<any>>([
    {
      ruleId: '20001',
      ruleName: '订单付款时间',
      ruleRank: 3,
    },
    {
      ruleId: '20002',
      ruleName: '代发订单（单品）',
      ruleRank: 4,
    },
    {
      ruleId: '20003',
      ruleName: '代发订单（多品）',
      ruleRank: 5,
    },
    {
      ruleId: '20005',
      ruleName: '直发订单（私有）',
      ruleRank: 6,
    },
    {
      ruleId: '20004',
      ruleName: '直发订单',
      ruleRank: 7,
    },
    {
      ruleId: '20007',
      ruleName: '缺货异常',
      ruleRank: 8,
    },
  ]);
  const [dragging, setDragging] = useState<boolean>(false);
  const [draggingItemIndex, setDraggingItemIndex] = useState<number>(-1);
  const [startPageY, setStartPageY] = useState<number>(0);
  const [offsetY, setOffsetY] = useState<number>(0);

  useEffect(() => {
    if (data && data.length > 0) {
      setList(data);
    }
  }, [data]);
  const handleMouseDown = (event: any, index: number) => {
    setDragging(true);
    setDraggingItemIndex(index);
    setStartPageY(event.pageY);
  };

  const handleMouseUp = (event: any) => {
    setDragging(false);
    setDraggingItemIndex(-1);
    setStartPageY(0);
    console.log(lists, 'lists=========');
    otherPros.changeValue && otherPros.changeValue(lists);
  };

  const move = (arr: Array<any>, startIndex: number, isMoveDown: boolean) => {
    let newArr: Array<any> = arr.slice();
    let moveItem = newArr.splice(startIndex, 1)[0];
    if (isMoveDown) {
      newArr.splice(startIndex + 1, 0, moveItem);
    } else {
      newArr.splice(startIndex - 1, 0, moveItem);
    }
    return newArr;
  };

  const handleMouseMove = (event: any) => {
    let offset = event.pageY - startPageY;
    let draggingIndex = draggingItemIndex;
    const lineHeight = 39; //通过document.querySelector('.listContainer li').offsetHeight获取
    //move down
    //当移动的item没有超过list的长度， 则每往下移动超过lineHeight，就把数组中数据往后挪一位。相应的draggingItemIndex 和 startPageY都要增加一位。
    if (offset > lineHeight && draggingIndex < lists.length - 1) {
      offset -= lineHeight;
      let arrData: Array<any> = move(lists, draggingIndex, true);
      setList(arrData);
      setDraggingItemIndex(draggingIndex + 1);
      setStartPageY(startPageY + lineHeight);

      //当移动的item还是list里面， 则每往上移动超过lineHeight，就把数组中数据往前挪一位。相应的draggingItemIndex 和 startPageY都要减少一位。
    } else if (offset < -lineHeight && draggingIndex > 0) {
      offset += lineHeight;
      let arrData: Array<any> = move(lists, draggingIndex, false);
      setList(arrData);
      setDraggingItemIndex(draggingIndex - 1);
      setStartPageY(startPageY - lineHeight);
    }

    setOffsetY(offset);
  };

  const getDraggingStyle = (index: number) => {
    if (index === draggingItemIndex) {
      return {
        backgroundColor: '#eee',
        transform: `translate(10px, ${offsetY}px)`,
        opacity: 0.5,
      };
    } else {
      return {};
    }
  };

  return (
    <div className="listContainer">
      {lists.map((item, index) => (
        <li
          key={item.ruleId}
          onMouseDown={event => handleMouseDown(event, index)}
          style={getDraggingStyle(index)}
        >
          <Row>
            <Col span={10} offset={2} style={{ textAlign: 'right' }}>
              {item.ruleName}
            </Col>
            <Col span={10} offset={2}>
              <span>{index + 3}</span>
            </Col>
          </Row>
        </li>
      ))}
      {dragging && (
        <div
          className="coverMask"
          onMouseUp={event => {
            handleMouseUp(event);
          }}
          onMouseMove={event => {
            handleMouseMove(event);
          }}
        />
      )}
    </div>
  );
};
