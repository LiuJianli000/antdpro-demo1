import React, { Component } from 'react';
import { Card, List } from 'antd';
import SearchBar from './components/SearchBar';
import PagingBar from './components/PagingBar';
import { connect } from 'dva';
import HotCard from './components/HotCard';

@connect(({ loading }) => ({
  fetching: loading.effects['hotS0/fetch'],
}))
export default class HotS0 extends Component {
  state = {
    page: 1,
    filters: {},
    data: [],
    total: 0,
  };

  async componentDidMount() {
    const { query } = this.props.location;

    await this.setState({
      filters: {
        domain: query.domain || undefined,
      },
    });

    this.fetch({});
  }

  fetch = () => {
    const { dispatch } = this.props;
    const { page, filters } = this.state;

    dispatch({
      type: 'hotS0/fetch',
      payload: {
        page,
        ...filters,
      },
    }).then(res => {
      this.setState({
        data: res.data,
        total: res.total,
      });
    });
  };

  handleSearch = async filters => {
    await this.setState({
      page: 1,
      filters,
    });

    this.fetch();
  };

  handlePageChange = async pagination => {
    await this.setState({
      page: pagination.page,
    });

    this.fetch();
  };

  handleReset = async () => {
    await this.setState({
      page: 1,
      filters: {},
    });

    this.fetch();
  };

  render() {
    const { page, total, data, filters } = this.state;
    const { fetching } = this.props;

    return (
      <>
        <Card>
          <SearchBar
            onSearch={this.handleSearch}
            onReset={this.handleReset}
            location={this.props.location || null}
          />
          <PagingBar
            current={page}
            total={total}
            onPageChange={this.handlePageChange}
            position="header"
          />
        </Card>
        <List
          style={{ marginTop: '20px' }}
          grid={{
            gutter: 16,
            xl: 4,
            lg: 3,
            md: 3,
            sm: 2,
            xs: 1,
          }}
          loading={fetching}
          dataSource={data}
          renderItem={item => (
            <List.Item>
              <HotCard item={item} />
            </List.Item>
          )}
        />
        <PagingBar
          current={page}
          total={total}
          onPageChange={this.handlePageChange}
          position="footer"
        />
      </>
    );
  }
}
