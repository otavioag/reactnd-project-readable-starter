import { SET_POSTS, SET_POST_COMMENTS } from "../actions/posts";

export default function posts(state = {}, action) {
  switch (action.type) {
    case SET_POSTS:
      return [
        ...action.posts
      ];
    case SET_POST_COMMENTS:
      return state.map(post => (
        post.id === action.postId
          ? {
            ...post,
            comments: action.comments
          }
          : post
      ));
    default:
      return state;
  }
}