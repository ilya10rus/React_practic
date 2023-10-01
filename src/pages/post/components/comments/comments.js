import { useState } from 'react';
import styled from 'styled-components';
import { Icon } from '../../../../components';
import { Comment } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserId, selectUserRole } from '../../../../selectors';
import { useServerRequest } from '../../../../hooks';
import { addCommentAsync } from '../../../../actions';
import { ROLE_ID } from '../../../../constans';

const CommentsContainer = ({ className, comments, postId }) => {
	const dispatch = useDispatch();
	const userId = useSelector(selectUserId);
	const [newComemnt, setNewComment] = useState('');
	const requestServer = useServerRequest();
	const userRole = useSelector(selectUserRole);

	const onNewCommentAdd = (postId, userId, content) => {
		dispatch(addCommentAsync(requestServer, postId, userId, content));
		setNewComment('');
	};
	const isGuest = ROLE_ID.GUEST === userRole;
	return (
		<div className={className}>
			{!isGuest && (
				<div className="new-comment">
					<textarea
						name="comment"
						value={newComemnt}
						placeholder="Комментарий...."
						onChange={({ target }) => setNewComment(target.value)}
					></textarea>
					<Icon
						id="fa-paper-plane-o"
						margin="0 0 0 10px"
						size={'21px'}
						onClick={() => onNewCommentAdd(postId, userId, newComemnt)}
					/>
				</div>
			)}
			<div className="comments-post">
				{comments.map(({ id, author, content, publishedAt }) => (
					<Comment
						key={id}
						postId={postId}
						id={id}
						author={author}
						content={content}
						publishedAt={publishedAt}
					/>
				))}
			</div>
		</div>
	);
};

export const Commments = styled(CommentsContainer)`
	margin: 20px auto;
	width: 580px;

	& .new-comment {
		display: flex;
		width: 100%;
		margin: 20px 0 0;
	}

	& .new-comment textarea {
		width: 550px;
		resize: none;
		height: 120px;
		font-size: 18px;
	}
`;
