import { SET_POSTS, SET_POST_COMMENTS, UPDATE_POST } from '../actions/posts';
import { SAVE_COMMENT, UPDATE_COMMENT } from '../actions/comments';

export default function posts(state = {}, action) {
  switch (action.type) {
    case SET_POSTS:
      return [
        ...action.posts.map(post =>({
          ...post,
          timestamp: new Date(post.timestamp).toLocaleString()
        }))
      ];
    case SET_POST_COMMENTS:
      return state.map(post => (
        post.id === action.postId
          ? {
            ...post,
            comments: action.comments.map(comment => ({
              ...comment,
              timestamp: new Date(comment.timestamp).toLocaleString()
            }))
          }
          : post
      ));
    case UPDATE_POST:
      return state.map(post => (
        post.id === action.postId
          ? {
            ...post,
            title: action.title,
            body: action.body
          }
          : post
      ));
    case UPDATE_COMMENT:
      return state.map(post => (
        post.id === action.parentId
          ? {
            ...post,
            comments: post.comments.map(comment => (
              comment.id === action.commentId
              ? {
                  ...comment,
                  body: action.body
                }
              : comment
            ))
          }
          : post
      ));
    case SAVE_COMMENT:
      return state.map(post => (
        post.id === action.comment.parentId
          ? {
            ...post,
            comments: post.comments.concat({
              ...action.comment,
              timestamp: new Date(action.comment.timestamp).toLocaleString()
            })
          }
          : post
      ));
    default:
      return state;
  }
}