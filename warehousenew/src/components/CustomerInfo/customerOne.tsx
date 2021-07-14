import React from 'react';
import { Table } from 'antd';
import ImagePreview from '@/components/ImagePreview';

interface Props {
  dataSource: any;
}

const customerInfo: React.FC<Props> = ({ dataSource }) => {
  const columns = [
    {
      title: '定制位置',
      dataIndex: 'location',
      key: 'location',
      render: (text: string, record: any) => {
        if (record.customMessgae.zone.front) {
          return 'CJ前';
        }
        if (record.customMessgae.zone.back) {
          return 'CJ后';
        }
        if (record.customPodDesign.cj_pod_zone_front) {
          return '客户的客户前';
        }
        if (record.customPodDesign.cj_pod_zone_back) {
          return '客户的客户后';
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
        if (record.customPodDesign.cj_pod_zone_front) {
          return (
            <ImagePreview
              key={record.customPodDesign.cj_pod_zone_front.editimgurl}
              url={record.customPodDesign.cj_pod_zone_front.editimgurl}
            />
          );
        }
        if (record.customPodDesign.cj_pod_zone_back) {
          return (
            <ImagePreview
              key={record.customPodDesign.cj_pod_zone_back.editimgurl}
              url={record.customPodDesign.cj_pod_zone_back.editimgurl}
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
        if (record.customPodDesign.cj_pod_zone_front) {
          return (
            <ImagePreview
              key={record.customPodDesign.cj_pod_zone_front.showimgurl}
              url={record.customPodDesign.cj_pod_zone_front.showimgurl}
            />
          );
        }
        if (record.customPodDesign.cj_pod_zone_back) {
          return (
            <ImagePreview
              key={record.customPodDesign.cj_pod_zone_back.showimgurl}
              url={record.customPodDesign.cj_pod_zone_back.showimgurl}
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
        if (record.customMessgae.zone.front) {
          return '-';
        }
        if (record.customMessgae.zone.back) {
          return '-';
        }
        if (record.customPodDesign.cj_pod_zone_front) {
          return (
            <React.Fragment>
              {record.customPodDesign.cj_pod_color && (
                <p className="pod-text-p">
                  <span className="pod-text-tit">定制商品颜色:</span>
                  <span>{record.customPodDesign.cj_pod_color}</span>
                  <span
                    className="spys-bacolor"
                    style={{
                      backgroundColor:
                        record.customPodDesign.cj_pod_color.indexOf('#') != -1
                          ? `${record.customPodDesign.cj_pod_color}`
                          : `#${record.customPodDesign.cj_pod_color}`,
                    }}
                  ></span>
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
                  <span
                    className="spys-bacolor"
                    style={{
                      backgroundColor:
                        record.customPodDesign.cj_pod_color.indexOf('#') != -1
                          ? `${record.customPodDesign.cj_pod_color}`
                          : `#${record.customPodDesign.cj_pod_color}`,
                    }}
                  ></span>
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
        if (record.customPodDesign.cj_pod_zone_front) {
          return (
            <a
              download=""
              target="_blank"
              href={record.customPodDesign.cj_pod_zone_front.imgUrl}
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
              href={record.customPodDesign.cj_pod_zone_back.imgUrl}
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
  const expandedRowRender = (record: any) => {
    return record.thirdPardMessage
      ? record.thirdPardMessage.map((item: any) => {
          return Object.keys((child: any) => (
            <>
              <a
                download=""
                target="_blank"
                href="{{val}}"
                style={{ fontSize: '13px', float: 'left' }}
              >
                下载图片
              </a>
              {child}:
              {item[child].indexOf('https') == -1 ? (
                <span>{item[child]}</span>
              ) : (
                <ImagePreview key={item[child]} url={item[child]} />
              )}
            </>
          ));
        })
      : null;
  };
  return (
    <React.Fragment>
      <p style={{ textAlign: 'center' }}>客户的客户定制信息</p>
      <Table
        columns={columns}
        pagination={false}
        dataSource={dataSource}
        expandable={{ expandedRowRender }}
      />
    </React.Fragment>
  );
};
export default customerInfo;
