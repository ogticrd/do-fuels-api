import { EnvironmentSchema } from './variables';
import { createValidator } from './validator';

export const validate = createValidator(EnvironmentSchema);
export { EnvironmentSchema } from './variables';
