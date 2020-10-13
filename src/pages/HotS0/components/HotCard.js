import React, { Component } from 'react';
import { Card, Button, Tooltip, Tag } from 'antd';
import { connect } from 'dva';
import styles from './HotCard.less';

@connect(({ loading }) => ({
  fetching: loading.effects['hotS0/fetch'],
}))
class HotCard extends Component {
  render() {
    const { item, fetching } = this.props;

    return (
      <Card
        className={styles.card}
        hoverable
        cover={
          fetching || !item.url_image || !item.url_image.length ? (
            <div
              className={styles.processing}
              onClick={() => {
                window.open(`${item.url}`, '_blank');
              }}
            >
              {fetching ? 'PROCESSING...' : '暂无图片'}
            </div>
          ) : (
            <>
              {item.is_long_graph ? (
                <div
                  className={styles.scrollItem}
                  onClick={() => {
                    window.open(`//${item.url}`, '_blank');
                  }}
                >
                  <img
                    style={{ background: '#eee', width: '100%', display: 'block', minHeight: 300 }}
                    src={item.url_image}
                    alt=""
                    referrerPolicy="no-referrer"
                  />
                </div>
              ) : (
                <img
                  style={{ background: '#eee', height: 300, width: '100%' }}
                  src={item.url_image}
                  referrerPolicy="no-referrer"
                  alt="暂无图片"
                  onClick={() => {
                    window.open(`${item.url}`, '_blank');
                  }}
                />
              )}
            </>
          )
        }
      >
        <div className="title">
          <Tag color="#87d068" style={{ fontSize: 14, marginBottom: 5 }}>
            {item.in_type}
          </Tag>
          <h3>
            {item.domain_name}
            <span style={{ color: '#bbb' }}> ({item.platform})</span>
          </h3>
          {item.title && item.title.length > 40 ? (
            <Tooltip title={item.title}>
              <p className={styles.ellipsis}>{item.title || '—'}</p>
            </Tooltip>
          ) : (
            <p className={styles.ellipsis}>{item.title || '—'}</p>
          )}
        </div>
        <div
          className="content"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: 5,
            flexWrap: 'wrap',
          }}
        >
          <div className="left" style={{ display: 'flex', flexDirection: 'column' }}>
            <span>$ {item.price}</span>
            <Tag>最近投放时间：{item.last_see.substring(0, 10)}</Tag>
            <Tag>最早投放时间：{item.first_see.substring(0, 10)}</Tag>
            <Tag>参数：{item.arguments}</Tag>
          </div>
          <div className="right" style={{ display: 'flex', flexDirection: 'column' }}>
            {item.has_ads && (
              <Button
                size="small"
                type="primary"
                onClick={() => {
                  window.open(
                    `/home/show/adDetail?result=exact&&type=store_ranks&&pageType=s0&&value=${item.hit_id}&&date=2019`,
                    '_blank'
                  );
                }}
              >
                查看广告
              </Button>
            )}
            <Button
              size="small"
              type="primary"
              onClick={() =>
                window.open(
                  `/home/show/adDetail?result=bitly_domain&&type=domain&&value=${item.domain_name}&&date=2019`,
                  '_blank'
                )
              }
            >
              查看店铺
            </Button>
          </div>
        </div>
      </Card>
    );
  }
}
export default HotCard;
