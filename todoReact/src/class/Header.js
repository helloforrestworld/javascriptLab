import React, { Component } from 'react';

let propTypes = {
  textVal: PT.string,
  changeTextVal: PT.func,
  addOneItem: PT.func
}

class Header extends Component {

  render() {
    let {textVal, changeTextVal, addOneItem} = this.props;
    
    return (
      <header className="header">
        <h1>todos</h1>
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          value={textVal}
          onChange={changeTextVal}
          onKeyDown={addOneItem}
        />
      </header>
    );
  }
}

Header.propTypes = propTypes;

export default Header;