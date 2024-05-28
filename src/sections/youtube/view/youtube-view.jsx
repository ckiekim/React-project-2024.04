import React, { useState, useRef, useEffect } from 'react';

import styled from 'styled-components';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Editor from '../../../components/my-editor/wysiwyg-editor';

export default function YoutubeView() {
  const [htmlStr, setHtmlStr] = useState('');
  const viewContainerRef = useRef(null);

  useEffect(() => {
    if (viewContainerRef.current) {
      viewContainerRef.current.innerHTML = '<h2>html 코드를 이용하여 만들어지는 View입니다.</h2>';
      viewContainerRef.current.innerHTML += htmlStr;
    }
  }, [htmlStr]);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" mb={5}>Youtube</Typography>
      
      <EditorContainer>
        <Editor htmlStr={htmlStr} setHtmlStr={setHtmlStr} />
      </EditorContainer>

      <ContentsContainer>
        <ContentsHtmlContainer>
          <h2>Editor를 통해 만들어진 html 코드입니다.</h2>
          {htmlStr}
        </ContentsHtmlContainer>

        <ContentsViewContainer ref={viewContainerRef} />
      </ContentsContainer>
      
    </Container>
  );
}

// style
const EditorContainer = styled.div`
    width: 800px;
    height: 400px;
    margin: 0 auto;

    // Editor 스타일 설정
    .wrapper { }
    .editor { height: 300px; }
    .toolbar { }
`;

const ContentsContainer = styled.div`
    width: 1200px;
    margin: 0 auto;
    display: flex;
    gap: 40px;

    & > div {
        width: 600px;
        padding: 16px;
        box-sizing: border-box;
        line-break: anywhere;
    }
`;

const ContentsHtmlContainer = styled.div`
    border: 2px solid orange;
`;

const ContentsViewContainer = styled.div`
    border: 2px solid olive;
`;