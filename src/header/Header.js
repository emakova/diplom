import React, { useState } from 'react'
import './Header.css'

const Header = ({setCurrentPage}) => {
	// Массив пунктов меню (как на фото)
	const navItems = ['Главная', 'Авиабилеты', 'Друзья', 'Жилье', 'Статьи'];

	// Состояние для активного пункта меню
	const [activeItem, setActiveItem] = useState('Главная');

	// Обработчик клика по пункту меню
  const  handleNavClick=(item)=>{
		setActiveItem(item);

	if (item === "Статьи"){
		setCurrentPage('articles')
		//переключаем на страницу статей
	}else{
		setCurrentPage('main')
		//возвращаем на главную
	}
};
	return (
		<header className='header'>
			{/*  Логотип */}
			<div className='header-logo' onClick={() => handleNavClick('Главная')}>
				<div className='header-logo-title'>Friends</div>
				<div className='header-logo-subtitle'>Новые маста, новые друзья</div>
			</div>

			{/*  Навигация (меню) */}
			<ul className='header-nav'>
				{navItems.map((item) => (
					<li
						key={item}
						className={`header-nav-item ${activeItem === item ? 'header-nav-item--active' : ''}`}
						onClick={() => handleNavClick(item)}
					>
						{item}
					</li>
				))}
			</ul>

			{/* кнопка */}
			<div className='header-actions'>
				<button className='header-btn'>Старт</button>
			</div>
		</header>
	)
}

export default Header
