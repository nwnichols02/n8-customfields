import { useMemo, useState } from 'react'
import { JsonForms } from '@jsonforms/react';
import '../App.css'
import {
    materialCells,
    materialRenderers,
} from '@jsonforms/material-renderers';
import schema from '../schema.json';
import uischema from '../uischema.json';
import uischema2 from '../uischema2.json';
import RatingControl from '../RatingControl';
import ratingControlTester from '../testers/ratingControlTester';
import { myGroupTester } from '../testers/accordionGroupTester';
import { Button, Stack } from '@mui/material';
import MyGroupRenderer from '../customRenderers/AccordionGroup';
import {PaddedControlWithProps} from '../customRenderers/PaddedControl';
import {paddedControlTester} from '../testers/paddedControlTester';


const initialData = {
    name: 'Send email to Adrian',
    description: 'Confirm if you have passed the subject\nHereby ...',
    done: true,
    recurrence: 'Daily',
    rating: 3,
};

const renderers = [
    ...materialRenderers,
    //custom renderers
    //register custom renderers
    { tester: myGroupTester, renderer: MyGroupRenderer },
    // { tester: paddedControlTester, renderer: PaddedControlWithProps },
    { tester: ratingControlTester, renderer: RatingControl },
];

const Home = () => {

    const [data, setData] = useState<object>(initialData);
    const stringifiedData = useMemo(() => JSON.stringify(data, null, 2), [data]);

    const clearData = () => {
        setData({});
    };


    return (
        <>
            <h1>Rendered form</h1>
            <Stack direction="row" spacing={2} justifyContent={"space-between"} sx={{ mb: 4 }}>
                <Button variant="contained" onClick={clearData}>Clear</Button>
                {/* <Button variant="contained" onClick={clearData}>Submit</Button> */}
            </Stack>
            <div className="card">
                <JsonForms
                    schema={schema}
                    uischema={uischema2}
                    // uischema={uischema}
                    data={data}
                    renderers={renderers}
                    cells={materialCells}
                    onChange={({ data }) => setData(data)}
                />
            </div>
            <p className="read-the-docs">
                {data ? stringifiedData : 'Click on the button to render the form'}
            </p>
        </>
    )
}

export default Home