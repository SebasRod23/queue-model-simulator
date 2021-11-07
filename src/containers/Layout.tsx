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

import InputQueueModel from '../components/InputQueueModel';
import PnCalculator from '../components/PnCalculator';
import QueueModelCharacteristics from '../components/QueueModelCharacteristics';
import { QueueModelsOptions } from '../enums/QueueModelsOptions';
import { InputValues, QueueData } from '../interfaces/types';
import { divStyleRows } from '../styles/styles';

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

  const [result, setResult] = useState<undefined | QueueData>();

  const handleQueueModelChange = (event: SelectChangeEvent) => {
    const option = event.target.value;

    setOptionQueueModel(option);

    clean();
  };

  const validateCompleteInput = (inputVals: InputValues) => {
    let check = true;

    requiredByOption[optionQueueModel].forEach((key) => {
      check = check && (inputVals as InputValues)[key] !== '';
    });

    setInputNotComplete(!check);
  };

  const calculate = () => {
    setResult({
      rho: 5,
      l: 5,
      lq: 5,
      w: 5,
      wq: 5,
      lambdaE: 5,
      pn: '(1/3)n',
    } as QueueData);
  };

  const clean = () => {
    setInputValues(emptyInputValues);
    validateCompleteInput(emptyInputValues);
    setResult(undefined);
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
          <FormControl fullWidth focused={result ? false : undefined}>
            <InputLabel>Queue Model</InputLabel>
            <Select
              value={optionQueueModel}
              label='Queue Model'
              onChange={handleQueueModelChange}
              inputProps={{
                readOnly: result !== undefined,
              }}
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
            lockInput={result !== undefined}
          />

          {!result && (
            <Button
              variant='contained'
              disabled={inputNotComplete}
              onClick={calculate}
            >
              Calculate
            </Button>
          )}

          {result && (
            <Button variant='contained' color='error' onClick={clean}>
              Start again
            </Button>
          )}
        </form>

        <br />

        {result && (
          <>
            <QueueModelCharacteristics characteristicsData={result} />

            <br />

            <PnCalculator />
          </>
        )}
      </div>
    </>
  );
};

export default Layout;
