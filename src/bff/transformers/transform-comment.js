export const transformComment = (dbComment) => ({
	postId: dbComment.post_id,
	authorId: dbComment.author_id,
	publishedAt: dbComment.published_at,
	content: dbComment.content,
	id: dbComment.id,
});
