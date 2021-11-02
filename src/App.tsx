/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { AppBar, Toolbar, Typography } from '@mui/material';

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
    <div>
      <header>
        <AppBar position='static'>
          <Toolbar variant='dense'>
            <Typography variant='h6' color='inherit' component='div'>
              Queue Model Simulator
            </Typography>
          </Toolbar>
        </AppBar>
      </header>
      <div css={rootDivStyle}></div>
    </div>
  );
}

export default App;
