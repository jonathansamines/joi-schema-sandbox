'use strict';

const Joi = require('joi');

function extract(schema, ignore) {
    let result = Joi.object();

    for (const key of Object.keys(schema.describe().keys)) {
        if (!ignore.includes(key)) {
            result = result.append({ [key]: schema.extract(key) });
        }
    }

    return result;
}

const Schema = Joi.object({
    a: Joi.string(),
    b: Joi.string(),
    c: Joi.object({
        d: Joi.string(),
    }),
});

const CSchema = extract(Schema, ['a', 'b']);

Joi.assert({ c: { d: 'value' } }, CSchema); // ok
Joi.assert({ a: 'value' }, CSchema); // "a" is not allowed
Joi.assert({ b: 'value' }, CSchema); // "b" is not allowed

const BCSchema = extract(Schema, ['a']);

Joi.assert({ c: { d: 'value' } }, BCSchema); // ok
Joi.assert({ b: 'value' }, BCSchema); // ok
Joi.assert({ a: 'value' }, BCSchema); // "a" is not allowed