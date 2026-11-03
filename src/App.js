import React from 'react';
import { useState } from 'react';
import Header from './header/Header';
import Main from './main/Main';
import Articles from './articles/Articles';
import ArticlePage from './article-page/ArticlePage';
import Tickets from './tickets/Tickets';
import Housing from './housing/Housing';
import HousingPage from './housing/HousingPage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage]=useState('main');
  //загразка всегда на станицу main(главная)
  const [selectedArticle,setSelectedArticle]=useState(null)
  //состояние для выбранной пользователем статьи
  const handleSelectArticle=(article)=>{
    setSelectedArticle(article);
    setCurrentPage("article")
  }
  const [selectedHousing, setSelectedHousing] = useState('null')
  //состояние для выбранного жилья


  //функция перехода на страницу статьи
  const handleBackToArticle=()=>{
    setSelectedArticle(null);
    setCurrentPage("articles")
  }
  return (
		<div className='App'>
			<Header setCurrentPage={setCurrentPage} />
			{currentPage === 'main' && <Main />}
			{currentPage === 'articles' && (
				<Articles onSelectArticle={handleSelectArticle} />
			)}
			{currentPage === 'article' && selectedArticle && (
				<ArticlePage article={selectedArticle} onBack={handleBackToArticle} />
			)}
			{currentPage === 'tickets' && <Tickets />}
			{currentPage === 'housing' && (
				<Housing onSelectHousing={(house) => {setSelectedHousing(house);
          setCurrentPage("housing-details");
        } }/>
			)}
			{currentPage === 'housing-details' && selectedHousing && (
				<HousingPage housing={selectedHousing}  onBack={()=>setCurrentPage("housing")}/>
			)}
		</div>
	)
}

export default App;
