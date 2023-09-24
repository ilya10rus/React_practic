import { setUserRole } from '../api';
import { ROLE_ID } from '../constans';
import { sessions } from '../sessions';

export const updateUserRole = async (userSession, userId, roleId) => {
	const accessRoles = [ROLE_ID.ADMIN];

	if (!sessions.access(userSession, accessRoles)) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}

	await setUserRole(userId, roleId);

	return {
		error: null,
		res: true,
	};
};
