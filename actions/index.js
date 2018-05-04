import {createActions} from 'redux-actions'

import { AsyncStorage } from 'react-native'

export default createActions({
  TODOS: {
    CHANGETEXT: (text) => ({newTodo: text}),
    ADDTODO: (text, oldTodos) => ({newTodo: '', todos: [text, ...oldTodos]}),
    STORETODO: (todos) => (AsyncStorage.setItem('todos', todos)),
    LOADTODO: (todos) => ({ todos })
  }})
