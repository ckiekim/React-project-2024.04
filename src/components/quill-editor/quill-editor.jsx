import { useEffect, useState, useRef, useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './quill-editor.css';

export default function MyEditor({ initialContent, onContentChange, mode }) {
  const [value, setValue] = useState(initialContent);
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
      const file = input.files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET); 
      formData.append('api_key', process.env.REACT_APP_CLOUDINARY_API_KEY);

      try {
        const response = await fetch(
          process.env.REACT_APP_CLOUDINARY_URL,
          {
            method: 'POST',
            body: formData,
          }
        );
        const data = await response.json();
        const imageUrl = data.secure_url;

        const quill = editorRef.current.getEditor();
        const range = quill.getSelection(true);
        quill.insertEmbed(range.index, 'image', imageUrl);
        quill.setSelection(range.index + 1);
      } catch (error) {
        console.error('Error uploading image: ', error);
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
  }, []); 

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ];

  return (
    <>
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
