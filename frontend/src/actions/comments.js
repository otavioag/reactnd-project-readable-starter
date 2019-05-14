import { getComments } from "../utils/api";
import { setPostComments } from "./posts";

export function fetchComments(postId) {
  return (dispatch) => {
    return getComments(postId)
      .then((comments) => {
        dispatch(setPostComments(postId, comments));
      });
  };
}