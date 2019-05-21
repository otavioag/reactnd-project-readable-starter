import React, { Component } from 'react';
import Post from './Post';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/posts';
import Menu from './Menu';

class Posts extends Component {
  componentDidMount() {
    this.props.fetchPosts().then(() => {
      this.filterState(this.props);
    });
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.filterState(nextProps);
  }

  filterState = (nextProps) => {
    if (nextProps.id !== undefined) {
      this.setState((state, props) => ({
        ...state,
        posts: props.posts.filter(post => post.id === nextProps.id)
      }));
    } else {
      this.setState((state, props) => ({
        ...state,
        posts: nextProps.category === 'home'
          ? props.posts
          : props.posts.filter(post => post.category === nextProps.category)
      }));
    }
  };

  updateSort = () => {
    this.filterState(this.props);
  };

  render() {
    return (
      <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <Menu hide={this.props.id !== undefined} updateSort={this.updateSort}/>
        {this.props.id !== undefined && this.state !== null && this.state.posts.length === 0 && <h1 style={{marginTop: "50px"}}>Post not found!</h1>}
        {this.state !== null && this.state.posts !== null && this.state.posts.map((post) => (<Post key={post.id} post={post} disableClick={this.props.id !== undefined}/>))}
        {this.state !== null && this.state.posts.length === 0 && <h1 style={{marginTop: "50px"}}>No posts here yet</h1>}
      </div>
    );
  }
}

const mapStateToProps = ({ posts }) => ({
  posts: posts
});

const mapDispatchToProps = (dispatch) => ({
  fetchPosts: () => dispatch(fetchPosts())
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);