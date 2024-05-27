import { useState } from 'react';
import { EditorState, AtomicBlockUtils } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './my-editor.css';
import { uploadImage } from '../../api/cloudinary';

export default function MyEditor() {
	const [editorState, setEditorState] = useState(EditorState.createEmpty());
  
  const uploadImageCallBack = async (file) => {
    try {
      const url = await uploadImage(file);
      const contentState = editorState.getCurrentContent();
      const contentStateWithEntity = contentState.createEntity(
        'image', 'IMMUTABLE', { src: url }
      );
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      const newEditorState = AtomicBlockUtils.insertAtomicBlock(
        editorState, entityKey, ' '
      );
      const forcedEditorState = EditorState.forceSelection(
        newEditorState,
        newEditorState.getCurrentContent().getSelectionAfter()
      );
      setEditorState(forcedEditorState);
      return { data: { link: url } };
    } catch (error) {
      console.error('Image upload failed:', error);
      return { error: 'Image upload failed' };
    }
  };

  const myBlockRenderer = (contentBlock) => {
    const type = contentBlock.getType();
    console.log(type);
    if (type === 'atomic') {
      return {
        component: Media,
        editable: false,
      };
    }
  };

  const Media = (props) => {
    const entity = props.contentState.getEntity(props.block.getEntityAt(0));
    const { src } = entity.getData();
    const type = entity.getType();

    let media;
    if (type === 'image') {
      console.log(type);
      media = <img src={src} alt="Uploaded content" />;
    }

    return media;
  };
	
	return (
    <div className="editor-container">
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        blockRendererFn={myBlockRenderer}
        toolbar={{
          image: {
            uploadCallback: uploadImageCallBack,
            alt: { present: true, mandatory: true },
          },
        }}
        editorClassName='editor'
      />
    </div>
  );
}
