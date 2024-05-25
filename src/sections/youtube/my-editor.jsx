import { useState } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default function MyEditor() {
	const [editorState, setEditorState] = useState(EditorState.createEmpty());
	
	return (
    <Editor
      editorState={editorState}
      onEditorStateChange={setEditorState}
      toolbar={{
        image: {
          uploadCallback: uploadImageCallBack,
          alt: { present: true, mandatory: true },
        },
      }}
    />
  );
}

const uploadImageCallBack = (file) => {
  return new Promise(
    (resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => resolve({ data: { link: e.target.result } });
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    }
  );
};
