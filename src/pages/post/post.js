import { useEffect, useLayoutEffect, useState } from 'react';
import { useMatch, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Commments, PostContent, PostForm } from './components';
import styled from 'styled-components';
import { useServerRequest } from '../../hooks';
import { RESET_POST_DATA, loadPostAsync } from '../../actions';
import { selectPost } from '../../selectors';
import { Error, PrivatContent } from '../../components';
import { ROLE_ID } from '../../constans';

const PostContainer = ({ className }) => {
	const dispatch = useDispatch();
	const isCreating = useMatch('/post');
	const isEditing = useMatch('post/:id/edit');
	const params = useParams();
	const requestServer = useServerRequest();
	const post = useSelector(selectPost);

	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useLayoutEffect(() => {
		dispatch(RESET_POST_DATA);
	}, [dispatch, isCreating]);

	useEffect(() => {
		if (isCreating) {
			setIsLoading(false);
			return;
		}

		dispatch(loadPostAsync(requestServer, params.id)).then((postData) => {
			setError(postData.error);
			setIsLoading(false);
		});
	}, [requestServer, dispatch, params.id, isCreating]);

	if (isLoading) {
		return null;
	}

	const SpecificPostPage =
		isCreating || isEditing ? (
			<PrivatContent access={[ROLE_ID.ADMIN]}>
				<div className={className}>
					<PostForm post={post} />
				</div>
			</PrivatContent>
		) : (
			<div className={className}>
				<PostContent post={post} />
				<Commments comments={post.comments} postId={post.id} />
			</div>
		);

	return error ? <Error error={error} /> : SpecificPostPage;
};

export const Post = styled(PostContainer)`
	margn: 40px 0;
	padding: 0 80px;
	& img {
		width: 280px;
		height: 150px;
	}
`;
