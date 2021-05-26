import { sType } from '../s-types',
import { Actions } from '../actions';
import { Cell } from '../cell';

interface CellState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell
  }
}

const initialState: CellState = {
  loading: false,
  error: null,
  order: [],
  data: {}
}

const reducer = (state: CellState = initialState, action: Actions): CellState => {
  switch (action.type) {
    case sType.UPDATE_CELL:
      return state;
    case sType.DELETE_CELL:
      return state;
    case sType.MOVE_CELL:
      return state;
    case sType.INSERT_CELL_BEFORE:
      return state;
    default:
      return state;
  }
}

export default reducer;