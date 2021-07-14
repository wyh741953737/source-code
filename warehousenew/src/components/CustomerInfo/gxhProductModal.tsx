import React, { useEffect, useState } from 'react';
import { Modal, Table } from 'antd';
import { ModalProps } from '@/hooks/useModal';
import ImagePreview from '@/components/ImagePreview';
import useModal from '@/hooks/useModal';
import TucengModal from '@/components/CustomerInfo/tucengModal';
interface Props {
  modal: ModalProps;
}

/**
 *
 * @param gxhProductFlag
 * @param properties
 * @param properties.cj_content
 * @param properties.cj_custom
 * @returns
 */
const Index: React.FC<Props> = ({ modal }) => {
  const { visible, close, onOk, loading, params } = modal;
  const { properties, dzList, newCusDesignArr, sku } = params || {
    properties: {},
    dzList: [],
    newCusDesignArr: [],
    sku: '',
  };
  const { cj_custom, cj_content, type } = properties;

  const columns = [
    {
      title: ``,
      dataIndex: 'image',
      key: 'image',
      colSpan: 2,
      render: (text: string, record: any) => {
        const keyArr = Object.keys(record);
        return keyArr.map(item => <div>{item}</div>);
      },
    },
    {
      title: '下载图片',
      dataIndex: 'showimgurl',
      key: 'showimgurl',
      colSpan: 2,
      render: (text: string, record: any) => {
        const keyArr = Object.keys(record);
        return keyArr.map(item => {
          if (item != 'cj_count' && record[item].indexOf('http') != -1) {
            return (
              <div
                style={{
                  display: 'flex',
                  justifyItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ImagePreview
                  key={record[item].replace('dl=1', 'preview=1')}
                  url={record[item].replace('dl=1', 'preview=1')}
                />
                <a
                  download
                  target="_blank"
                  href={record[item]}
                  style={{ fontSize: '13px', marginLeft: '10px' }}
                >
                  下载图片
                </a>
              </div>
            );
          } else {
            return record[item];
          }
        });
      },
    },
  ];
  const columns2 = [
    {
      title: '定制位置',
      dataIndex: 'location',
      key: 'location',
      render: (text: string, record: any) => {
        if (record.customMessgae.zone.front) {
          return '前';
        }
        if (record.customMessgae.zone.back) {
          return '后';
        }
      },
    },
    {
      title: '定制区域图',
      dataIndex: 'editimgurl',
      key: 'editimgurl',
      render: (text: string, record: any) => {
        if (record.customMessgae.zone.front) {
          return (
            <ImagePreview
              key={record.customMessgae.zone.front.editimgurl}
              url={record.customMessgae.zone.front.editimgurl}
            />
          );
        }
        if (record.customMessgae.zone.back) {
          return (
            <ImagePreview
              key={record.customMessgae.zone.back.editimgurl}
              url={record.customMessgae.zone.back.editimgurl}
            />
          );
        }
        return <ImagePreview key={''} url={''} />;
      },
    },
    {
      title: '展示图',
      dataIndex: 'showimgurl',
      key: 'showimgurl',
      width: 120,
      render: (text: string, record: any) => {
        if (record.customMessgae.zone.front) {
          return (
            <ImagePreview
              key={record.customMessgae.zone.front.showimgurl}
              url={record.customMessgae.zone.front.showimgurl}
            />
          );
        }
        if (record.customMessgae.zone.back) {
          return (
            <ImagePreview
              key={record.customMessgae.zone.back.showimgurl}
              url={record.customMessgae.zone.back.showimgurl}
            />
          );
        }
        return <ImagePreview key={''} url={''} />;
      },
    },
    {
      title: '定制信息',
      dataIndex: 'beizhu',
      key: 'beizhu',
      render: (text: string, record: any) => {
        return '-';
      },
    },
    {
      title: '下载图片',
      dataIndex: 'isServiceGoods',
      key: 'isServiceGoods',
      width: 120,
      render: (text: number, record: any) => {
        if (record.customMessgae.zone.front) {
          return (
            <a
              download=""
              target="_blank"
              href={record.customMessgae.zone.front.editimgurl}
              style={{ fontSize: '13px' }}
            >
              下载图片
            </a>
          );
        }
        if (record.customMessgae.zone.back) {
          return (
            <a
              download=""
              target="_blank"
              href={record.customMessgae.zone.back.editimgurl}
              style={{ fontSize: '13px' }}
            >
              下载图片
            </a>
          );
        }
        return '-';
      },
    },
  ];
  const columns3 = [
    {
      title: '定制位置',
      dataIndex: 'location',
      key: 'location',
      render: (text: string, record: any) => {
        if (record.customDesign.front) {
          return '前';
        }
        if (record.customDesign.back) {
          return '后';
        }
      },
    },
    {
      title: '定制区域图',
      dataIndex: 'editimgurl',
      key: 'editimgurl',
      render: (text: string, record: any) => {
        if (record.customDesign.front) {
          return (
            <ImagePreview
              key={record.customDesign.front.imgUrl}
              url={record.customDesign.front.imgUrl}
            />
          );
        }
        if (record.customDesign.back) {
          return (
            <ImagePreview
              key={record.customDesign.back.imgUrl}
              url={record.customDesign.back.imgUrl}
            />
          );
        }
        return <ImagePreview key={''} url={''} />;
      },
    },
    {
      title: '定制信息',
      dataIndex: 'beizhu',
      key: 'beizhu',
      render: (text: string, record: any) => {
        if (record.customDesign.front) {
          return '-';
        }
        if (record.customDesign.back) {
          return '-';
        }
        if (record.customDesign.front) {
          return (
            <React.Fragment>
              {record.customDesign.front.text && (
                <p className="pod-text-p">
                  <span className="pod-text-tit">定制文字:</span>
                  <span>{record.customDesign.front.text}</span>
                </p>
              )}
              {record.customDesign.front.fontsize && (
                <p className="pod-text-p">
                  <span className="pod-text-tit">字体大小:</span>
                  <span>{record.customDesign.front.fontsize}</span>
                </p>
              )}
              {record.customDesign.front.fontcolor && (
                <p className="pod-text-p">
                  <span className="pod-text-tit">字体颜色:</span>
                  <span>{record.customDesign.front.fontcolor}</span>
                </p>
              )}
              {record.customDesign.front.fontfamily && (
                <p className="pod-text-p">
                  <span className="pod-text-tit">字体名字:</span>
                  <span>{record.customDesign.front.fontfamily}</span>
                </p>
              )}
            </React.Fragment>
          );
        }
        if (record.customDesign.back) {
          return (
            <React.Fragment>
              {record.customDesign.back.text && (
                <p className="pod-text-p">
                  <span className="pod-text-tit">定制文字:</span>
                  <span>{record.customDesign.back.text}</span>
                </p>
              )}
              {record.customDesign.back.fontsize && (
                <p className="pod-text-p">
                  <span className="pod-text-tit">字体大小:</span>
                  <span>{record.customDesign.back.fontsize}</span>
                </p>
              )}
              {record.customDesign.back.fontcolor && (
                <p className="pod-text-p">
                  <span className="pod-text-tit">字体颜色:</span>
                  <span>{record.customDesign.back.fontcolor}</span>
                </p>
              )}
              {record.customDesign.back.fontfamily && (
                <p className="pod-text-p">
                  <span className="pod-text-tit">字体名字:</span>
                  <span>{record.customDesign.back.fontfamily}</span>
                </p>
              )}
            </React.Fragment>
          );
        }
        return '-';
      },
    },
    {
      title: '下载图片',
      dataIndex: 'isServiceGoods',
      key: 'isServiceGoods',
      width: 120,
      render: (text: number, record: any) => {
        if (record.customDesign.front) {
          return (
            <a
              download=""
              target="_blank"
              href={record.customDesign.front.imgUrl}
              style={{ fontSize: '13px' }}
            >
              下载图片
            </a>
          );
        }
        if (record.customDesign.back) {
          return (
            <a
              download=""
              target="_blank"
              href={record.customDesign.back.imgUrl}
              style={{ fontSize: '13px' }}
            >
              下载图片
            </a>
          );
        }
        return '-';
      },
    },
  ];
  const columns4 = [
    {
      title: '定制位置',
      dataIndex: 'location',
      key: 'location',
      render: (text: string, record: any) => {
        if (record.customMessgae.zone.front) {
          return '前';
        }
        if (record.customMessgae.zone.back) {
          return '后';
        }
      },
    },
    {
      title: '定制区域图',
      dataIndex: 'editimgurl',
      key: 'editimgurl',
      render: (text: string, record: any) => {
        if (record.customMessgae.zone.front) {
          return (
            <ImagePreview
              key={record.customMessgae.zone.front.editimgurl}
              url={record.customMessgae.zone.front.editimgurl}
            />
          );
        }
        if (record.customMessgae.zone.back) {
          return (
            <ImagePreview
              key={record.customMessgae.zone.back.editimgurl}
              url={record.customMessgae.zone.back.editimgurl}
            />
          );
        }
        return <ImagePreview key={''} url={''} />;
      },
    },
    {
      title: '展示图',
      dataIndex: 'showimgurl',
      key: 'showimgurl',
      width: 120,
      render: (text: string, record: any) => {
        if (record.customMessgae.zone.front) {
          return (
            <ImagePreview
              key={record.customMessgae.zone.front.showimgurl}
              url={record.customMessgae.zone.front.showimgurl}
            />
          );
        }
        if (record.customMessgae.zone.back) {
          return (
            <ImagePreview
              key={record.customMessgae.zone.back.showimgurl}
              url={record.customMessgae.zone.back.showimgurl}
            />
          );
        }
        return <ImagePreview key={''} url={''} />;
      },
    },
    {
      title: '定制信息',
      dataIndex: 'beizhu',
      key: 'beizhu',
      render: (text: string, record: any) => {
        return '-';
      },
    },
    {
      title: '下载图片',
      dataIndex: 'isServiceGoods',
      key: 'isServiceGoods',
      width: 120,
      render: (text: number, record: any) => {
        if (record.customMessgae.zone.front) {
          return (
            <a
              download=""
              target="_blank"
              href={record.customMessgae.zone.front.editimgurl}
              style={{ fontSize: '13px' }}
            >
              下载图片
            </a>
          );
        }
        if (record.customMessgae.zone.back) {
          return (
            <a
              download=""
              target="_blank"
              href={record.customMessgae.zone.back.editimgurl}
              style={{ fontSize: '13px' }}
            >
              下载图片
            </a>
          );
        }
        return '-';
      },
    },
  ];

  const columns5 = [
    {
      title: '定制位置',
      dataIndex: 'location',
      key: 'location',
      render: (text: string, record: any) => {
        if (record.customPodDesign.cj_pod_zone_front) {
          return '前';
        }
        if (record.customPodDesign.cj_pod_zone_back) {
          return '后';
        }
      },
    },
    {
      title: '定制区域图',
      dataIndex: 'editimgurl',
      key: 'editimgurl',
      render: (text: string, record: any) => {
        if (record.customPodDesign.cj_pod_zone_front) {
          return (
            <ImagePreview
              key={record.customPodDesign.cj_pod_zone_front.design_sketch}
              url={record.customPodDesign.cj_pod_zone_front.design_sketch}
            />
          );
        }
        if (record.customPodDesign.cj_pod_zone_back) {
          return (
            <ImagePreview
              key={record.customPodDesign.cj_pod_zone_back.design_sketch}
              url={record.customPodDesign.cj_pod_zone_back.design_sketch}
            />
          );
        }
        return <ImagePreview key={''} url={''} />;
      },
    },
    {
      title: '展示图',
      dataIndex: 'showimgurl',
      key: 'showimgurl',
      width: 120,
      render: (text: string, record: any) => {
        if (record.customPodDesign.cj_pod_zone_front) {
          return (
            <ImagePreview
              key={record.customPodDesign.cj_pod_zone_front.podimage}
              url={record.customPodDesign.cj_pod_zone_front.podimage}
            />
          );
        }
        if (record.customPodDesign.cj_pod_zone_back) {
          return (
            <ImagePreview
              key={record.customPodDesign.cj_pod_zone_back.podimage}
              url={record.customPodDesign.cj_pod_zone_back.podimage}
            />
          );
        }
        return <ImagePreview key={''} url={''} />;
      },
    },
    {
      title: '定制信息',
      dataIndex: 'beizhu',
      key: 'beizhu',
      render: (text: string, record: any) => {
        if (record.customPodDesign.cj_pod_zone_front) {
          return (
            <React.Fragment>
              {record.customPodDesign.cj_pod_color && (
                <p className="pod-text-p">
                  <span className="pod-text-tit">定制商品颜色:</span>
                  <span>{record.customPodDesign.cj_pod_color}</span>
                </p>
              )}
              {record.customPodDesign.cj_pod_zone_front.podtext && (
                <p className="pod-text-p">
                  <span className="pod-text-tit">定制文字:</span>
                  <span>
                    {record.customPodDesign.cj_pod_zone_front.podtext}
                  </span>
                </p>
              )}
              {record.customPodDesign.cj_pod_zone_front.fontsize && (
                <p className="pod-text-p">
                  <span className="pod-text-tit">字体大小:</span>
                  <span>
                    {record.customPodDesign.cj_pod_zone_front.fontsize}
                  </span>
                </p>
              )}
              {record.customPodDesign.cj_pod_zone_front.fontcolor && (
                <p className="pod-text-p">
                  <span className="pod-text-tit">字体颜色:</span>
                  <span>
                    {record.customPodDesign.cj_pod_zone_front.fontcolor}
                  </span>
                </p>
              )}
              {record.customPodDesign.cj_pod_zone_front.fontfamily && (
                <p className="pod-text-p">
                  <span className="pod-text-tit">字体名字:</span>
                  <span>
                    {record.customPodDesign.cj_pod_zone_front.fontfamily}
                  </span>
                </p>
              )}
            </React.Fragment>
          );
        }
        if (record.customPodDesign.cj_pod_zone_back) {
          return (
            <React.Fragment>
              {record.customPodDesign.cj_pod_color && (
                <p className="pod-text-p">
                  <span className="pod-text-tit">定制商品颜色:</span>
                  <span>{record.customPodDesign.cj_pod_color}</span>
                </p>
              )}
              {record.customPodDesign.cj_pod_zone_back.podtext && (
                <p className="pod-text-p">
                  <span className="pod-text-tit">定制文字:</span>
                  <span>{record.customPodDesign.cj_pod_zone_back.podtext}</span>
                </p>
              )}
              {record.customPodDesign.cj_pod_zone_back.fontsize && (
                <p className="pod-text-p">
                  <span className="pod-text-tit">字体大小:</span>
                  <span>
                    {record.customPodDesign.cj_pod_zone_back.fontsize}
                  </span>
                </p>
              )}
              {record.customPodDesign.cj_pod_zone_back.fontcolor && (
                <p className="pod-text-p">
                  <span className="pod-text-tit">字体颜色:</span>
                  <span>
                    {record.customPodDesign.cj_pod_zone_back.fontcolor}
                  </span>
                </p>
              )}
              {record.customPodDesign.cj_pod_zone_back.fontfamily && (
                <p className="pod-text-p">
                  <span className="pod-text-tit">字体名字:</span>
                  <span>
                    {record.customPodDesign.cj_pod_zone_back.fontfamily}
                  </span>
                </p>
              )}
            </React.Fragment>
          );
        }
        return '-';
      },
    },
    {
      title: '下载图片',
      dataIndex: 'isServiceGoods',
      key: 'isServiceGoods',
      width: 120,
      render: (text: number, record: any) => {
        if (record.customPodDesign.cj_pod_zone_front) {
          return (
            <a
              download=""
              target="_blank"
              href={record.customPodDesign.cj_pod_zone_front.podimage}
              style={{ fontSize: '13px' }}
            >
              下载图片
            </a>
          );
        }
        if (record.customPodDesign.cj_pod_zone_back) {
          return (
            <a
              download=""
              target="_blank"
              href={record.customPodDesign.cj_pod_zone_back.podimage}
              style={{ fontSize: '13px' }}
            >
              下载图片
            </a>
          );
        }
        return '-';
      },
    },
  ];

  const columns6 = [
    {
      title: '第三方定制信息',
      dataIndex: 'showimgurl',
      key: 'showimgurl',
      colSpan: 2,
      render: (text: string, record: any) => {
        const keyArr = Object.keys(record);
        return keyArr.map(item => {
          return (
            <React.Fragment>
              <a
                download=""
                target="_blank"
                href={record[item]}
                style={{ fontSize: '13px' }}
              >
                下载图片
              </a>
              {item}:
              {record[item].indexOf('https') == -1 ? (
                record[item]
              ) : (
                <ImagePreview key={record[item]} url={record[item]} />
              )}
            </React.Fragment>
          );
        });
      },
    },
  ];

  const columns7 = [
    {
      title: '示例图片',
      dataIndex: 'image',
      key: 'image',
      width: 120,
      render: (text: string, record: any) => {
        return <ImagePreview key={text} url={text} />;
      },
    },
    {
      title: '留言备注',
      dataIndex: 'showimgurl',
      key: 'showimgurl',
      width: 120,
      render: (text: string, record: any) => {
        return record.text ? record.text : record.thirdPardMessage;
      },
    },
    {
      title: '下载图片',
      dataIndex: 'showimgurl',
      key: 'showimgurl',
      width: 120,
      render: (text: string, record: any) => {
        return (
          <a
            download=""
            target="_blank"
            href={record.image}
            style={{ fontSize: '13px' }}
          >
            下载图片
          </a>
        );
      },
    },
  ];

  const columns8 = [
    {
      title: '定制位置',
      dataIndex: 'areaName',
      key: 'areaName',
    },
    {
      title: '效果图',
      dataIndex: 'img',
      key: 'img',
      render: (text: string, record: any) => {
        return <ImagePreview key={record.img} url={record.img} />;
      },
    },
    {
      title: '类型',
      dataIndex: 'beizhu',
      key: 'beizhu',
      render: (text: string, record: any) => {
        return record.img ? (
          <a onClick={() => tuCengFun(record.layer)}>{record.type}</a>
        ) : (
          record.type
        );
      },
    },
    {
      title: '下载图片',
      dataIndex: 'showimgurl',
      key: 'showimgurl',
      width: 120,
      render: (text: string, record: any) => {
        return (
          <a
            download=""
            href={record.img}
            target="_blank"
            style={{ fontSize: '13px' }}
          >
            下载图片
          </a>
        );
      },
    },
  ];
  const tuCengFun = (layer: any) => {
    tcModal.show(layer);
  };

  const [tcModal] = useModal();
  return (
    <Modal
      title={`客户的客户第三方定制个性化信息【${sku}】`}
      width={1000}
      visible={visible}
      onCancel={close}
      onOk={onOk}
      confirmLoading={loading}
      maskClosable={false}
    >
      {params ? (
        <React.Fragment>
          {cj_custom && (
            <Table
              showHeader={false}
              columns={columns}
              pagination={false}
              dataSource={cj_content}
            />
          )}

          {type == 0 && (
            <>
              {properties.customMessgae && (
                <>
                  {' '}
                  <p style={{ textAlign: 'center' }}>客户定制个性化信息</p>
                  <Table
                    columns={columns2}
                    pagination={false}
                    dataSource={[properties]}
                  />
                </>
              )}

              {properties.customDesign && (
                <>
                  <p style={{ textAlign: 'center' }}>客户定制信息</p>
                  <Table
                    columns={columns3}
                    pagination={false}
                    dataSource={[properties]}
                  />
                </>
              )}
            </>
          )}

          {type == 1 && (
            <>
              {properties.customMessgae && (
                <>
                  <p style={{ textAlign: 'center' }}>
                    客户的客户定制个性化信息
                  </p>
                  <Table
                    columns={columns4}
                    pagination={false}
                    dataSource={[properties]}
                  />
                </>
              )}

              {properties.customPodDesign && (
                <>
                  <p style={{ textAlign: 'center' }}>客户定制信息</p>
                  <Table
                    columns={columns5}
                    pagination={false}
                    dataSource={[properties]}
                  />
                </>
              )}

              {properties.thirdPardMessage && (
                <>
                  <p style={{ textAlign: 'center' }}>第三方定制信息</p>
                  <Table
                    showHeader={false}
                    columns={columns6}
                    pagination={false}
                    dataSource={[properties]}
                  />
                </>
              )}
            </>
          )}

          {type == 2 ||
            ((!properties.type || properties.type == 4) &&
              (properties.image || properties.text) && (
                <>
                  <Table
                    columns={columns7}
                    pagination={false}
                    dataSource={dzList}
                  />
                </>
              ))}

          {(properties.type == 3 || properties.type == 4) &&
            (properties.customPodDesign ||
              properties.customDesign ||
              properties.customMessgae ||
              properties.customMessage ||
              properties.customeDesign) && (
              <Table
                columns={columns8}
                pagination={false}
                dataSource={newCusDesignArr}
              />
            )}
        </React.Fragment>
      ) : null}

      <TucengModal modal={tcModal} />
    </Modal>
  );
};
export default Index;
