import Joi from 'joi';
import JoiDate from '@joi/date';

const JoiExtended = Joi.extend(JoiDate);

export const flightsSchema = JoiExtended.object({
    origin: Joi.number().required(),
    lastName: Joi.number().required(),
    date: Joi.date().format('DD-MM-YYYY').utc(),
});
