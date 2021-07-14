import RenderToBody from '../RenderToBody';
import React, { FC, useEffect, useRef, useState } from 'react';
import printRequest, { downloadUrl } from '@/utils/print';
import Publisher from '@/utils/publisher';
import { Modal } from 'antd';
import style from './index.less';
import { PrinterOutlined } from '@ant-design/icons/lib';

interface UrlItem {
  title?: string;
  url: string;
  logisticsChannel: string;
  orderId: string;
  logisticsCompany: string;
}

/**
 * 统一封装自动打印，可以批量打印
 * @param urls 需要打印的文件地址数组
 */
export default (urls: Array<UrlItem>) => {
  const p = new Publisher();
  const destroy = RenderToBody.directly(
    <PrintView publisher={p} urls={urls} />,
  );
  p.addListener('close', () => destroy());
};

interface Props {
  urls: Array<UrlItem>;
  publisher: Publisher;
}

type Status = 'pending' | 'doing' | 'done' | 'error';

const STATUS = {
  pending: { title: '等待打印', color: 'gray' },
  doing: { title: '正在打印', color: 'orange' },
  done: { title: '打印成功', color: 'green' },
  error: { title: '打印失败', color: 'red' },
};

interface PrintItem extends UrlItem {
  status: Status;
  message?: string;
}
const PrintView: FC<Props> = ({ urls, publisher }) => {
  const [prints, setPrints] = useState<Array<PrintItem>>(
    urls.map(u => ({ ...u, status: 'pending' })),
  );
  const [printUlrs, setPrintUrls] = useState<Array<UrlItem>>(
    urls.map(u => ({
      url: u.url,
      logisticsChannel: u.logisticsChannel,
      orderId: u.orderId,
      logisticsCompany: u.logisticsCompany,
    })),
  );
  const [closeAble, setCloseAble] = useState<boolean>(false);
  const [noService, setNoService] = useState<boolean>(false);
  const changeStatus = (
    failList: Array<string>,
    status: Status,
    message?: string,
  ): Array<PrintItem> => {
    return prints.map((p, index) => {
      if (failList && failList.length === 0) {
        return { ...p, status, message };
      } else {
        if (failList.indexOf(p.url) !== -1) {
          return { ...p, status: 'error', message };
        } else {
          return { ...p, status, message };
        }
      }
    });
  };
  const printList = async () => {
    const i = prints.findIndex(p => p.status === 'pending');
    if (i === -1) return;
    setPrints(changeStatus([], 'doing'));
    try {
      const resp = await printRequest(printUlrs);
      const { data } = resp;
      setPrints(changeStatus(data, 'done'));
    } catch (e) {
      setCloseAble(true);
      if (e.type === 'noService') {
        setNoService(true);
        setPrints(changeStatus([], 'pending'));
      }
      // setPrints(changeStatus([], 'error', e.message));
    }
  };
  useEffect(() => {
    if (noService || hasStatus('doing')) return;
    if (hasStatus('pending')) {
      printList();
    } else if (allDone()) {
      const timer = setTimeout(close, 2000);
      return () => clearTimeout(timer);
    }
  }, [prints]);
  // 查看是否存在状态
  const hasStatus = (status: Status) => {
    return !!prints.find(p => p.status === status);
  };
  // 是否全部打印成功
  const allDone = () => {
    return prints.reduce(
      (a, b) => a && (b.status === 'done' || b.status === 'error'),
      true,
    );
  };
  const close = () => {
    publisher.dispatch('close');
  };
  // 重新打印
  const rePrint = () => {
    setNoService(false);
    printList();
  };
  return (
    <Modal
      title="打印列表"
      visible={true}
      footer={false}
      onCancel={close}
      closable={closeAble}
      width={450}
    >
      {!noService &&
        prints.map((p, index) => (
          <div
            key={index}
            className={style.item}
            style={{ color: STATUS[p.status].color }}
          >
            <span>
              <PrinterOutlined />
              <span className={style.title}>{p.title}</span>
              {p.message && (
                <span className={style.message}>（{p.message}）</span>
              )}
            </span>
            <span>{STATUS[p.status].title}</span>
          </div>
        ))}
      {noService && (
        <div>
          请确定打印服务是否启动，如果未安装，请先
          <a className={style.download} href={downloadUrl} target="_blank">
            点击下载
          </a>
          并安装后再
          <a className={style.download} onClick={rePrint}>
            重新尝试
          </a>
        </div>
      )}
    </Modal>
  );
};
