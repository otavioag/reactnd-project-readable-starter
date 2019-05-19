import { getComments } from '../utils/api';
import { updateComment as updComment } from '../utils/api';
import { setPostComments } from './posts';

export const UPDATE_COMMENT = 'UPDATE_COMMENT';

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