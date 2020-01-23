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
    default:
      return state;
  }
}
