/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
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

const PnCalculator = () => {
  const [n, setN] = useState('');
  const [pns, setPns] = useState<number[]>([]);

  const rowHeight = 30;

  const renderRow = (rowProps: ListChildComponentProps) => {
    const { index, style } = rowProps;

    return (
      <ListItem style={style} key={index} component='div' disablePadding>
        <ListItemButton
          style={{ height: `${rowHeight}px` }}
          onClick={() => {
            navigator.clipboard.writeText(String(pns[index]));
          }}
        >
          <ListItemText primary={`P${index}`} />
          <ListItemText primary={`${pns[index]}`} />
        </ListItemButton>
      </ListItem>
    );
  };

  const handleInputChange = (strNumber: string) => {
    strNumber = strNumber.replace(/[ .]/g, '');
    const number = Number(strNumber);
    if (isNaN(number) && strNumber !== '') return;

    setN(strNumber);
  };

  const getPn = () => {
    setPns([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
  };

  return (
    <>
      <h1>Pn Calculator</h1>
      <form css={divStyleRows}>
        <TextField
          label={'Calculate up to n'}
          variant='outlined'
          required
          value={n}
          onChange={(event) => handleInputChange(event.target.value)}
        />
        <Button variant='contained' onClick={getPn} disabled={n === ''}>
          Calculate up to n
        </Button>
      </form>

      <br />
      <br />

      {pns.length > 0 && (
        <div css={RandomsListDiv}>
          <Box css={RandomsListBox}>
            <FixedSizeList
              height={Math.min(300, pns.length * 30)}
              width='100%'
              itemSize={rowHeight}
              itemCount={pns.length}
              overscanCount={10}
            >
              {renderRow}
            </FixedSizeList>
          </Box>

          <CSVLink
            data={[
              ['Pn', 'Value'],
              ...pns.map((random, index) => [index, random]),
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
