export const deleteComment = async (id) => {
	fetch(`http://localhost:3004/comments/${id}`, {
		method: 'DELETE',
	});
};
