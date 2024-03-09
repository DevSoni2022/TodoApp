import React from 'react';
import TodoList from './components/TodoList';
import Header from './components/Header/Header';
import './todo.scss'
const App = () => {
  const isMobile = navigator && navigator.userAgentData.mobile;
  return (
    <div className="App">
      <Header/>
      <TodoList isMobile = {isMobile} />
    </div>
  )
}

export default App
