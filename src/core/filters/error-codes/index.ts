type ErrorDocumentation = {
  code: string;
  message: string;
  description: string;
};

export const ERROR_CODES: { [key: string]: ErrorDocumentation } = {
  UNHANDLED_DB_EXCEPTION: {
    code: 'FUELSAPI-0000',
    message: 'Ups! Something went wrong',
    description: 'Something went wrong. Unhandled exception',
  },
  UNHANDLED_EXCEPTION: {
    code: 'FUELSAPI-0001',
    message: 'Ups! Something went wrong',
    description: 'Something went wrong. Unhandled exception',
  },
};

export const POSTGRES_ERROR_CODES = {
  UNIQUE_VIOLATION: '23505',
  FOREIGN_KEY_VIOLATION: '23503',
  CHECK_VIOLATION: '23514',
  NOT_NULL_VIOLATION: '23502',
  EXCLUSION_VIOLATION: '23P01',
  CHECK_CONSTRAINT_VIOLATION: '23513',
};
