import React from 'react';
import { withJsonFormsControlProps } from '@jsonforms/react';
import { materialRenderers } from '@jsonforms/material-renderers';

const PaddedControl = (props: any) => {
  console.log('PaddedControl props:', props);
  const { uischema, schema, path, renderers } = props;
  const MaterialInputControl = materialRenderers.find(
    (r) => r.tester(uischema, schema, path) !== -1
  )?.renderer;

  if (!MaterialInputControl) {
    console.warn('No suitable renderer found for', uischema);
    return null;
  }

  return (
    <div style={{ padding: '10px' }}>
      <MaterialInputControl {...props} />
    </div>
  );
};

export const PaddedControlWithProps = withJsonFormsControlProps(PaddedControl);