import { useMemo, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { JsonForms } from '@jsonforms/react';
import './App.css'
import {
  materialCells,
  materialRenderers,
} from '@jsonforms/material-renderers';
import schema from './schema.json';
import uischema from './uischema.json';
import RatingControl from './RatingControl';
import ratingControlTester from './ratingControlTester';
import { Typography } from '@mui/material';

const initialData = {
  name: 'Send email to Adrian',
  description: 'Confirm if you have passed the subject\nHereby ...',
  done: true,
  recurrence: 'Daily',
  rating: 3,
};

const renderers = [
  ...materialRenderers,
  //register custom renderers
  { tester: ratingControlTester, renderer: RatingControl },
];

function App() {
  const [data, setData] = useState<object>(initialData);
  const stringifiedData = useMemo(() => JSON.stringify(data, null, 2), [data]);

  const clearData = () => {
    setData({});
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <Typography variant={'h4'}>Rendered form</Typography>
        <JsonForms
          schema={schema}
          uischema={uischema}
          data={data}
          renderers={renderers}
          cells={materialCells}
          onChange={({ data }) => setData(data)}
        />
      </div>
      <p className="read-the-docs">
        {data ? stringifiedData : 'Click on the button to render the form'}
      </p>
      <button onClick={clearData}>Clear</button>
    </>
  )
}

export default App
