import { setUserRole } from '../api';
import { ROLE_ID } from '../constans';
import { sessions } from '../sessions';

export const updateUserRole = async (hash, userId, roleId) => {
	const accessRoles = [ROLE_ID.ADMIN];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещён',
			res: null,
		};
	}

	await setUserRole(userId, roleId);

	return {
		error: null,
		res: true,
	};
};
