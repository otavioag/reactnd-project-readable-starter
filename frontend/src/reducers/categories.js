import { SET_CATEGORIES } from '../actions/categories';

export default function categories(state = {}, action) {
  if (action.type === SET_CATEGORIES) {
    return [
      ...action.categories
    ];
  } else {
    return state;
  }
}