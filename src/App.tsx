/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';

const rootDivStyle = css({
  margin: '32px 24px',
  '@media (max-width: 600px)': {
    margin: '24px 16px',
  },
  '& > *': {
    width: '100%',
  },
});

function App() {
  return (
    <div css={rootDivStyle}>
      <h1>Queue Model Simulator</h1>
    </div>
  );
}

export default App;
