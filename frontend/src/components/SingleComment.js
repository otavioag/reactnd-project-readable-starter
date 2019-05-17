import React, { Component } from 'react';
import {Comment, Icon, Tooltip} from "antd";

class SingleComment extends Component {
  render() {
    const { voteScore } = this.props.comment;
    const action = 'none';

    const actions = [
      <span>
        <Tooltip title='Upvote'>
          <Icon
            type='like'
            theme={action === 'upvote' ? 'filled' : 'outlined'}
            onClick={this.like}
          />
        </Tooltip>
      </span>,
      <span>
        <Tooltip title='Downvote'>
          <Icon
            type='dislike'
            theme={action === 'downvote' ? 'filled' : 'outlined'}
            onClick={this.dislike}
          />
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: 'auto' }}>{voteScore}</span>
      </span>,
      <span>
      </span>,
      <span>
        <Tooltip title='Edit'>
          <Icon
            type='edit'
            theme='outlined'
            onClick={this.like}
          />
        </Tooltip>
        <span style={{paddingLeft: 8}}/>
        <Tooltip title='Delete'>
          <Icon
            type='delete'
            theme='outlined'
            onClick={this.like}
          />
        </Tooltip>
      </span>
    ];

    return (
      <Comment
        className='comment'
        actions={actions}
        author={this.props.comment.author}
        content={this.props.comment.body}
        datetime={this.props.comment.timestamp}
      />
    );
  }
}

export default SingleComment;