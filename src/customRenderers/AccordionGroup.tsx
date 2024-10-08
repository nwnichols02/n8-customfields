import React from 'react';
import { withJsonFormsLayoutProps } from '@jsonforms/react';
import { MaterialLayoutRenderer } from '@jsonforms/material-renderers';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const MyGroupRenderer = ({ uischema, schema, path, visible, renderers }: any) => {
    
    const layoutProps = {
        elements: uischema.elements,
        schema,
        path,
        direction: 'column' as const,
        visible,
        uischema,
        renderers,
      };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{uischema.label}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <MaterialLayoutRenderer {...layoutProps} />
      </AccordionDetails>
    </Accordion>
  );
};

export default withJsonFormsLayoutProps(MyGroupRenderer);