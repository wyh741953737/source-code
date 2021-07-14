import React from 'react';
/**属性的遍历展示 */
interface Property {
  [name: string]: string;
}
export default function(params: string | Property | undefined) {
  if (!params) {
    return '-';
  }
  let traversalSource: any = JSON.parse(String(params));
  if (Object.prototype.toString.call(traversalSource) !== '[object Object]') {
    return '-';
  }

  return Object.keys(traversalSource).map(item => {
    return (
      <p>
        {item}:{traversalSource[item]}
      </p>
    );
  });
}
