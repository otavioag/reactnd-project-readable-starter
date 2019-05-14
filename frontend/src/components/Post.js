import React, { Component } from 'react';
import { Card, Comment, Icon, Tooltip } from 'antd';
import { fetchComments } from "../actions/comments";
import { connect } from "react-redux";

class Post extends Component {
  componentDidMount() {
    this.props.fetchComments(this.props.post.id);
  }

  render() {
    const { voteScore } = this.props.post;
    const commentNumber = this.props.post.comments === undefined ? 0 : this.props.post.comments.length;
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
        <Tooltip title='Show comments'>
          <Icon
            type='message'
            theme='outlined'
            onClick={this.dislike}
          />
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: 'auto' }}>{commentNumber}</span>
      </span>
    ];

    return (
      <Card style={{ width: '80%', marginTop: '20px'}}>
        <Comment
          actions={actions}
          author={this.props.post.author}
          content={this.props.post.body}
          datetime={this.props.post.timestamp}
        />
      </Card>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchComments: (postId) => dispatch(fetchComments(postId))
});

export default connect(null, mapDispatchToProps)(Post);