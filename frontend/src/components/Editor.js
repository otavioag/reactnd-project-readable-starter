import React, { Component } from 'react';
import { Form, Button, Input } from 'antd';

class Editor extends Component {
  render() {
    return (
      <div>
        <Form.Item>
          {this.props.isPost && <Input.TextArea rows={1} onChange={this.props.onChangeTitle} value={this.props.title} />}
          <Input.TextArea rows={3} onChange={this.props.onChangeBody} value={this.props.body} />
        </Form.Item>
        <Form.Item>
          <Button htmlType='submit' loading={this.props.loading} onClick={this.props.onSubmit} type='primary'>
            Save
          </Button>
          <Button htmlType='button' style={{marginLeft: "16px"}} onClick={this.props.onCancel} type='secondary'>
            Cancel
          </Button>
        </Form.Item>
      </div>
    );
  }
}

export default Editor;