/**
 * 楼层信息同步
 */
import { Floor } from '@common/home';

// 登录用户，同步收藏商品图标
// useless 已用 vue 渲染 04-18
export function syncFloorState() {
  const floors = Floor.floors;
  console.log('初始化Floor')
  const floor = new Floor({ $axios: CJ_.$axios, $ajax: CJ_.$ajax });
  const sync = ([err, data]) => {
    if (err) {
      console.err(err);
    } else {
      data.forEach(item => {
        if (item.isCollect == '1') {
          $(`.${item.productId} .collect`).addClass('active'); // 同步收藏高亮
        }
      });
    }
  };

  floor.getData(floors.floor_1).then(sync);
  floor.getData(floors.floor_2).then(sync);
  floor.getData(floors.floor_3).then(sync);
  floor.getData(floors.floor_5).then(sync);
  floor.getData(floors.floor_6.left).then(sync);
  floor.getData(floors.floor_6.right).then(sync);
  floor.getData(floors.floor_7.left).then(sync);
  floor.getData(floors.floor_7.right).then(sync);
  floor.getData(floors.floor_8).then(sync);
}
