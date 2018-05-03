export default (state = {todos: [], newTodo: 'New TODO'}, action) => {
  switch (action.type = 'CHAGE_TEXT') {
    case 'CHANGE_TEXT':
      return Object.assign({}, state, {newTodo: action.text})

    default:
      return state
  }
}
