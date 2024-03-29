import { addComment, getPost } from '../api';
import { ROLE_ID } from '../constans';
import { sessions } from '../sessions';
import { getPostCommentsWithAuthor } from '../utils';

export const addPostComment = async (hash, postId, userId, content) => {
	const accessRoles = [ROLE_ID.MODERATOR, ROLE_ID.ADMIN, ROLE_ID.READER];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещён',
			res: null,
		};
	}
	await addComment(postId, userId, content);

	const commentWithAuthor = await getPostCommentsWithAuthor(postId);

	const post = await getPost(postId);

	return {
		error: null,
		res: {
			...post,
			comments: commentWithAuthor,
		},
	};
};
