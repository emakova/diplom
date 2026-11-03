import React, { useState } from 'react'
import './Housing.css'

// Импортируем картинку профиля (пример)
import defaultAvatar from '../article-page/аватар1.avif'

const Housing = ({ onSelectHousing }) => {
	// Состояния для поиска
	const [searchCountry, setSearchCountry] = useState('')
	const [searchCity, setSearchCity] = useState('')
	const [hasSearched, setHasSearched] = useState(false)

	// Изначальные данные (в реальности приходят с сервера)
	const allHousings = [
		{
			id: 1,
			title: 'Уютная студия в центре Рима',
			country: 'Италия',
			city: 'Рим',
			description:
				'Отличное место для  одной девушки или двух подруг. Есть Wi-Fi, кухня и балкон с видом на улицу. 5 минут пешком до Колизея. +7 983 282 17 15',
			price: '4500 ₽ / месяц',
			author: { name: 'Мария', avatar: defaultAvatar },
			images: [
				'https://i.pinimg.com/1200x/e1/45/f3/e145f397459447cd80dfd7ed86eda50e.jpg',
				'https://i.pinimg.com/1200x/18/12/94/18129475739d6d85e9cbcb831d1126aa.jpg',
				'https://i.pinimg.com/736x/36/fb/fa/36fbfac3b51733017ce02a1f62dab4f9.jpg',
			],
		},
		{
			id: 2,
			title: 'Комната в хостеле Токио',
			country: 'Япония',
			city: 'Токио',
			description:
				'Ищу соседку по хостелу. Условия спартанские, но зато бесплатно! Есть общая кухня и душ. +1 999 748 11',
			price: 'FREE',
			author: { name: 'Ли Мэй', avatar: defaultAvatar },
			images: [
				'https://i.pinimg.com/736x/69/ff/06/69ff062101a285a495c4cdd02cefa2dc.jpg',
				'https://i.pinimg.com/1200x/a0/e7/19/a0e7199745c32d390c20a83ad3af6bc2.jpg',
			],
		},
		{
			id: 3,
			title: 'Апартаменты с видом на море',
			country: 'Грузия',
			city: 'Батуми',
			description:
				'Просторные апартаменты на берегу. 2 спальни, большая терраса. Идеально для двоих человек. жду отклик) +7 999 345 34 57 ',
			price: '10000 ₽ / месяц',
			author: { name: 'Оливия', avatar: defaultAvatar },
			images: [
				'https://i.pinimg.com/736x/01/48/9b/01489b89c9adb4ad0970b05bc204e59c.jpg',
				'https://i.pinimg.com/736x/96/7e/6a/967e6a610fff2afe290ed239c51a54ef.jpg',
			],
		},
	]

	// Фильтрация объявлений
	const filteredHousings = allHousings.filter((item) => {
		const matchCountry = item.country
			.toLowerCase()
			.includes(searchCountry.toLowerCase())
		const matchCity = item.city.toLowerCase().includes(searchCity.toLowerCase())
		return matchCountry && matchCity
	})

	const handleSearch = (e) => {
		e.preventDefault()
		setHasSearched(true)
	}

	return (
		<div className='housing-page'>
			<h1 className='housing-page__title'>Поиск жилья</h1>

			{/* Форма поиска */}
			<form className='housing-search' onSubmit={handleSearch}>
				<input
					type='text'
					className='housing-search__input'
					placeholder='Страна (например, Италия)'
					value={searchCountry}
					onChange={(e) => setSearchCountry(e.target.value)}
				/>
				<input
					type='text'
					className='housing-search__input'
					placeholder='Город (например, Рим)'
					value={searchCity}
					onChange={(e) => setSearchCity(e.target.value)}
				/>
				<button type='submit' className='housing-search__btn'>
					Искать
				</button>
			</form>

			{/* Список объявлений */}
			{(hasSearched || searchCountry || searchCity) && (
				<div className='housing-list'>
					{filteredHousings.length > 0 ? (
						filteredHousings.map((house) => (
							<div
								key={house.id}
								className='housing-card'
								onClick={() => onSelectHousing(house)} // Переход на детальную страницу
							>
								<img
									src={house.images[0]}
									alt={house.title}
									className='housing-card__img'
								/>
								<div className='housing-card__content'>
									<h3 className='housing-card__title'>{house.title}</h3>
									<div className='housing-card__location'>
										{house.country}, {house.city}
									</div>
									<p className='housing-card__desc'>{house.description}</p>

									<div className='housing-card__footer'>
										<div className='housing-card__author'>
											<img
												src={house.author.avatar}
												alt={house.author.name}
												className='avatar-small'
											/>
											{house.author.name}
										</div>
										<div
											className={`housing-card__price ${house.price === 'FREE' ? 'housing-card__price--free' : ''}`}
										>
											{house.price}
										</div>
									</div>
								</div>
							</div>
						))
					) : (
						<p
							style={{
								gridColumn: '1 / -1',
								textAlign: 'center',
								fontSize: '18px',
								color: '#64748b',
							}}
						>
							По вашему запросу ничего не найдено.
						</p>
					)}
				</div>
			)}
		</div>
	)
}

export default Housing
