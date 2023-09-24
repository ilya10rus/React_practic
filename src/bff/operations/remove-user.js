import { deleteUser } from '../api';
import { sessions } from '../sessions';
import { ROLE_ID } from '../constans';

export const removeUser = async (userSession, userId) => {
	const accessRoles = [ROLE_ID.ADMIN];

	if (!sessions.access(userSession, accessRoles)) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}

	await deleteUser(userId);

	return {
		error: null,
		res: true,
	};
};
