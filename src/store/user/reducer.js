const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return {
        apiKey: action.payload,
      }
    default:
      return state
  }
}

export default reducer
