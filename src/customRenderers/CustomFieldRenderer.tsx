import React from 'react';
import { withJsonFormsControlProps } from '@jsonforms/react';
import { TextField, Checkbox, Select, MenuItem } from '@mui/material';
import { ControlProps } from '@jsonforms/core';

const CustomFieldRenderer: React.FC<ControlProps> = (props) => {
  const { data, handleChange, path, schema, uischema } = props;

  const renderField = () => {
    switch (schema.type) {
      case 'string':
        return (
          <TextField
            value={data || ''}
            onChange={(e) => handleChange(path, e.target.value)}
            fullWidth
            label={schema.title}
          />
        );
      case 'boolean':
        return (
          <Checkbox
            checked={data || false}
            onChange={(e) => handleChange(path, e.target.checked)}
          />
        );
      case 'number':
      case 'integer':
        return (
          <TextField
            type="number"
            value={data || ''}
            onChange={(e) => handleChange(path, Number(e.target.value))}
            fullWidth
            label={schema.title}
          />
        );
      case 'array':
        if (schema.enum) {
          return (
            <Select
              value={data || ''}
              onChange={(e) => handleChange(path, e.target.value)}
              fullWidth
              label={schema.title}
            >
              {schema.enum.map((option: string) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          );
        }
        // Handle other array types if needed
        return null;
      default:
        return null;
    }
  };

  return (
    <div>
      {renderField()}
    </div>
  );
};

export const CustomFieldRendererWithProps = withJsonFormsControlProps(CustomFieldRenderer);
