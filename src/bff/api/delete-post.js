export const deletePost = async (id) => {
	fetch(`http://localhost:3004/posts/${id}`, {
		method: 'DELETE',
	});
};
