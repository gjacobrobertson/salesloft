import { createAction } from 'redux-actions';
import { pages } from '../lib/iterators';

export const count = createAction('COUNT_FREQUENCY');
export const countAll = createAction('COUNT_ALL_FREQUENCY');
export const reset = createAction('RESET_FREQUENCY');
export const build = () => async dispatch => {
  dispatch(reset());
  for await (const page of pages()) {
    const addresses = page.data
      .map(person => person.email_address)
      .filter(str => !!str)
      .map(str => str.toUpperCase());
    dispatch(countAll(addresses));
  }
};
