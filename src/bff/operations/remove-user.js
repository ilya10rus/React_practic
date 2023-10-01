import { deleteUser } from '../api';
import { sessions } from '../sessions';
import { ROLE_ID } from '../constans';

export const removeUser = async (hash, userId) => {
	const accessRoles = [ROLE_ID.ADMIN];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещён',
			res: null,
		};
	}

	await deleteUser(userId);

	return {
		error: null,
		res: true,
	};
};
