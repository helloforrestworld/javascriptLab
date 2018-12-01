import React, { Component } from 'react';
import {Link} from 'react-router-dom';
let propTypes = {
  todoLen: PT.number,
  showClearBtn: PT.bool,
  deleteAllCompleted: PT.func,
}

class Footer extends Component {

  render() {
    let {todoLen, showClearBtn, deleteAllCompleted,pathname} = this.props;

    let clearBtn = null;
    
    if(showClearBtn){
      clearBtn = (
        <button
          className="clear-completed"
          onClick={deleteAllCompleted}
        >Clear completed</button>
      );
    }
    
    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{todoLen}</strong>
          {' '}
          item
          {' '}
          left
        </span>
        <ul className="filters">
          <li>
            <Link 
              className={pathname === '/' ? 'selected' : ''}
              to='/'>
              All
            </Link>
          </li>
          <li>
            <Link 
              className={pathname === '/active' ? 'selected' : ''}
              to='active'>
              active
            </Link>
          </li>
          <li>
            <Link 
              className={pathname === 'Completed' ? 'selected' : ''}
              to='/Completed'>
              Completed
            </Link>
          </li>
        </ul>
        {clearBtn}
      </footer>
    );
  }
}

Footer.propTypes = propTypes;

export default Footer;