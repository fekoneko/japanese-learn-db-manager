import { Schema } from 'jsonschema';

export const WordSchema: Schema = {
  type: 'object',
  properties: {
    Word: { type: 'string', minLength: 1, maxLength: 30, required: true },
    Reading: { type: 'string', minLength: 1, maxLength: 30, required: true },
    PitchAccents: {
      type: 'array',
      items: { type: 'integer', minimum: 0, maximum: 30 },
      maxItems: 5,
      required: false,
    },
    Meanings: {
      type: 'array',
      items: { type: 'string', minLength: 1, maxLength: 255 },
      maxItems: 30,
      required: false,
    },
    Popularity: { type: 'integer', minimum: 1, maximum: 2147483648, required: false },
    OtherVariants: {
      type: 'array',
      items: { type: 'string', minLength: 1, maxLength: 30 },
      maxItems: 10,
      required: false,
    },
  },
};
