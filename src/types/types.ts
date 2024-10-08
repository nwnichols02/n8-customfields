import { JsonSchema, UISchemaElement } from '@jsonforms/core';

export interface FieldConfig {
  schema: JsonSchema;
  uischema: UISchemaElement;
  data: any;
  parentPath?: string;
}

export interface ParentChildRelation {
  parent: string;
  child: string;
  condition: (value: any) => boolean;
}
