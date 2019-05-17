import { SET_POSTS, SET_POST_COMMENTS } from "../actions/posts";

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
    default:
      return state;
  }
}