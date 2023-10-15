import { request } from '../utils/request';

export const removePostAsync = (postId) => () => request(`/posts/${postId}`, 'DELETE');
