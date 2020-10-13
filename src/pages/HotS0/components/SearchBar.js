import React, { Component } from 'react';
import { Form, Row, Col, Button, Input, Select, DatePicker } from 'antd';
import styles from './SearchBar.less';
import { formatDate } from 'umi-plugin-react/locale';

const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;

@Form.create()
export default class SearchBar extends Component {
  state = {
    domain: null,
    inTypes: [],
  };
  componentDidMount() {
    const { query } = this.props.location;
    const inTypes = JSON.parse(localStorage.getItem('user')).in_types || [];

    this.setState({
      domain: query.domain,
      inTypes,
    });
  }

  handleSearch = e => {
    e.preventDefault();
    const { form, onSearch } = this.props;
    const { validateFields } = form;

    validateFields((err, values) => {
      if (err) return;

      const formatValues = { ...values };
      const { add_time, first_see, last_see } = formatValues;

      formatValues.add_time =
        add_time && add_time.length > 0
          ? [add_time[0].format('YYYY-MM-DD'), add_time[1].format('YYYY-MM-DD')]
          : undefined;
      formatValues.first_see =
        first_see && first_see.length > 0
          ? [first_see[0].format('YYYY-MM-DD'), first_see[1].format('YYYY-MM-DD')]
          : undefined;
      formatValues.last_see =
        last_see && last_see.length > 0
          ? [last_see[0].format('YYYY-MM-DD'), last_see[1].format('YYYY-MM-DD')]
          : undefined;

      onSearch(formatValues);
    });
  };

  handleReset = () => {
    const { form, onReset } = this.props;

    form.resetFields();
    onReset();
  };

  render() {
    const { form } = this.props;
    const { domain, inTypes } = this.state;
    const { getFieldDecorator } = form;

    const colStyle = {
      xxl: 6,
      xl: 8,
      lg: 12,
    };

    return (
      <Form onSubmit={this.handleSearch} layout="inline" className={styles.form}>
        <Row gutter={16}>
          <Col {...colStyle}>
            <FormItem label="关键字">
              {getFieldDecorator('keyword')(
                <Input placeholder="请输入关键字" style={{ width: '100%' }} allowClear />
              )}
            </FormItem>
          </Col>
          <Col {...colStyle}>
            <FormItem label="域名">
              {getFieldDecorator('domain', {
                initialValue: domain,
              })(<Input placeholder="请输入域名" style={{ width: '100%' }} allowClear />)}
            </FormItem>
          </Col>
          <Col {...colStyle}>
            <FormItem label="平台">
              {getFieldDecorator('platform')(
                <Select placeholder="请选择平台" allowClear>
                  <Option value="shopify">shopify</Option>
                  <Option value="xshoppy">xshoppy</Option>
                  <Option value="shopbase">shopbase</Option>
                  <Option value="shoplazza">shoplazza</Option>
                  <Option value="other">other</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col {...colStyle}>
            <FormItem label="类型">
              {getFieldDecorator('in_type')(
                <Select placeholder="请选择类型" allowClear>
                  {inTypes.map(item => (
                    <Option value={item.value} key={item.value}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col {...colStyle}>
            <FormItem label="产品首次发现时间">
              {getFieldDecorator('add_time')(<RangePicker style={{ width: '100%' }} allowClear />)}
            </FormItem>
          </Col>
          <Col {...colStyle}>
            <FormItem label="广告首次发现时间">
              {getFieldDecorator('first_see')(<RangePicker style={{ width: '100%' }} allowClear />)}
            </FormItem>
          </Col>
          <Col {...colStyle}>
            <FormItem label="最后一次投放日期">
              {getFieldDecorator('last_see')(<RangePicker style={{ width: '100%' }} allowClear />)}
            </FormItem>
          </Col>
          <Col
            xxl={6}
            xl={16}
            lg={12}
            style={{
              display: 'flex',
              alignItems: 'center',
              height: 40,
              justifyContent: 'flex-end',
            }}
          >
            <FormItem>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
            </FormItem>
            <FormItem>
              <Button style={{ marginLeft: '8px' }} onClick={this.handleReset}>
                重置
              </Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}
