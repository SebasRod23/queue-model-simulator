import React from 'react';
import { Button } from '@mui/material';

import { MM1 } from '../classes/MM1';
import { MMs } from '../classes/MMs';
import { MMsk } from '../classes/MMsk';

const Test: React.FC = () => {
  return (
    <div>
      <Button onClick={async () => console.log(await MM1.simulate(2, 3, 1))}>
        MM1
      </Button>
      <Button onClick={async () => console.log(await MMs.simulate(2, 3, 2, 1))}>
        MMs
      </Button>
      <Button
        onClick={async () => console.log(await MMsk.simulate(2, 3, 1, 3, 1))}
      >
        MM1sk
      </Button>
    </div>
  );
};

export default Test;
