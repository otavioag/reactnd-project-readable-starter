import { getComments, createComment as crtComment, vote } from '../utils/api';
import { updateComment as updComment } from '../utils/api';
import { setPostComments } from './posts';

export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const SAVE_COMMENT = 'SAVE_COMMENT';
export const VOTE_COMMENT = 'VOTE_COMMENT';

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