import React from 'react';
import { useState } from 'react';
import Header from './header/Header';
import Main from './main/Main';
import Articles from './articles/Articles';
import './App.css';

function App() {
  const [currentPage, setCurrentPage]=useState('main');
  return (
    <div className="App">
      <Header setCurrentPage={setCurrentPage}/>
      {currentPage=== 'main' &&<Main/>}
      {currentPage === "articles" && <Articles/>}
    </div>
  );
}

export default App;
