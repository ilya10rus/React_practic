import { deleteComment, deletePost, getComments } from '../api';
import { ROLE_ID } from '../constans';
import { sessions } from '../sessions';

export const removePost = async (hash, id) => {
	const accessRoles = [ROLE_ID.MODERATOR, ROLE_ID.ADMIN, ROLE_ID.READER];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещён',
			res: null,
		};
	}

	await deletePost(id);

	const comments = await getComments(id);

	await Promise.all(comments.map(({ id: commentId }) => deleteComment(commentId)));

	return {
		error: null,
		res: true,
	};
};
