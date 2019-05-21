import React, { Component } from 'react';
import Navbar from './Navbar';
import { Button, Form, Input, Select, notification } from 'antd';
import { connect } from 'react-redux';
import { createPost } from '../utils/api';

class NewPost extends Component {

  state = {
    category: '',
    title:'',
    body: '',
    loading: false
  };

  onSubmit = () => {
    if (this.state.body !== '' && this.state.title !== '' && this.state.category !== '') {
      this.setState({
        ...this.state,
        loading: true
      }, () => {
        createPost({
          category: this.state.category,
          title: this.state.title,
          body: this.state.body,
          author: 'Guest'
        }).then((post) => {
          this.setState({
            ...this.state,
            title: '',
            body: '',
            loading: false
          });
          this.props.history.push(`/${post.category}/${post.id}`);
        });
      });
    } else {
      notification.open({
        message: 'Error!',
        description: 'All fields are required to create a new post!'
      });
    }
  };

  onChangeTitle = (e) => {
    this.setState({
      ...this.state,
      title: e.target.value
    });
  };

  onChangeBody = (e) => {
    this.setState({
      ...this.state,
      body: e.target.value
    });
  };

  onChangeCategory = (value) => {
    this.setState({
      ...this.state,
      category: value
    });
  };

  render() {
    return (
      <div>
        <Navbar category='new'/>
        <div style={{padding: "16px 10vw"}}>
          <h1>New Post</h1>
          <Select placeholder='Select Category' style={{ width: 150 }} onChange={this.onChangeCategory}>
            {this.props.categories.length > 0 && this.props.categories.map(category =>
              <Select.Option key={category.name} value={category.name}>{category.name}</Select.Option>
            )}
          </Select>
          <Form.Item>
            <Input.TextArea rows={1} onChange={this.onChangeTitle} value={this.state.title} placeholder='Title...'  />
            <Input.TextArea rows={3} onChange={this.onChangeBody} value={this.state.body} placeholder='Post...'  />
          </Form.Item>
          <Form.Item>
            <Button htmlType='submit' loading={this.state.loading} onClick={this.onSubmit} type='primary'>
              Add Post
            </Button>
          </Form.Item>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ categories }) => ({
  categories
});

export default connect(mapStateToProps)(NewPost);