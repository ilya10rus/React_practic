import { useEffect, useLayoutEffect } from 'react';
import { useMatch, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Commments, PostContent, PostForm } from './components';
import styled from 'styled-components';
import { useServerRequest } from '../../hooks';
import { RESET_POST_DATA, loadPostAsync } from '../../actions';
import { selectPost } from '../../selectors';

const PostContainer = ({ className }) => {
	const dispatch = useDispatch();
	const isCreating = useMatch('/post');
	const isEditing = useMatch('post/:id/edit');
	const params = useParams();
	const requestServer = useServerRequest();
	const post = useSelector(selectPost);

	useLayoutEffect(() => {
		dispatch(RESET_POST_DATA);
	}, [dispatch, isCreating]);

	useEffect(() => {
		if (isCreating) {
			return;
		}

		dispatch(loadPostAsync(requestServer, params.id));
	}, [requestServer, dispatch, params.id, isCreating]);

	return (
		<div className={className}>
			{isCreating || isEditing ? (
				<PostForm post={post} />
			) : (
				<>
					<PostContent post={post} />
					<Commments comments={post.comments} postId={post.id} />
				</>
			)}
		</div>
	);
};

export const Post = styled(PostContainer)`
	margn: 40px 0;
	padding: 0 80px;
	& img {
		width: 280px;
		height: 150px;
	}
`;
