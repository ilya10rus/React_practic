import { getUsers } from '../api';
import { sessions } from '../sessions';
import { ROLE_ID } from '../constans';

export const fetchUsers = async (hash) => {
	const accessRoles = [ROLE_ID.ADMIN];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}

	const users = await getUsers();

	return {
		error: null,
		res: users,
	};
};
