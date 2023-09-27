import { generateDate } from '../utils';

export const addComment = (postId, userId, content) =>
	fetch('http://localhost:3004/comments', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			post_id: postId,
			author_id: userId,
			published_at: generateDate(),
			content,
		}),
	});
