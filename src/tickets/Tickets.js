import React, { useState } from 'react'
import './Tickets.css'

const Tickets = () => {
	//  Состояния формы 
	const [searchData, setSearchData] = useState({
		from: '',
		to: '',
		dateDeparture: '',
		dateReturn: '',
		adults: 1,
		children: 0,
		infants: 0,
	})

	//  Состояние для отображения результатов 
	const [searchResults, setSearchResults] = useState([])
	const [hasSearched, setHasSearched] = useState(false)

	//  Данные для карусели 
	const carouselCountries = [
		{
			id: 1,
			country: 'Италия',
			city: 'Рим',
			image:
				'https://i.pinimg.com/736x/7e/ca/e0/7ecae0d6304fa92f0af123cefe354540.jpg',
		},
		{
			id: 2,
			country: 'Россия',
			city: 'Калининград',
			image:
				'https://i.pinimg.com/736x/03/e6/2d/03e62db5fd567bd875f1004e8cae3c60.jpg',
		},
		{
			id: 3,
			country: 'Япония',
			city: 'Токио',
			image:
				'https://i.pinimg.com/736x/c4/ef/fc/c4effc198c346999d99129e0e556f755.jpg',
		},
		{
			id: 4,
			country: 'Франция',
			city: 'Париж',
			image:
				'https://i.pinimg.com/736x/ba/7f/48/ba7f489cc9596688fdaf76945f929666.jpg',
		},
	]

	const duplicatedCountries = [...carouselCountries,...carouselCountries];
	//дублирование карусели. создаем для того чтоб зациклить нашу карусель ниже

	//  Обработчик изменения полей 
	const handleChange = (e) => {
		const { name, value } = e.target
		setSearchData({ ...searchData, [name]: value })
	}

	//  Обработчик поиска 
	const handleSearch = (e) => {
		e.preventDefault()

		// Проверка на заполнение
		if (!searchData.from || !searchData.to || !searchData.dateDeparture) {
			alert('Пожалуйста, заполните "Откуда", "Куда" и дату вылета!')
			return
		}

		// Имитация загрузки билетов (в реальности здесь был бы fetch)
		const mockTickets = [
			{
				id: 1,
				airline: 'Аэрофлот',
				time: '10:30 - 12:45',
				date: searchData.dateDeparture,
				route: `${searchData.from} → ${searchData.to}`,
				price: 15000,
			},
			{
				id: 2,
				airline: 'S7 Airlines',
				time: '14:00 - 16:15',
				date: searchData.dateDeparture,
				route: `${searchData.from} → ${searchData.to}`,
				price: 12500,
			},
			{
				id: 3,
				airline: 'Победа',
				time: '18:20 - 20:35',
				date: searchData.dateDeparture,
				route: `${searchData.from} → ${searchData.to}`,
				price: 9800,
			},
			{
				id: 4,
				airline: 'Россия',
				time: '17:12 - 00:50',
				date: searchData.dateDeparture,
				route: `${searchData.from} → ${searchData.to}`,
				price: 9800,
			},
			{
				id: 5,
				airline: 'S7 Airlines',
				time: '14:00 - 18:35',
				date: searchData.dateDeparture,
				route: `${searchData.from} → ${searchData.to}`,
				price: 12335,
			},
			{
				id: 6,
				airline: 'AzurAir',
				time: '11:30 - 23:40',
				date: searchData.dateDeparture,
				route: `${searchData.from} → ${searchData.to}`,
				price: 14550,
			},
			{
				id: 7,
				airline: 'Aeroflot',
				time: '19:50 - 1:35',
				date: searchData.dateDeparture,
				route: `${searchData.from} → ${searchData.to}`,
				price: 11300,
			},
		]

		// Имитация задержки сети
		 setTimeout(() => {
			setSearchResults(mockTickets)
			setHasSearched(true)
		}, 500) 
	}

	return (
		<div className='tickets-page'>
			<h1 className='tickets-page__title'>Поиск авиабилетов</h1>

			{/*  ФОРМА ПОИСКА  */}
			<form className='search-form' onSubmit={handleSearch}>
				<div className='search-form__group'>
					<label className='search-form__label'>Откуда</label>
					<input
						type='text'
						name='from'
						className='search-form__input'
						placeholder='Город вылета'
						value={searchData.from}
						onChange={handleChange}
					/>
				</div>

				<div className='search-form__group'>
					<label className='search-form__label'>Куда</label>
					<input
						type='text'
						name='to'
						className='search-form__input'
						placeholder='Город прилета'
						value={searchData.to}
						onChange={handleChange}
					/>
				</div>

				<div className='search-form__group'>
					<label className='search-form__label'>Дата вылета</label>
					<input
						type='date'
						name='dateDeparture'
						className='search-form__input'
						value={searchData.dateDeparture}
						onChange={handleChange}
					/>
				</div>

				<div className='search-form__group'>
					<label className='search-form__label'>
						Дата возвращения (опционально)
					</label>
					<input
						type='date'
						name='dateReturn'
						className='search-form__input'
						value={searchData.dateReturn}
						onChange={handleChange}
					/>
				</div>

				{/* Пассажиры */}
				<div className='passengers-group'>
					<div>
						<label className='search-form__label'>Взрослые</label>
						<input
							type='number'
							name='adults'
							min='1'
							max='9'
							className='search-form__input'
							value={searchData.adults}
							onChange={handleChange}
						/>
					</div>
					<div>
						<label className='search-form__label'>Дети (2-12 лет)</label>
						<input
							type='number'
							name='children'
							min='0'
							max='9'
							className='search-form__input'
							value={searchData.children}
							onChange={handleChange}
						/>
					</div>
					<div>
						<label className='search-form__label'>Младенцы (до 2 лет)</label>
						<input
							type='number'
							name='infants'
							min='0'
							max='9'
							className='search-form__input'
							value={searchData.infants}
							onChange={handleChange}
						/>
					</div>
				</div>

				<button type='submit' className='search-form__btn'>
					Найти билеты
				</button>
			</form>

			{/*  РЕЗУЛЬТАТЫ ПОИСКА  */}
			{hasSearched && (
				<div className='flight-results'>
					<h2 className='flight-results__title'>Доступные варианты:</h2>
					{searchResults.length > 0 ? (
						searchResults.map((ticket) => (
							<div key={ticket.id} className='flight-card'>
								<div className='flight-card__info'>
									<span className='flight-card__route'>{ticket.route}</span>
									<span className='flight-card__time'>
										{ticket.airline} | {ticket.time}
									</span>
									<span className='flight-card__date'>Дата: {ticket.date}</span>
								</div>
								<div className='flight-card__price'>{ticket.price} ₽</div>
							</div>
						))
					) : (
						<p>Билетов не найдено.</p>
					)}
				</div>
			)}

			{/*  КАРУСЕЛЬ СТРАН  */}
			<div className='carousel'>
				<h2 className='carousel__title'>Популярные направления</h2>
				<div className='carousel__track'>
					{duplicatedCountries.map((item,index) => (
						<div key={`${item.id}-${index}`} className='carousel__item'>
							<img
								src={item.image}
								alt={item.city}
								className='carousel__image'
							/>
							<div className='carousel__caption'>
								{item.country}. {item.city}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default Tickets
