export const transformUser = (dbUser) => ({
	id: dbUser.id,
	login: dbUser.login,
	registeredAt: dbUser.register_at,
	password: dbUser.password,
	roleId: dbUser.role_id,
});
