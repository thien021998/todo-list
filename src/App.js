import React from 'react'
import Todo from './todo'
import './App.css'
import LogIn from './login/LogIn';
import {BrowserRouter as Router, Route} from 'react-router-dom'
class App extends React.Component {
  render() {
    return (
      <Router>
      <div className="App container">
        <Route path="/" exact component={Todo}/>
        <Route path="/login" exact component={LogIn}/>
      </div>
      </Router>
    );
  }
}

export default App
