'use strict';

const assert = require('assert');
const BaseJoi = require('joi');
const JoiDuration = require('./joi-duration');

const Joi = BaseJoi.extend(JoiDuration);
const Schema = Joi.number().duration().max(40001).prefs({ convert: true });

const value = Joi.attempt('40s', Schema);

assert.equal(typeof value, 'number', 'duration was cohersed');
assert.equal(value, 40000, 'duration was parsed');

Joi.assert('41s', Schema); // fails