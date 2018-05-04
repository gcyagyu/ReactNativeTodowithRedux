export default (state = {todos: [], newTodo: 'New TODO'}, action) => {
  switch (action.type) {
    case 'CHANGE_TEXT':
      return Object.assign({}, state, {newTodo: action.newTodo})

    default:
      return state
  }
}
