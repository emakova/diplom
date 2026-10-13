import React, { useState } from 'react'
import './Header.css'

const Header = () => {
	// Массив пунктов меню (как на фото)
	const navItems = ['Главная', 'Авиабилеты', 'Друзья', 'Жилье', 'Статьи']

	// Состояние для активного пункта меню
	const [activeItem, setActiveItem] = useState('Home')

	// Обработчик клика по пункту меню
	const Search = (item) => {
		setActiveItem(item)
		//console.log(`Переход на страницу: ${item}`)
	}

	return (
		<header className='header'>
			{/*  Логотип */}
			<div className='header-logo' onClick={() => Search('Home')}>
				<div className='header-logo-title'>Friends</div>
				<div className='header-logo-subtitle'>Новые маста, новые друзья</div>
			</div>

			{/*  Навигация (меню) */}
			<ul className='header-nav'>
				{navItems.map((item) => (
					<li
						key={item}
						className={`header-nav-item ${activeItem === item ? 'header-nav-item--active' : ''}`}
						onClick={() => Search(item)}
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
