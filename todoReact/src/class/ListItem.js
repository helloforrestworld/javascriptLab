import React, { Component } from 'react';

let propTypes = {
  todoData: PT.object,
  toggleItem: PT.func,
  deleteOneItem: PT.func,
  saveEditVal: PT.func
}

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editAble: false,
      changeVal: ''
    };
    this.showEditInput = this.showEditInput.bind(this)
    this.changeNewVal = this.changeNewVal.bind(this);
    this.onEditBlur = this.onEditBlur.bind(this);
    this.onEditEnter = this.onEditEnter.bind(this);
  }
  showEditInput(){
    let {todoData: {text}} = this.props;
    this.setState({
      editAble: true,
      changeVal: text
    }, () => {
      this.refs.editInput.focus();
    });
    // console.log(this.refs.editInput);
  }
  // 用来控制修改文本框内容的
  changeNewVal(e){
    this.setState({
      changeVal: e.target.value
    })
  }
  onEditBlur(){
    let {changeVal} = this.state;
    let {saveEditVal, todoData} = this.props;

    saveEditVal(todoData, changeVal);
    
    this.setState({
      editAble: false
    });
  }
  onEditEnter(e){
    if(e.keyCode !== 13 && e.keyCode !== 27) return;
    this.onEditBlur();
  }
  render() {
    let {todoData, toggleItem, deleteOneItem} = this.props;
    let {id, text, done} = todoData;
    let {editAble, changeVal} = this.state;
    
    let {showEditInput, changeNewVal, onEditBlur, onEditEnter} = this;
    
    let itemClass = '';
    if(done) itemClass += " completed";
    if(editAble) itemClass += ' editing';
    
    return (
      <li className={itemClass.trim()}>
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            checked={done}
            onChange={() => {
              toggleItem(todoData);
            }}
          />
          <label
            onDoubleClick={showEditInput}
          >{text}</label>
          <button className="destroy"
            onClick={() => {
              deleteOneItem(todoData)
            }}
          />
        </div>
        <input
          type="text"
          className="edit"
          value={changeVal}
          onChange={changeNewVal}
          ref="editInput"
          onBlur={onEditBlur}
          onKeyDown={onEditEnter}
        />
      </li>
    );
  }
}

ListItem.propTypes = propTypes;

export default ListItem;