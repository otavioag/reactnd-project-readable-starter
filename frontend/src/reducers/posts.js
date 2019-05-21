import { SET_POSTS, SET_POST_COMMENTS, UPDATE_POST, SORT_POSTS, VOTE_POST } from '../actions/posts';
import { SAVE_COMMENT, UPDATE_COMMENT, VOTE_COMMENT } from '../actions/comments';

export default function posts(state = {}, action) {
  switch (action.type) {
    case SET_POSTS:
      return [
        ...action.posts.filter(post => !post.deleted)
      ];
    case SET_POST_COMMENTS:
      return state.map(post => (
        post.id === action.postId
          ? {
            ...post,
            comments: action.comments.filter(comment => !comment.deleted)
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
            comments: post.comments.concat(action.comment)
          }
          : post
      ));
    case SORT_POSTS:
      let sorted;
      if (action.sortBy === 'date') {
        sorted = state.sort((a, b) => (a.timestamp - b.timestamp));
      } else if (action.sortBy === 'vote') {
        sorted = state.sort((a, b) => (a.voteScore - b.voteScore));
      }
      return action.sortOrder === 'asc' ? sorted : sorted.reverse();
    case VOTE_POST:
      return state.map(post => (post.id === action.postId
        ? {
          ...post,
          voteScore: post.voteScore +(action.option === 'upVote' ? 1 : -1)
        }
        : post
      ));
    case VOTE_COMMENT:
      return state.map(post => (
        post.id === action.parentId
          ? {
            ...post,
            comments: post.comments.map(comment => (
              comment.id === action.commentId
                ? {
                  ...comment,
                  voteScore: comment.voteScore + (action.option === 'upVote' ? 1 : -1)
                }
                : comment
            ))
          }
          : post
      ));
    default:
      return state;
  }
}