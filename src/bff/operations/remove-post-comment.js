import { deleteComment, getComments, getPost } from '../api';
import { ROLE_ID } from '../constans';
import { sessions } from '../sessions';

export const removePostComment = async (hash, postId, id) => {
	const accessRoles = [ROLE_ID.MODERATOR, ROLE_ID.ADMIN, ROLE_ID.READER];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}

	await deleteComment(id);

	const post = await getPost(postId);

	const comments = await getComments(postId);

	return {
		error: null,
		res: {
			...post,
			comments,
		},
	};
};
