import React, { useState } from 'react'
import './Articles.css'

const Articles = () => {
	// Массив стран для выпадающего списка (в алфавитном порядкею мщжно еще добавить) 
	const countries = [
		'Все страны',
		'Грузия',
		'Италия',
		'Россия',
		'Франция',
		'Япония',
	]

	//  Изначальные статьи 
	const initialArticles = [
		{
			id: 1,
			country: 'Италия',
			title: 'Мои первые каникулы в Риме',
			text: 'Рим — это город, который невозможно забыть. Колизей, Ватикан, уютные улочки и невероятная паста. Я провела там неделю и влюбилась в этот город.',
			hashtags: ['#Рим', '#Италия', '#Путешествия'],
		},
		{
			id: 2,
			country: 'Япония',
			title: 'Токио: город контрастов',
			text: 'От шумных улиц Сибуя до тихих храмов Киото. Япония удивляет на каждом шагу. Обязательно попробуйте суши и посетите цветение сакуры весной.',
			hashtags: ['#Токио', '#Сакура', '#Азия'],
		},
		{
			id: 3,
			country: 'Грузия',
			title: 'Горы, вино и гостеприимство',
			text: 'Тбилиси покоряет своей атмосферой. Вкуснейшая еда, вино и добродушные люди. Поднимитесь на крепость Нарикала ради заката — это незабываемо.',
			hashtags: ['#Тбилиси', '#Грузия', '#Вино'],
		},
	]

	//Состояния 
	const [articles, setArticles] = useState(initialArticles) // Список всех статей
	const [selectedCountry, setSelectedCountry] = useState('Все страны') // Фильтр

	// Состояния для новой написанной статьи(написать свою статью)
	const [newArticle, setNewArticle] = useState({
		title: '',
		country: 'Россия', // По умолчанию
		text: '',
		hashtags: '',
	})

	// Фильтрация статей по выбранной стране
	const filteredArticles =
		selectedCountry === 'Все страны'
			? articles
			: articles.filter((article) => article.country === selectedCountry)

	//  Обработчик изменения полей формы 
	const handleInputChange = (e) => {
		const { name, value } = e.target
		setNewArticle({ ...newArticle, [name]: value })
	}

	//  Обработчик добавления статьи 
	const handleAddArticle = (e) => {
		e.preventDefault()

		// Проверка на заполненность
		if (!newArticle.title || !newArticle.text) {
			alert('Пожалуйста, заполните название и текст статьи!')
			return
		}

		// Преобразуем строку хештегов в массив (разделяем по пробелу или запятой)
		const hashtagsArray = newArticle.hashtags
			.split(/[\s,]+/)
			.filter((tag) => tag.trim() !== '') // Убираем пустые
			.map((tag) => (tag.startsWith('#') ? tag : `#${tag}`)) // Добавляем # если нет

		// Создаем новую статью
		const articleToAdd = {
			id: Date.now(), // Уникальный ID создаем
			country: newArticle.country,
			title: newArticle.title,
			text: newArticle.text,
			hashtags: hashtagsArray,
		}

		// Добавляем в начало списка
		setArticles([articleToAdd, ...articles])

		// Очищаем форму
		setNewArticle({ title: '', country: 'Италия', text: '', hashtags: '' })
		alert('Статья успешно опубликована!')
	}

	return (
		<div className='articles'>
			<h1 className='articles-title'>Статьи путешественников</h1>

			{/* === Блок фильтрации === */}
			<div className='articles-filter'>
				<div className='articles-filter-title'>Выберите страну:</div>
				<select
					className='articles-select'
					value={selectedCountry}
					onChange={(e) => setSelectedCountry(e.target.value)}
				>
					{countries.map((country) => (
						<option key={country} value={country}>
							{country}
						</option>
					))}
				</select>
			</div>

			{/* === Список статей === */}
			<div className='articles-list'>
				{filteredArticles.length > 0 ? (
					filteredArticles.map((article) => (
						<div key={article.id} className='article-card'>
							<div className='article-card-header'>
								<span className='article-card-country'>{article.country}</span>
							</div>
							<h3 className='article-card-title'>{article.title}</h3>
							<p className='article-card-text'>{article.text}</p>
							<div className='article-card-hashtags'>
								{article.hashtags.map((tag, index) => (
									<span key={index} className='hashtag'>
										{tag}
									</span>
								))}
							</div>
						</div>
					))
				) : (
					<p className='no-articles'>
						По этой стране пока нет статей. Будь первой, подруга!
					</p>
				)}
			</div>

			{/* Форма добавления статьи */}
			<form className='articles-form' onSubmit={handleAddArticle}>
				<h3>Написать свою статью</h3>

				<div className='form-group'>
					<label className='form-label'>Название статьи</label>
					<input
						type='text'
						name='title'
						className='form-input'
						placeholder='О чем ваша история?'
						value={newArticle.title}
						onChange={handleInputChange}
					/>
				</div>

				<div className='form-group'>
					<label className='form-label'>Страна</label>
					<select
						name='country'
						className='form-select'
						value={newArticle.country}
						onChange={handleInputChange}
					>
						{countries
							.filter((c) => c !== 'Все страны')
							.map((country) => (
								<option key={country} value={country}>
									{country}
								</option>
							))}
					</select>
				</div>

				<div className='form-group'>
					<label className='form-label'>Текст статьи</label>
					<textarea
						name='text'
						className='form-textarea'
						placeholder='Расскажите о вашем путешествии...'
						value={newArticle.text}
						onChange={handleInputChange}
					></textarea>
				</div>

				<div className='form-group'>
					<label className='form-label'>Хештеги (через пробел)</label>
					<input
						type='text'
						name='hashtags'
						className='form-input'
						placeholder='#Путешествия #Отдых'
						value={newArticle.hashtags}
						onChange={handleInputChange}
					/>
				</div>

				<button type='submit' className='form-submit'>
					Опубликовать
				</button>
			</form>
		</div>
	)
}

export default Articles
