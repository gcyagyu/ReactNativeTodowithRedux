/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
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

import { changeText } from './actions'
import TodoList from './TodoList';

type Props = {};
class Todo extends Component<Props> {
  // state = {
  //   newTodo: '',
  //   todos: [],
  // }
  //
  // constructor(props) {
  //   console.log(props);
  //   super(props);
  //   this.loadTodos();
  // }
  //
  // onChangeText(newTodo) {
  //   this.setState({ newTodo });
  // }
  //
  // onPressAdd() {
  //   const {newTodo} = this.state;
  //   this.setState({
  //     newTodo: '',
  //     todos: [newTodo, ...this.state.todos],
  //   }, () => this.storeTodos());
  // }
  //
  // onPressDelete(index) {
  //   this.setState({
  //     todos: this.state.todos.filter((t, i) => i !== index ),
  //   }, () => this.storeTodos());
  // }
  //
  // storeTodos() {
  //   // 1. stringの配列をJSON文字列に変換する。
  //   const str = JSON.stringify(this.state.todos);
  //   // 2. キーをtodosにして、保存する！
  //   AsyncStorage.setItem('todos', str);
  // }
  //
  // loadTodos() {
  //   // 非同期なので、受け取り方が2種類ある。
  //   // 第二引数にコールバック関数を設定 or 第二引数が設定されていない場合はPromiseが帰って来るようになっているのでPromiseで受け取るか？
  //   AsyncStorage.getItem('todos').then((str) => {
  //     const todos = str ? JSON.parse(str): [];
  //     this.setState({ todos });
  //   })
  // }

// text => store.dispatch({type: 'CHANGE_TEXT', newTodo: text})
// () => this.onPressAdd()
// <TodoList
//   todos="ss"
//   onPress={() => console.log("ssss");}
// />
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          value={this.props.newTodo}
          style={styles.form}
          onChangeText={(text) => this.props.onChangeText(text)}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => console.log(this.props)}
        >
          <Text style={styles.addButtonText}>ADD</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => {
 return {
   todos: state.todos,
 }
};

const mapDispatchToProps = dispatch => ({
  onChangeText: text => dispatch(changeText(text))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todo)

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
