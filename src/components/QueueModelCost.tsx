/** @jsxImportSource @emotion/react */
import React from 'react';
import { Button, TextField } from '@mui/material';

import { divStyleColumns, divStyleRows } from '../styles/styles';
import { QueueCostParams } from '../interfaces/types';

interface QueueModelCostProps {
  costParams: QueueCostParams;
  setCostParams: React.Dispatch<React.SetStateAction<QueueCostParams>>;
  calculateCost: () => Promise<void>;
  cost: number | undefined;
}

const QueueModelCost = (props: QueueModelCostProps) => {
  const handleInputChange = (name: string, strNumber: string) => {
    strNumber = strNumber.replace(/[ ]/g, '');
    const number = Number(strNumber);
    if (isNaN(number) && strNumber !== '') return;

    const updatedInputValues = { ...props.costParams, [name]: strNumber };

    props.setCostParams(updatedInputValues);
  };

  return (
    <>
      <h1>Queue Model Cost</h1>
      <form css={divStyleRows}>
        <div css={divStyleColumns}>
          <TextField
            label={'Cost of server'}
            variant='outlined'
            required
            onChange={(event) => handleInputChange('Cs', event.target.value)}
            value={props.costParams.Cs}
          />
          <TextField
            label={'Cost of waiting'}
            variant='outlined'
            required
            onChange={(event) => handleInputChange('Cw', event.target.value)}
            value={props.costParams.Cw}
          />
        </div>
        <Button
          variant='contained'
          onClick={props.calculateCost}
          disabled={props.costParams.Cs === '' || props.costParams.Cw === ''}
        >
          Calculate total cost
        </Button>
      </form>

      {props.cost && (
        <>
          <br />
          <br />
          <TextField
            label={'Total Cost'}
            variant='outlined'
            InputProps={{
              readOnly: true,
            }}
            focused={false}
            value={`$${props.cost.toFixed(2)}`}
          />
          <br />
        </>
      )}
    </>
  );
};

export default QueueModelCost;
