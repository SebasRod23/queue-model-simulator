/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@mui/styled-engine';
import { TextField } from '@mui/material';

import { InputValues } from '../interfaces/types';
import { divStyleColumns } from '../styles/styles';

const queueModelInputsStyle = css({
  ...divStyleColumns,
  '& > *': {
    flexGrow: 1,
  },
});

interface InputQueueModelProps {
  inputValues: InputValues;
  setInputValues: React.Dispatch<React.SetStateAction<InputValues>>;
  requiredByOption: string[];
  validateCompleteInput: (
    inputVals: InputValues,
    numOfRan?: string | undefined,
  ) => void;
}

const InputQueueModel = (props: InputQueueModelProps) => {
  const labels: { [key: string]: string } = {
    lambda: 'λ',
    mi: 'μ',
    s: 's',
    k: 'k',
    n: 'n',
  };

  const handleInputChange = (name: string, strNumber: string) => {
    strNumber = strNumber.replace(/[ ]/g, '');
    const number = Number(strNumber);
    if (isNaN(number) && strNumber !== '') return;

    const updatedInputValues = { ...props.inputValues, [name]: strNumber };

    props.setInputValues(updatedInputValues);
    props.validateCompleteInput(updatedInputValues);
  };

  return (
    <div css={queueModelInputsStyle}>
      {props.requiredByOption.map((inputStr, index) => (
        <TextField
          key={`input-${index}-${inputStr}`}
          label={labels[inputStr]}
          variant='outlined'
          required
          onChange={(event) => handleInputChange(inputStr, event.target.value)}
          value={props.inputValues[inputStr]}
        />
      ))}
    </div>
  );
};

export default InputQueueModel;
