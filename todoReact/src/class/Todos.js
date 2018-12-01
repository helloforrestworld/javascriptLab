import React, { Component } from 'react';

import '../assets/style/base.css';
import '../assets/style/index.css';

import Header from './Header.js';
import ListWrap from './ListWrap.js';
import Footer from './Footer.js';

let propTypes = {
  pathname : PT.string
}

class Todos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      textVal: '',
    };
    this.toggleItem = this.toggleItem.bind(this);
    this.changeTextVal = this.changeTextVal.bind(this);
    this.addOneItem = this.addOneItem.bind(this);
    this.deleteOneItem = this.deleteOneItem.bind(this);
    this.deleteAllCompleted = this.deleteAllCompleted.bind(this);
    this.toggleAllItem = this.toggleAllItem.bind(this);
    this.saveEditVal = this.saveEditVal.bind(this);
  }
  // 修改增加内容的文本
  changeTextVal(e){
    this.setState({
      textVal: e.target.value
    })
  }
  // 增加一条
  addOneItem(e){
    if(e.keyCode !== 13) return;

    let {textVal, todos} = this.state;
    
    if(!(textVal = textVal.trim())) return;
    
    todos.push({
      id: Date.now(),
      text: textVal,
      done: false
    });
    
    this.setState({todos, textVal: ''})
  }
  // 删除一条
  deleteOneItem(todoItem){
    let {todos} = this.state;
    
    todos = todos.filter(todo => {
      return todo.id !== todoItem.id;
    });
    
    this.setState({todos});
  }
  // 切换完成和未完成
  toggleItem(todoItem){
    let {todos} = this.state;
    todos = todos.map(todo => {
      if(todo.id === todoItem.id){
        todo.done = !todo.done;
      }
      return todo;
    });
    this.setState({todos});
  }
  // 删除所有完成的todo
  deleteAllCompleted(){
    let {todos} = this.state;
    todos = todos.filter(todo => {
      return !todo.done
    });
    this.setState({todos});
  }
  // 全部选中或者取消选中的操作
  toggleAllItem(e){
    let {todos} = this.state;
    let {checked} = e.target;
    todos = todos.map(todo => {
      todo.done = checked;
      return todo;
    });
    this.setState({todos});
  }

  // 保存修改的值
  saveEditVal(todoItem, newText){
    let {todos} = this.state;
    todos = todos.map(todo => {
      if(todo.id === todoItem.id){
        todo.text = newText;
      }
      return todo;
    });
    this.setState({todos});
  }
  render() {
    console.log('我已改造');
    let {todos, textVal} = this.state;
    let {toggleItem, changeTextVal, addOneItem, deleteOneItem, deleteAllCompleted, toggleAllItem, saveEditVal} = this;
    let{pathname} = this.props;
    
    let todoLen = todos.length;
    let showAbleLen = todoLen;
    let [todoWrap, footer] = [null, null];
    
    
    console.log(pathname);
    todos = todos.filter(todo => {
      if(todo.done) todoLen--;
      switch(pathname){
        case '/':
          return true;
          break;
        case '/active':
          return !todo.done
          break;
        case '/Completed':
          return todo.done
          break;
      }
    });
    
    
    if(showAbleLen){
      todoWrap = (
        <ListWrap
          todos={todos}
          toggleItem={toggleItem}
          deleteOneItem={deleteOneItem}
          todoLen={todoLen}
          toggleAllItem={toggleAllItem}
          saveEditVal={saveEditVal}
        />
      );
      footer = (
        <Footer
          todoLen={todoLen}
          showClearBtn={todoLen < showAbleLen ? true : false}
          deleteAllCompleted={deleteAllCompleted}
          pathname ={pathname}
        />
      );
    }
    
    return (
      <div className="todoapp">
        <Header
          textVal={textVal}
          changeTextVal={changeTextVal}
          addOneItem={addOneItem}
        />
        {/* 如果是一个fasle值react都不会进行渲染 */}
        {todoWrap}
        {footer}
      </div>
    );
  }
}
Todos.propTypes = propTypes;
export default Todos;