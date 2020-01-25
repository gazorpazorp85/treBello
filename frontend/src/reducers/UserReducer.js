let localLoggedinUser = null;
// if (localStorage.user) localLoggedinUser = JSON.parse(localStorage.user);

const initialState = {
  loggedInUser: localLoggedinUser,
  users: []
};

export default function(state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, loggedInUser: action.user };
    case 'SET_USERS':
      return {...state, users: action.users};
    default:
      return state;
  }
}
