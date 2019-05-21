import React, { Component } from 'react';
import { Card, Comment, Icon, Tooltip } from 'antd';
import { fetchComments } from '../actions/comments';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PostComments from './PostComments';
import Editor from './Editor';
import { updatePost, votePost } from '../actions/posts';

class Post extends Component {

  state =  {
    showComments: false,
    editMode: false,
    loading: false,
    title: this.props.post.title,
    body: this.props.post.body
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

  toggleEdit = (e) => {
    e.preventDefault();
    this.setState({
      ...this.state,
      editMode: !this.state.editMode,
      title: this.props.post.title,
      body: this.props.post.body
    });
  };

  submitEdition = () => {
    this.setState({
      ...this.state,
      loading: true
    },() => {
      this.props.updatePost(this.props.post.id, this.state.title, this.state.body);
      this.setState({
        ...this.state,
        loading: false,
        editMode: false
      });
    });
  };

  onChangeTitle = (e) => {
    this.setState({
      ...this.state,
      title: e.target.value
    })
  };

  onChangeBody = (e) => {
    this.setState({
      ...this.state,
      body: e.target.value
    });
  };

  render() {
    const { voteScore } = this.props.post;
    const commentNumber = this.props.post.comments === undefined ? 0 : this.props.post.comments.length;

    const actions = [
      <span>
        <Tooltip title='Upvote'>
          <Icon
            type='like'
            theme='outlined'
            onClick={(e) => {
              e.preventDefault();
              this.props.votePost(this.props.post.id, 'upVote');
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
              this.props.votePost(this.props.post.id, 'downVote');
            }}
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
            onClick={this.toggleEdit}
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

    const post = (
      <Comment
        className='post'
        actions={actions}
        author={this.props.post.author}
        content={this.state.editMode
          ? <Editor
            isPost
            title={this.state.title}
            body={this.state.body}
            onSubmit={this.submitEdition}
            onChangeTitle={this.onChangeTitle}
            onChangeBody={this.onChangeBody}
            onCancel={this.toggleEdit}
            loading={this.state.loading}
          />
          : (
            <div>
              <h3>{this.props.post.title}</h3>
              <div>{this.props.post.body}</div>
            </div>
          )}
        datetime={new Date(this.props.post.timestamp).toLocaleString()}
      />
    );

    return (
      <Card className='card-post' style={{ width: '80%', marginTop: '20px'}}>
        {(this.state.editMode || this.props.disableClick)
          ? <div>{post}</div>
          : (
            <Link to={`/${this.props.post.category}/${this.props.post.id}`}>
              {post}
            </Link>
          )
        }
        {this.state.showComments && (<PostComments comments={this.props.post.comments} parentId={this.props.post.id}/>)}
      </Card>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchComments: (postId) => dispatch(fetchComments(postId)),
  updatePost: (postId, title, body) => dispatch(updatePost(postId, title, body)),
  votePost: (postId, option) => dispatch(votePost(postId, option))
});

export default connect(null, mapDispatchToProps)(Post);