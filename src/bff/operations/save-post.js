import { updatePost, addPost } from '../api';
import { ROLE_ID } from '../constans';
import { sessions } from '../sessions';

export const savePost = async (hash, newPostData) => {
	const accessRoles = [ROLE_ID.ADMIN];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещён',
			res: null,
		};
	}

	const savedPost =
		newPostData.id === ''
			? await addPost(newPostData)
			: await updatePost(newPostData);

	return {
		error: null,
		res: savedPost,
	};
};
