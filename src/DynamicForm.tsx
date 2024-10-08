import React, { useState, useEffect } from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers, materialCells } from '@jsonforms/material-renderers';
import { JsonSchema, UISchemaElement } from '@jsonforms/core';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import CustomRenderer from './CustomRenderer';

interface DynamicFormProps {
  schema: JsonSchema;
  uischema: UISchemaElement;
  parentChildRelations: ParentChildRelation[];
}

const DynamicForm: React.FC<DynamicFormProps> = ({ schema, uischema, parentChildRelations }) => {
  const [data, setData] = useState({});
  const [validationSchema, setValidationSchema] = useState<z.ZodType<any>>(z.object({}));

  useEffect(() => {
    // Generate Zod schema based on JSON schema
    const generateZodSchema = (jsonSchema: JsonSchema): z.ZodType<any> => {
      // Implement the logic to convert JSON schema to Zod schema
      // This is a simplified example and may need to be expanded
      switch (jsonSchema.type) {
        case 'string':
          return z.string();
        case 'number':
          return z.number();
        case 'boolean':
          return z.boolean();
        case 'object':
          const shape: { [key: string]: z.ZodType<any> } = {};
          Object.entries(jsonSchema.properties || {}).forEach(([key, value]) => {
            shape[key] = generateZodSchema(value as JsonSchema);
          });
          return z.object(shape);
        default:
          return z.any();
      }
    };

    setValidationSchema(generateZodSchema(schema));
  }, [schema]);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(validationSchema),
  });

  const renderers = [
    ...materialRenderers,
    { tester: () => 5, renderer: CustomRenderer },
  ];

  const onChange = ({ data, errors }: any) => {
    setData(data);
    // Handle parent-child relationships
    parentChildRelations.forEach(relation => {
      const parentValue = data[relation.parent];
      if (relation.condition(parentValue)) {
        // Show child field
      } else {
        // Hide child field
      }
    });
  };

  const onSubmit = (formData: any) => {
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <JsonForms
        schema={schema}
        uischema={uischema}
        data={data}
        renderers={renderers}
        cells={materialCells}
        onChange={onChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default DynamicForm;