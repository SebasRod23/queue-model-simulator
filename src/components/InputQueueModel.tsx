/** @jsxImportSource @emotion/react */
import React from 'react';
import { TextField } from '@mui/material';

import { InputValues, ObjectWithKeyStr } from '../interfaces/types';
import { divStyleColumns } from '../styles/styles';

interface InputQueueModelProps {
  inputValues: InputValues;
  setInputValues: React.Dispatch<React.SetStateAction<InputValues>>;
  requiredByOption: string[];
  validateCompleteInput: (
    inputVals: InputValues,
    numOfRan?: string | undefined,
  ) => void;
  lockInput: boolean;
}

const InputQueueModel = (props: InputQueueModelProps) => {
  const labels: ObjectWithKeyStr = {
    lambda: 'λ',
    mi: 'μ',
    s: 's',
    k: 'k',
    mean: 'Mean',
    sd: 'σ',
  };

  const handleInputChange = (name: string, strNumber: string) => {
    strNumber = strNumber.replace(/[ -]/g, '');
    const number = Number(strNumber);
    if (isNaN(number) && strNumber !== '') return;

    const updatedInputValues = { ...props.inputValues, [name]: strNumber };

    props.setInputValues(updatedInputValues);
    props.validateCompleteInput(updatedInputValues);
  };

  return (
    <div css={divStyleColumns}>
      {props.requiredByOption.map((inputStr, index) => (
        <TextField
          key={`input-${index}-${inputStr}`}
          label={labels[inputStr]}
          variant='outlined'
          required
          InputProps={{
            readOnly: props.lockInput,
          }}
          focused={props.lockInput ? false : undefined}
          onChange={(event) => handleInputChange(inputStr, event.target.value)}
          value={props.inputValues[inputStr]}
        />
      ))}
    </div>
  );
};

export default InputQueueModel;
