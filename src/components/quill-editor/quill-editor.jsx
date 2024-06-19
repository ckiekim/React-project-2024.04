import { useEffect, useState, useRef, useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { uploadImage } from '../../api/cloudinary';
import LoadingProgress from '../loading-progress';
import './quill-editor.css';

export default function MyEditor({ initialContent, onContentChange, mode }) {
  const [value, setValue] = useState(initialContent);
  const [isLoading, setIsLoading] = useState(false);
  const editorRef = useRef(null);

  const handleChange = (newText) => {
    // log(newText, value);
    setValue(newText);
    if (onContentChange)
      onContentChange(newText);
  };

  useEffect(() => {
    if (editorRef.current) {
      const quill = editorRef.current.getEditor();
      quill.on('text-change', () => {
        setValue(quill.root.innerHTML);
      });
    }
  }, []);

  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      try {
        setIsLoading(true);
        const file = input.files[0];
        const imageUrl = await uploadImage(file);

        const quill = editorRef.current.getEditor();
        const range = quill.getSelection(true);
        quill.insertEmbed(range.index, 'image', imageUrl);
        quill.setSelection(range.index + 1);
      } catch (error) {
        console.error('Error uploading image: ', error);
      } finally {
        setIsLoading(false);
      }
    };
  };

  const modules = useMemo(() => {
    if (mode === 'read')
      return { toolbar: [] };
    else
      return {
        toolbar: {
          container: [
            [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
            [{ 'size': [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image', 'video'],
            ['clean']
          ],
          handlers: {
            image: imageHandler,
          },
        }
      }
  });   // React Hook useMemo has a missing dependency: 'mode'. Either include it or remove the dependency array

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ];

  return (
    <>
      {isLoading && <LoadingProgress />}
      <ReactQuill
        value={value}
        onChange={handleChange}
        theme="snow"
        modules={modules}
        formats={formats}
        ref={editorRef}
        className="editor-container"
        readOnly={mode === 'read'}
      />
    </>
  );
};
