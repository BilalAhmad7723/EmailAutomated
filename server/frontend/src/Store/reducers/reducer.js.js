
const UserData = { } ;

  // All Reducers:

  function SetUser(state = UserData, action) {
    if (action.type === 'UserSet') {
        return { ...state, SelectedUser: action.payload}
      }
      else return state;
  }

  export {SetUser};