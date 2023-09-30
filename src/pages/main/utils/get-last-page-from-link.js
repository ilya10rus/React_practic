export const getLastPageFromLink = (links) => {
	const result = links.match(/^.+_page=(\d{1,9})&_limit=\d{1,9}>; rel="last"$/);
	return Number(result[1]);
};
