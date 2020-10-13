import React, { Component } from 'react';
import { Pagination } from 'antd';

class PagingBar extends Component {
  handlePageChange = page => {
    const { onPageChange } = this.props;

    onPageChange({
      page,
    });
  };

  render() {
    const { current, total, position } = this.props;
    return (
      <div>
        {position === 'header' ? (
          <div style={{ display: 'flex' }}>
            <Pagination
              showQuickJumper
              showSizeChanger={false}
              current={current}
              pageSize={30}
              total={total}
              onChange={this.handlePageChange}
            />
            <div
              style={{ marginLeft: '20px', marginRight: 20, height: '32px', lineHeight: '30px' }}
            >
              总共有 <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{total || 0}</span>{' '}
              条数据
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
            <Pagination
              showQuickJumper
              showSizeChanger={false}
              current={current}
              pageSize={30}
              total={total}
              onChange={this.handlePageChange}
            />
            <div style={{ marginRight: '20px', lineHeight: '32px' }}>
              总共有 <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{total || 0}</span>{' '}
              条数据
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default PagingBar;
