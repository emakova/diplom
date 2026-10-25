import React, { useState } from 'react'
import avatarAnna from "../article-page/аватар1.avif";
import avatarIrina from '../article-page/аватар2.avif'
import avatarMaria from '../article-page/аватар3.jpg'
import avatarIanina from "../article-page/аватар4.webp"
import avatarOlga from "../article-page/аватар5.png"
import avatarElena from"../article-page/аватар6.webp"
import avatarIulia from "../article-page/аватар7.png"


import './Articles.css'

const Articles = ({onSelectArticle}) => {
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
			fullText:
				'Рим — это город, который невозможно забыть. Колизей, Ватикан, уютные улочки и невероятная паста. Я провела там неделю и влюбилась в этот город. Каждый день мы находили новые места: от маленьких кофеен до величественных фонтанов. Обязательно вернусь сюда снова, чтобы увидеть всё, что не успела!',
			hashtags: ['#Рим', '#Италия', '#Путешествия'],
			image:
				'https://i.pinimg.com/1200x/b2/e6/ec/b2e6ece8f58dd6996fe6a305ec711bec.jpg',
			// Картинка Рима
			author: {
				name: 'Анна Смирнова',
				avatar: avatarAnna,
			}, // Аватар и ник
			comments: [
				{
					id: 1,
					author: {
						name: 'Ирина Петрова',
						avatar: avatarIrina,
					},
					text: 'Отличная статья! Тоже мечтапобывать в Риме.',
				},
				{
					id: 2,
					author: {
						name: 'Мария К.',
						avatar: avatarMaria,
					},
					text: 'А какие там цены на пасту? 😍',
				},
			],
		},
		{
			id: 2,
			country: 'Япония',
			title: 'Токио: город контрастов',
			text: 'От шумных улиц Сибуя до тихих храмов Киото. Япония удивляет на каждом шагу. Обязательно попробуйте суши и посетите цветение сакуры весной.',
			fullText:
				'От шумных улиц Сибуя до тихих храмов Киото. Япония удивляет на каждом шагу. Обязательно попробуйте суши и посетите цветение сакуры весной. Местная культура настолько глубока, что одного раза явно недостаточно. Удивительная вежливость людей и невероятная архитектура оставили след в моем сердце.',
			hashtags: ['#Токио', '#Сакура', '#Азия'],
			image:
				'https://i.pinimg.com/1200x/4a/0d/36/4a0d3638b7b0091d65a9c37fbb67f78e.jpg',
			// Картинка Токио
			author: {
				name: 'Янина Воронова',
				avatar: avatarIanina,
			},
			comments: [
				{
					id: 1,
					author: { name: 'Ольга', avatar: avatarOlga },
					text: 'Мечта! Какой бюджет нужен на такую поездку?',
				},
			],
		},
		{
			id: 3,
			country: 'Грузия',
			title: 'Горы, вино и гостеприимство',
			text: 'Тбилиси покоряет своей атмосферой. Вкуснейшая еда, вино и добродушные люди. Поднимитесь на крепость Нарикала ради заката — это незабываемо.',
			fullText:
				'Тбилиси покоряет своей атмосферой. Вкуснейшая еда, вино и добродушные люди. Поднимитесь на крепость Нарикала ради заката — это незабываемо. А еще обязательно сходите в серные бани и попробуйте хинкали. Грузия — это любовь с первого взгляда.',
			hashtags: ['#Тбилиси', '#Грузия', '#Вино'],
			image:
				'https://i.pinimg.com/1200x/a0/e3/16/a0e3165d1cf6eba1c9c884602adaebf8.jpg', // Картинка Грузии
			author: {
				name: 'Елена Гоголь',
				avatar: avatarElena,
			},
			comments: [
				{
					id: 1,
					author: { name: 'Юлия', avatar: avatarIulia },
					text: 'Вааау. как долго вы были в Тбилиси?',
				},
			],
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
			<h1 className='articles-title'>Статьи путешественниц</h1>

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
						<div key={article.id} className='article-card'
						onClick={()=>onSelectArticle(article)}
						style={{cursor:"pointer"}}>
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
