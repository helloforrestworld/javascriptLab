import React, { Component } from 'react';

import ListItem from './ListItem.js';

let propTypes = {
  todos: PT.array,
  toggleItem: PT.func,
  deleteOneItem: PT.func,
  todoLen: PT.number,
  toggleAllItem: PT.func,
  saveEditVal: PT.func
}

class ListWrap extends Component {
  render() {
    let {todos, toggleItem, deleteOneItem, todoLen, toggleAllItem, saveEditVal}= this.props;
    
    let lists = todos.map(todo => {
      return (
        <ListItem
          key={todo.id}
          todoData={todo}
          toggleItem={toggleItem}
          deleteOneItem={deleteOneItem}
          saveEditVal={saveEditVal}
        />
      )
    });
    
    return (
      <section className="main">
        <input
          type="checkbox"
          className="toggle-all"
          checked={!todoLen ? true : false}
          onChange={toggleAllItem}
        />
        <ul className="todo-list">
          {lists}
        </ul>
      </section>
    );
  }
}

ListWrap.propTypes = propTypes;

export default ListWrap;