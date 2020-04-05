import React from 'react';

import Header from './components/header';
import Main from './pages/main';

import './style.scss'

const App = () => (
  <div className="App">
    <Header text="Add Github Repositories" />
    <Main />
  </div>
);

export default App;
