import { getPosts, updatePost as updPost } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading';

export const SET_POSTS = 'SET_POSTS';
export const SET_POST_COMMENTS = 'SET_POST_COMMENTS';
export const UPDATE_POST = 'UPDATE_POST';
export const SORT_POSTS = 'SORT_POSTS';

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