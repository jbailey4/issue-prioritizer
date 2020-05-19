const reducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_REPOS':
      return [...action.payload]
    default:
      return state
  }
}

export default reducer
