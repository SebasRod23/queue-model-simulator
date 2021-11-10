/** @jsxImportSource @emotion/react */
import React from 'react';
import { TextField } from '@mui/material';

import { divStyleColumns } from '../styles/styles';
import { QueueData } from '../interfaces/types';

interface QueueModelCharacteristicsProps {
  characteristicsData: QueueData;
}

const QueueModelCharacteristics = (props: QueueModelCharacteristicsProps) => {
  const labels: { [key: string]: string } = {
    rho: 'ρ',
    l: 'L',
    lq: 'Lq',
    w: 'W',
    wq: 'Wq',
    lambdaE: 'λe',
    p0: 'P0',
    pk: 'Pk',
  };

  return (
    <>
      <h1>Queue Model Parameters</h1>
      <div css={divStyleColumns}>
        {Object.keys(props.characteristicsData).map(
          (characteristicKey, index) => (
            <TextField
              key={`input-${index}-${characteristicKey}`}
              label={labels[characteristicKey]}
              variant='outlined'
              InputProps={{
                readOnly: true,
              }}
              focused={false}
              value={Number(
                props.characteristicsData[characteristicKey],
              ).toFixed(5)}
            />
          ),
        )}
      </div>
    </>
  );
};

export default QueueModelCharacteristics;
