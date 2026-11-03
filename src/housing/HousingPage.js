import React from 'react'
import './Housing.css'

const HousingPage = ({ housing, onBack }) => {
	return (
		<div className='housing-details'>
			<button className='housing-details__back' onClick={onBack}>
				← Назад к поиску
			</button>

			<h1 className='housing-details__title'>{housing.title}</h1>
			<div className='housing-details__location'>
				{housing.country}, {housing.city}
			</div>

			{/* Галерея (1 большая + 2 маленькие картинки) */}
			<div className='housing-details__gallery'>
				<img
					src={housing.images[0]}
					alt='Главное фото'
					className='housing-details__img housing-details__img--main'
				/>
				{housing.images[1] && (
					<img
						src={housing.images[1]}
						alt='Фото 2'
						className='housing-details__img'
					/>
				)}
				{housing.images[2] && (
					<img
						src={housing.images[2]}
						alt='Фото 3'
						className='housing-details__img'
					/>
				)}
			</div>

			<div className='housing-details__info'>
				<p className='housing-details__description'>{housing.description}</p>

				<div className='housing-details__footer'>
					<div className='housing-details__author'>
						<img
							src={housing.author.avatar}
							alt={housing.author.name}
							className='avatar-large'
						/>
						<div>
							<div style={{ fontWeight: 'bold', fontSize: '18px' }}>
								{housing.author.name}
							</div>
							<div style={{ fontSize: '14px', color: '#64748b' }}>
								Хозяин жилья
							</div>
						</div>
					</div>
					<div
						className={`housing-details__price ${housing.price === 'FREE' ? 'housing-card__price--free' : ''}`}
					>
						{housing.price}
					</div>
				</div>
			</div>
		</div>
	)
}

export default HousingPage
