import React from 'react';
import './index.less';
import './loaders.css';
import classname from 'classnames';

export default () => {
  const loader = loaders[0];
  const cls = classname({
    'loader-inner': true,
    [loader.name]: true,
  });
  const title = '拼命的加载中...';
  return (
    <div className="loading-view">
      <div className="loading-animate">
        <div className={cls}>{renderDiv(loader.divNum)}</div>
      </div>
      <div className="title">
        {title.split('').map((t, index) => (
          <span key={index} style={{ animationDelay: `${0.07 * index}s` }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
};
const renderDiv = function(num: number) {
  const temp = [];
  for (let i = 0; i < num; i++) {
    temp.push(<div key={i} />);
  }
  return temp;
};
const loaders = [
  { name: 'ball-pulse', divNum: 3 },
  { name: 'ball-grid-pulse', divNum: 9 },
  { name: 'square-spin', divNum: 1 },
  { name: 'ball-pulse-rise', divNum: 5 },
  { name: 'ball-rotate', divNum: 1 },
  { name: 'cube-transition', divNum: 2 },
  { name: 'ball-zig-zag', divNum: 2 },
  { name: 'ball-triangle-path', divNum: 3 },
  { name: 'ball-scale', divNum: 1 },
  { name: 'line-scale', divNum: 5 },
  { name: 'line-scale-party', divNum: 4 },
  { name: 'ball-scale-multiple', divNum: 3 },
  { name: 'ball-pulse-sync', divNum: 3 },
  { name: 'ball-beat', divNum: 3 },
  { name: 'line-scale-pulse-out', divNum: 5 },
  { name: 'line-scale-pulse-out-rapid', divNum: 5 },
  { name: 'ball-scale-ripple', divNum: 1 },
  { name: 'ball-scale-ripple-multiple', divNum: 3 },
  { name: 'ball-spin-fade-loader', divNum: 8 },
  { name: 'line-spin-fade-loader', divNum: 8 },
  { name: 'pacman', divNum: 1 },
  { name: 'semi-circle-spin', divNum: 1 },
  { name: 'ball-grid-beat', divNum: 9 },
  { name: 'ball-scale-random', divNum: 3 },
];
