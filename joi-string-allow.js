'use strict';

const Joi = require('joi');

const AlphaSchema = Joi.string().alphanum();
const AlphaModSchema = Joi.string().allow('-', '_').concat(AlphaSchema);

Joi.assert('-hello_', AlphaModSchema); // ok
Joi.assert('hello-', AlphaSchema); // "value" must only contain alpha-numeric characters