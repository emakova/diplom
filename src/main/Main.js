import React, { useState } from 'react'
import './Main.css'

const Main = () => {
	// === Состояния формы ===
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	})

	//  Состояние для чекбокса с политикой 
	const [isPolicyAccepted, setIsPolicyAccepted] = useState(false)

	//  Состояние для модального окна 
	const [isModalOpen, setIsModalOpen] = useState(false)

	// Обработчик изменения полей формы 

	const handleInputChange = (event) => {
		const { name, value } = event.target
		setFormData({
			...formData, // Копируем предыдущие данные
			[name]: value, // Обновляем конкретное поле
		})
	}

	// Обработчик клика по ссылке "Политика компании" 
	
	const handleOpenPolicy = (event) => {
		event.preventDefault() // Отменяем переход по ссылке
		setIsModalOpen(true)//меняем переменную на true
	}

	// Обработчик кнопки "Принять" в модальном окне 

	const handleAcceptPolicy = () => {
		setIsPolicyAccepted(true) // Автоматически ставим галочку
		setIsModalOpen(false) // Закрываем модальное окно
	}

	// Обработчик отправки формы 
	
	const handleSubmit = (event) => {
		event.preventDefault() // Отменяем стандартную отправку формы

		// Проверяем, что все поля заполнены
		if (!formData.name || !formData.email || !formData.password) {
			alert('Пожалуйста, заполните все поля!')
			return
		}

		// Проверяем, что пользователь согласился с политикой
		if (!isPolicyAccepted) {
			alert('Необходимо согласиться с политикой компании!')
			return
		}

		// Если всё в порядке — выводим уведомление об успехе
		alert(`Успешно зарегистрированы!\nДобро пожаловать, ${formData.name}!`)

		// Очищаем форму (опционально)
		setFormData({ name: '', email: '', password: '' })
		setIsPolicyAccepted(false)
	}

	return (
		<main className='main'>
			<div className='main-form-container'>
				{/*  Блок с описанием, для кого создан сайт  */}
				<p className='main-title'>
					<b>Friends</b> создан для смелых путешественников, которые не
					боятся открывать новые места и находить себя. Присоединяйтесь к
					сообществу свободных людей!
				</p>

				<h2 className='main-title-reg'>Регистрация</h2>

				{/* === Форма регистрации === */}
				<form onSubmit={handleSubmit}>
					{/* Поле "Имя" */}
					<div className='main-form-group'>
						<label className='main-label' htmlFor='name'>
							Имя
						</label>
						<input
							id='name'
							type='text'
							name='name'
							className='main-input'
							placeholder='Введите ваше имя'
							value={formData.name}
							onChange={handleInputChange}
						/>
					</div>

					{/* Поле "Email" */}
					<div className='main-form-group'>
						<label className='main-label' htmlFor='email'>
							Email
						</label>
						<input
							id='email'
							type='email'
							name='email'
							className='main-input'
							placeholder='example@mail.com'
							value={formData.email}
							onChange={handleInputChange}
						/>
					</div>

					{/* Поле "Пароль" */}
					<div className='main-form-group'>
						<label className='main-label' htmlFor='password'>
							Пароль
						</label>
						<input
							id='password'
							type='password'
							name='password'
							className='main-input'
							placeholder='Придумайте пароль'
							value={formData.password}
							onChange={handleInputChange}
						/>
					</div>

					{/* Чекбокс с политикой */}
					<div className='main-checkbox-group'>
						<input
							type='checkbox'
							id='policy'
							className='main-checkbox'
							checked={isPolicyAccepted}
							onChange={(e) => setIsPolicyAccepted(e.target.checked)}
						/>
						<label htmlFor='policy'>
							Я согласен с{' '}
							<span className='main-link' onClick={handleOpenPolicy}>
								политикой компании
							</span>
						</label>
					</div>

					{/* Кнопка "Зарегистрироваться" */}
					<button type='submit' className='main-submit-btn'>
						Зарегистрироваться
					</button>
				</form>
			</div>

			{/* === Модальное окно с политикой === */}
			{isModalOpen && (
				<div className='modal-overlay' onClick={() => setIsModalOpen(false)}>
					<div className='modal-content' onClick={(e) => e.stopPropagation()}>
						<h2>Политика компании</h2>
						<p>
							Настоящая Политика конфиденциальности описывает, как
							<b> Friends </b> собирает, использует и защищает вашу личную
							информацию.
						</p>
						<p>
							1. <b>Сбор данных.</b> Мы собираем ваше имя, email и другие
							данные, которые вы предоставляете при регистрации, для улучшения
							качества сервиса.
						</p>
						<p>
							2. <b>Использование данных.</b> Ваши данные используются
							исключительно для предоставления услуг, отправки уведомлений и
							персонализации контента.
						</p>
						<p>
							3. <b>Защита данных.</b> Мы применяем современные методы
							шифрования и защиты информации для предотвращения
							несанкционированного доступа.
						</p>
						<p>
							4. <b>Передача третьим лицам.</b> Мы не передаем ваши данные
							третьим лицам без вашего согласия, за исключением случаев,
							предусмотренных законом.
						</p>
						<p>
							5. <b>Ваши права.</b> Вы можете в любой момент запросить удаление
							своих данных, отправив запрос в службу поддержки.
						</p>
						<p>
							Используя наш сайт, вы подтверждаете, что ознакомились с данной
							политикой и согласны с её условиями.
						</p>

						{/* Кнопка "Принять" внизу модального окна */}
						<button className='modal-content-btn' onClick={handleAcceptPolicy}>
							Принять
						</button>
					</div>
				</div>
			)}
		</main>
	)
}

export default Main
