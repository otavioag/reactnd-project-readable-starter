import React, { Component } from 'react';
import { Divider } from 'antd';
import SingleComment from './SingleComment';
import NewComment from './NewComment';

class PostComments extends Component {
  render() {
    return (
      <div>
        <Divider orientation='left'>{this.props.comments.length} comments</Divider>
        {this.props.comments.map(comment => <SingleComment key={comment.id} comment={comment}/>)}
        <NewComment parentId={this.props.parentId}/>
      </div>
    );
  }
}

export default PostComments;