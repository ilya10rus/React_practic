import styled from 'styled-components';

import { Icon, Input } from '../../../../components';
import { SpecialPanel } from '../special-panel/special-panel';
import { useRef } from 'react';
import { sanitizeContent } from './utils';
import { useDispatch } from 'react-redux';
import { useServerRequest } from '../../../../hooks/use-user-server';
import { savePostAsync } from '../../../../actions';
import { useNavigate } from 'react-router-dom';

const PostFormContainer = ({
	className,
	post: { id, title, imageUrl, content, publishedAt },
}) => {
	const imageRef = useRef(null);
	const titleRef = useRef(null);
	const contentRef = useRef(null);
	const dispatch = useDispatch();
	const requestServer = useServerRequest();
	const navigate = useNavigate();

	const onSave = () => {
		const newImageUrl = imageRef.current.value;
		const newTitle = titleRef.current.value;
		const newContent = sanitizeContent(contentRef.current.innerHTML);

		dispatch(
			savePostAsync(requestServer, {
				id,
				imageUrl: newImageUrl,
				title: newTitle,
				content: newContent,
			}),
		).then(() => navigate(`/post/${id}`));
	};
	return (
		<div className={className}>
			<Input ref={imageRef} defaultValue={imageUrl} placeholder="Изображение..." />
			<Input
				ref={titleRef}
				className="last-input"
				defaultValue={title}
				placeholder="Заголовок..."
			/>

			<SpecialPanel
				publishedAt={publishedAt}
				margin={'-20px 0 20px'}
				editButton={
					<Icon
						id="fa-floppy-o"
						margin="1px 10px 0 0"
						size={'21px'}
						onClick={onSave}
					/>
				}
			/>

			<div
				ref={contentRef}
				contentEditable={true}
				suppressContentEditableWarning={true}
				className="post-text"
			>
				{content}
			</div>
		</div>
	);
};

export const PostForm = styled(PostFormContainer)`
	& > Input:first-child {
		margin: 40px 0 5px 0;
	}

	& .last-input {
		margin: 0 0 50px 0;
	}

	& .post-text {
		font-size: 18px;
		white-space: pre-line;
	}
`;