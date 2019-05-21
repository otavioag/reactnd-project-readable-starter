import { getComments, createComment as crtComment, vote, del } from '../utils/api';
import { updateComment as updComment } from '../utils/api';
import { setPostComments } from './posts';
import { hideLoading, showLoading } from 'react-redux-loading';

export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const SAVE_COMMENT = 'SAVE_COMMENT';
export const VOTE_COMMENT = 'VOTE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

export function fetchComments(postId) {
  return (dispatch) => {
    return getComments(postId)
      .then((comments) => {
        dispatch(setPostComments(postId, comments));
      });
  };
}

export function updateComment(commentId, parentId, body) {
  updComment(commentId, body);
  return {
    type: UPDATE_COMMENT,
    commentId: commentId,
    parentId: parentId,
    body: body
  };
}

export function createComment(comment) {
  return (dispatch) => {
    return crtComment(comment)
      .then((cmnt) => {
        dispatch(saveComment({
          ...cmnt,
          parentId: comment.parentId
        }));
      });
  };
}

export function saveComment(comment) {
  return {
    type: SAVE_COMMENT,
    comment: comment
  };
}

export function voteComment(commentId, parentId, option) {
  vote('comments', commentId, option);
  return {
    type: VOTE_COMMENT,
    commentId,
    parentId,
    option
  }
}

export function deleteComment(commentId, parentId) {
  return (dispatch) => {
    dispatch(showLoading());
    return del('comments', commentId)
      .then(() => {
        dispatch({
          type: DELETE_COMMENT,
          commentId: commentId,
          parentId: parentId
        });
        dispatch(hideLoading());
      });
  };
}