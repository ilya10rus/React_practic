import { deleteComment, getPost } from '../api';
import { ROLE_ID } from '../constans';
import { sessions } from '../sessions';
import { getPostCommentsWithAuthor } from '../utils';

export const removePostComment = async (hash, postId, id) => {
	const accessRoles = [ROLE_ID.MODERATOR, ROLE_ID.ADMIN, ROLE_ID.READER];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещён',
			res: null,
		};
	}

	await deleteComment(id);

	const post = await getPost(postId);

	const commentWithAuthor = await getPostCommentsWithAuthor(postId);

	return {
		error: null,
		res: {
			...post,
			comments: commentWithAuthor,
		},
	};
};
