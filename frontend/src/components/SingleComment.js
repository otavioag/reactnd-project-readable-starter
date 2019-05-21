import React, { Component } from 'react';
import { Comment, Icon, notification, Popconfirm, Tooltip } from 'antd';
import Editor from './Editor';
import { connect } from 'react-redux';
import { updateComment, voteComment, deleteComment } from '../actions/comments';

class SingleComment extends Component {

  state = {
    editMode: false,
    loading: false,
    body: this.props.comment.body
  };

  toggleEdit = (e) => {
    e.preventDefault();
    this.setState({
      ...this.state,
      editMode: !this.state.editMode,
      body: this.props.comment.body
    });
  };

  submitEdition = () => {
    this.setState({
      ...this.state,
      loading: true
    },() => {
      this.props.updateComment(this.props.comment.id, this.props.comment.parentId, this.state.body);
      this.setState({
        ...this.state,
        loading: false,
        editMode: false
      });
    });
  };

  onChangeBody = (e) => {
    this.setState({
      ...this.state,
      body: e.target.value
    });
  };

  deleteComment = () => {
    this.props.deleteComment(this.props.comment.id, this.props.comment.parentId)
      .then(() => {
        notification.open({
          message: 'Success!',
          description: 'Comment deleted!'
        });
      });
  };

  render() {
    const { voteScore } = this.props.comment;

    const actions = [
      <span>
        <Tooltip title='Upvote'>
          <Icon
            type='like'
            theme='outlined'
            onClick={(e) => {
              e.preventDefault();
              this.props.voteComment(this.props.comment.id, this.props.comment.parentId, 'upVote');
            }}
          />
        </Tooltip>
      </span>,
      <span>
        <Tooltip title='Downvote'>
          <Icon
            type='dislike'
            theme='outlined'
            onClick={(e) => {
              e.preventDefault();
              this.props.voteComment(this.props.comment.id, this.props.comment.parentId, 'downVote');
            }}
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
            onClick={this.toggleEdit}
          />
        </Tooltip>
        <span style={{paddingLeft: 8}}/>
        <Popconfirm
          title='Delete?'
          okText='Yes'
          cancelText='No'
          onConfirm={this.deleteComment}
        >
          <Icon
            type='delete'
            theme='outlined'
          />
        </Popconfirm>
      </span>
    ];

    return (
      <Comment
        className='comment'
        actions={actions}
        author={this.props.comment.author}
        content={this.state.editMode
          ? <Editor
            isPost={false}
            body={this.state.body}
            onSubmit={this.submitEdition}
            onChangeBody={this.onChangeBody}
            onCancel={this.toggleEdit}
            loading={this.state.loading}
          />
          : this.props.comment.body}
        datetime={new Date(this.props.comment.timestamp).toLocaleString()}
      />
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateComment: (commentId, parentId, body) => dispatch(updateComment(commentId, parentId, body)),
  voteComment: (commentId, parentId, option) => dispatch(voteComment(commentId, parentId, option)),
  deleteComment: (commentId, parentId) => dispatch(deleteComment(commentId, parentId))
});

export default connect(null, mapDispatchToProps)(SingleComment);