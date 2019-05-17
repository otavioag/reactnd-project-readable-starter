import React, { Component } from 'react';
import { Card, Comment, Icon, Tooltip } from 'antd';
import { fetchComments } from "../actions/comments";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import PostComments from "./PostComments";

class Post extends Component {

  state =  {
    showComments: false
  };

  componentDidMount() {
    this.props.fetchComments(this.props.post.id);
  }

  like = (e) => {
    e.preventDefault();
    console.log('e');
    e.stopPropagation();
  };

  toggleComments = (e) => {
    e.preventDefault();
    this.setState({
      ...this.state,
      showComments: !this.state.showComments
    });
  };

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
        <Tooltip title={this.state.showComments ? 'Hide comments' : 'Show comments'}>
          <Icon
            type='message'
            theme='outlined'
            onClick={this.toggleComments}
          />
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: 'auto' }}>{commentNumber}</span>
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
      <Card className='card-post' style={{ width: '80%', marginTop: '20px'}}>
        <Link to={`${this.props.post.category}/${this.props.post.id}`}>
        <Comment
          className='post'
          actions={actions}
          author={this.props.post.author}
          content={this.props.post.body}
          datetime={this.props.post.timestamp}
        />
        </Link>
        {this.state.showComments && (<PostComments comments={this.props.post.comments}/>)}
      </Card>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchComments: (postId) => dispatch(fetchComments(postId))
});

export default connect(null, mapDispatchToProps)(Post);