import React, { Component } from 'react';
import {Form, Button, Input, notification} from 'antd';
import { connect } from 'react-redux';
import { createComment } from '../actions/comments';

class NewComment extends Component {
  state = {
    body: '',
    loading: false
  };

  onSubmit = () => {
    if (this.state.body !== '') {
      this.setState({
        ...this.state,
        loading: true
      }, () => {
        this.props.createComment({
          parentId: this.props.parentId,
          author: 'Guest',
          body: this.state.body
        });
        this.setState({
          ...this.state,
          body: '',
          loading: false
        });
      });
    } else {
      notification.open({
        message: 'Error!',
        description: 'The comment field is empty!'
      });
    }
  };

  onChangeBody = (e) => {
    this.setState({
      ...this.state,
      body: e.target.value
    });
  };

  render() {
    return (
      <div style={{padding: "16px 48px"}}>
        <Form.Item>
          <Input.TextArea rows={3} onChange={this.onChangeBody} value={this.state.body} placeholder='Add new comment...'  />
        </Form.Item>
        <Form.Item>
          <Button htmlType='submit' loading={this.state.loading} onClick={this.onSubmit} type='primary'>
            Add Comment
          </Button>
        </Form.Item>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  createComment: (comment) => dispatch(createComment(comment))
});

export default connect(null, mapDispatchToProps)(NewComment);