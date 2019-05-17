import React, { Component } from 'react';
import { Divider } from "antd";
import SingleComment from './SingleComment';

class PostComments extends Component {
  render() {
    return (
      <div>
        <Divider orientation="left">{this.props.comments.length} comments</Divider>
        {this.props.comments.map(comment => <SingleComment key={comment.id} comment={comment}/>)}
      </div>
    );
  }
}

export default PostComments;