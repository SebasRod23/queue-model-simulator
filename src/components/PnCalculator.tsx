/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import {
  TextField,
  Button,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { Box } from '@mui/system';
import { CSVLink } from 'react-csv';

import { divStyleRows } from '../styles/styles';

const RandomsListDiv = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

const RandomsListBox = css({
  border: '1px solid #ccc',
  borderRadius: '4px',
  '&:hover': {
    border: '1px solid black',
  },
});

interface PnCalculatorProps {
  n: string;
  setN: React.Dispatch<React.SetStateAction<string>>;
  pns: number[];
  calculatePns: () => Promise<void>;
}

const PnCalculator = (props: PnCalculatorProps) => {
  const rowHeight = 30;

  const renderRow = (rowProps: ListChildComponentProps) => {
    const { index, style } = rowProps;

    return (
      <ListItem style={style} key={index} component='div' disablePadding>
        <ListItemButton
          style={{ height: `${rowHeight}px` }}
          onClick={() => {
            navigator.clipboard.writeText(String(props.pns[index]));
          }}
        >
          <ListItemText primary={`P${index}`} style={{ maxWidth: '50px' }} />
          <ListItemText primary={`${props.pns[index]}`} />
        </ListItemButton>
      </ListItem>
    );
  };

  const handleInputChange = (strNumber: string) => {
    strNumber = strNumber.replace(/[ .]/g, '');
    const number = Number(strNumber);
    if (isNaN(number) && strNumber !== '') return;

    props.setN(strNumber);
  };

  return (
    <>
      <h1>Pn Calculator</h1>
      <form css={divStyleRows}>
        <TextField
          label={'Calculate up to n'}
          variant='outlined'
          required
          value={props.n}
          onChange={(event) => handleInputChange(event.target.value)}
        />
        <Button
          variant='contained'
          onClick={props.calculatePns}
          disabled={props.n === ''}
        >
          Calculate up to n
        </Button>
      </form>

      <br />
      <br />

      {props.pns.length > 0 && (
        <div css={RandomsListDiv}>
          <Box css={RandomsListBox}>
            <FixedSizeList
              height={Math.min(300, props.pns.length * 30)}
              width='100%'
              itemSize={rowHeight}
              itemCount={props.pns.length}
              overscanCount={10}
            >
              {renderRow}
            </FixedSizeList>
          </Box>

          <CSVLink
            data={[
              ['Pn', 'Value'],
              ...props.pns.map((random, index) => [index, random]),
            ]}
            filename='pn.csv'
            style={{ textDecoration: 'none' }}
          >
            <Button variant='outlined' fullWidth>
              Save as CSV
            </Button>
          </CSVLink>
        </div>
      )}
    </>
  );
};

export default PnCalculator;
