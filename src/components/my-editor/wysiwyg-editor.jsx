import { useState, useEffect } from 'react';
import { uploadImage } from '../../api/cloudinary';
import { Editor as WysiwygEditor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { ContentState, convertToRaw, EditorState, AtomicBlockUtils } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

export default function Editor({ htmlStr, setHtmlStr }) {
	const [editorState, setEditorState] = useState(EditorState.createEmpty());

	useEffect(() => {
		const blocksFromHtml = htmlToDraft(htmlStr);
		if (blocksFromHtml) {
			const { contentBlocks, entityMap } = blocksFromHtml;
			const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
			const editorState = EditorState.createWithContent(contentState);
			setEditorState(editorState);
		}
	}, [htmlStr]);

	// editor 수정 이벤트
	const onEditorStateChange = (editorState) => {
		setEditorState(editorState);
		setHtmlStr(draftToHtml(convertToRaw(editorState.getCurrentContent())));
	};

	const uploadCallback = (file) => {
		return new Promise(async (resolve, reject) => {
			try {
					const url = await uploadImage(file);
					// const contentState = editorState.getCurrentContent();
					// const contentStateWithEntity = contentState.createEntity('IMAGE', 'IMMUTABLE', { src: url });
					// const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
					// const newEditorState = AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');
					// setEditorState(EditorState.forceSelection(newEditorState, newEditorState.getCurrentContent().getSelectionAfter()));
					resolve({ data: { link: url } });
			} catch (error) {
					reject(error);
			}
	});
	};

	// toolbar 설정
	const toolbar = {
		list: { inDropdown: true }, // list 드롭다운
		textAlign: { inDropdown: true }, // align 드롭다운
		link: { inDropdown: true }, // link 드롭다운
		history: { inDropdown: false }, // history 드롭다운
		image: { uploadCallback: uploadCallback }, // 이미지 커스텀 업로드
	}

	// 언어 설정
	const localization = {
		locale: 'ko',
	}

	return (
		<WysiwygEditor
			editorClassName="editor" // Editor 적용 클래스
			toolbarClassName="toolbar" // Toolbar 적용 클래스
			toolbar={toolbar} 
			placeholder="내용을 입력하세요."
			localization={localization}
			editorState={editorState}
			onEditorStateChange={onEditorStateChange}
		/>
	)
}
