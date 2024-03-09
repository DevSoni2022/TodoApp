import React from 'react';
import TodoList from './components/TodoList';
import Header from './components/Header/Header';
import './todo.scss'
const App = () => {
  return (
    <div className="App">
      <Header/>
      <TodoList />
    </div>
  )
}

export default App
