const initialState = {
    column: {}
  };
  
  export default function (state = initialState, action = {}) {
    switch (action.type) {
      case 'SET_COLUMN':
        return { ...state, column: action.column };
      default:
        return state;
    }
  }
  