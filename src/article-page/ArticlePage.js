import React, { useState } from 'react'
import avatarGuest from "../article-page/аватар3.jpg"
import './ArticlePage.css'

// Передаем статью и функцию возврата назад через пропсы
const ArticlePage = ({ article, onBack }) => {
	// Состояние для новых комментариев
	const [comments, setComments] = useState(article.comments || [])
	const [newComment, setNewComment] = useState('')

	// Функция добавления комментария
	const handleAddComment = (e) => {
		e.preventDefault()
		if (!newComment.trim()) return

		const commentToAdd = {
			id: Date.now(),
			author: {
				name: 'Вы (Гость)',
				avatar: avatarGuest,
			},
			text: newComment,
		}

		setComments([...comments, commentToAdd])
		setNewComment('')
	}

	return (
		<div className='article-page'>
			<button className='article-page__back-btn' onClick={onBack}>
				← Назад к статьям
			</button>

			<h1 className='article-page__title'>{article.title}</h1>

			{/* Картинка статьи */}
			{article.image && (
				<img
					src={article.image}
					alt={article.title}
					className='article-page__image'
				/>
			)}

			{/* Текст статьи */}
			<p className='article-page__content'>{article.fullText}</p>

			{/* Блок с автором (слева внизу) */}
			<div className='article-page__author-block'>
				<img
					src={article.author.avatar}
					alt={article.author.name}
					className='author-avatar'
				/>
				<div>
					<div className='author-name'>{article.author.name}</div>
					<div style={{ fontSize: '12px', color: '#64748b' }}>Автор статьи</div>
				</div>
			</div>

			{/* Секция комментариев */}
			<div className='comments-section'>
				<h3 className='comments-title'>Комментарии ({comments.length})</h3>

				{comments.map((comment) => (
					<div key={comment.id} className='comment'>
						<img
							src={comment.author.avatar}
							alt={comment.author.name}
							className='author-avatar'
						/>
						<div className='comment__body'>
							<span className='comment__author'>{comment.author.name}</span>
							<span className='comment__text'>{comment.text}</span>
						</div>
					</div>
				))}

				{/* Форма добавления комментария */}
				<form
					onSubmit={handleAddComment}
					style={{ marginTop: '20px', display: 'flex', gap: '10px' }}
				>
					<input
						type='text'
						placeholder='Написать комментарий...'
						value={newComment}
						onChange={(e) => setNewComment(e.target.value)}
						style={{
							flex: 1,
							padding: '10px',
							borderRadius: '8px',
							border: '1px solid #ccc',
						}}
					/>
					<button
						type='submit'
						style={{
							padding: '10px 20px',
							borderRadius: '8px',
							background: '#facc15',
							border: 'none',
							fontWeight: 'bold',
							cursor: 'pointer',
						}}
					>
						Отправить
					</button>
				</form>
			</div>
		</div>
	)
}

export default ArticlePage
