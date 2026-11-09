import React, { useState } from 'react'
import './Housing.css'

// Импортируем картинку профиля (пример)
import defaultAvatar from '../article-page/аватар1.avif'

const Housing = ({ onSelectHousing }) => {
	// Состояния для поиска
	const [searchCountry, setSearchCountry] = useState('')
	const [searchCity, setSearchCity] = useState('')
	const [hasSearched, setHasSearched] = useState(false)

	//  Состояния для формы добавления
	const [newHousing, setNewHousing] = useState({
		title: '',
		country: '',
		city: '',
		description: '',
		price: '',
		phone: '',
		image: '', // Здесь будет храниться картинка как обыная url
	})
	// Изначальные данные (в реальности приходят с сервера)

	const [allHousings, setAllHousings] = useState([
		{
			id: 1,
			title: 'Уютная студия в центре Рима',
			country: 'Италия',
			city: 'Рим',
			description:
				'Отличное место для пары. Есть Wi-Fi, кухня и балкон с видом на улицу. 5 минут пешком до Колизея.',
			price: '4500 ₽ / месяц',
			phone: '+7 999 123-45-67',
			author: { name: 'Мария', avatar: defaultAvatar },
			images: [
				'https://i.pinimg.com/1200x/29/a0/c0/29a0c0989d6f58052958743671552e43.jpg',
				'https://i.pinimg.com/1200x/9c/a4/f3/9ca4f372464d753234401abbb37d33cb.jpg'
			],
		},
		{
			id: 2,
			title: 'Комната в хостеле Токио',
			country: 'Япония',
			city: 'Токио',
			description:
				'Ищу соседа по хостелу. Условия спартанские, но зато бесплатно! Есть общая кухня и душ.',
			price: 'FREE',
			phone: '+81 90 1234 5678',
			author: { name: 'Кенджи', avatar: defaultAvatar },
			images: [
				'https://i.pinimg.com/736x/69/ff/06/69ff062101a285a495c4cdd02cefa2dc.jpg',
				'https://i.pinimg.com/1200x/a9/9f/a5/a99fa5899452aa68c8bb61b59e201b0f.jpg',
			],
		},
	])

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

	const handleFormChange = (e) => {
		const { name, value } = e.target
		setNewHousing({ ...newHousing, [name]: value })
	}

	// обработчик фото
	const handleImageChange = (e) => {
		const file = e.target.files[0]
		if (file) {
			// URL.createObjectURL создает быструю локальную ссылку на файл
			const imageUrl = URL.createObjectURL(file)
			setNewHousing({ ...newHousing, image: imageUrl })
		}
	}

	const handleAddHousing = (e) => {
		e.preventDefault()

		if (
			!newHousing.title ||
			!newHousing.country ||
			!newHousing.city ||
			!newHousing.description ||
			!newHousing.phone
		) {
			alert('Пожалуйста, заполните все обязательные поля!')
			return
		}

		const housingToAdd = {
			id: Date.now(),
			title: newHousing.title,
			country: newHousing.country,
			city: newHousing.city,
			description: newHousing.description,
			price: newHousing.price ? newHousing.price : 'Цена не указана',
			phone: newHousing.phone,
			author: { name: 'Вы (Автор)', avatar: defaultAvatar },
			// Если фото выбрано (ссылка есть), используем его. Если нет — ставим заглушку.
			images: [
				newHousing.image ||
					'https://i.pinimg.com/736x/ee/cc/ea/eeccea7c95bd8526d3716bb93406c9a3.jpg',
			],
		}

		setAllHousings([housingToAdd, ...allHousings])

		// Очищаем форму
		setNewHousing({
			title: '',
			country: '',
			city: '',
			description: '',
			price: '',
			phone: '',
			image: '',
		})
		alert('Объявление успешно добавлено!')
	}

	// ... остальной JSX (форма и список) остается без изменений

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
			
				{/* форма добавления жилья */}
      <form className="add-housing-form" onSubmit={handleAddHousing}>
        <h2 className="add-housing-form__title">Сдать свое жилье</h2>
        
        <div className="add-housing-form__grid">
          {/* Поле: Заголовок */}
          <div className="add-housing-form__group add-housing-form__full">
            <label className="add-housing-form__label">Заголовок объявления *</label>
            <input 
              type="text" 
              name="title" 
              className="add-housing-form__input" 
              placeholder="Уютная квартира у моря" 
              value={newHousing.title}
              onChange={handleFormChange}
            />
          </div>
 
          {/* Поле: Страна */}
          <div className="add-housing-form__group">
            <label className="add-housing-form__label">Страна *</label>
            <input 
              type="text" 
              name="country" 
              className="add-housing-form__input" 
              placeholder="Россия" 
              value={newHousing.country}
              onChange={handleFormChange}
            />
          </div>
 
          {/* Поле: Город */}
          <div className="add-housing-form__group">
            <label className="add-housing-form__label">Город *</label>
            <input 
              type="text" 
              name="city" 
              className="add-housing-form__input" 
              placeholder="Сочи" 
              value={newHousing.city}
              onChange={handleFormChange}
            />
          </div>
 
          {/* Поле: Описание */}
          <div className="add-housing-form__group add-housing-form__full">
            <label className="add-housing-form__label">Описание *</label>
            <textarea 
              name="description" 
              className="add-housing-form__textarea" 
              placeholder="Опишите условия проживания..."
              value={newHousing.description}
              onChange={handleFormChange}
            ></textarea>
          </div>
 
          {/* Поле: Цена */}
          <div className="add-housing-form__group">
            <label className="add-housing-form__label">Цена (оставьте пустым, если FREE)</label>
            <input 
              type="text" 
              name="price" 
              className="add-housing-form__input" 
              placeholder="3000 ₽ / ночь" 
              value={newHousing.price}
              onChange={handleFormChange}
            />
          </div>
 
          {/* Поле: Телефон */}
          <div className="add-housing-form__group">
            <label className="add-housing-form__label">Номер телефона *</label>
            <input 
              type="tel" 
              name="phone" 
              className="add-housing-form__input" 
              placeholder="+7 999 123-45-67" 
              value={newHousing.phone}
              onChange={handleFormChange}
            />
          </div>
 
          {/* Поле: Фото */}
          <div className="add-housing-form__group add-housing-form__full">
            <label className="add-housing-form__label">Прикрепить фото</label>
            <input 
              type="file" 
              accept="image/*"
              className="add-housing-form__file" 
              onChange={handleImageChange}
            />
            {/* Превью картинки */}
            {newHousing.image && (
              <img 
                src={newHousing.image} 
                alt="Превью" 
                style={{ width: '100px', height: '100px', objectFit: 'cover', marginTop: '10px', borderRadius: '8px' }} 
              />
            )}
          </div>
        </div>
 
        <button type="submit" className="add-housing-form__btn">
          Опубликовать объявление
        </button>
      </form>

				
		</div>
	);
};

export default Housing
