'use strict';

const parse = require('parse-duration');

function JoiDurationExtension(Joi) {
    return ({
        type: 'number',
        base: Joi.number(),
        coerce(value, helpers) {
            if (helpers.schema.$_getRule('duration')) {
                return {
                    value: parse(value),
                };
            }

            return { value };
        },
        rules: {
            duration: {
                convert: true,
                method() {
                    return this.$_addRule('duration');
                },
                validate(value, helpers) {
                    return true;
                },
            },
        },
    });
};

module.exports = JoiDurationExtension;