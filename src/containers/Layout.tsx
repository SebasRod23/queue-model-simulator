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
import { convertInputToValues } from '../utils/convertInputToValues';
import { MM1 } from '../classes/MM1';
import { MEk1 } from '../classes/MEk1';
import { MG1 } from '../classes/MG1';
import { MMsk } from '../classes/MMsk';
import { MMs } from '../classes/MMs';
import { InputValues, QueueCostParams, QueueData } from '../interfaces/types';
import { divStyleRows } from '../styles/styles';
import QueueModelCost from '../components/QueueModelCost';
import WarningSnackbar from '../components/WarningSnackbar';

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
  const emptyInputValues = {
    lambda: '',
    mi: '',
    s: '',
    k: '',
    mean: '',
    sd: '',
  };

  const emptyCostParams = {
    Cw: '',
    Cs: '',
  };

  let requiredByOption: { [key: string]: string[] } = {
    [QueueModelsOptions.mm1]: ['lambda', 'mi'],
    [QueueModelsOptions.mms]: ['lambda', 'mi', 's'],
    [QueueModelsOptions.mmsk]: ['lambda', 'mi', 's', 'k'],
    [QueueModelsOptions.mg1AndMd1]: ['lambda', 'mean', 'sd'],
    [QueueModelsOptions.mek1]: ['lambda', 'mean', 'k'],
  };

  const [inputNotComplete, setInputNotComplete] = useState(true);

  const [optionQueueModel, setOptionQueueModel] = useState<string>('1');

  const [inputValues, setInputValues] = useState<InputValues>(emptyInputValues);

  const [result, setResult] = useState<undefined | QueueData>();

  const [costParams, setCostParams] =
    useState<QueueCostParams>(emptyCostParams);

  const [cost, setCost] = useState<undefined | number>();

  const [n, setN] = useState<string>('');
  const [pns, setPns] = useState<number[]>([]);

  const [open, setOpen] = useState(false);
  const [warning, setWarning] = useState<string>();

  const getCurrentQueueModel = () => {
    switch (optionQueueModel) {
      case QueueModelsOptions.mm1:
        return MM1;
      case QueueModelsOptions.mms:
        return MMs;
      case QueueModelsOptions.mmsk:
        return MMsk;
      case QueueModelsOptions.mg1AndMd1:
        return MG1;
      default:
        return MEk1;
    }
  };

  const calculateParams = async () => {
    const inputToValues = convertInputToValues(inputValues);
    console.log(inputToValues);
    getCurrentQueueModel()
      .simulate(inputToValues)
      .then(
        (params) => setResult(params),
        (error) => {
          setWarning(error);
          handleClick();
        },
      );
  };

  const calculateCost = async () => {
    const inputToValues = convertInputToValues(costParams);

    getCurrentQueueModel()
      .calculateCost(inputToValues.Cw, inputToValues.Cs)
      .then(
        (newCost) => setCost(newCost),
        (error) => {
          setWarning(error);
          handleClick();
        },
      );
  };

  const calculatePns = async () => {
    getCurrentQueueModel()
      .generateToPn(Number(n))
      .then(
        (newPns) => setPns(newPns),
        (error) => {
          setWarning(error);
          handleClick();
        },
      );
  };

  const validateCompleteInput = (inputVals: InputValues) => {
    let check = true;

    requiredByOption[optionQueueModel].forEach((key) => {
      check = check && (inputVals as InputValues)[key] !== '';
    });

    setInputNotComplete(!check);
  };

  const clean = () => {
    setInputValues(emptyInputValues);
    setResult(undefined);

    setCostParams(emptyCostParams);
    setCost(undefined);

    setN('');
    setPns([]);

    validateCompleteInput(emptyInputValues);
    setWarning('');
  };

  const handleQueueModelChange = (event: SelectChangeEvent) => {
    const option = event.target.value;

    setOptionQueueModel(option);

    clean();
  };

  const handleClick = () => {
    setOpen(true);
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
              <MenuItem value={QueueModelsOptions.mg1AndMd1}>
                M/G/1 And M/D/1
              </MenuItem>
              <MenuItem value={QueueModelsOptions.mek1}>M/Ek/1</MenuItem>
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
              onClick={calculateParams}
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

            <QueueModelCost
              costParams={costParams}
              setCostParams={setCostParams}
              calculateCost={calculateCost}
              cost={cost}
            />

            <br />

            <PnCalculator
              n={n}
              setN={setN}
              pns={pns}
              calculatePns={calculatePns}
            />
          </>
        )}

        <WarningSnackbar warning={warning} setOpen={setOpen} open={open} />
      </div>
    </>
  );
};

export default Layout;
