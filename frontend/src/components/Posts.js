import React, { Component } from 'react';
import Post from './Post';
import { connect } from "react-redux";
import { fetchPosts } from "../actions/posts";

class Posts extends Component {
  componentDidMount() {
    this.props.fetchPosts().then(() => {
      this.setState((state, props) => ({
        ...state,
        posts: props.category === 'home'
          ? props.posts
          : props.posts.filter(post => post.category === props.category)
      }));
    });
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState((state, props) => ({
      ...state,
      posts: nextProps.category === 'home'
        ? props.posts
        : props.posts.filter(post => post.category === nextProps.category)
    }));
  }

  render() {
    return (
      <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        posts { this.props.category} {this.test}
        {this.state !== null && this.state.posts !== null ? this.state.posts.map((post) => (<Post key={post.id} post={post}/>)) : ''}
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