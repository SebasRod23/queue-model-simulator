/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import {
  AppBar,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Toolbar,
  Typography,
} from '@mui/material';

import { QueueModelsOptions } from '../enums/QueueModelsOptions';
import { divStyleRows } from '../styles/styles';
import InputQueueModel from '../components/InputQueueModel';
import { InputValues } from '../interfaces/types';

const rootDivStyle = css({
  margin: '32px 24px',
  '@media (max-width: 600px)': {
    margin: '24px 16px',
  },
  '& > *': {
    width: '100%',
  },
});

const Layout = () => {
  const emptyInputValues = { lambda: '', mi: '', s: '', k: '', n: '' };

  let requiredByOption: { [key: string]: string[] } = {
    [QueueModelsOptions.mm1]: ['lambda', 'mi', 'n'],
    [QueueModelsOptions.mms]: ['lambda', 'mi', 's', 'n'],
    [QueueModelsOptions.mmsk]: ['lambda', 'mi', 's', 'k', 'n'],
    [QueueModelsOptions.mg1]: ['lambda', 'mi', 'n'],
  };

  const [optionQueueModel, setOptionQueueModel] = useState<string>('1');
  const [inputValues, setInputValues] = useState<InputValues>(emptyInputValues);

  const [inputNotComplete, setInputNotComplete] = useState(true);

  const handleQueueModelChange = (event: SelectChangeEvent) => {
    const option = event.target.value;

    setOptionQueueModel(option);

    setInputValues(emptyInputValues);
    validateCompleteInput(emptyInputValues);
  };

  const validateCompleteInput = (inputVals: InputValues) => {
    let check = true;

    requiredByOption[optionQueueModel].forEach((key) => {
      check = check && (inputVals as InputValues)[key] !== '';
    });

    setInputNotComplete(!check);
  };

  return (
    <>
      <header>
        <AppBar position='static'>
          <Toolbar variant='dense'>
            <Typography variant='h6' color='inherit' component='div'>
              Queue Model Simulator
            </Typography>
          </Toolbar>
        </AppBar>
      </header>
      <div css={rootDivStyle}>
        <form css={divStyleRows}>
          <FormControl fullWidth>
            <InputLabel>Queue Model</InputLabel>
            <Select
              value={optionQueueModel}
              label='Queue Model'
              onChange={handleQueueModelChange}
            >
              <MenuItem value={QueueModelsOptions.mm1}>M/M/1</MenuItem>
              <MenuItem value={QueueModelsOptions.mms}>M/M/s</MenuItem>
              <MenuItem value={QueueModelsOptions.mmsk}>M/M/s/K</MenuItem>
              <MenuItem value={QueueModelsOptions.mg1}>M/G/1</MenuItem>
            </Select>
          </FormControl>

          <br />

          <InputQueueModel
            inputValues={inputValues}
            setInputValues={
              setInputValues as React.Dispatch<
                React.SetStateAction<InputValues>
              >
            }
            validateCompleteInput={validateCompleteInput}
            requiredByOption={requiredByOption[optionQueueModel]}
          />

          <Button variant='contained' disabled={inputNotComplete}>
            Calculate
          </Button>
        </form>
      </div>
    </>
  );
};

export default Layout;
