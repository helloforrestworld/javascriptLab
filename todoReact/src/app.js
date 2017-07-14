import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Todos from './class/Todos.js';


class App extends React.Component {
  render() {
    let{location:{pathname}}  = this.props;
    return (
      <Todos pathname={pathname} />
    )
  }
};

ReactDOM.render(
  <Router>
    <Route path="/" component={App}/>
  </Router>,
  document.getElementById('root')
);

if(module.hot){
  module.hot.accept();
}