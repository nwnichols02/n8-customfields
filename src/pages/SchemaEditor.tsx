import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Checkbox, FormControlLabel, Box, Typography } from '@mui/material';

const SchemaEditor: React.FC = () => {
  const [schema, setSchema] = useState({
    type: 'object',
    properties: {
      name: { type: 'string' },
      age: { type: 'number' },
      email: { type: 'string', format: 'email' },
    },
    required: ['name', 'email'],
  });

  const [uiSchema, setUiSchema] = useState({
    type: 'VerticalLayout',
    elements: [
      { type: 'Control', scope: '#/properties/name' },
      { type: 'Control', scope: '#/properties/age' },
      { type: 'Control', scope: '#/properties/email' },
    ],
  });

  const handlePropertyChange = (property: string, value: any) => {
    setSchema((prevSchema) => ({
      ...prevSchema,
      properties: {
        ...prevSchema.properties,
        [property]: value,
      },
    }));
  };

  const handleUiSchemaChange = (index: number, value: any) => {
    setUiSchema((prevUiSchema) => ({
      ...prevUiSchema,
      elements: prevUiSchema.elements.map((element, i) =>
        i === index ? { ...element, ...value } : element
      ),
    }));
  };

  const addProperty = () => {
    const newProperty = `property${Object.keys(schema.properties).length + 1}`;
    setSchema((prevSchema) => ({
      ...prevSchema,
      properties: {
        ...prevSchema.properties,
        [newProperty]: { type: 'string' },
      },
    }));
    setUiSchema((prevUiSchema) => ({
      ...prevUiSchema,
      elements: [
        ...prevUiSchema.elements,
        { type: 'Control', scope: `#/properties/${newProperty}` },
      ],
    }));
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Schema Editor
      </Typography>
      {Object.entries(schema.properties).map(([property, value]: [string, any], index) => (
        <Box key={property} sx={{ mb: 2 }}>
          <TextField
            label={`Property Name (${property})`}
            value={property}
            onChange={(e) => {
              const newProperty = e.target.value;
              setSchema((prevSchema) => {
                const { [property]: _, ...rest } = prevSchema.properties;
                return {
                  ...prevSchema,
                  properties: { ...rest, [newProperty]: value },
                };
              });
              setUiSchema((prevUiSchema) => ({
                ...prevUiSchema,
                elements: prevUiSchema.elements.map((element) =>
                  element.scope === `#/properties/${property}`
                    ? { ...element, scope: `#/properties/${newProperty}` }
                    : element
                ),
              }));
            }}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Type</InputLabel>
            <Select
              value={value.type}
              onChange={(e) => handlePropertyChange(property, { ...value, type: e.target.value })}
            >
              <MenuItem value="string">String</MenuItem>
              <MenuItem value="number">Number</MenuItem>
              <MenuItem value="boolean">Boolean</MenuItem>
              <MenuItem value="array">Array</MenuItem>
              <MenuItem value="object">Object</MenuItem>
            </Select>
          </FormControl>
          {value.type === 'string' && (
            <FormControl fullWidth margin="normal">
              <InputLabel>Format</InputLabel>
              <Select
                value={value.format || ''}
                onChange={(e) => handlePropertyChange(property, { ...value, format: e.target.value })}
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="email">Email</MenuItem>
                <MenuItem value="date">Date</MenuItem>
                <MenuItem value="time">Time</MenuItem>
                <MenuItem value="date-time">Date-Time</MenuItem>
              </Select>
            </FormControl>
          )}
          <FormControlLabel
            control={
              <Checkbox
                checked={schema.required?.includes(property)}
                onChange={(e) => {
                  setSchema((prevSchema) => ({
                    ...prevSchema,
                    required: e.target.checked
                      ? [...(prevSchema.required || []), property]
                      : (prevSchema.required || []).filter((p) => p !== property),
                  }));
                }}
              />
            }
            label="Required"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>UI Control</InputLabel>
            <Select
              value={uiSchema.elements[index].type}
              onChange={(e) => handleUiSchemaChange(index, { type: e.target.value })}
            >
              <MenuItem value="Control">Default</MenuItem>
              <MenuItem value="HorizontalLayout">Horizontal Layout</MenuItem>
              <MenuItem value="VerticalLayout">Vertical Layout</MenuItem>
              <MenuItem value="Group">Group</MenuItem>
            </Select>
          </FormControl>
        </Box>
      ))}
      <Button variant="contained" color="primary" onClick={addProperty}>
        Add Property
      </Button>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">JSON Schema:</Typography>
        <pre>{JSON.stringify(schema, null, 2)}</pre>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">UI Schema:</Typography>
        <pre>{JSON.stringify(uiSchema, null, 2)}</pre>
      </Box>
    </Box>
  );
};

export default SchemaEditor;