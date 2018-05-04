import {createActions} from 'redux-actions'

export default createActions({
  TODOS: {
    CHANGETEXT: (text) => ({newTodo: text}),
    ADDTODO: (text, oldTodos) => ({todos: [text, ...oldTodos]})
  }
})
