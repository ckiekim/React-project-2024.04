import React, { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { uploadImage } from '../../api/cloudinary';
import './my-editor.css';
import MyUploadAdapter from './MyUploader';

export default function MyEditor({ initialContent, onContentChange, mode }) {
  const [content, setContent] = useState(initialContent || '');

  useEffect(() => {
    setContent(initialContent || '');
  }, [initialContent]);

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setContent(data);
    if (onContentChange) {
      onContentChange(data);
    }
  };

  const customUploadAdapter = (loader) => {
    return {
      upload: async () => {
        try {
          const url = await uploadImage(loader.file); // 이미지 업로드 함수 호출
          return { default: url }; // CKEditor에 이미지 URL 반환
        } catch (error) {
          throw Error('Image upload failed');
        }
      },
    };
  };
  const uploadPlugin = (editor) => {
    console.log('uploadPlugin()');
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return customUploadAdapter(loader);
      // return new MyUploadAdapter( loader );
    }
  }

  return (
    <CKEditor
      editor={ClassicEditor}
      data={content}
      config={{ 
        extraPlugins: [uploadPlugin], 
        isReadOnly: mode === 'read',
      }}
      onChange={handleEditorChange}
      disabled={mode === 'read'}
    />
  );
};
