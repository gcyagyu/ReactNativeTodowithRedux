const todos = (state = {todos: [], newTodo: 'New TODO'}, action) => {
  console.log(action)
  switch (action.type) {
    case 'TODOS/CHANGETEXT':
      return Object.assign({}, state, action.payload)
    default:
      return state
  }
}

export default todos
