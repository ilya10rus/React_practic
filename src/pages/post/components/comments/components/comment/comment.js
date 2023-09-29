import styled from 'styled-components';
import { Icon } from '../../../../../../components';
import { useDispatch } from 'react-redux';
import { useServerRequest } from '../../../../../../hooks';
import { openModal, CLOSE_MODAL, removeCommentAsync } from '../../../../../../actions';

const CommnetContainer = ({ className, postId, id, author, content, publishedAt }) => {
	const requestServer = useServerRequest();
	const dispatch = useDispatch();

	const onCommentRemove = (commentId) => {
		dispatch(
			openModal({
				text: 'Удалить комментарий?',
				onConfirm: () => {
					dispatch(removeCommentAsync(requestServer, postId, commentId));
					dispatch(CLOSE_MODAL);
				},

				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	return (
		<div className={className}>
			<div className="comment">
				<div className="information-panel">
					<div className="author">
						<Icon
							id="fa-user-circle-o"
							margin="0 10px 0 0"
							size={'18px'}
							inactive={true}
						/>
						{author}
					</div>
					<div className="published-at">
						<Icon
							id="fa-calendar-o"
							margin="0 10px 0 10px"
							size={'18px'}
							inactive={true}
						/>
						{publishedAt}
					</div>
				</div>
				<div className="comment-text">{content}</div>
			</div>
			<Icon
				id="fa-trash-o"
				margin="0 0 0 10px"
				size={'21px'}
				onClick={() => onCommentRemove(id)}
			/>
		</div>
	);
};

export const Comment = styled(CommnetContainer)`
	display: flex;
	margin-top: 10px;

	& .comment {
		width: 550px;
		padding: 5px 10px;
		border: 1px solid #000;
	}

	& .information-panel {
		display: flex;
		justify-content: space-between;
	}

	& .author {
		display: flex;
	}

	& .published-at {
		display: flex;
	}
`;
