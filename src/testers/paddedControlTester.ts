import { rankWith, isControl } from '@jsonforms/core';

export const paddedControlTester = rankWith(1001, isControl);