import { getCategories } from '../utils/api';
import { setCategories } from './categories';

export function handleInitialData() {
  return (dispatch) => {
    return getCategories()
      .then((categories) => {
        dispatch(setCategories(categories));
      });
  };
}