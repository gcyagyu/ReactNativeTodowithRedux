/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { lifecycle, withHandlers } from 'recompose';
import {bindActionCreators} from 'redux';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
} from 'react-native';

import Actions from './actions/'
import TodoList from './TodoList';

type Props = {};
class Todo extends Component<Props> {

  render() {
    console.log(this.props);
    return (
      <View style={styles.container}>
        <TextInput
          value={this.props.todos.newTodo}
          style={styles.form}
          onChangeText={(text) => this.props.changetext(text)}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => this.props.onPressAdd()}
        >
          <Text style={styles.addButtonText}>ADD</Text>
        </TouchableOpacity>
        <TodoList
          todos={this.props.todos.todos}
          onPressDelete={(index) => this.props.onPressDelete(index)}
        />
      </View>
    );
  }
}

const TodoLifeCycle = lifecycle({
    componentWillMount() {
    // 非同期なので、受け取り方が2種類ある。
    // 第二引数にコールバック関数を設定 or 第二引数が設定されていない場合はPromiseが帰って来るようになっているのでPromiseで受け取るか？
    AsyncStorage.getItem('todos').then((str) => {
      const todos = str ? JSON.parse(str) : []
      this.props.loadtodo(todos)
    })
  },
})(Todo);

const TodoWithHandlers = withHandlers({
  onPressAdd: props => () =>  {
    props.addtodo(props.todos.newTodo, props.todos.todos)
      // 1. stringの配列をJSON文字列に変換する。
    const str = JSON.stringify(props.todos.todos);
      // 2. キーをtodosにして、保存する！
      // Todo: 登録した直後のtodoはstorageに反映できないので対応する必要あり。
    props.storetodo(str);
  },

  onPressDelete: (props) => (index) => {
    console.log(props, index);
    const filtered_todo = props.todos.todos.filter((t, i) => i !== index)
    props.deletetodo(filtered_todo)
    const str = JSON.stringify(props.todos.todos);
    props.storetodo(str);
  }
})(TodoLifeCycle)

const mapStateToProps = state => {
 return {
   todos: state.todos,
 }
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...Actions.todos
    },
    dispatch,
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoWithHandlers)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  form: {
    backgroundColor: '#EEE',
    padding: 10,
  },
  addButton: {
    backgroundColor: '#333',
    padding: 14,
    borderRadius: 4,
  },
  addButtonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  }
});
