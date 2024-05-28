import React, { memo, useEffect, useState } from 'react';
import { EditorState, AtomicBlockUtils, convertFromRaw, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './my-editor.css';
import { uploadImage } from '../../api/cloudinary';

export default function MyEditor({ initialContent, onContentChange, mode }) {
  const [editorState, setEditorState] = useState(() => {
    if (initialContent) {
      try {
        const contentState = convertFromRaw(initialContent);
        return EditorState.createWithContent(contentState);
      } catch (error) {
        console.error('Failed to convert initial content:', error);
      }
    }
    return EditorState.createEmpty();
  });

  useEffect(() => {
    if (initialContent) {
      try {
        const contentState = convertFromRaw(initialContent);
        setEditorState(EditorState.createWithContent(contentState));
      } catch (error) {
        console.error('Failed to convert initial content:', error);
      }
    }
  }, [initialContent]);

  useEffect(() => {
    if (onContentChange) {
      const rawContent = convertToRaw(editorState.getCurrentContent());
      onContentChange(rawContent);
    }
  }, [editorState, onContentChange]);

  const uploadImageCallBack = async (file) => {
    try {
      const url = await uploadImage(file);
      const contentState = editorState.getCurrentContent();
      const contentStateWithEntity = contentState.createEntity('image', 'IMMUTABLE', { src: url });
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      
      // Check if entityKey is null
      if (!entityKey) {
        console.error('Entity key is null');
        return;
      }

      // Insert the new atomic block with the image entity
      const newEditorState = AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');
      
      // Force selection to the new state
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
    if (type === 'atomic') {
      return {
        component: Media,
        editable: false,
      };
    }
  };

  const Media = memo((props) => {
    const { block, contentState } = props;
    const entityKey = block.getEntityAt(0);
  
    // Check if entity key exists and get the entity
    const entity = entityKey ? contentState.getEntity(entityKey) : null;
    if (!entity) return null;
  
    const { src } = entity.getData();
    const type = entity.getType();
    console.log(type);
    if (type === 'image') {
      return <img src={src} alt="Uploaded content" />;
    }
  
    return null;
  }, (prevProps, nextProps) => {
    // Custom comparison function to prevent re-renders if contentState and block are the same
    return prevProps.block === nextProps.block && prevProps.contentState === nextProps.contentState;
  });
  

  return (
    <div className="editor-container">
      <Editor
        editorState={editorState}
        onEditorStateChange={(newState) => {
          if (newState instanceof EditorState) {
            setEditorState(newState);
          } else {
            console.error('Invalid EditorState:', newState);
          }
        }}
        blockRendererFn={myBlockRenderer}
        toolbar={{
          image: {
            uploadCallback: uploadImageCallBack,
            alt: { present: true, mandatory: true },
          },
        }}
        editorClassName="editor"
        readOnly={mode === 'read'}
        toolbarHidden={mode === 'read'}
      />
    </div>
  );
}
