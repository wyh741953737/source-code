import React from 'react';
import { Tooltip, Button } from 'antd';
import styles from './index.less';


interface WProps {}
// 价格：货币类型， 

/** 导航栏 */
export default (props: WProps) => {
  const {} = props;
  return (
    <div className={styles.card}>
        <div className={styles.content}>
            <div className={styles.hasAddQueue}><img className={styles.image} src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1036787668,956084325&fm=224&gp=0.jpg" alt="" /></div>
            <div className={styles.description}>Sale Price Adjuster alloe you to ypu justify content my cj job time</div>
            <div className={styles.lists}>
                <div className={styles.count}>Lists: 20000</div>
                <div className={styles.icon}>图标</div>
                <div className={styles.collect}>收藏</div>
            </div>
            <div className={styles.salePrice}>
                <div className={styles.nowPrice}>$ 12.87-20.45</div>
                <del className={styles.oldProce}>$ 12.87-20.45</del>
            </div>
            <div className={styles.viewInventory}>
                <Tooltip placement="topLeft" title="Thaliand Warehousre   80">
                    <Button className={styles.inventory}>View Inventory</Button>
                </Tooltip>
                <div className={styles.listBtn}>List</div>
            </div>
            <div className={styles.addQueue}><span>+</span><span>Add to Queue</span></div>
        </div>
        

        <div className={styles.content}>
            <div className={styles.hasAddQueue}><img className={styles.image} src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1036787668,956084325&fm=224&gp=0.jpg" alt="" /></div>
            <div className={styles.description }>Sale Price Adjuster alloe you to ypu justify content my cj job time</div>
            <div className={styles.lists}>
                <div className={styles.count}>Lists: 20000</div>
                <div className={styles.icon}>图标</div>
                <div className={styles.collect}>收藏</div>
            </div>
            <div className={styles.salePrice}>
                <div className={styles.nowPrice}>$ 12.87-20.45</div>
                <del className={styles.oldProce}>$ 12.87-20.45</del>
            </div>
            <div className={styles.viewInventory}>
                <Tooltip placement="topLeft" title="Thaliand Warehousre   80">
                    <Button className={styles.inventory}>View Inventory</Button>
                </Tooltip>
                <div className={styles.listBtn}>List</div>
            </div>
            <div className={styles.addQueue}><span>+</span><span>Add to Queue</span></div>
        </div>

        <div className={styles.content}>
            <div className={styles.hasAddQueue}><img className={styles.image} src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1036787668,956084325&fm=224&gp=0.jpg" alt="" /></div>
            <div className={styles.description}>Sale Price Adjuster alloe you to ypu justify content my cj job time</div>
            <div className={styles.lists}>
                <div className={styles.count}>Lists: 20000</div>
                <div className={styles.icon}>图标</div>
                <div className={styles.collect}>收藏</div>
            </div>
            <div className={styles.salePrice}>
                <div className={styles.nowPrice}>$ 12.87-20.45</div>
                <del className={styles.oldProce}>$ 12.87-20.45</del>
            </div>
            <div className={styles.viewInventory}>
               <Tooltip placement="topLeft" title="Thaliand Warehousre   80">
                    <Button className={styles.inventory}>View Inventory</Button>
                </Tooltip>
                <div className={styles.listBtn}>List</div>
            </div>
            <div className={styles.addQueue}><span>+</span><span>Add to Queue</span></div>
        </div>

        <div className={styles.content}>
            <div className={styles.warp}><img className={styles.image} src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1036787668,956084325&fm=224&gp=0.jpg" alt="" /></div>
            <div className={`${styles.description} ${styles.hasNoQueuedesc}`}>Sale Price Adjuster alloe you to ypu justify content my cj job time</div>
            <div className={styles.lists}>
                <div className={styles.count}>Lists: 20000</div>
                <div className={styles.icon}>图标</div>
                <div className={styles.collect}>收藏</div>
            </div>
            <div className={styles.salePrice}>
                <div className={styles.nowPrice}>$ 12.87-20.45</div>
                <del className={styles.oldProce}>$ 12.87-20.45</del>
            </div>
            <div className={styles.viewInventory}>
                <Tooltip placement="topLeft" title="Thaliand Warehousre   80">
                    <Button className={styles.inventory}>View Inventory</Button>
                </Tooltip>
                <div className={styles.listBtn}>List</div>
            </div>
        </div>
        
    </div>
  );
};
