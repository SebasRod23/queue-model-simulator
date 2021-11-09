import React from 'react';
import { Button } from '@mui/material';

import { MM1 } from '../classes/MM1';
import { MMs } from '../classes/MMs';
import { MMsk } from '../classes/MMsk';
import { MG1 } from '../classes/MG1';

const Test: React.FC = () => {
  return (
    <div>
      <Button onClick={async () => console.log(await MM1.simulate(2, 3))}>
        MM1
      </Button>
      <Button onClick={async () => console.log(await MM1.generateToPn(3))}>
        MM1 (n=3)
      </Button>
      <Button onClick={async () => console.log(await MMs.simulate(2, 3, 2))}>
        MMs
      </Button>
      <Button onClick={async () => console.log(await MMs.generateToPn(3))}>
        MMs (n=3)
      </Button>
      <Button
        onClick={async () => console.log(await MMsk.simulate(2, 3, 1, 3))}
      >
        MM1sk
      </Button>
      <Button onClick={async () => console.log(await MMsk.generateToPn(4))}>
        MM1 (n=3)
      </Button>
      <Button
        onClick={async () => console.log(await MG1.simulate(3, 1 / 5, 1 / 10))}
      >
        MG1
      </Button>
      <Button onClick={async () => console.log(await MG1.generateToPn(3))}>
        MG1 (n=3)
      </Button>
      <Button
        onClick={async () => console.log(await MG1.simulate(3, 1 / 5, 0))}
      >
        MD1
      </Button>
      <Button onClick={async () => console.log(await MG1.generateToPn(3))}>
        MD1 (n=3)
      </Button>
    </div>
  );
};

export default Test;
