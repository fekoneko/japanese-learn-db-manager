import { validSvgRegExp } from '@/lib/validation';
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
    KanjiIds: {
      type: 'array',
      items: { type: 'integer', minimum: 1, maximum: 2147483648 },
      maxItems: 20,
      required: false,
    },
  },
};

export const KanjiSchema: Schema = {
  type: 'object',
  properties: {
    Character: { type: 'string', minLength: 1, maxLength: 1, required: true },
    Onyomi: {
      type: 'array',
      items: { type: 'string', minLength: 1, maxLength: 10 },
      maxItems: 30,
      required: false,
    },
    Kunyomi: {
      type: 'array',
      items: { type: 'string', minLength: 1, maxLength: 10 },
      maxItems: 30,
      required: false,
    },
    Meaning: { type: 'string', minLength: 1, maxLength: 255, required: false },
    Popularity: { type: 'integer', minimum: 1, maximum: 2147483648, required: false },
    RadicalIds: {
      type: 'array',
      items: { type: 'integer', minimum: 1, maximum: 2147483648 },
      maxItems: 20,
      required: false,
    },
    Image: {
      type: 'string',
      pattern: validSvgRegExp,
      minLength: 1,
      maxLength: 100000,
      required: false,
    },
  },
};

export const RadicalSchema: Schema = {
  type: 'object',
  properties: {
    Character: { type: 'string', minLength: 1, maxLength: 1, required: true },
    CorrespondingKanjiId: { type: 'integer', minimum: 1, maximum: 2147483648, required: false },
    Keyword: { type: 'string', minLength: 1, maxLength: 255, required: true },
    DictionaryCode: { type: 'integer', minimum: 1, maximum: 214, required: false },
    OtherVariants: {
      type: 'array',
      items: { type: 'string', minLength: 1, maxLength: 1 },
      maxItems: 10,
      required: false,
    },
    Image: {
      type: 'string',
      pattern: validSvgRegExp,
      minLength: 1,
      maxLength: 100000,
      required: false,
    },
  },
};
