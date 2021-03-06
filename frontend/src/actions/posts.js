import { getPosts, updatePost as updPost, vote } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading';
import { del } from '../utils/api';

export const SET_POSTS = 'SET_POSTS';
export const SET_POST_COMMENTS = 'SET_POST_COMMENTS';
export const UPDATE_POST = 'UPDATE_POST';
export const SORT_POSTS = 'SORT_POSTS';
export const VOTE_POST = 'VOTE_POST';
export const DELETE_POST = 'DELETE_POST';

export function fetchPosts() {
  return (dispatch) => {
    dispatch(showLoading());
    return getPosts()
      .then((posts) => {
        dispatch(setPosts(posts));
        dispatch(hideLoading());
      });
  };
}

export function setPosts(posts) {
  return {
    type: SET_POSTS,
    posts
  };
}

export function setPostComments(postId, comments) {
  return {
    type: SET_POST_COMMENTS,
    postId,
    comments
  };
}

export function updatePost(postId, title, body) {
  updPost(postId, title, body);
  return {
    type: UPDATE_POST,
    postId,
    title,
    body
  };
}

export function sortPosts(sortBy, sortOrder) {
  return (dispatch) => {
    dispatch({
      type: SORT_POSTS,
        sortBy,
        sortOrder
    });
    return Promise.resolve();
  };
}

export function votePost(postId, option) {
  vote('posts', postId, option);
  return {
    type: VOTE_POST,
    postId,
    option
  }
}

export function deletePost(postId) {
  return (dispatch) => {
    dispatch(showLoading());
    return del('posts', postId)
      .then(() => {
        dispatch({
          type: DELETE_POST,
          postId
        });
        dispatch(hideLoading());
      });
  };
}